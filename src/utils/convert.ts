export const convertXY = (xx, yy) => {
  //console.log("[SEO] [CONVERT] " ,xx , yy )
  const RE = 6371.00877 // 지구 반경(km)
  const GRID = 5.0 // 격자 간격(km)
  const SLAT1 = 30.0 // 투영 위도1(degree)

  const SLAT2 = 60.0 // 투영 위도2(degree)
  const OLON = 126.0 // 기준점 경도(degree)
  const OLAT = 38.0 // 기준점 위도(degree)
  const XO = 43 // 기준점 X좌표(GRID)
  const YO = 136 // 기1준점 Y좌표(GRID)

  // LCC DFS 좌표변환 ( code :
  //          "toXY"(위경도->좌표, v1:위도, v2:경도),
  //          "toLL"(좌표->위경도,v1:x, v2:y) )
  //
  function dfs_xy_conv(code, v1, v2) {
    const DEGRAD = Math.PI / 180.0
    const RADDEG = 180.0 / Math.PI

    const re = RE / GRID
    const slat1 = SLAT1 * DEGRAD
    const slat2 = SLAT2 * DEGRAD
    const olon = OLON * DEGRAD
    const olat = OLAT * DEGRAD

    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5)
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn)
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5)
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5)
    ro = (re * sf) / Math.pow(ro, sn)
    const rs = {
      nx: 0,
      ny: 0,
      lat: 0,
      lng: 0,
    }
    if (code == 'toXY') {
      rs['lat'] = v1
      rs['lng'] = v2
      let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5)
      ra = (re * sf) / Math.pow(ra, sn)
      let theta = v2 * DEGRAD - olon
      if (theta > Math.PI) theta -= 2.0 * Math.PI
      if (theta < -Math.PI) theta += 2.0 * Math.PI
      theta *= sn
      rs['nx'] = Math.floor(ra * Math.sin(theta) + XO + 0.5)
      rs['ny'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)
    } else {
      rs['nx'] = v1
      rs['ny'] = v2
      const xn = v1 - XO
      const yn = ro - v2 + YO
      let ra = Math.sqrt(xn * xn + yn * yn)
      if (sn < 0.0) {
        ra = -ra
      }
      let alat = Math.pow((re * sf) / ra, 1.0 / sn)
      alat = 2.0 * Math.atan(alat) - Math.PI * 0.5
      let theta = 0.0
      if (Math.abs(xn) <= 0.0) {
        theta = 0.0
      } else {
        if (Math.abs(yn) <= 0.0) {
          theta = Math.PI * 0.5
          if (xn < 0.0) {
            theta = -theta
          }
        } else theta = Math.atan2(xn, yn)
      }
      const alon = theta / sn + olon
      rs['lat'] = alat * RADDEG
      rs['lng'] = alon * RADDEG
    }
    return rs
  }

  const rs = dfs_xy_conv('toXY', xx, yy)
  //console.log(rs)

  return rs
}

export function convertTo12HourFormat(time24) {
  // Extract hours and minutes
  const hours = Math.floor(time24 / 100)
  const minutes = time24 % 100

  // Determine the period (AM or PM)
  const period = hours >= 12 ? 'PM' : 'AM'

  // Convert hours to 12-hour format
  const hours12 = hours > 12 ? hours - 12 : hours

  // Pad single-digit minutes with leading zero
  const paddedMinutes = minutes.toString().padStart(2, '0')

  // Format the time in 12-hour format
  const time12 = `${hours12}:${paddedMinutes} ${period}`

  return time12
}

export const formattingPrice = (price: number, exchangeRate: number, locale: string, currency: string): string => {
  const convertedPrice = price * exchangeRate
  const formattedPrice = convertedPrice.toLocaleString(locale, { style: 'currency', currency })
  console.log('formattedPrice= ', formattedPrice)
  return formattedPrice
}

export const truncateAfterLastDash = (input: string): string => {
  const lastIndex = input.lastIndexOf('-')
  if (lastIndex === -1) return input // If '-' is not found, return the original string.
  return input.slice(0, lastIndex)
}
