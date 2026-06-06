-- ============================================================
-- SEED DATA for Travel Holiday Travel Agency
-- Run AFTER 001_initial_schema.sql
-- ============================================================

-- Clean up existing data to avoid conflicts
TRUNCATE destinations, packages, fixed_departures, testimonials, gallery, faq, settings CASCADE;

-- ── DESTINATIONS ──────────────────────────────────────────────
INSERT INTO destinations (name, slug, country, region, description, short_description, cover_image, highlights, best_time_to_visit, featured, sort_order) VALUES
('Kerala', 'kerala', 'India', 'domestic',
 'Kerala, often called God''s Own Country, is a tropical paradise on India''s southwestern coast. Famous for its serene backwaters, lush tea plantations, pristine beaches, wildlife sanctuaries, and rich Ayurvedic heritage.',
 'Backwaters, tea gardens & beaches in God''s Own Country',
 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
 ARRAY['Alleppey Backwaters', 'Munnar Tea Gardens', 'Periyar Wildlife', 'Kovalam Beach'],
 'October to March', true, 1),

('Rajasthan', 'rajasthan', 'India', 'domestic',
 'Rajasthan, the Land of Kings, is India''s largest state and a treasure trove of history, culture, and color. Marvel at magnificent forts and palaces, wander through vibrant bazaars, and experience the magic of golden sand dunes.',
 'Royal forts, desert safaris & vibrant culture',
 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
 ARRAY['Amber Fort', 'Jaisalmer Desert', 'City Palace Udaipur', 'Pushkar Fair'],
 'October to March', true, 2),

('Himachal Pradesh', 'himachal-pradesh', 'India', 'domestic',
 'Himachal Pradesh, known as Dev Bhoomi (Land of Gods), is a northern Indian state featuring dramatic mountain scenery. Home to pristine Himalayan valleys, ancient temples, and world-class trekking routes.',
 'Snow peaks, valleys & adventure in Dev Bhoomi',
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
 ARRAY['Manali Valley', 'Spiti Valley', 'Shimla Heritage', 'Rohtang Pass'],
 'March to June, September to November', true, 3),

('Goa', 'goa', 'India', 'domestic',
 'Goa, the Pearl of the Orient, is India''s smallest state and most popular beach destination. Famous for its stunning coastline, Portuguese heritage architecture, vibrant nightlife, and fresh seafood.',
 'Sun, sand & Portuguese heritage on India''s coast',
 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&q=80',
 ARRAY['Baga Beach', 'Old Goa Churches', 'Dudhsagar Falls', 'Anjuna Market'],
 'November to February', true, 4),

('Uttarakhand', 'uttarakhand', 'India', 'domestic',
 'Uttarakhand, the Land of Gods, is a Himalayan state in northern India renowned for its spiritual significance, adventure sports, and natural beauty. Home to the sacred Char Dham pilgrimage circuit.',
 'Sacred Himalayas, trekking & spiritual journeys',
 'https://images.unsplash.com/photo-1543832923-44667a44c804?w=800&q=80',
 ARRAY['Rishikesh Rafting', 'Nainital Lake', 'Char Dham Yatra', 'Valley of Flowers'],
 'March to June, September to November', true, 5),

('Andaman Islands', 'andaman', 'India', 'domestic',
 'The Andaman and Nicobar Islands are a group of islands in the Bay of Bengal offering some of Asia''s most pristine beaches, crystal-clear waters, and spectacular coral reefs.',
 'Crystal waters, coral reefs & pristine beaches',
 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80',
 ARRAY['Havelock Island', 'Radhanagar Beach', 'Scuba Diving', 'Cellular Jail'],
 'October to May', true, 6),

('Bali', 'bali', 'Indonesia', 'international',
 'Bali, the Island of Gods, is Indonesia''s most iconic destination. From ancient Hindu temples and emerald rice terraces to world-class surf breaks and luxury resorts, Bali offers an unmatched blend of culture, nature, and adventure.',
 'Temples, rice terraces & paradise beaches',
 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
 ARRAY['Tanah Lot Temple', 'Tegalalang Rice Terraces', 'Mount Batur Trek', 'Nusa Penida'],
 'April to October', true, 7),

