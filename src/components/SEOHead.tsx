import React, { useEffect } from 'react';
import { MAIN_LANDING_PAGES, CITY_LOCATION_PAGES, KNOWLEDGE_ARTICLES } from '../data/seoData';
import { INFRASTRUCTURE_CONFIG } from '../data/infrastructure';

interface SEOHeadProps {
  currentPath?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = React.memo(({ currentPath = '/' }) => {
  useEffect(() => {
    // Determine active page data if path matches
    const cleanPath = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
    
    const activePage = MAIN_LANDING_PAGES[cleanPath] || CITY_LOCATION_PAGES[cleanPath];
    const activeArticle = cleanPath.startsWith('knowledgebase/') 
      ? KNOWLEDGE_ARTICLES[cleanPath.replace('knowledgebase/', '')]
      : undefined;

    // Dynamic Title & Meta Tags Update
    if (activePage) {
      document.title = activePage.title;
      updateMetaTag('description', activePage.metaDescription);
      updateMetaTag('keywords', activePage.keywords.join(', '));
      updateCanonical(`https://senxcloud.com/${activePage.slug}`);
    } else if (activeArticle) {
      document.title = `${activeArticle.title} — SenX Cloud Knowledgebase`;
      updateMetaTag('description', activeArticle.metaDescription);
      updateMetaTag('keywords', activeArticle.keywords.join(', '));
      updateCanonical(`https://senxcloud.com/knowledgebase/${activeArticle.slug}`);
    } else {
      document.title = 'SenX Cloud — Game Server Hosting | Minecraft Hosting Bangladesh & India';
      updateMetaTag(
        'description',
        `High-performance game server hosting in Bangladesh and India. Minecraft, Palworld, Rust, and FiveM servers powered by ${INFRASTRUCTURE_CONFIG.supportedCpus[0].model} and ${INFRASTRUCTURE_CONFIG.supportedCpus[1].model} hardware with direct BDIX peering.`
      );
      updateCanonical('https://senxcloud.com/');
    }

    // Comprehensive JSON-LD Schemas
    const schemaGraph = [
      // 1. Organization Entity
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://senxcloud.com/#organization',
        name: 'SenX Cloud',
        alternateName: 'SenX Cloud Game Server Hosting',
        url: 'https://senxcloud.com',
        logo: 'https://senxcloud.com/favicon.svg',
        image: 'https://senxcloud.com/preview-og.png',
        description: `High-performance game server hosting provider operating in Bangladesh and India. Powered by ${INFRASTRUCTURE_CONFIG.supportedCpus[0].model} and ${INFRASTRUCTURE_CONFIG.supportedCpus[1].model} hardware, Enterprise NVMe SSD storage, and local BDIX peering.`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Gulshan 2, Dhaka North',
          addressLocality: 'Dhaka',
          addressRegion: 'Dhaka Division',
          postalCode: '1212',
          addressCountry: 'BD',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 23.8103,
          longitude: 90.4125,
        },
        areaServed: [
          { '@type': 'Country', name: 'Bangladesh' },
          { '@type': 'Country', name: 'India' },
        ],
        priceRange: '৳150 - ৳5000',
        paymentAccepted: 'bKash, Nagad, Rocket, UPI, Visa, Mastercard',
        currenciesAccepted: 'BDT, USD, INR',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'technical support',
          availableLanguage: ['Bengali', 'English', 'Hindi'],
          areaServed: ['BD', 'IN'],
        },
        sameAs: [
          'https://twitter.com/SenXCloud',
          'https://discord.gg/43QfPM286U',
        ],
        knowsAbout: [
          'Minecraft Server Hosting Bangladesh',
          'Minecraft Hosting India',
          'Game Server Hosting',
          'Palworld Server Hosting',
          'Rust Server Hosting',
          'FiveM Server Hosting',
          'Pterodactyl Panel',
          INFRASTRUCTURE_CONFIG.supportedCpus[0].model,
          INFRASTRUCTURE_CONFIG.supportedCpus[1].model,
        ],
      },

      // 2. WebSite Schema
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://senxcloud.com/#website',
        url: 'https://senxcloud.com',
        name: 'SenX Cloud Game Hosting',
        description: 'High-Performance Minecraft & Game Server Hosting in Bangladesh and India',
        publisher: { '@id': 'https://senxcloud.com/#organization' },
      },

      // 3. Product Schema for AEO price extraction
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: activePage ? activePage.h1 : 'SenX Cloud Game Server Hosting',
        image: 'https://senxcloud.com/preview-og.png',
        description: activePage ? activePage.metaDescription : 'High-performance game server hosting in Bangladesh and India.',
        brand: { '@type': 'Brand', name: 'SenX Cloud' },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'BDT',
          lowPrice: '180',
          highPrice: '5000',
          offerCount: '8',
          priceValidUntil: '2028-12-31',
          availability: 'https://schema.org/InStock',
        },
      },
    ];

    // FAQ Schema Injection if page has FAQs
    if (activePage && activePage.faqs.length > 0) {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: activePage.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      } as any);
    }

    // Inject JSON-LD Script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'senx-dynamic-seo-schema';
    script.text = JSON.stringify({ '@context': 'https://schema.org', '@graph': schemaGraph });
    
    const existing = document.getElementById('senx-dynamic-seo-schema');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [currentPath]);

  return null;
});

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonical(url: string) {
  let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}
