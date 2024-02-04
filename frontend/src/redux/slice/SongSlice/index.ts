import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './constants';
import { type SongState } from '../../../types';


const songSlice = createSlice({
  name:'song',
  initialState: initialState,
  reducers:{
    setSongSlice(
      state: SongState,
      action: PayloadAction<SongState>
    ): SongState {
      state= action.payload
      return state
    }
  }
})

export const { setSongSlice } = songSlice.actions
export default songSlice.reducer