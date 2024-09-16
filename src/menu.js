const MenuPage = (() => {
    const menuContainer = document.createElement('div');
    menuContainer.id = "menu-container";

    const itemTitles = [
        "ChocoHazel", 
        "Sex in a Pan", 
        "Caramel Topped Icecream", 
        "Layered Chocolate Pudding", 
        "Fruit Tart", 
        "Vegan Lemon Cheesecake",
    ];
    const itemDescs = [
        "Chocolate Hazelnut Dessert in a Glass",
        "One of the best desserts you'll ever have.",
        "This ice cream cake is the perfect frozen dessert with fudge, caramel and salty pretzels!",
        "Sweet cookie crust that's layered with smooth whipped cream cheese and chocolaty pudding.",
        "Try out our fruity delight that'll bring back memories to your last island adventure.",
        "This no-bake lemon curd layered dessert is perfect for the vegans out there.",
    ];
    const itemImages = [
        "https://prettysweetblog.com/wp-content/uploads/2021/01/No-bake-chocolate-hazelnut-dessert-in-a-glass-4.jpg",
        "https://www.jocooks.com/wp-content/uploads/2018/11/sex-in-a-pan-1-28.jpg",
        "https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipesmedia/recipes/retail/x17/2003/feb/17244-caramel-topped-ice-cream-dessert-600x600.jpg?ext=.jpg",
        "https://thebakermama.com/wp-content/uploads/2013/07/IMG_7198-scaled.jpg",
        "https://www.bhg.com/thmb/9PccF_menBy-F4VsJEsWFMqS19c=/1244x0/filters:no_upscale():strip_icc()/fresh-fruit-cream-tarts-R162003-1106f8279f804aa9bb72832aa0d8c135.jpg",
        "https://biancazapatka.com/wp-content/uploads/2022/04/zitronen-pudding-dessert-720x1008.jpg",
    ]

    for (let i = 0; i < itemTitles.length; i++) {
        let menuItem = document.createElement('div');
        menuItem.classList.add("menu-item");
        menuContainer.appendChild(menuItem);

        let itemImg = document.createElement('img');
        itemImg.classList.add("item-img");
        menuItem.appendChild(itemImg);

        let itemInfoContainer = document.createElement('div');
        itemInfoContainer.classList.add("item-info-container");

        let itemTitle = document.createElement('h2');
        itemTitle.classList.add("item-title");
        
        let itemDesc = document.createElement('span');
        itemDesc.classList.add("item-desc");

        let orderItemBtn = document.createElement('button');
        orderItemBtn.classList.add("order-item-btn");
        menuItem.appendChild(itemInfoContainer);
        
        itemInfoContainer.appendChild(itemTitle);
        itemInfoContainer.appendChild(itemDesc);
        itemInfoContainer.appendChild(orderItemBtn);
        
        itemImg.src = itemImages[i];
        itemTitle.textContent = itemTitles[i];
        itemDesc.textContent = itemDescs[i];
        orderItemBtn.textContent = "Order Now";
    }
    
    
    return { menuContainer };
})();

const { menuContainer } = MenuPage;
export { menuContainer };