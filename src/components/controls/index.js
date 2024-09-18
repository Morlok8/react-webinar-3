import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Popup from '../popup';
import { plural } from '../../utils';



function Controls({ cartDelete = () => {}, cartCount = () => {}, cartPrice = () => {}, cart}) {

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

  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="Controls">
      <div>Количество товаров: <span class="Cart-stats">{result}</span></div>
      <button onClick={() => setButtonPopup(true)} >Перейти</button>
      <Popup trigger = {buttonPopup} setTrigger={setButtonPopup} cartProp = {cart} delete = {cartDelete} cartTotal = {cartPrice()}/>
        
      
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  cartCount: PropTypes.func
};

/*Controls.defaultProps = {
  onAdd: () => {},
};*/

export default React.memo(Controls);
