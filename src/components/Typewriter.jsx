import { useState, useEffect, useImperativeHandle, forwardRef } from "react";

const Typewriter = forwardRef(({ text, typingSpeed = 100}, ref) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  let interval = null;

  useEffect(() => {
    start();

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, text, typingSpeed]);

  const start = () => {
    if (!text) return;

    interval = setInterval(() => {
      setDisplayText((prevText) => prevText + text[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, typingSpeed);

    if (currentIndex >= text.length) {
      clearInterval(interval);
    }    
  }

  useImperativeHandle(ref, () => ({
    reset: () => {
      setCurrentIndex(() => 0);
      setDisplayText(() => "");
      if (interval) {
        clearInterval(interval);
      }

      start();
    },
  }));

  return <div>{displayText}</div>;
});

export default Typewriter;