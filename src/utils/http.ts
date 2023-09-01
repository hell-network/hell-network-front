import Axios from 'axios';
import { isEmpty } from 'utils/vaild';

/**
 * 파일 확장자를 통한 mime type 체크
 */
export const getFileMimeType = (fileName) => {
  if (fileName.indexOf('.') !== -1) {
    const tmp = fileName.split('.');

    switch (tmp[tmp.length > 0 ? tmp.length - 1 : 0]) {
      case 'pdf':
        return 'application/pdf';
      case 'txt':
        return 'text/plain';
      case 'html':
        return 'text/html';
      case 'doc':
        return 'application/msword';
      case 'xls':
        return 'application/vnd.ms-excel';
      case 'xlsx':
        return 'application/vnd.ms-excel';
      case 'ppt':
        return 'application/vnd.ms-powerpoint';
      case 'pptx':
        return 'application/vnd.ms-powerpoint';
      case 'gif':
        return 'image/gif';
      case 'png':
        return 'image/png';
      case 'jpg':
        return 'image/jpeg';
      case 'jpeg':
        return 'image/jpeg';
      default:
        return 'application/force-download';
    }
  }
  return fileName;
};

type DownloadImageType = {
  url: string;
  fileName: string;
  onSuccess?: () => void;
  onFailure?: () => void;
};

/**
 * 이미지 다운로드
 *  binaray로 데이터를 받아 Image 타입으로 반환하는 함수
 * @params
 *  url: 이미지 URL
 *  fileName: 사용자가 내려받을 파일의 이름
 *  onSuccess(), onFailure(): 내려 받은 후의 응답 callback
 *
 * @Notice
 *  전달되는 URL의 응답서버에서 CROS 정책에 의해 현 Front IP가 허용해줘야 한다.
 *  Content-disposition 의 filename 속성은 사용하지 않는다.
 *  Front/Backend의 token 정책을 사용하지 않는다. 사용하고 싶다면 Axios를 변경해야한다.
 */
export const downloadImage = ({
  url = '',
  fileName = '',
  onSuccess,
  onFailure
}: DownloadImageType) => {
  Axios.get(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    responseType: 'blob'
  })
    .then((res) => {
      if (res.status === 200) {
        const name = fileName;
        const obj = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = obj;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        onSuccess && onSuccess();
      } else {
        onFailure && onFailure();
      }
    })
    .catch(() => {
      onFailure && onFailure();
    });
};

/**
 * url query 변환, 보안을 위해서 사용
 * @params
 *  query: 변환할 query
 * @return {query}
 */
export const queryReplace = (query: any = '') => {
  if (isEmpty(query)) return '';

  //array
  if (Array.isArray(query)) {
    return query.map((item) => {
      if (typeof item === 'string') {
        return item.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s.,()\-_]/gi, '');
      }
      return item;
    });
  }

  //Object
  if (query.constructor === Object) {
    const newObj = {};
    Object.keys(query).forEach((key) => {
      newObj[key] = query[key].replace(
        /[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s.,()\-_]/gi,
        ''
      );
    });
    return newObj;
  }

  //string
  if (String(typeof query).toLowerCase() === 'string') {
    return query.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s.,()\-_]/gi, '');
  }

  // 변환 불가.
  console.warn('[queryReplace] Can not convert', query);
  return query;
};
