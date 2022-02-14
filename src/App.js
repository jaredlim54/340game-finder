import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

//components
import { NavBar } from './components/NavBar';
import { ClearCardsButton, InputPanel } from './components/UserInput';
import { RecommendationPanel } from './components/RecommendationCard';
import { LogPage } from './components/LogPage';
import { CarouselPage } from './components/CarouselPage';

const uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    }
  ],
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  }
};

function App() {
  /* steam data for each game */
  const [gameData, setGameData] = useState([]);
  /* media data for each game */
  const [gameMediaData, setGameMediaData] = useState([]);
  /* games user has selected for recommendations */
  const [currentGames, setCurrentGames] = useState([]);
  /* check for whether form has been submitted */ 
  const [isSubmitted, setSubmitted] = useState(false);
  /* state variables for user input fields */
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  /* input validity */
  const [inputValidity1, setValidity1] = useState('');
  const [inputValidity2, setValidity2] = useState('');
  const [inputValidity3, setValidity3] = useState('');
  /* games user has selected to record in log */
  const [logGames, setLogGames] = useState([]);
  /* whether inputs are disabled */
  const [inputDisabled, setDisabled] = useState(false);
  /* current user */
  const [user, setUser] = useState(undefined);
  /* whether page is loading */
  const [isLoading, setIsLoading] = useState(true);

  // authenticates users on login and logout
  useEffect(() => {
    const authUnregisterFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log("Logged in as " + firebaseUser.displayName + "!")
        setUser(firebaseUser)
        // set user's log games on login
        const savedGamesRef = firebase.database().ref(firebaseUser.displayName).child('savedgames')
        savedGamesRef.on('value', (snapshot) => {
          const gamesObj = snapshot.val()
          if (gamesObj != null) {
            let objectKeyArray = Object.keys(gamesObj)
            let gamesArray = objectKeyArray.map((key) => {
              let gameObj = gamesObj[key]
              gameObj.key = key
              return gameObj;
            })
            setLogGames(gamesArray)
          } else {
            setLogGames([])
          }
        })
        setIsLoading(false)
      } else {
        console.log("Logged out!")
        setUser(null)
        setIsLoading(false)
      }
    })
    return function cleanup() {
      authUnregisterFunction()
    }
  }, [])

  // Gets game data 
  useEffect(() => {
    fetch('./steam.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setGameData(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  // Gets game images and other media data
  useEffect(() => {
    fetch('./steam_media_data.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setGameMediaData(data);
      })
      .catch(function(error){
        console.log(error);
      })
  }, [])

  const handleSignOut = () => {
    firebase.auth().signOut()
  }

  // respond to input changes
  const handleChange1 = (event) => {
    setInputValue1(event.target.value);
  }
  const handleChange2 = (event) => {
    setInputValue2(event.target.value);
  }
  const handleChange3 = (event) => {
    setInputValue3(event.target.value);
  }
  const handleDelete = () => {
    setSubmitted(false);
    setDisabled(false);
  }
  const handleReset = () => {
    setSubmitted(false);
    setDisabled(false);
    setInputValue1('');
    setInputValue2('');
    setInputValue3('');
  }
  
  // set user's selected games on submission
  const handleSubmit = () => {
    // add user inputs (game names) to array of strings
    let inputGamesArr = [inputValue1, inputValue2, inputValue3];
    // check if inputs are valid games
    let formIsValid = false;
    if (!gameData.some((e) => e.name === inputValue1)) {
      setValidity1('Please enter a valid game.');
    } else if (!gameData.some((e) => e.name === inputValue2) && inputValue2.length > 0) {
      setValidity2('Please enter a valid game.');
    } else if (!gameData.some((e) => e.name === inputValue3) && inputValue3.length > 0) {
      setValidity3('Please enter a valid game.');
    } else {
      setValidity1('');
      setValidity2('');
      setValidity3('');
      formIsValid = true;
    }
    if (formIsValid) {
      // set currentGames to a filtered array of just the games with matching names
      let updated = gameData.filter((game) => {
        return (inputGamesArr.includes(game.name))
      })
      setCurrentGames(updated);
      setSubmitted(true);
      setDisabled(true);
    }
  }

  const handleAdd = (game, user) => {
    let currentUser = user.displayName
    const savedGamesRef = firebase.database().ref(currentUser).child('savedgames')
    if (!logGames.some((e) => e.name === game.name)) {
      savedGamesRef.push(game)
    }

    savedGamesRef.on('value', (snapshot) => {
      const gamesObj = snapshot.val()
      if (gamesObj != null) {
        let objectKeyArray = Object.keys(gamesObj)
        let gamesArray = objectKeyArray.map((key) => {
          let gameObj = gamesObj[key]
          gameObj.key = key
          return gameObj;
        })
        setLogGames(gamesArray)
      } else {
        setLogGames([])
      }
    })
  }

  //remove games from log page
  const handleRemove = (game, user) => {
    let currentUser = user.displayName
    let key = game.key
    const savedGamesRef = firebase.database().ref(currentUser).child('savedgames')
    savedGamesRef.child(key).remove();
  }

  if (isLoading) {
    <div className="text-center">
      <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
    </div>
  }

  if (!user) {
    return (
      <div className="empty-log-container">
        <h1>Welcome to GameFinder! Sign in or create an account to get started!</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <NavBar user={user} handleSignOut={handleSignOut}/>
      <Switch>
        <Route exact path="/">
          <header className="page-header">
            <h1>GameFinder</h1>
          </header>
          <InputPanel 
            gameData={gameData}
            inputValue1={inputValue1} 
            inputValue2={inputValue2} 
            inputValue3={inputValue3}
            inputValidity1={inputValidity1}
            inputValidity2={inputValidity2}
            inputValidity3={inputValidity3}
            inputDisabled={inputDisabled}
            handleChange1={handleChange1} 
            handleChange2={handleChange2} 
            handleChange3={handleChange3} 
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
          {isSubmitted && 
            <RecommendationPanel
              logGames={logGames} 
              gameData={gameData}
              gameMediaData={gameMediaData} 
              currentGames={currentGames}
              user={user}
              handleAdd={handleAdd}
            />
          }
          <ClearCardsButton isRendered={handleDelete}/>
        </Route>
        <Route path="/mygames">
          <header className="page-header">
            <h1>My Games</h1>
          </header>
          <section>
            <LogPage 
              logGames={logGames} 
              gameData={gameData} 
              gameMediaData={gameMediaData}
              user={user} 
              handleRemove={handleRemove}
            />
          </section>
        </Route>
        <Route path="/:game">
          <header className="page-header">
            <h1>View Images</h1>
          </header>
          <CarouselPage gameData={gameData} gameMediaData={gameMediaData}/>
        </Route>
      </Switch>
      <footer>
          <p>©Copyright GameFinder, Data retrieved from <a href="https://www.kaggle.com/nikdavis/steam-store-games">Kaggle, compiled by Nik Davis</a></p>
      </footer>
    </BrowserRouter>
  );
}

export default App;