('Thailand', 'thailand', 'Thailand', 'international',
 'Thailand, the Land of Smiles, enchants visitors with its ornate temples, stunning beaches, vibrant street food scene, and warm hospitality. From Bangkok''s buzzing streets to the tranquil northern mountains.',
 'Temples, beaches & incredible street food',
 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
 ARRAY['Grand Palace Bangkok', 'Chiang Mai Temples', 'Phi Phi Islands', 'Elephant Sanctuary'],
 'November to April', true, 8),

('Dubai', 'dubai', 'UAE', 'international',
 'Dubai, the City of Gold, is a dazzling metropolis of architectural marvels, luxury shopping, and desert adventures. From the world''s tallest building to pristine desert dunes, Dubai offers experiences unlike any other.',
 'Skyscrapers, desert & luxury experiences',
 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
 ARRAY['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Palm Jumeirah'],
 'November to March', true, 9),

('Singapore', 'singapore', 'Singapore', 'international',
 'Singapore, the Lion City, is a gleaming island city-state that masterfully blends modernity with tradition. From the iconic Marina Bay Sands to the lush Gardens by the Bay, Singapore is a testament to human ingenuity.',
 'Garden city of futuristic architecture & culture',
 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
 ARRAY['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Hawker Centres'],
 'Year-round', true, 10),

('Switzerland', 'switzerland', 'Switzerland', 'international',
 'Switzerland, the Heart of Europe, is a landlocked country of breathtaking Alpine scenery, pristine lakes, and charming cities. From the Jungfrau region to the shores of Lake Geneva, Switzerland captivates at every turn.',
 'Alpine peaks, pristine lakes & chocolate box towns',
 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80',
 ARRAY['Jungfraujoch', 'Lake Geneva', 'Zurich Old Town', 'Interlaken Adventures'],
 'June to September (summer), December to March (winter)', true, 11),

('Maldives', 'maldives', 'Maldives', 'international',
 'The Maldives, Paradise on Earth, is a tropical nation in the Indian Ocean comprising 26 atolls and over 1,000 coral islands. Famous for its overwater bungalows, crystal-clear lagoons, and vibrant marine life.',
 'Overwater villas & untouched coral paradise',
 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
 ARRAY['Overwater Villas', 'Snorkelling & Diving', 'Sunset Dolphin Cruise', 'Private Beach Dinners'],
 'November to April', true, 12);

-- ── PACKAGES ──────────────────────────────────────────────────
INSERT INTO packages (title, slug, destination_id, type, duration_days, price_per_person, original_price, cover_image, short_description, inclusions, exclusions, highlights, featured, best_seller, rating, reviews_count, sort_order)
SELECT
  'Kerala God''s Own Country - Houseboat & Munnar',
  'kerala-backwaters-munnar',
  d.id,
  'domestic',
  6,
  18999,
  24999,
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
  'Cruise through serene backwaters on a houseboat, explore misty tea gardens of Munnar and pristine beaches of Varkala.',
  ARRAY['5 nights accommodation (3★/4★)', 'Daily breakfast & dinner', 'Houseboat stay in Alleppey', 'AC vehicle transfers', 'Munnar sightseeing', 'English-speaking guide'],
  ARRAY['Airfare/Train fare', 'Lunch', 'Personal expenses', 'Travel insurance'],
  ARRAY['Alleppey houseboat experience', 'Munnar sunrise & tea gardens', 'Kovalam beach', 'Kathakali dance show'],
  true, true, 4.9, 312, 1
FROM destinations d WHERE d.slug = 'kerala';

