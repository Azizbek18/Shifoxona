const GROQ_API_KEY = "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"; 

const xabarCon = document.querySelector(".xabar-con");
const mainInput = document.querySelector(".katta-input");
const findBtn = document.querySelector(".katta-kirish");
const voiceBtn = document.querySelector(".katta-golos");
const exampleBtns = document.querySelectorAll(".katta-btn");
const resultWrapper = document.querySelector(".katta4-katta");

// Elementlar (Natija kartasi ichidagilar)
const doctorTitle = document.querySelector(".katta4 .rang");
const doctorDesc = document.querySelector("#ai-tavsif");
const bookBtn = document.querySelector(".katta4-btn2");

// Boshida natijani yashirib qo'yamiz
if (resultWrapper) resultWrapper.style.display = "none";

// 2. TOAST FUNKSIYASI (XABARNOMA)
function xabarnoma(xabar, turi) {
    if (!xabarCon) return;
    const div = document.createElement('div');
    div.className = `xabar ${turi}`;
    div.innerText = xabar;
    xabarCon.appendChild(div);
    setTimeout(() => div.remove(), 4000);
}

// 3. NAMUNA TUGMALARNI ISHLATISH
exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        mainInput.value = btn.innerText;
        xabarnoma("Namuna tanlandi", "success");
        findBtn.click(); // Avtomatik tahlilni boshlash
    });
});

// 4. GROQ API ORQALI TAHLIL
async function getAIDiagnosis(userInput) {
    const prompt = `
    Foydalanuvchi shikoyati: "${userInput}"
    Vazifa:
    1. Mos shifokor mutaxassisini toping (masalan: STOMATOLOG, KARDIOLOG va h.k.).
    2. Nega aynan u kerakligini 1 ta gapda tushuntiring.
    Javobni FAQAT JSON formatida bering:
    {
        "doctor": "Mutaxassis nomi",
        "description": "Shikoyatga mos tushuntirish matni",
        "button": "Qabuliga yozilish"
    }`;

    // Agar kalit bo'sh bo'lsa ogohlantirish
    if (!GROQ_API_KEY) {
        console.error("API kalit topilmadi! Vercel Settings-dan GROQ_API_KEY ni qo'shing.");
        return null;
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.5,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
    } catch (error) {
        console.error("API xatosi:", error);
        return null;
    }
}

// 5. ASOSIY TUGMA (SHIFOKOR TOPISH)
findBtn.addEventListener('click', async () => {
    const text = mainInput.value.trim();
    if (!text) {
        xabarnoma("Iltimos, shikoyatingizni yozing!", "info");
        return;
    }

    // Yuklanish holati
    findBtn.disabled = true;
    const originalContent = findBtn.innerHTML;
    findBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> AI tahlil qilmoqda...`;
    resultWrapper.style.display = "none";

    const res = await getAIDiagnosis(text);

    if (res) {
        // Ma'lumotlarni yangilash
        doctorTitle.innerText = res.doctor;
        doctorDesc.innerText = res.description;
        bookBtn.innerHTML = `${res.button} <img src="next2.svg" alt="icon">`;

        // Natijani ko'rsatish
        resultWrapper.style.display = "flex"; 
        resultWrapper.style.justifyContent = "center";
        
        // Silliq skroll qilish
        setTimeout(() => {
            resultWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);

        xabarnoma("AI tahlili muvaffaqiyatli yakunlandi", "success");
    } else {
        xabarnoma("AI tahlilida xatolik yuz berdi", "error");
    }

    findBtn.disabled = false;
    findBtn.innerHTML = originalContent;
});

// 6. OVOZLI QIDIRUV (SPEECH API)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ';

    voiceBtn.addEventListener('click', () => {
        try {
            recognition.start();
            voiceBtn.innerHTML = `<i class="fa-solid fa-microphone-lines fa-beat"></i>`;
            xabarnoma("Sizni eshityapman...", "info");
        } catch (e) {
            console.error("Speech start error:", e);
        }
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        mainInput.value = transcript;
        voiceBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
        findBtn.click(); // Ovoz tugagach avtomatik qidirish
    };

    recognition.onerror = () => {
        voiceBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
        xabarnoma("Ovozni aniqlab bo'lmadi", "error");
    };
}
