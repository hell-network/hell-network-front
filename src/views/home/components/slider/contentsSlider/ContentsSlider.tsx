/* eslint-disable no-param-reassign */
import { useState, useRef, useMemo } from 'react'
import Slider, { Settings } from 'react-slick'
import { Box, Flex, Text } from '@chakra-ui/react'
import useComponentSize from '@hooks/useComponentSize'
import ContentsSliderItem from './ContentsSliderItem'
import { motion } from 'framer-motion'
import styled from 'styled-components'

// type MainSliderProps = {
//   postsList?: Posts[];
// };

const Wrapper = styled.div`
  margin-top: 30px;
  h3 {
    background: #5f9ea0;
    color: #fff;
    font-size: 36px;
    line-height: 100px;
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
  }
`
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
  {
    title: '4',
    desc: '',
  },
  {
    title: '5',
    desc: '',
  },
  {
    title: '6',
    desc: '',
  },
]
function MainSlider({ title }) {
  const slider1 = useRef<Slider>(null)
  const settings = useMemo<Settings>(
    () => ({
      dots: true,
      infinite: true,
      speed: 300,
      autoplay: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            // dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1,
          },
        },
      ],
    }),
    [],
  )

  if (!postsList) {
    return <div></div>
  }

  return (
    <Wrapper>
      <Flex justifyContent={'left'} width={'100%'}>
        <Text>{title}</Text>
      </Flex>
      {/* <div>
        <h2> Multiple items </h2>
        <Slider {...settings}>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
        </Slider>
      </div> */}
      <Slider {...settings} ref={slider1}>
        {postsList?.map((item, idx) => {
          return <ContentsSliderItem item={item} key={idx} />
        })}
      </Slider>
    </Wrapper>
  )
}

export default MainSlider
