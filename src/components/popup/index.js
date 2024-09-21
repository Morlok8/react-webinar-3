import React from "react";
import List from '../list';
import PropTypes from 'prop-types';
import PopupLayout from "../popup-layout";

import "./style.css";

function Popup(props){
    return (props.trigger) ? (
        <PopupLayout>
            <div className = "Popup-header">
                <h3>Корзина</h3>
                <button className = "Close-btn" onClick = {() => props.setTrigger(false)}>Закрыть</button>
            </div>
            <div className = "Popup-body">
                <List
                    cart={props.cartProp}
                    onDeleteFromCart ={props.delete}
                    type = "cart"
                />
                <div class = "Price-total">
                    <div></div>
                    <div>Итого:</div> 
                    <div>{props.cartTotal().toLocaleString()} ₽ </div>
                </div>
            </div>    
        </PopupLayout>
    ):"";
}

Popup.propTypes = {
    cartProp: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.number,
        })
      ),
    trigger: PropTypes.bool,
    setTrigger: PropTypes.func,
    cartTotal: PropTypes. number,
    setTrigger: PropTypes.func,
    delete: PropTypes.func,
  };

export default Popup