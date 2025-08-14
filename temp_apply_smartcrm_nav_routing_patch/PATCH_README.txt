SmartCRM Patch — Navbar routing + key screens
This patch adds/overwrites the following files (keep your Friday base intact):

- src/App.tsx                      (BrowserRouter + routes)
- src/pages/Dashboard.tsx          (glass-style dashboard, dependency-free)
- src/components/layout/Navbar.tsx (Dashboard/Contacts/Pipeline + Research modal toggle)
- src/components/contacts/ContactsEnhancedCards.tsx   (placeholder; replace with your enhanced files if needed)
- src/components/pipeline/DealsBoard.tsx              (placeholder; replace with your enhanced files if needed)
- src/components/modals/ResearchModal.tsx

How to apply:
1) Unzip this at the ROOT of your Friday SmartCRM project (let it overwrite existing files).
2) Run: npm run dev (or npm run build)
3) Visit: /, /dashboard, /contacts, /pipeline. Use the Research button in navbar to open the modal.

If your enhanced Contacts/Pipeline have different filenames/paths, update src/App.tsx imports accordingly.
