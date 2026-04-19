// 1. SUPABASE INTEGRATSIYASI
const supabaseUrl = 'https://nwjqvgqydrjkveievogo.supabase.co';
const supabaseKey = 'sb_publishable_WaZvU4qjGkSQu2Vd1qZujw_RcPZfqAh';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
    const userEmail = localStorage.getItem('foydalanuvchiEmail');
    const userName = localStorage.getItem('foydalanuvchiIsmi') || "Azizbek";

    // Toast yaratish funksiyasi (3D va Glasniy)
    function showToast(title, msg, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `kreativ-toast toast-${type} show`;
        toast.innerHTML = `
            <div class="toast-content">
                <b>${title}</b>
                <span>${msg}</span>
            </div>
            <div class="toast-progress"></div>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transform = 'translateX(150%)';
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // 2. MA'LUMOTLARNI YUKLASH VA RENDER QILISH
    async function init() {
        if (!userEmail) {
            showToast("Xato", "Tizimga kirilmagan", "error");
            return;
        }

        const welcomeH1 = document.querySelector('.welcome h1');
        if (welcomeH1) welcomeH1.innerHTML = `Salom, ${userName}! 👋`;

        try {
            const { data: qabullar, error: qError } = await _supabase
                .from('qabullar')
                .select('*')
                .eq('user_email', userEmail);

            const { data: dorilar, error: dError } = await _supabase
                .from('dorilar')
                .select('*')
                .eq('user_email', userEmail);

            if (qError || dError) throw (qError || dError);

            renderUI(qabullar || [], dorilar || []);

        } catch (err) {
            console.error("Xatolik:", err.message);
            showToast("Xatolik", "Ma'lumotlarni yuklab bo'lmadi", "error");
        }
    }

    function renderUI(qabullar, dorilar) {
        // Statistika yangilash
        const statsH2 = document.querySelectorAll('.card h2');
        if (statsH2.length >= 3) {
            statsH2[0].innerText = qabullar.length;
            statsH2[2].innerText = dorilar.length;
        }

        // Qabullar rendering
        const leftPanel = document.querySelector('.left-panel') || document.querySelector('.left');
        if (leftPanel) {
            let qHtml = `
                <div class="panel-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                    <h3>Kelgusi qabullar</h3> 
                    <button id="btn-yangi-qabul" class="add-link" style="background:none; border:none; color:#2563eb; cursor:pointer; font-weight:600;">+ Yangi</button>
                </div>`;
            
            if (qabullar.length === 0) {
                qHtml += `<div class="empty-state">Hali qabullar belgilanmagan</div>`;
            } else {
                qabullar.forEach(q => {
                    qHtml += `
                        <div class="kir-card glass-card">
                            <div class="kir-info">
                                <strong>${q.doctor_name}</strong>
                                <span>${q.vaqti}</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span class="status-badge">${q.status}</span>
                                <button class="btn-cancel" data-id="${q.id}" style="color:#ef4444; border:none; background:none; cursor:pointer;">Bekor qilish</button>
                            </div>
                        </div>`;
                });
            }
            leftPanel.innerHTML = qHtml;
        }

        // Dorilar rendering
        const rightPanel = document.querySelector('.right-panel') || document.querySelector('.right');
        if (rightPanel) {
            let dHtml = `
                <div class="panel-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                    <h3>Dori eslatmalari</h3> 
                    <button id="btn-yangi-dori" class="add-link" style="background:none; border:none; color:#2563eb; cursor:pointer; font-weight:600;">+ Qo'shish</button>
                </div>`;
            
            if (dorilar.length === 0) {
                dHtml += `<div class="empty-state">Eslatmalar yo'q</div>`;
            } else {
                dorilar.forEach(d => {
                    dHtml += `
                        <div class="med-item glass-card">
                            <div class="med-details">
                                <strong>${d.nomi}</strong>
                                <span>${d.vaqt_intervali}</span>
                            </div>
                            <label class="switch">
                                <input type="checkbox" class="dori-switch" data-id="${d.id}" ${d.is_active ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>`;
                });
            }
            dHtml += `<div class="tip-card">💡 Bugun suv ichishni unutmang!</div>`;
            rightPanel.innerHTML = dHtml;
        }

        attachEventListeners();
    }

    // 3. TUGMALAR UCHUN EVENT LISTENERLAR
    function attachEventListeners() {
        // + Yangi qabul bosilganda
        const btnYangiQabul = document.getElementById('btn-yangi-qabul');
        if (btnYangiQabul) {
            btnYangiQabul.addEventListener('click', () => {
                window.location.href = 'shifokorlarroyxati.html';
            });
        }

        // + Qo'shish (Dori) bosilganda
        const btnYangiDori = document.getElementById('btn-yangi-dori');
        if (btnYangiDori) {
            btnYangiDori.addEventListener('click', () => {
                showToast("Dori qo'shish", "Tez orada bu funksiya ishga tushadi", "info");
            });
        }

        // Bekor qilish tugmasi
        document.querySelectorAll('.btn-cancel').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                if (confirm("Qabulni bekor qilmoqchimisiz?")) {
                    const { error } = await _supabase.from('qabullar').delete().eq('id', id);
                    if (!error) {
                        showToast("Bekor qilindi", "Qabul o'chirildi", "success");
                        init(); // UI ni qayta yuklash
                    }
                }
            });
        });

        // Dori switchlarini boshqarish
        document.querySelectorAll('.dori-switch').forEach(sw => {
            sw.addEventListener('change', async (e) => {
                const id = e.target.getAttribute('data-id');
                const status = e.target.checked;
                const { error } = await _supabase.from('dorilar').update({ is_active: status }).eq('id', id);
                if (!error) {
                    showToast(status ? "Yoqildi" : "O'chirildi", "Dori eslatmasi holati o'zgardi", "success");
                }
            });
        });

        // 3D Tilt
        if (window.VanillaTilt) {
            VanillaTilt.init(document.querySelectorAll(".card, .glass-card"), {
                max: 10, speed: 400, glare: true, "max-glare": 0.2
            });
        }
    }

    init();
});