import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux";
import "./App.css";
import "./Board.css";
import "./TileColours.css";
import Game from "./components/Game";
import MainScreen from "./components/MainScreen";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/play" render={() => <Game />} />
          <Route exact path="/" render={() => <MainScreen />} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
