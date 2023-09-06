import { Button, Container, Flex, Text } from '@chakra-ui/react'
import { FlexColumn, FlexCenter } from '@components/common'
import { useRouter } from 'next/router'

function Error() {
  const router = useRouter()
  return (
    <Container>
      <div className="error-page-image">{/* <img src="/static/image/404.gif" alt="404" /> */}</div>
      <FlexColumn>
        <FlexCenter>
          <Text fontFamily={'Helpme'} fontSize="72px">
            404
          </Text>
        </FlexCenter>
        <Button type="button" onClick={() => router.back()}>
          뒤로 가기
        </Button>
      </FlexColumn>

      <hr />
    </Container>
  )
}

export default Error
