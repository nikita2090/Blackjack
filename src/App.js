import React, { useReducer, useEffect } from 'react';

/*import styles from './App.module.css';*/

import Hand from './components/hand/Hand';
import BetControls from "./components/bet-controls/BetControls";
import GameControls from "./components/game-controls/GameControls";

import { cards, mixCards } from "./sources/playingCards";


let playingCards = null;
let deposit = 1000;
let winner = 'no';


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

	const startGame = () => {
		winner = null;

		playingCards = [...cards];
		mixCards(playingCards);
		dealCards();
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
		let acesAmount = 0;
		let sum = hand.reduce((prev, next) => {
			let cost = 0;
			switch (next.name) {
				case 'J':
				case 'Q':
				case 'K':
					cost = 10;
					break;
				case 'A':
					cost = 11;
					acesAmount++;
					break;
				default:
					cost = +next.name;
			}
			return prev + cost;
		}, 0);

		if (!acesAmount || sum < 21) return sum;

		return sum - 11 * acesAmount + acesAmount;
	};

	const stop = () => {
		dispatch({
			type: 'toggleTurn',
			isDealerTurn: true
		});
	};

	const calcWinner = (winner) => {
		if (winner) return;

		if (dealerPoints > 21 || userPoints > dealerPoints) {
			return 'user'
		} else if (userPoints < dealerPoints) {
			return 'dealer'
		} else {
			return 'push'
		}
	};

	const calcPayment = (winner, deposit) => {
		let result;
		if (winner === 'user') {
			result = deposit + bet * 2;
		} else if (winner === 'dealer') {
			result = deposit - bet;
		} else {
			result = deposit;
		}
		return result;
	};

	useEffect(() => {
		console.log('effect');
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
			winner = calcWinner();
			deposit = calcPayment(winner, deposit);
		}
	});

	const { userHand, dealerHand, bet } = state;
	const userPoints = calculatePoints(userHand);
	let dealerPoints = calculatePoints(dealerHand);

	if (userPoints === 21) {
		winner = 'user';
		deposit = calcPayment(winner, deposit);
	} else if (userPoints > 21) {
		winner = 'dealer';
		deposit = calcPayment(winner, deposit);
	}

	return (
		<main>
			<Hand hand={dealerHand}
			      points={dealerPoints}/>
			<div>DEALER'S POINTS:{dealerPoints}</div>

			<div>Winner:{winner}</div>

			<div>POINTS:{userPoints}</div>
			<Hand hand={userHand}/>

			<BetControls bet={bet}
			             changeBet={changeBet}
			             deposit={deposit}
			             winner={winner}/>

			<GameControls start={startGame}
			              hit={hit}
			              stop={stop}
			              winner={winner}/>
		</main>
	)
};

export default App;
