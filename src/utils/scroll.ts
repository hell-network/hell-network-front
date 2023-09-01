import { isEmpty } from 'utils/vaild';

/**
 * dom의 offsetTop을 얻어옴
 *  상위 parent가 존재하면 상위 parent의 top도 함께 계산
 * @param dom dom 객체, useRef를 사용해서 전달 가능
 * @param parentDom
 * @param top
 * @returns {offsetTop}
 */
export const getElementOffsetTop = (
  dom = undefined,
  parentDom = undefined,
  top = 0
) => {
  if (
    isEmpty(dom) ||
    isEmpty(dom.offsetTop) ||
    (!isEmpty(parentDom) && parentDom === dom)
  ) {
    return top;
  }

  if (dom.offsetParent) {
    return getElementOffsetTop(
      dom.offsetParent,
      parentDom,
      top + dom.offsetTop
    );
  }
  return top + dom.offsetTop;
};

/**
 * dom의 offsetBottom을 얻어옴
 *  상위 parent가 존재하면 상위 parent의 bottom도 함께 계산
 * @param dom dom 객체, useRef를 사용해서 전달 가능
 * @param parentDom
 * @param bottom
 * @returns {scrollHeight}
 */
export const getElementOffsetBottom = (
  dom = undefined,
  parentDom = undefined,
  bottom = 0
) => {
  if (
    isEmpty(dom) ||
    isEmpty(dom.scrollHeight) ||
    (!isEmpty(parentDom) && parentDom === dom)
  ) {
    return bottom;
  }

  if (dom.offsetParent) {
    return getElementOffsetBottom(
      dom.offsetParent,
      parentDom,
      bottom + dom.scrollHeight
    );
  }
  return bottom + dom.scrollHeight;
};

/**
 * dom 스크롤 이동
 * @param containerId 스크롤 되는 dom의 id (default: scroll-cnt-container or html tag)
 * @param where 이동할 곳 top/bottom (default: top)
 * @param dom dom 객체, useRef를 사용해서 전달 가능 (default: containerId의 dom)
 * @param appendPosValue dom의 offsetTop 기준 추가 값 (default: 0)
 * @param isSmoothScroll 이동 시 부드럽게 스크롤 여부, 안보내주면 부드럽게 스크롤 (default: true)
 */
export const scrollElement = ({
  containerId = '',
  where = 'top',
  dom = undefined,
  appendPosValue = 0,
  isSmoothScroll = true
}) => {
  const rootElement =
    document.getElementById(containerId) ||
    document.getElementsByTagName('html')[0];
  // root element가 없으면 스크롤 할 대상을 알 수 없는 것이므로 예외처리
  if (isEmpty(rootElement)) {
    console.warn('rootElement is null');
    return;
  }

  // 이동할 Top 위치 계산
  let top = isEmpty(dom) ? 0 : getElementOffsetTop(dom, rootElement);
  if (where === 'bottom') {
    top = isEmpty(dom)
      ? rootElement.scrollHeight
      : getElementOffsetBottom(dom, rootElement);
  }

  rootElement.scrollTo({
    top: top + appendPosValue,
    left: 0,
    behavior: isSmoothScroll ? 'smooth' : 'auto'
  });
};
