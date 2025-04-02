document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("openTabs").addEventListener("click", function () {
        let groups = {};
        const textarea = document.getElementsByTagName('textarea')[0];

        if (!textarea.value.trim()) {
            alert("Por favor, ingrese un texto válido en el textarea.");
            return;
        }

        // Procesar el texto en grupos
        const tabs = textarea.value
            .split('###')
            .map(s => s.trim())
            .filter(s => s !== "");

        tabs.forEach((tab) => {
            const nameMatch = tab.match(/[A-Z]+(\s[A-Z]+)*/);
            const colorMatch = tab.match(/\(\w+\)/);
            const urlMatch = tab.split(/\(\w+\)/)[1]?.trim(); // Eliminar color y obtener URL

            if (nameMatch && colorMatch && urlMatch) {
                const groupName = nameMatch[0];
                const color = colorMatch[0].replace(/\(|\)/g, ''); // Remover paréntesis
                const url = urlMatch;

                // Si el grupo no existe, crearlo
                if (!groups[groupName]) {
                    groups[groupName] = { color, urls: [] };
                }

                // Agregar URL al grupo
                groups[groupName].urls.push(url);
            }
        });

        // Mostrar grupos en la lista UL
        const ul = document.querySelector('ul');
        ul.innerHTML = '';

        Object.entries(groups).forEach(([groupName, data]) => {
            const li = document.createElement('li');
            const strong = document.createElement('strong');
            const subul = document.createElement('ul');
            strong.innerText = `${groupName} (${data.color})`;
            li.appendChild(strong);

            data.urls.forEach((url) => {
                let nuevos = url.split("- [");
                nuevos.shift();

                nuevos.forEach((link) => {
                    let links = link.split("](");
                    if (links.length === 2) {
                        let cleanUrl = links[1].replace(")", ""); // Eliminar paréntesis final

                        const subli = document.createElement('li');
                        const suba = document.createElement('a');
                        suba.href = cleanUrl;
                        suba.innerText = links[0];
                        subli.appendChild(suba);
                        subul.appendChild(subli);
                    }
                });
            });
            li.appendChild(subul);
            ul.appendChild(li);
        });

        // Abrir pestañas agrupadas
        Object.entries(groups).forEach(([groupName, data]) => {
            let tabIds = []; // Guardar IDs de pestañas para agruparlas
            
            data.urls.forEach((url, index) => {
                let nuevos = url.split("- [");
                nuevos.shift();
                
                nuevos.forEach((link) => {
                    let links = link.split("](");
                    if (links.length === 2) {
                        let cleanUrl = links[1].replace(")", "");
                        
                        chrome.tabs.create({ url: cleanUrl, active: index === 0 }, (tab) => {
                            tabIds.push(tab.id);
                            
                            // Si ya se crearon todas las pestañas, agruparlas
                            if (tabIds.length === data.urls.length) {
                                chrome.tabs.group({ tabIds }, (groupId) => {
                                    chrome.tabGroups.update(groupId, {
                                        collapsed: true,
                                        title: groupName,
                                        color: data.color.toLowerCase()
                                    });
                                });
                            }
                        });
                    }
                });
            });
        });
    });
});