document.addEventListener('DOMContentLoaded', () => {
    // Get all "Ordenar" buttons
    const orderButtons = document.querySelectorAll('.productos > button:nth-of-type(1)');

    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the parent product div
            const productDiv = button.closest('.productos');
            if (!productDiv) return;

            // Get product name (h1)
            const productName = productDiv.querySelector('h1')?.innerText || 'Producto';

            // Get price (p containing price)
            let price = '';
            const priceParagraphs = productDiv.querySelectorAll('p');
            priceParagraphs.forEach(p => {
                if (p.innerText.trim().match(/^\$\d/)) {
                    price = p.innerText.trim();
                }
            });

            // Check if there is a form with radio buttons
            const form = productDiv.querySelector('form');
            let optionText = '';
            if (form) {
                const selectedRadio = form.querySelector('input[type="radio"]:checked');
                if (!selectedRadio) {
                    alert('Por favor, seleccione una opción antes de ordenar.');
                    return;
                }
                // Get the label text for the selected radio button
                const label = form.querySelector(`label > input[value="${selectedRadio.value}"]`)?.parentElement;
                optionText = label ? label.innerText.trim() : selectedRadio.value;
            }

            // Construct the message
            let message = `Hola, quiero ordenar:\n- ${productName}`;
            if (optionText) {
                message += `\n  Opción: ${optionText}`;
            }
            if (price) {
                message += `\n- Precio: ${price}`;
            }

            // WhatsApp number (from the existing link in index.html)
            const whatsappNumber = '3160941090';

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);

            // Open WhatsApp URL in new tab
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Cart button functionality placeholder
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert('Funcionalidad del carrito aún no implementada.');
        });
    }
});
