const input = document.getElementById("input");
const btn = document.getElementById("btn");

const title = document.getElementById("title");
const desc = document.getElementById("desc");
const list = document.getElementById("list");

btn.addEventListener("click", () => {
    let text = input.value.toLowerCase();

    if(text.includes("tish")){
        title.textContent = "Stomatolog";
        desc.textContent = "Tish muammosi aniqlanishi mumkin.";
        list.innerHTML = "<li>Karies</li><li>Gingivit</li><li>Pulpit</li>";
    }
    else if(text.includes("bosh")){
        title.textContent = "Nevropatolog";
        desc.textContent = "Bosh og'riq muammosi.";
        list.innerHTML = "<li>Migren</li><li>Charchoq</li><li>Stress</li>";
    }
    else{
        title.textContent = "Terapevt";
        desc.textContent = "Umumiy muammo.";
        list.innerHTML = "<li>Shamollash</li><li>Vitamin yetishmasligi</li>";
    }
});