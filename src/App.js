import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import Header from './components/Header';

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
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
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader}/>
      
      <br></br><br></br><br></br><br></br>
      {movieList.map((movie, index) => (
          <div key={index}>
            <h3>{movie.title}</h3>
            {movie.items.results.map((item, indexItem) => (
              <div key={indexItem}>
                {/* <img width="50px" height="100px" src={item.poster_path}/> */}
                <p>{item.name}</p>
              </div>
            ))}
          </div>
      ))}
    </div>
  );
}
