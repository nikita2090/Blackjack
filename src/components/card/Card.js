import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Card.module.css';


const { card, pictureWrap, big } = styles;

const Card = ({ suit, name }) => {
	const bigSuit = classNames(big, suit);
	return (
		<div className={card}>
			<span className={suit}>{name}</span>
			<div className={pictureWrap}>
				<span className={bigSuit}/>
			</div>
		</div>
	);
};


Card.propTypes = {
	suit: PropTypes.string,
	name: PropTypes.string,
};

Card.defaultProps = {
	suit: '',
	name: '',
};

export default Card;