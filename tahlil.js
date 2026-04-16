function xabarYuborish() {
    const input = document.getElementById("userInput");
    const chatOynasi = document.getElementById("chatOynasi");
    if (input.value.trim() !== "") {
        const userDiv = document.createElement("div");
        userDiv.className = "xabar user";
        userDiv.textContent = input.value;
        chatOynasi.appendChild(userDiv);
        setTimeout(() => {
            const aiDiv = document.createElement("div");
            aiDiv.className = "xabar ai";
            aiDiv.textContent = "Salom bu juda ham qiziq!";
            chatOynasi.appendChild(aiDiv);
            chatOynasi.scrollTop = chatOynasi.scrollHeight;
        }, 1000);
        input.value = "";
        chatOynasi.scrollTop = chatOynasi.scrollHeight;
    }
}