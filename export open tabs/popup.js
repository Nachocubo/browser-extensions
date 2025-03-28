document.addEventListener("DOMContentLoaded", () => {
    const groupsDiv = document.getElementById("groups");
    const exportBtn = document.getElementById("exportBtn");

    chrome.runtime.sendMessage({ action: "getTabGroups" }, (groups) => {
        console.log(groups);
        if (!groups.length) {
            groupsDiv.innerHTML = "<p>No hay grupos de pestañas.</p>";
            return;
        }

        groups.forEach(group => {
            let groupEl = document.createElement("div");
            groupEl.classList.add("group");
            groupEl.innerHTML = `<h3 style="color: ${group.color};">${group.title}</h3><ul></ul>`;

            let list = groupEl.querySelector("ul");
            group.tabs.forEach(tab => {
                let li = document.createElement("li");
                li.innerHTML = `<a href="${tab.url}" target="_blank">${tab.title}</a>`;
                list.appendChild(li);
            });

            groupsDiv.appendChild(groupEl);
        });
    });

    exportBtn.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "getTabGroups" }, (groups) => {
            let text = groups.map(group =>
                `### ${group.title} (${group.color})\n` +
                group.tabs.map(tab => `- [${tab.title}](${tab.url})`).join("\n")
            ).join("\n\n");

            navigator.clipboard.writeText(text).then(() => {
                alert("Grupos copiados al portapapeles");
            });
        });
    });
});
