import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { type RootState } from "../store";
import { GET_SONGS,DELETE_SONG_BY_ID } from "../redux/types";
import { setSongSlice } from "../redux/slice/SongSlice";
import styled from '@emotion/styled';
import { space, layout, typography, color } from 'styled-system';

const CardContainer = styled.div`
  ${space}
  ${layout}
  ${typography}
  ${color}
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;
const GridContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
gap: 20px;
padding-bottom: 20px; /* Add bottom padding for spacing at the bottom */
margin-top: 20px; /* Add top margin for spacing from the top of the page */
margin-right: auto; /* Add auto margin for centering horizontally */
margin-left: auto; /* Add auto margin for centering horizontally */
max-width: 1200px; /* Add max-width to limit the width of the grid */
`;
const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const Artist = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #666;
`;

const Album = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #666;
`;

const Genre = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #666;
`;
const EditButton = styled.p`
  margin: 5px;
  color:blue;
  font-size: 14px;
  cursor:pointer;
`;

const DeleteButton = styled.p`
  margin: 5px;
  color:red;
  font-size: 14px;
  cursor:pointer;
`
const ButtonBox = styled.div`
  display:flex;
`;

const SongList:React.FC =() =>{
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs);
  useEffect(() => {
    dispatch({ type: GET_SONGS });
  }, [dispatch]);
  
  return(
        <GridContainer>
      {songs.map((song)=>(
        <CardContainer key={song.id}>
        {/* <CardImage src={imageUrl} alt={title} /> */}
        <CardContent>
          <Title>{song.title}</Title>
          <Artist>{song.artist}</Artist>
          <Album>{song.album}</Album>
          <Genre>{song.genre}</Genre>
        </CardContent>
        <ButtonBox>
        <EditButton
                  onClick={() => dispatch(setSongSlice(song))}
                >
                  Edit
                </EditButton>
          <DeleteButton
                  onClick={() =>
                    dispatch({ type: DELETE_SONG_BY_ID, id: song.id })
                  }
                >
                  Delete
                </DeleteButton>
                </ButtonBox>
      </CardContainer>
        // <li >
        //   {song.title} - {song.artist} - {song.album} - {song.genre}
        
        //   </li>
      ))}
      </GridContainer>
  );
  
}
export default SongList