import { combineReducers } from "@reduxjs/toolkit";
import songReducer from "./slice/SongSlice";
import songsReducer from "./slice/SongsSlice";

const rootReducer = combineReducers({
  song: songReducer,
  songs: songsReducer,
});

export default rootReducer;