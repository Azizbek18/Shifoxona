let supabaseUrl = `https://doboqtivghcdcoowoxmh.supabase.co`
let supabaseKey = `sb_publishable_VzI36RYaoGx_8MfGne-MhA_KjXo82Lv`
const _supabase = supabase.createClient(supabaseUrl, supabaseKey)

let hammasi = [] // Barcha shifokorlar saqlanadi
let con = document.getElementById('con')
let tozala = document.getElementById("tozala")
let qidirish = document.getElementById("qidirish")

// 1. Render qilish funksiyasi (HTML yaratish)
function renderShifokorlar(data) {
    let html = ''
    data.forEach(element => {
        html += `
            <div class="card">
                <div class="left">
                    <div class="avatar">${element.Ism.substring(0, 2).toUpperCase()}</div>
                    <div>
                        <h3 class="ism">${element.Ism}</h3>
                        <p class="turi">${element.turi}</p>
                        <span class="rating">⭐️ 4.9 • 210 sharh</span>
                    </div>
                </div>
                <div class="right">
                    <p>Bugun bo‘sh: <span class="vaqt">${element.vaqti}</span></p>
                    <button>Qabul olish →</button>
                </div>
            </div>
        `
    });
    con.innerHTML = html || "<p>Shifokor topilmadi...</p>";
}

// 2. Supabase'dan ma'lumot olish
async function Olish() {
    const { data, error } = await _supabase
        .from('shifokorlar')
        .select('*')
    
    if (error) {
        alert("Xatolik yuz berdi: " + error.message)
    } else {
        hammasi = data
        renderShifokorlar(hammasi)
    }
}

Olish()

tozala.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const tanlanganMatn = e.target.innerText.trim().toLowerCase();

    document.querySelectorAll('#tozala button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    if (tanlanganMatn === "hammasi") {
        renderShifokorlar(hammasi);
    } else {
        const saralangan = hammasi.filter(shifokor => {
            return shifokor.turi.toLowerCase().trim() === tanlanganMatn;
        });
        
        renderShifokorlar(saralangan);
    }
});

qidirish.addEventListener('input', (e) => {
    const qidiruvMatni = e.target.value.toLowerCase().trim();

    const qidiruvNatijasi = hammasi.filter(shifokor => {
        return shifokor.Ism.toLowerCase().includes(qidiruvMatni);
    });


    renderShifokorlar(qidiruvNatijasi);
    
    document.querySelectorAll('#tozala button').forEach(btn => btn.classList.remove('active'));
});