import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  const cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),

    onDeleteFromCart: useCallback(
      code => {
        store.deleteCartItem(code);
      },
      [store],
    ),

    onSelectItem: useCallback(
      code => {
        store.selectItem(code);
      },
      [store],
    ),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    cartCount: useCallback(() => {
      return store.cartCount();
    }, [store]),

    cartPrice: useCallback(()=>{
      return store.cartPrice();
    }, [store]),

  };

  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />
      <Controls onAdd={callbacks.onAddItem} cart = {cart} cartCount = {callbacks.cartCount} cartPrice = {callbacks.cartPrice} cartDelete = {callbacks.onDeleteFromCart}/>
      <List
        list={list}
        onAddToCart={callbacks.onAddToCart}
        type = "main"
      />
    </PageLayout>
  );
}

export default App;