INSERT INTO packages (title, slug, destination_id, type, duration_days, price_per_person, original_price, cover_image, short_description, inclusions, exclusions, highlights, featured, best_seller, rating, reviews_count, sort_order)
SELECT
  'Rajasthan Royal Heritage Circuit',
  'rajasthan-royal-heritage',
  d.id,
  'domestic',
  8,
  21999,
  28999,
  'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
  'Explore majestic forts, vibrant bazaars and golden sand dunes of the royal state of Rajasthan.',
  ARRAY['7 nights accommodation (3★/4★)', 'Daily breakfast', 'AC vehicle for all transfers', 'Camel safari in Jaisalmer', 'Heritage walk in Jodhpur', 'Expert guide'],
  ARRAY['Airfare/Train fare', 'Lunch & Dinner (except breakfast)', 'Personal expenses', 'Travel insurance'],
  ARRAY['Amber Fort Jaipur', 'Mehrangarh Fort Jodhpur', 'Jaisalmer Desert Safari', 'City Palace Udaipur'],
  true, false, 4.8, 245, 2
FROM destinations d WHERE d.slug = 'rajasthan';

INSERT INTO packages (title, slug, destination_id, type, duration_days, price_per_person, original_price, cover_image, short_description, inclusions, exclusions, highlights, featured, best_seller, rating, reviews_count, sort_order)
SELECT
  'Manali-Spiti Valley Expedition',
  'manali-spiti-valley',
  d.id,
  'adventure',
  7,
  15999,
  19999,
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  'Journey through dramatic high-altitude landscapes, ancient Buddhist monasteries and pristine Himalayan valleys.',
  ARRAY['6 nights accommodation', 'Daily breakfast & dinner', 'Jeep safari through Spiti', 'Monastery visits', 'Expert mountain guide', 'All permits'],
  ARRAY['Airfare/Train to Manali', 'Lunch', 'Personal expenses', 'Travel insurance'],
  ARRAY['Rohtang Pass crossing', 'Key Monastery visit', 'Chandratal Lake', 'Kunzum Pass'],
  true, false, 4.7, 189, 3
FROM destinations d WHERE d.slug = 'himachal-pradesh';

INSERT INTO packages (title, slug, destination_id, type, duration_days, price_per_person, original_price, cover_image, short_description, inclusions, exclusions, highlights, featured, best_seller, rating, reviews_count, sort_order)
SELECT
  'Bali Romance & Adventure Package',
  'bali-romance-adventure',
  d.id,
  'international',
  7,
  52999,
  64999,
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
  'Temples, rice terraces, volcanic peaks, world-class surfing and stunning sunset views in paradise.',
  ARRAY['6 nights resort accommodation', 'Daily breakfast', 'Airport transfers', 'Ubud temple & rice terrace tour', 'Mount Batur sunrise trek', 'Nusa Penida day trip', 'Balinese cooking class'],
  ARRAY['International airfare', 'Visa on arrival fee (~$35)', 'Lunch & Dinner', 'Personal expenses', 'Travel insurance'],
  ARRAY['Tanah Lot temple sunset', 'Tegalalang rice terraces', 'Mount Batur sunrise trek', 'Seminyak beach & nightlife'],
  true, true, 4.9, 428, 4
FROM destinations d WHERE d.slug = 'bali';

INSERT INTO packages (title, slug, destination_id, type, duration_days, price_per_person, original_price, cover_image, short_description, inclusions, exclusions, highlights, featured, best_seller, rating, reviews_count, sort_order)
SELECT
  'Thailand Golden Triangle Explorer',
  'thailand-golden-triangle',
  d.id,
  'international',
  8,
  44999,
  54999,
  'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80',
  'Bangkok temples, Chiang Mai elephants, and Phuket beaches in one incredible journey.',
  ARRAY['7 nights accommodation (4★)', 'Daily breakfast', 'All transfers', 'Bangkok city tour', 'Elephant sanctuary Chiang Mai', 'Phi Phi Islands day trip', 'Thai cooking class'],
  ARRAY['International airfare', 'Visa fees if applicable', 'Lunch & Dinner', 'Personal expenses'],
  ARRAY['Grand Palace Bangkok', 'Ethical elephant sanctuary', 'Phi Phi Islands by speedboat', 'Patong beach Phuket'],
  true, false, 4.8, 367, 5
