/// <reference types="../@types/jquery"/>

$(document).ready(() => {
    homeData("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})


async function homeData(term) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let response = await api.json()
    displayHomeData(response.meals)
}

function displayHomeData(data) {
    let cartona = ""
    for (let index = 0; index < data.length; index++) {
        cartona += `
                    <div class="col-md-3">
                        <div class="content rounded-2 position-relative" onclick="showDetails(${data[index].idMeal})">
                            <img src="${data[index].strMealThumb}" class="w-100 rounded-2" alt="">
                            <div
                                class="caption position-absolute bottom-0 rounded-2 d-flex justify-content-center align-items-center">
                                <h3>${data[index].strMeal}</h3>
                            </div>
                        </div>
                    </div>
    `
    }

    document.getElementById("mealsContainer").innerHTML = cartona
}

function showDetails(data) {
    getMealsDetails(data)
}

async function getMealsDetails(id) {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
    displayDetails(response.meals[0])
    $(".loading-screen").fadeOut(300)
}



function displayDetails(data) {
    let ingredients = ""
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    let cartona = ``

    cartona += `

        <div class="col-md-4">
                    <img src="${data.strMealThumb}" class="w-100 rounded-2" alt="">
                    <h2 class="text-white">${data.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2 class="text-white">Instructions</h2>
                    <p class="text-white">${data.strInstructions}</p>
                    <h3 class="text-white">Area : ${data.strArea}</h3>
                    <h3 class="text-white">Category : ${data.strCategory}</h3>
                    <h3 class="text-white">Recipes :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${ingredients}
                    </ul>
                    <h3 class="text-white">Tags :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>

    `
    document.getElementById("mealsContainer").innerHTML = cartona
}

function openSideNavBar() {
    $("#openSideNavBar").on("click", function () {
        $("#sideNavBar").animate({ left: 0 }, 500)
        $("#openSideNavBar").fadeOut(100)
        $("#CloseSideNavBar").fadeIn(100)
        for (let i = 0; i < 5; i++) {
            $(".links li").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }
    })
}


openSideNavBar()

function closeSideNavBar() {
    $("#CloseSideNavBar").on("click", function () {
        $("#sideNavBar").animate({ left: -257.594 }, 500)
        $("#openSideNavBar").fadeIn(100)
        $("#CloseSideNavBar").fadeOut(100)
        $(".links li").animate({
            top: 300
        }, 500)
    })
}

closeSideNavBar()

$(".search").on("click", function () {
    $("#sideNavBar").animate({ left: -257.594 }, 500)
    $("#openSideNavBar").fadeIn(100)
    $("#CloseSideNavBar").fadeOut(100)
    $(".homeSection").addClass("d-none")
    $("#category").addClass("d-none")
    $("#contact").addClass("d-none")
    $("#categoryMeals").addClass("d-none")
    $("#area").addClass("d-none")
    $("#ingredients").addClass("d-none")
    $("#search").removeClass("d-none")
    $(".form").removeClass("d-none")
})

function searchByName(valueInput) {
    $("#searchByNameContainer").removeClass("d-none")
    getDataSearchByName(valueInput)
}

async function getDataSearchByName(mealName) {
    $(".loading-screen").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    let response = await api.json()
    displaySearchByName(response.meals);
    $(".loading-screen").fadeOut(300)
}

function displaySearchByName(data) {
    let cartona = ""
    for (let index = 0; index < data.length; index++) {
        cartona += `
                    <div class="col-md-3">
                        <div class="content rounded-2 position-relative" onclick="showSearchByNameDetails(${data[index].idMeal})">
                            <img src="${data[index].strMealThumb}" class="w-100 rounded-2" alt="">
                            <div
                                class="caption position-absolute bottom-0 rounded-2 d-flex justify-content-center align-items-center">
                                <h3>${data[index].strMeal}</h3>
                            </div>
                        </div>
                    </div>
    `
    }

    document.getElementById("searchByNameContainer").innerHTML = cartona
}

function showSearchByNameDetails(id) {
    $(".form").addClass("d-none")
    getSearchByNameMealsDetails(id)
}

async function getSearchByNameMealsDetails(id) {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
    displaySearchByNameDetails(response.meals[0])
    $(".loading-screen").fadeOut(300)
}



function displaySearchByNameDetails(data) {
    let ingredients = ""
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    let cartona = ``

    cartona += `

        <div class="col-md-4">
                    <img src="${data.strMealThumb}" class="w-100 rounded-2" alt="">
                    <h2 class="text-white">${data.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2 class="text-white">Instructions</h2>
                    <p class="text-white">${data.strInstructions}</p>
                    <h3 class="text-white">Area : ${data.strArea}</h3>
                    <h3 class="text-white">Category : ${data.strCategory}</h3>
                    <h3 class="text-white">Recipes :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${ingredients}
                    </ul>
                    <h3 class="text-white">Tags :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>

    `
    document.getElementById("searchByNameContainer").innerHTML = cartona
}

function searchByFirstLetter(valueInput) {
    getDataSearchByFirstLetter(valueInput)
}
async function getDataSearchByFirstLetter(mealFirstLetter) {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealFirstLetter}`)
    response = await response.json()
    displaySearchByFLeeter(response.meals);
    $(".loading-screen").fadeOut(300)
}

function displaySearchByFLeeter(data) {
    let cartona = ""
    for (let index = 0; index < data.length; index++) {
        cartona += `
                    <div class="col-md-3">
                        <div class="content rounded-2 position-relative" onclick="showSearchByNameDetails(${data[index].idMeal})">
                            <img src="${data[index].strMealThumb}" class="w-100 rounded-2" alt="">
                            <div
                                class="caption position-absolute bottom-0 rounded-2 d-flex justify-content-center align-items-center">
                                <h3>${data[index].strMeal}</h3>
                            </div>
                        </div>
                    </div>
    `
    }
    document.getElementById("searchByNameContainer").innerHTML = cartona
}

function showSearchByFLetterDetails(data) {
    $(".form").addClass("d-none")
    getSearchByFLetterMealsDetails(data)
}

async function getSearchByFLetterMealsDetails(id) {
    $(".loading-screen").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let response = await api.json()
    displaySearchByFLetterDetails(response.meals[0])
    $(".loading-screen").fadeOut(300)
}

function displaySearchByFLetterDetails(data) {
    let ingredients = ""
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    let cartona = ``

    cartona += `

        <div class="col-md-4">
                    <img src="${data.strMealThumb}" class="w-100 rounded-2" alt="">
                    <h2 class="text-white">${data.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2 class="text-white">Instructions</h2>
                    <p class="text-white">${data.strInstructions}</p>
                    <h3 class="text-white">Area : ${data.strArea}</h3>
                    <h3 class="text-white">Category : ${data.strCategory}</h3>
                    <h3 class="text-white">Recipes :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${ingredients}
                    </ul>
                    <h3 class="text-white">Tags :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>

    `
    document.getElementById("searchByNameContainer").innerHTML = cartona
}

$(".category").on("click", function () {
    $(".homeSection").addClass("d-none")
    $("#search").addClass("d-none")
    $("#category").removeClass("d-none")
    $("#categoryMeals").addClass("d-none")
    $("#area").addClass("d-none")
    $("#contact").addClass("d-none")
    $("#ingredients").addClass("d-none")
    $("#sideNavBar").animate({ left: -257.594 }, 500)
    $("#openSideNavBar").fadeIn(100)
    $("#CloseSideNavBar").fadeOut(100)
    getCategories()

})

async function getCategories() {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)
    $(".loading-screen").fadeOut(300)
}

function displayCategories(data) {
    let cartona = ""

    for (let i = 0; i < data.length; i++) {
        cartona += `
        
            <div class="col-md-3">
        <div class="content position-relative" onclick="showMealsCategory('${data[i].strCategory}')">
            <img src="${data[i].strCategoryThumb}" class="w-100 rounded-2" alt = "">
            <div
        class="caption position-absolute bottom-0 rounded-2" >
                <h3 class="text-center pt-2">${data[i].strCategory}</h3>
                <p class="text-center">${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div >
    </div >


            `
    }
    document.getElementById("categoriesContainer").innerHTML = cartona
}

function showMealsCategory(categoryName) {
    $("#category").addClass("d-none")
    $("#categoryMeals").removeClass("d-none")
    getMealsCategory(categoryName)
}

async function getMealsCategory(category) {
    $(".loading-screen").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    api = await api.json()
    displayMealsCategory(api.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)
}

function displayMealsCategory(data) {
    let content = ``
    for (let index = 0; index < data.length; index++) {
        content += `
        <div class="col-md-3" onclick="showMealsCategoryDetails(${data[index].idMeal})">
                        <div class="content rounded-2 position-relative">
                            <img src="${data[index].strMealThumb}" class="w-100 rounded-2" alt="">
                            <div
                                class="caption position-absolute bottom-0 rounded-2 d-flex justify-content-center align-items-center">
                                <h3 class="text-center">${data[index].strMeal}</h3>
                            </div>
                        </div>
                    </div>
        
        `
    }
    document.getElementById("categoryMealsContainer").innerHTML = content
}


function showMealsCategoryDetails(id) {
    getMealsCategoryDetails(id)
}


async function getMealsCategoryDetails(id) {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
    displayMealsCategoryDetails(response.meals[0])
    $(".loading-screen").fadeOut(300)
}




function displayMealsCategoryDetails(data) {
    let ingredients = ""
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    let cartona = ``

    cartona += `

        <div class="col-md-4">
                    <img src="${data.strMealThumb}" class="w-100 rounded-2" alt="">
                    <h2 class="text-white">${data.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2 class="text-white">Instructions</h2>
                    <p class="text-white">${data.strInstructions}</p>
                    <h3 class="text-white">Area : ${data.strArea}</h3>
                    <h3 class="text-white">Category : ${data.strCategory}</h3>
                    <h3 class="text-white">Recipes :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${ingredients}
                    </ul>
                    <h3 class="text-white">Tags :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>

    `
    document.getElementById("categoryMealsContainer").innerHTML = cartona
}

$(".area").on("click", function () {
    $(".homeSection").addClass("d-none")
    $("#search").addClass("d-none")
    $("#category").addClass("d-none")
    $("#categoryMeals").addClass("d-none")
    $("#ingredients").addClass("d-none")
    $("#contact").addClass("d-none")
    $("#area").removeClass("d-none")
    $("#sideNavBar").animate({ left: -257.594 }, 500)
    $("#openSideNavBar").fadeIn(100)
    $("#CloseSideNavBar").fadeOut(100)
    showArea()
})

function showArea() {
    getArea()
}

async function getArea() {
    $(".loading-screen").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response = await api.json()
    displayArea(response.meals)
    $(".loading-screen").fadeOut(300)
}

function displayArea(data) {
    let cartona = ""
    for (let i = 0; i < data.length; i++) {
        cartona += `
         <div class="col-md-3">
                        <div onclick="getAreaMeals('${data[i].strArea}')" class="content ms-5 ps-5 position-relative">
                        <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                        <h3 class="text-white header">${data[i].strArea}</h3>
                        </div>
                    </div>
        
        `
    }
    document.getElementById("areaContainer").innerHTML = cartona
}

async function getAreaMeals(area) {
    $(".loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()

    displayAreaMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)

}

function displayAreaMeals(data) {
    let cartona = ``
    for (let index = 0; index < data.length; index++) {
        cartona += `
                    <div class="col-md-3">
                        <div class="content rounded-2 position-relative" onclick="showAreaDetails(${data[index].idMeal})">
                            <img src="${data[index].strMealThumb}" class="w-100 rounded-2" alt="">
                            <div
                                class="caption position-absolute bottom-0 rounded-2 d-flex justify-content-center align-items-center">
                                <h3 class="text-center">${data[index].strMeal}</h3>
                            </div>
                        </div>
                    </div>
    `
    }
    document.getElementById("areaContainer").innerHTML = cartona
}

function showAreaDetails(data) {
    getAreaMealsDetails(data)
}

async function getAreaMealsDetails(id) {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
    displayAreaDetails(response.meals[0])
    $(".loading-screen").fadeOut(300)
}


function displayAreaDetails(data) {
    let ingredients = ""
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    let cartona = ``

    cartona += `

        <div class="col-md-4">
                    <img src="${data.strMealThumb}" class="w-100 rounded-2" alt="">
                    <h2 class="text-white">${data.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2 class="text-white">Instructions</h2>
                    <p class="text-white">${data.strInstructions}</p>
                    <h3 class="text-white">Area : ${data.strArea}</h3>
                    <h3 class="text-white">Category : ${data.strCategory}</h3>
                    <h3 class="text-white">Recipes :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${ingredients}
                    </ul>
                    <h3 class="text-white">Tags :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>

    `
    document.getElementById("areaContainer").innerHTML = cartona
}

$(".ingredients").on("click", function () {
    $(".homeSection").addClass("d-none")
    $("#search").addClass("d-none")
    $("#category").addClass("d-none")
    $("#categoryMeals").addClass("d-none")
    $("#area").addClass("d-none")
    $("#contact").addClass("d-none")
    $("#ingredients").removeClass("d-none")
    $("#sideNavBar").animate({ left: -257.594 }, 500)
    $("#openSideNavBar").fadeIn(100)
    $("#CloseSideNavBar").fadeOut(100)
    showIngredients()
})

function showIngredients() {
    getIngredients()
}

async function getIngredients() {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    displayIngredients(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)
}

function displayIngredients(data) {
    let cartona = ""
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="content rounded-2 text-center">
                        <i class="text-white fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="text-white">${data[i].strIngredient}</h3>
                        <p class="text-white">${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        
        `
    }
    document.getElementById("ingredientsContainer").innerHTML = cartona
}

async function getIngredientsMeals(ingredientName) {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
    response = await response.json()
    displayIngredientsMeals(response.meals.slice(0, 20))
    $(".loading-screen").fadeOut(300)
}


function displayIngredientsMeals(data) {
    let cartona = ""
    for (let index = 0; index < data.length; index++) {
        cartona += `
                    <div class="col-md-3">
                        <div onclick="showIngredientsMealsDetails(${data[index].idMeal})" class="content rounded-2 position-relative">
                            <img src="${data[index].strMealThumb}" class="w-100 rounded-2" alt="">
                            <div
                                class="caption position-absolute bottom-0 rounded-2 d-flex justify-content-center align-items-center">
                                <h3 class="text-center">${data[index].strMeal}</h3>
                            </div>
                        </div>
                    </div>
    `
    }

    document.getElementById("ingredientsContainer").innerHTML = cartona
}

function showIngredientsMealsDetails(data) {
    getIngredientsMealsDetails(data)
}

async function getIngredientsMealsDetails(id) {
    $(".loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
    displayIngredientsMealsDetails(response.meals[0])
    $(".loading-screen").fadeOut(300)
}


function displayIngredientsMealsDetails(data) {
    let ingredients = ""
    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    let cartona = ``

    cartona += `

        <div class="col-md-4">
                    <img src="${data.strMealThumb}" class="w-100 rounded-2" alt="">
                    <h2 class="text-white">${data.strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2 class="text-white">Instructions</h2>
                    <p class="text-white">${data.strInstructions}</p>
                    <h3 class="text-white">Area : ${data.strArea}</h3>
                    <h3 class="text-white">Category : ${data.strCategory}</h3>
                    <h3 class="text-white">Recipes :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${ingredients}
                    </ul>
                    <h3 class="text-white">Tags :</h3>
                    <ul class="d-flex ps-0 g-3 flex-wrap">
                    ${tagsStr}
                    </ul>
                    <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>

    `
    document.getElementById("ingredientsContainer").innerHTML = cartona
}


$(".contact").on("click", function () {
    $("#sideNavBar").animate({ left: -257.594 }, 500)
    $("#openSideNavBar").fadeIn(100)
    $("#CloseSideNavBar").fadeOut(100)
    $(".homeSection").addClass("d-none")
    $("#search").addClass("d-none")
    $("#category").addClass("d-none")
    $("#categoryMeals").addClass("d-none")
    $("#area").addClass("d-none")
    $("#ingredients").addClass("d-none")
    $("#contact").removeClass("d-none")
    showContact()
})

let submitBtn;

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function showContact() {
    document.getElementById("contactContainer").innerHTML = `
    
                   <div class="col-md-6">
    <input type="text" id="nameInput" onkeyup="inputsValidation()" class="form-control"
        placeholder="Enter Your Name">
    <div id="nameAlert" class="d-none alert alert-danger w-100 mt-2">
        Special characters and numbers not allowed
    </div>
</div>
<div class="col-md-6">
    <input type="email" id="emailInput" onkeyup="inputsValidation()" class="form-control"
        placeholder="Enter Your Email">
    <div id="emailAlert" class="d-none alert alert-danger w-100 mt-2">
        Email not valid *exemple@yyy.zzz
    </div>
</div>
<div class="col-md-6">
    <input type="text" id="phoneInput" onkeyup="inputsValidation()" class="form-control"
        placeholder="Enter Your Phone">
    <div id="phoneAlert" class="d-none  alert alert-danger w-100 mt-2">
        Enter valid Phone Number
    </div>
</div>
<div class="col-md-6">
    <input type="number" id="ageInput" onkeyup="inputsValidation()" class="form-control"
        placeholder="Enter Your age">
    <div id="ageAlert" class="d-none alert alert-danger w-100 mt-2">
        Enter valid age
    </div>
</div>
<div class="col-md-6 position-relative">
    <input type="password" onkeyup="inputsValidation()" id="passwordInput" class="form-control"
        placeholder="Enter Your Password">    
    <div id="passwordAlert" class="d-none  alert alert-danger w-100 mt-2">
        Enter valid password *Minimum eight characters, at least one letter and one number:*
    </div>
</div>
<div class="col-md-6">
    <input type="password" onkeyup="inputsValidation()" id="repasswordInput" class="form-control"
        placeholder="Repassword">
    <div id="repasswordAlert" class="d-none alert alert-danger w-100 mt-2">
        Enter valid repassword
    </div>
</div>
    <div class="col-md-6 m-auto">
            <button class="btn btn-outline-success w-auto mt-4 me-2" id="showPasswordBtn" disabled onclick="showPassword()">Show Password</button>
        <button onclick="hidePassword()" class="d-none me-2 btn btn-outline-info w-auto mt-4" id="hidePasswordBtn">Hide password</button>
            <button onclick="getDataUser()" class="btn btn-outline-primary w-auto mt-4" id="submitBtn" disabled>Submit</button>
    </div>
    `
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
    submitBtn = document.getElementById("submitBtn")
}

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
            $("#showPasswordBtn").removeAttr("disabled")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
            $("#showPasswordBtn").removeAttr("disabled")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
            $("#showPasswordBtn").removeAttr("disabled")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
            $("#showPasswordBtn").removeAttr("disabled")
        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

function showPassword() {
    $("#passwordInput").attr("type", "text")
    $("#repasswordInput").attr("type", "text")
    $("#hidePasswordBtn").removeClass("d-none")
    $("#showPasswordBtn").addClass("d-none")
}

function hidePassword() {
    $("#passwordInput").attr("type", "password")
    $("#repasswordInput").attr("type", "password")
    $("#hidePasswordBtn").addClass("d-none")
    $("#showPasswordBtn").removeClass("d-none")
}
let users = []
function getDataUser() {
    let user = {
        name: document.getElementById("nameInput").value,
        email: document.getElementById("emailInput").value,
        phone: document.getElementById("phoneInput").value,
        age: document.getElementById("ageInput").value,
        password: document.getElementById("passwordInput").value,
        repassword: document.getElementById("repasswordInput").value,
    }
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users))
    clearInputs()
}

function clearInputs() {
    document.getElementById("nameInput").value = ""
    document.getElementById("emailInput").value = ""
    document.getElementById("phoneInput").value = ""
    document.getElementById("ageInput").value = ""
    document.getElementById("passwordInput").value = ""
    document.getElementById("repasswordInput").value = ""
}