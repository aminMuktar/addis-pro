import { all, fork } from "redux-saga/effects";
import watchGetSongs from "./songs";

function* rootSaga() {
  yield all([fork(watchGetSongs)]);
  yield all([watchGetSongs()]);
}

export default rootSaga;