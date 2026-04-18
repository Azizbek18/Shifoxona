document.addEventListener('DOMContentLoaded', () => {
    const toastCont = document.querySelector('.toast-container');
    const priceEl = document.querySelector('.total-price');

    // 1. Toast Funksiyasi
    function callToast(msg) {
        toastCont.innerHTML = `
            <div class="custom-toast">
                <div style="display:flex; align-items:center; gap:12px; font-weight:700;">
                    <i class="fa-solid fa-check-circle" style="color:var(--primary); font-size:20px;"></i>
                    <span>${msg}</span>
                </div>
                <div class="toast-bar" id="t-bar"></div>
            </div>
        `;
        toastCont.classList.remove('exit');
        toastCont.classList.add('active');

        const bar = document.getElementById('t-bar');
        bar.style.width = '100%';

        setTimeout(() => {
            bar.style.transition = 'width 2.5s linear';
            bar.style.width = '0%';
        }, 100);

        setTimeout(() => {
            toastCont.classList.add('exit');
            toastCont.classList.remove('active');
        }, 3000);
    }

    // 2. Dinamik Kalendar
    const daysGrid = document.getElementById('daysGrid');
    const days = [
        { d: 'Du', n: 26 }, { d: 'Se', n: 27 }, { d: 'Ch', n: 28 },
        { d: 'Pa', n: 29 }, { d: 'Ju', n: 30 }, { d: 'Sh', n: 31 }, { d: 'Ya', n: 1 }
    ];

    daysGrid.innerHTML = days.map((day, i) => `
        <div class="day-card ${i === 2 ? 'active' : ''}" data-val="${day.n}-mart">
            <span>${day.d}</span>
            <b>${day.n}</b>
        </div>
    `).join('');

    // 3. Dinamik Vaqtlar
    const timeGrid = document.getElementById('timeGrid');
    const times = ['09:00', '09:30', '10:00', '11:00', '14:00', '14:30', '15:00', '16:00'];

    timeGrid.innerHTML = times.map((t, i) => `
        <button class="time-btn ${i === 4 ? 'active' : ''}">${t}</button>
    `).join('');

    // 4. Click Events
    document.addEventListener('click', (e) => {
        if (e.target.closest('.day-card')) {
            const el = e.target.closest('.day-card');
            document.querySelectorAll('.day-card').forEach(x => x.classList.remove('active'));
            el.classList.add('active');
            callToast(`${el.dataset.val} tanlandi`);
        }

        if (e.target.closest('.time-btn')) {
            const el = e.target.closest('.time-btn');
            document.querySelectorAll('.time-btn').forEach(x => x.classList.remove('active'));
            el.classList.add('active');
            callToast(`Soat ${el.innerText} tanlandi`);
        }

        if (e.target.closest('.opt-card')) {
            const el = e.target.closest('.opt-card');
            document.querySelectorAll('.opt-card').forEach(x => x.classList.remove('active'));
            el.classList.add('active');
            const price = el.dataset.type === 'home' ? '100,000' : '80,000';
            priceEl.innerHTML = `${price} <span>so'm</span>`;
            callToast(el.dataset.type === 'home' ? "Uy chaqiruvi tanlandi" : "Klinikaga borish tanlandi");
        }
    });

    document.getElementById('yubor').addEventListener('click', () => {
        callToast("Muvaffaqiyatli band qilindi!");
    });
});