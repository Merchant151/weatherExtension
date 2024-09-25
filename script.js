
const tooltip = document.getElementById('hidden');
const refresh = document.getElementById('localRefresh');
async function main()
{
	//debug button
	document.getElementById('debug').addEventListener("click",function(){console.log('goto Debug');window.location.href='debug.html';});
	//get forcast.
	//add to index.html
	let testString = document.getElementById('debugscript');
	let str = document.createElement('span');
	let img = document.getElementById('weatherpic');
	let weatherData = await weather();
	let forecast = weatherData.properties.periods[0];
	let temp = JSON.stringify(weatherData.properties.periods[0].temperature);
	let unit = JSON.stringify(weatherData.properties.periods[0].temperatureUnit);
	let shorty = JSON.stringify(weatherData.properties.periods[0].shortForecast);
	let speed = JSON.stringify(forecast.windSpeed);
	let time = JSON.stringify(weatherData.properties.periods[0].startTime);
	let rain = JSON.stringify(forecast.probabilityOfPrecipitation.value);
	//let temp = JSON.stringify(weatherData.properties.perods[0].temperature);
	str.textContent = ''+temp+unit+shorty+speed+rain+time;
	let grabOne = document.getElementById('Temp');
	let shortCast = document.getElementById('shortCast');
	let elementR = document.getElementById('rain');
	let elementW = document.getElementById('wind');
	if (rain == 'null'){rain = '0';console.log('rain null;');}else{console.log('rain true');};
	elementR.textContent = 'Percipitation: '+rain+'%';
	elementW.textContent = 'Wind: '+speed.slice(1,-1);
	grabOne.textContent = temp+"°";
	shortCast.textContent = shorty.slice(1,-1);
	img.src = await imgCase(shorty.slice(1,-1));
	testString.appendChild(str);

		
	//location work
	let locally = await local();
	let city = locally.city;
	let state= locally.state;
	let docLocal = document.getElementById('local');
	console.log('time: '+time);
	let hour = time.slice(12,-13);//not sure how to handle time conversions
	let maridian = ' AM';
	if (Number(hour) >= 12){ maridian = ' PM';hour = Number(hour)-12; }
	if (Number(hour) == 0) {hour = 12;}
	docLocal.textContent = city+', '+state+' '+hour+maridian//' 09:35pm EDT'
	
	//location time
	console.log(time);

}

async function imgCase(x)
{
	let path = './img/'
	console.log('logging imgCase');
	switch (x) 
	{
		case 'Sunny':
			console.log('day_clear.png');
			path = path+'day_clear.png';
			break;
		case 'Partly Cloudy':
			console.log('day_partial_cloud.png');
			path = path+'day_partial_cloud.png';
			break;
		case 'Mostly Sunny':
			console.log('mostly sunny');
			path = path+'day_partial_cloud.png';
		case 'Partly Sunny':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Mostly Cloudy':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Cloudy':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'patchy Drizzle':
			console.log('patchy drizzle');
			path = path+'day_rain.png';
		case 'Slight Chance Showers And Thunderstorms':
			console.log('slight showers and thunderstomrs');
			path = path+'day_rain_thunder.png';
		case 'Sunny9':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Sunny8':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Sunny7':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Sunny6':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Sunny5':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Sunny4':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Sunny3':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Sunny2':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';
		case 'Sunny1':
			console.log('day_clear.png');
			path = path+'day_partial_cloud.png';

		default:
			console.log('default case');
			path = path+'angry_clouds.png';
	
	}
	console.log(x);
	return path;

}


async function weather()
{
	///these consts are temporary
	const cords = await getCords();
	const apiStr= "https://api.weather.gov/points/";

	//process needed to build forcast from cords 
	/*
	 * weather API can't get a forcast from cords but can return the closest weather station. 
	 * individual weather staions provide a forcast 
	 * so first I need to grab the weather station then grab the forcast (or alrady know which weather station I want)
	 */
	let stationParent = await fetch(apiStr+cords);
	let station = await (stationParent.json())
	console.log('station!')
	console.log(station);
	let stationURL= await station.properties.forecast;
	let stationHourlyURL = await station.properties.forecastHourly;
	console.log('station hourly url',stationHourlyURL);
	let hourly = await fetch(stationHourlyURL);
	let hourlyData = await hourly.json();
	console.log('hourly forecast');
	console.log(hourlyData);
	console.log(hourlyData.properties.periods[0])
	//let forecast = await fetch(stationURL);
	//let weatherData = await forecast.json();
	//console.log('loging weather data:');
	//console.log(weatherData);
	//return weatherData;
	return hourlyData;

}

async function local()
{

	const cords = await getCords();
	const apiStr= "https://api.weather.gov/points/";
	
	let apiResult = await fetch(apiStr+cords);
	let jsonGetter = await apiResult.json();
	console.log(jsonGetter);
	console.log(jsonGetter.properties.relativeLocation.properties.city)
	console.log(jsonGetter.properties.relativeLocation.properties.state);
	console.log(jsonGetter.properties.relativeLocation.properties);	
	return      jsonGetter.properties.relativeLocation.properties;

}

async function getCords()
{
	let cord = await chrome.storage.local.get(['key1']);
	//console.log('getting cords',cord);
	//console.log(cord.key1[0]);
	//console.log(cord.key1[1]);
	if (typeof cord.key1 === 'undefined')
	{
		console.log('no previously stored location! please refresh or enter location!');
		return '38.8977,-77.0365';
	}else 
	{
		console.log('foud storage attempting to return location!');
		let x = ""+cord.key1[0]+","+cord.key1[1];
		console.log(x);
		return x;
	}

}

main();

//debug get cords 
//getCords();
	//location refresh work 
	refresh.onclick = async function namedFunc() {	
		//console.log('test1');
		try{
			let myNewPromise = await new Promise((resolve,reject) => {navigator.geolocation.getCurrentPosition(
				(position) => {
						console.log('success');
						console.log('pos :' + position.coords);
						resolve(position);
				},
				(error) => {
						console.log('atempting to log an error!!!')
						console.error('error: ', error);
						reject(error);
				},
				{
					enableHighAccuracy: false,
					timeout: 5000,
					maximumAge: 0
				}
			);});
			console.log(myNewPromise.coords.latitude+', '+myNewPromise.coords.longitude);
			console.log(myNewPromise.coords);
			let latLong = [myNewPromise.coords.latitude,myNewPromise.coords.longitude]
			let loc = {'local':latLong}
			console.log('logging loc:',loc['local']);
			chrome.storage.local.set({'key1':latLong}).then(() => {console.log('value is set')});
			//fast storage test????
			///chrome.storage.local.get(['key1'], (result) => {
    			///console.log('Retrieved value:', result.key1);
			//});
		}catch (error) { console.log('unable to find location'); console.log(error);}
		
	}
	//tooltip popup
	refresh.addEventListener('mouseover', function() {tooltip.classList.add('show');});
	refresh.addEventListener('mouseout', function() {tooltip.classList.remove('show');});


