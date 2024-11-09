"use strict";

(function () {
  const ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums";
  const albumsContainer = document.querySelector(".albums");

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

  const renderAlbums = async () => {
    try {
      const albumsData = await fetchData(ALBUMS_URL);
      albumsData.forEach((album) => {
        const albumElement = createAlbumElement(album);
        albumsContainer.append(albumElement);
      });
    } catch (error) {
      console.error("Error rendering albums:", error);
    }
  };

  const createAlbumElement = (album) => {
    const albumLi = document.createElement("li");
    const albumLink = document.createElement("a");
    const albumHeader = document.createElement("div");
    const photoCountBadge = document.createElement("span");

    photoCountBadge.classList.add("badge", "bg-primary", "rounded-pill");
    photoCountBadge.textContent = '50';

    albumHeader.classList.add("ms-2", "me-auto");
    albumLi.append(albumHeader);
    albumHeader.append(albumLink);
    albumLi.append(photoCountBadge);

    albumLink.setAttribute("href", `photos.html?albumId=${album.id}`);
    albumLink.setAttribute("target", "_blank");

    albumLi.classList.add("album-item", "list-group-item", "d-flex", "justify-content-between", "align-items-start", "list-group-item-success");
    albumLink.append(album.title);

    return albumLi;
  };

  renderAlbums();
})();