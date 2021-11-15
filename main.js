import {recipes} from "./recipes.js"
//--DOM
const btnIngredients = document.getElementById("searchByIngredients")
const tagIngredients = document.getElementById("dropdownIngredients")

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
        ingredients = [...new Set(arrIngredients)]
        })

        //--get and filter duplicate appareils 
        arrAppareils.push(recipe.appliance)
        appareils =[...new Set(arrAppareils)]
  
    //--get and filter duplicate ustensiles
    recipe.ustensils.forEach(ustensil =>{
        arrUtensiles.push(ustensil)
        ustensiles =[...new Set(arrUtensiles)]    
    })
})
console.log(ingredients)
console.log(appareils)
console.log(ustensiles)

btnIngredients.addEventListener('click', ()=>{
    
    tagIngredients.innerHTML = `  
    ${ingredients.map(function(ingredient){
        return `<li>${ingredient}</li>`
    }).join('')}
    `   
})