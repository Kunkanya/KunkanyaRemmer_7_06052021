import classRecipe from "./classRecipe.js"
import {recipes} from "./recipes.js"
//--DOM
const btnIngredients = document.getElementById("btn_ingredients")
const inputByIngredient = document.getElementById("search_input_by_ingredient")
const showTagIngredient = document.getElementById("show_tag_ingredient")


const searchInput = document.getElementById("search_input")
const tagContainers = document.querySelectorAll(".tag_container")
const errorText = document.getElementById("error")
const recipeContainer = document.getElementById("recipe_wrapper")
const resultSearch = document.getElementById("result_search")
const dropdownIngredients = document.getElementById("dropdownIngredients")
const dropdownAppareils = document.getElementById("dropdownAppareils")
const parentIngredient = dropdownIngredients.parentElement
const parentAppareils = dropdownAppareils.parentElement
const parentUtensiles = dropdownUtensiles.parentElement



let ingredients = []
let arrIngredients = [] 
let appareils = []
let arrAppareils =[]
let ustensiles = []
let arrUtensiles =[]
let valid = false
let selectedTag =""


//--get all Ingredients, Appareils, Ustensiles
/************************************************************************* */
/************************************************************************* */
/************************************************************************* */
/*****************check array filterIngredienst******************************************************** */
/************************************************************************* */
/************************************************************************* */
/************************************************************************* */
function filterIngredienst(arr){
    debugger
    arr.forEach(recipe =>{
        recipe.ingredients.forEach(ingredient =>{
            arrIngredients = []
            arrIngredients.push(ingredient.ingredient)
            //--filter duplicate ingredients
            console.log(arrIngredients)
            ingredients = [...new Set(arrIngredients)].sort()
            })
        })
}
/************************************************************************* */
/************************************************************************* */
/************************************************************************* */
/************************************************************************* */
/************************************************************************* */
/************************************************************************* */
/************************************************************************* */
/************************************************************************* */
/************************************************************************* */

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


tagContainers.forEach(tagContainer =>{
    tagContainer.addEventListener('click', (e) =>{

        e.preventDefault()
        tagContainer.classList.toggle("active")

        //--show all the Ingredients
        if((tagContainer.classList.contains("active") && 
            tagContainer.classList.contains("blue"))){
                //show the li list of ingredients
                parentIngredient.classList.remove("hidden")
                inputByIngredient.classList.remove("hidden")
                dropdownIngredients.innerHTML = renderTags(ingredients)
        } else {
            parentIngredient.classList.add ("hidden")
        } 
        
        //--show all the Ingredients
        if((tagContainer.classList.contains("active") && 
            tagContainer.classList.contains("green"))){
                //show the li list of ingredients
                parentAppareils.classList.remove("hidden")
                dropdownAppareils.innerHTML = renderTags(appareils)
        }else {
            parentAppareils.classList.add ("hidden")
        } 
        
         if(tagContainer.classList.contains("active" && 
        tagContainer.classList.contains("red"))){
            return 2
        }else{
            return 3
        }
    })
})


/*----------------------------------------*/
/*---------EVENTLISTENER SECTION--------- */
/*----------------------------------------*/

/*-- addEventlistener to each Li tag--*/
dropdownIngredients.addEventListener('click',(e)=>{
    selectedTag = e.target.innerHTML
    selectedTag = selectedTag.trim()
    console.log(selectedTag)
    //--show selected tag in span above the dorpdownmenu
    showTagIngredient.innerHTML = selectedTag
    showTagIngredient.classList.remove('hidden')
    showTagIngredient.classList.add('show_tag')
    showTagIngredient.classList.add('blue')
    })

showTagIngredient.addEventListener('click', ()=>{
        close()
    })

//function close selectedtag
function close(){
        showTagIngredient.classList.remove('show_tag')
        showTagIngredient.classList.add('hidden')
}

function renderTags(category){
    let createTag = ` ${category.map(function(item){
        return `<li class="curser tag_ingredient" 
                    data-${item}="${item}">
                    ${item}
                </li>`
    }).join('')}
    `  
    return createTag
}


function renderEventTag(category){
    category.addEventListener('click',(e)=>{
        e.preventDefault
        console.log(e.target)
        selectedTag = e.target.innerHTML
        selectedTag = selectedTag.trim()
        console.log(selectedTag)
        //--show selected tag in span above the dorpdownmenu
        showTagIngredient.innerHTML = selectedTag
        showTagIngredient.classList.remove('hidden')
        showTagIngredient.classList.add('show_tag')
        showTagIngredient.classList.add('blue')
        console.log(showTagIngredient)
})
}

//----------------------------------------------------------------------------
//--initial all RECIPE_WRAPPER SECTION- show all recipes once page loaded by calling funtion renderRecipe() 
//----------------------------------------------------------------------------
renderRecipe(recipes)

//--FUNCTION renderRecipe to create HTML for each recipe block and show in the page
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
}).join("")

}

//----------------------------------------------------------------------------
//--SEARCH INPUT-DOM -- user insert eh search keyword in the searchbar
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
    if(valid === false ){
        return
    }
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

//        console.log(tempRecipe)
        
        let foundItem = tempRecipe.includes(searchWord)
        if(foundItem === true) {
            let foundIndex = i
            console.log("foundItem= " + foundItem)
            resultSearch.innerHTML =""
            foundArray.push(recipes[i])
            filterIngredienst(foundArray)
        }

        if(foundArray.length > 0){
//            dropdownIngredients.innerHTML = renderTags(foundArray.ingredient)            
            recipeContainer.innerHTML =""
            // call function renderRecipe to create HTML for each founded recipes
            renderRecipe(foundArray)
        }else{
            // show no found result
            recipeContainer.innerText= "Aucune recette ne correspond à votre critère...vous puvez chercher 'tarte aux pommes', 'poisson'. etc"
        }
    }
})


//--INPUT VALIDATION 
function inputValidation(value){
   
    if (value < 3 && value >0){
        errorText.innerText =""
        errorText.classList.remove("hidden")
        errorText.classList.add("error_text")
        errorText.innerText ="Veuilliez vous saisir au moins 3 charactères"
        valid = false
        return valid
        
    } else{
        errorText.innerText =""
        valid = true
    }
}
