import { useEffect } from "react"

export default function Modal({ isCorrect, turn, solution }) {

    useEffect(() => {
        const btn = document.querySelector('.playAgainBtn');
        btn.addEventListener('click', () => {
            window.location.reload();
        })
    }, [])

  return (
    <div className="modal">
        {isCorrect && (
            <div>
                <h1>You Win!</h1>
                <p className="solution win">SOLUTION: {solution}</p>
                <p>You found the solution in {turn} guesses :)</p>
                <button className="playAgainBtn">Play Again</button>
            </div>
        )}

        {!isCorrect && (
            <div>
                <h1>You Lose!</h1>
                <p className="solution lose">SOLUTION: {solution}</p>
                <p>Better luck next time :)</p>
                <button className="playAgainBtn">Play Again</button>
            </div>
        )}
    </div>
  )
}
