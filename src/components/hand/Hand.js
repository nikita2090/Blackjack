import React from 'react';
/*import PropTypes from ''*/

import styles from './Hand.module.css';

import Card from '../card/Card';


const { pareSt } = styles;

const Hand = ({ hand }) => (
	<div className={pareSt}>
		{hand.map(({ name, suit, id }) => (
			<Card key={id}
			      name={name}
			      suit={suit}/>
		))}
	</div>
);


export default Hand;