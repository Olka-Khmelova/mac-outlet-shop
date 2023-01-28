function randomNumber(max) {
    return Math.floor(Math.random() * max);
}


function showCards (items) {
    let cardsElement = document.querySelector("#cards");
    let galleryHTML = `<div class="gallery-row">`;
    let counter = 0;
        let idx = randomNumber(items.length);
        while (counter<6){
            galleryHTML += `
            <div class="product-card column">
            <button class="liked-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
            </button>
                    <div class="product-card-body">
                    <img src="./img/${items[idx].imgUrl}" alt="" class="product-card-image">
                    <h2 class="product-title">${items[idx].name}</h2>
                    <p class="left-in-stock">${items[idx].orderInfo.inStock} left in stock</p>
                    <p class="price">Price: ${items[idx].price} $</p>
                    <button type="button" class="order-button">Add to cart</button>
                </div>
                    <div class="footer-product-card">
                        <ul class="product-card-list list">
                            <li class="list-item-inline">
                                <svg class=" footer-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                <div>
                                <p ><span class="accent">${items[idx].orderInfo.reviews}%</span> Positive reviews </p>
                                <p >Above avarage</p>
                                </div>
                            </li>
                            <li><p><span class="accent">${randomNumber(6000)}</span></p>
                                <p>orders</p></li>
                        </ul>
                    </div>
            </div>`
            counter++;
            idx = randomNumber(items.length)
        }

    galleryHTML =  galleryHTML + `</div>`;
    cardsElement.innerHTML = galleryHTML;
}
showCards(items);
