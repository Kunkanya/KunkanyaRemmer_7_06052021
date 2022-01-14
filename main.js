import classRecipe from "./classRecipe.js"
import {recipes} from "./recipes.js"
//--DOM
const inputByIngredient = document.getElementById("search_input_by_ingredient")
const showTags = document.getElementById("show_tag")
const searchInput = document.getElementById("search_input")
const tagContainers = document.querySelectorAll(".tag_container")
const errorText = document.getElementById("error")
const recipeContainer = document.getElementById("recipe_wrapper")
const resultSearch = document.getElementById("result_search")

//--variables
let ingredients = []
let arrIngredients = [] 
let appareils = []
let arrAppareils =[]
let ustensils = []
let arrUstensils =[]
let valid = false
var searchWord = ""
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
/************************************************************************* */
//--render tags
/************************************************************************* */
function renderTags(category){
    let createTag =  `${category.map(function(item){
        return  `<li class="curser tag"> ${item}</li>`
        }).join('')} `  
    return createTag
};
/************************************************************************* */
//--FUNCTION renderRecipe to create HTML for each recipe block and show in the page
/************************************************************************* */
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
/************************************************************************* */
//--FUNCTION validation :form control 
/************************************************************************* */
function inputValidation(value){ 
    
    if (value < 3 && value >0){
        errorText.innerText =""
        errorText.classList.remove("hidden")
        errorText.classList.add("error_text")
        errorText.innerText ="Veuilliez vous saisir au moins 3 caractères"
        valid = false
        return valid
    } else {
        errorText.innerText =""
        valid = true
        return valid
    }
};
/************************************************************************* */
//--FUNCTION search :Version2
/************************************************************************* */ 
function search(recipeArrays,value){
const    foundArray =  recipeArrays.filter((recipeArray) => {
        // get all the ingredients for each recipe for checking condition later
        function listIngredient(){
            let x = "" 
            recipeArray.ingredients.forEach(ingredient=>{
                x += ingredient.ingredient.toLowerCase() + ' '
                })
            return x
        }  
        // get all the ustensils for each recipe for checking condition later
        function listUstensils(){
            let y = ""
            recipeArray.ustensils.forEach(ustensil=>{
                y+= ustensil.toLowerCase()
            })
            return y
        }
        
        return recipeArray.name.toLowerCase().includes(value) ||
        recipeArray.description.toLowerCase().includes(value) ||
        listIngredient().includes(value) ||
        listUstensils().includes(value) ||
        recipeArray.appliance.toLowerCase().includes(value)
        })
    if(foundArray.length > 0){
          recipeContainer.innerHTML =""
          // call function renderRecipe to create HTML for each founded recipes
          filterIngredienst(foundArray)
          filterAppareils(foundArray)
          filterUstensils(foundArray)
          renderRecipe(foundArray)
          foundArrayTemp = foundArray
            return foundArray
        }else{
          // show no found result
          recipeContainer.innerText= "Aucune recette ne correspond à votre critère...vous puvez chercher 'tarte aux pommes', 'poisson'. etc"
        }
}
//----------------------------------------------------------------------------
//--1. Initial all RECIPE_WRAPPER SECTION- show all recipes once page loaded by calling funtion renderRecipe() 
//----------------------------------------------------------------------------
renderRecipe(recipes)
filterIngredienst(recipes)
filterAppareils(recipes)
filterUstensils(recipes)
searchInput.focus()
//----------------------------------------------------------------------------
//--2. SEARCH INPUT-DOM -- user insert eh search keyword in the searchbar
//----------------------------------------------------------------------------
searchInput.addEventListener("keyup", (e)=>{
    e.preventDefault()
    let searchStr = searchInput.value
        searchWord = searchStr.toLowerCase()
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
/************************************************************************* */
//--FUNCTION removed selected tags 
/************************************************************************* */
function removeSelectedTag(){
    const selectedTags = document.querySelectorAll(".selected_tag")
    selectedTags.forEach(selectedTag =>{
        selectedTag.addEventListener('click', (el) =>{
        el.target.remove(el.target)
//        console.log(searchWord)
            if (showTags.childElementCount == 0 && searchWord == "")
                {
                    location.reload()
            }else if(showTags.childElementCount >= 1 && searchWord == "")
                    {
                        search(recipes, showTags.childNodes[0].innerText)
                        for(let i = 1; i < showTags.childElementCount ; i++){                                        
                            search(foundArrayTemp, showTags.childNodes[i].innerText)
                        } 
                    }
            else if(searchWord)
                    {
                        search(recipes, searchWord)
                        for(let i = 0; i < showTags.childElementCount ; i++){                                        
                            search(foundArrayTemp, showTags.childNodes[i].innerText)
                        } 
                        searchInput.classList.remove("disable")
                    }
    
        })
    })
}
/************************************************************************* */
//--DROPDOWN section
/************************************************************************* */
tagContainers.forEach(tagContainer =>{

    tagContainer.addEventListener('click', (e) =>{
        e.preventDefault()
        //--close all the button if needed
        hideTag()        
    
        const tagContentsUl = tagContainer.nextElementSibling
        tagContainer.classList.add("active")
        
//*******************dropdown Ingredients****************************
        //--show all the Ingredients
        if((tagContainer.classList.contains("active") && 
            tagContainer.classList.contains("blue"))){
                //--render tag list in UL section
                tagContentsUl.classList.add("ul_active")
                tagContentsUl.innerHTML = renderTags(ingredients)
                //--add Eventlistener to each LiTag in dropdown to show under the search input

                //--show input field
                inputByIngredient.classList.remove('hidden')
                inputByIngredient.focus()         

                //--show all the tags
                callTagEvents("blue")


        //-- Case 2:first search bar in main input bar
        inputByIngredient.addEventListener('keyup', (e)=>{
            e.preventDefault()
            let searchInput = e.target.value.toLowerCase().trim()
            //--2.return the found arrays for the recipes
            const foundTags = ingredients.filter((ingredient) =>{
                    return ingredient.toLowerCase().includes(searchInput)
            })
            //--3. show result if citeria is found
            if(foundTags.length>0){
                tagContentsUl.innerHTML = renderTags(foundTags)
            } else {
                tagContentsUl.innerHTML = "Aucune ingredient ne correspond pas à votre critère"
            }
                //--show all the tags 
                callTagEvents("blue")
            })

        }   
//*******************dropdown Appareils****************************
        else if ( tagContainer.classList.contains("active") &&  
                tagContainer.classList.contains("green")){
                tagContentsUl.classList.add("ul_active")
                tagContentsUl.innerHTML = renderTags(appareils)

                //--show all the tags
                callTagEvents("green")
            
//*******************dropdown Ustensiles****************************
        }   else if ((tagContainer.classList.contains("active") && 
                    tagContainer.classList.contains("red"))){
                        tagContentsUl.classList.add("ul_active")
                        tagContentsUl.innerHTML = renderTags(ustensils)
                        callTagEvents("red")

            }

        })

})
//*******************END dropdown****************************

/************************************************************************* */
//--FUNCTION - Eventlistener for create new tags
/************************************************************************* */
function callTagEvents(color){
    

    const tagLis = document.querySelectorAll(".tag")
        tagLis.forEach(tag =>{
            tag.addEventListener('click', (e)=>{
                e.preventDefault()
                let selectedTag = e.target.innerHTML.toLowerCase()
                selectedTag = selectedTag.trim()      
                //-- once tag button is clicked => main search-input bar will be disabled
                searchInput.classList.add("disable")

                
                // check if tag is selected => thenshow tag
                if(selectedTag === ""){
                    return
                }else{
                    var p = document.createElement('p')
                    var pText = document.createTextNode(selectedTag)
                    p.appendChild(pText)
                    p.classList.add("selected_tag")
                    p.classList.add("curser")
                    p.classList.add(color)
                    showTags.appendChild(p) 
                    hideTag()
                }           
                
                //console.log(foundArrayTemp)
                    //--search trough foundarrayTemp
                if(foundArrayTemp.length === 0){
                    
                    search(recipes,selectedTag)
                    //--ADD EventListener to each selected_tag to close
                }else{
                    search(foundArrayTemp,selectedTag)
                }                    
                    //-- remove selected-tag ingredient 
            removeSelectedTag()
               })  

            })

}
/************************************************************************* */
//--FUNCTION - set back to the orginal state for all buttons
/************************************************************************* */
function hideTag(){
    tagContainers.forEach(tagContainer =>{
        inputByIngredient.classList.add("hidden")
        inputByIngredient.innerText=""
        tagContainer.classList.remove("active")
        const tagContentsUl = tagContainer.nextElementSibling
        tagContentsUl.classList.remove("ul_active")
    })
}
/************************************************************************* */
//--Event once click outside the buttons
/************************************************************************* */
const clickHtml = document.querySelectorAll("html")
clickHtml.forEach(item => {
    item.addEventListener('click', (e)=>{
        e.preventDefault()
        console.log(e.target)
        if((e.target.classList.contains("active"))||
            (e.target.classList.contains("ul_active"))){
            //alert("ok")
        }else{
            hideTag()
        }
    })    
});
