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
    checkIsNameIncludes(name) {
        const nameAsLowerCase = name.toLowerCase();
        return this.name.toLowerCase().includes(nameAsLowerCase);
    }

    checkIsColorIncludes(colors) {
        if(!colors.length) return true;

        for(const color of colors) {
            const isExists = this.color.includes(color);
            if(isExists) {
                return true;
            }
        }
        return false;
    }

    checkIsStorageIncludes(storages) {
        if(!storages.length) return true;

        for(const storage of storages) {
            if(this.storage === storage){
                return true;
            }
        }
        return false;
    }

    checkIsOSIncludes(osARR) {
        if(!osARR.length) return true;

        for(const os of osARR) {
            if(this.os === os){
                return true;
            }
        }
        return false;
    }

    checkIsDisplayIncludes(displays) {
        if (!displays.length) return true;
    
        for (const display of displays) {
            if(display === '2 - 5 inch' && this.display < 5) {
                return true;
            }
            if(display === '5 - 7 inch' && this.display >= 5 && this.display < 7) {
                return true;
            }
            if(display === '7 - 12 inch' && this.display >= 7 && this.display < 12) {
                return true;
            }
            if(display === '12 - 16 inch' && this.display >= 12 && this.display < 16) {
                return true;
            }
            if(display === '+16 inch' && this.display > 16) {
                return true;
            }
        return false;
        }
    }

    checkIsPriceRangeIncludes(minPrice, maxPrice) {
        return this.price <= maxPrice && this.price >= minPrice;
    }
}

class ItemsExample {
    constructor() {
        // item-example list 
        this.items = items.map(item => new Item(item));
    }
    
    get minPrice(){
        return this.items.reduce((acc, item) => acc.price < item.price ? acc : item).price
    }

    get maxPrice(){
        return this.items.reduce((acc, item) => acc.price > item.price ? acc : item).price

    }
    get availableColors() {
        return this.items
        .reduce((acc, item) => [...acc, ...item.color], [])
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .sort((a, b) => {return a - b});
    }

    get availableStorage() {
        return this.items
            .map(item => item.storage)
            .filter((item, index, arr) => arr.indexOf(Math.floor(item)) === index && item !== null)
            .sort((a, b) => {return a - b});
    }

    get availableOS() {
        return this.items
            .map(item => item.os)
            .filter((item, index, arr) => arr.indexOf(item) === index && item !== null)
            .sort((a, b) => {return a - b});
    }
    get availableDisplay() {
        let result = ['2 - 5 inch', '5 - 7 inch', '7 - 12 inch', '12 - 16 inch', '+16 inch'];
        return result.filter((item, index, arr) => arr.indexOf(item) === index);
    }

    filterItems(filter = {}) {
        const {
            name = '',
            color = [],
            memory = [],
            os = [],
            display = [],
            minPrice = this.minPrice,
            maxPrice = this.maxPrice
        } = filter;

        return this.items.filter(item => {

            // Check on substring includes in string
            const isNameIncluded = item.checkIsNameIncludes(name);
            if(!isNameIncluded) return false;

            const isColorIncluded = item.checkIsColorIncludes(color);
            if(!isColorIncluded) return false;

            const isMemoryIncluded = item.checkIsStorageIncludes(memory);
            if(!isMemoryIncluded) return false;

            const isOsIncluded = item.checkIsOSIncludes(os);
            if(!isOsIncluded) return false;

            const isDisplayIncluded = item.checkIsDisplayIncludes(display);
            if(!isDisplayIncluded) return false;

            const isPriceRangeIncludes = item.checkIsPriceRangeIncludes(minPrice, maxPrice);
            if(!isPriceRangeIncludes) return false;

            return true;
        })
    }
}


