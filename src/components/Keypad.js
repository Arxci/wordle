import { useEffect, useState } from "react"

export default function Keypad({ usedKeys }) {
    const [letters, setLetters] = useState(null);

    useEffect(() => {
        let myData = require('../data/data.json').letters;
        setLetters(myData);
    }, []);

  return (
    <div className="keypad">
        {
            letters && letters.map((letter) => {
                const color = usedKeys[letter.key];

                return (
                    <div key={letter.key} className={color}>
                        {letter.key}
                    </div>
                )
            })
        }
    </div>
  )
}
