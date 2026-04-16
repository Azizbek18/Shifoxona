// Elementlarni tanlab olamiz
const dayItems = document.querySelectorAll('.day-item:not(.disabled)');
const timeButtons = document.querySelectorAll('.time-btn:not(.disabled)');
const submitBtn = document.getElementById('yubor');

// Sanani tanlash qismi
dayItems.forEach(day => {
    day.addEventListener('click', () => {
        dayItems.forEach(item => item.classList.remove('active'));
        
        day.classList.add('active');
    });
});

timeButtons.forEach(button => {
    button.addEventListener('click', () => {
        timeButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

submitBtn.addEventListener('click', () => {
    const selectedDay = document.querySelector('.day-item.active strong').innerText;
    const selectedMonth = document.querySelector('.month').innerText;
    const selectedTime = document.querySelector('.time-btn.selected').innerText;

    alert(`Muvaffaqiyatli yozildingiz!\nSana: ${selectedDay}-chi ${selectedMonth}\nVaqt: ${selectedTime}`);
});