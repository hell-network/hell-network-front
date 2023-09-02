import { Box, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { popo } from '../data'

import { useGetPostsById } from '@hooks/queries/post/useGetPostById'
const TuiViewer = dynamic(() => import('@components/TuiViewer'), {
  loading: () => <p>Loading...</p>, // Component to render while loading
  ssr: false, // Disable server-side rendering
})

type PostViewProps = {
  id: string
}
const PostView = ({ id }: PostViewProps) => {
  const { data: postData, isLoading } = useGetPostsById(parseInt(id))
  return (
    <Box>
      <Heading textAlign={'center'} fontFamily="Nanum Myeongjo">
        {postData?.result?.title}
      </Heading>
      <Box width={'100%'} height="300px" position={'relative'}>
        <Image
          alt=""
          fill
          src={
            postData?.result?.imageUrl ??
            'https://images.unsplash.com/photo-1529938762753-914127886a7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80'
          }
        />
      </Box>
      <Box padding={'20px'}>
        <TuiViewer content={postData?.result?.content} />
      </Box>
    </Box>
  )
}
export default PostView
