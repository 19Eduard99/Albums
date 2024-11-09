"use strict";

(function () {
  const PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos";
  const photosContainer = document.querySelector(".photos");
  const title = document.querySelector('h1');

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const renderPhotos = async (albumId) => {
    try {
      const photosUrl = `${PHOTOS_URL}?albumId=${albumId}`;
      const photosData = await fetchData(photosUrl);
      photosData.forEach((photo) => {
        const photoCard = createPhotoCard(photo);
        photosContainer.append(photoCard);
      });
    } catch (error) {
      console.error("Error rendering photos:", error);
    }
  };

  const createPhotoCard = (photo) => {
    const photoCard = document.createElement("div");
    photoCard.classList.add("card", "mb-3", "shadow-sm");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const img = document.createElement("img");
    img.setAttribute("src", photo.url);
    img.setAttribute("alt", photo.title);
    img.classList.add("card-img-top");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = photo.title;

    cardBody.append(cardTitle);
    photoCard.append(img, cardBody);

    return photoCard;
  };

  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get("albumId");
  console.log(albumId)
  if (albumId) {
    title.textContent = `Album №${albumId}`;

    renderPhotos(albumId);
  } else {
    console.error("No albumId provided in URL");
  }
})();