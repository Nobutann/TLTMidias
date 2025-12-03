document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.getElementById("menuToggle");
    const navList = document.getElementById("navList");
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navList.classList.toggle("active");
        });
    }

    const btnNotif = document.getElementById('showNotifications');
    const boxNotif = document.getElementById('notificationList');
    const listNotif = document.getElementById('notifItems');

    if (btnNotif && boxNotif) {
        btnNotif.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (boxNotif.style.display === 'none') {
                try {
                    const resp = await fetch('/notifications/inbox/', { credentials: 'include' });
                    if (resp.ok) {
                        const data = await resp.json();
                        listNotif.innerHTML = '';
                        if (data.items.length === 0) {
                            listNotif.innerHTML = '<li>Sem notificações.</li>';
                        } else {
                            data.items.forEach(n => {
                                const li = document.createElement('li');
                                li.innerHTML = `<a href="${n.url}" target="_blank">${n.title}</a><br><small>${n.category}</small>`;
                                listNotif.appendChild(li);
                            });
                        }
                    }
                } catch (e) {
                    if(listNotif.innerHTML === '') listNotif.innerHTML = '<li>Nenhuma notificação nova.</li>';
                }
                boxNotif.style.display = 'block';
            } else {
                boxNotif.style.display = 'none';
            }
        });
    }

    const btnTema = document.getElementById('btn-tema');
    const body = document.body;
    
    const iconMoon = '<i class="bi bi-moon-stars-fill"></i> <span class="desktop-only">Tema</span>';
    const iconSun = '<i class="bi bi-brightness-high-fill"></i> <span class="desktop-only">Claro</span>';

    const temaAtual = localStorage.getItem('tema');
    if (temaAtual === 'dark') {
        body.classList.add('dark-mode');
        if(btnTema) btnTema.innerHTML = iconSun;
    } else {
        if(btnTema) btnTema.innerHTML = iconMoon;
    }

    if(btnTema) {
        btnTema.addEventListener('click', (e) => {
            e.preventDefault();
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('tema', 'dark');
                btnTema.innerHTML = iconSun;
            } else {
                localStorage.setItem('tema', 'light');
                btnTema.innerHTML = iconMoon;
            }
        });
    }
});