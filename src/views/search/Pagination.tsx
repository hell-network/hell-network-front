import { Box, Button, HStack, Text } from '@chakra-ui/react'

const Pagination = ({ total, current, onPageChange }) => {
  const range = (start, end) => {
    return [...Array(end - start + 1)].map((_, i) => i + start)
  }

  const pages = range(1, total)

  return (
    <HStack spacing={4} mt={4}>
      {current > 1 && <Button onClick={() => onPageChange(current - 1)}>Previous</Button>}

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          colorScheme={page === current ? 'blue' : 'gray'}
          variant={page === current ? 'solid' : 'outline'}
        >
          {page}
        </Button>
      ))}

      {current < total && <Button onClick={() => onPageChange(current + 1)}>Next</Button>}
    </HStack>
  )
}

export default Pagination
