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
                    func: FirstClick
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.error("Error injecting script:", chrome.runtime.lastError.message);
                        return;
                    }
                    handlePagination(newTab.id);
                });
            });
        }, 5000 * index);
    });
});

function FirstClick() {
    document.querySelector('a[data-hook="see-all-reviews-link-foot"]').click();
}

function handlePagination(tabId) {
    function extractReviews() {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => {
                console.log("hyy from Handlepagination ", tabId)
                let reviews = document.querySelectorAll('.review-text-content');
                let reviewDetails = [];
                if (reviews.length > 0) {
                    reviews.forEach((review, index) => {
                        reviewDetails.push(`Review ${index + 1}: ${review.innerText}`);
                    });
                    console.log('Reviews on this page:', reviewDetails.join('\n\n'));
                } else {
                    console.log('No reviews found on this page.');
                }
                return reviewDetails; // Return the number of reviews found
            }
        }, (results) => {
            if (results && results[0] && results[0].result !== undefined) {
                let newReviewsCount = results[0].result;
                console.log(`Number of Reviews Extracted on this page: ${newReviewsCount}`);
            }
        });
    }

    function clickNextPage() {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => {
                let nextPageLink = document.querySelector('ul.a-pagination .a-last a');
                if (nextPageLink) {
                    window.location.href = nextPageLink.href;
                } else {
                    console.log('No more pages.');
                }
            }
        });

        // Listen for tab updates to continue pagination
        chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
            if (changeInfo.status === 'complete' && updatedTabId === tabId) {
                chrome.tabs.onUpdated.removeListener(listener);
                setTimeout(() => {
                    extractReviews();
                    clickNextPage(); // Call clickNextPage again to continue pagination
                }, 3000); // Adjust delay if needed
            }
        });
    }

    extractReviews();
    clickNextPage();
}

