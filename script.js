
async function main()
{
	//debug button
	document.getElementById('debug').addEventListener("click",function(){console.log('goto Debug');window.location.href='debug.html';});
	
	//get forcast.
	//add to index.html
	let testString = document.getElementById('debugscript');
	let str = document.createElement('span');
	str.textContent = 'fooBar';
	testString.appendChild(str);



}

main();


