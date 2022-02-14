import { Carousel } from 'react-responsive-carousel';
import { Link, useParams } from 'react-router-dom';

export function CarouselPage(props) {
  // retrieve game from url
  const urlParams = useParams();
  let gameName = urlParams.game;
  // find matching game object
  let urlGame = props.gameData.find((e) => e.name === gameName)
  // find matching media data for game object
  let urlGameMedia = props.gameMediaData.find((e) => e.steam_appid === urlGame.appid)
  // convert screenshot data from string to array of objects
  let screens = urlGameMedia.screenshots.replace(/'/g, '"')
  let imgs = JSON.parse(screens)
  // create array of screenshot links
  let screenshotArr = imgs.map((e) => {
    return (e.path_full)
  })
  // create carousel images
  let carouselImgs = screenshotArr.map((screenshot) => {
    return (
      <div key={screenshot}>
        <img src={screenshot} alt={"A screenshot from " + gameName}></img>
      </div>
    )
  })

  return (
    <div>
      <h3>{"Game: " + gameName}</h3>
      <Carousel>
        {carouselImgs}
      </Carousel>
      <button className="btn btn-yellow"><Link to="/">Return Home</Link></button>
    </div>
  )
}