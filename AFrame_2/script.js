const object = [
    {src: "./objects/pawn.obj",
     animation: "property: rotation; to: 0 0 360; loop: true;"},
    {src: "./objects/rook.obj",
    animation: "property: rotation; to: 0 180 0; loop: true;"},
    {src: "./objects/knight.obj",
    animation: "property: rotation; to: 180 0 0; loop: true;"},
    {src: "./objects/bishop.obj",
    animation: "property: rotation; to: 0 0 180; loop: true;"},
    {src: "./objects/queen.obj",
    animation: "property: rotation; to: 0 180 0; loop: true;"}
]

let index = 1

document.addEventListener("click", function() {

    document.getElementById("obj").setAttribute("src", object[index].src);
    document.getElementById("obj").setAttribute("animation", object[index].animation);
    index++;
    
    if (index == 5) {
        index = 0
    }

})

