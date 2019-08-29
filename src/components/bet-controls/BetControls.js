import React from 'react';
import PropTypes from "prop-types";

import styles from './BetControls.module.css';

import BetButton from '../bet-button/BetButton';


const { wrap, betSt, panel } = styles;

const BetControls = ({ bet, winner, changeBet }) => (
	<div className={wrap}>
		<div className={panel}>
			<BetButton value='X2'
			           name='double'
			           winner={winner}
			           onClick={changeBet}/>

			<BetButton value='+'
			           name='plus'
			           winner={winner}
			           onClick={changeBet}/>

			<div className={betSt}>bet: {bet}</div>

			<BetButton value='-'
			           name='minus'
			           winner={winner}
			           onClick={changeBet}/>
		</div>
	</div>
);


BetButton.propTypes = {
	bet: PropTypes.number,
	winner: PropTypes.string,
	changeBet: PropTypes.func,
};

BetButton.defaultProps = {
	bet: 0,
	winner: '',
	changeBet: () => {},
};

export default BetControls;