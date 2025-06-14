function CreateEvent() {
    const actionDiv = document.getElementById('action');
    actionDiv.innerHTML = '';

    let title = document.createElement('h3');
    title.innerHTML = "Creating Event ";
    actionDiv.appendChild(title);

    const eventNameLabel = document.createElement('label');
    eventNameLabel.textContent = 'Event Name:';
    actionDiv.appendChild(eventNameLabel);

    const eventNameInput = document.createElement('input');
    eventNameInput.type = 'text';
    eventNameInput.id = 'eventName';
    eventNameInput.placeholder = 'Event Name';
    actionDiv.appendChild(eventNameInput);

    actionDiv.appendChild(document.createElement('br'));

    const startDateLabel = document.createElement('label');
    startDateLabel.textContent = 'Start Date & Time:';
    actionDiv.appendChild(startDateLabel);

    const startDateInput = document.createElement('input');
    startDateInput.type = 'datetime-local';
    startDateInput.id = 'startDate';
    actionDiv.appendChild(startDateInput);

    actionDiv.appendChild(document.createElement('br'));

    const endDateLabel = document.createElement('label');
    endDateLabel.textContent = 'End Date & Time:';
    actionDiv.appendChild(endDateLabel);

    const endDateInput = document.createElement('input');
    endDateInput.type = 'datetime-local';
    endDateInput.id = 'endDate';
    actionDiv.appendChild(endDateInput);

    actionDiv.appendChild(document.createElement('br'));

    const maxRegistrationsLabel = document.createElement('label');
    maxRegistrationsLabel.textContent = 'Max Registrations:';
    actionDiv.appendChild(maxRegistrationsLabel);

    const maxRegistrationsInput = document.createElement('input');
    maxRegistrationsInput.type = 'number';
    maxRegistrationsInput.id = 'maxRegistrations';
    maxRegistrationsInput.placeholder = '0';
    actionDiv.appendChild(maxRegistrationsInput);

    actionDiv.appendChild(document.createElement('br'));

    const locationLabel = document.createElement('label');
    locationLabel.textContent = 'Location:';
    actionDiv.appendChild(locationLabel);

    const locationInput = document.createElement('input');
    locationInput.type = 'text';
    locationInput.id = 'location';
    locationInput.placeholder = 'Location';
    actionDiv.appendChild(locationInput);

    actionDiv.appendChild(document.createElement('br'));

    const createButton = document.createElement('button');
    createButton.textContent = 'Create Event';
    createButton.onclick = () => { CreateEventDB(); };
    actionDiv.appendChild(createButton);
}

function CreateEventDB() {
    let en = document.getElementById("eventName").value;
    let sd = document.getElementById("startDate").value;
    let ed = document.getElementById("endDate").value;
    let mr = document.getElementById("maxRegistrations").value;
    let lc = document.getElementById("location").value;

    if (!en || !sd || !ed || !mr || !lc) {
        alert("Must fill in all fields before submitting");
        return;
    }

    var eventData = {
        eventName: en,
        startDate: sd,
        endDate: ed,
        maxRegistrations: mr,
        location: lc
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
    };

    const url = 'http://localhost:5116/api/Events/';
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.log(error);
        });
}

