import useFetch from "use-http";

import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useCallback } from "react";

function App() {
  const options = {};
  const { get, loading, response, error } = useFetch(
    "http://localhost:8000",
    options
  );

  const handleFetchData = useCallback(async () => {
    const time = await get("/time");
    console.log("Refresh", response.ok, time);
    if (response.ok) setTime(time);
  }, [get, response]);

  const [time, setTime] = useState("");
  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {time && <p>{time}</p>}
      </header>
    </div>
  );
}

export default App;
