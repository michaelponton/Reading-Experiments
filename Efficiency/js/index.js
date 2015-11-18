var bind = Function.prototype.bind, 
    call = Function.prototype.call,
    slice = bind.call(call, Array.prototype.slice),
    $ = bind.call(call, Document.prototype.querySelectorAll,document),
    $1 = bind.call(call, Document.prototype.querySelector, document); 

var nextWord = (function() {
  var ps = slice($(".source p"));
  var allWords = [];
  
  ps.forEach(function(p) {
    var text = p.innerText;
    while (p.firstChild) {
      p.removeChild(p.firstChild);  
    }
    text.split(" ").map(function(word) {
      var word = tacky.browser.span({}, word);
      allWords.push(word);
      return tacky.browser.$frag(word, " ");
    }).forEach(function(span) {
      p.appendChild(span);
    })
  })
  
  return function() {
    var word = allWords.shift();
    if(!word) return "";
    word.classList.add("read");
    return word.innerHTML;
  };
}).call();

var wpm = 500, mspw = 60/wpm*1000;

var target = $1(".speed span")

setInterval(function() {
  target.innerHTML = nextWord();
}, mspw);
