#!/bin/env node
const fs = require("fs");
const save = require("./save.js");
const file = "savegame.bin";
const lz=require("lz-string");
console.log("reading from",file);
const c = fs.readFileSync(file);
console.log("file size is",c.length);
if (c.length < 1024) throw "length is less than 1024 ("+c.length+")";
if (c[0] != 1) throw "first char is not \\1";
const c_ = c.toString().substring(1);
const s_ = lz.decompressFromEncodedURIComponent(c_);
console.log("decompressed lz");
const s = JSON.parse(s_.substring(s_.indexOf("{")));
const f_ = save.decompressObject(s);
console.log("decompressed object");
const f = JSON.stringify(f_,null,"\t");
console.log("converted");
const outFile = "savegame.json";
console.log("writing json to",outFile);
fs.writeFileSync(outFile, f);
