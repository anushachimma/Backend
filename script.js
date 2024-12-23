function registerUser() {
    const user = {
      firstName: document.getElementById('first-name').value,
      lastName: document.getElementById('last-name').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      gender: document.getElementById('gender').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    };
  
    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.message === 'User registered successfully!') {
          window.location.href = 'login.html';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed.');
      });

      function loginUser() {
        const credentials = {
          username: document.getElementById('username').value,
          password: document.getElementById('password').value,
        };
      
        fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.message === 'Login successful!') {
              window.location.href = 'index.html';
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Login failed.');
          });
      }
      
  }
  