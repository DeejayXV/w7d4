document.getElementById("loadImages").addEventListener("click", function (e) {
  e.preventDefault();
  caricaImagine("cat");
});

document.getElementById("loadSecondaryImages").addEventListener("click", function (e) {
  e.preventDefault();
  caricaImagine("bird");
});

function caricaImagine(query) {
  fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    method: "GET",
    headers: {
      Authorization: "Jz68RATO7e77nK9iirDmMlQtEkewv1DKVzqDHR3wDfJc8FMj7MBZj8vA",
    },
  })
    .then((response) => response.json()) //convertiamo le response in JSON
    .then((data) => {
      console.log(data);
      const gallery = document.getElementById("imageGallery");
      gallery.innerHTML = ""; //pulisco le immagini rpima di carica quelle nuove
      data.photos.forEach((photo) => {
        //ciclo per le foto dell'API response
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-4";
        colDiv.innerHTML = `
          <div class="card mb-4 shadow-sm">
            <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" style="height: 225px; width: 100%; display: block;">
            <div class="card-body">
            <h5 class="card-title">Lorem Ipsum</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary" onclick="this.closest('.col-md-4').style.display='none'">Hide</button>
                </div>
                <small class="text-muted">${photo.id}</small> 
              </div>
            </div>
          </div>`;
        gallery.appendChild(colDiv);
      });
    })
    .catch((error) => {
      console.error("Error loading the images:", error);
      alert("Failed to load images. Check the console for more information.");
    });
}
