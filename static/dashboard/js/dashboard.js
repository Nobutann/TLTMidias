document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const eyeIcon = togglePassword.querySelector('.eye-icon');
            if (type === 'text') {
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                `;
            } else {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                `;
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const submitBtn = loginForm.querySelector('.btn-login');
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="btn-icon spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" opacity="0.25"/>
                    <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"/>
                </svg>
                Entrando...
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .spinner {
                    animation: spin 1s linear infinite;
                }
            `;
            document.head.appendChild(style);
        });
    }

    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.animation = 'slideUp 0.3s ease-out forwards';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.querySelector('input[type="file"]');
    const fileDisplay = document.getElementById('fileDisplay');
    const imagePreview = document.getElementById('imagePreview');

    if (fileInput && fileDisplay && imagePreview) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        fileDisplay.style.display = 'none';
                        imagePreview.classList.add('active');
                        imagePreview.innerHTML = `
                            <img src="${event.target.result}" alt="Preview">
                            <button type="button" class="remove-preview" id="removePreview">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"/>
                                    <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                Remover imagem
                            </button>
                        `;

                        const removeBtn = document.getElementById('removePreview');
                        if (removeBtn) {
                            removeBtn.addEventListener('click', function() {
                                fileInput.value = '';
                                imagePreview.classList.remove('active');
                                imagePreview.innerHTML = '';
                                fileDisplay.style.display = 'block';
                            });
                        }
                    };
                    
                    reader.readAsDataURL(file);
                } else {
                    alert('Por favor, selecione apenas arquivos de imagem.');
                    fileInput.value = '';
                }
            }
        });
    }

    const articleForm = document.getElementById('articleForm');
    if (articleForm) {
        articleForm.addEventListener('submit', function(e) {
            const submitBtn = articleForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = `
                    <svg class="btn-icon spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" opacity="0.25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75"/>
                    </svg>
                    Salvando...
                `;

                const style = document.createElement('style');
                style.textContent = `
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    .spinner {
                        animation: spin 1s linear infinite;
                    }
                    .remove-preview {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        margin-top: 12px;
                        padding: 10px 16px;
                        background-color: #fee;
                        color: #c53030;
                        border: 1px solid #feb2b2;
                        border-radius: 6px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .remove-preview:hover {
                        background-color: #fecaca;
                    }
                    .remove-preview svg {
                        width: 16px;
                        height: 16px;
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }

    const titleInput = document.querySelector('input[name="title"]');
    const slugInput = document.querySelector('input[name="slug"]');

    if (titleInput && slugInput && !slugInput.value) {
        titleInput.addEventListener('input', function() {
            const title = this.value;
            const slug = title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/--+/g, '-')
                .replace(/^-+|-+$/g, '');
            
            slugInput.value = slug;
        });
    }

    const formInputs = document.querySelectorAll('.article-form input:not([type="file"]), .article-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transition = 'border-color 0.2s, box-shadow 0.2s';
        });
    });

    const logoutLink = document.querySelector('.nav-logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Tem certeza que deseja sair?')) {
                window.location.href = '/administration/';
            }
        });
    }
});