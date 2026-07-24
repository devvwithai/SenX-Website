import React, { useEffect } from 'react';

export const SEOHead: React.FC = React.memo(() => {
  useEffect(() => {
    // Inject Structured Data Schemas into Document Head for Search Engines & Answer Engine Crawlers (AEO)
    const schemaData = [
      // 1. Organization Schema
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://senxcloud.com/#organization',
        name: 'SenX Cloud',
        url: 'https://senxcloud.com',
        logo: 'https://senxcloud.com/logo.png',
        description: 'Ultra-premium high-performance cloud infrastructure, NVMe Game Hosting, KVM VPS, and Enterprise Dedicated Servers.',
        sameAs: [
          'https://twitter.com/SenXCloud',
          'https://github.com/SenXCloud',
          'https://discord.gg/senxcloud',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          availableLanguage: ['English', 'Bengali', 'Hindi'],
          areaServed: 'Worldwide',
        },
        knowsAbout: [
          'Game Server Hosting',
          'Minecraft Server Hosting',
          'Rust Game Servers',
          'DDoS Protection',
          'Cloud VPS Infrastructure',
          'KVM Virtualization',
          'Ryzen 9 7950X Hosting',
        ],
      },
      // 2. WebSite Schema with SearchAction
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://senxcloud.com/#website',
        url: 'https://senxcloud.com',
        name: 'SenX Cloud',
        description: 'Next-Gen Cloud Infrastructure & High-Performance Game Server Hosting',
        publisher: {
          '@id': 'https://senxcloud.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://senxcloud.com/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      // 3. Product & AggregateOffer Schema for AEO price queries
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'SenX Cloud High Performance Game Hosting',
        image: 'https://senxcloud.com/preview-og.jpg',
        description: 'Ultra-low latency game hosting powered by AMD Ryzen 9 7950X CPUs with DDR5 RAM and Gen4 PCIe NVMe storage.',
        brand: {
          '@type': 'Brand',
          name: 'SenX Cloud',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1420',
          bestRating: '5',
          worstRating: '1',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '2.99',
          highPrice: '149.99',
          offerCount: '12',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
        },
      },
      // 4. WebApplication Schema for Pterodactyl Control Panel
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'SenX Control Panel',
        operatingSystem: 'Linux, Windows, Web Browser',
        applicationCategory: 'DeveloperApplication',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        featureList: [
          'Sub-second Server Deployment',
          'One-click Modpack Installer',
          'Automated Offsite NVMe Backups',
          'Real-time Metric Telemetry',
          'Web Console & SFTP File Manager',
        ],
      },
    ];

    const scriptElements: HTMLScriptElement[] = [];

    schemaData.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `senx-schema-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    return () => {
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return null;
});
