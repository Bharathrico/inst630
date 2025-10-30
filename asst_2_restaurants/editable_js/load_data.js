// ============================================
// DATA LOADING - Students modify this
// ============================================
/**
 * Load data from API - Students replace with their chosen endpoint
 */
async function loadData() {
  try {
    // TODO: Replace with student's chosen API
    // Examples:
    // const response = await fetch('https://data.princegeorgescountymd.gov/resource/xxxx.json');
    // const response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY');
    // const data = await response.json();

    const response = await fetch ("./data.json")
    const data = await response.json();
    console.log("data loaded", data);
    console.log(data.length)
    if(response.ok)
    {
      let newArray = []
      data.reduce((acc,current)=>{ 
        let currentEstablishment = acc.find((res) => current.establishment_id == res.establishment_id)
      if(currentEstablishment==undefined)
      {
        acc.push(current)
        return acc
      }
      else
      {
      return acc
      }
    }, newArray, )
      return newArray
    }
    
    // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // return mockRestaurantData;
  } catch (error) {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data from API");
  }
}

export default loadData