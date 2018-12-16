function getClass(siz) {
    switch(siz) {
        case 's':
            document.getElementById('ss').classList.add('selected');
            document.getElementById('mm').classList.remove('selected');
            document.getElementById('ll').classList.remove('selected');
            document.getElementById('buybutton').setAttribute('href', '/buypage?size=s');
            break;
        case 'm':
            document.getElementById('mm').classList.add('selected');
            document.getElementById('ss').classList.remove('selected');
            document.getElementById('ll').classList.remove('selected');
            document.getElementById('buybutton').setAttribute('href', '/buypage?size=m');
            break;
        case 'l':
            document.getElementById('ll').classList.add('selected');
            document.getElementById('mm').classList.remove('selected');
            document.getElementById('ss').classList.remove('selected');
            document.getElementById('buybutton').setAttribute('href', '/buypage?size=l');
            break;
      }
}