FROM destinations d WHERE d.slug = 'thailand';

INSERT INTO packages (title, slug, destination_id, type, duration_days, price_per_person, original_price, cover_image, short_description, inclusions, exclusions, highlights, featured, best_seller, rating, reviews_count, sort_order)
SELECT
  'Andaman Islands - Beach & Snorkel',
  'andaman-beach-snorkel',
  d.id,
  'domestic',
  6,
  24999,
  29999,
  'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=600&q=80',
  'Crystal clear waters, pristine beaches, coral reefs and marine life in India''s tropical paradise.',
  ARRAY['5 nights accommodation (3★/4★)', 'Daily breakfast', 'Ferry tickets Port Blair–Havelock–Neil', 'Scuba diving (1 dive)', 'Glass bottom boat ride', 'Radhanagar beach visit'],
  ARRAY['Airfare to Port Blair', 'Lunch & Dinner', 'Personal expenses', 'Travel insurance'],
  ARRAY['Radhanagar Beach (Asia''s Best)', 'Elephant Beach snorkelling', 'Scuba diving experience', 'Cellular Jail light & sound show'],
  true, false, 4.8, 198, 6
FROM destinations d WHERE d.slug = 'andaman';

-- ── ITINERARIES ──────────────────────────────────────────────
INSERT INTO itineraries (package_id, day_number, title, description, meals, accommodation)
SELECT p.id, 1, 'Arrival in Kochi',
  'Arrive at Kochi airport/railway station. Transfer to hotel. Evening visit to Fort Kochi, Chinese fishing nets, Dutch Palace, and St. Francis Church. Dinner and overnight in Kochi.',
  ARRAY['Dinner'], 'Hotel in Kochi (3★/4★)'
FROM packages p WHERE p.slug = 'kerala-backwaters-munnar';

INSERT INTO itineraries (package_id, day_number, title, description, meals, accommodation)
SELECT p.id, 2, 'Kochi to Munnar (130 km)',
  'Morning drive to Munnar through lush green valleys. Visit Cheeyappara and Valara Waterfalls en route. Afternoon explore tea gardens. Visit Tea Museum. Overnight in Munnar.',
  ARRAY['Breakfast', 'Dinner'], 'Resort in Munnar'
FROM packages p WHERE p.slug = 'kerala-backwaters-munnar';

INSERT INTO itineraries (package_id, day_number, title, description, meals, accommodation)
SELECT p.id, 3, 'Munnar Sightseeing',
  'Full day — Mattupetty Dam, Echo Point, Kundala Lake, Top Station. Evening at Munnar town market.',
  ARRAY['Breakfast', 'Dinner'], 'Resort in Munnar'
FROM packages p WHERE p.slug = 'kerala-backwaters-munnar';

INSERT INTO itineraries (package_id, day_number, title, description, meals, accommodation)
SELECT p.id, 4, 'Munnar to Alleppey via Houseboat',
  'Drive to Alleppey. Check into houseboat by noon. Cruise through serene backwaters, paddy fields and fishing villages. Dinner and overnight on houseboat.',
  ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Premium Houseboat'
FROM packages p WHERE p.slug = 'kerala-backwaters-munnar';

INSERT INTO itineraries (package_id, day_number, title, description, meals, accommodation)
SELECT p.id, 5, 'Alleppey to Kovalam',
  'Morning disembark from houseboat. Drive to Kovalam beach resort. Evening free at Kovalam beach. Overnight in Kovalam.',
  ARRAY['Breakfast', 'Dinner'], 'Beach Resort in Kovalam'
FROM packages p WHERE p.slug = 'kerala-backwaters-munnar';

INSERT INTO itineraries (package_id, day_number, title, description, meals, accommodation)
SELECT p.id, 6, 'Departure from Trivandrum',
  'Morning at leisure at beach. After breakfast, transfer to Trivandrum airport/railway station for your onward journey.',
  ARRAY['Breakfast'], ''
