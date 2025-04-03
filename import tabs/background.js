chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "log") {
        console.log("Recibido desde la ventana emergente:", message.tabIds, message.array);
    }
});
