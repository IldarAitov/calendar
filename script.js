"use strict"


function range(count) {
    //возвращает массив от 1 до count
    let result = [];
	for (let i = 1; i <= count; i++){
        result.push(i);
    }
    return result;
}


function getLastDay(year, month) {
    //возвращает номер последнего дня месяца
	let date = new Date(year, month + 1, 0);
    return date.getDate();
}


function getFirstWeekDay(year, month) {
    //возвращает день недели первого дня месяца 
	let date = new Date(year, month, 1);
    if (date.getDay() == 0){
        return 6;
    } else {
        return date.getDay() - 1;
    }

}


function getLastWeekDay(year, month) {
    //возвращает день недели последнего дня месяца 
	let date = new Date(year, month + 1, 0);
    if (date.getDay() == 0){
        return 6;
    } else {
        return date.getDay() - 1;
    }
}


function normalize(arr, left, right) {
    //дополняет массив пустыми строками слева и справа
	for (let i = 0; i < left; i++){
        arr.unshift('');
    };

    for (let j = 0; j < right; j++){
        arr.push('');
    }
    return arr;
}


function chunk(arr, n) {
    //преобразует масссив в двумерный
    let result = [];
	// n - количество элементов в подмассиве
    for (let i = 0; i < arr.length; i += n){
        result.push(arr.slice(i, i + n));
    }
    return result;
}


function createTable(parent, arr) {
    //создание таблицы по двумерному массиву
	for (let sArr of arr){
        let tr = document.createElement('tr');
        tr.classList.add('days');

        for (let elem of sArr){
            let td = document.createElement('td');
            td.textContent = elem;
            tr.appendChild(td);
        }
        parent.appendChild(tr);
    };
}

function draw(body, year, month) {
    //формируем календарь 
	let arrDays = range(getLastDay(year, month));//находим сколько дней в месяце, формируем массив дат
    let firstWeekDay = getFirstWeekDay(year, month);//получаем день недели первого месяца
    let lastWeekDay  = getLastWeekDay(year, month);//получаем день недели последнего месяца


    let a = normalize(arrDays, firstWeekDay, 6 - lastWeekDay);//формируем массив
    let arrNormDays = chunk(a, 7);////формируем двумерный массив
    
    createTable(body, arrNormDays); //создаем таблицу
}


function getNextYear(year, month){
    //возвращает год следующео месяца
    let date;
    if (month == 11){
        date = new Date(year + 1, month);
    } else {
        date = new Date(year, month);
    };
    return date.getFullYear();
}


function getNextMonth(month){
    //возвращает следующий месяц
    if (month == 11){
        return 0;
    } else {
        return month + 1;
    }
}


function getPrevMonth(month){
    //возвращает предыдущий месяц
    if (month == 0){
        return 11;
    } else {
        return month - 1;
    };
}

function getPrevYear(year, month){
    //возвращает год предыдущего месяца
    let date;
    if (month == 0){
        date = new Date(year - 1, month);
    } else {
        date = new Date(year, month);
    };
    return date.getFullYear();
}


function dateInfo(div, month, year){
    //передает в див дату
    let months = {
        0: 'Январь',
        1: 'Февраль',
        2: 'Март',
        3: 'Апрель',
        4: 'Май',
        5: 'Июнь',
        6: 'Июль',
        7: 'Август',
        8: 'Сентябрь',
        9: 'Октябрь',
        10: 'Ноябрь',
        11: 'Декабрь',
    };

    div.textContent = months[month] + ' ' + String(year) + ' года';
}


let calendar = document.querySelector('#calendar');
let body = calendar.querySelector('.body');

let date  = new Date();
let year  = date.getFullYear();
let month = date.getMonth();

let divInfo = document.querySelector('.info');


//console.log(month);

draw(body, year, month);  //создам таблицу
dateInfo(divInfo, month, year);  //передаем в див дату

let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');

next.addEventListener('click', function(){
    let arrTr = document.querySelectorAll('tr.days');
    for (let tr of arrTr){
        tr.remove(); //удаляем предыдущую таблицу
    }
    //console.log(arrTr);
    draw(body, getNextYear(year, month), getNextMonth(month));     //рисуем новую таблицу
    year = getNextYear(year, month);
    month = getNextMonth(month);
    dateInfo(divInfo, month, year); //передаем в див дату
    

});


prev.addEventListener('click', function(){
    let arrTr = document.querySelectorAll('tr.days');
    for (let tr of arrTr){
        tr.remove();     //удаляем предыдущую таблицу
    }
    draw(body, getPrevYear(year, month), getPrevMonth(month));
    year = getPrevYear(year, month);
    month = getPrevMonth(month);
    dateInfo(divInfo, month, year);    //передаем в див дату
    
});


