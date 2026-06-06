// Package store — full package data with details
// Uses localStorage so admin edits persist across sessions

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface PackageFull {
  id: string;
  title: string;
  slug: string;
  destination: string;
  duration_days: number;
  price_per_person: number;
  original_price: number;
  cover_image: string;
  short_description: string;
  description: string;
  type: string;
  rating: number;
  reviews_count: number;
  best_seller: boolean;
  featured: boolean;
  // Detail fields
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  gallery_images: string[];
  itinerary: ItineraryDay[];
}

const STORAGE_KEY = "th_packages_v1";

// Default full data for all 6 packages
export const DEFAULT_PACKAGES: PackageFull[] = [
  {
    id: "1",
    title: "Kerala God's Own Country - Houseboat & Munnar",
    slug: "kerala-backwaters-munnar",
    destination: "Kerala",
    duration_days: 6,
    price_per_person: 18999,
    original_price: 24999,
    cover_image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    short_description: "Cruise through serene backwaters on a houseboat, explore misty tea gardens of Munnar and pristine beaches of Varkala.",
    description: "Experience the magic of Kerala — God's Own Country. This carefully crafted 6-day itinerary takes you through the best that Kerala has to offer. Start with the heritage charm of Fort Kochi, ascend to the misty tea gardens of Munnar, drift through the serene Alleppey backwaters on a traditional houseboat, and unwind at the golden sands of Kovalam beach.",
    type: "domestic",
    rating: 4.9,
    reviews_count: 312,
    best_seller: true,
    featured: true,
    inclusions: [
      "5 nights accommodation (3★/4★ hotels)",
      "Daily breakfast & dinner",
      "Houseboat stay in Alleppey (1 night)",
      "AC vehicle transfers throughout",
      "Munnar sightseeing with guide",
      "English-speaking guide",
      "All toll & parking charges",
    ],
    exclusions: [
      "Airfare / Train fare",
      "Lunch (except on houseboat)",
      "Personal expenses & shopping",
      "Camera charges at monuments",
      "Travel insurance",
      "Anything not mentioned in inclusions",
    ],
    highlights: [
      "Alleppey backwaters houseboat cruise",
      "Munnar sunrise & tea garden visit",
      "Fort Kochi heritage walk",
      "Kovalam beach sunset",
      "Kathakali dance show",
      "Periyar wildlife sanctuary visit",
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800&q=80",
      "https://images.unsplash.com/photo-1580753552462-38b78a34b2f0?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kochi", description: "Arrive at Kochi airport/railway station. Transfer to hotel. Evening visit to Fort Kochi, Chinese fishing nets, Dutch Palace, and St. Francis Church. Enjoy the vibrant Marine Drive. Overnight in Kochi." },
      { day: 2, title: "Kochi to Munnar (130 km)", description: "Morning drive to Munnar through lush green valleys. Visit the spectacular Cheeyappara and Valara Waterfalls en route. Afternoon explore the fragrant tea gardens and tea factory. Overnight in Munnar." },
      { day: 3, title: "Munnar Sightseeing", description: "Full day excursion — Mattupetty Dam, Echo Point, Kundala Lake, Top Station (highest point of Munnar). Evening visit the TATA Tea Museum. Optional: Eravikulam National Park. Overnight in Munnar." },
      { day: 4, title: "Munnar to Alleppey via Houseboat", description: "Morning drive to Alleppey (Alappuzha). Check into traditional kettuvallam (houseboat) by noon. Cruise through serene backwaters, narrow canals, paddy fields and fishing villages. Dinner and overnight on houseboat." },
      { day: 5, title: "Alleppey to Kovalam (155 km)", description: "Morning disembark from houseboat after breakfast. Drive to Kovalam beach resort. Check in and afternoon free at the crescent-shaped Kovalam beach. Evening: Lighthouse beach sunset walk. Overnight in Kovalam." },
      { day: 6, title: "Kovalam & Departure", description: "Morning at leisure at the beach. Enjoy optional Ayurvedic massage. After lunch, transfer to Trivandrum airport/railway station for your onward journey. Tour ends with warm memories." },
    ],
  },
  {
    id: "2",
    title: "Rajasthan Royal Heritage Circuit",
    slug: "rajasthan-royal-heritage",
    destination: "Rajasthan",
    duration_days: 8,
    price_per_person: 21999,
    original_price: 28999,
    cover_image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
    short_description: "Explore majestic forts, vibrant bazaars and golden sand dunes of the royal state of Rajasthan.",
    description: "Journey through the Land of Kings on this 8-day grand tour of Rajasthan. Experience the pink city of Jaipur, the blue city of Jodhpur, the golden city of Jaisalmer, and the lake city of Udaipur. Each city tells a story of royal grandeur, architectural brilliance, and vibrant culture.",
    type: "domestic",
    rating: 4.8,
    reviews_count: 245,
    best_seller: false,
    featured: true,
    inclusions: [
      "7 nights accommodation (3★/4★ hotels)",
      "Daily breakfast",
      "AC vehicle for all sightseeing & transfers",
      "Camel safari in Jaisalmer dunes",
      "Boat ride on Lake Pichola, Udaipur",
      "Heritage walk in Jodhpur",
      "Expert local guide at each city",
    ],
    exclusions: [
      "Airfare / Train fare",
      "Lunch & Dinner (except breakfast)",
      "Entry fees to monuments",
      "Personal expenses",
      "Travel insurance",
    ],
    highlights: [
      "Amber Fort & Jaipur Pink City",
      "Mehrangarh Fort, Jodhpur",
      "Jaisalmer Desert Safari & camping",
      "City Palace & Lake Pichola, Udaipur",
      "Pushkar sacred temple town",
      "Ranthambore National Park (optional)",
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
      "https://images.unsplash.com/photo-1477587458883-47145ed68560?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Jaipur — The Pink City", description: "Arrive in Jaipur. Check in and freshen up. Evening visit to Hawa Mahal (Palace of Winds) and Johri Bazaar. Welcome dinner at a heritage restaurant. Overnight in Jaipur." },
      { day: 2, title: "Jaipur Sightseeing", description: "Full day: Amber Fort (elephant ride optional), Sheesh Mahal, Jantar Mantar UNESCO observatory, City Palace. Afternoon: Nahargarh Fort sunset views. Overnight in Jaipur." },
      { day: 3, title: "Jaipur to Pushkar (150 km)", description: "Drive to Pushkar via Ajmer. Visit Brahma Temple (one of very few in the world). Explore the sacred Pushkar Lake, camel fair grounds. Overnight in Pushkar." },
      { day: 4, title: "Pushkar to Jodhpur — The Blue City (200 km)", description: "Drive to Jodhpur. Check in. Evening: Mehrangarh Fort panoramic views and blue city landscape. Explore Sardar Market. Overnight in Jodhpur." },
      { day: 5, title: "Jodhpur to Jaisalmer — The Golden City (300 km)", description: "Morning sightseeing: Umaid Bhawan Palace, Jaswant Thada cenotaph. Afternoon drive to Jaisalmer. Check in. Evening walk in Jaisalmer Fort. Overnight in Jaisalmer." },
      { day: 6, title: "Jaisalmer Desert Safari", description: "Morning: Patwon ki Haveli, Nathmal ki Haveli. Afternoon: Sam Sand Dunes for camel safari at sunset. Rajasthani folk music and cultural dinner at dunes camp. Overnight in Jaisalmer." },
      { day: 7, title: "Jaisalmer to Udaipur — Lake City (500 km / fly)", description: "Morning flight or drive to Udaipur. Check in. Afternoon: City Palace, Jagdish Temple. Evening boat ride on Lake Pichola. Sunset dinner at a lakeside restaurant. Overnight in Udaipur." },
      { day: 8, title: "Udaipur & Departure", description: "Morning: Saheliyon ki Bari, Fateh Sagar Lake, Maharana Pratap Memorial. Afternoon leisure shopping for handicrafts. Transfer to Udaipur airport for departure. Tour ends." },
    ],
  },
  {
    id: "3",
    title: "Manali-Spiti Valley Expedition",
    slug: "manali-spiti-valley",
    destination: "Himachal Pradesh",
    duration_days: 7,
    price_per_person: 15999,
    original_price: 19999,
    cover_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    short_description: "Journey through dramatic high-altitude landscapes, ancient Buddhist monasteries and pristine Himalayan valleys.",
    description: "Embark on an epic Himalayan adventure through the mystical Spiti Valley — the middle land between India and Tibet. Cross dramatic mountain passes, visit thousand-year-old Buddhist monasteries perched on cliff edges, and experience the raw beauty of high-altitude desert landscapes.",
    type: "adventure",
    rating: 4.7,
    reviews_count: 189,
    best_seller: false,
    featured: true,
    inclusions: [
      "6 nights accommodation (hotels & homestays)",
      "Daily breakfast & dinner",
      "Jeep safari through Spiti Valley",
      "All monastery entry fees & permits",
      "Expert Himalayan guide",
      "Inner Line Permit for Spiti",
      "First aid & oxygen cylinder",
    ],
    exclusions: [
      "Airfare / Train to Manali",
      "Lunch during travel days",
      "Personal expenses",
      "Travel & medical insurance",
      "Mules/porter charges if required",
    ],
    highlights: [
      "Rohtang Pass snow crossing",
      "Key Monastery (11th century)",
      "Chandratal Lake (Moon Lake)",
      "Kunzum Pass at 4,590m",
      "Kaza — capital of Spiti",
      "Pin Valley National Park",
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1543832923-44667a44c804?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrive Manali — Acclimatization", description: "Arrive in Manali. Check in and rest for acclimatization. Evening: Hadimba Devi Temple, Manu Temple, Old Manali. Briefing about the expedition. Overnight in Manali." },
      { day: 2, title: "Manali to Kaza via Rohtang Pass", description: "Early start. Cross Rohtang Pass (3,978m) — snow views. Descend to Lahaul valley. Pass through Gramphu, Batal. Arrive Kaza (3,800m). Check in to homestay. Overnight in Kaza." },
      { day: 3, title: "Kaza Sightseeing — Key & Kibber", description: "Visit Key Monastery (11th century, 4,166m). Drive to Kibber village (highest motorable village). Visit Chicham Bridge (Asia's highest). Back to Kaza. Overnight in Kaza." },
      { day: 4, title: "Pin Valley & Dhankar", description: "Morning: Pin Valley National Park — home to Snow Leopard. Afternoon: Dhankar Monastery perched on cliff. Dhankar Lake trek (1 hr). Overnight in Dhankar/Kaza." },
      { day: 5, title: "Chandratal Lake Camping", description: "Drive towards Chandratal (Moon Lake). 2km walk to the stunning turquoise lake at 4,300m. Camping beside the lake under a sky full of stars. Overnight in tents." },
      { day: 6, title: "Chandratal to Manali via Kunzum Pass", description: "Morning photography at the lake. Drive back via Kunzum Pass (4,590m). Stop at Batal dhaba. Arrive Manali by evening. Hot dinner and overnight in Manali." },
      { day: 7, title: "Departure from Manali", description: "Morning at leisure. Visit Kullu market for souvenirs. Afternoon: Transfer to Manali bus stand / taxi for onward journey. Tour ends with epic memories." },
    ],
  },
  {
    id: "4",
    title: "Bali Romance & Adventure Package",
    slug: "bali-romance-adventure",
    destination: "Bali, Indonesia",
    duration_days: 7,
    price_per_person: 52999,
    original_price: 64999,
    cover_image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    short_description: "Temples, rice terraces, volcanic peaks, world-class surfing and stunning sunset views in paradise.",
    description: "Bali — the Island of Gods — offers an unmatched blend of spirituality, natural beauty, and tropical luxury. This 7-day package covers the artistic highlands of Ubud, the iconic terraced rice fields, sacred temples, the dramatic Mount Batur sunrise trek, and the stunning beaches of Seminyak.",
    type: "international",
    rating: 4.9,
    reviews_count: 428,
    best_seller: true,
    featured: true,
    inclusions: [
      "6 nights resort accommodation (4★)",
      "Daily breakfast",
      "Airport pick-up and drop",
      "Ubud temple & rice terrace tour",
      "Mount Batur sunrise trek (guide included)",
      "Nusa Penida day trip",
      "Tanah Lot sunset tour",
      "Balinese cooking class",
    ],
    exclusions: [
      "International airfare",
      "Visa on arrival (~$35 USD)",
      "Lunch & Dinner",
      "Personal expenses",
      "Travel insurance",
      "Tips for guides & drivers",
    ],
    highlights: [
      "Tanah Lot temple at sunset",
      "Tegalalang rice terraces",
      "Mount Batur sunrise trek (1,717m)",
      "Nusa Penida island (Kelingking beach)",
      "Seminyak beach clubs",
      "Ubud Sacred Monkey Forest",
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
      "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrive Bali — Welcome to Paradise", description: "Arrive at Ngurah Rai International Airport. Transfer to your resort in Seminyak or Ubud. Check in, freshen up. Evening: Welcome dinner and sunset at Tanah Lot Temple. Overnight in Bali." },
      { day: 2, title: "Ubud — Culture & Temples", description: "Full day Ubud tour: Tegalalang Rice Terraces, Sacred Monkey Forest, Tirta Empul (Holy Spring Temple), Goa Gajah (Elephant Cave). Afternoon: Traditional Kecak fire dance show. Overnight in Ubud." },
      { day: 3, title: "Mount Batur Sunrise Trek", description: "3AM wake up for Mount Batur volcano trek. Watch spectacular sunrise from 1,717m above sea level. Cook eggs in volcanic steam. Descend and visit Coffee Plantation. Afternoon: Rest & spa. Overnight in Ubud." },
      { day: 4, title: "Nusa Penida Island Day Trip", description: "Full day Nusa Penida: Kelingking Beach (T-Rex cliff), Broken Beach, Angel's Billabong, Crystal Bay snorkelling. Return to Bali by evening. Overnight in Bali." },
      { day: 5, title: "Cooking Class & North Bali", description: "Morning: Balinese cooking class — learn to cook local dishes. Afternoon: North Bali tour — Gitgit Waterfall, Ulun Danu Beratan Temple (floating temple on lake). Overnight in Bali." },
      { day: 6, title: "Beach Day — Seminyak & Kuta", description: "Leisure day at Seminyak beach. Optional: surfing lessons at Kuta Beach, beach clubs, sunset cocktails at Ku De Ta. Shopping at Seminyak Square. Overnight in Bali." },
      { day: 7, title: "Departure", description: "Morning at leisure. Last-minute shopping at Kuta art market. Transfer to airport for your international flight. Depart with unforgettable memories of the Island of Gods." },
    ],
  },
  {
    id: "5",
    title: "Thailand Golden Triangle Explorer",
    slug: "thailand-golden-triangle",
    destination: "Thailand",
    duration_days: 8,
    price_per_person: 44999,
    original_price: 54999,
    cover_image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
    short_description: "Bangkok temples, Chiang Mai elephants, and Phuket beaches in one incredible journey.",
    description: "Experience the best of Thailand — from the ornate temples and chaotic energy of Bangkok, to the serene mountains and elephant sanctuaries of Chiang Mai, to the turquoise waters and limestone cliffs of Phuket. This 8-day tour covers three iconic Thai destinations.",
    type: "international",
    rating: 4.8,
    reviews_count: 367,
    best_seller: false,
    featured: true,
    inclusions: [
      "7 nights accommodation (4★ hotels)",
      "Daily breakfast",
      "All domestic transfers & flights (BKK-CNX-HKT)",
      "Bangkok city tour with guide",
      "Ethical elephant sanctuary Chiang Mai",
      "Phi Phi Islands day trip by speedboat",
      "Thai cooking class",
      "Floating market tour",
    ],
    exclusions: [
      "International airfare",
      "Visa fees (if applicable)",
      "Lunch & Dinner",
      "Personal expenses",
      "Travel insurance",
    ],
    highlights: [
      "Grand Palace & Wat Pho, Bangkok",
      "Ethical elephant sanctuary, Chiang Mai",
      "Phi Phi Islands snorkelling",
      "Patong beach & nightlife",
      "Chiang Mai Sunday walking street",
      "Thai cooking class",
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrive Bangkok", description: "Arrive at Suvarnabhumi Airport. Transfer to hotel. Evening: Asiatique The Riverfront — shopping, dining, and entertainment along the Chao Phraya River. Overnight in Bangkok." },
      { day: 2, title: "Bangkok Temple Tour", description: "Full day: Grand Palace, Wat Pho (Reclining Buddha), Wat Arun (Temple of Dawn). Afternoon: Chao Phraya river boat tour, Chinatown street food evening. Overnight in Bangkok." },
      { day: 3, title: "Bangkok — Floating Market & Maeklong", description: "Morning: Damnoen Saduak Floating Market. Afternoon: Maeklong Railway Market (trains pass through the market!). Evening: Khao San Road. Overnight in Bangkok." },
      { day: 4, title: "Bangkok to Chiang Mai (fly)", description: "Morning flight to Chiang Mai. Check in. Afternoon: Doi Suthep Temple on hilltop (panoramic city views). Evening: Night Bazaar and Kalare Night Market. Overnight in Chiang Mai." },
      { day: 5, title: "Elephant Sanctuary & Cooking Class", description: "Morning: Ethical elephant sanctuary — feed, bathe, walk with elephants (no riding). Afternoon: Thai cooking class — learn 5 authentic dishes. Evening: Sunday Walking Street (if Sun) or Night Bazaar. Overnight in Chiang Mai." },
      { day: 6, title: "Chiang Mai to Phuket (fly)", description: "Morning flight to Phuket. Check in at beach resort. Afternoon: Patong Beach. Sunset cruise. Evening: Bangla Road entertainment strip. Overnight in Phuket." },
      { day: 7, title: "Phi Phi Islands Day Trip", description: "Full day speedboat tour: Phi Phi Leh (Maya Bay — The Beach movie location), Monkey Beach, Viking Cave, snorkelling in crystal-clear water. Return by sunset. Overnight in Phuket." },
      { day: 8, title: "Phuket & Departure", description: "Morning leisure at beach. Optional: Big Buddha viewpoint, Phuket Old Town. Transfer to Phuket International Airport. Depart Thailand with amazing memories." },
    ],
  },
  {
    id: "6",
    title: "Andaman Islands - Beach & Snorkel",
    slug: "andaman-beach-snorkel",
    destination: "Andaman Islands",
    duration_days: 6,
    price_per_person: 24999,
    original_price: 29999,
    cover_image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=600&q=80",
    short_description: "Crystal clear waters, pristine beaches, coral reefs and marine life in India's tropical paradise.",
    description: "Discover the Andaman Islands — India's best kept secret. These remote islands in the Bay of Bengal boast some of Asia's most pristine beaches, world-class coral reefs, and crystal-clear turquoise waters. This 6-day package covers the best of Port Blair, Havelock Island, and Neil Island.",
    type: "domestic",
    rating: 4.8,
    reviews_count: 198,
    best_seller: false,
    featured: false,
    inclusions: [
      "5 nights accommodation (3★/4★)",
      "Daily breakfast",
      "Port Blair ↔ Havelock ferry tickets",
      "Havelock ↔ Neil ferry tickets",
      "Scuba diving (1 certified dive)",
      "Glass bottom boat ride",
      "Radhanagar Beach visit",
      "Cellular Jail evening show",
    ],
    exclusions: [
      "Airfare to Port Blair",
      "Lunch & Dinner",
      "Personal expenses",
      "Travel insurance",
      "Additional water sports",
    ],
    highlights: [
      "Radhanagar Beach (Asia's Best Beach)",
      "Elephant Beach snorkelling",
      "Scuba diving experience",
      "Cellular Jail light & sound show",
      "Neil Island coral reefs",
      "Limestone caves at Baratang",
    ],
    gallery_images: [
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80",
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    ],
    itinerary: [
      { day: 1, title: "Arrive Port Blair", description: "Arrive at Veer Savarkar International Airport. Transfer to hotel. Afternoon: Cellular Jail tour (British colonial prison). Evening: Light & Sound show at Cellular Jail. Overnight in Port Blair." },
      { day: 2, title: "Port Blair Sightseeing & Ferry to Havelock", description: "Morning: Corbyn's Cove Beach, Ross Island (abandoned British colony). Afternoon ferry to Havelock Island (2.5 hrs). Check in at beach resort. Sunset at Beach No. 5. Overnight in Havelock." },
      { day: 3, title: "Havelock — Radhanagar Beach & Scuba", description: "Morning: Scuba diving at Elephant Beach (beginner-friendly). Afternoon: Radhanagar Beach (Beach No. 7) — voted Asia's Best Beach. Sunset swim. Overnight in Havelock." },
      { day: 4, title: "Havelock — Snorkelling & Kayaking", description: "Morning: Glass bottom boat ride to coral reefs. Afternoon: Sea kayaking through mangroves. Optional: Elephant Beach snorkelling by speedboat. Beach bonfire evening. Overnight in Havelock." },
      { day: 5, title: "Havelock to Neil Island", description: "Morning ferry to Neil Island (30 min). Check in. Visit Natural Rock Bridge (Howrah Bridge). Afternoon: Laxmanpur Beach for sunset. Evening: Fresh seafood dinner. Overnight in Neil Island." },
      { day: 6, title: "Neil Island to Port Blair & Departure", description: "Morning: Bharatpur Beach snorkelling. Ferry back to Port Blair. Shopping at Aberdeen Bazaar for Andaman pearls and spices. Transfer to airport for departure. Tour ends." },
    ],
  },
];

// ── Store functions ──────────────────────────────────────────────────────────

export function getAllPackages(): PackageFull[] {
  if (typeof window === "undefined") return DEFAULT_PACKAGES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PackageFull[];
      if (parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_PACKAGES;
}

export function getPackageBySlug(slug: string): PackageFull | null {
  return getAllPackages().find((p) => p.slug === slug) || null;
}

export function saveAllPackages(packages: PackageFull[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
  } catch {}
}

export function savePackage(pkg: PackageFull): void {
  const all = getAllPackages();
  const idx = all.findIndex((p) => p.id === pkg.id);
  if (idx >= 0) {
    all[idx] = pkg;
  } else {
    all.unshift(pkg);
  }
  saveAllPackages(all);
}

export function deletePackage(id: string): void {
  const all = getAllPackages().filter((p) => p.id !== id);
  saveAllPackages(all);
}
