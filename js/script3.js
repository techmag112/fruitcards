const priority = ["красный", "розово-красный", "оранжевый", "коричневый", "светло-коричневый", "желтый", "зеленый", "голубой", "синий", "фиолетовый"];
let fruitsJSON = `[
    {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
    {"kind": "Дуриан", "color": "зеленый", "weight": 35},
    {"kind": "Личи", "color": "розово-красный", "weight": 17},
    {"kind": "Карамбола", "color": "желтый", "weight": 28},
    {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
  ]`,
  // преобразование JSON в объект JavaScript
      fruits = JSON.parse(fruitsJSON);
let sortTime;
const comparationColor = (a, b) => {
    // TODO: допишите функцию сравнения двух элементов по цвету
    return priority.indexOf(a.color) < priority.indexOf(b.color) ? true : false;
};

const sortAPI = {
    quickSort(arr, comparation)  {
        if (arr.length <= 1) {
        return arr;
        }
    const key = arr[arr.length - 1];
    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if ((comparationColor(arr[i], key)) ) {
            leftArr.push(arr[i]);
        }
        else {
            rightArr.push(arr[i]);
        }
    }
    return [...this.quickSort(leftArr), key, ...this.quickSort(rightArr)];
    },

    startSort(sort, arr, comparation) {
        const start = new Date().getTime();
        sort(arr, comparation);
        const end = new Date().getTime();
        sortTime = `${end - start} мс`;
      },
};


// Вариант вызова - краш
const sortKind = 'quickSort';
const sort = sortAPI[sortKind];
console.log(sortAPI.startSort(sort, fruits, comparationColor));

// Вариант вызова - все работает
//console.log(sortAPI.quickSort(fruits, comparationColor));