// ================= SELECT ELEMENTS =================

let allEvents = [];

const eventsContainer = document.getElementById("events-container");
const searchInput = document.getElementById("event-search");
const searchStatus = document.getElementById("search-status");

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

const eventForm = document.getElementById("event-form");
const formMessage = document.getElementById("form-message");


// ================= LOAD EVENTS FROM JSON =================

async function loadEvents() {

    eventsContainer.innerHTML = "<p>Loading events...</p>";


    fetch("./events.json")

        .then(response => {

            if (!response.ok) {
                throw new Error("JSON file not found");
            }

            return response.json();
        })

        .then(data => {

            allEvents = data;

            displayEvents(allEvents);

            searchStatus.textContent =
                allEvents.length + " events loaded successfully.";

        })

        .catch(error => {

            eventsContainer.innerHTML =
                "<p>Unable to load events. Please try again.</p>";

            searchStatus.textContent = "Error loading events.";

            console.log(error);

        });
}


// ================= DISPLAY EVENT CARDS =================

function displayEvents(events) {

    eventsContainer.innerHTML = "";

    if (events.length === 0) {

        eventsContainer.innerHTML = "<p>No events found.</p>";

        return;
    }

    events.forEach(event => {

        const card = document.createElement("article");

        card.className = "event-card";

        card.innerHTML = `

            <div class="event-icon">${event.icon}</div>

            <span class="event-tag">${event.category}</span>

            <h3>${event.title}</h3>

            <p><strong>Date:</strong> ${event.date}</p>

            <p><strong>Time:</strong> ${event.time}</p>

            <p><strong>Venue:</strong> ${event.venue}</p>

            <p>${event.description}</p>

            <a href="#submit-event"
               class="card-link"
               data-event-id="${event.id}">
               Participate →
            </a>

        `;

        eventsContainer.appendChild(card);

    });

}


// ================= SEARCH EVENTS =================

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    const filteredEvents = allEvents.filter(event => {

        return (
            event.title.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText) ||
            event.description.toLowerCase().includes(searchText)
        );

    });

    displayEvents(filteredEvents);

    searchStatus.textContent =
        filteredEvents.length + " events found.";

});


// ================= MENU BUTTON =================

if (menuButton && navLinks) {

    menuButton.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}


// ================= KEYBOARD EVENT =================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        searchInput.value = "";

        displayEvents(allEvents);

        searchStatus.textContent =
            allEvents.length + " events loaded.";

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    }

});


// ================= EVENT PARTICIPATION =================

eventsContainer.addEventListener("click", function (event) {

    const target = event.target.closest("[data-event-id]");

    if (target) {

        const eventId = target.dataset.eventId;

        console.log("Participating in event ID:", eventId);

    }

});


// ================= FORM VALIDATION =================

if (eventForm) {

    eventForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const eventName =
            document.getElementById("event-name").value.trim();

        const eventDate =
            document.getElementById("event-date").value;

        const location =
            document.getElementById("location").value.trim();

        const category =
            document.getElementById("category").value;

        const email =
            document.getElementById("email").value.trim();

        const description =
            document.getElementById("description").value.trim();


        if (
            eventName.length < 3 ||
            !eventDate ||
            location.length < 3 ||
            !category ||
            !email ||
            description.length < 10
        ) {

            formMessage.textContent =
                "Please fill all fields correctly.";

            formMessage.style.color = "red";

            return;
        }


        formMessage.textContent =
            "Event submitted successfully!";

        formMessage.style.color = "green";

        eventForm.reset();

    });

}


// ================= LOAD EVENTS =================

loadEvents();

console.log("JavaScript connected successfully!");