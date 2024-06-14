const readToken = "yoyoyo";
const adminToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmFmYzdjMjM5YzAwMTUyZjRiNDkiLCJpYXQiOjE3MTgzNTI2MzYsImV4cCI6MTcxOTU2MjIzNn0.J7ROrPs_jTcL9BwIuBCEo7LTZ_nxzvbXfDMcBC9uAB4";

// Funzione per mostrare e nascondere il caricamento 
const isLoading = bool => {
    const spinner = document.querySelector(".spinner-border");
  
    if (bool) {
      spinner.classList.remove("d-none");
    } else {
      spinner.classList.add("d-none");
    }
  };
document.addEventListener("DOMContentLoaded", function() {
    // Funzione per ottenere i prodotti dal server
    function fetchProducts() {
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {
                "Authorization": adminToken
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Errore: " + response.statusText);
            }
        })
        .then(products => displayProducts(products))
        .catch(error => {
            console.log( error);
            displayError("An error occurred while loading the products");
        });
    }
    // Funzione per visualizzare i prodotti
    function displayProducts(products) {
        const list = document.getElementById("products-list");
        list.innerHTML = ""; // pulisco la lista prima di aggiungere nuovi elementi
    
        products.forEach(product => {
            // Creazione della della card
            const card = document.createElement("div");
            card.className = "col-md-4";
    
            // Creazione della card
            const cardDiv = document.createElement("div");
            cardDiv.className = "card mb-4";
    
            // Immagine del prodotto
            const img = document.createElement("img");
            img.src = product.imageUrl;
            img.className = "card-img-top";
            img.alt = product.name;
            img.addEventListener("click", () => {
                window.location.assign(`./details.html?productId=${product._id}`); 
            });
    
            // corpo della card
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
    
            // titolo del prodotto
            const cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.textContent = product.name;
    
            // Descrizione del prodotto
            const cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.textContent = product.description;
    
            // marca del prodotto
            const cardBrand = document.createElement("p");
            cardBrand.className = "card-text";
            cardBrand.innerHTML = `<strong>Brand:</strong> ${product.brand}`;
    
            // Prezzo del prodotto
            const cardPrice = document.createElement("p");
            cardPrice.className = "card-text";
            cardPrice.innerHTML = `<strong>Price:</strong> €${product.price}`;
    
            // Link per dettagli del prodotto,aggiungendo un bottone
            const detailsLink = document.createElement("a");
            detailsLink.href = `./details.html?productId=${product._id}`;
            detailsLink.className = "btn btn-primary mx-4 bg-transparent border-primary text-primary";
            detailsLink.innerHTML = `Learn more <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-index text-primary" viewBox="0 0 16 16">
                <path d="M6.75 1a.75.75 0 0 1 .75.75V8a.5.5 0 0 0 1 0V5.467l.086-.004c.317-.012.637-.008.816.027.134.027.294.096.448.182.077.042.15.147.15.314V8a.5.5 0 1 0 1 0V6.435l.106-.01c.316-.024.584-.01.708.04.118.046.3.207.486.43.081.096.15.19.2.259V8.5a.5.5 0 0 0 1 0v-1h.342a1 1 0 0 1 .995 1.1l-.271 2.715a2.5 2.5 0 0 1-.317.991l-1.395 2.442a.5.5 0 0 1-.434.252H6.035a.5.5 0 0 1-.416-.223l-1.433-2.15a1.5 1.5 0 0 1-.243-.666l-.345-3.105a.5.5 0 0 1 .399-.546L5 8.11V9a.5.5 0 0 0 1 0V1.75A.75.75 0 0 1 6.75 1M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046zm2.094 2.025"/></svg>`;

    
            // Link per la modifica del prodotto,aggiungendo un bottone
            const editLink = document.createElement("a");
            editLink.href = `./backoffice.html?productId=${product._id}`;
            editLink.className = "btn btn-secondary bg-transparent text-secondary border-secondary";
            editLink.innerHTML = `Edit <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="secondary" class="bi bi-pencil-square text-secondary" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>`;
            
    
            // Aggiungo gli elementi alla struttura della card
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardBrand);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(detailsLink);
            cardBody.appendChild(editLink);
    
            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
    
            card.appendChild(cardDiv);
    
            // Aggiungo la card alla lista
            list.appendChild(card);
        });
       isLoading(false)
    }
 // Funzione per visualizzare un messaggio di errore
    function displayError(message) {
        const list = document.getElementById("products-list");
        list.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
       isLoading(false)
    }
// Chiamata alla funzione per ottenere i prodotti
    fetchProducts();
});
