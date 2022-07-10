import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color: 'grey'};
        });

        formattedGuess.forEach((letter, i) => { // correct position
            if (solutionArray[i] === letter.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
            }
        });

        formattedGuess.forEach((letter, i) => { // in solution
            if (solutionArray.includes(letter.key) && letter.color === 'grey') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(letter.key)] = null;
            }
        });

        return formattedGuess;
    }

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorect(true);
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });
        
        setTurn((prevTurn) => {
            return prevTurn + 1;
        });

        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys};
            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key];

                if (letter.color === "green") {
                    newKeys[letter.key] = "green";
                    return;
                }

                if (letter.color === "yellow" && currentColor !== "green") {
                    newKeys[letter.key] = "yellow";
                    return;
                }

                if (letter.color === "grey" && letter.color !== "green" && currentColor !== "yellow") {
                    newKeys[letter.key] = "grey";
                    return;
                }
            })

            return newKeys;
        })

        setCurrentGuess('');
    }

    const handleKeyup = ({ key }) => {
        if (key === "Enter") {
            if (turn > 5) {
                return;
            }

            if (history.includes(currentGuess)) {
                return;
            }

            if (currentGuess.length !== 5) {
                return;
            }

            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1);
            })
            return;
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                });
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys}
}

export default useWordle;