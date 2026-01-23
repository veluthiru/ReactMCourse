import React, { useEffect, useRef } from "react";

const Button = ({ toggleEvent, resetEvent, isRunning }) => {
  const startBtnRef = useRef(null);
  useEffect(() => {
    if (startBtnRef.current) {
      startBtnRef.current.focus();
    }
  }, []);
  return (
    <>
      <button
        ref={startBtnRef}
        onClick={toggleEvent}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={resetEvent}
        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
      >
        Reset
      </button>
    </>
  );
};

export default Button;
