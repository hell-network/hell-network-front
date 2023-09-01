import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { Post } from '@api/post/types'
import moment from 'moment'
import SafeLink from '@components/SafeLink'
import { truncateAfterLastDash } from '@utils/convert'

type PostsListItemProps = {
  post: Post
  boardSlug: string
}
const postsListItem = ({ post, boardSlug }: PostsListItemProps) => {
  return (
    <Box padding="8px" backgroundColor={'blackAlpha.300'} borderRadius={'4px'}>
      <SafeLink href={`/${boardSlug}/${post?.postId}/${truncateAfterLastDash(post?.slug)}`}>
        <Flex flexDirection={'column'}>
          <Flex justifyContent={'space-between'}>
            <Flex flexDirection={'column'} height={'72px'}>
              <Text fontSize={'20px'} fontWeight={'bold'}>
                {post?.title}
              </Text>
              <Text
              // isTruncated

              //maxWidth="300px" // Adjust as needed
              >
                {post?.content}
              </Text>
            </Flex>
            <Flex width={'72px'} height={'72px'} flexBasis={'72px'} flexGrow="0" flexShrink="0">
              <Image
                alt=""
                sizes="72px"
                src="https://images.unsplash.com/photo-1529938762753-914127886a7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80"
                width={72}
                height={72}
              />
            </Flex>
          </Flex>
          <Flex justifyContent={'right'}>
            <Flex>
              <Text paddingRight={'4px'} fontSize={'12px'} color="gray.400">
                -익명
              </Text>
              <Text paddingRight={'4px'} fontSize={'12px'} color="gray.400">
                {moment(post?.datePosted).format('YYYY-MM-DD')}
              </Text>
              <Text paddingRight={'4px'} fontSize={'12px'} color="gray.400">
                32 comment
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </SafeLink>
    </Box>
  )
}
export default postsListItem
