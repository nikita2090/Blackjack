import React, {useState} from 'react';


import styles from './App.module.css';

import cards from './sources/playingCards';

const App = () => {
	const [deposit, setDeposit] = useState(1000);
	const [bet, setBet] = useState(50);
	const [userHand, setUserHand] = useState([]);
	const [dealerHand, setDealerHand] = useState([]);

	const changeBet = ({target: {name}}) => {
		let result = null;
		switch (name) {
			case 'plus':
				result = bet + 25;
				break;
			case 'minus':
				result = bet - 25;
				break;
			case 'double':
				result = bet * 2;
				break;
			default:
				return null;
		}

		if (result < 50) return;
		setBet(result);
	};


	const startGame = () => {
		let playingCards = [...cards];
		mixCards(playingCards);

		const pare = [playingCards.pop(), playingCards.pop()];
		setUserHand(pare);

		setDealerHand([playingCards.pop()]);
	};


	const {cardSt, pareSt} = styles;
	return (
		<main>
			<div className={pareSt}>
				{dealerHand.map(({name, suit, id}) => (
					<div className={cardSt}
					     key={id}>
						<span className={styles[suit]}>{name}</span>
					</div>
				))}
			</div>

			<div className={pareSt}>
				{userHand.map(({name, suit, id}) => (
					<div className={cardSt}
					     key={id}>
						<span className={styles[suit]}>{name}</span>
					</div>
				))}
			</div>

			<div>
				<button name='minus' onClick={changeBet}>-</button>
				<span>{bet}</span>
				<button name='plus' onClick={changeBet}>+</button>
				<button name='double' onClick={changeBet}>x2</button>
			</div>

			<div>{deposit}</div>

			<div>
				<button onClick={startGame}>GO</button>
				<button>HIT</button>
				<button>STOP</button>
			</div>
		</main>
	)
};


const mixCards = (cards) => cards.sort(() => Math.random() - 0.5);

export default App;
