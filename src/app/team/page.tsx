import { client } from "@/tina/__generated__/client";
import {client} from '../../../tina/__generated__/config.prebuild'
import PageSkeleton from "@/components/PageSkeleton";
import SubHeading from "@/components/SubHeading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const accentColor = "#8E44AD";
const secondaryColor = "#14532D";

// ✅ Fetch team content at build time
export async function getStaticProps() {
  const teamsResponse = await client.queries.teamsConnection(); // Get all teams
  const teams = teamsResponse.data.teamsConnection.edges.map((team) => team.node);

  return {
    props: { teams },
  };
}

export default function Team({ teams }) {
  return (
    <PageSkeleton title="Meet the Team" showLine lineColor={accentColor}>
      {teams.map((team) => (
        <div key={team.teamId} className="mb-[7.5rem]">
          <SubHeading text={team.title} color={secondaryColor} />

          {team.members.map((member, memberIndex) => {
            const isOddIndex = memberIndex % 2 === 0;

            const slideInVariants = {
              hidden: {
                x: isOddIndex ? "-100%" : "100%",
                opacity: 0,
              },
              visible: {
                x: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.6,
                },
              },
            };

            const ref = useRef(null);
            const isInView = useInView(ref, { once: true });

            return (
              <div
                ref={ref}
                key={member.memberId}
                className={`flex flex-col md:flex-row mb-8 w-full ${
                  isOddIndex ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:space-x-2`}
              >
                <motion.div
                  className={`flex-shrink-0 w-full md:w-48 ${
                    isOddIndex ? "md:mr-6" : "md:ml-6"
                  }`}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={slideInVariants}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full object-cover"
                  />
                </motion.div>

                <motion.div
                  className={`flex-grow ${
                    isOddIndex ? "text-left" : "text-right"
                  }`}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={slideInVariants}
                >
                  <a
                    href={member.social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-2xl font-bold mb-4 ${
                      isOddIndex ? "text-left" : "text-right"
                    } hover:underline`}
                    style={{ color: accentColor }}
                  >
                    {member.name}
                  </a>
                  {member.description.map((paragraph, i) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      ))}
    </PageSkeleton>
  );
}