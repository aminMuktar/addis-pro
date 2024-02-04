import React from 'react';
import './App.css';
import SongList from './components/song-list';
import SongForm from './components/song-form';

function App() {
  return (
    <div className="App">
      <SongForm />
      <SongList />
    </div>
  );
}

export default App;
