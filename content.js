// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'clickReviewLink') {
        clickReviewLink();
    } else if (request.message === 'handlePagination') {
        handlePagination();
    }
});

function clickReviewLink() {
    let reviewLink = document.querySelector('a[data-hook="see-all-reviews-link-foot"]');
    if (reviewLink) {
        reviewLink.click();
    } else {
        console.error('Review link not found.');
    }
}

function handlePagination() {
    extractReviews();

    let nextPageLink = document.querySelector('ul.a-pagination .a-last a');
    if (nextPageLink) {
        nextPageLink.click();

        chrome.runtime.sendMessage({ message: 'paginationClicked' }, (response) => {
            if (response && response.success) {
                console.log('Next page clicked, waiting for it to load...');
            }
        });
    } else {
        console.log('No more pages.');
    }
}

function extractReviews() {
    let reviews = document.querySelectorAll('.review-text-content');
    let reviewDetails = [];

    reviews.forEach((review, index) => {
        reviewDetails.push(`Review ${index + 1}: ${review.innerText}`);
    });

    if (reviewDetails.length > 0) {
        console.log('Reviews on this page:', reviewDetails.join('\n\n'));
    } else {
        console.log('No reviews found on this page.');
    }

    // Optionally, send the extracted reviews back to the background script
    chrome.runtime.sendMessage({ message: 'reviewsExtracted', data: reviewDetails });
}
