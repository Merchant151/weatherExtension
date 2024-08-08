const cords = "38.8977,-77.0365";
var debugDiv = document.getElementById('logdiv1');

//forcast runs for logging purpose. 
fetch("https://api.weather.gov/points/38.8977,-77.0365").then((response) => response.json()).then((json) => console.log(json)); 

async function populateDiv()
{
	let response = await fetch("https://api.weather.gov/points/"+cords);
	let span = document.createElement('span');
	let rjson = await response.json();
	let rbody = await response.body;
	let spacer=document.createElement('span');
	spacer.textContent='[logtime]';
	//console.log(response.body);working with streams can only be consumed once
	//console.log(response.json());
	console.log(rjson);
	console.log(rbody);
	console.log('logging context element: '+rjson['@context']);
	console.log('logging id element: '+ rjson.id);
	console.log('');
	console.log('');
	console.log('');
	span.textContent = JSON.stringify(rjson);

	debugDiv.appendChild(span);
	debugDiv.appendChild(spacer);
}

populateDiv();
