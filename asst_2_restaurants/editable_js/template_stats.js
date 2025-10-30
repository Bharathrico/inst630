/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */
function showStats(data) {
  // TODO: Students implement this function
  // Requirements:
  // - Calculate meaningful statistics from the dataset
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data
  /*html*/
  let statContent = `
                <h2 class="view-title">📈 Statistics View</h2>
                <div id="stats-grid" class="stats-grid">`
      
      let {statsGrid,cityStat} =showStatsView(data)

      console.log(statsGrid)

      statContent+= statsGrid
      
      statContent+=`</div>
                <div id="city-breakdown" class="city-breakdown">
                    <h4>Compliance by City</h4>
                    <div id="city-stats" class="city-stats">`
      
      statContent+=cityStat
      
      statContent+=`
                    </div>
                </div>
            `


    return statContent
}

function showStatsView(restaurants) {
        let cityCompliances = {}

        restaurants.forEach((restaurant)=>{
            let cityname = restaurant.city.toLowerCase()
            if(cityCompliances[cityname])
            {
            cityCompliances[cityname] = { 
                restaurantCount : cityCompliances[cityname].restaurantCount+1,
                compliance : getComplianceStatus(restaurant)=="compliant"? 
                                cityCompliances[cityname].compliance+1 : cityCompliances[cityname].compliance,
                nonCompliance : getComplianceStatus(restaurant)=="non-compliant"? 
                                cityCompliances[cityname].nonCompliance+1 : cityCompliances[cityname].nonCompliance,                
                percentage : Math.floor(compliancePercentage(cityCompliances[cityname].compliance,cityCompliances[cityname].restaurantCount))
            }
            }
            else
            {
                cityCompliances[cityname] = { 
                restaurantCount : 1,
                compliance :  getComplianceStatus(restaurant)=="compliant"? 1 : 0,
                nonCompliance:  getComplianceStatus(restaurant)=="non-compliant"? 1 : 0,
                percentage: getComplianceStatus(restaurant)=="compliant"? 100 : 0
             }
            }
        })

        let cityList = Object.entries(cityCompliances).sort(([,a],[,b]) => b.percentage - a.percentage  )
        console.log(cityList[0][0])
        //citystat 
        let cityStat=``
        cityList.forEach((city)=>{

            cityStat+=`<div class="city-stat">
                <div class="city-name" style="text-transform: capitalize">
                ${city[0]}
                </div>
                <div class="city-compliance">
                ${city[1].compliance}/${city[1].restaurantCount}
                </div>
            </div>`
        })
        cityList.sort(([,a],[,b])=> b.restaurantCount - a.restaurantCount)

        let nonComplianceTotal = 0
        cityList.forEach((city)=>{
            nonComplianceTotal+=city[1].nonCompliance
        })

        //statsgrid
        let statsGrid=``

        statsGrid+=`<div class="stat-card">
                        <div class="stat-label">City with most restaurants: ${cityList[0][0]} </div>
                        <div class="stat-number">${cityList[0][1].restaurantCount} </div>
                    </div>`

        statsGrid+=`<div class="stat-card">
                        <div class="stat-label">Number of non-compliant restaurants:</div>
                        <div class="stat-number">${nonComplianceTotal} </div>
                    </div>`

        cityList.sort(([,a],[,b])=> b.nonCompliance - a.nonCompliance)

        statsGrid+=`<div class="stat-card">
                        <div class="stat-label">City with most non-compliant restaurants: ${cityList[0][0]}</div>
                        <div class="stat-number">${cityList[0][1].nonCompliance} </div>
                    </div>`

        console.log('Stats view: Emphasizing county-wide patterns');
        
        return {statsGrid,cityStat}
        
        
    }

    
    function getComplianceStatus(restaurant) {
        const result = restaurant.inspection_results;
        if (!result || result === '------') return 'other';
        return result.toLowerCase().includes('non-compliant') ? 'non-compliant' : 'compliant';
    }

    function compliancePercentage(numerator, denominator)
    {
        return (numerator/denominator) *100
    }

export default showStats