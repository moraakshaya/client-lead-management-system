const fs = require('fs');
const path = require('path');

const files = [
  { path: 'src/components/leads/leadsHeader.css', prefix: 'leads' },
  { path: 'src/components/clients/clientsHeader.css', prefix: 'clients' },
  { path: 'src/components/followUps/followUpsHeader.css', prefix: 'followUps' },
  { path: 'src/components/notes/notesHeader.css', prefix: 'notes' },
  { path: 'src/components/activityTimeline/activityTimelineHeader.css', prefix: 'activityTimeline' }
];

files.forEach(fileObj => {
  const filePath = path.join(__dirname, fileObj.path);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Avoid duplicate appending
  if (content.includes('@media (max-width: 900px)')) {
    console.log(`Already responsive: ${fileObj.path}`);
    return;
  }

  const mediaQuery = `
/* --- Mobile Responsive Header --- */
@media (max-width: 900px) {
  .${fileObj.prefix}-header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .${fileObj.prefix}-header-right {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
`;

  content += mediaQuery;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${fileObj.path}`);
});
