import { useCallback, useEffect, useState } from 'react'
import { Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'
import { useSearchPosts } from '@hooks/queries/post/useSearchPosts'

import debounce from 'lodash/debounce'
import SearchModalList from './SearchModalList'
import { useRouter } from 'next/router'

const SearchModal = ({ isOpen, onOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const { data: searchPostsData, isLoading } = useSearchPosts(debouncedSearchTerm, '5', '0', {
    enabled: !!debouncedSearchTerm, // searchTerm이 있을 때만 쿼리를 실행합니다.
  })
  const router = useRouter()
  useEffect(() => {
    onClose()
  }, [onClose, router.asPath])

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      router.push({
        pathname: '/search',
        query: {
          q: searchTerm,
        },
      })
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="blackAlpha.900" mt={0} maxWidth={'none'}>
        <ModalHeader>Search</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Input
            placeholder="검색어를 입력해주세요."
            value={searchTerm}
            onChange={handleSetSearchTerm}
            onKeyDown={handleKeyDown}
          />
          <SearchModalList posts={searchPostsData?.result?.posts} isLoading={isLoading} searchTerm={searchTerm} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SearchModal
