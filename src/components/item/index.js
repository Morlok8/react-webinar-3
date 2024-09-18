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

  function typeCheck(type, asset = "button"){
    if(type == "main"){
      if(asset == "button")
        return <button onClick={callbacks.onAddToCart}>Добавить</button>;
    }
    if(type == "cart"){
      if(asset == "div")
        return <div className = "Item-count">{props.item.count} шт.</div>;
      else
        return <button onClick={callbacks.onDeleteFromCart}>Удалить</button>;
    }

  }

  return (
    <div
      className={'Item' }
      
    >
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}{' '}
        {count
          ? ` | Выделяли ${count} ${plural(count, {
              one: 'раз',
              few: 'раза',
              many: 'раз',
            })}`
          : ''}
      </div>
      <div className = "Item-price">
        {props.item.price.toLocaleString()} ₽ 
      </div>

        { typeCheck(props.type, "div")}

      <div className="Item-actions">
        {typeCheck(props.type)}
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
