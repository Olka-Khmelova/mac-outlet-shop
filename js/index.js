class Item {
    constructor(item){
        Object.assign(this, item);
        this.like = false;
        this.orders = Math.round(Math.random() * 1200);
    }
    get isAvailableForBuy(){
        return this.orderInfo.inStock > 0;
    }
    toggleLike(){
        return this.like = !this.like;
    }
}

class ItemsExample {
    constructor() {
        // item-example list 
        this.items = items.map(item => new Item(item));
    }

    // search by name
    findManyByName(name) {
        const nameAsLowerCase = name.toLowerCase();
        return this.items.filter(item => item.name.toLowerCase().includes(nameAsLowerCase));
    }
}

class RenderCards {
    constructor(ItemsExample){
         this.cardsContainer = document.querySelector('.gallery-row'); // cards-container
         this.renderCards(ItemsExample.items); // Auto render cards 
    }
static renderCard(item) {
    const cardElement = document.createElement('div');
    cardElement.className = 'product-card column';
    cardElement.innerHTML = `
            <button class="liked-btn">

            </button>
                <div class="product-card-body">
                <img src="./img/${item.imgUrl}" alt="" class="product-card-image">
                <h2 class="product-title">${item.name}</h2>
                <p class="left-in-stock">${item.orderInfo.inStock} left in stock</p>
                <p class="price">Price: ${item.price} $</p>
                <button type="button" class="order-button">Add to cart</button>
            </div>
                <div class="footer-product-card">
                    <ul class="product-card-list list">
                        <li class="list-item-inline">
                        <svg class=" footer-heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                            <div>
                            <p ><span class="accent">${item.orderInfo.reviews}%</span> Positive reviews </p>
                            <p >Above avarage</p>
                            </div>
                        </li>
                        <li><p><span class="accent">${item.orders}</span></p>
                            <p>orders</p></li>
                    </ul>
        </div>`

    const likeBtn = cardElement.querySelector('.liked-btn');
    
    if(item.like) {
        likeBtn.classList.add('active');
    }
    
    likeBtn.onclick = () => {
        item.toggleLike();
        likeBtn.classList.toggle('active');
    }

    const cardBtn = cardElement.querySelector('.order-button');
    cardBtn.disabled = !item.isAvailableForBuy;

    return cardElement;

    }

    renderCards(items) {
        // Clear container
        this.cardsContainer.innerHTML = '';
        
        // Cereate elements with cards based on items list
        const elements = items.map(item => RenderCards.renderCard(item));
        
        // show cards 
        this.cardsContainer.append(...elements);
        }
 }

 
const itemsExample = new ItemsExample();
const renderCards = new RenderCards(itemsExample);


const inputName = document.querySelector("#nameSearch");
inputName.oninput = (event) => {
    const searchItems = itemsExample.findManyByName(event.target.value);
    renderCards.renderCards(searchItems);
}

let acc = document.getElementsByClassName("accordion-btn");

for (let i = 0; i < acc.length; i++) {
    
  acc[i].addEventListener("click", function() {
    let addcordionPanel= this.nextElementSibling;
    if (addcordionPanel.style.display === "flex") {
        addcordionPanel.style.display = "none";
    }else {
        addcordionPanel.style.display = "flex";
    }
  });
}