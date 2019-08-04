import React, {useState, useEffect} from 'react';

import styles from './App.module.css';

import Hand from './components/hand/Hand';

import {cards, mixCards} from "./sources/playingCards";
let playingCards = null;


const startGame = (setUserHand, setDealerHand, deposit, setDeposit, bet) => {
	playingCards = [...cards];
	mixCards(playingCards);

	const pare = [playingCards.pop(), playingCards.pop()];
	setUserHand(pare);

	setDealerHand([playingCards.pop()]);

	setDeposit(deposit - bet);
};
const changeBet = ({target: {name}}, bet, setBet) => {
	let result;
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
const getCard = (userHand, setUserHand) => {
	setUserHand([...userHand, playingCards.pop()]);
};
const calculatePoints = (hand, setUserPoints) => {
	let result = hand.reduce((prev, next) => {
		let cost = 0;
		switch (next.name) {
			case 'J':
			case 'Q':
			case 'K':
				cost = 10;
				break;
			case 'A':
				cost = 11;
				break;
			default:
				cost = +next.name;
		}
		return prev + cost;
	}, 0);

	setUserPoints(result);
};



const App = () => {
	const [deposit, setDeposit] = useState(1000);
	const [bet, setBet] = useState(50);
	const [userHand, setUserHand] = useState([]);
	const [userPoints, setUserPoints] = useState(0);

	const [dealerHand, setDealerHand] = useState([]);


	const go = () => {
		startGame(setUserHand, setDealerHand, deposit, setDeposit, bet);
	};
	const change = (e) => {
		changeBet(e, bet, setBet);
	};
	const hit = () => {
		getCard(userHand, setUserHand);
	};


	useEffect(() => {
		calculatePoints(userHand, setUserPoints);
	}, [userHand]);

	useEffect(() => {
		if (userPoints > 21) {
			alert('You lose');
		} else if (userPoints === 21) {
			alert('Blackjack!');
		}
	}, [userPoints]);

	return (
		<main>
			<Hand hand={dealerHand}/>
			<Hand hand={userHand}/>


			<div>
				<button name='minus' onClick={change}>-</button>
				<span>{bet}</span>
				<button name='plus' onClick={change}>+</button>
				<button name='double' onClick={change}>x2</button>
			</div>

			<div>Your deposit:{deposit}</div>
			<div>POINTS:{userPoints}</div>


			<div>
				<button onClick={go}>GO</button>
				<button onClick={hit}>HIT</button>
				<button>STOP</button>
			</div>
		</main>
	)
};

export default App;
