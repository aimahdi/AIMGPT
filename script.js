import { API_KEY } from './config.js';

let userInput = document.getElementById('textInput');

let copyText = document.getElementById('copyText');

let useGeminiButton = document.getElementById('gemini');

let hiddenColumn = document.querySelector('.init-hide');

const loadingSpinner = document.getElementById('loadingSpinner');

useGeminiButton.addEventListener('click', getDataFromGemini);

async function getDataFromGemini(event) {

    toggleLoading(true);
    const apiKey = API_KEY;

    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?' + 'key=' + apiKey;

    let userInputValue = userInput.value;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
            },
            body: JSON.stringify({
                "contents": [{
                    "parts": [{
                        "text": userInputValue
                    }]
                }]
            }),
        });



        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        copyText.value = data.candidates[0].content.parts[0].text;

        hiddenColumn.style.display = 'block';

        toggleLoading(false);

    } catch (error) {
        console.error('Error:', error.message);
    }

}

function toggleLoading(isLoading) {
    if (isLoading) {
        useGeminiButton.style.display = 'none';
        loadingSpinner.classList.toggle('hidden', false);
    } else {
        useGeminiButton.style.display = 'block';
        loadingSpinner.classList.toggle('hidden', true);
    }

}

let newParagraph = document.createElement('p');

newParagraph.textContent = 'copied';

let copyToClipboardButton = document.getElementById('copyToClipboard');

copyToClipboardButton.addEventListener('click', copyToClipboard);
function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("copyText");

    console.log('Helo');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field to the clipboard */
    document.execCommand("copy");

    copyToClipboardButton.parentNode.appendChild(newParagraph);
}
