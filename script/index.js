function loadCategories() {
    // console.log("category is loading")
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        // .then((data) => console.log(data))
        // .then((data) => console.log(data.categories))
        // .then((data) => console.log(data.categories))
        .then((data) => displayCategories(data.categories))
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((response) => response.json())
        // .then((data) => console.log(data.videos));
        .then((data) => displayVideos(data.videos));
}

// {category_id: '1001', category: 'Music'}

function displayCategories(categories) {
    // console.log(categories)
    // get the container
    const categoryContainer = document.getElementById("category-container");

    //loop operation on Array of object 
    for (let cat of categories) {
        // console.log(cat);
        // create Element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        // Append the Element
        categoryContainer.append(categoryDiv);
    }
}

// {category_id: '1001', video_id: 'aaah', thumbnail: 'https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg', title: 'Colors of the Wind', authors: Array(1), …}

const displayVideos = (videos) => {
    // console.log(videos);
    const videoContainer = document.getElementById("video-container");

    videos.forEach((video) => {
        console.log(video)
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
        `;
        // append
        videoContainer.append(videoCard);
    });
};

loadCategories()
loadVideos()