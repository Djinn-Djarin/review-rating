

// let browseNode = document.querySelector('div#wayfinding-breadcrumbs_feature_div ul.a-unordered-list.a-horizontal.a-size-small') ? Array.from(document.querySelectorAll('div#wayfinding-breadcrumbs_feature_div ul.a-unordered-list.a-horizontal.a-size-small li')).map(li => li.textContent.trim()).join('') : null;
// //title
// let title = document.getElementById("productTitle").textContent;
// //AllImages
// const images = document.querySelectorAll('#altImages img');
// const imageUrls = [];
// images.forEach(img => {
//     imageUrls.push(img.src);
// });

// // MainImage
// let image = (() => { try { let ulElement = document.querySelector("ul.a-unordered-list.a-nostyle.a-button-list.a-vertical.a-spacing-top-micro.gridAltImageViewLayoutIn1x7") || document.querySelector("ul.a-unordered-list.a-nostyle.a-button-list.a-vertical.a-spacing-top-extra-large.regularAltImageViewLayout"); return ulElement ? Array.from(ulElement.querySelectorAll('img')).map(img => img.src).find(src => src.endsWith('.jpg'))?.replace("SS100", "SS1000") : null; } catch (e) { console.error("An error occurred:", e); return null; } })();
// // Rating
// let rating = document.querySelector('span#acrCustomerReviewText') ? document.querySelector('span#acrCustomerReviewText').textContent : "Not Available";
// // Review
// let reviews = document.querySelector('span#acrPopover') ? document.querySelector('span#acrPopover').getAttribute('title')?.split()[0] || "Not Available" : "Not Available";
// // storefrontLink
// let storefrontLink = document.querySelector('a#bylineInfo') ? `http://amazon.in${document.querySelector('a#bylineInfo').getAttribute('href')} ` : '';
// //Generic Name
// let genericName = Array.from(document.querySelectorAll('table#productDetails_detailBullets_sections1 tr')).find(row => row.querySelector('th.a-color-secondary.a-size-base.prodDetSectionEntry')?.textContent.trim() === 'Generic Name')?.querySelector('td.a-size-base.prodDetAttrValue')?.textContent.trim() || null;
// //Variation
// let variations = document.querySelector('#variation_color_name, #variation_size_name, #variation_pattern_name, #variation_style_name') ? 'Available' : 'NA';
// // Deal
// let deal = document.querySelector('span.dealBadgeTextColor') && document.querySelector('span.dealBadgeTextColor').textContent.includes('Limited time deal') ? 'Available' : 'NA';
// //Sold By
// let soldBy = document.querySelector('div.tabular-buybox-text[tabular-attribute-name="Sold by"] span.a-size-small.tabular-buybox-text-message a') ? document.querySelector('div.tabular-buybox-text[tabular-attribute-name="Sold by"] span.a-size-small.tabular-buybox-text-message a').textContent.trim() : null;
// console.log(soldBy);
// // Bullet Points
// let bulletPointCount = (() => { let element = document.querySelector("div#feature-bullets ul.a-unordered-list.a-vertical.a-spacing-mini"); return element ? element.querySelectorAll('li').length : 0; })();
// console.log(bulletPointCount, "bulletPointCount");
// //Best Seller Rank
// let [bsr1, bsr2] = (() => { let table = document.querySelector('table#productDetails_detailBullets_sections1'), bestSellersTd = table ? Array.from(table.querySelectorAll('th')).find(th => th.textContent.trim() === 'Best Sellers Rank')?.nextElementSibling : null; if (bestSellersTd) { let ranks = Array.from(bestSellersTd.querySelectorAll('span')).map(span => span.textContent.trim()).join(' ').split('#').slice(1, 3); return ranks.length < 2 ? ranks.concat("Not Available".repeat(2 - ranks.length).split(" ")) : ranks; } else { return ["Not Available", "Not Available"]; } })();
// console.log([bsr1, bsr2], "[bsr1, bsr2]");
// //productDescription
// let productDescription = document.querySelector('#productDescription') ? document.querySelector('#productDescription') : null
// let Description = ''
// if (productDescription) {
//     Description = productDescription.querySelector('span')?.textContent ? productDescription.querySelector('span').textContent : null
// }
// else {
//     Description = 'Not Available'
// }
// // Price
// let aplusdata = document.querySelectorAll('#aplus');
// console.log(aplusdata);
// let Aplus;
// if (aplusdata) {
//     Aplus = 'Available';
//     Array.from(aplusdata).map((item) => {
//         console.log(item);
//     })
// }
// else {
//     Aplus = 'NA';
// }
// let price = document.querySelector("span.a-price-whole") ? document.querySelector("span.a-price-whole").textContent.trim() : null;
// //MRP
// let mrp = document.querySelector('span.a-price.a-text-price span.a-offscreen') ? document.querySelector('span.a-price.a-text-price span.a-offscreen').textContent : '';
// //Brand Name
// let brand = document.querySelector('div#brandSnapshot_feature_div span.a-size-medium.a-text-bold') ? document.querySelector('div#brandSnapshot_feature_div span.a-size-medium.a-text-bold').textContent.trim() : null;
// // Availability
// let availability = document.querySelector("div#availability") ? document.querySelector("div#availability").innerText.split("\n").map(line => line.trim()).filter(line => line).join(" ") : null;
// // VideoAvailability
// let videoAvailability = document.querySelector('li.videoThumbnail img') ? 'Available' : 'Not Available';

// let send_obj

// send_obj = {
//     Aplus, browseNode, title, imageUrls, image, rating, reviews, variations, deal, soldBy, bulletPointCount, Description, price, mrp, videoAvailability
// }
// console.log(send_obj)
// chrome.runtime.sendMessage({ action: 'send_data', userText: send_obj });