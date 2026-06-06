import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPackageBySlug, getPackages, getSiteSettings } from "@/lib/db";
import { PackageDetailClient } from "@/components/sections/package-detail-client";
import { SITE_CONFIG } from "@/lib/constants";

// Next.js 15+: params is a Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [pkg, settings] = await Promise.all([getPackageBySlug(slug), getSiteSettings()]);
  const config = { ...SITE_CONFIG, ...settings } as any;

  if (!pkg) return { title: "Package Not Found" };
  return {
    title: `${pkg.title} | ${config.site_name || config.name}`,
    description: pkg.short_description,
    openGraph: {
      title: pkg.title,
      description: pkg.short_description,
      images: [pkg.cover_image],
    },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const [pkg, settings] = await Promise.all([getPackageBySlug(slug), getSiteSettings()]);
  const config = { ...SITE_CONFIG, ...settings } as any;

  if (!pkg) notFound();
  
  return <PackageDetailClient slug={slug} defaultPkg={pkg} config={config} />;
}
