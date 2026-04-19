// 1. Supabase sozlamalari
const supabaseKey = 'sb_publishable_WaZvU4qjGkSQu2Vd1qZujw_RcPZfqAh';
const supaBaseUrl = 'https://nwjqvgqydrjkveievogo.supabase.co';
const _supabase = supabase.createClient(supaBaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
    const toastCont = document.querySelector('.toast-container');
    const priceEl = document.querySelector('.total-price');

    // --- SUPABASE DAN MA'LUMOTLARNI OLISH ---
    const selectedId = localStorage.getItem('selectedDoctorId');
    
    if (selectedId) {
        const { data: doc, error } = await _supabase
            .from('shifokorlar')
            .select('*')
            .eq('id', selectedId)
            .single();

        if (!error && doc) {
            // HTML elementlarini bazadagi ma'lumotlar bilan to'ldiramiz
            document.getElementById('docName').innerText = doc.Ism || doc.ism;
            document.getElementById('docSpecialty').innerText = doc.turi || doc.Turi;
            document.getElementById('rating').innerText = doc.reyting || doc.Reyting;
            document.getElementById('reviewsCount').innerText = doc.sharhlar_soni || 150;
            document.getElementById('experience').innerText = doc.tajriba || doc.Tajriba;
            document.getElementById('clinicName').innerText = doc.klinika || "Markaziy Klinika";
            document.getElementById('address').innerText = doc.manzil || "Toshkent shahar";
            document.getElementById('fullBio').innerText = doc.bio || "Mutaxassis haqida ma'lumot mavjud emas.";
            
            // Avatar uchun bosh harflar
            const ism = doc.Ism || doc.ism;
            document.getElementById('docAvatar').innerText = ism ? ism.substring(4, 6).toUpperCase() : "DR";
        }
    }

    // --- TOAST FUNKSIYASI ---
    function callToast(msg) {
        toastCont.innerHTML = `
            <div class="custom-toast">
                <div style="display:flex; align-items:center; gap:12px; font-weight:700;">
                    <i class="fa-solid fa-check-circle" style="color:#007bff; font-size:20px;"></i>
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

    // --- DINAMIK KALENDAR VA VAQTLAR (Sizning kodingiz) ---
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

    const timeGrid = document.getElementById('timeGrid');
    const times = ['09:00', '09:30', '10:00', '11:00', '14:00', '14:30', '15:00', '16:00'];
    timeGrid.innerHTML = times.map((t, i) => `
        <button class="time-btn ${i === 4 ? 'active' : ''}">${t}</button>
    `).join('');

    // --- CLICK EVENTS ---
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

    // --- QABULGA YOZILISH (SUPABASE GA YUBORISH) ---
    document.getElementById('yubor').addEventListener('click', async () => {
        const docName = document.getElementById('docName').innerText;
        const activeDay = document.querySelector('.day-card.active').dataset.val;
        const activeTime = document.querySelector('.time-btn.active').innerText;
        const userEmail = localStorage.getItem('foydalanuvchiEmail') || "azizbek@example.com";

        const { error } = await _supabase.from('qabullar').insert([{
            user_email: userEmail,
            doctor_name: docName,
            vaqti: `${activeDay}, ${activeTime}`,
            status: 'Kutilmoqda'
        }]);

        if (!error) {
            callToast("Muvaffaqiyatli band qilindi!");
            setTimeout(() => { window.location.href = 'bemor.html'; }, 2000);
        } else {
            callToast("Xatolik yuz berdi!");
        }
    });
});