/* eslint-disable no-param-reassign */
import { useState, useRef, useMemo } from 'react'
import Slider, { Settings } from 'react-slick'
import { Box, Flex, Text } from '@chakra-ui/react'
import useComponentSize from '@hooks/useComponentSize'
import SliderItem from './SliderItem'
import { motion } from 'framer-motion'

// type MainSliderProps = {
//   postsList?: Posts[];
// };

const postsList = [
  {
    title: '1',
    desc: '',
  },
  {
    title: '2',
    desc: '',
  },
  {
    title: '3',
    desc: '',
  },
]
function MainSlider() {
  const [width_, setWidth] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const [isShow, setIsShow] = useState(true)
  const [activeSlide, setActiveSlide] = useState(0)
  const slider1 = useRef<Slider>(null)
  const prevPosition = useRef('0@0')

  const [pageInfo, setPageInfo] = useState({
    left: 0,
    right: 0,
    current: 0,
  })
  const [backGroundColor, setBackGroundColor] = useState('')

  const settings = useMemo<Settings>(
    () => ({
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      //before에 로직을 작성한건 움직일때 즉각 반응을 위해서 구현
      beforeChange: (current: number, next: number) => {
        setIsShow(false)
        const total = length - 1
        //0에서 뒤로
        if (current === 0 && next === total) {
          current = total
        }
        //끝에서 앞으로
        else if (current === total && next === 0) {
          current = 0
        } else if (current - next > 0) {
          current -= 1
        } else if (current - next < 0) {
          current += 1
        }
        const right = total - current
        const left = total - right
        setPageInfo({ right, left, current })
        prevPosition.current = '0@0'
      },
      afterChange: (currentSlide: number) => {
        setIsShow(true)
        setActiveSlide(currentSlide)
      },
    }),
    [],
  )

  const { left, right } = pageInfo

  const textBoxWidth = 350
  const { componentRef, componentSize } = useComponentSize()
  if (!postsList) {
    return <div></div>
  }

  console.log('=componentSize?.width - textBoxWidth) / 2', (componentSize?.width - textBoxWidth) / 2)
  return (
    <Box width={'100%'} position={'relative'}>
      <Flex justifyContent={'left'}>
        <Text>최근 게시글</Text>
      </Flex>
      <Box ref={componentRef} width={'100%'} height={'100%'}>
        <Slider {...settings} ref={slider1}>
          {postsList?.map((item, idx) => {
            return <SliderItem item={item} key={idx} />
          })}
        </Slider>
      </Box>
      <Box
        background={'black'}
        position={'absolute'}
        bottom={-50}
        padding={'15px'}
        left={`${(componentSize?.width - textBoxWidth) / 2}px`}
        width={textBoxWidth}
        boxShadow={'dark-lg'}
      >
        <Text color={'white'}>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam ...
        </Text>
      </Box>
    </Box>
  )
}

export default MainSlider
