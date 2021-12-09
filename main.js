import classRecipe from "./classRecipe.js"
import {recipes} from "./recipes.js"
//--DOM
const btnIngredients = document.getElementById("btn_ingredients")
const inputByIngredient = document.getElementById("search_input_by_ingredient")
const showTags = document.getElementById("show_tag")


const searchInput = document.getElementById("search_input")
const tagContainers = document.querySelectorAll(".tag_container")
const tagLi = document.querySelectorAll(".tag")

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
var foundArray =[]
var foundArrayTemp = []


/************************************************************************* */
//--get all Ingredients, Appareils, Ustensiles
/************************************************************************* */
function filterIngredienst(arr){
    arrIngredients=[]
    arr.forEach(recipe =>{
        recipe.ingredients.forEach(ingredient =>{
            arrIngredients.push(ingredient.ingredient.toLowerCase())
            //--filter duplicate ingredients
            ingredients = [...new Set(arrIngredients)].sort()
            })
        })
    return ingredients            
};

function filterAppareils(arr){
    arrAppareils=[]
    arr.forEach(recipe =>{
            arrAppareils.push(recipe.appliance.toLowerCase())
            appareils =[...new Set(arrAppareils)].sort()
        })
    return appareils            
};

function filterUstensils(arr){
    arrUstensils=[]
    arr.forEach(recipe =>{
        recipe.ustensils.forEach(ustensil =>{
            arrUstensils.push(ustensil.toLowerCase())
            //--filter duplicate ingredients
            ustensils = [...new Set(arrUstensils)].sort()
        })
    })
    return ustensils            
};

