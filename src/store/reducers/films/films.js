import {ActionType} from "../../action/action";
import {extend} from "../../../utils/common";
import {ALL_GENRE} from "../../../const";

export const initialState = {
  films: [],
  reviews: [],
  promoFilm: null,
  showFilmsCount: 0,
  activeGenre: ALL_GENRE,
  favoriteFilms: []
};

export const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOGGLE_GENRE_FILTER:
      if (action.payload === ALL_GENRE) {
        return extend(state, {
          films: state.films,
          activeGenre: initialState.activeGenre,
          showFilmsCount: 8,
        });
      }

      const filteredFilmsLength = state.films
        .filter((film) => action.payload === film.genre)
        .length;

      return extend(state, {
        films: state.films,
        activeGenre: action.payload,
        showFilmsCount: state.showFilmsCount < filteredFilmsLength ? 8 : filteredFilmsLength
      });

    case ActionType.SHOW_MORE_FILMS:
      return extend(state, {
        showFilmsCount: state.showFilmsCount + action.payload < state.films.length ? state.showFilmsCount + action.payload : state.films.length
      });

    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
        showFilmsCount: state.showFilmsCount + 8 < action.payload.length ? state.showFilmsCount + 8 : action.payload.length
      });

    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favoriteFilms: action.payload
      });

    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload
      });

    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload
      });

    default:
      return state;
  }
};
