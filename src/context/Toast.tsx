/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createContext, ReactNode } from 'react'
import { Slide, toast, ToastContainer, ToastContentProps } from 'react-toastify'
import SafeLink from '@components/SafeLink'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'

const St = {
  ToastContainerWrapper: styled.div`
    .toast_close_btn {
      position: absolute;
      right: 13px;
      top: 50%;
      transform: translateY(-50%);
      width: 36px;
      height: 36px;
      border-radius: 18px;

      &:hover {
        background-color: rgba(033, 033, 033, 0.8);
      }

      &:before,
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 1px;
        height: 18px;
        background-color: rgba(0, 0, 0, 0.8);
      }

      &:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
  `,
}
export type ToastType = {
  type?: 'info' | 'success' | 'error' | 'warning'
  action?: {
    title: string
    path: string
    onClick?: () => void
  }
  message: string | ReactNode
  option?: any
}

export type ToastContextType = {
  onToast: (arg: ToastType) => void
}

const CloseButton = ({ closeToast }) => {
  return <button className="toast_close_btn" onClick={closeToast} />
}
export const toastContext = createContext<ToastContextType>(undefined)
export const CustomToast = (props: Omit<ToastType, 'option'> & ToastContentProps) => {
  return (
    <div className="toast_content">
      <div className="toast_text">{props?.message}</div>
      {!isEmpty(props?.action) && (
        <div className="toast_action">
          <SafeLink href={props?.action?.path}>
            <a
              onClick={() => {
                if (props?.action?.onClick) {
                  props.action.onClick()
                }
                props.closeToast()
              }}
            >
              {props?.action?.title}
            </a>
          </SafeLink>
        </div>
      )}
    </div>
  )
}
export const ToastProvider = ({ children }) => {
  const { Provider } = toastContext
  const onToast = ({ type = 'info', message, action, option }: ToastType) => {
    toast((props) => <CustomToast type={type} message={message} action={action} {...props} />, {
      ...option,
      type,
      icon: ({ type }) => {
        switch (type) {
          case 'error':
            return <img src="/images/toast_info_white.svg" alt="" />
          case 'default':
          case 'success':
          case 'warning':
          case 'info':
          default:
            return <img src="/images/toast_check_white.svg" alt="" />
        }
      },
    })
    toast.clearWaitingQueue()
  }

  return (
    <Provider value={{ onToast }}>
      {children}
      {/*ref: https://fkhadra.github.io/react-toastify/introduction*/}
      <St.ToastContainerWrapper id="hello">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={3}
          hideProgressBar
          transition={Slide}
          closeButton={CloseButton}
          closeOnClick={false}
          draggable={false}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
      </St.ToastContainerWrapper>
    </Provider>
  )
}