function close(){
        showTags.classList.remove('show_tag')
        showTags.classList.add('hidden')
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

function search(arr, value){
    foundArray = []
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
        //-- put the name + all in redient + description in to one tempRecipe  for searching
        let tempRecipe = arr[i].name + " , " +
                         listIngredient() + " , " + 
                         arr[i].description + " , " + 
                         arr[i].appliance + " , " +
                         listUstensils()
                            
        tempRecipe = tempRecipe.toLowerCase()
        tempRecipe = tempRecipe.trim()
        //console.log(tempRecipe)
        let foundItem = tempRecipe.includes(value)
        if(foundItem === true) {
            resultSearch.innerHTML =""
            foundArray.push(arr[i])      
        }
        if(foundArray.length || foundArrayTemp.length > 0){
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
    foundArrayTemp = foundArray
    //
    return foundArrayTemp
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

/*------3. EVENTLISTENER SECTION--------- */
/*----------------------------------------*/
/*--AddEventlistner for each button Ingredients, appareils and Ustensiles--*/
tagContainers.forEach(tagContainer =>{
    tagContainer.addEventListener('click', (e) =>{
        e.preventDefault()
        tagContainer.classList.toggle("active")
//*******************dropdown Ingredients****************************
//--show all the Ingredients
        if((tagContainer.classList.contains("active") && 
            tagContainer.classList.contains("blue"))){
                //show the li list of ingredients
                parentIngredient.classList.remove("hidden")
                //inputByIngredient.classList.remove("hidden")
                dropdownIngredients.innerHTML = renderTags(ingredients)
                //--add Eventlistener to each LiTag in dropdown to show under the search input
                const tagLis = document.querySelectorAll(".tag")
                tagLis.forEach(tag =>{
                    tag.addEventListener('click', (e)=>{
                        e.preventDefault()
                        let selectedTagIngredient = e.target.innerHTML.toLowerCase()
                        selectedTagIngredient = selectedTagIngredient.trim()

                        console.log(selectedTagIngredient)
                            var p = document.createElement('p')
                            var pText = document.createTextNode(selectedTagIngredient)
                            p.appendChild(pText)
                            p.classList.add("selected_tag")
                            p.classList.add("blue")
                            showTags.appendChild(p) 
                        //--search trough foundarrayTemp
                        if(foundArrayTemp.length === 0){
                            search(recipes,selectedTagIngredient)
                            //--ADD EventListener to each selected_tag to close
                        }else{
                            search(foundArrayTemp,selectedTagIngredient)
                        }
                    
                            //-- remove selected-tag ingredient 
                            const selectedTags = document.querySelectorAll(".selected_tag")
                            selectedTags.forEach(selectedTag =>{
                                selectedTag.addEventListener('click', (el) =>{
                                debugger
                                el.target.remove(el.target)
                            })
                        })
                    })
                })
            } else {
                parentIngredient.classList.add ("hidden")
        } 
//*******************END dropdown Ingredients****************************
        
//*******************Start dropdown Appareils****************************
        //--show all the appareils
        if((tagContainer.classList.contains("active") && 
            tagContainer.classList.contains("green"))){
                //show the li list of appatrils
                parentAppareils.classList.remove("hidden")
                dropdownAppareils.innerHTML = renderTags(appareils)

                //--add Eventlistener to each LiTag in dropdown to show under the search input
                const tagLis = document.querySelectorAll(".tag")
                tagLis.forEach(tag =>{
                    tag.addEventListener('click', (e)=>{
                        e.preventDefault()
                        let selectedTagIngredient = e.target.innerHTML.toLowerCase()
                        selectedTagIngredient = selectedTagIngredient.trim()

                        console.log(selectedTagIngredient)
                            var p = document.createElement('p')
                            var pText = document.createTextNode(selectedTagIngredient)
                            p.appendChild(pText)
                            p.classList.add("selected_tag")
                            p.classList.add("green")
                            showTags.appendChild(p) 
                        //--search trough foundarrayTemp
                        debugger
                        if(foundArrayTemp.length === 0){
                            search(recipes,selectedTagIngredient)
                            //--ADD EventListener to each selected_tag to close
                        }else{
                            search(foundArrayTemp,selectedTagIngredient)
                        }
                    
                            //-- remove selected-tag ingredient 
                            const selectedTags = document.querySelectorAll(".selected_tag")
                            selectedTags.forEach(selectedTag =>{
                                selectedTag.addEventListener('click', (el) =>{
                                debugger
                                el.target.remove(el.target)
                            })
                        })
                    })
                })
            }else {
            parentAppareils.classList.add ("hidden")
        } 
        
        //--show all the ustensils
        if((tagContainer.classList.contains("active") && 
           tagContainer.classList.contains("red"))){
                //show the li list of ustensils
                parentUstensils.classList.remove("hidden")
                dropdownUstensils.innerHTML = renderTags(ustensils)
                //--add Eventlistener to each LiTag in dropdown to show under the search input
                const tagLis = document.querySelectorAll(".tag")
                tagLis.forEach(tag =>{
                    tag.addEventListener('click', (e)=>{
                        e.preventDefault()
                        let selectedTagIngredient = e.target.innerHTML.toLowerCase()
                        selectedTagIngredient = selectedTagIngredient.trim()

                        console.log(selectedTagIngredient)
                            var p = document.createElement('p')
                            var pText = document.createTextNode(selectedTagIngredient)
                            p.appendChild(pText)
                            p.classList.add("selected_tag")
                            p.classList.add("red")
                            showTags.appendChild(p) 
                        //--search trough foundarrayTemp
                        debugger
                        if(foundArrayTemp.length === 0){
                            search(recipes,selectedTagIngredient)
                            //--ADD EventListener to each selected_tag to close
                        }else{
                            search(foundArrayTemp,selectedTagIngredient)
                        }
                    
                            //-- remove selected-tag ingredient 
                            const selectedTags = document.querySelectorAll(".selected_tag")
                            selectedTags.forEach(selectedTag =>{
                                selectedTag.addEventListener('click', (el) =>{
                                debugger
                                console.log(showTags.childElementCount)
                                el.target.remove(el.target)
                                reloadRecipe()
                            })
                        })
                    })
                })
        }else{
            parentUstensils.classList.add ("hidden")
        }
    })
});

  


/*--funciton search--*/
function search_option2(recipeArrays,value){
    const foundArray =  recipeArrays.filter((recipeArray) => {
        // get all the ingredients for each recipe for checking condition later
        function listIngredient(){
            let x = "" 
            recipeArray.ingredients.forEach(ingredient=>{
                x += ingredient.ingredient + ' '
                })
                console.log(x)
            return x
        }  
        return recipeArray.name.toLowerCase().includes(value) ||
        recipeArray.description.toLowerCase().includes(value) ||
        listIngredient().includes(value)
    })
    console.log(foundArray)
    if(foundArray.length > 0){
        //  console.log(foundArray)
          recipeContainer.innerHTML =""
          // call function renderRecipe to create HTML for each founded recipes
          filterIngredienst(foundArray)
          filterAppareils(foundArray)
          filterUstensils(foundArray)
          renderRecipe(foundArray)
          return foundArray
        }else{
          // show no found result
          recipeContainer.innerText= "Aucune recette ne correspond à votre critère...vous puvez chercher 'tarte aux pommes', 'poisson'. etc"
      }
}
/*----------------------------------------*/

function reloadRecipe(){
    if (showTags.childElementCount === 0){
        location.reload()
    } 
}