import { Text } from '@chakra-ui/react'

const PostsListItemContent = ({ post }) => {
  return (
    <Text
      isTruncated
      maxWidth="300px" // Adjust as needed
    >
      {post?.content}
    </Text>
  )
}
export default PostsListItemContent
