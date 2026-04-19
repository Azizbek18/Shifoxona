// 1. GLOBAL ELEMENTLAR
const xabarCon = document.querySelector(".xabar-con");
const mainInput = document.querySelector(".katta-input");
const findBtn = document.querySelector(".katta-kirish");
const voiceBtn = document.querySelector(".katta-golos");
const counters = document.querySelectorAll(".num");

// 2. TOAST FUNKSIYASI
function xabarnoma(xabar, turi) {
    const xabarDiv = document.createElement('div');
    xabarDiv.className = `xabar ${turi}`;
    xabarDiv.innerText = xabar;
    xabarCon.appendChild(xabarDiv);
    setTimeout(() => { if (xabarDiv) xabarDiv.remove(); }, 4000);
}

// 3. OVOZLI QIDIRUV (Web Speech API)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ'; // O'zbek tili uchun (yoki 'ru-RU' / 'en-US')
    recognition.interimResults = false;

    voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.style.background = "#ffeded";
        voiceBtn.innerHTML = `<img src="./golos.svg" style="animation: pulse 1s infinite"> Eshitilmoqda...`;
        xabarnoma("Sizni eshityapman, gapiring...", "info");
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        mainInput.value = transcript;
        voiceBtn.style.background = "transparent";
        voiceBtn.innerHTML = `<img src="./golos.svg"> Ovoz bilan aytish`;
        xabarnoma("Ovoz matnga aylantirildi!", "success");
    };

    recognition.onerror = () => {
        voiceBtn.style.background = "transparent";
        voiceBtn.innerHTML = `<img src="./golos.svg"> Ovoz bilan aytish`;
        xabarnoma("Ovozni aniqlashda xatolik yuz berdi", "error");
    };

    recognition.onend = () => {
        voiceBtn.style.background = "transparent";
        voiceBtn.innerHTML = `<img src="./golos.svg"> Ovoz bilan aytish`;
    };
} else {
    voiceBtn.addEventListener('click', () => {
        xabarnoma("Brauzeringiz ovozli qidiruvni qo'llab-quvvatlamaydi", "error");
    });
}

findBtn.addEventListener('click', () => {
    const text = mainInput.value.trim();
    if (text === "") {
        xabarnoma("Iltimos, avval shikoyatingizni yozing!", "info");
        return;
    }

    findBtn.disabled = true;
    findBtn.innerText = "AI tahlil qilmoqda...";
    
    setTimeout(() => {
        findBtn.disabled = false;
        findBtn.innerHTML = 'Shifokor toping <img src="./next.svg">';
        document.querySelector('.katta4-katta').scrollIntoView({ behavior: 'smooth' });
        xabarnoma("Sizga mos shifokor topildi!", "success");
    }, 2000);
});

function runCounter() {
    counters.forEach(counter => {
        const target = +counter.innerText;
        let count = 0;
        const updateCount = () => {
            if (count < target) {
                count += target / 100;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else { counter.innerText = target; }
        };
        updateCount();
    });
}

if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".katta2, .katta4"), {
        max: 5, speed: 400, glare: true, "max-glare": 0.1
    });
}

window.onload = runCounter;
