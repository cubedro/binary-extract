
module.exports = extract;

var comma = ','.charCodeAt(0);
var obrace = '{'.charCodeAt(0);
var cbrace = '}'.charCodeAt(0);
var colon = ':'.charCodeAt(0);

function extract(buf, key){
  var isKey = true;
  var level = 0;

  for (var i = 0; i < buf.length; i++) {
    switch (buf[i]) {
      case colon: isKey = false; break;
      case comma: isKey = true; break;
      case obrace: level++; break;
      case cbrace: level--; break;
    }
    if (!isKey || level > 1) continue;

    var match = true;
    for (var j = 0; j < key.length; j++) {
      if (buf[i + j] != key.charCodeAt(j)) {
        match = false;
        break;
      }
    }
    if (!match) continue;

    var start = i + key.length + 2;
    var end;
    for (var j = start; j < buf.length; j++) {
      if (buf[j] == comma || buf[j] == cbrace) {
        end = j;
        break;
      }
    }

    var json = buf.toString('utf8', start, end);
    return JSON.parse(json);
  }
}

