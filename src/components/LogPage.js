import React from 'react';

export function LogEntry(props) {
  let game = props.game;
  let gameMedia = props.gameMediaData.find((e) => e.steam_appid === game.appid);
  const handleRemove = (event) => {
    let user = props.user
    event.preventDefault();
    props.handleRemove(game, user)
  }

  return (
    <div className="log-entry">
      <div className="log-item">
        <img src={gameMedia.header_image} alt={"A screenshot of " + game.name} />
        <h1>{game.name}</h1>
      </div>
      <div className="log-body">
        <p>{"Developer: " + game.developer}</p>
        <p>{"Release Date: " + game.release_date}</p>
        <p>{"Genres: " + game.genres}</p>
        <p>{"Positive Ratings: " + game.positive_ratings}</p>
        <p>{"Negative Ratings: " + game.negative_ratings}</p>
        <p>{"Price: $" + game.price}</p>
        <button className="btn btn-yellow" onClick={handleRemove}>Click to remove from saved games</button>
      </div>
    </div>
  )
}
  
export function LogPage(props) {
  if (props.logGames.length === 0 ) {
    return (
      <div className="empty-log-container">
        <h2>Begin adding Recommended games to get started!</h2>
      </div>
    )
  } else {
    let logEntries = props.logGames.map((game) => {
      return <LogEntry key={game.appid} game={game} user={props.user} gameMediaData={props.gameMediaData} handleRemove={props.handleRemove}/>
    })
    if (logEntries.length === 0) {
      return (
        <div className="empty-log-container">
          <h2>Begin adding Recommended games to get started!</h2>
        </div>
      )
    } else {

      return (
        <div className="log-container">
          <h2>Hover to learn more!</h2>
          {logEntries}
        </div>
      )
    }
  }
}