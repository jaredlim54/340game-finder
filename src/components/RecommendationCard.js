import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { SimilarityNumber } from './SimilarityNumber';

export function RecommendationPanel(props) {
  const [sortedGames, setSortedGames] = useState([...props.currentGames])
  
  let gameData = props.gameData
  let currentGames = props.currentGames
  let logGames = props.logGames
  useEffect(() => {
    // Create copy of total games
    let updated = [...gameData]
    // Sort total games by similarity
    updated.forEach(game => game.similarity = SimilarityNumber(game, currentGames, logGames));
    updated.sort(function(a, b) {
      return b.similarity - a.similarity;
    }) 
    setSortedGames(updated) 
  }, [])
  // Sample three most similar games and render them
  let recommendations = sortedGames.slice(0,3);
  let currentRecommendations = recommendations.map((game) => 
    <RecommendationCard 
      key={game.appid} 
      game={game} 
      gameMediaData={props.gameMediaData}
      handleAdd={props.handleAdd} 
      handleRemove={props.handleRemove} 
      user={props.user}
    />
  )
  return (
    <section>
      <div className="game-recommendations">
        <h3>We think you'd like these games:</h3>
        <h4>Hover to learn more, or click images to see more screenshots!</h4>
      </div>
      <div className="games-container row justify-content-md-center">
        {currentRecommendations}
      </div>
    </section>
  );
}

export function RecommendationCard(props) {
  let game = props.game;
  const handleAdd = (event) => {
    event.preventDefault();
    let user = props.user
    props.handleAdd(game, user)
    setButtonText('Added to Your Games!')
  }

  const [buttonText, setButtonText] = useState('Click to add to Your Games!');
  let gameMedia = props.gameMediaData.find((e) => e.steam_appid === game.appid);
  return (
    <div className="col-m-6 col-xl-3 d-flex">
      <div className="card">
        <Link to={"/" + game.name}>
          <img className="card-img-top" src={gameMedia.header_image} alt={"A screenshot of " + game.name}/>
        </Link>
        <div className="card-header">
          <p>{game.name}</p>
        </div>
        <div className="card-body">
          <p className="card-text">{"Developer: " + game.developer}</p>
          <p className="card-text">{"Release Date: " + game.release_date}</p>
          <p className="card-text">{"Genres: " + game.genres}</p>
          <p className="card-text">{"Positive Ratings: " + game.positive_ratings}</p>
          <p className="card-text">{"Negative Ratings: " + game.negative_ratings}</p>
          <p className="card-text">{"Price: $" + game.price}</p>
          <button className="btn btn-yellow" onClick={handleAdd}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
}