import { Box, Flex } from '@chakra-ui/react'

const PostsListItemTag = ({ post }) => {
  return (
    <Flex paddingTop={'5px'}>
      <Flex as="ul" gap="1rem" listStyleType={'none'}>
        <Box as="li">#실화</Box>
        <Box as="li">#사건</Box>
        <Box as="li">#트랜드</Box>
      </Flex>
    </Flex>
  )
}
export default PostsListItemTag
