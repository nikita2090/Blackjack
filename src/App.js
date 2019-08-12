import React, { useReducer, useEffect } from 'react';

/*import styles from './App.module.css';*/

import Hand from './components/hand/Hand';
import BetControls from "./components/bet-controls/BetControls";
import GameControls from "./components/game-controls/GameControls";

import { cards, mixCards } from "./sources/playingCards";
import { calcPoints, calcWinner, calcDeposit } from "./sources/calcFunctions";
import reducer from './sources/reducer';


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

		dispatch({ type: 'addCard', isUser: true, card: { name: '3', suit: 'spades' } });
		dispatch({ type: 'addCard', isUser: true, card: { name: '7', suit: 'hearts' } });

		dispatch({ type: 'addCard', isUser: false, card: { name: '10', suit: 'spades' } });*/
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


	const executeBeforeRender = () => {
		if (winner) return;
		userPoints = calcPoints(userHand);
		dealerPoints = calcPoints(dealerHand);

		const { isDealerTurn } = state;
		if (isDealerTurn) return;

		calcEarlyWinner(userHand, userPoints, dealerPoints);

		if (!winner) return;
		deposit = calcDeposit(winner, deposit, bet);
	};

	const executeAfterRender = () => {
		if (winner) return;

		const { isDealerTurn } = state;
		if (!isDealerTurn) return;

		if (dealerPoints < 17) {
			dispatch({
				type: 'addCard',
				isUser: false,
				card: playingCards.pop()
			});

			/*dispatch({ type: 'addCard', isUser: false, card: { name: '9', suit: 'hearts' } });*/
		} else {
			dispatch({
				type: 'toggleTurn',
				isDealerTurn: false
			});
			winner = calcWinner(winner, userHand, userPoints, dealerHand, dealerPoints);
			deposit = calcDeposit(winner, deposit, bet);
		}
	};

	useEffect(executeAfterRender);


	const dealCards = () => {
		dispatch({ type: 'clean', isUser: true });
		dispatch({ type: 'addCard', isUser: true, card: playingCards.pop() });
		dispatch({ type: 'addCard', isUser: true, card: playingCards.pop() });

		dispatch({ type: 'clean', isUser: false });
		dispatch({ type: 'addCard', isUser: false, card: playingCards.pop() });
	};

	const calcEarlyWinner = (userHand, userPoints, dealerPoints) => {
		if (userPoints === 21) {
			if (userHand.length === 2) {
				switch (dealerPoints) {
					case 10:
					case 11:
					case 21:
						stop();
						break;
					default:
						winner = 'user';
				}
			} else {
				stop();
			}
		} else if (userPoints > 21) {
			winner = 'dealer';
		}
	};


	const { userHand, dealerHand, bet } = state;

	executeBeforeRender();

	return (
		<main>
			<Hand hand={dealerHand}/>
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
