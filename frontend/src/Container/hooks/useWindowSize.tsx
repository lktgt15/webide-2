import {useState, useEffect} from 'react';

const initialValue : {
  width?:  number
  height? : number
} = {
  width: undefined,
  height: undefined,
}

export default function useWindowSize() {

  const [windowSize, setWindowSize] = useState(initialValue);
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  
  return windowSize;
}
