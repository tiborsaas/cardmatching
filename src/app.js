/**
 * Card matching game
 * --
 * The app uses a similar approach to flux, the pub/sub pattern
 */

import Card from './components/card';
import UI from './components/card';
import {shuffle, random} from './utils';

const cardPool = ['react', 'angular', 'd3', 'jenkins', 'postcss', 'redux', 'sass', 'supercharge', 'ts', 'webpack'];

const Game = {
    gamePairs: [], // stores the correct solution indexes
    cardPairs: 5, // in this case 10 cards will be generated

    init(pairs) {
        this.cardPairs = pairs;
        console.log(this.generateSolutionSet(this.getRandomCardTypes()));
    },

    getRandomCardTypes() {
        const gameSet = [];
        while(gameSet.length < this.cardPairs) {
            let randomItem = random(cardPool.length);
            if(!gameSet.includes(randomItem)) {
                gameSet.push(randomItem);
            }
        }
        return gameSet;
    },

    generateSolutionSet(cardTypes) {
        // duplicate card types
        cardTypes = cardTypes.concat(cardTypes);
        // shuffle array
        return shuffle(cardTypes);
    },

}

Game.init(5);
