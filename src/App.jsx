import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/count`)
      .then((r) => r.json())
      .then((data) => setCount(data.value))
      .catch((e) => setError(e.message));
  }, []);

  const increment = async () => {
    try {
      const res = await fetch(`${API_URL}/count/increment`, { method: "POST" });
      const data = await res.json();
      setCount(data.value);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <p>변경사항입니다!</p>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Counter App</h1>
          <p>
            Count is stored in the backend DB via <code>Prisma</code>
          </p>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
        <button
          className="counter"
          onClick={increment}
          disabled={count === null}
        >
          Count is {count ?? "..."}
        </button>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
