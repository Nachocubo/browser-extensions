chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTabGroups") {
        chrome.tabGroups.query({}, (groups) => {
            let groupData = [];
            
            let pendingRequests = groups.length;
            if (pendingRequests === 0) sendResponse(groupData);

            groups.forEach(group => {
                chrome.tabs.query({ groupId: group.id }, (tabs) => {
                    groupData.push({
                        title: group.title || "Sin nombre",
                        color: group.color,
                        tabs: tabs.map(tab => ({ title: tab.title, url: tab.url }))
                    });

                    pendingRequests--;
                    if (pendingRequests === 0) {
                        sendResponse(groupData);
                    }
                });
            });
        });

        return true; // Necesario para respuesta asíncrona
    }
});
