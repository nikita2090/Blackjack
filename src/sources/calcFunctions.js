export const calcPoints = (hand) => {
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

export const calcWinner = (winner, userHand, userPoints, dealerHand, dealerPoints) => {
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

export const calcDeposit = (winner, deposit, bet, userHand = {}, userPoints = 0) => {
	switch (winner) {
		case 'user':
			if (userPoints === 21 && userHand.length === 2) {
				return deposit + bet * 2.5;
			}
			return deposit + bet * 2;
		case 'dealer':
			return deposit;
		case 'push':
			return deposit + bet;
		default:
			return deposit - bet;
	}
};