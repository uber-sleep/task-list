const icon =  document.querySelector(".title__img");
const title = document.querySelector(".title__name");
const links = document.querySelector(".title__network-links");
const section = document.querySelector(".title__container");

icon.addEventListener("click", () => {
    if (icon.classList[1] == undefined) {
        icon.classList.add("active");
        title.classList.add("active");
        links.classList.add("active");
        section.classList.add("active");
    } else {
        icon.classList.remove("active");
        title.classList.remove("active");
        links.classList.remove("active"); 
        section.classList.remove("active"); 
    };
});