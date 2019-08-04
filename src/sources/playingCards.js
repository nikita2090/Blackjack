const cardNames = ['2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K', 'A'];
const suits = ['spades', 'clubs', 'hearts', 'diams'];

const cards = [];
const decksNumber = 4;

for (let i = 0; i < decksNumber; i++) {
	for (let suit of suits) {
		for (let name of cardNames) {
			cards.push({
				name,
				suit,
				id: 0.5 + Math.random() * 1000001
			});
		}
	}
}


const mixCards = (cards) => cards.sort(() => Math.random() - 0.5);

export  {cards, mixCards};