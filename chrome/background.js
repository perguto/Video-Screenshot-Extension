console.log("BACKGROUND\nSCRIPT\nSTARTING")
	let tabid;


chrome.commands.onCommand.addListener(command => {
	console.log(`COMMAND "${command}" triggered.`);
	chrome.tabs.query({active:true,lastFocusedWindow:true},x=>{console.log(...x);tabid=x[0].id;
		console.log(tabid);
		chrome.tabs.sendMessage(tabid, {text:'screenshot'})
	});
	//chrome.tabs.query({},x=>console.log(...x));
	//fullScreenshot();
})
