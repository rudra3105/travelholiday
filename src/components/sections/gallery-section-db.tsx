import { GallerySection } from "./gallery-section";
import { getGalleryImages } from "@/lib/db";

export async function GallerySectionDB() {
  let images: any[] = [];

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
    // DB not configured yet
  }

  if (images.length === 0) return null;

  return <GallerySection images={images} />;
}
