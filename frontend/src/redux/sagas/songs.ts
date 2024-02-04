import { put, takeEvery } from "redux-saga/effects";
import { getSongsAPI,createSongAPI,deleteSongAPI,updateSongAPI } from "../../api";
import { getSongsSlice,addSongSlice,deleteSongSlice,editSongSlice } from '../slice/SongsSlice'


import { GET_SONGS,CREATE_SONG,UPDATE_SONG_BY_ID,DELETE_SONG_BY_ID } from "../types";
import { type SongState } from "../../types";
// import { setSongSlice } from "../slice/SongSlice";

export function* workGetSongsSaga(): any {
  try {
    const response = yield getSongsAPI();

    yield put(getSongsSlice(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* workCreateSong(action: { type: string; song: SongState }) {

  try {
    yield createSongAPI(action.song);
    yield addSongSlice(action.song);
  } catch (error) {
    console.error(error);
  }
}
export function* workUpdateSongById(action: { type: string; song: SongState }) {
  const { song } = action;

  try {
    yield updateSongAPI(song);

    yield put(editSongSlice(song));
  } catch (error) {
    console.error(error);
  }
}


export function* workDeleteSongById(action: any) {
  try {
    yield deleteSongAPI(action.id);

    yield put(deleteSongSlice(action));
  } catch (error) {
    console.error(error);
  }
}

// watcher:
function* watchGetSongs() {
  yield takeEvery(GET_SONGS, workGetSongsSaga);
  yield takeEvery(CREATE_SONG, workCreateSong);
  yield takeEvery(UPDATE_SONG_BY_ID, workUpdateSongById);
  yield takeEvery(DELETE_SONG_BY_ID, workDeleteSongById);
}

export default watchGetSongs;