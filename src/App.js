import React from "react";
import { Provider } from "react-redux";
import store from "./redux";
import "./App.css";
import "./Board.css";
import "./TileColours.css";
import Game from "./components/Game";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Game />
      </div>
    </Provider>
  );
}

export default App;
