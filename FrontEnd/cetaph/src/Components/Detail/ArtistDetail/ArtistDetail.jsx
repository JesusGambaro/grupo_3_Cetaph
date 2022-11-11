import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import "./ArtistDetail.scss"
const ArtistDetail = () => {
    const { id } = useParams();
    const [artista, setArtista] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        (async () => {
          setLoading(true);
          try {
            const { data } = await axios.get(
              `http://localhost:9000/api/v1/artista/${id}`
            );
            console.log(data);
            setArtista(data);
          } catch (e) {
            console.log(e);
          }
          setLoading(false);
        })();
      }, [id]);
  return (
    <div className='ArtistDetail'>
        <span><h1>{artista.nombre}</h1></span>
    </div>
  )
}

export default ArtistDetail