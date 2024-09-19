import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}/*, initStateCart = {}*/) {
    this.state = initState;
    //this.cart = initStateCart;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState, type = "state") {
    this[type] = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Установка состояния корзины
   * @param newStateCart
   */

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  /*deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    }, "state");
  }*/

  /**
   * Наполнение корзины
   */
  setCart(items, code){
    items.map(item=>{
      if(item.code == code){
        typeof item.count == "undefined" ? item.count = 1: item.count++;
      }
    });
    items = items.filter(item => item.count > 0);
    return items;
  }

  /**
   * Добавление товара в корзину
   * @param code 
   */
  addToCart(code){
    this.setState({
      ...this.state,        
      cart: this.setCart(this.state.list, code),
    }, "state");
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteCartItem(code) {
    this.state.list.map((list)=>{
      if(list.code == code){
        list.count = 0;
      } 
    });
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter(item => item.code !== code),
    }, "state");
  }

  /**
   * Количество товаров в корзине
   */
  cartCount(){
    console.log(this.state.cart.length);
    return this.state.cart.length;
  }
  /**
   * Общая цена товаров в корзине
   */
  cartPrice(){
    let cart_overall_price = 0;
  
    this.state.cart.map(item => {
      cart_overall_price += item.count * item.price;  
    });

    return cart_overall_price;
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
