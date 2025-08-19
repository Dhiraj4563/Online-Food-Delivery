document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { id: 1, name: 'Boiled Egg', price: 15, quantity: '1 piece', image: 'image/boiled Egg.jpeg' },
        { id: 2, name: 'Burger', price: 50, quantity: '1 piece', image: 'image/burger.jpeg' },
        { id: 3, name: 'Burji', price: 59, quantity: '3 Eggs', image: 'image/burji.jpeg' },
        { id: 4, name: 'Chicken Curry', price: 99, quantity: '5 pcs', image: 'image/ccurry.jpeg' },
        { id: 5, name: 'Half Chicken Fried Rice', price: 65, quantity: 'Half Plate', image: 'image/cfried.jpeg' },
        { id: 6, name: 'Full Chicken Fried Rice', price: 85, quantity: 'Full Plate', image: 'image/cfried.jpeg' },
        { id: 7, name: 'Full Egg Fried Rice', price: 75, quantity: 'Full Plate', image: 'image/egg fried.jpeg' },
        { id: 8, name: 'Half Egg Fried Rice', price: 55, quantity: 'Half Plate', image: 'image/egg fried.jpeg' },
        { id: 9, name: 'Cocacola', price: 20, quantity: '3 pieces', image: 'image/coca.jpeg' },
        { id: 10, name: '500gm Chicken Curry with Rice', price: 125, quantity: 'Half Plate Rice + Curry', image: 'image/curry with rice.jpeg' },
        { id: 11, name: '1000gm Chicken Curry with Rice', price: 140, quantity: 'Full Plate Rice + Curry', image: 'image/curry with rice.jpeg' },
        { id: 12, name: 'Egg Curry with Rice', price: 90, quantity: '2 pcs + Rice', image: 'image/egg curry with rice.jpeg' },
        { id: 13, name: 'Egg Curry', price: 60, quantity: '2 pcs', image: 'image/egg curry.jpeg' },
        { id: 14, name: 'French Fries', price: 50, quantity: '1 pack', image: 'image/french.jpeg' },
        { id: 15, name: 'French Fries with Burger', price: 100, quantity: '1 bowl', image: 'image/french-burger.jpeg' },
        { id: 16, name: 'Full Chicken Kabab', price: 100, quantity: '10 pcs', image: 'image/kabab.jpeg' },
        { id: 17, name: 'Half Chicken Kabab', price: 60, quantity: '5 pcs', image: 'image/kabab.jpeg' },
        { id: 18, name: 'Noodles With Boiled Egg', price: 60, quantity: '1 plate', image: 'image/noodegg.jpeg' },
        { id: 19, name: 'Omelete', price: 59, quantity: '3 pcs', image: 'image/omelete.jpeg' },
        { id: 20, name: 'Half Steamed Rice', price: 30, quantity: 'Half plate', image: 'image/steamed rice.jpeg' },
        { id: 21, name: 'Full Steamed Rice', price: 40, quantity: 'Full plate', image: 'image/steamed rice.jpeg' },
        { id: 22, name: 'Full Veg Fried Rice', price: 69, quantity: 'Full Plate', image: 'image/veg fried rice.jpeg' },
        { id: 23, name: 'Half Veg Fried Rice', price: 49, quantity: 'Half Plate', image: 'image/veg fried rice.jpeg' },
        { id: 24, name: 'Noodles Waiwai', price: 45, quantity: '1 pack', image: 'image/waiwai.jpeg' },
        { id: 25, name: 'Chicken Biryani', price: 110, quantity: '1 plate', image: 'image/biryani.jpeg' },
    ];

    const menuList = document.getElementById('menu-items');
    const itemDetails = document.getElementById('item-details');
    const searchResults = document.getElementById('search-results');
    const orderConfirmation = document.getElementById('order-confirmation');
    const homepageItems = document.getElementById('homepage-items');
    const searchBox = document.getElementById('search');

    let selectedItem = null;
    let favorites = [];

    // Populate sidebar
    menuItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.addEventListener('click', () => showItemDetails(item));
        menuList.appendChild(li);
    });

    // Populate homepage
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('homepage-item');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <p>${item.name}</p>
            <p>₹${item.price}</p>
        `;
        div.addEventListener('click', () => showItemDetails(item));
        homepageItems.appendChild(div);
    });

    // Search functionality
    searchBox.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        searchResults.innerHTML = '';
        if (searchTerm) {
            const filteredItems = menuItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm)
            );
            if (filteredItems.length > 0) {
                filteredItems.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item.name;
                    div.addEventListener('click', () => {
                        showItemDetails(item);
                        searchResults.innerHTML = '';
                        searchBox.value = '';
                    });
                    searchResults.appendChild(div);
                });
            } else {
                searchResults.innerHTML = '<div>No results found. Try a different dish.</div>';
            }
        }
    });

    // ESC key closes search results
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            searchResults.innerHTML = '';
            searchBox.value = '';
        }
    });

    // Show item details with quantity control
    function showItemDetails(item) {
        selectedItem = item;
        let selectedCount = 1; // default quantity

        itemDetails.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <p>Price: ₹${item.price}</p>
            <p>Base Quantity: ${item.quantity}</p>
            
            <div class="quantity-control">
                <button id="decrease">-</button>
                <span id="count">${selectedCount}</span>
                <button id="increase">+</button>
            </div>

            <p id="total-price">Total: ₹${item.price * selectedCount}</p>

            <button id="fav-btn">${favorites.includes(item.id) ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}</button>
            
            <div id="order-details">
                <label for="address">Address:</label>
                <input type="text" id="address" placeholder="Enter your address">
                <label for="contact">Contact Number:</label>
                <input type="text" id="contact" placeholder="Enter your contact number">
                <button id="confirm-order">Confirm Order</button>
            </div>
        `;
        itemDetails.classList.remove('hidden');

        // Quantity increase/decrease
        document.getElementById("increase").addEventListener("click", () => {
            selectedCount++;
            document.getElementById("count").textContent = selectedCount;
            document.getElementById("total-price").textContent = `Total: ₹${item.price * selectedCount}`;
        });

        document.getElementById("decrease").addEventListener("click", () => {
            if (selectedCount > 1) {
                selectedCount--;
                document.getElementById("count").textContent = selectedCount;
                document.getElementById("total-price").textContent = `Total: ₹${item.price * selectedCount}`;
            }
        });

        // Add favorite toggle
        document.getElementById('fav-btn').addEventListener('click', () => {
            if (favorites.includes(item.id)) {
                favorites = favorites.filter(f => f !== item.id);
                alert(`${item.name} removed from favorites`);
            } else {
                favorites.push(item.id);
                alert(`${item.name} added to favorites`);
            }
            showItemDetails(item); // refresh
        });

        // Handle order confirmation
        document.getElementById("confirm-order").addEventListener("click", () => {
            const address = document.getElementById("address").value.trim();
            const contact = document.getElementById("contact").value.trim();

            if (!address || !contact) {
                alert('⚠️ Please fill in all the details.');
                return;
            }

            if (!/^\d{10}$/.test(contact)) {
                alert('⚠️ Enter a valid 10-digit phone number.');
                return;
            }

            const shopOwnerNumber = "+9779818970299";  

            const whatsappMessage = `🛒 Order Details:\n\n🍴 Item: ${item.name}\n💰 Price: ₹${item.price}\n📦 Base Quantity: ${item.quantity}\n🔢 Ordered: ${selectedCount}\n💵 Total: ₹${item.price * selectedCount}\n🏠 Address: ${address}\n📞 Contact: ${contact}`;
            
            const whatsappLink = `https://wa.me/${shopOwnerNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            window.open(whatsappLink, '_blank');

            // Show confirmation
            itemDetails.classList.add('hidden');
            orderConfirmation.classList.remove('hidden');
            orderConfirmation.innerHTML = `<p>✅ Thank you for your order! It will be delivered soon.</p>`;
            orderConfirmation.style.display = 'flex';
            orderConfirmation.style.justifyContent = 'center';
            orderConfirmation.style.alignItems = 'center';
            orderConfirmation.style.height = '100vh';
        });
    }
});
