import React from "react";
import List from '../list';

import "./style.css";

function Popup(props){
    return (props.trigger) ? (
        <div className = "Popup">
            <div className="Popup-inner">
                <div className = "Popup-header">
                    <h3>Корзина</h3>
                    <button className = "Close-btn" onClick = {() => props.setTrigger(false)}>Закрыть</button>
                </div>
                
                {props.children}
                <List
                    cart={props.cartProp}
                    onDeleteFromCart ={props.delete}
                    type = "cart"
                />
                <div class = "Price-total"><span>Итого:</span> <span>{props.cartTotal.toLocaleString()} ₽ </span></div>
            </div>
        </div>
    ):"";
}

export default Popup