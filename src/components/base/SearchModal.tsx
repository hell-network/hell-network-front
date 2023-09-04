import React, { useState } from 'react'
import { Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react'

const SearchModal = ({ isOpen, onOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search</ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <Input
            placeholder="Search for something..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SearchModal
