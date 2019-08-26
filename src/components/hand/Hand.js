import React from 'react';
import PropTypes from 'prop-types';

import styles from './Hand.module.css';

import Card from '../card/Card';


const { pareSt, empty } = styles;

const Hand = ({ hand }) => {
	let content;
	if (hand.length) {
		content = hand.map(({ name, suit, id }) => (
			<Card key={id}
			      name={name}
			      suit={suit}/>
		));
	} else {
		content = <div className={empty}/>;
	}

	return (
		<div className={pareSt}>
			{content}
		</div>
	)
};


Hand.propTypes = {
	hand: PropTypes.array
};

Hand.defaultProps = {
	hand: []
};

export default Hand;