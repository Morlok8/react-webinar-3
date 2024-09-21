import React, { useState } from 'react';
//import App from '';
import PropTypes from 'prop-types';
import './style.css';
import Popup from '../popup';
import { plural } from '../../utils';



function Controls({ setPopup = () => {}, cartCount = () => {}, cartPrice = () => {}, cart}) {

  let result = "пусто";

  if(cartCount() !== 0){
    let countCart, totalCount;
    countCart = ` ${cartCount()} ${plural(cartCount(), {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        })}`;
     result = countCart + " / " + cartPrice().toLocaleString() + " ₽";
  }

  //const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="Controls">
      <div></div>
      <div>В корзине: <span className="Cart-stats">{result}</span></div>
      <button onClick={() => setPopup(true)} >Перейти</button>
      { /*<Popup trigger = {buttonPopup} setTrigger={setButtonPopup} cartProp = {cart} delete = {cartDelete} cartTotal = {cartPrice()}/>  */}
        
      
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  cartCount: PropTypes.func,
  setPopup: PropTypes.func,
};

export default React.memo(Controls);
