import React from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route, Link} from "react-router-dom";
import Main from "../main/main";
import AddReview from "../add-review/add-review";
import Film from "../film/film";
import Login from "../login/login";
import MyList from "../my-list/my-list";
import Player from "../player/player";
import PrivateRoute from "../private-route/private-route";
import {filmValidator} from "../../propsValidators/validators.prop";
import browserHistory from "../../browser-history";
import {AppRoute} from "../../const";
import {connect} from "react-redux";

const defaultFilmIdForTests = 0;

const App = (props) => {
  const {films} = props;

  return (
    <Router history={browserHistory}>
      <Switch>
        <Route path={AppRoute.ROOT} exact>
          <Main />
        </Route>
        <Route path={AppRoute.LOGIN} exact>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.MY_LIST}
          render={() => {
            return (
              <MyList />
            );
          }}
        />
        <PrivateRoute
          exact
          path={AppRoute.ADD_REVIEW}
          render={() => {
            return (
              <AddReview filmId={defaultFilmIdForTests} />
            );
          }}
        />
        <Route path={`${AppRoute.FILM}/:id`}>
          <Film films={films} filmId={defaultFilmIdForTests} />
        </Route>
        <Route path={`${AppRoute.PLAYER}/:id`} exact>
          <Player films={films} filmId={defaultFilmIdForTests} />
        </Route>
        <Route
          render={() => (
            <React.Fragment>
              <h1>
                404.
                <br />
                <small>Page not found</small>
              </h1>
              <Link to={AppRoute.ROOT}>Go to main page</Link>
            </React.Fragment>
          )}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape(filmValidator))
};

const mapStateToProps = ({FILMS}) => ({
  films: FILMS.films,
});

export {App};
export default connect(mapStateToProps)(App);
