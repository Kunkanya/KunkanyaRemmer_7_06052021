export default class classRecipe{
    constructor(name,serving, time,ingredients, description, appliance, ustensiles){
        this.name = name
        this.serving = serving
        this.time = time
        this.ingredients = ingredients //array of ingredients
        this.description = description
        this.appliance = appliance
        this.ustensiles = ustensiles
    }

    createRecipe(){
        const recipeContainer = document.getElementById("recipe_wrapper")

        let recipeContainerHTML  = `
        <div class="recipe_container">
        <div class="recipe_details">
            <div class="recipe_head">
                <h3>${this.name}</h3>
                <h4><i class="far fa-clock"></i>${this.time} min</h4>
            </div>
            <div class="cooking_section">
                <ul class="ingredients">
                ${this.createIngredients()}
                </ul>
                <p class="description">${this.description}</p>
            </div>
        </div>
    </div>
    `

    recipeContainer.innerHTML += recipeContainerHTML
    }

    createIngredients(){
        return `
        ${this.ingredients.map(function(eachIngredient){
            let unit = eachIngredient.unit
            let quantity = eachIngredient.quantity
                function checkQuantity(){
                    if(quantity === undefined){
                        quantity = ""
                        return quantity
                    }else{
                        return quantity
                    }
                }                
                function checkUnit(){
                    if(unit === undefined){
                        unit = ""
                        return unit
                    }else if(unit === "grammes"){
                        return "g"
                    }
                    else{
                        return unit
                    }
                }
                function addColon(){
                    if(unit || quantity){
                        return ":"
                    }else {
                        return ""
                    }
                }
            return ` <li> ${eachIngredient.ingredient} ${addColon()} ${checkQuantity()} ${checkUnit()} </li>
            `
        }).join('')}
        `
    }
}