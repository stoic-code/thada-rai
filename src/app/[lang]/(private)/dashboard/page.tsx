import React from "react";

import OurGallery from "@/components/dashboard/OurGallery";
import Statistics from "@/components/dashboard/Statistics";
import ContributorsList from "@/components/dashboard/ContributorsList";
import RecentAlekhs from "@/components/dashboard/RecentAlekhs";
import KulthanMandir from "@/components/dashboard/KulthanMandir";
import Overview from "@/components/dashboard/Overview";
import EventCarousel from "@/components/dashboard/EventCarousel";
import { BansajYogdans } from "@/components/dashboard/BansajYogdans";
import LiteratureDashboard from "@/components/Literature";

const Page = () => {
  return (
    <div>
      <EventCarousel />
      <section className="md:py-10 space-y-10 2xl:container px-4 sm:px-10">
        {/* STATISTICS */}

        {/* OVERVIEW */}
        <Overview />

        {/* OUR GALLERY */}
        <OurGallery />

        {/* CONTRIBUTIONS LIST */}
        <ContributorsList />

        {/* RECENT ALEKHS */}
        <RecentAlekhs />

        {/* RECENT YOGDAN */}
        <BansajYogdans />

        {/* RECENT YOGDAN */}
        <LiteratureDashboard />

        {/* KULTHAN MANDIR */}
        {/* <KulthanMandir /> */}
      </section>
    </div>
  );
};

export default Page;
