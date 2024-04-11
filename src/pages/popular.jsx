import { useState, useEffect } from 'react'
import fetchData from '@/until/fetch'
import './popular.scss'
import 'lazysizes'
const baseUrl = 'https://api.github.com/search'
const NewsNav = ({ listenUrlChange, currentIndex }) => {
  const handleItemClick = index => {
    listenUrlChange(index)
    addParameter(index)
  }

  function addParameter(parameterValue) {
    const currentUrl = window.location.pathname
    const parameterName = 'technologyType'
    const separator = currentUrl.includes('?') ? '&' : '?'
    const newUrl = currentUrl + separator + parameterName + '=' + encodeURIComponent(parameterValue)
    history.pushState(null, null, newUrl)
  }

  return (
    <div className='news-nav'>
      <span className={`news-nav-item ${currentIndex === 1 ? 'active' : ''}`} onClick={() => handleItemClick(1)}>
        All
      </span>
      <span className={`news-nav-item ${currentIndex === 2 ? 'active' : ''}`} onClick={() => handleItemClick(2)}>
        Javascript
      </span>
      <span className={`news-nav-item ${currentIndex === 3 ? 'active' : ''}`} onClick={() => handleItemClick(3)}>
        Ruby
      </span>
      <span className={`news-nav-item ${currentIndex === 4 ? 'active' : ''}`} onClick={() => handleItemClick(4)}>
        Java
      </span>
      <span className={`news-nav-item ${currentIndex === 5 ? 'active' : ''}`} onClick={() => handleItemClick(5)}>
        Css
      </span>
      <span className={`news-nav-item ${currentIndex === 6 ? 'active' : ''}`} onClick={() => handleItemClick(6)}>
        Python
      </span>
    </div>
  )
}

const Popular = () => {
  const url = {
    1: '/repositories?q=stars:>1000',
    2: '/repositories?q=language:javascript+stars:>100',
    3: '/repositories?q=language:ruby+stars:>100',
    4: '/repositories?q=language:java+stars:>100',
    5: '/repositories?q=language:css+stars:>100',
    6: '/repositories?q=language:python+stars:>100',
  }

  const [allData, setAllData] = useState({
    1: { list: [], pageNumber: 1 },
    2: { list: [], pageNumber: 1 },
    3: { list: [], pageNumber: 1 },
    4: { list: [], pageNumber: 1 },
    5: { list: [], pageNumber: 1 },
    6: { list: [], pageNumber: 1 },
  })
  const [currentIndex, setCurrentIndex] = useState(1)
  const [columnWidth, setColumnWidth] = useState('25%')
  const [newsItemWidth, setNewsItemWidth] = useState('100px')
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const listenUrlChange = newValue => {
    setCurrentIndex(newValue)
    if (allData[newValue].list.length === 0) {
      fetchDataFun(1, newValue)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 900px)').matches) {
        setColumnWidth('50%')
        setNewsItemWidth('186px')
      } else if (window.matchMedia('(max-width: 1450px)').matches) {
        setColumnWidth('33.3%')
        setNewsItemWidth('215px')
      } else {
        setColumnWidth('25%')
        setNewsItemWidth('254px')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if (!loading && hasMore) {
        const pageNum = allData[currentIndex].pageNumber + 1
        fetchDataFun(pageNum)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const fetchDataFun = async (pageNumber = 1, index = currentIndex) => {
    try {
      setLoading(true)
      const response = await fetchData(baseUrl, `${url[index]}&per_page=10&page=${pageNumber}`)
      const newData = [...allData[index].list, ...response.items]
      const newAllData = { ...allData, [index]: { list: newData, pageNumber } }
      setAllData(newAllData)
      setLoading(false)
      if (response.items.length !== 10) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  function getRouteParams() {
    const params = {}
    const queryString = window.location.search.substring(1)
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=')
      params[key] = decodeURIComponent(value)
    })
    return params.technologyType || 1
  }

  useEffect(() => {
    const newIndex = getRouteParams()
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex)
    }
    if (allData[newIndex].list.length === 0) {
      fetchDataFun(1, newIndex)
    }
  }, [])

  return (
    <div className='App'>
      <div className='web-title'>github 热门站</div>
      <div className='news-container'>
        <NewsNav listenUrlChange={listenUrlChange} currentIndex={Number(currentIndex)} />
        <NewsList currentData={allData[currentIndex].list} columnWidth={columnWidth} newsItemWidth={newsItemWidth} />
      </div>

      {loading && <div className='loading'>Loading...</div>}
      {!loading && !hasMore && <div className='loading'>No more data~</div>}
    </div>
  )
}
const NewsList = ({ currentData, columnWidth, newsItemWidth }) => {
  const goDetail = url => {
    window.open(url)
  }

  return (
    <div className='news-list'>
      {currentData &&
        currentData.map((news, index) => (
          <div key={news.id} className='news-item' onClick={() => goDetail(news.html_url)} style={{ flex: `0 0 calc(${columnWidth} - 16px)` }}>
            <div className='news-item-content' style={{ width: '100%' }}>
              <div className='news-item-index'>#{index + 1}</div>
              <div className='img-box' style={{ width: newsItemWidth, height: newsItemWidth }}>
                <img className='lazyload' data-src={`${news.owner.avatar_url}?t=${Date.now()}`} alt={news.title} />
              </div>
              <div className='news-item-title text-restriction'>{news.name}</div>
              <div className='user-info-box'>
                <svg width='21' height='21'>
                  <image href='./icon/user.svg' width='21' height='21' />
                </svg>
                <div className='news-text text-restriction'>{news.name}</div>
              </div>
              <div className='user-info-box'>
                <svg width='21' height='21'>
                  <image href='./icon/user.svg' width='21' height='21' />
                </svg>
                <div className='news-text'>{news.stargazers_count} stars</div>
              </div>
              <div className='user-info-box'>
                <svg width='21' height='21'>
                  <image href='./icon/user.svg' width='21' height='21' />
                </svg>
                <div className='news-text'>{news.forks_count} forks</div>
              </div>
              <div className='user-info-box'>
                <svg width='21' height='21'>
                  <image href='./icon/user.svg' width='21' height='21' />
                </svg>
                <div className='news-text'>{news.open_issues_count} open issues</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
export default Popular
