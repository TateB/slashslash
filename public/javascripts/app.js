new TypeIt('#type', {
    strings: ['//', 'SLASH', 'SLASH.'],
    speed: 150
});

setTimeout(function() {
    var element = document.getElementById("buydiv");
    element.classList.add("buydivflex");
    document.getElementById("buydiv").removeAttribute("id");
}, 4000);

console.log("//");
console.log("SLASH");
console.log("SLASH.");