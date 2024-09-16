async function debugStorage(){

let res =  await chrome.storage.local.get(['key1']);
return res;
}
var debugDiv = document.getElementById('logdiv1');

//forcast runs for logging purpose. 
fetch("https://api.weather.gov/points/38.8977,-77.0365").then((response) => response.json()).then((json) => console.log(json)); 

async function populateDiv()
{
	let cord = await debugStorage();
	console.log(cord);
	let x = await ''+cord.key1[0]+','+cord.key1[1]
	const cords = x;
	//going to need to catch exceptions here for web api errors.:
	let response = await fetch("https://api.weather.gov/points/"+cords);
	let span = document.createElement('span');
	let rjson = await response.json();
	let rbody = await response.body;
	let spacer=document.createElement('span');
	let forecastURL = rjson.properties.forecast;
	let currentForecast = document.createElement('span');
	spacer.textContent='[logtime]';

	let forecast = await fetch(forecastURL);
	let fjson = await forecast.json();
	let foreText = 'Current Forecast: Temp: '
	+ JSON.stringify(fjson.properties.periods[0].temperature)
	+ JSON.stringify(fjson.properties.periods[0].temperatureUnit).charAt(1);
	currentForecast.textContent=foreText;
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
	//fjson.properties.periods[0]
	console.log('log individual temperature: '+JSON.stringify(fjson.properties.periods[0].temperature)+' '+JSON.stringify(fjson.properties.periods[0].temperatureUnit));
	console.log('log current short summary: '+JSON.stringify(fjson.properties.periods[0].shortForecast));
	debugDiv.appendChild(span);
	debugDiv.appendChild(spacer);
	debugDiv.appendChild(currentForecast);

	//testing current location
	//
	let myNewPromise = await navigator.geolocation.getCurrentPosition(callback);
	console.log('geolocation testing');
	console.log(myNewPromise);
	let span2 = document.createElement('span');
	span2.textContent=myNewPromise;
	debugDiv.appendChild(span2);
	
}

populateDiv();
GeoPermissionTest();
logKeys();

async function logKeys(){

let keys = await chrome.storage.local.get(null,(result) => {console.log('got result',result)} );
console.log('logging keys',keys.key1);
}

function callback(){
	console.log('do nothing');
}

function GeoPermissionTest()
{
	//lets use navigator.permssion.query
	//I need to prompt the user for the location permission!!!!
	navigator.permissions.query({name: 'geolocation'}).then(function(permissionStatus) {console.log('geolocation status:',permissionStatus.state)});

}

