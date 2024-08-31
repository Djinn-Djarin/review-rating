
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'startExtraction') {
        clickReviewLink();
    }
});

function clickReviewLink() {   

        // Observe for changes in the DOM to detect when the dropdown is loaded
        const observer = new MutationObserver((mutations, obs) => {
            let mostRecent = document.querySelector('select#cm-cr-sort-dropdown');
            
            if (mostRecent) {
                // Stop observing once the element is found
                obs.disconnect();

                // Simulate a user interaction with the dropdown
                mostRecent.value = 'recent'; // Ensure this value matches the correct option
                mostRecent.dispatchEvent(new Event('change', { bubbles: true }));

                // Wait for the reviews to update after selecting 'Most Recent'
                setTimeout(() => {
                    extractReviews();
                }, 2000); // Adjust delay as necessary for the page to update
            } else {
                console.error('Most recent option not found.');
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } 

function extractReviews() {
    let reviewsContainer = document.getElementById('cm-cr-dp-review-list');
    
    if (reviewsContainer) {
        let reviews = [];
        let reviewElements = reviewsContainer.querySelectorAll('.a-section.review.aok-relative');

        reviewElements.forEach(reviewElement => {
            let reviewText = reviewElement.querySelector('.review-text-content').innerText.trim();
            let reviewRating = reviewElement.querySelector('.review-rating .a-icon-alt').innerText.trim();
            reviews.push({ rating: reviewRating, text: reviewText });
        });

        console.log('Extracted Reviews:', reviews);

        chrome.runtime.sendMessage({ message: 'reviewsExtracted', data: reviews });
    } else {
        console.error('Reviews container not found.');
    }
}
