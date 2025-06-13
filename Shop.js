document.addEventListener('DOMContentLoaded', () => {
    const coinCountElement = document.getElementById('coin-count');
    const clickButton = document.getElementById('click-button');
    const itemContainer = document.getElementById('item-container');
    const debugArea = document.getElementById('debug'); //optional debug area

    let coins = 0;
    let clickValue = 1;  // How many coins per click
    let autoClickValue = 0; // coins per second from autoclickers
    let autoClickInterval; // interval to run autoclicker

    // Function to update the coin display
    function updateCoinDisplay() {
        coinCountElement.textContent = `Coins: ${coins}`;
    }

    // Function to handle coin click
    function coinClick() {
        coins += clickValue;
        updateCoinDisplay();
    }

    // Attach the coinClick function to the button
    clickButton.addEventListener('click', coinClick);


    // Item Data (Name, Cost, Effect, Type)
    const items = [
        { name: 'Rusty Pickaxe', cost: 10, effect: () => { clickValue += 1; }, description: "Increases click value by 1.", type: "click"},
        { name: 'Shiny Pickaxe', cost: 50, effect: () => { clickValue += 5; }, description: "Increases click value by 5.", type: "click"},
        { name: 'Steel Pickaxe', cost: 250, effect: () => { clickValue += 25; }, description: "Increases click value by 25.", type: "click"},
        { name: 'Diamond Pickaxe', cost: 1000, effect: () => { clickValue += 100; }, description: "Increases click value by 100.", type: "click"},
        { name: 'Super Pickaxe', cost: 5000, effect: () => { clickValue += 500; }, description: "Increases click value by 500.", type: "click"},
        { name: 'Auto Clicker 1', cost: 30, effect: () => { autoClickValue += 1; }, description: "Generates 1 coin per second.", type: "auto"},
        { name: 'Auto Clicker 2', cost: 150, effect: () => { autoClickValue += 5; }, description: "Generates 5 coins per second.", type: "auto"},
        { name: 'Auto Clicker 3', cost: 750, effect: () => { autoClickValue += 25; }, description: "Generates 25 coins per second.", type: "auto"},
        { name: 'Auto Clicker 4', cost: 3000, effect: () => { autoClickValue += 100; }, description: "Generates 100 coins per second.", type: "auto"},
        { name: 'Auto Clicker 5', cost: 15000, effect: () => { autoClickValue += 500; }, description: "Generates 500 coins per second.", type: "auto"},
        { name: 'Lucky Charm', cost: 500, effect: () => { clickValue *= 1.25; clickValue = Math.floor(clickValue); }, description: "Increases click value by 25%.", type: "click"},
        { name: 'Wealth Amulet', cost: 2500, effect: () => { clickValue *= 1.5; clickValue = Math.floor(clickValue); }, description: "Increases click value by 50%.", type: "click"},
        { name: 'Golden Idol', cost: 12500, effect: () => { clickValue *= 2; clickValue = Math.floor(clickValue); }, description: "Doubles click value.", type: "click"},
        { name: 'Coin Magnet', cost: 100, effect: () => { autoClickValue += 2; }, description: "Generates 2 coins per second.", type: "auto"},
        { name: 'Treasure Compass', cost: 500, effect: () => { autoClickValue += 10; }, description: "Generates 10 coins per second.", type: "auto"},
        { name: 'Gem Detector', cost: 2500, effect: () => { autoClickValue += 50; }, description: "Generates 50 coins per second.", type: "auto"},
        { name: 'Time Warp', cost: 10000, effect: () => { autoClickValue += 200; }, description: "Generates 200 coins per second.", type: "auto"},
        { name: 'Coin Fountain', cost: 50000, effect: () => { autoClickValue += 1000; }, description: "Generates 1000 coins per second.", type: "auto"},
        { name: 'Stone Shovel', cost: 75, effect: () => { clickValue += 8; }, description: "Increases click value by 8.", type: "click"},
        { name: 'Iron Shovel', cost: 375, effect: () => { clickValue += 40; }, description: "Increases click value by 40.", type: "click"},
        { name: 'Mythril Shovel', cost: 1875, effect: () => { clickValue += 200; }, description: "Increases click value by 200.", type: "click"},
        { name: 'Adamantite Shovel', cost: 9375, effect: () => { clickValue += 1000; }, description: "Increases click value by 1000.", type: "click"},
        { name: 'Dragon Shovel', cost: 46875, effect: () => { clickValue += 5000; }, description: "Increases click value by 5000.", type: "click"},
        { name: 'Tiny Drone', cost: 200, effect: () => { autoClickValue += 4; }, description: "Generates 4 coins per second.", type: "auto"},
        { name: 'Mining Drone', cost: 1000, effect: () => { autoClickValue += 20; }, description: "Generates 20 coins per second.", type: "auto"},
        { name: 'Mega Drone', cost: 5000, effect: () => { autoClickValue += 100; }, description: "Generates 100 coins per second.", type: "auto"},
        { name: 'Giga Drone', cost: 25000, effect: () => { autoClickValue += 500; }, description: "Generates 500 coins per second.", type: "auto"},
        { name: 'Quantum Drone', cost: 125000, effect: () => { autoClickValue += 2500; }, description: "Generates 2500 coins per second.", type: "auto"},
        { name: 'Coin Doubler', cost: 100000, effect: () => { clickValue *= 2; autoClickValue *= 2; clickValue = Math.floor(clickValue); autoClickValue = Math.floor(autoClickValue); }, description: "Doubles both click and autoclick value.", type: "upgrade"},
        { name: 'Coin Tripler', cost: 500000, effect: () => { clickValue *= 3; autoClickValue *= 3; clickValue = Math.floor(clickValue); autoClickValue = Math.floor(autoClickValue); }, description: "Triples both click and autoclick value.", type: "upgrade"},
        { name: 'Coin Multiplier', cost: 2500000, effect: () => { clickValue *= 5; autoClickValue *= 5; clickValue = Math.floor(clickValue); autoClickValue = Math.floor(autoClickValue); }, description: "Multiplies both click and autoclick value by 5.", type: "upgrade"},
        { name: 'Copper Ring', cost: 60, effect: () => { clickValue += 6; }, description: "Increases click value by 6.", type: "click"},
        { name: 'Silver Ring', cost: 300, effect: () => { clickValue += 30; }, description: "Increases click value by 30.", type: "click"},
        { name: 'Gold Ring', cost: 1500, effect: () => { clickValue += 150; }, description: "Increases click value by 150.", type: "click"},
        { name: 'Platinum Ring', cost: 7500, effect: () => { clickValue += 750; }, description: "Increases click value by 750.", type: "click"},
        { name: 'Diamond Ring', cost: 37500, effect: () => { clickValue += 3750; }, description: "Increases click value by 3750.", type: "click"},
        { name: 'Baby Turtle', cost: 400, effect: () => { autoClickValue += 8; }, description: "Generates 8 coins per second.", type: "auto"},
        { name: 'Teen Turtle', cost: 2000, effect: () => { autoClickValue += 40; }, description: "Generates 40 coins per second.", type: "auto"},
        { name: 'Adult Turtle', cost: 10000, effect: () => { autoClickValue += 200; }, description: "Generates 200 coins per second.", type: "auto"},
        { name: 'Elder Turtle', cost: 50000, effect: () => { autoClickValue += 1000; }, description: "Generates 1000 coins per second.", type: "auto"},
        { name: 'Mystic Turtle', cost: 250000, effect: () => { autoClickValue += 5000; }, description: "Generates 5000 coins per second.", type: "auto"},
        { name: 'Simple Glasses', cost: 125, effect: () => { autoClickValue += 3; clickValue += 3; }, description: "Increases click value by 3 and generates 3 coins per second.", type: "both"},
        { name: 'Cool Glasses', cost: 625, effect: () => { autoClickValue += 15; clickValue += 15; }, description: "Increases click value by 15 and generates 15 coins per second.", type: "both"},
        { name: 'Stylish Glasses', cost: 3125, effect: () => { autoClickValue += 75; clickValue += 75; }, description: "Increases click value by 75 and generates 75 coins per second.", type: "both"},
        { name: 'Smart Glasses', cost: 15625, effect: () => { autoClickValue += 375; clickValue += 375; }, description: "Increases click value by 375 and generates 375 coins per second.", type: "both"},
        { name: 'Genius Glasses', cost: 78125, effect: () => { autoClickValue += 1875; clickValue += 1875; }, description: "Increases click value by 1875 and generates 1875 coins per second.", type: "both"},
        { name: 'Green Tea', cost: 80, effect: () => { clickValue *= 1.1; clickValue = Math.floor(clickValue); }, description: "Increases click value by 10%.", type: "click"},
        { name: 'Iced Tea', cost: 400, effect: () => { clickValue *= 1.2; clickValue = Math.floor(clickValue); }, description: "Increases click value by 20%.", type: "click"},
        { name: 'Lemonade', cost: 2000, effect: () => { clickValue *= 1.3; clickValue = Math.floor(clickValue); }, description: "Increases click value by 30%.", type: "click"},
        { name: 'Coca-Cola', cost: 10000, effect: () => { clickValue *= 1.4; clickValue = Math.floor(clickValue); }, description: "Increases click value by 40%.", type: "click"},
        { name: 'Fanta', cost: 50000, effect: () => { clickValue *= 1.5; clickValue = Math.floor(clickValue); }, description: "Increases click value by 50%.", type: "click"},
        { name: 'Hamster Wheel', cost: 350, effect: () => { autoClickValue += 7; }, description: "Generates 7 coins per second.", type: "auto"},
        { name: 'Rat Wheel', cost: 1750, effect: () => { autoClickValue += 35; }, description: "Generates 35 coins per second.", type: "auto"},
        { name: 'Guinea Pig Wheel', cost: 8750, effect: () => { autoClickValue += 175; }, description: "Generates 175 coins per second.", type: "auto"},
        { name: 'Dog Wheel', cost: 43750, effect: () => { autoClickValue += 875; }, description: "Generates 875 coins per second.", type: "auto"},
        { name: 'Cat Wheel', cost: 218750, effect: () => { autoClickValue += 4375; }, description: "Generates 4375 coins per second.", type: "auto"},
    ];


    // Function to create and add shop items to the shop container
    function populateShop() {
        items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.id = `item-${index}`; // Add an ID to each item

            itemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Cost: ${item.cost} Coins</p>
                <button data-index="${index}">Buy</button>
            `;
            itemContainer.appendChild(itemDiv);
        });
    }

    // Handle buying an item
    function buyItem(index) {
        const item = items[index];

        if (coins >= item.cost) {
            coins -= item.cost;
            item.effect();  // Apply the item's effect
            updateCoinDisplay();
            disableItem(index); // Disable the item after purchase
            //Log purchase to the debug area (optional)
            if (debugArea) {
                debugArea.innerHTML += `<p>Bought ${item.name}!</p>`;
            }
        } else {
            alert("Not enough coins!");
        }
    }

     // Function to disable an item in the shop after purchase
     function disableItem(index) {
        const itemDiv = document.getElementById(`item-${index}`);
        if (itemDiv) {
            itemDiv.classList.add('disabled');
        }
    }

    // Event listener for shop item clicks (delegated)
    itemContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const index = event.target.dataset.index;
            buyItem(index);
        }
    });


    // Start auto-clicker effect
    function startAutoClicker() {
        autoClickInterval = setInterval(() => {
            coins += autoClickValue;
            updateCoinDisplay();
        }, 1000); // Every 1 second
    }


    // Call functions to initialize the game
    populateShop();
    updateCoinDisplay();
    startAutoClicker(); // Start the autoclicker interval

    // You can add further debugging or initialization code here
});
