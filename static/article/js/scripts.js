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

function toggleResponseForm(commentId) {
    const form = document.getElementById('response-form-' + commentId);
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}