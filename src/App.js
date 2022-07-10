import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    let myData = require('./data/data.json').solutions;
    const randomSolution = myData[Math.floor(Math.random() * myData.length)];
    setSolution(randomSolution.word);
  }, [setSolution])

  return (
    <div>
      <h1>Wordle</h1>
      {
        solution && <Wordle solution={solution}/>
      }
    </div>

  );
}

export default App;
