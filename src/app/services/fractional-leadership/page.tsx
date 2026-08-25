import type { Metadata } from "next";
import { pageMetadata } from "@/content/metadata";
import Service2FractionalLeadership from "@/components/services/Service2FractionalLeadership";

// Spec 4.2. Title and description are written for a human, not stuffed, and
// sized to the roughly 55 and 155 characters spec 4.5 asks for.
export const metadata: Metadata = pageMetadata("fractional");

export default function Page() {
  return <Service2FractionalLeadership />;
}
