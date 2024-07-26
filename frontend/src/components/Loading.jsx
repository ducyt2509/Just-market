import React from "react";
import { quantum } from "ldrs";

quantum.register();

const css = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes fadeInOut {
    0% { opacity: 0; }
    25% { opacity: 1; }
    75% { opacity: 1; }
    100% { opacity: 0; }
  }

  .letter {
    display: inline-block;
    opacity: 0;
    animation: fadeIn 3.5s forwards;
  }

  .letter:nth-child(1) { animation-delay: 0.1s; }
  .letter:nth-child(2) { animation-delay: 0.2s; }
  .letter:nth-child(3) { animation-delay: 0.3s; }
  .letter:nth-child(4) { animation-delay: 0.4s; }
  .letter:nth-child(5) { animation-delay: 0.5s; }
  .letter:nth-child(6) { animation-delay: 0.6s; }
  .letter:nth-child(7) { animation-delay: 0.7s; }

  .loading-text {
    animation: fadeInOut3s infinite;
  }

  .loading-text span {
    display: inline-block;
    animation: fadeIn 4s infinite;
  }
`;

function Loading() {
  return (
    <>
      <style>{css}</style>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white px-16 py-12 rounded-lg shadow-lg flex flex-col items-center ">
          <l-quantum size="45" speed="1.75" color="black"></l-quantum>
          <p className="mt-4 text-center text-lg loading-text">
            {Array.from("Loading").map((letter, index) => (
              <span key={index} className="letter">
                {letter}
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}

export default Loading;
