function loadCategories(){
    // console.log("category is loading")
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    // .then((data) => console.log(data))
    // .then((data) => console.log(data.categories))
    // .then((data) => console.log(data.categories))
    .then((data) => displayCategories(data.categories))
}

function loadVideos(){
    fetch()
}

// {category_id: '1001', category: 'Music'}

function displayCategories(categories){
    // console.log(categories)
    // get the container
    const categoryContainer = document.getElementById("category-container");

    //loop operation on Array of object 
    for (let cat of categories){
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
loadCategories()