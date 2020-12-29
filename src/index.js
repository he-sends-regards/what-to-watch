import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "./components/app/app";
import {fetchFilmsList, checkAuth, fetchPromoFilm, loadAuthData} from "./store/api-actions";
import store from "./store/store";

Promise.all([
  store.dispatch(checkAuth()),
  store.dispatch(fetchPromoFilm()),
  store.dispatch(fetchFilmsList()),
  store.dispatch(loadAuthData())
]).then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
});
