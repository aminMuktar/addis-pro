import axios from 'axios'
import { type SongState } from '../types'

const BASE_URL = 'http://localhost:5000/api';

export const getSongsAPI = async () => await axios.get(`${BASE_URL}/songs`);
export const createSongAPI = async (song:SongState) => await axios.post(`${BASE_URL}/songs`,song);
export const updateSongAPI = async (song:SongState) => await axios.put(`${BASE_URL}/songs/${song.id}`,song);
export const deleteSongAPI = async (id: string) => await axios.delete(`${BASE_URL}/songs/${id}`);
