import Index from "@/components/Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProteinBind: a leading research platform for chemistry research",
  description: "Chemistry Research Platform",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Index />
      </DefaultLayout>
    </>
  );
}
