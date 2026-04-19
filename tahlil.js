const textarea = document.getElementById('complaint-input');
const analyzeBtn = document.getElementById('analyze-btn');
const aiTitle = document.querySelector('.ai-title');
const aiDesc = document.querySelector('.ai-desc');
const possibilitiesList = document.querySelector('.possibilities ul');

analyzeBtn.addEventListener('click', () => {
    const text = textarea.value.toLowerCase();

    if (text.length < 5) {
        alert("Iltimos, shikoyatingizni batafsilroq yozing.");
        return;
    }

    analyzeBtn.textContent = "Tahlil qilinmoqda...";
    setTimeout(() => {
        analyzeBtn.innerHTML = "AI tahlil qilsin &rarr;";
        if (text.includes('tish') || text.includes('milki') || text.includes('og\'iz')) {
            updateResults('Stomatolog', 'Tish va milk sohasidagi muammolar aniqlandi.', ['Karies', 'Gingivit', 'Pulpit']);
        } else if (text.includes('bosh') || text.includes('miya')) {
            updateResults('Nevropatolog', 'Bosh og\'rig\'i va asab tizimi tahlili.', ['Migren', 'Charchoq', 'Qon bosimi']);
        } else if (text.includes('oshqozon') || text.includes('qorin')) {
            updateResults('Gastrenterolog', 'Hovm hazm qilish tizimi muammolari.', ['Gastrit', 'Diyetik buzilish', 'Zarda bo\'lishi']);
        } else {
            updateResults('Terapevt', 'Umumiy simptomlar aniqlandi.', ['Shamollash', 'Vitamini yetishmasligi', 'Umumiy ko\'rik']);
        }
    }, 1500);
});
function updateResults(title, desc, issues) {
    aiTitle.textContent = title;
    aiDesc.textContent = desc;
    possibilitiesList.innerHTML = '';
    issues.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        possibilitiesList.appendChild(li);
    });
}