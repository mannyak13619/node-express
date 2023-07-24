/*anonyous function calls itself when document is ready  */
$(async function () {
  const sid = localStorage.getItem("sid");

  const response = await fetch(
    `/api/users/session/?` + new URLSearchParams({ sid: sid }),
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (response.ok) {
    const data = await response.json();
  }
});
