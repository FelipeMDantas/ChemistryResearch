import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protein Bind: a leading research platform for chemistry research",
  description: "Chemistry Research Platform",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <p>Default Layout</p>
      </DefaultLayout>
    </>
  );
}
