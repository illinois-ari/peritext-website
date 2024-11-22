"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import {
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaEnvelope,
  FaDatabase,
} from "react-icons/fa";

const pages = [
  {
    label: "Home",
    path: "/",
    backgroundColor: "#fffbed", // Pastel yellow
    accentColor: "#FF3E30", // Bright, warm red
    secondaryColor: "#FFC107", // Deep amber
    Icon: FaHome,
  },
  {
    label: "About",
    path: "/about",
    backgroundColor: "#f6eeff", // Pastel lavender
    accentColor: "#36aa5d", // Fresh green
    secondaryColor: "#6B21A8", // Deep purple
    Icon: FaInfoCircle,
  },
  {
    label: "Data",
    path: "/data",
    backgroundColor: "#e6f1ff", // Pastel blue
    accentColor: "#FF6347", // Coral
    secondaryColor: "#1E3A8A", // Deep blue
    Icon: FaDatabase,
  },
  {
    label: "Team",
    path: "/team",
    backgroundColor: "#e7f4e7", // Pastel green
    accentColor: "#8E44AD", // Royal purple
    secondaryColor: "#14532D", // Deep forest green
    Icon: FaUsers,
  },
  {
    label: "Contact",
    path: "/contact",
    backgroundColor: "#fce2e2", // Pastel red
    accentColor: "#28a7db", // Soft, bright blue
    secondaryColor: "#7F1D1D", // Deep burgundy red
    Icon: FaEnvelope,
  },
];

function Flipbook({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0); // Track which card is in the front
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const pathname = usePathname();

  // Determine the active page index based on the current path
  useEffect(() => {
    const index = pages.findIndex((page) => page.path === pathname);
    if (index !== -1) {
      setLoading(true); // Start loading when the pathname changes
      setTimeout(() => {
        setActiveIndex(index);
        setLoading(false); // Stop loading after the transition
      }, 5); // Simulate delay
    }
  }, [pathname]);

  const handleNavigation = (path: string, index: number) => {
    setLoading(true); // Start loading animation
    setActiveIndex(index);
    router.push(path); // Navigate to the selected path
  };

  // Get the background and accent colors of the active page
  const currentPage = pages[activeIndex];
  const backgroundColor = currentPage.backgroundColor;
  const accentColor = currentPage.accentColor;

  return (
    <motion.div
      className="w-screen h-screen flex justify-center items-center p-[1.5%] bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full h-full relative box-border"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          boxSizing: "border-box",
          backgroundColor, // Apply background color dynamically
        }}
      >
        {/* Menu */}
        <motion.div
          className="w-full py-4 px-6 flex justify-around items-center"
          initial={{ y: -5 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ backgroundColor }}
        >
          {pages.map((page, index) => {
            const IconComponent = page.Icon;
            return (
              <motion.div
                key={index}
                className={`flex items-center text-lg cursor-pointer gap-2 ${
                  pathname === page.path
                    ? `text-[${accentColor}] pointer-events-none`
                    : "text-black"
                }`}
                onClick={() => handleNavigation(page.path, index)}
                whileHover={pathname !== page.path ? { scale: 1.1 } : {}}
                whileTap={pathname !== page.path ? { scale: 0.95 } : {}}
                style={{
                  fontWeight: pathname === page.path ? "700" : "600",
                  color: pathname === page.path ? accentColor : "#637070",
                }}
              >
                <IconComponent size="1rem" /> {/* Icon for the page */}
                {page.label}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Page Content */}
        <motion.div
          className="w-full h-full overflow-y-auto"
          style={{
            height: "calc(100% - 4rem)", // Adjust for menu height
            overflowY: "auto",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {!loading && children ? (
            children // Renders the page content passed from layout
          ) : (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner />
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Flipbook;
