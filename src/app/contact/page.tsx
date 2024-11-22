'use client';
import PageSkeleton from "@/components/PageSkeleton";
import { contactData } from "@/modules/ContactData";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const accentColor = "#28a7db";
const secondaryColor = "#7F1D1D";

export default function Contact() {
  const intro = contactData[0];
  const contacts = contactData.slice(1);

  return (
    <PageSkeleton title="Contact Us" showLine lineColor={accentColor}>
      <motion.div
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <p className="mb-4 text-base leading-relaxed text-gray-700">
          {intro.body}
        </p>
      </motion.div>

      <div className="space-y-6">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            // initial={{ opacity: 0, x: -10 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.4, delay: 0.2 * index, ease: "easeOut" }}
            className="border-l-4 border-[#28a7db] p-5 bg-white transition-shadow duration-300 ease-in-out flex items-start space-x-4"
          >
            <img
              src={contact.image}
              alt={`${contact.name}'s avatar`}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0 self-center"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
              <p className="text-sm text-gray-500 mb-1">
                {contact.position}
                {contact.institution && `, ${contact.institution}`}
              </p>
              <div className="flex items-center text-blue-600 space-x-2">
                <FaEnvelope />
                <a href={`mailto:${contact.email}`} className="hover:underline text-base">
                  {contact.email}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSkeleton>
  );
}
