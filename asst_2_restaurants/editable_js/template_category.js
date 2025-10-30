/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */


function showCategories(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Group data by a meaningful category (cuisine, neighborhood, price, etc.)
  // - Show items within each group
  // - Make relationships between groups clear
  // - Consider showing group statistics
  let categories={}
  data.reduce((acc,current)=>{
   let category = current.category.toLowerCase().replace('@','').replace('-',' ').replace('chain','').trimEnd()
   if(acc[category])
   {
    acc[category] += 1
    return acc
   }
   else
   {
    acc[category] =1
    return acc
   }
  },categories)
  categories = Object.entries(categories).sort((([,a],[,b])=> b-a)).slice(0,4)
  console.log(categories)
  /*html*/
  let categoryView =``
  categoryView+= `
                <h2 class="view-title">📂 Category View</h2>
                <button id='sample'>Sample</button>
            `;
  

  // if(document.querySelector('#sample'))
  // {
  //     document.querySelector('#sample').addEventListener('click')=()=>{
  //           console.log("summaaa")
  // }
  // }

    return categoryView
}


          







export default showCategories;