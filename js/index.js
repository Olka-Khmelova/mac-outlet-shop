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
                <a href="" class="product-link link">
                    <div class="product-card-body">
                    <img src="./img/${items[idx].imgUrl}" alt="" class="product-card-image">
                    <h2 class="product-title">${items[idx].name}</h2>
                    <p class="left-in-stock">${items[idx].orderInfo.inStock} left in stock</p>
                    <p class="price">Price: ${items[idx].price} $</p>
                    <button type="button" class="hero-button">Add to cart</button>
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
                </a>
            </div>`
            counter++;
            idx = randomNumber(items.length)
        }

    galleryHTML =  galleryHTML + `</div>`;
    cardsElement.innerHTML = galleryHTML;
}
showCards(items);