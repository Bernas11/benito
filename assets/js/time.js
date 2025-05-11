// ┌┬┐┬┌┬┐┌─┐
//  │ ││││├┤
//  ┴ ┴┴ ┴└─┘
// Definir hora e data

window.onload = displayClock;

function displayClock() {
	const monthNamesPT = [
		'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
		'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
	];

	const d = new Date();
	const mes = monthNamesPT[d.getMonth()];
	const dia = d.getDate();
	const minutos = ('0' + d.getMinutes()).slice(-2);
	let horas = d.getHours();
	let sufixo = '';

	if (CONFIG.twelveHourFormat) {
		sufixo = horas >= 12 ? ' pm' : ' am';
		horas = horas % 12;
		horas = horas ? horas : 12;
	}

	document.getElementById('hour').innerText = horas;
	document.getElementById('separator').innerHTML = ' : ';
	document.getElementById('minutes').innerText = minutos + sufixo;

	// Exibir como "11 de maio"
	document.getElementById('date').innerText = `${dia} de ${mes}`;

	setTimeout(displayClock, 1000);
}
