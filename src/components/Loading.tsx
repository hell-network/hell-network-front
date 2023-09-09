import { Box, keyframes, chakra, HTMLChakraProps } from '@chakra-ui/react'
import React from 'react'

interface LoadingSpinnerOwnProps {
  size?: number
  animationDelay?: string
}

type LoadingSpinnerProps = LoadingSpinnerOwnProps & HTMLChakraProps<'div'>

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerItem = ({ size, ...rest }: LoadingSpinnerProps) => (
  <Box
    boxSizing="border-box"
    display="block"
    position="absolute"
    width={`${size ? size - 16 : 64}px`} // default to 64px if size is not provided
    height={`${size ? size - 16 : 64}px`} // same as above
    margin="4px"
    border="4px solid #fff"
    borderColor="hsla(0, 0%, 62%, 1) transparent transparent transparent"
    borderRadius="50%"
    animation={`${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`}
    {...rest}
  />
)

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 80, ...props }) => {
  return (
    <Box position="relative" width={`${size}px`} height={`${size}px`} {...props}>
      <SpinnerItem size={size} animationDelay="-0.45s" />
      <SpinnerItem size={size} animationDelay="-0.3s" />
      <SpinnerItem size={size} animationDelay="-0.15s" />
    </Box>
  )
}

export default LoadingSpinner
