import React, {useReducer} from 'react';

/*import styles from './App.module.css';*/

import Hand from './components/hand/Hand';
import { cards, mixCards } from "./sources/playingCards";


let playingCards = null;
let deposit = 1000;
/*let userPoints = 0;
let dealerPoints = 0;*/


const userReducer = (state, { type, card, bet, isUser }) => {
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
		default:
			throw new Error('Unknown action');
	}
};

const App = () => {
	const initialState = {
		userHand: [],
		dealerHand: [],
		bet: 50,
		isDealersTurn: false,
	};

	const [state, dispatch] = useReducer(userReducer, initialState);

	const dealCards = () => {
		dispatch({ type: 'clean', isUser: true});
		dispatch({ type: 'addCard', isUser: true, card: playingCards.pop() });
		dispatch({ type: 'addCard', isUser: true, card: playingCards.pop() });

		dispatch({ type: 'clean', isUser: false});
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

	const stop = () => {

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


	/*useEffect(() => {
		if (userPoints > 21) {
			alert('You lose');
		} else if (userPoints === 21) {
			alert('Blackjack!');
		}
	}, [userPoints]);*/

	/*useEffect(() => {
		if (!isDealersTurn) return;

		letDealerTurn(dealerHand, setDealerHand);
		calculatePoints(dealerHand, setDealerPoints);

		console.log(dealerPoints);
		if (dealerPoints > 18) {
			setTurn(false);
		}

	}, [isDealersTurn, dealerHand, dealerPoints]);*/


	let { userHand, dealerHand, bet } = state;
	return (
		<main>
			<Hand hand={dealerHand}/>
			<div>DEALER'S POINTS:{calculatePoints(dealerHand)}</div>

			<div>POINTS:{calculatePoints(userHand)}</div>
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
