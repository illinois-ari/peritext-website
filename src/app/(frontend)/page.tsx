"use client";
import { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import PageSkeleton from "@/components/PageSkeleton";
import { homeData } from "@/modules/HomeData";
import Bookshelf from "@/components/Bookshelf";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import SubHeading from "@/components/SubHeading";

const accentColor = "#FF3E30";
const secondaryColor = "#f4b700";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();

  const getDayWithSuffix = (day: number): string => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const dayWithSuffix = getDayWithSuffix(day);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${dayWithSuffix} ${month}, ${year}`;
};

export default function Home() {
  const [selectedUpdate, setSelectedUpdate] = useState<any | null>(null);
  const captionContent = homeData.find(
    (data) => data.type === "caption"
  )?.content;
  const updates = homeData.find((data) => data.type === "updates")?.updates;

  const handleReadMore = (update: any) => {
    setSelectedUpdate(update);
  };

  const handleBackToHome = () => {
    setSelectedUpdate(null);
  };

  useEffect(() => {
    if (!selectedUpdate) setSelectedUpdate(null);
  }, [selectedUpdate]);
  

  return (
    <PageSkeleton title="">
      {!selectedUpdate && (
        // <motion.div
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   transition={{ duration: 0.6 }}
        // >
        <Bookshelf />
        // </motion.div>
      )}

      {selectedUpdate ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <motion.div
            className="flex flex-col items-start space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button
              className="flex items-center justify-center text-xs font-bold text-white px-3 py-2 rounded-md"
              style={{ backgroundColor: secondaryColor }}
              onClick={handleBackToHome}
            >
              <FaArrowLeft className="mr-2" />
              Back to Home
            </button>

            <Heading text={selectedUpdate.title} color="black" />
          </motion.div>

          <motion.div
            className="flex items-center space-x-4 text-gray-600 mb-8 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-500" />
              <p>{selectedUpdate.author}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-500" />
              <p>{formatDate(selectedUpdate.datePosted)}</p>
            </div>
          </motion.div>

          {selectedUpdate.longDescription.map((section: any, index: number) => (
            <motion.p
              key={index}
              className="mb-6 text-base leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {section.content}
            </motion.p>
          ))}
        </motion.div>
      ) : (
        <>
          {/* Render caption */}
          {captionContent && (
            <motion.div
              className="text-xl font-openSans font-normal leading-relaxed text-gray-700 tracking-wide"
              // initial={{ x: -100, opacity: 0 }}
              // animate={{ x: 0, opacity: 1 }}
              // transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {captionContent.map((part, index) =>
                typeof part === "string" ? (
                  <span key={index}>{part}</span>
                ) : (
                  <a
                    key={index}
                    href={part.url}
                    target="_blank"
                    className="font-bold underline"
                    style={{
                      textDecorationColor: secondaryColor,
                      textUnderlineOffset: "0.25rem",
                      textDecorationThickness: "0.25rem",
                    }}
                  >
                    {part.text}
                  </a>
                )
              )}
            </motion.div>
          )}

          <p
            className="text-2xl mt-10 mb-2 font-playfairDisplay text-gray-600 font-bold"
            style={{
              // color: secondaryColor,
              textDecorationColor: secondaryColor,
              textUnderlineOffset: "0.25rem",
              textDecorationThickness: "0.125rem",
            }}
          >
            Latest Updates
          </p>

          {/* <hr
            className="my-1"
            style={{
              width: "2.5%",
              borderBottom: `${0.25}rem solid ${accentColor}`,
            }}
          /> */}
          {/* <motion.div className="mt-12">
            <SubHeading text="Latest Updates" color={secondaryColor} />
          </motion.div> */}

          {/* Render updates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {updates?.map((update: any, index: number) => (
              <motion.div
                key={update.title}
                className="mb-6 p-6 rounded-md bg-[color:var(--card-bg-color)] shadow-lg hover:shadow-2xl transition-shadow duration-500 ease-in-out"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
              >
                <h3
                  className="text-lg font-bold cursor-pointer relative hover:underline"
                  onClick={() => handleReadMore(update)}
                  style={{
                    color: accentColor,
                    textDecorationColor: accentColor,
                    textUnderlineOffset: "0.2rem",
                    textDecorationThickness: "0.15rem",
                  }}
                >
                  {update.title}
                </h3>
                <div className="flex items-center space-x-4 text-gray-600 mt-2">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-500" />
                    <p>{update.author}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-gray-500" />
                    <p>{formatDate(update.datePosted)}</p>
                  </div>
                </div>
                <p className="mt-2">{update.shortDescription}</p>
                <button
                  className="mt-4 px-4 py-2 text-sm font-semibold rounded-md text-white hover:scale-105"
                  style={{
                    backgroundColor: secondaryColor,
                    textDecoration: "none",
                  }}
                  onClick={() => handleReadMore(update)}
                >
                  Read More
                </button>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </PageSkeleton>
  );
}