let supabaseKey = 'sb_publishable_qguz__gQ8NQiED350KJ6ZA_PTj-pMZ2'
let supaBaseUrl = 'https://yzucexsnhdaicnrkztrj.supabase.co '

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey)

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

async function Kirish() {
    let ism = document.getElementById('input')
    let tel = document.getElementById('pasvord')

    if (ism.value == "" && tel.value == "") {
          xabarnoma("Maydonlarni to'ldiring",'info')
        return
    }

    const { data: foydalanuvchi, error: xatolik } = await _supabase
        .from('login')
        .select('*')
        .eq('email', ism.value)
        .eq('parol', tel.value)
    if (xatolik) {
        xabarnoma('Xatolik yuz berdi','error')
        return
    }
    if (foydalanuvchi.length > 0) {
        xabarnoma('Siz tizimga kirdingiz','success')
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 2500);
    }
    else {
         xabarnoma("Siz ro'yhatdan o'tmagansiz",'error')
    }
}
