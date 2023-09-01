import { Box, Grid, GridItem, Heading, Text, Image } from '@chakra-ui/react'

const posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'Content for post 1...',
    imageUrl: 'https://via.placeholder.com/200',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Content for post 2...',
    imageUrl: 'https://via.placeholder.com/200',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Content for post 2...',
    imageUrl: 'https://via.placeholder.com/200',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Content for post 2...',
    imageUrl: 'https://via.placeholder.com/200',
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Content for post 2...',
    imageUrl: 'https://via.placeholder.com/200',
  },
  // Add more posts as needed
]

const GridPosts = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4} marginTop={'30px'}>
      {posts.map((post) => (
        <GridItem key={post.id}>
          <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            <Image src={post.imageUrl} alt={`Image for ${post.title}`} mb={2} />
            <Heading size="md" mb={2}>
              {post.title}
            </Heading>
            <Text>{post.content}</Text>
          </Box>
        </GridItem>
      ))}
    </Grid>
  )
}

export default GridPosts
