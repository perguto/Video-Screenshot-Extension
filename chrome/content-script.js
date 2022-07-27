// ==UserScript==
// @name         Video Screenshot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        */*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

//let thumbnailContainer = document.createElement("p");
//video.appendChild(thumbnailContainer);
function generateScreenshot() {
console.log("GENERATING SCREENSHOT");
	let video = document.querySelector("video");
	let canvas = document.createElement("canvas");
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
	  document.body.removeChild(a);
	  URL.revokeObjectURL(url);
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
document.addEventListener("keydown", (e) => {
  if (e.code == "KeyS" && e.ctrlKey && e.altKey) {
    console.log(e);
    generateScreenshot();
  }
});




chrome.runtime.onMessage.addListener((msg,sender,sendResponse) => {
	console.log('got message');
	generateScreenshot();
})
