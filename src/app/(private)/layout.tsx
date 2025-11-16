import { PropsWithChildren } from "react";
import { Layout } from "@/shared";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return <Layout>{children}</Layout>;
}
