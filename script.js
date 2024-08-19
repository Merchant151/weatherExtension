
async function main()
{
	//debug button
	document.getElementById('debug').addEventListener("click",function(){console.log('goto Debug');window.location.href='debug.html';});
	
	//get forcast.
	//add to index.html
	let testString = document.getElementById('debugscript');
	let str = document.createElement('span');
	let weatherData = await weather();
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
	grabOne.textContent = temp+"°";
	testString.appendChild(str);



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

main();


