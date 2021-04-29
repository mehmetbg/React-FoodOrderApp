import classes from './Header.module.css';
import React, { Fragment } from 'react';
import images from '../../assets/food.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>Reactive Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={images} alt="Delicious Food"/>
        </div>
    </Fragment>
};

export default Header;