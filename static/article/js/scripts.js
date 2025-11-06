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

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('showNotifications');
    const box = document.getElementById('notificationList');
    const list = document.getElementById('notifItems');

    if (!btn) return;

    btn.addEventListener('click', async () => {
    if (box.style.display === 'none') {
        const resp = await fetch('/notifications/inbox/', { credentials: 'include' });
        if (!resp.ok) {
            alert('Erro ao buscar notificações');
            return;
        }
        const data = await resp.json();
        list.innerHTML = '';
        if (data.items.length === 0) {
            list.innerHTML = '<li>Sem notificações.</li>';
        } else {
            data.items.forEach(n => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${n.url}" target="_blank">${n.title}</a><br><small>${n.category}</small>`;
                list.appendChild(li);
            });
        }
        box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
      });
    });