function GetEventUsers(eventId) {
    const actionDiv = document.getElementById('action');
    actionDiv.innerHTML = '';

    let title = document.createElement('h3');
    title.innerHTML = "Users Registered To Event " + eventId;
    actionDiv.appendChild(title);

    let table = document.createElement('table');
    table.id = 'eventUsers';
    actionDiv.appendChild(table);

    const url = 'http://localhost:5116/api/Events/' + eventId + '/registration';

    let th1 = document.createElement("th");
    th1.innerHTML = "User ID";
    let th2 = document.createElement("th");
    th2.innerHTML = "User Name";
    let th3 = document.createElement("th");
    th3.innerHTML = "Date Of Birth";
    table.appendChild(th1);
    table.appendChild(th2);
    table.appendChild(th3);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            for (let i in data) {
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                td1.innerHTML = data[i].id;
                td2.innerHTML = data[i].name;
                td3.innerHTML = data[i].dateOfBirth;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                table.appendChild(tr);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function RegisterUserToEvent(eventID) {
    const actionDiv = document.getElementById('action');
    actionDiv.innerHTML = '';

    const title = document.createElement('h3');
    title.innerHTML = "Registering To Event " + eventID;
    actionDiv.appendChild(title);

    const eventIdLabel = document.createElement('label');
    eventIdLabel.textContent = 'Event ID:';
    actionDiv.appendChild(eventIdLabel);

    const eventIdInput = document.createElement('input');
    eventIdInput.type = 'text';
    eventIdInput.id = 'eventIdR';
    eventIdInput.value = eventID;
    eventIdInput.readOnly = true;
    actionDiv.appendChild(eventIdInput);

    actionDiv.appendChild(document.createElement('br'));

    const userIdLabel = document.createElement('label');
    userIdLabel.textContent = 'User ID:';
    actionDiv.appendChild(userIdLabel);

    const userIdInput = document.createElement('input');
    userIdInput.type = 'text';
    userIdInput.id = 'userId';
    userIdInput.placeholder = 'User ID';
    actionDiv.appendChild(userIdInput);

    actionDiv.appendChild(document.createElement('br'));

    const userNameLabel = document.createElement('label');
    userNameLabel.textContent = 'User Name:';
    actionDiv.appendChild(userNameLabel);

    const userNameInput = document.createElement('input');
    userNameInput.type = 'text';
    userNameInput.id = 'userName';
    userNameInput.placeholder = 'Name';
    actionDiv.appendChild(userNameInput);

    actionDiv.appendChild(document.createElement('br'));

    const dobLabel = document.createElement('label');
    dobLabel.textContent = 'Date of Birth:';
    actionDiv.appendChild(dobLabel);

    const dobInput = document.createElement('input');
    dobInput.type = 'date';
    dobInput.id = 'dob';
    actionDiv.appendChild(dobInput);

    actionDiv.appendChild(document.createElement('br'));

    const registerButton = document.createElement('button');
    registerButton.textContent = 'Register User To Event';
    registerButton.onclick = () => { RegisterUserToEventDB() };
    actionDiv.appendChild(registerButton);
}

function RegisterUserToEventDB() {
    let eventId = document.getElementById("eventIdR").value;
    let ui = document.getElementById("userId").value;
    let un = document.getElementById("userName").value;
    let dob = document.getElementById("dob").value;

    if (!eventId || !ui || !un || !dob) {
        alert("Must fill in all fields before registering");
        return;
    }

    var userData = {
        id: ui,
        name: un,
        dateOfBirth: dob
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    const url = 'http://localhost:5116/api/Events/' + eventId + '/registration';
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.log(error);
        });
}

function GetEvent() {
    const actionDiv = document.getElementById('action');
    actionDiv.innerHTML = '';

    let title = document.createElement('h3');
    title.innerHTML = "View Event Details ";
    actionDiv.appendChild(title);

    const eventIdLabel = document.createElement('label');
    eventIdLabel.textContent = 'Event ID:';
    actionDiv.appendChild(eventIdLabel);

    const eventIdInput = document.createElement('input');
    eventIdInput.type = 'text';
    eventIdInput.id = 'eventIdD';
    eventIdInput.placeholder = 'Event ID';
    actionDiv.appendChild(eventIdInput);

    const getButton = document.createElement('button');
    getButton.textContent = 'Get Event Details';
    getButton.onclick = () => { GetEventDB(); };
    actionDiv.appendChild(getButton);

    const getEventDiv = document.createElement('div');
    getEventDiv.id = 'getEvent';
    actionDiv.appendChild(getEventDiv);
}

function GetEventDB() {
    let eventId = document.getElementById("eventIdD").value;
    let div = document.getElementById("getEvent");

    if (!eventId) {
        alert("Must fill event id field before submitting");
        return;
    }

    const url = 'http://localhost:5116/api/Events/' + eventId;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            div.innerHTML = "Event ID: " + data.id + "<br>Event Name: " + data.name + "<br>Start Date: " + data.startDate + "<br>End Date: " + data.endDate +
                "<br>Max Registrations: " + data.maxRegistrations + "<br>Location: " + data.location;
            div.innerHTML += "<br><a href=\"https://www.addtoany.com/share#url=http%3A%2F%2Flocalhost%3A5116%2Fapi%2FEvents%2F" + data.id + "&amp;title=\" target=\"_blank\">Share</a>";
            div.innerHTML += "<br>";

            const button = document.createElement("button");
            button.innerHTML = "Show Location On Map";
            button.onclick = () => { loadMap(data.location); };

            div.appendChild(button);
        })
        .catch(error => {
            console.log(error);
        });
}

