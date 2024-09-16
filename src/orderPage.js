const OrderPage = (() => {
    const orderContainer = document.createElement('div');
    orderContainer.id = "order-container";

    const heading = document.createElement('h1');
    heading.id = "order-heading";
    heading.textContent = "ORDER NOW";

    const descriptionText = document.createElement('p');
    descriptionText.id = "order-text";
    descriptionText.textContent = "Call us at (555) 555-5555 to place an order!";
    

    const locationText = document.createElement('p');
    locationText.id = "order-location";
    locationText.innerHTML = `
    <br>
    <em>Made an order already? </em>
    <br>
    Your dessert will be ready in 5 minutes, <strong>guaranteed!</strong>
    <br><br>
    We are located at:
    <br>
    123 Main Street, Seattle, WA 12345`;

    orderContainer.appendChild(heading);
    orderContainer.appendChild(descriptionText);
    orderContainer.appendChild(locationText);

    return { orderContainer };
})();

const { orderContainer } = OrderPage;
export { orderContainer };