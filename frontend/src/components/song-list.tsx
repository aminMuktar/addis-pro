import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { type RootState } from "../store";
import { GET_SONGS,DELETE_SONG_BY_ID } from "../redux/types";
import { setSongSlice } from "../redux/slice/SongSlice";

const SongList:React.FC =() =>{
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs);
  useEffect(() => {
    dispatch({ type: GET_SONGS });
  }, [dispatch]);
  
  return(
        <ul>
      {songs.map((song)=>(
        <li key={song.id}>
          {song.title} - {song.artist} - {song.album} - {song.genre}
          <button
                  onClick={() => dispatch(setSongSlice(song))}
                >
                  Edit
                </button>
          <button
                  onClick={() =>
                    dispatch({ type: DELETE_SONG_BY_ID, id: song.id })
                  }
                >
                  Delete
                </button>
          </li>
      ))}
      </ul>
  );
  
}
export default SongList