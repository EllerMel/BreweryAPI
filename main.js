document.getElementById('getData').addEventListener('click', getTheData)

function getTheData() {

    var city = document.getElementById('City').value;
    console.log(city);
    var state = document.getElementById('State').value;
    console.log(state);

    if (city != "" && state != ""){
        apiURL = `https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}&per_page=15`;
        console.log(apiURL);
    }
    else if (city = "" && state != ""){
        apiURL = `https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=15`;
        console.log(apiURL);
    }
    else if (city != "" && state == ""){
        apiURL = `https://api.openbrewerydb.org/breweries?by_city=${city}&per_page=15`;
        console.log(apiURL);
    }

    fetch(apiURL)
        .then(function (response) {
            //console.log(response.json());
            return (response.json());
        })
        .then(function (data) {
            console.log(data);
            console.log(data.length);
            let brews = ''
            data.map(function (i) {
                brews += `
                        <ul>
                        <li><b>${i.name}</b></li>
                        <li><Brewery Type - ${i.brewery_type}</li>
                        <li>${i.street} ${i.city}, ${i.state} ${i.postal_code}</li>                   
                        <li>${i.phone}</li>   
                        <li><a href="${i.website_url}" target="_blank">${i.website_url}</a></li>                                                                    
                    </ul>`
            })
            document.getElementById('brewery').style.display = "block";
            document.getElementById('brewery').innerHTML = brews
            document.getElementById('mainImage').style.display = "none";
        })
}

document.getElementById('getClear').addEventListener('click', getClearData)
function getClearData() {
    document.getElementById('mainImage').style.display = "block";
    document.getElementById('brewery').style.display = "none";
    document.getElementById('City').value = "";
    document.getElementById('State').value = "";
}