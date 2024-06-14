
// Funzione per mostrare e nascondere il caricamento (spinner)
const isLoading = bool => {
    const spinner = document.querySelector(".spinner-border");
  
    if (bool) {
      spinner.classList.remove("d-none");
    } else {
      spinner.classList.add("d-none");
    }
  };
  
// Evento che si attiva quando il DOM è completamente caricato
  document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("productId");
    const adminToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmFmYzdjMjM5YzAwMTUyZjRiNDkiLCJpYXQiOjE3MTgzNTI2MzYsImV4cCI6MTcxOTU2MjIzNn0.J7ROrPs_jTcL9BwIuBCEo7LTZ_nxzvbXfDMcBC9uAB4";
   
    // Verifico se l'ID è presente e non è vuoto
    if (productId) {
        fetchProductDetails(productId, adminToken);
    } else {
        displayError("ID del prodotto non trovato.");
    }
});
// Funzione per ottenere i dettagli di un prodotto dal server

function fetchProductDetails(productId, token) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        headers: {
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        //La proprietà response.statusText  restituisce lo stato testuale della risposta HTTP restituita dal server
        throw new Error("Errore nella risposta: " + response.statusText);
    })
    .then(product => {
        displayProduct(product);
    })
    .catch(error => {
        console.log(error);
        displayError("Si è verificato un errore durante il caricamento dei dettagli del prodotto.");
    });
}
// Funzione per visualizzare i dettagli del prodotto
function displayProduct(product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-brand").textContent = "Brand: " + product.brand;
    document.getElementById("product-price").textContent = "Prezzo: €" + product.price;
    document.getElementById("product-image").src = product.imageUrl;
    isLoading(false);
}
// Funzione per visualizzare un messaggio di errore
function displayError(message) {
    const container = document.querySelector(".container");
    container.innerHTML = `<div class="alert alert-danger" role="alert">${message} </div>`;
}