'use strict';

/**
 * Alias lucide-react's Link icon to LinkIcon and update self-closing icon usages.
 *
 * Operations per file under src/**/*.{ts,tsx,js,jsx}:
 * 1) Import fix:
 *    - from: import { Link, ... } from 'lucide-react'
 *    - to:   import { Link as LinkIcon, ... } from 'lucide-react'
 *    - Deduplicate if Link as LinkIcon already present.
 * 2) JSX fix:
 *    - Replace <Link ... /> (self-closing, no "to=" prop) with <LinkIcon ... />.
 *    - Do NOT touch router Links (<Link to="...">...</Link>).
 * 3) Ambiguity detection:
 *    - If <Link>...</Link> without "to=" is found, flag for manual review.
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');

const exts = new Set(['.ts', '.tsx', '.js', '.jsx']);

const changedFiles = [];
const flagged = []; // { file, line, context }

function listFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(d, { withFileTypes: true });
    } catch (e) {
      continue;
    }
    for (const ent of entries) {
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) {
        stack.push(full);
      } else if (ent.isFile()) {
        const ext = path.extname(full);
        if (exts.has(ext)) out.push(full);
      }
    }
  }
  return out;
}

function uniquePreserveOrder(arr) {
  const seen = new Set();
  const res = [];
  for (const a of arr) {
    const key = a.replace(/\s+/g, ' ').trim();
    if (!seen.has(key)) {
      seen.add(key);
      res.push(a);
    }
  }
  return res;
}

function normalizeSpec(spec) {
  return spec.replace(/\s+/g, ' ').trim();
}

function fixLucideImportSpecs(specBlock) {
  // specBlock is inner content between braces: "Link, Eye, Link as LinkIcon"
  const rawSpecs = specBlock.split(',').map(s => s.trim()).filter(Boolean);
  let hasLinkAlias = false;

  // First pass: detect existing alias
  for (const s of rawSpecs) {
    const n = normalizeSpec(s);
    if (n === 'Link as LinkIcon') {
      hasLinkAlias = true;
      break;
    }
  }

  const newSpecs = [];
  for (let s of rawSpecs) {
    const n = normalizeSpec(s);
    if (n === 'Link as LinkIcon') {
      // Keep one; duplicates removed later
      newSpecs.push('Link as LinkIcon');
      hasLinkAlias = true;
      continue;
    }
    if (n === 'Link') {
      if (!hasLinkAlias) {
        newSpecs.push('Link as LinkIcon');
        hasLinkAlias = true;
      }
      // drop the plain Link
      continue;
    }
    if (n === 'LinkIcon') {
      // lucide-react doesn't export LinkIcon; normalize to alias form
      if (!hasLinkAlias) {
        newSpecs.push('Link as LinkIcon');
        hasLinkAlias = true;
      }
      // drop the invalid bare LinkIcon import name
      continue;
    }
    // any other specifier (including other aliases) stays
    newSpecs.push(s);
  }

  const deduped = uniquePreserveOrder(newSpecs);
  return {
    specBlockFixed: deduped.join(', '),
    hasLinkAlias: hasLinkAlias || deduped.some(s => normalizeSpec(s) === 'Link as LinkIcon'),
  };
}

function processFile(file) {
  let content;
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (e) {
    return { changed: false };
  }
  const original = content;

  // Fix lucide-react import lines that include Link
  const importRe = /import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/g;
  let lucideImportTouched = false;
  let lucideHasLinkIcon = false;

  content = content.replace(importRe, (match, specBlock) => {
    // Only act if specBlock contains the bare word Link or an already-aliased Link
    if (!/\bLink\b/.test(specBlock)) {
      return match; // no Link present
    }
    const { specBlockFixed, hasLinkAlias } = fixLucideImportSpecs(specBlock);
    lucideHasLinkIcon = lucideHasLinkIcon || hasLinkAlias;
    if (specBlockFixed !== specBlock) {
      lucideImportTouched = true;
      return `import { ${specBlockFixed} } from 'lucide-react'`;
    }
    return match;
  });

  // If we didn't touch the import but the file already had Link as LinkIcon, detect it
  if (!lucideImportTouched) {
    const hasAliasAlready = /import\s*\{[^}]*\bLink\s+as\s+LinkIcon\b[^}]*\}\s*from\s*['"]lucide-react['"]/.test(content);
    lucideHasLinkIcon = lucideHasLinkIcon || hasAliasAlready;
  }

  // Replace self-closing <Link ... /> to <LinkIcon ... /> only if lucide LinkIcon is imported
  if (lucideHasLinkIcon) {
    // Regex: <Link ... /> with no to= attribute in the tag
    content = content.replace(/<Link\b([^>]*)\/>/g, (full, attrs) => {
      if (/\bto\s*=/.test(attrs)) return full;
      return `<LinkIcon${attrs}/>`;
    });
  }

  // Ambiguity detection: <Link>...</Link> without "to=" in opening tag — flag lines for manual review
  const ambiguousTagRe = /<Link\b([^>]*)>([\s\S]*?)<\/Link>/g;
  let mm;
  while ((mm = ambiguousTagRe.exec(content)) !== null) {
    const attrs = mm[1] || '';
    if (!/\bto\s*=/.test(attrs)) {
      // compute line number (1-based)
      const idx = mm.index;
      const pre = content.slice(0, idx);
      const line = pre.split('\n').length;
      const contextLine = content.split('\n')[line - 1] || '';
      flagged.push({
        file,
        line,
        context: contextLine.trim().slice(0, 200),
      });
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles.push(file);
    return { changed: true };
  }
  return { changed: false };
}

function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`src directory not found at ${SRC_DIR}`);
    process.exit(2);
  }
  const files = listFiles(SRC_DIR);
  for (const f of files) {
    processFile(f);
  }

  // Output summary
  console.log('Alias lucide-react Link - summary');
  console.log('Changed files:', changedFiles.length);
  for (const f of changedFiles) {
    console.log(' -', path.relative(ROOT, f));
  }
  if (flagged.length) {
    console.log('\nAmbiguous cases (manual review required):');
    flagged.slice(0, 500).forEach(item => {
      console.log(` - ${path.relative(ROOT, item.file)}:${item.line} :: ${item.context}`);
    });
  } else {
    console.log('\nNo ambiguous <Link>...</Link> without "to=" found.');
  }
  // Exit code: 0 normally; 0 even if flagged to not break CI here.
  process.exit(0);
}

main();