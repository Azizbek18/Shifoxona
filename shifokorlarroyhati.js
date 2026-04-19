const supabaseKey = 'sb_publishable_WaZvU4qjGkSQu2Vd1qZujw_RcPZfqAh';
const supaBaseUrl = 'https://nwjqvgqydrjkveievogo.supabase.co';

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey);
let doctorsData = [];
const listCon = document.getElementById('mb-doctors-list');
const searchInp = document.getElementById('mb-search-input');
const authSection = document.getElementById('mb-auth-section');

// 1. Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', () => {
    loadUser();
    fetchDoctors();
});

// 2. Foydalanuvchi ismini localStoragedan olish
function loadUser() {
    const ism = localStorage.getItem('foydalanuvchiIsmi') || "Azizbek";
    const email = localStorage.getItem('foydalanuvchiEmail');
    if (email && authSection) {
        authSection.innerHTML = `
            <div class="mb-user-profile" onclick="window.location.href='bemor.html'">
                <span style="font-size:14px; font-weight:600;">${ism}</span>
                <div class="mb-user-avatar">${ism[0].toUpperCase()}</div>
            </div>`;
    }
}

// 3. Supabasedan shifokorlarni olish
async function fetchDoctors() {
    const { data, error } = await _supabase.from('shifokorlar').select('*');
    if (!error) {
        console.log("Bazadan kelgan ma'lumot:", data[0]);
        doctorsData = data;
        renderDoctors(doctorsData);
    }
}

// 4. Shifokorlarni render qilish
function renderDoctors(data) {
    listCon.innerHTML = data.map(doc => `
        <div class="mb-doc-card">
            <div style="display:flex; align-items:center; gap:20px;">
                <div class="mb-avatar-box">
                    ${doc.Ism ? doc.Ism.substring(0, 2).toUpperCase() : 'DR'}
                </div>
                <div>
                    <h3 style="font-size:18px;">${doc.Ism}</h3>
                    <p style="color:#64748b; font-size:14px;">
                        ${doc.turi} • <b>${doc.tajriba || '0 yil'} tajriba</b>
                    </p>
                    <p style="color:#f59e0b; font-size:13px;">
                        <i class="fa-solid fa-star"></i> ${doc.reyting || '4.5'} 
                        <span style="color:#94a3b8; margin-left:5px;">(${doc.sharhlar_soni || 0} sharh)</span>
                    </p>
                </div>
            </div>
            <button class="mb-btn-book" data-id="${doc.id}">Qabul olish →</button>
        </div>
    `).join('') || "<p style='text-align:center'>Hech narsa topilmadi...</p>";
}

// 5. Qidiruv va Filtrni ishlatish
searchInp.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = doctorsData.filter(d => d.Ism.toLowerCase().includes(val) || d.turi.toLowerCase().includes(val));
    renderDoctors(filtered);
});

document.getElementById('mb-filter-tags').addEventListener('click', (e) => {
    if (e.target.classList.contains('mb-filter-btn')) {
        document.querySelectorAll('.mb-filter-btn').forEach(b => b.classList.remove('mb-active'));
        e.target.classList.add('mb-active');
        const type = e.target.innerText.toLowerCase();
        const filtered = type === 'hammasi' ? doctorsData : doctorsData.filter(d => d.turi.toLowerCase().includes(type));
        renderDoctors(filtered);
        showToast(`Saralandi: ${e.target.innerText}`);
    }
});

// 6. Qabul olish (Batafsil ma'lumotga o'tish)
listCon.addEventListener('click', (e) => {
    if (e.target.classList.contains('mb-btn-book')) {
        const id = e.target.dataset.id;
        localStorage.setItem('selectedDoctorId', id);
        showToast("Shifokor profiliga o'tilmoqda...");
        setTimeout(() => window.location.href = 'shifokor.html', 1500);
    }
});

// 7. Toast xabarnomasi funksiyasi
function showToast(msg) {
    const container = document.getElementById('mb-toast-container');
    const toast = document.createElement('div');
    toast.className = 'mb-toast';
    toast.innerHTML = `<span>${msg}</span><div class="mb-toast-progress"></div>`;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('mb-show'), 100);
    setTimeout(() => {
        toast.classList.add('mb-hide');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}