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

async function Yuborish() {
    let input = document.getElementById('input')
    let pasvord = document.getElementById('pasvord')
    if(input.value == "" && pasvord.value == ""){
        alert("Maydonlarni to'ldiring")
        return
    }

    const {data:foydalanuvchi, error:xatolik} = await _supabase
    .from('login')
    .select('*')
    .eq('email',input.value)
    .eq('parol', pasvord.value)
    if(xatolik){
        alert("Xatolik yuz berdi" + error.message)
        return
    }
    if(foydalanuvchi.length > 0){
        alert("Siz ro'yhatdan o'tgan  ekansiz. Kirish qismiga o'ting")
        window.location.href = "royhat.html"
    }
    else{
        alert("Siz ro'yhatdan o'tmagansiz")
    }
}