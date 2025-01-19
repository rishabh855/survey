// Select input fields and the login button
const usernameInput = document.querySelector('.form input[type="text"]');
const passwordInput = document.querySelector('.form input[type="password"]');
const loginButton = document.querySelector('.form button');

// Enable/Disable the login button based on input
function validateForm() {
    const isFormValid = usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '';
    loginButton.disabled = !isFormValid;
}

// Add event listeners for real-time validation
usernameInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// Save login details locally on login button click
loginButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
        // Save data in localStorage (educational purposes only)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Login data saved locally!');
        console.log('Current saved users:', users);

        // Clear the form
        usernameInput.value = '';
        passwordInput.value = '';
        validateForm();
    }
});

// Function to export stored data
function exportData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
        alert('No data to export.');
        return;
    }

    const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.json';
    a.click();

    URL.revokeObjectURL(url);
}

// Add a button to the page to export data
const exportButton = document.createElement('button');
exportButton.textContent = 'Export Data';
exportButton.style.marginTop = '20px';
exportButton.style.padding = '10px';
exportButton.style.fontSize = '14px';
exportButton.style.color = '#fff';
exportButton.style.backgroundColor = '#0095f6';
exportButton.style.border = 'none';
exportButton.style.borderRadius = '4px';
exportButton.style.cursor = 'pointer';

exportButton.addEventListener('click', exportData);

document.querySelector('.container').appendChild(exportButton);
