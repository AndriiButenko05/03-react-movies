import axios from "axios";
import  { Movie } from '../types/movie';
axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_API_KEY}`;

const url: string = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

interface GetMoviesResponse{
  results: Movie[]
}

export default async function fetchMovies (title: string) {
    const response = await axios.get<GetMoviesResponse>(`${url}&query=${title}`)
    return response.data.results;
}