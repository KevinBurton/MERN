export interface Award {
  wins: number,
  nominations: number,
  text: string
};

export interface Imdb {
  rating: number,
  votes: number,
  id: number
};
export interface TomatoViewer {
  rating: number,
  numReviews: number,
  meter: number
};
export interface Tomato {
  viewer: TomatoViewer,
  production: string,
  lastUpdated: Date
};
export interface Movie {
      plot: string,
      genres: string[],
      runtime: number,
      cast: string[],
      title: string,
      fullplot: string,
      languages: string[],
      released: Date,
      directors: string[],
      writers: string[],
      awards: Award,
      lastupdated: string,
      year: number,
      imdb: Imdb,
      countries: string[],
      type: string,
      tomatoes: Tomato
}
