import React, {useEffect, useState} from 'react'
import Photo from './components/Photo'
import {FiSearch} from 'react-icons/fi'
import './App.css';
const client_id = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const photosUrl = 'https://api.unsplash.com/photos/'
const searchUrl = 'https://api.unsplash.com/search/photos/'

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')

  console.log("Loading in app is:", loading)

  const fetchData = async ()=> {
    setLoading(true)
    const pageUrl = `&page=${page}`
    const queryUrl = `&query=${query}`
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
        if(query && page === 1) {
          // this is when we have searched for smething and loaded the 1st page
          // we delete old photos in state and add a new portion of photos that we querierd for for the 1st time
          return data.results
        } 
        else if (query) {
          // this is when we are loading new photo with query and the page is 0 or >2 
          return [...old, ...data.results] 
        } else {
          // this is when were are loading just using scroll without query
          return [...old, ...data]
        }
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
      console.log("loading in use effect is:", loading)
      if(
          !loading && (window.scrollY+window.innerHeight >= document.body.scrollHeight-10)
        ) {
          // this basicaly mean load more pictures
          console.log("It workerd")
          setPage((old)=> {
            return old + 1
          })
        }
    })
    return ()=> window.removeEventListener('scroll', event)
  },[])

  const handleSearch = ()=> {
    console.log("search handled")
    setPage(1)
  }

  const handleChange = (e)=> {
    setQuery(e.target.value)
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <div className="search-wrapper">
          <div className="search-glass" onClick={handleSearch}><FiSearch/></div>
          <input className="search-input" onChange={handleChange} type="text"/>
        </div>
        <section className="photos-section">
          {photos.map((image, index) =>{
            // console.log(image)
            return <Photo key={index} {...image}/>
          })}
        </section>
        {loading && <h3 className="loading">Loading...</h3>}
      </div>
    </div>
  );
}

export default App;
