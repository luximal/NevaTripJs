
const cost_AB = 700;
const cost_ABA = 1200;
const travelTimeMinutes = 50	// 50 min
const travelTimeSeconds = 3000	// 50 min


let timeAB = document.querySelector('.select-time__AB');
let timeBA = document.querySelector('.select-time__BA');
let route = document.getElementById('route');



/*
	Показать/Скрыть выбор направления обратного рейса
*/
route.addEventListener('change', (event) => {

	if (event.target.value == 'AB') {
		timeAB.classList.remove('hidden')
		timeBA.classList.add('hidden')
		calculation()
	}
	if (event.target.value == 'BA') {
		/* Сброс для disabled в select time__BA */
		let arr = document.getElementById('time__BA').options
		arr = [...arr]
		arr.forEach((item) => {
			item.disabled = false
		})
		timeAB.classList.add('hidden')
		timeBA.classList.remove('hidden')
		calculation()
	}
	if (event.target.value == 'ABA') {
		timeAB.classList.remove('hidden')
		timeBA.classList.remove('hidden')
		calculation()
	}
});



/*
	Блокировка перекрестного времени в select BA
*/
timeAB.addEventListener('change', (event) => {

	/* Выбранное время из А в В */
	let selectTimeInSeconds = new Date().setHours.apply(new Date(), event.target.value.split(":")) / 1000

	let optionList = timeBA.getElementsByTagName('option');
	let arr = [...optionList]
	arr.forEach((item) => {
		//	console.log(item.value)
		let optionTimeInSeconds = new Date().setHours.apply(new Date(), item.value.split(":")) / 1000

		if (optionTimeInSeconds - selectTimeInSeconds < travelTimeSeconds) {
			//	item.classList.add('hidden')
			item.disabled = true;
		} else {
			//	item.classList.remove('hidden')
			item.disabled = false;
		}
	})
});



/*
	Ввод количества билетов
*/
let numCount = document.getElementById('num_count');
let minusBtn = document.getElementById('button_minus');
let plusBtn = document.getElementById('button_plus');
minusBtn.onclick = function () {
	numCount.value--
	if (numCount.value == 0) numCount.value = 1
	calculation()
}
plusBtn.onclick = function () {
	numCount.value++
	calculation()
}







/*
	Калькуляция
*/
let calc = document.querySelector('.calculation')
calc.onclick = function () {
	document.querySelector('.info').classList.remove('hidden')
	calculation()
}

function calculation() {
	console.log('calculation')

	/* Количество билетов */
	let ticketCount = document.getElementById('num_count').value;
	setData('.ticketCount', ticketCount)

	/* Направление / Стоимость / Начало / Конец */
	let travelRoute = document.getElementById('route').value;
	if (travelRoute == 'AB') {
		setData('.travelRoute', 'из A в B')
		setData('.travelDuration', travelTimeMinutes)

		setData('.travelStart', document.getElementById('time__AB').value)
		let time__AB = document.getElementById('time__AB').value;	// Время старта в ЧЧ:ММ
		let timeStart = new Date('01.01.1970 ' + time__AB)			// Установить время на время старта
		let timeEnd = new Date(+ timeStart + travelTimeMinutes * 60 * 1000);		// Прибавить время в пути travelTimeMinutes - 50 мин
		travelEnd = timeEnd.toLocaleTimeString([], { timeStyle: 'short' })	// Форматируем дату в ЧЧ:ММ
		setData('.travelEnd', travelEnd)

	}

	if (travelRoute == 'BA') {
		setData('.travelRoute', 'из В в А')
		setData('.travelDuration', travelTimeMinutes)

		setData('.travelStart', document.getElementById('time__BA').value)
		let time__BA = document.getElementById('time__BA').value;	// Время старта в ЧЧ:ММ
		let timeStart = new Date('01.01.1970 ' + time__BA)			// Установить время на время старта
		let timeEnd = new Date(+ timeStart + travelTimeMinutes * 60 * 1000);		// Прибавить время в пути travelTimeMinutes - 50 мин
		travelEnd = timeEnd.toLocaleTimeString([], { timeStyle: 'short' })	// Форматируем дату в ЧЧ:ММ
		setData('.travelEnd', travelEnd)
	}

	if (travelRoute == 'ABA') {
		setData('.travelRoute', 'из A в B и обратно в A')
		setData('.travelCost', cost_ABA * ticketCount)

		setData('.travelStart', document.getElementById('time__AB').value)
		let time__BA = document.getElementById('time__BA').value;	// Время старта в ЧЧ:ММ
		let timeStart = new Date('01.01.1970 ' + time__BA)			// Установить время на время старта
		let timeEnd = new Date(+ timeStart + travelTimeMinutes * 60 * 1000);		// Прибавить время в пути travelTimeMinutes - 50 мин
		travelEnd = timeEnd.toLocaleTimeString([], { timeStyle: 'short' })	// Форматируем дату в ЧЧ:ММ
		setData('.travelEnd', travelEnd)


		let timeStartAB = document.getElementById('time__AB').value	//	ЧЧ:ММ
		let timeStartBA = document.getElementById('time__BA').value	//	ЧЧ:ММ

		let secondsStartAB = new Date('01.01.1970 ' + timeStartAB).getTime() / 1000;	// Время в секундах
		let secondsStartBA = new Date('01.01.1970 ' + timeStartBA).getTime() / 1000;	// Время в секундах

		let travelDurationSec = secondsStartBA + travelTimeMinutes * 60 - secondsStartAB	// Время в пути в секундах
		let travelDuration = new Date(travelDurationSec * 1000).toISOString().substring(11, 17) // Формат в ЧЧ:ММ

		setData('.travelDuration', travelDuration)
	} else {
		setData('.travelCost', cost_AB * ticketCount)
	}

}


function setData(selector, data) {
	document.querySelector(selector).innerHTML = data
}
