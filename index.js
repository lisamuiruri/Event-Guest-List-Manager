document.addEventListener('DOMContentLoaded', () => {
    const Form = document.getElementById('guestForm');
    const Input = document.getElementById('guestNameInput');
    const guestList = document.getElementById('guestList');

       Form. addEventListener(`submit`, function (event) {
          event.preventDefault();

          const name = this.input.value.trim();
          if (name === ``) return;

          const li = document.createElement(`li`);
           li.textContent = name;
           guestList.appendChild(li);

           input.value = ``;
       });

    const MAX_GUESTS = 10;
    let currentGuests = []; // To keep track of guests and their RSVP status

    // Function to render/update the guest list on the page
    function renderGuestList() {
        guestList.innerHTML = ''; // Clear existing list

        currentGuests.forEach((guest, index) => {
            const listItem = document.createElement('li');

            // Guest name
            const guestNameSpan = document.createElement('span');
            guestNameSpan.textContent = guest.name;
            listItem.appendChild(guestNameSpan);

            // RSVP Status display
            const rsvpStatusSpan = document.createElement('span');
            rsvpStatusSpan.classList.add(guest.attending ? 'attending' : 'not-attending');
            rsvpStatusSpan.textContent = guest.attending ? ' (Attending)' : ' (Not Attending)';
            listItem.appendChild(rsvpStatusSpan);

            // Container for buttons
            const buttonContainer = document.createElement('div');

            // Toggle RSVP button
            const toggleRsvpButton = document.createElement('button');
            toggleRsvpButton.textContent = guest.attending ? 'Mark Not Attending' : 'Mark Attending';
            toggleRsvpButton.classList.add('toggle-rsvp-btn');
            toggleRsvpButton.addEventListener('click', () => toggleRsvp(index));
            buttonContainer.appendChild(toggleRsvpButton);

            // Remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeGuest(index));
            buttonContainer.appendChild(removeButton);

            listItem.appendChild(buttonContainer);
            guestList.appendChild(listItem);
        });
    }

    // Add Guest function
    guestForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission (page reload)

        const guestName = guestNameInput.value.trim();

        if (guestName === '') {
            alert('Please enter a guest name.');
            return;
        }

        if (currentGuests.length >= MAX_GUESTS) {
            alert(`Guest list is full! Maximum ${MAX_GUESTS} guests allowed.`);
            guestNameInput.value = ''; // Clear input even if full
            return;
        }

        // Add new guest to our array (defaulting to Attending)
        currentGuests.push({ name: guestName, attending: true });
        guestNameInput.value = ''; // Clear input field

        renderGuestList(); // Re-render the list
    });

    // Remove Guest function
    function removeGuest(index) {
        if (confirm(`Are you sure you want to remove "${currentGuests[index].name}"?`)) {
            currentGuests.splice(index, 1); // Remove guest from array
            renderGuestList(); // Re-render the list
        }
    }

    // Toggle RSVP function
    function toggleRsvp(index) {
        currentGuests[index].attending = !currentGuests[index].attending; // Flip the status
        renderGuestList(); // Re-render to update status display
    }

    // Initial render (in case you want to load some default guests or from local storage later)
    renderGuestList();
});