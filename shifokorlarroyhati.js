let supabaseUrl = `https://doboqtivghcdcoowoxmh.supabase.co`
let supabaseKey = `sb_publishable_VzI36RYaoGx_8MfGne-MhA_KjXo82Lv`
let ism = document.getElementById('ism')
let turi = document.getElementById('turi')
let vaqt = document.getElementById('vaqt')
const _supabase = supabase.createClient(supabaseUrl, supabaseKey)


async function Olish() {
    const { data, error } = await _supabase
        .from('shifokorlar')
        .select('*')
    if (error) {
        alert("Xatolik yuz berdi" + error.message)
    }
    else {
        console.log(data);
        let con = document.getElementById('con')
        let html = ''
        data.forEach(element => {
            html += `
            <div class="card">
                <div class="left">
                    <div class="avatar">SK</div>
                    <div>
                        <h3 id="ism">${element.Ism}</h3>
                        <p id="turi">${element.turi}</p>
                        <span class="rating">⭐️ 4.9 • 210 sharh</span>
                    </div>
                </div>
                <div class="right">
                    <p>Bugun bo‘sh: <span id="vaqt">${element.vaqti}</span></p>
                    <button>Qabul olish →</button>
                </div>
            </div>
            `
        });
        con.innerHTML = html
    }

}

Olish()