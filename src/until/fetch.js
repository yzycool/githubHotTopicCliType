// api.js

async function fetchData(baseUrl, url, options = {}) {
  try {
    const response = await fetch(`${baseUrl}${url}`, options)
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
