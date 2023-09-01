import { Box, Container, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

const ContentSliderItem = ({ item }) => {
  return (
    <Box margin="10px" position={'relative'} boxShadow={'base'}>
      <Flex
        width={'100%'}
        height="140px"
        position={'relative'}
        justifyContent={'center'}
        alignItems={'center'}
        // maxWidth={'197px'}
      >
        <img
          src="https://images.unsplash.com/photo-1529938762753-914127886a7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80"
          alt=""
          style={{ top: '0', width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: -1 }}
        />
        <Box background={'black'} padding="10px" boxShadow={'dark-lg'}>
          <Text color={'whitesmoke'}>{'타이틀'}</Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default ContentSliderItem
