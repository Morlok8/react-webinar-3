import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import ItemCart from '../item-cart';
import './style.css';

function List({ list, cart=[], onAddToCart = ()=> {}, onDeleteFromCart = ()=> {}, type = "main" }) {
  if(type == "main"){
    return (
      <div className="List">
        {list.map(item => (
          <div key={item.code} className="List-item">
            <Item item={item} onAddToCart={onAddToCart}  type = "main"/>
          </div>
        ))}
      </div>
    );
  }
  if(type == "cart"){
    if(cart.length > 0){
      return (
        <div className="List">
          {cart.map(item => (
            <div key={item.code} className="List-item">
              <ItemCart item={item} onDeleteFromCart={onDeleteFromCart} type = "cart"/>
            </div>
          ))}
        </div>
      );
    }
    else
    return (
      <div className="List">
        <div className = "Empty">Корзина пуста.</div>
      </div>
    );
  }
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ),
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
};

/*List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
};*/

export default React.memo(List);
