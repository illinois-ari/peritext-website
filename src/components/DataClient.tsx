'use client' // Ensures this is a Client Component

import { motion } from 'framer-motion'
import { FaTools, FaHammer } from 'react-icons/fa'
import { dataData } from '@/modules/DataData'

const secondaryColor = '#1E3A8A'

export default function DataClient() {
  const { body } = dataData[0]

  return (
    <>
      <motion.div>
        <p className="mb-8 text-gray-700 leading-relaxed">{body}</p>
      </motion.div>

      {/* In-progress indicator */}
      <motion.div className="h-[30vh] flex items-center justify-center space-x-4 mt-8">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FaTools size="2rem" color={secondaryColor} />
        </motion.div>
        <span className="text-lg font-medium">This page is under construction</span>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          <FaHammer size="2rem" color={secondaryColor} />
        </motion.div>
      </motion.div>
    </>
  )
}