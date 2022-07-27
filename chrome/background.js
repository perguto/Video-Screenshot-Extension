console.log("BACKGROUND\nSCRIPT\nSTARTING")
	let tabid;

let acivate_content_script = message => {
	console.log(`sending "${message}" to content-script`);
	chrome.tabs.query({active:true,lastFocusedWindow:true},x=>{console.log(...x);tabid=x[0].id;
		console.log(tabid);
		chrome.tabs.sendMessage(tabid, {text:message})
	})
}


chrome.commands.onCommand.addListener(command => {
	console.log(`COMMAND "${command}" triggered.`);
	acivate_content_script("screenshot")
//	chrome.tabs.query({active:true,lastFocusedWindow:true},x=>{console.log(...x);tabid=x[0].id;
//		console.log(tabid);
//		chrome.tabs.sendMessage(tabid, {text:'screenshot'})
//	});
	//chrome.tabs.query({},x=>console.log(...x));
	//fullScreenshot();
})

chrome.action.onClicked.addListener(tab => {
	console.log(tab);
	acivate_content_script("action")
    // Send a message to the active tab
//    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//      var activeTab = tabs[0];
//		chrome.tabs.sendMessage(tabid, {text:'action'})
//    });
  });


