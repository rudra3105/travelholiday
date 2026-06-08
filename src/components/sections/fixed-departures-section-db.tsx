import { FixedDeparturesSection } from "./fixed-departures-section";
import { getFixedDepartures } from "@/lib/db";
import { FIXED_DEPARTURES_DATA } from "@/lib/data";

export async function FixedDeparturesSectionDB() {
  let departures = FIXED_DEPARTURES_DATA;

  try {
    const dbDeps = await getFixedDepartures();
    if (dbDeps && dbDeps.length > 0) {
      departures = dbDeps.slice(0, 4).map((d: any) => ({
        id: d.id,
        package_title: d.packages?.title || "Tour Package",
        destination: d.packages?.destinations?.name || "India",
        cover_image: d.packages?.cover_image || FIXED_DEPARTURES_DATA[0].cover_image,
        departure_date: d.departure_date,
        return_date: d.return_date,
        duration_days: Math.ceil(
          (new Date(d.return_date).getTime() - new Date(d.departure_date).getTime()) / (1000 * 60 * 60 * 24)
        ) + 1,
        price_per_person: d.price_per_person,
        available_seats: d.available_seats,
        total_seats: d.total_seats,
        status: d.status,
        slug: d.packages?.slug || "package",
      }));
    }
  } catch {
    // Use static fallback
  }

  return <FixedDeparturesSection departures={departures} />;
}
