import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heading, Text } from '@chakra-ui/react'

const EmptyPost = () => {
  const [animationOn, setAnimationOn] = useState(true)

  // Function to toggle the animation
  const toggleAnimation = () => {
    setAnimationOn((prev) => !prev)
  }

  useEffect(() => {
    //toggleAnimation()
    // Start the animation initially
    // const animationInterval = setInterval(() => {
    //   toggleAnimation()
    // }, 3000) // Repeat every 2 seconds (2000 milliseconds)
    // Clean up the interval on component unmount
    //return () => clearInterval(animationInterval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }} // Initial state
      animate={animationOn ? { opacity: 1, filter: 'blur(0px)' } : {}} // Final state when animationOn is true
      transition={{ duration: 2 }} // Animation duration
    >
      <Text fontFamily={'Miraero'} fontSize="48px" color={'#a70000'}>
        여기엔 아무것도 없다.
      </Text>
    </motion.div>
  )
}

export default EmptyPost
