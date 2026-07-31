const fs = require('fs');
const path = require('path');

const files = [
  'src/components/dashboard/StatsCards.jsx',
  'src/components/leads/LeadsStatsCards.jsx',
  'src/components/clients/ClientsStatsCards.jsx',
  'src/components/followUps/FollowUpsStatsCards.jsx',
  'src/components/notes/NotesStatsCards.jsx',
  'src/components/activityTimeline/ActivityTimelineStatsCards.jsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Update destructuring from the hook to remove activeIndex and add paginationRef
  content = content.replace(
    /const \{\s*scrollRef\s*,\s*activeIndex\s*,\s*handleScroll\s*,\s*scrollToCard\s*\} = useInfiniteCarousel\((.*?)\);/g,
    'const { scrollRef, paginationRef, handleScroll, scrollToCard } = useInfiniteCarousel($1);'
  );

  // StatsCards.jsx uses activeIndex internally in state because I haven't updated it yet to use the hook!
  // Let's manually fix StatsCards.jsx first if it's not using the hook.
  if (file.includes('StatsCards.jsx') && !file.includes('Leads') && !file.includes('Clients') && !file.includes('FollowUps') && !file.includes('Notes') && !file.includes('Activity')) {
    // If it doesn't use the hook, replace it
    if (!content.includes('useInfiniteCarousel')) {
      content = content.replace(
        /import React, \{ useRef, useState, useEffect \} from 'react';/,
        "import React from 'react';\nimport { useInfiniteCarousel } from '../../hooks/useInfiniteCarousel';"
      );
      content = content.replace(
        /const scrollRef = useRef\(null\);\n\s*const \[activeIndex, setActiveIndex\] = useState\(0\);/,
        ''
      );
      content = content.replace(
        /\/\/ Triplicate the data[\s\S]*?const scrollToCard = \(index\) => \{[\s\S]*?\};\n/,
        ''
      );
      content = content.replace(
        /const statsData = \[\.\.\.baseStatsData, \.\.\.baseStatsData, \.\.\.baseStatsData\];/,
        "const { scrollRef, paginationRef, handleScroll, scrollToCard } = useInfiniteCarousel(baseStatsData.length);\n  const statsData = [...baseStatsData, ...baseStatsData, ...baseStatsData];"
      );
    } else {
      content = content.replace(
        /const \{\s*scrollRef\s*,\s*activeIndex\s*,\s*handleScroll\s*,\s*scrollToCard\s*\} = useInfiniteCarousel\((.*?)\);/g,
        'const { scrollRef, paginationRef, handleScroll, scrollToCard } = useInfiniteCarousel($1);'
      );
    }
  }

  // Add ref={paginationRef} to the pagination div
  content = content.replace(
    /<div className="stats-pagination">/g,
    '<div className="stats-pagination" ref={paginationRef}>'
  );

  // Change className logic for pagination dots to just initially set the first dot to active,
  // since the hook will manage the rest.
  content = content.replace(
    /className=\{\`pagination-dot \$\{\s*activeIndex === index \? 'active' : ''\s*\}\`\}/g,
    "className={`pagination-dot ${index === 0 ? 'active' : ''}`}"
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
