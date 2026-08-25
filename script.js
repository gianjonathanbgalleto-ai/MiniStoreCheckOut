function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 0.10;
    } else if (subtotal >= 3000) {
        return subtotal * 0.07;
    } else if (subtotal >= 1000) {
        return subtotal * 0.05;
    } else {
        return 0;
    }
}

function getDeliveryFee(option) {
    switch (option) {
        case "1":
            return 0;
        case "2":
            return 80;
        case "3":
            return 150;
        default:
            return 0;
    }
}

const productCount = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");
const calculateBtn = document.getElementById("calculateBtn");
const validationMessage = document.getElementById("validationMessage");
const orderSummary = document.getElementById("orderSummary");

productCount.addEventListener("input", function () {
    productsContainer.innerHTML = "";

    const count = Number(productCount.value);

    if (count <= 0 || isNaN(count)) {
        return;
    }

    for (let i = 0; i < count; i++) {
        const productDiv = document.createElement("div");

        productDiv.className = "product";

        productDiv.innerHTML = `
            <h3>Product ${i + 1}</h3>

            <label for="productName-${i}">Product Name</label>
            <input type="text" id="productName-${i}" placeholder="Enter product name">

            <label for="productPrice-${i}">Price</label>
            <input type="number" id="productPrice-${i}" min="0" step="0.01" placeholder="Enter price">

            <label for="productQuantity-${i}">Quantity</label>
            <input type="number" id="productQuantity-${i}" min="1" placeholder="Enter quantity">
        `;

        productsContainer.appendChild(productDiv);
    }
});

calculateBtn.addEventListener("click", function () {
    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    const customerName = document.getElementById("customerName").value.trim();
    const count = Number(productCount.value);

    if (customerName === "") {
        validationMessage.textContent = "Please enter the customer name.";
        return;
    }

    if (isNaN(count) || count <= 0 || !Number.isInteger(count)) {
        validationMessage.textContent = "Please enter a valid positive number of products.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    for (let i = 0; i < count; i++) {
        const productName =
            document.getElementById(`productName-${i}`).value.trim();

        const price =
            Number(document.getElementById(`productPrice-${i}`).value);

        const quantity =
            Number(document.getElementById(`productQuantity-${i}`).value);

        if (productName === "") {
            validationMessage.textContent =
                `Please enter the name of Product ${i + 1}.`;
            return;
        }

        if (isNaN(price) || price <= 0) {
            validationMessage.textContent =
                `Please enter a valid positive price for Product ${i + 1}.`;
            return;
        }

        if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
            validationMessage.textContent =
                `Please enter a valid positive quantity for Product ${i + 1}.`;
            return;
        }

        const itemAmount = calculateItemAmount(price, quantity);

        subtotal += itemAmount;

        productDetails += `
            <p>
                <strong>${i + 1}. ${productName}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${itemAmount.toFixed(2)}
            </p>
        `;
    }

    const discount = calculateDiscount(subtotal);

    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    } else {
        discountRate = 0;
    }

    const deliveryOption =
        document.getElementById("deliveryOption").value;

    const deliveryFee =
        getDeliveryFee(deliveryOption);

    let deliveryType = "";

    switch (deliveryOption) {
        case "1":
            deliveryType = "Store Pickup";
            break;
        case "2":
            deliveryType = "Standard Delivery";
            break;
        case "3":
            deliveryType = "Express Delivery";
            break;
        default:
            deliveryType = "Unknown";
    }

    const finalAmount =
        subtotal - discount + deliveryFee;

    orderSummary.innerHTML = `
        <h2>MINI STORE CHECKOUT SYSTEM</h2>

        <p>
            <strong>Customer:</strong>
            ${customerName}
        </p>

        <hr>

        ${productDetails}

        <hr>

        <h3>ORDER SUMMARY</h3>

        <p>
            <strong>Subtotal:</strong>
            ₱${subtotal.toFixed(2)}
        </p>

        <p>
            <strong>Discount Rate:</strong>
            ${discountRate}%
        </p>

        <p>
            <strong>Discount Amount:</strong>
            ₱${discount.toFixed(2)}
        </p>

        <p>
            <strong>Delivery Type:</strong>
            ${deliveryType}
        </p>

        <p>
            <strong>Delivery Fee:</strong>
            ₱${deliveryFee.toFixed(2)}
        </p>

        <h2>
            Final Amount:
            ₱${finalAmount.toFixed(2)}
        </h2>
    `;
});