class RenderCards {
    cart = null;
    constructor(ItemsExample, cart){
         this.cardsContainer = document.querySelector('.gallery-row'); // cards-container
         this.cart = cart;
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
                <button type="button" class="order-button ">Add to cart</button>
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
    const modalElement = document.querySelector('.modal-back');
    modalElement.onclick = () => {
        modalElement.classList.remove('modal-active');
    }
    cardElement.onclick = () => {
        let modalContainer = document.querySelector('.modal');
        modalContainer.innerHTML =`
    <img class="modal-img" src="./img/${item.imgUrl}" alt="${item.name}">
            <div class="modal-info">
                <h2 class="modal-info-title">${item.name}</h2>
                    <ul class="modal-card-list list">
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
                <ul class="info-props">
                    <li class="modal-props-item">Color: <span class="modal-accent">${item.color.join(', ')}</span> </li>
                    <li class="modal-props-item">Operating System:  <span class="modal-accent">${item.os}</span></li>
                    <li class="modal-props-item">Chip: <span class="modal-accent">${item.chip.name}</span> </li>
                    <li class="modal-props-item">Memory: <span class="modal-accent">${item.storage}  Gb</span> </li>
                    <li class="modal-props-item">Display: <span class="modal-accent">${item.display} inch</span> </li>
                    <li class="modal-props-item">Height: <span class="modal-accent">${item.size.height} cm</span> </li>
                    <li class="modal-props-item">Width: <span class="modal-accent">${item.size.width} cm </span> </li>
                    <li class="modal-props-item">Depth: <span class="modal-accent">${item.size.depth} cm</span> </li>
                    <li class="modal-props-item">Weight: <span class="modal-accent">${item.size.weight} g</span> </li>
                </ul>
            </div>
            <div class="price-block">
                <h1 class="price-block-title modal-price-item">$ ${item.price}</h1>
                <p class="modal-text modal-price-item">Stock: ${item.orderInfo.inStock} pcs.</p>
                <button type="button" class="modal-btn">Add to cart</button>
            </div>
            `;
        const modalBtn = modalContainer.querySelector(".modal-btn");
        modalBtn.disabled = !item.isAvailableForBuy;
        modalBtn.onclick = (e) => {
            e.stopPropagation();
            cart.addToCart(item);
            renderCart.renderCartItems(cart.items);

        }
        modalElement.classList.add("modal-active");
        return modalContainer;
    }
    const likeBtn = cardElement.querySelector('.liked-btn');
    
    if(item.like) {
        likeBtn.classList.add('active');
    }
    
    likeBtn.onclick = (e) => {
        item.toggleLike();
        likeBtn.classList.toggle('active');
        e.stopPropagation();
    }

    const cardBtn = cardElement.querySelector('.order-button');
    cardBtn.disabled = !item.isAvailableForBuy;
    cardBtn.onclick = (e) => {
        e.stopPropagation();
        cart.addToCart(item);
        renderCart.renderCartItems(cart.items);
    }

    return cardElement;
    }

    renderCards(items, sort) {
        // Clear container
        let itemsList = items;
        this.cardsContainer.innerHTML = '';
        // Cereate elements with cards based on items list
        if(sort === 'asc') {                    
            itemsList.sort((a,b) => {return a.price - b.price})
        } 
        if(sort === 'desc') {                    
            itemsList.sort((a,b) => {return b.price - a.price})
        }
        const elements = itemsList.map(item => RenderCards.renderCard.call(this, item));
        
        // show cards 
        this.cardsContainer.append(...elements);
        }
 }

 class Filter {
    #itemsExample = null;
    #renderCards = null;
    constructor(itemsExample, renderCards){
        this.#itemsExample = itemsExample;
        this.#renderCards = renderCards;
        this.name = '';
        this.sort = 'default';
        this.color = [];
        this.memory = [];
        this.os = [];
        this.display = [];
        this.minPrice = this.#itemsExample.minPrice;
        this.maxPrice = this.#itemsExample.maxPrice;
    }
    setFilter(key, value) {

        if(!Array.isArray(this[key])) {
        this[key] = value;
        this.#searchAndRender();
        return;
        }
        if(this[key].includes(value)) {
            this[key] = this[key].filter(val => val != value)
        } else {
            this[key].push(value);
        }
        this.#searchAndRender();
    }

    #searchAndRender() {
        const items = this.#itemsExample.filterItems({...this});
        this.#renderCards.renderCards(items, this.sort);
    }
 }
 
class RenderFilters {

