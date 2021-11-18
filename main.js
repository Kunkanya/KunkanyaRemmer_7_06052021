import classRecipe from "./classRecipe.js"
import {recipes} from "./recipes.js"
//--DOM
const btnIngredients = document.getElementById("searchByIngredients")
const tagIngredients = document.getElementById("dropdownIngredients")
const searchInput = document.getElementById("search_input")
const tagContainers = document.querySelectorAll("tag_container")

let ingredients = []
let arrIngredients = [] 
let appareils = []
let arrAppareils =[]
let ustensiles = []
let arrUtensiles =[]

//--get all Ingredients, Appareils, Ustensiles
recipes.forEach(recipe =>{
    recipe.ingredients.forEach(ingredient =>{
        arrIngredients.push(ingredient.ingredient)
        //--filter duplicate ingredients
        ingredients = [...new Set(arrIngredients)].sort()
        })

        //--get and filter duplicate appareils 
        arrAppareils.push(recipe.appliance)
        appareils =[...new Set(arrAppareils)].sort()
  
    //--get and filter duplicate ustensiles
    recipe.ustensils.forEach(ustensil =>{
        arrUtensiles.push(ustensil)
        ustensiles =[...new Set(arrUtensiles)].sort()    
    })
})
console.log(ingredients)
console.log(appareils)
console.log(ustensiles)

//tagContainers.forEach(tagContainer =>{
//    tagContainer.addEventListener("click", ()=>{
//        alert("hello")
//    })
//})



btnIngredients.addEventListener('click', ()=>{
    let selectedTag
    let parent = tagIngredients.parentElement
    const showTag = btnIngredients.previousElementSibling
    // Toggle class of "active"
    btnIngredients.classList.toggle("active")
    //let tempInput = document.createElement("input")
    //tempInput.setAttribute("type","text")
    //tempInput.setAttribute("placeholder","Rechercher un ingédient")
    //tempInput.classList.add("temp_input")


    if(btnIngredients.classList.contains("active")){
        //btnIngredients.insertAdjacentElement("beforebegin",tempInput)

        parent.classList.remove("hidden")
        tagIngredients.innerHTML = `  
        ${ingredients.map(function(ingredient){
            return `<li class="curser tag_ingredient" 
                        data-ingredient="${ingredient}">
                        ${ingredient}
                    </li>`
        }).join('')}
        `  
        //--get data when click the ingredient
        tagIngredients.addEventListener('click',(e)=>{
            e.preventDefault
            selectedTag = e.target.innerHTML
            selectedTag = selectedTag.trim()
            console.log(selectedTag)
            //--show selected tag in span above the dorpdownmenu
            showTag.innerHTML = selectedTag
            showTag.classList.add('show')
            console.log(showTag)
        })
    } else{
        parent.classList.add("hidden")
        showTag.classList.remove('show')       
        showTag.innerHTML =""
    }
})
//----------------------------------------------------------------------------
//--RECIPE_WRAPPER SECTION
//----------------------------------------------------------------------------
recipes.map(function(recipe){
    let showRecipe = new classRecipe(
        recipe.name,
        recipe.servings,
        recipe.time,
        recipe.ingredients, //array of ingredients
        recipe.description,
        recipe.appliance,
        recipe.ustensils,
    )
    showRecipe.createRecipe()
}).join("")

//----------------------------------------------------------------------------
//--SEARCH INPUT-DOM
//----------------------------------------------------------------------------
searchInput.addEventListener("keyup", (e)=>{
    e.preventDefault
    let searchWord = searchInput.value
    console.log(searchWord)
    if (searchWord.lenght < 3){
        console.log("more")
    }
})
