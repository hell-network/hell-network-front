import React from 'react'
import styled, { keyframes } from 'styled-components'

interface LoadingSpinnerProps {
  size?: number
}

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerContainer = styled.div<LoadingSpinnerProps>`
  display: inline-block;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`

const SpinnerItem = styled.div<LoadingSpinnerProps>`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${(props) => props.size - 16}px;
  height: ${(props) => props.size - 16}px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: ${spinAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: hsla(0, 0%, 62%, 1) transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 80 }) => {
  return (
    <SpinnerContainer size={size}>
      <SpinnerItem size={size} />
      <SpinnerItem size={size} />
      <SpinnerItem size={size} />
    </SpinnerContainer>
  )
}

export default LoadingSpinner
