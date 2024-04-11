import { useEffect, useState } from 'react'
import './battleResult.scss'
import { useSearchParams, useNavigate } from 'react-router-dom'
import fetchData from '@/until/fetch'
function BattleResult() {
  const navigate = useNavigate()
  const baseUrl = `https://api.github.com/users`
  const [searchParams] = useSearchParams()
  const [userInfo, setUserInfo] = useState({ 1: {}, 2: {} })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    compareAndAssign()
  }, [])

  async function compareAndAssign() {
    const userName1 = searchParams.get('personOne')
    const userName2 = searchParams.get('personTwo')
    const person1 = await fetchData(baseUrl, `/${userName1}`)
    const person2 = await fetchData(baseUrl, `/${userName2}`)
    // 假设比较条件为 userInfo1.name 和 userInfo2.name 是否相等
    console.log(person1.followers, person2.followers)
    if (person1.followers >= person2.followers) {
      setUserInfo({
        1: person1,
        2: person2,
      })
    } else {
      setUserInfo({
        1: person2,
        2: person1,
      })
    }
    setLoading(false)
  }
  const resetBtn = () => {
    setUserInfo({
      1: {},
      2: {},
    })
    navigate(`/battle`)
  }
  return (
    <div className='battle-result-box'>
      {!loading && (
        <div>
          <h1>Battle Result</h1>
          <div className='battle-user-box'>
            {userInfo && (
              <div className='battle-user-item'>
                <div>Winner</div>
                <img src={userInfo[1].avatar_url} alt='' />
                <div>Scores:{}</div>
                <div>Name:{userInfo[1].login}</div>
                <div>followers:{userInfo[1].followers}</div>
                <div>123</div>
              </div>
            )}
            {userInfo && (
              <div className='battle-user-item'>
                <div>Loser</div>
                <img src={userInfo[2].avatar_url} alt='' />
                <div>Scores:{}</div>
                <div>Name:{userInfo[2].login}</div>
                <div>followers:{userInfo[2].followers}</div>
                <div>123</div>
              </div>
            )}
          </div>
          <div className='battle-result-btn-box'>
            <button onClick={resetBtn}>RESET</button>
          </div>
        </div>
      )}
      {loading && <h1>Loading...</h1>}
    </div>
  )
}

export default BattleResult
