import { Heading, Box, Button, Flex, Container, Text } from '@chakra-ui/react'
import MainSlider from './components/slider/mainSlider/MainSlider'
import ContentsSlider from '@views/home/components/slider/contentsSlider/ContentsSlider'
import Image from 'next/image'
import GridPosts from './components/MainContentsGrid'

const Home = () => {
  return (
    <Box width={'100%'}>
      <MainSlider />
      <Box>
        <ContentsSlider title="최근게시물" />
      </Box>
      <Box>
        <ContentsSlider title="유투버" />
      </Box>
      <GridPosts />
    </Box>
  )
}

export default Home
