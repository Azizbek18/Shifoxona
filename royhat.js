let supabaseKey = 'sb_publishable_qguz__gQ8NQiED350KJ6ZA_PTj-pMZ2';
let supaBaseUrl = 'https://yzucexsnhdaicnrkztrj.supabase.co';

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey);
const xabarCon = document.querySelector(".xabar-con");

function xabarnoma(xabar, turi) {
    let xabarMatn = document.createElement('div');
    xabarMatn.classList.add("xabar", turi);
    xabarMatn.innerText = xabar;
    
    xabarCon.appendChild(xabarMatn);

    setTimeout(() => {
        xabarMatn.remove();
    }, 4000);
}

async function Kirish() {

    let ism = document.getElementById('ism');
    let tel = document.getElementById('tel');
    let sana = document.getElementById('sana');
    let parol = document.getElementById('parol');
    let jinsi = document.getElementById('jinsi');
    let email = document.getElementById('email');

    // 1. Validatsiya (Bo'sh joylarni tekshirish)
    if (!ism.value || !tel.value || !parol.value) {
        xabarnoma("Iltimos, barcha maydonlarni to'ldiring", 'info');
        return;
    }

    // 2. Bazada bunday foydalanuvchi bor-yo'qligini tekshirish
    // Diqqat: Tekshirishda 'tel' (yoki email) noyob bo'lishi kerak
    const { data: foydalanuvchi, error: xatolik } = await _supabase
        .from('login')
        .select('*')
        .eq('email', email.value); 

    if (xatolik) {
        xabarnoma('Bazaga bog\'lanishda xatolik', 'error');
        return;
    }

    if (foydalanuvchi && foydalanuvchi.length > 0) {
        xabarnoma("Siz ro'yxatdan o'tgansiz. Kirish sahifasiga o'ting", 'info');
        // window.location.href = "login.html"; // Kirish sahifasiga yo'naltirish
    } 
    else {
        // 3. Ma'lumotlarni yuborish (Insert)
        const { error: insertError } = await _supabase
            .from('login')
            .insert([
                {
                    Ism: ism.value,
                    parol: parol.value,
                    sana: sana.value,
                    raqam: tel.value,
                    email: email.value,
                    jinsi: jinsi ? jinsi.value : 'nomalum' 
                }
            ]);

        if (insertError) {
            xabarnoma("Ma'lumot saqlashda xatolik: " + insertError.message, 'error');
        } else {
            xabarnoma("Muvaffaqiyatli ro'yxatdan o'tdingiz!", 'success');
            // Formani tozalash
            ism.value = "";
            tel.value = "";
            sana.value = "";
            parol.value = "";
        }
    }
}