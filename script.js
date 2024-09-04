
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
	let weatherData = await weather();
	//let time = 
	let forecast = weatherData.properties.periods[0];
	let temp = JSON.stringify(weatherData.properties.periods[0].temperature);
	let unit = JSON.stringify(weatherData.properties.periods[0].temperatureUnit);
	let shorty = JSON.stringify(weatherData.properties.periods[0].shortForecast);
	let speed = JSON.stringify(forecast.windSpeed);
	let time = JSON.stringify(weatherData.properties.generatedAt);
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
	testString.appendChild(str);

	//location refresh work 
	refresh.onclick = async function namedFunc() {	
		console.log('test1');
		try{
			/*
			//let myNewPromise = await navigator.geolocation.getCurrentPosition(callback);
			console.log('trying for message');
			let myNewPromise = await new Promise((resolve,reject)=> navigator.geolocation.getCurrentPosition(resolve,reject));
			console.log('hello ',myNewPromise);
			*/
			//try again
			let myNewPromise = await new Promise((resolve,reject) => {navigator.geolocation.getCurrentPosition(
				(position) => {
						console.log('success');
						resolve(position);
				},
				(error) => {
						console.error('error: ', error);
						reject(error);
				}
			);});
		}catch (error) { console.log('unable to find location'); console.log(error);}

	}
	//tooltip popup
	refresh.addEventListener('mouseover', function() {tooltip.classList.add('show');});
	refresh.addEventListener('mouseout', function() {tooltip.classList.remove('show');});
		
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

async function weather()
{
	///these consts are temporary
	const cords = "38.8977,-77.0365"
	const apiStr= "https://api.weather.gov/points/";

	//process needed to build forcast from cords 
	/*
	 * weather API can't get a forcast from cords but can return the closest weather station. 
	 * individual weather staions provide a forcast 
	 * so first I need to grab the weather station then grab the forcast (or alrady know which weather station I want)
	 */
	let stationParent = await fetch(apiStr+cords);
	let station = await (stationParent.json())
	let stationURL= await station.properties.forecast
	let forecast = await fetch(stationURL);
	let weatherData = await forecast.json();
	console.log(weatherData);
	return weatherData;

}

async function local()
{
	const cords = "38.8977,-77.0365"
	const apiStr= "https://api.weather.gov/points/";
	
	let apiResult = await fetch(apiStr+cords);
	let jsonGetter = await apiResult.json();
	console.log(jsonGetter);
	console.log(jsonGetter.properties.relativeLocation.properties.city)
	console.log(jsonGetter.properties.relativeLocation.properties.state);
	console.log(jsonGetter.properties.relativeLocation.properties);	
	return      jsonGetter.properties.relativeLocation.properties;

}

main();


