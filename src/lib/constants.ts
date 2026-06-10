export const SITE_CONFIG = {
  name: "Travel Holiday",
  tagline: "Crafting Extraordinary Journeys",
  description:
    "Travel Holiday — India's most trusted travel partner. Explore handcrafted tour packages across breathtaking destinations. Premium holidays, fixed departures, and custom itineraries.",
  url: "https://travelholiday.online",
  email: "Info.travelholydays@gmail.com",
  phone: "+91 8108101218",
  whatsapp: "918108101218",
  whatsapp_display: "+91 81081 01218",
  address: "Jetpur, Gujarat, India",
  social: {
    facebook: "https://facebook.com/travelholiday",
    instagram: "https://instagram.com/travelholiday",
    twitter: "https://twitter.com/travelholiday",
    youtube: "https://youtube.com/@travelholiday",
  },
};

export const DESTINATIONS_DOMESTIC = [
  {
    name: "Kerala",
    slug: "kerala",
    tagline: "God's Own Country",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    packages: 12,
    starting_from: 15999,
  },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    tagline: "Land of Kings",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    packages: 18,
    starting_from: 12999,
  },
  {
    name: "Himachal Pradesh",
    slug: "himachal-pradesh",
    tagline: "Dev Bhoomi",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    packages: 15,
    starting_from: 9999,
  },
  {
    name: "Goa",
    slug: "goa",
    tagline: "Pearl of the Orient",
    image: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&q=80",
    packages: 10,
    starting_from: 8999,
  },
  {
    name: "Uttarakhand",
    slug: "uttarakhand",
    tagline: "Land of Gods",
    image: "https://images.unsplash.com/photo-1543832923-44667a44c804?w=800&q=80",
    packages: 14,
    starting_from: 10999,
  },
  {
    name: "Andaman",
    slug: "andaman",
    tagline: "Emerald Islands",
    image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80",
    packages: 8,
    starting_from: 19999,
  },
];

export const DESTINATIONS_INTERNATIONAL = [
  {
    name: "Bali",
    slug: "bali",
    tagline: "Island of Gods",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    packages: 8,
    starting_from: 45999,
  },
  {
    name: "Thailand",
    slug: "thailand",
    tagline: "Land of Smiles",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    packages: 12,
    starting_from: 39999,
  },
  {
    name: "Dubai",
    slug: "dubai",
    tagline: "City of Gold",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    packages: 9,
    starting_from: 42999,
  },
  {
    name: "Switzerland",
    slug: "switzerland",
    tagline: "Heart of Europe",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80",
    packages: 6,
    starting_from: 89999,
  },
  {
    name: "Singapore",
    slug: "singapore",
    tagline: "Lion City",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    packages: 7,
    starting_from: 35999,
  },
  {
    name: "Maldives",
    slug: "maldives",
    tagline: "Paradise on Earth",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    packages: 5,
    starting_from: 59999,
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: "Shield",
    title: "Trusted Since 2005",
    description: "18+ years of crafting unforgettable travel experiences with 50,000+ happy travelers",
  },
  {
    icon: "Award",
    title: "Award-Winning Service",
    description: "Recipient of multiple tourism excellence awards and certified by IATA & TAAI",
  },
  {
    icon: "Headphones",
    title: "24/7 Travel Support",
    description: "Round-the-clock assistance before, during, and after your journey",
  },
  {
    icon: "CreditCard",
    title: "Best Price Guarantee",
    description: "We match any lower price you find. No hidden charges, complete transparency",
  },
  {
    icon: "Users",
    title: "Expert Travel Designers",
    description: "Our team has personally explored 100+ destinations to design perfect itineraries",
  },
  {
    icon: "Map",
    title: "Customized Packages",
    description: "Every journey is tailor-made to match your preferences, budget and travel style",
  },
];

export const STATS = [
  { value: 50000, label: "Happy Travelers", suffix: "+" },
  { value: 100, label: "Destinations", suffix: "+" },
  { value: 18, label: "Years Experience", suffix: "+" },
  { value: 98, label: "Satisfaction Rate", suffix: "%" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Destinations",
    href: "/destinations",
    submenu: [
      { label: "Domestic", href: "/destinations?type=domestic" },
      { label: "International", href: "/destinations?type=international" },
    ],
  },
  {
    label: "Packages",
    href: "/packages",
    submenu: [
      { label: "All Packages", href: "/packages" },
      { label: "Domestic Tours", href: "/packages?type=domestic" },
      { label: "International Destinations", href: "/packages?type=international" },
      { label: "Honeymoon Tours", href: "/packages?type=honeymoon" },
      { label: "Adventure Tours", href: "/packages?type=adventure" },
      { label: "Pilgrimage Tours", href: "/packages?type=pilgrimage" },
    ],
  },
  { label: "Fixed Departures", href: "/fixed-departures" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
