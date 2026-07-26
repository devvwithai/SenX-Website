import React, { useEffect } from 'react';
import { MAIN_LANDING_PAGES, CITY_LOCATION_PAGES, KNOWLEDGE_ARTICLES } from '../data/seoData';

interface SEOHeadProps {
  currentPath?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = React.memo(({ currentPath = '/' }) => {
  useEffect(() => {
    // Determine active page data if path matches
    const cleanPath = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
    
    let activePage = MAIN_LANDING_PAGES[cleanPath] || CITY_LOCATION_PAGES[cleanPath];
    let activeArticle = cleanPath.startsWith('knowledgebase/') 
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
      document.title = 'SenX Cloud — Next-Gen Hosting Platform | Bangladesh BDIX Game Hosting & Cloud VPS';
      updateMetaTag(
        'description',
        'SenX Cloud is #1 in Bangladesh for Minecraft Server Hosting, BDIX KVM VPS, Discord Bot Hosting & Dedicated Servers. Sub-5ms ping with AMD Ryzen 9 7950X & 12Tbps DDoS protection.'
      );
      updateCanonical('https://senxcloud.com/');
    }

    // Comprehensive JSON-LD Schemas
    const schemaGraph = [
      // 1. Organization & LocalBusiness Entity in Bangladesh
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://senxcloud.com/#organization',
        name: 'SenX Cloud Bangladesh',
        alternateName: 'SenX Cloud Game & VPS Hosting',
        url: 'https://senxcloud.com',
        logo: 'https://senxcloud.com/logo.png',
        image: 'https://senxcloud.com/preview-og.png',
        description: 'Premier Game Server Hosting and BDIX Cloud VPS provider in Bangladesh. Powered by AMD Ryzen 9 7950X CPUs, NVMe Gen4, sub-5ms BDIX latency, and 12Tbps DDoS protection.',
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
          { '@type': 'AdministrativeArea', name: 'Dhaka' },
          { '@type': 'AdministrativeArea', name: 'Chattogram' },
        ],
        priceRange: '৳120 - ৳20000',
        paymentAccepted: 'bKash, Nagad, Rocket, Visa, Mastercard, AMEX',
        currenciesAccepted: 'BDT, USD, INR',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'technical support',
          telephone: '+8801700000000',
          availableLanguage: ['Bengali', 'English'],
          areaServed: 'BD',
        },
        sameAs: [
          'https://twitter.com/SenXCloud',
          'https://discord.gg/43QfPM286U',
        ],
        knowsAbout: [
          'Minecraft Server Hosting Bangladesh',
          'BDIX VPS Hosting',
          'Game Server Hosting',
          'Cloud VPS Infrastructure',
          'Pterodactyl Panel',
          'AMD Ryzen 9 7950X',
        ],
      },

      // 2. WebSite Schema with SearchAction
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://senxcloud.com/#website',
        url: 'https://senxcloud.com',
        name: 'SenX Cloud Bangladesh',
        description: 'Next-Gen Game Hosting & BDIX Cloud VPS Infrastructure in Bangladesh',
        publisher: { '@id': 'https://senxcloud.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://senxcloud.com/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },

      // 3. Product & AggregateOffer Schema for AEO price extraction
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: activePage ? activePage.h1 : 'SenX Cloud Game & VPS Hosting Bangladesh',
        image: 'https://senxcloud.com/preview-og.png',
        description: activePage ? activePage.metaDescription : 'Ultra-low latency game hosting and BDIX VPS in Bangladesh powered by AMD Ryzen 9 7950X.',
        brand: { '@type': 'Brand', name: 'SenX Cloud' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1580',
          bestRating: '5',
          worstRating: '1',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'BDT',
          lowPrice: '350',
          highPrice: '15000',
          offerCount: '15',
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

// Helper utilities for DOM meta manipulation
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
