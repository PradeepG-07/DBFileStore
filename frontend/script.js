// DOM Elements
const navSignIn = document.getElementById('navSignIn');
const navSignUp = document.getElementById('navSignUp');
const authSection = document.getElementById('authSection');
const signInCard = document.getElementById('signInCard');
const signUpCard = document.getElementById('signUpCard');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const toSignUp = document.getElementById('toSignUp');
const toSignIn = document.getElementById('toSignIn');
const dashboardSection = document.getElementById('dashboardSection');
const filesSection = document.getElementById('filesSection');
const uploadSection = document.getElementById('uploadSection');
const filesLink = document.getElementById('filesLink');
const uploadLink = document.getElementById('uploadLink');
const signOutBtn = document.getElementById('signOutBtn');
const filesList = document.getElementById('filesList');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const uploadProgress = document.getElementById('uploadProgress');
const progressBar = uploadProgress.querySelector('.progress-bar');
const baseUrl = "http://localhost:8000";
const isAuthenticated = localStorage.getItem("token");

// State
var files = [];

if(isAuthenticated){
   
    const files = getFiles();
    if(files){
         authSection.classList.add('d-none');
    dashboardSection.classList.remove('d-none');
    updateNavbar(true);
    
    }
}

async function getFiles(){
    const token = localStorage.getItem('token');
    const response = await fetch(`${baseUrl}/user/files`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        // alert("Unable to fetch files.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        authSection.classList.remove('d-none');
        dashboardSection.classList.add('d-none');
        return null;
    }
    const result = await response.json();
    files=result.files;
    
    renderFiles();
    return files;
}
     
navSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!signInCard.classList.contains("d-none")) return ;
    signInCard.classList.remove('d-none');
    signUpCard.classList.add('d-none');
});

navSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    if(!signUpCard.classList.contains("d-none")) return ;
    signInCard.classList.add('d-none');
    signUpCard.classList.remove('d-none');
    
});

toSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    if(!signUpCard.classList.contains("d-none")) return ;
    signInCard.classList.add('d-none');
    signUpCard.classList.remove('d-none');
});

toSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!signInCard.classList.contains("d-none")) return ;
    signInCard.classList.remove('d-none');
    signUpCard.classList.add('d-none');
});

// Auth Forms
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signInForm);
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    try {
        const response = await fetch(`${baseUrl}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Sign in failed');
        }

        const result = await response.json();
        // Assuming the response contains a token and user info
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        authSection.classList.add('d-none');
        dashboardSection.classList.remove('d-none');
        updateNavbar(true);
        await getFiles();
    } catch (error) {
        alert(error.message);
    }
});
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signUpForm);
    const data = {
        fullname: formData.get("fullname"),
        email: formData.get('email'),
        password: formData.get('password')
    };

    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        const response = await fetch(`${baseUrl}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Sign up failed');
        }

        // Redirect to sign in page after successful sign up
        signUpCard.classList.add('d-none');
        signInCard.classList.remove('d-none');
        alert('Sign up successful! Please sign in.');
    } catch (error) {
        alert(error.message);
    }
});

// Sign Out
signOutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authSection.classList.remove('d-none');
    dashboardSection.classList.add('d-none');
    signInForm.reset();
    signUpForm.reset();
    updateNavbar(false);
});

// Update Navbar based on auth state
function updateNavbar(isAuthenticated) {
    if (isAuthenticated) {
        navSignIn.classList.add('d-none');
        navSignUp.classList.add('d-none');
    } else {
        navSignIn.classList.remove('d-none');
        navSignUp.classList.remove('d-none');
    }
}

// Navigation
filesLink.addEventListener('click', (e) => {
    e.preventDefault();
    filesSection.classList.remove('d-none');
    uploadSection.classList.add('d-none');
    filesLink.classList.add('active');
    uploadLink.classList.remove('active');
});

uploadLink.addEventListener('click', (e) => {
    e.preventDefault();
    filesSection.classList.add('d-none');
    uploadSection.classList.remove('d-none');
    filesLink.classList.remove('active');
    uploadLink.classList.add('active');
});

// File List Rendering
function renderFiles() {

    filesList.innerHTML = files.map((file) => 
    {
        const fileLink = new URL(baseUrl+"/uploads/"+file.name.split("-#-")[1]+"/"+localStorage.getItem("token"));
        
        return `
        <tr>
            <td>
                <i class="bi bi-file-earmark me-2"></i>
                ${file.name.split("-#-")[1]}
            </td>
            <td>${file.size}</td>
            <td>${file.type}</td>
            <td>
                <a href=${fileLink} class="btn btn-sm btn-outline-primary me-2" target="_blank">
                    <i class="bi bi-eye"></i>
                </a>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteFile('${file.name.split("-#-")[1]}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `
}).join('');
}

// File Actions
function deleteFile(name) {
    if (confirm('Are you sure you want to delete this file?')) {
        files = files.filter(f => f.name !== name);
        // TODO: ADD A ROUTE TO DELETE FILE
        const token = localStorage.getItem('token');
        fetch(new URL(`${baseUrl}/user/files/${name}`), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                alert("Failed to delete file.")
                throw new Error('Failed to delete file');
            }
        })
        .catch(error => {
            alert(error.message);
        });
        renderFiles();
    }
}

// File Upload
fileInput.addEventListener('change', async function (e) {
    const file = e.target.files[0];
    await handleFiles(file);
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
   
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', async(e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    
    await handleFiles(e.dataTransfer.files[0]);
    
});

async function handleFiles(file){
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('token');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${baseUrl}/user/files`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progressBar.style.width = `${percentComplete}%`;
            progressBar.setAttribute('aria-valuenow', percentComplete);
        }
    };

    xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status<=210) {
            alert('File uploaded successfully');
            await getFiles();
            renderFiles();
        } else {
            alert('File upload failed');
        }
        uploadProgress.classList.add('d-none');
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', 0);
    };

    xhr.onerror = () => {
        alert('File upload failed');
        uploadProgress.classList.add('d-none');
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', 0);
    };

    uploadProgress.classList.remove('d-none');
    xhr.send(formData);
}