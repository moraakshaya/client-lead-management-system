const fs = require('fs');
const path = require('path');

const cssFiles = [
  'src/components/leads/leadsFilterBar.css',
  'src/components/clients/clientsFilterBar.css',
  'src/components/followUps/followUpsFilterBar.css',
  'src/components/notes/notesFilterBar.css',
  'src/components/activityTimeline/activityTimelineFilterBar.css'
];

const mobileCSS = `
/* --- Mobile Responsive Filter Bar --- */
@media (max-width: 900px) {
  .filter-bar-grid {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group, 
  .filter-search {
    width: 100%;
    flex: 1 1 auto;
    min-width: 0;
  }
  
  .filter-actions {
    width: 100%;
    flex: 1 1 auto;
    margin-top: 8px;
  }
  
  .btn-reset {
    width: 100%;
    justify-content: center;
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
  fs.writeFileSync(filePath, content + '\n' + mobileCSS, 'utf8');
  console.log(`Updated: ${file}`);
});
