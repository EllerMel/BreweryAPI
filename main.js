document.getElementById('getData').addEventListener('click', getTheData)

apiURL = 'https://api.openbrewerydb.org/breweries?by_city=Lexington&by_state=KY&per_page=15'

function getTheData() {
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
                        <li>${i.name}</li>
                        <li>Brewery Type - ${i.brewery_type}</li>
                        <li>${i.street} ${i.city}, ${i.state} ${i.postal_code}</li>
                        <li>${i.phone}</li>   
                        <li>${i.website_url}</li>                                                                    
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

function FormatPhoneNumber(num) {
    var str = num.toString();

    var matched = str.match(/\d+\.?\d*/g);

    // 10 digit
    if (matched.length === 3) {
        return '(' + matched[0] + ') ' + matched[1] + '-' + matched[2];
        // 7 digit
    } else if (matched.length === 2) {
        return matched[0] + '-' + matched[1];
    }
    // no formatting attempted only found integers (i.e. 1234567890)
    else if (matched.length === 1) {
        // 10 digit
        if (matched[0].length === 10) {
            return '(' + matched[0].substr(0, 3) + ') ' + matched[0].substr(3, 3) + '-' + matched[0].substr(6);
        }
        // 7 digit
        if (matched[0].length === 7) {
            return matched[0].substr(0, 3) + '-' + matched[0].substr(3);
        }
    }
    // Format failed, return number back
    return num;
}    