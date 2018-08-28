import {cardPool} from '../constants';

export default class UI {
    constructor(deckSize) {
        this.deckSize = deckSize;
        this.cardRoot = document.querySelector('.cards');
    }

    createGameCards(solutionSet) {
        console.log(solutionSet);
        solutionSet.forEach(cardIndex => {
            const card = document.createElement('div');
            card.classList.add('hidden');
            card.classList.add(cardPool[cardIndex])
            this.cardRoot.appendChild(card);

        });
    }
}