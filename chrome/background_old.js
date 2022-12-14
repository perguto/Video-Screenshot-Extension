let fullScreenshot = () => {
	console.log("this=")
	console.log(this);
	console.log("FULL Screenshot LOADING");

	let video = document.querySelector("video");
	let canvas = document.createElement("canvas");
	//let thumbnailContainer = document.createElement("p");
	//video.appendChild(thumbnailContainer);
	function generateThumbnail(video, canvas) {
		//generate thumbnail URL data
		canvas.height = video.videoHeight;
		canvas.width = video.videoWidth;
		let context = canvas.getContext("2d");
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		//let dataURL = canvas.toDataURL();
		canvas.toBlob((blob) => {
			const newImg = document.createElement("img");
			const url = URL.createObjectURL(blob);
			//				newImg.onload = () => {
			//						URL.revokeObjectURL(url);
			//				}
			//				newImg.src=url;
			let a = document.createElement("a");
			a.href = url;
			a.download = document.title + " at " + video.currentTime + " seconds.png";
			document.body.appendChild(a);
			a.click();
		});
		//create img
		//let img = document.createElement("img");
		//img.setAttribute("src", dataURL);

		//let a = document.createElement("a");
		////a.href = dataURL;
		//a.download = document.title + " at " + video.currentTime + " seconds.png";
		//document.body.appendChild(a);
		//a.click();
		//append img in container div
		//video.appendChild(img);
	}
	console.log("Video Screenshot READY");
	generateThumbnail(video, canvas);

}
console.log("BACKGROUND\nSCRIPT\nSTARTING")
chrome.runtime.onMessage.addListener((tab) => {
	console.log("IN LISTENER")
	chrome.scripting.executeScript({
		target: {tabId:tab.id},
		function: fullScreenshot()
	})
})


chrome.commands.onCommand.addListener(command => {
	console.log(`COMMAND "${command}" triggered.`);
	fullScreenshot();
})
