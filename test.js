const found= recipes.map((recipe)=>{
    return recipe.name.includes("Coco")
})
const found2= recipes.filter((recipe)=>{
    return recipe.name.includes("Coco")
})



for(i=0; i< recipes.length;i++){
  let foundArray=[]
  if( recipes[i].name.includes("Coco")){
    foundArray.push(recipes[i].name)
  }
}

    search1(recipes,"coco");
function search1(arr, value){ 
    foundArray = [];
    //--2. set each recipe to one string and set to lowercase
    for(let i= 0; i < arr.length; i++){
        function listIngredient(){
            let x = "" ;
            arr[i].ingredients.forEach(ingredient=>{
                x += ingredient.ingredient + ' ';
                });
            return x;
        }
        function listUstensils(){
            let y = "";
            arr[i].ustensils.forEach(ustensil=>{
                y+= ustensil;
            });
            return y;
        }
        //-- put the name + all in redient + description in to one tempRecipe  for searching
        let tempRecipe = arr[i].name + " , " +
                         listIngredient() + " , " + 
                         arr[i].description + " , " + 
                         arr[i].appliance + " , " +
                         listUstensils();
                            
        tempRecipe = tempRecipe.toLowerCase();
        tempRecipe = tempRecipe.trim();
        let foundItemBoolean = tempRecipe.includes(value);
        if(foundItemBoolean === true) {
            foundArray.push(arr[i]);      
        }
    }
    return  foundArray;
}


//------------------------------------
//------------------------------------
//------------------------------------
//------------------------------------
//------------------------------------
search2(recipes, "coco");

function search2(recipeArrays,value){
const    foundArray =  recipeArrays.filter((recipeArray) => {
        // get all the ingredients for each recipe for checking condition later
        function listIngredient(){
            let x = "" ;
            recipeArray.ingredients.forEach(ingredient=>{
                x += ingredient.ingredient.toLowerCase() + ' ';
                });
            return x;
        }  
        // get all the ustensils for each recipe for checking condition later
        function listUstensils(){
            let y = "";
            recipeArray.ustensils.forEach(ustensil=>{
                y+= ustensil.toLowerCase();
            });
            return y;
        }
        
        return recipeArray.name.toLowerCase().includes(value) ||
        recipeArray.description.toLowerCase().includes(value) ||
        listIngredient().includes(value) ||
        listUstensils().includes(value) ||
        recipeArray.appliance.toLowerCase().includes(value);
        });

return foundArray;
}
