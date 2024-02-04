import { type PayloadAction,createSlice } from '@reduxjs/toolkit';
import { initialState } from './constants';
import { type SongsState } from './types';
import { type SongState } from '../../../types';


const SongsSlice= createSlice({
  name:"songs",
  initialState:initialState,
  reducers:{
    getSongsSlice: (state: SongsState,action: PayloadAction<SongsState>): SongsState=>{
      state = action.payload
      return state
    },
    addSongSlice: (state: SongsState,action: PayloadAction<SongState>): SongsState=>{
      state.push(action.payload)
      return state
    },

    editSongSlice: (state,action: PayloadAction<SongState>): SongsState=>{
      state = state.map((song)=> song.id === action.payload.id ? action.payload : song)
      return state
    },

    deleteSongSlice: (state: SongsState,action: PayloadAction<SongState>): SongsState=>{
      state=state.filter((song)=>song.id !==action.payload.id)
      return state
    },
  }
})

export const { getSongsSlice,addSongSlice,deleteSongSlice,editSongSlice } = SongsSlice.actions
export default SongsSlice.reducer