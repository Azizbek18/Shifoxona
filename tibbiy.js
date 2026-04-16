const supaBaseUrl = 'https://yzucexsnhdaicnrkztrj.supabase.co'
const supabaseKey = 'sb_publishable_qguz__gQ8NQiED350KJ6ZA_PTj-pMZ2'

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey)

async function Olish() {
    const { data, error } = await _supabase
        .from('foydalanuvchi_id')
        .select('*')
    if (error) {
        alert("Xatolik yuz berdi" + error.message)
    }
    else {
        console.log(data);
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
    }

}

Olish()