// script.js
document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Client-side validation
    if (!validateFile(file)) {
        alert('Invalid file type or size exceeds limit (2MB).');
        return;
    }

    const encryptedFile = encryptFile(file);
    
    // Simulate file upload with progress indicator
    uploadFile(encryptedFile);
});

function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    return validTypes.includes(file.type) && file.size <= maxSize;
}

function encryptFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function() {
            const encrypted = CryptoJS.AES.encrypt(reader.result, 'secret-key').toString();
            resolve(new Blob([encrypted], { type: file.type }));
        };
        reader.readAsBinaryString(file);
    });
}

async function uploadFile(file) {
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const historyList = document.getElementById('historyList');

    progressContainer.classList.remove('hidden');

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
        if (progress < 100) {
            progress += 10;
            progressBar.style.width = progress + '%';
        } else {
            clearInterval(uploadInterval);
            addToHistory(file.name);
            progressContainer.classList.add('hidden');
            progressBar.style.width = '0%';
            alert('File uploaded successfully!');
        }
    }, 300);
}

function addToHistory(fileName) {
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.textContent = fileName;
    historyList.appendChild(listItem);
}
