import { Box, Flex } from '@chakra-ui/react'
import { Post } from '@api/post/types'
import SafeLink from '@components/SafeLink'
import { truncateAfterLastDash } from '@utils/convert'
import React, { useEffect, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { motion } from 'framer-motion'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import PostsListItemTitle from './PostsListItemTitle'
import PostsListItemContent from './PostsListItemContent'
import PostsListItemImage from './PostsListItemImage'
import PostsListItemFooter from './PostsListItemFooter'
import PostsListItemTag from './PostsListItemTag'
import { FlexColumn } from '@components/common'

type PostsListItemProps = {
  post: Post
  boardSlug?: string
}
const postsListItem = ({ post, boardSlug }: PostsListItemProps) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
  })
  const [animationEnabled, setAnimationEnabled] = useState(true) // State to control animation

  const animationVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  }
  useEffect(() => {
    if (ref?.current && entry?.isIntersecting && animationEnabled) {
      setAnimationEnabled(false) // Disable animation after it has run once
    }
  }, [entry, animationEnabled, ref])

  return (
    <motion.div
      // initial={{ opacity: 0, filter: 'blur(10px)' }} // Initial state
      // animate={{ opacity: 1, filter: 'blur(0px)' }} // Final state
      // elementRef={{ duration: 1 }} // Animation duration
      ref={ref as any} // Attach the ref to the element
      initial={entry?.isIntersecting ? 'visible' : 'hidden'} // Check if element is intersecting
      animate={entry?.isIntersecting ? 'visible' : 'hidden'} // Check if element is intersecting
      variants={animationVariants} // Define animation variants
      transition={{ duration: 1 }}
    >
      <Box padding="8px" borderRadius={'4px'} borderBottomColor={'rgba(43,46,57,1.00)'} borderBottomWidth="1px">
        <SafeLink href={`/${boardSlug}/${post?.postId}/${truncateAfterLastDash(post?.slug)}`}>
          <Flex justifyContent={'space-between'}>
            <FlexColumn flexDirection={'column'} height={'72px'}>
              <PostsListItemTitle post={post} />
              <PostsListItemContent post={post} />
            </FlexColumn>
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
