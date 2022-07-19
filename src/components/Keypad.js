import { useEffect, useState } from "react"

export default function Keypad({ usedKeys, PressedBack, PressedEnter, handleKeyup }) {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        let myData = require('../data/data.json').letters;
        setLetters(myData);
    }, []);

  return (
    <div className="keypad">
        {
            letters && letters.map((letter, idx) => {
                const color = usedKeys[letter.key];

                if (idx === letters.length-1) {
                    return (
                        <>
                            <div key={letter.key} className={color}>
                                {letter.key}
                            </div>
                            <div key={999} onClick={() => {
                                PressedBack();
                            }}>
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                            <div key={9999} onClick={() => {
                                PressedEnter();
                            }}>
                                <i class="fa-solid fa-check"></i>
                            </div>
                        </>
                    )
                }

                return (
                    <div key={letter.key} className={color} onClick={(e) => {
                        handleKeyup(letter);

                    }}>
                        {letter.key}
                    </div>
                )
            })
        }
    </div>
  )
}
