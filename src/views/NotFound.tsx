import styled from 'styled-components';
import { useRouter } from 'next/router';

const St = {
  ErrorPageWrapper: styled.div`
    width: 30%;
    margin-top: 84px;
    height: 30%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    .error-page-image img {
      width: 100%;
      height: 100%;
    }
    .error-page-desc {
      font-size: 4em;
      font-family: 'Youth';
    }
  `,
};
function Error() {
  const router = useRouter();
  return (
    <St.ErrorPageWrapper>
      <div className="error-page-image">
        {/* <img src="/static/image/404.gif" alt="404" /> */}
      </div>

      <p className="error-page-desc">404 error!</p>
      <hr />
      <p className="error-page-sub-desc">올바르지 않는 URL을 입력하셨어요!</p>

      <button type="button" onClick={() => router.back()}>
        뒤로 가기
      </button>
    </St.ErrorPageWrapper>
  );
}

export default Error;
