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

