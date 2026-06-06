import { SITE_CONFIG } from "@/lib/constants";

export function OrganizationSchema({ config = SITE_CONFIG }: { config?: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: config.site_name || config.name,
    description: config.description || config.meta_description,
    url: config.url || SITE_CONFIG.url,
    telephone: config.phone,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address || SITE_CONFIG.address,
      addressLocality: "Jetpur",
      addressRegion: "Gujarat",
      postalCode: "360370",
      addressCountry: "IN",
    },
    sameAs: [
      config.facebook || SITE_CONFIG.social.facebook,
      config.instagram || SITE_CONFIG.social.instagram,
      config.twitter || SITE_CONFIG.social.twitter,
      config.youtube || SITE_CONFIG.social.youtube,
    ].filter(Boolean),
    foundingDate: "2020",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1250",
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TourPackageSchema({ pkg }: {
  pkg: {
    title: string;
    description: string;
    price: number;
    duration: number;
    destination: string;
    image: string;
    rating?: number;
    reviews?: number;
  }
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.description,
    image: pkg.image,
    touristType: "Leisure",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: pkg.duration,
    },
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    ...(pkg.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: pkg.rating,
        reviewCount: pkg.reviews || 0,
        bestRating: "5",
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
