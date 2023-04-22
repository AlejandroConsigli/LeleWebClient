import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [data, setData] = useState("Connecting...");

  useEffect(() => {
    fetch("https://lele-web-server.vercel.app/api")
      .then((res) => res.json())
      .then(({ message }) => setData(message));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Welcome to Lele Web Greetings</h1>
      <span className="subtitle">{data}</span>
    </div>
  );
}

export default App;
