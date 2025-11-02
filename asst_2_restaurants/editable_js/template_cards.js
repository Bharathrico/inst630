
/**
 * CARD VIEW - PROVIDED AS EXAMPLE
 * Display data as browsable cards - good for comparing individual items
 */
function showCards(data) {
    const cardHTML = data.slice(0, 20)
        .map(
            /*html*/
            (restaurant) => `
                <div class="restaurant-card">\
                    <div class="card-status ${getComplianceStatus(restaurant)}"> ${getComplianceStatus(restaurant)}</div>
                    <h3>${restaurant.name}</h3>
                    <p class="restaurant-attribute"><strong>Category:</strong> ${restaurant.category}</p>
                    <p class="restaurant-attribute"><strong>Location:</strong> ${restaurant.city}</p>
                </div>
            `
        )
        .join("");
    /*html*/
    return `
                <div class="view-header">
                <h2 class="view-title">Card View</h2>
                <p class="view-description">You can check if the places are infested or not</p>
                </div>
                <div class="card-grid">
                    ${cardHTML}
                </div>
            `;
}

function getComplianceStatus(restaurant) {
    const result = restaurant.inspection_results;
    if (!result || result === '------') return 'suspicious';
    return result.toLowerCase().includes('non-compliant') ? 'infested' : 'clear';
}

export default showCards;