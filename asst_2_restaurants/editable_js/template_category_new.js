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
  let categories = {xenomorph:[],chestburster:[],facehugger:[]}

  data.reduce((acc, current) => {
    let speciesDetector=null
    if(getFacehuggerCheck(current))
    {
      speciesDetector = 'facehugger'
    }
    if(getChestbursterCheck(current))
    {
      speciesDetector='chestburster'
    }
    if(getXenoCheck(current))
    {
      speciesDetector='xenomorph'
    }

    if(speciesDetector!=null)
    {
      acc[speciesDetector].push(current)
      console.log(acc)
    }

    return acc;
  }, categories)
  categoryObject=categories
  categories = Object.entries(categories)
  console.log(categories)
  /*html*/
  let categoryView = ``
  categoryView += `
                <div class="view-header">
                <h2 class="view-title">Category View</h2>
                <p class="view-description">Listing hotspots of specimen to be collected</p>
                </div>
                <div class="categories-container">
                <button id='cat-1' class="category-button category-active" data-category = '${categories[0][0]}' >
                <div class="category-icon ${categories[0][0]}"></div>
                <span>${categories[0][0]}</span>
                </button>
                <button id='cat-2' class="category-button" data-category = '${categories[1][0]}' >
                <div class="category-icon ${categories[1][0]}"></div>
                <span>${categories[1][0]}</span>
                </button>
                <button id='cat-3' class="category-button" data-category = '${categories[2][0]}' >
                <div class="category-icon ${categories[2][0]}"></div>
                <span>${categories[2][0]}</span>
                </button>
                </div> 
                <div class="table-container"> 
                <table id="category-table" class="inspection-table">
                        <thead>
                            <tr>
                                <th>Hotspot</th>
                                <th>Area</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                  </table>
                </div> 
                </div>
                </div>
            `;

  console.log(categoryObject)
  // if(document.querySelector('#sample'))
  // {
  //     document.querySelector('#sample').addEventListener('click')=()=>{
  //           console.log("summaaa")
  // }
  // }

  return categoryView
}

export function categoryView(category) {
  let categoryView = ``
  categoryObject[category].forEach((restaurant) => {
    categoryView += '<tr class="category-row">'
    categoryView += `<td class='table-restaurant-name'>${restaurant.name}</td>`
    categoryView += `<td>${restaurant.city}</td>`
    categoryView += `</tr>`
  })
  return categoryView;
}




// Helper: chestburster check
function getChestbursterCheck(restaurant) {
  if (getComplianceIndicator(restaurant.ill_workers_restricted) != 'N/A'
    && getComplianceIndicator(restaurant.food_from_approved_source) != 'N/A'
    && getComplianceIndicator(restaurant.food_protected_from) != 'N/A') {
    if (getComplianceIndicator(restaurant.ill_workers_restricted) == '✓'
      && getComplianceIndicator(restaurant.food_from_approved_source) == '✓'
      && getComplianceIndicator(restaurant.food_protected_from) == '✓') {
      return false
    }
    else {
      return true
    }
  }

  else {
    return false
  }
}

// Helper: facehugger check
function getFacehuggerCheck(restaurant) {
  if (getComplianceIndicator(restaurant.cold_holding_temperature) != 'N/A'
    && getComplianceIndicator(restaurant.cooling_time_and_temperature) != 'N/A'
    && getComplianceIndicator(restaurant.hot_and_cold_running_water) != 'N/A') {
    if (getComplianceIndicator(restaurant.cold_holding_temperature) == '✓'
      && getComplianceIndicator(restaurant.cooling_time_and_temperature) == '✓'
      && getComplianceIndicator(restaurant.hot_and_cold_running_water) == '✓') {
      return false
    }
    else {
      return true
    }
  }

  else {
    return false
  }
}

// Helper: xeno check
function getXenoCheck(restaurant) {
  if (getComplianceIndicator(restaurant.rodent_and_insects) != 'N/A'
    && getComplianceIndicator(restaurant.proper_sewage_disposal) != 'N/A'
    && getComplianceIndicator(restaurant.adequate_hand_washing) != 'N/A') {
    if (getComplianceIndicator(restaurant.rodent_and_insects) == '✓'
      && getComplianceIndicator(restaurant.proper_sewage_disposal) == '✓'
      && getComplianceIndicator(restaurant.adequate_hand_washing) == '✓') {
      return false
    }
    else {
      return true
    }
  }

  else {
    return false
  }
}

function getComplianceIndicator(value) {
    if (!value || value === '------') return 'N/A';
    return value === 'In Compliance' ? '✓' : '✗';
}

export function categoryEntry()
{
  //checking if gsap is loaded
  if(typeof gsap == undefined)
  {
    alert('Gsap not loaded');
    return
  }
  else
  {
    console.log("Gsap is loaded");
  }

  gsap.fromTo(".table-container", { opacity: 0 }, { opacity: 1, duration: 0.5 });
}

export function categoryExit()
{
  //checking if gsap is loaded
  if(typeof gsap == undefined)
  {
    alert('Gsap not loaded');
    return
  }
  else
  {
    console.log("Gsap is loaded");
  }

  gsap.to(".table-container",{ opacity: 0, duration: 0.5 });
}

export function rowAnimation()
{
  //checking if gsap is loaded
  if(typeof gsap == undefined)
  {
    alert('Gsap not loaded');
    return
  }
  else
  {
    console.log("Gsap is loaded");
  }

  gsap.fromTo(".category-row", { opacity: 0 }, { opacity: 1, stagger: 0.05, duration:0.1 });
}

export default showCategories;