import { BG_URL } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
       <div className=' -z-10 fixed'>
       <img className="h-screen object-cover w-screen" src={BG_URL}
        alt='logo'/>
      </div>
      <div className=" ">
      <GptSearchBar/>
      <GptMovieSuggestion/>
      </div>
    </>
  )
    
    
    
  

}

export default GPTSearch;