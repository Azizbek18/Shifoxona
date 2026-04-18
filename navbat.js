document.addEventListener('DOMContentLoaded', () => {
    const toastContainer = document.getElementById('toast-container');
    const smsToggle = document.getElementById('sms-toggle');
    const exitBtn = document.getElementById('btn-exit');
    const timerDisplay = document.getElementById('timer-countdown');

    let timeLeft = 25 * 60;

    function updateCountdown() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        const h = hours.toString().padStart(2, '0');
        const m = minutes.toString().padStart(2, '0');
        const s = seconds.toString().padStart(2, '0');

        if (timerDisplay) {
            timerDisplay.textContent = `${h}:${m}:${s}`;
        }

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            if (timerDisplay) {
                timerDisplay.textContent = "00:00:00";
                timerDisplay.style.color = "#10B981"; 
            }
            clearInterval(timerInterval);
            showToast("Navbat Keldi!", "Marhamat, qabulxonaga kiring.", "fa-door-open");
        }
    }

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); 

    function showToast(title, message, icon = 'fa-bell-concierge') {
        toastContainer.innerHTML = `
            <div class="toast-3d">
                <i class="fa-solid ${icon}" style="color:#2563EB; font-size:20px;"></i>
                <div class="toast-content">
                    <b style="display:block; font-size:14px; color:#1E293B;">${title}</b>
                    <span style="font-size:12px; color:#64748B;">${message}</span>
                </div>
                <div class="toast-bar" id="toast-bar-inner"></div>
            </div>
        `;

       
        toastContainer.classList.add('active');

        const barInner = document.getElementById('toast-bar-inner');

        
        setTimeout(() => {
            barInner.style.transition = 'width 3s linear';
            barInner.style.width = '0%';
        }, 100);

        
        setTimeout(() => {
            toastContainer.classList.remove('active');
        }, 3500);
    }

  
    if (smsToggle) {
        smsToggle.addEventListener('change', () => {
            if (smsToggle.checked) {
                showToast("SMS Yoqildi", "Sizga eslatmalar yuboriladi.", "fa-comment-medical");
            } else {
                showToast("SMS O'chirildi", "Eslatmalar to'xtatildi.", "fa-comment-slash");
            }
        });
    }


    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            showToast("Tizim", "Navbatdan chiqish so'rovi yuborildi.", "fa-right-from-bracket");
            exitBtn.style.opacity = "0.6";
            exitBtn.disabled = true;
            exitBtn.textContent = "So'rov yuborilmoqda...";

            setTimeout(() => {
                exitBtn.style.opacity = "1";
                exitBtn.disabled = false;
                exitBtn.textContent = "Chiqib ketish (vaqtinchalik)";
            }, 3000);
        });
    }


    setTimeout(() => {
        showToast("Xush kelibsiz!", "Navbatingiz holati yangilanmoqda.", "fa-hospital-user");
    }, 8000); 
});