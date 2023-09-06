import { Flex } from '@chakra-ui/react'

const FlexCenter = ({ children, ...rest }) => {
  return (
    <Flex justifyContent="center" alignItems="center" {...rest}>
      {children}
    </Flex>
  )
}

export default FlexCenter
