import React, {useEffect, useState} from 'react'
import Photo from './components/Photo'
import {FiSearch} from 'react-icons/fi'
import './App.css';
const client_id = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const photosUrl = 'https://api.unsplash.com/photos/'
const searchUrl = 'https://api.unsplash.com/search/photos'

function App() {
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const fetchData = async ()=> {
    setLoading(true)
    const pageUrl = `&page=${page}`
    const queryUrl = `$query=${query}`
    let url;    
    if(query) {
      url = `${searchUrl}${client_id}${pageUrl}${queryUrl}`
    } else {
      url = `${photosUrl}${client_id}${pageUrl}`
    }
    try {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)
      setPhotos((old)=> {
        return [...old, ...data]
      })
      setLoading(false)
    } catch(e) {
      console.log(e)
      setLoading(false)
    } 
  }
  useEffect(()=> {
    fetchData()
  }, [page])

  useEffect(()=> {
    const event = window.addEventListener('scroll', ()=> {
      if(
          !loading &&
          window.scrollY+window.innerHeight >= document.body.scrollHeight
        ) {
          console.log("It workerd")
          setPage((old)=> {
            return old + 1
          })
        }
    })

    return ()=> {
      window.removeEventListener('scroll', event)
    }
  },[])

  const handleSearch = ()=> {
    console.log("search handled")
    setSearchValue("")
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="search-wrapper">
          <div className="search-glass" onClick={handleSearch}><FiSearch/></div>
          <input className="search-input" type="text"/>
        </div>
        <section className="photos-section">
          {photos.map((image, index) =>{
            return <Photo key={image.id} {...image}/>
          })}
        </section>
        {loading && <h3 className="loading">Loading...</h3>}
      </div>
    </div>
  );
}

export default App;
