async function signup_handler(event) {
  event.preventDefault();

  const firstName = $("#firstname_form").val().trim();
  const lastName = $("#lastname_form").val().trim();
  const email = $("#email_form").val().trim();
  const password = $("#password_form").val().trim();

  console.log(
    `first_name: ${firstName}\nlast_name: ${lastName}\nemail: ${email}\npassword: ${password}`
  );

  if (firstName && lastName && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("sid", JSON.stringify(data.sid));
        document.location.href = "/";
    } else {
      alert(`Failed to signup`);
    }
  }
}

$("#signup_btn").click(signup_handler);
