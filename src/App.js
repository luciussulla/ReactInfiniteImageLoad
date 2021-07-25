import React, {useEffect, useState} from 'react'
import {FiSearch} from 'react-icons/fi'

import './App.css';
const key='ovLrqyczs4iuX0Y0VM0oCFbay4Hmk3_IeREbRu6Zq1k'
const secKey = 'W0JsDQB2dxdvNkVxTVSzUwcM6dcRgYyDpZVyD31y_Ik'
const url ='https://api.unsplash.com/'
const photos = 'https://api.unsplash.com/photos'
const search = 'https://api.unsplash.com/search/photos'
const apiLink='https://api.unsplash.com/photos/?client_id=ovLrqyczs4iuX0Y0VM0oCFbay4Hmk3_IeREbRu6Zq1k'
// import Photo from './components/Photo'

function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="search-wrapper">
          <div className="search-glass"><FiSearch/></div>
          <input className="search-input" type="text"/>
        </div>
      </div>
    </div>
  );
}

export default App;
