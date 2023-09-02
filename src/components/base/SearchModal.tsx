import React, { useState } from 'react'
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'

const SearchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <Button onClick={onOpen}>Open Search Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Search for something..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SearchModal
