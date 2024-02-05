import React, { FormEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { space, layout, typography, color } from 'styled-system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSongSlice } from '../redux/slice/SongSlice';
import { CREATE_SONG, UPDATE_SONG_BY_ID } from '../redux/types';
import { nanoid } from 'nanoid';



const FormContainer = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;


const Input = styled.input`
  ${space}
  ${layout}
  ${typography}
  ${color}
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  ${space}
  ${layout}
  ${typography}
  ${color}
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SongForm = () => {
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const dispatch = useDispatch()
  const song = useSelector((state:RootState)=>state.song)

  const handleChange=(event: FormEvent)=>{
    const { name, value } = event.target as HTMLInputElement;
    dispatch(setSongSlice({...song,[name]:value}))
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    song.id === ""
    ? dispatch({ type:CREATE_SONG, song: {...song,id:nanoid(8)}})
    : dispatch({ type:UPDATE_SONG_BY_ID, song})

    dispatch(setSongSlice({
      id:"",
      title:"",
      artist:"",
      album:"",
      genre:""
    }))
  };
  useEffect(()=>{
    const { id,title,artist,album,genre } = song
    if(!id || !title || !artist || !album || !genre){
      setBtnDisabled(true)
    }
    else{
      setBtnDisabled(false)
    }
  },[song,btnDisabled])

  return (
    <FormContainer>
      <FormStyled>
        {/* <Input name="id" value={song?.id} type="text"  disabled/> */}
        <Input name="title" value={song?.title || ""} type="text" placeholder='Title' onChange={(event)=>handleChange(event)} />
        <Input name="artist" value={song?.artist || ""} type="text" placeholder='Artist' onChange={(event)=>handleChange(event)} />
        <Input name="album" value={song?.album || ""} type="text" placeholder='Album' onChange={(event)=>handleChange(event)} />
        <Input name="genre" value={song?.genre || ""} type="text" placeholder='Genre' onChange={(event)=>handleChange(event)} />
        <Button onClick={handleSubmit} >Submit</Button>
      </FormStyled>
    </FormContainer>
  );
};

export default SongForm;