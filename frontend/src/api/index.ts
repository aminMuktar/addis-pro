import axios from 'axios'
import { type SongState } from '../types'

const BASE_URL = 'https://addis-backend-project.onrender.com/api';

export const getSongsAPI = async () => await axios.get(`${BASE_URL}/songs`);
export const createSongAPI = async (song:SongState) => await axios.post(`${BASE_URL}/songs`,song);
export const updateSongAPI = async (song:SongState) => await axios.put(`${BASE_URL}/songs/${song.id}`,song);
export const deleteSongAPI = async (id: string) => await axios.delete(`${BASE_URL}/songs/${id}`);


//stats
export const getTotalSongsAPI = async () => await axios.get(`${BASE_URL}/songs/total`);
export const getTotalArtistsAPI = async () => await axios.get(`${BASE_URL}/artists/total`);
export const getTotalAlbumsAPI = async () => await axios.get(`${BASE_URL}/albums/total`);
export const getTotalGenresAPI= async () => await axios.get(`${BASE_URL}/genre/total`);

export const genreInSongsAPI = async () => await axios.get(`${BASE_URL}/genre/songs`);
export const songsInAlbumAPI = async () => await axios.get(`${BASE_URL}/albums/songs`);
export const artistStatsAPI = async () => await axios.get(`${BASE_URL}/artists/stats`);
