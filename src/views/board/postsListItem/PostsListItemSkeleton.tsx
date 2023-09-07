import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const PostsListSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#717171">
      <Box padding="8px" borderRadius={'4px'} borderBottomColor={'rgba(43,46,57,1.00)'} borderBottomWidth="1px">
        <Flex flexDirection={'column'}>
          <Flex justifyContent={'space-between'}>
            <Flex flexDirection={'column'} height={'72px'}>
              <Skeleton height={24} width={300} />
              <Skeleton height={16} width={200} />
            </Flex>
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
        </Flex>
      </Box>
    </SkeletonTheme>
  )
}

export default PostsListSkeleton
