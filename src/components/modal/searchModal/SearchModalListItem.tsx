import { Badge } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/react'
import SafeLink from '@components/SafeLink'
import { truncateAfterLastDash } from '@utils/convert'
import { Post } from '@api/post/types'
import useGetFindBoard from '@hooks/useGetFindBoard'

type SearchModalListItemProps = {
  post: Post
}

const SearchModalListItem = ({ post }: SearchModalListItemProps) => {
  const board = useGetFindBoard(post?.boardId)

  return (
    <Box p={4} borderBottomColor={'rgba(43,46,57,1.00)'} borderBottomWidth="1px" boxShadow="md" cursor={'pointer'}>
      <SafeLink href={`/${board?.slug}/${post?.postId}/${truncateAfterLastDash(post?.slug)}`}>
        <Box>
          <Badge key={post?.boardId} colorScheme="red" variant="solid" mr={2}>
            {board?.name}
          </Badge>
        </Box>
        <Text fontSize="lg" fontWeight="bold" mt={2}>
          {post?.title}
        </Text>
        <Text mt={2} noOfLines={2} lineHeight="short">
          {post?.content}
        </Text>
        <Box mt={2}>
          {post?.tags?.map((tag) => (
            <Box key={tag.tagId} mr={2}>
              #{tag?.name}
            </Box>
          ))}
        </Box>
      </SafeLink>
    </Box>
  )
}
export default SearchModalListItem
