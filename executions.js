	//	fetch(url,{method:"get"});
		fetch("https://api.weather.gov/alerts/active").then((response) => response.json()).then((json) => console.log(json));