FROM packages p WHERE p.slug = 'kerala-backwaters-munnar';

-- ── FIXED DEPARTURES ──────────────────────────────────────────
INSERT INTO fixed_departures (package_id, departure_date, return_date, price_per_person, available_seats, total_seats, status)
SELECT p.id, '2024-06-15', '2024-06-22', 28999, 8, 16, 'limited'
FROM packages p WHERE p.slug = 'manali-spiti-valley';

INSERT INTO fixed_departures (package_id, departure_date, return_date, price_per_person, available_seats, total_seats, status)
SELECT p.id, '2024-05-20', '2024-06-05', 35999, 14, 20, 'available'
FROM packages p WHERE p.slug = 'rajasthan-royal-heritage';

INSERT INTO fixed_departures (package_id, departure_date, return_date, price_per_person, available_seats, total_seats, status)
SELECT p.id, '2024-07-10', '2024-07-17', 54999, 4, 20, 'limited'
FROM packages p WHERE p.slug = 'bali-romance-adventure';

INSERT INTO fixed_departures (package_id, departure_date, return_date, price_per_person, available_seats, total_seats, status)
SELECT p.id, '2024-08-01', '2024-08-10', 22999, 12, 16, 'available'
FROM packages p WHERE p.slug = 'manali-spiti-valley';

-- ── TESTIMONIALS ──────────────────────────────────────────────
INSERT INTO testimonials (name, location, avatar, rating, review, destination, travel_date, verified, featured, sort_order) VALUES
('Priya Sharma', 'Mumbai', 'https://images.unsplash.com/photo-1494790108755-2616b6b38e9f?w=150&q=80', 5,
 'Our Kerala honeymoon was absolutely magical! Travel Holiday took care of every detail — from the houseboat to the Munnar sunrise. Incredibly responsive team.',
 'Kerala', 'December 2023', true, true, 1),
('Rajesh Kumar', 'Delhi', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', 5,
 'The Rajasthan tour package was exceptional. We visited 6 cities in 8 days and the arrangements were seamless. Hotel quality was top-notch!',
 'Rajasthan', 'November 2023', true, true, 2),
('Anita Patel', 'Ahmedabad', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80', 5,
 'Bali with Travel Holiday was a dream come true! Every resort, every activity was perfectly planned. They even arranged a surprise anniversary dinner!',
 'Bali', 'January 2024', true, true, 3),
('Suresh Menon', 'Bangalore', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80', 4,
 'The Manali-Spiti trek was challenging and beautiful. Travel Holiday''s support team was available 24/7. Excellent arrangements for remote locations.',
 'Himachal Pradesh', 'August 2023', true, true, 4),
('Deepika Nair', 'Kochi', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80', 5,
 'Absolutely loved the Thailand package. Bangkok, Chiang Mai and Phuket — all covered perfectly. Premium accommodations and great food recommendations!',
 'Thailand', 'February 2024', true, true, 5),
('Arun Verma', 'Pune', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80', 5,
 'Third trip booked through Travel Holiday and it keeps getting better! The Andaman package was phenomenal. Havelock Island snorkelling was once in a lifetime.',
 'Andaman', 'March 2024', true, true, 6);

-- ── GALLERY ───────────────────────────────────────────────────
INSERT INTO gallery (url, alt, destination, category, featured, sort_order) VALUES
('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', 'Kerala Backwaters', 'Kerala', 'landscape', true, 1),
('https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80', 'Jaisalmer Fort', 'Rajasthan', 'heritage', true, 2),
('https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', 'Bali Temple', 'Bali', 'culture', true, 3),
('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', 'Himalayan Peaks', 'Himachal Pradesh', 'adventure', true, 4),
('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', 'Dubai Skyline', 'Dubai', 'city', true, 5),
('https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=600&q=80', 'Andaman Beach', 'Andaman', 'beach', true, 6),
('https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80', 'Thailand Temple', 'Thailand', 'culture', true, 7),
('https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', 'Singapore Gardens', 'Singapore', 'city', true, 8),
('https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', 'Maldives Overwater', 'Maldives', 'beach', true, 9),
('https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80', 'Swiss Alps', 'Switzerland', 'landscape', true, 10),
('https://images.unsplash.com/photo-1566402441996-3e6a33b77b1f?w=600&q=80', 'Kashmir Valley', 'Kashmir', 'landscape', true, 11),
('https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&q=80', 'Goa Beach', 'Goa', 'beach', true, 12);

