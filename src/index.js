//DONE: #1 implementar api (getGames(), getGameById()). Mirar en la documentación de json-server
// DONE: #7 Separar api de index.js
// DONE: #8 Separar funciones auxiliares '(generate*)'  de renders de index.js
// TODO: #9 Separar funciones dde index y de detail

import {getGames, getGameById, getCommentsOfGame} from './api-handler.js'
import { generateGameSnippet, generateCommentSnippet } from './functions.js';

export async function drawListGames() {
    let games = await getGames();
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'games-list')
    newDiv.setAttribute('class', 'row')

    document.getElementById('games')
      .appendChild(newDiv)

    var i = 0;
    for (i; i < games.length; i++) {
      let snippetContainer = document.createElement('div');
      snippetContainer.setAttribute('class', 'col-6 col-sm-3');
      document.getElementById('games-list')
        .appendChild(snippetContainer).innerHTML = generateGameSnippet(games[i]);
    }
}

(async () => {
  await drawListGames();
})();

export async function drawGame(gameId) {
  let game = await getGameById(gameId);
  document.getElementById('game-name-title').innerHTML = game.name;
  // DONE: #5 breadcrumb???? Let's use jQuery!!
  $('.breadcrumb span').html(`Game ${game.name}`)
  document.getElementById('game-image').src = game.image;
  document.getElementById('game-image').alt = game.name;

  document.getElementById('metacritic-score').innerHTML = game.scores.metacritic;
  document.getElementById('user-score').innerHTML = game.scores.userScore;

  document.getElementById('summary').innerHTML = game.summary;

  document.getElementById('platform').innerHTML = game.platform;
  document.getElementById('release-date').innerHTML = game.relaseDate;

}

// DONE: #2 Pedir ayuda para generateCommentSnippet
export async function drawComments(gameId) {
  console.log(gameId)
  let comments = await getCommentsOfGame(gameId);
  document.getElementById('comments')
      .appendChild(document.createElement('ul'))
      .setAttribute('id', 'comments-list');
  var i = 0;
  for (i; i < comments.length; i++) {
      document.getElementById('comments-list')
          .appendChild(document.createElement('li')).innerHTML = generateCommentSnippet(comments[i]);
  }
}

// DONE: #4 Dar más información que una lista (imagen, nombre, primeros 100 caracteres de summary)

