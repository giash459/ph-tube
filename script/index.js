
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
}
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
}

function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  // console.log(activeButtons);
  for (let btn of activeButtons) {
    btn.classList.remove("active")
  }

}

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

function loadVideos(searchText = "") {
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response) => response.json())
    // .then((data) => console.log(data.videos));
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
  showLoader()
  // console.log(id)
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  console.log(url)
  fetch(url)
    .then((res) => res.json())
    // .then((data) => console.log(data.category))
    .then((data) => {
      removeActiveClass();
      const clickButton = document.getElementById(`btn-${id}`);
      clickButton.classList.add("active");
      console.log(clickButton);
      displayVideos(data.category)
    })
}

const loadVideoDetails = (videoId) => {
  // console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    // .then((data) => console.log(data));
    // .then((data) =>  console.log(data.video));
    .then((data) => displayVideosDetails(data.video));
}

const displayVideosDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    
  </div>
</div>
  `
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
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
    // Append the Element
    categoryContainer.append(categoryDiv);
  }
}

// {category_id: '1001', video_id: 'aaah', thumbnail: 'https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg', title: 'Colors of the Wind', authors: Array(1), …}

const displayVideos = (videos) => {
  // console.log(videos);
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div class="py-20 col-span-full flex flex-col justify-center items-center">
            <img src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold mt-4">Oops!! Sorry, There is no content here</h2>
        </div>
    `;
    hideLoader();
    return;
  }

  videos.forEach((video) => {
    console.log(video)
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[200px] object-cover"
                src="${video.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-sm text-white rounded bg-black px-2">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-5 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-500 flex gap-1">
                ${video.authors[0].profile_name} 
                    ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ``} 
                </p>
                <p class="text-sm text-gray-500">${video.others.views}</p>
              </div>
              
            </div>
            <button onclick=loadVideoDetails("${video.video_id}") class="btn btn-block">block</button>
          </div>
        `;
    // append
    videoContainer.append(videoCard);
  });
  hideLoader();
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const input = e.target.value;
  // console.log(input);
  loadVideos(input)
})

loadCategories()
