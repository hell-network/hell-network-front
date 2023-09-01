import { isEmpty } from 'utils/vaild';

/**
 * bytes 다른 단위로 치환한다.
 *  * @params
 *  - bytes : 바이트
 * @returns 출력된 포맷
 */
export function getHumanFileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  if (size === 0) return '-';
  return `${(size / 1024 ** i).toFixed(1)} ${
    ['Bytes', 'KB', 'MB', 'GB', 'TB'][i]
  }`;
}

export function getExtension(fileName: string) {
  const fileLength = fileName.length;
  const lastDot = fileName.lastIndexOf('.');

  const fileExtension = fileName.substring(lastDot + 1, fileLength);
  return fileExtension;
}

/**
 * headers 정보로 fileName 반환
 * @params
 *  - headers: 헤더 object
 *      ex. attachment;filename=member_20211120.xlsx
 *  - defaultFileName: 헤더에서 찾지 못할 경우의 기본값
 * @TODO 검토 필요
 */
export const getFileName = (headers, defaultFileName = '') => {
  let retValue = defaultFileName;
  //attachment;filename=member_20211120.xlsx
  try {
    const tmp = headers.split('=');
    if (headers.indexOf('=') !== -1) {
      retValue = tmp[1].toString();
    }
  } catch (e) {
    console.log('e');
  }
  return retValue;
};

/**
 * MINE_SIGNATURE_LIST
 * 검증가능한 파일 리스트,
 *  .jpg, .png, .tif, .gif, .pdf, .doc, .docx, .xls, .xlsx, .hwp, .zip
 * ref. https://www.garykessler.net/library/file_sigs.html
 *      https://filesignatures.net/index.php
 */
const MINE_SIGNATURE_LIST = [
  {
    // jpg
    mime: ['image/jpeg', 'image/jpg'],
    pattern: [0xff, 0xd8, 0xff],
    mask: [0xff, 0xff, 0xff]
  },
  {
    // png
    mime: ['image/png'],
    pattern: [0x89, 0x50, 0x4e, 0x47],
    mask: [0xff, 0xff, 0xff, 0xff]
  },
  {
    // Tagged Image File Format file
    mime: ['image/tif', 'image/tiff'],
    pattern: [0x49, 0x20, 0x49],
    mask: [0xff, 0xff, 0xff]
  },
  {
    // Tagged Image File Format file (little endian, i.e., LSB first in the byte; Intel)
    mime: ['image/tif', 'image/tiff'],
    pattern: [0x49, 0x49, 0x2a, 0x00],
    mask: [0xff, 0xff, 0xff, 0xff]
  },
  {
    // Tagged Image File Format file (big endian, i.e., LSB last in the byte; Motorola)
    mime: ['image/tif', 'image/tiff'],
    pattern: [0x4d, 0x4d, 0x00, 0x2a],
    mask: [0xff, 0xff, 0xff, 0xff]
  },
  {
    // BigTIFF files; Tagged Image File Format files(> 4GB)
    mime: ['image/tif', 'image/tiff'],
    pattern: [0x4d, 0x4d, 0x00, 0x2b],
    mask: [0xff, 0xff, 0xff, 0xff]
  },
  {
    // gif
    mime: ['image/gif'],
    pattern: [0x47, 0x49, 0x46, 0x38],
    mask: [0xff, 0xff, 0xff, 0xff]
  },
  {
    // pdf
    mime: ['application/pdf'],
    pattern: [0x25, 0x50, 0x44, 0x46],
    mask: [0xff, 0xff, 0xff, 0xff]
  },
  {
    //doc, docx(암호), xls, xlsx(암호), 한글
    mime: [
      'application/msword',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'hwp'
    ],
    pattern: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1],
    mask: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
  },
  {
    //docx, xlsx
    mime: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ],
    pattern: [0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00],
    mask: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
  },
  {
    // ZIP
    mime: ['application/x-zip-compressed'],
    pattern: [0x50, 0x4b, 0x03, 0x04],
    mask: [0xff, 0xff, 0xff, 0xff]
  },
  {
    // PKZIP empty archive file
    mime: ['application/x-zip-compressed'],
    pattern: [0x50, 0x4b, 0x05, 0x06],
    mask: [0xff, 0xff, 0xff, 0xff]
  },
  {
    // PKZIP multivolume archive file
    mime: ['application/x-zip-compressed'],
    pattern: [0x50, 0x4b, 0x07, 0x08],
    mask: [0xff, 0xff, 0xff, 0xff]
  },
  {
    // 한글
    mime: ['hwp'],
    pattern: [
      0x48, 0x57, 0x50, 0x20, 0x44, 0x6f, 0x63, 0x75, 0x6d, 0x65, 0x6e, 0x74,
      0x20, 0x46, 0x69, 0x6c, 0x65
    ],
    mask: [
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff, 0xff
    ]
  }
];
/**
 * 파일 확장자 검증.
 * @notice Promise 함수임! async - await 또는 then 사용해야 함
 * @param file
 * @returns Promise<boolean>
 */
export const fileValidator = async (file: File): Promise<boolean> => {
  const fileBuffer = await file.arrayBuffer();
  const fileBinary = new Uint8Array(fileBuffer);

  const fileType =
    isEmpty(file.type) && file.name.includes('.hwp') ? 'hwp' : file.type;

  const checkTypeList = MINE_SIGNATURE_LIST.filter((mine) =>
    mine.mime.includes(fileType)
  );

  if (isEmpty(checkTypeList) || fileBinary.length < 3) {
    console.warn('Can not valid file.', file.name, file.type);
    return false;
  }

  const cmpFileSignature = (fileBytes, { pattern, mask }): boolean => {
    let isMatch = true;
    pattern.some((pByte, i) => {
      // eslint-disable-next-line no-bitwise
      if ((fileBytes[i] & mask[i]) - pByte !== 0) {
        isMatch = false;
        return true;
      }
      return false;
    });

    return isMatch;
  };

  let isMatch = false;
  checkTypeList.some((type) => {
    if (cmpFileSignature(fileBinary, type) === true) {
      isMatch = true;
      return true;
    }
    return false;
  });

  return isMatch;
};
