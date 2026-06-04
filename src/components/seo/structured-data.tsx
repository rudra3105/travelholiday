import { SITE_CONFIG } from "@/lib/constants";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "123, Travel House, Connaught Place",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    sameAs: Object.values(SITE_CONFIG.social),
    foundingDate: "2005",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50000",
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
