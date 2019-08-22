import React from 'react';
/*import PropTypes from ''*/

import styles from './BetControls.module.css';

import Button from '../bet-button/BetButton';


const { wrap, betSt, panel, depositSt } = styles;

const BetControls = ({ bet, changeBet, deposit, winner }) => (
	<div className={wrap}>
		<div className={panel}>
			<Button value='-'
			        name='minus'
			        onClick={changeBet}
			        winner={winner}/>

			<div className={betSt}>Bet: {bet}</div>

			<Button value='+'
			        name='plus'
			        onClick={changeBet}
			        winner={winner}/>

			<Button value='X2'
			        name='double'
			        onClick={changeBet}
			        winner={winner}/>
		</div>
		<div className={depositSt}>Your deposit: {deposit}</div>
	</div>
);

export default BetControls;