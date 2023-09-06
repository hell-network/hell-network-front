import { Flex } from '@chakra-ui/react'

const FlexCenter = ({ children, ...rest }) => {
  return (
    <Flex flexDirection={'column'} {...rest}>
      {children}
    </Flex>
  )
}

export default FlexCenter
