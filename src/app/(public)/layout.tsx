import { PropsWithChildren } from "react";
import { Layout } from "@/shared";

export default function PublicLayout({ children }: PropsWithChildren) {
  return <Layout>{children}</Layout>;
}
