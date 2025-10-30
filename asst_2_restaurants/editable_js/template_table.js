
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */
function showTable(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Show data in a table format
  // - Include all important fields
  // - Make it easy to scan and compare
  // - Consider adding sorting functionality
  /*html*/ 
  let tableContent =  `
                <h2 class="view-title">📊 Table View</h2>
                <div class="table-container">
                    <table id="inspection-table" class="inspection-table">
                        <thead>
                            <tr>
                                <th>Restaurant</th>
                                <th>City</th>
                                <th>Inspection Date</th>
                                <th>Results</th>
                                <th>Hand Washing</th>
                                <th>Food Temperature</th>
                            </tr>
                        </thead>
                        <tbody>`
  tableContent = showTableView(tableContent,data)
                            
  tableContent+= `      </tbody>
                    </table>
                </div>
                </div>`
  return tableContent;
}

function showTableView(tableContent,data) {
        
        // YOUR CODE HERE:
        const restaurants = slicedArray(data,0,9)
        restaurants.forEach((restaurant)=>{
            tableContent+='<tr>'
            

            tableContent+=`<td class='table-restaurant-name'>${restaurant.name}</td>`

            tableContent+=`<td>${restaurant.city}</td>`

            tableContent+=`<td>${formatDate(restaurant.inspection_date)}</td>`

            //inspection_results-getComplianceStatus-to be updated
            tableContent+=`<td class="table-status ${getComplianceStatus(restaurant)}">${restaurant.inspection_results}</td>`
            
            //getHandwashingCompliance-to be updated
            tableContent+=`<td class="compliance-indicator ${getHandWashingCompliance(restaurant)[0]}">${getHandWashingCompliance(restaurant)[1]}</td>`
            
            //getTempCompliance-to be updated
            tableContent+=`<td class="compliance-indicator ${getTempCompliance(restaurant)[0]}">${getTempCompliance(restaurant)[1]}</td>`

           tableContent+='</tr>'
        })
        console.log('Table view: Emphasizing safety record comparison');

        return tableContent;
    }
    
     function slicedArray(data,first, last)
    {
        return data.slice(first, last)
    }

    function formatDate(dateString) {
        if (!dateString || dateString === '------') return 'No date';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    // Helper: handwashing check
    function getHandWashingCompliance(restaurant)
    {
        if(getComplianceIndicator(restaurant.proper_hand_washing)!='N/A'
        &&getComplianceIndicator(restaurant.adequate_hand_washing)!='N/A')
        {
            if(getComplianceIndicator(restaurant.proper_hand_washing)=='✓'
        &&getComplianceIndicator(restaurant.adequate_hand_washing)=='✓')
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
        if(getComplianceIndicator(restaurant.cold_holding_temperature)!='N/A'
        &&getComplianceIndicator(restaurant.hot_holding_temperature)!='N/A')
        {
            if(getComplianceIndicator(restaurant.cold_holding_temperature)=='✓'
        &&getComplianceIndicator(restaurant.hot_holding_temperature)=='✓')
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
     function getComplianceStatus(restaurant) {
        const result = restaurant.inspection_results;
        if (!result || result === '------') return 'other';
        return result.toLowerCase().includes('non-compliant') ? 'non-compliant' : 'compliant';
    }
    function getComplianceIndicator(value) {
    if (!value || value === '------') return 'N/A';
    return value === 'In Compliance' ? '✓' : '✗';
}
export default showTable;