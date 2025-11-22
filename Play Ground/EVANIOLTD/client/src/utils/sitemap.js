// Sitemap Generation Utility

export const generateSitemap = (routes) => {
  const baseUrl = 'https://evanio.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod || currentDate}</lastmod>
    <changefreq>${route.changefreq || 'weekly'}</changefreq>
    <priority>${route.priority || '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const defaultRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/portfolio', priority: '0.9', changefreq: 'weekly' },
  { path: '/reviews', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/team', priority: '0.7', changefreq: 'monthly' },
  { path: '/careers', priority: '0.6', changefreq: 'monthly' },
  // Service pages
  { path: '/service/business-consultancy', priority: '0.9', changefreq: 'weekly' },
  { path: '/service/business-formation', priority: '0.9', changefreq: 'weekly' },
  { path: '/service/website-development', priority: '0.9', changefreq: 'weekly' },
  { path: '/service/logo-branding', priority: '0.9', changefreq: 'weekly' },
  { path: '/service/payment-gateway-setup', priority: '0.9', changefreq: 'weekly' },
  { path: '/service/bank-account-assistance', priority: '0.9', changefreq: 'weekly' },
  { path: '/service/social-media-setup', priority: '0.9', changefreq: 'weekly' },
  { path: '/service/digital-marketing', priority: '0.9', changefreq: 'weekly' },
  { path: '/service/ai-automation-integration', priority: '0.9', changefreq: 'weekly' },
];

// Function to download sitemap
export const downloadSitemap = (routes = defaultRoutes) => {
  const sitemap = generateSitemap(routes);
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

