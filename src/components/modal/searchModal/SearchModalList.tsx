import { Post } from '@api/post/types'
import { Box, Divider, Text, VStack } from '@chakra-ui/react'
import LoadingSpinner from '@components/Loading'
import { FlexCenter } from '@components/common'
import SearchModalListItem from '@components/modal/searchModal/SearchModalListItem'

type SearchModalListProps = {
  posts: Post[]
  isLoading: boolean
  searchTerm: string
}

const SearchModalList = ({ posts, isLoading, searchTerm }: SearchModalListProps) => (
  <VStack spacing={4} align="stretch">
    <Box w="full" paddingTop={10} paddingBottom={10}>
      {!isLoading && posts?.length === 0 && (
        <FlexCenter>
          <Text>{`No result for "${searchTerm}"`}</Text>
        </FlexCenter>
      )}

      {isLoading && (
        <FlexCenter>
          <LoadingSpinner />
        </FlexCenter>
      )}

      {posts?.map((post, index) => (
        <Box key={post?.postId}>
          <SearchModalListItem post={post} />
          {index < posts.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  </VStack>
)

export default SearchModalList
