import { Button, HStack } from '@chakra-ui/react'
import { DEFAULT_PAGE_SIZE } from '@constants/index'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useCallback } from 'react'
type PaginationProps = {
  totalCount: number
  current: number
  onPageChange: (current: number) => void
  pageSize: number
}
const Pagination = ({ totalCount, current = 1, onPageChange, pageSize = DEFAULT_PAGE_SIZE }: PaginationProps) => {
  if (!totalCount) return <></>
  const range = (start: number, end: number) => {
    return [...Array(end - start + 1)].map((_, i) => i + start)
  }

  const totalPageCount = Math.ceil(totalCount / pageSize)
  const pages = range(1, totalPageCount)

  const handlePrevNext = useCallback(
    (direction: string) => {
      if (direction === 'left') {
        if (current > 1) return
        onPageChange(current - 1)
      }
      if (direction === 'right') {
        if (current < totalPageCount) return
        onPageChange(current + 1)
      }
    },
    [current, onPageChange, totalPageCount],
  )

  return (
    <HStack spacing={4} mt={4} justifyContent={'center'} alignItems={'center'}>
      <Button onClick={() => handlePrevNext('prev')}>
        <ChevronLeftIcon />
      </Button>

      {pages?.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          colorScheme={page === current ? 'red' : 'gray'}
          variant={page === current ? 'solid' : 'outline'}
        >
          {page}
        </Button>
      ))}

      <Button onClick={() => handlePrevNext('next')}>
        <ChevronRightIcon />
      </Button>
    </HStack>
  )
}

export default Pagination