    #filter = null;
    constructor(itemsExample, filter){
        this.#filter = filter;
        this.containerElem = document.querySelector(".accordion-menu")
        this.filterOptions = [
            {
                displayName: 'Color',
                name: 'color',
                options: itemsExample.availableColors,
            },
            {
                displayName: 'Memory',
                name: 'memory',
                options: itemsExample.availableStorage,
            },
            {
                displayName: 'OS',
                name: 'os',
                options: itemsExample.availableOS,
            },
            {
                displayName: 'Display',
                name: 'display',
                options: itemsExample.availableDisplay,
            },
        ]
        this.inputName = document.querySelector('#nameSearch');
        this.selectSort = document.querySelector('#multi-select');

        this.minPriceInput = document.getElementById('minPriceFilter');
        this.maxPriceInput = document.getElementById('maxPriceFilter');
        this.minPriceInput.value = this.#filter.minPrice;
        this.maxPriceInput.value = this.#filter.maxPrice;

        this.inputName.oninput = (event) => {

            const {value} = event.target;
            this.#filter.setFilter('name', value);
        }
        this.selectSort.onchange = (event) => {

            const {value} = event.target;
            this.#filter.setFilter('sort', value);
        }
        
        this.minPriceInput.oninput = debounce((event) => {
            const { value } = event.target;
            this.#filter.setFilter('minPrice', value);
        }, 500)

        this.maxPriceInput.oninput = debounce((event) => {
            const { value } = event.target;
            this.#filter.setFilter('maxPrice', value);
        }, 500)

        this.renderFilters(this.filterOptions);
    }
     renderFilter(optionsData){
        const filter = document.createElement('div');
        filter.className = 'accordion-container';
        filter.innerHTML = `<div class="accordion">
        <button class="accordion-btn">${optionsData.displayName}</button>
        <img class="modal-arrow-icon" src="./img/icons/arrow-down.svg" alt="modal icon">
        </div>`
        const filterList = document.createElement('ul');
        filterList.className='chackbox-panel';
        const filterOptionsElements = optionsData.options.map(option => {
            const filterInfo = document.createElement('li');
            filterInfo.className = 'checkbox-list';
            filterInfo.innerHTML = ` <label class="text-accordion" for="${option}">${option}</label>`

            const checkbox = document.createElement('input');
            checkbox.className = 'checkbox';
            checkbox.type = 'checkbox';
            checkbox.id = option;
    
            checkbox.onchange = () => {

              this.#filter.setFilter(optionsData.name, option);
            };
    
            filterInfo.appendChild(checkbox);
            return filterInfo;
          });

        filterList.append(...filterOptionsElements)
        filter.append(filterList);
        return filter;
    }
    renderFilters(){

        this.containerElem.innerHTML = '';
        const filterElements = this.filterOptions
        .map(optionData => this.renderFilter(optionData));
        this.containerElem.append(...filterElements);
        
    }
}

class Cart {
    constructor() {
      this.items = [];
    }
  
    addToCart(item) {
      const id = item.id;
      const itemInCart = this.items.find(goodItem => goodItem.id === id);
  
      if (itemInCart) {
        if (itemInCart.amount < 4) {
          itemInCart.amount++;
        }
        return itemInCart;
      }
      const addedItemToCart = {
        id,
        item,
        amount: 1,
      };
      return this.items.push(addedItemToCart);
    }
  
    get totalAmount() {
      return this.items.reduce((acc, goodItem) => {
        return acc + goodItem.amount;
      }, 0);
    }
  
    get totalPrice() {
      return this.items.reduce((acc, goodItem) => {
        return acc + goodItem.amount * goodItem.item.price;
      }, 0);
    }
  
    minusItem(item) {
      const id = item.id;
      const itemInCart = this.items.find(goodItem => goodItem.id === id);
      if (itemInCart.amount > 1) {
        itemInCart.amount--;
      }
  
      return cart.items;
    }
  
    removeItem(item){
        item.amount = 0;
        let result = this.items.filter(it => it.amount > 0);
        this.items = result;
    }
  }
  
  class RenderCart {
    constructor() {
      this.cartContainer = document.querySelector('.cart');
      this.renderCartItems(cart.items);
      this.showModalCart();
    }
  
    renderCartItem(item) {
      const cartBody = document.createElement('div');
      cartBody.className = 'cart-content';
      cartBody.innerHTML = `  
      <div class="cart-item">
            <img class="cart-item-image" src="./img/${item.item.imgUrl}" alt="${item.item.name}">
            <div>
            <p class="cart-text-item">
            ${item.item.name}
            </p>
            <span class="cart-text-accent">$ ${item.item.price}</span>
            </div>
            <div class="count-items">
                <button class="cart-product_decrease-btn"></button>
                <span class="item-count">${item.amount}</span>
                <button class="cart-product_add-btn"></button>
                <button class="cart-product_remove-btn"><div class="cart-product_remove-btn_sign">sign</div></button>
            </div>
        `;
        // total amount
        const totalAmount = document.querySelector('.total-amount');
        totalAmount.innerHTML = `${cart.totalAmount} ptc.`;

        // cart counter
        const cartCounter = document.querySelector('.cart-count');
                cartCounter.innerText = `${cart.totalAmount}`;
                
    
        // total price
        const totalPrice = document.querySelector('.total-price');
        totalPrice.innerHTML = `${cart.totalPrice}$`;

        // decrease
        const decreaseBtn = cartBody.querySelector('.cart-product_decrease-btn');
        decreaseBtn.addEventListener ('click', () => {
            cart.minusItem(item); 
            renderCart.renderCartItems(cart.items);
        });

        // add
        const addBtn = cartBody.querySelector('.cart-product_add-btn');
        addBtn.addEventListener ('click', () => {
            cart.addToCart(item); 
            renderCart.renderCartItems(cart.items);
        })

        // remove
        const removeBtn = cartBody.querySelector('.cart-product_remove-btn');
        removeBtn.addEventListener ('click', () => {
            cart. removeItem(item); 
            renderCart.renderCartItems(cart.items);
            totalAmount.innerHTML = `${cart.totalAmount} ptc.`;
            totalPrice.innerHTML = `${cart.totalPrice} $`;
            cartCounter.innerText = `${cart.totalAmount}`;
        })
            return cartBody;
    }
    renderCartItems(items) {
   
        this.cartContainer.innerHTML = ``;

        let goods = items.map(item => {
          return this.renderCartItem(item);
        });
        return this.cartContainer.append(...goods);
      }

      showModalCart() {
        const cartBtn = document.querySelector('.cart-btn');
        const cartWindow = document.querySelector('.cart-overlay');

        cartBtn.addEventListener('click', () => {
            cartWindow.classList.toggle('active');        
        })

    }
    
}

