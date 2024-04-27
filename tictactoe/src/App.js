import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [ game , setGame] = useState([])
  const [turn, setTurn] = useState(1)
  const [victory, setVictory] = useState('')
  const [error, setError] = useState('')
  const [isFull, setIsFull] = useState(false)

  useEffect(()=> {
      setGame(Array.from({length: 3}, ()=> Array.from({length: 3}, () => 0)))
  },[victory, isFull])

  const traverse = (i, j, turn, trackArr, iDiff, jDiff, depth) => {
   
    if (
        i < 0 || j < 0 ||
        i >= trackArr.length || j >= trackArr[i].length
    ) {
        return {val: true, depth};
    }

    if (trackArr[i][j] !== turn) {
        return {val: false, depth: 0};
    }

    const traversedValue = traverse(i + iDiff, j + jDiff, turn, trackArr, iDiff, jDiff, depth+1)

    return traversedValue
  };

  const checkIfValidClick = (i, j) => {
    if(game[i][j] === 1 || game[i][j] === -1){
      setError("Column is already selected , Please select another column")
      return false
    }
    return true
  }

  const checkIfEmpty = (track) => {
    let flag = false
    track?.map(row => row?.map(col => {
      if(col === 0)
        flag = true
    }))
    if(!flag)
      setIsFull(true)
    return flag
  }

  const handleColClick = (i, j) => {

    if(!checkIfValidClick(i, j)){
      return 
    }
    if(error)
      setError('')
    const track = [...game]

    track[i][j] = turn
    const min = Math.min(track?.length, track[0].length)
    const top = traverse(i, j-1, turn, track, 0, -1, 0)
    const bottom = traverse(i, j+1, turn, track, 0, 1, 0)
    const left = traverse(i-1, j, turn, track, -1, 0, 0)
    const right = traverse(i+1, j, turn, track, 1, 0, 0)
    const topLeft = traverse(i-1, j-1, turn, track, -1, -1, 0)
    const bottomRight = traverse(i+1, j+1, turn, track, 1, 1, 0)
    const topRight = traverse(i-1, j+1, turn, track, -1, 1, 0)
    const bottomLeft = traverse(i+1, j-1, turn, track, 1, -1, 0)
    const vertical = top?.val && bottom?.val && ((top?.depth + bottom?.depth )>= min-1)
    const horizontal = left?.val && right?.val && ((left?.depth + right?.depth )>= min-1)
    const diaLeft = topLeft?.val && bottomRight?.val && ((topLeft?.depth + bottomRight?.depth) >= min-1)
    const diaRight = topRight?.val && bottomLeft?.val && ((topRight?.depth + bottomLeft?.depth) >= min-1)
   
    let isVictory = vertical || horizontal || diaLeft || diaRight
    if(isVictory){
      setVictory(turn)
      setTurn(1)
    }
  
    if(!isVictory && !checkIfEmpty(track)){
      setError("Game Finished!")
    }
    setGame([...track])
    if(turn === 1)
      setTurn(-1)
    else
      setTurn(1)
    
  }

  const setStarter = () => {
    setVictory('')
    setIsFull(false)
    setError('')
    setTurn(1)
  }

  return (
    <div className="container">
      {victory && <h2>Player {victory === 1 ? "1" : "2"} won</h2>}
      {error && <h4 className='error-text'>{error}</h4>}
      {(!victory && !isFull) ? ( 
      <>
        <h3>Player {turn === 1 ? "1's" : "2's" } turn</h3>
        {game?.map((row, i)=> {
            return <div key={`row-${i}`} className='row'>
              {row?.map((col, j)=> {
                return <div key={`col-${i}-${j}`} onClick={() => handleColClick(i, j)}  className='col'>
                  {game[i][j] === 1 ? "x" : game[i][j] === -1 ? "o": ''}
                </div>
              })}
            </div>
        })}
      </>)
      :
      <button onClick={()=> setStarter('')}>Start Again</button>
      }
    </div>
  );
}

export default App;
