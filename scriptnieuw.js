const check = () => {

    /* Made a const for the key, cause that's what coders do. Also added a const for searched city... */
    const city = document.getElementById('location').value;
    const apiKey = '30758fa5dafe47208a7122918231311';
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    /* Displaying date of today in html */
    const now = new Date();

    let showdate = document.getElementById('date');
    let localdate = now.toLocaleDateString();
    console.log(localdate);
    showdate.innerHTML = localdate;

    /* Everytime the event is triggered by button or enter-key, all the results get reset. */
    let itemView = document.getElementById('result');
    let rainView = document.getElementById('rain');
    let tempView = document.getElementById('temp');
    itemView.innerHTML = '';
    rainView.innerHTML = '';
    tempView.innerHTML = '';

    let tekstOmschrijving = {};

    tekstOmschrijving.winter = 'Het is berekoud in ' + city + '! Het vriest buiten dus je kan je best warm kleden, een dikke jas, muts, sjaal en handschoenen zijn geen overbodige luxe.';
    tekstOmschrijving.subwinter = 'Het is koud in ' + city + ', vermijd de kans om ziek te worden en draag een dikke jas, lange broek of rok. Draag kleding met een goede pasvorm. Kleding die te los zit, kan te koud zijn, terwijl kleding die te strak zit, kan belemmeren.';
    tekstOmschrijving.herfst = 'Het is fris in ' + city + ', een jas met lange mouwen en een lange broek/panty zijn aangewezen. Zachte, warme stoffen zoals wol en fleece zijn perfect.';
    tekstOmschrijving.lente = 'Met deze temperaturen in ' + city + ' werk je best in laagjes kleding, dit geeft je flexibiliteit om je outfit aan te passen aan het weer.';
    tekstOmschrijving.subzomer =  'Het is warm in ' + city + ' draag lichtgewicht, ademende stoffen. Katoen, linnen en zijde zijn perfect voor deze temperaturen. Draag kleding in lichte kleuren. Lichte kleuren reflecteren het zonlicht en houden je koel.';
    tekstOmschrijving.zomer = 'Het is heel warm in ' + city + ' draag kleding met korte mouwen of zonder mouwen. Dit helpt om je lichaam af te koelen. Draag kleding met een losse pasvorm. Dit zorgt ervoor dat de lucht kan circuleren en dat je niet te warm wordt.';


    //All aboard the fetch-train! We're fetching the location temperature, displaying it into the html and using it for later purposes. 
    //Made a const rain which we can use for displaying the umbrella icon.
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const temperatureCelsius = Math.round(data.current.temp_c);
            let temp = document.getElementById('temp');
            temp.innerHTML = temperatureCelsius + '°C';
            const rain = data.current.precip_mm;
            console.log(rain);


            //Here we made a if else function, if the temperature of the searched location is below, between or above a certain amount of degrees
            //celsius, the application will show other results. Results show different images of clothing advices...
            if (temperatureCelsius <= 0) {
                const image = document.createElement('img');
                image.src = './images/winterv2.png';
                image.className = 'result';
                const parentElement = document.getElementById('result');
                parentElement.appendChild(image);
                const omschrijving = document.getElementById('omschrijvingcontainer');
                omschrijving.innerHTML = tekstOmschrijving.winter;

            } else if (temperatureCelsius > 0 && temperatureCelsius <= 10) {
                const image = document.createElement('img');
                image.src = './images/subwinterv2.png';
                image.className = 'result';
                const parentElement = document.getElementById('result');
                parentElement.appendChild(image);
                console.log(tekstOmschrijving.subwinter);
                const omschrijving = document.getElementById('omschrijvingcontainer');
                omschrijving.innerHTML = tekstOmschrijving.subwinter;



            } else if (temperatureCelsius > 10 && temperatureCelsius <= 15) {
                const image = document.createElement('img');
                image.src = './images/herfstv2.png';
                image.className = 'result';
                const parentElement = document.getElementById('result');
                parentElement.appendChild(image);
                console.log(tekstOmschrijving.herfst);
                const omschrijving = document.getElementById('omschrijvingcontainer');
                omschrijving.innerHTML = tekstOmschrijving.herfst;



            } else if (temperatureCelsius > 15 && temperatureCelsius <= 20) {
                const image = document.createElement('img');
                image.src = './images/lentev2.png';
                image.className = 'result';
                const parentElement = document.getElementById('result');
                parentElement.appendChild(image);
                console.log(tekstOmschrijving.lente);
                const omschrijving = document.getElementById('omschrijvingcontainer');
                omschrijving.innerHTML = tekstOmschrijving.lente;



            } else if (temperatureCelsius > 20 && temperatureCelsius <= 25) {
                const image = document.createElement('img');
                image.src = './images/subzomerv2.png';
                image.className = 'result';
                const parentElement = document.getElementById('result');
                parentElement.appendChild(image);
                console.log(tekstOmschrijving.subzomer);
                const omschrijving = document.getElementById('omschrijvingcontainer');
                omschrijving.innerHTML = tekstOmschrijving.subzomer;



            } else {
                const image = document.createElement('img');
                image.src = './images/zomerv2.png';
                image.className = 'result';
                const parentElement = document.getElementById('result');
                parentElement.appendChild(image);
                console.log(tekstOmschrijving.zomer);
                const omschrijving = document.getElementById('omschrijvingcontainer');
                omschrijving.innerHTML = tekstOmschrijving.zomer;


            }

            // This is the rain-function, displaying different umbrella-icons. Classname added for styling.
            if (rain > 0) {
                const image = document.createElement('img');
                image.src = './images/umbrella.png';
                image.className = 'umbrella';
                const parentElement = document.getElementById('rain');
                parentElement.appendChild(image);
            } else {
                const image = document.createElement('img');
                image.src = './images/umbrella2.png';
                image.className = 'umbrella';
                const parentElement = document.getElementById('rain');
                parentElement.appendChild(image);
            }

            let input = document.getElementById("location");

            // Retrieve existing history from local storage
            let storedHistory = localStorage.getItem('history');
            let existingHistory;

            // Checking of there's a stored history
            if (storedHistory) {
                existingHistory = JSON.parse(storedHistory);
            } else {
                //if not we make existing history to empty array
                existingHistory = [];
            }

            // Add the new search location to the array of history
            existingHistory.push(input.value);

            // Store in local storage
            localStorage.setItem('history', JSON.stringify(existingHistory));
            showHistory();
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};

const showHistory = () => {
    historyList = document.getElementById('historyfield');
    historyList.innerHTML = '';

    historyStorage = JSON.parse(localStorage.getItem('history')) || [];
    for (let i = 0; i < historyStorage.length; i++) {
        const historyItem = historyStorage[i];
        // We concatinate the history list items to eachother
        historyList.innerHTML += `<li>${historyItem}</li>`
    }
}

showHistory();

// Function to clear local storage
const resetHistory = () => {
    localStorage.removeItem('history');
    showHistory(); // Refresh the display after clearing local storage
}

document.getElementById('resetbutton').addEventListener('click', resetHistory);


//We added the eventlistener for the enter-key, when pressed it's searching for weather
document.getElementById('location').addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        check();
    }
});


