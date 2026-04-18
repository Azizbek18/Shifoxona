const supabaseKey = 'sb_publishable_qguz__gQ8NQiED350KJ6ZA_PTj-pMZ2';
const supaBaseUrl = 'https://yzucexsnhdaicnrkztrj.supabase.co';

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey);
const xabarCon = document.querySelector(".xabar-con");

// Toast funksiyasi
function xabarnoma(xabar, turi) {
    const xabarDiv = document.createElement('div');
    xabarDiv.className = `xabar ${turi}`;
    xabarDiv.innerText = xabar;

    xabarCon.appendChild(xabarDiv);

    setTimeout(() => {
        if (xabarDiv) xabarDiv.remove();
    }, 4000);
}

async function Kirish() {
    const ism = document.getElementById('ism');
    const tel = document.getElementById('tel');
    const sana = document.getElementById('sana');
    const parol = document.getElementById('parol');
    const jinsi = document.getElementById('jinsi');
    const email = document.getElementById('email');
    const btn = document.querySelector(".reg-btn");

    // 1. Validatsiya
    if (!ism.value || !tel.value || !parol.value || !email.value || !jinsi.value) {
        xabarnoma("Iltimos, barcha maydonlarni to'ldiring", 'info');
        return;
    }

    // Tugmani bloklash (Loading holati)
    btn.disabled = true;
    btn.innerText = "Yaratilmoqda...";

    try {
        // 2. Email bandligini tekshirish
        const { data: foydalanuvchi, error: checkError } = await _supabase
            .from('login')
            .select('*')
            .eq('email', email.value.trim());

        if (checkError) throw checkError;

        if (foydalanuvchi && foydalanuvchi.length > 0) {
            xabarnoma("Ushbu email bilan hisob mavjud!", 'info');
            btn.disabled = false;
            btn.innerText = "Hisob yaratish";
            return;
        }

        // 3. Ma'lumotlarni qo'shish
        const { error: insertError } = await _supabase
            .from('login')
            .insert([
                {
                    Ism: ism.value.trim(),
                    parol: parol.value.trim(),
                    sana: sana.value,
                    raqam: tel.value.trim(),
                    email: email.value.trim(),
                    jinsi: jinsi.value 
                }
            ]);

        if (insertError) throw insertError;

        xabarnoma("Muvaffaqiyatli ro'yxatdan o'tdingiz!", 'success');
        
        // 2 soniyadan keyin login sahifasiga yo'naltirish
        setTimeout(() => {
            window.location.href = 'kirish.html';
        }, 2000);

    } catch (err) {
        console.error(err);
        xabarnoma("Xatolik: " + err.message, 'error');
        btn.disabled = false;
        btn.innerText = "Hisob yaratish";
    }
}