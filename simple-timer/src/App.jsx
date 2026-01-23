import { useRef, useState, useEffect } from "react";
import TimerFun from "./component/TimerFun";
import Button from "./component/Button";
const App = () => {
  const timeRef = useRef(null);
  const [timer, setTimer] = useState(() => {
    return Number(localStorage.getItem("timerLocal") || 0);
  });
  const [isRunning, setIsRunning] = useState(false);

  const toggleEvent = () => {
    if (isRunning) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    } else {
      timeRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const resetEvent = () => {
    clearInterval(timeRef.current);
    timeRef.current = null;
    setTimer(0);
    setIsRunning(false);
    localStorage.removeItem("timerLocal");
  };

  useEffect(() => {
    console.log("Mount");
    localStorage.setItem("timerLocal", JSON.stringify(timer));
  }, [timer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <TimerFun timer={timer} />
      <div className="flex gap-4">
        <Button
          toggleEvent={toggleEvent}
          resetEvent={resetEvent}
          isRunning={isRunning}
        />
      </div>
    </div>
  );
};

export default App;
