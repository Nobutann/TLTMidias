document.addEventListener('DOMContentLoaded', function() {
    console.log("SCRIPT CARREGADO: O Javascript iniciou.");

    // --- 1. MENU MOBILE ---
    const menuToggle = document.getElementById("menuToggle");
    const navList = document.getElementById("navList");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navList.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    // --- 2. NOTIFICAÇÕES ---
    const btnNotif = document.getElementById('showNotifications');
    const boxNotif = document.getElementById('notificationList');
    
    if (btnNotif && boxNotif) {
        btnNotif.addEventListener('click', () => {
            if (boxNotif.style.display === 'none') boxNotif.style.display = 'block';
            else boxNotif.style.display = 'none';
        });
    }

    // --- 3. MODO ESCURO (Com Diagnóstico) ---
    const btnTema = document.getElementById('btn-tema');
    const body = document.body;
    
    // Verifica se o botão foi encontrado
    if (!btnTema) {
        console.error("ERRO CRÍTICO: O botão com id='btn-tema' NÃO foi encontrado no HTML. Verifique o arquivo HTML.");
        return; // Para o script aqui se não achar o botão
    } else {
        console.log("SUCESSO: Botão de tema encontrado!");
    }

    // Verifica preferência salva
    const temaAtual = localStorage.getItem('tema');
    console.log("Tema salvo anteriormente:", temaAtual);

    if (temaAtual === 'dark') {
        body.classList.add('dark-mode');
        btnTema.innerText = "☀️ Modo Claro";
        console.log("Aplicando modo escuro automático.");
    }

    // Evento de clique
    btnTema.addEventListener('click', () => {
        console.log("CLIQUE DETECTADO: Você clicou no botão.");
        
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('tema', 'dark');
            btnTema.innerText = "☀️ Modo Claro";
            console.log("Mudou para: DARK");
        } else {
            localStorage.setItem('tema', 'light');
            btnTema.innerText = "🌙 Modo Escuro";
            console.log("Mudou para: LIGHT");
        }
    });
});