const state = {
    myNumber: 7,
    currentlyServing: 4,
    totalQueued: 10,
    minutesPerPerson: 12
};
function updateUI() {
    const stepper = document.getElementById('stepper');
    const positionText = document.getElementById('position');
    const waitTimeText = document.getElementById('waitTime');
    const etaText = document.getElementById('eta');
    const currentPatientText = document.getElementById('currentPatient');
    stepper.innerHTML = '';
    for (let i = 1; i <= state.totalQueued; i++) {
        let dot = document.createElement('div');
        if (i < state.currentlyServing) {
            dot.className = "w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-sm";
            dot.innerHTML = '✓';
        } else if (i === state.currentlyServing) {
            dot.className = "w-10 h-10 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center text-xs ring-4 ring-blue-100";
            dot.innerHTML = `<span>${i}</span><span class="text-[8px] leading-none">qabulda</span>`;
        } else if (i === state.myNumber) {
            dot.className = "w-10 h-10 rounded-xl border-2 border-blue-600 text-blue-600 flex items-center justify-center font-bold";
            dot.innerHTML = i;
        } else {
            dot.className = "w-10 h-10 rounded-xl border border-gray-200 text-gray-400 flex items-center justify-center text-sm";
            dot.innerHTML = i;
        }
        stepper.appendChild(dot);
        if (i < state.totalQueued) {
            let line = document.createElement('div');
            line.className = "w-4 h-[2px] bg-gray-200";
            stepper.appendChild(line);
        }
    }
    const peopleAhead = state.myNumber - state.currentlyServing;
    const totalMinutes = peopleAhead * state.minutesPerPerson;
    positionText.innerText = `${peopleAhead} kishi oldingizda`;
    waitTimeText.innerText = `~${totalMinutes} daqiqa`;
    const now = new Date();
    now.setMinutes(now.getMinutes() + totalMinutes);
    etaText.innerText = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    currentPatientText.innerText = state.currentlyServing;
}