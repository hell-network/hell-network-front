import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import { Box, Button, ButtonGroup, Select } from '@chakra-ui/react'
import { useRegisterPost } from '@hooks/queries/post/useRegisterPost'

const NoSsrEditor = dynamic(() => import('components/TuiEditor'), {
  ssr: false,
})

type FormValues = {
  title: string
}

const Page = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const ref = useRef<any>(null)
  const [title, setTitle] = useState('')

  const handleSetTitle = useCallback((e) => {
    setTitle(e.target.value)
  }, [])

  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])

  const { mutatePost } = useRegisterPost()

  return (
    <>
      <Box height={'100vh'}>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const editorIns = ref?.current?.getInstance()
              // 에디터 작성 내용 markdown으로 저장
              const contentMark = editorIns.getMarkdown()

              // contentMark 길이 체크
              if (contentMark?.length === 0) {
                throw new Error('내용을 입력해주세요.')
              }
              mutatePost.mutate({ title, content: contentMark, boardId: 1 })
              console.log(contentMark)

              // add firestore
              //   await addDoc(collection(db, 'posts'), {
              //     title: data.title,
              //     content: contentMark,
              //     createdAt: new Date(),
              //   })

              toast.success('포스트를 작성했습니다.', {
                autoClose: 1000,
              })

              //router.replace('/')
            } catch (e) {
              console.log(e)
              toast.error(`${e}` || '다시 시도해주세요.', {
                autoClose: 1000,
              })
            }
          })}
          className="h-screen w-full"
        >
          <div className="mx-2 my-4 p-2 md:mx-8 lg:mx-8">
            <div className="relative">
              <Select placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <label htmlFor="name" className="text-sm leading-7 text-gray-600">
                제목 <span className="ml-2 text-xs text-red-500">{errors.title?.message}</span>
              </label>
              <input
                {...register('title', {
                  required: '필수 입력 사항입니다.',
                })}
                type="text"
                id="title"
                name="title"
                onChange={handleSetTitle}
                placeholder="제목을 입력해주세요"
                className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out placeholder:text-sm focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <NoSsrEditor content="" editorRef={ref} />

          <Box className="fixed bottom-0 flex h-12 w-full lg:h-14">
            <ButtonGroup variant="outline" spacing="6">
              <Button colorScheme="blue" type="submit">
                작성하기
              </Button>
              <Button onClick={handleGoBack}>뒤로가기</Button>
            </ButtonGroup>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default Page