class Slider {
    constructor(ItemsExample) {
        this.containerSlider = document.querySelector('.hero');
        this.items = ItemsExample.items;
        this.bannersProducts = [
            {id: 29,
            name: 'Apple TV',
            banner: 'apple_tv_banner.png',}, 
            {id: 33,
            name: 'AirPods Max',
            banner: 'air_pods_max_banner.jpg'}, 
            {id: 32,
            name: 'AirPods Pro',
            banner: 'airpods_pro_banner.png'}, 
            {id: 34,
            name: 'IPad Air',
            banner: 'ipad_air_banner.jpg'}, 
            {id: 7,
            name: 'IMac',
            banner: 'mac_book_banner.jpg'}, 
            {id: 13,
            name: 'Apple Watch Series 6',
            banner: 'watch_banner.jpg'},
        ];
        this.renderSlider();

    }

    renderSlider(){       
        const delay = 4000;
        const items = this.items;
        const imgLinks = this.bannersProducts;
        let currentItem = function() {
           return imgLinks[Math.floor(Math.random() * imgLinks.length)];
        }
  
        const start = function() {
            const bannerItem = currentItem();
            const heroTitle = document.querySelector('.hero-title');
            const bannerBTN = document.querySelector('#bannerBTN');
            const container = document.querySelector('.hero-section');
            container.style.backgroundImage = `url("/img/banners/${bannerItem.banner}")`;
            heroTitle.innerText = `${bannerItem.name}`

            bannerBTN.onclick = (e) => {
                e.stopPropagation();
  
                const itemToAdd = items.find(goodItem => goodItem.id === bannerItem.id);
  
                cart.addToCart(itemToAdd);
                renderCart.renderCartItems(cart.items);
            }
        }

        start();

        setInterval(function() {
            start();
        }, delay);
    }
}

const itemsExample = new ItemsExample();
const cart = new Cart();
const renderCart = new RenderCart(cart);
const renderCards = new RenderCards(itemsExample, cart, renderCart);
const filter = new Filter(itemsExample, renderCards);
const renderFilters = new RenderFilters(itemsExample, filter);
const slider = new Slider(itemsExample);

    //filter for sorting by price always open by default
    let accPrice = document.getElementById("btn-price");
    let modalArrowPrice = document.querySelector(".modal-arrow-icon-price");
    accPrice.addEventListener("click", function() {
        let addcordionPrice=document.querySelector(".panel");
            if (addcordionPrice.style.display === "none") {
                addcordionPrice.style.display = "flex";
                modalArrowPrice.src = "./img/icons/arrow-rigth.svg";
            } else {
                addcordionPrice.style.display = "none";
                modalArrowPrice.src= "./img/icons/arrow-down.svg";
            }
    });
    
    //other filter-accordion's sections
    let acc = document.getElementsByClassName("accordion");
    let modalArrow = document.querySelectorAll(".modal-arrow-icon");
    
    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
            let addcordionPanel= this.nextElementSibling;
            if (addcordionPanel.style.display === "flex") {
                addcordionPanel.style.display = "none";
                modalArrow[i].src= "./img/icons/arrow-down.svg";
            }else {
                addcordionPanel.style.display = "flex";
                    modalArrow[i].src= "./img/icons/arrow-rigth.svg";
            }
      });
        }
    
    let priceFilter =document.querySelector("#price-filter");
    let dropdownPrice = document.querySelector(".select-price-sort-container");
    priceFilter.addEventListener("click", function() {
        if (dropdownPrice.style.display === "block") {
            dropdownPrice.style.display = "none";
        }else {
            dropdownPrice.style.display = "block";
        }
    });
    let dropdownItems = document.getElementsByClassName("dropdown-item");
    for (let i = 0; i < dropdownItems.length; i++) {
        dropdownItems[i].addEventListener("click", function() {

            dropdownItems[i].classList.toggle('active');
        })
    }