import React from 'react';
/*import PropTypes from ''*/

import styles from './GameControls.module.css';

import ControlButton from '../control-btn/ControlButton';

const { wrap, depositSt, panel } = styles;

const GameControls = ({ winner, start, hit, stop, deposit }) => (
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

export default GameControls;