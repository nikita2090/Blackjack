import React, { useReducer, useEffect } from 'react';

/*import styles from './App.module.css';*/

import Hand from './components/hand/Hand';
import { cards, mixCards } from "./sources/playingCards";


let playingCards = null;
let deposit = 1000;
/*let userPoints = 0;
let dealerPoints = 0;*/


const reducer = (state, { type, card, bet, isUser, isDealerTurn }) => {
	let { userHand, dealerHand } = state;

	let property;
	let value;

	if (isUser) {
		property = 'userHand';
		value = userHand;
	} else {
		property = 'dealerHand';
		value = dealerHand;
	}

	switch (type) {
		case 'addCard':
			return {
				...state,
				[property]: [...value, card]
			};

		case 'clean':
			return {
				...state,
				[property]: []
			};

		case 'setBet':
			return {
				...state,
				bet: bet
			};

		case 'toggleTurn':
			return {
				...state,
				isDealerTurn
			};
		default:
			throw new Error('Unknown action!');
	}
};

const initialState = {
	userHand: [],
	dealerHand: [],
	bet: 50,
	isDealersTurn: false,
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const dealCards = () => {
		dispatch({ type: 'clean', isUser: true });
		dispatch({ type: 'addCard', isUser: true, card: playingCards.pop() });
		dispatch({ type: 'addCard', isUser: true, card: playingCards.pop() });

		dispatch({ type: 'clean', isUser: false });
		dispatch({ type: 'addCard', isUser: false, card: playingCards.pop() });
	};

	const calcDeposit = () => {
		const { bet } = state;
		deposit = deposit - bet;
	};

	const startGame = () => {
		playingCards = [...cards];
		mixCards(playingCards);

		dealCards();

		calcDeposit();
	};

	const changeBet = ({ target: { name } }) => {
		const { bet } = state;
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

		dispatch({
			type: 'setBet',
			bet: result
		});
	};

	const hit = () => {
		dispatch({
			type: 'addCard',
			isUser: true,
			card: playingCards.pop()
		});
	};

	const calculatePoints = (hand) => {
		return hand.reduce((prev, next) => {
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
	};

	const stop = () => {
		dispatch({
			type: 'toggleTurn',
			isDealerTurn: true
		})
	};

	useEffect(() => {
		const { isDealerTurn } = state;
		if (!isDealerTurn) return;

		if (dealerPoints < 17) {
			dispatch({
				type: 'addCard',
				isUser: false,
				card: playingCards.pop()
			});
			dealerPoints = calculatePoints(dealerHand);
		} else {
			dispatch({
				type: 'toggleTurn',
				isDealerTurn: false
			});
		}
	});

	const { userHand, dealerHand, bet } = state;
	const userPoints = calculatePoints(userHand);
	let dealerPoints = calculatePoints(dealerHand);

	return (
		<main>
			<Hand hand={dealerHand}/>
			<div>DEALER'S POINTS:{dealerPoints}</div>

			<div>POINTS:{userPoints}</div>
			<Hand hand={userHand}/>

			<div>
				<button name='minus' onClick={changeBet}>-</button>
				<span>{bet}</span>
				<button name='plus' onClick={changeBet}>+</button>
				<button name='double' onClick={changeBet}>x2</button>
			</div>

			<div>Your deposit:{deposit}</div>


			<div>
				<button onClick={startGame}>GO</button>
				<button onClick={hit}>HIT</button>
				<button onClick={stop}>STOP</button>
			</div>
		</main>
	)
};

export default App;
