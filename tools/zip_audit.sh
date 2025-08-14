#!/usr/bin/env bash
set -euo pipefail

# Usage: tools/zip_audit.sh
# Unzips each .zip at repo root into a temp folder, finds its src/, and compares to repo src/
# Produces reports in zip_audit_reports/

REPO_ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$REPO_ROOT"

# Collect zip files
mapfile -t zips < <(find . -maxdepth 1 -type f -name '*.zip' -print | sort)
if (( ${#zips[@]} == 0 )); then
  echo "No .zip files found at repo root."; exit 0
fi

TS=$(date +%Y%m%d_%H%M%S)
BASE_DIR="temp_zip_audit_$TS"
REPORT_DIR="zip_audit_reports_$TS"
mkdir -p "$BASE_DIR" "$REPORT_DIR"

printf "Zips found:%s\n" ""; printf '  %s\n' "${zips[@]}"

for zip in "${zips[@]}"; do
  name=$(basename "$zip")
  name_noext=${name%.zip}
  out_dir="$BASE_DIR/$name_noext"
  mkdir -p "$out_dir"
  echo "\n=== $name ==="
  echo "Unzipping → $out_dir"
  unzip -oq "$zip" -d "$out_dir"

  # Detect src root
  src_root=""
  if [ -d "$out_dir/src" ]; then
    src_root="$out_dir/src"
  else
    src_root=$(find "$out_dir" -type d -name src -print -quit || true)
  fi
  if [ -z "$src_root" ]; then
    echo "No src/ folder found inside $name"; continue
  fi
  echo "src root: $src_root"

  total_files=$(find "$src_root" -type f | wc -l | tr -d ' ')
  tsx_files=$(find "$src_root" -type f -iname '*.tsx' | wc -l | tr -d ' ')
  echo "Files in archive src: $total_files (TSX: $tsx_files)"

  diff_report="$REPORT_DIR/${name_noext}.diff.txt"
  rsync_report="$REPORT_DIR/${name_noext}.rsync-dryrun.txt"

  # Generate diff report (diff -qr); do not fail if differences are found
  if ! diff -qr "$src_root" src > "$diff_report" 2>&1; then :; fi

  # Non-destructive rsync preview (no --delete)
  if ! rsync -av --dry-run "$src_root/" src/ > "$rsync_report" 2>&1; then :; fi

  echo "Saved: $diff_report"
  echo "Saved: $rsync_report"

done

# Write an index file for convenience
INDEX_FILE="$REPORT_DIR/INDEX.txt"
{
  echo "Report directory: $REPORT_DIR"
  echo "Generated: $(date -Iseconds)"
  echo
  echo "Files:"; ls -1 "$REPORT_DIR"
} > "$INDEX_FILE"

echo "\nReports saved to: $REPORT_DIR"
ls -1 "$REPORT_DIR" | sed 's/^/  /'

echo "Temp extracted contents: $BASE_DIR"
