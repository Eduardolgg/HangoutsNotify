/*
 * Log that we received the message.
 * Then display a notification. The notification contains the URL,
 * which we read from the message.
 * */
function notify(message) {
	  console.log("background script received message");
	  //var title = browser.i18n.getMessage("notificationTitle");
	  //var content = browser.i18n.getMessage("notificationContent", message.text);
	  browser.notifications.create(message.text, {
		      "type": "basic",
		      "iconUrl": browser.extension.getURL("icons/icon-48.png"),
		      "title": "Hangouts",
		      //"message": message.text + content
		      "message": message.text
		    });
}

/*
 * Assign `notify()` as a listener to messages from the content script.
 * */
browser.runtime.onMessage.addListener(notify);