-- ── FAQs ──────────────────────────────────────────────────────
INSERT INTO faq (question, answer, category, sort_order) VALUES
('How do I book a tour package?',
 'You can book a tour package by filling out our inquiry form on the package page, calling our helpline, or visiting our office. Our travel experts will contact you within 2-4 hours to confirm availability and finalize your booking.',
 'Booking', 1),
('What documents are required for international tours?',
 'For international tours, you need a valid passport (6 months validity beyond travel date), valid visa for the destination country, travel insurance, and original ID proof. Our team will guide you through specific requirements for your destination.',
 'Documents', 2),
('What is your cancellation policy?',
 'Cancellations made 30+ days before departure receive 90% refund. 15-30 days: 50% refund. 7-15 days: 25% refund. Less than 7 days: no refund. For full details, visit our Cancellation Policy page.',
 'Policy', 3),
('Are the tour prices per person or for a group?',
 'All our tour prices displayed are per person based on twin/double sharing. Single supplement charges apply for private rooms. Group discounts available for 8+ people.',
 'Pricing', 4),
('Do you provide travel insurance?',
 'We strongly recommend travel insurance for all tours. We can arrange comprehensive coverage including medical emergencies, trip cancellation, and baggage loss at competitive rates.',
 'Services', 5),
('Can I customize my tour package?',
 'Absolutely! We specialize in customized holidays. You can modify hotel categories, add/remove destinations, change activities, and adjust duration. Contact our team to start planning.',
 'Customization', 6),
('What is included in the tour price?',
 'Generally our packages include accommodation, meals as specified, transportation, sightseeing, and tour guide. Flights, visa fees, travel insurance, and personal expenses are usually excluded unless specifically mentioned.',
 'Pricing', 7),
('How safe are your tours for solo female travelers?',
 'Safety is our top priority. We have dedicated female tour leaders for women-only groups, vetted accommodations, 24/7 helpline support, and comprehensive safety briefings.',
 'Safety', 8);

-- ── SETTINGS ──────────────────────────────────────────────────
INSERT INTO settings (key, value, type, label, group_name) VALUES
('site_name', 'Travel Holiday', 'text', 'Company Name', 'General'),
('tagline', 'Crafting Extraordinary Journeys', 'text', 'Tagline', 'General'),
('description', 'Travel Holiday — India''s most trusted travel partner from Jetpur, Gujarat.', 'text', 'Description', 'General'),
('address', 'Jetpur, Gujarat, India', 'text', 'Address', 'General'),
('phone', '+91 8108101218', 'text', 'Phone', 'General'),
('whatsapp', '+91 81081 01218', 'text', 'WhatsApp', 'General'),
('email', 'Info.travelholydays@gmail.com', 'text', 'Email', 'General'),
('facebook', 'https://facebook.com/travelholiday', 'text', 'Facebook URL', 'Social'),
('instagram', 'https://instagram.com/travelholiday', 'text', 'Instagram URL', 'Social'),
('twitter', 'https://twitter.com/travelholiday', 'text', 'Twitter URL', 'Social'),
('youtube', 'https://youtube.com/@travelholiday', 'text', 'YouTube URL', 'Social'),
('meta_title', 'Travel Holiday - Crafting Extraordinary Journeys', 'text', 'Meta Title', 'SEO'),
('meta_description', 'Explore handcrafted tour packages across India and world. Book your dream holiday with Travel Holiday, Jetpur, Gujarat.', 'text', 'Meta Description', 'SEO'),
('og_image', '', 'image', 'OG Image URL', 'SEO');
