var previousMessage = "";
var defaultTitle = "Google Hangouts";

function notifyTitleChangeExtension(title) {
	console.log("Sending message: " + title);
	//if (title != defaultTitle && title != previousMessage) {
	if (title != defaultTitle) {
		previousMessage = title;
		browser.runtime.sendMessage({"text": title});
	} else
		console.log("Mensaje ya enviado previamente, no se muestra");
}

var target = document.querySelector('head > title');
var observer = new MutationObserver(
	function(mutations) {
		console.log("Mutation detected:");
		mutations.forEach(
			function(mutation) {
				console.log("Sending mutation:" + document.title);
				notifyTitleChangeExtension(document.title);
			}
		);
	}
);

observer.observe(target, {
	subtree: true,
	characterData: true,
	childList: true
});

var oldContainer = document.getElementById('hangouts-notify-container');
if (oldContainer != undefined)
	oldContainer.remove();

var body = document.querySelector('body');
var imageAlert = document.createElement('img');
imageAlert.src = browser.extension.getURL("icons/alert.svg");
imageAlert.style = "width: 25px; height:25px;";

var container = document.createElement("div");
container.id = "hangouts-notify-container";
container.appendChild(imageAlert);
container.style = "z-index: 1500;position:fixed;top:18px;right:110px;";
body.prepend(container);

var popup = document.createElement("div");
popup.style = 'display:none;';
popup.innerHTML =
'<div class="container" style="position:fixed;right:110px;background-color:rgb(255,255,255);border-radius:3px;padding:11px;">' +
	'<h1 style="margin:0 0 7px 0;font-size:23px;font-weight:normal;">Hangouts Notify</h1>' +
	'<p style="margin:6px 0;font-size:14px;font-weight:lighter;">Desktop notifications for Hangouts</p>' +
	'<p style="margin:6px 0;font-size:9px;font-weight:lighter;">I am not a Google application</p>' +
'</div>';

container.appendChild(popup);
imageAlert.onclick = function() { if (popup.style.length != 0) popup.style = ""; else popup.style = "display:none;"; }
