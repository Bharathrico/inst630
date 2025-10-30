/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */

let categoryObject = {}

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
                <p class="view-description">Listing top four categories of restaurants</p>
                <button id='cat-1' data-category = '${categories[0][0]}' >${categories[0][0]}</button>
                <button id='cat-2' data-category = '${categories[1][0]}' >${categories[1][0]}</button>
                <button id='cat-3' data-category = '${categories[2][0]}' >${categories[2][0]}</button>
                <button id='cat-4' data-category = '${categories[3][0]}' >${categories[3][0]}</button>
                  <table id="category-table" class="category-table">
                        <thead>
                            <tr>
                                <th>Restaurant</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                  </table>
                </div>
                </div>
            `;
  
  categories.reduce((acc,current)=>{
    if(acc[current[0]])
    {
      return acc
    }
    else
    {
      acc[current[0]] = data.filter((res)=> res.category.toLowerCase().replace('@','').replace('-',' ').replace('chain','').trimEnd() == current[0])
      return acc
    }
  },categoryObject)

  console.log(categoryObject)
  // if(document.querySelector('#sample'))
  // {
  //     document.querySelector('#sample').addEventListener('click')=()=>{
  //           console.log("summaaa")
  // }
  // }

    return categoryView
}

export function categoryView(category)
{
  let categoryView = ``
  categoryObject[category].forEach((restaurant)=>{
    categoryView+='<tr>'
    categoryView+=`<td class='table-restaurant-name'>${restaurant.name}</td>`
    categoryView+=`<td>${restaurant.city}</td>`
    categoryView+=`</tr>`
  })
  return categoryView;
}
        


export default showCategories;