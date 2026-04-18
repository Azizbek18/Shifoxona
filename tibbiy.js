const supaBaseUrl = 'https://yzucexsnhdaicnrkztrj.supabase.co';
const supabaseKey = 'sb_publishable_qguz__gQ8NQiED350KJ6ZA_PTj-pMZ2';
const _supabase = supabase.createClient(supaBaseUrl, supabaseKey);

const timelineContainer = document.querySelector('.timeline-container');
const toastContainer = document.getElementById('toast-container');

function showToast(title, message, type = 'info') {
    const icon = type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-info';
    const color = type === 'error' ? '#ef4444' : '#2563EB';

    toastContainer.innerHTML = `
        <div class="toast-3d" style="border-left-color: ${color}">
            <i class="fa-solid ${icon}" style="color: ${color}; font-size:20px;"></i>
            <div class="toast-content">
                <b style="display:block; font-size:14px;">${title}</b>
                <span style="font-size:12px; color:#64748B;">${message}</span>
            </div>
            <div class="toast-bar" id="toast-bar-inner" style="background: ${color}"></div>
        </div>
    `;

    toastContainer.classList.add('active');
    const bar = document.getElementById('toast-bar-inner');

    setTimeout(() => {
        bar.style.transition = 'width 3s linear';
        bar.style.width = '0%';
    }, 100);

    setTimeout(() => {
        toastContainer.classList.remove('active');
    }, 3500);
}


async function Olish() {
    showToast("Yuklanmoqda...", "Tibbiy tarixingiz tahlil qilinmoqda.");

    const { data, error } = await _supabase
        .from('foydalanuvchi_id')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        showToast("Xatolik!", error.message, 'error');
        return;
    }

    if (data) {
        console.log("Supabase Data:", data);
        let html = '<div class="timeline-line"></div>'; 

        data.forEach(element => {
            html += `
            <div class="timeline-item">
                <div class="timeline-date">
                    <span>${element.sana || 'BUGUN'}</span>
                    <small>2026</small>
                </div>
                <div class="timeline-marker ${element.turi === 'Tahlillar' ? 'marker-green' : 'marker-blue'}"></div>
                <div class="card glass-card">
                    <div class="card-header">
                        <div class="card-info">
                            <h3 class="doctor-name">${element.Ism} — ${element.turi}</h3>
                            <p class="location"><i class="fa-solid fa-location-dot"></i> ${element.klinika || 'Markaziy Klinika'}</p>
                        </div>
                        <span class="status ${element.turi === 'Tahlillar' ? 'status-green' : 'status-blue'}">
                            ${element.status || 'YAKUNLANDI'}
                        </span>
                    </div>
                    <div class="card-body">
                        <div class="info-group">
                            <p class="label">TASHXIS / MAQSAD:</p>
                            <p class="value">${element.vaqti || 'Profilaktik ko\'rik'}</p>
                        </div>
                        <div class="info-group">
                            <p class="label">TAYINLANGAN DORI:</p>
                            <p class="value">Shifokor ko'rsatmasi bo'yicha</p>
                        </div>
                    </div>
                    <div class="card-actions">
                        <a href="#" class="link-btn" onclick="openDetails('${element.id}')">Batafsil <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
            `;
        });

        timelineContainer.innerHTML = html;
        showToast("Tayyor!", "Barcha ma'lumotlar muvaffaqiyatli yuklandi.");

        initScrollAnimation();
    }
}

window.openDetails = (id) => {
    showToast("Ma'lumot", `ID: ${id} bo'yicha to'liq hisobot yuklanmoqda...`);
};

function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "0.5s ease-out";
        observer.observe(item);
    });
}

const filterButtons = document.querySelectorAll('.button, .btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
            b.className = 'button';
        });
        btn.className = 'btn';

        const filterType = btn.innerText;
        showToast("Filtrlash", `${filterType} bo'yicha saralanmoqda...`);
    });
});

Olish();