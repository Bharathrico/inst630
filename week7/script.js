// ============================================
// TUTORIAL 7: SAME DATA, DIFFERENT STORIES
// Information architecture through multiple presentations
// ============================================

// Global variables to store data
let restaurants = [];
let currentView = 'card';

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorial 7: Multiple data presentations ready!');
    
    // Get UI elements
    const loadButton = document.querySelector('#load-data-button');
    const statusDisplay = document.querySelector('#loading-status');
    const statusMessage = statusDisplay.querySelector('.status-message');
    const dataSummary = document.querySelector('#data-summary');
    const viewControls = document.querySelector('#view-controls');
    const displayContainer = document.querySelector('#display-container');
    const tutorialInsights = document.querySelector('#tutorial-insights');
    
    // Get view buttons
    const cardViewBtn = document.querySelector('#card-view-btn');
    const tableViewBtn = document.querySelector('#table-view-btn');
    const statsViewBtn = document.querySelector('#stats-view-btn');
    
    // ============================================
    // DATA LOADING (Building on Week 6)
    // ============================================
    
    loadButton.addEventListener('click', async function() {
        // Step 1: Show loading state
        // Hint: Use the same loading pattern from Tutorial 6
        
        // YOUR CODE HERE:
        
         if(statusDisplay.classList.contains('success'))
        {
            statusDisplay.classList.remove('success')
        }
        loadButton.disabled=true
        statusDisplay.className+=' loading'
        statusMessage.textContent='loading JSON data'
        
        try {
            // Step 2: Load the GeoJSON data
            // Hint: await fetch('restaurants.geojson') - note the .geojson extension
            // Hint: GeoJSON loads exactly like regular JSON
            
            const response = await fetch('restaurants.geojson');

            // Step 3: Extract restaurant features from GeoJSON
            // Hint: const restaurantData = await response.json();
            // Hint: restaurants = restaurantData.features; (GeoJSON has a 'features' array)
            
            // YOUR CODE HERE:
            
            if(response.ok)
            {
                const data = await response.json();
            
            
            // Step 4: Show success and enable interface
            // Hint: Show data summary, enable view controls
            // Hint: Call showDataSummary() and showInitialView()
            
            // YOUR CODE HERE:
                 restaurants=data.features
                console.log(restaurants)
           setTimeout(()=>{
                loadButton.disabled=false
                showInitialView()
                showDataSummary()
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
            // Step 5: Handle loading errors
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
    // VIEW SWITCHING (Building on Week 4)
    // ============================================
    
    // Card view button
    cardViewBtn.addEventListener('click', function() {
        // Step 6: Switch to card view
        // Hint: Call switchToView('card') and updateViewButtons
        
        // YOUR CODE HERE:
        updateViewButtons(cardViewBtn);
        switchToView('card')
        
    });
    
    // Table view button
    tableViewBtn.addEventListener('click', function() {
        // Step 7: Switch to table view
        // YOUR CODE HERE:
        updateViewButtons(tableViewBtn);        
        switchToView('table')
    });
    
    // Stats view button
    statsViewBtn.addEventListener('click', function() {
        // Step 8: Switch to stats view
        // YOUR CODE HERE:
        updateViewButtons(statsViewBtn);
        switchToView('stats')
    });
    
    // ============================================
    // CARD VIEW - "Discover restaurants"
    // ============================================
    
    function showCardView() {
        const cardGrid = document.querySelector('#card-grid');
        cardGrid.innerHTML = '';
        
        // Step 9: Create cards for restaurant discovery
        // Hint: Use restaurants.forEach(function(restaurant) {})
        // Hint: Access restaurant data with restaurant.properties.name, etc.
        // Hint: Focus on: name, location, recent inspection status
        
        // YOUR CODE HERE:
        
        restaurants.forEach((restaurant)=>{
            let restaurantCard = document.createElement('div')
            restaurantCard.className=`restaurant-card ${
                getComplianceStatus(restaurant)=='compliant'?'compliant':'non-compliant'
            }`
            let restaurantName = document.createElement('div')
            restaurantName.className='card-name'
            restaurantName.innerText = restaurant.properties.name
            restaurantCard.appendChild(restaurantName)
            
            let cardLocation = document.createElement('a')
            cardLocation.className='card-location'
            cardLocation.style = 'text-decoration: none;'
            if(restaurant.geometry&&restaurant.geometry.coordinates)
            {
            cardLocation.href = `https://www.google.com/maps?q=${restaurant.geometry.coordinates.join(',')}`
            }
            cardLocation.target = '_blank'
            cardLocation.innerText = restaurant.properties.city
            restaurantCard.appendChild(cardLocation)
            
            let cardStatus = document.createElement('div')
            cardStatus.className=`card-status ${getComplianceStatus(restaurant)}`
            cardStatus.innerText = getComplianceStatus(restaurant)
            restaurantCard.appendChild(cardStatus)
            
            let cardDate = document.createElement('div')
            cardDate.className=`card-date`
            cardDate.innerText = formatDate(restaurant.properties.inspection_date)
            restaurantCard.appendChild(cardDate)

            cardGrid.appendChild(restaurantCard)
        })
        
        console.log('Card view: Emphasizing restaurant discovery');
    }
    
    // ============================================
    // TABLE VIEW - "Compare safety records"
    // ============================================
    
    function showTableView() {
        const tableBody = document.querySelector('#inspection-table tbody');
        tableBody.innerHTML = '';
        
        // Step 10: Create table rows for comparison
        // Hint: Show first 50 restaurants to avoid performance issues
        // Hint: Focus on: name, city, inspection_date, inspection_results
        // Hint: Include specific compliance fields for comparison
        
        // YOUR CODE HERE:
        const restaurants = slicedArray(0,9)
        console.log(restaurants)
        restaurants.forEach((restaurant)=>{
            let tableRow = document.createElement('tr')
            
            let restaurantName = document.createElement('td')
            restaurantName.className = 'table-restaurant-name'
            restaurantName.innerText = restaurant.properties.name
            tableRow.appendChild(restaurantName)

            let city = document.createElement('td')
            city.innerText = restaurant.properties.city
            tableRow.appendChild(city)

            let date = document.createElement('td')
            date.innerText = formatDate(restaurant.properties.inspection_date)
            tableRow.appendChild(date)

            let tableStatus = document.createElement('td')
            tableStatus.className = `table-status ${getComplianceStatus(restaurant)}`
            tableStatus.innerText = restaurant.properties.inspection_results
            tableRow.appendChild(tableStatus)
            
            let washing = document.createElement('td')
            washing.className = `compliance-indicator ` + getHandWashingCompliance(restaurant)[0]
            washing.innerText = getHandWashingCompliance(restaurant)[1]
            tableRow.appendChild(washing)

            let foodTemp = document.createElement('td')
            foodTemp.className = `compliance-indicator ` + getTempCompliance(restaurant)[0]
            foodTemp.innerText = getTempCompliance(restaurant)[1]
            tableRow.appendChild(foodTemp)

            tableBody.appendChild(tableRow)
        })
        console.log('Table view: Emphasizing safety record comparison');
    }
    
    // ============================================
    // STATS VIEW - "Analyze patterns"
    // ============================================
    
    function showStatsView() {
        // Step 11: Calculate aggregate statistics
        // Hint: Use array methods to calculate totals, percentages, patterns
        // Hint: Count compliance vs non-compliance
        // Hint: Group by city and calculate city-level stats
        
        // YOUR CODE HERE:
        
        
        console.log('Stats view: Emphasizing county-wide patterns');
    }
    
    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    
    // Update UI to show data summary
    function showDataSummary() {
        // Step 12: Calculate and display summary statistics
        // Hint: Count total restaurants, compliance rate, unique cities
        
        // YOUR CODE HERE:
        const restaurantCount = restaurants.length;
        const citiesSet = new Set(restaurants.map(
            (restaurant)=>restaurant.properties.city)
        )
        let compliance = 0;
        restaurants.forEach((restaurant)=>{
            if(getComplianceStatus(restaurant)=="compliant")
            {
                compliance+=1
            }
        })
        compliance = Math.floor((compliance/restaurantCount) * 100)
        const recordCount = document.querySelector("#record-count")
        const complianceRate = document.querySelector("#compliance-rate")
        const cityCount = document.querySelector("#city-count")
        recordCount.innerHTML = `${restaurantCount}`
        cityCount.innerHTML = `${citiesSet.size}`
        complianceRate.innerHTML = `${compliance} %`
        dataSummary.classList.remove('hidden');
    }
    
    // Switch between views
    function switchToView(viewName) {
    currentView = viewName;
    
    // Hide all view panels
    document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected view panel
    document.querySelector(`#${viewName}-view`).classList.add('active');
    
    // Replace the switch statement with lookup table
    const viewFunctions = {
        'card': showCardView,
        'table': showTableView,
        'stats': showStatsView,
        'default': () => console.error('Unknown view:', viewName)
    };
    
    const viewFunction = viewFunctions[viewName] || viewFunctions['default'];
    viewFunction();
}
    
    // Update view button states
    function updateViewButtons(activeButton) {
        document.querySelectorAll('.view-button').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
    
    // Show the interface after data loads
    function showInitialView() {
        viewControls.classList.remove('hidden');
        displayContainer.classList.remove('hidden');
        tutorialInsights.classList.remove('hidden');
        
        // Show card view by default
        switchToView('card');
    }
    
    // Helper: Determine compliance status
    function getComplianceStatus(restaurant) {
        const result = restaurant.properties.inspection_results;
        if (!result || result === '------') return 'other';
        return result.toLowerCase().includes('non-compliant') ? 'non-compliant' : 'compliant';
    }
    
    // Helper: Format date for display
    function formatDate(dateString) {
        if (!dateString || dateString === '------') return 'No date';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }
    
    // Helper: Get compliance indicator
    function getComplianceIndicator(value) {
        if (!value || value === '------') return 'N/A';
        return value === 'In Compliance' ? '✓' : '✗';
    }

    // Helper: get a sliced array
    function slicedArray(first, last)
    {
        return restaurants.slice(first, last)
    }

    // Helper: handwashing check
    function getHandWashingCompliance(restaurant)
    {
        if(getComplianceIndicator(restaurant.properties.proper_hand_washing)!='N/A'
        &&getComplianceIndicator(restaurant.properties.adequate_hand_washing)!='N/A')
        {
            if(getComplianceIndicator(restaurant.properties.proper_hand_washing)=='✓'
        &&getComplianceIndicator(restaurant.properties.adequate_hand_washing)=='✓')
            {
                return ['pass','✓']
            }
            else
            {
                return ['fail','✗']
            }
        }

        else
        {
            return ['','N/A']
        }
    }

    // Helper: handwashing check
    function getTempCompliance(restaurant)
    {
        if(getComplianceIndicator(restaurant.properties.cold_holding_temperature)!='N/A'
        &&getComplianceIndicator(restaurant.properties.hot_holding_temperature)!='N/A')
        {
            if(getComplianceIndicator(restaurant.properties.cold_holding_temperature)=='✓'
        &&getComplianceIndicator(restaurant.properties.hot_holding_temperature)=='✓')
            {
                return ['pass','✓']
            }
            else
            {
                return ['fail','✗']
            }
        }

        else
        {
            return ['','N/A']
        }
    }
    
});

// ============================================
// DEBUGGING FUNCTIONS
// ============================================

// Show current data status
function checkTutorial7Status() {
    console.log('=== Tutorial 7 Status ===');
    console.log('Restaurants loaded:', restaurants.length);
    console.log('Current view:', currentView);
    
    if (restaurants.length > 0) {
        // Show sample restaurant data structure
        console.log('Sample restaurant:', restaurants[0].properties);
        
        // Show compliance breakdown
        const compliant = restaurants.filter(r => getComplianceStatus(r) === 'compliant').length;
        const nonCompliant = restaurants.filter(r => getComplianceStatus(r) === 'non-compliant').length;
        const other = restaurants.length - compliant - nonCompliant;
        
        console.log('Compliance breakdown:');
        console.log(`- Compliant: ${compliant}`);
        console.log(`- Non-compliant: ${nonCompliant}`);
        console.log(`- Other: ${other}`);
        
        // Show city distribution
        const cities = {};
        restaurants.forEach(r => {
            const city = r.properties.city;
            cities[city] = (cities[city] || 0) + 1;
        });
        
        console.log('Top cities:');
        Object.entries(cities)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .forEach(([city, count]) => console.log(`- ${city}: ${count}`));
    }
    console.log('========================');
}

// Manually load data for testing
async function manualLoadTutorial7() {
    try {
        const response = await fetch('restaurants.geojson');
        if (!response.ok) throw new Error('Load failed');
        const data = await response.json();
        restaurants = data.features;
        console.log(`Loaded ${restaurants.length} restaurants`);
        
        // Enable the interface
        document.querySelector('#view-controls').classList.remove('hidden');
        document.querySelector('#display-container').classList.remove('hidden');
        document.querySelector('#tutorial-insights').classList.remove('hidden');
        
        // Show initial view
        switchToView('card');
        return restaurants;
    } catch (error) {
        console.error('Manual load failed:', error);
    }
}

// Test all three views
function testAllViews() {
    if (restaurants.length === 0) {
        console.log('Load data first with manualLoadTutorial7()');
        return;
    }
    
    console.log('Testing all views...');
    
    // Test card view
    switchToView('card');
    setTimeout(() => {
        switchToView('table');
        setTimeout(() => {
            switchToView('stats');
            console.log('All views tested');
        }, 1000);
    }, 1000);
}

// Reset tutorial state
function resetTutorial7() {
    restaurants = [];
    currentView = 'card';
    
    // Reset UI
    document.querySelector('#view-controls').classList.add('hidden');
    document.querySelector('#display-container').classList.add('hidden');
    document.querySelector('#tutorial-insights').classList.add('hidden');
    document.querySelector('#data-summary').classList.add('hidden');
    
    // Reset status
    const statusDisplay = document.querySelector('#loading-status');
    statusDisplay.classList.remove('loading', 'success', 'error');
    statusDisplay.querySelector('.status-message').textContent = 'Ready to load restaurant inspection data';
    
    // Reset load button
    const loadButton = document.querySelector('#load-data-button');
    loadButton.textContent = 'Load Restaurant Data';
    loadButton.disabled = false;
    
    console.log('Tutorial 7 reset');
}

// Helper functions available globally
function getComplianceStatus(restaurant) {
    const result = restaurant.properties.inspection_results;
    if (!result || result === '------') return 'other';
    return result.toLowerCase().includes('non-compliant') ? 'non-compliant' : 'compliant';
}

function formatDate(dateString) {
    if (!dateString || dateString === '------') return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

function getComplianceIndicator(value) {
    if (!value || value === '------') return 'N/A';
    return value === 'In Compliance' ? '✓' : '✗';
}

// Call these functions in the browser console:
// checkTutorial7Status() - see current state and data analysis
// manualLoadTutorial7() - load data without clicking button
// testAllViews() - automatically test all three views
// resetTutorial7() - reset everything for fresh start