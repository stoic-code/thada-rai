"use client";
import PageLoadingUI from "@/components/PageLoadingUI";
import ContributionDialog from "@/components/contributions/ContributionDialog";
import EventCard from "@/components/contributions/EventCard";
import { Button } from "@/components/ui/button";
import { useGetEvent, useGetEvents } from "@/hooks/query/events.query";
import { Calendar, Clock, MapPin, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

// const mockdata = {
//   id: 4,
//   imgurl: "/dashboard/temple7.jpg",
//   organizedBy: "गोदार थापा सेवा समाज दमक",

//   name: "भवन निर्माण",
//   description:
//     "संगठनले निर्माण गर्ने घरलाई सम्बन्धित समुदायको लाभका लागि एक महत्वपूर्ण पहल हो। यो घर निर्माणको प्रक्रियामा स्थानीय समुदायको सहयोग र सहभागिता हो, जसले समुदायको आत्मसाथीकरण र समृद्धिको नीतिका बाट यथार्थ फाइदा उठाउँछ। यो घर संगठनको गतिविधिहरूको ठेकेदार रूपमा कार्यरत गर्ने बजारीकरणको परिणाम हो,",
// };
export default function page() {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading } = useGetEvent(id as string);
  const { data: eventData, isLoading: eventsLoading } = useGetEvents();
  if (isLoading) return <PageLoadingUI />;
  return (
    <div className=" 2xl:container sm:px-4 py-8">
      <div className=" flex lg:flex-row flex-col gap-4">
        {/* SINGLE EVENTS DETAIL */}
        <div className="flex-1 space-y-4 bg-[#ECF5FB] border rounded-xl p-4 md:p-8">
          {/* TITLE AND ORGANIZER */}
          <div className=" space-y-2">
            <h2 className=" text-xl sm:text-4xl font-semibold">
              {data?.title}
            </h2>
            <div className=" flex items-center gap-1 font-medium  text-xs sm:text-base">
              <span>Organized By:</span>
              <p className="">{data?.organizer}</p>
            </div>
            {/* DATE LOCATION TIME */}
            <div className=" flex items-center gap-4 sm:gap-10 whitespace-nowrap">
              <span className=" flex  items-center gap-3 text-xs sm:text-sm">
                <Calendar size={16} />{" "}
                {String(new Date(data?.event_date).toLocaleDateString())}
              </span>
              <span className=" flex  items-center gap-3 text-xs sm:text-sm">
                <Clock size={16} /> {data?.event_time}
              </span>
              <span className=" flex  items-center gap-3 text-xs sm:text-sm">
                <MapPin size={16} /> {data?.event_location}
              </span>
            </div>
          </div>

          <div>
            <Image
              src={data?.image.secure_url}
              alt="temple"
              height={400}
              width={400}
              className=" w-full h-[50vh] object-cover rounded-lg"
            />
          </div>
          {/* DESCRIPTION */}
          <p>{data?.description}</p>
          <div className=" grid place-items-end">
            {/* <Button>Contribute</Button> */}
            <ContributionDialog
              accNo="0000000000"
              accName="Adhikari  Donation Account"
              bankName="Nabil Bank"
              imgurl="/contributions/qr.png"
            >
              <Button className="flex gap-2">
                <PlusCircleIcon /> Contribute
              </Button>
            </ContributionDialog>
          </div>
        </div>

        {/* EVETNS */}
        {eventData && (
          <div className=" space-y-4 pt-8 p-2">
            <h2 className=" text-2xl font-semibold">More Events</h2>
            <div className="flex max-w-[98vw] flex-row  pb-4 lg:flex-col gap-4 lg:max-h-[100vh] overflow-auto">
              {eventData &&
                eventData?.map((event: any, idx: number) => (
                  <div key={idx} className=" flex-shrink-0 w-[280px]">
                    <EventCard
                      id={event._id}
                      imgurl={event.image.secure_url}
                      name={event.title}
                      desc={event.description}
                      organizedBy={event.organizer}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
