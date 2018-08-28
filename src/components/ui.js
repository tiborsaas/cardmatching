import { cardPool } from '../constants';
import Dispatcher from '../messageBus';

export default class UI {
    constructor(deckSize) {
        this.deckSize = deckSize;
        this.cardRoot = document.querySelector('.cards');
    }

    createGameCards(solutionSet) {
        this.cardRoot.innerHTML = ''; // @todo: remove events before
        solutionSet.forEach((cardIndex,i) => {
            const card = document.createElement('div');
            card.classList.add('hidden');
            card.classList.add(cardPool[cardIndex])
            card.addEventListener('click', e => {
                const cardObj = {
                    id: cardPool[cardIndex],
                    index: i
                };
                Dispatcher.dispatch('CARD-CLICK', cardObj);
            });
            this.cardRoot.appendChild(card);
        });
    }

    revealCard(i) {
        const cards = this.cardRoot.querySelectorAll('div');
        cards[i].classList.remove('hidden');
    }

    hideCard(i) {
        const cards = this.cardRoot.querySelectorAll('div');
        cards[i].classList.add('hidden');
    }

    flipCard(i) {
        const cards = this.cardRoot.querySelectorAll('div');
        cards[i].classList.remove('hidden');
        cards[i].classList.add('flipped');
    }

    incrementTries() {
        const tryCounter = document.querySelector('.tries span');
        let count = parseInt(tryCounter.textContent);
        tryCounter.textContent = ++count;
    }
}
