let supabaseKey = 'sb_publishable_qguz__gQ8NQiED350KJ6ZA_PTj-pMZ2'
let supaBaseUrl = 'https://yzucexsnhdaicnrkztrj.supabase.co '

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey)

async function Kirish() {
    let ism = document.getElementById('ism')
    let tel = document.getElementById('tel')
    let sana = document.getElementById('sana')
    let parol = document.getElementById('parol')
    if (ism.value == "" && tel.value == "") {
        alert("Maydonlarni to'ldiring")
        return
    }

    const { data: foydalanuvchi, error: xatolik } = await _supabase
        .from('login')
        .select('*')
        .eq('email', ism.value)
        .eq('parol', tel.value)
    if (xatolik) {
        alert("Xatolik yuz berdi" + error.message)
        return
    }
    if (foydalanuvchi.length > 0) {
        alert("Siz ro'yhatdan o'tgan  ekansiz. Kirish qismiga o'ting")
        window.location.href = "royhat.html"
    }
    else {
        const { data, error } = await _supabase
            .from('login')
            .insert([
                {
                    ism: ism.value,
                    parol: parol.value,
                    sana: sana.value,
                    tel: tel.value



                }
            ])
        if (xatolik) {
            alert("Xatolik yuz berdi" + error.message)
            return
        }
        else {
            alert("Siz muvaffaqiyatli ro'yhatdan o'tdingiz")
        }
    }
}
const xabarCon = document.querySelector(".xabar-con")
function xabarnoma(xabar, turi) {
    let xabarMatn = document.createElement('div');
    xabarMatn.classList.add("xabar", turi)
    console.log(xabarMatn);

    xabarMatn.innerText = xabar;

    setTimeout(() => {
        xabarMatn.remove();
    }, 4000);

    xabarCon.appendChild(xabarMatn)
}
