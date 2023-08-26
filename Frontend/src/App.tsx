import { useEffect, useState } from 'react'

type Board =Number[][];

function App() {

  const [board,setBoard] = useState<Board|null>(null);
  useEffect(()=>{
    fetch("https://localhost:7096/sudoku", {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    }).then( response =>{
      response.json().then(data => setBoard(data));
    })
  },[])
  console.log({board},1)
  return (
    <div>
      <h1>
        Sudoku!
      </h1>
      {!board && <div>Loading...</div>}
      {board && <div style={{display:"grid", gridTemplateColumns: "repeat(9, 1fr)"}}>
        {board.map( row =>{
          return row.map( item => <div>{item === 0 ?"" :item.toString()}</div>)
        })}
        </div>}
    </div>
  )
}

export default App
