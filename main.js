import classRecipe from "./classRecipe.js"
import {recipes} from "./recipes.js"
//--DOM
const btnIngredients = document.getElementById("btn_ingredients")
const inputByIngredient = document.getElementById("search_input_by_ingredient")
const showTag = document.getElementById("show_tag")


const searchInput = document.getElementById("search_input")
const tagContainers = document.querySelectorAll(".tag_container")
const tagContents = document.querySelectorAll(".tag")

const errorText = document.getElementById("error")
const recipeContainer = document.getElementById("recipe_wrapper")
const resultSearch = document.getElementById("result_search")

const dropdownIngredients = document.getElementById("dropdownIngredients")
const dropdownAppareils = document.getElementById("dropdownAppareils")
const dropdownUstensils = document.getElementById("dropdownUstensils")


const parentIngredient = dropdownIngredients.parentElement
const parentAppareils = dropdownAppareils.parentElement
const parentUstensils = dropdownUstensils.parentElement



let ingredients = []
let arrIngredients = [] 
let appareils = []
let arrAppareils =[]
let ustensils = []
let arrUstensils =[]
let valid = false
let selectedTag =""
let foundArray =[]


/************************************************************************* */
//--get all Ingredients, Appareils, Ustensiles
/************************************************************************* */
function filterIngredienst(arr){
    arrIngredients=[]
    arr.forEach(recipe =>{
        recipe.ingredients.forEach(ingredient =>{
            arrIngredients.push(ingredient.ingredient)
            //--filter duplicate ingredients
            ingredients = [...new Set(arrIngredients)].sort()
            })
        })
    return ingredients            
};

function filterAppareils(arr){
    arrAppareils=[]
    arr.forEach(recipe =>{
            arrAppareils.push(recipe.appliance)
            appareils =[...new Set(arrAppareils)].sort()
        })
    return appareils            
};

function filterUstensils(arr){
    arrUstensils=[]
    arr.forEach(recipe =>{
        recipe.ustensils.forEach(ustensil =>{
            arrUstensils.push(ustensil)
            //--filter duplicate ingredients
            ustensils = [...new Set(arrUstensils)].sort()
        })
    })
    console.log(ustensils)
    return ustensils            
};

function close(){
        showTag.classList.remove('show_tag')
        showTag.classList.add('hidden')
};

function renderTags(category){
    let createTag =  `${category.map(function(item){
        return  `<li class="curser tag"> ${item}</li>`
        }).join('')} `  
    return createTag
};

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
};


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
};

//--INPUT VALIDATION 
function inputValidation(value){ 
    if (value < 3 && value >0){
        errorText.innerText =""
        errorText.classList.remove("hidden")
        errorText.classList.add("error_text")
        errorText.innerText ="Veuilliez vous saisir au moins 3 charactères"
        valid = false
        return valid
    } else {
        errorText.innerText =""
        valid = true
    }
};

/*--funciton search--*/
function search(arr, value){
    foundArray=[]
    //--2. set each recipeto one string and set to lowercase
    for(let i= 0; i < arr.length; i++){
        function listIngredient(){
            let x = "" 
            arr[i].ingredients.forEach(ingredient=>{
                x += ingredient.ingredient + ' '
                })
            return x
        }
        function listUstensils(){
            let y = ""
            arr[i].ustensils.forEach(ustensil=>{
                y+= ustensil
            })
            return y
        }
        let tempRecipe = arr[i].name + "," +
                         listIngredient() + arr[i].appareils + listUstensils()
                            
        tempRecipe = tempRecipe.toLowerCase()
        tempRecipe = tempRecipe.trim()

       //console.log(tempRecipe)
        console.log(listUstensils)
        let foundItem = tempRecipe.includes(value)
        if(foundItem === true) {
            resultSearch.innerHTML =""
            foundArray.push(arr[i])
        }
        if(foundArray.length > 0){
          //  console.log(foundArray)
            recipeContainer.innerHTML =""
            // call function renderRecipe to create HTML for each founded recipes
            filterIngredienst(foundArray)
            filterAppareils(foundArray)
            filterUstensils(foundArray)
            renderRecipe(foundArray)
        }else{
            // show no found result
            recipeContainer.innerText= "Aucune recette ne correspond à votre critère...vous puvez chercher 'tarte aux pommes', 'poisson'. etc"
        }
    }
};
//----------------------------------------------------------------------------
//--1. Initial all RECIPE_WRAPPER SECTION- show all recipes once page loaded by calling funtion renderRecipe() 
//----------------------------------------------------------------------------
renderRecipe(recipes)
filterIngredienst(recipes)
filterAppareils(recipes)
filterUstensils(recipes)
//----------------------------------------------------------------------------
//--2. SEARCH INPUT-DOM -- user insert eh search keyword in the searchbar
//----------------------------------------------------------------------------
searchInput.addEventListener("keyup", (e)=>{
    e.preventDefault
    let searchStr = searchInput.value
    let searchWord = searchStr.toLowerCase()
        searchWord = searchWord.trim()
    let searchWordLength = searchInput.value.length

    //--1. Validate the length of searchWord
    inputValidation(searchWordLength)
    if(valid === false ){
        return
    }
    //-- 2. Call function search and give the array which need to be searched with searchWord
    search(recipes, searchWord)
})

/*----------------------------------------*/
/*--3. EVENTLISTENER SECTION--------- */
/*----------------------------------------*/

/*-- addEventlistener to each Li tag--*/
dropdownIngredients.addEventListener('click',(e)=>{
    selectedTag = e.target.innerHTML
    selectedTag = selectedTag.trim()
    console.log(selectedTag)
    //--show selected tag in span above the dorpdownmenu
    showTag.innerHTML += `<p class="selected_tag blue">${selectedTag}</p>`
    showTag.classList.remove('hidden')
    //showTagIngredient.classList.add('show_tag')
    //showTagIngredient.classList.add('blue')
    })

    showTag.addEventListener('click', ()=>{
        close()
    })

/************************************************************************* */
/************************************************************************* */
tagContents.forEach(tag =>{
    tag.addEventListener('click', (e) =>{
      e.preventDefault()
        selectedTag = e.target.value
        console.log(selectedTag)
    })
})

/************************************************************************* */
/************************************************************************* */



tagContainers.forEach(tagContainer =>{
    tagContainer.addEventListener('click', (e) =>{

        e.preventDefault()
        tagContainer.classList.toggle("active")
        //--show all the Ingredients
        if((tagContainer.classList.contains("active") && 
            tagContainer.classList.contains("blue"))){
                //show the li list of ingredients
                parentIngredient.classList.remove("hidden")
                //inputByIngredient.classList.remove("hidden")
               dropdownIngredients.innerHTML = renderTags(ingredients)
        } else {
            parentIngredient.classList.add ("hidden")
        } 
        
        //--show all the appareils
        if((tagContainer.classList.contains("active") && 
            tagContainer.classList.contains("green"))){
                //show the li list of appatrils
                parentAppareils.classList.remove("hidden")
                dropdownAppareils.innerHTML = renderTags(appareils)
        }else {
            parentAppareils.classList.add ("hidden")
        } 
        
        //--show all the ustensils
        if((tagContainer.classList.contains("active") && 
           tagContainer.classList.contains("red"))){
                //show the li list of ustensils
                parentUstensils.classList.remove("hidden")
                dropdownUstensils.innerHTML = renderTags(ustensils)
        }else{
            parentUstensils.classList.add ("hidden")
        }
    })
});


