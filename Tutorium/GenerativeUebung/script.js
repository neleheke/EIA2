setInterval(() => {

    let img = document.createElement("img");
    img.setAttribute("src", "Schneeflocke.webp");

    img.style.left = Math.random() * window.innerWidth + "px";
    img.style.top = Math.random() * window.innerWidth + "px";

    document.querySelector("body").appendChild(img);
}, 1000); 