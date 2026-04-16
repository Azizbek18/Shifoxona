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
    let ism = document.getElementById('ism')
    let tel = document.getElementById('tel')
    let sana = document.getElementById('sana')
    let parol = document.getElementById('parol')
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
        xabarnoma("Siz ro'yhatdan o'tgan  ekansiz. Kirish qismiga o'ting",'info')
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
             xabarnoma("Xatolik yuz berdi",'error')
            return
        }
        else {
            xabarnoma("Siz muvaffaqiyatli ro'yhatdan o'tdingiz",'success')
        }

    }
}
