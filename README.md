# Tic Tac Toe

A browser-based version of the classic game with the same rules: the first user to get three tiles in a row horizontally, vertically or diagonally wins!

If at any point during the game you would like to start the match over, just hit the `Reset` button at the bottom of the board.

Once there is a winner (or a tie), you can click the `Play Again` button to start a new game with the same users. If you want to change the players' names instead, just click the `Start Over` button.

### To Run Locally
1. Clone the repo to your local machine with the following command when in your working directory: `git clone git@github.com:ryancharris/tic-tac-toe.git`

2. Move into the cloned directory: `cd tic-tac-toe`

3. To run webpack-dev-server, run `npm run start`, which will start the application in your default browser

### To Build
To build a bundle using webpack, run `npm run build` and the JS / Sass files will be compiled and output in to the `docs` directory.

### What I Would Add
1. Allow game sessions to persist upon page refresh by storing board/tile state in LocalStorage
2. Adjust the timing of touch events for mobile devices and tablets
3. Allow users to choose their color and/or symbol
4. Use SVG icons instead of font-based psuedo elements
5. Do more cross browser/device testing
6. Fix `webpack.config.js` to extract `index.html` from `src` and output it into `docs`, which would enable hot reloading for changes to the markup

### Technical Decisions
**CSS**

I chose to use Sass as my pre-processor as I am familiar with it due to professional and personal work. I also used BEM methodology for my stylesheets to keep them modular.

**JS**

Instead of using a JS framework like React or Vue (both of which I have some experience with), I decided to use vanilla JS in order to brush up on my foundational skills. I also transpiled my JavaScript using Babel via my webpack configuration, so I could write code using ES6 syntax.

**Tooling**

I chose webpack as my build tool because I have been using it on a personal project lately. It made running a local dev server, setting up hot reloading, transpiling my JS and compiling my Sass very easy.


