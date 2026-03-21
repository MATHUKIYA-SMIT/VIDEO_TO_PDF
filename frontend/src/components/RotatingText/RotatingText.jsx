import { useEffect, useState } from "react";
import "./RotatingText.css"

function RotatingText({
    words,
    interval = 2000,
    }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
        }, interval);

        return () => clearInterval(id);
    }, [words, interval]);

    return (
        <span className="rotating-text">
        {words[index]}
        </span>
    );
}

export default RotatingText;
