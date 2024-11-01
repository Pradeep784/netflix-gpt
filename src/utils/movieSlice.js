import { createSlice } from "@reduxjs/toolkit";


const moviesSlice = createSlice({
    name: "movies",
    initialState:{
        nowPlayingMovies:null,
        trailerVideo:null,
        PopularMovies:null,
        UpcomingMovies:null,
        TrendingMovies:null,
    },
    reducers :{
        addNowPlayingMovies : (state, action)=>{
            state.nowPlayingMovies= action.payload;

        },
        addPopularMovies : (state, action)=>{
            state.PopularMovies= action.payload;

        },
        addTrendingMovies : (state, action)=>{
            state.TrendingMovies= action.payload;

        },
        addUpcomingMovies : (state, action)=>{
            state.UpcomingMovies= action.payload;

        },
       
        addtrailerVideo : (state, action)=>{
            state.trailerVideo= action.payload;

        },
    },
});

export const {addNowPlayingMovies, addUpcomingMovies, addtrailerVideo, addPopularMovies,addTrendingMovies} = moviesSlice.actions;
export default moviesSlice.reducer;
