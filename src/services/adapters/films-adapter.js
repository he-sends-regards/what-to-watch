export const adaptFilmFromServer = (film) => ({
  title: film.name,
  year: film.released,
  rate: film.rating,
  duration: film.run_time,
  ratings: film.scores_count,
  starring: film.starring.join(`, `),
  poster: {src: film.poster_image},
  background: {src: film.background_image},
  preview: {src: film.preview_image},
  video: {src: film.video_link},
  trailer: {src: film.preview_video_link},
  genre: film.genre,
  description: film.description,
  id: film.id,
  director: film.director
});
