import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef } from "react"
import model from "../utils/openai"
import { API_OPTIONS } from "../utils/constants"
import { addGptMovieResult } from "../utils/gptSlice"

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang); 
  const searchText = useRef(null);

  const searchMovieTMDB =async (movie)=>{
    const data= await fetch("https://api.themoviedb.org/3/search/movie?query="
      +movie+
      "&include_adult=false&language=en-US&page=1", API_OPTIONS)
    const json=await data.json();
    return json.results;
  }
  
  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const geminiQuery =
    "Act as a movie recommendation system and suggest five movie names for the query: " +
    searchText.current.value +
    ". Only return the names of 5 movies, comma-separated, with no additional text.";   
    const result=await model.generateContent(geminiQuery);
    const textResponse=result.response.text();
    const gptMovies = textResponse
      .split(",")  // Split by commas
      .map(movie => movie.trim())  // Remove extra spaces around each movie
      .filter(movie => movie.length > 0);  // Ensure no empty entries

    console.log(gptMovies);

    const promiseArray=gptMovies.map((movie)=>searchMovieTMDB(movie));
    const tmdbResults=await Promise.all((promiseArray));
    console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));

     
  };  

  return (
    <div className="pt-[45%] md:pt-[10%] flex justify-center">
        <form className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e)=>e.preventDefault()}>
        <input
        ref={searchText}
        type="text"
        className="p-4 m-4 col-span-9"
        placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        onClick={handleGptSearchClick}>
            {lang[langKey].search}       
            </button>
        </form>

    </div>
  )
}

export default GptSearchBar;