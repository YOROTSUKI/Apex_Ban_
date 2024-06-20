
var myArray = [
    'https://www.apexno1.com/', 
    'https://www.4399.com/', 
    'https://www.respawn.com/', 
    'https://www.bilibili.com/video/BV1wT421m7t6'
];

if (window.self !== window.top) {
    let start = new Date();
    debugger;
    let end = new Date();

    //   console.log(rValue)
    // urls = 
    if (end - start > 100) {
        ''
    } else {
        function RandArray(array) {
            var rand = Math.random() * array.length | 0;
            var rValue = array[rand];
            return rValue;
        }

        var rValue = RandArray(myArray);
    }

}