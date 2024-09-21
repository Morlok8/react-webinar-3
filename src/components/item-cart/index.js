import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item(props) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onAddToCart: e => {
      e.stopPropagation();
      props.onAddToCart(props.item.code);
    },
    onDeleteFromCart: e => {
      e.stopPropagation();
      props.onDeleteFromCart(props.item.code)
    }
  };

  return (
    <div
      className={'Item' }
      
    >
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}{' '}
      </div>
      <div className = "Item-price">
        {props.item.price.toLocaleString()} ₽ 
      </div>

      <div className = "Item-count cart">
        {props.item.count} шт.
      </div>

      <div className="Item-actions">
        <button onClick={callbacks.onDeleteFromCart}>Удалить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
  onDeleteFromCart: PropTypes.func,
  onSelect: PropTypes.func,
};

/*Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};*/

export default React.memo(Item);
