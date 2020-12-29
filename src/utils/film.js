import {FilmRateDescriptions} from "../const";

export default (rate) => {
  if (rate >= 0 && rate < 3) {
    return FilmRateDescriptions.BAD;
  } else if (rate >= 3 && rate < 5) {
    return FilmRateDescriptions.NORMAL;
  } else if (rate >= 5 && rate < 8) {
    return FilmRateDescriptions.GOOD;
  } else if (rate >= 8 && rate < 10) {
    return FilmRateDescriptions.VERY_GOOD;
  } else if (rate === 10) {
    return FilmRateDescriptions.AWESOME;
  } else {
    throw new Error(FilmRateDescriptions.UNEXPECTED_RATE);
  }
};
