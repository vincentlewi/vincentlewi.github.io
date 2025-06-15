// raConfig.js - Single source of truth for all RA routes
export const raRoutes = [
  {
    path: '/ra/updates_24_10_22',
    label: 'Updates 24-10-22',
    filePath: '/ra/updates_24_10_22/updates_24_10_22.md'
  },
  {
    path: '/ra/updates_24_11_08',
    label: 'Updates 24-11-08',
    filePath: '/ra/updates_24_11_08/updates_24_11_08.md'
  },
  {
    path: '/ra/updates_25_03_17',
    label: 'Updates 25-03-17',
    filePath: '/ra/updates_25_03_17/updates_25_03_17.md'
  }
];

// Helper function to generate router routes
export const generateRARoutes = (MarkdownComponent) => {
  return raRoutes.map(route => ({
    path: route.path,
    element: <MarkdownComponent filePath={route.filePath} />
  }));
};