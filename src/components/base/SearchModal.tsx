import React, { useCallback, useState } from 'react'
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

const ListItem = ({ title, description, boardId }) => {
  const { board } = useBoard()
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Box>
        <Badge key={boardId} colorScheme="dark" variant="solid" mr={2}>
          {board.find((board) => board?.boardId === boardId)?.name}
        </Badge>
      </Box>
      <Text fontSize="lg" fontWeight="bold" mt={2}>
        {title}
      </Text>
      <Text mt={2} noOfLines={2} lineHeight="short">
        {description}
      </Text>
      <Box mt={2}>
        {/* {tags.map((tag) => (
        <Badge key={tag} colorScheme="blue" variant="solid" mr={2}>
          {tag}
        </Badge>
      ))} */}
      </Box>
    </Box>
  )
}

type SearchItemListProps = {
  posts: Post[]
}
const List = ({ posts }: SearchItemListProps) => (
  <VStack spacing={4} align="stretch">
    {posts?.map((post, index) => (
      <React.Fragment key={post?.postId}>
        <ListItem title={post?.title} description={post?.content} boardId={post?.boardId} />
        {index < posts.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </VStack>
)
const SearchModal = ({ isOpen, onOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data } = useSearchPosts(searchTerm)

  const handleSearchTerm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  console.log('data')
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Input placeholder="Search for something..." value={searchTerm} onChange={handleSearchTerm} />
          <List posts={data?.result} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SearchModal
