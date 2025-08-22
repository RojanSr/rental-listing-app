import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  )
}
