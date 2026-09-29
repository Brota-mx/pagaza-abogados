import type { ResolvingMetadata } from "next";
import { ServicioPage } from "@/components/sections/ServicioPage";
import { getServicio } from "@/content/servicios-seo";
import type { Locale } from "@/content/types";
import { generateServicioMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
) {
  const { locale } = await params;
  return generateServicioMetadata(
    getServicio("creditos-fiscales"),
    locale as Locale,
    parent,
  );
}

export default function Page({ params }: Props) {
  return <ServicioPage id="creditos-fiscales" params={params} />;
}