function UpdateEvent(eventID) {
    const actionDiv = document.getElementById('action');
    actionDiv.innerHTML = '';

    let title = document.createElement('h3');
    title.innerHTML = "Updating Event " + eventID;
    actionDiv.appendChild(title);

    const eventIdLabel = document.createElement('label');
    eventIdLabel.textContent = 'Event ID:';
    actionDiv.appendChild(eventIdLabel);

    const eventIdInput = document.createElement('input');
    eventIdInput.type = 'text';
    eventIdInput.id = 'eventIdU';
    eventIdInput.value = eventID;
    eventIdInput.readOnly = true;
    actionDiv.appendChild(eventIdInput);

    actionDiv.appendChild(document.createElement('br'));

    const eventNameLabel = document.createElement('label');
    eventNameLabel.textContent = 'Event Name:';
    actionDiv.appendChild(eventNameLabel);

    const eventNameInput = document.createElement('input');
    eventNameInput.type = 'text';
    eventNameInput.id = 'eventNameU';
    eventNameInput.placeholder = 'Event Name';
    actionDiv.appendChild(eventNameInput);

    actionDiv.appendChild(document.createElement('br'));

    const startDateLabel = document.createElement('label');
    startDateLabel.textContent = 'Start Date & Time:';
    actionDiv.appendChild(startDateLabel);

    const startDateInput = document.createElement('input');
    startDateInput.type = 'datetime-local';
    startDateInput.id = 'startDateU';
    actionDiv.appendChild(startDateInput);

    actionDiv.appendChild(document.createElement('br'));

    const endDateLabel = document.createElement('label');
    endDateLabel.textContent = 'End Date & Time:';
    actionDiv.appendChild(endDateLabel);

    const endDateInput = document.createElement('input');
    endDateInput.type = 'datetime-local';
    endDateInput.id = 'endDateU';
    actionDiv.appendChild(endDateInput);

    actionDiv.appendChild(document.createElement('br'));

    const maxRegistrationsLabel = document.createElement('label');
    maxRegistrationsLabel.textContent = 'Max Registrations:';
    actionDiv.appendChild(maxRegistrationsLabel);

    const maxRegistrationsInput = document.createElement('input');
    maxRegistrationsInput.type = 'number';
    maxRegistrationsInput.id = 'maxRegistrationsU';
    maxRegistrationsInput.placeholder = '1';
    actionDiv.appendChild(maxRegistrationsInput);

    actionDiv.appendChild(document.createElement('br'));

    const locationLabel = document.createElement('label');
    locationLabel.textContent = 'Location:';
    actionDiv.appendChild(locationLabel);

    const locationInput = document.createElement('input');
    locationInput.type = 'text';
    locationInput.id = 'locationU';
    locationInput.placeholder = 'Location';
    actionDiv.appendChild(locationInput);

    actionDiv.appendChild(document.createElement('br'));

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update Event';
    updateButton.onclick = () => { UpdateEventDB() };
    actionDiv.appendChild(updateButton);
}

function UpdateEventDB() {
    let eventId = document.getElementById("eventIdU").value;
    let en = document.getElementById("eventNameU").value;
    let sd = document.getElementById("startDateU").value;
    let ed = document.getElementById("endDateU").value;
    let mr = document.getElementById("maxRegistrationsU").value;
    let lc = document.getElementById("locationU").value;

    var eventData = {
        eventName: en ? en : null,
        startDate: sd ? sd : null,
        endDate: ed ? ed : null,
        maxRegistrations: mr ? mr : null,
        location: lc ? lc : null
    };

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
    };

    const url = 'http://localhost:5116/api/Events/' + eventId;
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            GetSchedule();
            alert(data.message);
        })
        .catch(error => {
            console.log(error);
        });
}

