const cords = "38.8977,-77.0365";
var debugDiv = document.getElementById('logdiv1');

//forcast runs for logging purpose. 
fetch("https://api.weather.gov/points/38.8977,-77.0365").then((response) => response.json()).then((json) => console.log(json)); 

async function populateDiv()
{
	//going to need to catch exceptions here for web api errors. 
	let response = await fetch("https://api.weather.gov/points/"+cords);
	let span = document.createElement('span');
	let rjson = await response.json();
	let rbody = await response.body;
	let spacer=document.createElement('span');
	let forecastURL = rjson.properties.forecast;
	spacer.textContent='[logtime]';

	let forecast = await fetch(forecastURL);
	let fjson = await forecast.json();
	//console.log(response.body);working with streams can only be consumed once
	//console.log(response.json());
	console.log(rjson);
	console.log(rbody);
	console.log('logging context element: '+rjson['@context']);
	console.log('logging id element: '+ rjson.id);
	console.log('logging properties: '+JSON.stringify(rjson.properties));
	console.log('logging properties.forcast: '+rjson.properties.forecast);
	console.log('logging forcast URL: '+forecastURL);
	console.log('log forcast '+ JSON.stringify(fjson));
	span.textContent = JSON.stringify(rjson);

	debugDiv.appendChild(span);
	debugDiv.appendChild(spacer);
}

populateDiv();
