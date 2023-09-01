import CryptoJS from 'crypto-js'
import { log } from 'util'

/**
 * 텍스트 암호화
 * @param text
 * @returns 암호화 된 text
 */
export const encrypt = (text: string) => {
  const passphrase = 'yna'
  return CryptoJS.AES.encrypt(text, passphrase).toString()
}

/**
 * 텍스트 복호화
 * @param ciphertext
 * @returns 복호화 된 text
 */
export const decrypt = (ciphertext: string) => {
  const passphrase = 'yna'
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    return null
  }
}

/**
 * 입력한 자릿수의 랜덤 문자 반환
 * 예) randomString(len)
 * @params
 *  - len : 문자길이
 */
export const getRandomString = (length = 8, type: 'number' | 'string' | 'both' = 'number') => {
  const number = '0123456789'
  const string = 'ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'
  const chars = type === 'number' ? number : type === 'string' ? string : `${number}${string}`

  let ret = ''
  for (let i = 0; i < length; i += 1) {
    ret += chars.charAt(
      Math.floor((Number(window.crypto.getRandomValues(new Uint32Array(1))) / 4294967296) * chars.length),
    )
  }
  return ret
}
