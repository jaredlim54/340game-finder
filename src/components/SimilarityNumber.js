// A function to determine which games are most similar to the user's input

export function SimilarityNumber(game, currentGames, logGames) {
    let commonGame = currentGames[Math.floor(Math.random() * currentGames.length)];
    let similarityIndex = 0;

    // Eliminate games that are already in the user's log
    logGames.forEach((logGame) => {
        if (logGame.name === game.name) {
            similarityIndex -= 100;
        }
    })

    // Eliminate games that are included in the user's input
    if (currentGames.length > 2){
        if (game.name === currentGames[0].name || game.name === currentGames[1].name || game.name === currentGames[2].name || game.name === commonGame.name) {
            similarityIndex -= 100;
        }
    } else if (currentGames.length > 1) {
        if (game.name === currentGames[0].name || game.name === currentGames[1].name || game.name === commonGame.name) {
            similarityIndex -= 100;
        }
    } else {
        if (game.name === commonGame.name) {
            similarityIndex -= 100;
        }
    }

    // Increase similarity for each common category
    if (game.genres === commonGame.genres) {
        similarityIndex += 2;
    }
    if (game.categories === commonGame.categories) {
        similarityIndex += 3;
    }
    if (game.developer === commonGame.developer) {
        similarityIndex += 2;
    }
    if (game.publisher === commonGame.publisher) {
        similarityIndex += 1;
    }
    if (game.steamspy_tags === commonGame.steamspy_tags) {
        similarityIndex += 4;
    }
    if ((game.positive_ratings / game.negative_ratings) - (commonGame.positive_ratings / commonGame.negative_ratings) >= 0 
    || (game.positive_ratings / game.negative_ratings) - (commonGame.positive_ratings / commonGame.negative_ratings) <= -0.5) {
        similarityIndex += 0.5;
    } 
    if (game.price >= commonGame.price + 5.0 || game.price <= commonGame.price - 5.0) {
        similarityIndex -= 0.5;
    }
    if (game.english === commonGame.english) {
        similarityIndex += 1;
    }
    return similarityIndex;
}