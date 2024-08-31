// chrome.runtime.onMessage.addListener((request) => {
//     if (request.data && Array.isArray(request.data) && request.message ==="msg from popup") {
//         request.data.forEach(asin => {
//             // Create a new tab for each ASIN
//             chrome.tabs.create({ url: `https://www.amazon.in/dp/${asin}` }, (newTab) => {
//                 // Only add the listener for the tab's loading event once
//                 const listener = (tabId, info) => {
//                     if (tabId === newTab.id && info.status === 'complete') {
//                         // Start the extraction once the page has fully loaded
//                         chrome.tabs.sendMessage(newTab.id, { message: 'startExtraction' });
//                         chrome.tabs.onUpdated.removeListener(listener);
//                     }
//                 };
                
//                 chrome.tabs.onUpdated.addListener(listener);
//             });
//         });
//     }
// });

// chrome.runtime.onMessage.addListener((request, sender) => {
//     if (request.message === 'reviewsExtracted') {
//         console.log('Extracted data for one ASIN:', request.data);
        
//         // Optionally close the tab after extraction
//         chrome.tabs.remove(sender.tab.id);

//         // Here you can aggregate the extracted data, send it somewhere, or store it
//         // You could maintain an array to hold all extracted reviews if needed
//     }
// });



chrome.runtime.onMessage.addListener((request) => {
    if (request.data && Array.isArray(request.data) && request.message === "msg from popup") {
        request.data.forEach((asin, index) => {
            setTimeout(() => {
                // Create a new tab for each ASIN
                chrome.tabs.create({ url: `https://www.amazon.in/dp/${asin}` }, (newTab) => {
                    // Only add the listener for the tab's loading event once
                    const listener = (tabId, info) => {
                        if (tabId === newTab.id && info.status === 'complete') {
                            // Start the extraction once the page has fully loaded
                            chrome.tabs.sendMessage(newTab.id, { message: 'startExtraction' });
                            chrome.tabs.onUpdated.removeListener(listener);
                        }
                    };
                    
                    chrome.tabs.onUpdated.addListener(listener);
                });
            }, index * 2000); // Delay each tab launch by 2 seconds
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.message === 'reviewsExtracted') {
        console.log('Extracted data for one ASIN:', request.data);
        
        // Optionally close the tab after extraction
        chrome.tabs.remove(sender.tab.id);

        // Here you can aggregate the extracted data, send it somewhere, or store it
        // You could maintain an array to hold all extracted reviews if needed
    }
});
