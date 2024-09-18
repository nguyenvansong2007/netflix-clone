import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWFkYTA5ZWRlYWI5MWQ4Yzc4ZDllYmUwYThjMjM2MCIsIm5iZiI6MTcyNjY1MDEwMi45MDI4NTgsInN1YiI6IjY2ZGRiOTRiNmQ4ZjNmZTE3MzZkMjk4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xGJ5k4Ddh4FO6V0Ep0KvdMbJRTkgBeS9qZJkbxz80eA'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])
 

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=> {navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/watch?v=YQQD67N5pi0${apiData.key}`} 
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player