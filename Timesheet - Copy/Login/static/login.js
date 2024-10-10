document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission behavior
    console.log("Sign up form submitted");

    const formData = new FormData(this);

    fetch('/', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
        showPopup(data.message);
    }).catch(error => {
        console.error("Sign up failed:", error);
        showPopup("An error occurred. Please try again.");
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission behavior
    console.log("Login form submitted");

    const formData = new FormData(this);

    fetch('/', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
        showPopup(data.message);
    }).catch(error => {
        console.error("Login failed:", error);
        showPopup("An error occurred. Please try again.");
    });
});

function showPopup(message) {
    const popup = document.getElementById('popupMessage');
    document.getElementById('popupText').innerText = message;
    popup.style.display = 'block';  // Show the popup
}

function closePopup() {
    const popup = document.getElementById('popupMessage');
    popup.style.display = 'none';  // Hide the popup
}
