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
console.log('Video Screenshot LOADING')

let video=document.querySelector('video')
let thecanvas=document.createElement('canvas')
thecanvas.height=video.videoWidth
thecanvas.width=video.videoHeight
let thumbnailContainer=document.createElement('p')
video.appendChild(thumbnailContainer)
function generateThumbnail(width=1920,height=1080) {
    //generate thumbnail URL data
    var context = thecanvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);
    var dataURL = thecanvas.toDataURL();

    //create img
    let img = document.createElement('img');
    img.setAttribute('src', dataURL);

    let a=document.createElement('a')
    a.href=dataURL
	a.download=document.title+' at '+video.currentTime+' seconds.png'
    document.body.appendChild(a);
    a.click();
    //append img in container div
    video.appendChild(img);
}
console.log('Video Screenshot READY')
document.addEventListener('keydown',e=>{
if(e.code=="KeyS"&&e.ctrlKey&&e.altKey)
{console.log(e);generateThumbnail();}

})