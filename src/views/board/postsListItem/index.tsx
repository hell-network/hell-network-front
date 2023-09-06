import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { Post } from '@api/post/types'
import moment from 'moment'
import SafeLink from '@components/SafeLink'
import { truncateAfterLastDash } from '@utils/convert'
import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { motion } from 'framer-motion'

type PostsListItemProps = {
  post: Post
  boardSlug: string
}
const PostsListItemTitle = ({ post }) => {
  return (
    <Text fontSize={'20px'} fontWeight={'bold'}>
      {post?.title}
    </Text>
  )
}

const PostsListItemContent = ({ post }) => {
  return (
    <Text
      isTruncated
      maxWidth="300px" // Adjust as needed
    >
      {post?.content}
    </Text>
  )
}

const PostsListItemImage = ({ post }) => {
  return (
    <Flex width={'72px'} height={'72px'} flexBasis={'72px'} flexGrow="0" flexShrink="0">
      <Image
        alt=""
        sizes="72px"
        src="https://images.unsplash.com/photo-1529938762753-914127886a7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80"
        width={72}
        height={72}
      />
    </Flex>
  )
}
const PostsListItemFooter = ({ post }) => {
  return (
    <Flex justifyContent={'right'}>
      <Flex>
        <Text paddingRight={'4px'} fontSize={'12px'} color="gray.400">
          익명
        </Text>
        <Text paddingRight={'4px'} fontSize={'12px'} color="gray.400">
          {moment(post?.datePosted).format('YYYY-MM-DD')}
        </Text>
        <Text paddingRight={'4px'} fontSize={'12px'} color="gray.400">
          32 comment
        </Text>
      </Flex>
    </Flex>
  )
}

const PostsListItemTag = ({ post }) => {
  return (
    <Flex paddingTop={'5px'}>
      <Flex as="ul" gap="1rem" listStyleType={'none'}>
        <Box as="li">#실화</Box>
        <Box as="li">#사건</Box>
        <Box as="li">#트랜드</Box>
      </Flex>
    </Flex>
  )
}
const postsListItem = ({ post, boardSlug }: PostsListItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }} // Initial state
      animate={{ opacity: 1, filter: 'blur(0px)' }} // Final state
      transition={{ duration: 1 }} // Animation duration
    >
      <Box padding="8px" borderRadius={'4px'} borderBottomColor={'rgba(43,46,57,1.00)'} borderBottomWidth="1px">
        <SafeLink href={`/${boardSlug}/${post?.postId}/${truncateAfterLastDash(post?.slug)}`}>
          <Flex justifyContent={'space-between'}>
            <Flex flexDirection={'column'} height={'72px'}>
              <PostsListItemTitle post={post} />
              <PostsListItemContent post={post} />
            </Flex>
            <PostsListItemImage post={post} />
          </Flex>
          <PostsListItemFooter post={post} />
          <PostsListItemTag post={post} />
        </SafeLink>
      </Box>
    </motion.div>
  )
}
export default React.memo(postsListItem)
