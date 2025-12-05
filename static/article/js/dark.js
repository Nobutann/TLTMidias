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


    const settingsBtn = document.getElementById('themeToggleBtn');
    const settingsIcon = document.getElementById('themeIcon');
    const settingsText = document.getElementById('themeText');

    const svgSun = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    const svgMoon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';

    function updateSettingsButton(isDark) {
        if (settingsBtn && settingsIcon && settingsText) {
            if (isDark) {
                settingsIcon.innerHTML = svgMoon;
                settingsText.textContent = 'escuro';
            } else {
                settingsIcon.innerHTML = svgSun;
                settingsText.textContent = 'claro';
            }
        }
    }

    if (body.classList.contains('dark-mode')) {
        updateSettingsButton(true);
    } else {
        updateSettingsButton(false);
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            const isDarkNow = body.classList.toggle('dark-mode');
            
            if (isDarkNow) {
                localStorage.setItem('tema', 'dark');
            } else {
                localStorage.setItem('tema', 'light');
            }

            updateSettingsButton(isDarkNow);
        });
    }
});