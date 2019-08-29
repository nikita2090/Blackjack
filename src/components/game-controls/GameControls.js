import React from 'react';
import PropTypes from 'prop-types';

import styles from './GameControls.module.css';

import ControlButton from '../control-btn/ControlButton';

const { wrap, depositSt, panel } = styles;

const GameControls = ({ winner, deposit, start, hit, stop, }) => (
	<div className={wrap}>
		<div className={panel}>
			<ControlButton name='start'
			               value='start'
			               disabled={!winner}
			               onClick={start}/>


			<div className={depositSt}>deposit: {deposit}</div>

			<ControlButton name='hit'
			               value='hit'
			               disabled={!!winner}
			               onClick={hit}/>

			<ControlButton name='stop'
			               value='stop'
			               disabled={!!winner}
			               onClick={stop}/>
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