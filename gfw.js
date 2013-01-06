var debug = require('./debug')('GFW')
  , app = require('./app')
  , fs = require('fs')
  , path = require('path');

// ---- exports

exports.start = start;
exports.stop = stop;

exports.isGfw = isGfw;
exports.getPac = getPac;

// ---- implements

var rule = null;
var pac = null;

var keys = [];
var cache = {};

function start(config){
  rule = config.rule || {blocked: ['twitter.com', 'facebook.com']};
  var proxy = config.pac.proxy || "DIRECT";
  pac = app.tmpl(fs.readFileSync(path.dirname(__filename)+'/'+config.pac.template, 'utf8'), {proxy:proxy, rule:rule});
  debug("started");
}

function stop(){
  rule = null;
  pac = null;
  keys = [];
  cache = {};
  debug("stoped");
}

function isGfw(d){
  if (rule == null || pac == null) throw "NOT_INIT_YET";
  var r = cache[d];
  if (r !== undefined) return r;
  // r === undefined now
  if (!keys) for (var i in rule) keys.push(i);
  for(var s=0; s<keys.length && r === undefined; s++){
    for(var i=0; i<rule[keys[s]].length && r === undefined; i++){
      if (endsWith(d, rule[keys[s]][i])) r = true;
    }
  }
  if (r === undefined) r = false;
  cache[d] = r;
  return r;
}

function getPac(){
  if (rule == null || pac == null) throw "NOT_INIT_YET";
  return pac;
}

function endsWith(str, postfix){
  if (str.length < postfix.length) return false;
  return postfix == str.substr(str.length - postfix.length, postfix.length);
}
