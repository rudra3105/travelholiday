import { GallerySection } from "./gallery-section";
import { getGalleryImages } from "@/lib/db";
import { GALLERY_DATA } from "@/lib/data";

export async function GallerySectionDB() {
  let images = GALLERY_DATA;

  try {
    const dbImages = await getGalleryImages(undefined, 12);
    if (dbImages && dbImages.length > 0) {
      images = dbImages.map((img: any) => ({
        url: img.url,
        alt: img.alt,
        destination: img.destination || "",
        cols: 1,
        rows: 1,
      }));
    }
  } catch {
    // Use static fallback
  }

  return <GallerySection images={images} />;
}
