const GROQ_API_KEY = "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"; 

const xabarCon = document.querySelector(".xabar-con");
const mainInput = document.querySelector(".katta-input");
const findBtn = document.querySelector(".katta-kirish");
const voiceBtn = document.querySelector(".katta-golos");
const exampleBtns = document.querySelectorAll(".katta-btn");
const resultWrapper = document.querySelector(".katta4-katta");

// Elementlar (Natija kartasi ichidagilar)
const doctorTitle = document.querySelector(".katta4 .rang");
const doctorDesc = document.querySelector("#ai-tavsif"); // O'sha o'zgarmayotgan p
const bookBtn = document.querySelector(".katta4-btn2");

// Boshida natijani yashirib qo'yamiz
resultWrapper.style.display = "none";

// 2. TOAST FUNKSIYASI
function xabarnoma(xabar, turi) {
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
        // Avtomatik tahlilni boshlash
        findBtn.click();
    });
});

// 4. GROQ API ORQALI TAHLIL
async function getAIDiagnosis(userInput) {
    const prompt = `
    Foydalanuvchi shikoyati: "${userInput}"
    Vazifa:
    1. Mos shifokor mutaxassisini toping.
    2. Nega aynan u kerakligini 1 ta gapda tushuntiring.
    Javobni FAQAT JSON formatida bering:
    {
        "doctor": "Mutaxassis nomi",
        "description": "Shikoyatga mos tushuntirish matni",
        "button": "Mutaxassis nomi qabuliga yozilish"
    }`;

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

// 5. ASOSIY TUGMA BOSILGANDA
findBtn.addEventListener('click', async () => {
    const text = mainInput.value.trim();
    if (!text) {
        xabarnoma("Iltimos, shikoyatingizni yozing!", "info");
        return;
    }

    // Yuklanish effekti
    findBtn.disabled = true;
    findBtn.innerHTML = `AI tahlil qilmoqda...`;
    resultWrapper.style.display = "none"; // Yangi qidiruvda eskisini yashiramiz

    const res = await getAIDiagnosis(text);

    if (res) {
        // Ma'lumotlarni yangilash
        doctorTitle.innerText = res.doctor;
        doctorDesc.innerText = res.description; // Endi bu o'zgaradi!
        bookBtn.innerHTML = `${res.button} <img src="next2.svg">`;

        // Natijani ko'rsatish
        resultWrapper.style.display = "flex"; 
        resultWrapper.style.justifyContent = "center";
        
        // Silliq skroll
        setTimeout(() => {
            resultWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);

        xabarnoma("Tahlil yakunlandi", "success");
    } else {
        xabarnoma("Xatolik yuz berdi", "error");
    }

    findBtn.disabled = false;
    findBtn.innerHTML = 'Shifokor toping <img src="./next.svg">';
});

// 6. OVOZLI QIDIRUV (SPEECH API)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ';

    voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.innerText = "Eshityapman...";
    });
}
window.onload = runCounter;