function DeleteEvent(eventId) {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    const url = 'http://localhost:5116/api/Events/' + eventId;
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.log(error);
        });
}

function GetSchedule() {
    let start = document.getElementById("startDateS").value;
    let end = document.getElementById("endDateS").value;

    const url = 'http://localhost:5116/api/Events/schedule?startDate=' + start + '&endDate=' + end;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            CreateEventTable(data);
        })
        .catch(error => {
            console.log(error);
        });
}

function CreateEventTable(data) {
    const actionDiv = document.getElementById('action');
    actionDiv.innerHTML = '';

    let table = document.getElementById("schedule");
    let tableContainer = document.getElementById("table-wrapper");
    table.innerHTML = '';

    while (tableContainer.children.length > 1) {
        tableContainer.removeChild(tableContainer.lastChild);
    }

    if (data == "") {
        table.innerHTML = "No Events in The Requested Dates";
        return;
    }

    let tr = document.createElement("tr");
    let headers = ["Event ID", "Event Name", "Start Date", "End Date", "Max Registration", "Location", "Weather"];
    headers.forEach(header => {
        let th = document.createElement("th");
        th.innerHTML = header;
        tr.appendChild(th);
    });
    table.appendChild(tr);

    let buttonContainer1 = document.createElement("div");
    buttonContainer1.className = "buttonContainer";
    tableContainer.appendChild(buttonContainer1);

    let buttonContainer2 = document.createElement("div");
    buttonContainer2.className = "buttonContainer";
    tableContainer.appendChild(buttonContainer2);

    let buttonContainer3 = document.createElement("div");
    buttonContainer3.className = "buttonContainer";
    tableContainer.appendChild(buttonContainer3);

    let buttonContainer4 = document.createElement("div");
    buttonContainer4.className = "buttonContainer";
    tableContainer.appendChild(buttonContainer4);

    let buttonContainer5 = document.createElement("div");
    buttonContainer5.className = "buttonContainer";
    tableContainer.appendChild(buttonContainer5);

    for (let i in data) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");

        td1.innerHTML = data[i].id;
        td2.innerHTML = data[i].name;
        td3.innerHTML = data[i].startDate;
        td4.innerHTML = data[i].endDate;
        td5.innerHTML = data[i].maxRegistrations;
        td6.innerHTML = data[i].location;
        td7.innerHTML = "Loading..."; // Placeholder until weather data is fetched

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        table.appendChild(tr);

        let button1 = document.createElement("button");
        button1.innerHTML = "Delete Event";
        button1.onclick = () => { DeleteEvent(data[i].id); };
        buttonContainer1.appendChild(button1);

        let button2 = document.createElement("button");
        button2.innerHTML = "Update Event";
        button2.onclick = () => { UpdateEvent(data[i].id); };
        buttonContainer2.appendChild(button2);

        let button3 = document.createElement("button");
        button3.innerHTML = "Register To Event";
        button3.onclick = () => { RegisterUserToEvent(data[i].id); };
        buttonContainer3.appendChild(button3);

        let button4 = document.createElement("button");
        button4.innerHTML = "View Attendees";
        button4.onclick = () => { GetEventUsers(data[i].id); };
        buttonContainer4.appendChild(button4);

        let button5 = document.createElement("button");
        button5.innerHTML = "Find On Map";
        button5.onclick = () => {
            const actionDiv = document.getElementById('action');
            actionDiv.innerHTML = '';
            loadMap(data[i].location);
        };
        buttonContainer5.appendChild(button5);

        // Fetch weather data and update td7 when available
        GetWeather(data[i].id)
            .then(weather => {
                td7.innerHTML = weather || "N/A";
            }).catch(error => {
                console.log(error);
            });
    }
}

function GetWeather(eventID) {
    const url = 'http://localhost:5116/api/Events/' + eventID + '/weather';
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data.weather;
        })
        .catch(error => {
            console.log(error);
        });
}

