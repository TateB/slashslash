function refreshData() {
    var ts = Math.round(((new Date()).getTime() / 1000 - 1546300800) * -1 );
    document.getElementById("countdown").innerHTML = ts;
    setTimeout(refreshData, 1000);
}
refreshData();

console.log("//");
console.log("SLASH");
console.log("SLASH.");