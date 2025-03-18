"use client";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const accentColor = "#28a7db";

type ContactPageType = {
  body: string;
  contacts: {
    name: string;
    position: string;
    institution?: string;
    email: string;
    image: string;
  }[];
};

export default function ContactClient({ contactPage }: { contactPage: ContactPageType }) {
  return (
    <>
      <motion.div className="mb-8">
        <p className="mb-4 text-base leading-relaxed text-gray-700">
          {contactPage.body}
        </p>
      </motion.div>

      <div className="space-y-6">
        {contactPage.contacts.map((contact, index) => (
          <motion.div
            key={index}
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
    </>
  );
}