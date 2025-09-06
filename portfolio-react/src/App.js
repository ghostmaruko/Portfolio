import React from "react";
import "./App.css"; // Se hai uno stile base
import { SpaceDevadersGame } from "./games/SpaceDevadersGame";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1>Benvenuto nel mio Portfolio</h1>
      <p>👾 Gioca a Space Devaders mentre esplori!</p>

      <section id="game" style={{ marginTop: "40px" }}>
        <SpaceDevadersGame />
      </section>
    </div>
  );
}

export default App;
