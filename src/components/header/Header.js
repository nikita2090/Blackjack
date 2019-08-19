import React from 'react';
/*import PropTypes from ''*/

import styles from './Header.module.css';


const { header, title } = styles;

const Header = () => (
	<header className={header}>
		<h1 className={title}>Blackjack</h1>
	</header>
);

export default Header;