const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");

if (menuToggle)
{
    menuToggle.addEventListener("click", () =>
    {
        navList.classList.toggle("active");
        menuToggle.classList.toggle("active");
    })
}