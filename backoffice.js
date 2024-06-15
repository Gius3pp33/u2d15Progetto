document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("product-form");
    const deleteButton = document.getElementById("delete-button");
    const resetButton = document.getElementById("reset-button");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");
    const isEditing = id !== null;
    const readToken = "yoyoyoyo";
    const adminToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmFmYzdjMjM5YzAwMTUyZjRiNDkiLCJpYXQiOjE3MTgzNTI2MzYsImV4cCI6MTcxOTU2MjIzNn0.J7ROrPs_jTcL9BwIuBCEo7LTZ_nxzvbXfDMcBC9uAB4";
    
    


   
 // se siamo in modalità modifica, carico i dettagli del prodotto
    if (isEditing) {
        document.getElementById("form-title").textContent = "Edit";
        fetchProduct(id);
    }
 // Gestisco il submit del form
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const product = {
            name: form.name.value,
            description: form.description.value,
            brand: form.brand.value,
            price: form.price.value,
            imageUrl: form.imageUrl.value
        };
        if (isEditing) {
            updateProduct(id, product);
        } else {
            createProduct(product);
        }
    });

    // Gestisco il reset del form
    resetButton.addEventListener("click", function(event) {
        event.preventDefault();
        const resetModal = new bootstrap.Modal(document.getElementById('resetModal')); // creo un'istanza del modale
        resetModal.show();
         // aggiungo un eventlistener al pulsante di conferma del reset nel modale per nasconderlo o resettare
        document.getElementById("confirmReset").addEventListener("click", function() {
            form.reset();
            resetModal.hide();
        });
    });
   // Gestisco l'eliminazione del prodotto
   deleteButton.addEventListener("click", function() {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
    document.getElementById("confirmDelete").addEventListener("click", function() {
        deleteProduct(id);
        deleteModal.hide();
    });
});
     // Funzione per ottenere i dettagli del prodotto dal server
    function fetchProduct(id) {
        fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            headers: {
                "Authorization": adminToken
            }
        })
        .then(response => response.json())
        .then(product => {
            form.name.value = product.name;
            form.description.value = product.description;
            form.brand.value = product.brand;
            form.price.value = product.price;
            form.imageUrl.value = product.imageUrl;
            deleteButton.style.display = "block";
        })
        .catch(error => {
            console.log( error);
        });
    }
     // Funzione per creare un nuovo prodotto
    function createProduct(product) {
        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": adminToken
            },
            body: JSON.stringify(product)
        })
        .then(response => {
            if (response.ok) {
                //window.location.href = "/": Se la risposta è positiva, reindirizza l'utente alla homepage del sito 
                window.location.href = "/";
            } throw new Error("Error" + response.statusText);
            
        })
        .catch(error => {
            console.log( error);
        });
    }
 // Funzione per aggiornare un prodotto esistente cioè modificare
    function updateProduct(id, product) {
        fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": adminToken
            },
            body: JSON.stringify(product)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/";
            } throw new Error("Error"+ response.statusText);
            
        })
        .catch(error => {
            console.log( error);
        });
    }
// funzione per eliminare un prodotto
    function deleteProduct(id) {
        fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": adminToken
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "/";
            } throw new Error("Error" + response.statusText);
            
        })
        .catch(error => {
            console.log( error);
        });
    }
});
