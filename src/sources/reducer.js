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

export default reducer;