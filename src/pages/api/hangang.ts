import axios from 'axios'
import NodeCache from 'node-cache'

const cache = new NodeCache()

export default async (req, res) => {
  try {
    const cacheKey = 'hangang_cache'
    let result = cache.get(cacheKey)

    if (!result) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SEOUL_OPENAPI_URL}/${process.env.NEXT_PUBLIC_API_KEY}/json/WPOSInformationTime/1/5/`,
      )
      result = response.data
      cache.set(cacheKey, result, 300) // Cache for 60 seconds
    }

    res.status(200).json({
      message: 'success',
      code: '0000',
      result,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error', code: '500' })
  }
}
