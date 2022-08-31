import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import Header from './components/Header';
import FeaturedMovie from './components/FeaturedMovie';
import MovieRow from './components/MovieRow';

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      console.log(list);
      setMovieList(list);

      let originals = list.filter(item => item.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      console.log(chosenInfo);
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader}/>

      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }

{/* REVER - NAO TA FUNCIONANDO */}
      <div className="lists">
        {movieList.map((item, key) => {
          return(
            <div key={key} >
              <MovieRow title={item.title} items={item.items}/>
            </div>
          )
        }
        )}
      </div>

      <footer>
        Developed by @ Dayane Lima <br/>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && (
        <div className='loading'>
        <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif"
        alt="Carregando"/>
        </div>
      )}

    </div>
  );
}
