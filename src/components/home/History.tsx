"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";
import DownloadBtn from "../common/DownloadBtn";

const Img = ({ inView, img }: { inView: boolean; img: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
      className="sticky top-0 md:top-20 left-0 z-10 order-2 lg:order-1 hidden md:flex justify-center lg:justify-start"
    >
      {inView && (
        <div className="absolute inset-0 md:hidden bg-white/80 "></div>
      )}
      <Image
        src={img}
        alt=""
        width={500}
        height={500}
        className="w-full h-full md:h-[85vh] object-contain"
      />
    </motion.div>
  );
};

export default function History() {
  const firstpara = useRef<HTMLDivElement | null>(null);
  const secondpara = useRef<HTMLDivElement | null>(null);

  const inViewFirst = useInView(firstpara);
  const inViewSecond = useInView(secondpara);

  return (
    <section className="bg-blue-50">
      <div className="2xl:container lg:p-12">
        <div className="flex relative flex-col md:grid md:grid-cols-2 mt-10 mb-6 md:gap-10 md:min-h-screen">
          <div className="absolute md:sticky inset-0 left-0 z-20">
            {inViewFirst && (
              <Img inView={inViewFirst} img="/home/history2.jpg" />
            )}
            {inViewSecond && !inViewFirst && (
              <Img inView={inViewSecond} img="/home/history.jpg" />
            )}
          </div>

          <div className=" flex-1 order-1 lg:order-2 overflow-hidden">
            <div ref={firstpara}>
              <h1 className="text-4xl leading-9  pt-2 relative z-40  lg:text-5xl font-bold text-center lg:text-left text-black">
                इतिहास {/* History */}
              </h1>
              <p className="mt-12 text-lg lg:text-2xl text-justify  relative z-40 text-black  lg:text-left p-4">
                अत्रि गोत्रीय ठाडाराई अधिकारीको उत्पत्ति स्थल कहाँ हो, कहाँ,
                कहाँ, कसरी फैलिन पुगे। ठाडाराई अधिकारी नाम कसरी रहन गयो ।
                ठाडाराई अधिकारीको संख्या कहाँ कति कति छ भन्ने कुरा खोजी गर्न
                कोटीहवन सुरुङ्गा झापामा २०५० सालमा डम्बर बहादुर अधिकारीको
                नेतृत्वमा बंशावली खोजबिन समिति नामको संस्था दर्ता गरी २ वर्ष
                लगातार पुराण लगाई बंशावली संकलन कार्य शुरु गरियो ।
                <br />
                विविध कारणले यसलाई निरन्तरता दिन सकिएन । २०६७ साल फाल्गुण ८ गते
                पुनः ठाडाराई अधिकारी सेवा समाज नामक संस्था दर्ता गरी कोटीहवन
                सुरुङ्गा झापामा ठाडाराई अधिकारी कुञ्ज नामक आफ्नै भवन निर्माण गरी
                सो कार्यलाई निरन्तरता दिंदै आइएको छ । प्रत्येक वर्ष कोटीहवन
                सुरुङ्गा झापामा पुराण लगाई आपसी चिनजानलाई नविकरण गर्दै बंशावली
                संकलन कार्यलाई निरन्तरता दिइएको छ ।
                <br />
                बंशावली संकलन र कल्याणकारी कार्य गर्ने उद्देश्यको लागि
                काठमाडौंमा ठाडाराई अधिकारी राष्ट्रिय मञ्च नामको संस्था समेत गठन
                गरी तदारुकताको साथ कार्य भई रहेको छ । यस कार्यलाई सफलताको साथ
                पुरा गर्न सबै ठाडाराई अधिकारी बन्धु एवम् ठाडाराई अधिकारीले
                नियमानुसार दर्ता गरी स्थापना गरेका जुनसुकै नामका संस्था वा
                व्यक्तिको कर्तव्य रहेको छ ।
              </p>
            </div>

            <div ref={secondpara}>
              <h1 className="text-4xl mt-12  text-black z-40 relative lg:text-5xl font-bold text-center lg:text-left">
                {/* History II */}
              </h1>
              <p className="thirdpara mt-12 text-lg lg:text-3xl text-justify  relative z-40 text-black  lg:text-left p-4">
                बंशावली संकलन र कल्याणकारी कार्य गर्ने उद्देश्यको लागि
                काठमाडौंमा ठाडाराई अधिकारी राष्ट्रिय मञ्च नामको संस्था समेत गठन
                गरी तदारुकताको साथ कार्य भई रहेको छ । यस कार्यलाई सफलताको साथ
                पुरा गर्न सबै ठाडाराई अधिकारी बन्धु एवम् ठाडाराई अधिकारीले
                नियमानुसार दर्ता गरी स्थापना गरेका जुनसुकै नामका संस्था वा
                व्यक्तिको कर्तव्य रहेको छ ।
                <br />
                यसैले हाल सम्म लम्जुङ्ग बाट धादिङ्ग, धादिङ्ग बाट रामेछाप हुँदै
                खोटाङ्ग र खोटाङ्ग बाट हंशराज र बंशराज मध्ये हंशराज चैनपुर
                संखुवासभामा आएर बसेकाको विवरण तयार गरी अन्य जिल्लाका सँग जोड्नु
                अति आवश्यक रहेको छ । उध्दव र आदब नै पूर्व आएका मुल बंश हुन्
                भन्ने पनि भनाई छ । यसैले हंशराज र बंशराजका सन्ततिको विवरण तयार
                गर्न आवश्यक छ । यदि पूर्व बाट यसरी जोड्न सकिन्छ भने अन्य जिल्ला
                सँग पनि विशेषज्ञ बसी जोड्दै जान सकिन्छ । २०७५ साल देखि वेभ साइट
                तयार गरी सफ्टवेयर बनाई यो कार्यलाई निरन्तरता दिने जमर्को गरिएको
                हो । तर चिताए अनुसार प्रभावकारी भएन । यसैले राष्ट्रिय मञ्चलाई
                नामावली संकलन गरी भाद्र असोज भित्र समावेश गर्न आवश्यक भएकोले
                पुनः सफ्टवेयरमा नाम राख्न झापामा शुरु गरिएको छ । यसर्थ सम्पर्क
                गरेर नाम समावेश गर्न अनुरोध छ ।
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-fit ml-auto items-center gap-4 pr-2">
          <DownloadIcon size={20} />
          <DownloadBtn>Download</DownloadBtn>
        </div>
      </div>
    </section>
  );
}
