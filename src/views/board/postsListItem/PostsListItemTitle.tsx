import { Text } from '@chakra-ui/react'

const PostsListItemTitle = ({ post }) => {
  return (
    <Text fontSize={'20px'} fontWeight={'bold'}>
      {post?.title}
    </Text>
  )
}

export default PostsListItemTitle
