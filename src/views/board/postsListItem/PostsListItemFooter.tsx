import { Flex, Text } from '@chakra-ui/react'
import moment from 'moment'

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
export default PostsListItemFooter
