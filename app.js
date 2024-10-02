const $gifArea = $("#gif-area");
const $searchInput = $("#search");
const API_KEY = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const GIPHY_URL = "http://api.giphy.com/v1/gifs/search";
const $loadingIndicator = $("#loading");

function showLoading() {
    $loadingIndicator.show();
  }
  
  function hideLoading() {
    $loadingIndicator.hide();
  }

function addGif(res) {
  const numResults = res.data.length;
  if (numResults) {
    const randomIdx = Math.floor(Math.random() * numResults);
    const gifUrl = res.data[randomIdx].images.original.url;
    const $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    const $newGif = $("<img>", {
      src: gifUrl,
      class: "w-100",
      alt: "A GIF from Giphy"
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  } else {
    alert("No results found! Please try a different search term.");
  }
}

async function fetchGifs(searchTerm) {
  try {
    showLoading();
    const response = await axios.get(GIPHY_URL, {
      params: {
        q: searchTerm,
        api_key: API_KEY
      }
    });
    addGif(response.data);
  } catch (error) {
    console.error("Error fetching data from Giphy:", error);
    alert("An error occurred while fetching GIFs. Please try again.");
  } finally {
    hideLoading();
  }
}

$("#gif-form").on("submit", function(evt) {
  evt.preventDefault();
  const searchTerm = $searchInput.val().trim();
  $searchInput.val(""); // Clear the search box
  fetchGifs(searchTerm); // Fetch GIFs based on the search term
});

$("#remove").on("click", function() {
  $gifArea.empty(); // Remove all GIFs from the area
});