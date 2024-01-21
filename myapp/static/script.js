document.getElementById('downloadForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        // Display loading message
        document.getElementById('responseMessage').innerText = 'Downloading...';

        // Send a POST request using fetch
        const response = await fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        });

        // Parse the JSON response
        const data = await response.json();

        // Update UI based on the response
        if (data.success) {
            document.getElementById('responseMessage').innerText = 'Download completed successfully';
            document.getElementById('video_link').value = '';  // Clear the input field
        } else {
            document.getElementById('responseMessage').innerText = 'Error: ' + data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'Error occurred during download';
    }
});

//Author : Rajaul
document.addEventListener('DOMContentLoaded', function () {
    const rajaulTextElement = document.getElementById('rajaulText');
    const text = 'MD. Rajaul Ansari';

    // Function to display each letter one by one
    function displayLetters(index) {
        if (index < text.length) {
            rajaulTextElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(function () {
                displayLetters(index);
            }, 300); // Adjust the delay as needed
        } else {
            // Reset the text and restart the loop
            setTimeout(function () {
                rajaulTextElement.innerHTML = '';
                displayLetters(0);
            }, 1000); // Adjust the delay before restarting the loop
        }
    }

    // Start displaying letters
    displayLetters(0);
});