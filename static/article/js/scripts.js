document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
});

function toggleReplyForm(commentId) {
    const form = document.getElementById('reply-form-' + commentId);
    if (form) {
        const isVisible = form.style.display === 'block' || form.classList.contains('active');
        
        document.querySelectorAll('.reply-form-box').forEach(function(f) {
            f.style.display = 'none';
            f.classList.remove('active');
        });
        
        if (!isVisible) {
            form.style.display = 'block';
            form.classList.add('active');
            const firstInput = form.querySelector('input[type="text"]');
            if (firstInput) {
                setTimeout(function() {
                    firstInput.focus();
                }, 100);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    const moreOptionsMenu = document.getElementById('moreOptionsMenu');
    
    if (moreOptionsBtn && moreOptionsMenu) {
        moreOptionsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            moreOptionsMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!moreOptionsMenu.contains(e.target) && !moreOptionsBtn.contains(e.target)) {
                moreOptionsMenu.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && moreOptionsMenu.classList.contains('active')) {
                moreOptionsMenu.classList.remove('active');
            }
        });
    }
});