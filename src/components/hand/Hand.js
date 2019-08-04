import React from 'react';
/*import PropTypes from ''*/
import styles from './Hand.module.css';
const {pareSt, cardSt} = styles;


const Hand = ({hand}) => (
	<div className={pareSt}>
		{hand.map(({name, suit, id}) => (
			<div className={cardSt}
			     key={id}>
				<span className={suit}>{name}</span>
			</div>
		))}
	</div>
);


export default Hand;