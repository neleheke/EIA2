document.getElementById("getin").addEventListener("click", function() {
    document.getElementById("overworld").object3D.visible="false"
    document.getElementById("underworld").object3D.visible="true"
})



document.getElementById("getout").addEventListener("click", function() {
    document.getElementById("underworld").object3D.visible="false"
    document.getElementById("overworld").object3D.visible="true"
})