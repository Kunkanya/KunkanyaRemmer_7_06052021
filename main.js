import classRecipe from "./classRecipe.js"
import {recipes} from "./recipes.js"
//--DOM
const btnIngredients = document.getElementById("searchByIngredients")
const tagIngredients = document.getElementById("dropdownIngredients")
const searchInput = document.getElementById("search_input")
const tagContainers = document.querySelectorAll("tag_container")
const errorText = document.getElementById("error")
const recipeContainer = document.getElementById("recipe_wrapper")


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
//--initial all RECIPE_WRAPPER SECTION
//----------------------------------------------------------------------------

renderRecipe(recipes)


//--FUNCTION renderRecipe
function renderRecipe(arrRecipe){
    arrRecipe.map(function(recipe){
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
    //showRecipe.concatenateString()
}).join("")

}

//----------------------------------------------------------------------------
//--SEARCH INPUT-DOM
//----------------------------------------------------------------------------
searchInput.addEventListener("keyup", (e)=>{
    e.preventDefault
    let searchStr = searchInput.value
    let searchWord = searchStr.toLowerCase()
        searchWord = searchWord.trim()
    let searchWordLength = searchInput.value.length
    let foundArray =[]

    //--1. Validate the length of searchWord
    inputValidation(searchWordLength)

    //--2. set each recipeto one string and set to lowercase
    for(let i= 0; i < recipes.length; i++){
        function listIngredient(){
            let x = "" 
            recipes[i].ingredients.forEach(ingredient=>{
                x += ingredient.ingredient + ' '
                })
            return x
        }

        let tempRecipe = recipes[i].name + "," +
                         listIngredient() 
                            
        tempRecipe = tempRecipe.toLowerCase()
        tempRecipe = tempRecipe.trim()
        
        let foundItem = tempRecipe.includes(searchWord)
        
        if(foundItem === true) {
        let founDIndex = i
            console.log (recipes[i].name + " " + tempRecipe + " has index of " + founDIndex)
            foundArray.push(recipes[i])
        }
    }
    recipeContainer.innerHTML =""
    renderRecipe(foundArray)

})

//--INPUT VALIDATION 
function inputValidation(value){
    let valid = false
    if (value <= 3 && value > 0 ){
        errorText.innerText =""
        errorText.classList.remove("hidden")
        errorText.classList.add("error_text")
        errorText.innerText ="Veuilliez vous saisir au moins 3 charactors"
        valid = false 
        return
    } else{
        errorText.innerText =""
        valid = true    
    }
}