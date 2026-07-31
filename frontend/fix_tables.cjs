const fs = require('fs');
const path = require('path');

const cssFiles = [
  'src/components/leads/leadsTable.css',
  'src/components/clients/clientsTable.css',
  'src/components/followUps/followUpsTable.css',
  'src/components/notes/notesTable.css',
  'src/components/activityTimeline/activityTimelineTable.css'
];

const mobileCSS = `
/* --- Mobile Responsive Table Elements --- */
@media (max-width: 900px) {
  .table-pagination {
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: center;
  }
  
  .pagination-controls {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
}
`;

cssFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Not found: ${file}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('@media (max-width: 900px)')) {
    console.log(`Already responsive: ${file}`);
    return;
  }
  
  // Ensure table-wrapper has overflow-x: auto (most already do, but just in case)
  if (!content.includes('overflow-x: auto')) {
      content = content.replace('.table-wrapper {', '.table-wrapper {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;');
  }

  fs.writeFileSync(filePath, content + '\n' + mobileCSS, 'utf8');
  console.log(`Updated: ${file}`);
});
