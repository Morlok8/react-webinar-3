/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.max_key; //максимальный ключ элемента в состоянии
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
  setState(newState) {
    this.state = newState;
    console.log(this.state);
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();

    this.setMaxKey();
  }

  /**
   * Установка последнего ключа
   */
  setMaxKey(){
    let max_key = 0;

    if(typeof this.max_key !== 'undefined'){
      max_key = this.max_key;
    }
   
    Object.keys(this.state.list).map(list => 
      {if(this.state.list[list].code > max_key)
        max_key = this.state.list[list].code;
      }
    );

    this.max_key = max_key;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setMaxKey();
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.max_key + 1, title: 'Новая запись', activated: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setMaxKey();
    
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
    console.log("max deleted is " + this.max_key);
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
          item.selected = !item.selected;
          item.activated++;
        }
        else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
