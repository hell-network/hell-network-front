import moment from 'moment/moment';
import 'moment/locale/ko';
//필요 시 XLSX 설치 후 주석 풀기
// import XLSX from 'xlsx';

/*
type SHEET_T = {
  sheetName: string;
  header: string[];
  body: any[];
};
type EXCEL_DATA_T = {
  fileName: string;
  sheet: SHEET_T[];
};
 */

/**
 * 엑셀 Date 값을 'YYYY-MM-DD' 포맷으로 변환
 * @params
 *  start : 시작 index
 *  end : 종료 index
 * @return [start ... end]
 */
export const excelDateToJSDate = (date) => {
  return moment(new Date(Math.round((date - 25569) * 86400 * 1000))).format(
    'YYYY-MM-DD'
  );
};

/**
 * 엑셀 다운로드
 * @params
 *  - 위 타입 참고
 * @sampleformat
 *   const sampleformat: EXCEL_DATA_T = {
 *     fileName: '',
 *     sheet: [{ sheetName: '', header: ['test1', 'test2'], body: [{ test1: '', test2: '' }] }]
 *   };
 */
/*
export const downloadExcel = ({ fileName, sheet }: EXCEL_DATA_T) => {
  const autofitColumns = (json: any[], header?: string[]) => {
    const jsonKeys = header || Object.keys(json[0]);

    const objectMaxLength = [];
    for (let i = 0; i < json.length; i += 1) {
      const value = json[i];
      for (let j = 0; j < jsonKeys.length; j += 1) {
        if (typeof value[jsonKeys[j]] === 'number') {
          objectMaxLength[j] = 20;
        } else {
          const l = value[jsonKeys[j]] ? getByteLength(value[jsonKeys[j]]) : 0;

          objectMaxLength[j] = objectMaxLength[j] >= l ? objectMaxLength[j] : l;
        }
      }

      const key = jsonKeys;
      for (let j = 0; j < key.length; j += 1) {
        objectMaxLength[j] =
          objectMaxLength[j] >= getByteLength(key[j]) ? objectMaxLength[j] : getByteLength(key[j]);
      }
    }

    const wscols = objectMaxLength.map((w) => {
      return { width: w };
    });

    return wscols;
  };
  // step 1. workbook 생성
  const wb = XLSX.utils.book_new();

  // step 2. 시트 만들기
  const worksheets = sheet.map((st) => {
    const worksheet = XLSX.utils.json_to_sheet(st.body, { header: st.header });
    worksheet['!cols'] = autofitColumns(st.body, st.header);
    return {
      name: st.sheetName,
      data: worksheet
    };
  });

  // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
  worksheets.forEach((ws) => XLSX.utils.book_append_sheet(wb, ws.data, `${ws.name}`));

  // step 4. 엑셀 파일 만들고 내보내기
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
*/
