async function login_handler(event) {
    event.preventDefault();

    const email = $('#email_form').val().trim();
    const password = $('#password_form').val().trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem('sid',JSON.stringify(data.user.sid))
            document.location.replace('/');
        } else {
            $('#invalid_cred').show();
        }
    }

}

$('#login_btn').click(login_handler);
$('#signup_btn').click((event) => document.location.href = '/signup');