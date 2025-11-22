// SEO Utilities for Schema Markup and Structured Data

export const generateOrganizationSchema = (data) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name || 'Evanio',
    url: data.url || 'https://evanio.com',
    logo: data.logo || 'https://evanio.com/logo.png',
    description: data.description || 'Complete business solutions to help you launch, grow, and succeed.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: data.phone || '+880-1800-000-817',
      contactType: 'Customer Service',
      email: data.email || 'hello@hasibur.me',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
    sameAs: data.socialLinks || [
      'https://www.facebook.com/www.Hasibur.me/',
      'https://www.instagram.com/hasibur.me/',
      'https://x.com/x_hasibur',
      'https://www.linkedin.com/in/hasibur-me/',
      'https://www.youtube.com/@hasibur_me',
    ],
  };
};

export const generateServiceSchema = (service) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Evanio',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    offers: service.packages?.map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      price: pkg.price,
      priceCurrency: 'USD',
      description: pkg.description,
    })),
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

export const generateArticleSchema = (article) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Evanio',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Evanio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://evanio.com/logo.png',
      },
    },
  };
};

export const generateReviewSchema = (review) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: review.serviceName || 'Evanio Services',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
    },
    author: {
      '@type': 'Person',
      name: review.authorName || 'Anonymous',
    },
    reviewBody: review.comment,
    datePublished: review.createdAt,
  };
};

export const generateFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const generateWebSiteSchema = (data) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name || 'Evanio',
    url: data.url || 'https://evanio.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${data.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

