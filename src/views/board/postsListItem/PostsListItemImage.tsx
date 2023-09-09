import { Flex } from '@chakra-ui/react'
import Image from 'next/image'

const PostsListItemImage = ({ post }) => {
  return (
    <Flex width={'72px'} height={'72px'} flexBasis={'72px'} flexGrow="0" flexShrink="0">
      <Image
        alt=""
        sizes="72px"
        src="https://images.unsplash.com/photo-1529938762753-914127886a7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80"
        width={72}
        height={72}
      />
    </Flex>
  )
}

export default PostsListItemImage
