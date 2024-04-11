import { useState } from 'react'
import './battle.scss'
function Battle() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [showInput1, setShowInput1] = useState(true)
  const [showInput2, setShowInput2] = useState(true)
  const [submittedInfo, setSubmittedInfo] = useState(null)

  const handleInput1Change = event => {
    setInput1(event.target.value)
  }

  const handleInput2Change = event => {
    setInput2(event.target.value)
  }

  const handleSubmit1 = () => {
    console.log('123')
    setSubmittedInfo(input1)
    setShowInput1(false)
  }

  const handleSubmit2 = () => {
    setSubmittedInfo(input2)
    setShowInput2(false)
  }

  const handleCloseInfo = index => {
    if (index == 1) {
      setShowInput1(true)
    } else if (index == 2) {
      setShowInput2(true)
    } else {
      setShowInput1(true)
      setShowInput2(true)
    }
  }
  return (
    <div className='battle-box'>
      <h1>操作流程</h1>
      <div className='battle-process'>
        <div>第一步：选择用户</div>
        <div>第二步：按下battle按钮</div>
        <div>第三步：查看结果</div>
      </div>
      <div className='battle-operate'>
        <div className='battle-input-box'>
          <div className='person-num'>Player One</div>
          {showInput1 && (
            <div>
              <input type='text' value={input1} onChange={handleInput1Change} />
              <button onClick={handleSubmit1}>提交1</button>
            </div>
          )}
          {!showInput1 && (
            <div>
              <p>{input1}</p>
              <button onClick={handleCloseInfo(1)}>关闭</button>
            </div>
          )}
        </div>
        <div className='battle-input-box'>
          <div className='person-num'>Player Two</div>
          {showInput2 && (
            <div>
              <input type='text' value={input2} onChange={handleInput2Change} />
              <button onClick={handleSubmit2}>提交2</button>
            </div>
          )}
          {!showInput2 && (
            <div>
              <p>{input2}</p>
              <button onClick={handleCloseInfo(2)}>关闭</button>
            </div>
          )}
        </div>
      </div>
      <div className='battle-button'>
        {!showInput2 && !showInput2 && (
          <div>
            <p>{submittedInfo}</p>
            <button onClick={handleCloseInfo(3)}>关闭</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Battle
