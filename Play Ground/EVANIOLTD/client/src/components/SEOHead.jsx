import { Helmet } from 'react-helmet-async';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '../utils/seo';

export const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  breadcrumbs = [],
  schema = null,
}) => {
  const siteUrl = 'https://evanio.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const ogImage = image || `${siteUrl}/og-image.jpg`;

  // Generate default organization schema
  const organizationSchema = generateOrganizationSchema({
    name: 'Evanio',
    url: siteUrl,
    description: 'Complete business solutions to help you launch, grow, and succeed.',
    email: 'hello@hasibur.me',
    phone: '+880-1800-000-817',
  });

  // Generate breadcrumb schema if provided
  const breadcrumbSchema = breadcrumbs.length > 0 ? generateBreadcrumbSchema(breadcrumbs) : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title || 'Evanio - Launch & Grow Your Business'}</title>
      <meta name="description" content={description || 'Complete business solutions to help you launch, grow, and succeed.'} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title || 'Evanio - Launch & Grow Your Business'} />
      <meta property="og:description" content={description || 'Complete business solutions to help you launch, grow, and succeed.'} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Evanio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title || 'Evanio - Launch & Grow Your Business'} />
      <meta name="twitter:description" content={description || 'Complete business solutions to help you launch, grow, and succeed.'} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data / Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

