import React, { useReducer, useEffect } from 'react';

/*import styles from './App.module.css';*/

import Hand from './components/hand/Hand';
import BetControls from "./components/bet-controls/BetControls";
import GameControls from "./components/game-controls/GameControls";

import { cards, mixCards } from "./sources/playingCards";


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
				[property]: [ ...value, card ]
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

let playingCards = null;
let deposit = 1000;
let userPoints = 0;
let dealerPoints = 0;
let winner = 'no';

const App = () => {
	const [ state, dispatch ] = useReducer(reducer, initialState);

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

	const startGame = () => {
		winner = null;

		playingCards = [ ...cards ];
		mixCards(playingCards);
		dealCards();

		/*dispatch({ type: 'clean', isUser: true });
		dispatch({ type: 'clean', isUser: false });

		dispatch({ type: 'addCard', isUser: true, card: { name: 'A', suit: 'spades' } });
		dispatch({ type: 'addCard', isUser: true, card: { name: 'K', suit: 'hearts' } });

		dispatch({ type: 'addCard', isUser: false, card: { name: '2', suit: 'spades' } });*/
	};

	const hit = () => {
		dispatch({
			type: 'addCard',
			isUser: true,
			card: playingCards.pop()
		});

		/*dispatch({ type: 'addCard', isUser: true, card: { name: 'A', suit: 'hearts' } });*/
	};

	const stop = () => {
		dispatch({
			type: 'toggleTurn',
			isDealerTurn: true
		});
	};

	useEffect(() => {
		if (winner) return;

		const { isDealerTurn } = state;
		if (!isDealerTurn) return;

		if (dealerPoints < 17) {
			dispatch({
				type: 'addCard',
				isUser: false,
				card: playingCards.pop()
			});

			/*dispatch({ type: 'addCard', isUser: false, card: { name: '5', suit: 'hearts' } });*/
		} else {
			dispatch({
				type: 'toggleTurn',
				isDealerTurn: false
			});
			winner = calcWinner(winner, userHand, userPoints, dealerHand, dealerPoints);
			deposit = calcDeposit(winner, deposit, bet);
		}
	});


	const dealCards = () => {
		dispatch({ type: 'clean', isUser: true });
		dispatch({ type: 'addCard', isUser: true, card: playingCards.pop() });
		dispatch({ type: 'addCard', isUser: true, card: playingCards.pop() });

		dispatch({ type: 'clean', isUser: false });
		dispatch({ type: 'addCard', isUser: false, card: playingCards.pop() });
	};


	const calcPoints = (hand) => {
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

		if (!acesAmount || sum < 22) return sum;

		return sum - 11 * acesAmount + acesAmount;
	};

	const calcEarlyWinner = (userHand, userPoints, dealerPoints) => {
		const isWinWith21 = () => {
			if (userPoints !== 21) return false;

			switch (dealerPoints) {
				case 10:
				case 11:
				case 21:
					return false;
				default:
			}

			return userHand.length === 2;
		};

		if (isWinWith21()) {
			return 'user';
		} else if (userPoints > 21) {
			return 'dealer';
		} else {
			return null;
		}
	};

	const calcWinner = (winner, userHand, userPoints, dealerHand, dealerPoints) => {
		if (winner) return winner;

		if (userPoints === 21 && userHand.length === 2 && dealerHand.length > 2) {
			return 'user'
		}

		if (dealerPoints > 21 || userPoints > dealerPoints) {
			return 'user'
		} else if (userPoints < dealerPoints) {
			return 'dealer'
		} else {
			return 'push'
		}
	};

	const calcDeposit = (winner, deposit, bet) => {
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


	const executeBeforeRender = () => {
		if (winner) return;

		userPoints = calcPoints(userHand);
		dealerPoints = calcPoints(dealerHand);

		const { isDealerTurn } = state;
		if (isDealerTurn) return;

		winner = calcEarlyWinner(userHand, userPoints, dealerPoints);

		if (!winner) return;
		deposit = calcDeposit(winner, deposit, bet);
	};

	const { userHand, dealerHand, bet } = state;

	executeBeforeRender();

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
