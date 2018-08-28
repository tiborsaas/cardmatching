/**
 * Card matching game
 * --
 * The app uses a similar approach to flux, the pub/sub pattern
 */

import Card from './components/card';
import UI from './components/ui';
import {shuffle, random} from './utils';
import {cardPool} from './constants';
import Dispatcher from './messageBus';

const GameUI = new UI();

const Game = {
    gamePairs: [], // stores the correct solution indexes
    cardPairs: 5, // in this case 10 cards will be generated
    clickPair: [], // stores the cards the user has clicked

    init(pairs) {
        this.cardPairs = pairs;
        this.gamePairs = this.generateSolutionSet(this.getRandomCardTypes());

        GameUI.createGameCards(this.gamePairs);

        Dispatcher.subscribe('CARD-CLICK', cardObj => {
            this.clickPair.push(cardObj);
            GameUI.revealCard(cardObj.index);

            if(this.clickPair.length == 2) {
                if(this.checkPairs()) {
                    this.revealPair();
                    this.clickPair = [];
                } else {
                    // reset cards
                    setTimeout(this.hidePair.bind(this), 1234);
                }
            }
        });
    },

    checkPairs() {
        return this.clickPair[0].id == this.clickPair[1].id;
    },

    revealPair() {
        this.clickPair.forEach(card => {
            GameUI.flipCard(card.index);
        });
    },

    hidePair() {
        this.clickPair.forEach(card => {
            GameUI.hideCard(card.index);
        });
        this.clickPair = [];
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