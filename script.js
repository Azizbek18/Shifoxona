let qism1 = "3FYQA9MNnN2sGoO9mY5LcQW4B0C"
let qism2 = "gsk_7UUEaFevcNmn42NSUKaVWGdyb"
let token = qism1 + qism2
let xotira = [
  {
    role: "system",
    content: `Sen tibbiy maslahatchi AI san. 
        Javobingni quyidagi tartibda ber:
        1. 3-4 qatorli qisqa tahlil.
        2. Ehtimoliy 3 ta kasallik nomini ro'yxat (bullet points) ko'rinishida yoz.
        3. Qisqa tavsiya.
        Javobing aniq, qisqa va o'zbek tilida bo'lsin.`,
  },
];
let yubor = document.getElementById("yubor");
yubor.addEventListener("click", (e) => {
  e.preventDefault();
  const shikoyat = textarea.value.trim();
  if (shikoyat === "") return;

  const radio = document.querySelector('input[type="radio"]:checked');
  const davomiylik = radio
    ? radio.parentElement.textContent.trim()
    : "Noma'lum";
  const sorov = `Shikoyatim: ${shikoyat}. Davomiyligi: ${davomiylik}. Og'riq darajasi:/10. Qisqa tahlil ber (4-5 qator).`;

  xotira.push({ role: "user", content: sorov });

  // 2. API ga so'rov
  fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: xotira,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let xabarAI = data.choices[0].message.content;
      let chiroyli = marked.parse(xabarAI);

      natijaOynasi.innerHTML = `
            <div class="sarlavha">
                <p class="rang">AI tahlil:</p>
                <button class="yangi-btn">Tayyor</button>
            </div>
            <div class="natija-matni">${chiroyli}</div>
        `;
      xotira.push({ role: "assistant", content: xabarAI });
    })
    .catch((error) => {
      console.error("Xatolik:", error);
      natijaOynasi.innerHTML = `<p style="color:red;">Xatolik yuz berdi. Internetni tekshiring.</p>`;
    });
});

const textarea = document.getElementById("textarea");
const buttons = document.querySelectorAll(".katta-btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent.trim();

    if (textarea.value.length > 0) {
      textarea.value += ", " + buttonText;
    } else {
      textarea.value = buttonText;
    }
    button.disabled = true;
  });
});
