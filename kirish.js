// Supabase sozlamalari
const supabaseKey = 'sb_publishable_WaZvU4qjGkSQu2Vd1qZujw_RcPZfqAh';
const supaBaseUrl = 'https://nwjqvgqydrjkveievogo.supabase.co';
const _supabase = supabase.createClient(supaBaseUrl, supabaseKey);

const xabarCon = document.querySelector(".xabar-con");

// Mukammal Toast Funksiyasi
function xabarnoma(xabar, turi) {
    const xabarDiv = document.createElement('div');
    xabarDiv.className = `xabar ${turi}`;
    xabarDiv.innerText = xabar;

    xabarCon.appendChild(xabarDiv);

    // Animatsiya tugagach (4 soniya) DOM dan o'chirish
    setTimeout(() => {
        if (xabarDiv) xabarDiv.remove();
    }, 4000);
}

// Kirish Funksiyasi
async function Kirish() {
    const emailInput = document.getElementById('input');
    const parolInput = document.getElementById('pasvord');
    const loginBtn = document.querySelector(".btn");

    const email = emailInput.value.trim();
    const parol = parolInput.value.trim();

    // Validatsiya
    if (!email || !parol) {
        xabarnoma("Barcha maydonlarni to'ldiring!", "info");
        return;
    }

    // Loading holati
    loginBtn.disabled = true;
    loginBtn.innerText = "Tekshirilmoqda...";

    try {
        const { data: foydalanuvchi, error: xatolik } = await _supabase
            .from('login')
            .select('*')
            .eq('email', email)
            .eq('parol', parol);

        if (xatolik) throw xatolik;

        if (foydalanuvchi && foydalanuvchi.length > 0) {
            xabarnoma("Muvaffaqiyatli kirdingiz!", "success");
            setTimeout(() => {
                window.location.href = 'bemor.html';
            }, 2000);
        } else {
            xabarnoma("Email yoki parol noto'g'ri!", "error");
            loginBtn.disabled = false;
            loginBtn.innerText = "Kirish";
        }

    } catch (err) {
        console.error(err);
        xabarnoma("Tizimda xatolik yuz berdi!", "error");
        loginBtn.disabled = false;
        loginBtn.innerText = "Kirish";
    }
}

// Google Login (Hozircha faqat xabar)
function GoogleBilanKirish() {
    xabarnoma("Google bilan kirish tez kunda...", "info");
}

// Enter tugmasi bilan kirish
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') Kirish();
});