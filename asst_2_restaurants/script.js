import showCards from './editable_js/template_cards.js';
import showCategories, { categoryView } from './editable_js/template_category_new.js';
import showStats from './editable_js/template_stats.js';
import showTable from './editable_js/template_table.js';

import loadData from './editable_js/load_data.js';

// ============================================
// DISPLAY MANAGEMENT - PROVIDED
// ============================================

/**
 * Update the display with new content
 */
function updateDisplay(content) {
  document.getElementById("data-display").innerHTML = content;
}

/**
 * Update button states
 */
function updateButtonStates(activeView) {
  document.querySelectorAll(".view-button").forEach((button) => {
    button.classList.remove("active");
  });
  document.getElementById(`btn-${activeView}`).classList.add("active");
}

/**
 * Show loading state
 */
function showLoading() {
  updateDisplay('<div class="loading">Loading data from API...</div>');
}


//category-button update
function updateCategoryButtonStates(activeView) {
  document.querySelectorAll(".category-button").forEach((button) => {
    button.classList.remove("category-active");
  });
  document.getElementById(`cat-${activeView}`).classList.add("category-active");
}

//function to insert eventlisteners for category view
function categoryListeners() {
  document.querySelector('#category-table tbody').innerHTML = categoryView(document.querySelector('#cat-1').dataset.category)
  document.querySelector('#cat-1').onclick = (e) => {
    document.querySelector('#category-table tbody').innerHTML = categoryView(e.target.dataset.category)
    updateCategoryButtonStates('1')
  }
  document.querySelector('#cat-2').onclick = (e) => {
    document.querySelector('#category-table tbody').innerHTML = categoryView(e.target.dataset.category)
    updateCategoryButtonStates('2')
  }
  document.querySelector('#cat-3').onclick = (e) => {
    document.querySelector('#category-table tbody').innerHTML = categoryView(e.target.dataset.category)
    updateCategoryButtonStates('3')
  }
  // document.querySelector('#cat-4').onclick = (e)=>{
  //   document.querySelector('#category-table tbody').innerHTML =categoryView(e.target.dataset.category) 
  // }

}

/**
 * Show error state
 */
/*html*/
function showError(message) {
  updateDisplay(`
                <div class="error">
                    <h3>Error Loading Data</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()">Try Again</button>
                </div>
            `);
}

// ============================================
// APPLICATION INITIALIZATION - PROVIDED
// ============================================

/**
 * Main application function - handles data loading and button setup
 * This pattern always works - no timing issues!
 */
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Starting application...");

  try {
    // Load data once
    showLoading();
    const data = await loadData();
    console.log(`Loaded ${data.length} items from API`);

    // Set up button event handlers - this pattern always works!
    document.getElementById("btn-cards").onclick = () => {
      updateDisplay(showCards(data));
      updateButtonStates("cards");
    };

    document.getElementById("btn-table").onclick = () => {
      updateDisplay(showTable(data));
      updateButtonStates("table");
    };

    document.getElementById("btn-categories").onclick = async () => {
      await updateDisplay(showCategories(data));
      await categoryListeners()
      updateButtonStates("categories");
    };

    document.getElementById("btn-stats").onclick = () => {
      updateDisplay(showStats(data));
      updateButtonStates("stats");
    };


    // Show initial view
    updateDisplay(showCards(data));
    updateButtonStates("cards");



    console.log("Application ready!");
  } catch (error) {
    console.error("Application failed to start:", error);
    showError(error.message);
  }



});



