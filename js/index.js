// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');
const panelSelector = document.querySelector('.panel__wrapper');

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`,
// преобразование JSON в объект JavaScript
    fruits = JSON.parse(fruitsJSON),
// Делаем его полноценную копию-эталон
    original = JSON.parse(JSON.stringify(fruits));

/*** ОТОБРАЖЕНИЕ ***/

// класс карточек фрукта для создания карточек
class CardFruit {
  constructor(indexFruit, parentSelector, {kind, color, weight}) {
    this.indexFruit = indexFruit;
    this.kindName = kind;
    this.colorFruit = color;
    this.weightFruit = weight;
    this.parent = document.querySelector(parentSelector);
  }

  colorTranslate(color) {
    switch (color) {
      case 'фиолетовый' : return 'fruit_violet';
      case 'зеленый' : return 'fruit_green';
      case 'розово-красный' : return 'fruit_carmazin';
      case 'желтый' : return 'fruit_yellow';
      case 'светло-коричневый' : return 'fruit_lightbrown';
      case 'коричневый' : return 'fruit_brown';
      case 'красный' : return 'fruit_red';
      case 'оранжевый' : return 'fruit_orange';
      default: return 'fruit_grey';
    }
  }

  render() {
    const element = document.createElement('li');
    element.classList.add('fruit__item');
    element.classList.add(this.colorTranslate(this.colorFruit));
    element.innerHTML = `
        <div class="fruit__info">
          <div>index: ${this.indexFruit}</div>
          <div>kind: ${this.kindName}</div>
          <div>color: ${this.colorFruit}</div>
          <div>weight (кг): ${this.weightFruit}</div>
        </div>
    `;
    this.parent.appendChild(element);
  }
}

// отрисовка карточек
const display = (arr) => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';
  arr.forEach((element, key) => {
  //for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    new CardFruit(key, '.fruits__list', element).render(); 
  });
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let i = getRandomInt(0, fruits.length - 1);
    result.push(fruits[i]);
    fruits.splice(i, 1);
  }
  fruits = result;
  // Проверка на уникальность порядка - сравниваем объекты как 2 строки
  if (JSON.stringify(original) === JSON.stringify(fruits)) {
    alert('Порядок не изменился!');
  };

};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива

const filterFruits = (minLimit, maxLimit) => { 
  return fruits.filter((item) => {
      // TODO: допишите функцию
      return (item.weight >= minLimit && item.weight <= maxLimit);
  });
};

filterButton.addEventListener('click', () => {
  // Если что-то не ввели - сбросим границу фильтра
  const minLimit = minWeight.value != '' ? parseInt(minWeight.value) : 0,
        maxLimit = maxWeight.value != '' ? parseInt(maxWeight.value) : 10000;
  // Если уже фильтровали, восстановим список перед новым фильтром      
  if (original.length > fruits.length) {
    fruits = JSON.parse(JSON.stringify(original));
  } 
  // Если задано хотя бы одно поле ограничений - фильтруем
  if (minWeight.value != '' || maxWeight.value != '') {
    fruits = filterFruits(minLimit, maxLimit);
  }
  display(fruits);
});

panelSelector.addEventListener('keyup', (e) => {
  // Обрабочик ошибок ввода - автокоррекция
  if (minWeight.value.match(/\D/g) && e.target) {
    minWeight.value = minWeight.value.slice(0, -1);
  }
  if (maxWeight.value.match(/\D/g) && e.target) {
         maxWeight.value = maxWeight.value.slice(0, -1);
  }
  if (weightInput.value.match(/\D/g) && e.target) {
    weightInput.value = weightInput.value.slice(0, -1);
  }
  if (!kindInput.value.match(/[а-я]/gi) && e.target) {
    kindInput.value = kindInput.value.slice(0, -1);
  }
  if (!colorInput.value.match(/[а-я]/gi) && e.target) {
    colorInput.value = colorInput.value.slice(0, -1);
  }
});

/*** СОРТИРОВКА ***/

// Массив сортировки по цветам

// красный, оранжевый, жёлтый, зелёный, голубой, синий, фиолетовый
const priority  = ["красный", "розово-красный", "оранжевый", "коричневый", "светло-коричневый", "желтый", "зеленый", "голубой", "синий", "фиолетовый"];

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return priority.indexOf(a.color) > priority.indexOf(b.color) ? true : false;
};

const sortAPI = {
  
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    // обход массива
    for (let i = 1, l = arr.length; i < l; i++) {
      const current = arr[i];
      let j = i;
      //console.log(arr);
      // вставка элемента в отсортированную часть
      while (j > 0 && (comparation(arr[j - 1], current))) {
          arr[j] = arr[j - 1];
          j--;
      }
      arr[j] = current;
    }
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    // Вариант 1 (тупо в лоб) 
    // Используем готовый алгоритм быстрой сортировки, 
    // реализованый в встроенном методе sort, подставив нашу функцию критерия выбора
    // fruits = arr.sort(comparation); 
    // Вариант 2, рекурсивный алгоритм быстрой сортировки
    if (arr.length <= 1) {
      return arr;
    }
    const key = arr[arr.length - 1];
    const leftArr = [];
    const rightArr = [];

      for (let i = 0; i < arr.length - 1; i++) {
        // Не знаю как вставить в качестве параметра функцию при рекурсии
          if (comparationColor(arr[i], key)) {
            rightArr.push(arr[i]);
          }
          else {
            leftArr.push(arr[i]);
          }
      }
      return [...this.quickSort(leftArr), key, ...this.quickSort(rightArr)];
  }  

  // Отключаю этот метод, т.к. не могу найти можно как реализовать 
  // рекурсию внутри метода объекта через вызов другим методом этого объекта
  // выполняет сортировку и производит замер времени
  //startSort(sort, arr, comparation) {
  //  const start = new Date().getTime();
  //  sort(arr, comparation);
  //  const end = new Date().getTime();
  //  sortTime = `${end - start} мс`;
  //},
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind === 'bubbleSort') {
    sortKind = 'quickSort';
  } else {
    sortKind = 'bubbleSort';
  }
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  //const sort = sortAPI[sortKind];
  //sortAPI.startSort(sort, fruits, comparationColor);
  const start = new Date().getTime();
  if (sortKind === 'bubbleSort') {
    sortAPI.bubbleSort(fruits, comparationColor);
  } else {
    fruits = sortAPI.quickSort(fruits, comparationColor);
  }
  const end = new Date().getTime();
  sortTime = `${end - start} мс`;
  display(fruits);
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  let newKind, newColor, newWeight;
  if (kindInput.value !='' && colorInput.value !='' && weightInput.value !='') {
    // Все буквы делаем строчные
    newKind = kindInput.value.toLowerCase();
    // А первую - заглавной
    newKind = newKind.replace(newKind[0], newKind[0].toUpperCase());
    newColor = colorInput.value.toLowerCase(); 
    newWeight = parseInt(weightInput.value);
    // Соберем строку, преобразуем в объект и вставим в конец массива объектов
    original.push(JSON.parse(`{"kind": "${newKind}", "color": "${newColor}", "weight": ${newWeight}}`)); 
    fruits = JSON.parse(JSON.stringify(original));
    // Сгенерим новые карточки
    display(fruits);
    // Очистить поля ввода
    kindInput.value = '';
    colorInput.value = '';
    weightInput.value = '';
  } else {
    alert('Не все поля заполнены!');
  }
});

