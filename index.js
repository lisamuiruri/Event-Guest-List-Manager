document.addEventListener('DOMContentLoaded', () => {
    const guestForm = document.getElementById('guestForm');
    const guestNameInput = document.getElementById('guestNameInput');
    const guestList = document.getElementById('guestlist');

    const MAX_GUESTS = 10;
    let currentGuests = [];

    function renderGuestList() {
        guestList.innerHTML = '';

        currentGuests.forEach((guest, index) => {
            const listItem = document.createElement('li');

            const guestNameSpan = document.createElement('span');
            guestNameSpan.textContent = guest.name;
            listItem.appendChild(guestNameSpan);

            const rsvpStatusSpan = document.createElement('span');
            rsvpStatusSpan.classList.add(guest.attending ? 'attending' : 'not-attending');
            rsvpStatusSpan.textContent = guest.attending ? ' (Attending)' : ' (Not Attending)';
            listItem.appendChild(rsvpStatusSpan);

            const buttonContainer = document.createElement('div');

            const toggleRsvpButton = document.createElement('button');
            toggleRsvpButton.textContent = guest.attending ? 'Mark Not Attending' : 'Mark Attending';
            toggleRsvpButton.addEventListener('click', () => toggleRsvp(index));
            buttonContainer.appendChild(toggleRsvpButton);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeGuest(index));
            buttonContainer.appendChild(removeButton);

            listItem.appendChild(buttonContainer);
            guestList.appendChild(listItem);
        });
    }

    guestForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const guestName = guestNameInput.value.trim();

        if (guestName === '') {
            alert('Please enter a guest name.');
            return;
        }

        if (currentGuests.length >= MAX_GUESTS) {
            alert(`Guest list is full! Maximum ${MAX_GUESTS} guests allowed.`);
            guestNameInput.value = '';
            return;
        }

        currentGuests.push({ name: guestName, attending: true });
        guestNameInput.value = '';
        renderGuestList();
    });

    function removeGuest(index) {
        if (confirm(`Remove "${currentGuests[index].name}"?`)) {
            currentGuests.splice(index, 1);
            renderGuestList();
        }
    }

    function toggleRsvp(index) {
        currentGuests[index].attending = !currentGuests[index].attending;
        renderGuestList();
    }

    renderGuestList();
});
