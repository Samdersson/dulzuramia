document.addEventListener('DOMContentLoaded', () => {
    // Get all "Ordenar" buttons
    const orderButtons = document.querySelectorAll('.productos > button:nth-of-type(1)');

    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productDiv = button.closest('.productos');
            if (!productDiv) return;

            const productName = productDiv.querySelector('h1')?.innerText || 'Producto';

            let price = '';
            const priceParagraphs = productDiv.querySelectorAll('p');
            priceParagraphs.forEach(p => {
                if (p.innerText.trim().match(/^\$\d/)) {
                    price = p.innerText.trim();
                }
            });

            const form = productDiv.querySelector('form');
            let optionText = '';
            if (form) {
                const selectedRadio = form.querySelector('input[type="radio"]:checked');
                if (!selectedRadio) {
                    alert('Por favor, seleccione una opción antes de ordenar.');
                    return;
                }
                const label = form.querySelector(`label > input[value="${selectedRadio.value}"]`)?.parentElement;
                optionText = label ? label.innerText.trim() : selectedRadio.value;
            }

            let message = `Hola, quiero ordenar:\n- ${productName}`;
            if (optionText) {
                message += `\n  ${optionText}`;
            }
            if (price) {
                message += `\n- Precio: ${price}`;
            }

            const whatsappNumber = '+573160941090';
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.productos > button:nth-of-type(3)');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productDiv = button.closest('.productos');
            if (!productDiv) return;

            const productName = productDiv.querySelector('h1')?.innerText || 'Producto';
            let price = '';
            const priceParagraphs = productDiv.querySelectorAll('p');
            priceParagraphs.forEach(p => {
                if (p.innerText.trim().match(/^\$\d/)) {
                    price = p.innerText.trim();
                }
            });

            const form = productDiv.querySelector('form');
            let optionText = '';
            if (form) {
                const selectedRadio = form.querySelector('input[type="radio"]:checked');
                if (!selectedRadio) {
                    alert('Por favor, seleccione una opción antes de agregar al carrito.');
                    return;
                }
                const label = form.querySelector(`label > input[value="${selectedRadio.value}"]`)?.parentElement;
                optionText = label ? label.innerText.trim() : selectedRadio.value;
            }

            
            const existingIndex = cart.findIndex(item => item.name === productName && item.option === optionText);
            if (existingIndex !== -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({ name: productName, price: price, option: optionText, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`Producto agregado al carrito:\n${productName}${optionText ? '\n' + optionText : ''}\n${price}`);
        });
    });

    // Cart modal 
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.createElement('div');
    cartModal.id = 'cartModal';
    cartModal.style.position = 'fixed';
    cartModal.style.top = '50%';
    cartModal.style.left = '50%';
    cartModal.style.transform = 'translate(-50%, -50%)';
    cartModal.style.backgroundColor = 'white';
    cartModal.style.padding = '20px';
    cartModal.style.borderRadius = '10px';
    cartModal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    cartModal.style.zIndex = '10000';
    cartModal.style.display = 'none';
    cartModal.style.maxHeight = '80vh';
    cartModal.style.overflowY = 'auto';
    cartModal.style.width = '90vw';
    cartModal.style.maxWidth = '500px';

    const closeModalBtn = document.createElement('button');
    closeModalBtn.innerText = 'Cerrar';
    closeModalBtn.style.marginBottom = '10px';
    closeModalBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    const cartItemsList = document.createElement('div');
    cartModal.appendChild(closeModalBtn);
    cartModal.appendChild(cartItemsList);

    // Continue comprando button
    const continueBtn = document.createElement('button');
    continueBtn.innerText = 'Continuar compra';
    continueBtn.style.marginTop = '10px';
    continueBtn.style.padding = '10px 20px';
    continueBtn.style.backgroundColor = '#25D366';
    continueBtn.style.color = 'white';
    continueBtn.style.border = 'none';
    continueBtn.style.borderRadius = '5px';
    continueBtn.style.cursor = 'pointer';

    cartModal.appendChild(continueBtn);

    document.body.appendChild(cartModal);

    // Render cart items in modal
    function renderCart() {
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.innerText = 'El carrito está vacío.';
            cartItemsList.appendChild(emptyMsg);
            continueBtn.style.display = 'none';
            return;
        }
        continueBtn.style.display = 'inline-block';

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.display = 'flex';
            itemDiv.style.justifyContent = 'space-between';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.marginBottom = '10px';

            const itemInfo = document.createElement('div');
            itemInfo.style.flex = '1';
            itemInfo.innerText = `${item.name}${item.option ? ' - ' + item.option : ''} - ${item.price}`;

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.min = '1';
            quantityInput.value = item.quantity;
            quantityInput.style.width = '50px';
            quantityInput.style.margin = '0 10px';

            quantityInput.addEventListener('change', (e) => {
                const newQty = parseInt(e.target.value);
                if (isNaN(newQty) || newQty < 1) {
                    e.target.value = item.quantity;
                    return;
                }
                cart[index].quantity = newQty;
                localStorage.setItem('cart', JSON.stringify(cart));
            });

            const removeBtn = document.createElement('button');
            removeBtn.innerText = 'Eliminar';
            removeBtn.style.backgroundColor = '#ff4d4d';
            removeBtn.style.color = 'white';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '5px';
            removeBtn.style.cursor = 'pointer';
            removeBtn.style.padding = '5px 10px';

            removeBtn.addEventListener('click', () => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });

            itemDiv.appendChild(itemInfo);
            itemDiv.appendChild(quantityInput);
            itemDiv.appendChild(removeBtn);

            cartItemsList.appendChild(itemDiv);
        });
    }

    // Show cart modal on cartBtn click
    cartBtn.addEventListener('click', () => {
        renderCart();
        cartModal.style.display = 'block';
    });

    // Continue purchase button click
    continueBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }
        let message = 'Hola, Dulzura Mía deseo ordenar:\n';
        cart.forEach(item => {
            message += ` -  ${item.quantity}`;
            if (item.option) {
                message += ` (${item.option})`;
            }
            message += ` ${item.name}\n`;
        });

        const whatsappNumber = '+573160941090';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    });

    // Close modal when clicking outside modal content
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Product image modal elements
    const productImageModal = document.createElement('div');
    productImageModal.id = 'productImageModal';
    productImageModal.style.position = 'fixed';
    productImageModal.style.top = '50%';
    productImageModal.style.left = '50%';
    productImageModal.style.transform = 'translate(-50%, -50%)';
    productImageModal.style.backgroundColor = 'white';
    productImageModal.style.padding = '20px';
    productImageModal.style.borderRadius = '10px';
    productImageModal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    productImageModal.style.zIndex = '10000';
    productImageModal.style.display = 'none';
    productImageModal.style.maxHeight = '80vh';
    productImageModal.style.overflowY = 'auto';
    productImageModal.style.width = '90vw';
    productImageModal.style.maxWidth = '500px';

    const closeImageModalBtn = document.createElement('button');
    closeImageModalBtn.innerText = 'Cerrar';
    closeImageModalBtn.style.marginBottom = '10px';
    closeImageModalBtn.addEventListener('click', () => {
        productImageModal.style.display = 'none';
    });

    const productImage = document.createElement('img');
    productImage.style.maxWidth = '100%';
    productImage.style.maxHeight = '80vh';
    productImage.style.display = 'block';
    productImage.style.margin = '0 auto';

    productImageModal.appendChild(closeImageModalBtn);
    productImageModal.appendChild(productImage);
    document.body.appendChild(productImageModal);

    // Add event listeners to "Ver producto" buttons
    const viewProductButtons = document.querySelectorAll('.productos > button:nth-of-type(2)');
    viewProductButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productDiv = button.closest('.productos');
            if (!productDiv) return;

            const img = productDiv.querySelector('img');
            if (!img) return;

            productImage.src = img.src;
            productImage.alt = img.alt || 'Imagen del producto';
            productImageModal.style.display = 'block';
        });
    });

    // Close modal when clicking outside modal content
    window.addEventListener('click', (event) => {
        if (event.target === productImageModal) {
            productImageModal.style.display = 'none';
        }
    });
});
