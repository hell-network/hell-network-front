import { useCallback, useEffect, useState } from 'react'
import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Badge,
} from '@chakra-ui/react'
import { useSearchPosts } from '@hooks/queries/post/useSearchPosts'
import { Box, Text, VStack, Divider } from '@chakra-ui/react'
import { Post } from '@api/post/types'
import { useBoard } from '@store/navi/hooks'
import SafeLink from '@components/SafeLink'
import debounce from 'lodash/debounce'
import LoadingSpinner from '@components/Loading'
import FlexCenter from '@components/common/FlexCenter'
import { truncateAfterLastDash } from '@utils/convert'

const ListItem = ({ post }) => {
  const { board } = useBoard()
  const findBoard = board.find((board) => board?.boardId === post?.boardId)

  return (
    <Box p={4} borderBottomColor={'rgba(43,46,57,1.00)'} borderBottomWidth="1px" boxShadow="md" cursor={'pointer'}>
      <SafeLink href={`/${findBoard?.slug}/${post?.postId}/${truncateAfterLastDash(post?.slug)}`}>
        <Box>
          <Badge key={post?.boardId} colorScheme="red" variant="solid" mr={2}>
            {findBoard?.name}
          </Badge>
        </Box>
        <Text fontSize="lg" fontWeight="bold" mt={2}>
          {post?.title}
        </Text>
        <Text mt={2} noOfLines={2} lineHeight="short">
          {post?.description}
        </Text>
        <Box mt={2}>
          {post?.tags?.map((tag) => (
            <Box key={tag} mr={2}>
              #{tag}
            </Box>
          ))}
        </Box>
      </SafeLink>
    </Box>
  )
}

type SearchItemListProps = {
  posts: Post[]
  isLoading: boolean
  searchTerm: string
}
const List = ({ posts, isLoading, searchTerm }: SearchItemListProps) => (
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
          <ListItem post={post} />
          {index < posts.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  </VStack>
)
const SearchModal = ({ isOpen, onOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const { data: searchPostsData, isLoading } = useSearchPosts(debouncedSearchTerm, '5', '0', {
    enabled: !!debouncedSearchTerm, // searchTerm이 있을 때만 쿼리를 실행합니다.
  })

  console.log(isLoading)

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 150)

    handler()

    return () => {
      handler.cancel() // 이전 디바운스 핸들러를 취소합니다.
    }
  }, [searchTerm])

  const handleSetSearchTerm = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="blackAlpha.900" mt={0} maxWidth={'none'}>
        <ModalHeader>Search</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Input placeholder="검색어를 입력해주세요." value={searchTerm} onChange={handleSetSearchTerm} />
          <List posts={searchPostsData?.result?.posts} isLoading={isLoading} searchTerm={searchTerm} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SearchModal
