/*anonyous function calls itself when document is ready  */


const lastLogin = null;
$(async function () {
  const sid = localStorage.getItem("sid");

  const response = await fetch(`/api/users/session/?sid=${sid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data)
    $(".lastLogin").append(data[0].createdAt.split('T')[0]);
  }
});

//CRUD
//CREATE - POST
//READ - GET
//UPDATE - PUT
//DELETE - DELETE

//API CALLS - HTTP Protocol/HTTPS Protocol - PORT 8080
//1. HEADERS - INFORMATION IN THE HEAD PACKET=BLOCK OF DATA, THIS WHAT GETS READ FIRST BY SERVER
//2. PAYLOAD - THE DATA IN THE BODY OF THE REQUEST
//3. ENDPOINT - https://www.myendpoing.com/user

//CLIENT ----> SERVER
//REQUEST
//SSL CERTIFICATE
//SERVER <--- CLIENT
//RESPONSE
//SSL CERTIFICATE

//STATUS CODES
//SENT BY SERVER
//200 - SUCCESS
//400 - FAILED - SOMETHING IS WRONG WITH REQUEST
//500 - FAILED ERROR WITH SERVER

//HTTP - NOT SECURE
//HTTPS - SECURE

//SERVER --> SERVER (3rd PARTY)
