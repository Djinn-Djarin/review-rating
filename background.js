chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'paginationClicked') {
        console.log('Pagination button clicked, waiting for next page to load...');
        sendResponse({ success: true });
    } else if (request.message === 'reviewsExtracted') {
        console.log('Extracted reviews:', request.data);
    }
});

chrome.runtime.onMessage.addListener((request) => {
    let linkArray = [];

    if (request.message === 'urlData_textArea') {
        let asins = request.data;
        console.log("ASINs from textarea:", asins);
        asins.forEach((item) => {
            linkArray.push(`https://www.amazon.in/dp/${item}`);
        });
    }

    if (request.message === 'urlData_file') {
        let asins = request.excel;
        console.log("ASINs from file:", asins);
        asins.forEach((item) => {
            linkArray.push(`https://www.amazon.in/dp/${item}`);
        });
    }

    linkArray.forEach((url, index) => {
        setTimeout(() => {
            chrome.tabs.create({ url: url }, (newTab) => {
                if (chrome.runtime.lastError) {
                    console.error("Error creating tab:", chrome.runtime.lastError.message);
                    return;
                }
                chrome.scripting.executeScript({
                    target: { tabId: newTab.id },
                    files: ['content.js']
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.error("Error injecting content script:", chrome.runtime.lastError.message);
                        return;
                    }
                    // First, click the review link
                    chrome.tabs.sendMessage(newTab.id, { message: 'clickReviewLink' });

                    // After a delay, start pagination
                    setTimeout(() => {
                        chrome.tabs.sendMessage(newTab.id, { message: 'handlePagination' });
                    }, 5000);
                });
            });
        }, 5000 * index);
    });
});
