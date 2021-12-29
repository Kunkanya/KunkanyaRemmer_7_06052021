import classRecipe from "./classRecipe.js"
import {recipes} from "./recipes.js"
//--DOM
const btnIngredients = document.getElementById("btn_ingredients")
const inputByIngredient = document.getElementById("search_input_by_ingredient")
const showTags = document.getElementById("show_tag")

const inputIngredient = document.getElementById("input_ingredient")
const tags = document.getElementById("listid")
const tagLis = document.querySelectorAll(".tag")
   

const searchInput = document.getElementById("search_input")
const tagContainers = document.querySelectorAll(".tag_container")
const dropdownArrow = document.querySelectorAll(".fa-angle-down")

const errorText = document.getElementById("error")
const recipeContainer = document.getElementById("recipe_wrapper")
const resultSearch = document.getElementById("result_search")


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
let selectedTagArray=[]


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

function renderTags(category){
    let createTag =  `${category.map(function(item){
        return  `<li class="curser tag"> ${item}</li>`
        }).join('')} `  
    return createTag
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
    //--2. set each recipe to one string and set to lowercase
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
        let foundItemBoolean = tempRecipe.includes(value)
        if(foundItemBoolean === true) {
            resultSearch.innerHTML =""
            foundArray.push(arr[i])      
        }
    }
    //--cehck if something in found array
    if(foundArray.length || foundArrayTemp.length > 0){
        recipeContainer.innerHTML =""
        // call function renderRecipe to create HTML for each founded recipes
        filterIngredienst(foundArray)
        filterAppareils(foundArray)
        filterUstensils(foundArray)
        renderRecipe(foundArray)
    }else{
        // show no found result
        debugger
        recipeContainer.innerText= "Aucune recette ne correspond à votre critère...vous puvez chercher 'tarte aux pommes', 'poisson'. etc"
        searchInput.innerHTML ="again"
    }
    
    foundArrayTemp = foundArray
//    console.log("foundArray =")
//    console.log(foundArray)
//    console.log("foundArrayTemp =")
//    console.log(foundArrayTemp)
    
    return foundArrayTemp, foundArray
};

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


