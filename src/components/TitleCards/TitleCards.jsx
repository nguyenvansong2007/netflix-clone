import { Link } from 'react-router-dom';
import './TitleCards.css'
import { useRef, useEffect, useState } from 'react'



const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([])

  const cardRef = useRef();
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWFkYTA5ZWRlYWI5MWQ4Yzc4ZDllYmUwYThjMjM2MCIsIm5iZiI6MTcyNjY1MDEwMi45MDI4NTgsInN1YiI6IjY2ZGRiOTRiNmQ4ZjNmZTE3MzZkMjk4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xGJ5k4Ddh4FO6V0Ep0KvdMbJRTkgBeS9qZJkbxz80eA'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

  
  const handleWheel = (event) => {
    event.preventDefault()
    cardRef.current.scrollLeft += event.deltaY;
  }
  
  useEffect(() => {
    cardRef.current.addEventListener('wheel', handleWheel)
  },[]);
  return (
    <div className='titleCards'>
      <h2>{title?title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards