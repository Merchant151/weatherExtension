
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

	//location work
	let locally = await local();
	let city = locally.city;
	let state= locally.state;
	let docLocal = document.getElementById('local');
	docLocal.textContent = city+', '+state+' 09:35pm EDT'



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


