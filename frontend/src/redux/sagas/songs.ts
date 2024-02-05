import { put, takeEvery } from "redux-saga/effects";
import { getSongsAPI,
  createSongAPI,
  deleteSongAPI,
  updateSongAPI,
  getTotalSongsAPI,
getTotalArtistsAPI,
getTotalAlbumsAPI,
getTotalGenresAPI,
genreInSongsAPI,
songsInAlbumAPI,
artistStatsAPI,
} from "../../api";
import { getSongsSlice,
      addSongSlice,
      deleteSongSlice,
      editSongSlice } from '../slice/SongsSlice'


import { GET_SONGS,
  CREATE_SONG,
  UPDATE_SONG_BY_ID,
  DELETE_SONG_BY_ID,
  GET_TOTAL_NUMBER_OF_SONGS,
  GET_TOTAL_NUMBER_OF_ARTISTS,
  GET_TOTAL_NUMBER_OF_ALBUMS,
  GET_TOTAL_NUMBER_OF_GENRE,
  GET_TOTAL_NUMBER_OF_GENRE_IN_SONGS,
  GET_TOTAL_NUMBER_OF_SONGS_IN_ALBUMS,
  GET_ARTIST_STATS,
} from "../types";
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
export function* workGetTotalSongsSaga(): any {
  try {
    const response = yield getTotalSongsAPI();

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

  //stats
  yield takeEvery(GET_TOTAL_NUMBER_OF_SONGS, workGetTotalSongsSaga);

}

export default watchGetSongs;