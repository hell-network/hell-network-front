import { Flex } from '@chakra-ui/react'

const FlexColumn = ({ children, ...rest }) => {
  return (
    <Flex flexDirection={'column'} {...rest}>
      {children}
    </Flex>
  )
}

export default FlexColumn
