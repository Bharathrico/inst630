
// ============================================
// TUTORIAL 6: LOAD REAL DATA
// From static data to async data loading
// ============================================

// Global variable to store loaded restaurant data
let restaurants = [];

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorial 6: Async data loading ready!');
    
    // Get UI elements
    const loadButton = document.querySelector('#load-data-button');
    const statusDisplay = document.querySelector('#loading-status');
    const statusMessage = statusDisplay.querySelector('.status-message');
    
    // Get the method buttons (start disabled)
    const displayButton = document.querySelector('#display-button');
    const filterButton = document.querySelector('#filter-button');
    const mapButton = document.querySelector('#map-button');
    const errorButton = document.querySelector('#error-button');
    
    // ============================================
    // MAIN DATA LOADING FUNCTION
    // ============================================
    
    // This is the key new skill - loading data asynchronously
    loadButton.addEventListener('click', async () => {
        
        // Step 1: Show loading state
        // Hint: Change statusDisplay classes and statusMessage text
        // Hint: Disable the load button while loading
        
        if(statusDisplay.classList.contains('success'))
        {
            statusDisplay.classList.remove('success')
        }
        loadButton.disabled=true
        statusDisplay.className+=' loading'
        statusMessage.textContent='loading JSON data'

        // YOUR CODE HERE:
        
        
        try {
            // Step 2: Use fetch() to load data
            // Hint: const response = await fetch('restaurants.json');
            // Hint: Check if response.ok before continuing
            
            const response = await fetch('restaurants.json');

            if(response.ok)
            {
            
            // Step 3: Convert response to JSON
            // Hint: const data = await response.json();
            
                const data = await response.json();

            // Step 4: Store data in global variable
            // Hint: restaurants = data;

                restaurants=data
                console.log(restaurants)
            
            // YOUR CODE HERE:
            
            
            // Step 5: Show success state and enable buttons
            // Hint: Update statusDisplay classes and message
            // Hint: Enable all the method buttons
            
            // YOUR CODE HERE:

            setTimeout(()=>{
                loadButton.disabled=false
                toggleMethodButtons(true)
                statusDisplay.classList.remove('loading')
                statusDisplay.className+=' success'
                statusMessage.textContent='Data loaded'
            },2000)
            

            }
            else
            {
                
                throw new Error(`HTTP error! status: ${response.status}`);
                
            }
            
        } 
        catch (error) {
            // Step 6: Handle errors gracefully
            // Hint: Show error state with user-friendly message
            // Hint: Log the actual error for debugging
            
            // YOUR CODE HERE:
            setTimeout(()=>{
            loadButton.disabled=false
            statusDisplay.classList.remove('loading')
            statusDisplay.className+=' error'
            statusMessage.textContent='Failed to load data'
            console.error('Demonstrated error:', error);
            }, 2000)
        }
    });
    
    // ============================================
    // ARRAY METHOD FUNCTIONS - Same as Tutorial 5
    // ============================================
    
    // Display all restaurants (same as Tutorial 5, but using loaded data)
    displayButton.addEventListener('click', async()=>{
        const restaurantList = document.querySelector('#restaurant-list');
        
        // Check if we have data first
        if (restaurants.length === 0) {
            restaurantList.innerHTML = '<p class="placeholder">No data loaded yet</p>';
            return;
        }
        else{
            restaurantList.innerHTML = '';
        }
        
        // Step 7: Use the same forEach logic from Tutorial 5
        // Hint: restaurants.forEach(function(restaurant) { })
        
        // YOUR CODE HERE:
        await restaurants.forEach((restaurant) => { 
            // Creating an restaurantItem element to wrap the content
            let restaurantItem = document.createElement('div')
            restaurantItem.className='restaurant-item'
            // Creating inner content
            let restaurantName = document.createElement('div')
            restaurantName.className='restaurant-name'
            restaurantName.textContent=restaurant.name
            let restaurantCuisine = document.createElement('div')
            restaurantCuisine.className='restaurant-cuisine'
            restaurantCuisine.textContent=restaurant.cuisine
            //Appending content inside Wrapper element
            restaurantItem.appendChild(restaurantName)
            restaurantItem.appendChild(restaurantCuisine)
            //appending element to the main div
            restaurantList.appendChild(restaurantItem) 
        })
        
    });
    
    // Filter cheap restaurants (same logic, loaded data)
    filterButton.addEventListener('click', async()=>{
        const filteredList = document.querySelector('#filtered-list');
        
        if (restaurants.length === 0) {
            filteredList.innerHTML = '<p class="placeholder">No data loaded yet</p>';
            return;
        }
        else{
            filteredList.innerHTML = '';
        }
        
        // Step 8: Use the same filter logic from Tutorial 5
        // Hint: const cheapRestaurants = restaurants.filter(function(restaurant) { })
        
        const cheapRestaurants = await restaurants.filter((restaurant)=> restaurant.priceRange === '$' || restaurant.priceRange === '$$')

        // YOUR CODE HERE:
         cheapRestaurants.forEach((restaurant) => { 
            // Creating an restaurantItem element to wrap the content
            let restaurantItem = document.createElement('div')
            restaurantItem.className='restaurant-item'
            // Creating inner content
            let restaurantName = document.createElement('div')
            restaurantName.className='restaurant-name'
            restaurantName.textContent=restaurant.name
            let restaurantPrice = document.createElement('div')
            restaurantPrice.className='restaurant-price'
            restaurantPrice.textContent=restaurant.priceRange
            //Appending content inside Wrapper element
            restaurantItem.appendChild(restaurantName)
            restaurantItem.appendChild(restaurantPrice)
            //appending element to the main div
            filteredList.appendChild(restaurantItem) 
        })
        
    });
    
    // Show restaurant names (same logic, loaded data)
    mapButton.addEventListener('click', async()=>{
        const mappedList = document.querySelector('#mapped-list');
        
        if (restaurants.length === 0) {
            mappedList.innerHTML = '<p class="placeholder">No data loaded yet</p>';
            return;
        }
        else{
            mappedList.innerHTML = '';
        }
        
        // Step 9: Use the same map logic from Tutorial 5
        // Hint: const names = restaurants.map(function(restaurant) { })
        const names = restaurants.map((restaurant)=>restaurant.name)
        // YOUR CODE HERE:
        // Creating a unordererd list to wrap all the restaurant names
       let nameList = document.createElement('ul')
       nameList.className='name-list'
        names.forEach((restaurant) => {
            // Creating a list element for a restaurant name
            let listItem =  document.createElement('li')
            listItem.textContent=restaurant
            nameList.appendChild(listItem)
        })
        // adding the unordered list to the mapped list
        mappedList.appendChild(nameList)
        console.log('Showed restaurant names using map');
        
    });
    
    // ============================================
    // ERROR HANDLING DEMO
    // ============================================
    
    // This demonstrates what happens when fetch() fails
    errorButton.addEventListener('click', async function() {
        const errorDisplay = document.querySelector('#error-display');
        
        errorDisplay.innerHTML = '<div class="status-display loading"><p class="status-message">Trying to load from bad URL...</p></div>';
        
        try {
            // This will fail because the URL doesn't exist
            const response = await fetch('nonexistent-file.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            errorDisplay.innerHTML = '<p class="placeholder">This should not appear</p>';
            
        } catch (error) {
            // Step 10: Show user-friendly error message
            // Hint: Create error message div with helpful text
            
            // YOUR CODE HERE:
            setTimeout(()=>{
                errorDisplay.innerHTML = '<div class="status-display error"><p class="status-message">Failed to load data</p></div>';
            },2000)
            console.error('Demonstrated error:', error);
        }
    });
    
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Helper function to enable/disable method buttons
function toggleMethodButtons(enabled) {
    const buttons = [
        document.querySelector('#display-button'),
        document.querySelector('#filter-button'),
        document.querySelector('#map-button')
    ];
    
    buttons.forEach(button => {
        button.disabled = !enabled;
    });
}

// Helper function to update status display
function updateStatus(state, message) {
    const statusDisplay = document.querySelector('#loading-status');
    const statusMessage = statusDisplay.querySelector('.status-message');
    
    // Remove all state classes
    statusDisplay.classList.remove('loading', 'success', 'error');
    
    // Add new state class
    if (state !== 'ready') {
        statusDisplay.classList.add(state);
    }
    
    statusMessage.textContent = message;
}

// ============================================
// DEBUGGING FUNCTIONS
// ============================================

// Check if data is loaded
function checkDataStatus() {
    console.log('=== Data Status ===');
    console.log('Restaurants loaded:', restaurants.length);
    if (restaurants.length > 0) {
        console.log('First restaurant:', restaurants[0].name);
        console.log('All restaurant names:', restaurants.map(r => r.name));
    }
    console.log('==================');
}

// Manually load data (for testing)
async function manualLoadData() {
    try {
        const response = await fetch('restaurants.json');
        if (!response.ok) throw new Error('Load failed');
        const data = await response.json();
        restaurants = data;
        console.log(`Manually loaded ${restaurants.length} restaurants`);
        toggleMethodButtons(true);
        updateStatus('success', `Successfully loaded ${restaurants.length} restaurants`);
    } catch (error) {
        console.error('Manual load failed:', error);
        updateStatus('error', 'Failed to load data');
    }
}

// Reset everything
function resetTutorial() {
    restaurants = [];
    toggleMethodButtons(false);
    updateStatus('ready', 'Ready to load data');
    
    // Clear all displays
    document.querySelector('#restaurant-list').innerHTML = '<p class="placeholder">Load data first, then click to display all restaurants</p>';
    document.querySelector('#filtered-list').innerHTML = '<p class="placeholder">Load data first, then click to show only affordable restaurants</p>';
    document.querySelector('#mapped-list').innerHTML = '<p class="placeholder">Load data first, then click to show just the restaurant names</p>';
    document.querySelector('#error-display').innerHTML = '<p class="placeholder">Click to see error handling in action</p>';
    
    console.log('Tutorial reset');
}

// Call these functions in the browser console:
// checkDataStatus() - see if data is loaded
// manualLoadData() - load data without clicking button
// resetTutorial() - reset everything for testing