function loadMap(location) {
    const actionDiv = document.getElementById('action');

    let mapContainer = document.createElement('div');
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
    mapContainer.innerHTML += `
        <iframe
            width="700"
            height="450"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="${mapUrl}">
        </iframe>
    `;
    actionDiv.appendChild(mapContainer);
}

function GetUsers() {
    const url = 'http://localhost:5116/api/Events/users';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            CreateUserTable(data);
        })
        .catch(error => {
            console.log(error);
        });
}

function CreateUserTable(data) {
    const actionDiv = document.getElementById('action');
    actionDiv.innerHTML = '';

    let table = document.getElementById("schedule");
    let tableContainer = document.getElementById("table-wrapper");
    table.innerHTML = '';

    while (tableContainer.children.length > 1) {
        tableContainer.removeChild(tableContainer.lastChild);
    }

    if (data == "") {
        table.innerHTML = "No Users Found...";
        return;
    }

    let tr = document.createElement("tr");
    let headers = ["User ID", "User Name", "Date Of Birth"];
    headers.forEach(header => {
        let th = document.createElement("th");
        th.innerHTML = header;
        tr.appendChild(th);
    });
    table.appendChild(tr);

    let buttonContainer1 = document.createElement("div");
    buttonContainer1.className = "buttonContainer2";
    tableContainer.appendChild(buttonContainer1);

    let buttonContainer2 = document.createElement("div");
    buttonContainer2.className = "buttonContainer2";
    tableContainer.appendChild(buttonContainer2);

    for (let i in data) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        td1.innerHTML = data[i].id;
        td2.innerHTML = data[i].name;
        td3.innerHTML = data[i].dateOfBirth;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);

        let button1 = document.createElement("button");
        button1.innerHTML = "Update User";
        button1.onclick = () => { UpdateUser(data[i].id); };
        buttonContainer1.appendChild(button1);
    }
}

function UpdateUser(userID) {
    const actionDiv = document.getElementById('action');
    actionDiv.innerHTML = '';

    let title = document.createElement('h3');
    title.innerHTML = "Updating User " + userID;
    actionDiv.appendChild(title);

    const userIdLabel = document.createElement('label');
    userIdLabel.textContent = 'User ID:';
    actionDiv.appendChild(userIdLabel);

    const userIdInput = document.createElement('input');
    userIdInput.type = 'text';
    userIdInput.id = 'userIdU';
    userIdInput.value = userID;
    userIdInput.readOnly = true;
    actionDiv.appendChild(userIdInput);

    actionDiv.appendChild(document.createElement('br'));

    const userNameLabel = document.createElement('label');
    userNameLabel.textContent = 'User Full Name:';
    actionDiv.appendChild(userNameLabel);

    const userNameInput = document.createElement('input');
    userNameInput.type = 'text';
    userNameInput.id = 'userNameU';
    userNameInput.placeholder = 'Full Name';
    actionDiv.appendChild(userNameInput);

    actionDiv.appendChild(document.createElement('br'));

    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Date Of Birth:';
    actionDiv.appendChild(dateLabel);

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'dateU';
    actionDiv.appendChild(dateInput);

    actionDiv.appendChild(document.createElement('br'));

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update User';
    updateButton.onclick = () => { UpdateUserDB() };
    actionDiv.appendChild(updateButton);
}

function UpdateUserDB() {
    let userId = document.getElementById("userIdU").value;
    let name = document.getElementById("userNameU").value;
    let date = document.getElementById("dateU").value;

    var userData = {
        id: userId ? userId : null,
        name: name ? name : null,
        dob: date ? date : null
    };

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    const url = 'http://localhost:5116/api/Events/updateuser/' + userId;
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            GetUsers();
            alert(data.message);
        })
        .catch(error => {
            console.log(error);
        });
}

function fetchTrivia() {
    const url = 'http://numbersapi.com/random';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('trivia').innerHTML = '<strong>Interesting Trivia</strong><br><br>' + data;
        })
        .catch(error => {
            console.log('Error fetching trivia: ' + error.message);
        });
}
