import { Box, Flex } from '@chakra-ui/react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { FlexColumn } from '@components/common'

const PostsListSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#717171">
      <Box padding="8px" borderRadius={'4px'} borderBottomColor={'rgba(43,46,57,1.00)'} borderBottomWidth="1px">
        <FlexColumn>
          <Flex justifyContent={'space-between'}>
            <FlexColumn height={'72px'}>
              <Skeleton height={24} width={300} />
              <Skeleton height={16} width={200} />
            </FlexColumn>
            <Flex width={'72px'} height={'72px'} flexBasis={'72px'} flexGrow="0" flexShrink="0">
              <Skeleton circle height="100%" width={72} />
            </Flex>
          </Flex>
          <Flex justifyContent={'right'}>
            <Flex>
              <Skeleton height={12} width={150} />
            </Flex>
          </Flex>
          <Flex paddingTop={'5px'}>
            <Flex as="ul" gap="1rem" listStyleType={'none'}>
              <Skeleton height={16} width={200} />
            </Flex>
          </Flex>
        </FlexColumn>
      </Box>
    </SkeletonTheme>
  )
}

export default PostsListSkeleton
