import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/useNowPopularMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);


  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();


  return (
    <div>
      <Header/>
      {showGPTSearch ? (
        <GptSearch/>
      ) : (
        <>
        <MainContainer/>
        <SecondaryContainer/>
        </>
      )};
     
    </div>
  );
};

export default Browse;