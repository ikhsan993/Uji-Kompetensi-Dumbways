function draw (){
    function print(s) { document.getElementById('output').innerHTML += s; }
    function println(s) { document.getElementById('output').innerHTML += s + `<br>`; }
    var length = document.getElementById('length').value;
    var size = length,
        i, j;
if (length % 2 == 0) {
    
    for (i = 1; i < size; i++) {
        for (j = 1; j <= size; j++) {
            if (j % 2 == 0) {
                print(`* &nbsp;`);   
            }
            else {
                print(`# &nbsp;`);   
            }
        }
        println("");
    }
} 
else {
    alert ('Number Need to be Even')
}   
}