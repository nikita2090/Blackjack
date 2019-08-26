import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameControls.module.css';

import ControlButton from '../control-btn/ControlButton';

const { wrap, depositSt, panel } = styles;

const GameControls = ({ winner, deposit, start, hit, stop, }) => (
	<div className={wrap}>
		<div className={panel}>
			<ControlButton name='stop'
			               value='STOP'
			               disabled={!!winner}
			               onClick={stop}/>

			<div className={depositSt}>Your deposit: {deposit}</div>

			<ControlButton name='start'
			               value='START'
			               disabled={!winner}
			               onClick={start}/>

			<ControlButton name='hit'
			               value='HIT'
			               disabled={!!winner}
			               onClick={hit}/>
		</div>
	</div>
);


GameControls.propTypes = {
	winner: PropTypes.string,
	deposit: PropTypes.number,
	start: PropTypes.func,
	hit: PropTypes.func,
	stop: PropTypes.func,
};

GameControls.defaultProps = {
	winner: '',
	deposit: 0,
	start: () => {},
	hit: () => {},
	stop: () => {},
};

export default GameControls;