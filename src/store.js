/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.max_key; //максимальный ключ элемента в состоянии
    this.max_key_deleted; //максимальный удаленный ключ
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
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
    this.setMaxKey();
  }

  /**
   * Установка последнего ключа
   */
  setMaxKey(){
    /*Обновленный метод*/ 
    this.max_key = Math.max.apply(Math, this.state.list.map(function(element) { return element.code; }));
    if(this.max_key_deleted > this.max_key)
      this.max_key = this.max_key_deleted;
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

    if(code > this.max_key_deleted || typeof this.max_key_deleted == "undefined"){
      this.max_key_deleted = code;
    }
      
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
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
          if(item.selected)
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
