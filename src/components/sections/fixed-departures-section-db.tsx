import { FixedDeparturesSection } from "./fixed-departures-section";
import { getFixedDepartures } from "@/lib/db";

export async function FixedDeparturesSectionDB() {
  try {
    const dbDeps = await getFixedDepartures();
    
    if (!dbDeps || dbDeps.length === 0) {
      return null;
    }

    const departures = dbDeps.slice(0, 4).map((d: any) => ({
      id: d.id,
      package_title: d.packages?.title || "Tour Package",
      destination: d.packages?.destinations?.name || "India",
      cover_image: d.packages?.cover_image || "",
      departure_date: d.departure_date,
      return_date: d.return_date,
      duration_days: d.packages?.duration_days || Math.ceil(
        (new Date(d.return_date).getTime() - new Date(d.departure_date).getTime()) / (1000 * 60 * 60 * 24)
      ) + 1,
      price_per_person: d.price_per_person,
      available_seats: d.available_seats,
      total_seats: d.total_seats,
      status: d.status,
      slug: d.packages?.slug || "package",
    }));

    return <FixedDeparturesSection departures={departures} />;
  } catch (error) {
    console.error("Error loading fixed departures:", error);
    return null;
  }
}
