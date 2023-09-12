import { Heading, Box, Button, Flex, Container, Text } from '@chakra-ui/react'
import MainSlider from './components/slider/mainSlider/MainSlider'
import ContentsSlider from '@views/home/components/slider/contentsSlider/ContentsSlider'
import Image from 'next/image'
import GridPosts from './components/MainContentsGrid'
import { useGetPosts } from '@hooks/queries/post/useGetPosts'

const Home = () => {
  //최근 게시물
  const { data: recentPosts, isLoading } = useGetPosts(null, null, 10)
  console.log('data = ', recentPosts)
  return (
    <Box width={'100%'}>
      <MainSlider posts={recentPosts.result.posts} />
      <Box mt="50px">{/* <ContentsSlider title="도시괴담" boardId={'1'} pageCount={10} /> */}</Box>
      <Box>{/* <ContentsSlider title="미스테리/오컬트" boardId={'2'} pageCount={10} /> */}</Box>

      {/* <GridPosts /> */}
    </Box>
  )
}

export default Home
