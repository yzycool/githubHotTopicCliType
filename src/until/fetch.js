// api.js

const BASE_URL = 'https://api.github.com/search'

async function fetchData(url, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options)
    if (!response.ok) {
      alert(`HTTP error! status: ${response.status}`)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    alert(`HTTP error! status: ${error}`)
    console.error('Fetch Error:', error)
    throw error
  }
}
export default fetchData
