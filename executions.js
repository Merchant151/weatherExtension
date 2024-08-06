	//	fetch(url,{method:"get"});
		fetch("https://api.weather.gov/alerts/active").then((response) => response.json()).then((json) => console.log(json));
	//Forcast 
		fetch("https://api.weather.gov/points/38.8977,-77.0365").then((response) => response.json()).then((json) => console.log(json)); 
