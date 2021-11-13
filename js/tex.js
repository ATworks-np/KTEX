function callback(json) {
  $("#result").html("答えは "+json.answer);
}

function send() {
  var s = document.createElement('script');
  a = document.getElementById("CubeValue").value;
  b = document.getElementById("SValue").value;
  param = "?a="+a+"&b="+b
  s.src = '../cgi-bin/jsonp.py'+param;
  document.body.appendChild(s);
  return false;
}