/*--funciton search--*/
function searchoption2(recipeArrays,value){
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

function removeSelectedTag(){
    const selectedTags = document.querySelectorAll(".selected_tag")
    selectedTags.forEach(selectedTag =>{
        selectedTag.addEventListener('click', (el) =>{
        el.target.remove(el.target)
            console.log(searchInput.innerHTML)
            

            if (showTags.childElementCount == 0 && searchInput.innerHTML == "")
                {
                location.reload()
                searchInput.classList.remove("disable")

            } else if(showTags.childElementCount > 1)
                    {
                        search(recipes, showTags.childNodes[0].innerText)
                        for(let i = 1; i < showTags.childElementCount ; i++){                                        
                            search(foundArrayTemp, showTags.childNodes[i].innerText)
                        } 
                    }
                else{
                    search(recipes, showTags.childNodes[0].innerText)
                    }
    
        })
    })
}
/************************************************************ */
/************************************************************ */
/************************************************************ */
/************************************************************ */
/************************************************************ */
/************************************************************ 
tagContainers.forEach(tagContainer =>{

    tagContainer.addEventListener('click', (e) =>{
        e.preventDefault()
        
        
        
        const tagContentsUl = tagContainer.nextElementSibling
        
        tagContainer.classList.add("active")

        //-- once tag button is clicked => main search-input bar will be disabled
        searchInput.classList.add("disable")
        
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

                const tagLis = document.querySelectorAll(".tag")
                tagLis.forEach(tag =>{
                    tag.addEventListener('click', (e)=>{
                        e.preventDefault()
                        
                        //--close the dropdown_container after click the selected tag
                        inputByIngredient.classList.add("hidden")
                        tagContainer.classList.remove('active')
                        tagContentsUl.classList.remove("ul_active")

                        let selectedTagIngredient = e.target.innerHTML.toLowerCase()
                        selectedTagIngredient = selectedTagIngredient.trim()
                        
                            var p = document.createElement('p')
                            var pText = document.createTextNode(selectedTagIngredient)
                            p.appendChild(pText)
                            p.classList.add("selected_tag")
                            p.classList.add("curser")
                            p.classList.add("blue")
                            showTags.appendChild(p) 
                            tagContainer.classList.remove("active")

                            //--search trough foundarrayTemp
                        if(foundArrayTemp.length === 0){
                            search(recipes,selectedTagIngredient)
                            //--ADD EventListener to each selected_tag to close
                        }else{
                            search(foundArrayTemp,selectedTagIngredient)
                        }                    
                            //-- remove selected-tag ingredient 
                            removeSelectedTag()
                        })  
                })
    
                    //-- In case search bar in input
                    inputByIngredient.addEventListener('keyup', (e)=>{
                        e.preventDefault()
                        let searchInput = e.target.value.toLowerCase().trim()
                        //--2.return the found arrays for the recipes
                        const foundTags = ingredients.filter((ingredient) =>{
                                return ingredient.toLowerCase().includes(searchInput)
                        })

                        if(foundTags.length>0){
                            tagContentsUl.innerHTML = renderTags(foundTags)
                        } else {
                            tagContentsUl.innerHTML = "Aucune ingredient ne correspond pas à votre critère"
                        }
 
                        const tagLis = document.querySelectorAll(".tag")
                        tagLis.forEach(tag =>{
                            tag.addEventListener('click', (e)=>{
                                e.preventDefault()
                                
                                //--close the dropdown_container after click the selected tag
                                inputByIngredient.classList.add("hidden")
                                tagContainer.classList.remove('active')
                                tagContentsUl.classList.remove("ul_active")
        
                                let selectedTag = e.target.innerHTML.toLowerCase()
                                selectedTag = selectedTag.trim()                                
                                
                                    var p = document.createElement('p')
                                    var pText = document.createTextNode(selectedTag)
                                    p.appendChild(pText)
                                    p.classList.add("selected_tag")
                                    p.classList.add("curser")
                                    p.classList.add("blue")
                                    showTags.appendChild(p) 
                                    tagContainer.classList.remove("active")
        
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
                                //--end if statment 
                    })

        }   
        else if ((tagContainer.classList.contains("active") && 
        tagContainer.classList.contains("green"))){
            tagContentsUl.classList.add("ul_active")
            tagContentsUl.innerHTML = renderTags(appareils)

            const tagLis = document.querySelectorAll(".tag")
            tagLis.forEach(tag =>{
                tag.addEventListener('click', (e)=>{
                    e.preventDefault()
                    
                    //--close the dropdown_container after click the selected tag
                    inputByIngredient.classList.add("hidden")
                    tagContainer.classList.remove('active')
                    tagContentsUl.classList.remove("ul_active")

                    let selectedTag = e.target.innerHTML.toLowerCase()
                    selectedTag = selectedTag.trim()                                
                    
                        var p = document.createElement('p')
                        var pText = document.createTextNode(selectedTag)
                        p.appendChild(pText)
                        p.classList.add("selected_tag")
                        p.classList.add("curser")
                        p.classList.add("green") 
                        showTags.appendChild(p) 
                        tagContainer.classList.remove("active")

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
        }   else if ((tagContainer.classList.contains("active") && 
                    tagContainer.classList.contains("red"))){
                        tagContentsUl.classList.add("ul_active")
                        tagContentsUl.innerHTML = renderTags(ustensils)
                        const tagLis = document.querySelectorAll(".tag")
                        tagLis.forEach(tag =>{
                            tag.addEventListener('click', (e)=>{
                                e.preventDefault()
                                //--close the dropdown_container after click the selected tag
                                inputByIngredient.classList.add("hidden")
                                tagContainer.classList.remove('active')
                                tagContentsUl.classList.remove("ul_active")
            
                                let selectedTag = e.target.innerHTML.toLowerCase()
                                selectedTag = selectedTag.trim()                                
                                
                                    var p = document.createElement('p')
                                    var pText = document.createTextNode(selectedTag)
                                    p.appendChild(pText)
                                    p.classList.add("selected_tag")
                                    p.classList.add("curser")
                                    p.classList.add("red") 
                                    showTags.appendChild(p) 
                                    tagContainer.classList.remove("active")
            
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

        })

})
//*******************END dropdown Ingredients****************************
*/
/*
tag.addEventListener('click',(e)=>{
    e.preventDefault()
debugger
        tagContainers.forEach(tagContainer =>{
            if (tagContainer.classList.contains("active")&&tagContainer.classList.contains("blue")){
                alert("blue")
                inputByIngredient.classList.add('hidden')
                tagContainer.classList.remove("active")
                const tagContentsUl = tagContainer.nextElementSibling
                tagContentsUl.classList.remove("ul_active")
            }
        })

})


tagContainers.forEach(tagContainer =>{
    tagContainer.onblur = function(){
        debugger
        alert("blue")
        if (tagContainer.classList.contains("active") 
            && tagContainer.classList.contains("blue")){
           
            inputByIngredient.classList.add('hidden')
            tagContainer.classList.remove("active")
            const tagContentsUl = tagContainer.nextElementSibling
            tagContentsUl.classList.remove("ul_active")
        }
    }
})
*/  
    inputIngredient.addEventListener("focus", ()=>{
        inputIngredient.placeholder="Recherche un ingrédient"
        inputIngredient.classList.add("active")
        inputIngredient.nextElementSibling.classList.add("open")
        tags.classList.add("ul_active")
        tags.innerHTML = renderTags(ingredients)  
        callTagEvents("blue")
            
    })

/*        
inputIngredient.addEventListener("blur", ()=>{
const x = document.getElementById('listid')
  
            inputIngredient.placeholder="Ingredients"
            inputIngredient.classList.remove("active")
       //tags.classList.remove("ul_active")
       //tags.innerHTML = ""
       inputIngredient.value=""
       searchInput.classList.remove ("disable")
    })
*/
inputIngredient.addEventListener('keyup', (e)=>{
        e.preventDefault()
        let searchInput = e.target.value.toLowerCase().trim()
        //--2.return the found arrays for the recipes
        const foundTags = ingredients.filter((ingredient) =>{
                return ingredient.toLowerCase().includes(searchInput)
        })

        if(foundTags.length>0){
            tags.innerHTML = renderTags(foundTags)
            callTagEvents("blue")
        } else {
            tags.innerHTML = "Aucune ingredient ne correspond pas à votre critère"
        }
})
        

function callTagEvents(color){
    searchInput.classList.add ("disable")

    const tagLis = document.querySelectorAll(".tag")
        tagLis.forEach(tag =>{
            tag.addEventListener('click', (e)=>{
                debugger
                console.log(e.target)
                debugger    

                let selectedTag = e.target.innerHTML.toLowerCase()
                selectedTag = selectedTag.trim()                                
                console.log(selectedTag)
                    var p = document.createElement('p')
                    var pText = document.createTextNode(selectedTag)
                    p.appendChild(pText)
                    p.classList.add("selected_tag")
                    p.classList.add("curser")
                    p.classList.add(color)
                    showTags.appendChild(p) 
                    inputIngredient.classList.remove("active")
                    inputIngredient.placeholder="Ingrédients"
                    tags.classList.remove("ul_active")
                            
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

dropdownArrow.forEach(arrow =>{
    arrow.addEventListener('click', ()=>{
        //--open dropdown tag lists
        if(arrow.classList.contains('open')){
            console.log("contain open muss beclose")
            arrow.classList.remove('open')
            arrow.classList.add('close')



            inputIngredient.placeholder="Ingredients"
            inputIngredient.classList.remove("active")
            tags.classList.remove("ul_active")
            inputIngredient.value=""
            searchInput.classList.remove ("disable")
        }else {
        //--close dropdown tag lists
        arrow.classList.remove('close')
        arrow.classList.add('open')
            console.log("open")   
        }
    })
})

