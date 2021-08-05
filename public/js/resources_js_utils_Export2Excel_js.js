(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_utils_Export2Excel_js"],{

/***/ "./resources/js/utils/Export2Excel.js":
/*!********************************************!*\
  !*** ./resources/js/utils/Export2Excel.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "export_table_to_excel": () => (/* binding */ export_table_to_excel),
/* harmony export */   "export_json_to_excel": () => (/* binding */ export_json_to_excel)
/* harmony export */ });
/* harmony import */ var xlsx_js_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xlsx-js-style */ "./node_modules/xlsx-js-style/dist/xlsx.min.js");
/* harmony import */ var xlsx_js_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xlsx_js_style__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* eslint-disable */
// require("script-loader!file-saver");
__webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");



function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll("tr");
  var ranges = [];

  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll("td");

    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute("colspan");
      var rowspan = cell.getAttribute("rowspan");
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue; //Skip ranges

      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) {
            outRow.push(null);
          }
        }
      }); //Handle Row Span

      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      } //Handle Value


      outRow.push(cellValue !== "" ? cellValue : null); //Handle Colspan

      if (colspan) for (var k = 0; k < colspan - 1; ++k) {
        outRow.push(null);
      }
    }

    out.push(outRow);
  }

  return [out, ranges];
}

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };

  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;

      if (R == 0) {
        cell.s = {
          font: {
            color: {
              rgb: "FFFFFF"
            }
          },
          fill: {
            fgColor: {
              rgb: "0093C6"
            }
          }
        };
      } else {
        if (R % 2 != 0) {
          cell.s = {
            fill: {
              fgColor: {
                rgb: "DCE6F1"
              }
            }
          };
        }
      }

      var cell_ref = xlsx_js_style__WEBPACK_IMPORTED_MODULE_0___default().utils.encode_cell({
        c: C,
        r: R
      });
      if (typeof cell.v === "number") cell.t = "n";else if (typeof cell.v === "boolean") cell.t = "b";else if (cell.v instanceof Date) {
        cell.t = "n";
        cell.z = (xlsx_js_style__WEBPACK_IMPORTED_MODULE_0___default().SSF._table[14]);
        cell.v = datenum(cell.v);
      } else cell.t = "s";
      ws[cell_ref] = cell;
    }
  }

  if (range.s.c < 10000000) ws["!ref"] = xlsx_js_style__WEBPACK_IMPORTED_MODULE_0___default().utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);

  for (var i = 0; i != s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff;
  }

  return buf;
}

function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  var oo = generateArray(theTable);
  var ranges = oo[1];
  /* original data */

  var data = oo[0];
  var ws_name = "SheetJS";
  var wb = new Workbook(),
      ws = sheet_from_array_of_arrays(data);
  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];

  ws["!merges"] = ranges; // ws['!autofilter']={ref:"A1:E1"};

  /* add worksheet to workbook */

  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  var wbout = xlsx_js_style__WEBPACK_IMPORTED_MODULE_0___default().write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "binary"
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx");
}
function export_json_to_excel() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$multiHeader = _ref.multiHeader,
      multiHeader = _ref$multiHeader === void 0 ? [] : _ref$multiHeader,
      header = _ref.header,
      data = _ref.data,
      filename = _ref.filename,
      _ref$merges = _ref.merges,
      merges = _ref$merges === void 0 ? [] : _ref$merges,
      _ref$autoWidth = _ref.autoWidth,
      autoWidth = _ref$autoWidth === void 0 ? true : _ref$autoWidth,
      _ref$bookType = _ref.bookType,
      bookType = _ref$bookType === void 0 ? "xlsx" : _ref$bookType,
      autofilter = _ref.autofilter;

  /* original data */
  filename = filename || "excel-list";
  data = _toConsumableArray(data);
  data.unshift(header);

  for (var i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i]);
  }

  var ws_name = "SheetJS";
  var wb = new Workbook(),
      ws = sheet_from_array_of_arrays(data);

  if (merges.length > 0) {
    if (!ws["!merges"]) ws["!merges"] = [];
    merges.forEach(function (item) {
      ws["!merges"].push(xlsx_js_style__WEBPACK_IMPORTED_MODULE_0___default().utils.decode_range(item));
    });
  }

  if (autofilter) {
    ws["!autofilter"] = autofilter;
  }

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    var colWidth = data.map(function (row) {
      return row.map(function (val) {
        /*先判断是否为null/undefined*/
        if (val == null) {
          return {
            wch: 10
          };
        } else if (val.toString().charCodeAt(0) > 255) {
          /*再判断是否为中文*/
          return {
            wch: val.toString().length * 2
          };
        } else {
          return {
            wch: val.toString().length
          };
        }
      });
    });
    /*以第一行为初始值*/

    var result = colWidth[0];

    for (var _i = 1; _i < colWidth.length; _i++) {
      for (var j = 0; j < colWidth[_i].length; j++) {
        if (result[j]["wch"] < colWidth[_i][j]["wch"]) {
          result[j]["wch"] = colWidth[_i][j]["wch"];
        }
      }
    }

    ws["!cols"] = result;
  }
  /* add worksheet to workbook */


  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  var wbout = xlsx_js_style__WEBPACK_IMPORTED_MODULE_0___default().write(wb, {
    bookType: bookType,
    bookSST: false,
    type: "binary"
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "".concat(filename, ".").concat(bookType));
}

/***/ }),

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof __webpack_require__.g&&__webpack_require__.g.global===__webpack_require__.g?__webpack_require__.g:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});

//# sourceMappingURL=FileSaver.min.js.map

/***/ }),

/***/ "./node_modules/xlsx-js-style/dist/xlsx.min.js":
/*!*****************************************************!*\
  !*** ./node_modules/xlsx-js-style/dist/xlsx.min.js ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "?04c1")["Buffer"];
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
/* xlsx-js-style 1.0.0 @ 2021-01-26T01:44:40.102Z */
var XLSX={};function make_xlsx_lib(n){n.version="0.16.9";var f=1200,S=1252; true&&"undefined"==typeof cptable&&("undefined"!=typeof __webpack_require__.g?__webpack_require__.g.cptable=__webpack_require__(/*! ../libs/cpexcel.js */ "./node_modules/xlsx-js-style/libs/cpexcel.js"):"undefined"!=typeof window&&(window.cptable=__webpack_require__(/*! ../libs/cpexcel.js */ "./node_modules/xlsx-js-style/libs/cpexcel.js")));for(var t=[874,932,936,949,950],e=0;e<=8;++e)t.push(1250+e);var c={0:1252,1:65001,2:65001,77:1e4,128:932,129:949,130:1361,134:936,136:950,161:1253,162:1254,163:1258,177:1255,178:1256,186:1257,204:1251,222:874,238:1250,255:1252,69:6969},l=function(e){-1!=t.indexOf(e)&&(S=c[0]=e)};var ce=function(e){l(f=e)};function h(){ce(1200),l(1252)}function te(e){for(var t=[],r=0,n=e.length;r<n;++r)t[r]=e.charCodeAt(r);return t}var re=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1);return 255==t&&254==r?function(e){for(var t=[],r=0;r<e.length>>1;++r)t[r]=String.fromCharCode(e.charCodeAt(2*r)+(e.charCodeAt(2*r+1)<<8));return t.join("")}(e.slice(2)):254==t&&255==r?function(e){for(var t=[],r=0;r<e.length>>1;++r)t[r]=String.fromCharCode(e.charCodeAt(2*r+1)+(e.charCodeAt(2*r)<<8));return t.join("")}(e.slice(2)):65279==t?e.slice(1):e},u=function(e){return String.fromCharCode(e)},a=function(e){return String.fromCharCode(e)};"undefined"!=typeof cptable&&(ce=function(e){l(f=e)},re=function(e){return 255===e.charCodeAt(0)&&254===e.charCodeAt(1)?cptable.utils.decode(1200,te(e.slice(2))):e},u=function(e){return 1200===f?String.fromCharCode(e):cptable.utils.decode(f,[255&e,e>>8])[0]},a=function(e){return cptable.utils.decode(S,[e])[0]});var d,fe=null,Y=(d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",{encode:function(e){for(var t,r,n,a,s,i="",o=0,l=0,c=0;c<e.length;)a=(t=e.charCodeAt(c++))>>2,s=(3&t)<<4|(r=e.charCodeAt(c++))>>4,o=(15&r)<<2|(n=e.charCodeAt(c++))>>6,l=63&n,isNaN(r)?o=l=64:isNaN(n)&&(l=64),i+=d.charAt(a)+d.charAt(s)+d.charAt(o)+d.charAt(l);return i},decode:function(e){var t,r,n,a,s,i,o="";e=e.replace(/[^\w\+\/\=]/g,"");for(var l=0;l<e.length;)t=d.indexOf(e.charAt(l++))<<2|(a=d.indexOf(e.charAt(l++)))>>4,o+=String.fromCharCode(t),r=(15&a)<<4|(s=d.indexOf(e.charAt(l++)))>>2,64!==s&&(o+=String.fromCharCode(r)),n=(3&s)<<6|(i=d.indexOf(e.charAt(l++))),64!==i&&(o+=String.fromCharCode(n));return o}}),Q="undefined"!=typeof Buffer&&"undefined"!=typeof process&&void 0!==process.versions&&!!process.versions.node,s=function(){};if("undefined"!=typeof Buffer){var r=!Buffer.from;if(!r)try{Buffer.from("foo","utf8")}catch(e){r=!0}s=r?function(e,t){return t?new Buffer(e,t):new Buffer(e)}:Buffer.from.bind(Buffer),Buffer.alloc||(Buffer.alloc=function(e){return new Buffer(e)}),Buffer.allocUnsafe||(Buffer.allocUnsafe=function(e){return new Buffer(e)})}function J(e){return Q?Buffer.alloc(e):new Array(e)}function q(e){return Q?Buffer.allocUnsafe(e):new Array(e)}var Z=function(e){return Q?s(e,"binary"):e.split("").map(function(e){return 255&e.charCodeAt(0)})};function i(e){if("undefined"==typeof ArrayBuffer)return Z(e);for(var t=new ArrayBuffer(e.length),r=new Uint8Array(t),n=0;n!=e.length;++n)r[n]=255&e.charCodeAt(n);return t}function o(e){if(Array.isArray(e))return e.map(function(e){return String.fromCharCode(e)}).join("");for(var t=[],r=0;r<e.length;++r)t[r]=String.fromCharCode(e[r]);return t.join("")}function p(e){if("undefined"==typeof ArrayBuffer)throw new Error("Unsupported");if(e instanceof ArrayBuffer)return p(new Uint8Array(e));for(var t=new Array(e.length),r=0;r<e.length;++r)t[r]=e[r];return t}var he=function(e){return[].concat.apply([],e)},ee=/\u0000/g,ne=/[\u0001-\u0006]/g,ue={},ae=function(e){function v(e){for(var t="",r=e.length-1;0<=r;)t+=e.charAt(r--);return t}function E(e,t){for(var r="";r.length<t;)r+=e;return r}function x(e,t){e=""+e;return t<=e.length?e:E("0",t-e.length)+e}function S(e,t){e=""+e;return t<=e.length?e:E(" ",t-e.length)+e}function w(e,t){e=""+e;return t<=e.length?e:e+E(" ",t-e.length)}e.version="0.11.2";var a=Math.pow(2,32);function C(e,t){if(a<e||e<-a)return r=e,n=t,r=""+Math.round(r),n<=r.length?r:E("0",n-r.length)+r;var r,n,e=Math.round(e);return(t=t)<=(e=""+(e=e)).length?e:E("0",t-e.length)+e}function _(e,t){return t=t||0,e.length>=7+t&&103==(32|e.charCodeAt(t))&&101==(32|e.charCodeAt(t+1))&&110==(32|e.charCodeAt(t+2))&&101==(32|e.charCodeAt(t+3))&&114==(32|e.charCodeAt(t+4))&&97==(32|e.charCodeAt(t+5))&&108==(32|e.charCodeAt(t+6))}var y=[["Sun","Sunday"],["Mon","Monday"],["Tue","Tuesday"],["Wed","Wednesday"],["Thu","Thursday"],["Fri","Friday"],["Sat","Saturday"]],A=[["J","Jan","January"],["F","Feb","February"],["M","Mar","March"],["A","Apr","April"],["M","May","May"],["J","Jun","June"],["J","Jul","July"],["A","Aug","August"],["S","Sep","September"],["O","Oct","October"],["N","Nov","November"],["D","Dec","December"]];function t(e){e[0]="General",e[1]="0",e[2]="0.00",e[3]="#,##0",e[4]="#,##0.00",e[9]="0%",e[10]="0.00%",e[11]="0.00E+00",e[12]="# ?/?",e[13]="# ??/??",e[14]="m/d/yy",e[15]="d-mmm-yy",e[16]="d-mmm",e[17]="mmm-yy",e[18]="h:mm AM/PM",e[19]="h:mm:ss AM/PM",e[20]="h:mm",e[21]="h:mm:ss",e[22]="m/d/yy h:mm",e[37]="#,##0 ;(#,##0)",e[38]="#,##0 ;[Red](#,##0)",e[39]="#,##0.00;(#,##0.00)",e[40]="#,##0.00;[Red](#,##0.00)",e[45]="mm:ss",e[46]="[h]:mm:ss",e[47]="mmss.0",e[48]="##0.0E+0",e[49]="@",e[56]='"上午/下午 "hh"時"mm"分"ss"秒 "'}var s={};t(s);for(var i=[],r=0,r=5;r<=8;++r)i[r]=32+r;for(r=23;r<=26;++r)i[r]=0;for(r=27;r<=31;++r)i[r]=14;for(r=50;r<=58;++r)i[r]=14;for(r=59;r<=62;++r)i[r]=r-58;for(r=67;r<=68;++r)i[r]=r-58;for(r=72;r<=75;++r)i[r]=r-58;for(r=67;r<=68;++r)i[r]=r-57;for(r=76;r<=78;++r)i[r]=r-56;for(r=79;r<=81;++r)i[r]=r-34;var o=[];function B(e,t,r){for(var n=e<0?-1:1,a=e*n,s=0,i=1,o=0,l=1,c=0,f=0,h=Math.floor(a);c<t&&(o=(h=Math.floor(a))*i+s,f=h*c+l,!(a-h<5e-8));)a=1/(a-h),s=i,i=o,l=c,c=f;if(t<f&&(o=t<c?(f=l,s):(f=c,i)),!r)return[0,n*o,f];r=Math.floor(n*o/f);return[r,n*o-r*f,f]}function I(e,t,r){if(2958465<e||e<0)return null;var n=0|e,a=Math.floor(86400*(e-n)),s=0,i=[],e={D:n,T:a,u:86400*(e-n)-a,y:0,m:0,d:0,H:0,M:0,S:0,q:0};return Math.abs(e.u)<1e-6&&(e.u=0),t&&t.date1904&&(n+=1462),.9999<e.u&&(e.u=0,86400==++a&&(e.T=a=0,++n,++e.D)),60===n?(i=r?[1317,10,29]:[1900,2,29],s=3):0===n?(i=r?[1317,8,29]:[1900,1,0],s=6):(60<n&&--n,(t=new Date(1900,0,1)).setDate(t.getDate()+n-1),i=[t.getFullYear(),t.getMonth()+1,t.getDate()],s=t.getDay(),n<60&&(s=(s+6)%7),r&&(s=function(e,t){t[0]-=581;t=e.getDay();e<60&&(t=(t+6)%7);return t}(t,i))),e.y=i[0],e.m=i[1],e.d=i[2],e.S=a%60,a=Math.floor(a/60),e.M=a%60,a=Math.floor(a/60),e.H=a,e.q=s,e}o[5]=o[63]='"$"#,##0_);\\("$"#,##0\\)',o[6]=o[64]='"$"#,##0_);[Red]\\("$"#,##0\\)',o[7]=o[65]='"$"#,##0.00_);\\("$"#,##0.00\\)',o[8]=o[66]='"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',o[41]='_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',o[42]='_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',o[43]='_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',o[44]='_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)',e.parse_date_code=I;var n=new Date(1899,11,31,0,0,0),l=n.getTime(),c=new Date(1900,2,1,0,0,0);function f(e,t){var r=e.getTime();return t?r-=1262304e5:c<=e&&(r+=864e5),(r-(l+6e4*(e.getTimezoneOffset()-n.getTimezoneOffset())))/864e5}e._general_int=function(e){return e.toString(10)};var h,u,d,p=(h=/(?:\.0*|(\.\d*[1-9])0+)$/,u=/(?:\.0*|(\.\d*[1-9])0+)[Ee]/,d=/(E[+-])(\d)$/,function(e){var t,r,n,a=Math.floor(Math.log(Math.abs(e))*Math.LOG10E),s=-4<=a&&a<=-1?e.toPrecision(10+a):Math.abs(a)<=9?(r=(t=e)<0?12:11,(n=m(t.toFixed(12))).length<=r||(n=t.toPrecision(10)).length<=r?n:t.toExponential(5)):10===a?e.toFixed(10).substr(0,12):(s=m((e=e).toFixed(11))).length>(e<0?12:11)||"0"===s||"-0"===s?e.toPrecision(6):s;return m(-1==(s=s.toUpperCase()).indexOf("E")?s:s.replace(u,"$1E").replace(d,"$10$2"))});function m(e){return-1==e.indexOf(".")?e:e.replace(h,"$1")}function R(e,t){switch(typeof e){case"string":return e;case"boolean":return e?"TRUE":"FALSE";case"number":return(0|e)===e?e.toString(10):p(e);case"undefined":return"";case"object":if(null==e)return"";if(e instanceof Date)return $(14,f(e,t&&t.date1904),t)}throw new Error("unsupported value in General format: "+e)}function T(e){if(e.length<=3)return e;for(var t=e.length%3,r=e.substr(0,t);t!=e.length;t+=3)r+=(0<r.length?",":"")+e.substr(t,3);return r}e._general_num=p,e._general=R;var k,F,D,O,P,N=(k=/%/g,F=/# (\?+)( ?)\/( ?)(\d+)/,D=/^#*0*\.([0#]+)/,O=/\).*[0#]/,P=/\(###\) ###\\?-####/,function(e,t,r){return((0|r)===r?g:H)(e,t,r)});function M(e){for(var t,r="",n=0;n!=e.length;++n)switch(t=e.charCodeAt(n)){case 35:break;case 63:r+=" ";break;case 48:r+="0";break;default:r+=String.fromCharCode(t)}return r}function L(e,t){t=Math.pow(10,t);return""+Math.round(e*t)/t}function U(e,t){var r=e-Math.floor(e),e=Math.pow(10,t);return t<(""+Math.round(r*e)).length?0:Math.round(r*e)}function H(e,t,r){if(40===e.charCodeAt(0)&&!t.match(O)){var n=t.replace(/\( */,"").replace(/ \)/,"").replace(/\)/,"");return 0<=r?H("n",n,r):"("+H("n",n,-r)+")"}if(44===t.charCodeAt(t.length-1))return function(e,t,r){for(var n=t.length-1;44===t.charCodeAt(n-1);)--n;return N(e,t.substr(0,n),r/Math.pow(10,3*(t.length-n)))}(e,t,r);if(-1!==t.indexOf("%"))return o=e,c=r,l=(f=t).replace(k,""),f=f.length-l.length,N(o,l,c*Math.pow(10,2*f))+E("%",f);var a;if(-1!==t.indexOf("E"))return function e(t,r){var n,a=t.indexOf("E")-t.indexOf(".")-1;if(t.match(/^#+0.0E\+0$/)){if(0==r)return"0.0E+0";if(r<0)return"-"+e(t,-r);var s=t.indexOf(".");-1===s&&(s=t.indexOf("E"));var i=Math.floor(Math.log(r)*Math.LOG10E)%s;if(i<0&&(i+=s),-1===(n=(r/Math.pow(10,i)).toPrecision(1+a+(s+i)%s)).indexOf("e")){var o=Math.floor(Math.log(r)*Math.LOG10E);for(-1===n.indexOf(".")?n=n.charAt(0)+"."+n.substr(1)+"E+"+(o-n.length+i):n+="E+"+(o-i);"0."===n.substr(0,2);)n=(n=n.charAt(0)+n.substr(2,s)+"."+n.substr(2+s)).replace(/^0+([1-9])/,"$1").replace(/^0+\./,"0.");n=n.replace(/\+-/,"-")}n=n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,t,r,n){return t+r+n.substr(0,(s+i)%s)+"."+n.substr(i)+"E"})}else n=r.toExponential(a);return t.match(/E\+00$/)&&n.match(/e[+-]\d$/)&&(n=n.substr(0,n.length-1)+"0"+n.charAt(n.length-1)),(n=t.match(/E\-/)&&n.match(/e\+/)?n.replace(/e\+/,"e"):n).replace("e","E")}(t,r);if(36===t.charCodeAt(0))return"$"+H(e,t.substr(" "==t.charAt(1)?2:1),r);var s,i,o,l,c,f,h,u=Math.abs(r),d=r<0?"-":"";if(t.match(/^00+$/))return d+C(u,t.length);if(t.match(/^[#?]+$/))return(a="0"===(a=C(r,0))?"":a).length>t.length?a:M(t.substr(0,t.length-a.length))+a;if(s=t.match(F))return h=s,o=u,l=d,c=parseInt(h[4],10),f=Math.round(o*c),o=Math.floor(f/c),c,l+(0===o?"":""+o)+" "+(0==(f-=o*c)?E(" ",h[1].length+1+h[4].length):S(f,h[1].length)+h[2]+"/"+h[3]+x(c,h[4].length));if(t.match(/^#+0+$/))return d+C(u,t.length-t.indexOf("0"));if(s=t.match(D))return a=L(r,s[1].length).replace(/^([^\.]+)$/,"$1."+M(s[1])).replace(/\.$/,"."+M(s[1])).replace(/\.(\d*)$/,function(e,t){return"."+t+E("0",M(s[1]).length-t.length)}),-1!==t.indexOf("0.")?a:a.replace(/^0\./,".");if(t=t.replace(/^#+([0.])/,"$1"),s=t.match(/^(0*)\.(#*)$/))return d+L(u,s[2].length).replace(/\.(\d*[1-9])0*$/,".$1").replace(/^(-?\d*)$/,"$1.").replace(/^0\./,s[1].length?"0.":".");if(s=t.match(/^#{1,3},##0(\.?)$/))return d+T(C(u,0));if(s=t.match(/^#,##0\.([#0]*0)$/))return r<0?"-"+H(e,t,-r):T(""+(Math.floor(r)+(h=r,(p=s[1].length)<(""+Math.round((h-Math.floor(h))*Math.pow(10,p))).length?1:0)))+"."+x(U(r,s[1].length),s[1].length);if(s=t.match(/^#,#*,#0/))return H(e,t.replace(/^#,#*,/,""),r);if(s=t.match(/^([0#]+)(\\?-([0#]+))+$/))return a=v(H(e,t.replace(/[\\-]/g,""),r)),i=0,v(v(t.replace(/\\/g,"")).replace(/[0#]/g,function(e){return i<a.length?a.charAt(i++):"0"===e?"0":""}));if(t.match(P))return"("+(a=H(e,"##########",r)).substr(0,3)+") "+a.substr(3,3)+"-"+a.substr(6);var p="";if(s=t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))return i=Math.min(s[4].length,7),m=B(u,Math.pow(10,i)-1,!1),a=d," "==(p=N("n",s[1],m[1])).charAt(p.length-1)&&(p=p.substr(0,p.length-1)+"0"),a+=p+s[2]+"/"+s[3],(p=w(m[2],i)).length<s[4].length&&(p=M(s[4].substr(s[4].length-p.length))+p),a+=p;if(s=t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))return i=Math.min(Math.max(s[1].length,s[4].length),7),d+((m=B(u,Math.pow(10,i)-1,!0))[0]||(m[1]?"":"0"))+" "+(m[1]?S(m[1],i)+s[2]+"/"+s[3]+w(m[2],i):E(" ",2*i+1+s[2].length+s[3].length));if(s=t.match(/^[#0?]+$/))return a=C(r,0),t.length<=a.length?a:M(t.substr(0,t.length-a.length))+a;if(s=t.match(/^([#0?]+)\.([#0]+)$/)){a=""+r.toFixed(Math.min(s[2].length,10)).replace(/([^0])0+$/,"$1"),i=a.indexOf(".");var m=t.indexOf(".")-i,g=t.length-a.length-m;return M(t.substr(0,m)+a+t.substr(t.length-g))}if(s=t.match(/^00,000\.([#0]*0)$/))return i=U(r,s[1].length),r<0?"-"+H(e,t,-r):T((g=r)<2147483647&&-2147483648<g?""+(0<=g?0|g:g-1|0):""+Math.floor(g)).replace(/^\d,\d{3}$/,"0$&").replace(/^\d*$/,function(e){return"00,"+(e.length<3?x(0,3-e.length):"")+e})+"."+x(i,s[1].length);switch(t){case"###,##0.00":return H(e,"#,##0.00",r);case"###,###":case"##,###":case"#,###":var b=T(C(u,0));return"0"!==b?d+b:"";case"###,###.00":return H(e,"###,##0.00",r).replace(/^0\./,".");case"#,###.00":return H(e,"#,##0.00",r).replace(/^0\./,".")}throw new Error("unsupported format |"+t+"|")}function g(e,t,r){if(40===e.charCodeAt(0)&&!t.match(O)){var n=t.replace(/\( */,"").replace(/ \)/,"").replace(/\)/,"");return 0<=r?g("n",n,r):"("+g("n",n,-r)+")"}if(44===t.charCodeAt(t.length-1))return function(e,t,r){for(var n=t.length-1;44===t.charCodeAt(n-1);)--n;return N(e,t.substr(0,n),r/Math.pow(10,3*(t.length-n)))}(e,t,r);if(-1!==t.indexOf("%"))return a=e,i=r,n=(s=t).replace(k,""),s=s.length-n.length,N(a,n,i*Math.pow(10,2*s))+E("%",s);var a,s,i,o;if(-1!==t.indexOf("E"))return function e(t,r){var n,a=t.indexOf("E")-t.indexOf(".")-1;if(t.match(/^#+0.0E\+0$/)){if(0==r)return"0.0E+0";if(r<0)return"-"+e(t,-r);var s=t.indexOf(".");-1===s&&(s=t.indexOf("E"));var i,o=Math.floor(Math.log(r)*Math.LOG10E)%s;o<0&&(o+=s),(n=(r/Math.pow(10,o)).toPrecision(1+a+(s+o)%s)).match(/[Ee]/)||(i=Math.floor(Math.log(r)*Math.LOG10E),-1===n.indexOf(".")?n=n.charAt(0)+"."+n.substr(1)+"E+"+(i-n.length+o):n+="E+"+(i-o),n=n.replace(/\+-/,"-")),n=n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/,function(e,t,r,n){return t+r+n.substr(0,(s+o)%s)+"."+n.substr(o)+"E"})}else n=r.toExponential(a);return t.match(/E\+00$/)&&n.match(/e[+-]\d$/)&&(n=n.substr(0,n.length-1)+"0"+n.charAt(n.length-1)),(n=t.match(/E\-/)&&n.match(/e\+/)?n.replace(/e\+/,"e"):n).replace("e","E")}(t,r);if(36===t.charCodeAt(0))return"$"+g(e,t.substr(" "==t.charAt(1)?2:1),r);var l,c,f=Math.abs(r),h=r<0?"-":"";if(t.match(/^00+$/))return h+x(f,t.length);if(t.match(/^[#?]+$/))return(o=0===r?"":""+r).length>t.length?o:M(t.substr(0,t.length-o.length))+o;if(l=t.match(F))return h+(0===(u=f)?"":""+u)+E(" ",(u=l)[1].length+2+u[4].length);if(t.match(/^#+0+$/))return h+x(f,t.length-t.indexOf("0"));if(l=t.match(D))return o=(o=(""+r).replace(/^([^\.]+)$/,"$1."+M(l[1])).replace(/\.$/,"."+M(l[1]))).replace(/\.(\d*)$/,function(e,t){return"."+t+E("0",M(l[1]).length-t.length)}),-1!==t.indexOf("0.")?o:o.replace(/^0\./,".");if(t=t.replace(/^#+([0.])/,"$1"),l=t.match(/^(0*)\.(#*)$/))return h+(""+f).replace(/\.(\d*[1-9])0*$/,".$1").replace(/^(-?\d*)$/,"$1.").replace(/^0\./,l[1].length?"0.":".");if(l=t.match(/^#{1,3},##0(\.?)$/))return h+T(""+f);if(l=t.match(/^#,##0\.([#0]*0)$/))return r<0?"-"+g(e,t,-r):T(""+r)+"."+E("0",l[1].length);if(l=t.match(/^#,#*,#0/))return g(e,t.replace(/^#,#*,/,""),r);if(l=t.match(/^([0#]+)(\\?-([0#]+))+$/))return o=v(g(e,t.replace(/[\\-]/g,""),r)),c=0,v(v(t.replace(/\\/g,"")).replace(/[0#]/g,function(e){return c<o.length?o.charAt(c++):"0"===e?"0":""}));if(t.match(P))return"("+(o=g(e,"##########",r)).substr(0,3)+") "+o.substr(3,3)+"-"+o.substr(6);var u="";if(l=t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))return c=Math.min(l[4].length,7),d=B(f,Math.pow(10,c)-1,!1),o=h," "==(u=N("n",l[1],d[1])).charAt(u.length-1)&&(u=u.substr(0,u.length-1)+"0"),o+=u+l[2]+"/"+l[3],(u=w(d[2],c)).length<l[4].length&&(u=M(l[4].substr(l[4].length-u.length))+u),o+=u;if(l=t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))return c=Math.min(Math.max(l[1].length,l[4].length),7),h+((d=B(f,Math.pow(10,c)-1,!0))[0]||(d[1]?"":"0"))+" "+(d[1]?S(d[1],c)+l[2]+"/"+l[3]+w(d[2],c):E(" ",2*c+1+l[2].length+l[3].length));if(l=t.match(/^[#0?]+$/))return o=""+r,t.length<=o.length?o:M(t.substr(0,t.length-o.length))+o;if(l=t.match(/^([#0]+)\.([#0]+)$/)){o=""+r.toFixed(Math.min(l[2].length,10)).replace(/([^0])0+$/,"$1"),c=o.indexOf(".");var u=t.indexOf(".")-c,d=t.length-o.length-u;return M(t.substr(0,u)+o+t.substr(t.length-d))}if(l=t.match(/^00,000\.([#0]*0)$/))return r<0?"-"+g(e,t,-r):T(""+r).replace(/^\d,\d{3}$/,"0$&").replace(/^\d*$/,function(e){return"00,"+(e.length<3?x(0,3-e.length):"")+e})+"."+x(0,l[1].length);switch(t){case"###,###":case"##,###":case"#,###":var p=T(""+f);return"0"!==p?h+p:"";default:if(t.match(/\.[0#?]*$/))return g(e,t.slice(0,t.lastIndexOf(".")),r)+M(t.slice(t.lastIndexOf(".")))}throw new Error("unsupported format |"+t+"|")}function b(e){for(var t=[],r=!1,n=0,a=0;n<e.length;++n)switch(e.charCodeAt(n)){case 34:r=!r;break;case 95:case 42:case 92:++n;break;case 59:t[t.length]=e.substr(a,n-a),a=n+1}if(t[t.length]=e.substr(a),!0===r)throw new Error("Format |"+e+"| unterminated string ");return t}e._split=b;var W=/\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;function V(e){for(var t=0,r="",n="";t<e.length;)switch(r=e.charAt(t)){case"G":_(e,t)&&(t+=6),t++;break;case'"':for(;34!==e.charCodeAt(++t)&&t<e.length;);++t;break;case"\\":case"_":t+=2;break;case"@":++t;break;case"B":case"b":if("1"===e.charAt(t+1)||"2"===e.charAt(t+1))return!0;case"M":case"D":case"Y":case"H":case"S":case"E":case"m":case"d":case"y":case"h":case"s":case"e":case"g":return!0;case"A":case"a":case"上":if("A/P"===e.substr(t,3).toUpperCase())return!0;if("AM/PM"===e.substr(t,5).toUpperCase())return!0;if("上午/下午"===e.substr(t,5).toUpperCase())return!0;++t;break;case"[":for(n=r;"]"!==e.charAt(t++)&&t<e.length;)n+=e.charAt(t);if(n.match(W))return!0;break;case".":case"0":case"#":for(;t<e.length&&(-1<"0#?.,E+-%".indexOf(r=e.charAt(++t))||"\\"==r&&"-"==e.charAt(t+1)&&-1<"0#".indexOf(e.charAt(t+2))););break;case"?":for(;e.charAt(++t)===r;);break;case"*":++t," "!=e.charAt(t)&&"*"!=e.charAt(t)||++t;break;case"(":case")":++t;break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":for(;t<e.length&&-1<"0123456789".indexOf(e.charAt(++t)););break;case" ":default:++t}return!1}function X(e,t,r,n){for(var a,s,i,o=[],l="",c=0,f="",h="t",u="H";c<e.length;)switch(f=e.charAt(c)){case"G":if(!_(e,c))throw new Error("unrecognized character "+f+" in "+e);o[o.length]={t:"G",v:"General"},c+=7;break;case'"':for(l="";34!==(i=e.charCodeAt(++c))&&c<e.length;)l+=String.fromCharCode(i);o[o.length]={t:"t",v:l},++c;break;case"\\":var d=e.charAt(++c),p="("===d||")"===d?d:"t";o[o.length]={t:p,v:d},++c;break;case"_":o[o.length]={t:"t",v:" "},c+=2;break;case"@":o[o.length]={t:"T",v:t},++c;break;case"B":case"b":if("1"===e.charAt(c+1)||"2"===e.charAt(c+1)){if(null==a&&null==(a=I(t,r,"2"===e.charAt(c+1))))return"";o[o.length]={t:"X",v:e.substr(c,2)},h=f,c+=2;break}case"M":case"D":case"Y":case"H":case"S":case"E":f=f.toLowerCase();case"m":case"d":case"y":case"h":case"s":case"e":case"g":if(t<0)return"";if(null==a&&null==(a=I(t,r)))return"";for(l=f;++c<e.length&&e.charAt(c).toLowerCase()===f;)l+=f;"h"===(f="m"===f&&"h"===h.toLowerCase()?"M":f)&&(f=u),o[o.length]={t:f,v:l},h=f;break;case"A":case"a":case"上":d={t:f,v:f};if(null==a&&(a=I(t,r)),"A/P"===e.substr(c,3).toUpperCase()?(null!=a&&(d.v=12<=a.H?"P":"A"),d.t="T",u="h",c+=3):"AM/PM"===e.substr(c,5).toUpperCase()?(null!=a&&(d.v=12<=a.H?"PM":"AM"),d.t="T",c+=5,u="h"):"上午/下午"===e.substr(c,5).toUpperCase()?(null!=a&&(d.v=12<=a.H?"下午":"上午"),d.t="T",c+=5,u="h"):(d.t="t",++c),null==a&&"T"===d.t)return"";o[o.length]=d,h=f;break;case"[":for(l=f;"]"!==e.charAt(c++)&&c<e.length;)l+=e.charAt(c);if("]"!==l.slice(-1))throw'unterminated "[" block: |'+l+"|";if(l.match(W)){if(null==a&&null==(a=I(t,r)))return"";o[o.length]={t:"Z",v:l.toLowerCase()},h=l.charAt(1)}else-1<l.indexOf("$")&&(l=(l.match(/\$([^-\[\]]*)/)||[])[1]||"$",V(e)||(o[o.length]={t:"t",v:l}));break;case".":if(null!=a){for(l=f;++c<e.length&&"0"===(f=e.charAt(c));)l+=f;o[o.length]={t:"s",v:l};break}case"0":case"#":for(l=f;++c<e.length&&-1<"0#?.,E+-%".indexOf(f=e.charAt(c));)l+=f;o[o.length]={t:"n",v:l};break;case"?":for(l=f;e.charAt(++c)===f;)l+=f;o[o.length]={t:f,v:l},h=f;break;case"*":++c," "!=e.charAt(c)&&"*"!=e.charAt(c)||++c;break;case"(":case")":o[o.length]={t:1===n?"t":f,v:f},++c;break;case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":for(l=f;c<e.length&&-1<"0123456789".indexOf(e.charAt(++c));)l+=e.charAt(c);o[o.length]={t:"D",v:l};break;case" ":o[o.length]={t:f,v:f},++c;break;case"$":o[o.length]={t:"t",v:"$"},++c;break;default:if(-1===",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f))throw new Error("unrecognized character "+f+" in "+e);o[o.length]={t:"t",v:f},++c}var m,g=0,b=0;for(c=o.length-1,h="t";0<=c;--c)switch(o[c].t){case"h":case"H":o[c].t=u,h="h",g<1&&(g=1);break;case"s":(m=o[c].v.match(/\.0+$/))&&(b=Math.max(b,m[0].length-1)),g<3&&(g=3);case"d":case"y":case"M":case"e":h=o[c].t;break;case"m":"s"===h&&(o[c].t="M",g<2&&(g=2));break;case"X":break;case"Z":(g=(g=g<1&&o[c].v.match(/[Hh]/)?1:g)<2&&o[c].v.match(/[Mm]/)?2:g)<3&&o[c].v.match(/[Ss]/)&&(g=3)}switch(g){case 0:break;case 1:.5<=a.u&&(a.u=0,++a.S),60<=a.S&&(a.S=0,++a.M),60<=a.M&&(a.M=0,++a.H);break;case 2:.5<=a.u&&(a.u=0,++a.S),60<=a.S&&(a.S=0,++a.M)}var v,E="";for(c=0;c<o.length;++c)switch(o[c].t){case"t":case"T":case" ":case"D":break;case"X":o[c].v="",o[c].t=";";break;case"d":case"m":case"y":case"h":case"H":case"M":case"s":case"e":case"b":case"Z":o[c].v=function(e,t,r,n){var a,s="",i=0,o=0,l=r.y,c=0;switch(e){case 98:l=r.y+543;case 121:switch(t.length){case 1:case 2:a=l%100,c=2;break;default:a=l%1e4,c=4}break;case 109:switch(t.length){case 1:case 2:a=r.m,c=t.length;break;case 3:return A[r.m-1][1];case 5:return A[r.m-1][0];default:return A[r.m-1][2]}break;case 100:switch(t.length){case 1:case 2:a=r.d,c=t.length;break;case 3:return y[r.q][0];default:return y[r.q][1]}break;case 104:switch(t.length){case 1:case 2:a=1+(r.H+11)%12,c=t.length;break;default:throw"bad hour format: "+t}break;case 72:switch(t.length){case 1:case 2:a=r.H,c=t.length;break;default:throw"bad hour format: "+t}break;case 77:switch(t.length){case 1:case 2:a=r.M,c=t.length;break;default:throw"bad minute format: "+t}break;case 115:if("s"!=t&&"ss"!=t&&".0"!=t&&".00"!=t&&".000"!=t)throw"bad second format: "+t;return 0!==r.u||"s"!=t&&"ss"!=t?(60*(o=2<=n?3===n?1e3:100:1===n?10:1)<=(i=Math.round(o*(r.S+r.u)))&&(i=0),"s"===t?0===i?"0":""+i/o:(s=x(i,2+n),"ss"===t?s.substr(0,2):"."+s.substr(2,t.length-1))):x(r.S,t.length);case 90:switch(t){case"[h]":case"[hh]":a=24*r.D+r.H;break;case"[m]":case"[mm]":a=60*(24*r.D+r.H)+r.M;break;case"[s]":case"[ss]":a=60*(60*(24*r.D+r.H)+r.M)+Math.round(r.S+r.u);break;default:throw"bad abstime format: "+t}c=3===t.length?1:2;break;case 101:a=l,c=1}return 0<c?x(a,c):""}(o[c].t.charCodeAt(0),o[c].v,a,b),o[c].t="t";break;case"n":case"?":for(v=c+1;null!=o[v]&&("?"===(f=o[v].t)||"D"===f||(" "===f||"t"===f)&&null!=o[v+1]&&("?"===o[v+1].t||"t"===o[v+1].t&&"/"===o[v+1].v)||"("===o[c].t&&(" "===f||"n"===f||")"===f)||"t"===f&&("/"===o[v].v||" "===o[v].v&&null!=o[v+1]&&"?"==o[v+1].t));)o[c].v+=o[v].v,o[v]={v:"",t:";"},++v;E+=o[c].v,c=v-1;break;case"G":o[c].t="t",o[c].v=R(t,r)}var S,w,C="";if(0<E.length){40==E.charCodeAt(0)?(S=t<0&&45===E.charCodeAt(0)?-t:t,w=N("n",E,S)):(w=N("n",E,S=t<0&&1<n?-t:t),S<0&&o[0]&&"t"==o[0].t&&(w=w.substr(1),o[0].v="-"+o[0].v)),v=w.length-1;for(var B=o.length,c=0;c<o.length;++c)if(null!=o[c]&&"t"!=o[c].t&&-1<o[c].v.indexOf(".")){B=c;break}var T=o.length;if(B===o.length&&-1===w.indexOf("E")){for(c=o.length-1;0<=c;--c)null!=o[c]&&-1!=="n?".indexOf(o[c].t)&&(v>=o[c].v.length-1?(v-=o[c].v.length,o[c].v=w.substr(v+1,o[c].v.length)):v<0?o[c].v="":(o[c].v=w.substr(0,v+1),v=-1),o[c].t="t",T=c);0<=v&&T<o.length&&(o[T].v=w.substr(0,v+1)+o[T].v)}else if(B!==o.length&&-1===w.indexOf("E")){for(v=w.indexOf(".")-1,c=B;0<=c;--c)if(null!=o[c]&&-1!=="n?".indexOf(o[c].t)){for(s=-1<o[c].v.indexOf(".")&&c===B?o[c].v.indexOf(".")-1:o[c].v.length-1,C=o[c].v.substr(s+1);0<=s;--s)0<=v&&("0"===o[c].v.charAt(s)||"#"===o[c].v.charAt(s))&&(C=w.charAt(v--)+C);o[c].v=C,o[c].t="t",T=c}for(0<=v&&T<o.length&&(o[T].v=w.substr(0,v+1)+o[T].v),v=w.indexOf(".")+1,c=B;c<o.length;++c)if(null!=o[c]&&(-1!=="n?(".indexOf(o[c].t)||c===B)){for(s=-1<o[c].v.indexOf(".")&&c===B?o[c].v.indexOf(".")+1:0,C=o[c].v.substr(0,s);s<o[c].v.length;++s)v<w.length&&(C+=w.charAt(v++));o[c].v=C,o[c].t="t",T=c}}}for(c=0;c<o.length;++c)null!=o[c]&&-1<"n?".indexOf(o[c].t)&&(S=1<n&&t<0&&0<c&&"-"===o[c-1].v?-t:t,o[c].v=N(o[c].t,o[c].v,S),o[c].t="t");var k="";for(c=0;c!==o.length;++c)null!=o[c]&&(k+=o[c].v);return k}e.is_date=V,e._eval=X;var G=/\[[=<>]/,z=/\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;function j(e,t){if(null!=t){var r=parseFloat(t[2]);switch(t[1]){case"=":if(e==r)return 1;break;case">":if(r<e)return 1;break;case"<":if(e<r)return 1;break;case"<>":if(e!=r)return 1;break;case">=":if(r<=e)return 1;break;case"<=":if(e<=r)return 1}}}function $(e,t,r){null==r&&(r={});var n="";switch(typeof e){case"string":n="m/d/yy"==e&&r.dateNF?r.dateNF:e;break;case"number":null==(n=null==(n=14==e&&r.dateNF?r.dateNF:(null!=r.table?r.table:s)[e])?r.table&&r.table[i[e]]||s[i[e]]:n)&&(n=o[e]||"General")}if(_(n,0))return R(t,r);var a=function(e,t){var r=b(e),n=r.length,a=r[n-1].indexOf("@");if(n<4&&-1<a&&--n,4<r.length)throw new Error("cannot find right format for |"+r.join("|")+"|");if("number"!=typeof t)return[4,4===r.length||-1<a?r[r.length-1]:"@"];switch(r.length){case 1:r=-1<a?["General","General","General",r[0]]:[r[0],r[0],r[0],"@"];break;case 2:r=-1<a?[r[0],r[0],r[0],r[1]]:[r[0],r[1],r[0],"@"];break;case 3:r=-1<a?[r[0],r[1],r[0],r[2]]:[r[0],r[1],r[2],"@"]}var s=0<t?r[0]:t<0?r[1]:r[2];return-1===r[0].indexOf("[")&&-1===r[1].indexOf("[")||null==r[0].match(G)&&null==r[1].match(G)?[n,s]:(e=r[0].match(z),s=r[1].match(z),j(t,e)?[n,r[0]]:j(t,s)?[n,r[1]]:[n,r[null!=e&&null!=s?2:1]])}(n,t=t instanceof Date?f(t,r.date1904):t);if(_(a[1]))return R(t,r);if(!0===t)t="TRUE";else if(!1===t)t="FALSE";else if(""===t||null==t)return"";return X(a[1],t,r,a[0])}function K(e,t){if("number"!=typeof t){t=+t||-1;for(var r=0;r<392;++r)if(null!=s[r]){if(s[r]==e){t=r;break}}else t<0&&(t=r);t<0&&(t=391)}return s[t]=e,t}e.load=K,e._table=s,e.get_table=function(){return s},e.load_table=function(e){for(var t=0;392!=t;++t)void 0!==e[t]&&K(e[t],t)},e.init_table=t,e.format=$};ae(ue);var se={"General Number":"General","General Date":ue._table[22],"Long Date":"dddd, mmmm dd, yyyy","Medium Date":ue._table[15],"Short Date":ue._table[14],"Long Time":ue._table[19],"Medium Time":ue._table[18],"Short Time":ue._table[20],Currency:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',Fixed:ue._table[2],Standard:ue._table[4],Percent:ue._table[10],Scientific:ue._table[11],"Yes/No":'"Yes";"Yes";"No";@',"True/False":'"True";"True";"False";@',"On/Off":'"Yes";"Yes";"No";@'},m={5:'"$"#,##0_);\\("$"#,##0\\)',6:'"$"#,##0_);[Red]\\("$"#,##0\\)',7:'"$"#,##0.00_);\\("$"#,##0.00\\)',8:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',23:"General",24:"General",25:"General",26:"General",27:"m/d/yy",28:"m/d/yy",29:"m/d/yy",30:"m/d/yy",31:"m/d/yy",32:"h:mm:ss",33:"h:mm:ss",34:"h:mm:ss",35:"h:mm:ss",36:"m/d/yy",41:'_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',42:'_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',43:'_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',44:'_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',50:"m/d/yy",51:"m/d/yy",52:"m/d/yy",53:"m/d/yy",54:"m/d/yy",55:"m/d/yy",56:"m/d/yy",57:"m/d/yy",58:"m/d/yy",59:"0",60:"0.00",61:"#,##0",62:"#,##0.00",63:'"$"#,##0_);\\("$"#,##0\\)',64:'"$"#,##0_);[Red]\\("$"#,##0\\)',65:'"$"#,##0.00_);\\("$"#,##0.00\\)',66:'"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',67:"0%",68:"0.00%",69:"# ?/?",70:"# ??/??",71:"m/d/yy",72:"m/d/yy",73:"d-mmm-yy",74:"d-mmm",75:"mmm-yy",76:"h:mm",77:"h:mm:ss",78:"m/d/yy h:mm",79:"mm:ss",80:"[h]:mm:ss",81:"mmss.0"},g=/[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;var ie;!function(e){e.version="1.2.0";var o=function(){for(var e=0,t=new Array(256),r=0;256!=r;++r)e=1&(e=1&(e=1&(e=1&(e=1&(e=1&(e=1&(e=1&(e=r)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1,t[r]=e;return"undefined"!=typeof Int32Array?new Int32Array(t):t}();e.table=o,e.bstr=function(e,t){for(var r=-1^t,n=e.length-1,a=0;a<n;)r=(r=r>>>8^o[255&(r^e.charCodeAt(a++))])>>>8^o[255&(r^e.charCodeAt(a++))];return-1^(r=a===n?r>>>8^o[255&(r^e.charCodeAt(a))]:r)},e.buf=function(e,t){if(1e4<e.length)return function(e,t){for(var r=-1^t,n=e.length-7,a=0;a<n;)r=(r=(r=(r=(r=(r=(r=(r=r>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])];for(;a<7+n;)r=r>>>8^o[255&(r^e[a++])];return-1^r}(e,t);for(var r=-1^t,n=e.length-3,a=0;a<n;)r=(r=(r=(r=r>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])])>>>8^o[255&(r^e[a++])];for(;a<3+n;)r=r>>>8^o[255&(r^e[a++])];return-1^r},e.str=function(e,t){for(var r,n,a=-1^t,s=0,i=e.length;s<i;)a=(r=e.charCodeAt(s++))<128?a>>>8^o[255&(a^r)]:r<2048?(a=a>>>8^o[255&(a^(192|r>>6&31))])>>>8^o[255&(a^(128|63&r))]:55296<=r&&r<57344?(r=64+(1023&r),n=1023&e.charCodeAt(s++),(a=(a=(a=a>>>8^o[255&(a^(240|r>>8&7))])>>>8^o[255&(a^(128|r>>2&63))])>>>8^o[255&(a^(128|n>>6&15|(3&r)<<4))])>>>8^o[255&(a^(128|63&n))]):(a=(a=a>>>8^o[255&(a^(224|r>>12&15))])>>>8^o[255&(a^(128|r>>6&63))])>>>8^o[255&(a^(128|63&r))];return-1^a}}(ie={});var b,oe=function(){var a,e={};function u(e){if("/"==e.charAt(e.length-1))return-1===e.slice(0,-1).indexOf("/")?e:u(e.slice(0,-1));var t=e.lastIndexOf("/");return-1===t?e:e.slice(0,t+1)}function d(e){if("/"==e.charAt(e.length-1))return d(e.slice(0,-1));var t=e.lastIndexOf("/");return-1===t?e:e.slice(t+1)}function b(e){Ot(e,0);for(var t,r={};e.l<=e.length-4;){var n=e.read_shift(2),a=e.read_shift(2),s=e.l+a,i={};21589===n&&(1&(t=e.read_shift(1))&&(i.mtime=e.read_shift(4)),5<a&&(2&t&&(i.atime=e.read_shift(4)),4&t&&(i.ctime=e.read_shift(4))),i.mtime&&(i.mt=new Date(1e3*i.mtime))),e.l=s,r[n]=i}return r}function s(){return a=a||__webpack_require__(/*! fs */ "?6e8d")}function i(e,t){if(80==e[0]&&75==e[1])return $(e,t);if(e.length<512)throw new Error("CFB file size "+e.length+" < 512");var r,m,n,a=3,s=512,i=0,o=[],l=e.slice(0,512);Ot(l,0);var c=function(e){if(80==e[e.l]&&75==e[e.l+1])return[0,0];e.chk(C,"Header Signature: "),e.l+=16;var t=e.read_shift(2,"u");return[e.read_shift(2,"u"),t]}(l);switch(a=c[0]){case 3:s=512;break;case 4:s=4096;break;case 0:if(0==c[1])return $(e,t);default:throw new Error("Major Version: Expected 3 or 4 saw "+a)}512!==s&&Ot(l=e.slice(0,s),28);var f=e.slice(0,s);!function(e,t){var r=9;switch(e.l+=2,r=e.read_shift(2)){case 9:if(3!=t)throw new Error("Sector Shift: Expected 9 saw "+r);break;case 12:if(4!=t)throw new Error("Sector Shift: Expected 12 saw "+r);break;default:throw new Error("Sector Shift: Expected 9 or 12 saw "+r)}e.chk("0600","Mini Sector Shift: "),e.chk("000000000000","Reserved: ")}(l,a);var h=l.read_shift(4,"i");if(3===a&&0!==h)throw new Error("# Directory Sectors: Expected 0 saw "+h);l.l+=4,m=l.read_shift(4,"i"),l.l+=4,l.chk("00100000","Mini Stream Cutoff Size: "),n=l.read_shift(4,"i"),r=l.read_shift(4,"i"),b=l.read_shift(4,"i"),i=l.read_shift(4,"i");for(var u,d=0;d<109&&!((u=l.read_shift(4,"i"))<0);++d)o[d]=u;var p=function(e,t){for(var r=Math.ceil(e.length/t)-1,n=[],a=1;a<r;++a)n[a-1]=e.slice(a*t,(a+1)*t);return n[r-1]=e.slice(r*t),n}(e,s);!function e(t,r,n,a,s){var i=w;if(t===w){if(0!==r)throw new Error("DIFAT chain shorter than expected")}else if(-1!==t){var o=n[t],l=(a>>>2)-1;if(o){for(var c=0;c<l&&(i=xt(o,4*c))!==w;++c)s.push(i);e(xt(o,a-4),r-1,n,a,s)}}}(b,i,p,s,o);var g=function(e,t,r,n){var a=e.length,s=[],i=[],o=[],l=[],c=n-1,f=0,h=0,u=0,d=0;for(f=0;f<a;++f)if(o=[],a<=(u=f+t)&&(u-=a),!i[u]){l=[];var p=[];for(h=u;0<=h;){p[h]=!0,i[h]=!0,o[o.length]=h,l.push(e[h]);var m=r[Math.floor(4*h/n)];if(n<4+(d=4*h&c))throw new Error("FAT boundary crossed: "+h+" 4 "+n);if(!e[m])break;if(h=xt(e[m],d),p[h])break}s[u]={nodes:o,data:nt([l])}}return s}(p,m,o,s);g[m].name="!Directory",0<r&&n!==w&&(g[n].name="!MiniFAT"),g[o[0]].name="!FAT",g.fat_addrs=o,g.ssz=s;var h=[],b=[],i=[];!function(e,t,r,n,a,s,i){for(var o,l=0,c=r.length?2:0,f=e[m].data,h=0,u=0;h<f.length;h+=128){var d=f.slice(h,h+128);Ot(d,64),u=d.read_shift(2),o=st(d,0,u-c),r.push(o);var p={name:o,type:d.read_shift(1),color:d.read_shift(1),L:d.read_shift(4,"i"),R:d.read_shift(4,"i"),C:d.read_shift(4,"i"),clsid:d.read_shift(16),state:d.read_shift(4,"i"),start:0,size:0};0!==d.read_shift(2)+d.read_shift(2)+d.read_shift(2)+d.read_shift(2)&&(p.ct=v(d,d.l-8)),0!==d.read_shift(2)+d.read_shift(2)+d.read_shift(2)+d.read_shift(2)&&(p.mt=v(d,d.l-8)),p.start=d.read_shift(4,"i"),p.size=d.read_shift(4,"i"),p.size<0&&p.start<0&&(p.size=p.type=0,p.start=w,p.name=""),5===p.type?(l=p.start,0<n&&l!==w&&(e[l].name="!StreamData")):4096<=p.size?(p.storage="fat",void 0===e[p.start]&&(e[p.start]=function(e,t,r,n,a){var s=[],i=[];a=a||[];var o=n-1,l=0,c=0;for(l=t;0<=l;){a[l]=!0,s[s.length]=l,i.push(e[l]);var f=r[Math.floor(4*l/n)];if(n<4+(c=4*l&o))throw new Error("FAT boundary crossed: "+l+" 4 "+n);if(!e[f])break;l=xt(e[f],c)}return{nodes:s,data:nt([i])}}(t,p.start,e.fat_addrs,e.ssz)),e[p.start].name=p.name,p.content=e[p.start].data.slice(0,p.size)):(p.storage="minifat",p.size<0?p.size=0:l!==w&&p.start!==w&&e[l]&&(p.content=function(e,t,r){var n=e.start,a=e.size,s=[],i=n;for(;r&&0<a&&0<=i;)s.push(t.slice(i*S,i*S+S)),a-=S,i=xt(r,4*i);return 0===s.length?Nt(0):he(s).slice(0,e.size)}(p,e[l].data,(e[i]||{}).data))),p.content&&Ot(p.content,0),a[o]=p,s.push(p)}}(g,p,h,r,{},b,n),function(e,t,r){for(var n=0,a=0,s=0,i=0,o=0,l=r.length,c=[],f=[];n<l;++n)c[n]=f[n]=n,t[n]=r[n];for(;o<f.length;++o)n=f[o],a=e[n].L,s=e[n].R,i=e[n].C,c[n]===n&&(-1!==a&&c[a]!==a&&(c[n]=c[a]),-1!==s&&c[s]!==s&&(c[n]=c[s])),-1!==i&&(c[i]=n),-1!==a&&n!=c[n]&&(c[a]=c[n],f.lastIndexOf(a)<o&&f.push(a)),-1!==s&&n!=c[n]&&(c[s]=c[n],f.lastIndexOf(s)<o&&f.push(s));for(n=1;n<l;++n)c[n]===n&&(-1!==s&&c[s]!==s?c[n]=c[s]:-1!==a&&c[a]!==a&&(c[n]=c[a]));for(n=1;n<l;++n)if(0!==e[n].type){if((o=n)!=c[o])for(;o=c[o],t[n]=t[o]+"/"+t[n],0!==o&&-1!==c[o]&&o!=c[o];);c[n]=-1}for(t[0]+="/",n=1;n<l;++n)2!==e[n].type&&(t[n]+="/")}(b,i,h),h.shift();i={FileIndex:b,FullPaths:i};return t&&t.raw&&(i.raw={header:f,sectors:p}),i}function v(e,t){return new Date(1e3*(kt(e,t+4)/1e7*Math.pow(2,32)+kt(e,t)/1e7-11644473600))}function p(e,t){var r=t||{},t=r.root||"Root Entry";if(e.FullPaths||(e.FullPaths=[]),e.FileIndex||(e.FileIndex=[]),e.FullPaths.length!==e.FileIndex.length)throw new Error("inconsistent CFB structure");0===e.FullPaths.length&&(e.FullPaths[0]=t+"/",e.FileIndex[0]={name:t,type:5}),r.CLSID&&(e.FileIndex[0].clsid=r.CLSID),t=e,r="Sh33tJ5",oe.find(t,"/"+r)||((e=Nt(4))[0]=55,e[1]=e[3]=50,e[2]=54,t.FileIndex.push({name:r,type:2,content:e,size:4,L:69,R:69,C:69}),t.FullPaths.push(t.FullPaths[0]+r),m(t))}function m(e,t){p(e);for(var r=!1,n=!1,a=e.FullPaths.length-1;0<=a;--a){var s=e.FileIndex[a];switch(s.type){case 0:n?r=!0:(e.FileIndex.pop(),e.FullPaths.pop());break;case 1:case 2:case 5:n=!0,isNaN(s.R*s.L*s.C)&&(r=!0),-1<s.R&&-1<s.L&&s.R==s.L&&(r=!0);break;default:r=!0}}if(r||t){for(var i=new Date(1987,1,19),o=0,l=[],a=0;a<e.FullPaths.length;++a)0!==e.FileIndex[a].type&&l.push([e.FullPaths[a],e.FileIndex[a]]);for(a=0;a<l.length;++a){for(var c=u(l[a][0]),n=!1,o=0;o<l.length;++o)l[o][0]===c&&(n=!0);n||l.push([c,{name:d(c).replace("/",""),type:1,clsid:B,ct:i,mt:i,content:null}])}for(l.sort(function(e,t){return function(e,t){for(var r,n=e.split("/"),a=t.split("/"),s=0,i=Math.min(n.length,a.length);s<i;++s){if(r=n[s].length-a[s].length)return r;if(n[s]!=a[s])return n[s]<a[s]?-1:1}return n.length-a.length}(e[0],t[0])}),e.FullPaths=[],e.FileIndex=[],a=0;a<l.length;++a)e.FullPaths[a]=l[a][0],e.FileIndex[a]=l[a][1];for(a=0;a<l.length;++a){var f=e.FileIndex[a],h=e.FullPaths[a];if(f.name=d(h).replace("/",""),f.L=f.R=f.C=-(f.color=1),f.size=f.content?f.content.length:0,f.start=0,f.clsid=f.clsid||B,0===a)f.C=1<l.length?1:-1,f.size=0,f.type=5;else if("/"==h.slice(-1)){for(o=a+1;o<l.length&&u(e.FullPaths[o])!=h;++o);for(f.C=o>=l.length?-1:o,o=a+1;o<l.length&&u(e.FullPaths[o])!=u(h);++o);f.R=o>=l.length?-1:o,f.type=1}else u(e.FullPaths[a+1]||"")==u(h)&&(f.R=a+1),f.type=2}}}function n(e,t){var r=t||{};if(m(e),"zip"==r.fileType)return function(e,t){var t=t||{},r=[],n=[],a=Nt(1),s=t.compression?8:0,i=0;0;var o=0,l=0,c=0,f=0,h=e.FullPaths[0],u=h,d=e.FileIndex[0],p=[],m=0;for(o=1;o<e.FullPaths.length;++o)if(u=e.FullPaths[o].slice(h.length),(d=e.FileIndex[o]).size&&d.content&&"Sh33tJ5"!=u){var g=c,b=Nt(u.length);for(l=0;l<u.length;++l)b.write_shift(1,127&u.charCodeAt(l));b=b.slice(0,b.l),p[f]=ie.buf(d.content,0);var v=d.content;8==s&&(v=function(e){return E?E.deflateRawSync(e):N(e)}(v)),(a=Nt(30)).write_shift(4,67324752),a.write_shift(2,20),a.write_shift(2,i),a.write_shift(2,s),d.mt?function(e,t){var r=(t="string"==typeof t?new Date(t):t).getHours();r=(r=r<<6|t.getMinutes())<<5|t.getSeconds()>>>1,e.write_shift(2,r),r=(r=(r=t.getFullYear()-1980)<<4|t.getMonth()+1)<<5|t.getDate(),e.write_shift(2,r)}(a,d.mt):a.write_shift(4,0),a.write_shift(-4,8&i?0:p[f]),a.write_shift(4,8&i?0:v.length),a.write_shift(4,8&i?0:d.content.length),a.write_shift(2,b.length),a.write_shift(2,0),c+=a.length,r.push(a),c+=b.length,r.push(b),c+=v.length,r.push(v),8&i&&((a=Nt(12)).write_shift(-4,p[f]),a.write_shift(4,v.length),a.write_shift(4,d.content.length),c+=a.l,r.push(a)),(a=Nt(46)).write_shift(4,33639248),a.write_shift(2,0),a.write_shift(2,20),a.write_shift(2,i),a.write_shift(2,s),a.write_shift(4,0),a.write_shift(-4,p[f]),a.write_shift(4,v.length),a.write_shift(4,d.content.length),a.write_shift(2,b.length),a.write_shift(2,0),a.write_shift(2,0),a.write_shift(2,0),a.write_shift(2,0),a.write_shift(4,0),a.write_shift(4,g),m+=a.l,n.push(a),m+=b.length,n.push(b),++f}return(a=Nt(22)).write_shift(4,101010256),a.write_shift(2,0),a.write_shift(2,0),a.write_shift(2,f),a.write_shift(2,f),a.write_shift(4,m),a.write_shift(4,c),a.write_shift(2,0),he([he(r),he(n),a])}(e,r);for(var n=function(e){for(var t=0,r=0,n=0;n<e.FileIndex.length;++n){var a=e.FileIndex[n];a.content&&(0<(a=a.content.length)&&(a<4096?t+=a+63>>6:r+=a+511>>9))}for(var s=e.FullPaths.length+3>>2,i=t+127>>7,o=(t+7>>3)+r+s+i,l=o+127>>7,c=l<=109?0:Math.ceil((l-109)/127);l<o+l+c+127>>7;)c=++l<=109?0:Math.ceil((l-109)/127);s=[1,c,l,i,s,r,t,0];return e.FileIndex[0].size=t<<6,s[7]=(e.FileIndex[0].start=s[0]+s[1]+s[2]+s[3]+s[4]+s[5])+(s[6]+7>>3),s}(e),a=Nt(n[7]<<9),s=0,i=0,s=0;s<8;++s)a.write_shift(1,g[s]);for(s=0;s<8;++s)a.write_shift(2,0);for(a.write_shift(2,62),a.write_shift(2,3),a.write_shift(2,65534),a.write_shift(2,9),a.write_shift(2,6),s=0;s<3;++s)a.write_shift(2,0);for(a.write_shift(4,0),a.write_shift(4,n[2]),a.write_shift(4,n[0]+n[1]+n[2]+n[3]-1),a.write_shift(4,0),a.write_shift(4,4096),a.write_shift(4,n[3]?n[0]+n[1]+n[2]-1:w),a.write_shift(4,n[3]),a.write_shift(-4,n[1]?n[0]-1:w),a.write_shift(4,n[1]),s=0;s<109;++s)a.write_shift(-4,s<n[2]?n[1]+s:-1);if(n[1])for(i=0;i<n[1];++i){for(;s<236+127*i;++s)a.write_shift(-4,s<n[2]?n[1]+s:-1);a.write_shift(-4,i===n[1]-1?w:i+1)}function o(e){for(i+=e;s<i-1;++s)a.write_shift(-4,s+1);e&&(++s,a.write_shift(-4,w))}i=s=0;for(i+=n[1];s<i;++s)a.write_shift(-4,T.DIFSECT);for(i+=n[2];s<i;++s)a.write_shift(-4,T.FATSECT);o(n[3]),o(n[4]);for(var l=0,c=0,f=e.FileIndex[0];l<e.FileIndex.length;++l)(f=e.FileIndex[l]).content&&((c=f.content.length)<4096||(f.start=i,o(c+511>>9)));for(o(n[6]+7>>3);511&a.l;)a.write_shift(-4,T.ENDOFCHAIN);for(l=i=s=0;l<e.FileIndex.length;++l)(f=e.FileIndex[l]).content&&(!(c=f.content.length)||4096<=c||(f.start=i,o(c+63>>6)));for(;511&a.l;)a.write_shift(-4,T.ENDOFCHAIN);for(s=0;s<n[4]<<2;++s){var h=e.FullPaths[s];if(h&&0!==h.length){f=e.FileIndex[s],0===s&&(f.start=f.size?f.start-1:w);h=0===s&&r.root||f.name,c=2*(h.length+1);if(a.write_shift(64,h,"utf16le"),a.write_shift(2,c),a.write_shift(1,f.type),a.write_shift(1,f.color),a.write_shift(-4,f.L),a.write_shift(-4,f.R),a.write_shift(-4,f.C),f.clsid)a.write_shift(16,f.clsid,"hex");else for(l=0;l<4;++l)a.write_shift(4,0);a.write_shift(4,f.state||0),a.write_shift(4,0),a.write_shift(4,0),a.write_shift(4,0),a.write_shift(4,0),a.write_shift(4,f.start),a.write_shift(4,f.size),a.write_shift(4,0)}else{for(l=0;l<17;++l)a.write_shift(4,0);for(l=0;l<3;++l)a.write_shift(4,-1);for(l=0;l<12;++l)a.write_shift(4,0)}}for(s=1;s<e.FileIndex.length;++s)if(4096<=(f=e.FileIndex[s]).size){for(a.l=f.start+1<<9,l=0;l<f.size;++l)a.write_shift(1,f.content[l]);for(;511&l;++l)a.write_shift(1,0)}for(s=1;s<e.FileIndex.length;++s)if(0<(f=e.FileIndex[s]).size&&f.size<4096){for(l=0;l<f.size;++l)a.write_shift(1,f.content[l]);for(;63&l;++l)a.write_shift(1,0)}for(;a.l<a.length;)a.write_shift(1,0);return a}e.version="1.1.4";var E,S=64,w=-2,C="d0cf11e0a1b11ae1",g=[208,207,17,224,161,177,26,225],B="00000000000000000000000000000000",T={MAXREGSECT:-6,DIFSECT:-4,FATSECT:-3,ENDOFCHAIN:w,FREESECT:-1,HEADER_SIGNATURE:C,HEADER_MINOR_VERSION:"3e00",MAXREGSID:-6,NOSTREAM:-1,HEADER_CLSID:B,EntryTypes:["unknown","storage","stream","lockbytes","property","root"]};function o(e){for(var t=new Array(e.length),r=0;r<e.length;++r)t[r]=String.fromCharCode(e[r]);return t.join("")}var k=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],x=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],_=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];for(var t,y="undefined"!=typeof Uint8Array,A=y?new Uint8Array(256):[],r=0;r<256;++r)A[r]=255&((t=139536&((t=r)<<1|t<<11)|558144&(t<<5|t<<15))>>16|t>>8|t);function I(e,t){var r=7&t,t=t>>>3;return(e[t]|(r<=5?0:e[1+t]<<8))>>>r&7}function R(e,t){var r=7&t,t=t>>>3;return(e[t]|(r<=3?0:e[1+t]<<8))>>>r&31}function F(e,t){var r=7&t,t=t>>>3;return(e[t]|(r<=1?0:e[1+t]<<8))>>>r&127}function D(e,t,r){var n=7&t,a=t>>>3,s=(1<<r)-1,t=e[a]>>>n;return r<8-n?t&s:(t|=e[1+a]<<8-n,r<16-n?t&s:(t|=e[2+a]<<16-n,r<24-n?t&s:(t|=e[3+a]<<24-n)&s))}function O(e,t){var r=e.length,n=t<2*r?2*r:t+5,a=0;if(t<=r)return e;if(Q){var s=q(n);if(e.copy)e.copy(s);else for(;a<e.length;++a)s[a]=e[a];return s}if(y){var i=new Uint8Array(n);if(i.set)i.set(e);else for(;a<e.length;++a)i[a]=e[a];return i}return e.length=n,e}function P(e){for(var t=new Array(e),r=0;r<e;++r)t[r]=0;return t}var l,N=(l=function(e,t){for(var r=0;r<e.length;){var n=Math.min(65535,e.length-r),a=r+n==e.length;for(t.write_shift(1,+a),t.write_shift(2,n),t.write_shift(2,65535&~n);0<n--;)t[t.l++]=e[r++]}return t.l},function(e){var t=Nt(50+Math.floor(1.1*e.length)),e=l(e,t);return t.slice(0,e)});function M(e,t,r){for(var n,a=1,s=0,i=0,o=0,l=e.length,c=y?new Uint16Array(32):P(32),s=0;s<32;++s)c[s]=0;for(s=l;s<r;++s)e[s]=0;l=e.length;var f=y?new Uint16Array(l):P(l);for(s=0;s<l;++s)c[n=e[s]]++,a<n&&(a=n),f[s]=0;for(c[0]=0,s=1;s<=a;++s)c[s+16]=o=o+c[s-1]<<1;for(s=0;s<l;++s)0!=(o=e[s])&&(f[s]=c[o+16]++);var h,u,d,p;for(s=0;s<l;++s)if(0!=(h=e[s]))for(u=f[s],d=a,p=void 0,p=A[255&u],o=(d<=8?p>>>8-d:(p=p<<8|A[u>>8&255],d<=16?p>>>16-d:(p=p<<8|A[u>>16&255])>>>24-d))>>a-h,i=(1<<a+4-h)-1;0<=i;--i)t[o|i<<h]=15&h|s<<4;return a}var L=y?new Uint16Array(512):P(512),U=y?new Uint16Array(32):P(32);if(!y){for(var c=0;c<512;++c)L[c]=0;for(c=0;c<32;++c)U[c]=0}!function(){for(var e=[],t=0;t<32;t++)e.push(5);M(e,U,32);for(var r=[],t=0;t<=143;t++)r.push(8);for(;t<=255;t++)r.push(9);for(;t<=279;t++)r.push(7);for(;t<=287;t++)r.push(8);M(r,L,288)}();var H=y?new Uint16Array(32768):P(32768),W=y?new Uint16Array(32768):P(32768),V=y?new Uint16Array(128):P(128),X=1,G=1;function f(e,t){if(3==e[0]&&!(3&e[1]))return[J(t),2];for(var r=0,n=0,a=q(t||1<<18),s=0,i=a.length>>>0,o=0,l=0;0==(1&n);)if(n=I(e,r),r+=3,n>>>1!=0)for(l=n>>>1==1?(o=9,5):(r=function(e,t){var r,n,a,s=R(e,t)+257,i=R(e,t+=5)+1,o=(a=7&(n=t+=5),4+(((r=e)[n=n>>>3]|(a<=4?0:r[1+n]<<8))>>>a&15));t+=4;for(var l=0,c=y?new Uint8Array(19):P(19),f=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],h=1,u=y?new Uint8Array(8):P(8),d=y?new Uint8Array(8):P(8),p=c.length,m=0;m<o;++m)c[k[m]]=l=I(e,t),h<l&&(h=l),u[l]++,t+=3;var g=0;for(u[0]=0,m=1;m<=h;++m)d[m]=g=g+u[m-1]<<1;for(m=0;m<p;++m)0!=(g=c[m])&&(f[m]=d[g]++);for(var b,m=0;m<p;++m)if(0!=(b=c[m])){g=A[f[m]]>>8-b;for(var v=(1<<7-b)-1;0<=v;--v)V[g|v<<b]=7&b|m<<3}for(var E,S,w,C=[],h=1;C.length<s+i;)switch(t+=7&(g=V[F(e,t)]),g>>>=3){case 16:for(l=3+(w=void 0,w=7&(S=t),((E=e)[S=S>>>3]|(w<=6?0:E[1+S]<<8))>>>w&3),t+=2,g=C[C.length-1];0<l--;)C.push(g);break;case 17:for(l=3+I(e,t),t+=3;0<l--;)C.push(0);break;case 18:for(l=11+F(e,t),t+=7;0<l--;)C.push(0);break;default:C.push(g),h<g&&(h=g)}var B=C.slice(0,s),T=C.slice(s);for(m=s;m<286;++m)B[m]=0;for(m=i;m<30;++m)T[m]=0;return X=M(B,H,286),G=M(T,W,30),t}(e,r),o=X,G),!t&&i<s+32767&&(i=(a=O(a,s+32767)).length);;){var c=D(e,r,o),f=(n>>>1==1?L:H)[c];if(r+=15&f,0==((f>>>=4)>>>8&255))a[s++]=f;else{if(256==f)break;var h=(f-=257)<8?0:f-4>>2;5<h&&(h=0);var u=s+x[f];0<h&&(u+=D(e,r,h),r+=h),c=D(e,r,l),r+=15&(f=(n>>>1==1?U:W)[c]);var c=(f>>>=4)<4?0:f-2>>1,d=_[f];for(0<c&&(d+=D(e,r,c),r+=c),!t&&i<u&&(i=(a=O(a,u)).length);s<u;)a[s]=a[s-d],++s}}else{7&r&&(r+=8-(7&r));var p=e[r>>>3]|e[1+(r>>>3)]<<8;if(r+=32,!t&&i<s+p&&(i=(a=O(a,s+p)).length),"function"==typeof e.copy)e.copy(a,s,r>>>3,(r>>>3)+p),s+=p,r+=8*p;else for(;0<p--;)a[s++]=e[r>>>3],r+=8}return[t?a:a.slice(0,s),r+7>>>3]}function z(e,t){t=f(e.slice(e.l||0),t);return e.l+=t[1],t[0]}function j(e,t){if(!e)throw new Error(t);"undefined"!=typeof console&&console.error(t)}function $(e,t){var r=e;Ot(r,0);var n={FileIndex:[],FullPaths:[]};p(n,{root:t.root});for(var a=r.length-4;(80!=r[a]||75!=r[a+1]||5!=r[a+2]||6!=r[a+3])&&0<=a;)--a;r.l=a+4,r.l+=4;var s=r.read_shift(2);r.l+=6;t=r.read_shift(4);for(r.l=t,a=0;a<s;++a){r.l+=20;var i=r.read_shift(4),o=r.read_shift(4),l=r.read_shift(2),c=r.read_shift(2),f=r.read_shift(2);r.l+=8;var h=r.read_shift(4),u=b(r.slice(r.l+l,r.l+l+c));r.l+=l+c+f;f=r.l;r.l=h+4,function(e,t,r,n,a){e.l+=2;var s=e.read_shift(2),i=e.read_shift(2),o=function(e){var t=65535&e.read_shift(2),r=65535&e.read_shift(2),n=new Date,a=31&r,e=15&(r>>>=5);return r>>>=4,n.setMilliseconds(0),n.setFullYear(1980+r),n.setMonth(e-1),n.setDate(a),e=31&t,a=63&(t>>>=5),t>>>=6,n.setHours(t),n.setMinutes(a),n.setSeconds(e<<1),n}(e);if(8257&s)throw new Error("Unsupported ZIP encryption");for(var l,c=e.read_shift(4),f=e.read_shift(4),h=e.read_shift(4),u=e.read_shift(2),d=e.read_shift(2),p="",m=0;m<u;++m)p+=String.fromCharCode(e[e.l++]);d&&(((l=b(e.slice(e.l,e.l+d)))[21589]||{}).mt&&(o=l[21589].mt),((a||{})[21589]||{}).mt&&(o=a[21589].mt)),e.l+=d;var g=e.slice(e.l,e.l+f);switch(i){case 8:g=function(e,t){if(!E)return z(e,t);var r=new E.InflateRaw,t=r._processChunk(e.slice(e.l),r._finishFlushFlag);return e.l+=r.bytesRead,t}(e,h);break;case 0:break;default:throw new Error("Unsupported ZIP Compression method "+i)}d=!1,8&s&&(134695760==(c=e.read_shift(4))&&(c=e.read_shift(4),d=!0),f=e.read_shift(4),h=e.read_shift(4)),f!=t&&j(d,"Bad compressed size: "+t+" != "+f),h!=r&&j(d,"Bad uncompressed size: "+r+" != "+h),r=ie.buf(g,0),c>>0!=r>>0&&j(d,"Bad CRC32 checksum: "+c+" != "+r),K(n,p,g,{unsafe:!0,mt:o})}(r,i,o,n,u),r.l=f}return n}function K(e,t,r,n){var a=n&&n.unsafe;a||p(e);var s,i=!a&&oe.find(e,t);return i||(s=e.FullPaths[0],s=t.slice(0,s.length)==s?t:("/"!=s.slice(-1)&&(s+="/"),(s+t).replace("//","/")),i={name:d(t),type:2},e.FileIndex.push(i),e.FullPaths.push(s),a||oe.utils.cfb_gc(e)),i.content=r,i.size=r?r.length:0,n&&(n.CLSID&&(i.clsid=n.CLSID),n.mt&&(i.mt=n.mt),n.ct&&(i.ct=n.ct)),i}return e.find=function(e,t){var r=e.FullPaths.map(function(e){return e.toUpperCase()}),n=r.map(function(e){var t=e.split("/");return t[t.length-("/"==e.slice(-1)?2:1)]}),a=!1;47===t.charCodeAt(0)?(a=!0,t=r[0].slice(0,-1)+t):a=-1!==t.indexOf("/");var s=t.toUpperCase(),i=(!0===a?r:n).indexOf(s);if(-1!==i)return e.FileIndex[i];var o=!s.match(ne),s=s.replace(ee,"");for(o&&(s=s.replace(ne,"!")),i=0;i<r.length;++i){if((o?r[i].replace(ne,"!"):r[i]).replace(ee,"")==s)return e.FileIndex[i];if((o?n[i].replace(ne,"!"):n[i]).replace(ee,"")==s)return e.FileIndex[i]}return null},e.read=function(e,t){switch(t&&t.type||"base64"){case"file":return r=e,n=t,s(),i(a.readFileSync(r),n);case"base64":return i(Z(Y.decode(e)),t);case"binary":return i(Z(e),t)}var r,n;return i(e,t)},e.parse=i,e.write=function(e,t){var r=n(e,t);switch(t&&t.type){case"file":return s(),a.writeFileSync(t.filename,r),r;case"binary":return o(r);case"base64":return Y.encode(o(r))}return r},e.writeFile=function(e,t,r){s(),r=n(e,r),a.writeFileSync(t,r)},e.utils={cfb_new:function(e){var t={};return p(t,e),t},cfb_add:K,cfb_del:function(e,t){p(e);var r=oe.find(e,t);if(r)for(var n=0;n<e.FileIndex.length;++n)if(e.FileIndex[n]==r)return e.FileIndex.splice(n,1),e.FullPaths.splice(n,1),!0;return!1},cfb_mov:function(e,t,r){p(e);var n=oe.find(e,t);if(n)for(var a=0;a<e.FileIndex.length;++a)if(e.FileIndex[a]==n)return e.FileIndex[a].name=d(r),e.FullPaths[a]=r,!0;return!1},cfb_gc:function(e){m(e,!0)},ReadShift:yt,CheckField:Dt,prep_blob:Ot,bconcat:he,use_zlib:function(e){try{var t=new e.InflateRaw;if(t._processChunk(new Uint8Array([3,0]),t._finishFlushFlag),!t.bytesRead)throw new Error("zlib does not expose bytesRead");E=e}catch(e){console.error("cannot use native zlib: "+(e.message||e))}},_deflateRaw:N,_inflateRaw:z,consts:T},e}();if(0,"undefined"!="function")try{b=__webpack_require__(/*! fs */ "?6e8d")}catch(e){}function v(e){return"string"==typeof e?i(e):Array.isArray(e)?function(e){if("undefined"==typeof Uint8Array)throw new Error("Unsupported");return new Uint8Array(e)}(e):e}function E(e,t,r){if(void 0!==b&&b.writeFileSync)return r?b.writeFileSync(e,t,r):b.writeFileSync(e,t);r="utf8"==r?Le(t):t;if("undefined"!=typeof IE_SaveFile)return IE_SaveFile(r,e);if("undefined"!=typeof Blob){r=new Blob([v(r)],{type:"application/octet-stream"});if("undefined"!=typeof navigator&&navigator.msSaveBlob)return navigator.msSaveBlob(r,e);if("undefined"!=typeof saveAs)return saveAs(r,e);if("undefined"!=typeof URL&&"undefined"!=typeof document&&document.createElement&&URL.createObjectURL){var n=URL.createObjectURL(r);if("object"==typeof chrome&&"function"==typeof(chrome.downloads||{}).download)return URL.revokeObjectURL&&"undefined"!=typeof setTimeout&&setTimeout(function(){URL.revokeObjectURL(n)},6e4),chrome.downloads.download({url:n,filename:e,saveAs:!0});r=document.createElement("a");if(null!=r.download)return r.download=e,r.href=n,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL&&"undefined"!=typeof setTimeout&&setTimeout(function(){URL.revokeObjectURL(n)},6e4),n}}if("undefined"!=typeof $&&"undefined"!=typeof File&&"undefined"!=typeof Folder)try{var a=File(e);return a.open("w"),a.encoding="binary",Array.isArray(t)&&(t=o(t)),a.write(t),a.close(),t}catch(e){if(!e.message||!e.message.match(/onstruct/))throw e}throw new Error("cannot save file "+e)}function de(e){for(var t=Object.keys(e),r=[],n=0;n<t.length;++n)Object.prototype.hasOwnProperty.call(e,t[n])&&r.push(t[n]);return r}function w(e,t){for(var r=[],n=de(e),a=0;a!==n.length;++a)null==r[e[n[a]][t]]&&(r[e[n[a]][t]]=n[a]);return r}function C(e){for(var t=[],r=de(e),n=0;n!==r.length;++n)t[e[r[n]]]=r[n];return t}function B(e){for(var t=[],r=de(e),n=0;n!==r.length;++n)t[e[r[n]]]=parseInt(r[n],10);return t}var T=new Date(1899,11,30,0,0,0);function G(e,t){var r=e.getTime();return t&&(r-=1263168e5),(r-(T.getTime()+6e4*(e.getTimezoneOffset()-T.getTimezoneOffset())))/864e5}var k=new Date,x=T.getTime()+6e4*(k.getTimezoneOffset()-T.getTimezoneOffset()),_=k.getTimezoneOffset();function M(e){var t=new Date;return t.setTime(24*e*60*60*1e3+x),t.getTimezoneOffset()!==_&&t.setTime(t.getTime()+6e4*(t.getTimezoneOffset()-_)),t}var y=new Date("2017-02-19T19:06:09.000Z"),A=2017==(y=isNaN(y.getFullYear())?new Date("2/19/17"):y).getFullYear();function le(e,t){var r=new Date(e);if(A)return 0<t?r.setTime(r.getTime()+60*r.getTimezoneOffset()*1e3):t<0&&r.setTime(r.getTime()-60*r.getTimezoneOffset()*1e3),r;if(e instanceof Date)return e;if(1917==y.getFullYear()&&!isNaN(r.getFullYear())){t=r.getFullYear();return-1<e.indexOf(""+t)?r:(r.setFullYear(r.getFullYear()+100),r)}r=e.match(/\d+/g)||["2017","2","19","0","0","0"],r=new Date(+r[0],+r[1]-1,+r[2],+r[3]||0,+r[4]||0,+r[5]||0);return r=-1<e.indexOf("Z")?new Date(r.getTime()-60*r.getTimezoneOffset()*1e3):r}function I(e){for(var t="",r=0;r!=e.length;++r)t+=String.fromCharCode(e[r]);return t}function pe(e){if("undefined"!=typeof JSON&&!Array.isArray(e))return JSON.parse(JSON.stringify(e));if("object"!=typeof e||null==e)return e;if(e instanceof Date)return new Date(e.getTime());var t,r={};for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=pe(e[t]));return r}function F(e,t){for(var r="";r.length<t;)r+=e;return r}function R(e){var t=Number(e);if(!isNaN(t))return t;if(!/\d/.test(e))return t;var r=1,e=e.replace(/([\d]),([\d])/g,"$1$2").replace(/[$]/g,"").replace(/[%]/g,function(){return r*=100,""});return isNaN(t=Number(e))?(e=e.replace(/[(](.*)[)]/,function(e,t){return r=-r,t}),isNaN(t=Number(e))?t:t/r):t/r}function D(e){var t=new Date(e),r=new Date(NaN),n=t.getYear(),a=t.getMonth(),s=t.getDate();return isNaN(s)||n<0||8099<n||(!(0<a||1<s)||101==n)&&!e.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)&&e.match(/[^-0-9:,\/\\]/)?r:t}var O,P=5=="abacaba".split(/(:?b)/i).length;function N(e){return e?e.data?re(e.data):e.asNodeBuffer&&Q?re(e.asNodeBuffer().toString("binary")):e.asBinary?re(e.asBinary()):e._data&&e._data.getContent?re(I(Array.prototype.slice.call(e._data.getContent(),0))):e.content&&e.type?re(I(e.content)):null:null}function L(e){return(e&&".bin"===e.name.slice(-4)?function(e){if(!e)return null;if(e.data)return te(e.data);if(e.asNodeBuffer&&Q)return e.asNodeBuffer();if(e._data&&e._data.getContent){var t=e._data.getContent();return"string"==typeof t?te(t):Array.prototype.slice.call(t)}return e.content&&e.type?e.content:null}:N)(e)}function U(e,t){for(var r=e.FullPaths||de(e.files),n=t.toLowerCase(),a=n.replace(/\//g,"\\"),s=0;s<r.length;++s){var i=r[s].toLowerCase();if(n==i||a==i)return e.files[r[s]]}return null}function H(e,t){e=U(e,t);if(null==e)throw new Error("Cannot find file "+t+" in zip");return e}function W(e,t,r){if(!r)return L(H(e,t));if(!t)return null;try{return W(e,t)}catch(e){return null}}function V(e,t,r){if(!r)return N(H(e,t));if(!t)return null;try{return V(e,t)}catch(e){return null}}function X(e,t,r){e.FullPaths?oe.utils.cfb_add(e,t,r):e.file(t,r)}function z(){return O?new O:oe.utils.cfb_new()}function j(e,t){if("/"==e.charAt(0))return e.slice(1);var r=t.split("/");"/"!=t.slice(-1)&&r.pop();for(var n=e.split("/");0!==n.length;){var a=n.shift();".."===a?r.pop():"."!==a&&r.push(a)}return r.join("/")}"undefined"!=typeof JSZipSync&&(O=JSZipSync), true&&module.exports&&void 0===O&&(O=__webpack_require__(/*! ../libs/jszip.js */ "./node_modules/xlsx-js-style/libs/jszip.js"));var K='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n',me=/([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g,ge=/<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s?[\/\?]?>/gm;K.match(ge)||(ge=/<[^>]*>/g);var be=/<\w*:/,ve=/<(\/?)\w+:/;function Ee(e,t,r){for(var n={},a=0,s=0;a!==e.length&&(32!==(s=e.charCodeAt(a))&&10!==s&&13!==s);++a);if(t||(n[0]=e.slice(0,a)),a===e.length)return n;var i,o,l,c=e.match(me),f=0,h=0,u="",d="";if(c)for(h=0;h!=c.length;++h){for(d=c[h],s=0;s!=d.length&&61!==d.charCodeAt(s);++s);for(u=d.slice(0,s).trim();32==d.charCodeAt(s+1);)++s;for(o=34==(a=d.charCodeAt(s+1))||39==a?1:0,i=d.slice(s+1+o,d.length-o),f=0;f!=u.length&&58!==u.charCodeAt(f);++f);f===u.length?(n[u=0<u.indexOf("_")?u.slice(0,u.indexOf("_")):u]=i,r||(n[u.toLowerCase()]=i)):n[l=(5===f&&"xmlns"===u.slice(0,5)?"xmlns":"")+u.slice(f+1)]&&"ext"==u.slice(f-3,f)||(n[l]=i,r||(n[l.toLowerCase()]=i))}return n}function Se(e){return e.replace(ve,"<$1")}var we,Ce,Be={"&quot;":'"',"&apos;":"'","&gt;":">","&lt;":"<","&amp;":"&"},Te=C(Be),ke=(we=/&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/gi,Ce=/_x([\da-fA-F]{4})_/gi,function e(t){var r=t+"",n=r.indexOf("<![CDATA[");if(-1==n)return r.replace(we,function(e,t){return Be[e]||String.fromCharCode(parseInt(t,-1<e.indexOf("x")?16:10))||e}).replace(Ce,function(e,t){return String.fromCharCode(parseInt(t,16))});t=r.indexOf("]]>");return e(r.slice(0,n))+r.slice(n+9,t)+e(r.slice(t+3))}),xe=/[&<>'"]/g,_e=/[\u0000-\u0008\u000b-\u001f]/g;function ye(e){return(e+"").replace(xe,function(e){return Te[e]}).replace(_e,function(e){return"_x"+("000"+e.charCodeAt(0).toString(16)).slice(-4)+"_"})}function Ae(e){return ye(e).replace(/ /g,"_x0020_")}var Ie=/[\u0000-\u001f]/g;function Re(e){return(e+"").replace(xe,function(e){return Te[e]}).replace(/\n/g,"<br/>").replace(Ie,function(e){return"&#x"+("000"+e.charCodeAt(0).toString(16)).slice(-4)+";"})}var Fe,De=(Fe=/&#(\d+);/g,function(e){return e.replace(Fe,Oe)});function Oe(e,t){return String.fromCharCode(parseInt(t,10))}var Pe=function(e){return e.replace(/(\r\n|[\r\n])/g,"&#10;")};function Ne(e){switch(e){case 1:case!0:case"1":case"true":case"TRUE":return!0;default:return!1}}var Me=function(e){for(var t,r,n,a,s="",i=0,o=0;i<e.length;)(t=e.charCodeAt(i++))<128?s+=String.fromCharCode(t):(r=e.charCodeAt(i++),191<t&&t<224?(o=(31&t)<<6,o|=63&r,s+=String.fromCharCode(o)):(n=e.charCodeAt(i++),t<240?s+=String.fromCharCode((15&t)<<12|(63&r)<<6|63&n):(a=((7&t)<<18|(63&r)<<12|(63&n)<<6|63&(o=e.charCodeAt(i++)))-65536,s+=String.fromCharCode(55296+(a>>>10&1023)),s+=String.fromCharCode(56320+(1023&a)))));return s},Le=function(e){for(var t,r=[],n=0,a=0;n<e.length;)switch(!0){case(a=e.charCodeAt(n++))<128:r.push(String.fromCharCode(a));break;case a<2048:r.push(String.fromCharCode(192+(a>>6))),r.push(String.fromCharCode(128+(63&a)));break;case 55296<=a&&a<57344:a-=55296,t=e.charCodeAt(n++)-56320+(a<<10),r.push(String.fromCharCode(240+(t>>18&7))),r.push(String.fromCharCode(144+(t>>12&63))),r.push(String.fromCharCode(128+(t>>6&63))),r.push(String.fromCharCode(128+(63&t)));break;default:r.push(String.fromCharCode(224+(a>>12))),r.push(String.fromCharCode(128+(a>>6&63))),r.push(String.fromCharCode(128+(63&a)))}return r.join("")};Q&&(ko=function(e){for(var t,r,n=Buffer.alloc(2*e.length),a=1,s=0,i=0,o=0;o<e.length;o+=a)a=1,(r=e.charCodeAt(o))<128?t=r:r<224?(t=64*(31&r)+(63&e.charCodeAt(o+1)),a=2):r<240?(t=4096*(15&r)+64*(63&e.charCodeAt(o+1))+(63&e.charCodeAt(o+2)),a=3):(a=4,t=262144*(7&r)+4096*(63&e.charCodeAt(o+1))+64*(63&e.charCodeAt(o+2))+(63&e.charCodeAt(o+3)),i=55296+((t-=65536)>>>10&1023),t=56320+(1023&t)),0!==i&&(n[s++]=255&i,n[s++]=i>>>8,i=0),n[s++]=t%256,n[s++]=t>>>8;return n.slice(0,s).toString("ucs2")},_o=function(e){return s(e,"binary").toString("utf8")},(Me=Me(xo="foo bar bazâð£")==ko(xo)?ko:Me)(xo)==_o(xo)&&(Me=_o),Le=function(e){return s(e,"utf8").toString("binary")});var Ue,He,We,Ve=(Ue={},function(e,t){var r=e+"|"+(t||"");return Ue[r]||(Ue[r]=new RegExp("<(?:\\w+:)?"+e+'(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?'+e+">",t||""))}),Xe=(He=[["nbsp"," "],["middot","·"],["quot",'"'],["apos","'"],["gt",">"],["lt","<"],["amp","&"]].map(function(e){return[new RegExp("&"+e[0]+";","ig"),e[1]]}),function(e){for(var t=e.replace(/^[\t\n\r ]+/,"").replace(/[\t\n\r ]+$/,"").replace(/>\s+/g,">").replace(/\s+</g,"<").replace(/[\t\n\r ]+/g," ").replace(/<\s*[bB][rR]\s*\/?>/g,"\n").replace(/<[^>]*>/g,""),r=0;r<He.length;++r)t=t.replace(He[r][0],He[r][1]);return t}),Ge=(We={},function(e){return void 0!==We[e]?We[e]:We[e]=new RegExp("<(?:vt:)?"+e+">([\\s\\S]*?)</(?:vt:)?"+e+">","g")}),ze=/<\/?(?:vt:)?variant>/g,je=/<(?:vt:)([^>]*)>([\s\S]*)</;function $e(e,t){var r=Ee(e),e=e.match(Ge(r.baseType))||[],n=[];if(e.length==r.size)return e.forEach(function(e){e=e.replace(ze,"").match(je);e&&n.push({v:Me(e[2]),t:e[1]})}),n;if(t.WTF)throw new Error("unexpected vector length "+e.length+" != "+r.size);return n}var Ke=/(^\s|\s$|\n)/;function Ye(e,t){return"<"+e+(t.match(Ke)?' xml:space="preserve"':"")+">"+t+"</"+e+">"}function Qe(t){return de(t).map(function(e){return" "+e+'="'+t[e]+'"'}).join("")}function Je(e,t,r){return"<"+e+(null!=r?Qe(r):"")+(null!=t?(t.match(Ke)?' xml:space="preserve"':"")+">"+t+"</"+e:"/")+">"}function qe(e,t){try{return e.toISOString().replace(/\.\d*/,"")}catch(e){if(t)throw e}return""}var Ze={dc:"http://purl.org/dc/elements/1.1/",dcterms:"http://purl.org/dc/terms/",dcmitype:"http://purl.org/dc/dcmitype/",mx:"http://schemas.microsoft.com/office/mac/excel/2008/main",r:"http://schemas.openxmlformats.org/officeDocument/2006/relationships",sjs:"http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",vt:"http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",xsd:"http://www.w3.org/2001/XMLSchema",main:["http://schemas.openxmlformats.org/spreadsheetml/2006/main","http://purl.oclc.org/ooxml/spreadsheetml/main","http://schemas.microsoft.com/office/excel/2006/main","http://schemas.microsoft.com/office/excel/2006/2"]},et={o:"urn:schemas-microsoft-com:office:office",x:"urn:schemas-microsoft-com:office:excel",ss:"urn:schemas-microsoft-com:office:spreadsheet",dt:"uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",mv:"http://macVmlSchemaUri",v:"urn:schemas-microsoft-com:vml",html:"http://www.w3.org/TR/REC-html40"};var tt,rt,nt=function(e){for(var t=[],r=0;r<e[0].length;++r)if(e[0][r])for(var n=0,a=e[0][r].length;n<a;n+=10240)t.push.apply(t,e[0][r].slice(n,n+10240));return t},at=nt,st=function(e,t,r){for(var n=[],a=t;a<r;a+=2)n.push(String.fromCharCode(Bt(e,a)));return n.join("").replace(ee,"")},it=st,ot=function(e,t,r){for(var n=[],a=t;a<t+r;++a)n.push(("0"+e[a].toString(16)).slice(-2));return n.join("")},lt=ot,ct=function(e,t,r){for(var n=[],a=t;a<r;a++)n.push(String.fromCharCode(Ct(e,a)));return n.join("")},ft=ct,ht=function(e,t){var r=kt(e,t);return 0<r?ct(e,t+4,t+4+r-1):""},ut=ht,dt=function(e,t){var r=kt(e,t);return 0<r?ct(e,t+4,t+4+r-1):""},pt=dt,mt=function(e,t){var r=2*kt(e,t);return 0<r?ct(e,t+4,t+4+r-1):""},gt=mt,bt=tt=function(e,t){var r=kt(e,t);return 0<r?st(e,t+4,t+4+r):""},vt=function(e,t){var r=kt(e,t);return 0<r?ct(e,t+4,t+4+r):""},Et=vt,St=rt=function(e,t){for(var r=1-2*(e[t+7]>>>7),n=((127&e[t+7])<<4)+(e[t+6]>>>4&15),a=15&e[t+6],s=5;0<=s;--s)a=256*a+e[t+s];return 2047==n?0==a?1/0*r:NaN:(0==n?n=-1022:(n-=1023,a+=Math.pow(2,52)),r*Math.pow(2,n-52)*a)},wt=function(e){return Array.isArray(e)};Q&&(st=function(e,t,r){return Buffer.isBuffer(e)?e.toString("utf16le",t,r).replace(ee,""):it(e,t,r)},ot=function(e,t,r){return Buffer.isBuffer(e)?e.toString("hex",t,t+r):lt(e,t,r)},ht=function(e,t){if(!Buffer.isBuffer(e))return ut(e,t);var r=e.readUInt32LE(t);return 0<r?e.toString("utf8",t+4,t+4+r-1):""},dt=function(e,t){if(!Buffer.isBuffer(e))return pt(e,t);var r=e.readUInt32LE(t);return 0<r?e.toString("utf8",t+4,t+4+r-1):""},mt=function(e,t){if(!Buffer.isBuffer(e))return gt(e,t);var r=2*e.readUInt32LE(t);return e.toString("utf16le",t+4,t+4+r-1)},bt=function(e,t){if(!Buffer.isBuffer(e))return tt(e,t);var r=e.readUInt32LE(t);return e.toString("utf16le",t+4,t+4+r)},vt=function(e,t){if(!Buffer.isBuffer(e))return Et(e,t);var r=e.readUInt32LE(t);return e.toString("utf8",t+4,t+4+r)},ct=function(e,t,r){return Buffer.isBuffer(e)?e.toString("utf8",t,r):ft(e,t,r)},nt=function(e){return 0<e[0].length&&Buffer.isBuffer(e[0][0])?Buffer.concat(e[0]):at(e)},he=function(e){return Buffer.isBuffer(e[0])?Buffer.concat(e):[].concat.apply([],e)},St=function(e,t){return Buffer.isBuffer(e)?e.readDoubleLE(t):rt(e,t)},wt=function(e){return Buffer.isBuffer(e)||Array.isArray(e)}),"undefined"!=typeof cptable&&(st=function(e,t,r){return cptable.utils.decode(1200,e.slice(t,r)).replace(ee,"")},ct=function(e,t,r){return cptable.utils.decode(65001,e.slice(t,r))},ht=function(e,t){var r=kt(e,t);return 0<r?cptable.utils.decode(S,e.slice(t+4,t+4+r-1)):""},dt=function(e,t){var r=kt(e,t);return 0<r?cptable.utils.decode(f,e.slice(t+4,t+4+r-1)):""},mt=function(e,t){var r=2*kt(e,t);return 0<r?cptable.utils.decode(1200,e.slice(t+4,t+4+r-1)):""},bt=function(e,t){var r=kt(e,t);return 0<r?cptable.utils.decode(1200,e.slice(t+4,t+4+r)):""},vt=function(e,t){var r=kt(e,t);return 0<r?cptable.utils.decode(65001,e.slice(t+4,t+4+r)):""});var Ct=function(e,t){return e[t]},Bt=function(e,t){return 256*e[t+1]+e[t]},Tt=function(e,t){t=256*e[t+1]+e[t];return t<32768?t:-1*(65535-t+1)},kt=function(e,t){return e[t+3]*(1<<24)+(e[t+2]<<16)+(e[t+1]<<8)+e[t]},xt=function(e,t){return e[t+3]<<24|e[t+2]<<16|e[t+1]<<8|e[t]},_t=function(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]};function yt(e,t){var r,n,a,s,i,o,l="",c=[];switch(t){case"dbcs":if(o=this.l,Q&&Buffer.isBuffer(this))l=this.slice(this.l,this.l+2*e).toString("utf16le");else for(i=0;i<e;++i)l+=String.fromCharCode(Bt(this,o)),o+=2;e*=2;break;case"utf8":l=ct(this,this.l,this.l+e);break;case"utf16le":e*=2,l=st(this,this.l,this.l+e);break;case"wstr":if("undefined"==typeof cptable)return yt.call(this,e,"dbcs");l=cptable.utils.decode(f,this.slice(this.l,this.l+2*e)),e*=2;break;case"lpstr-ansi":l=ht(this,this.l),e=4+kt(this,this.l);break;case"lpstr-cp":l=dt(this,this.l),e=4+kt(this,this.l);break;case"lpwstr":l=mt(this,this.l),e=4+2*kt(this,this.l);break;case"lpp4":e=4+kt(this,this.l),l=bt(this,this.l),2&e&&(e+=2);break;case"8lpp4":e=4+kt(this,this.l),l=vt(this,this.l),3&e&&(e+=4-(3&e));break;case"cstr":for(e=0,l="";0!==(a=Ct(this,this.l+e++));)c.push(u(a));l=c.join("");break;case"_wstr":for(e=0,l="";0!==(a=Bt(this,this.l+e));)c.push(u(a)),e+=2;e+=2,l=c.join("");break;case"dbcs-cont":for(l="",o=this.l,i=0;i<e;++i){if(this.lens&&-1!==this.lens.indexOf(o))return a=Ct(this,o),this.l=o+1,s=yt.call(this,e-i,a?"dbcs-cont":"sbcs-cont"),c.join("")+s;c.push(u(Bt(this,o))),o+=2}l=c.join(""),e*=2;break;case"cpstr":if("undefined"!=typeof cptable){l=cptable.utils.decode(f,this.slice(this.l,this.l+e));break}case"sbcs-cont":for(l="",o=this.l,i=0;i!=e;++i){if(this.lens&&-1!==this.lens.indexOf(o))return a=Ct(this,o),this.l=o+1,s=yt.call(this,e-i,a?"dbcs-cont":"sbcs-cont"),c.join("")+s;c.push(u(Ct(this,o))),o+=1}l=c.join("");break;default:switch(e){case 1:return r=Ct(this,this.l),this.l++,r;case 2:return r=("i"===t?Tt:Bt)(this,this.l),this.l+=2,r;case 4:case-4:return"i"===t||0==(128&this[this.l+3])?(r=(0<e?xt:_t)(this,this.l),this.l+=4,r):(n=kt(this,this.l),this.l+=4,n);case 8:case-8:if("f"===t)return n=8==e?St(this,this.l):St([this[this.l+7],this[this.l+6],this[this.l+5],this[this.l+4],this[this.l+3],this[this.l+2],this[this.l+1],this[this.l+0]],0),this.l+=8,n;e=8;case 16:l=ot(this,this.l,e)}}return this.l+=e,l}var At=function(e,t,r){e[r]=255&t,e[r+1]=t>>>8&255,e[r+2]=t>>>16&255,e[r+3]=t>>>24&255},It=function(e,t,r){e[r]=255&t,e[r+1]=t>>8&255,e[r+2]=t>>16&255,e[r+3]=t>>24&255},Rt=function(e,t,r){e[r]=255&t,e[r+1]=t>>>8&255};function Ft(e,t,r){var n=0,a=0;if("dbcs"===r){for(a=0;a!=t.length;++a)Rt(this,t.charCodeAt(a),this.l+2*a);n=2*t.length}else if("sbcs"===r){if("undefined"!=typeof cptable&&874==S)for(a=0;a!=t.length;++a){var s=cptable.utils.encode(S,t.charAt(a));this[this.l+a]=s[0]}else for(t=t.replace(/[^\x00-\x7F]/g,"_"),a=0;a!=t.length;++a)this[this.l+a]=255&t.charCodeAt(a);n=t.length}else{if("hex"===r){for(;a<e;++a)this[this.l++]=parseInt(t.slice(2*a,2*a+2),16)||0;return this}if("utf16le"===r){for(var i=Math.min(this.l+e,this.length),a=0;a<Math.min(t.length,e);++a){var o=t.charCodeAt(a);this[this.l++]=255&o,this[this.l++]=o>>8}for(;this.l<i;)this[this.l++]=0;return this}switch(e){case 1:n=1,this[this.l]=255&t;break;case 2:n=2,this[this.l]=255&t,t>>>=8,this[this.l+1]=255&t;break;case 3:n=3,this[this.l]=255&t,t>>>=8,this[this.l+1]=255&t,t>>>=8,this[this.l+2]=255&t;break;case 4:n=4,At(this,t,this.l);break;case 8:if(n=8,"f"===r){!function(e,t,r){var n=(t<0||1/t==-1/0?1:0)<<7,a=0,s=0,i=n?-t:t;isFinite(i)?0==i?a=s=0:(a=Math.floor(Math.log(i)/Math.LN2),s=i*Math.pow(2,52-a),a<=-1023&&(!isFinite(s)||s<Math.pow(2,52))?a=-1022:(s-=Math.pow(2,52),a+=1023)):(a=2047,s=isNaN(t)?26985:0);for(var o=0;o<=5;++o,s/=256)e[r+o]=255&s;e[r+6]=(15&a)<<4|15&s,e[r+7]=a>>4|n}(this,t,this.l);break}case 16:break;case-4:n=4,It(this,t,this.l)}}return this.l+=n,this}function Dt(e,t){var r=ot(this,this.l,e.length>>1);if(r!==e)throw new Error(t+"Expected "+e+" saw "+r);this.l+=e.length>>1}function Ot(e,t){e.l=t,e.read_shift=yt,e.chk=Dt,e.write_shift=Ft}function Pt(e,t){e.l+=t}function Nt(e){e=J(e);return Ot(e,0),e}function Mt(e,t,r){if(e){Ot(e,e.l||0);for(var n,a=e.length,s=0;e.l<a;){128&(s=e.read_shift(1))&&(s=(127&s)+((127&e.read_shift(1))<<7));for(var i,o=Uc[s]||Uc[65535],l=127&(i=e.read_shift(1)),c=1;c<4&&128&i;++c)l+=(127&(i=e.read_shift(1)))<<7*c;n=e.l+l;var f=(o.f||Pt)(e,l,r);if(e.l=n,t(f,o.n,s))return}}}function Lt(){function t(e){return Ot(e=Nt(e),0),e}function r(){s&&(s.length>s.l&&((s=s.slice(0,s.l)).l=s.length),0<s.length&&e.push(s),s=null)}function n(e){return s&&e<s.length-s.l?s:(r(),s=t(Math.max(e+1,a)))}var e=[],a=Q?256:2048,s=t(a);return{next:n,push:function(e){r(),null==(s=e).l&&(s.l=s.length),n(a)},end:function(){return r(),nt([e])},_bufs:e}}function Ut(e,t,r,n){var a=+Hc[t];if(!isNaN(a)){t=1+(128<=a?1:0)+1,128<=(n=n||(Uc[a].p||(r||[]).length||0))&&++t,16384<=n&&++t,2097152<=n&&++t;var s=e.next(t);a<=127?s.write_shift(1,a):(s.write_shift(1,128+(127&a)),s.write_shift(1,a>>7));for(var i=0;4!=i;++i){if(!(128<=n)){s.write_shift(1,n);break}s.write_shift(1,128+(127&n)),n>>=7}0<n&&wt(r)&&e.push(r)}}function Ht(e,t,r){var n=pe(e);if(t.s?(n.cRel&&(n.c+=t.s.c),n.rRel&&(n.r+=t.s.r)):(n.cRel&&(n.c+=t.c),n.rRel&&(n.r+=t.r)),!r||r.biff<12){for(;256<=n.c;)n.c-=256;for(;65536<=n.r;)n.r-=65536}return n}function Wt(e,t,r){e=pe(e);return e.s=Ht(e.s,t.s,r),e.e=Ht(e.e,t.s,r),e}function Vt(e,t){if(e.cRel&&e.c<0)for(e=pe(e);e.c<0;)e.c+=8<t?16384:256;if(e.rRel&&e.r<0)for(e=pe(e);e.r<0;)e.r+=8<t?1048576:5<t?65536:16384;var r=Yt(e);return e.cRel||null==e.cRel||(r=r.replace(/^([A-Z])/,"$$$1")),r=!e.rRel&&null!=e.rRel?r.replace(/([A-Z]|^)(\d+)$/,"$1$$$2"):r}function Xt(e,t){return 0!=e.s.r||e.s.rRel||e.e.r!=(12<=t.biff?1048575:8<=t.biff?65536:16384)||e.e.rRel?0!=e.s.c||e.s.cRel||e.e.c!=(12<=t.biff?16383:255)||e.e.cRel?Vt(e.s,t.biff)+":"+Vt(e.e,t.biff):(e.s.rRel?"":"$")+zt(e.s.r)+":"+(e.e.rRel?"":"$")+zt(e.e.r):(e.s.cRel?"":"$")+$t(e.s.c)+":"+(e.e.cRel?"":"$")+$t(e.e.c)}function Gt(e){return parseInt(e.replace(/\$(\d+)$/,"$1"),10)-1}function zt(e){return""+(e+1)}function jt(e){for(var t=e.replace(/^\$([A-Z])/,"$1"),r=0,n=0;n!==t.length;++n)r=26*r+t.charCodeAt(n)-64;return r-1}function $t(e){if(e<0)throw new Error("invalid column "+e);var t="";for(++e;e;e=Math.floor((e-1)/26))t=String.fromCharCode((e-1)%26+65)+t;return t}function Kt(e){for(var t=0,r=0,n=0;n<e.length;++n){var a=e.charCodeAt(n);48<=a&&a<=57?t=10*t+(a-48):65<=a&&a<=90&&(r=26*r+(a-64))}return{c:r-1,r:t-1}}function Yt(e){for(var t=e.c+1,r="";t;t=(t-1)/26|0)r=String.fromCharCode((t-1)%26+65)+r;return r+(e.r+1)}function Qt(e){var t=e.indexOf(":");return-1==t?{s:Kt(e),e:Kt(e)}:{s:Kt(e.slice(0,t)),e:Kt(e.slice(t+1))}}function Jt(e,t){return void 0===t||"number"==typeof t?Jt(e.s,e.e):(e="string"!=typeof e?Yt(e):e)==(t="string"!=typeof t?Yt(t):t)?e:e+":"+t}function qt(e){for(var t={s:{c:0,r:0},e:{c:0,r:0}},r=0,n=0,a=0,s=e.length,r=0;n<s&&!((a=e.charCodeAt(n)-64)<1||26<a);++n)r=26*r+a;for(t.s.c=--r,r=0;n<s&&!((a=e.charCodeAt(n)-48)<0||9<a);++n)r=10*r+a;if(t.s.r=--r,n===s||58===e.charCodeAt(++n))return t.e.c=t.s.c,t.e.r=t.s.r,t;for(r=0;n!=s&&!((a=e.charCodeAt(n)-64)<1||26<a);++n)r=26*r+a;for(t.e.c=--r,r=0;n!=s&&!((a=e.charCodeAt(n)-48)<0||9<a);++n)r=10*r+a;return t.e.r=--r,t}function Zt(e,t){var r="d"==e.t&&t instanceof Date;if(null!=e.z)try{return e.w=ue.format(e.z,r?G(t):t)}catch(e){}try{return e.w=ue.format((e.XF||{}).numFmtId||(r?14:0),r?G(t):t)}catch(e){return""+t}}function er(e,t,r){return null==e||null==e.t||"z"==e.t?"":void 0!==e.w?e.w:("d"==e.t&&!e.z&&r&&r.dateNF&&(e.z=r.dateNF),Zt(e,null==t?e.v:t))}function tr(e,t){var r=t&&t.sheet?t.sheet:"Sheet1",t={};return t[r]=e,{SheetNames:[r],Sheets:t}}function rr(e,t,r){var n=r||{},a=e?Array.isArray(e):n.dense;null!=fe&&null==a&&(a=fe);var s=e||(a?[]:{}),i=0,o=0;s&&null!=n.origin&&("number"==typeof n.origin?i=n.origin:(i=(l="string"==typeof n.origin?Kt(n.origin):n.origin).r,o=l.c),s["!ref"]||(s["!ref"]="A1:A1"));var l,c={s:{c:1e7,r:1e7},e:{c:0,r:0}};s["!ref"]&&(l=qt(s["!ref"]),c.s.c=l.s.c,c.s.r=l.s.r,c.e.c=Math.max(c.e.c,l.e.c),c.e.r=Math.max(c.e.r,l.e.r),-1==i&&(c.e.r=i=l.e.r+1));for(var f=0;f!=t.length;++f)if(t[f]){if(!Array.isArray(t[f]))throw new Error("aoa_to_sheet expects an array of arrays");for(var h=0;h!=t[f].length;++h)if(void 0!==t[f][h]){var u={v:t[f][h]},d=i+f,p=o+h;if(c.s.r>d&&(c.s.r=d),c.s.c>p&&(c.s.c=p),c.e.r<d&&(c.e.r=d),c.e.c<p&&(c.e.c=p),!t[f][h]||"object"!=typeof t[f][h]||Array.isArray(t[f][h])||t[f][h]instanceof Date)if(Array.isArray(u.v)&&(u.f=t[f][h][1],u.v=u.v[0]),null===u.v)if(u.f)u.t="n";else{if(!n.sheetStubs)continue;u.t="z"}else"number"==typeof u.v?u.t="n":"boolean"==typeof u.v?u.t="b":u.v instanceof Date?(u.z=n.dateNF||ue._table[14],n.cellDates?(u.t="d",u.w=ue.format(u.z,G(u.v))):(u.t="n",u.v=G(u.v),u.w=ue.format(u.z,u.v))):u.t="s";else u=t[f][h];a?(s[d]||(s[d]=[]),s[d][p]&&s[d][p].z&&(u.z=s[d][p].z),s[d][p]=u):(s[d=Yt({c:p,r:d})]&&s[d].z&&(u.z=s[d].z),s[d]=u)}}return c.s.c<1e7&&(s["!ref"]=Jt(c)),s}function nr(e,t){return rr(null,e,t)}function ar(e,t){return(t=t||Nt(4)).write_shift(4,e),t}function sr(e){var t=e.read_shift(4);return 0===t?"":e.read_shift(t,"dbcs")}function ir(e,t){var r=!1;return null==t&&(r=!0,t=Nt(4+2*e.length)),t.write_shift(4,e.length),0<e.length&&t.write_shift(0,e,"dbcs"),r?t.slice(0,t.l):t}function or(e,t){var r,n=e.l,a=e.read_shift(1),s=sr(e),i=[],s={t:s,h:s};if(0!=(1&a)){for(var o=e.read_shift(4),l=0;l!=o;++l)i.push({ich:(r=e).read_shift(2),ifnt:r.read_shift(2)});s.r=i}else s.r=[{ich:0,ifnt:0}];return e.l=n+t,s}!function(e,t){var r;if(void 0!==t)r=t;else if(true)try{r=__webpack_require__(/*! crypto */ "?62fb")}catch(e){r=null}e.rc4=function(e,t){for(var r=new Array(256),n=0,a=0,s=0,i=0,a=0;256!=a;++a)r[a]=a;for(a=0;256!=a;++a)s=s+r[a]+e[a%e.length].charCodeAt(0)&255,i=r[a],r[a]=r[s],r[s]=i;a=s=0;for(var o=J(t.length),n=0;n!=t.length;++n)s=(s+r[a=a+1&255])%256,i=r[a],r[a]=r[s],r[s]=i,o[n]=t[n]^r[r[a]+r[s]&255];return o},e.md5=function(e){if(!r)throw new Error("Unsupported crypto");return r.createHash("md5").update(e).digest("hex")}}({},"undefined"!=typeof crypto?crypto:void 0);var lr=or;function cr(e,t){var r,n=!1;return null==t&&(n=!0,t=Nt(23+4*e.t.length)),t.write_shift(1,1),ir(e.t,t),t.write_shift(4,1),r={ich:0,ifnt:0},(e=(e=t)||Nt(4)).write_shift(2,r.ich||0),e.write_shift(2,r.ifnt||0),n?t.slice(0,t.l):t}function fr(e){var t=e.read_shift(4),r=e.read_shift(2);return r+=e.read_shift(1)<<16,e.l++,{c:t,iStyleRef:r}}function hr(e,t){return(t=null==t?Nt(8):t).write_shift(-4,e.c),t.write_shift(3,e.iStyleRef||e.s),t.write_shift(1,0),t}var ur=sr,dr=ir;function pr(e){var t=e.read_shift(4);return 0===t||4294967295===t?"":e.read_shift(t,"dbcs")}function mr(e,t){var r=!1;return null==t&&(r=!0,t=Nt(127)),t.write_shift(4,0<e.length?e.length:4294967295),0<e.length&&t.write_shift(0,e,"dbcs"),r?t.slice(0,t.l):t}var gr=sr,br=pr,vr=mr;function Er(e){var t=e.slice(e.l,e.l+4),r=1&t[0],n=2&t[0];e.l+=4,t[0]&=252;t=0==n?St([0,0,0,0,t[0],t[1],t[2],t[3]],0):xt(t,0)>>2;return r?t/100:t}function Sr(e){var t={s:{},e:{}};return t.s.r=e.read_shift(4),t.e.r=e.read_shift(4),t.s.c=e.read_shift(4),t.e.c=e.read_shift(4),t}var wr=Sr,Cr=function(e,t){return(t=t||Nt(16)).write_shift(4,e.s.r),t.write_shift(4,e.e.r),t.write_shift(4,e.s.c),t.write_shift(4,e.e.c),t};function Br(e){return e.read_shift(8,"f")}function Tr(e,t){return(t||Nt(8)).write_shift(8,e,"f")}function kr(e,t){if(t=t||Nt(8),!e||e.auto)return t.write_shift(4,0),t.write_shift(4,0),t;null!=e.index?(t.write_shift(1,2),t.write_shift(1,e.index)):null!=e.theme?(t.write_shift(1,6),t.write_shift(1,e.theme)):(t.write_shift(1,5),t.write_shift(1,0));var r=e.tint||0;return 0<r?r*=32767:r<0&&(r*=32768),t.write_shift(2,r),e.rgb&&null==e.theme?("number"==typeof(e=e.rgb||"FFFFFF")&&(e=("000000"+e.toString(16)).slice(-6)),t.write_shift(1,parseInt(e.slice(0,2),16)),t.write_shift(1,parseInt(e.slice(2,4),16)),t.write_shift(1,parseInt(e.slice(4,6),16)),t.write_shift(1,255)):(t.write_shift(2,0),t.write_shift(1,0),t.write_shift(1,0)),t}function xr(e,t){var r=e.read_shift(4);switch(r){case 0:return"";case 4294967295:case 4294967294:return{2:"BITMAP",3:"METAFILEPICT",8:"DIB",14:"ENHMETAFILE"}[e.read_shift(4)]||""}if(400<r)throw new Error("Unsupported Clipboard: "+r.toString(16));return e.l-=4,e.read_shift(0,1==t?"lpstr":"lpwstr")}var _r=2,yr=3,Ar=12,Ir=81,Rr=[80,Ir],Fr={1:{n:"CodePage",t:_r},2:{n:"Category",t:80},3:{n:"PresentationFormat",t:80},4:{n:"ByteCount",t:yr},5:{n:"LineCount",t:yr},6:{n:"ParagraphCount",t:yr},7:{n:"SlideCount",t:yr},8:{n:"NoteCount",t:yr},9:{n:"HiddenCount",t:yr},10:{n:"MultimediaClipCount",t:yr},11:{n:"ScaleCrop",t:11},12:{n:"HeadingPairs",t:4096|Ar},13:{n:"TitlesOfParts",t:4126},14:{n:"Manager",t:80},15:{n:"Company",t:80},16:{n:"LinksUpToDate",t:11},17:{n:"CharacterCount",t:yr},19:{n:"SharedDoc",t:11},22:{n:"HyperlinksChanged",t:11},23:{n:"AppVersion",t:yr,p:"version"},24:{n:"DigSig",t:65},26:{n:"ContentType",t:80},27:{n:"ContentStatus",t:80},28:{n:"Language",t:80},29:{n:"Version",t:80},255:{}},Dr={1:{n:"CodePage",t:_r},2:{n:"Title",t:80},3:{n:"Subject",t:80},4:{n:"Author",t:80},5:{n:"Keywords",t:80},6:{n:"Comments",t:80},7:{n:"Template",t:80},8:{n:"LastAuthor",t:80},9:{n:"RevNumber",t:80},10:{n:"EditTime",t:64},11:{n:"LastPrinted",t:64},12:{n:"CreatedDate",t:64},13:{n:"ModifiedDate",t:64},14:{n:"PageCount",t:yr},15:{n:"WordCount",t:yr},16:{n:"CharCount",t:yr},17:{n:"Thumbnail",t:71},18:{n:"Application",t:80},19:{n:"DocSecurity",t:yr},255:{}},Or={2147483648:{n:"Locale",t:19},2147483651:{n:"Behavior",t:19},1919054434:{}};!function(){for(var e in Or)Object.prototype.hasOwnProperty.call(Or,e)&&(Fr[e]=Dr[e]=Or[e])}();var Pr=w(Fr,"n"),Nr=w(Dr,"n"),Mr={1:"US",2:"CA",3:"",7:"RU",20:"EG",30:"GR",31:"NL",32:"BE",33:"FR",34:"ES",36:"HU",39:"IT",41:"CH",43:"AT",44:"GB",45:"DK",46:"SE",47:"NO",48:"PL",49:"DE",52:"MX",55:"BR",61:"AU",64:"NZ",66:"TH",81:"JP",82:"KR",84:"VN",86:"CN",90:"TR",105:"JS",213:"DZ",216:"MA",218:"LY",351:"PT",354:"IS",358:"FI",420:"CZ",886:"TW",961:"LB",962:"JO",963:"SY",964:"IQ",965:"KW",966:"SA",971:"AE",972:"IL",974:"QA",981:"IR",65535:"US"},Lr=[null,"solid","mediumGray","darkGray","lightGray","darkHorizontal","darkVertical","darkDown","darkUp","darkGrid","darkTrellis","lightHorizontal","lightVertical","lightDown","lightUp","lightGrid","lightTrellis","gray125","gray0625"];var Ur,Hr=pe([0,16777215,16711680,65280,255,16776960,16711935,65535,0,16777215,16711680,65280,255,16776960,16711935,65535,8388608,32768,128,8421376,8388736,32896,12632256,8421504,10066431,10040166,16777164,13434879,6684774,16744576,26316,13421823,128,16711935,16776960,65535,8388736,8388608,32896,255,52479,13434879,13434828,16777113,10079487,16751052,13408767,16764057,3368703,3394764,10079232,16763904,16750848,16737792,6710937,9868950,13158,3381606,13056,3355392,10040064,10040166,3355545,3355443,16777215,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map(function(e){return[e>>16&255,e>>8&255,255&e]})),Wr={0:"#NULL!",7:"#DIV/0!",15:"#VALUE!",23:"#REF!",29:"#NAME?",36:"#NUM!",42:"#N/A",43:"#GETTING_DATA",255:"#WTF?"},Vr=B(Wr),Xr={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":"workbooks","application/vnd.ms-excel.binIndexWs":"TODO","application/vnd.ms-excel.intlmacrosheet":"TODO","application/vnd.ms-excel.binIndexMs":"TODO","application/vnd.openxmlformats-package.core-properties+xml":"coreprops","application/vnd.openxmlformats-officedocument.custom-properties+xml":"custprops","application/vnd.openxmlformats-officedocument.extended-properties+xml":"extprops","application/vnd.openxmlformats-officedocument.customXmlProperties+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty":"TODO","application/vnd.ms-excel.pivotTable":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.chart+xml":"TODO","application/vnd.ms-office.chartcolorstyle+xml":"TODO","application/vnd.ms-office.chartstyle+xml":"TODO","application/vnd.ms-office.chartex+xml":"TODO","application/vnd.ms-excel.calcChain":"calcchains","application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml":"calcchains","application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings":"TODO","application/vnd.ms-office.activeX":"TODO","application/vnd.ms-office.activeX+xml":"TODO","application/vnd.ms-excel.attachedToolbars":"TODO","application/vnd.ms-excel.connections":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":"TODO","application/vnd.ms-excel.externalLink":"links","application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml":"links","application/vnd.ms-excel.sheetMetadata":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml":"TODO","application/vnd.ms-excel.pivotCacheDefinition":"TODO","application/vnd.ms-excel.pivotCacheRecords":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml":"TODO","application/vnd.ms-excel.queryTable":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml":"TODO","application/vnd.ms-excel.userNames":"TODO","application/vnd.ms-excel.revisionHeaders":"TODO","application/vnd.ms-excel.revisionLog":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml":"TODO","application/vnd.ms-excel.tableSingleCells":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml":"TODO","application/vnd.ms-excel.slicer":"TODO","application/vnd.ms-excel.slicerCache":"TODO","application/vnd.ms-excel.slicer+xml":"TODO","application/vnd.ms-excel.slicerCache+xml":"TODO","application/vnd.ms-excel.wsSortMap":"TODO","application/vnd.ms-excel.table":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":"TODO","application/vnd.openxmlformats-officedocument.theme+xml":"themes","application/vnd.openxmlformats-officedocument.themeOverride+xml":"TODO","application/vnd.ms-excel.Timeline+xml":"TODO","application/vnd.ms-excel.TimelineCache+xml":"TODO","application/vnd.ms-office.vbaProject":"vba","application/vnd.ms-office.vbaProjectSignature":"vba","application/vnd.ms-office.volatileDependencies":"TODO","application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml":"TODO","application/vnd.ms-excel.controlproperties+xml":"TODO","application/vnd.openxmlformats-officedocument.model+data":"TODO","application/vnd.ms-excel.Survey+xml":"TODO","application/vnd.openxmlformats-officedocument.drawing+xml":"drawings","application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml":"TODO","application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml":"TODO","application/vnd.openxmlformats-officedocument.vmlDrawing":"TODO","application/vnd.openxmlformats-package.relationships+xml":"rels","application/vnd.openxmlformats-officedocument.oleObject":"TODO","image/png":"TODO",sheet:"js"},Gr=(de(Ur={workbooks:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",xlsm:"application/vnd.ms-excel.sheet.macroEnabled.main+xml",xlsb:"application/vnd.ms-excel.sheet.binary.macroEnabled.main",xlam:"application/vnd.ms-excel.addin.macroEnabled.main+xml",xltx:"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"},strs:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",xlsb:"application/vnd.ms-excel.sharedStrings"},comments:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",xlsb:"application/vnd.ms-excel.comments"},sheets:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",xlsb:"application/vnd.ms-excel.worksheet"},charts:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",xlsb:"application/vnd.ms-excel.chartsheet"},dialogs:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",xlsb:"application/vnd.ms-excel.dialogsheet"},macros:{xlsx:"application/vnd.ms-excel.macrosheet+xml",xlsb:"application/vnd.ms-excel.macrosheet"},styles:{xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",xlsb:"application/vnd.ms-excel.styles"}}).forEach(function(t){["xlsm","xlam"].forEach(function(e){Ur[t][e]||(Ur[t][e]=Ur[t].xlsx)})}),de(Ur).forEach(function(t){de(Ur[t]).forEach(function(e){Xr[Ur[t][e]]=t})}),Ur),zr=function(e){for(var t=[],r=de(e),n=0;n!==r.length;++n)null==t[e[r[n]]]&&(t[e[r[n]]]=[]),t[e[r[n]]].push(r[n]);return t}(Xr);function jr(){return{workbooks:[],sheets:[],charts:[],dialogs:[],macros:[],rels:[],strs:[],comments:[],links:[],coreprops:[],extprops:[],custprops:[],themes:[],styles:[],calcchains:[],vba:[],drawings:[],TODO:[],xmlns:""}}Ze.CT="http://schemas.openxmlformats.org/package/2006/content-types";var $r=Je("Types",null,{xmlns:Ze.CT,"xmlns:xsd":Ze.xsd,"xmlns:xsi":Ze.xsi}),Kr=[["xml","application/xml"],["bin","application/vnd.ms-excel.sheet.binary.macroEnabled.main"],["vml","application/vnd.openxmlformats-officedocument.vmlDrawing"],["data","application/vnd.openxmlformats-officedocument.model+data"],["bmp","image/bmp"],["png","image/png"],["gif","image/gif"],["emf","image/x-emf"],["wmf","image/x-wmf"],["jpg","image/jpeg"],["jpeg","image/jpeg"],["tif","image/tiff"],["tiff","image/tiff"],["pdf","application/pdf"],["rels",zr.rels[0]]].map(function(e){return Je("Default",null,{Extension:e[0],ContentType:e[1]})});function Yr(r,n){var t,a=[];a[a.length]=K,a[a.length]=$r,a=a.concat(Kr);function e(e){r[e]&&0<r[e].length&&(t=r[e][0],a[a.length]=Je("Override",null,{PartName:("/"==t[0]?"":"/")+t,ContentType:Gr[e][n.bookType||"xlsx"]}))}function s(t){(r[t]||[]).forEach(function(e){a[a.length]=Je("Override",null,{PartName:("/"==e[0]?"":"/")+e,ContentType:Gr[t][n.bookType||"xlsx"]})})}function i(t){(r[t]||[]).forEach(function(e){a[a.length]=Je("Override",null,{PartName:("/"==e[0]?"":"/")+e,ContentType:zr[t][0]})})}return e("workbooks"),s("sheets"),s("charts"),i("themes"),["strs","styles"].forEach(e),["coreprops","extprops","custprops"].forEach(i),i("vba"),i("comments"),i("drawings"),2<a.length&&(a[a.length]="</Types>",a[1]=a[1].replace("/>",">")),a.join("")}var Qr={WB:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",SHEET:"http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",HLINK:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",VML:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",XPATH:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",XMISS:"http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",XLINK:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",CXML:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",CXMLP:"http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",VBA:"http://schemas.microsoft.com/office/2006/relationships/vbaProject"};function Jr(e){var t=e.lastIndexOf("/");return e.slice(0,t+1)+"_rels/"+e.slice(t+1)+".rels"}function qr(e,n){var a={"!id":{}};if(!e)return a;"/"!==n.charAt(0)&&(n="/"+n);var s={};return(e.match(ge)||[]).forEach(function(e){var t,r=Ee(e);"<Relationship"===r[0]&&((t={}).Type=r.Type,t.Target=r.Target,t.Id=r.Id,t.TargetMode=r.TargetMode,e="External"===r.TargetMode?r.Target:j(r.Target,n),a[e]=t,s[r.Id]=t)}),a["!id"]=s,a}Ze.RELS="http://schemas.openxmlformats.org/package/2006/relationships";var Zr=Je("Relationships",null,{xmlns:Ze.RELS});function en(t){var r=[K,Zr];return de(t["!id"]).forEach(function(e){r[r.length]=Je("Relationship",null,t["!id"][e])}),2<r.length&&(r[r.length]="</Relationships>",r[1]=r[1].replace("/>",">")),r.join("")}var tn=[Qr.HLINK,Qr.XPATH,Qr.XMISS];function rn(e,t,r,n,a,s){if(a=a||{},e["!id"]||(e["!id"]={}),t<0)for(t=1;e["!id"]["rId"+t];++t);if(a.Id="rId"+t,a.Type=n,a.Target=r,s?a.TargetMode=s:-1<tn.indexOf(a.Type)&&(a.TargetMode="External"),e["!id"][a.Id])throw new Error("Cannot rewrite rId "+t);return e["!id"][a.Id]=a,e[("/"+a.Target).replace("//","/")]=a,t}var nn="application/vnd.oasis.opendocument.spreadsheet";function an(e,t,r){return['  <rdf:Description rdf:about="'+e+'">\n','    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/'+(r||"odf")+"#"+t+'"/>\n',"  </rdf:Description>\n"].join("")}var sn,on=(sn='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS '+n.version+"</meta:generator></office:meta></office:document-meta>",function(){return sn}),ln=[["cp:category","Category"],["cp:contentStatus","ContentStatus"],["cp:keywords","Keywords"],["cp:lastModifiedBy","LastAuthor"],["cp:lastPrinted","LastPrinted"],["cp:revision","RevNumber"],["cp:version","Version"],["dc:creator","Author"],["dc:description","Comments"],["dc:identifier","Identifier"],["dc:language","Language"],["dc:subject","Subject"],["dc:title","Title"],["dcterms:created","CreatedDate","date"],["dcterms:modified","ModifiedDate","date"]];Ze.CORE_PROPS="http://schemas.openxmlformats.org/package/2006/metadata/core-properties",Qr.CORE_PROPS="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";var cn=function(){for(var e=new Array(ln.length),t=0;t<ln.length;++t){var r=ln[t],r="(?:"+r[0].slice(0,r[0].indexOf(":"))+":)"+r[0].slice(r[0].indexOf(":")+1);e[t]=new RegExp("<"+r+"[^>]*>([\\s\\S]*?)</"+r+">")}return e}();function fn(e){var t={};e=Me(e);for(var r=0;r<ln.length;++r){var n=ln[r],a=e.match(cn[r]);null!=a&&0<a.length&&(t[n[1]]=ke(a[1])),"date"===n[2]&&t[n[1]]&&(t[n[1]]=le(t[n[1]]))}return t}var hn=Je("cp:coreProperties",null,{"xmlns:cp":Ze.CORE_PROPS,"xmlns:dc":Ze.dc,"xmlns:dcterms":Ze.dcterms,"xmlns:dcmitype":Ze.dcmitype,"xmlns:xsi":Ze.xsi});function un(e,t,r,n,a){null==a[e]&&null!=t&&""!==t&&(t=ye(a[e]=t),n[n.length]=r?Je(e,t,r):Ye(e,t))}var dn=[["Application","Application","string"],["AppVersion","AppVersion","string"],["Company","Company","string"],["DocSecurity","DocSecurity","string"],["Manager","Manager","string"],["HyperlinksChanged","HyperlinksChanged","bool"],["SharedDoc","SharedDoc","bool"],["LinksUpToDate","LinksUpToDate","bool"],["ScaleCrop","ScaleCrop","bool"],["HeadingPairs","HeadingPairs","raw"],["TitlesOfParts","TitlesOfParts","raw"]];Ze.EXT_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",Qr.EXT_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";function pn(e,t,r,n){var a=[];if("string"==typeof e)a=$e(e,n);else for(var s=0;s<e.length;++s)a=a.concat(e[s].map(function(e){return{v:e}}));var i,o="string"==typeof t?$e(t,n).map(function(e){return e.v}):t,l=0;if(0<o.length)for(var c=0;c!==a.length;c+=2){switch(i=+a[c+1].v,a[c].v){case"Worksheets":case"工作表":case"Листы":case"أوراق العمل":case"ワークシート":case"גליונות עבודה":case"Arbeitsblätter":case"Çalışma Sayfaları":case"Feuilles de calcul":case"Fogli di lavoro":case"Folhas de cálculo":case"Planilhas":case"Regneark":case"Hojas de cálculo":case"Werkbladen":r.Worksheets=i,r.SheetNames=o.slice(l,l+i);break;case"Named Ranges":case"Rangos con nombre":case"名前付き一覧":case"Benannte Bereiche":case"Navngivne områder":r.NamedRanges=i,r.DefinedNames=o.slice(l,l+i);break;case"Charts":case"Diagramme":r.Chartsheets=i,r.ChartNames=o.slice(l,l+i)}l+=i}}var mn=Je("Properties",null,{xmlns:Ze.EXT_PROPS,"xmlns:vt":Ze.vt});Ze.CUST_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",Qr.CUST_PROPS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";var gn=/<[^>]+>[^<]*/g;var bn=Je("Properties",null,{xmlns:Ze.CUST_PROPS,"xmlns:vt":Ze.vt});function vn(t){var r=[K,bn];if(!t)return r.join("");var n=1;return de(t).forEach(function(e){++n,r[r.length]=Je("property",function(e,t){switch(typeof e){case"string":var r=Je("vt:lpwstr",ye(e));return r=t?r.replace(/&quot;/g,"_x0022_"):r;case"number":return Je((0|e)==e?"vt:i4":"vt:r8",ye(String(e)));case"boolean":return Je("vt:bool",e?"true":"false")}if(e instanceof Date)return Je("vt:filetime",qe(e));throw new Error("Unable to serialize "+e)}(t[e],!0),{fmtid:"{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",pid:n,name:ye(e)})}),2<r.length&&(r[r.length]="</Properties>",r[1]=r[1].replace("/>",">")),r.join("")}var En={Title:"Title",Subject:"Subject",Author:"Author",Keywords:"Keywords",Comments:"Description",LastAuthor:"LastAuthor",RevNumber:"Revision",Application:"AppName",LastPrinted:"LastPrinted",CreatedDate:"Created",ModifiedDate:"LastSaved",Category:"Category",Manager:"Manager",Company:"Company",AppVersion:"Version",ContentStatus:"ContentStatus",Identifier:"Identifier",Language:"Language"},Sn=C(En);function wn(e){var t=e.read_shift(4),e=e.read_shift(4);return new Date(1e3*(e/1e7*Math.pow(2,32)+t/1e7-11644473600)).toISOString().replace(/\.000/,"")}function Cn(e,t,r){var n=e.l,a=e.read_shift(0,"lpstr-cp");if(r)for(;e.l-n&3;)++e.l;return a}function Bn(e,t,r){var n=e.read_shift(0,"lpwstr");return r&&(e.l+=4-(n.length+1&3)&3),n}function Tn(e,t,r){return 31===t?Bn(e):Cn(e,0,r)}function kn(e,t,r){return Tn(e,t,!1===r?0:4)}function xn(e){return function(e){for(var t=e.read_shift(4),r=[],n=0;n!=t;++n)r[n]=e.read_shift(0,"lpstr-cp").replace(ee,"");return r}(e)}function _n(e){for(var t,r=e.read_shift(4),n=[],a=0;a!=r/2;++a)n.push([In(t=e,Ir),In(t,yr)]);return n}function yn(e,t){for(var r=e.read_shift(4),n={},a=0;a!=r;++a){var s=e.read_shift(4),i=e.read_shift(4);n[s]=e.read_shift(i,1200===t?"utf16le":"utf8").replace(ee,"").replace(ne,"!"),1200===t&&i%2&&(e.l+=2)}return 3&e.l&&(e.l=e.l>>3<<2),n}function An(e){var t=e.read_shift(4),r=e.slice(e.l,e.l+t);return e.l+=t,0<(3&t)&&(e.l+=4-(3&t)&3),r}function In(e,t,r){var n,a,s=e.read_shift(2),i=r||{};if(e.l+=2,t!==Ar&&s!==t&&-1===Rr.indexOf(t))throw new Error("Expected type "+t+" saw "+s);switch(t===Ar?s:t){case 2:return n=e.read_shift(2,"i"),i.raw||(e.l+=2),n;case 3:return n=e.read_shift(4,"i");case 11:return 0!==e.read_shift(4);case 19:return n=e.read_shift(4);case 30:return Cn(e,0,4).replace(ee,"");case 31:return Bn(e);case 64:return wn(e);case 65:return An(e);case 71:return(a={}).Size=(n=e).read_shift(4),n.l+=a.Size+3-(a.Size-1)%4,a;case 80:return kn(e,s,!i.raw).replace(ee,"");case 81:return function(e,t){if(!t)throw new Error("VtUnalignedString must have positive length");return Tn(e,t,0)}(e,s).replace(ee,"");case 4108:return _n(e);case 4126:return xn(e);default:throw new Error("TypedPropertyValue unrecognized type "+t+" "+s)}}function Rn(e,t){var r,n,a,s=Nt(4),i=Nt(4);switch(s.write_shift(4,80==e?31:e),e){case 3:i.write_shift(-4,t);break;case 5:(i=Nt(8)).write_shift(8,t,"f");break;case 11:i.write_shift(4,t?1:0);break;case 64:n=("string"==typeof(r=t)?new Date(Date.parse(r)):r).getTime()/1e3+11644473600,a=n%Math.pow(2,32),r=(n-a)/Math.pow(2,32),r*=1e7,0<(n=(a*=1e7)/Math.pow(2,32)|0)&&(a%=Math.pow(2,32),r+=n),(n=Nt(8)).write_shift(4,a),n.write_shift(4,r),i=n;break;case 31:case 80:for((i=Nt(4+2*(t.length+1)+(t.length%2?0:2))).write_shift(4,t.length+1),i.write_shift(0,t,"dbcs");i.l!=i.length;)i.write_shift(1,0);break;default:throw new Error("TypedPropertyValue unrecognized type "+e+" "+t)}return he([s,i])}function Fn(e,t){for(var r=e.l,n=e.read_shift(4),a=e.read_shift(4),s=[],i=0,o=0,l=-1,c={},i=0;i!=a;++i){var f=e.read_shift(4),h=e.read_shift(4);s[i]=[f,h+r]}s.sort(function(e,t){return e[1]-t[1]});var u={};for(i=0;i!=a;++i){if(e.l!==s[i][1]){var d=!0;if(0<i&&t)switch(t[s[i-1][0]].t){case 2:e.l+2===s[i][1]&&(e.l+=2,d=!1);break;case 80:case 4108:e.l<=s[i][1]&&(e.l=s[i][1],d=!1)}if((!t||0==i)&&e.l<=s[i][1]&&(d=!1,e.l=s[i][1]),d)throw new Error("Read Error: Expected address "+s[i][1]+" at "+e.l+" :"+i)}if(t){var p=t[s[i][0]];if(u[p.n]=In(e,p.t,{raw:!0}),"version"===p.p&&(u[p.n]=String(u[p.n]>>16)+"."+("0000"+String(65535&u[p.n])).slice(-4)),"CodePage"==p.n)switch(u[p.n]){case 0:u[p.n]=1252;case 874:case 932:case 936:case 949:case 950:case 1250:case 1251:case 1253:case 1254:case 1255:case 1256:case 1257:case 1258:case 1e4:case 1200:case 1201:case 1252:case 65e3:case-536:case 65001:case-535:ce(o=u[p.n]>>>0&65535);break;default:throw new Error("Unsupported CodePage: "+u[p.n])}}else if(1===s[i][0]){o=u.CodePage=In(e,_r);ce(o),-1!==l&&(g=e.l,e.l=s[l][1],c=yn(e,o),e.l=g)}else if(0===s[i][0])0!==o?c=yn(e,o):(l=i,e.l=s[i+1][1]);else{var m,g=c[s[i][0]];switch(e[e.l]){case 65:e.l+=4,m=An(e);break;case 30:case 31:e.l+=4,m=kn(e,e[e.l-4]).replace(/\u0000+$/,"");break;case 3:e.l+=4,m=e.read_shift(4,"i");break;case 19:e.l+=4,m=e.read_shift(4);break;case 5:e.l+=4,m=e.read_shift(8,"f");break;case 11:e.l+=4,m=Ln(e,4);break;case 64:e.l+=4,m=le(wn(e));break;default:throw new Error("unparsed value: "+e[e.l])}u[g]=m}}return e.l=r+n,u}var Dn=["CodePage","Thumbnail","_PID_LINKBASE","_PID_HLINKS","SystemIdentifier","FMTID"].concat(["Worksheets","SheetNames","NamedRanges","DefinedNames","Chartsheets","ChartNames"]);function On(e,t,r){var n,a,s,i,o=Nt(8),l=[],c=[],f=8,h=0,u=Nt(8),d=Nt(8);if(u.write_shift(4,2),u.write_shift(4,1200),d.write_shift(4,1),c.push(u),l.push(d),f+=8+u.length,!t){(d=Nt(8)).write_shift(4,0),l.unshift(d);var p=[Nt(4)];for(p[0].write_shift(4,e.length),h=0;h<e.length;++h){var m=e[h][0];for((u=Nt(8+2*(m.length+1)+(m.length%2?0:2))).write_shift(4,h+2),u.write_shift(4,m.length+1),u.write_shift(0,m,"dbcs");u.l!=u.length;)u.write_shift(1,0);p.push(u)}u=he(p),c.unshift(u),f+=8+u.length}for(h=0;h<e.length;++h)t&&!t[e[h][0]]||-1<Dn.indexOf(e[h][0])||null!=e[h][1]&&(s=e[h][1],n=0,u=t?("version"==(i=r[n=+t[e[h][0]]]).p&&"string"==typeof s&&(s=(+(a=s.split("."))[0]<<16)+(+a[1]||0)),Rn(i.t,s)):(-1==(i=function(e){switch(typeof e){case"boolean":return 11;case"number":return(0|e)==e?3:5;case"string":return 31;case"object":if(e instanceof Date)return 64}return-1}(s))&&(i=31,s=String(s)),Rn(i,s)),c.push(u),(d=Nt(8)).write_shift(4,t?n:2+h),l.push(d),f+=8+u.length);for(var g=8*(c.length+1),h=0;h<c.length;++h)l[h].write_shift(4,g),g+=c[h].length;return o.write_shift(4,f),o.write_shift(4,c.length),he([o].concat(l).concat(c))}function Pn(e,t,r){var n=e.content;if(!n)return{};Ot(n,0);var a,s=0;n.chk("feff","Byte Order: "),n.read_shift(2);var i=n.read_shift(4),o=n.read_shift(16);if(o!==oe.utils.consts.HEADER_CLSID&&o!==r)throw new Error("Bad PropertySet CLSID "+o);if(1!==(e=n.read_shift(4))&&2!==e)throw new Error("Unrecognized #Sets: "+e);if(r=n.read_shift(16),o=n.read_shift(4),1===e&&o!==n.l)throw new Error("Length mismatch: "+o+" !== "+n.l);2===e&&(a=n.read_shift(16),s=n.read_shift(4));var l,c,f=Fn(n,t),h={SystemIdentifier:i};for(l in f)h[l]=f[l];if(h.FMTID=r,1===e)return h;if(s-n.l==2&&(n.l+=2),n.l!==s)throw new Error("Length mismatch 2: "+n.l+" !== "+s);try{c=Fn(n,null)}catch(e){}for(l in c)h[l]=c[l];return h.FMTID=[r,a],h}function Nn(e,t,r,n,a,s){var i=Nt(a?68:48),o=[i];i.write_shift(2,65534),i.write_shift(2,0),i.write_shift(4,842412599),i.write_shift(16,oe.utils.consts.HEADER_CLSID,"hex"),i.write_shift(4,a?2:1),i.write_shift(16,t,"hex"),i.write_shift(4,a?68:48);n=On(e,r,n);return o.push(n),a&&(a=On(a,null,null),i.write_shift(16,s,"hex"),i.write_shift(4,68+n.length),o.push(a)),he(o)}function Mn(e,t){return e.read_shift(t),null}function Ln(e,t){return 1===e.read_shift(t)}function Un(e,t){return(t=t||Nt(2)).write_shift(2,+!!e),t}function Hn(e){return e.read_shift(2,"u")}function Wn(e,t){return(t=t||Nt(2)).write_shift(2,e),t}function Vn(e,t){return function(e,t,r){for(var n=[],a=e.l+t;e.l<a;)n.push(r(e,a-e.l));if(a!==e.l)throw new Error("Slurp error");return n}(e,t,Hn)}function Xn(e,t,r){var n=e.read_shift(r&&12<=r.biff?2:1),a="sbcs-cont",s=f;r&&8<=r.biff&&(f=1200),r&&8!=r.biff?12==r.biff&&(a="wstr"):e.read_shift(1)&&(a="dbcs-cont"),2<=r.biff&&r.biff<=5&&(a="cpstr");a=n?e.read_shift(n,a):"";return f=s,a}function Gn(e,t,r){if(r){if(2<=r.biff&&r.biff<=5)return e.read_shift(t,"cpstr");if(12<=r.biff)return e.read_shift(t,"dbcs-cont")}return 0===e.read_shift(1)?e.read_shift(t,"sbcs-cont"):e.read_shift(t,"dbcs-cont")}function zn(e,t,r){var n=e.read_shift(r&&2==r.biff?1:2);return 0===n?(e.l++,""):Gn(e,n,r)}function jn(e,t,r){if(5<r.biff)return zn(e,0,r);var n=e.read_shift(1);return 0===n?(e.l++,""):e.read_shift(n,r.biff<=4||!e.lens?"cpstr":"sbcs-cont")}function $n(e,t,r){return(r=r||Nt(3+2*e.length)).write_shift(2,e.length),r.write_shift(1,1),r.write_shift(31,e,"utf16le"),r}function Kn(e){var t,r,n,a,s=e.read_shift(16);switch(s){case"e0c9ea79f9bace118c8200aa004ba90b":return r=(t=e).read_shift(4),n=t.l,a=!1,24<r&&(t.l+=r-24,"795881f43b1d7f48af2c825dc4852763"===t.read_shift(16)&&(a=!0),t.l=n),r=t.read_shift((a?r-24:r)>>1,"utf16le").replace(ee,""),a&&(t.l+=24),r;case"0303000000000000c000000000000046":return function(e){e.l+=2;var t=e.read_shift(0,"lpstr-ansi");if(e.l+=2,57005!=e.read_shift(2))throw new Error("Bad FileMoniker");if(0===e.read_shift(4))return t.replace(/\\/g,"/");if(t=e.read_shift(4),3!=e.read_shift(2))throw new Error("Bad FileMoniker");return e.read_shift(t>>1,"utf16le").replace(ee,"")}(e);default:throw new Error("Unsupported Moniker "+s)}}function Yn(e){var t=e.read_shift(4);return 0<t?e.read_shift(t,"utf16le").replace(ee,""):""}function Qn(e){return[e.read_shift(1),e.read_shift(1),e.read_shift(1),e.read_shift(1)]}function Jn(e){e=Qn(e);return e[3]=0,e}function qn(e){return{r:e.read_shift(2),c:e.read_shift(2),ixfe:e.read_shift(2)}}function Zn(e,t,r,n){return(n=n||Nt(6)).write_shift(2,e),n.write_shift(2,t),n.write_shift(2,r||0),n}function ea(e){return[e.read_shift(2),Er(e)]}function ta(e){var t=e.read_shift(2),r=e.read_shift(2);return{s:{c:e.read_shift(2),r:t},e:{c:e.read_shift(2),r:r}}}function ra(e,t){return(t=t||Nt(8)).write_shift(2,e.s.r),t.write_shift(2,e.e.r),t.write_shift(2,e.s.c),t.write_shift(2,e.e.c),t}function na(e){var t=e.read_shift(2),r=e.read_shift(2);return{s:{c:e.read_shift(1),r:t},e:{c:e.read_shift(1),r:r}}}var aa=na;function sa(e){e.l+=4;var t=e.read_shift(2),r=e.read_shift(2),n=e.read_shift(2);return e.l+=12,[r,t,n]}function ia(e){e.l+=2,e.l+=e.read_shift(2)}var oa={0:ia,4:ia,5:ia,6:ia,7:function(e){return e.l+=4,e.cf=e.read_shift(2),{}},8:ia,9:ia,10:ia,11:ia,12:ia,13:function(e){var t={};return e.l+=4,e.l+=16,t.fSharedNote=e.read_shift(2),e.l+=4,t},14:ia,15:ia,16:ia,17:ia,18:ia,19:ia,20:ia,21:sa};function la(e,t){var r={BIFFVer:0,dt:0};switch(r.BIFFVer=e.read_shift(2),2<=(t-=2)&&(r.dt=e.read_shift(2),e.l-=2),r.BIFFVer){case 1536:case 1280:case 1024:case 768:case 512:case 2:case 7:break;default:if(6<t)throw new Error("Unexpected BIFF Ver "+r.BIFFVer)}return e.read_shift(t),r}function ca(e,t,r){var n=1536,a=16;switch(r.bookType){case"biff8":break;case"biff5":n=1280,a=8;break;case"biff4":n=4,a=6;break;case"biff3":n=3,a=6;break;case"biff2":n=2,a=4;break;case"xla":break;default:throw new Error("unsupported BIFF version")}r=Nt(a);return r.write_shift(2,n),r.write_shift(2,t),4<a&&r.write_shift(2,29282),6<a&&r.write_shift(2,1997),8<a&&(r.write_shift(2,49161),r.write_shift(2,1),r.write_shift(2,1798),r.write_shift(2,0)),r}function fa(e){var t=Nt(8);t.write_shift(4,e.Count),t.write_shift(4,e.Unique);for(var r,n,a,s=[],i=0;i<e.length;++i)s[i]=(r=e[i],a=n=void 0,n=r.t||"",(a=Nt(3)).write_shift(2,n.length),a.write_shift(1,1),(r=Nt(2*n.length)).write_shift(2*n.length,n,"utf16le"),he([a,r]));var o=he([t].concat(s));return o.parts=[t.length].concat(s.map(function(e){return e.length})),o}function ha(e,t,r){var n=0;r&&2==r.biff||(n=e.read_shift(2));e=e.read_shift(2);return r&&2==r.biff&&(n=1-(e>>15),e&=32767),[{Unsynced:1&n,DyZero:(2&n)>>1,ExAsc:(4&n)>>2,ExDsc:(8&n)>>3},e]}var ua=jn;function da(e,t,r){var n=e.l+t,a=8!=r.biff&&r.biff?2:4,s=e.read_shift(a),t=e.read_shift(a),r=e.read_shift(2),a=e.read_shift(2);return e.l=n,{s:{r:s,c:r},e:{r:t,c:a}}}function pa(e,t,r,n){r=r&&5==r.biff;return(n=n||Nt(r?16:20)).write_shift(2,0),e.style?(n.write_shift(2,e.numFmtId||0),n.write_shift(2,65524)):(n.write_shift(2,e.numFmtId||0),n.write_shift(2,t<<4)),n.write_shift(4,0),n.write_shift(4,0),r||n.write_shift(4,0),n.write_shift(2,0),n}function ma(e,t,r){var n=qn(e);2==r.biff&&++e.l;e=(r=e).read_shift(1),e=1===r.read_shift(1)?e:1===e;return n.val=e,n.t=!0===e||!1===e?"b":"e",n}function ga(e,t,r,n,a,s){var i=Nt(8);return Zn(e,t,n,i),n=r,r=s,(s=(s=i)||Nt(2)).write_shift(1,+n),s.write_shift(1,"e"==r?1:0),i}function ba(e,t,r){return 0===t?"":jn(e,0,r)}function va(e,t,r){var n,a=e.read_shift(2),a={fBuiltIn:1&a,fWantAdvise:a>>>1&1,fWantPict:a>>>2&1,fOle:a>>>3&1,fOleLink:a>>>4&1,cf:a>>>5&1023,fIcon:a>>>15&1};return 14849===r.sbcch&&(n=function(e,t,r){e.l+=4,t-=4;var n=e.l+t,t=Xn(e,0,r);if((r=e.read_shift(2))!==(n-=e.l))throw new Error("Malformed AddinUdf: padding = "+n+" != "+r);return e.l+=r,t}(e,t-2,r)),a.body=n||e.read_shift(t-2),"string"==typeof n&&(a.Name=n),a}var Ea=["_xlnm.Consolidate_Area","_xlnm.Auto_Open","_xlnm.Auto_Close","_xlnm.Extract","_xlnm.Database","_xlnm.Criteria","_xlnm.Print_Area","_xlnm.Print_Titles","_xlnm.Recorder","_xlnm.Data_Form","_xlnm.Auto_Activate","_xlnm.Auto_Deactivate","_xlnm.Sheet_Title","_xlnm._FilterDatabase"];function Sa(e,t,r){var n=e.l+t,a=e.read_shift(2),s=e.read_shift(1),i=e.read_shift(1),o=e.read_shift(r&&2==r.biff?1:2),t=0;(!r||5<=r.biff)&&(5!=r.biff&&(e.l+=2),t=e.read_shift(2),5==r.biff&&(e.l+=2),e.l+=4);i=Gn(e,i,r);32&a&&(i=Ea[i.charCodeAt(0)]);a=n-e.l;return r&&2==r.biff&&--a,{chKey:s,Name:i,itab:t,rgce:n==e.l||0===o?[]:function(e,t,r,n){var a,t=e.l+t,n=Oo(e,n,r);t!==e.l&&(a=Do(e,t-e.l,n,r));return[n,a]}(e,a,r,o)}}function wa(e,t,r){if(r.biff<8)return function(e,t){3==e[e.l+1]&&e[e.l]++;t=Xn(e,0,t);return 3==t.charCodeAt(0)?t.slice(1):t}(e,r);for(var n,a,s=[],t=e.l+t,i=e.read_shift(8<r.biff?4:2);0!=i--;)s.push((n=e,r.biff,a=8<(a=r).biff?4:2,[n.read_shift(a),n.read_shift(a,"i"),n.read_shift(a,"i")]));if(e.l!=t)throw new Error("Bad ExternSheet: "+e.l+" != "+t);return s}function Ca(e,t,r){var n=aa(e,6);switch(r.biff){case 2:e.l++,t-=7;break;case 3:case 4:e.l+=2,t-=8;break;default:e.l+=6,t-=12}return[n,function(e,t,r){var n,a=e.l+t,s=2==r.biff?1:2,i=e.read_shift(s);if(65535==i)return[[],Pt(e,t-2)];var o=Oo(e,i,r);t!==i+s&&(n=Do(e,t-i-s,o,r));return e.l=a,[o,n]}(e,t,r)]}var Ba=[];function Ta(e){var t=Nt(24),r=Kt(e[0]);t.write_shift(2,r.r),t.write_shift(2,r.r),t.write_shift(2,r.c),t.write_shift(2,r.c);for(var n="d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "),a=0;a<16;++a)t.write_shift(1,parseInt(n[a],16));return he([t,function(e){var t=Nt(512),r=0,n=e.Target,a=-1<n.indexOf("#")?31:23;switch(n.charAt(0)){case"#":a=28;break;case".":a&=-3}t.write_shift(4,2),t.write_shift(4,a);for(var s=[8,6815827,6619237,4849780,83],r=0;r<s.length;++r)t.write_shift(4,s[r]);if(28==a){for(n=n.slice(1),t.write_shift(4,n.length+1),r=0;r<n.length;++r)t.write_shift(2,n.charCodeAt(r));t.write_shift(2,0)}else if(2&a){for(s="e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "),r=0;r<s.length;++r)t.write_shift(1,parseInt(s[r],16));for(t.write_shift(4,2*(n.length+1)),r=0;r<n.length;++r)t.write_shift(2,n.charCodeAt(r));t.write_shift(2,0)}else{for(s="03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "),r=0;r<s.length;++r)t.write_shift(1,parseInt(s[r],16));for(var i=0;"../"==n.slice(3*i,3*i+3)||"..\\"==n.slice(3*i,3*i+3);)++i;for(t.write_shift(2,i),t.write_shift(4,n.length+1),r=0;r<n.length;++r)t.write_shift(1,255&n.charCodeAt(r));for(t.write_shift(1,0),t.write_shift(2,65535),t.write_shift(2,57005),r=0;r<6;++r)t.write_shift(4,0)}return t.slice(0,t.l)}(e[1])])}function ka(e,t,r){if(!r.cellStyles)return Pt(e,t);var n=r&&12<=r.biff?4:2,a=e.read_shift(n),s=e.read_shift(n),i=e.read_shift(n),o=e.read_shift(n),t=e.read_shift(2);2==n&&(e.l+=2);o={s:a,e:s,w:i,ixfe:o,flags:t};return(5<=r.biff||!r.biff)&&(o.level=t>>8&7),o}Ba[8]=function(e,t){var r=e.l+t;e.l+=10;var n=e.read_shift(2);e.l+=4,e.l+=2,e.l+=2,e.l+=2,e.l+=4;t=e.read_shift(1);return e.l+=t,e.l=r,{fmt:n}};var xa=qn,_a=Vn,ya=zn;var Aa,Ia,Ra,Fa=(Aa={1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127,8:865,9:437,10:850,11:437,13:437,14:850,15:437,16:850,17:437,18:850,19:932,20:850,21:437,22:850,23:865,24:437,25:437,26:850,27:437,28:863,29:850,31:852,34:852,35:852,36:860,37:850,38:866,55:850,64:852,77:936,78:949,79:950,80:874,87:1252,88:1252,89:1252,255:16969},Ia=C({1:437,2:850,3:1252,4:1e4,100:852,101:866,102:865,103:861,104:895,105:620,106:737,107:857,120:950,121:949,122:936,123:932,124:874,125:1255,126:1256,150:10007,151:10029,152:10006,200:1250,201:1251,202:1254,203:1253,0:20127}),Ra={B:8,C:250,L:1,D:8,"?":0,"":0},{versions:[2,3,48,49,131,139,140,245],to_workbook:function(e,t){try{return tr(Da(e,t),t)}catch(e){if(t&&t.WTF)throw e}return{SheetNames:[],Sheets:{}}},to_sheet:Da,from_sheet:function(e,t){if(0<=+(t=t||{}).codepage&&ce(+t.codepage),"string"==t.type)throw new Error("Cannot write DBF to JS string");for(var r=Lt(),n=(t=qf(e,{header:1,raw:!0,cellDates:!0}))[0],a=t.slice(1),s=0,i=0,o=0,l=1,s=0;s<n.length;++s)if(null!=s){if(++o,"number"==typeof n[s]&&(n[s]=n[s].toString(10)),"string"!=typeof n[s])throw new Error("DBF Invalid column name "+n[s]+" |"+typeof n[s]+"|");if(n.indexOf(n[s])!==s)for(i=0;i<1024;++i)if(-1==n.indexOf(n[s]+"_"+i)){n[s]+="_"+i;break}}var c=qt(e["!ref"]),f=[];for(s=0;s<=c.e.c-c.s.c;++s){var h=[];for(i=0;i<a.length;++i)null!=a[i][s]&&h.push(a[i][s]);if(0!=h.length&&null!=n[s]){for(var u="",d="",i=0;i<h.length;++i){switch(typeof h[i]){case"number":d="B";break;case"string":d="C";break;case"boolean":d="L";break;case"object":d=h[i]instanceof Date?"D":"C";break;default:d="C"}if("C"==(u=u&&u!=d?"C":d))break}l+=Ra[u]||0,f[s]=u}else f[s]="?"}var p,m,g=r.next(32);for(g.write_shift(4,318902576),g.write_shift(4,a.length),g.write_shift(2,296+32*o),g.write_shift(2,l),s=0;s<4;++s)g.write_shift(4,0);for(g.write_shift(4,0|(+Ia[S]||3)<<8),i=s=0;s<n.length;++s)null!=n[s]&&(p=r.next(32),m=(n[s].slice(-10)+"\0\0\0\0\0\0\0\0\0\0\0").slice(0,11),p.write_shift(1,m,"sbcs"),p.write_shift(1,"?"==f[s]?"C":f[s],"sbcs"),p.write_shift(4,i),p.write_shift(1,Ra[f[s]]||0),p.write_shift(1,0),p.write_shift(1,2),p.write_shift(4,0),p.write_shift(1,0),p.write_shift(4,0),p.write_shift(4,0),i+=Ra[f[s]]||0);var b=r.next(264);for(b.write_shift(4,13),s=0;s<65;++s)b.write_shift(4,0);for(s=0;s<a.length;++s){var v=r.next(l);for(v.write_shift(1,0),i=0;i<n.length;++i)if(null!=n[i])switch(f[i]){case"L":v.write_shift(1,null==a[s][i]?63:a[s][i]?84:70);break;case"B":v.write_shift(8,a[s][i]||0,"f");break;case"D":a[s][i]?(v.write_shift(4,("0000"+a[s][i].getFullYear()).slice(-4),"sbcs"),v.write_shift(2,("00"+(a[s][i].getMonth()+1)).slice(-2),"sbcs"),v.write_shift(2,("00"+a[s][i].getDate()).slice(-2),"sbcs")):v.write_shift(8,"00000000","sbcs");break;case"C":var E=String(a[s][i]||"");for(v.write_shift(1,E,"sbcs"),o=0;o<250-E.length;++o)v.write_shift(1,32)}}return r.next(1).write_shift(1,26),r.end()}});function Da(e,t){t=t||{};return t.dateNF||(t.dateNF="yyyymmdd"),nr(function(e,t){var r=[],n=J(1);switch(t.type){case"base64":n=Z(Y.decode(e));break;case"binary":n=Z(e);break;case"buffer":case"array":n=e}Ot(n,0);var a=n.read_shift(1),s=!1,i=!1,o=!1;switch(a){case 2:case 3:break;case 48:s=i=!0;break;case 49:i=!0;break;case 131:case 139:s=!0;break;case 140:o=s=!0;break;case 245:s=!0;break;default:throw new Error("DBF Unsupported Version: "+a.toString(16))}var l=0,c=0;2==a&&(l=n.read_shift(2)),n.l+=3,2!=a&&(l=n.read_shift(4)),2!=a&&(c=n.read_shift(2));var f=n.read_shift(2),h=1252;2!=a&&(n.l+=16,n.read_shift(1),0!==n[n.l]&&(h=Aa[n[n.l]]),n.l+=1,n.l+=2),o&&(n.l+=36);for(var u=[],d={},p=c-10-(i?264:0),m=o?32:11;2==a?n.l<n.length&&13!=n[n.l]:n.l<p;)switch((d={}).name=cptable.utils.decode(h,n.slice(n.l,n.l+m)).replace(/[\u0000\r\n].*$/g,""),n.l+=m,d.type=String.fromCharCode(n.read_shift(1)),2==a||o||(d.offset=n.read_shift(4)),d.len=n.read_shift(1),2==a&&(d.offset=n.read_shift(2)),d.dec=n.read_shift(1),d.name.length&&u.push(d),2!=a&&(n.l+=o?13:14),d.type){case"B":i&&8==d.len||!t.WTF||console.log("Skipping "+d.name+":"+d.type);break;case"G":case"P":t.WTF&&console.log("Skipping "+d.name+":"+d.type);break;case"C":case"D":case"F":case"I":case"L":case"M":case"N":case"O":case"T":case"Y":case"0":case"@":case"+":break;default:throw new Error("Unknown Field Type: "+d.type)}if(13!==n[n.l]?n.l=c-1:2==a&&(n.l=521),2!=a){if(13!==n.read_shift(1))throw new Error("DBF Terminator not found "+n.l+" "+n[n.l]);n.l=c}var g=0,b=0;for(r[0]=[],b=0;b!=u.length;++b)r[0][b]=u[b].name;for(;0<l--;)if(42!==n[n.l])for(++n.l,r[++g]=[],b=b=0;b!=u.length;++b){var v=n.slice(n.l,n.l+u[b].len);n.l+=u[b].len,Ot(v,0);var E=cptable.utils.decode(h,v);switch(u[b].type){case"C":r[g][b]=cptable.utils.decode(h,v),r[g][b]=r[g][b].trim();break;case"D":8===E.length?r[g][b]=new Date(+E.slice(0,4),+E.slice(4,6)-1,+E.slice(6,8)):r[g][b]=E;break;case"F":r[g][b]=parseFloat(E.trim());break;case"+":case"I":r[g][b]=o?2147483648^v.read_shift(-4,"i"):v.read_shift(4,"i");break;case"L":switch(E.toUpperCase()){case"Y":case"T":r[g][b]=!0;break;case"N":case"F":r[g][b]=!1;break;case" ":case"?":r[g][b]=!1;break;default:throw new Error("DBF Unrecognized L:|"+E+"|")}break;case"M":if(!s)throw new Error("DBF Unexpected MEMO for type "+a.toString(16));r[g][b]="##MEMO##"+(o?parseInt(E.trim(),10):v.read_shift(4));break;case"N":r[g][b]=+E.replace(/\u0000/g,"").trim();break;case"@":r[g][b]=new Date(v.read_shift(-8,"f")-621356832e5);break;case"T":r[g][b]=new Date(864e5*(v.read_shift(4)-2440588)+v.read_shift(4));break;case"Y":r[g][b]=v.read_shift(4,"i")/1e4;break;case"O":r[g][b]=-v.read_shift(-8,"f");break;case"B":if(i&&8==u[b].len){r[g][b]=v.read_shift(8,"f");break}case"G":case"P":v.l+=u[b].len;break;case"0":if("_NullFlags"===u[b].name)break;default:throw new Error("DBF Unsupported data type "+u[b].type)}}else n.l+=f;if(2!=a&&n.l<n.length&&26!=n[n.l++])throw new Error("DBF EOF Marker missing "+(n.l-1)+" of "+n.length+" "+n[n.l-1].toString(16));return r=t&&t.sheetRows?r.slice(0,t.sheetRows):r}(e,t),t)}var Oa,Pa,Na,Ma,La=(Oa={AA:"À",BA:"Á",CA:"Â",DA:195,HA:"Ä",JA:197,AE:"È",BE:"É",CE:"Ê",HE:"Ë",AI:"Ì",BI:"Í",CI:"Î",HI:"Ï",AO:"Ò",BO:"Ó",CO:"Ô",DO:213,HO:"Ö",AU:"Ù",BU:"Ú",CU:"Û",HU:"Ü",Aa:"à",Ba:"á",Ca:"â",Da:227,Ha:"ä",Ja:229,Ae:"è",Be:"é",Ce:"ê",He:"ë",Ai:"ì",Bi:"í",Ci:"î",Hi:"ï",Ao:"ò",Bo:"ó",Co:"ô",Do:245,Ho:"ö",Au:"ù",Bu:"ú",Cu:"û",Hu:"ü",KC:"Ç",Kc:"ç",q:"æ",z:"œ",a:"Æ",j:"Œ",DN:209,Dn:241,Hy:255,S:169,c:170,R:174,B:180,0:176,1:177,2:178,3:179,5:181,6:182,7:183,Q:185,k:186,b:208,i:216,l:222,s:240,y:248,"!":161,'"':162,"#":163,"(":164,"%":165,"'":167,"H ":168,"+":171,";":187,"<":188,"=":189,">":190,"?":191,"{":223},Pa=new RegExp("N("+de(Oa).join("|").replace(/\|\|\|/,"|\\||").replace(/([?()+])/g,"\\$1")+"|\\|)","gm"),Na=function(e,t){t=Oa[t];return"number"==typeof t?a(t):t},Ma=function(e,t,r){r=t.charCodeAt(0)-32<<4|r.charCodeAt(0)-48;return 59==r?e:a(r)},Oa["|"]=254,{to_workbook:function(e,t){return tr(Ha(e,t),t)},to_sheet:Ha,from_sheet:function(e,t){var r,n,a=["ID;PWXL;N;E"],s=[],i=qt(e["!ref"]),o=Array.isArray(e),l="\r\n";a.push("P;PGeneral"),a.push("F;P0;DG0G8;M255"),e["!cols"]&&(r=a,e["!cols"].forEach(function(e,t){t="F;W"+(t+1)+" "+(t+1)+" ";e.hidden?t+="0":("number"==typeof e.width&&(e.wpx=ai(e.width)),"number"==typeof e.wpx&&(e.wch=si(e.wpx)),"number"==typeof e.wch&&(t+=Math.round(e.wch)))," "!=t.charAt(t.length-1)&&r.push(t)})),e["!rows"]&&(n=a,e["!rows"].forEach(function(e,t){var r="F;";e.hidden?r+="M0;":e.hpt?r+="M"+20*e.hpt+";":e.hpx&&(r+="M"+20*hi(e.hpx)+";"),2<r.length&&n.push(r+"R"+(t+1))})),a.push("B;Y"+(i.e.r-i.s.r+1)+";X"+(i.e.c-i.s.c+1)+";D"+[i.s.c,i.s.r,i.e.c,i.e.r].join(" "));for(var c=i.s.r;c<=i.e.r;++c)for(var f=i.s.c;f<=i.e.c;++f){var h=Yt({r:c,c:f});(h=o?(e[c]||[])[f]:e[h])&&(null!=h.v||h.f&&!h.F)&&s.push(function(e,t,r){var n="C;Y"+(t+1)+";X"+(r+1)+";K";switch(e.t){case"n":n+=e.v||0,e.f&&!e.F&&(n+=";E"+io(e.f,{r:t,c:r}));break;case"b":n+=e.v?"TRUE":"FALSE";break;case"e":n+=e.w||e.v;break;case"d":n+='"'+(e.w||e.v)+'"';break;case"s":n+='"'+e.v.replace(/"/g,"")+'"'}return n}(h,c,f))}return a.join(l)+l+s.join(l)+l+"E"+l}});function Ua(e,t){var r,n,a=e.split(/[\n\r]+/),s=-1,i=-1,o=0,l=0,c=[],f=[],h=null,e={},u=[],d=[],p=0;for(0<=+t.codepage&&ce(+t.codepage);o!==a.length;++o){p=0;var m,g=a[o].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g,Ma).replace(Pa,Na),b=g.replace(/;;/g,"\0").split(";").map(function(e){return e.replace(/\u0000/g,";")}),v=b[0];if(0<g.length)switch(v){case"ID":case"E":case"B":case"O":break;case"P":"P"==b[1].charAt(0)&&f.push(g.slice(3).replace(/;;/g,";"));break;case"C":for(var E=!1,S=!1,l=1;l<b.length;++l)switch(b[l].charAt(0)){case"X":i=parseInt(b[l].slice(1))-1,S=!0;break;case"Y":for(s=parseInt(b[l].slice(1))-1,S||(i=0),n=c.length;n<=s;++n)c[n]=[];break;case"K":'"'===(m=b[l].slice(1)).charAt(0)?m=m.slice(1,m.length-1):"TRUE"===m?m=!0:"FALSE"===m?m=!1:isNaN(R(m))?isNaN(D(m).getDate())||(m=le(m)):(m=R(m),null!==h&&ue.is_date(h)&&(m=M(m))),"undefined"!=typeof cptable&&"string"==typeof m&&"string"!=(t||{}).type&&(t||{}).codepage&&(m=cptable.utils.decode(t.codepage,m)),E=!0;break;case"E":var w=no(b[l].slice(1),{r:s,c:i});c[s][i]=[c[s][i],w];break;default:if(t&&t.WTF)throw new Error("SYLK bad record "+g)}E&&(c[s][i]=m,h=null);break;case"F":var C=0;for(l=1;l<b.length;++l)switch(b[l].charAt(0)){case"X":i=parseInt(b[l].slice(1))-1,++C;break;case"Y":for(s=parseInt(b[l].slice(1))-1,n=c.length;n<=s;++n)c[n]=[];break;case"M":p=parseInt(b[l].slice(1))/20;break;case"F":case"G":break;case"P":h=f[parseInt(b[l].slice(1))];break;case"S":case"D":case"N":break;case"W":for(r=b[l].slice(1).split(" "),n=parseInt(r[0],10);n<=parseInt(r[1],10);++n)p=parseInt(r[2],10),d[n-1]=0===p?{hidden:!0}:{wch:p},ci(d[n-1]);break;case"C":d[i=parseInt(b[l].slice(1))-1]||(d[i]={});break;case"R":u[s=parseInt(b[l].slice(1))-1]||(u[s]={}),0<p?(u[s].hpt=p,u[s].hpx=ui(p)):0===p&&(u[s].hidden=!0);break;default:if(t&&t.WTF)throw new Error("SYLK bad record "+g)}C<1&&(h=null);break;default:if(t&&t.WTF)throw new Error("SYLK bad record "+g)}}return 0<u.length&&(e["!rows"]=u),0<d.length&&(e["!cols"]=d),[c=t&&t.sheetRows?c.slice(0,t.sheetRows):c,e]}function Ha(e,t){var r=function(e,t){switch(t.type){case"base64":return Ua(Y.decode(e),t);case"binary":return Ua(e,t);case"buffer":return Ua(e.toString("binary"),t);case"array":return Ua(I(e),t)}throw new Error("Unrecognized type "+t.type)}(e,t),e=r[0],n=r[1],a=nr(e,t);return de(n).forEach(function(e){a[e]=n[e]}),a}var Wa={to_workbook:function(e,t){return tr(Xa(e,t),t)},to_sheet:Xa,from_sheet:function(e){var t=[],r=qt(e["!ref"]),n=Array.isArray(e);Ga(t,"TABLE",0,1,"sheetjs"),Ga(t,"VECTORS",0,r.e.r-r.s.r+1,""),Ga(t,"TUPLES",0,r.e.c-r.s.c+1,""),Ga(t,"DATA",0,0,"");for(var a=r.s.r;a<=r.e.r;++a){za(t,-1,0,"BOT");for(var s=r.s.c;s<=r.e.c;++s){var i,o=Yt({r:a,c:s});if(i=n?(e[a]||[])[s]:e[o])switch(i.t){case"n":var l=i.w;null==(l=!l&&null!=i.v?i.v:l)?i.f&&!i.F?za(t,1,0,"="+i.f):za(t,1,0,""):za(t,0,l,"V");break;case"b":za(t,0,i.v?1:0,i.v?"TRUE":"FALSE");break;case"s":za(t,1,0,isNaN(i.v)?i.v:'="'+i.v+'"');break;case"d":i.w||(i.w=ue.format(i.z||ue._table[14],G(le(i.v)))),za(t,0,i.w,"V");break;default:za(t,1,0,"")}else za(t,1,0,"")}}za(t,-1,0,"EOD");return t.join("\r\n")}};function Va(e,t){for(var r=e.split("\n"),n=-1,a=-1,s=0,i=[];s!==r.length;++s)if("BOT"!==r[s].trim()){if(!(n<0)){var o=r[s].trim().split(","),l=o[0],c=o[1],f=r[++s].trim();switch(+l){case-1:if("BOT"===f){i[++n]=[],a=0;continue}if("EOD"!==f)throw new Error("Unrecognized DIF special command "+f);break;case 0:"TRUE"===f?i[n][a]=!0:"FALSE"===f?i[n][a]=!1:isNaN(R(c))?isNaN(D(c).getDate())?i[n][a]=c:i[n][a]=le(c):i[n][a]=R(c),++a;break;case 1:f=f.slice(1,f.length-1),i[n][a++]=""!==f?f:null}if("EOD"===f)break}}else i[++n]=[],a=0;return i=t&&t.sheetRows?i.slice(0,t.sheetRows):i}function Xa(e,t){return nr(function(e,t){switch(t.type){case"base64":return Va(Y.decode(e),t);case"binary":return Va(e,t);case"buffer":return Va(e.toString("binary"),t);case"array":return Va(I(e),t)}throw new Error("Unrecognized type "+t.type)}(e,t),t)}function Ga(e,t,r,n,a){e.push(t),e.push(r+","+n),e.push('"'+a.replace(/"/g,'""')+'"')}function za(e,t,r,n){e.push(t+","+r),e.push(1==t?'"'+n.replace(/"/g,'""')+'"':n)}var ja,$a,Ka,Ya,Qa=(ja=["socialcalc:version:1.5","MIME-Version: 1.0","Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join("\n"),$a=["--SocialCalcSpreadsheetControlSave","Content-type: text/plain; charset=UTF-8"].join("\n")+"\n",Ka=["# SocialCalc Spreadsheet Control Save","part:sheet"].join("\n"),Ya="--SocialCalcSpreadsheetControlSave--",{to_workbook:function(e,t){return tr(qa(e,t),t)},to_sheet:qa,from_sheet:function(e){return[ja,$a,Ka,$a,function(e){if(!e||!e["!ref"])return"";for(var t,r,n=[],a=[],s=Qt(e["!ref"]),i=Array.isArray(e),o=s.s.r;o<=s.e.r;++o)for(var l=s.s.c;l<=s.e.c;++l)if(r=Yt({r:o,c:l}),(t=i?(e[o]||[])[l]:e[r])&&null!=t.v&&"z"!==t.t){switch(a=["cell",r,"t"],t.t){case"s":case"str":a.push(Ja(t.v));break;case"n":t.f?(a[2]="vtf",a[3]="n",a[4]=t.v,a[5]=Ja(t.f)):(a[2]="v",a[3]=t.v);break;case"b":a[2]="vt"+(t.f?"f":"c"),a[3]="nl",a[4]=t.v?"1":"0",a[5]=Ja(t.f||(t.v?"TRUE":"FALSE"));break;case"d":var c=G(le(t.v));a[2]="vtc",a[3]="nd",a[4]=""+c,a[5]=t.w||ue.format(t.z||ue._table[14],c);break;case"e":continue}n.push(a.join(":"))}return n.push("sheet:c:"+(s.e.c-s.s.c+1)+":r:"+(s.e.r-s.s.r+1)+":tvf:1"),n.push("valueformat:1:text-wiki"),n.join("\n")}(e),Ya].join("\n")}});function Ja(e){return e.replace(/\\/g,"\\b").replace(/:/g,"\\c").replace(/\n/g,"\\n")}function qa(e,t){return nr(function(e,t){for(var r,n=e.split("\n"),a=-1,s=0,i=[];s!==n.length;++s){var o=n[s].trim().split(":");if("cell"===o[0]){var l=Kt(o[1]);if(i.length<=l.r)for(a=i.length;a<=l.r;++a)i[a]||(i[a]=[]);switch(a=l.r,r=l.c,o[2]){case"t":i[a][r]=o[3].replace(/\\b/g,"\\").replace(/\\c/g,":").replace(/\\n/g,"\n");break;case"v":i[a][r]=+o[3];break;case"vtf":var c=o[o.length-1];case"vtc":"nl"===o[3]?i[a][r]=!!+o[4]:i[a][r]=+o[4],"vtf"==o[2]&&(i[a][r]=[i[a][r],c])}}}return i=t&&t.sheetRows?i.slice(0,t.sheetRows):i}(e,t),t)}var Za,es,ts=(Za={44:",",9:"\t",59:";"},es={44:3,9:2,59:1},{to_workbook:function(e,t){return tr(ss(e,t),t)},to_sheet:ss,from_sheet:function(e){for(var t=[],r=qt(e["!ref"]),n=Array.isArray(e),a=r.s.r;a<=r.e.r;++a){for(var s=[],i=r.s.c;i<=r.e.c;++i){var o=Yt({r:a,c:i});if((o=n?(e[a]||[])[i]:e[o])&&null!=o.v){for(var l=(o.w||(er(o),o.w)||"").slice(0,10);l.length<10;)l+=" ";s.push(l+(0===i?" ":""))}else s.push("          ")}t.push(s.join(""))}return t.join("\n")}});function rs(e,t,r,n,a){a.raw?t[r][n]=e:"TRUE"===e?t[r][n]=!0:"FALSE"===e?t[r][n]=!1:""===e||(isNaN(R(e))?isNaN(D(e).getDate())?t[r][n]=e:t[r][n]=le(e):t[r][n]=R(e))}function ns(n,e){var a=e||{},e="";null!=fe&&null==a.dense&&(a.dense=fe);var s=a.dense?[]:{},i={s:{c:0,r:0},e:{c:0,r:0}};"sep="==n.slice(0,4)?13==n.charCodeAt(5)&&10==n.charCodeAt(6)?(e=n.charAt(4),n=n.slice(7)):13!=n.charCodeAt(5)&&10!=n.charCodeAt(5)||(e=n.charAt(4),n=n.slice(6)):e=function(e){for(var t={},r=!1,n=0,a=0;n<e.length;++n)34==(a=e.charCodeAt(n))?r=!r:!r&&a in Za&&(t[a]=(t[a]||0)+1);for(n in a=[],t)Object.prototype.hasOwnProperty.call(t,n)&&a.push([t[n],n]);if(!a.length)for(n in t=es)Object.prototype.hasOwnProperty.call(t,n)&&a.push([t[n],n]);return a.sort(function(e,t){return e[0]-t[0]||es[e[1]]-es[t[1]]}),Za[a.pop()[1]]}(n.slice(0,1024));var o=0,l=0,c=0,f=0,h=0,u=e.charCodeAt(0),t=!1,d=0;n=n.replace(/\r\n/gm,"\n");var p=null!=a.dateNF?(e=(e="number"==typeof(e=a.dateNF)?ue._table[e]:e).replace(g,"(\\d+)"),new RegExp("^"+e+"$")):null;function r(){var e,t=n.slice(f,h),r={};if(0===(t='"'==t.charAt(0)&&'"'==t.charAt(t.length-1)?t.slice(1,-1).replace(/""/g,'"'):t).length?r.t="z":a.raw||0===t.trim().length?(r.t="s",r.v=t):61==t.charCodeAt(0)?34==t.charCodeAt(1)&&34==t.charCodeAt(t.length-1)?(r.t="s",r.v=t.slice(2,-1).replace(/""/g,'"')):1!=t.length?(r.t="n",r.f=t.slice(1)):(r.t="s",r.v=t):"TRUE"==t?(r.t="b",r.v=!0):"FALSE"==t?(r.t="b",r.v=!1):isNaN(c=R(t))?!isNaN(D(t).getDate())||p&&t.match(p)?(r.z=a.dateNF||ue._table[14],e=0,p&&t.match(p)&&(t=function(e,n){var a=-1,s=-1,i=-1,o=-1,l=-1,c=-1;(e.match(g)||[]).forEach(function(e,t){var r=parseInt(n[t+1],10);switch(e.toLowerCase().charAt(0)){case"y":a=r;break;case"d":i=r;break;case"h":o=r;break;case"s":c=r;break;case"m":0<=o?l=r:s=r}}),0<=c&&-1==l&&0<=s&&(l=s,s=-1);var t=(""+(0<=a?a:(new Date).getFullYear())).slice(-4)+"-"+("00"+(1<=s?s:1)).slice(-2)+"-"+("00"+(1<=i?i:1)).slice(-2);return 8==(t=7==t.length?"0"+t:t).length&&(t="20"+t),e=("00"+(0<=o?o:0)).slice(-2)+":"+("00"+(0<=l?l:0)).slice(-2)+":"+("00"+(0<=c?c:0)).slice(-2),-1==o&&-1==l&&-1==c?t:-1==a&&-1==s&&-1==i?e:t+"T"+e}(a.dateNF,t.match(p)||[]),e=1),a.cellDates?(r.t="d",r.v=le(t,e)):(r.t="n",r.v=G(le(t,e))),!1!==a.cellText&&(r.w=ue.format(r.z,r.v instanceof Date?G(r.v):r.v)),a.cellNF||delete r.z):(r.t="s",r.v=t):(!(r.t="n")!==a.cellText&&(r.w=t),r.v=c),"z"==r.t||(a.dense?(s[o]||(s[o]=[]),s[o][l]=r):s[Yt({c:l,r:o})]=r),f=h+1,i.e.c<l&&(i.e.c=l),i.e.r<o&&(i.e.r=o),d!=u)return l=0,++o,a.sheetRows&&a.sheetRows<=o?1:void 0;++l}e:for(;h<n.length;++h)switch(d=n.charCodeAt(h)){case 34:t=!t;break;case u:case 10:case 13:if(!t&&r())break e}return 0<h-f&&r(),s["!ref"]=Jt(i),s}function as(e,t){return!t||!t.PRN||"sep="==e.slice(0,4)||0<=e.indexOf("\t")||0<=e.indexOf(",")||0<=e.indexOf(";")?ns(e,t):nr(function(e,t){var r=t||{},n=[];if(!e||0===e.length)return n;for(var a=e.split(/[\r\n]/),s=a.length-1;0<=s&&0===a[s].length;)--s;for(var i=10,o=0,l=0;l<=s;++l)-1==(o=a[l].indexOf(" "))?o=a[l].length:o++,i=Math.max(i,o);for(l=0;l<=s;++l){n[l]=[];var c=0;for(rs(a[l].slice(0,i).trim(),n,l,c,r),c=1;c<=(a[l].length-i)/10+1;++c)rs(a[l].slice(i+10*(c-1),i+10*c).trim(),n,l,c,r)}return n=r.sheetRows?n.slice(0,r.sheetRows):n}(e,t),t)}function ss(e,t){var r="",n="string"==t.type?[0,0,0,0]:Uf(e,t);switch(t.type){case"base64":r=Y.decode(e);break;case"binary":r=e;break;case"buffer":r=65001==t.codepage?e.toString("utf8"):t.codepage&&"undefined"!=typeof cptable?cptable.utils.decode(t.codepage,e):e.toString("binary");break;case"array":r=I(e);break;case"string":r=e;break;default:throw new Error("Unrecognized type "+t.type)}return 239==n[0]&&187==n[1]&&191==n[2]?r=Me(r.slice(3)):"binary"==t.type&&"undefined"!=typeof cptable&&t.codepage&&(r=cptable.utils.decode(t.codepage,cptable.utils.encode(1252,r))),"socialcalc:version:"==r.slice(0,19)?Qa.to_sheet("string"==t.type?r:Me(r),t):as(r,t)}var is,os,ls=(is={0:{n:"BOF",f:Hn},1:{n:"EOF"},2:{n:"CALCMODE"},3:{n:"CALCORDER"},4:{n:"SPLIT"},5:{n:"SYNC"},6:{n:"RANGE",f:function(e){var t={s:{c:0,r:0},e:{c:0,r:0}};return t.s.c=e.read_shift(2),t.s.r=e.read_shift(2),t.e.c=e.read_shift(2),t.e.r=e.read_shift(2),65535==t.s.c&&(t.s.c=t.e.c=t.s.r=t.e.r=0),t}},7:{n:"WINDOW1"},8:{n:"COLW1"},9:{n:"WINTWO"},10:{n:"COLW2"},11:{n:"NAME"},12:{n:"BLANK"},13:{n:"INTEGER",f:function(e,t,r){return(r=fs(e,0,r))[1].v=e.read_shift(2,"i"),r}},14:{n:"NUMBER",f:function(e,t,r){return(r=fs(e,0,r))[1].v=e.read_shift(8,"f"),r}},15:{n:"LABEL",f:hs},16:{n:"FORMULA",f:function(e,t,r){var n=e.l+t;return(t=fs(e,0,r))[1].v=e.read_shift(8,"f"),r.qpro?e.l=n:(n=e.read_shift(2),e.l+=n),t}},24:{n:"TABLE"},25:{n:"ORANGE"},26:{n:"PRANGE"},27:{n:"SRANGE"},28:{n:"FRANGE"},29:{n:"KRANGE1"},32:{n:"HRANGE"},35:{n:"KRANGE2"},36:{n:"PROTEC"},37:{n:"FOOTER"},38:{n:"HEADER"},39:{n:"SETUP"},40:{n:"MARGINS"},41:{n:"LABELFMT"},42:{n:"TITLES"},43:{n:"SHEETJS"},45:{n:"GRAPH"},46:{n:"NGRAPH"},47:{n:"CALCCOUNT"},48:{n:"UNFORMATTED"},49:{n:"CURSORW12"},50:{n:"WINDOW"},51:{n:"STRING",f:hs},55:{n:"PASSWORD"},56:{n:"LOCKED"},60:{n:"QUERY"},61:{n:"QUERYNAME"},62:{n:"PRINT"},63:{n:"PRINTNAME"},64:{n:"GRAPH2"},65:{n:"GRAPHNAME"},66:{n:"ZOOM"},67:{n:"SYMSPLIT"},68:{n:"NSROWS"},69:{n:"NSCOLS"},70:{n:"RULER"},71:{n:"NNAME"},72:{n:"ACOMM"},73:{n:"AMACRO"},74:{n:"PARSE"},255:{n:"",f:Pt}},os={0:{n:"BOF"},1:{n:"EOF"},3:{n:"??"},4:{n:"??"},5:{n:"??"},6:{n:"??"},7:{n:"??"},9:{n:"??"},10:{n:"??"},11:{n:"??"},12:{n:"??"},14:{n:"??"},15:{n:"??"},16:{n:"??"},17:{n:"??"},18:{n:"??"},19:{n:"??"},21:{n:"??"},22:{n:"LABEL16",f:function(e,t){var r=us(e);return r[1].t="s",r[1].v=e.read_shift(t-4,"cstr"),r}},23:{n:"NUMBER17",f:ds},24:{n:"NUMBER18",f:function(e,t){var r=us(e);r[1].v=e.read_shift(2);var n=r[1].v>>1;if(1&r[1].v)switch(7&n){case 1:n=500*(n>>3);break;case 2:n=(n>>3)/20;break;case 4:n=(n>>3)/2e3;break;case 6:n=(n>>3)/16;break;case 7:n=(n>>3)/64;break;default:throw"unknown NUMBER_18 encoding "+(7&n)}return r[1].v=n,r}},25:{n:"FORMULA19",f:function(e,t){var r=ds(e);return e.l+=t-14,r}},26:{n:"??"},27:{n:"??"},28:{n:"??"},29:{n:"??"},30:{n:"??"},31:{n:"??"},33:{n:"??"},37:{n:"NUMBER25",f:function(e,t){var r=us(e),e=e.read_shift(4);return r[1].v=e>>6,r}},39:{n:"NUMBER27",f:ps},40:{n:"FORMULA28",f:function(e,t){var r=ps(e);return e.l+=t-10,r}},255:{n:"",f:Pt}},{to_workbook:function(e,t){switch(t.type){case"base64":return cs(Z(Y.decode(e)),t);case"binary":return cs(Z(e),t);case"buffer":case"array":return cs(e,t)}throw"Unsupported type "+t.type}});function cs(n,e){if(!n)return n;var a=e||{};null!=fe&&null==a.dense&&(a.dense=fe);var s=a.dense?[]:{},i="Sheet1",o=0,l={},c=[i],f={s:{r:0,c:0},e:{r:0,c:0}},h=a.sheetRows||0;if(2==n[2])a.Enum=is;else if(26==n[2])a.Enum=os;else{if(14!=n[2])throw new Error("Unrecognized LOTUS BOF "+n[2]);a.Enum=os,a.qpro=!0,n.l=0}return function(e,t,r){if(e){Ot(e,e.l||0);for(var n=r.Enum||is;e.l<e.length;){var a=e.read_shift(2),s=n[a]||n[255],i=e.read_shift(2),o=e.l+i,i=(s.f||Pt)(e,i,r);if(e.l=o,t(i,s.n,a))return}}}(n,function(e,t,r){if(2==n[2])switch(r){case 0:4096<=(a.vers=e)&&(a.qpro=!0);break;case 6:f=e;break;case 15:a.qpro||(e[1].v=e[1].v.slice(1));case 13:case 14:case 16:case 51:14==r&&112==(112&e[2])&&1<(15&e[2])&&(15&e[2])<15&&(e[1].z=a.dateNF||ue._table[14],a.cellDates&&(e[1].t="d",e[1].v=M(e[1].v))),a.dense?(s[e[0].r]||(s[e[0].r]=[]),s[e[0].r][e[0].c]=e[1]):s[Yt(e[0])]=e[1]}else switch(r){case 22:e[1].v=e[1].v.slice(1);case 23:case 24:case 25:case 37:case 39:case 40:if(e[3]>o&&(s["!ref"]=Jt(f),l[i]=s,s=a.dense?[]:{},f={s:{r:0,c:0},e:{r:0,c:0}},o=e[3],i="Sheet"+(o+1),c.push(i)),0<h&&e[0].r>=h)break;a.dense?(s[e[0].r]||(s[e[0].r]=[]),s[e[0].r][e[0].c]=e[1]):s[Yt(e[0])]=e[1],f.e.c<e[0].c&&(f.e.c=e[0].c),f.e.r<e[0].r&&(f.e.r=e[0].r)}},a),s["!ref"]=Jt(f),l[i]=s,{SheetNames:c,Sheets:l}}function fs(e,t,r){var n=[{c:0,r:0},{t:"n",v:0},0];return r.qpro&&20768!=r.vers?(n[0].c=e.read_shift(1),e.l++,n[0].r=e.read_shift(2),e.l+=2):(n[2]=e.read_shift(1),n[0].c=e.read_shift(2),n[0].r=e.read_shift(2)),n}function hs(e,t,r){var n=e.l+t,t=fs(e,0,r);if(t[1].t="s",20768!=r.vers)return r.qpro&&e.l++,t[1].v=e.read_shift(n-e.l,"cstr"),t;e.l++;n=e.read_shift(1);return t[1].v=e.read_shift(n,"utf8"),t}function us(e){var t=[{c:0,r:0},{t:"n",v:0},0];return t[0].r=e.read_shift(2),t[3]=e[e.l++],t[0].c=e[e.l++],t}function ds(e,t){var r=us(e),n=e.read_shift(4),a=e.read_shift(4);if(65535==(s=e.read_shift(2)))return r[1].v=0,r;var e=32768&s,s=(32767&s)-16446;return r[1].v=(2*e-1)*((0<s?a<<s:a>>>-s)+(-32<s?n<<32+s:n>>>-(32+s))),r}function ps(e,t){var r=us(e),e=e.read_shift(8,"f");return r[1].v=e,r}var ms,gs,bs,vs,Es=(ms=Ve("t"),gs=Ve("rPr"),bs=/<(?:\w+:)?r>/g,vs=/<\/(?:\w+:)?r>/,function(e){return e.replace(bs,"").split(vs).map(Ss).filter(function(e){return e.v})});function Ss(e){var t=e.match(ms);if(!t)return{t:"s",v:""};t={t:"s",v:ke(t[1])},e=e.match(gs);return e&&(t.s=function(e){var t={},r=e.match(ge),n=0,a=!1;if(r)for(;n!=r.length;++n){var s=Ee(r[n]);switch(s[0].replace(/\w*:/g,"")){case"<condense":case"<extend":break;case"<shadow":if(!s.val)break;case"<shadow>":case"<shadow/>":t.shadow=1;break;case"</shadow>":break;case"<charset":if("1"==s.val)break;t.cp=c[parseInt(s.val,10)];break;case"<outline":if(!s.val)break;case"<outline>":case"<outline/>":t.outline=1;break;case"</outline>":break;case"<rFont":t.name=s.val;break;case"<sz":t.sz=s.val;break;case"<strike":if(!s.val)break;case"<strike>":case"<strike/>":t.strike=1;break;case"</strike>":break;case"<u":if(!s.val)break;switch(s.val){case"double":t.uval="double";break;case"singleAccounting":t.uval="single-accounting";break;case"doubleAccounting":t.uval="double-accounting"}case"<u>":case"<u/>":t.u=1;break;case"</u>":break;case"<b":if("0"==s.val)break;case"<b>":case"<b/>":t.b=1;break;case"</b>":break;case"<i":if("0"==s.val)break;case"<i>":case"<i/>":t.i=1;break;case"</i>":break;case"<color":s.rgb&&(t.color=s.rgb.slice(2,8));break;case"<family":t.family=s.val;break;case"<vertAlign":t.valign=s.val;break;case"<scheme":break;case"<extLst":case"<extLst>":case"</extLst>":break;case"<ext":a=!0;break;case"</ext>":a=!1;break;default:if(47!==s[0].charCodeAt(1)&&!a)throw new Error("Unrecognized rich format "+s[0])}}return t}(e[1])),t}var ws,Cs=(ws=/(\r\n|\n)/g,function(e){return e.map(Bs).join("")});function Bs(e){var t,r,n,a=[[],e.v,[]];return e.v?(e.s&&(t=e.s,r=a[0],n=a[2],e=[],t.u&&e.push("text-decoration: underline;"),t.uval&&e.push("text-underline-style:"+t.uval+";"),t.sz&&e.push("font-size:"+t.sz+"pt;"),t.outline&&e.push("text-effect: outline;"),t.shadow&&e.push("text-shadow: auto;"),r.push('<span style="'+e.join("")+'">'),t.b&&(r.push("<b>"),n.push("</b>")),t.i&&(r.push("<i>"),n.push("</i>")),t.strike&&(r.push("<s>"),n.push("</s>")),"superscript"==(e=t.valign||"")||"super"==e?e="sup":"subscript"==e&&(e="sub"),""!=e&&(r.push("<"+e+">"),n.push("</"+e+">")),n.push("</span>")),a[0].join("")+a[1].replace(ws,"<br/>")+a[2].join("")):""}var Ts=/<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,ks=/<(?:\w+:)?r>/,xs=/<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;function _s(e,t){var r=!t||t.cellHTML,t={};return e?(e.match(/^\s*<(?:\w+:)?t[^>]*>/)?(t.t=ke(Me(e.slice(e.indexOf(">")+1).split(/<\/(?:\w+:)?t>/)[0]||"")),t.r=Me(e),r&&(t.h=Re(t.t))):e.match(ks)&&(t.r=Me(e),t.t=ke(Me((e.replace(xs,"").match(Ts)||[]).join("").replace(ge,""))),r&&(t.h=Cs(Es(t.r)))),t):{t:""}}var ys=/<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/,As=/<(?:\w+:)?(?:si|sstItem)>/g,Is=/<\/(?:\w+:)?(?:si|sstItem)>/;Qr.SST="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";var Rs=/^\s|\s$|[\t\n\r]/;var Fs=function(e,t){var r=!1;return null==t&&(r=!0,t=Nt(15+4*e.t.length)),t.write_shift(1,0),ir(e.t,t),r?t.slice(0,t.l):t};function Ds(e){var t,r,n=Lt();Ut(n,"BrtBeginSst",(t=e,(r=r||Nt(8)).write_shift(4,t.Count),r.write_shift(4,t.Unique),r));for(var a=0;a<e.length;++a)Ut(n,"BrtSSTItem",Fs(e[a]));return Ut(n,"BrtEndSst"),n.end()}function Os(e){if("undefined"!=typeof cptable)return cptable.utils.encode(S,e);for(var t=[],r=e.split(""),n=0;n<r.length;++n)t[n]=r[n].charCodeAt(0);return t}function Ps(e,t){var r={};return r.Major=e.read_shift(2),r.Minor=e.read_shift(2),4<=t&&(e.l+=t-4),r}function Ns(e){var t=[];e.l+=4;for(var r=e.read_shift(4);0<r--;)t.push(function(e){for(var t=e.read_shift(4),r=e.l+t-4,t={},n=e.read_shift(4),a=[];0<n--;)a.push({t:e.read_shift(4),v:e.read_shift(0,"lpp4")});if(t.name=e.read_shift(0,"lpp4"),t.comps=a,e.l!=r)throw new Error("Bad DataSpaceMapEntry: "+e.l+" != "+r);return t}(e));return t}function Ms(e){var t,r,r=(r={},(t=e).read_shift(4),t.l+=4,r.id=t.read_shift(0,"lpp4"),r.name=t.read_shift(0,"lpp4"),r.R=Ps(t,4),r.U=Ps(t,4),r.W=Ps(t,4),r);if(r.ename=e.read_shift(0,"8lpp4"),r.blksz=e.read_shift(4),r.cmode=e.read_shift(4),4!=e.read_shift(4))throw new Error("Bad !Primary record");return r}function Ls(e,t){var t=e.l+t,r={};r.Flags=63&e.read_shift(4),e.l+=4,r.AlgID=e.read_shift(4);var n=!1;switch(r.AlgID){case 26126:case 26127:case 26128:n=36==r.Flags;break;case 26625:n=4==r.Flags;break;case 0:n=16==r.Flags||4==r.Flags||36==r.Flags;break;default:throw"Unrecognized encryption algorithm: "+r.AlgID}if(!n)throw new Error("Encryption Flags/AlgID mismatch");return r.AlgIDHash=e.read_shift(4),r.KeySize=e.read_shift(4),r.ProviderType=e.read_shift(4),e.l+=8,r.CSPName=e.read_shift(t-e.l>>1,"utf16le"),e.l=t,r}function Us(e,t){var r={},t=e.l+t;return e.l+=4,r.Salt=e.slice(e.l,e.l+16),e.l+=16,r.Verifier=e.slice(e.l,e.l+16),e.l+=16,e.read_shift(4),r.VerifierHash=e.slice(e.l,t),e.l=t,r}function Hs(e){var t=Ps(e);switch(t.Minor){case 2:return[t.Minor,function(e){if(36!=(63&e.read_shift(4)))throw new Error("EncryptionInfo mismatch");var t=e.read_shift(4),t=Ls(e,t),e=Us(e,e.length-e.l);return{t:"Std",h:t,v:e}}(e)];case 3:return[t.Minor,function(){throw new Error("File is password-protected: ECMA-376 Extensible")}()];case 4:return[t.Minor,function(e){var r=["saltSize","blockSize","keyBits","hashSize","cipherAlgorithm","cipherChaining","hashAlgorithm","saltValue"];e.l+=4;var e=e.read_shift(e.length-e.l,"utf8"),n={};return e.replace(ge,function(e){var t=Ee(e);switch(Se(t[0])){case"<?xml":break;case"<encryption":case"</encryption>":break;case"<keyData":r.forEach(function(e){n[e]=t[e]});break;case"<dataIntegrity":n.encryptedHmacKey=t.encryptedHmacKey,n.encryptedHmacValue=t.encryptedHmacValue;break;case"<keyEncryptors>":case"<keyEncryptors":n.encs=[];break;case"</keyEncryptors>":break;case"<keyEncryptor":n.uri=t.uri;break;case"</keyEncryptor>":break;case"<encryptedKey":n.encs.push(t);break;default:throw t[0]}}),n}(e)]}throw new Error("ECMA-376 Encrypted file unrecognized Version: "+t.Minor)}function Ws(e){var t,r=0,n=Os(e),a=n.length+1,s=J(a);for(s[0]=n.length,t=1;t!=a;++t)s[t]=n[t-1];for(t=a-1;0<=t;--t)r=((0==(16384&r)?0:1)|r<<1&32767)^s[t];return 52811^r}var Vs,Xs,Gs,zs=(Vs=[187,255,255,186,255,255,185,128,0,190,15,0,191,15,0],Xs=[57840,7439,52380,33984,4364,3600,61902,12606,6258,57657,54287,34041,10252,43370,20163],Gs=[44796,19929,39858,10053,20106,40212,10761,31585,63170,64933,60267,50935,40399,11199,17763,35526,1453,2906,5812,11624,23248,885,1770,3540,7080,14160,28320,56640,55369,41139,20807,41614,21821,43642,17621,28485,56970,44341,19019,38038,14605,29210,60195,50791,40175,10751,21502,43004,24537,18387,36774,3949,7898,15796,31592,63184,47201,24803,49606,37805,14203,28406,56812,17824,35648,1697,3394,6788,13576,27152,43601,17539,35078,557,1114,2228,4456,30388,60776,51953,34243,7079,14158,28316,14128,28256,56512,43425,17251,34502,7597,13105,26210,52420,35241,883,1766,3532,4129,8258,16516,33032,4657,9314,18628],function(e){for(var t,r,n=Os(e),a=function(e){for(var t=Xs[e.length-1],r=104,n=e.length-1;0<=n;--n)for(var a=e[n],s=0;7!=s;++s)64&a&&(t^=Gs[r]),a*=2,--r;return t}(n),s=n.length,i=J(16),o=0;16!=o;++o)i[o]=0;for(1==(1&s)&&(t=a>>8,i[s]=js(Vs[0],t),--s,t=255&a,e=n[n.length-1],i[s]=js(e,t));0<s;)t=a>>8,i[--s]=js(n[s],t),t=255&a,i[--s]=js(n[s],t);for(r=(s=15)-n.length;0<r;)t=a>>8,i[s]=js(Vs[r],t),--r,t=255&a,i[--s]=js(n[s],t),--s,--r;return i});function js(e,t){return 255&((t=e^t)/2|128*t)}var $s=function(e){var t=0,r=zs(e);return function(e){e=function(e,t,r,n,a){var s,i;for(a=a||t,n=n||zs(e),s=0;s!=t.length;++s)i=t[s],i=255&((i^=n[r])>>5|i<<3),a[s]=i,++r;return[a,r,n]}("",e,t,r);return t=e[1],e[0]}};function Ks(e,t,r){r=r||{};return r.Info=e.read_shift(2),e.l-=2,1===r.Info?r.Data=function(e){var t={},r=t.EncryptionVersionInfo=Ps(e,4);if(1!=r.Major||1!=r.Minor)throw"unrecognized version code "+r.Major+" : "+r.Minor;return t.Salt=e.read_shift(16),t.EncryptedVerifier=e.read_shift(16),t.EncryptedVerifierHash=e.read_shift(16),t}(e):r.Data=function(e,t){var r={},n=r.EncryptionVersionInfo=Ps(e,4);if(t-=4,2!=n.Minor)throw new Error("unrecognized minor version code: "+n.Minor);if(4<n.Major||n.Major<2)throw new Error("unrecognized major version code: "+n.Major);return r.Flags=e.read_shift(4),t-=4,n=e.read_shift(4),t-=4,r.EncryptionHeader=Ls(e,n),t-=n,r.EncryptionVerifier=Us(e,t),r}(e,t),r}var Ys={to_workbook:function(e,t){return tr(Qs(e,t),t)},to_sheet:Qs,from_sheet:function(e){for(var t=["{\\rtf1\\ansi"],r=qt(e["!ref"]),n=Array.isArray(e),a=r.s.r;a<=r.e.r;++a){t.push("\\trowd\\trautofit1");for(var s=r.s.c;s<=r.e.c;++s)t.push("\\cellx"+(s+1));for(t.push("\\pard\\intbl"),s=r.s.c;s<=r.e.c;++s){var i=Yt({r:a,c:s});(i=n?(e[a]||[])[s]:e[i])&&(null!=i.v||i.f&&!i.F)&&(t.push(" "+(i.w||(er(i),i.w))),t.push("\\cell"))}t.push("\\pard\\intbl\\row")}return t.join("")+"}"}};function Qs(e,t){switch(t.type){case"base64":return Js(Y.decode(e),t);case"binary":return Js(e,t);case"buffer":return Js(e.toString("binary"),t);case"array":return Js(I(e),t)}throw new Error("Unrecognized type "+t.type)}function Js(e,t){t=(t||{}).dense?[]:{};if(!e.match(/\\trowd/))throw new Error("RTF missing table");return t["!ref"]=Jt({s:{c:0,r:0},e:{c:0,r:0}}),t}function qs(e){for(var t=0,r=1;3!=t;++t)r=256*r+(255<e[t]?255:e[t]<0?0:e[t]);return r.toString(16).toUpperCase().slice(1)}function Zs(e,t){if(0===t)return e;e=function(e){var t=e[0]/255,r=e[1]/255,n=e[2]/255,a=Math.max(t,r,n),s=Math.min(t,r,n),i=a-s;if(0==i)return[0,0,t];var o=0,e=0,e=i/(1<(s=a+s)?2-s:s);switch(a){case t:o=((r-n)/i+6)%6;break;case r:o=(n-t)/i+2;break;case n:o=(t-r)/i+4}return[o/6,e,s/2]}((e=(e=e).slice("#"===e[0]?1:0).slice(0,6),[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]));return e[2]=t<0?e[2]*(1+t):1-(1-e[2])*(1-t),qs(function(e){var t,r=e[0],n=e[1],e=e[2],a=2*n*(e<.5?e:1-e),s=[e=e-a/2,e,e],i=6*r;if(0!==n)switch(0|i){case 0:case 6:t=a*i,s[0]+=a,s[1]+=t;break;case 1:t=a*(2-i),s[0]+=t,s[1]+=a;break;case 2:t=a*(i-2),s[1]+=a,s[2]+=t;break;case 3:t=a*(4-i),s[1]+=t,s[2]+=a;break;case 4:t=a*(i-4),s[2]+=a,s[0]+=t;break;case 5:t=a*(6-i),s[2]+=t,s[0]+=a}for(var o=0;3!=o;++o)s[o]=Math.round(255*s[o]);return s}(e))}var ei=6,ti=15,ri=1,ni=ei;function ai(e){return Math.floor((e+Math.round(128/ni)/256)*ni)}function si(e){return Math.floor((e-5)/ni*100+.5)/100}function ii(e){return Math.round((e*ni+5)/ni*256)/256}function oi(e){return ii(si(ai(e)))}function li(e){var t=Math.abs(e-oi(e)),r=ni;if(.005<t)for(ni=ri;ni<ti;++ni)Math.abs(e-oi(e))<=t&&(t=Math.abs(e-oi(e)),r=ni);ni=r}function ci(e){e.width?(e.wpx=ai(e.width),e.wch=si(e.wpx),e.MDW=ni):e.wpx?(e.wch=si(e.wpx),e.width=ii(e.wch),e.MDW=ni):"number"==typeof e.wch&&(e.width=ii(e.wch),e.wpx=ai(e.width),e.MDW=ni),e.customWidth&&delete e.customWidth}var fi=96;function hi(e){return 96*e/fi}function ui(e){return e*fi/96}var di={None:"none",Solid:"solid",Gray50:"mediumGray",Gray75:"darkGray",Gray25:"lightGray",HorzStripe:"darkHorizontal",VertStripe:"darkVertical",ReverseDiagStripe:"darkDown",DiagStripe:"darkUp",DiagCross:"darkGrid",ThickDiagCross:"darkTrellis",ThinHorzStripe:"lightHorizontal",ThinVertStripe:"lightVertical",ThinReverseDiagStripe:"lightDown",ThinHorzCross:"lightGrid"};var pi=["numFmtId","fillId","fontId","borderId","xfId"],mi=["applyAlignment","applyBorder","applyFill","applyFont","applyNumberFormat","applyProtection","pivotButton","quotePrefix"];var gi,bi,vi,Ei,Si,wi,Ci=(gi=/<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/,bi=/<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/,vi=/<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/,Ei=/<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/,Si=/<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/,function(e,t,r){var n,a,s,i,o,l={};return e&&((n=(e=e.replace(/<!--([\s\S]*?)-->/gm,"").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm,"")).match(gi))&&function(e,t,r){t.NumberFmt=[];for(var n=de(ue._table),a=0;a<n.length;++a)t.NumberFmt[n[a]]=ue._table[n[a]];var s=e[0].match(ge);if(s)for(a=0;a<s.length;++a){var i=Ee(s[a]);switch(Se(i[0])){case"<numFmts":case"</numFmts>":case"<numFmts/>":case"<numFmts>":break;case"<numFmt":var o=ke(Me(i.formatCode)),l=parseInt(i.numFmtId,10);if(t.NumberFmt[l]=o,0<l){if(392<l){for(l=392;60<l&&null!=t.NumberFmt[l];--l);t.NumberFmt[l]=o}ue.load(o,l)}break;case"</numFmt>":break;default:if(r.WTF)throw new Error("unrecognized "+i[0]+" in numFmts")}}}(n,l,r),(n=e.match(Ei))&&function(e,n,a,s){n.Fonts=[];var i={},o=!1;(e[0].match(ge)||[]).forEach(function(e){var t=Ee(e);switch(Se(t[0])){case"<fonts":case"<fonts>":case"</fonts>":break;case"<font":case"<font>":break;case"</font>":case"<font/>":n.Fonts.push(i),i={};break;case"<name":t.val&&(i.name=Me(t.val));break;case"<name/>":case"</name>":break;case"<b":i.bold=t.val?Ne(t.val):1;break;case"<b/>":i.bold=1;break;case"<i":i.italic=t.val?Ne(t.val):1;break;case"<i/>":i.italic=1;break;case"<u":switch(t.val){case"none":i.underline=0;break;case"single":i.underline=1;break;case"double":i.underline=2;break;case"singleAccounting":i.underline=33;break;case"doubleAccounting":i.underline=34}break;case"<u/>":i.underline=1;break;case"<strike":i.strike=t.val?Ne(t.val):1;break;case"<strike/>":i.strike=1;break;case"<outline":i.outline=t.val?Ne(t.val):1;break;case"<outline/>":i.outline=1;break;case"<shadow":i.shadow=t.val?Ne(t.val):1;break;case"<shadow/>":i.shadow=1;break;case"<condense":i.condense=t.val?Ne(t.val):1;break;case"<condense/>":i.condense=1;break;case"<extend":i.extend=t.val?Ne(t.val):1;break;case"<extend/>":i.extend=1;break;case"<sz":t.val&&(i.sz=+t.val);break;case"<sz/>":case"</sz>":break;case"<vertAlign":t.val&&(i.vertAlign=t.val);break;case"<vertAlign/>":case"</vertAlign>":break;case"<family":t.val&&(i.family=parseInt(t.val,10));break;case"<family/>":case"</family>":break;case"<scheme":t.val&&(i.scheme=t.val);break;case"<scheme/>":case"</scheme>":break;case"<charset":if("1"==t.val)break;t.codepage=c[parseInt(t.val,10)];break;case"<color":if(i.color||(i.color={}),t.auto&&(i.color.auto=Ne(t.auto)),t.rgb)i.color.rgb=t.rgb.slice(-6);else if(t.indexed){i.color.index=parseInt(t.indexed,10);var r=Hr[i.color.index];if(!(r=81==i.color.index?Hr[1]:r))throw new Error(e);i.color.rgb=r[0].toString(16)+r[1].toString(16)+r[2].toString(16)}else t.theme&&(i.color.theme=parseInt(t.theme,10),t.tint&&(i.color.tint=parseFloat(t.tint)),t.theme&&a.themeElements&&a.themeElements.clrScheme&&(i.color.rgb=Zs(a.themeElements.clrScheme[i.color.theme].rgb,i.color.tint||0)));break;case"<color/>":case"</color>":break;case"<AlternateContent":o=!0;break;case"</AlternateContent>":o=!1;break;case"<extLst":case"<extLst>":case"</extLst>":break;case"<ext":o=!0;break;case"</ext>":o=!1;break;default:if(s&&s.WTF&&!o)throw new Error("unrecognized "+t[0]+" in fonts")}})}(n,l,t,r),(n=e.match(vi))&&function(e,r,n){r.Fills=[];var a={},s=!1;(e[0].match(ge)||[]).forEach(function(e){var t=Ee(e);switch(Se(t[0])){case"<fills":case"<fills>":case"</fills>":break;case"<fill>":case"<fill":case"<fill/>":a={},r.Fills.push(a);break;case"</fill>":case"<gradientFill>":break;case"<gradientFill":case"</gradientFill>":r.Fills.push(a),a={};break;case"<patternFill":case"<patternFill>":t.patternType&&(a.patternType=t.patternType);break;case"<patternFill/>":case"</patternFill>":break;case"<bgColor":a.bgColor||(a.bgColor={}),t.indexed&&(a.bgColor.indexed=parseInt(t.indexed,10)),t.theme&&(a.bgColor.theme=parseInt(t.theme,10)),t.tint&&(a.bgColor.tint=parseFloat(t.tint)),t.rgb&&(a.bgColor.rgb=t.rgb.slice(-6));break;case"<bgColor/>":case"</bgColor>":break;case"<fgColor":a.fgColor||(a.fgColor={}),t.theme&&(a.fgColor.theme=parseInt(t.theme,10)),t.tint&&(a.fgColor.tint=parseFloat(t.tint)),null!=t.rgb&&(a.fgColor.rgb=t.rgb.slice(-6));break;case"<fgColor/>":case"</fgColor>":break;case"<stop":case"<stop/>":case"</stop>":break;case"<color":case"<color/>":case"</color>":break;case"<extLst":case"<extLst>":case"</extLst>":break;case"<ext":s=!0;break;case"</ext>":s=!1;break;default:if(n&&n.WTF&&!s)throw new Error("unrecognized "+t[0]+" in fills")}})}(n,l,r),(n=e.match(Si))&&function(e,r,n){r.Borders=[];var a={},s=!1;(e[0].match(ge)||[]).forEach(function(e){var t=Ee(e);switch(Se(t[0])){case"<borders":case"<borders>":case"</borders>":break;case"<border":case"<border>":case"<border/>":a={},t.diagonalUp&&(a.diagonalUp=Ne(t.diagonalUp)),t.diagonalDown&&(a.diagonalDown=Ne(t.diagonalDown)),r.Borders.push(a);break;case"</border>":case"<left/>":break;case"<left":case"<left>":case"</left>":case"<right/>":break;case"<right":case"<right>":case"</right>":case"<top/>":break;case"<top":case"<top>":case"</top>":case"<bottom/>":break;case"<bottom":case"<bottom>":case"</bottom>":break;case"<diagonal":case"<diagonal>":case"<diagonal/>":case"</diagonal>":break;case"<horizontal":case"<horizontal>":case"<horizontal/>":case"</horizontal>":break;case"<vertical":case"<vertical>":case"<vertical/>":case"</vertical>":break;case"<start":case"<start>":case"<start/>":case"</start>":break;case"<end":case"<end>":case"<end/>":case"</end>":break;case"<color":case"<color>":break;case"<color/>":case"</color>":break;case"<extLst":case"<extLst>":case"</extLst>":break;case"<ext":s=!0;break;case"</ext>":s=!1;break;default:if(n&&n.WTF&&!s)throw new Error("unrecognized "+t[0]+" in borders")}})}(n,l,r),(n=e.match(bi))&&(n=n,s=r,o=!((a=l).CellXf=[]),(n[0].match(ge)||[]).forEach(function(e){var t=Ee(e),r=0;switch(Se(t[0])){case"<cellXfs":case"<cellXfs>":case"<cellXfs/>":case"</cellXfs>":break;case"<xf":case"<xf/>":for(delete(i=t)[0],r=0;r<pi.length;++r)i[pi[r]]&&(i[pi[r]]=parseInt(i[pi[r]],10));for(r=0;r<mi.length;++r)i[mi[r]]&&(i[mi[r]]=Ne(i[mi[r]]));if(392<i.numFmtId)for(r=392;60<r;--r)if(a.NumberFmt[i.numFmtId]==a.NumberFmt[r]){i.numFmtId=r;break}a.CellXf.push(i);break;case"</xf>":break;case"<alignment":case"<alignment/>":var n={};t.vertical&&(n.vertical=t.vertical),t.horizontal&&(n.horizontal=t.horizontal),null!=t.textRotation&&(n.textRotation=t.textRotation),t.indent&&(n.indent=t.indent),t.wrapText&&(n.wrapText=Ne(t.wrapText)),i.alignment=n;break;case"</alignment>":case"<protection":break;case"</protection>":case"<protection/>":break;case"<AlternateContent":o=!0;break;case"</AlternateContent>":o=!1;break;case"<extLst":case"<extLst>":case"</extLst>":break;case"<ext":o=!0;break;case"</ext>":o=!1;break;default:if(s&&s.WTF&&!o)throw new Error("unrecognized "+t[0]+" in cellXfs")}}))),l}),Bi=Je("styleSheet",null,{xmlns:Ze.main[0],"xmlns:vt":Ze.vt});function Ti(e,t){if(void 0!==wi)return wi.toXml();var r,n,a,s,i=[K,Bi];return e.SSF&&null!=(n=e.SSF,a=["<numFmts>"],[[5,8],[23,26],[41,44],[50,392]].forEach(function(e){for(var t=e[0];t<=e[1];++t)null!=n[t]&&(a[a.length]=Je("numFmt",null,{numFmtId:t,formatCode:ye(n[t])}))}),r=1===a.length?"":(a[a.length]="</numFmts>",a[0]=Je("numFmts",null,{count:a.length-2}).replace("/>",">"),a.join("")))&&(i[i.length]=r),i[i.length]='<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>',i[i.length]='<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>',i[i.length]='<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>',i[i.length]='<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>',t=t.cellXfs,(s=[])[s.length]="<cellXfs/>",t.forEach(function(e){s[s.length]=Je("xf",null,e)}),s[s.length]="</cellXfs>",(r=2===s.length?"":(s[0]=Je("cellXfs",null,{count:s.length-2}).replace("/>",">"),s.join("")))&&(i[i.length]=r),i[i.length]='<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>',i[i.length]='<dxfs count="0"/>',i[i.length]='<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>',2<i.length&&(i[i.length]="</styleSheet>",i[1]=i[1].replace("/>",">")),i.join("")}function ki(e,t){var r;(t=t||Nt(153)).write_shift(2,20*e.sz),r=e,n=(n=t)||Nt(2),r=(r.italic?2:0)|(r.strike?8:0)|(r.outline?16:0)|(r.shadow?32:0)|(r.condense?64:0)|(r.extend?128:0),n.write_shift(1,r),n.write_shift(1,0),t.write_shift(2,e.bold?700:400);var n=0;"superscript"==e.vertAlign?n=1:"subscript"==e.vertAlign&&(n=2),t.write_shift(2,n),t.write_shift(1,e.underline||0),t.write_shift(1,e.family||0),t.write_shift(1,e.charset||0),t.write_shift(1,0),kr(e.color,t);n=0;return"major"==e.scheme&&(n=1),"minor"==e.scheme&&(n=2),t.write_shift(1,n),ir(e.name,t),t.length>t.l?t.slice(0,t.l):t}Qr.STY="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";var xi=C(["none","solid","mediumGray","darkGray","lightGray","darkHorizontal","darkVertical","darkDown","darkUp","darkGrid","darkTrellis","lightHorizontal","lightVertical","lightDown","lightUp","lightGrid","lightTrellis","gray125","gray0625"]),_i=Pt;function yi(e,t){t=t||Nt(84);e=xi[e.patternType];null==e&&(e=40),t.write_shift(4,e);var r=0;if(40!=e)for(kr({auto:1},t),kr({auto:1},t);r<12;++r)t.write_shift(4,0);else{for(;r<4;++r)t.write_shift(4,0);for(;r<12;++r)t.write_shift(4,0)}return t.length>t.l?t.slice(0,t.l):t}function Ai(e,t,r){(r=r||Nt(16)).write_shift(2,t||0),r.write_shift(2,e.numFmtId||0),r.write_shift(2,0),r.write_shift(2,0),r.write_shift(2,0),r.write_shift(1,0),r.write_shift(1,0);return r.write_shift(1,0),r.write_shift(1,0),r.write_shift(1,0),r.write_shift(1,0),r}function Ii(e,t){return(t=t||Nt(10)).write_shift(1,0),t.write_shift(1,0),t.write_shift(4,0),t.write_shift(4,0),t}var Ri=Pt;function Fi(s,i){var r;i&&(r=0,[[5,8],[23,26],[41,44],[50,392]].forEach(function(e){for(var t=e[0];t<=e[1];++t)null!=i[t]&&++r}),0!=r&&(Ut(s,"BrtBeginFmts",ar(r)),[[5,8],[23,26],[41,44],[50,392]].forEach(function(e){for(var t,r,n,a=e[0];a<=e[1];++a)null!=i[a]&&Ut(s,"BrtFmt",(r=i[t=a],(n=(n=void 0)||Nt(6+4*r.length)).write_shift(2,t),ir(r,n),r=n.length>n.l?n.slice(0,n.l):n,null==n.l&&(n.l=n.length),r))}),Ut(s,"BrtEndFmts")))}function Di(e){var t;Ut(e,"BrtBeginBorders",ar(1)),Ut(e,"BrtBorder",((t=t||Nt(51)).write_shift(1,0),Ii(0,t),Ii(0,t),Ii(0,t),Ii(0,t),Ii(0,t),t.length>t.l?t.slice(0,t.l):t)),Ut(e,"BrtEndBorders")}function Oi(e){var t,r;Ut(e,"BrtBeginStyles",ar(1)),Ut(e,"BrtStyle",(t={xfId:0,builtinId:0,name:"Normal"},(r=r||Nt(52)).write_shift(4,t.xfId),r.write_shift(2,1),r.write_shift(1,+t.builtinId),r.write_shift(1,0),mr(t.name||"",r),r.length>r.l?r.slice(0,r.l):r)),Ut(e,"BrtEndStyles")}function Pi(e){var t,r,n,a;Ut(e,"BrtBeginTableStyles",(t=0,r="TableStyleMedium9",n="PivotStyleMedium4",(a=Nt(2052)).write_shift(4,t),mr(r,a),mr(n,a),a.length>a.l?a.slice(0,a.l):a)),Ut(e,"BrtEndTableStyles")}function Ni(e,t){var r,n=Lt();return Ut(n,"BrtBeginStyleSheet"),Fi(n,e.SSF),Ut(e=n,"BrtBeginFonts",ar(1)),Ut(e,"BrtFont",ki({sz:12,color:{theme:1},name:"Calibri",family:2,scheme:"minor"})),Ut(e,"BrtEndFonts"),Ut(e=n,"BrtBeginFills",ar(2)),Ut(e,"BrtFill",yi({patternType:"none"})),Ut(e,"BrtFill",yi({patternType:"gray125"})),Ut(e,"BrtEndFills"),Di(n),Ut(e=n,"BrtBeginCellStyleXFs",ar(1)),Ut(e,"BrtXF",Ai({numFmtId:0,fontId:0,fillId:0,borderId:0},65535)),Ut(e,"BrtEndCellStyleXFs"),r=n,t=t.cellXfs,Ut(r,"BrtBeginCellXFs",ar(t.length)),t.forEach(function(e){Ut(r,"BrtXF",Ai(e,0))}),Ut(r,"BrtEndCellXFs"),Oi(n),Ut(t=n,"BrtBeginDXFs",ar(0)),Ut(t,"BrtEndDXFs"),Pi(n),Ut(n,"BrtEndStyleSheet"),n.end()}Qr.THEME="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";var Mi=["</a:lt1>","</a:dk1>","</a:lt2>","</a:dk2>","</a:accent1>","</a:accent2>","</a:accent3>","</a:accent4>","</a:accent5>","</a:accent6>","</a:hlink>","</a:folHlink>"];function Li(e,r,n){r.themeElements.clrScheme=[];var a={};(e[0].match(ge)||[]).forEach(function(e){var t=Ee(e);switch(t[0]){case"<a:clrScheme":case"</a:clrScheme>":break;case"<a:srgbClr":a.rgb=t.val;break;case"<a:sysClr":a.rgb=t.lastClr;break;case"<a:dk1>":case"</a:dk1>":case"<a:lt1>":case"</a:lt1>":case"<a:dk2>":case"</a:dk2>":case"<a:lt2>":case"</a:lt2>":case"<a:accent1>":case"</a:accent1>":case"<a:accent2>":case"</a:accent2>":case"<a:accent3>":case"</a:accent3>":case"<a:accent4>":case"</a:accent4>":case"<a:accent5>":case"</a:accent5>":case"<a:accent6>":case"</a:accent6>":case"<a:hlink>":case"</a:hlink>":case"<a:folHlink>":case"</a:folHlink>":"/"===t[0].charAt(1)?(r.themeElements.clrScheme[Mi.indexOf(t[0])]=a,a={}):a.name=t[0].slice(3,t[0].length-1);break;default:if(n&&n.WTF)throw new Error("Unrecognized "+t[0]+" in clrScheme")}})}function Ui(){}function Hi(){}var Wi=/<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/,Vi=/<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/,Xi=/<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;var Gi=/<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;function zi(e,t){if(!e||0===e.length)return zi(ji());var r,n,a,s,i,o={};if(!(r=e.match(Gi)))throw new Error("themeElements not found in theme");return n=r[0],s=t,(a=o).themeElements={},[["clrScheme",Wi,Li],["fontScheme",Vi,Ui],["fmtScheme",Xi,Hi]].forEach(function(e){if(!(i=n.match(e[1])))throw new Error(e[0]+" not found in themeElements");e[2](i,a,s)}),o.raw=e,o}function ji(e,t){if(t&&t.themeXLSX)return t.themeXLSX;if(e&&"string"==typeof e.raw)return e.raw;e=[K];return e[e.length]='<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">',e[e.length]="<a:themeElements>",e[e.length]='<a:clrScheme name="Office">',e[e.length]='<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>',e[e.length]='<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>',e[e.length]='<a:dk2><a:srgbClr val="1F497D"/></a:dk2>',e[e.length]='<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>',e[e.length]='<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>',e[e.length]='<a:accent2><a:srgbClr val="C0504D"/></a:accent2>',e[e.length]='<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>',e[e.length]='<a:accent4><a:srgbClr val="8064A2"/></a:accent4>',e[e.length]='<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>',e[e.length]='<a:accent6><a:srgbClr val="F79646"/></a:accent6>',e[e.length]='<a:hlink><a:srgbClr val="0000FF"/></a:hlink>',e[e.length]='<a:folHlink><a:srgbClr val="800080"/></a:folHlink>',e[e.length]="</a:clrScheme>",e[e.length]='<a:fontScheme name="Office">',e[e.length]="<a:majorFont>",e[e.length]='<a:latin typeface="Cambria"/>',e[e.length]='<a:ea typeface=""/>',e[e.length]='<a:cs typeface=""/>',e[e.length]='<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>',e[e.length]='<a:font script="Hang" typeface="맑은 고딕"/>',e[e.length]='<a:font script="Hans" typeface="宋体"/>',e[e.length]='<a:font script="Hant" typeface="新細明體"/>',e[e.length]='<a:font script="Arab" typeface="Times New Roman"/>',e[e.length]='<a:font script="Hebr" typeface="Times New Roman"/>',e[e.length]='<a:font script="Thai" typeface="Tahoma"/>',e[e.length]='<a:font script="Ethi" typeface="Nyala"/>',e[e.length]='<a:font script="Beng" typeface="Vrinda"/>',e[e.length]='<a:font script="Gujr" typeface="Shruti"/>',e[e.length]='<a:font script="Khmr" typeface="MoolBoran"/>',e[e.length]='<a:font script="Knda" typeface="Tunga"/>',e[e.length]='<a:font script="Guru" typeface="Raavi"/>',e[e.length]='<a:font script="Cans" typeface="Euphemia"/>',e[e.length]='<a:font script="Cher" typeface="Plantagenet Cherokee"/>',e[e.length]='<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>',e[e.length]='<a:font script="Tibt" typeface="Microsoft Himalaya"/>',e[e.length]='<a:font script="Thaa" typeface="MV Boli"/>',e[e.length]='<a:font script="Deva" typeface="Mangal"/>',e[e.length]='<a:font script="Telu" typeface="Gautami"/>',e[e.length]='<a:font script="Taml" typeface="Latha"/>',e[e.length]='<a:font script="Syrc" typeface="Estrangelo Edessa"/>',e[e.length]='<a:font script="Orya" typeface="Kalinga"/>',e[e.length]='<a:font script="Mlym" typeface="Kartika"/>',e[e.length]='<a:font script="Laoo" typeface="DokChampa"/>',e[e.length]='<a:font script="Sinh" typeface="Iskoola Pota"/>',e[e.length]='<a:font script="Mong" typeface="Mongolian Baiti"/>',e[e.length]='<a:font script="Viet" typeface="Times New Roman"/>',e[e.length]='<a:font script="Uigh" typeface="Microsoft Uighur"/>',e[e.length]='<a:font script="Geor" typeface="Sylfaen"/>',e[e.length]="</a:majorFont>",e[e.length]="<a:minorFont>",e[e.length]='<a:latin typeface="Calibri"/>',e[e.length]='<a:ea typeface=""/>',e[e.length]='<a:cs typeface=""/>',e[e.length]='<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>',e[e.length]='<a:font script="Hang" typeface="맑은 고딕"/>',e[e.length]='<a:font script="Hans" typeface="宋体"/>',e[e.length]='<a:font script="Hant" typeface="新細明體"/>',e[e.length]='<a:font script="Arab" typeface="Arial"/>',e[e.length]='<a:font script="Hebr" typeface="Arial"/>',e[e.length]='<a:font script="Thai" typeface="Tahoma"/>',e[e.length]='<a:font script="Ethi" typeface="Nyala"/>',e[e.length]='<a:font script="Beng" typeface="Vrinda"/>',e[e.length]='<a:font script="Gujr" typeface="Shruti"/>',e[e.length]='<a:font script="Khmr" typeface="DaunPenh"/>',e[e.length]='<a:font script="Knda" typeface="Tunga"/>',e[e.length]='<a:font script="Guru" typeface="Raavi"/>',e[e.length]='<a:font script="Cans" typeface="Euphemia"/>',e[e.length]='<a:font script="Cher" typeface="Plantagenet Cherokee"/>',e[e.length]='<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>',e[e.length]='<a:font script="Tibt" typeface="Microsoft Himalaya"/>',e[e.length]='<a:font script="Thaa" typeface="MV Boli"/>',e[e.length]='<a:font script="Deva" typeface="Mangal"/>',e[e.length]='<a:font script="Telu" typeface="Gautami"/>',e[e.length]='<a:font script="Taml" typeface="Latha"/>',e[e.length]='<a:font script="Syrc" typeface="Estrangelo Edessa"/>',e[e.length]='<a:font script="Orya" typeface="Kalinga"/>',e[e.length]='<a:font script="Mlym" typeface="Kartika"/>',e[e.length]='<a:font script="Laoo" typeface="DokChampa"/>',e[e.length]='<a:font script="Sinh" typeface="Iskoola Pota"/>',e[e.length]='<a:font script="Mong" typeface="Mongolian Baiti"/>',e[e.length]='<a:font script="Viet" typeface="Arial"/>',e[e.length]='<a:font script="Uigh" typeface="Microsoft Uighur"/>',e[e.length]='<a:font script="Geor" typeface="Sylfaen"/>',e[e.length]="</a:minorFont>",e[e.length]="</a:fontScheme>",e[e.length]='<a:fmtScheme name="Office">',e[e.length]="<a:fillStyleLst>",e[e.length]='<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>',e[e.length]='<a:gradFill rotWithShape="1">',e[e.length]="<a:gsLst>",e[e.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>',e[e.length]='<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>',e[e.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',e[e.length]="</a:gsLst>",e[e.length]='<a:lin ang="16200000" scaled="1"/>',e[e.length]="</a:gradFill>",e[e.length]='<a:gradFill rotWithShape="1">',e[e.length]="<a:gsLst>",e[e.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>',e[e.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',e[e.length]="</a:gsLst>",e[e.length]='<a:lin ang="16200000" scaled="0"/>',e[e.length]="</a:gradFill>",e[e.length]="</a:fillStyleLst>",e[e.length]="<a:lnStyleLst>",e[e.length]='<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>',e[e.length]='<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>',e[e.length]='<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>',e[e.length]="</a:lnStyleLst>",e[e.length]="<a:effectStyleLst>",e[e.length]="<a:effectStyle>",e[e.length]="<a:effectLst>",e[e.length]='<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>',e[e.length]="</a:effectLst>",e[e.length]="</a:effectStyle>",e[e.length]="<a:effectStyle>",e[e.length]="<a:effectLst>",e[e.length]='<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>',e[e.length]="</a:effectLst>",e[e.length]="</a:effectStyle>",e[e.length]="<a:effectStyle>",e[e.length]="<a:effectLst>",e[e.length]='<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>',e[e.length]="</a:effectLst>",e[e.length]='<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>',e[e.length]='<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>',e[e.length]="</a:effectStyle>",e[e.length]="</a:effectStyleLst>",e[e.length]="<a:bgFillStyleLst>",e[e.length]='<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>',e[e.length]='<a:gradFill rotWithShape="1">',e[e.length]="<a:gsLst>",e[e.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',e[e.length]='<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>',e[e.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>',e[e.length]="</a:gsLst>",e[e.length]='<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>',e[e.length]="</a:gradFill>",e[e.length]='<a:gradFill rotWithShape="1">',e[e.length]="<a:gsLst>",e[e.length]='<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>',e[e.length]='<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>',e[e.length]="</a:gsLst>",e[e.length]='<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>',e[e.length]="</a:gradFill>",e[e.length]="</a:bgFillStyleLst>",e[e.length]="</a:fmtScheme>",e[e.length]="</a:themeElements>",e[e.length]="<a:objectDefaults>",e[e.length]="<a:spDef>",e[e.length]='<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>',e[e.length]="</a:spDef>",e[e.length]="<a:lnDef>",e[e.length]='<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>',e[e.length]="</a:lnDef>",e[e.length]="</a:objectDefaults>",e[e.length]="<a:extraClrSchemeLst/>",e[e.length]="</a:theme>",e.join("")}function $i(e){var t={};switch(t.xclrType=e.read_shift(2),t.nTintShade=e.read_shift(2),t.xclrType){case 0:e.l+=4;break;case 1:t.xclrValue=Pt(e,4);break;case 2:t.xclrValue=Qn(e);break;case 3:t.xclrValue=e.read_shift(4);break;case 4:e.l+=4}return e.l+=8,t}function Ki(e){var t=e.read_shift(2),r=e.read_shift(2)-4,n=[t];switch(t){case 4:case 5:case 7:case 8:case 9:case 10:case 11:case 13:n[1]=$i(e);break;case 6:n[1]=Pt(e,r);break;case 14:case 15:n[1]=e.read_shift(1==r?1:2);break;default:throw new Error("Unrecognized ExtProp type: "+t+" "+r)}return n}Qr.IMG="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",Qr.DRAW="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";var Yi=1024;Qr.CMNT="http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";var Qi=Je("comments",null,{xmlns:Ze.main[0]});var Ji=sr;function qi(e){var a=Lt(),s=[];return Ut(a,"BrtBeginComments"),Ut(a,"BrtBeginCommentAuthors"),e.forEach(function(e){e[1].forEach(function(e){-1<s.indexOf(e.a)||(s.push(e.a.slice(0,54)),Ut(a,"BrtCommentAuthor",ir(e.a.slice(0,54))))})}),Ut(a,"BrtEndCommentAuthors"),Ut(a,"BrtBeginCommentList"),e.forEach(function(n){n[1].forEach(function(e){e.iauthor=s.indexOf(e.a);var t,r={s:Kt(n[0]),e:Kt(n[0])};Ut(a,"BrtBeginComment",(r=[r,e],(t=null==t?Nt(36):t).write_shift(4,r[1].iauthor),Cr(r[0],t),t.write_shift(4,0),t.write_shift(4,0),t.write_shift(4,0),t.write_shift(4,0),t)),e.t&&0<e.t.length&&Ut(a,"BrtCommentText",cr(e)),Ut(a,"BrtEndComment"),delete e.iauthor})}),Ut(a,"BrtEndCommentList"),Ut(a,"BrtEndComments"),a.end()}var Zi="application/vnd.ms-office.vbaProject";var eo=["xlsb","xlsm","xlam","biff8","xla"];Qr.DS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",Qr.MS="http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet";var to,ro,no=(ro=/(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g,function(e,t){return to=t,e.replace(ro,ao)});function ao(e,t,r,n){var a=!1,s=!1;0==r.length?s=!0:"["==r.charAt(0)&&(s=!0,r=r.slice(1,-1)),0==n.length?a=!0:"["==n.charAt(0)&&(a=!0,n=n.slice(1,-1));r=0<r.length?0|parseInt(r,10):0,n=0<n.length?0|parseInt(n,10):0;return a?n+=to.c:--n,s?r+=to.r:--r,t+(a?"":"$")+$t(n)+(s?"":"$")+zt(r)}var so=/(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g,io=function(e,i){return e.replace(so,function(e,t,r,n,a,s){n=jt(n)-(r?0:i.c),s=Gt(s)-(a?0:i.r);return t+"R"+(0==s?"":a?1+s:"["+s+"]")+"C"+(0==n?"":r?1+n:"["+n+"]")})};function oo(e,t,r){var i,t=Qt(t).s,r=Kt(r),t={r:r.r-t.r,c:r.c-t.c};return i=t,e.replace(so,function(e,t,r,n,a,s){return t+("$"==r?r+n:$t(jt(n)+i.c))+("$"==a?a+s:zt(Gt(s)+i.r))})}function lo(e){return e.replace(/_xlfn\./g,"")}function co(e){e.l+=1}function fo(e,t){t=e.read_shift(1==t?1:2);return[16383&t,t>>14&1,t>>15&1]}function ho(e,t,r){var n=2;if(r){if(2<=r.biff&&r.biff<=5)return uo(e);12==r.biff&&(n=4)}var a=e.read_shift(n),r=e.read_shift(n),n=fo(e,2),e=fo(e,2);return{s:{r:a,c:n[0],cRel:n[1],rRel:n[2]},e:{r:r,c:e[0],cRel:e[1],rRel:e[2]}}}function uo(e){var t=fo(e,2),r=fo(e,2),n=e.read_shift(1),e=e.read_shift(1);return{s:{r:t[0],c:n,cRel:t[1],rRel:t[2]},e:{r:r[0],c:e,cRel:r[1],rRel:r[2]}}}function po(e,t,r){if(r&&2<=r.biff&&r.biff<=5)return a=fo(n=e,2),n=n.read_shift(1),{r:a[0],c:n,cRel:a[1],rRel:a[2]};var n,a,r=e.read_shift(r&&12==r.biff?4:2),e=fo(e,2);return{r:r,c:e[0],cRel:e[1],rRel:e[2]}}function mo(e,t,r){r=r&&r.biff?r.biff:8;if(2<=r&&r<=5)return function(e){var t=e.read_shift(2),r=e.read_shift(1),n=(32768&t)>>15,e=(16384&t)>>14;t&=16383,1==n&&8192<=t&&(t-=16384);1==e&&128<=r&&(r-=256);return{r:t,c:r,cRel:e,rRel:n}}(e);var n=e.read_shift(12<=r?4:2),a=e.read_shift(2),r=(16384&a)>>14,e=(32768&a)>>15;if(a&=16383,1==e)for(;524287<n;)n-=1048576;if(1==r)for(;8191<a;)a-=16384;return{r:n,c:a,cRel:r,rRel:e}}function go(e){return[e.read_shift(1),e.read_shift(1)]}function bo(e,t,r){var n=0,a=0;12==r.biff?(n=e.read_shift(4),a=e.read_shift(4)):(a=1+e.read_shift(1),n=1+e.read_shift(2)),2<=r.biff&&r.biff<8&&(--n,0==--a&&(a=256));for(var s=0,i=[];s!=n&&(i[s]=[]);++s)for(var o=0;o!=a;++o)i[s][o]=function(e,t){var r=[e.read_shift(1)];if(12==t)switch(r[0]){case 2:r[0]=4;break;case 4:r[0]=16;break;case 0:r[0]=1;break;case 1:r[0]=2}switch(r[0]){case 4:r[1]=Ln(e,1)?"TRUE":"FALSE",12!=t&&(e.l+=7);break;case 37:case 16:r[1]=Wr[e[e.l]],e.l+=12==t?4:8;break;case 0:e.l+=8;break;case 1:r[1]=Br(e);break;case 2:r[1]=jn(e,0,{biff:0<t&&t<8?2:t});break;default:throw new Error("Bad SerAr: "+r[0])}return r}(e,r.biff);return i}function vo(e,t,r){return e.l+=2,[(e=(n=e).read_shift(2),n=n.read_shift(2),{r:e,c:255&n,fQuoted:!!(16384&n),cRel:n>>15,rRel:n>>15})];var n}function Eo(e){return e.l+=6,[]}var So=vo,wo=Eo,Co=Eo,Bo=vo;function To(e){return e.l+=2,[Hn(e),1&e.read_shift(2)]}var r=vo,k=To,ko=Eo,xo=vo,_o=vo,yo=["Data","All","Headers","??","?Data2","??","?DataHeaders","??","Totals","??","??","??","?DataTotals","??","??","??","?Current"];var Ao={1:{n:"PtgExp",f:function(e,t,r){return e.l++,r&&12==r.biff?[e.read_shift(4,"i"),0]:[e.read_shift(2),e.read_shift(r&&2==r.biff?1:2)]}},2:{n:"PtgTbl",f:Pt},3:{n:"PtgAdd",f:co},4:{n:"PtgSub",f:co},5:{n:"PtgMul",f:co},6:{n:"PtgDiv",f:co},7:{n:"PtgPower",f:co},8:{n:"PtgConcat",f:co},9:{n:"PtgLt",f:co},10:{n:"PtgLe",f:co},11:{n:"PtgEq",f:co},12:{n:"PtgGe",f:co},13:{n:"PtgGt",f:co},14:{n:"PtgNe",f:co},15:{n:"PtgIsect",f:co},16:{n:"PtgUnion",f:co},17:{n:"PtgRange",f:co},18:{n:"PtgUplus",f:co},19:{n:"PtgUminus",f:co},20:{n:"PtgPercent",f:co},21:{n:"PtgParen",f:co},22:{n:"PtgMissArg",f:co},23:{n:"PtgStr",f:function(e,t,r){return e.l++,Xn(e,0,r)}},26:{n:"PtgSheet",f:function(e,t,r){return e.l+=5,e.l+=2,e.l+=2==r.biff?1:4,["PTGSHEET"]}},27:{n:"PtgEndSheet",f:function(e,t,r){return e.l+=2==r.biff?4:5,["PTGENDSHEET"]}},28:{n:"PtgErr",f:function(e){return e.l++,Wr[e.read_shift(1)]}},29:{n:"PtgBool",f:function(e){return e.l++,0!==e.read_shift(1)}},30:{n:"PtgInt",f:function(e){return e.l++,e.read_shift(2)}},31:{n:"PtgNum",f:function(e){return e.l++,Br(e)}},32:{n:"PtgArray",f:function(e,t,r){var n=(96&e[e.l++])>>5;return e.l+=2==r.biff?6:12==r.biff?14:7,[n]}},33:{n:"PtgFunc",f:function(e,t,r){var n=(96&e[e.l])>>5;return e.l+=1,r=e.read_shift(r&&r.biff<=3?1:2),[Yo[r],Ko[r],n]}},34:{n:"PtgFuncVar",f:function(e,t,r){var n=e[e.l++],a=e.read_shift(1),s=r&&r.biff<=3?[88==n?-1:0,e.read_shift(1)]:[(s=e)[s.l+1]>>7,32767&s.read_shift(2)];return[a,(0===s[0]?Ko:$o)[s[1]]]}},35:{n:"PtgName",f:function(e,t,r){var n=e.read_shift(1)>>>5&3,a=!r||8<=r.biff?4:2,a=e.read_shift(a);switch(r.biff){case 2:e.l+=5;break;case 3:case 4:e.l+=8;break;case 5:e.l+=12}return[n,0,a]}},36:{n:"PtgRef",f:function(e,t,r){var n=(96&e[e.l])>>5;return e.l+=1,[n,po(e,0,r)]}},37:{n:"PtgArea",f:function(e,t,r){return[(96&e[e.l++])>>5,ho(e,2<=r.biff&&r.biff,r)]}},38:{n:"PtgMemArea",f:function(e,t,r){var n=e.read_shift(1)>>>5&3;return e.l+=r&&2==r.biff?3:4,[n,e.read_shift(r&&2==r.biff?1:2)]}},39:{n:"PtgMemErr",f:Pt},40:{n:"PtgMemNoMem",f:Pt},41:{n:"PtgMemFunc",f:function(e,t,r){return[e.read_shift(1)>>>5&3,e.read_shift(r&&2==r.biff?1:2)]}},42:{n:"PtgRefErr",f:function(e,t,r){var n=e.read_shift(1)>>>5&3;return e.l+=4,r.biff<8&&e.l--,12==r.biff&&(e.l+=2),[n]}},43:{n:"PtgAreaErr",f:function(e,t,r){var n=(96&e[e.l++])>>5;return e.l+=r&&8<r.biff?12:r.biff<8?6:8,[n]}},44:{n:"PtgRefN",f:function(e,t,r){var n=(96&e[e.l])>>5;return e.l+=1,[n,mo(e,0,r)]}},45:{n:"PtgAreaN",f:function(e,t,r){return[(96&e[e.l++])>>5,function(e,t){if(t.biff<8)return uo(e);var r=e.read_shift(12==t.biff?4:2),n=e.read_shift(12==t.biff?4:2),t=fo(e,2),e=fo(e,2);return{s:{r:r,c:t[0],cRel:t[1],rRel:t[2]},e:{r:n,c:e[0],cRel:e[1],rRel:e[2]}}}(e,r)]}},46:{n:"PtgMemAreaN",f:function(e){return[e.read_shift(1)>>>5&3,e.read_shift(2)]}},47:{n:"PtgMemNoMemN",f:function(e){return[e.read_shift(1)>>>5&3,e.read_shift(2)]}},57:{n:"PtgNameX",f:function(e,t,r){return 5==r.biff?function(e){var t=e.read_shift(1)>>>5&3,r=e.read_shift(2,"i");e.l+=8;var n=e.read_shift(2);return e.l+=12,[t,r,n]}(e):[e.read_shift(1)>>>5&3,e.read_shift(2),e.read_shift(4)]}},58:{n:"PtgRef3d",f:function(e,t,r){var n=(96&e[e.l])>>5;e.l+=1;var a=e.read_shift(2);return r&&5==r.biff&&(e.l+=12),[n,a,po(e,0,r)]}},59:{n:"PtgArea3d",f:function(e,t,r){var n=(96&e[e.l++])>>5,a=e.read_shift(2,"i");if(r)switch(r.biff){case 5:e.l+=12,0;break;case 12:0}return[n,a,ho(e,0,r)]}},60:{n:"PtgRefErr3d",f:function(e,t,r){var n=(96&e[e.l++])>>5,a=e.read_shift(2),s=4;if(r)switch(r.biff){case 5:s=15;break;case 12:s=6}return e.l+=s,[n,a]}},61:{n:"PtgAreaErr3d",f:function(e,t,r){var n=(96&e[e.l++])>>5,a=e.read_shift(2),s=8;if(r)switch(r.biff){case 5:e.l+=12,s=6;break;case 12:s=12}return e.l+=s,[n,a]}},255:{}},Io={64:32,96:32,65:33,97:33,66:34,98:34,67:35,99:35,68:36,100:36,69:37,101:37,70:38,102:38,71:39,103:39,72:40,104:40,73:41,105:41,74:42,106:42,75:43,107:43,76:44,108:44,77:45,109:45,78:46,110:46,79:47,111:47,88:34,120:34,89:57,121:57,90:58,122:58,91:59,123:59,92:60,124:60,93:61,125:61};!function(){for(var e in Io)Ao[e]=Ao[Io[e]]}();var Ro={1:{n:"PtgElfLel",f:To},2:{n:"PtgElfRw",f:xo},3:{n:"PtgElfCol",f:So},6:{n:"PtgElfRwV",f:_o},7:{n:"PtgElfColV",f:Bo},10:{n:"PtgElfRadical",f:r},11:{n:"PtgElfRadicalS",f:ko},13:{n:"PtgElfColS",f:wo},15:{n:"PtgElfColSV",f:Co},16:{n:"PtgElfRadicalLel",f:k},25:{n:"PtgList",f:function(e){e.l+=2;var t=e.read_shift(2),r=e.read_shift(2),n=e.read_shift(4),a=e.read_shift(2),e=e.read_shift(2);return{ixti:t,coltype:3&r,rt:yo[r>>2&31],idx:n,c:a,C:e}}},29:{n:"PtgSxName",f:function(e){return e.l+=2,[e.read_shift(4)]}},255:{}},Fo={0:{n:"PtgAttrNoop",f:function(e){return e.l+=4,[0,0]}},1:{n:"PtgAttrSemi",f:function(e,t,r){var n=255&e[e.l+1]?1:0;return e.l+=r&&2==r.biff?3:4,[n]}},2:{n:"PtgAttrIf",f:function(e,t,r){var n=255&e[e.l+1]?1:0;return e.l+=2,[n,e.read_shift(r&&2==r.biff?1:2)]}},4:{n:"PtgAttrChoose",f:function(e,t,r){e.l+=2;for(var n=e.read_shift(r&&2==r.biff?1:2),a=[],s=0;s<=n;++s)a.push(e.read_shift(r&&2==r.biff?1:2));return a}},8:{n:"PtgAttrGoto",f:function(e,t,r){var n=255&e[e.l+1]?1:0;return e.l+=2,[n,e.read_shift(r&&2==r.biff?1:2)]}},16:{n:"PtgAttrSum",f:function(e,t,r){e.l+=r&&2==r.biff?3:4}},32:{n:"PtgAttrBaxcel",f:function(e){var t=1&e[e.l+1];return e.l+=4,[t,1]}},64:{n:"PtgAttrSpace",f:function(e){return e.read_shift(2),go(e)}},65:{n:"PtgAttrSpaceSemi",f:function(e){return e.read_shift(2),go(e)}},128:{n:"PtgAttrIfError",f:function(e){var t=255&e[e.l+1]?1:0;return e.l+=2,[t,e.read_shift(2)]}},255:{}};function Do(e,t,r,n){if(n.biff<8)return Pt(e,t);for(var a=e.l+t,s=[],i=0;i!==r.length;++i)switch(r[i][0]){case"PtgArray":r[i][1]=bo(e,0,n),s.push(r[i][1]);break;case"PtgMemArea":r[i][2]=function(e,t){for(var r=e.read_shift(12==t.biff?4:2),n=[],a=0;a!=r;++a)n.push((12==t.biff?wr:ta)(e,8));return n}(e,(r[i][1],n)),s.push(r[i][2]);break;case"PtgExp":n&&12==n.biff&&(r[i][1][1]=e.read_shift(4),s.push(r[i][1]));break;case"PtgList":case"PtgElfRadicalS":case"PtgElfColS":case"PtgElfColSV":throw"Unsupported "+r[i][0]}return 0!==(t=a-e.l)&&s.push(Pt(e,t)),s}function Oo(e,t,r){for(var n,a,s=e.l+t,i=[];s!=e.l;)t=s-e.l,a=e[e.l],n=Ao[a],(n=24===a||25===a?(24===a?Ro:Fo)[e[e.l+1]]:n)&&n.f?i.push([n.n,n.f(e,t,r)]):Pt(e,t);return i}Fo[33]=Fo[32];var Po={PtgAdd:"+",PtgConcat:"&",PtgDiv:"/",PtgEq:"=",PtgGe:">=",PtgGt:">",PtgLe:"<=",PtgLt:"<",PtgMul:"*",PtgNe:"<>",PtgPower:"^",PtgSub:"-"},No=new RegExp(/[^\w\u4E00-\u9FFF\u3040-\u30FF]/);function Mo(e,t,r){if(!e)return"SH33TJSERR0";if(8<r.biff&&(!e.XTI||!e.XTI[t]))return e.SheetNames[t];if(!e.XTI)return"SH33TJSERR6";var n=e.XTI[t];if(r.biff<8)return 1e4<t&&(t-=65536),0==(t=t<0?-t:t)?"":e.XTI[t-1];if(!n)return"SH33TJSERR1";var a="";if(8<r.biff)switch(e[n[0]][0]){case 357:return a=-1==n[1]?"#REF":e.SheetNames[n[1]],n[1]==n[2]?a:a+":"+e.SheetNames[n[2]];case 358:return null!=r.SID?e.SheetNames[r.SID]:"SH33TJSSAME"+e[n[0]][0];case 355:default:return"SH33TJSSRC"+e[n[0]][0]}switch(e[n[0]][0][0]){case 1025:return a=-1==n[1]?"#REF":e.SheetNames[n[1]]||"SH33TJSERR3",n[1]==n[2]?a:a+":"+e.SheetNames[n[2]];case 14849:return e[n[0]].slice(1).map(function(e){return e.Name}).join(";;");default:return e[n[0]][0][3]?(a=-1==n[1]?"#REF":e[n[0]][0][3][n[1]]||"SH33TJSERR4",n[1]==n[2]?a:a+":"+e[n[0]][0][3][n[2]]):"SH33TJSERR2"}}function Lo(e,t,r){return function(e,t){if(!(e||t&&t.biff<=5&&2<=t.biff))throw new Error("empty sheet name");return No.test(e)?"'"+e+"'":e}(Mo(e,t,r),r)}function Uo(e,t,r,n,a){var s,i,o,l=a&&a.biff||8,c={s:{c:0,r:0},e:{c:0,r:0}},f=[],h=0,u=0,d="";if(!e[0]||!e[0][0])return"";for(var p=-1,m="",g=0,b=e[0].length;g<b;++g){var v=e[0][g];switch(v[0]){case"PtgUminus":f.push("-"+f.pop());break;case"PtgUplus":f.push("+"+f.pop());break;case"PtgPercent":f.push(f.pop()+"%");break;case"PtgAdd":case"PtgConcat":case"PtgDiv":case"PtgEq":case"PtgGe":case"PtgGt":case"PtgLe":case"PtgLt":case"PtgMul":case"PtgNe":case"PtgPower":case"PtgSub":if(I=f.pop(),s=f.pop(),0<=p){switch(e[0][p][1][0]){case 0:m=F(" ",e[0][p][1][1]);break;case 1:m=F("\r",e[0][p][1][1]);break;default:if(m="",a.WTF)throw new Error("Unexpected PtgAttrSpaceType "+e[0][p][1][0])}s+=m,p=-1}f.push(s+Po[v[0]]+I);break;case"PtgIsect":I=f.pop(),s=f.pop(),f.push(s+" "+I);break;case"PtgUnion":I=f.pop(),s=f.pop(),f.push(s+","+I);break;case"PtgRange":I=f.pop(),s=f.pop(),f.push(s+":"+I);break;case"PtgAttrChoose":case"PtgAttrGoto":case"PtgAttrIf":case"PtgAttrIfError":break;case"PtgRef":i=Ht(v[1][1],c,a),f.push(Vt(i,l));break;case"PtgRefN":i=r?Ht(v[1][1],r,a):v[1][1],f.push(Vt(i,l));break;case"PtgRef3d":h=v[1][1],i=Ht(v[1][2],c,a);d=Lo(n,h,a);f.push(d+"!"+Vt(i,l));break;case"PtgFunc":case"PtgFuncVar":var E=v[1][0],S=v[1][1],E=E||0,w=0==(E&=127)?[]:f.slice(-E);f.length-=E,"User"===S&&(S=w.shift()),f.push(S+"("+w.join(",")+")");break;case"PtgBool":f.push(v[1]?"TRUE":"FALSE");break;case"PtgInt":f.push(v[1]);break;case"PtgNum":f.push(String(v[1]));break;case"PtgStr":f.push('"'+v[1].replace(/"/g,'""')+'"');break;case"PtgErr":f.push(v[1]);break;case"PtgAreaN":o=Wt(v[1][1],r?{s:r}:c,a),f.push(Xt(o,a));break;case"PtgArea":o=Wt(v[1][1],c,a),f.push(Xt(o,a));break;case"PtgArea3d":h=v[1][1],o=v[1][2],d=Lo(n,h,a),f.push(d+"!"+Xt(o,a));break;case"PtgAttrSum":f.push("SUM("+f.pop()+")");break;case"PtgAttrBaxcel":case"PtgAttrSemi":break;case"PtgName":u=v[1][2];var C=(n.names||[])[u-1]||(n[0]||[])[u],B=C?C.Name:"SH33TJSNAME"+String(u);B in Qo&&(B=Qo[B]),f.push(B);break;case"PtgNameX":var T,k=v[1][1],u=v[1][2];if(!(a.biff<=5)){C="";14849==((n[k]||[])[0]||[])[0]||(1025==((n[k]||[])[0]||[])[0]?n[k][u]&&0<n[k][u].itab&&(C=n.SheetNames[n[k][u].itab-1]+"!"):C=n.SheetNames[u-1]+"!"),n[k]&&n[k][u]?C+=n[k][u].Name:n[0]&&n[0][u]?C+=n[0][u].Name:(B=Mo(n,k,a).split(";;"))[u-1]?C=B[u-1]:C+="SH33TJSERRX",f.push(C);break}T=(T=n[k=k<0?-k:k]?n[k][u]:T)||{Name:"SH33TJSERRY"},f.push(T.Name);break;case"PtgParen":var x="(",_=")";if(0<=p){switch(m="",e[0][p][1][0]){case 2:x=F(" ",e[0][p][1][1])+x;break;case 3:x=F("\r",e[0][p][1][1])+x;break;case 4:_=F(" ",e[0][p][1][1])+_;break;case 5:_=F("\r",e[0][p][1][1])+_;break;default:if(a.WTF)throw new Error("Unexpected PtgAttrSpaceType "+e[0][p][1][0])}p=-1}f.push(x+f.pop()+_);break;case"PtgRefErr":case"PtgRefErr3d":f.push("#REF!");break;case"PtgExp":i={c:v[1][1],r:v[1][0]};var y={c:r.c,r:r.r};if(n.sharedf[Yt(i)]){k=n.sharedf[Yt(i)];f.push(Uo(k,0,y,n,a))}else{for(var A=!1,I=0;I!=n.arrayf.length;++I)if(s=n.arrayf[I],!(i.c<s[0].s.c||i.c>s[0].e.c||i.r<s[0].s.r||i.r>s[0].e.r)){f.push(Uo(s[1],0,y,n,a)),A=!0;break}A||f.push(v[1])}break;case"PtgArray":f.push("{"+function(e){for(var t=[],r=0;r<e.length;++r){for(var n=e[r],a=[],s=0;s<n.length;++s){var i=n[s];i?2===i[0]?a.push('"'+i[1].replace(/"/g,'""')+'"'):a.push(i[1]):a.push("")}t.push(a.join(","))}return t.join(";")}(v[1])+"}");break;case"PtgMemArea":break;case"PtgAttrSpace":case"PtgAttrSpaceSemi":p=g;break;case"PtgTbl":case"PtgMemErr":break;case"PtgMissArg":f.push("");break;case"PtgAreaErr":case"PtgAreaErr3d":f.push("#REF!");break;case"PtgList":f.push("Table"+v[1].idx+"[#"+v[1].rt+"]");break;case"PtgMemAreaN":case"PtgMemNoMemN":case"PtgAttrNoop":case"PtgSheet":case"PtgEndSheet":case"PtgMemFunc":case"PtgMemNoMem":break;case"PtgElfCol":case"PtgElfColS":case"PtgElfColSV":case"PtgElfColV":case"PtgElfLel":case"PtgElfRadical":case"PtgElfRadicalLel":case"PtgElfRadicalS":case"PtgElfRw":case"PtgElfRwV":throw new Error("Unsupported ELFs");case"PtgSxName":default:throw new Error("Unrecognized Formula Token: "+String(v))}if(3!=a.biff&&0<=p&&-1==["PtgAttrSpace","PtgAttrSpaceSemi","PtgAttrGoto"].indexOf(e[0][g][0])){var R=!0;switch((v=e[0][p])[1][0]){case 4:R=!1;case 0:m=F(" ",v[1][1]);break;case 5:R=!1;case 1:m=F("\r",v[1][1]);break;default:if(m="",a.WTF)throw new Error("Unexpected PtgAttrSpaceType "+v[1][0])}f.push((R?m:"")+f.pop()+(R?"":m)),p=-1}}if(1<f.length&&a.WTF)throw new Error("bad formula stack");return f[0]}function Ho(e,t,r){var n=e.l+t,a=qn(e);2==r.biff&&++e.l;var s=function(e){var t;if(65535!==Bt(e,e.l+6))return[Br(e),"n"];switch(e[e.l]){case 0:return e.l+=8,["String","s"];case 1:return t=1===e[e.l+2],e.l+=8,[t,"b"];case 2:return t=e[e.l+2],e.l+=8,[t,"e"];case 3:return e.l+=8,["","s"]}return[]}(e),t=e.read_shift(1);2!=r.biff&&(e.read_shift(1),5<=r.biff&&e.read_shift(4));r=function(e,t,r){var n,a=e.l+t,s=2==r.biff?1:2,i=e.read_shift(s);if(65535==i)return[[],Pt(e,t-2)];var o=Oo(e,i,r);return t!==i+s&&(n=Do(e,t-i-s,o,r)),e.l=a,[o,n]}(e,n-e.l,r);return{cell:a,val:s[0],formula:r,shared:t>>3&1,tt:s[1]}}function Wo(e,t,r,n,a){t=Zn(t,r,a),a=null!=(r=e.v)?Tr("number"==typeof r?r:0):((r=Nt(8)).write_shift(1,3),r.write_shift(1,0),r.write_shift(2,0),r.write_shift(2,0),r.write_shift(2,65535),r),r=Nt(6);r.write_shift(2,33),r.write_shift(4,0);for(var s=Nt(e.bf.length),i=0;i<e.bf.length;++i)s[i]=e.bf[i];return he([t,a,r,s])}function Vo(e,t,r){var n=e.read_shift(4),a=Oo(e,n,r),n=e.read_shift(4);return[a,0<n?Do(e,n,a,r):null]}var Xo=Vo,Go=Vo,zo=Vo,jo=Vo,$o={0:"BEEP",1:"OPEN",2:"OPEN.LINKS",3:"CLOSE.ALL",4:"SAVE",5:"SAVE.AS",6:"FILE.DELETE",7:"PAGE.SETUP",8:"PRINT",9:"PRINTER.SETUP",10:"QUIT",11:"NEW.WINDOW",12:"ARRANGE.ALL",13:"WINDOW.SIZE",14:"WINDOW.MOVE",15:"FULL",16:"CLOSE",17:"RUN",22:"SET.PRINT.AREA",23:"SET.PRINT.TITLES",24:"SET.PAGE.BREAK",25:"REMOVE.PAGE.BREAK",26:"FONT",27:"DISPLAY",28:"PROTECT.DOCUMENT",29:"PRECISION",30:"A1.R1C1",31:"CALCULATE.NOW",32:"CALCULATION",34:"DATA.FIND",35:"EXTRACT",36:"DATA.DELETE",37:"SET.DATABASE",38:"SET.CRITERIA",39:"SORT",40:"DATA.SERIES",41:"TABLE",42:"FORMAT.NUMBER",43:"ALIGNMENT",44:"STYLE",45:"BORDER",46:"CELL.PROTECTION",47:"COLUMN.WIDTH",48:"UNDO",49:"CUT",50:"COPY",51:"PASTE",52:"CLEAR",53:"PASTE.SPECIAL",54:"EDIT.DELETE",55:"INSERT",56:"FILL.RIGHT",57:"FILL.DOWN",61:"DEFINE.NAME",62:"CREATE.NAMES",63:"FORMULA.GOTO",64:"FORMULA.FIND",65:"SELECT.LAST.CELL",66:"SHOW.ACTIVE.CELL",67:"GALLERY.AREA",68:"GALLERY.BAR",69:"GALLERY.COLUMN",70:"GALLERY.LINE",71:"GALLERY.PIE",72:"GALLERY.SCATTER",73:"COMBINATION",74:"PREFERRED",75:"ADD.OVERLAY",76:"GRIDLINES",77:"SET.PREFERRED",78:"AXES",79:"LEGEND",80:"ATTACH.TEXT",81:"ADD.ARROW",82:"SELECT.CHART",83:"SELECT.PLOT.AREA",84:"PATTERNS",85:"MAIN.CHART",86:"OVERLAY",87:"SCALE",88:"FORMAT.LEGEND",89:"FORMAT.TEXT",90:"EDIT.REPEAT",91:"PARSE",92:"JUSTIFY",93:"HIDE",94:"UNHIDE",95:"WORKSPACE",96:"FORMULA",97:"FORMULA.FILL",98:"FORMULA.ARRAY",99:"DATA.FIND.NEXT",100:"DATA.FIND.PREV",101:"FORMULA.FIND.NEXT",102:"FORMULA.FIND.PREV",103:"ACTIVATE",104:"ACTIVATE.NEXT",105:"ACTIVATE.PREV",106:"UNLOCKED.NEXT",107:"UNLOCKED.PREV",108:"COPY.PICTURE",109:"SELECT",110:"DELETE.NAME",111:"DELETE.FORMAT",112:"VLINE",113:"HLINE",114:"VPAGE",115:"HPAGE",116:"VSCROLL",117:"HSCROLL",118:"ALERT",119:"NEW",120:"CANCEL.COPY",121:"SHOW.CLIPBOARD",122:"MESSAGE",124:"PASTE.LINK",125:"APP.ACTIVATE",126:"DELETE.ARROW",127:"ROW.HEIGHT",128:"FORMAT.MOVE",129:"FORMAT.SIZE",130:"FORMULA.REPLACE",131:"SEND.KEYS",132:"SELECT.SPECIAL",133:"APPLY.NAMES",134:"REPLACE.FONT",135:"FREEZE.PANES",136:"SHOW.INFO",137:"SPLIT",138:"ON.WINDOW",139:"ON.DATA",140:"DISABLE.INPUT",142:"OUTLINE",143:"LIST.NAMES",144:"FILE.CLOSE",145:"SAVE.WORKBOOK",146:"DATA.FORM",147:"COPY.CHART",148:"ON.TIME",149:"WAIT",150:"FORMAT.FONT",151:"FILL.UP",152:"FILL.LEFT",153:"DELETE.OVERLAY",155:"SHORT.MENUS",159:"SET.UPDATE.STATUS",161:"COLOR.PALETTE",162:"DELETE.STYLE",163:"WINDOW.RESTORE",164:"WINDOW.MAXIMIZE",166:"CHANGE.LINK",167:"CALCULATE.DOCUMENT",168:"ON.KEY",169:"APP.RESTORE",170:"APP.MOVE",171:"APP.SIZE",172:"APP.MINIMIZE",173:"APP.MAXIMIZE",174:"BRING.TO.FRONT",175:"SEND.TO.BACK",185:"MAIN.CHART.TYPE",186:"OVERLAY.CHART.TYPE",187:"SELECT.END",188:"OPEN.MAIL",189:"SEND.MAIL",190:"STANDARD.FONT",191:"CONSOLIDATE",192:"SORT.SPECIAL",193:"GALLERY.3D.AREA",194:"GALLERY.3D.COLUMN",195:"GALLERY.3D.LINE",196:"GALLERY.3D.PIE",197:"VIEW.3D",198:"GOAL.SEEK",199:"WORKGROUP",200:"FILL.GROUP",201:"UPDATE.LINK",202:"PROMOTE",203:"DEMOTE",204:"SHOW.DETAIL",206:"UNGROUP",207:"OBJECT.PROPERTIES",208:"SAVE.NEW.OBJECT",209:"SHARE",210:"SHARE.NAME",211:"DUPLICATE",212:"APPLY.STYLE",213:"ASSIGN.TO.OBJECT",214:"OBJECT.PROTECTION",215:"HIDE.OBJECT",216:"SET.EXTRACT",217:"CREATE.PUBLISHER",218:"SUBSCRIBE.TO",219:"ATTRIBUTES",220:"SHOW.TOOLBAR",222:"PRINT.PREVIEW",223:"EDIT.COLOR",224:"SHOW.LEVELS",225:"FORMAT.MAIN",226:"FORMAT.OVERLAY",227:"ON.RECALC",228:"EDIT.SERIES",229:"DEFINE.STYLE",240:"LINE.PRINT",243:"ENTER.DATA",249:"GALLERY.RADAR",250:"MERGE.STYLES",251:"EDITION.OPTIONS",252:"PASTE.PICTURE",253:"PASTE.PICTURE.LINK",254:"SPELLING",256:"ZOOM",259:"INSERT.OBJECT",260:"WINDOW.MINIMIZE",265:"SOUND.NOTE",266:"SOUND.PLAY",267:"FORMAT.SHAPE",268:"EXTEND.POLYGON",269:"FORMAT.AUTO",272:"GALLERY.3D.BAR",273:"GALLERY.3D.SURFACE",274:"FILL.AUTO",276:"CUSTOMIZE.TOOLBAR",277:"ADD.TOOL",278:"EDIT.OBJECT",279:"ON.DOUBLECLICK",280:"ON.ENTRY",281:"WORKBOOK.ADD",282:"WORKBOOK.MOVE",283:"WORKBOOK.COPY",284:"WORKBOOK.OPTIONS",285:"SAVE.WORKSPACE",288:"CHART.WIZARD",289:"DELETE.TOOL",290:"MOVE.TOOL",291:"WORKBOOK.SELECT",292:"WORKBOOK.ACTIVATE",293:"ASSIGN.TO.TOOL",295:"COPY.TOOL",296:"RESET.TOOL",297:"CONSTRAIN.NUMERIC",298:"PASTE.TOOL",302:"WORKBOOK.NEW",305:"SCENARIO.CELLS",306:"SCENARIO.DELETE",307:"SCENARIO.ADD",308:"SCENARIO.EDIT",309:"SCENARIO.SHOW",310:"SCENARIO.SHOW.NEXT",311:"SCENARIO.SUMMARY",312:"PIVOT.TABLE.WIZARD",313:"PIVOT.FIELD.PROPERTIES",314:"PIVOT.FIELD",315:"PIVOT.ITEM",316:"PIVOT.ADD.FIELDS",318:"OPTIONS.CALCULATION",319:"OPTIONS.EDIT",320:"OPTIONS.VIEW",321:"ADDIN.MANAGER",322:"MENU.EDITOR",323:"ATTACH.TOOLBARS",324:"VBAActivate",325:"OPTIONS.CHART",328:"VBA.INSERT.FILE",330:"VBA.PROCEDURE.DEFINITION",336:"ROUTING.SLIP",338:"ROUTE.DOCUMENT",339:"MAIL.LOGON",342:"INSERT.PICTURE",343:"EDIT.TOOL",344:"GALLERY.DOUGHNUT",350:"CHART.TREND",352:"PIVOT.ITEM.PROPERTIES",354:"WORKBOOK.INSERT",355:"OPTIONS.TRANSITION",356:"OPTIONS.GENERAL",370:"FILTER.ADVANCED",373:"MAIL.ADD.MAILER",374:"MAIL.DELETE.MAILER",375:"MAIL.REPLY",376:"MAIL.REPLY.ALL",377:"MAIL.FORWARD",378:"MAIL.NEXT.LETTER",379:"DATA.LABEL",380:"INSERT.TITLE",381:"FONT.PROPERTIES",382:"MACRO.OPTIONS",383:"WORKBOOK.HIDE",384:"WORKBOOK.UNHIDE",385:"WORKBOOK.DELETE",386:"WORKBOOK.NAME",388:"GALLERY.CUSTOM",390:"ADD.CHART.AUTOFORMAT",391:"DELETE.CHART.AUTOFORMAT",392:"CHART.ADD.DATA",393:"AUTO.OUTLINE",394:"TAB.ORDER",395:"SHOW.DIALOG",396:"SELECT.ALL",397:"UNGROUP.SHEETS",398:"SUBTOTAL.CREATE",399:"SUBTOTAL.REMOVE",400:"RENAME.OBJECT",412:"WORKBOOK.SCROLL",413:"WORKBOOK.NEXT",414:"WORKBOOK.PREV",415:"WORKBOOK.TAB.SPLIT",416:"FULL.SCREEN",417:"WORKBOOK.PROTECT",420:"SCROLLBAR.PROPERTIES",421:"PIVOT.SHOW.PAGES",422:"TEXT.TO.COLUMNS",423:"FORMAT.CHARTTYPE",424:"LINK.FORMAT",425:"TRACER.DISPLAY",430:"TRACER.NAVIGATE",431:"TRACER.CLEAR",432:"TRACER.ERROR",433:"PIVOT.FIELD.GROUP",434:"PIVOT.FIELD.UNGROUP",435:"CHECKBOX.PROPERTIES",436:"LABEL.PROPERTIES",437:"LISTBOX.PROPERTIES",438:"EDITBOX.PROPERTIES",439:"PIVOT.REFRESH",440:"LINK.COMBO",441:"OPEN.TEXT",442:"HIDE.DIALOG",443:"SET.DIALOG.FOCUS",444:"ENABLE.OBJECT",445:"PUSHBUTTON.PROPERTIES",446:"SET.DIALOG.DEFAULT",447:"FILTER",448:"FILTER.SHOW.ALL",449:"CLEAR.OUTLINE",450:"FUNCTION.WIZARD",451:"ADD.LIST.ITEM",452:"SET.LIST.ITEM",453:"REMOVE.LIST.ITEM",454:"SELECT.LIST.ITEM",455:"SET.CONTROL.VALUE",456:"SAVE.COPY.AS",458:"OPTIONS.LISTS.ADD",459:"OPTIONS.LISTS.DELETE",460:"SERIES.AXES",461:"SERIES.X",462:"SERIES.Y",463:"ERRORBAR.X",464:"ERRORBAR.Y",465:"FORMAT.CHART",466:"SERIES.ORDER",467:"MAIL.LOGOFF",468:"CLEAR.ROUTING.SLIP",469:"APP.ACTIVATE.MICROSOFT",470:"MAIL.EDIT.MAILER",471:"ON.SHEET",472:"STANDARD.WIDTH",473:"SCENARIO.MERGE",474:"SUMMARY.INFO",475:"FIND.FILE",476:"ACTIVE.CELL.FONT",477:"ENABLE.TIPWIZARD",478:"VBA.MAKE.ADDIN",480:"INSERTDATATABLE",481:"WORKGROUP.OPTIONS",482:"MAIL.SEND.MAILER",485:"AUTOCORRECT",489:"POST.DOCUMENT",491:"PICKLIST",493:"VIEW.SHOW",494:"VIEW.DEFINE",495:"VIEW.DELETE",509:"SHEET.BACKGROUND",510:"INSERT.MAP.OBJECT",511:"OPTIONS.MENONO",517:"MSOCHECKS",518:"NORMAL",519:"LAYOUT",520:"RM.PRINT.AREA",521:"CLEAR.PRINT.AREA",522:"ADD.PRINT.AREA",523:"MOVE.BRK",545:"HIDECURR.NOTE",546:"HIDEALL.NOTES",547:"DELETE.NOTE",548:"TRAVERSE.NOTES",549:"ACTIVATE.NOTES",620:"PROTECT.REVISIONS",621:"UNPROTECT.REVISIONS",647:"OPTIONS.ME",653:"WEB.PUBLISH",667:"NEWWEBQUERY",673:"PIVOT.TABLE.CHART",753:"OPTIONS.SAVE",755:"OPTIONS.SPELL",808:"HIDEALL.INKANNOTS"},Ko={0:"COUNT",1:"IF",2:"ISNA",3:"ISERROR",4:"SUM",5:"AVERAGE",6:"MIN",7:"MAX",8:"ROW",9:"COLUMN",10:"NA",11:"NPV",12:"STDEV",13:"DOLLAR",14:"FIXED",15:"SIN",16:"COS",17:"TAN",18:"ATAN",19:"PI",20:"SQRT",21:"EXP",22:"LN",23:"LOG10",24:"ABS",25:"INT",26:"SIGN",27:"ROUND",28:"LOOKUP",29:"INDEX",30:"REPT",31:"MID",32:"LEN",33:"VALUE",34:"TRUE",35:"FALSE",36:"AND",37:"OR",38:"NOT",39:"MOD",40:"DCOUNT",41:"DSUM",42:"DAVERAGE",43:"DMIN",44:"DMAX",45:"DSTDEV",46:"VAR",47:"DVAR",48:"TEXT",49:"LINEST",50:"TREND",51:"LOGEST",52:"GROWTH",53:"GOTO",54:"HALT",55:"RETURN",56:"PV",57:"FV",58:"NPER",59:"PMT",60:"RATE",61:"MIRR",62:"IRR",63:"RAND",64:"MATCH",65:"DATE",66:"TIME",67:"DAY",68:"MONTH",69:"YEAR",70:"WEEKDAY",71:"HOUR",72:"MINUTE",73:"SECOND",74:"NOW",75:"AREAS",76:"ROWS",77:"COLUMNS",78:"OFFSET",79:"ABSREF",80:"RELREF",81:"ARGUMENT",82:"SEARCH",83:"TRANSPOSE",84:"ERROR",85:"STEP",86:"TYPE",87:"ECHO",88:"SET.NAME",89:"CALLER",90:"DEREF",91:"WINDOWS",92:"SERIES",93:"DOCUMENTS",94:"ACTIVE.CELL",95:"SELECTION",96:"RESULT",97:"ATAN2",98:"ASIN",99:"ACOS",100:"CHOOSE",101:"HLOOKUP",102:"VLOOKUP",103:"LINKS",104:"INPUT",105:"ISREF",106:"GET.FORMULA",107:"GET.NAME",108:"SET.VALUE",109:"LOG",110:"EXEC",111:"CHAR",112:"LOWER",113:"UPPER",114:"PROPER",115:"LEFT",116:"RIGHT",117:"EXACT",118:"TRIM",119:"REPLACE",120:"SUBSTITUTE",121:"CODE",122:"NAMES",123:"DIRECTORY",124:"FIND",125:"CELL",126:"ISERR",127:"ISTEXT",128:"ISNUMBER",129:"ISBLANK",130:"T",131:"N",132:"FOPEN",133:"FCLOSE",134:"FSIZE",135:"FREADLN",136:"FREAD",137:"FWRITELN",138:"FWRITE",139:"FPOS",140:"DATEVALUE",141:"TIMEVALUE",142:"SLN",143:"SYD",144:"DDB",145:"GET.DEF",146:"REFTEXT",147:"TEXTREF",148:"INDIRECT",149:"REGISTER",150:"CALL",151:"ADD.BAR",152:"ADD.MENU",153:"ADD.COMMAND",154:"ENABLE.COMMAND",155:"CHECK.COMMAND",156:"RENAME.COMMAND",157:"SHOW.BAR",158:"DELETE.MENU",159:"DELETE.COMMAND",160:"GET.CHART.ITEM",161:"DIALOG.BOX",162:"CLEAN",163:"MDETERM",164:"MINVERSE",165:"MMULT",166:"FILES",167:"IPMT",168:"PPMT",169:"COUNTA",170:"CANCEL.KEY",171:"FOR",172:"WHILE",173:"BREAK",174:"NEXT",175:"INITIATE",176:"REQUEST",177:"POKE",178:"EXECUTE",179:"TERMINATE",180:"RESTART",181:"HELP",182:"GET.BAR",183:"PRODUCT",184:"FACT",185:"GET.CELL",186:"GET.WORKSPACE",187:"GET.WINDOW",188:"GET.DOCUMENT",189:"DPRODUCT",190:"ISNONTEXT",191:"GET.NOTE",192:"NOTE",193:"STDEVP",194:"VARP",195:"DSTDEVP",196:"DVARP",197:"TRUNC",198:"ISLOGICAL",199:"DCOUNTA",200:"DELETE.BAR",201:"UNREGISTER",204:"USDOLLAR",205:"FINDB",206:"SEARCHB",207:"REPLACEB",208:"LEFTB",209:"RIGHTB",210:"MIDB",211:"LENB",212:"ROUNDUP",213:"ROUNDDOWN",214:"ASC",215:"DBCS",216:"RANK",219:"ADDRESS",220:"DAYS360",221:"TODAY",222:"VDB",223:"ELSE",224:"ELSE.IF",225:"END.IF",226:"FOR.CELL",227:"MEDIAN",228:"SUMPRODUCT",229:"SINH",230:"COSH",231:"TANH",232:"ASINH",233:"ACOSH",234:"ATANH",235:"DGET",236:"CREATE.OBJECT",237:"VOLATILE",238:"LAST.ERROR",239:"CUSTOM.UNDO",240:"CUSTOM.REPEAT",241:"FORMULA.CONVERT",242:"GET.LINK.INFO",243:"TEXT.BOX",244:"INFO",245:"GROUP",246:"GET.OBJECT",247:"DB",248:"PAUSE",251:"RESUME",252:"FREQUENCY",253:"ADD.TOOLBAR",254:"DELETE.TOOLBAR",255:"User",256:"RESET.TOOLBAR",257:"EVALUATE",258:"GET.TOOLBAR",259:"GET.TOOL",260:"SPELLING.CHECK",261:"ERROR.TYPE",262:"APP.TITLE",263:"WINDOW.TITLE",264:"SAVE.TOOLBAR",265:"ENABLE.TOOL",266:"PRESS.TOOL",267:"REGISTER.ID",268:"GET.WORKBOOK",269:"AVEDEV",270:"BETADIST",271:"GAMMALN",272:"BETAINV",273:"BINOMDIST",274:"CHIDIST",275:"CHIINV",276:"COMBIN",277:"CONFIDENCE",278:"CRITBINOM",279:"EVEN",280:"EXPONDIST",281:"FDIST",282:"FINV",283:"FISHER",284:"FISHERINV",285:"FLOOR",286:"GAMMADIST",287:"GAMMAINV",288:"CEILING",289:"HYPGEOMDIST",290:"LOGNORMDIST",291:"LOGINV",292:"NEGBINOMDIST",293:"NORMDIST",294:"NORMSDIST",295:"NORMINV",296:"NORMSINV",297:"STANDARDIZE",298:"ODD",299:"PERMUT",300:"POISSON",301:"TDIST",302:"WEIBULL",303:"SUMXMY2",304:"SUMX2MY2",305:"SUMX2PY2",306:"CHITEST",307:"CORREL",308:"COVAR",309:"FORECAST",310:"FTEST",311:"INTERCEPT",312:"PEARSON",313:"RSQ",314:"STEYX",315:"SLOPE",316:"TTEST",317:"PROB",318:"DEVSQ",319:"GEOMEAN",320:"HARMEAN",321:"SUMSQ",322:"KURT",323:"SKEW",324:"ZTEST",325:"LARGE",326:"SMALL",327:"QUARTILE",328:"PERCENTILE",329:"PERCENTRANK",330:"MODE",331:"TRIMMEAN",332:"TINV",334:"MOVIE.COMMAND",335:"GET.MOVIE",336:"CONCATENATE",337:"POWER",338:"PIVOT.ADD.DATA",339:"GET.PIVOT.TABLE",340:"GET.PIVOT.FIELD",341:"GET.PIVOT.ITEM",342:"RADIANS",343:"DEGREES",344:"SUBTOTAL",345:"SUMIF",346:"COUNTIF",347:"COUNTBLANK",348:"SCENARIO.GET",349:"OPTIONS.LISTS.GET",350:"ISPMT",351:"DATEDIF",352:"DATESTRING",353:"NUMBERSTRING",354:"ROMAN",355:"OPEN.DIALOG",356:"SAVE.DIALOG",357:"VIEW.GET",358:"GETPIVOTDATA",359:"HYPERLINK",360:"PHONETIC",361:"AVERAGEA",362:"MAXA",363:"MINA",364:"STDEVPA",365:"VARPA",366:"STDEVA",367:"VARA",368:"BAHTTEXT",369:"THAIDAYOFWEEK",370:"THAIDIGIT",371:"THAIMONTHOFYEAR",372:"THAINUMSOUND",373:"THAINUMSTRING",374:"THAISTRINGLENGTH",375:"ISTHAIDIGIT",376:"ROUNDBAHTDOWN",377:"ROUNDBAHTUP",378:"THAIYEAR",379:"RTD",380:"CUBEVALUE",381:"CUBEMEMBER",382:"CUBEMEMBERPROPERTY",383:"CUBERANKEDMEMBER",384:"HEX2BIN",385:"HEX2DEC",386:"HEX2OCT",387:"DEC2BIN",388:"DEC2HEX",389:"DEC2OCT",390:"OCT2BIN",391:"OCT2HEX",392:"OCT2DEC",393:"BIN2DEC",394:"BIN2OCT",395:"BIN2HEX",396:"IMSUB",397:"IMDIV",398:"IMPOWER",399:"IMABS",400:"IMSQRT",401:"IMLN",402:"IMLOG2",403:"IMLOG10",404:"IMSIN",405:"IMCOS",406:"IMEXP",407:"IMARGUMENT",408:"IMCONJUGATE",409:"IMAGINARY",410:"IMREAL",411:"COMPLEX",412:"IMSUM",413:"IMPRODUCT",414:"SERIESSUM",415:"FACTDOUBLE",416:"SQRTPI",417:"QUOTIENT",418:"DELTA",419:"GESTEP",420:"ISEVEN",421:"ISODD",422:"MROUND",423:"ERF",424:"ERFC",425:"BESSELJ",426:"BESSELK",427:"BESSELY",428:"BESSELI",429:"XIRR",430:"XNPV",431:"PRICEMAT",432:"YIELDMAT",433:"INTRATE",434:"RECEIVED",435:"DISC",436:"PRICEDISC",437:"YIELDDISC",438:"TBILLEQ",439:"TBILLPRICE",440:"TBILLYIELD",441:"PRICE",442:"YIELD",443:"DOLLARDE",444:"DOLLARFR",445:"NOMINAL",446:"EFFECT",447:"CUMPRINC",448:"CUMIPMT",449:"EDATE",450:"EOMONTH",451:"YEARFRAC",452:"COUPDAYBS",453:"COUPDAYS",454:"COUPDAYSNC",455:"COUPNCD",456:"COUPNUM",457:"COUPPCD",458:"DURATION",459:"MDURATION",460:"ODDLPRICE",461:"ODDLYIELD",462:"ODDFPRICE",463:"ODDFYIELD",464:"RANDBETWEEN",465:"WEEKNUM",466:"AMORDEGRC",467:"AMORLINC",468:"CONVERT",724:"SHEETJS",469:"ACCRINT",470:"ACCRINTM",471:"WORKDAY",472:"NETWORKDAYS",473:"GCD",474:"MULTINOMIAL",475:"LCM",476:"FVSCHEDULE",477:"CUBEKPIMEMBER",478:"CUBESET",479:"CUBESETCOUNT",480:"IFERROR",481:"COUNTIFS",482:"SUMIFS",483:"AVERAGEIF",484:"AVERAGEIFS"},Yo={2:1,3:1,10:0,15:1,16:1,17:1,18:1,19:0,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:2,30:2,31:3,32:1,33:1,34:0,35:0,38:1,39:2,40:3,41:3,42:3,43:3,44:3,45:3,47:3,48:2,53:1,61:3,63:0,65:3,66:3,67:1,68:1,69:1,70:1,71:1,72:1,73:1,74:0,75:1,76:1,77:1,79:2,80:2,83:1,85:0,86:1,89:0,90:1,94:0,95:0,97:2,98:1,99:1,101:3,102:3,105:1,106:1,108:2,111:1,112:1,113:1,114:1,117:2,118:1,119:4,121:1,126:1,127:1,128:1,129:1,130:1,131:1,133:1,134:1,135:1,136:2,137:2,138:2,140:1,141:1,142:3,143:4,144:4,161:1,162:1,163:1,164:1,165:2,172:1,175:2,176:2,177:3,178:2,179:1,184:1,186:1,189:3,190:1,195:3,196:3,197:1,198:1,199:3,201:1,207:4,210:3,211:1,212:2,213:2,214:1,215:1,225:0,229:1,230:1,231:1,232:1,233:1,234:1,235:3,244:1,247:4,252:2,257:1,261:1,271:1,273:4,274:2,275:2,276:2,277:3,278:3,279:1,280:3,281:3,282:3,283:1,284:1,285:2,286:4,287:3,288:2,289:4,290:3,291:3,292:3,293:4,294:1,295:3,296:1,297:3,298:1,299:2,300:3,301:3,302:4,303:2,304:2,305:2,306:2,307:2,308:2,309:3,310:2,311:2,312:2,313:2,314:2,315:2,316:4,325:2,326:2,327:2,328:2,331:2,332:2,337:2,342:1,343:1,346:2,347:1,350:4,351:3,352:1,353:2,360:1,368:1,369:1,370:1,371:1,372:1,373:1,374:1,375:1,376:1,377:1,378:1,382:3,385:1,392:1,393:1,396:2,397:2,398:2,399:1,400:1,401:1,402:1,403:1,404:1,405:1,406:1,407:1,408:1,409:1,410:1,414:4,415:1,416:1,417:2,420:1,421:1,422:2,424:1,425:2,426:2,427:2,428:2,430:3,438:3,439:3,440:3,443:2,444:2,445:2,446:2,447:6,448:6,449:2,450:2,464:2,468:3,476:2,479:1,480:2,65535:0},Qo={"_xlfn.ACOT":"ACOT","_xlfn.ACOTH":"ACOTH","_xlfn.AGGREGATE":"AGGREGATE","_xlfn.ARABIC":"ARABIC","_xlfn.AVERAGEIF":"AVERAGEIF","_xlfn.AVERAGEIFS":"AVERAGEIFS","_xlfn.BASE":"BASE","_xlfn.BETA.DIST":"BETA.DIST","_xlfn.BETA.INV":"BETA.INV","_xlfn.BINOM.DIST":"BINOM.DIST","_xlfn.BINOM.DIST.RANGE":"BINOM.DIST.RANGE","_xlfn.BINOM.INV":"BINOM.INV","_xlfn.BITAND":"BITAND","_xlfn.BITLSHIFT":"BITLSHIFT","_xlfn.BITOR":"BITOR","_xlfn.BITRSHIFT":"BITRSHIFT","_xlfn.BITXOR":"BITXOR","_xlfn.CEILING.MATH":"CEILING.MATH","_xlfn.CEILING.PRECISE":"CEILING.PRECISE","_xlfn.CHISQ.DIST":"CHISQ.DIST","_xlfn.CHISQ.DIST.RT":"CHISQ.DIST.RT","_xlfn.CHISQ.INV":"CHISQ.INV","_xlfn.CHISQ.INV.RT":"CHISQ.INV.RT","_xlfn.CHISQ.TEST":"CHISQ.TEST","_xlfn.COMBINA":"COMBINA","_xlfn.CONCAT":"CONCAT","_xlfn.CONFIDENCE.NORM":"CONFIDENCE.NORM","_xlfn.CONFIDENCE.T":"CONFIDENCE.T","_xlfn.COT":"COT","_xlfn.COTH":"COTH","_xlfn.COUNTIFS":"COUNTIFS","_xlfn.COVARIANCE.P":"COVARIANCE.P","_xlfn.COVARIANCE.S":"COVARIANCE.S","_xlfn.CSC":"CSC","_xlfn.CSCH":"CSCH","_xlfn.DAYS":"DAYS","_xlfn.DECIMAL":"DECIMAL","_xlfn.ECMA.CEILING":"ECMA.CEILING","_xlfn.ERF.PRECISE":"ERF.PRECISE","_xlfn.ERFC.PRECISE":"ERFC.PRECISE","_xlfn.EXPON.DIST":"EXPON.DIST","_xlfn.F.DIST":"F.DIST","_xlfn.F.DIST.RT":"F.DIST.RT","_xlfn.F.INV":"F.INV","_xlfn.F.INV.RT":"F.INV.RT","_xlfn.F.TEST":"F.TEST","_xlfn.FILTERXML":"FILTERXML","_xlfn.FLOOR.MATH":"FLOOR.MATH","_xlfn.FLOOR.PRECISE":"FLOOR.PRECISE","_xlfn.FORECAST.ETS":"FORECAST.ETS","_xlfn.FORECAST.ETS.CONFINT":"FORECAST.ETS.CONFINT","_xlfn.FORECAST.ETS.SEASONALITY":"FORECAST.ETS.SEASONALITY","_xlfn.FORECAST.ETS.STAT":"FORECAST.ETS.STAT","_xlfn.FORECAST.LINEAR":"FORECAST.LINEAR","_xlfn.FORMULATEXT":"FORMULATEXT","_xlfn.GAMMA":"GAMMA","_xlfn.GAMMA.DIST":"GAMMA.DIST","_xlfn.GAMMA.INV":"GAMMA.INV","_xlfn.GAMMALN.PRECISE":"GAMMALN.PRECISE","_xlfn.GAUSS":"GAUSS","_xlfn.HYPGEOM.DIST":"HYPGEOM.DIST","_xlfn.IFERROR":"IFERROR","_xlfn.IFNA":"IFNA","_xlfn.IFS":"IFS","_xlfn.IMCOSH":"IMCOSH","_xlfn.IMCOT":"IMCOT","_xlfn.IMCSC":"IMCSC","_xlfn.IMCSCH":"IMCSCH","_xlfn.IMSEC":"IMSEC","_xlfn.IMSECH":"IMSECH","_xlfn.IMSINH":"IMSINH","_xlfn.IMTAN":"IMTAN","_xlfn.ISFORMULA":"ISFORMULA","_xlfn.ISO.CEILING":"ISO.CEILING","_xlfn.ISOWEEKNUM":"ISOWEEKNUM","_xlfn.LOGNORM.DIST":"LOGNORM.DIST","_xlfn.LOGNORM.INV":"LOGNORM.INV","_xlfn.MAXIFS":"MAXIFS","_xlfn.MINIFS":"MINIFS","_xlfn.MODE.MULT":"MODE.MULT","_xlfn.MODE.SNGL":"MODE.SNGL","_xlfn.MUNIT":"MUNIT","_xlfn.NEGBINOM.DIST":"NEGBINOM.DIST","_xlfn.NETWORKDAYS.INTL":"NETWORKDAYS.INTL","_xlfn.NIGBINOM":"NIGBINOM","_xlfn.NORM.DIST":"NORM.DIST","_xlfn.NORM.INV":"NORM.INV","_xlfn.NORM.S.DIST":"NORM.S.DIST","_xlfn.NORM.S.INV":"NORM.S.INV","_xlfn.NUMBERVALUE":"NUMBERVALUE","_xlfn.PDURATION":"PDURATION","_xlfn.PERCENTILE.EXC":"PERCENTILE.EXC","_xlfn.PERCENTILE.INC":"PERCENTILE.INC","_xlfn.PERCENTRANK.EXC":"PERCENTRANK.EXC","_xlfn.PERCENTRANK.INC":"PERCENTRANK.INC","_xlfn.PERMUTATIONA":"PERMUTATIONA","_xlfn.PHI":"PHI","_xlfn.POISSON.DIST":"POISSON.DIST","_xlfn.QUARTILE.EXC":"QUARTILE.EXC","_xlfn.QUARTILE.INC":"QUARTILE.INC","_xlfn.QUERYSTRING":"QUERYSTRING","_xlfn.RANK.AVG":"RANK.AVG","_xlfn.RANK.EQ":"RANK.EQ","_xlfn.RRI":"RRI","_xlfn.SEC":"SEC","_xlfn.SECH":"SECH","_xlfn.SHEET":"SHEET","_xlfn.SHEETS":"SHEETS","_xlfn.SKEW.P":"SKEW.P","_xlfn.STDEV.P":"STDEV.P","_xlfn.STDEV.S":"STDEV.S","_xlfn.SUMIFS":"SUMIFS","_xlfn.SWITCH":"SWITCH","_xlfn.T.DIST":"T.DIST","_xlfn.T.DIST.2T":"T.DIST.2T","_xlfn.T.DIST.RT":"T.DIST.RT","_xlfn.T.INV":"T.INV","_xlfn.T.INV.2T":"T.INV.2T","_xlfn.T.TEST":"T.TEST","_xlfn.TEXTJOIN":"TEXTJOIN","_xlfn.UNICHAR":"UNICHAR","_xlfn.UNICODE":"UNICODE","_xlfn.VAR.P":"VAR.P","_xlfn.VAR.S":"VAR.S","_xlfn.WEBSERVICE":"WEBSERVICE","_xlfn.WEIBULL.DIST":"WEIBULL.DIST","_xlfn.WORKDAY.INTL":"WORKDAY.INTL","_xlfn.XOR":"XOR","_xlfn.Z.TEST":"Z.TEST"};function Jo(e){return(e=(e=(e=(e=61==(e="of:"==e.slice(0,3)?e.slice(3):e).charCodeAt(0)&&61==(e=e.slice(1)).charCodeAt(0)?e.slice(1):e).replace(/COM\.MICROSOFT\./g,"")).replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g,function(e,t){return t.replace(/\./g,"")})).replace(/\[.(#[A-Z]*[?!])\]/g,"$1")).replace(/[;~]/g,",").replace(/\|/g,";")}function qo(e){e=e.split(":");return[e[0].split(".")[0],e[0].split(".")[1]+(1<e.length?":"+(e[1].split(".")[1]||e[1].split(".")[0]):"")]}var Zo={},el={};Qr.WS=["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet","http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"];var tl="undefined"!=typeof Map;function rl(e,t,r){var n=0,a=e.length;if(r){if(tl?r.has(t):Object.prototype.hasOwnProperty.call(r,t))for(var s=tl?r.get(t):r[t];n<s.length;++n)if(e[s[n]].t===t)return e.Count++,s[n]}else for(;n<a;++n)if(e[n].t===t)return e.Count++,n;return e[a]={t:t},e.Count++,e.Unique++,r&&(tl?(r.has(t)||r.set(t,[]),r.get(t).push(a)):(Object.prototype.hasOwnProperty.call(r,t)||(r[t]=[]),r[t].push(a))),a}function nl(e,t){var r={min:e+1,max:e+1},e=-1;return t.MDW&&(ni=t.MDW),null!=t.width?r.customWidth=1:null!=t.wpx?e=si(t.wpx):null!=t.wch&&(e=t.wch),-1<e?(r.width=ii(e),r.customWidth=1):null!=t.width&&(r.width=t.width),t.hidden&&(r.hidden=!0),r}function al(e,t){e&&(t="xlml"==t?[1,1,1,1,.5,.5]:[.7,.7,.75,.75,.3,.3],null==e.left&&(e.left=t[0]),null==e.right&&(e.right=t[1]),null==e.top&&(e.top=t[2]),null==e.bottom&&(e.bottom=t[3]),null==e.header&&(e.header=t[4]),null==e.footer&&(e.footer=t[5]))}function sl(e,t,r){if(void 0!==wi){if(/^\d+$/.exec(t.s))return t.s;if(t.s&&t.s==+t.s)return t.s;var n=t.s||{};return t.z&&(n.numFmt=t.z),wi.addStyle(n)}var a=r.revssf[null!=t.z?t.z:"General"],s=60,i=e.length;if(null==a&&r.ssf)for(;s<392;++s)if(null==r.ssf[s]){ue.load(t.z,s),r.ssf[s]=t.z,r.revssf[t.z]=a=s;break}for(s=0;s!=i;++s)if(e[s].numFmtId===a)return s;return e[i]={numFmtId:a,fontId:0,fillId:0,borderId:0,xfId:0,applyNumberFormat:1},i}function il(e,t,r,n,a,s){try{n.cellNF&&(e.z=ue._table[t])}catch(e){if(n.WTF)throw e}if("z"!==e.t){if("d"===e.t&&"string"==typeof e.v&&(e.v=le(e.v)),!n||!1!==n.cellText)try{if(null==ue._table[t]&&ue.load(m[t]||"General",t),"e"===e.t)e.w=e.w||Wr[e.v];else if(0===t)if("n"===e.t)(0|e.v)===e.v?e.w=ue._general_int(e.v):e.w=ue._general_num(e.v);else if("d"===e.t){var i=G(e.v);e.w=(0|i)===i?ue._general_int(i):ue._general_num(i)}else{if(void 0===e.v)return;e.w=ue._general(e.v,el)}else"d"===e.t?e.w=ue.format(t,G(e.v),el):e.w=ue.format(t,e.v,el)}catch(e){if(n.WTF)throw e}if(n.cellStyles&&null!=r)try{e.s=s.Fills[r],e.s.fgColor&&e.s.fgColor.theme&&!e.s.fgColor.rgb&&(e.s.fgColor.rgb=Zs(a.themeElements.clrScheme[e.s.fgColor.theme].rgb,e.s.fgColor.tint||0),n.WTF&&(e.s.fgColor.raw_rgb=a.themeElements.clrScheme[e.s.fgColor.theme].rgb)),e.s.bgColor&&e.s.bgColor.theme&&(e.s.bgColor.rgb=Zs(a.themeElements.clrScheme[e.s.bgColor.theme].rgb,e.s.bgColor.tint||0),n.WTF&&(e.s.bgColor.raw_rgb=a.themeElements.clrScheme[e.s.bgColor.theme].rgb))}catch(e){if(n.WTF&&s.Fills)throw e}}}var ol=/<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g,ll=/<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/,cl=/<(?:\w:)?hyperlink [^>]*>/gm,fl=/"(\w*:\w*)"/,hl=/<(?:\w:)?col\b[^>]*[\/]?>/g,ul=/<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g,dl=/<(?:\w:)?pageMargins[^>]*\/>/g,pl=/<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/,ml=/<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;function gl(e,t,r,n,a,s,i){if(!e)return e;n=n||{"!id":{}},null!=fe&&null==t.dense&&(t.dense=fe);var o=t.dense?[]:{},l={s:{r:2e6,c:2e6},e:{r:0,c:0}},c="",f="",h=e.match(ll);h?(c=e.slice(0,h.index),f=e.slice(h.index+h[0].length)):c=f=e;e=c.match(pl);e&&bl(e[0],0,a,r);var u=(c.match(/<(?:\w*:)?dimension/)||{index:-1}).index;0<u&&((e=c.slice(u,u+50).match(fl))&&(r=o,(p=qt(p=e[1])).s.r<=p.e.r&&p.s.c<=p.e.c&&0<=p.s.r&&0<=p.s.c&&(r["!ref"]=Jt(p))));var d,p=c.match(ml);p&&p[1]&&(g=p[1],(d=a).Views||(d.Views=[{}]),(g.match(Sl)||[]).forEach(function(e,t){e=Ee(e);d.Views[t]||(d.Views[t]={}),Ne(e.rightToLeft)&&(d.Views[t].RTL=!0)}));var m,g=[];t.cellStyles&&(m=c.match(hl))&&function(e,t){for(var r=!1,n=0;n!=t.length;++n){var a=Ee(t[n],!0);a.hidden&&(a.hidden=Ne(a.hidden));var s=parseInt(a.min,10)-1,i=parseInt(a.max,10)-1;for(delete a.min,delete a.max,a.width=+a.width,!r&&a.width&&(r=!0,li(a.width)),ci(a);s<=i;)e[s++]=pe(a)}}(g,m),h&&yl(h[1],o,t,l,s,i);i=f.match(ul);i&&(o["!autofilter"]={ref:(i[0].match(/ref="([^"]*)"/)||[])[1]});var b=[],v=f.match(ol);if(v)for(u=0;u!=v.length;++u)b[u]=qt(v[u].slice(v[u].indexOf('"')+1));i=f.match(cl);i&&function(e,t,r){for(var n=Array.isArray(e),a=0;a!=t.length;++a){var s=Ee(Me(t[a]),!0);if(!s.ref)return;var i=((r||{})["!id"]||[])[s.id];i?(s.Target=i.Target,s.location&&(s.Target+="#"+s.location)):(s.Target="#"+s.location,i={Target:s.Target,TargetMode:"Internal"}),s.Rel=i,s.tooltip&&(s.Tooltip=s.tooltip,delete s.tooltip);for(var o=qt(s.ref),l=o.s.r;l<=o.e.r;++l)for(var c=o.s.c;c<=o.e.c;++c){var f=Yt({c:c,r:l});n?(e[l]||(e[l]=[]),e[l][c]||(e[l][c]={t:"z",v:void 0}),e[l][c].l=s):(e[f]||(e[f]={t:"z",v:void 0}),e[f].l=s)}}}(o,i,n);var E,S,f=f.match(dl);return f&&(o["!margins"]=(E=Ee(f[0]),S={},["left","right","top","bottom","header","footer"].forEach(function(e){E[e]&&(S[e]=parseFloat(E[e]))}),S)),!o["!ref"]&&l.e.c>=l.s.c&&l.e.r>=l.s.r&&(o["!ref"]=Jt(l)),0<t.sheetRows&&o["!ref"]&&(f=qt(o["!ref"]),t.sheetRows<=+f.e.r&&(f.e.r=t.sheetRows-1,f.e.r>l.e.r&&(f.e.r=l.e.r),f.e.r<f.s.r&&(f.s.r=f.e.r),f.e.c>l.e.c&&(f.e.c=l.e.c),f.e.c<f.s.c&&(f.s.c=f.e.c),o["!fullref"]=o["!ref"],o["!ref"]=Jt(f))),0<g.length&&(o["!cols"]=g),0<b.length&&(o["!merges"]=b),o}function bl(e,t,r,n){e=Ee(e);r.Sheets[n]||(r.Sheets[n]={}),e.codeName&&(r.Sheets[n].CodeName=ke(Me(e.codeName)))}var vl=["objects","scenarios","selectLockedCells","selectUnlockedCells"],El=["formatColumns","formatRows","formatCells","insertColumns","insertRows","insertHyperlinks","deleteColumns","deleteRows","sort","autoFilter","pivotTables"];var Sl=/<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;var wl,Cl,Bl,Tl,kl,xl,_l,yl=(wl=/<(?:\w+:)?c[ \/>]/,Cl=/<\/(?:\w+:)?row>/,Bl=/r=["']([^"']*)["']/,Tl=/<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/,kl=/ref=["']([^"']*)["']/,xl=Ve("v"),_l=Ve("f"),function(e,t,r,n,a,s){for(var i,o,l,c,f,h=0,u="",d=[],p=[],m=0,g=0,b="",v=0,E=0,S=0,w=0,C=Array.isArray(s.CellXf),B=[],T=[],k=Array.isArray(t),x=[],_={},y=!1,A=!!r.sheetStubs,I=e.split(Cl),R=0,F=I.length;R!=F;++R){var D=(u=I[R].trim()).length;if(0!==D){for(h=0;h<D&&62!==u.charCodeAt(h);++h);if(++h,v=null!=(l=Ee(u.slice(0,h),!0)).r?parseInt(l.r,10):v+1,E=-1,!(r.sheetRows&&r.sheetRows<v)){n.s.r>v-1&&(n.s.r=v-1),n.e.r<v-1&&(n.e.r=v-1),r&&r.cellStyles&&(y=!(_={}),l.ht&&(y=!0,_.hpt=parseFloat(l.ht),_.hpx=ui(_.hpt)),"1"==l.hidden&&(y=!0,_.hidden=!0),null!=l.outlineLevel&&(y=!0,_.level=+l.outlineLevel),y&&(x[v-1]=_)),d=u.slice(h).split(wl);for(var O=0;O!=d.length&&"<"==d[O].trim().charAt(0);++O);for(d=d.slice(O),h=0;h!=d.length;++h)if(0!==(u=d[h].trim()).length){if(p=u.match(Bl),m=h,g=0,u="<c "+("<"==u.slice(0,1)?">":"")+u,null!=p&&2===p.length){for(m=0,b=p[1],g=0;g!=b.length&&!((i=b.charCodeAt(g)-64)<1||26<i);++g)m=26*m+i;E=--m}else++E;for(g=0;g!=u.length&&62!==u.charCodeAt(g);++g);if(++g,(l=Ee(u.slice(0,g),!0)).r||(l.r=Yt({r:v-1,c:E})),o={t:""},null!=(p=(b=u.slice(g)).match(xl))&&""!==p[1]&&(o.v=ke(p[1])),r.cellFormula){null!=(p=b.match(_l))&&""!==p[1]?(o.f=ke(Me(p[1])).replace(/\r\n/g,"\n"),r.xlfn||(o.f=lo(o.f)),-1<p[0].indexOf('t="array"')?(o.F=(b.match(kl)||[])[1],-1<o.F.indexOf(":")&&B.push([qt(o.F),o.F])):-1<p[0].indexOf('t="shared"')&&(f=Ee(p[0]),N=ke(Me(p[1])),r.xlfn||(N=lo(N)),T[parseInt(f.si,10)]=[f,N,l.r])):(p=b.match(/<f[^>]*\/>/))&&T[(f=Ee(p[0])).si]&&(o.f=oo(T[f.si][1],T[f.si][2],l.r));for(var P=Kt(l.r),g=0;g<B.length;++g)P.r>=B[g][0].s.r&&P.r<=B[g][0].e.r&&P.c>=B[g][0].s.c&&P.c<=B[g][0].e.c&&(o.F=B[g][1])}if(null==l.t&&void 0===o.v)if(o.f||o.F)o.v=0,o.t="n";else{if(!A)continue;o.t="z"}else o.t=l.t||"n";switch(n.s.c>E&&(n.s.c=E),n.e.c<E&&(n.e.c=E),o.t){case"n":if(""==o.v||null==o.v){if(!A)continue;o.t="z"}else o.v=parseFloat(o.v);break;case"s":if(void 0===o.v){if(!A)continue;o.t="z"}else c=Zo[parseInt(o.v,10)],o.v=c.t,o.r=c.r,r.cellHTML&&(o.h=c.h);break;case"str":o.t="s",o.v=null!=o.v?Me(o.v):"",r.cellHTML&&(o.h=Re(o.v));break;case"inlineStr":p=b.match(Tl),o.t="s",null!=p&&(c=_s(p[1]))?(o.v=c.t,r.cellHTML&&(o.h=c.h)):o.v="";break;case"b":o.v=Ne(o.v);break;case"d":r.cellDates?o.v=le(o.v,1):(o.v=G(le(o.v,1)),o.t="n");break;case"e":r&&!1===r.cellText||(o.w=o.v),o.v=Vr[o.v]}var S=w=0,N=null;C&&void 0!==l.s&&null!=(N=s.CellXf[l.s])&&(null!=N.numFmtId&&(S=N.numFmtId),r.cellStyles&&null!=N.fillId&&(w=N.fillId)),il(o,S,w,r,a,s),r.cellDates&&C&&"n"==o.t&&ue.is_date(ue._table[S])&&(o.t="d",o.v=M(o.v)),k?(t[(N=Kt(l.r)).r]||(t[N.r]=[]),t[N.r][N.c]=o):t[l.r]=o}}}}0<x.length&&(t["!rows"]=x)});function Al(e,t){for(var r,n,a,s,i=[],o=[],l=qt(e["!ref"]),c=[],f=0,h=0,u=e["!rows"],d=Array.isArray(e),p={r:""},m=-1,h=l.s.c;h<=l.e.c;++h)c[h]=$t(h);for(f=l.s.r;f<=l.e.r;++f){for(o=[],a=zt(f),h=l.s.c;h<=l.e.c;++h){n=c[h]+a;var g=d?(e[f]||[])[h]:e[n];void 0!==g&&null!=(r=function(e,t,r,n){if(void 0===e.v&&"string"!=typeof e.f||"z"===e.t)return"";var a="",s=e.t,i=e.v;if("z"!==e.t)switch(e.t){case"b":a=e.v?"1":"0";break;case"n":a=""+e.v;break;case"e":a=Wr[e.v];break;case"d":a=n&&n.cellDates?le(e.v,-1).toISOString():((e=pe(e)).t="n",""+(e.v=G(le(e.v)))),void 0===e.z&&(e.z=ue._table[14]);break;default:a=e.v}var o=Ye("v",ye(a)),l={r:t},c=sl(n.cellXfs,e,n);switch(0!==c&&(l.s=c),e.t){case"n":break;case"d":l.t="d";break;case"b":l.t="b";break;case"e":l.t="e";break;case"z":break;default:if(null==e.v){delete e.t;break}if(n&&n.bookSST){o=Ye("v",""+rl(n.Strings,e.v,n.revStrings)),l.t="s";break}l.t="str"}return e.t!=s&&(e.t=s,e.v=i),"string"==typeof e.f&&e.f&&(i=e.F&&e.F.slice(0,t.length)==t?{t:"array",ref:e.F}:null,o=Je("f",ye(e.f),i)+(null!=e.v?o:"")),e.l&&r["!links"].push([t,e.l]),e.c&&r["!comments"].push([t,e.c]),Je("c",o,l)}(g,n,e,t))&&o.push(r)}(0<o.length||u&&u[f])&&(p={r:a},u&&u[f]&&((s=u[f]).hidden&&(p.hidden=1),m=-1,s.hpx?m=hi(s.hpx):s.hpt&&(m=s.hpt),-1<m&&(p.ht=m,p.customHeight=1),s.level&&(p.outlineLevel=s.level)),i[i.length]=Je("row",o.join(""),p))}if(u)for(;f<u.length;++f)u&&u[f]&&(p={r:f+1},(s=u[f]).hidden&&(p.hidden=1),m=-1,s.hpx?m=hi(s.hpx):s.hpt&&(m=s.hpt),-1<m&&(p.ht=m,p.customHeight=1),s.level&&(p.outlineLevel=s.level),i[i.length]=Je("row","",p));return i.join("")}var Il=Je("worksheet",null,{xmlns:Ze.main[0],"xmlns:r":Ze.r});function Rl(e,t,r,n){var a,s,i=[K,Il],o=r.SheetNames[e],l=r.Sheets[o],c=(l=null==l?{}:l)["!ref"]||"A1",f=qt(c);if(16383<f.e.c||1048575<f.e.r){if(t.WTF)throw new Error("Range "+c+" exceeds format limit A1:XFD1048576");f.e.c=Math.min(f.e.c,16383),f.e.r=Math.min(f.e.c,1048575),c=Jt(f)}n=n||{},l["!comments"]=[];var h,u,d=[];!function(e,t,r,n,a){var s=!1,i={},o=null;if("xlsx"!==n.bookType&&t.vbaraw){var l=t.SheetNames[r];try{t.Workbook&&(l=t.Workbook.Sheets[r].CodeName||l)}catch(e){}s=!0,i.codeName=Le(ye(l))}e&&e["!outline"]&&(n={summaryBelow:1,summaryRight:1},e["!outline"].above&&(n.summaryBelow=0),e["!outline"].left&&(n.summaryRight=0),o=(o||"")+Je("outlinePr",null,n)),(s||o)&&(a[a.length]=Je("sheetPr",o,i))}(l,r,e,t,i),i[i.length]=Je("dimension",null,{ref:c}),i[i.length]=(o={workbookViewId:"0"},((((f=r)||{}).Workbook||{}).Views||[])[0]&&(o.rightToLeft=f.Workbook.Views[0].RTL?"1":"0"),Je("sheetViews",Je("sheetView",null,o),{})),t.sheetFormat&&(i[i.length]=Je("sheetFormatPr",null,{defaultRowHeight:t.sheetFormat.defaultRowHeight||"16",baseColWidth:t.sheetFormat.baseColWidth||"10",outlineLevelRow:t.sheetFormat.outlineLevelRow||"7"})),null!=l["!cols"]&&0<l["!cols"].length&&(i[i.length]=function(e){for(var t,r=["<cols>"],n=0;n!=e.length;++n)(t=e[n])&&(r[r.length]=Je("col",null,nl(n,t)));return r[r.length]="</cols>",r.join("")}(l["!cols"])),i[a=i.length]="<sheetData/>",l["!links"]=[],null!=l["!ref"]&&0<(s=Al(l,t)).length&&(i[i.length]=s),i.length>a+1&&(i[i.length]="</sheetData>",i[a]=i[a].replace("/>",">")),null!=l["!protect"]&&(i[i.length]=(h=l["!protect"],u={sheet:1},vl.forEach(function(e){null!=h[e]&&h[e]&&(u[e]="1")}),El.forEach(function(e){null==h[e]||h[e]||(u[e]="0")}),h.password&&(u.password=Ws(h.password).toString(16).toUpperCase()),Je("sheetProtection",null,u))),null!=l["!autofilter"]&&(i[i.length]=function(e,t,r,n){var a="string"==typeof e.ref?e.ref:Jt(e.ref);r.Workbook||(r.Workbook={Sheets:[]}),r.Workbook.Names||(r.Workbook.Names=[]);var s=r.Workbook.Names;(e=Qt(a)).s.r==e.e.r&&(e.e.r=Qt(t["!ref"]).e.r,a=Jt(e));for(var i=0;i<s.length;++i){var o=s[i];if("_xlnm._FilterDatabase"==o.Name&&o.Sheet==n){o.Ref="'"+r.SheetNames[n]+"'!"+a;break}}return i==s.length&&s.push({Name:"_xlnm._FilterDatabase",Sheet:n,Ref:"'"+r.SheetNames[n]+"'!"+a}),Je("autoFilter",null,{ref:a})}(l["!autofilter"],l,r,e)),null!=l["!merges"]&&0<l["!merges"].length&&(i[i.length]=function(e){if(0===e.length)return"";for(var t='<mergeCells count="'+e.length+'">',r=0;r!=e.length;++r)t+='<mergeCell ref="'+Jt(e[r])+'"/>';return t+"</mergeCells>"}(l["!merges"]));var p,m,g=-1;return 0<l["!links"].length&&(i[i.length]="<hyperlinks>",l["!links"].forEach(function(e){e[1].Target&&(m={ref:e[0]},"#"!=e[1].Target.charAt(0)&&(g=rn(n,-1,ye(e[1].Target).replace(/#.*$/,""),Qr.HLINK),m["r:id"]="rId"+g),-1<(p=e[1].Target.indexOf("#"))&&(m.location=ye(e[1].Target.slice(p+1))),e[1].Tooltip&&(m.tooltip=ye(e[1].Tooltip)),i[i.length]=Je("hyperlink",null,m))}),i[i.length]="</hyperlinks>"),delete l["!links"],null!=l["!margins"]&&(i[i.length]=(al(r=l["!margins"]),Je("pageMargins",null,r))),t&&!t.ignoreEC&&null!=t.ignoreEC||(i[i.length]=Ye("ignoredErrors",Je("ignoredError",null,{numberStoredAsText:1,sqref:c}))),0<d.length&&(g=rn(n,-1,"../drawings/drawing"+(e+1)+".xml",Qr.DRAW),i[i.length]=Je("drawing",null,{"r:id":"rId"+g}),l["!drawing"]=d),0<l["!comments"].length&&(g=rn(n,-1,"../drawings/vmlDrawing"+(e+1)+".vml",Qr.VML),i[i.length]=Je("legacyDrawing",null,{"r:id":"rId"+g}),l["!legacy"]=g),1<i.length&&(i[i.length]="</worksheet>",i[1]=i[1].replace("/>",">")),i.join("")}function Fl(e,t,r,n){r=function(e,t,r){var n=Nt(145),a=(r["!rows"]||[])[e]||{};n.write_shift(4,e),n.write_shift(4,0);var s=320;a.hpx?s=20*hi(a.hpx):a.hpt&&(s=20*a.hpt),n.write_shift(2,s),n.write_shift(1,0),s=0,a.level&&(s|=a.level),a.hidden&&(s|=16),(a.hpx||a.hpt)&&(s|=32),n.write_shift(1,s),n.write_shift(1,0);var i=0,s=n.l;n.l+=4;for(var o={r:e,c:0},l=0;l<16;++l)if(!(t.s.c>l+1<<10||t.e.c<l<<10)){for(var c=-1,f=-1,h=l<<10;h<l+1<<10;++h)o.c=h,(Array.isArray(r)?(r[o.r]||[])[o.c]:r[Yt(o)])&&(c<0&&(c=h),f=h);c<0||(++i,n.write_shift(4,c),n.write_shift(4,f))}return e=n.l,n.l=s,n.write_shift(4,i),n.l=e,n.length>n.l?n.slice(0,n.l):n}(n,r,t);(17<r.length||(t["!rows"]||[])[n])&&Ut(e,"BrtRowHdr",r)}var Co=wr,Dl=Cr;function Ol(e,t,r){return hr(t,r=null==r?Nt(12):r),function(e,t){null==t&&(t=Nt(4));var r=0,n=0,a=100*e;if(e==(0|e)&&-(1<<29)<=e&&e<1<<29?n=1:a==(0|a)&&-(1<<29)<=a&&a<1<<29&&(r=n=1),!n)throw new Error("unsupported RkNumber "+e);t.write_shift(-4,((r?a:e)<<2)+(r+2))}(e.v,r),r}var k=wr,Pl=Cr;var Nl=["left","right","top","bottom","header","footer"];function Ml(e,t,r,n,a,s){if(void 0!==t.v){var i="";switch(t.t){case"b":i=t.v?"1":"0";break;case"d":(t=pe(t)).z=t.z||ue._table[14],t.v=G(le(t.v)),t.t="n";break;case"n":case"e":i=""+t.v;break;default:i=t.v}var o,l,c,f,h,u,d,p={r:r,c:n};switch(p.s=sl(a.cellXfs,t,a),t.l&&s["!links"].push([Yt(p),t.l]),t.c&&s["!comments"].push([Yt(p),t.c]),t.t){case"s":case"str":return void(a.bookSST?(i=rl(a.Strings,t.v,a.revStrings),p.t="s",p.v=i,Ut(e,"BrtCellIsst",(hr(h=p,u=null==u?Nt(12):u),u.write_shift(4,h.v),u))):(p.t="str",Ut(e,"BrtCellSt",(h=t,hr(p,f=null==f?Nt(12+4*h.v.length):f),ir(h.v,f),f.length>f.l?f.slice(0,f.l):f))));case"n":return void(t.v==(0|t.v)&&-1e3<t.v&&t.v<1e3?Ut(e,"BrtCellRk",Ol(t,p)):Ut(e,"BrtCellReal",(l=t,hr(p,c=null==c?Nt(16):c),Tr(l.v,c),c)));case"b":return p.t="b",void Ut(e,"BrtCellBool",(l=t,hr(p,o=null==o?Nt(9):o),o.write_shift(1,l.v?1:0),o));case"e":p.t="e"}Ut(e,"BrtCellBlank",hr(p,d=null==d?Nt(8):d))}}function Ll(t,e){var r,n;e&&e["!merges"]&&(Ut(t,"BrtBeginMergeCells",(r=e["!merges"].length,(n=null==n?Nt(4):n).write_shift(4,r),n)),e["!merges"].forEach(function(e){Ut(t,"BrtMergeCell",Pl(e))}),Ut(t,"BrtEndMergeCells"))}function Ul(r,e){e&&e["!cols"]&&(Ut(r,"BrtBeginColInfos"),e["!cols"].forEach(function(e,t){e&&Ut(r,"BrtColInfo",function(e,t,r){null==r&&(r=Nt(18));var n=nl(e,t);return r.write_shift(-4,e),r.write_shift(-4,e),r.write_shift(4,256*(n.width||10)),r.write_shift(4,0),e=0,t.hidden&&(e|=1),"number"==typeof n.width&&(e|=2),t.level&&(e|=t.level<<8),r.write_shift(2,e),r}(t,e))}),Ut(r,"BrtEndColInfos"))}function Hl(e,t){var r;t&&t["!ref"]&&(Ut(e,"BrtBeginCellIgnoreECs"),Ut(e,"BrtCellIgnoreEC",(r=qt(t["!ref"]),(t=Nt(24)).write_shift(4,4),t.write_shift(4,1),Cr(r,t),t)),Ut(e,"BrtEndCellIgnoreECs"))}function Wl(n,e,a){e["!links"].forEach(function(e){var t,r;e[1].Target&&(t=rn(a,-1,e[1].Target.replace(/#.*$/,""),Qr.HLINK),Ut(n,"BrtHLink",(r=t,e=Nt(50+4*((t=e)[1].Target.length+(t[1].Tooltip||"").length)),Cr({s:Kt(t[0]),e:Kt(t[0])},e),vr("rId"+r,e),ir((-1==(r=t[1].Target.indexOf("#"))?"":t[1].Target.slice(r+1))||"",e),ir(t[1].Tooltip||"",e),ir("",e),e.slice(0,e.l))))}),delete e["!links"]}function Vl(e,t,r){Ut(e,"BrtBeginWsViews"),Ut(e,"BrtBeginWsView",function(e,t){null==t&&(t=Nt(30));var r=924;return(((e||{}).Views||[])[0]||{}).RTL&&(r|=32),t.write_shift(2,r),t.write_shift(4,0),t.write_shift(4,0),t.write_shift(4,0),t.write_shift(1,0),t.write_shift(1,0),t.write_shift(2,0),t.write_shift(2,100),t.write_shift(2,0),t.write_shift(2,0),t.write_shift(2,0),t.write_shift(4,0),t}(r)),Ut(e,"BrtEndWsView"),Ut(e,"BrtEndWsViews")}function Xl(e,t){var r,n;t["!protect"]&&Ut(e,"BrtSheetProtection",(r=t["!protect"],(n=null==n?Nt(66):n).write_shift(2,r.password?Ws(r.password):0),n.write_shift(4,1),[["objects",!1],["scenarios",!1],["formatCells",!0],["formatColumns",!0],["formatRows",!0],["insertColumns",!0],["insertRows",!0],["insertHyperlinks",!0],["deleteColumns",!0],["deleteRows",!0],["selectLockedCells",!1],["sort",!0],["autoFilter",!0],["pivotTables",!0],["selectUnlockedCells",!1]].forEach(function(e){e[1]?n.write_shift(4,null==r[e[0]]||r[e[0]]?0:1):n.write_shift(4,null!=r[e[0]]&&r[e[0]]?0:1)}),n))}function Gl(e,t,r,n){var a=Lt(),s=r.SheetNames[e],i=r.Sheets[s]||{},o=s;try{r&&r.Workbook&&(o=r.Workbook.Sheets[e].CodeName||o)}catch(e){}var l,c,s=qt(i["!ref"]||"A1");if(16383<s.e.c||1048575<s.e.r){if(t.WTF)throw new Error("Range "+(i["!ref"]||"A1")+" exceeds format limit A1:XFD1048576");s.e.c=Math.min(s.e.c,16383),s.e.r=Math.min(s.e.c,1048575)}return i["!links"]=[],i["!comments"]=[],Ut(a,"BrtBeginSheet"),r.vbaraw&&Ut(a,"BrtWsProp",function(e,t){null==t&&(t=Nt(84+4*e.length));for(var r=0;r<3;++r)t.write_shift(1,0);return kr({auto:1},t),t.write_shift(-4,-1),t.write_shift(-4,-1),dr(e,t),t.slice(0,t.l)}(o)),Ut(a,"BrtWsDim",Dl(s)),Vl(a,0,r.Workbook),Ul(a,i),function(e,t,r){var n,a=qt(t["!ref"]||"A1"),s=[];Ut(e,"BrtBeginSheetData");var i=Array.isArray(t),o=a.e.r;t["!rows"]&&(o=Math.max(a.e.r,t["!rows"].length-1));for(var l=a.s.r;l<=o;++l)if(n=zt(l),Fl(e,t,a,l),l<=a.e.r)for(var c=a.s.c;c<=a.e.c;++c){l===a.s.r&&(s[c]=$t(c)),f=s[c]+n;var f=i?(t[l]||[])[c]:t[f];f&&Ml(e,f,l,c,r,t)}Ut(e,"BrtEndSheetData")}(a,i,t),Xl(a,i),function(e,t,r,n){if(t["!autofilter"]){var a=t["!autofilter"],s="string"==typeof a.ref?a.ref:Jt(a.ref);r.Workbook||(r.Workbook={Sheets:[]}),r.Workbook.Names||(r.Workbook.Names=[]);var i=r.Workbook.Names,a=Qt(s);a.s.r==a.e.r&&(a.e.r=Qt(t["!ref"]).e.r,s=Jt(a));for(var o=0;o<i.length;++o){var l=i[o];if("_xlnm._FilterDatabase"==l.Name&&l.Sheet==n){l.Ref="'"+r.SheetNames[n]+"'!"+s;break}}o==i.length&&i.push({Name:"_xlnm._FilterDatabase",Sheet:n,Ref:"'"+r.SheetNames[n]+"'!"+s}),Ut(e,"BrtBeginAFilter",Cr(qt(s))),Ut(e,"BrtEndAFilter")}}(a,i,r,e),Ll(a,i),Wl(a,i,n),i["!margins"]&&Ut(a,"BrtMargins",(l=i["!margins"],null==c&&(c=Nt(48)),al(l),Nl.forEach(function(e){Tr(l[e],c)}),c)),t&&!t.ignoreEC&&null!=t.ignoreEC||Hl(a,i),s=a,t=e,n=n,0<(i=i)["!comments"].length&&(t=rn(n,-1,"../drawings/vmlDrawing"+(t+1)+".vml",Qr.VML),Ut(s,"BrtLegacyDrawing",vr("rId"+t)),i["!legacy"]=t),Ut(a,"BrtEndSheet"),a.end()}function zl(e,t,r,n,a,s){var i=s||{"!type":"chart"};if(!e)return s;var o,l=0,c=0,f={s:{r:2e6,c:2e6},e:{r:0,c:0}};return(e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm)||[]).forEach(function(e){var r=function(e){var t,r=[],n=e.match(/^<c:numCache>/);(e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm)||[]).forEach(function(e){e=e.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);e&&(r[+e[1]]=n?+e[2]:e[2])});var a=ke((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/)||["","General"])[1]);return(e.match(/<c:f>(.*?)<\/c:f>/gm)||[]).forEach(function(e){t=e.replace(/<.*?>/g,"")}),[r,a,t]}(e);f.s.r=f.s.c=0,f.e.c=l,o=$t(l),r[0].forEach(function(e,t){i[o+zt(t)]={t:"n",v:e,z:r[1]},c=t}),f.e.r<c&&(f.e.r=c),++l}),0<l&&(i["!ref"]=Jt(f)),i}Qr.CHART="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",Qr.CHARTEX="http://schemas.microsoft.com/office/2014/relationships/chartEx",Qr.CS="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet";Je("chartsheet",null,{xmlns:Ze.main[0],"xmlns:r":Ze.r});var jl=[["allowRefreshQuery",!1,"bool"],["autoCompressPictures",!0,"bool"],["backupFile",!1,"bool"],["checkCompatibility",!1,"bool"],["CodeName",""],["date1904",!1,"bool"],["defaultThemeVersion",0,"int"],["filterPrivacy",!1,"bool"],["hidePivotFieldList",!1,"bool"],["promptedSolutions",!1,"bool"],["publishItems",!1,"bool"],["refreshAllConnections",!1,"bool"],["saveExternalLinkValues",!0,"bool"],["showBorderUnselectedTables",!0,"bool"],["showInkAnnotation",!0,"bool"],["showObjects","all"],["showPivotChartFilter",!1,"bool"],["updateLinks","userSet"]],$l=[["activeTab",0,"int"],["autoFilterDateGrouping",!0,"bool"],["firstSheet",0,"int"],["minimized",!1,"bool"],["showHorizontalScroll",!0,"bool"],["showSheetTabs",!0,"bool"],["showVerticalScroll",!0,"bool"],["tabRatio",600,"int"],["visibility","visible"]],Kl=[],Yl=[["calcCompleted","true"],["calcMode","auto"],["calcOnSave","true"],["concurrentCalc","true"],["fullCalcOnLoad","false"],["fullPrecision","true"],["iterate","false"],["iterateCount","100"],["iterateDelta","0.001"],["refMode","A1"]];function Ql(e,t){for(var r=0;r!=e.length;++r)for(var n=e[r],a=0;a!=t.length;++a){var s=t[a];if(null==n[s[0]])n[s[0]]=s[1];else switch(s[2]){case"bool":"string"==typeof n[s[0]]&&(n[s[0]]=Ne(n[s[0]]));break;case"int":"string"==typeof n[s[0]]&&(n[s[0]]=parseInt(n[s[0]],10))}}}function Jl(e,t){for(var r=0;r!=t.length;++r){var n=t[r];if(null==e[n[0]])e[n[0]]=n[1];else switch(n[2]){case"bool":"string"==typeof e[n[0]]&&(e[n[0]]=Ne(e[n[0]]));break;case"int":"string"==typeof e[n[0]]&&(e[n[0]]=parseInt(e[n[0]],10))}}}function ql(e){Jl(e.WBProps,jl),Jl(e.CalcPr,Yl),Ql(e.WBView,$l),Ql(e.Sheets,Kl),el.date1904=Ne(e.WBProps.date1904)}var Zl="][*?/\\".split("");function ec(t,r){if(31<t.length){if(r)return;throw new Error("Sheet names cannot exceed 31 chars")}var n=!0;return Zl.forEach(function(e){if(-1!=t.indexOf(e)){if(!r)throw new Error("Sheet name cannot contain : \\ / ? * [ ]");n=!1}}),n}function tc(e){if(!e||!e.SheetNames||!e.Sheets)throw new Error("Invalid Workbook");if(!e.SheetNames.length)throw new Error("Workbook is empty");var a,s,i,t=e.Workbook&&e.Workbook.Sheets||[];a=e.SheetNames,s=t,i=!!e.vbaraw,a.forEach(function(e,t){ec(e);for(var r=0;r<t;++r)if(e==a[r])throw new Error("Duplicate Sheet Name: "+e);if(i){var n=s&&s[t]&&s[t].CodeName||e;if(95==n.charCodeAt(0)&&22<n.length)throw new Error("Bad Code Name: Worksheet"+n)}});for(var r=0;r<e.SheetNames.length;++r)!function(e,t){if(e&&e["!ref"]){var r=qt(e["!ref"]);if(r.e.c<r.s.c||r.e.r<r.s.r)throw new Error("Bad range ("+t+"): "+e["!ref"])}}(e.Sheets[e.SheetNames[r]],(e.SheetNames[r],r))}var rc=/<\w+:workbook/;var nc=Je("workbook",null,{xmlns:Ze.main[0],"xmlns:r":Ze.r});function ac(e,t){Ut(e,"BrtBeginBundleShs");for(var r,n=0;n!=t.SheetNames.length;++n){var a={Hidden:t.Workbook&&t.Workbook.Sheets&&t.Workbook.Sheets[n]&&t.Workbook.Sheets[n].Hidden||0,iTabID:n+1,strRelID:"rId"+(n+1),name:t.SheetNames[n]};Ut(e,"BrtBundleSh",(r=a,(a=(a=void 0)||Nt(127)).write_shift(4,r.Hidden),a.write_shift(4,r.iTabID),vr(r.strRelID,a),ir(r.name.slice(0,31),a),a.length>a.l?a.slice(0,a.l):a))}Ut(e,"BrtEndBundleShs")}function sc(e,t){if(t.Workbook&&t.Workbook.Sheets){for(var r,n=t.Workbook.Sheets,a=0,s=-1,i=-1;a<n.length;++a)!n[a]||!n[a].Hidden&&-1==s?s=a:1==n[a].Hidden&&-1==i&&(i=a);s<i||(Ut(e,"BrtBeginBookViews"),Ut(e,"BrtBookView",(t=s,(r=r||Nt(29)).write_shift(-4,0),r.write_shift(-4,460),r.write_shift(4,28800),r.write_shift(4,17600),r.write_shift(4,500),r.write_shift(4,t),r.write_shift(4,t),r.write_shift(1,120),r.length>r.l?r.slice(0,r.l):r)),Ut(e,"BrtEndBookViews"))}}function ic(e,t){var r=Lt();return Ut(r,"BrtBeginBook"),Ut(r,"BrtFileVersion",function(e){e=e||Nt(127);for(var t=0;4!=t;++t)e.write_shift(4,0);return ir("SheetJS",e),ir(n.version,e),ir(n.version,e),ir("7262",e),e.length=e.l,e.length>e.l?e.slice(0,e.l):e}()),Ut(r,"BrtWbProp",function(e,t){t=t||Nt(72);var r=0;return e&&e.filterPrivacy&&(r|=8),t.write_shift(4,r),t.write_shift(4,0),dr(e&&e.CodeName||"ThisWorkbook",t),t.slice(0,t.l)}(e.Workbook&&e.Workbook.WBProps||null)),sc(r,e),ac(r,e),Ut(r,"BrtEndBook"),r.end()}function oc(e,t,r){return(".bin"===t.slice(-4)?function(e,n){var a={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},xmlns:""},s=[],i=!1;(n=n||{}).biff=12;var o=[],l=[[]];return l.SheetNames=[],l.XTI=[],Mt(e,function(e,t,r){switch(r){case 156:l.SheetNames.push(e.name),a.Sheets.push(e);break;case 153:a.WBProps=e;break;case 39:null!=e.Sheet&&(n.SID=e.Sheet),e.Ref=Uo(e.Ptg,0,null,l,n),delete n.SID,delete e.Ptg,o.push(e);break;case 1036:break;case 357:case 358:case 355:case 667:l[0].length?l.push([r,e]):l[0]=[r,e],l[l.length-1].XTI=[];break;case 362:0===l.length&&(l[0]=[],l[0].XTI=[]),l[l.length-1].XTI=l[l.length-1].XTI.concat(e),l.XTI=l.XTI.concat(e);break;case 361:break;case 3072:case 3073:case 2071:case 534:case 677:case 158:case 157:case 610:case 2050:case 155:case 548:case 676:case 128:case 665:case 2128:case 2125:case 549:case 2053:case 596:case 2076:case 2075:case 2082:case 397:case 154:case 1117:case 553:case 2091:break;case 35:s.push(t),i=!0;break;case 36:s.pop(),i=!1;break;case 37:s.push(t),i=!0;break;case 38:s.pop(),i=!1;break;case 16:break;default:if(!(0<(t||"").indexOf("Begin"))&&!(0<(t||"").indexOf("End"))&&(!i||n.WTF&&"BrtACBegin"!=s[s.length-1]&&"BrtFRTBegin"!=s[s.length-1]))throw new Error("Unexpected record "+r+" "+t)}},n),ql(a),a.Names=o,a.supbooks=l,a}:function(n,a){if(!n)throw new Error("Could not find file");var s={AppVersion:{},WBProps:{},WBView:[],Sheets:[],CalcPr:{},Names:[],xmlns:""},i=!1,o="xmlns",l={},c=0;if(n.replace(ge,function(e,t){var r=Ee(e);switch(Se(r[0])){case"<?xml":break;case"<workbook":e.match(rc)&&(o="xmlns"+e.match(/<(\w+):/)[1]),s.xmlns=r[o];break;case"</workbook>":break;case"<fileVersion":delete r[0],s.AppVersion=r;break;case"<fileVersion/>":case"</fileVersion>":case"<fileSharing":case"<fileSharing/>":break;case"<workbookPr":case"<workbookPr/>":jl.forEach(function(e){if(null!=r[e[0]])switch(e[2]){case"bool":s.WBProps[e[0]]=Ne(r[e[0]]);break;case"int":s.WBProps[e[0]]=parseInt(r[e[0]],10);break;default:s.WBProps[e[0]]=r[e[0]]}}),r.codeName&&(s.WBProps.CodeName=Me(r.codeName));break;case"</workbookPr>":case"<workbookProtection":case"<workbookProtection/>":break;case"<bookViews":case"<bookViews>":case"</bookViews>":break;case"<workbookView":case"<workbookView/>":delete r[0],s.WBView.push(r);break;case"</workbookView>":break;case"<sheets":case"<sheets>":case"</sheets>":break;case"<sheet":switch(r.state){case"hidden":r.Hidden=1;break;case"veryHidden":r.Hidden=2;break;default:r.Hidden=0}delete r.state,r.name=ke(Me(r.name)),delete r[0],s.Sheets.push(r);break;case"</sheet>":break;case"<functionGroups":case"<functionGroups/>":case"<functionGroup":break;case"<externalReferences":case"</externalReferences>":case"<externalReferences>":case"<externalReference":case"<definedNames/>":break;case"<definedNames>":case"<definedNames":i=!0;break;case"</definedNames>":i=!1;break;case"<definedName":(l={}).Name=Me(r.name),r.comment&&(l.Comment=r.comment),r.localSheetId&&(l.Sheet=+r.localSheetId),Ne(r.hidden||"0")&&(l.Hidden=!0),c=t+e.length;break;case"</definedName>":l.Ref=ke(Me(n.slice(c,t))),s.Names.push(l);break;case"<definedName/>":break;case"<calcPr":case"<calcPr/>":delete r[0],s.CalcPr=r;break;case"</calcPr>":case"<oleSize":break;case"<customWorkbookViews>":case"</customWorkbookViews>":case"<customWorkbookViews":break;case"<customWorkbookView":case"</customWorkbookView>":break;case"<pivotCaches>":case"</pivotCaches>":case"<pivotCaches":case"<pivotCache":break;case"<smartTagPr":case"<smartTagPr/>":break;case"<smartTagTypes":case"<smartTagTypes>":case"</smartTagTypes>":case"<smartTagType":break;case"<webPublishing":case"<webPublishing/>":break;case"<fileRecoveryPr":case"<fileRecoveryPr/>":break;case"<webPublishObjects>":case"<webPublishObjects":case"</webPublishObjects>":case"<webPublishObject":break;case"<extLst":case"<extLst>":case"</extLst>":case"<extLst/>":break;case"<ext":i=!0;break;case"</ext>":i=!1;break;case"<ArchID":break;case"<AlternateContent":case"<AlternateContent>":i=!0;break;case"</AlternateContent>":i=!1;break;case"<revisionPtr":break;default:if(!i&&a.WTF)throw new Error("unrecognized "+r[0]+" in workbook")}return e}),-1===Ze.main.indexOf(s.xmlns))throw new Error("Unknown Namespace: "+s.xmlns);return ql(s),s})(e,r)}function lc(e,t,r,n,a,s,i,o){return(".bin"===t.slice(-4)?function(e,t,s,i,o,l,c){if(!e)return e;var f=t||{};i=i||{"!id":{}},null!=fe&&null==f.dense&&(f.dense=fe);var h,u,d,p,m,g,b,v,E,S,w=f.dense?[]:{},C={s:{r:2e6,c:2e6},e:{r:0,c:0}},B=[],T=!1,k=!1,x=[];f.biff=12;var _=f["!row"]=0,y=!1,A=[],I={},R=f.supbooks||o.supbooks||[[]];if(R.sharedf=I,R.arrayf=A,R.SheetNames=o.SheetNames||o.Sheets.map(function(e){return e.name}),!f.supbooks&&(f.supbooks=R,o.Names))for(var r=0;r<o.Names.length;++r)R[0][r+1]=o.Names[r];var F=[],D=[],O=!1;return Mt(e,function(e,t,r){if(!k)switch(r){case 148:h=e;break;case 0:u=e,f.sheetRows&&f.sheetRows<=u.r&&(k=!0),E=zt(m=u.r),f["!row"]=u.r,(e.hidden||e.hpt||null!=e.level)&&(e.hpt&&(e.hpx=ui(e.hpt)),D[e.r]=e);break;case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:switch(d={t:e[2]},e[2]){case"n":d.v=e[1];break;case"s":v=Zo[e[1]],d.v=v.t,d.r=v.r;break;case"b":d.v=!!e[1];break;case"e":d.v=e[1],!1!==f.cellText&&(d.w=Wr[d.v]);break;case"str":d.t="s",d.v=e[1]}if((p=c.CellXf[e[0].iStyleRef])&&il(d,p.numFmtId,null,f,l,c),g=e[0].c,f.dense?(w[m]||(w[m]=[]),w[m][g]=d):w[$t(g)+E]=d,f.cellFormula){for(y=!1,_=0;_<A.length;++_){var n=A[_];u.r>=n[0].s.r&&u.r<=n[0].e.r&&g>=n[0].s.c&&g<=n[0].e.c&&(d.F=Jt(n[0]),y=!0)}!y&&3<e.length&&(d.f=e[3])}C.s.r>u.r&&(C.s.r=u.r),C.s.c>g&&(C.s.c=g),C.e.r<u.r&&(C.e.r=u.r),C.e.c<g&&(C.e.c=g),f.cellDates&&p&&"n"==d.t&&ue.is_date(ue._table[p.numFmtId])&&((a=ue.parse_date_code(d.v))&&(d.t="d",d.v=new Date(a.y,a.m-1,a.d,a.H,a.M,a.S,a.u)));break;case 1:if(!f.sheetStubs||T)break;d={t:"z",v:void 0},g=e[0].c,f.dense?(w[m]||(w[m]=[]),w[m][g]=d):w[$t(g)+E]=d,C.s.r>u.r&&(C.s.r=u.r),C.s.c>g&&(C.s.c=g),C.e.r<u.r&&(C.e.r=u.r),C.e.c<g&&(C.e.c=g);break;case 176:x.push(e);break;case 494:var a=i["!id"][e.relId];for(a?(e.Target=a.Target,e.loc&&(e.Target+="#"+e.loc),e.Rel=a):""==e.relId&&(e.Target="#"+e.loc),m=e.rfx.s.r;m<=e.rfx.e.r;++m)for(g=e.rfx.s.c;g<=e.rfx.e.c;++g)f.dense?(w[m]||(w[m]=[]),w[m][g]||(w[m][g]={t:"z",v:void 0}),w[m][g].l=e):(b=Yt({c:g,r:m}),w[b]||(w[b]={t:"z",v:void 0}),w[b].l=e);break;case 426:if(!f.cellFormula)break;A.push(e),(S=f.dense?w[m][g]:w[$t(g)+E]).f=Uo(e[1],0,{r:u.r,c:g},R,f),S.F=Jt(e[0]);break;case 427:if(!f.cellFormula)break;I[Yt(e[0].s)]=e[1],(S=f.dense?w[m][g]:w[$t(g)+E]).f=Uo(e[1],0,{r:u.r,c:g},R,f);break;case 60:if(!f.cellStyles)break;for(;e.e>=e.s;)F[e.e--]={width:e.w/256,hidden:!!(1&e.flags),level:e.level},O||(O=!0,li(e.w/256)),ci(F[e.e+1]);break;case 161:w["!autofilter"]={ref:Jt(e)};break;case 476:w["!margins"]=e;break;case 147:o.Sheets[s]||(o.Sheets[s]={}),e.name&&(o.Sheets[s].CodeName=e.name);break;case 137:o.Views||(o.Views=[{}]),o.Views[0]||(o.Views[0]={}),e.RTL&&(o.Views[0].RTL=!0);break;case 485:break;case 64:case 1053:case 151:break;case 175:case 644:case 625:case 562:case 396:case 1112:case 1146:case 471:case 1050:case 649:case 1105:case 49:case 589:case 607:case 564:case 1055:case 168:case 174:case 1180:case 499:case 507:case 550:case 171:case 167:case 1177:case 169:case 1181:case 551:case 552:case 661:case 639:case 478:case 537:case 477:case 536:case 1103:case 680:case 1104:case 1024:case 152:case 663:case 535:case 678:case 504:case 1043:case 428:case 170:case 3072:case 50:case 2070:case 1045:break;case 35:T=!0;break;case 36:T=!1;break;case 37:B.push(t),T=!0;break;case 38:B.pop(),T=!1;break;default:if(!(0<(t||"").indexOf("Begin"))&&!(0<(t||"").indexOf("End"))&&(!T||f.WTF))throw new Error("Unexpected record "+r+" "+t)}},f),delete f.supbooks,delete f["!row"],!w["!ref"]&&(C.s.r<2e6||h&&(0<h.e.r||0<h.e.c||0<h.s.r||0<h.s.c))&&(w["!ref"]=Jt(h||C)),f.sheetRows&&w["!ref"]&&(e=qt(w["!ref"]),f.sheetRows<=+e.e.r&&(e.e.r=f.sheetRows-1,e.e.r>C.e.r&&(e.e.r=C.e.r),e.e.r<e.s.r&&(e.s.r=e.e.r),e.e.c>C.e.c&&(e.e.c=C.e.c),e.e.c<e.s.c&&(e.s.c=e.e.c),w["!fullref"]=w["!ref"],w["!ref"]=Jt(e))),0<x.length&&(w["!merges"]=x),0<F.length&&(w["!cols"]=F),0<D.length&&(w["!rows"]=D),w}:gl)(e,n,r,a,s,i,o)}function cc(e,t,r,n,a,s){return".bin"===t.slice(-4)?function(e,n,a,t,s){if(!e)return e;t=t||{"!id":{}};var i={"!type":"chart","!drawel":null,"!rel":""},o=[],l=!1;return Mt(e,function(e,t,r){switch(r){case 550:i["!rel"]=e;break;case 651:s.Sheets[a]||(s.Sheets[a]={}),e.name&&(s.Sheets[a].CodeName=e.name);break;case 562:case 652:case 669:case 679:case 551:case 552:case 476:case 3072:break;case 35:l=!0;break;case 36:l=!1;break;case 37:o.push(t);break;case 38:o.pop();break;default:if(0<(t||"").indexOf("Begin"))o.push(t);else if(0<(t||"").indexOf("End"))o.pop();else if(!l||n.WTF)throw new Error("Unexpected record "+r+" "+t)}},n),t["!id"][i["!rel"]]&&(i["!drawel"]=t["!id"][i["!rel"]]),i}(e,n,r,a,s):function(e,t,r,n){if(!e)return e;r=r||{"!id":{}};var a={"!type":"chart","!drawel":null,"!rel":""},s=e.match(pl);return s&&bl(s[0],0,n,t),(e=e.match(/drawing r:id="(.*?)"/))&&(a["!rel"]=e[1]),r["!id"][a["!rel"]]&&(a["!drawel"]=r["!id"][a["!rel"]]),a}(e,r,a,s)}function fc(e,t,r,n){return(".bin"===t.slice(-4)?function(e,n,a){var t,s={NumberFmt:[]};for(t in ue._table)s.NumberFmt[t]=ue._table[t];s.CellXf=[],s.Fonts=[];var i=[],o=!1;return Mt(e,function(e,t,r){switch(r){case 44:s.NumberFmt[e[0]]=e[1],ue.load(e[1],e[0]);break;case 43:s.Fonts.push(e),null!=e.color.theme&&n&&n.themeElements&&n.themeElements.clrScheme&&(e.color.rgb=Zs(n.themeElements.clrScheme[e.color.theme].rgb,e.color.tint||0));break;case 1025:case 45:case 46:break;case 47:"BrtBeginCellXFs"==i[i.length-1]&&s.CellXf.push(e);break;case 48:case 507:case 572:case 475:break;case 1171:case 2102:case 1130:case 512:case 2095:case 3072:break;case 35:o=!0;break;case 36:o=!1;break;case 37:i.push(t),o=!0;break;case 38:i.pop(),o=!1;break;default:if(0<(t||"").indexOf("Begin"))i.push(t);else if(0<(t||"").indexOf("End"))i.pop();else if(!o||a.WTF&&"BrtACBegin"!=i[i.length-1])throw new Error("Unexpected record "+r+" "+t)}}),s}:Ci)(e,r,n)}function hc(e,t,r){return".bin"===t.slice(-4)?(n=r,s=!(a=[]),Mt(e,function(e,t,r){switch(r){case 159:a.Count=e[0],a.Unique=e[1];break;case 19:a.push(e);break;case 160:return 1;case 35:s=!0;break;case 36:s=!1;break;default:if(0<t.indexOf("Begin")||t.indexOf("End"),!s||n.WTF)throw new Error("Unexpected record "+r+" "+t)}}),a):function(e,t){var r=[],n="";if(!e)return r;if(e=e.match(ys)){n=e[2].replace(As,"").split(Is);for(var a=0;a!=n.length;++a){var s=_s(n[a].trim(),t);null!=s&&(r[r.length]=s)}e=Ee(e[1]),r.Count=e.count,r.Unique=e.uniqueCount}return r}(e,r);var n,a,s}function uc(e,t,r){return".bin"===t.slice(-4)?(n=r,a=[],s=[],o=!(i={}),Mt(e,function(e,t,r){switch(r){case 632:s.push(e);break;case 635:i=e;break;case 637:i.t=e.t,i.h=e.h,i.r=e.r;break;case 636:if(i.author=s[i.iauthor],delete i.iauthor,n.sheetRows&&i.rfx&&n.sheetRows<=i.rfx.r)break;i.t||(i.t=""),delete i.rfx,a.push(i);break;case 3072:break;case 35:o=!0;break;case 36:o=!1;break;case 37:case 38:break;default:if(!(0<(t||"").indexOf("Begin"))&&!(0<(t||"").indexOf("End"))&&(!o||n.WTF))throw new Error("Unexpected record "+r+" "+t)}}),a):function(e,n){if(e.match(/<(?:\w+:)?comments *\/>/))return[];var a=[],s=[],t=e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);return t&&t[1]&&t[1].split(/<\/\w*:?author>/).forEach(function(e){""===e||""===e.trim()||(e=e.match(/<(?:\w+:)?author[^>]*>(.*)/))&&a.push(e[1])}),(e=e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/))&&e[1]&&e[1].split(/<\/\w*:?comment>/).forEach(function(e){var t,r;""===e||""===e.trim()||(t=e.match(/<(?:\w+:)?comment[^>]*>/))&&(t={author:(r=Ee(t[0])).authorId&&a[r.authorId]||"sheetjsghost",ref:r.ref,guid:r.guid},r=Kt(r.ref),n.sheetRows&&n.sheetRows<=r.r||(e=!!(e=e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/))&&!!e[1]&&_s(e[1])||{r:"",t:"",h:""},t.r=e.r,"<t></t>"==e.r&&(e.t=e.h=""),t.t=e.t.replace(/\r\n/g,"\n").replace(/\r/g,"\n"),n.cellHTML&&(t.h=e.h),s.push(t)))}),s}(e,r);var n,a,s,i,o}function dc(e,t){return".bin"===t.slice(-4)?(n=[],Mt(e,function(e,t,r){if(63===r)n.push(e);else if(!(0<(t||"").indexOf("Begin")||0<(t||"").indexOf("End")))throw new Error("Unexpected record "+r+" "+t)}),n):function(e){var r=[];if(!e)return r;var n=1;return(e.match(ge)||[]).forEach(function(e){var t=Ee(e);switch(t[0]){case"<?xml":break;case"<calcChain":case"<calcChain>":case"</calcChain>":break;case"<c":delete t[0],t.i?n=t.i:t.i=n,r.push(t)}}),r}(e);var n}function pc(e,t,r,n){if(".bin"===r.slice(-4))return function(e,t){if(!e)return e;var n=t||{},a=!1;Mt(e,function(e,t,r){switch(0,r){case 359:case 363:case 364:case 366:case 367:case 368:case 369:case 370:case 371:case 472:case 577:case 578:case 579:case 580:case 581:case 582:case 583:case 584:case 585:case 586:case 587:break;case 35:a=!0;break;case 36:a=!1;break;default:if(!(0<(t||"").indexOf("Begin"))&&!(0<(t||"").indexOf("End"))&&(!a||n.WTF))throw new Error("Unexpected record "+r.toString(16)+" "+t)}},n)}(e,n)}function mc(e,t,r){return(".bin"===t.slice(-4)?ic:function(t){var r=[K];r[r.length]=nc;var e=t.Workbook&&0<(t.Workbook.Names||[]).length,n={codeName:"ThisWorkbook"};t.Workbook&&t.Workbook.WBProps&&(jl.forEach(function(e){null!=t.Workbook.WBProps[e[0]]&&t.Workbook.WBProps[e[0]]!=e[1]&&(n[e[0]]=t.Workbook.WBProps[e[0]])}),t.Workbook.WBProps.CodeName&&(n.codeName=t.Workbook.WBProps.CodeName,delete n.CodeName)),r[r.length]=Je("workbookPr",null,n);var a=t.Workbook&&t.Workbook.Sheets||[],s=0;if(a&&a[0]&&a[0].Hidden){for(r[r.length]="<bookViews>",s=0;s!=t.SheetNames.length&&a[s]&&a[s].Hidden;++s);s==t.SheetNames.length&&(s=0),r[r.length]='<workbookView firstSheet="'+s+'" activeTab="'+s+'"/>',r[r.length]="</bookViews>"}for(r[r.length]="<sheets>",s=0;s!=t.SheetNames.length;++s){var i={name:ye(t.SheetNames[s].slice(0,31))};if(i.sheetId=""+(s+1),i["r:id"]="rId"+(s+1),a[s])switch(a[s].Hidden){case 1:i.state="hidden";break;case 2:i.state="veryHidden"}r[r.length]=Je("sheet",null,i)}return r[r.length]="</sheets>",e&&(r[r.length]="<definedNames>",t.Workbook&&t.Workbook.Names&&t.Workbook.Names.forEach(function(e){var t={name:e.Name};e.Comment&&(t.comment=e.Comment),null!=e.Sheet&&(t.localSheetId=""+e.Sheet),e.Hidden&&(t.hidden="1"),e.Ref&&(r[r.length]=Je("definedName",ye(e.Ref),t))}),r[r.length]="</definedNames>"),2<r.length&&(r[r.length]="</workbook>",r[1]=r[1].replace("/>",">")),r.join("")})(e,r)}function gc(e,t,r){return(".bin"===t.slice(-4)?Ds:function(e,t){if(!t.bookSST)return"";var r=[K];r[r.length]=Je("sst",null,{xmlns:Ze.main[0],count:e.Count,uniqueCount:e.Unique});for(var n,a,s=0;s!=e.length;++s)null!=e[s]&&(a="<si>",(n=e[s]).r?a+=n.r:(a+="<t",n.t||(n.t=""),n.t.match(Rs)&&(a+=' xml:space="preserve"'),a+=">"+ye(n.t)+"</t>"),a+="</si>",r[r.length]=a);return 2<r.length&&(r[r.length]="</sst>",r[1]=r[1].replace("/>",">")),r.join("")})(e,r)}function bc(e,t,r){return(".bin"===t.slice(-4)?qi:function(e){var r=[K,Qi],n=[];return r.push("<authors>"),e.forEach(function(e){e[1].forEach(function(e){e=ye(e.a);-1<n.indexOf(e)||(n.push(e),r.push("<author>"+e+"</author>"))})}),r.push("</authors>"),r.push("<commentList>"),e.forEach(function(t){t[1].forEach(function(e){r.push('<comment ref="'+t[0]+'" authorId="'+n.indexOf(ye(e.a))+'"><text>'),r.push(Ye("t",null==e.t?"":ye(e.t))),r.push("</text></comment>")})}),r.push("</commentList>"),2<r.length&&(r[r.length]="</comments>",r[1]=r[1].replace("/>",">")),r.join("")})(e,r)}var vc=/([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g,Ec=/([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;function Sc(e,t){var r=e.split(/\s+/),n=[];if(t||(n[0]=r[0]),1===r.length)return n;var a,s,i,o=e.match(vc);if(o)for(i=0;i!=o.length;++i)-1===(s=(a=o[i].match(Ec))[1].indexOf(":"))?n[a[1]]=a[2].slice(1,a[2].length-1):n["xmlns:"===a[1].slice(0,6)?"xmlns"+a[1].slice(6):a[1].slice(s+1)]=a[2].slice(1,a[2].length-1);return n}function wc(e,t,r){if("z"!==e.t){if(!r||!1!==r.cellText)try{"e"===e.t?e.w=e.w||Wr[e.v]:"General"===t?"n"===e.t?(0|e.v)===e.v?e.w=ue._general_int(e.v):e.w=ue._general_num(e.v):e.w=ue._general(e.v):e.w=(n=t||"General",a=e.v,"General"===(n=se[n]||ke(n))?ue._general(a):ue.format(n,a))}catch(e){if(r.WTF)throw e}var n,a;try{var s=se[t]||t||"General";r.cellNF&&(e.z=s),r.cellDates&&"n"==e.t&&ue.is_date(s)&&((s=ue.parse_date_code(e.v))&&(e.t="d",e.v=new Date(s.y,s.m-1,s.d,s.H,s.M,s.S,s.u)))}catch(e){if(r.WTF)throw e}}}function Cc(e){if(Q&&Buffer.isBuffer(e))return e.toString("utf8");if("string"==typeof e)return e;if("undefined"!=typeof Uint8Array&&e instanceof Uint8Array)return Me(o(p(e)));throw new Error("Bad input format: expected Buffer or string")}var Bc=/<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/gm;function Tc(e,t){var r=t||{};ae(ue);var n,a=re(Cc(e)),s=(a="binary"==r.type||"array"==r.type||"base64"==r.type?"undefined"!=typeof cptable?cptable.utils.decode(65001,te(a)):Me(a):a).slice(0,1024).toLowerCase(),i=!1;if(-1==s.indexOf("<?xml")&&["html","table","head","meta","script","style","div"].forEach(function(e){0<=s.indexOf("<"+e)&&(i=!0)}),i)return rf.to_workbook(a,r);var o,l=[];null!=fe&&null==r.dense&&(r.dense=fe);var c,f={},h=[],u=r.dense?[]:{},d="",p={},m={},g=Sc('<Data ss:Type="String">'),b=0,v=0,E=0,S={s:{r:2e6,c:2e6},e:{r:0,c:0}},w={},C={},B="",T=0,k=[],x={},_={},y=0,A=[],I=[],R={},F=[],D=!1,O=[],P=[],N={},M=0,L=0,U={Sheets:[],WBProps:{date1904:!1}},H={};Bc.lastIndex=0,a=a.replace(/<!--([\s\S]*?)-->/gm,"");for(var W,V,X,G,z="";n=Bc.exec(a);)switch(n[3]=(z=n[3]).toLowerCase()){case"data":if("data"==z){if("/"===n[1]){if((o=l.pop())[0]!==n[3])throw new Error("Bad state: "+o.join("|"))}else"/"!==n[0].charAt(n[0].length-2)&&l.push([n[3],!0]);break}if(l[l.length-1][1])break;"/"===n[1]?function(e,t,r,n,a,s,i,o,l,c){var f="General",h=n.StyleID,u={};c=c||{};var d=[],p=0;for(void 0===(h=void 0===h&&o?o.StyleID:h)&&i&&(h=i.StyleID);void 0!==s[h]&&(s[h].nf&&(f=s[h].nf),s[h].Interior&&d.push(s[h].Interior),s[h].Parent);)h=s[h].Parent;switch(r.Type){case"Boolean":n.t="b",n.v=Ne(e);break;case"String":n.t="s",n.r=De(ke(e)),n.v=-1<e.indexOf("<")?ke(t||e).replace(/<.*?>/g,""):n.r;break;case"DateTime":"Z"!=e.slice(-1)&&(e+="Z"),n.v=(le(e)-new Date(Date.UTC(1899,11,30)))/864e5,n.v!=n.v?n.v=ke(e):n.v<60&&(n.v=n.v-1),f&&"General"!=f||(f="yyyy-mm-dd");case"Number":void 0===n.v&&(n.v=+e),n.t||(n.t="n");break;case"Error":n.t="e",n.v=Vr[e],!1!==c.cellText&&(n.w=e);break;default:""==e&&""==t?n.t="z":(n.t="s",n.v=De(t||e))}if(wc(n,f,c),!1!==c.cellFormula)if(n.Formula){r=ke(n.Formula);61==r.charCodeAt(0)&&(r=r.slice(1)),n.f=no(r,a),delete n.Formula,"RC"==n.ArrayRange?n.F=no("RC:RC",a):n.ArrayRange&&(n.F=no(n.ArrayRange,a),l.push([qt(n.F),n.F]))}else for(p=0;p<l.length;++p)a.r>=l[p][0].s.r&&a.r<=l[p][0].e.r&&a.c>=l[p][0].s.c&&a.c<=l[p][0].e.c&&(n.F=l[p][1]);c.cellStyles&&(d.forEach(function(e){!u.patternType&&e.patternType&&(u.patternType=e.patternType)}),n.s=u),void 0!==n.StyleID&&(n.ixfe=n.StyleID)}(a.slice(b,n.index),B,g,"comment"==l[l.length-1][0]?R:p,{c:v,r:E},w,F[v],m,O,r):(B="",g=Sc(n[0]),b=n.index+n[0].length);break;case"cell":if("/"===n[1])if(0<I.length&&(p.c=I),(!r.sheetRows||r.sheetRows>E)&&void 0!==p.v&&(r.dense?(u[E]||(u[E]=[]),u[E][v]=p):u[$t(v)+zt(E)]=p),p.HRef&&(p.l={Target:p.HRef},p.HRefScreenTip&&(p.l.Tooltip=p.HRefScreenTip),delete p.HRef,delete p.HRefScreenTip),(p.MergeAcross||p.MergeDown)&&(M=v+(0|parseInt(p.MergeAcross,10)),L=E+(0|parseInt(p.MergeDown,10)),k.push({s:{c:v,r:E},e:{c:M,r:L}})),r.sheetStubs)if(p.MergeAcross||p.MergeDown){for(var j=v;j<=M;++j)for(var $=E;$<=L;++$)(v<j||E<$)&&(r.dense?(u[$]||(u[$]=[]),u[$][j]={t:"z"}):u[$t(j)+zt($)]={t:"z"});v=M+1}else++v;else p.MergeAcross?v=M+1:++v;else(v=(p=function(e){var t={};if(1===e.split(/\s+/).length)return t;var r,n,a,s=e.match(vc);if(s)for(a=0;a!=s.length;++a)-1===(n=(r=s[a].match(Ec))[1].indexOf(":"))?t[r[1]]=r[2].slice(1,r[2].length-1):t["xmlns:"===r[1].slice(0,6)?"xmlns"+r[1].slice(6):r[1].slice(n+1)]=r[2].slice(1,r[2].length-1);return t}(n[0])).Index?+p.Index-1:v)<S.s.c&&(S.s.c=v),v>S.e.c&&(S.e.c=v),"/>"===n[0].slice(-2)&&++v,I=[];break;case"row":"/"===n[1]||"/>"===n[0].slice(-2)?(E<S.s.r&&(S.s.r=E),E>S.e.r&&(S.e.r=E),"/>"===n[0].slice(-2)&&(m=Sc(n[0])).Index&&(E=+m.Index-1),v=0,++E):((m=Sc(n[0])).Index&&(E=+m.Index-1),N={},"0"!=m.AutoFitHeight&&!m.Height||(N.hpx=parseInt(m.Height,10),N.hpt=hi(N.hpx),P[E]=N),"1"==m.Hidden&&(N.hidden=!0,P[E]=N));break;case"worksheet":if("/"===n[1]){if((o=l.pop())[0]!==n[3])throw new Error("Bad state: "+o.join("|"));h.push(d),S.s.r<=S.e.r&&S.s.c<=S.e.c&&(u["!ref"]=Jt(S),r.sheetRows&&r.sheetRows<=S.e.r&&(u["!fullref"]=u["!ref"],S.e.r=r.sheetRows-1,u["!ref"]=Jt(S))),k.length&&(u["!merges"]=k),0<F.length&&(u["!cols"]=F),0<P.length&&(u["!rows"]=P),f[d]=u}else S={s:{r:2e6,c:2e6},e:{r:0,c:0}},E=v=0,l.push([n[3],!1]),o=Sc(n[0]),d=ke(o.Name),u=r.dense?[]:{},k=[],O=[],P=[],H={name:d,Hidden:0},U.Sheets.push(H);break;case"table":if("/"===n[1]){if((o=l.pop())[0]!==n[3])throw new Error("Bad state: "+o.join("|"))}else{if("/>"==n[0].slice(-2))break;Sc(n[0]),l.push([n[3],!1]),D=!(F=[])}break;case"style":"/"===n[1]?(V=w,X=C,(G=r).cellStyles&&(!X.Interior||(G=X.Interior).Pattern&&(G.patternType=di[G.Pattern]||G.Pattern)),V[X.ID]=X):C=Sc(n[0]);break;case"numberformat":C.nf=ke(Sc(n[0]).Format||"General"),se[C.nf]&&(C.nf=se[C.nf]);for(var K=0;392!=K&&ue._table[K]!=C.nf;++K);if(392==K)for(K=57;392!=K;++K)if(null==ue._table[K]){ue.load(C.nf,K);break}break;case"column":if("table"!==l[l.length-1][0])break;if((c=Sc(n[0])).Hidden&&(c.hidden=!0,delete c.Hidden),c.Width&&(c.wpx=parseInt(c.Width,10)),!D&&10<c.wpx){D=!0,ni=ei;for(var Y=0;Y<F.length;++Y)F[Y]&&ci(F[Y])}D&&ci(c),F[c.Index-1||F.length]=c;for(var Q=0;Q<+c.Span;++Q)F[F.length]=pe(c);break;case"namedrange":if("/"===n[1])break;U.Names||(U.Names=[]);var J=Ee(n[0]),q={Name:J.Name,Ref:no(J.RefersTo.slice(1),{r:0,c:0})};0<U.Sheets.length&&(q.Sheet=U.Sheets.length-1),U.Names.push(q);break;case"namedcell":case"b":case"i":case"u":case"s":case"em":case"h2":case"h3":case"sub":case"sup":case"span":case"alignment":case"borders":case"border":break;case"font":if("/>"===n[0].slice(-2))break;"/"===n[1]?B+=a.slice(T,n.index):T=n.index+n[0].length;break;case"interior":if(!r.cellStyles)break;C.Interior=Sc(n[0]);break;case"protection":break;case"author":case"title":case"description":case"created":case"keywords":case"subject":case"category":case"company":case"lastauthor":case"lastsaved":case"lastprinted":case"version":case"revision":case"totaltime":case"hyperlinkbase":case"manager":case"contentstatus":case"identifier":case"language":case"appname":if("/>"===n[0].slice(-2))break;"/"===n[1]?(X=x,J=z,q=a.slice(y,n.index),X[J=Sn[J]||J]=q):y=n.index+n[0].length;break;case"paragraphs":break;case"styles":case"workbook":if("/"===n[1]){if((o=l.pop())[0]!==n[3])throw new Error("Bad state: "+o.join("|"))}else l.push([n[3],!1]);break;case"comment":if("/"===n[1]){if((o=l.pop())[0]!==n[3])throw new Error("Bad state: "+o.join("|"));(W=R).t=W.v||"",W.t=W.t.replace(/\r\n/g,"\n").replace(/\r/g,"\n"),W.v=W.w=W.ixfe=void 0,I.push(R)}else l.push([n[3],!1]),R={a:(o=Sc(n[0])).Author};break;case"autofilter":if("/"===n[1]){if((o=l.pop())[0]!==n[3])throw new Error("Bad state: "+o.join("|"))}else"/"!==n[0].charAt(n[0].length-2)&&(W=Sc(n[0]),u["!autofilter"]={ref:no(W.Range).replace(/\$/g,"")},l.push([n[3],!0]));break;case"name":break;case"datavalidation":if("/"===n[1]){if((o=l.pop())[0]!==n[3])throw new Error("Bad state: "+o.join("|"))}else"/"!==n[0].charAt(n[0].length-2)&&l.push([n[3],!0]);break;case"pixelsperinch":break;case"componentoptions":case"documentproperties":case"customdocumentproperties":case"officedocumentsettings":case"pivottable":case"pivotcache":case"names":case"mapinfo":case"pagebreaks":case"querytable":case"sorting":case"schema":case"conditionalformatting":case"smarttagtype":case"smarttags":case"excelworkbook":case"workbookoptions":case"worksheetoptions":if("/"===n[1]){if((o=l.pop())[0]!==n[3])throw new Error("Bad state: "+o.join("|"))}else"/"!==n[0].charAt(n[0].length-2)&&l.push([n[3],!0]);break;default:if(0==l.length&&"document"==n[3])return df(a,r);if(0==l.length&&"uof"==n[3])return df(a,r);var Z=!0;switch(l[l.length-1][0]){case"officedocumentsettings":switch(n[3]){case"allowpng":case"removepersonalinformation":case"downloadcomponents":case"locationofcomponents":case"colors":case"color":case"index":case"rgb":case"targetscreensize":case"readonlyrecommended":break;default:Z=!1}break;case"componentoptions":switch(n[3]){case"toolbar":case"hideofficelogo":case"spreadsheetautofit":case"label":case"caption":case"maxheight":case"maxwidth":case"nextsheetnumber":break;default:Z=!1}break;case"excelworkbook":switch(n[3]){case"date1904":U.WBProps.date1904=!0;break;case"windowheight":case"windowwidth":case"windowtopx":case"windowtopy":case"tabratio":case"protectstructure":case"protectwindow":case"protectwindows":case"activesheet":case"displayinknotes":case"firstvisiblesheet":case"supbook":case"sheetname":case"sheetindex":case"sheetindexfirst":case"sheetindexlast":case"dll":case"acceptlabelsinformulas":case"donotsavelinkvalues":case"iteration":case"maxiterations":case"maxchange":case"path":case"xct":case"count":case"selectedsheets":case"calculation":case"uncalced":case"startupprompt":case"crn":case"externname":case"formula":case"colfirst":case"collast":case"wantadvise":case"boolean":case"error":case"text":case"ole":case"noautorecover":case"publishobjects":case"donotcalculatebeforesave":case"number":case"refmoder1c1":case"embedsavesmarttags":break;default:Z=!1}break;case"workbookoptions":switch(n[3]){case"owcversion":case"height":case"width":break;default:Z=!1}break;case"worksheetoptions":switch(n[3]){case"visible":if("/>"!==n[0].slice(-2))if("/"===n[1])switch(a.slice(y,n.index)){case"SheetHidden":H.Hidden=1;break;case"SheetVeryHidden":H.Hidden=2}else y=n.index+n[0].length;break;case"header":u["!margins"]||al(u["!margins"]={},"xlml"),u["!margins"].header=Ee(n[0]).Margin;break;case"footer":u["!margins"]||al(u["!margins"]={},"xlml"),u["!margins"].footer=Ee(n[0]).Margin;break;case"pagemargins":var ee=Ee(n[0]);u["!margins"]||al(u["!margins"]={},"xlml"),ee.Top&&(u["!margins"].top=ee.Top),ee.Left&&(u["!margins"].left=ee.Left),ee.Right&&(u["!margins"].right=ee.Right),ee.Bottom&&(u["!margins"].bottom=ee.Bottom);break;case"displayrighttoleft":U.Views||(U.Views=[]),U.Views[0]||(U.Views[0]={}),U.Views[0].RTL=!0;break;case"freezepanes":case"frozennosplit":break;case"splithorizontal":case"splitvertical":case"donotdisplaygridlines":case"activerow":case"activecol":case"toprowbottompane":case"leftcolumnrightpane":case"unsynced":case"print":case"panes":case"scale":case"pane":case"number":case"layout":case"pagesetup":case"selected":case"protectobjects":case"enableselection":case"protectscenarios":case"validprinterinfo":case"horizontalresolution":case"verticalresolution":case"numberofcopies":case"activepane":case"toprowvisible":case"leftcolumnvisible":case"fittopage":case"rangeselection":case"papersizeindex":case"pagelayoutzoom":case"pagebreakzoom":case"filteron":case"fitwidth":case"fitheight":case"commentslayout":case"zoom":case"lefttoright":case"gridlines":case"allowsort":case"allowfilter":case"allowinsertrows":case"allowdeleterows":case"allowinsertcols":case"allowdeletecols":case"allowinserthyperlinks":case"allowformatcells":case"allowsizecols":case"allowsizerows":case"nosummaryrowsbelowdetail":case"tabcolorindex":case"donotdisplayheadings":case"showpagelayoutzoom":case"nosummarycolumnsrightdetail":case"blackandwhite":case"donotdisplayzeros":case"displaypagebreak":case"rowcolheadings":case"donotdisplayoutline":case"noorientation":case"allowusepivottables":case"zeroheight":case"viewablerange":case"selection":case"protectcontents":break;default:Z=!1}break;case"pivottable":case"pivotcache":switch(n[3]){case"immediateitemsondrop":case"showpagemultipleitemlabel":case"compactrowindent":case"location":case"pivotfield":case"orientation":case"layoutform":case"layoutsubtotallocation":case"layoutcompactrow":case"position":case"pivotitem":case"datatype":case"datafield":case"sourcename":case"parentfield":case"ptlineitems":case"ptlineitem":case"countofsameitems":case"item":case"itemtype":case"ptsource":case"cacheindex":case"consolidationreference":case"filename":case"reference":case"nocolumngrand":case"norowgrand":case"blanklineafteritems":case"hidden":case"subtotal":case"basefield":case"mapchilditems":case"function":case"refreshonfileopen":case"printsettitles":case"mergelabels":case"defaultversion":case"refreshname":case"refreshdate":case"refreshdatecopy":case"versionlastrefresh":case"versionlastupdate":case"versionupdateablemin":case"versionrefreshablemin":case"calculation":break;default:Z=!1}break;case"pagebreaks":switch(n[3]){case"colbreaks":case"colbreak":case"rowbreaks":case"rowbreak":case"colstart":case"colend":case"rowend":break;default:Z=!1}break;case"autofilter":switch(n[3]){case"autofiltercolumn":case"autofiltercondition":case"autofilterand":case"autofilteror":break;default:Z=!1}break;case"querytable":switch(n[3]){case"id":case"autoformatfont":case"autoformatpattern":case"querysource":case"querytype":case"enableredirections":case"refreshedinxl9":case"urlstring":case"htmltables":case"connection":case"commandtext":case"refreshinfo":case"notitles":case"nextid":case"columninfo":case"overwritecells":case"donotpromptforfile":case"textwizardsettings":case"source":case"number":case"decimal":case"thousandseparator":case"trailingminusnumbers":case"formatsettings":case"fieldtype":case"delimiters":case"tab":case"comma":case"autoformatname":case"versionlastedit":case"versionlastrefresh":break;default:Z=!1}break;case"datavalidation":switch(n[3]){case"range":case"type":case"min":case"max":case"sort":case"descending":case"order":case"casesensitive":case"value":case"errorstyle":case"errormessage":case"errortitle":case"inputmessage":case"inputtitle":case"combohide":case"inputhide":case"condition":case"qualifier":case"useblank":case"value1":case"value2":case"format":case"cellrangelist":break;default:Z=!1}break;case"sorting":case"conditionalformatting":switch(n[3]){case"range":case"type":case"min":case"max":case"sort":case"descending":case"order":case"casesensitive":case"value":case"errorstyle":case"errormessage":case"errortitle":case"cellrangelist":case"inputmessage":case"inputtitle":case"combohide":case"inputhide":case"condition":case"qualifier":case"useblank":case"value1":case"value2":case"format":break;default:Z=!1}break;case"mapinfo":case"schema":case"data":switch(n[3]){case"map":case"entry":case"range":case"xpath":case"field":case"xsdtype":case"filteron":case"aggregate":case"elementtype":case"attributetype":break;case"schema":case"element":case"complextype":case"datatype":case"all":case"attribute":case"extends":case"row":break;default:Z=!1}break;case"smarttags":break;default:Z=!1}if(Z)break;if(n[3].match(/!\[CDATA/))break;if(!l[l.length-1][1])throw"Unrecognized tag: "+n[3]+"|"+l.join("|");if("customdocumentproperties"===l[l.length-1][0]){if("/>"===n[0].slice(-2))break;"/"===n[1]?function(e,t,r,n){var a=n;switch((r[0].match(/dt:dt="([\w.]+)"/)||["",""])[1]){case"boolean":a=Ne(n);break;case"i2":case"int":a=parseInt(n,10);break;case"r4":case"float":a=parseFloat(n);break;case"date":case"dateTime.tz":a=le(n);break;case"i8":case"string":case"fixed":case"uuid":case"bin.base64":break;default:throw new Error("bad custprop:"+r[0])}e[ke(t)]=a}(_,z,A,a.slice(y,n.index)):y=(A=n).index+n[0].length;break}if(r.WTF)throw"Unrecognized tag: "+n[3]+"|"+l.join("|")}e={};return r.bookSheets||r.bookProps||(e.Sheets=f),e.SheetNames=h,e.Workbook=U,e.SSF=ue.get_table(),e.Props=x,e.Custprops=_,e}function kc(e,t){switch(Rf(t=t||{}),t.type||"base64"){case"base64":return Tc(Y.decode(e),t);case"binary":case"buffer":case"file":return Tc(e,t);case"array":return Tc(o(e),t)}}function xc(e,t){var r,n,a,s,i,o,l,c=[];return e.Props&&c.push((r=e.Props,n=t,a=[],de(En).map(function(e){for(var t=0;t<ln.length;++t)if(ln[t][1]==e)return ln[t];for(t=0;t<dn.length;++t)if(dn[t][1]==e)return dn[t];throw e}).forEach(function(e){var t;null!=r[e[1]]&&(t=(n&&n.Props&&null!=n.Props[e[1]]?n.Props:r)[e[1]],"number"==typeof(t="date"===e[2]?new Date(t).toISOString().replace(/\.\d*Z/,"Z"):t)?t=String(t):!0===t||!1===t?t=t?"1":"0":t instanceof Date&&(t=new Date(t).toISOString().replace(/\.\d*Z/,"")),a.push(Ye(En[e[1]]||e[1],t)))}),Je("DocumentProperties",a.join(""),{xmlns:et.o}))),e.Custprops&&c.push((s=e.Props,i=e.Custprops,o=["Worksheets","SheetNames"],e="CustomDocumentProperties",l=[],s&&de(s).forEach(function(e){if(Object.prototype.hasOwnProperty.call(s,e)){for(var t=0;t<ln.length;++t)if(e==ln[t][1])return;for(t=0;t<dn.length;++t)if(e==dn[t][1])return;for(t=0;t<o.length;++t)if(e==o[t])return;var r="string",n="number"==typeof(n=s[e])?(r="float",String(n)):!0===n||!1===n?(r="boolean",n?"1":"0"):String(n);l.push(Je(Ae(e),n,{"dt:dt":r}))}}),i&&de(i).forEach(function(e){var t,r;Object.prototype.hasOwnProperty.call(i,e)&&(s&&Object.prototype.hasOwnProperty.call(s,e)||(t="string",r="number"==typeof(r=i[e])?(t="float",String(r)):!0===r||!1===r?(t="boolean",r?"1":"0"):r instanceof Date?(t="dateTime.tz",r.toISOString()):String(r),l.push(Je(Ae(e),r,{"dt:dt":t}))))}),"<"+e+' xmlns="'+et.o+'">'+l.join("")+"</"+e+">")),c.join("")}function _c(e){return Je("NamedRange",null,{"ss:Name":e.Name,"ss:RefersTo":"="+io(e.Ref,{r:0,c:0})})}function yc(e,t,r,n,a,s,i){if(!e||null==e.v&&null==e.f)return"";var o={};if(e.f&&(o["ss:Formula"]="="+ye(io(e.f,i))),e.F&&e.F.slice(0,t.length)==t&&(t=Kt(e.F.slice(t.length+1)),o["ss:ArrayRange"]="RC:R"+(t.r==i.r?"":"["+(t.r-i.r)+"]")+"C"+(t.c==i.c?"":"["+(t.c-i.c)+"]")),e.l&&e.l.Target&&(o["ss:HRef"]=ye(e.l.Target),e.l.Tooltip&&(o["x:HRefScreenTip"]=ye(e.l.Tooltip))),r["!merges"])for(var l=r["!merges"],c=0;c!=l.length;++c)l[c].s.c==i.c&&l[c].s.r==i.r&&(l[c].e.c>l[c].s.c&&(o["ss:MergeAcross"]=l[c].e.c-l[c].s.c),l[c].e.r>l[c].s.r&&(o["ss:MergeDown"]=l[c].e.r-l[c].s.r));var f="",h="";switch(e.t){case"z":if(!n.sheetStubs)return"";break;case"n":f="Number",h=String(e.v);break;case"b":f="Boolean",h=e.v?"1":"0";break;case"e":f="Error",h=Wr[e.v];break;case"d":f="DateTime",h=new Date(e.v).toISOString(),null==e.z&&(e.z=e.z||ue._table[14]);break;case"s":f="String",h=((e.v||"")+"").replace(xe,function(e){return Te[e]}).replace(Ie,function(e){return"&#x"+e.charCodeAt(0).toString(16).toUpperCase()+";"})}r=sl(n.cellXfs,e,n);o["ss:StyleID"]="s"+(21+r),o["ss:Index"]=i.c+1;r=null!=e.v?h:"",r="z"==e.t?"":'<Data ss:Type="'+f+'">'+r+"</Data>";return 0<(e.c||[]).length&&(r+=e.c.map(function(e){var t=Je("ss:Data",Pe(e.t||""),{xmlns:"http://www.w3.org/TR/REC-html40"});return Je("Comment",t,{"ss:Author":e.a})}).join("")),Je("Cell",r,o)}function Ac(e,t){if(!e["!ref"])return"";var r=qt(e["!ref"]),n=e["!merges"]||[],a=0,s=[];e["!cols"]&&e["!cols"].forEach(function(e,t){ci(e);var r=!!e.width,n=nl(t,e),t={"ss:Index":t+1};r&&(t["ss:Width"]=ai(n.width)),e.hidden&&(t["ss:Hidden"]="1"),s.push(Je("Column",null,t))});for(var i,o,l=Array.isArray(e),c=r.s.r;c<=r.e.r;++c){for(var f=[(i=c,o=(e["!rows"]||[])[c],i='<Row ss:Index="'+(i+1)+'"',o&&(o.hpt&&!o.hpx&&(o.hpx=ui(o.hpt)),o.hpx&&(i+=' ss:AutoFitHeight="0" ss:Height="'+o.hpx+'"'),o.hidden&&(i+=' ss:Hidden="1"')),i+">")],h=r.s.c;h<=r.e.c;++h){for(var u,d,p,m=!1,a=0;a!=n.length;++a)if(!(n[a].s.c>h||n[a].s.r>c||n[a].e.c<h||n[a].e.r<c)){n[a].s.c==h&&n[a].s.r==c||(m=!0);break}m||(d=Yt(u={r:c,c:h}),p=l?(e[c]||[])[h]:e[d],f.push(yc(p,d,e,t,0,0,u)))}f.push("</Row>"),2<f.length&&s.push(f.join(""))}return s.join("")}function Ic(e,t,r){var n=[],a=r.SheetNames[e],s=r.Sheets[a],a=s?function(e,t,r){if(!e)return"";if(!((r||{}).Workbook||{}).Names)return"";for(var n=r.Workbook.Names,a=[],s=0;s<n.length;++s){var i=n[s];i.Sheet==t&&(i.Name.match(/^_xlfn\./)||a.push(_c(i)))}return a.join("")}(s,e,r):"";return 0<a.length&&n.push("<Names>"+a+"</Names>"),0<(a=s?Ac(s,t):"").length&&n.push("<Table>"+a+"</Table>"),n.push(function(t,e,r){if(!t)return"";var n=[];if(t["!margins"]&&(n.push("<PageSetup>"),t["!margins"].header&&n.push(Je("Header",null,{"x:Margin":t["!margins"].header})),t["!margins"].footer&&n.push(Je("Footer",null,{"x:Margin":t["!margins"].footer})),n.push(Je("PageMargins",null,{"x:Bottom":t["!margins"].bottom||"0.75","x:Left":t["!margins"].left||"0.7","x:Right":t["!margins"].right||"0.7","x:Top":t["!margins"].top||"0.75"})),n.push("</PageSetup>")),r&&r.Workbook&&r.Workbook.Sheets&&r.Workbook.Sheets[e])if(r.Workbook.Sheets[e].Hidden)n.push(Je("Visible",1==r.Workbook.Sheets[e].Hidden?"SheetHidden":"SheetVeryHidden",{}));else{for(var a=0;a<e&&(!r.Workbook.Sheets[a]||r.Workbook.Sheets[a].Hidden);++a);a==e&&n.push("<Selected/>")}return((((r||{}).Workbook||{}).Views||[])[0]||{}).RTL&&n.push("<DisplayRightToLeft/>"),t["!protect"]&&(n.push(Ye("ProtectContents","True")),t["!protect"].objects&&n.push(Ye("ProtectObjects","True")),t["!protect"].scenarios&&n.push(Ye("ProtectScenarios","True")),null==t["!protect"].selectLockedCells||t["!protect"].selectLockedCells?null==t["!protect"].selectUnlockedCells||t["!protect"].selectUnlockedCells||n.push(Ye("EnableSelection","UnlockedCells")):n.push(Ye("EnableSelection","NoSelection")),[["formatCells","AllowFormatCells"],["formatColumns","AllowSizeCols"],["formatRows","AllowSizeRows"],["insertColumns","AllowInsertCols"],["insertRows","AllowInsertRows"],["insertHyperlinks","AllowInsertHyperlinks"],["deleteColumns","AllowDeleteCols"],["deleteRows","AllowDeleteRows"],["sort","AllowSort"],["autoFilter","AllowFilter"],["pivotTables","AllowUsePivotTables"]].forEach(function(e){t["!protect"][e[0]]&&n.push("<"+e[1]+"/>")})),0==n.length?"":Je("WorksheetOptions",n.join(""),{xmlns:et.x})}(s,e,r)),n.join("")}function Rc(e,t){t=t||{},e.SSF||(e.SSF=ue.get_table()),e.SSF&&(ae(ue),ue.load_table(e.SSF),t.revssf=B(e.SSF),t.revssf[e.SSF[65535]]=0,t.ssf=e.SSF,t.cellXfs=[],sl(t.cellXfs,{},{revssf:{General:0}}));var r=[];r.push(xc(e,t)),r.push(""),r.push(""),r.push("");for(var n,a=0;a<e.SheetNames.length;++a)r.push(Je("Worksheet",Ic(a,t,e),{"ss:Name":ye(e.SheetNames[a])}));return r[2]=(n=['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'],t.cellXfs.forEach(function(e,t){var r=[];r.push(Je("NumberFormat",null,{"ss:Format":ye(ue._table[e.numFmtId])}));t={"ss:ID":"s"+(21+t)};n.push(Je("Style",r.join(""),t))}),Je("Styles",n.join(""))),r[3]=function(e){if(!((e||{}).Workbook||{}).Names)return"";for(var t=e.Workbook.Names,r=[],n=0;n<t.length;++n){var a=t[n];null==a.Sheet&&(a.Name.match(/^_xlfn\./)||r.push(_c(a)))}return Je("Names",r.join(""))}(e),K+Je("Workbook",r.join(""),{xmlns:et.ss,"xmlns:o":et.o,"xmlns:x":et.x,"xmlns:ss":et.ss,"xmlns:dt":et.dt,"xmlns:html":et.html})}function Fc(e){var t={},r=e.content;if(r.l=28,t.AnsiUserType=r.read_shift(0,"lpstr-ansi"),t.AnsiClipboardFormat=xr(r,1),r.length-r.l<=4)return t;e=r.read_shift(4);return 0==e||40<e?t:(r.l-=4,t.Reserved1=r.read_shift(0,"lpstr-ansi"),r.length-r.l<=4||1907505652!==(e=r.read_shift(4))?t:(t.UnicodeClipboardFormat=xr(r,2),0==(e=r.read_shift(4))||40<e?t:(r.l-=4,void(t.Reserved2=r.read_shift(0,"lpwstr")))))}function Dc(e,t,r){if("z"!==e.t&&e.XF){var n,a=0;try{a=e.z||e.XF.numFmtId||0,t.cellNF&&(e.z=ue._table[a])}catch(e){if(t.WTF)throw e}if(!t||!1!==t.cellText)try{"e"===e.t?e.w=e.w||Wr[e.v]:0===a||"General"==a?"n"===e.t?(0|e.v)===e.v?e.w=ue._general_int(e.v):e.w=ue._general_num(e.v):e.w=ue._general(e.v):e.w=ue.format(a,e.v,{date1904:!!r})}catch(e){if(t.WTF)throw e}t.cellDates&&a&&"n"==e.t&&ue.is_date(ue._table[a]||String(a))&&((n=ue.parse_date_code(e.v))&&(e.t="d",e.v=new Date(n.y,n.m-1,n.d,n.H,n.M,n.S,n.u)))}}function Oc(e,t,r){return{v:e,ixfe:t,t:r}}function Pc(e,t){var r={opts:{}},n={};null!=fe&&null==t.dense&&(t.dense=fe);function o(e){return!(e<8)&&e<64&&B[e-8]||Hr[e]}function a(e,t,r){if(!(1<P)&&(w=!(r.sheetRows&&e.r>=r.sheetRows)&&w)){var n,a,s;if(r.cellStyles&&t.XF&&t.XF.data&&(a=r,(s=(n=t).XF.data)&&s.patternType&&a&&a.cellStyles&&(n.s={},n.s.patternType=s.patternType,(a=qs(o(s.icvFore)))&&(n.s.fgColor={rgb:a}),(a=qs(o(s.icvBack)))&&(n.s.bgColor={rgb:a}))),delete t.ixfe,delete t.XF,v=Yt(l=e),d&&d.s&&d.e||(d={s:{r:0,c:0},e:{r:0,c:0}}),e.r<d.s.r&&(d.s.r=e.r),e.c<d.s.c&&(d.s.c=e.c),e.r+1>d.e.r&&(d.e.r=e.r+1),e.c+1>d.e.c&&(d.e.c=e.c+1),r.cellFormula&&t.f)for(var i=0;i<S.length;++i)if(!(S[i][0].s.c>e.c||S[i][0].s.r>e.r||S[i][0].e.c<e.c||S[i][0].e.r<e.r)){t.F=Jt(S[i][0]),S[i][0].s.c==e.c&&S[i][0].s.r==e.r||delete t.f,t.f&&(t.f=""+Uo(S[i][1],0,e,F,x));break}r.dense?(h[e.r]||(h[e.r]=[]),h[e.r][e.c]=t):h[v]=t}}var l,s,i,c,f,h=t.dense?[]:{},u={},d={},p=null,m=[],g="",b={},v="",E={},S=[],w=!0,C=[],B=[],T={Sheets:[],WBProps:{date1904:!1},Views:[{}]},k={},x={enc:!1,sbcch:0,snames:[],sharedf:E,arrayf:S,rrtabid:[],lastuser:"",biff:8,codepage:0,winlocked:0,cellStyles:!!t&&!!t.cellStyles,WTF:!!t&&!!t.wtf};t.password&&(x.password=t.password);var _=[],y=[],A=[],I=[],R=!1,F=[];F.SheetNames=x.snames,F.sharedf=x.sharedf,F.arrayf=x.arrayf,F.names=[],F.XTI=[];var D,O="",P=0,N=0,M=[],L=[];x.codepage=1200,ce(1200);for(var U=!1;e.l<e.length-1;){var H=e.l,W=e.read_shift(2);if(0===W&&"EOF"===O)break;var V=e.l===e.length?0:e.read_shift(2),X=Wc[W];if(X&&X.f){if(t.bookSheets&&"BoundSheet8"===O&&"BoundSheet8"!==X.n)break;if(O=X.n,2===X.r||12==X.r){var G=e.read_shift(2);if(V-=2,!x.enc&&G!==W&&((255&G)<<8|G>>8)!==W)throw new Error("rt mismatch: "+G+"!="+W);12==X.r&&(e.l+=10,V-=10)}var z,j,$,K,Y={},Y="EOF"===X.n?X.f(e,V,x):function(e,t,r,n){var a=r,s=[],i=t.slice(t.l,t.l+a);if(n&&n.enc&&n.enc.insitu)switch(e.n){case"BOF":case"FilePass":case"FileLock":case"InterfaceHdr":case"RRDInfo":case"RRDHead":case"UsrExcl":break;default:if(0===i.length)break;n.enc.insitu(i)}s.push(i),t.l+=a;for(var o=Wc[Bt(t,t.l)],l=0;null!=o&&"Continue"===o.n.slice(0,8);)a=Bt(t,t.l+2),l=t.l+4,"ContinueFrt"==o.n?l+=4:"ContinueFrt"==o.n.slice(0,11)&&(l+=12),s.push(t.slice(l,t.l+4+a)),t.l+=4+a,o=Wc[Bt(t,t.l)];var c=he(s);Ot(c,0);var f=0;c.lens=[];for(var h=0;h<s.length;++h)c.lens.push(f),f+=s[h].length;return e.f(c,c.length,n)}(X,e,V,x),Q=X.n;if(0!=P||"BOF"==Q)switch(Q){case"Date1904":r.opts.Date1904=T.WBProps.date1904=Y;break;case"WriteProtect":r.opts.WriteProtect=!0;break;case"FilePass":if(x.enc||(e.l=0),x.enc=Y,!t.password)throw new Error("File is password-protected");if(null==Y.valid)throw new Error("Encryption scheme unsupported");if(!Y.valid)throw new Error("Password is incorrect");break;case"WriteAccess":x.lastuser=Y;break;case"FileSharing":break;case"CodePage":var J=Number(Y);switch(J){case 21010:J=1200;break;case 32768:J=1e4;break;case 32769:J=1252}ce(x.codepage=J),U=!0;break;case"RRTabId":x.rrtabid=Y;break;case"WinProtect":x.winlocked=Y;break;case"Template":case"BookBool":case"UsesELFs":case"MTRSettings":break;case"RefreshAll":case"CalcCount":case"CalcDelta":case"CalcIter":case"CalcMode":case"CalcPrecision":case"CalcSaveRecalc":r.opts[Q]=Y;break;case"CalcRefMode":x.CalcRefMode=Y;break;case"Uncalced":break;case"ForceFullCalculation":r.opts.FullCalc=Y;break;case"WsBool":Y.fDialog&&(h["!type"]="dialog");break;case"XF":C.push(Y);break;case"ExtSST":case"BookExt":case"RichTextStream":case"BkHim":break;case"SupBook":F.push([Y]),F[F.length-1].XTI=[];break;case"ExternName":F[F.length-1].push(Y);break;case"Index":break;case"Lbl":D={Name:Y.Name,Ref:Uo(Y.rgce,0,null,F,x)},0<Y.itab&&(D.Sheet=Y.itab-1),F.names.push(D),F[0]||(F[0]=[],F[0].XTI=[]),F[F.length-1].push(Y),"_xlnm._FilterDatabase"==Y.Name&&0<Y.itab&&Y.rgce&&Y.rgce[0]&&Y.rgce[0][0]&&"PtgArea3d"==Y.rgce[0][0][0]&&(L[Y.itab-1]={ref:Jt(Y.rgce[0][0][1][2])});break;case"ExternCount":x.ExternCount=Y;break;case"ExternSheet":0==F.length&&(F[0]=[],F[0].XTI=[]),F[F.length-1].XTI=F[F.length-1].XTI.concat(Y),F.XTI=F.XTI.concat(Y);break;case"NameCmt":if(x.biff<8)break;null!=D&&(D.Comment=Y[1]);break;case"Protect":h["!protect"]=Y;break;case"Password":0!==Y&&x.WTF&&console.error("Password verifier: "+Y);break;case"Prot4Rev":case"Prot4RevPass":break;case"BoundSheet8":u[Y.pos]=Y,x.snames.push(Y.name);break;case"EOF":if(--P)break;d.e&&(0<d.e.r&&0<d.e.c&&(d.e.r--,d.e.c--,h["!ref"]=Jt(d),t.sheetRows&&t.sheetRows<=d.e.r&&(z=d.e.r,d.e.r=t.sheetRows-1,h["!fullref"]=h["!ref"],h["!ref"]=Jt(d),d.e.r=z),d.e.r++,d.e.c++),0<_.length&&(h["!merges"]=_),0<y.length&&(h["!objects"]=y),0<A.length&&(h["!cols"]=A),0<I.length&&(h["!rows"]=I),T.Sheets.push(k)),""===g?b=h:n[g]=h,h=t.dense?[]:{};break;case"BOF":if(8===x.biff&&(x.biff={9:2,521:3,1033:4}[W]||{512:2,768:3,1024:4,1280:5,1536:8,2:2,7:2}[Y.BIFFVer]||8),8==x.biff&&0==Y.BIFFVer&&16==Y.dt&&(x.biff=2),P++)break;var q,w=!0,h=t.dense?[]:{};x.biff<8&&!U&&(U=!0,ce(x.codepage=t.codepage||1252)),x.biff<5?(""===g&&(g="Sheet1"),d={s:{r:0,c:0},e:{r:0,c:0}},q={pos:e.l-V,name:g},u[q.pos]=q,x.snames.push(g)):g=(u[H]||{name:""}).name,32==Y.dt&&(h["!type"]="chart"),64==Y.dt&&(h["!type"]="macro"),_=[],y=[],x.arrayf=S=[],A=[],0,R=!(I=[]),k={Hidden:(u[H]||{hs:0}).hs,name:g};break;case"Number":case"BIFF2NUM":case"BIFF2INT":"chart"==h["!type"]&&(t.dense?(h[Y.r]||[])[Y.c]:h[Yt({c:Y.c,r:Y.r})])&&++Y.c,te={ixfe:Y.ixfe,XF:C[Y.ixfe]||{},v:Y.val,t:"n"},0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a({c:Y.c,r:Y.r},te,t);break;case"BoolErr":te={ixfe:Y.ixfe,XF:C[Y.ixfe],v:Y.val,t:Y.t},0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a({c:Y.c,r:Y.r},te,t);break;case"RK":te={ixfe:Y.ixfe,XF:C[Y.ixfe],v:Y.rknum,t:"n"},0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a({c:Y.c,r:Y.r},te,t);break;case"MulRk":for(var Z=Y.c;Z<=Y.C;++Z){var ee=Y.rkrec[Z-Y.c][0],te={ixfe:ee,XF:C[ee],v:Y.rkrec[Z-Y.c][1],t:"n"};0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a({c:Z,r:Y.r},te,t)}break;case"Formula":if("String"==Y.val){p=Y;break}(te=Oc(Y.val,Y.cell.ixfe,Y.tt)).XF=C[te.ixfe],t.cellFormula&&(!((q=Y.formula)&&q[0]&&q[0][0]&&"PtgExp"==q[0][0][0])||E[K=Yt({r:j=q[0][0][1][0],c:$=q[0][0][1][1]})]?te.f=""+Uo(Y.formula,0,Y.cell,F,x):te.F=((t.dense?(h[j]||[])[$]:h[K])||{}).F),0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a(Y.cell,te,t),p=Y;break;case"String":if(!p)throw new Error("String record expects Formula");(te=Oc(p.val=Y,p.cell.ixfe,"s")).XF=C[te.ixfe],t.cellFormula&&(te.f=""+Uo(p.formula,0,p.cell,F,x)),0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a(p.cell,te,t),p=null;break;case"Array":S.push(Y);var re=Yt(Y[0].s),ne=t.dense?(h[Y[0].s.r]||[])[Y[0].s.c]:h[re];if(t.cellFormula&&ne){if(!p)break;if(!re||!ne)break;ne.f=""+Uo(Y[1],0,Y[0],F,x),ne.F=Jt(Y[0])}break;case"ShrFmla":if(!w)break;if(!t.cellFormula)break;if(v){if(!p)break;E[Yt(p.cell)]=Y[0],((ne=t.dense?(h[p.cell.r]||[])[p.cell.c]:h[Yt(p.cell)])||{}).f=""+Uo(Y[0],0,l,F,x)}break;case"LabelSst":te=Oc(m[Y.isst].t,Y.ixfe,"s"),m[Y.isst].h&&(te.h=m[Y.isst].h),te.XF=C[te.ixfe],0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a({c:Y.c,r:Y.r},te,t);break;case"Blank":t.sheetStubs&&(te={ixfe:Y.ixfe,XF:C[Y.ixfe],t:"z"},0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a({c:Y.c,r:Y.r},te,t));break;case"MulBlank":if(t.sheetStubs)for(var ae=Y.c;ae<=Y.C;++ae){var se=Y.ixfe[ae-Y.c];te={ixfe:se,XF:C[se],t:"z"},0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a({c:ae,r:Y.r},te,t)}break;case"RString":case"Label":case"BIFF2STR":(te=Oc(Y.val,Y.ixfe,"s")).XF=C[te.ixfe],0<N&&(te.z=M[te.ixfe>>8&31]),Dc(te,t,r.opts.Date1904),a({c:Y.c,r:Y.r},te,t);break;case"Dimensions":1===P&&(d=Y);break;case"SST":m=Y;break;case"Format":if(4==x.biff){M[N++]=Y[1];for(var ie=0;ie<N+163&&ue._table[ie]!=Y[1];++ie);163<=ie&&ue.load(Y[1],N+163)}else ue.load(Y[1],Y[0]);break;case"BIFF2FORMAT":M[N++]=Y;for(var oe=0;oe<N+163&&ue._table[oe]!=Y;++oe);163<=oe&&ue.load(Y,N+163);break;case"MergeCells":_=_.concat(Y);break;case"Obj":y[Y.cmo[0]]=x.lastobj=Y;break;case"TxO":x.lastobj.TxO=Y;break;case"ImData":x.lastobj.ImData=Y;break;case"HLink":for(i=Y[0].s.r;i<=Y[0].e.r;++i)for(s=Y[0].s.c;s<=Y[0].e.c;++s)(ne=t.dense?(h[i]||[])[s]:h[Yt({c:s,r:i})])&&(ne.l=Y[1]);break;case"HLinkTooltip":for(i=Y[0].s.r;i<=Y[0].e.r;++i)for(s=Y[0].s.c;s<=Y[0].e.c;++s)(ne=t.dense?(h[i]||[])[s]:h[Yt({c:s,r:i})])&&ne.l&&(ne.l.Tooltip=Y[1]);break;case"Note":if(x.biff<=5&&2<=x.biff)break;ne=t.dense?(h[Y[0].r]||[])[Y[0].c]:h[Yt(Y[0])];var re=y[Y[2]];ne||(ne=t.dense?(h[Y[0].r]||(h[Y[0].r]=[]),h[Y[0].r][Y[0].c]={t:"z"}):h[Yt(Y[0])]={t:"z"},d.e.r=Math.max(d.e.r,Y[0].r),d.s.r=Math.min(d.s.r,Y[0].r),d.e.c=Math.max(d.e.c,Y[0].c),d.s.c=Math.min(d.s.c,Y[0].c)),ne.c||(ne.c=[]),re={a:Y[1],t:re.TxO.t},ne.c.push(re);break;default:switch(X.n){case"ClrtClient":break;case"XFExt":C[Y.ixfe],Y.ext.forEach(function(e){e[0]});break;case"DefColWidth":0;break;case"DefaultRowHeight":Y[1];break;case"ColInfo":if(!x.cellStyles)break;for(;Y.e>=Y.s;)A[Y.e--]={width:Y.w/256},R||(R=!0,li(Y.w/256)),ci(A[Y.e+1]);break;case"Row":var le={};null!=Y.level&&((I[Y.r]=le).level=Y.level),Y.hidden&&((I[Y.r]=le).hidden=!0),Y.hpt&&((I[Y.r]=le).hpt=Y.hpt,le.hpx=ui(Y.hpt));break;case"LeftMargin":case"RightMargin":case"TopMargin":case"BottomMargin":h["!margins"]||al(h["!margins"]={}),h["!margins"][Q.slice(0,-6).toLowerCase()]=Y;break;case"Setup":h["!margins"]||al(h["!margins"]={}),h["!margins"].header=Y.header,h["!margins"].footer=Y.footer;break;case"Window2":Y.RTL&&(T.Views[0].RTL=!0);break;case"Header":case"Footer":case"HCenter":case"VCenter":case"Pls":case"GCW":case"LHRecord":case"DBCell":case"EntExU2":case"SxView":case"Sxvd":case"SXVI":case"SXVDEx":case"SxIvd":case"SXString":case"Sync":case"Addin":case"SXDI":case"SXLI":case"SXEx":case"QsiSXTag":case"Selection":case"Feat":break;case"FeatHdr":case"FeatHdr11":break;case"Feature11":case"Feature12":case"List12":break;case"Country":c=Y;break;case"RecalcId":case"DxGCol":break;case"Fbi":case"Fbi2":case"GelFrame":case"Font":case"XFCRC":case"Style":case"StyleExt":break;case"Palette":B=Y;break;case"Theme":f=Y;break;case"ScenarioProtect":case"ObjProtect":case"CondFmt12":case"Table":case"TableStyles":case"TableStyle":case"TableStyleElement":case"SXStreamID":case"SXVS":case"DConRef":case"SXAddl":case"DConBin":case"DConName":case"SXPI":case"SxFormat":case"SxSelect":case"SxRule":case"SxFilt":case"SxItm":case"SxDXF":case"ScenMan":case"DCon":case"CellWatch":case"PrintRowCol":case"PrintGrid":case"PrintSize":case"XCT":case"CRN":case"Scl":case"SheetExt":case"SheetExtOptional":case"ObNoMacros":case"ObProj":break;case"CodeName":g?k.CodeName=Y||k.name:T.WBProps.CodeName=Y||"ThisWorkbook";break;case"GUIDTypeLib":case"WOpt":case"PhoneticInfo":case"OleObjectSize":break;case"DXF":case"DXFN":case"DXFN12":case"DXFN12List":case"DXFN12NoCB":break;case"Dv":case"DVal":break;case"BRAI":case"Series":case"SeriesText":case"DConn":case"DbOrParamQry":case"DBQueryExt":case"OleDbConn":case"ExtString":case"IFmtRecord":break;case"CondFmt":case"CF":case"CF12":case"CFEx":case"Excel9File":case"Units":break;case"InterfaceHdr":case"Mms":case"InterfaceEnd":case"DSF":case"BuiltInFnGroupCount":break;case"Window1":case"HideObj":case"GridSet":case"Guts":case"UserBView":case"UserSViewBegin":case"UserSViewEnd":case"Pane":break;default:switch(X.n){case"Dat":case"Begin":case"End":case"StartBlock":case"EndBlock":case"Frame":case"Area":case"Axis":case"AxisLine":case"Tick":break;case"AxesUsed":case"CrtLayout12":case"CrtLayout12A":case"CrtLink":case"CrtLine":case"CrtMlFrt":case"CrtMlFrtContinue":break;case"LineFormat":case"AreaFormat":case"Chart":case"Chart3d":case"Chart3DBarShape":case"ChartFormat":case"ChartFrtInfo":break;case"PlotArea":case"PlotGrowth":break;case"SeriesList":case"SerParent":case"SerAuxTrend":break;case"DataFormat":case"SerToCrt":case"FontX":break;case"CatSerRange":case"AxcExt":case"SerFmt":case"ShtProps":break;case"DefaultText":case"Text":case"CatLab":case"DataLabExtContents":break;case"Legend":case"LegendException":break;case"Pie":case"Scatter":break;case"PieFormat":case"MarkerFormat":break;case"StartObject":case"EndObject":break;case"AlRuns":case"ObjectLink":case"SIIndex":break;case"AttachedLabel":case"YMult":break;case"Line":case"Bar":case"Surf":case"AxisParent":case"Pos":case"ValueRange":case"SXViewEx9":case"SXViewLink":case"PivotChartBits":case"SBaseRef":case"TextPropsStream":case"LnExt":case"MkrExt":case"CrtCoopt":break;case"Qsi":case"Qsif":case"Qsir":case"QsiSXTag":case"TxtQry":case"FilterMode":break;case"AutoFilter":case"AutoFilterInfo":case"AutoFilter12":case"DropDownObjIds":case"Sort":case"SortData":case"ShapePropsStream":break;case"MsoDrawing":case"MsoDrawingGroup":case"MsoDrawingSelection":break;case"WebPub":case"AutoWebPub":break;case"HeaderFooter":case"HFPicture":case"PLV":case"HorizontalPageBreaks":case"VerticalPageBreaks":break;case"Backup":case"CompressPictures":case"Compat12":break;case"Continue":case"ContinueFrt12":break;case"FrtFontList":case"FrtWrapper":break;default:switch(X.n){case"TabIdConf":case"Radar":case"RadarArea":case"DropBar":case"Intl":case"CoordList":case"SerAuxErrBar":break;case"BIFF2FONTCLR":case"BIFF2FMTCNT":case"BIFF2FONTXTRA":break;case"BIFF2XF":case"BIFF3XF":case"BIFF4XF":break;case"BIFF4FMTCNT":case"BIFF2ROW":case"BIFF2WINDOW2":break;case"SCENARIO":case"DConBin":case"PicF":case"DataLabExt":case"Lel":case"BopPop":case"BopPopCustom":case"RealTimeData":case"Name":break;case"LHNGraph":case"FnGroupName":case"AddMenu":case"LPr":break;case"ListObj":case"ListField":case"RRSort":case"BigName":break;case"ToolbarHdr":case"ToolbarEnd":case"DDEObjName":case"FRTArchId$":break;default:if(t.WTF)throw"Unrecognized Record "+X.n}}}}}else e.l+=V}return r.SheetNames=de(u).sort(function(e,t){return Number(e)-Number(t)}).map(function(e){return u[e].name}),t.bookSheets||(r.Sheets=n),r.Sheets&&L.forEach(function(e,t){r.Sheets[r.SheetNames[t]]["!autofilter"]=e}),r.Preamble=b,r.Strings=m,r.SSF=ue.get_table(),x.enc&&(r.Encryption=x.enc),f&&(r.Themes=f),r.Metadata={},void 0!==c&&(r.Metadata.Country=c),0<F.names.length&&(T.Names=F.names),r.Workbook=T,r}var Nc={SI:"e0859ff2f94f6810ab9108002b27b3d9",DSI:"02d5cdd59c2e1b10939708002b2cf9ae",UDI:"05d5cdd59c2e1b10939708002b2cf9ae"};function Mc(e,t){var r,n,a,s,i;if(Rf(t=t||{}),h(),t.codepage&&l(t.codepage),e.FullPaths){if(oe.find(e,"/encryption"))throw new Error("File is password-protected");r=oe.find(e,"!CompObj"),a=oe.find(e,"/Workbook")||oe.find(e,"/Book")}else{switch(t.type){case"base64":e=Z(Y.decode(e));break;case"binary":e=Z(e);break;case"buffer":break;case"array":Array.isArray(e)||(e=Array.prototype.slice.call(e))}Ot(e,0),a={content:e}}if(r&&Fc(r),t.bookProps&&!t.bookSheets)n={};else{var o=Q?"buffer":"array";if(a&&a.content)n=Pc(a.content,t);else if((a=oe.find(e,"PerfectOffice_MAIN"))&&a.content)n=ls.to_workbook(a.content,(t.type=o,t));else{if(!(a=oe.find(e,"NativeContent_MAIN"))||!a.content)throw new Error("Cannot find Workbook stream");n=ls.to_workbook(a.content,(t.type=o,t))}t.bookVBA&&e.FullPaths&&oe.find(e,"/_VBA_PROJECT_CUR/VBA/dir")&&(n.vbaraw=(s=e,i=oe.utils.cfb_new({root:"R"}),s.FullPaths.forEach(function(e,t){"/"!==e.slice(-1)&&e.match(/_VBA_PROJECT_CUR/)&&(e=e.replace(/^[^\/]*/,"R").replace(/\/_VBA_PROJECT_CUR\u0000*/,""),oe.utils.cfb_add(i,e,s.FileIndex[t].content))}),oe.write(i)))}o={};return e.FullPaths&&function(e,t,r){var n=oe.find(e,"!DocumentSummaryInformation");if(n&&0<n.size)try{var a,s=Pn(n,Fr,Nc.DSI);for(a in s)t[a]=s[a]}catch(e){if(r.WTF)throw e}var i=oe.find(e,"!SummaryInformation");if(i&&0<i.size)try{var o,l=Pn(i,Dr,Nc.SI);for(o in l)null==t[o]&&(t[o]=l[o])}catch(e){if(r.WTF)throw e}t.HeadingPairs&&t.TitlesOfParts&&(pn(t.HeadingPairs,t.TitlesOfParts,t,r),delete t.HeadingPairs,delete t.TitlesOfParts)}(e,o,t),n.Props=n.Custprops=o,t.bookFiles&&(n.cfb=e),n}function Lc(e,t){var r,n,a=t||{},t=oe.utils.cfb_new({root:"R"}),s="/Workbook";switch(a.bookType||"xls"){case"xls":a.bookType="biff8";case"xla":a.bookType||(a.bookType="xla");case"biff8":s="/Workbook",a.biff=8;break;case"biff5":s="/Book",a.biff=5;break;default:throw new Error("invalid type "+a.bookType+" for XLS CFB")}return oe.utils.cfb_add(t,s,Zc(e,a)),8==a.biff&&(e.Props||e.Custprops)&&function(e,t){var r,n=[],a=[],s=[],i=0;if(e.Props)for(r=de(e.Props),i=0;i<r.length;++i)(Object.prototype.hasOwnProperty.call(Pr,r[i])?n:Object.prototype.hasOwnProperty.call(Nr,r[i])?a:s).push([r[i],e.Props[r[i]]]);if(e.Custprops)for(r=de(e.Custprops),i=0;i<r.length;++i)Object.prototype.hasOwnProperty.call(e.Props||{},r[i])||(Object.prototype.hasOwnProperty.call(Pr,r[i])?n:Object.prototype.hasOwnProperty.call(Nr,r[i])?a:s).push([r[i],e.Custprops[r[i]]]);for(var o=[],i=0;i<s.length;++i)-1<Dn.indexOf(s[i][0])||null!=s[i][1]&&o.push(s[i]);a.length&&oe.utils.cfb_add(t,"/SummaryInformation",Nn(a,Nc.SI,Nr,Dr)),(n.length||o.length)&&oe.utils.cfb_add(t,"/DocumentSummaryInformation",Nn(n,Nc.DSI,Pr,Fr,o.length?o:null,Nc.UDI))}(e,t),8==a.biff&&e.vbaraw&&(r=t,(n=oe.read(e.vbaraw,{type:"string"==typeof e.vbaraw?"binary":"buffer"})).FullPaths.forEach(function(e,t){0==t||"/"!==(e=e.replace(/[^\/]*[\/]/,"/_VBA_PROJECT_CUR/")).slice(-1)&&oe.utils.cfb_add(r,e,n.FileIndex[t].content)})),t}var Uc={0:{n:"BrtRowHdr",f:function(e,t){var r={},n=e.l+t;r.r=e.read_shift(4),e.l+=4;var a=e.read_shift(2);return e.l+=1,t=e.read_shift(1),e.l=n,7&t&&(r.level=7&t),16&t&&(r.hidden=!0),32&t&&(r.hpt=a/20),r}},1:{n:"BrtCellBlank",f:function(e){return[fr(e)]}},2:{n:"BrtCellRk",f:function(e){return[fr(e),Er(e),"n"]}},3:{n:"BrtCellError",f:function(e){return[fr(e),e.read_shift(1),"e"]}},4:{n:"BrtCellBool",f:function(e){return[fr(e),e.read_shift(1),"b"]}},5:{n:"BrtCellReal",f:function(e){return[fr(e),Br(e),"n"]}},6:{n:"BrtCellSt",f:function(e){return[fr(e),sr(e),"str"]}},7:{n:"BrtCellIsst",f:function(e){return[fr(e),e.read_shift(4),"s"]}},8:{n:"BrtFmlaString",f:function(e,t,r){var n=e.l+t,a=fr(e);a.r=r["!row"];var s=[a,sr(e),"str"];return r.cellFormula?(e.l+=2,t=Go(e,n-e.l,r),s[3]=Uo(t,0,a,r.supbooks,r)):e.l=n,s}},9:{n:"BrtFmlaNum",f:function(e,t,r){var n=e.l+t,a=fr(e);a.r=r["!row"];var s=[a,Br(e),"n"];return r.cellFormula?(e.l+=2,t=Go(e,n-e.l,r),s[3]=Uo(t,0,a,r.supbooks,r)):e.l=n,s}},10:{n:"BrtFmlaBool",f:function(e,t,r){var n=e.l+t,a=fr(e);a.r=r["!row"];var s=[a,e.read_shift(1),"b"];return r.cellFormula?(e.l+=2,t=Go(e,n-e.l,r),s[3]=Uo(t,0,a,r.supbooks,r)):e.l=n,s}},11:{n:"BrtFmlaError",f:function(e,t,r){var n=e.l+t,a=fr(e);a.r=r["!row"];var s=[a,e.read_shift(1),"e"];return r.cellFormula?(e.l+=2,t=Go(e,n-e.l,r),s[3]=Uo(t,0,a,r.supbooks,r)):e.l=n,s}},16:{n:"BrtFRTArchID$",f:function(e,t){var r={};return e.read_shift(4),r.ArchID=e.read_shift(4),e.l+=t-8,r}},19:{n:"BrtSSTItem",f:or},20:{n:"BrtPCDIMissing"},21:{n:"BrtPCDINumber"},22:{n:"BrtPCDIBoolean"},23:{n:"BrtPCDIError"},24:{n:"BrtPCDIString"},25:{n:"BrtPCDIDatetime"},26:{n:"BrtPCDIIndex"},27:{n:"BrtPCDIAMissing"},28:{n:"BrtPCDIANumber"},29:{n:"BrtPCDIABoolean"},30:{n:"BrtPCDIAError"},31:{n:"BrtPCDIAString"},32:{n:"BrtPCDIADatetime"},33:{n:"BrtPCRRecord"},34:{n:"BrtPCRRecordDt"},35:{n:"BrtFRTBegin"},36:{n:"BrtFRTEnd"},37:{n:"BrtACBegin"},38:{n:"BrtACEnd"},39:{n:"BrtName",f:function(e,t,r){var n=e.l+t;e.l+=4,e.l+=1;var a=e.read_shift(4),s=gr(e),t=zo(e,0,r),r=pr(e);return e.l=n,t={Name:s,Ptg:t},a<268435455&&(t.Sheet=a),r&&(t.Comment=r),t}},40:{n:"BrtIndexRowBlock"},42:{n:"BrtIndexBlock"},43:{n:"BrtFont",f:function(e,t,r){var n={};n.sz=e.read_shift(2)/20;var a,s=(s=(a=e).read_shift(1),a.l++,{fBold:1&s,fItalic:2&s,fUnderline:4&s,fStrikeout:8&s,fOutline:16&s,fShadow:32&s,fCondense:64&s,fExtend:128&s});switch(s.fItalic&&(n.italic=1),s.fCondense&&(n.condense=1),s.fExtend&&(n.extend=1),s.fShadow&&(n.shadow=1),s.fOutline&&(n.outline=1),s.fStrikeout&&(n.strike=1),700===e.read_shift(2)&&(n.bold=1),e.read_shift(2)){case 1:n.vertAlign="superscript";break;case 2:n.vertAlign="subscript"}switch(0!=(s=e.read_shift(1))&&(n.underline=s),0<(s=e.read_shift(1))&&(n.family=s),0<(s=e.read_shift(1))&&(n.charset=s),e.l++,n.color=function(e){var t={},r=e.read_shift(1)>>>1,n=e.read_shift(1),a=e.read_shift(2,"i"),s=e.read_shift(1),i=e.read_shift(1),o=e.read_shift(1);switch(e.l++,r){case 0:t.auto=1;break;case 1:t.index=n;var l=Hr[n];l&&(t.rgb=qs(l));break;case 2:t.rgb=qs([s,i,o]);break;case 3:t.theme=n}return 0!=a&&(t.tint=0<a?a/32767:a/32768),t}(e),e.read_shift(1)){case 1:n.scheme="major";break;case 2:n.scheme="minor"}return n.name=sr(e),n}},44:{n:"BrtFmt",f:function(e,t){return[e.read_shift(2),sr(e)]}},45:{n:"BrtFill",f:_i},46:{n:"BrtBorder",f:Ri},47:{n:"BrtXF",f:function(e,t){var r=e.l+t,n=e.read_shift(2),t=e.read_shift(2);return e.l=r,{ixfe:n,numFmtId:t}}},48:{n:"BrtStyle"},49:{n:"BrtCellMeta"},50:{n:"BrtValueMeta"},51:{n:"BrtMdb"},52:{n:"BrtBeginFmd"},53:{n:"BrtEndFmd"},54:{n:"BrtBeginMdx"},55:{n:"BrtEndMdx"},56:{n:"BrtBeginMdxTuple"},57:{n:"BrtEndMdxTuple"},58:{n:"BrtMdxMbrIstr"},59:{n:"BrtStr"},60:{n:"BrtColInfo",f:ka},62:{n:"BrtCellRString"},63:{n:"BrtCalcChainItem$",f:function(e){var t={};t.i=e.read_shift(4);var r={};return r.r=e.read_shift(4),r.c=e.read_shift(4),t.r=Yt(r),2&(e=e.read_shift(1))&&(t.l="1"),8&e&&(t.a="1"),t}},64:{n:"BrtDVal",f:function(){}},65:{n:"BrtSxvcellNum"},66:{n:"BrtSxvcellStr"},67:{n:"BrtSxvcellBool"},68:{n:"BrtSxvcellErr"},69:{n:"BrtSxvcellDate"},70:{n:"BrtSxvcellNil"},128:{n:"BrtFileVersion"},129:{n:"BrtBeginSheet"},130:{n:"BrtEndSheet"},131:{n:"BrtBeginBook",f:Pt,p:0},132:{n:"BrtEndBook"},133:{n:"BrtBeginWsViews"},134:{n:"BrtEndWsViews"},135:{n:"BrtBeginBookViews"},136:{n:"BrtEndBookViews"},137:{n:"BrtBeginWsView",f:function(e){var t=e.read_shift(2);return e.l+=28,{RTL:32&t}}},138:{n:"BrtEndWsView"},139:{n:"BrtBeginCsViews"},140:{n:"BrtEndCsViews"},141:{n:"BrtBeginCsView"},142:{n:"BrtEndCsView"},143:{n:"BrtBeginBundleShs"},144:{n:"BrtEndBundleShs"},145:{n:"BrtBeginSheetData"},146:{n:"BrtEndSheetData"},147:{n:"BrtWsProp",f:function(e,t){var r={};return e.l+=19,r.name=ur(e,t-19),r}},148:{n:"BrtWsDim",f:Co,p:16},151:{n:"BrtPane",f:function(){}},152:{n:"BrtSel"},153:{n:"BrtWbProp",f:function(e,t){var r={},n=e.read_shift(4);return r.defaultThemeVersion=e.read_shift(4),0<(e=8<t?sr(e):"").length&&(r.CodeName=e),r.autoCompressPictures=!!(65536&n),r.backupFile=!!(64&n),r.checkCompatibility=!!(4096&n),r.date1904=!!(1&n),r.filterPrivacy=!!(8&n),r.hidePivotFieldList=!!(1024&n),r.promptedSolutions=!!(16&n),r.publishItems=!!(2048&n),r.refreshAllConnections=!!(262144&n),r.saveExternalLinkValues=!!(128&n),r.showBorderUnselectedTables=!!(4&n),r.showInkAnnotation=!!(32&n),r.showObjects=["all","placeholders","none"][n>>13&3],r.showPivotChartFilter=!!(32768&n),r.updateLinks=["userSet","never","always"][n>>8&3],r}},154:{n:"BrtWbFactoid"},155:{n:"BrtFileRecover"},156:{n:"BrtBundleSh",f:function(e,t){var r={};return r.Hidden=e.read_shift(4),r.iTabID=e.read_shift(4),r.strRelID=br(e,t-8),r.name=sr(e),r}},157:{n:"BrtCalcProp"},158:{n:"BrtBookView"},159:{n:"BrtBeginSst",f:function(e){return[e.read_shift(4),e.read_shift(4)]}},160:{n:"BrtEndSst"},161:{n:"BrtBeginAFilter",f:wr},162:{n:"BrtEndAFilter"},163:{n:"BrtBeginFilterColumn"},164:{n:"BrtEndFilterColumn"},165:{n:"BrtBeginFilters"},166:{n:"BrtEndFilters"},167:{n:"BrtFilter"},168:{n:"BrtColorFilter"},169:{n:"BrtIconFilter"},170:{n:"BrtTop10Filter"},171:{n:"BrtDynamicFilter"},172:{n:"BrtBeginCustomFilters"},173:{n:"BrtEndCustomFilters"},174:{n:"BrtCustomFilter"},175:{n:"BrtAFilterDateGroupItem"},176:{n:"BrtMergeCell",f:k},177:{n:"BrtBeginMergeCells"},178:{n:"BrtEndMergeCells"},179:{n:"BrtBeginPivotCacheDef"},180:{n:"BrtEndPivotCacheDef"},181:{n:"BrtBeginPCDFields"},182:{n:"BrtEndPCDFields"},183:{n:"BrtBeginPCDField"},184:{n:"BrtEndPCDField"},185:{n:"BrtBeginPCDSource"},186:{n:"BrtEndPCDSource"},187:{n:"BrtBeginPCDSRange"},188:{n:"BrtEndPCDSRange"},189:{n:"BrtBeginPCDFAtbl"},190:{n:"BrtEndPCDFAtbl"},191:{n:"BrtBeginPCDIRun"},192:{n:"BrtEndPCDIRun"},193:{n:"BrtBeginPivotCacheRecords"},194:{n:"BrtEndPivotCacheRecords"},195:{n:"BrtBeginPCDHierarchies"},196:{n:"BrtEndPCDHierarchies"},197:{n:"BrtBeginPCDHierarchy"},198:{n:"BrtEndPCDHierarchy"},199:{n:"BrtBeginPCDHFieldsUsage"},200:{n:"BrtEndPCDHFieldsUsage"},201:{n:"BrtBeginExtConnection"},202:{n:"BrtEndExtConnection"},203:{n:"BrtBeginECDbProps"},204:{n:"BrtEndECDbProps"},205:{n:"BrtBeginECOlapProps"},206:{n:"BrtEndECOlapProps"},207:{n:"BrtBeginPCDSConsol"},208:{n:"BrtEndPCDSConsol"},209:{n:"BrtBeginPCDSCPages"},210:{n:"BrtEndPCDSCPages"},211:{n:"BrtBeginPCDSCPage"},212:{n:"BrtEndPCDSCPage"},213:{n:"BrtBeginPCDSCPItem"},214:{n:"BrtEndPCDSCPItem"},215:{n:"BrtBeginPCDSCSets"},216:{n:"BrtEndPCDSCSets"},217:{n:"BrtBeginPCDSCSet"},218:{n:"BrtEndPCDSCSet"},219:{n:"BrtBeginPCDFGroup"},220:{n:"BrtEndPCDFGroup"},221:{n:"BrtBeginPCDFGItems"},222:{n:"BrtEndPCDFGItems"},223:{n:"BrtBeginPCDFGRange"},224:{n:"BrtEndPCDFGRange"},225:{n:"BrtBeginPCDFGDiscrete"},226:{n:"BrtEndPCDFGDiscrete"},227:{n:"BrtBeginPCDSDTupleCache"},228:{n:"BrtEndPCDSDTupleCache"},229:{n:"BrtBeginPCDSDTCEntries"},230:{n:"BrtEndPCDSDTCEntries"},231:{n:"BrtBeginPCDSDTCEMembers"},232:{n:"BrtEndPCDSDTCEMembers"},233:{n:"BrtBeginPCDSDTCEMember"},234:{n:"BrtEndPCDSDTCEMember"},235:{n:"BrtBeginPCDSDTCQueries"},236:{n:"BrtEndPCDSDTCQueries"},237:{n:"BrtBeginPCDSDTCQuery"},238:{n:"BrtEndPCDSDTCQuery"},239:{n:"BrtBeginPCDSDTCSets"},240:{n:"BrtEndPCDSDTCSets"},241:{n:"BrtBeginPCDSDTCSet"},242:{n:"BrtEndPCDSDTCSet"},243:{n:"BrtBeginPCDCalcItems"},244:{n:"BrtEndPCDCalcItems"},245:{n:"BrtBeginPCDCalcItem"},246:{n:"BrtEndPCDCalcItem"},247:{n:"BrtBeginPRule"},248:{n:"BrtEndPRule"},249:{n:"BrtBeginPRFilters"},250:{n:"BrtEndPRFilters"},251:{n:"BrtBeginPRFilter"},252:{n:"BrtEndPRFilter"},253:{n:"BrtBeginPNames"},254:{n:"BrtEndPNames"},255:{n:"BrtBeginPName"},256:{n:"BrtEndPName"},257:{n:"BrtBeginPNPairs"},258:{n:"BrtEndPNPairs"},259:{n:"BrtBeginPNPair"},260:{n:"BrtEndPNPair"},261:{n:"BrtBeginECWebProps"},262:{n:"BrtEndECWebProps"},263:{n:"BrtBeginEcWpTables"},264:{n:"BrtEndECWPTables"},265:{n:"BrtBeginECParams"},266:{n:"BrtEndECParams"},267:{n:"BrtBeginECParam"},268:{n:"BrtEndECParam"},269:{n:"BrtBeginPCDKPIs"},270:{n:"BrtEndPCDKPIs"},271:{n:"BrtBeginPCDKPI"},272:{n:"BrtEndPCDKPI"},273:{n:"BrtBeginDims"},274:{n:"BrtEndDims"},275:{n:"BrtBeginDim"},276:{n:"BrtEndDim"},277:{n:"BrtIndexPartEnd"},278:{n:"BrtBeginStyleSheet"},279:{n:"BrtEndStyleSheet"},280:{n:"BrtBeginSXView"},281:{n:"BrtEndSXVI"},282:{n:"BrtBeginSXVI"},283:{n:"BrtBeginSXVIs"},284:{n:"BrtEndSXVIs"},285:{n:"BrtBeginSXVD"},286:{n:"BrtEndSXVD"},287:{n:"BrtBeginSXVDs"},288:{n:"BrtEndSXVDs"},289:{n:"BrtBeginSXPI"},290:{n:"BrtEndSXPI"},291:{n:"BrtBeginSXPIs"},292:{n:"BrtEndSXPIs"},293:{n:"BrtBeginSXDI"},294:{n:"BrtEndSXDI"},295:{n:"BrtBeginSXDIs"},296:{n:"BrtEndSXDIs"},297:{n:"BrtBeginSXLI"},298:{n:"BrtEndSXLI"},299:{n:"BrtBeginSXLIRws"},300:{n:"BrtEndSXLIRws"},301:{n:"BrtBeginSXLICols"},302:{n:"BrtEndSXLICols"},303:{n:"BrtBeginSXFormat"},304:{n:"BrtEndSXFormat"},305:{n:"BrtBeginSXFormats"},306:{n:"BrtEndSxFormats"},307:{n:"BrtBeginSxSelect"},308:{n:"BrtEndSxSelect"},309:{n:"BrtBeginISXVDRws"},310:{n:"BrtEndISXVDRws"},311:{n:"BrtBeginISXVDCols"},312:{n:"BrtEndISXVDCols"},313:{n:"BrtEndSXLocation"},314:{n:"BrtBeginSXLocation"},315:{n:"BrtEndSXView"},316:{n:"BrtBeginSXTHs"},317:{n:"BrtEndSXTHs"},318:{n:"BrtBeginSXTH"},319:{n:"BrtEndSXTH"},320:{n:"BrtBeginISXTHRws"},321:{n:"BrtEndISXTHRws"},322:{n:"BrtBeginISXTHCols"},323:{n:"BrtEndISXTHCols"},324:{n:"BrtBeginSXTDMPS"},325:{n:"BrtEndSXTDMPs"},326:{n:"BrtBeginSXTDMP"},327:{n:"BrtEndSXTDMP"},328:{n:"BrtBeginSXTHItems"},329:{n:"BrtEndSXTHItems"},330:{n:"BrtBeginSXTHItem"},331:{n:"BrtEndSXTHItem"},332:{n:"BrtBeginMetadata"},333:{n:"BrtEndMetadata"},334:{n:"BrtBeginEsmdtinfo"},335:{n:"BrtMdtinfo"},336:{n:"BrtEndEsmdtinfo"},337:{n:"BrtBeginEsmdb"},338:{n:"BrtEndEsmdb"},339:{n:"BrtBeginEsfmd"},340:{n:"BrtEndEsfmd"},341:{n:"BrtBeginSingleCells"},342:{n:"BrtEndSingleCells"},343:{n:"BrtBeginList"},344:{n:"BrtEndList"},345:{n:"BrtBeginListCols"},346:{n:"BrtEndListCols"},347:{n:"BrtBeginListCol"},348:{n:"BrtEndListCol"},349:{n:"BrtBeginListXmlCPr"},350:{n:"BrtEndListXmlCPr"},351:{n:"BrtListCCFmla"},352:{n:"BrtListTrFmla"},353:{n:"BrtBeginExternals"},354:{n:"BrtEndExternals"},355:{n:"BrtSupBookSrc",f:br},357:{n:"BrtSupSelf"},358:{n:"BrtSupSame"},359:{n:"BrtSupTabs"},360:{n:"BrtBeginSupBook"},361:{n:"BrtPlaceholderName"},362:{n:"BrtExternSheet",f:wa},363:{n:"BrtExternTableStart"},364:{n:"BrtExternTableEnd"},366:{n:"BrtExternRowHdr"},367:{n:"BrtExternCellBlank"},368:{n:"BrtExternCellReal"},369:{n:"BrtExternCellBool"},370:{n:"BrtExternCellError"},371:{n:"BrtExternCellString"},372:{n:"BrtBeginEsmdx"},373:{n:"BrtEndEsmdx"},374:{n:"BrtBeginMdxSet"},375:{n:"BrtEndMdxSet"},376:{n:"BrtBeginMdxMbrProp"},377:{n:"BrtEndMdxMbrProp"},378:{n:"BrtBeginMdxKPI"},379:{n:"BrtEndMdxKPI"},380:{n:"BrtBeginEsstr"},381:{n:"BrtEndEsstr"},382:{n:"BrtBeginPRFItem"},383:{n:"BrtEndPRFItem"},384:{n:"BrtBeginPivotCacheIDs"},385:{n:"BrtEndPivotCacheIDs"},386:{n:"BrtBeginPivotCacheID"},387:{n:"BrtEndPivotCacheID"},388:{n:"BrtBeginISXVIs"},389:{n:"BrtEndISXVIs"},390:{n:"BrtBeginColInfos"},391:{n:"BrtEndColInfos"},392:{n:"BrtBeginRwBrk"},393:{n:"BrtEndRwBrk"},394:{n:"BrtBeginColBrk"},395:{n:"BrtEndColBrk"},396:{n:"BrtBrk"},397:{n:"BrtUserBookView"},398:{n:"BrtInfo"},399:{n:"BrtCUsr"},400:{n:"BrtUsr"},401:{n:"BrtBeginUsers"},403:{n:"BrtEOF"},404:{n:"BrtUCR"},405:{n:"BrtRRInsDel"},406:{n:"BrtRREndInsDel"},407:{n:"BrtRRMove"},408:{n:"BrtRREndMove"},409:{n:"BrtRRChgCell"},410:{n:"BrtRREndChgCell"},411:{n:"BrtRRHeader"},412:{n:"BrtRRUserView"},413:{n:"BrtRRRenSheet"},414:{n:"BrtRRInsertSh"},415:{n:"BrtRRDefName"},416:{n:"BrtRRNote"},417:{n:"BrtRRConflict"},418:{n:"BrtRRTQSIF"},419:{n:"BrtRRFormat"},420:{n:"BrtRREndFormat"},421:{n:"BrtRRAutoFmt"},422:{n:"BrtBeginUserShViews"},423:{n:"BrtBeginUserShView"},424:{n:"BrtEndUserShView"},425:{n:"BrtEndUserShViews"},426:{n:"BrtArrFmla",f:function(e,t,r){var n=e.l+t,a=Sr(e),t=e.read_shift(1);return(a=[a])[2]=t,r.cellFormula?(r=Xo(e,n-e.l,r),a[1]=r):e.l=n,a}},427:{n:"BrtShrFmla",f:function(e,t,r){var n=e.l+t,t=[wr(e,16)];return r.cellFormula&&(r=jo(e,n-e.l,r),t[1]=r),e.l=n,t}},428:{n:"BrtTable"},429:{n:"BrtBeginExtConnections"},430:{n:"BrtEndExtConnections"},431:{n:"BrtBeginPCDCalcMems"},432:{n:"BrtEndPCDCalcMems"},433:{n:"BrtBeginPCDCalcMem"},434:{n:"BrtEndPCDCalcMem"},435:{n:"BrtBeginPCDHGLevels"},436:{n:"BrtEndPCDHGLevels"},437:{n:"BrtBeginPCDHGLevel"},438:{n:"BrtEndPCDHGLevel"},439:{n:"BrtBeginPCDHGLGroups"},440:{n:"BrtEndPCDHGLGroups"},441:{n:"BrtBeginPCDHGLGroup"},442:{n:"BrtEndPCDHGLGroup"},443:{n:"BrtBeginPCDHGLGMembers"},444:{n:"BrtEndPCDHGLGMembers"},445:{n:"BrtBeginPCDHGLGMember"},446:{n:"BrtEndPCDHGLGMember"},447:{n:"BrtBeginQSI"},448:{n:"BrtEndQSI"},449:{n:"BrtBeginQSIR"},450:{n:"BrtEndQSIR"},451:{n:"BrtBeginDeletedNames"},452:{n:"BrtEndDeletedNames"},453:{n:"BrtBeginDeletedName"},454:{n:"BrtEndDeletedName"},455:{n:"BrtBeginQSIFs"},456:{n:"BrtEndQSIFs"},457:{n:"BrtBeginQSIF"},458:{n:"BrtEndQSIF"},459:{n:"BrtBeginAutoSortScope"},460:{n:"BrtEndAutoSortScope"},461:{n:"BrtBeginConditionalFormatting"},462:{n:"BrtEndConditionalFormatting"},463:{n:"BrtBeginCFRule"},464:{n:"BrtEndCFRule"},465:{n:"BrtBeginIconSet"},466:{n:"BrtEndIconSet"},467:{n:"BrtBeginDatabar"},468:{n:"BrtEndDatabar"},469:{n:"BrtBeginColorScale"},470:{n:"BrtEndColorScale"},471:{n:"BrtCFVO"},472:{n:"BrtExternValueMeta"},473:{n:"BrtBeginColorPalette"},474:{n:"BrtEndColorPalette"},475:{n:"BrtIndexedColor"},476:{n:"BrtMargins",f:function(t){var r={};return Nl.forEach(function(e){r[e]=Br(t)}),r}},477:{n:"BrtPrintOptions"},478:{n:"BrtPageSetup"},479:{n:"BrtBeginHeaderFooter"},480:{n:"BrtEndHeaderFooter"},481:{n:"BrtBeginSXCrtFormat"},482:{n:"BrtEndSXCrtFormat"},483:{n:"BrtBeginSXCrtFormats"},484:{n:"BrtEndSXCrtFormats"},485:{n:"BrtWsFmtInfo",f:function(){}},486:{n:"BrtBeginMgs"},487:{n:"BrtEndMGs"},488:{n:"BrtBeginMGMaps"},489:{n:"BrtEndMGMaps"},490:{n:"BrtBeginMG"},491:{n:"BrtEndMG"},492:{n:"BrtBeginMap"},493:{n:"BrtEndMap"},494:{n:"BrtHLink",f:function(e,t){var r=e.l+t,n=wr(e,16),a=pr(e),s=sr(e),i=sr(e),t=sr(e);return e.l=r,t={rfx:n,relId:a,loc:s,display:t},i&&(t.Tooltip=i),t}},495:{n:"BrtBeginDCon"},496:{n:"BrtEndDCon"},497:{n:"BrtBeginDRefs"},498:{n:"BrtEndDRefs"},499:{n:"BrtDRef"},500:{n:"BrtBeginScenMan"},501:{n:"BrtEndScenMan"},502:{n:"BrtBeginSct"},503:{n:"BrtEndSct"},504:{n:"BrtSlc"},505:{n:"BrtBeginDXFs"},506:{n:"BrtEndDXFs"},507:{n:"BrtDXF"},508:{n:"BrtBeginTableStyles"},509:{n:"BrtEndTableStyles"},510:{n:"BrtBeginTableStyle"},511:{n:"BrtEndTableStyle"},512:{n:"BrtTableStyleElement"},513:{n:"BrtTableStyleClient"},514:{n:"BrtBeginVolDeps"},515:{n:"BrtEndVolDeps"},516:{n:"BrtBeginVolType"},517:{n:"BrtEndVolType"},518:{n:"BrtBeginVolMain"},519:{n:"BrtEndVolMain"},520:{n:"BrtBeginVolTopic"},521:{n:"BrtEndVolTopic"},522:{n:"BrtVolSubtopic"},523:{n:"BrtVolRef"},524:{n:"BrtVolNum"},525:{n:"BrtVolErr"},526:{n:"BrtVolStr"},527:{n:"BrtVolBool"},528:{n:"BrtBeginCalcChain$"},529:{n:"BrtEndCalcChain$"},530:{n:"BrtBeginSortState"},531:{n:"BrtEndSortState"},532:{n:"BrtBeginSortCond"},533:{n:"BrtEndSortCond"},534:{n:"BrtBookProtection"},535:{n:"BrtSheetProtection"},536:{n:"BrtRangeProtection"},537:{n:"BrtPhoneticInfo"},538:{n:"BrtBeginECTxtWiz"},539:{n:"BrtEndECTxtWiz"},540:{n:"BrtBeginECTWFldInfoLst"},541:{n:"BrtEndECTWFldInfoLst"},542:{n:"BrtBeginECTwFldInfo"},548:{n:"BrtFileSharing"},549:{n:"BrtOleSize"},550:{n:"BrtDrawing",f:br},551:{n:"BrtLegacyDrawing"},552:{n:"BrtLegacyDrawingHF"},553:{n:"BrtWebOpt"},554:{n:"BrtBeginWebPubItems"},555:{n:"BrtEndWebPubItems"},556:{n:"BrtBeginWebPubItem"},557:{n:"BrtEndWebPubItem"},558:{n:"BrtBeginSXCondFmt"},559:{n:"BrtEndSXCondFmt"},560:{n:"BrtBeginSXCondFmts"},561:{n:"BrtEndSXCondFmts"},562:{n:"BrtBkHim"},564:{n:"BrtColor"},565:{n:"BrtBeginIndexedColors"},566:{n:"BrtEndIndexedColors"},569:{n:"BrtBeginMRUColors"},570:{n:"BrtEndMRUColors"},572:{n:"BrtMRUColor"},573:{n:"BrtBeginDVals"},574:{n:"BrtEndDVals"},577:{n:"BrtSupNameStart"},578:{n:"BrtSupNameValueStart"},579:{n:"BrtSupNameValueEnd"},580:{n:"BrtSupNameNum"},581:{n:"BrtSupNameErr"},582:{n:"BrtSupNameSt"},583:{n:"BrtSupNameNil"},584:{n:"BrtSupNameBool"},585:{n:"BrtSupNameFmla"},586:{n:"BrtSupNameBits"},587:{n:"BrtSupNameEnd"},588:{n:"BrtEndSupBook"},589:{n:"BrtCellSmartTagProperty"},590:{n:"BrtBeginCellSmartTag"},591:{n:"BrtEndCellSmartTag"},592:{n:"BrtBeginCellSmartTags"},593:{n:"BrtEndCellSmartTags"},594:{n:"BrtBeginSmartTags"},595:{n:"BrtEndSmartTags"},596:{n:"BrtSmartTagType"},597:{n:"BrtBeginSmartTagTypes"},598:{n:"BrtEndSmartTagTypes"},599:{n:"BrtBeginSXFilters"},600:{n:"BrtEndSXFilters"},601:{n:"BrtBeginSXFILTER"},602:{n:"BrtEndSXFilter"},603:{n:"BrtBeginFills"},604:{n:"BrtEndFills"},605:{n:"BrtBeginCellWatches"},606:{n:"BrtEndCellWatches"},607:{n:"BrtCellWatch"},608:{n:"BrtBeginCRErrs"},609:{n:"BrtEndCRErrs"},610:{n:"BrtCrashRecErr"},611:{n:"BrtBeginFonts"},612:{n:"BrtEndFonts"},613:{n:"BrtBeginBorders"},614:{n:"BrtEndBorders"},615:{n:"BrtBeginFmts"},616:{n:"BrtEndFmts"},617:{n:"BrtBeginCellXFs"},618:{n:"BrtEndCellXFs"},619:{n:"BrtBeginStyles"},620:{n:"BrtEndStyles"},625:{n:"BrtBigName"},626:{n:"BrtBeginCellStyleXFs"},627:{n:"BrtEndCellStyleXFs"},628:{n:"BrtBeginComments"},629:{n:"BrtEndComments"},630:{n:"BrtBeginCommentAuthors"},631:{n:"BrtEndCommentAuthors"},632:{n:"BrtCommentAuthor",f:Ji},633:{n:"BrtBeginCommentList"},634:{n:"BrtEndCommentList"},635:{n:"BrtBeginComment",f:function(e){var t={};t.iauthor=e.read_shift(4);var r=wr(e,16);return t.rfx=r.s,t.ref=Yt(r.s),e.l+=16,t}},636:{n:"BrtEndComment"},637:{n:"BrtCommentText",f:lr},638:{n:"BrtBeginOleObjects"},639:{n:"BrtOleObject"},640:{n:"BrtEndOleObjects"},641:{n:"BrtBeginSxrules"},642:{n:"BrtEndSxRules"},643:{n:"BrtBeginActiveXControls"},644:{n:"BrtActiveX"},645:{n:"BrtEndActiveXControls"},646:{n:"BrtBeginPCDSDTCEMembersSortBy"},648:{n:"BrtBeginCellIgnoreECs"},649:{n:"BrtCellIgnoreEC"},650:{n:"BrtEndCellIgnoreECs"},651:{n:"BrtCsProp",f:function(e,t){return e.l+=10,{name:sr(e)}}},652:{n:"BrtCsPageSetup"},653:{n:"BrtBeginUserCsViews"},654:{n:"BrtEndUserCsViews"},655:{n:"BrtBeginUserCsView"},656:{n:"BrtEndUserCsView"},657:{n:"BrtBeginPcdSFCIEntries"},658:{n:"BrtEndPCDSFCIEntries"},659:{n:"BrtPCDSFCIEntry"},660:{n:"BrtBeginListParts"},661:{n:"BrtListPart"},662:{n:"BrtEndListParts"},663:{n:"BrtSheetCalcProp"},664:{n:"BrtBeginFnGroup"},665:{n:"BrtFnGroup"},666:{n:"BrtEndFnGroup"},667:{n:"BrtSupAddin"},668:{n:"BrtSXTDMPOrder"},669:{n:"BrtCsProtection"},671:{n:"BrtBeginWsSortMap"},672:{n:"BrtEndWsSortMap"},673:{n:"BrtBeginRRSort"},674:{n:"BrtEndRRSort"},675:{n:"BrtRRSortItem"},676:{n:"BrtFileSharingIso"},677:{n:"BrtBookProtectionIso"},678:{n:"BrtSheetProtectionIso"},679:{n:"BrtCsProtectionIso"},680:{n:"BrtRangeProtectionIso"},681:{n:"BrtDValList"},1024:{n:"BrtRwDescent"},1025:{n:"BrtKnownFonts"},1026:{n:"BrtBeginSXTupleSet"},1027:{n:"BrtEndSXTupleSet"},1028:{n:"BrtBeginSXTupleSetHeader"},1029:{n:"BrtEndSXTupleSetHeader"},1030:{n:"BrtSXTupleSetHeaderItem"},1031:{n:"BrtBeginSXTupleSetData"},1032:{n:"BrtEndSXTupleSetData"},1033:{n:"BrtBeginSXTupleSetRow"},1034:{n:"BrtEndSXTupleSetRow"},1035:{n:"BrtSXTupleSetRowItem"},1036:{n:"BrtNameExt"},1037:{n:"BrtPCDH14"},1038:{n:"BrtBeginPCDCalcMem14"},1039:{n:"BrtEndPCDCalcMem14"},1040:{n:"BrtSXTH14"},1041:{n:"BrtBeginSparklineGroup"},1042:{n:"BrtEndSparklineGroup"},1043:{n:"BrtSparkline"},1044:{n:"BrtSXDI14"},1045:{n:"BrtWsFmtInfoEx14"},1046:{n:"BrtBeginConditionalFormatting14"},1047:{n:"BrtEndConditionalFormatting14"},1048:{n:"BrtBeginCFRule14"},1049:{n:"BrtEndCFRule14"},1050:{n:"BrtCFVO14"},1051:{n:"BrtBeginDatabar14"},1052:{n:"BrtBeginIconSet14"},1053:{n:"BrtDVal14",f:function(){}},1054:{n:"BrtBeginDVals14"},1055:{n:"BrtColor14"},1056:{n:"BrtBeginSparklines"},1057:{n:"BrtEndSparklines"},1058:{n:"BrtBeginSparklineGroups"},1059:{n:"BrtEndSparklineGroups"},1061:{n:"BrtSXVD14"},1062:{n:"BrtBeginSXView14"},1063:{n:"BrtEndSXView14"},1064:{n:"BrtBeginSXView16"},1065:{n:"BrtEndSXView16"},1066:{n:"BrtBeginPCD14"},1067:{n:"BrtEndPCD14"},1068:{n:"BrtBeginExtConn14"},1069:{n:"BrtEndExtConn14"},1070:{n:"BrtBeginSlicerCacheIDs"},1071:{n:"BrtEndSlicerCacheIDs"},1072:{n:"BrtBeginSlicerCacheID"},1073:{n:"BrtEndSlicerCacheID"},1075:{n:"BrtBeginSlicerCache"},1076:{n:"BrtEndSlicerCache"},1077:{n:"BrtBeginSlicerCacheDef"},1078:{n:"BrtEndSlicerCacheDef"},1079:{n:"BrtBeginSlicersEx"},1080:{n:"BrtEndSlicersEx"},1081:{n:"BrtBeginSlicerEx"},1082:{n:"BrtEndSlicerEx"},1083:{n:"BrtBeginSlicer"},1084:{n:"BrtEndSlicer"},1085:{n:"BrtSlicerCachePivotTables"},1086:{n:"BrtBeginSlicerCacheOlapImpl"},1087:{n:"BrtEndSlicerCacheOlapImpl"},1088:{n:"BrtBeginSlicerCacheLevelsData"},1089:{n:"BrtEndSlicerCacheLevelsData"},1090:{n:"BrtBeginSlicerCacheLevelData"},1091:{n:"BrtEndSlicerCacheLevelData"},1092:{n:"BrtBeginSlicerCacheSiRanges"},1093:{n:"BrtEndSlicerCacheSiRanges"},1094:{n:"BrtBeginSlicerCacheSiRange"},1095:{n:"BrtEndSlicerCacheSiRange"},1096:{n:"BrtSlicerCacheOlapItem"},1097:{n:"BrtBeginSlicerCacheSelections"},1098:{n:"BrtSlicerCacheSelection"},1099:{n:"BrtEndSlicerCacheSelections"},1100:{n:"BrtBeginSlicerCacheNative"},1101:{n:"BrtEndSlicerCacheNative"},1102:{n:"BrtSlicerCacheNativeItem"},1103:{n:"BrtRangeProtection14"},1104:{n:"BrtRangeProtectionIso14"},1105:{n:"BrtCellIgnoreEC14"},1111:{n:"BrtList14"},1112:{n:"BrtCFIcon"},1113:{n:"BrtBeginSlicerCachesPivotCacheIDs"},1114:{n:"BrtEndSlicerCachesPivotCacheIDs"},1115:{n:"BrtBeginSlicers"},1116:{n:"BrtEndSlicers"},1117:{n:"BrtWbProp14"},1118:{n:"BrtBeginSXEdit"},1119:{n:"BrtEndSXEdit"},1120:{n:"BrtBeginSXEdits"},1121:{n:"BrtEndSXEdits"},1122:{n:"BrtBeginSXChange"},1123:{n:"BrtEndSXChange"},1124:{n:"BrtBeginSXChanges"},1125:{n:"BrtEndSXChanges"},1126:{n:"BrtSXTupleItems"},1128:{n:"BrtBeginSlicerStyle"},1129:{n:"BrtEndSlicerStyle"},1130:{n:"BrtSlicerStyleElement"},1131:{n:"BrtBeginStyleSheetExt14"},1132:{n:"BrtEndStyleSheetExt14"},1133:{n:"BrtBeginSlicerCachesPivotCacheID"},1134:{n:"BrtEndSlicerCachesPivotCacheID"},1135:{n:"BrtBeginConditionalFormattings"},1136:{n:"BrtEndConditionalFormattings"},1137:{n:"BrtBeginPCDCalcMemExt"},1138:{n:"BrtEndPCDCalcMemExt"},1139:{n:"BrtBeginPCDCalcMemsExt"},1140:{n:"BrtEndPCDCalcMemsExt"},1141:{n:"BrtPCDField14"},1142:{n:"BrtBeginSlicerStyles"},1143:{n:"BrtEndSlicerStyles"},1144:{n:"BrtBeginSlicerStyleElements"},1145:{n:"BrtEndSlicerStyleElements"},1146:{n:"BrtCFRuleExt"},1147:{n:"BrtBeginSXCondFmt14"},1148:{n:"BrtEndSXCondFmt14"},1149:{n:"BrtBeginSXCondFmts14"},1150:{n:"BrtEndSXCondFmts14"},1152:{n:"BrtBeginSortCond14"},1153:{n:"BrtEndSortCond14"},1154:{n:"BrtEndDVals14"},1155:{n:"BrtEndIconSet14"},1156:{n:"BrtEndDatabar14"},1157:{n:"BrtBeginColorScale14"},1158:{n:"BrtEndColorScale14"},1159:{n:"BrtBeginSxrules14"},1160:{n:"BrtEndSxrules14"},1161:{n:"BrtBeginPRule14"},1162:{n:"BrtEndPRule14"},1163:{n:"BrtBeginPRFilters14"},1164:{n:"BrtEndPRFilters14"},1165:{n:"BrtBeginPRFilter14"},1166:{n:"BrtEndPRFilter14"},1167:{n:"BrtBeginPRFItem14"},1168:{n:"BrtEndPRFItem14"},1169:{n:"BrtBeginCellIgnoreECs14"},1170:{n:"BrtEndCellIgnoreECs14"},1171:{n:"BrtDxf14"},1172:{n:"BrtBeginDxF14s"},1173:{n:"BrtEndDxf14s"},1177:{n:"BrtFilter14"},1178:{n:"BrtBeginCustomFilters14"},1180:{n:"BrtCustomFilter14"},1181:{n:"BrtIconFilter14"},1182:{n:"BrtPivotCacheConnectionName"},2048:{n:"BrtBeginDecoupledPivotCacheIDs"},2049:{n:"BrtEndDecoupledPivotCacheIDs"},2050:{n:"BrtDecoupledPivotCacheID"},2051:{n:"BrtBeginPivotTableRefs"},2052:{n:"BrtEndPivotTableRefs"},2053:{n:"BrtPivotTableRef"},2054:{n:"BrtSlicerCacheBookPivotTables"},2055:{n:"BrtBeginSxvcells"},2056:{n:"BrtEndSxvcells"},2057:{n:"BrtBeginSxRow"},2058:{n:"BrtEndSxRow"},2060:{n:"BrtPcdCalcMem15"},2067:{n:"BrtQsi15"},2068:{n:"BrtBeginWebExtensions"},2069:{n:"BrtEndWebExtensions"},2070:{n:"BrtWebExtension"},2071:{n:"BrtAbsPath15"},2072:{n:"BrtBeginPivotTableUISettings"},2073:{n:"BrtEndPivotTableUISettings"},2075:{n:"BrtTableSlicerCacheIDs"},2076:{n:"BrtTableSlicerCacheID"},2077:{n:"BrtBeginTableSlicerCache"},2078:{n:"BrtEndTableSlicerCache"},2079:{n:"BrtSxFilter15"},2080:{n:"BrtBeginTimelineCachePivotCacheIDs"},2081:{n:"BrtEndTimelineCachePivotCacheIDs"},2082:{n:"BrtTimelineCachePivotCacheID"},2083:{n:"BrtBeginTimelineCacheIDs"},2084:{n:"BrtEndTimelineCacheIDs"},2085:{n:"BrtBeginTimelineCacheID"},2086:{n:"BrtEndTimelineCacheID"},2087:{n:"BrtBeginTimelinesEx"},2088:{n:"BrtEndTimelinesEx"},2089:{n:"BrtBeginTimelineEx"},2090:{n:"BrtEndTimelineEx"},2091:{n:"BrtWorkBookPr15"},2092:{n:"BrtPCDH15"},2093:{n:"BrtBeginTimelineStyle"},2094:{n:"BrtEndTimelineStyle"},2095:{n:"BrtTimelineStyleElement"},2096:{n:"BrtBeginTimelineStylesheetExt15"},2097:{n:"BrtEndTimelineStylesheetExt15"},2098:{n:"BrtBeginTimelineStyles"},2099:{n:"BrtEndTimelineStyles"},2100:{n:"BrtBeginTimelineStyleElements"},2101:{n:"BrtEndTimelineStyleElements"},2102:{n:"BrtDxf15"},2103:{n:"BrtBeginDxfs15"},2104:{n:"brtEndDxfs15"},2105:{n:"BrtSlicerCacheHideItemsWithNoData"},2106:{n:"BrtBeginItemUniqueNames"},2107:{n:"BrtEndItemUniqueNames"},2108:{n:"BrtItemUniqueName"},2109:{n:"BrtBeginExtConn15"},2110:{n:"BrtEndExtConn15"},2111:{n:"BrtBeginOledbPr15"},2112:{n:"BrtEndOledbPr15"},2113:{n:"BrtBeginDataFeedPr15"},2114:{n:"BrtEndDataFeedPr15"},2115:{n:"BrtTextPr15"},2116:{n:"BrtRangePr15"},2117:{n:"BrtDbCommand15"},2118:{n:"BrtBeginDbTables15"},2119:{n:"BrtEndDbTables15"},2120:{n:"BrtDbTable15"},2121:{n:"BrtBeginDataModel"},2122:{n:"BrtEndDataModel"},2123:{n:"BrtBeginModelTables"},2124:{n:"BrtEndModelTables"},2125:{n:"BrtModelTable"},2126:{n:"BrtBeginModelRelationships"},2127:{n:"BrtEndModelRelationships"},2128:{n:"BrtModelRelationship"},2129:{n:"BrtBeginECTxtWiz15"},2130:{n:"BrtEndECTxtWiz15"},2131:{n:"BrtBeginECTWFldInfoLst15"},2132:{n:"BrtEndECTWFldInfoLst15"},2133:{n:"BrtBeginECTWFldInfo15"},2134:{n:"BrtFieldListActiveItem"},2135:{n:"BrtPivotCacheIdVersion"},2136:{n:"BrtSXDI15"},2137:{n:"BrtBeginModelTimeGroupings"},2138:{n:"BrtEndModelTimeGroupings"},2139:{n:"BrtBeginModelTimeGrouping"},2140:{n:"BrtEndModelTimeGrouping"},2141:{n:"BrtModelTimeGroupingCalcCol"},3072:{n:"BrtUid"},3073:{n:"BrtRevisionPtr"},5095:{n:"BrtBeginCalcFeatures"},5096:{n:"BrtEndCalcFeatures"},5097:{n:"BrtCalcFeature"},65535:{n:""}},Hc=w(Uc,"n"),Wc={3:{n:"BIFF2NUM",f:function(e){var t=qn(e);return++e.l,e=Br(e),t.t="n",t.val=e,t}},4:{n:"BIFF2STR",f:function(e,t,r){var n=qn(e);return++e.l,r=jn(e,0,r),n.t="str",n.val=r,n}},6:{n:"Formula",f:Ho},9:{n:"BOF",f:la},10:{n:"EOF",f:Mn},12:{n:"CalcCount",f:Hn},13:{n:"CalcMode",f:Hn},14:{n:"CalcPrecision",f:Ln},15:{n:"CalcRefMode",f:Ln},16:{n:"CalcDelta",f:Br},17:{n:"CalcIter",f:Ln},18:{n:"Protect",f:Ln},19:{n:"Password",f:Hn},20:{n:"Header",f:ba},21:{n:"Footer",f:ba},23:{n:"ExternSheet",f:wa},24:{n:"Lbl",f:Sa},25:{n:"WinProtect",f:Ln},26:{n:"VerticalPageBreaks"},27:{n:"HorizontalPageBreaks"},28:{n:"Note",f:function(e,t,r){return function(e,t){if(!(t.biff<8)){var r=e.read_shift(2),n=e.read_shift(2),a=e.read_shift(2),s=e.read_shift(2),i=jn(e,0,t);return t.biff<8&&e.read_shift(1),[{r:r,c:n},i,s,a]}}(e,r)}},29:{n:"Selection"},34:{n:"Date1904",f:Ln},35:{n:"ExternName",f:va},36:{n:"COLWIDTH"},38:{n:"LeftMargin",f:Br},39:{n:"RightMargin",f:Br},40:{n:"TopMargin",f:Br},41:{n:"BottomMargin",f:Br},42:{n:"PrintRowCol",f:Ln},43:{n:"PrintGrid",f:Ln},47:{n:"FilePass",f:function(e,t,r){var n={Type:8<=r.biff?e.read_shift(2):0};return n.Type?Ks(e,t-2,n):(t=e,r.biff,e=r,r=n,t={key:Hn(t),verificationBytes:Hn(t)},e.password&&(t.verifier=Ws(e.password)),r.valid=t.verificationBytes===t.verifier,r.valid&&(r.insitu=$s(e.password))),n}},49:{n:"Font",f:function(e,t,r){var n={dyHeight:e.read_shift(2),fl:e.read_shift(2)};switch(r&&r.biff||8){case 2:break;case 3:case 4:e.l+=2;break;default:e.l+=10}return n.name=Xn(e,0,r),n}},51:{n:"PrintSize",f:Hn},60:{n:"Continue"},61:{n:"Window1",f:function(e){return{Pos:[e.read_shift(2),e.read_shift(2)],Dim:[e.read_shift(2),e.read_shift(2)],Flags:e.read_shift(2),CurTab:e.read_shift(2),FirstTab:e.read_shift(2),Selected:e.read_shift(2),TabRatio:e.read_shift(2)}}},64:{n:"Backup",f:Ln},65:{n:"Pane",f:function(){}},66:{n:"CodePage",f:Hn},77:{n:"Pls"},80:{n:"DCon"},81:{n:"DConRef"},82:{n:"DConName"},85:{n:"DefColWidth",f:Hn},89:{n:"XCT"},90:{n:"CRN"},91:{n:"FileSharing"},92:{n:"WriteAccess",f:function(e,t,r){if(r.enc)return e.l+=t,"";var n=e.l,r=jn(e,0,r);return e.read_shift(t+n-e.l),r}},93:{n:"Obj",f:function(e,t,r){return r&&r.biff<8?function(e,t,r){e.l+=4;var n=e.read_shift(2),a=e.read_shift(2),s=e.read_shift(2);e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=2,e.l+=6,t-=36;var i=[];return i.push((Ba[n]||Pt)(e,t,r)),{cmo:[a,n,s],ft:i}}(e,t,r):{cmo:r=sa(e),ft:function(t,e){for(var r=t.l+e,n=[];t.l<r;){var a=t.read_shift(2);t.l-=2;try{n.push(oa[a](t,r-t.l))}catch(e){return t.l=r,n}}return t.l!=r&&(t.l=r),n}(e,t-22,r[1])}}},94:{n:"Uncalced"},95:{n:"CalcSaveRecalc",f:Ln},96:{n:"Template"},97:{n:"Intl"},99:{n:"ObjProtect",f:Ln},125:{n:"ColInfo",f:ka},128:{n:"Guts",f:function(e){if(e.l+=4,0!==(e=[e.read_shift(2),e.read_shift(2)])[0]&&e[0]--,0!==e[1]&&e[1]--,7<e[0]||7<e[1])throw new Error("Bad Gutters: "+e.join("|"));return e}},129:{n:"WsBool",f:function(e,t,r){return{fDialog:16&(r&&8==r.biff||2==t?e.read_shift(2):(e.l+=t,0))}}},130:{n:"GridSet",f:Hn},131:{n:"HCenter",f:Ln},132:{n:"VCenter",f:Ln},133:{n:"BoundSheet8",f:function(e,t,r){var n=e.read_shift(4),a=3&e.read_shift(1),s=e.read_shift(1);switch(s){case 0:s="Worksheet";break;case 1:s="Macrosheet";break;case 2:s="Chartsheet";break;case 6:s="VBAModule"}return r=Xn(e,0,r),{pos:n,hs:a,dt:s,name:r=0===r.length?"Sheet1":r}}},134:{n:"WriteProtect"},140:{n:"Country",f:function(e){var t=[0,0],r=e.read_shift(2);return t[0]=Mr[r]||r,r=e.read_shift(2),t[1]=Mr[r]||r,t}},141:{n:"HideObj",f:Hn},144:{n:"Sort"},146:{n:"Palette",f:function(e){for(var t=e.read_shift(2),r=[];0<t--;)r.push(Jn(e));return r}},151:{n:"Sync"},152:{n:"LPr"},153:{n:"DxGCol"},154:{n:"FnGroupName"},155:{n:"FilterMode"},156:{n:"BuiltInFnGroupCount",f:Hn},157:{n:"AutoFilterInfo"},158:{n:"AutoFilter"},160:{n:"Scl",f:_a},161:{n:"Setup",f:function(e,t){var r={};return t<32||(e.l+=16,r.header=Br(e),r.footer=Br(e),e.l+=2),r}},174:{n:"ScenMan"},175:{n:"SCENARIO"},176:{n:"SxView"},177:{n:"Sxvd"},178:{n:"SXVI"},180:{n:"SxIvd"},181:{n:"SXLI"},182:{n:"SXPI"},184:{n:"DocRoute"},185:{n:"RecipName"},189:{n:"MulRk",f:function(e,t){for(var r=e.l+t-2,n=e.read_shift(2),a=e.read_shift(2),s=[];e.l<r;)s.push(ea(e));if(e.l!==r)throw new Error("MulRK read error");if(t=e.read_shift(2),s.length!=t-a+1)throw new Error("MulRK length mismatch");return{r:n,c:a,C:t,rkrec:s}}},190:{n:"MulBlank",f:function(e,t){for(var r=e.l+t-2,n=e.read_shift(2),a=e.read_shift(2),s=[];e.l<r;)s.push(e.read_shift(2));if(e.l!==r)throw new Error("MulBlank read error");if(t=e.read_shift(2),s.length!=t-a+1)throw new Error("MulBlank length mismatch");return{r:n,c:a,C:t,ixfe:s}}},193:{n:"Mms",f:Mn},197:{n:"SXDI"},198:{n:"SXDB"},199:{n:"SXFDB"},200:{n:"SXDBB"},201:{n:"SXNum"},202:{n:"SxBool",f:Ln},203:{n:"SxErr"},204:{n:"SXInt"},205:{n:"SXString"},206:{n:"SXDtr"},207:{n:"SxNil"},208:{n:"SXTbl"},209:{n:"SXTBRGIITM"},210:{n:"SxTbpg"},211:{n:"ObProj"},213:{n:"SXStreamID"},215:{n:"DBCell"},216:{n:"SXRng"},217:{n:"SxIsxoper"},218:{n:"BookBool",f:Hn},220:{n:"DbOrParamQry"},221:{n:"ScenarioProtect",f:Ln},222:{n:"OleObjectSize"},224:{n:"XF",f:function(e,t,r){var n,a,s,i={};return i.ifnt=e.read_shift(2),i.numFmtId=e.read_shift(2),i.flags=e.read_shift(2),i.fStyle=i.flags>>2&1,t-=6,i.data=(n=e,i.fStyle,a=r,s={},t=n.read_shift(4),e=n.read_shift(4),r=n.read_shift(4),n=n.read_shift(2),s.patternType=Lr[r>>26],a.cellStyles&&(s.alc=7&t,s.fWrap=t>>3&1,s.alcV=t>>4&7,s.fJustLast=t>>7&1,s.trot=t>>8&255,s.cIndent=t>>16&15,s.fShrinkToFit=t>>20&1,s.iReadOrder=t>>22&2,s.fAtrNum=t>>26&1,s.fAtrFnt=t>>27&1,s.fAtrAlc=t>>28&1,s.fAtrBdr=t>>29&1,s.fAtrPat=t>>30&1,s.fAtrProt=t>>31&1,s.dgLeft=15&e,s.dgRight=e>>4&15,s.dgTop=e>>8&15,s.dgBottom=e>>12&15,s.icvLeft=e>>16&127,s.icvRight=e>>23&127,s.grbitDiag=e>>30&3,s.icvTop=127&r,s.icvBottom=r>>7&127,s.icvDiag=r>>14&127,s.dgDiag=r>>21&15,s.icvFore=127&n,s.icvBack=n>>7&127,s.fsxButton=n>>14&1),s),i}},225:{n:"InterfaceHdr",f:function(e,t){return 0===t||e.read_shift(2),1200}},226:{n:"InterfaceEnd",f:Mn},227:{n:"SXVS"},229:{n:"MergeCells",f:function(e,t){for(var r=[],n=e.read_shift(2);n--;)r.push(ta(e));return r}},233:{n:"BkHim"},235:{n:"MsoDrawingGroup"},236:{n:"MsoDrawing"},237:{n:"MsoDrawingSelection"},239:{n:"PhoneticInfo"},240:{n:"SxRule"},241:{n:"SXEx"},242:{n:"SxFilt"},244:{n:"SxDXF"},245:{n:"SxItm"},246:{n:"SxName"},247:{n:"SxSelect"},248:{n:"SXPair"},249:{n:"SxFmla"},251:{n:"SxFormat"},252:{n:"SST",f:function(e,t){for(var r=e.l+t,t=e.read_shift(4),n=e.read_shift(4),a=[],s=0;s!=n&&e.l<r;++s)a.push(function(e){var t=f;f=1200;var r,n=e.read_shift(2),a=4&(l=e.read_shift(1)),s=8&l,i=1+(1&l),o=0,l={};return s&&(o=e.read_shift(2)),a&&(r=e.read_shift(4)),i=2==i?"dbcs-cont":"sbcs-cont",i=0===n?"":e.read_shift(n,i),s&&(e.l+=4*o),a&&(e.l+=r),l.t=i,s||(l.raw="<t>"+l.t+"</t>",l.r=l.t),f=t,l}(e));return a.Count=t,a.Unique=n,a}},253:{n:"LabelSst",f:function(e){var t=qn(e);return t.isst=e.read_shift(4),t}},255:{n:"ExtSST",f:function(e,t){var r={};return r.dsst=e.read_shift(2),e.l+=t-2,r}},256:{n:"SXVDEx"},259:{n:"SXFormula"},290:{n:"SXDBEx"},311:{n:"RRDInsDel"},312:{n:"RRDHead"},315:{n:"RRDChgCell"},317:{n:"RRTabId",f:Vn},318:{n:"RRDRenSheet"},319:{n:"RRSort"},320:{n:"RRDMove"},330:{n:"RRFormat"},331:{n:"RRAutoFmt"},333:{n:"RRInsertSh"},334:{n:"RRDMoveBegin"},335:{n:"RRDMoveEnd"},336:{n:"RRDInsDelBegin"},337:{n:"RRDInsDelEnd"},338:{n:"RRDConflict"},339:{n:"RRDDefName"},340:{n:"RRDRstEtxp"},351:{n:"LRng"},352:{n:"UsesELFs",f:Ln},353:{n:"DSF",f:Mn},401:{n:"CUsr"},402:{n:"CbUsr"},403:{n:"UsrInfo"},404:{n:"UsrExcl"},405:{n:"FileLock"},406:{n:"RRDInfo"},407:{n:"BCUsrs"},408:{n:"UsrChk"},425:{n:"UserBView"},426:{n:"UserSViewBegin"},427:{n:"UserSViewEnd"},428:{n:"RRDUserView"},429:{n:"Qsi"},430:{n:"SupBook",f:function(e,t,r){var n=e.l+t,a=e.read_shift(2),t=e.read_shift(2);if(1025==(r.sbcch=t)||14849==t)return[t,a];if(t<1||255<t)throw new Error("Unexpected SupBook type: "+t);for(var r=Gn(e,t),s=[];n>e.l;)s.push(zn(e));return[t,a,r,s]}},431:{n:"Prot4Rev",f:Ln},432:{n:"CondFmt"},433:{n:"CF"},434:{n:"DVal"},437:{n:"DConBin"},438:{n:"TxO",f:function(t,r,e){var n=t.l,a="";try{t.l+=4;var s=(e.lastobj||{cmo:[0,0]}).cmo[1];-1==[0,5,7,11,12,14].indexOf(s)?t.l+=6:function(e){var t=e.read_shift(1);e.l++;var r=e.read_shift(2);e.l+=2}(t);var i=t.read_shift(2);t.read_shift(2),Hn(t);s=t.read_shift(2);t.l+=s;for(var o=1;o<t.lens.length-1;++o){if(t.l-n!=t.lens[o])throw new Error("TxO: bad continue record");var l=t[t.l];if((a+=Gn(t,t.lens[o+1]-t.lens[o]-1)).length>=(l?i:2*i))break}if(a.length!==i&&a.length!==2*i)throw new Error("cchText: "+i+" != "+a.length);return t.l=n+r,{t:a}}catch(e){return t.l=n+r,{t:a}}}},439:{n:"RefreshAll",f:Ln},440:{n:"HLink",f:function(e,t){var r=ta(e);return e.l+=16,[r,function(e,t){var r=e.l+t;if(2!==(l=e.read_shift(4)))throw new Error("Unrecognized streamVersion: "+l);t=e.read_shift(2),e.l+=2;var n,a,s,i,o,l="";16&t&&(n=Yn(e,e.l)),128&t&&(a=Yn(e,e.l)),257==(257&t)&&(s=Yn(e,e.l)),1==(257&t)&&(c=Kn(e,e.l)),8&t&&(l=Yn(e,e.l)),32&t&&(i=e.read_shift(16)),64&t&&(o=wn(e)),e.l=r;var c=a||s||c||"";return c&&l&&(c+="#"+l),c={Target:c=c||"#"+l},i&&(c.guid=i),o&&(c.time=o),n&&(c.Tooltip=n),c}(e,t-24)]}},441:{n:"Lel"},442:{n:"CodeName",f:zn},443:{n:"SXFDBType"},444:{n:"Prot4RevPass",f:Hn},445:{n:"ObNoMacros"},446:{n:"Dv"},448:{n:"Excel9File",f:Mn},449:{n:"RecalcId",f:function(e){return e.read_shift(2),e.read_shift(4)},r:2},450:{n:"EntExU2",f:Mn},512:{n:"Dimensions",f:da},513:{n:"Blank",f:xa},515:{n:"Number",f:function(e){var t=qn(e),e=Br(e);return t.val=e,t}},516:{n:"Label",f:function(e,t,r){return e.l,t=qn(e),2==r.biff&&e.l++,r=zn(e,e.l,r),t.val=r,t}},517:{n:"BoolErr",f:ma},518:{n:"Formula",f:Ho},519:{n:"String",f:ya},520:{n:"Row",f:function(e){var t={};t.r=e.read_shift(2),t.c=e.read_shift(2),t.cnt=e.read_shift(2)-t.c;var r=e.read_shift(2);e.l+=4;var n=e.read_shift(1);return e.l+=3,7&n&&(t.level=7&n),32&n&&(t.hidden=!0),64&n&&(t.hpt=r/20),t}},523:{n:"Index"},545:{n:"Array",f:Ca},549:{n:"DefaultRowHeight",f:ha},566:{n:"Table"},574:{n:"Window2",f:function(e,t,r){return r&&2<=r.biff&&r.biff<5?{}:{RTL:64&e.read_shift(2)}}},638:{n:"RK",f:function(e){var t=e.read_shift(2),r=e.read_shift(2),e=ea(e);return{r:t,c:r,ixfe:e[0],rknum:e[1]}}},659:{n:"Style"},1030:{n:"Formula",f:Ho},1048:{n:"BigName"},1054:{n:"Format",f:function(e,t,r){return[e.read_shift(2),jn(e,0,r)]}},1084:{n:"ContinueBigName"},1212:{n:"ShrFmla",f:function(e,t,r){var n=na(e);e.l++;var a=e.read_shift(1);return[function(e,t,r){var n,a=e.l+t,s=e.read_shift(2),i=Oo(e,s,r);if(65535==s)return[[],Pt(e,t-2)];t!==s+2&&(n=Do(e,a-s-2,i,r));return[i,n]}(e,t-=8,r),a,n]}},2048:{n:"HLinkTooltip",f:function(e,t){return e.read_shift(2),[ta(e),e.read_shift((t-10)/2,"dbcs-cont").replace(ee,"")]}},2049:{n:"WebPub"},2050:{n:"QsiSXTag"},2051:{n:"DBQueryExt"},2052:{n:"ExtString"},2053:{n:"TxtQry"},2054:{n:"Qsir"},2055:{n:"Qsif"},2056:{n:"RRDTQSIF"},2057:{n:"BOF",f:la},2058:{n:"OleDbConn"},2059:{n:"WOpt"},2060:{n:"SXViewEx"},2061:{n:"SXTH"},2062:{n:"SXPIEx"},2063:{n:"SXVDTEx"},2064:{n:"SXViewEx9"},2066:{n:"ContinueFrt"},2067:{n:"RealTimeData"},2128:{n:"ChartFrtInfo"},2129:{n:"FrtWrapper"},2130:{n:"StartBlock"},2131:{n:"EndBlock"},2132:{n:"StartObject"},2133:{n:"EndObject"},2134:{n:"CatLab"},2135:{n:"YMult"},2136:{n:"SXViewLink"},2137:{n:"PivotChartBits"},2138:{n:"FrtFontList"},2146:{n:"SheetExt"},2147:{n:"BookExt",r:12},2148:{n:"SXAddl"},2149:{n:"CrErr"},2150:{n:"HFPicture"},2151:{n:"FeatHdr",f:Mn},2152:{n:"Feat"},2154:{n:"DataLabExt"},2155:{n:"DataLabExtContents"},2156:{n:"CellWatch"},2161:{n:"FeatHdr11"},2162:{n:"Feature11"},2164:{n:"DropDownObjIds"},2165:{n:"ContinueFrt11"},2166:{n:"DConn"},2167:{n:"List12"},2168:{n:"Feature12"},2169:{n:"CondFmt12"},2170:{n:"CF12"},2171:{n:"CFEx"},2172:{n:"XFCRC",f:function(e){e.l+=2;var t={cxfs:0,crc:0};return t.cxfs=e.read_shift(2),t.crc=e.read_shift(4),t},r:12},2173:{n:"XFExt",f:function(e,t){e.l,e.l+=2,t=e.read_shift(2),e.l+=2;for(var r=e.read_shift(2),n=[];0<r--;)n.push(Ki(e,e.l));return{ixfe:t,ext:n}},r:12},2174:{n:"AutoFilter12"},2175:{n:"ContinueFrt12"},2180:{n:"MDTInfo"},2181:{n:"MDXStr"},2182:{n:"MDXTuple"},2183:{n:"MDXSet"},2184:{n:"MDXProp"},2185:{n:"MDXKPI"},2186:{n:"MDB"},2187:{n:"PLV"},2188:{n:"Compat12",f:Ln,r:12},2189:{n:"DXF"},2190:{n:"TableStyles",r:12},2191:{n:"TableStyle"},2192:{n:"TableStyleElement"},2194:{n:"StyleExt"},2195:{n:"NamePublish"},2196:{n:"NameCmt",f:function(e,t,r){if(!(r.biff<8)){var n=e.read_shift(2),a=e.read_shift(2);return[Gn(e,n,r),Gn(e,a,r)]}e.l+=t},r:12},2197:{n:"SortData"},2198:{n:"Theme",f:function(e,t,r){var n=e.l+t;if(124226!==e.read_shift(4))if(r.cellStyles&&O){var a,s=e.slice(e.l);e.l=n;try{a=new O(s)}catch(e){return}t=V(a,"theme/theme/theme1.xml",!0);if(t)return zi(t,r)}else e.l=n},r:12},2199:{n:"GUIDTypeLib"},2200:{n:"FnGrp12"},2201:{n:"NameFnGrp12"},2202:{n:"MTRSettings",f:function(e){return[0!==e.read_shift(4),0!==e.read_shift(4),e.read_shift(4)]},r:12},2203:{n:"CompressPictures",f:Mn},2204:{n:"HeaderFooter"},2205:{n:"CrtLayout12"},2206:{n:"CrtMlFrt"},2207:{n:"CrtMlFrtContinue"},2211:{n:"ForceFullCalculation",f:function(e){var t,r,n=(r=(t=e).read_shift(2),n=t.read_shift(2),t.l+=8,{type:r,flags:n});if(2211!=n.type)throw new Error("Invalid Future Record "+n.type);return 0!==e.read_shift(4)}},2212:{n:"ShapePropsStream"},2213:{n:"TextPropsStream"},2214:{n:"RichTextStream"},2215:{n:"CrtLayout12A"},4097:{n:"Units"},4098:{n:"Chart"},4099:{n:"Series"},4102:{n:"DataFormat"},4103:{n:"LineFormat"},4105:{n:"MarkerFormat"},4106:{n:"AreaFormat"},4107:{n:"PieFormat"},4108:{n:"AttachedLabel"},4109:{n:"SeriesText"},4116:{n:"ChartFormat"},4117:{n:"Legend"},4118:{n:"SeriesList"},4119:{n:"Bar"},4120:{n:"Line"},4121:{n:"Pie"},4122:{n:"Area"},4123:{n:"Scatter"},4124:{n:"CrtLine"},4125:{n:"Axis"},4126:{n:"Tick"},4127:{n:"ValueRange"},4128:{n:"CatSerRange"},4129:{n:"AxisLine"},4130:{n:"CrtLink"},4132:{n:"DefaultText"},4133:{n:"Text"},4134:{n:"FontX",f:Hn},4135:{n:"ObjectLink"},4146:{n:"Frame"},4147:{n:"Begin"},4148:{n:"End"},4149:{n:"PlotArea"},4154:{n:"Chart3d"},4156:{n:"PicF"},4157:{n:"DropBar"},4158:{n:"Radar"},4159:{n:"Surf"},4160:{n:"RadarArea"},4161:{n:"AxisParent"},4163:{n:"LegendException"},4164:{n:"ShtProps",f:function(e,t,r){var n={area:!1};return 5!=r.biff?e.l+=t:(t=e.read_shift(1),e.l+=3,16&t&&(n.area=!0)),n}},4165:{n:"SerToCrt"},4166:{n:"AxesUsed"},4168:{n:"SBaseRef"},4170:{n:"SerParent"},4171:{n:"SerAuxTrend"},4174:{n:"IFmtRecord"},4175:{n:"Pos"},4176:{n:"AlRuns"},4177:{n:"BRAI"},4187:{n:"SerAuxErrBar"},4188:{n:"ClrtClient",f:function(e){for(var t=e.read_shift(2),r=[];0<t--;)r.push(Jn(e));return r}},4189:{n:"SerFmt"},4191:{n:"Chart3DBarShape"},4192:{n:"Fbi"},4193:{n:"BopPop"},4194:{n:"AxcExt"},4195:{n:"Dat"},4196:{n:"PlotGrowth"},4197:{n:"SIIndex"},4198:{n:"GelFrame"},4199:{n:"BopPopCustom"},4200:{n:"Fbi2"},0:{n:"Dimensions",f:da},2:{n:"BIFF2INT",f:function(e){var t=qn(e);return++e.l,e=e.read_shift(2),t.t="n",t.val=e,t}},5:{n:"BoolErr",f:ma},7:{n:"String",f:function(e){var t=e.read_shift(1);return 0===t?(e.l++,""):e.read_shift(t,"sbcs-cont")}},8:{n:"BIFF2ROW"},11:{n:"Index"},22:{n:"ExternCount",f:Hn},30:{n:"BIFF2FORMAT",f:ua},31:{n:"BIFF2FMTCNT"},32:{n:"BIFF2COLINFO"},33:{n:"Array",f:Ca},37:{n:"DefaultRowHeight",f:ha},50:{n:"BIFF2FONTXTRA",f:function(e,t){e.l+=6,e.l+=2,e.l+=1,e.l+=3,e.l+=1,e.l+=t-13}},52:{n:"DDEObjName"},62:{n:"BIFF2WINDOW2"},67:{n:"BIFF2XF"},69:{n:"BIFF2FONTCLR"},86:{n:"BIFF4FMTCNT"},126:{n:"RK"},127:{n:"ImData",f:function(e){var t=e.read_shift(2),r=e.read_shift(2),n=e.read_shift(4),r={fmt:t,env:r,len:n,data:e.slice(e.l,e.l+n)};return e.l+=n,r}},135:{n:"Addin"},136:{n:"Edg"},137:{n:"Pub"},145:{n:"Sub"},148:{n:"LHRecord"},149:{n:"LHNGraph"},150:{n:"Sound"},169:{n:"CoordList"},171:{n:"GCW"},188:{n:"ShrFmla"},191:{n:"ToolbarHdr"},192:{n:"ToolbarEnd"},194:{n:"AddMenu"},195:{n:"DelMenu"},214:{n:"RString",f:function(e,t,r){var n=e.l+t,a=qn(e),t=e.read_shift(2),r=Gn(e,t,r);return e.l=n,a.t="str",a.val=r,a}},223:{n:"UDDesc"},234:{n:"TabIdConf"},354:{n:"XL5Modify"},421:{n:"FileSharing2"},521:{n:"BOF",f:la},536:{n:"Lbl",f:Sa},547:{n:"ExternName",f:va},561:{n:"Font"},579:{n:"BIFF3XF"},1033:{n:"BOF",f:la},1091:{n:"BIFF4XF"},2157:{n:"FeatInfo"},2163:{n:"FeatInfo11"},2177:{n:"SXAddl12"},2240:{n:"AutoWebPub"},2241:{n:"ListObj"},2242:{n:"ListField"},2243:{n:"ListDV"},2244:{n:"ListCondFmt"},2245:{n:"ListCF"},2246:{n:"FMQry"},2247:{n:"FMSQry"},2248:{n:"PLV"},2249:{n:"LnExt"},2250:{n:"MkrExt"},2251:{n:"CrtCoopt"},2262:{n:"FRTArchId$",r:12},29282:{}},Vc=w(Wc,"n");function Xc(e,t,r,n){var a=+t||+Vc[t];isNaN(a)||(t=n||(r||[]).length||0,(n=e.next(4)).write_shift(2,a),n.write_shift(2,t),0<t&&wt(r)&&e.push(r))}function Gc(e,t,r){return(e=e||Nt(7)).write_shift(2,t),e.write_shift(2,r),e.write_shift(2,0),e.write_shift(1,0),e}function zc(e,t,r,n){if(null!=t.v)switch(t.t){case"d":case"n":var a="d"==t.t?G(le(t.v)):t.v;return void(a==(0|a)&&0<=a&&a<65536?Xc(e,2,(f=r,h=n,u=a,Gc(d=Nt(9),f,h),d.write_shift(2,u),d)):Xc(e,3,(u=r,d=n,a=a,Gc(c=Nt(15),u,d),c.write_shift(8,a,"f"),c)));case"b":case"e":return void Xc(e,5,(c=r,s=n,i=t.v,o=t.t,Gc(l=Nt(9),c,s),"e"==o?(l.write_shift(1,i),l.write_shift(1,1)):(l.write_shift(1,i?1:0),l.write_shift(1,0)),l));case"s":case"str":return void Xc(e,4,(s=r,o=n,i=t.v,Gc(l=Nt(8+2*i.length),s,o),l.write_shift(1,i.length),l.write_shift(i.length,i,"sbcs"),l.l<l.length?l.slice(0,l.l):l))}var s,i,o,l,c,f,h,u,d;Xc(e,1,Gc(null,r,n))}function jc(e,t){var r=t||{};null!=fe&&null==r.dense&&(r.dense=fe);for(var t=Lt(),n=0,a=0;a<e.SheetNames.length;++a)e.SheetNames[a]==r.sheet&&(n=a);if(0==n&&r.sheet&&e.SheetNames[0]!=r.sheet)throw new Error("Sheet not found: "+r.sheet);return Xc(t,9,ca(0,16,r)),function(e,t,r){var n,a,s=Array.isArray(t),i=qt(t["!ref"]||"A1"),o=[];if(255<i.e.c||16383<i.e.r){if(r.WTF)throw new Error("Range "+(t["!ref"]||"A1")+" exceeds format limit A1:IV16384");i.e.c=Math.min(i.e.c,255),i.e.r=Math.min(i.e.c,16383),n=Jt(i)}for(var l=i.s.r;l<=i.e.r;++l){a=zt(l);for(var c=i.s.c;c<=i.e.c;++c){l===i.s.r&&(o[c]=$t(c)),n=o[c]+a;var f=s?(t[l]||[])[c]:t[n];f&&zc(e,f,l,c)}}}(t,e.Sheets[e.SheetNames[n]],r),Xc(t,10),t.end()}function $c(e,t,r){var n,a;Xc(e,"Font",(a=(n={sz:12,color:{theme:1},name:"Arial",family:2,scheme:"minor"}).name||"Arial",(e=Nt((r=(e=r)&&5==e.biff)?15+a.length:16+2*a.length)).write_shift(2,20*(n.sz||12)),e.write_shift(4,0),e.write_shift(2,400),e.write_shift(4,0),e.write_shift(2,0),e.write_shift(1,a.length),r||e.write_shift(1,1),e.write_shift((r?1:2)*a.length,a,r?"sbcs":"utf16le"),e))}function Kc(i,o,l){o&&[[5,8],[23,26],[41,44],[50,392]].forEach(function(e){for(var t,r,n,a,s=e[0];s<=e[1];++s)null!=o[s]&&Xc(i,"Format",(r=o[t=s],a=void 0,n=(n=l)&&5==n.biff,(a=a||Nt(n?3+r.length:5+2*r.length)).write_shift(2,t),a.write_shift(n?1:2,r.length),n||a.write_shift(1,1),a.write_shift((n?1:2)*r.length,r,n?"sbcs":"utf16le"),null==(a=a.length>a.l?a.slice(0,a.l):a).l&&(a.l=a.length),a))})}function Yc(e,t){for(var r=0;r<t["!links"].length;++r){var n=t["!links"][r];Xc(e,"HLink",Ta(n)),n[1].Tooltip&&Xc(e,"HLinkTooltip",function(e){var t=e[1].Tooltip,r=Nt(10+2*(t.length+1));r.write_shift(2,2048),e=Kt(e[0]),r.write_shift(2,e.r),r.write_shift(2,e.r),r.write_shift(2,e.c),r.write_shift(2,e.c);for(var n=0;n<t.length;++n)r.write_shift(2,t.charCodeAt(n));return r.write_shift(2,0),r}(n))}delete t["!links"]}function Qc(e,t,r,n,a){var s,i,o,l,c,f,h,u,d,p,m=16+sl(a.cellXfs,t,a);if(null!=t.v||t.bf)if(t.bf)Xc(e,"Formula",Wo(t,r,n,0,m));else switch(t.t){case"d":case"n":var g="d"==t.t?G(le(t.v)):t.v;Xc(e,"Number",(f=r,h=n,u=g,d=m,g=Nt(14),Zn(f,h,d,g),Tr(u,g),g));break;case"b":case"e":Xc(e,517,ga(r,n,t.v,m,0,t.t));break;case"s":case"str":a.bookSST?(p=rl(a.Strings,t.v,a.revStrings),Xc(e,"LabelSst",(s=r,i=n,o=p,l=m,c=Nt(10),Zn(s,i,l,c),c.write_shift(4,o),c))):Xc(e,"Label",(p=r,s=n,i=t.v,l=m,o=Nt(+(c=!(o=a)||8==o.biff)+8+(1+c)*i.length),Zn(p,s,l,o),o.write_shift(2,i.length),c&&o.write_shift(1,1),o.write_shift((1+c)*i.length,i,c?"utf16le":"sbcs"),o));break;default:Xc(e,"Blank",Zn(r,n,m))}else Xc(e,"Blank",Zn(r,n,m))}function Jc(e,t,r){var n,a,s=Lt(),i=r.SheetNames[e],o=r.Sheets[i]||{},l=(r||{}).Workbook||{},c=(l.Sheets||[])[e]||{},f=Array.isArray(o),h=8==t.biff,u=[],d=qt(o["!ref"]||"A1"),p=h?65536:16384;if(255<d.e.c||d.e.r>=p){if(t.WTF)throw new Error("Range "+(o["!ref"]||"A1")+" exceeds format limit A1:IV16384");d.e.c=Math.min(d.e.c,255),d.e.r=Math.min(d.e.c,p-1)}Xc(s,2057,ca(0,16,t)),Xc(s,"CalcMode",Wn(1)),Xc(s,"CalcCount",Wn(100)),Xc(s,"CalcRefMode",Un(!0)),Xc(s,"CalcIter",Un(!1)),Xc(s,"CalcDelta",Tr(.001)),Xc(s,"CalcSaveRecalc",Un(!0)),Xc(s,"PrintRowCol",Un(!1)),Xc(s,"PrintGrid",Un(!1)),Xc(s,"GridSet",Wn(1)),Xc(s,"Guts",(r=[0,0],(e=Nt(8)).write_shift(4,0),e.write_shift(2,r[0]?r[0]+1:0),e.write_shift(2,r[1]?r[1]+1:0),e)),Xc(s,"HCenter",Un(!1)),Xc(s,"VCenter",Un(!1)),Xc(s,512,(p=d,(r=Nt(2*(e=8!=(r=t).biff&&r.biff?2:4)+6)).write_shift(e,p.s.r),r.write_shift(e,p.e.r+1),r.write_shift(2,p.s.c),r.write_shift(2,p.e.c+1),r.write_shift(2,0),r)),h&&(o["!links"]=[]);for(var m=d.s.r;m<=d.e.r;++m){a=zt(m);for(var g=d.s.c;g<=d.e.c;++g){m===d.s.r&&(u[g]=$t(g)),n=u[g]+a;var b=f?(o[m]||[])[g]:o[n];b&&(Qc(s,b,m,g,t),h&&b.l&&o["!links"].push([n,b.l]))}}var v,E,i=c.CodeName||c.name||i;return h&&Xc(s,"Window2",(l=(l.Views||[])[0],E=Nt(18),v=1718,l&&l.RTL&&(v|=64),E.write_shift(2,v),E.write_shift(4,0),E.write_shift(4,64),E.write_shift(4,0),E.write_shift(4,0),E)),h&&(o["!merges"]||[]).length&&Xc(s,"MergeCells",function(e){var t=Nt(2+8*e.length);t.write_shift(2,e.length);for(var r=0;r<e.length;++r)ra(e[r],t);return t}(o["!merges"])),h&&Yc(s,o),Xc(s,"CodeName",$n(i)),h&&(v=s,E=o,(i=Nt(19)).write_shift(4,2151),i.write_shift(4,0),i.write_shift(4,0),i.write_shift(2,3),i.write_shift(1,1),i.write_shift(4,0),Xc(v,"FeatHdr",i),(i=Nt(39)).write_shift(4,2152),i.write_shift(4,0),i.write_shift(4,0),i.write_shift(2,3),i.write_shift(1,0),i.write_shift(4,0),i.write_shift(2,1),i.write_shift(4,4),i.write_shift(2,0),ra(qt(E["!ref"]||"A1"),i),i.write_shift(4,4),Xc(v,"Feat",i)),Xc(s,"EOF"),s.end()}function qc(e,t,r){var n=Lt(),a=(e||{}).Workbook||{},s=a.Sheets||[],i=a.WBProps||{},o=8==r.biff,a=5==r.biff;Xc(n,2057,ca(0,5,r)),"xla"==r.bookType&&Xc(n,"Addin"),Xc(n,"InterfaceHdr",o?Wn(1200):null),Xc(n,"Mms",function(e,t){t=t||Nt(e);for(var r=0;r<e;++r)t.write_shift(1,0);return t}(2)),a&&Xc(n,"ToolbarHdr"),a&&Xc(n,"ToolbarEnd"),Xc(n,"InterfaceEnd"),Xc(n,"WriteAccess",function(e){var t=!e||8==e.biff,r=Nt(t?112:54);for(r.write_shift(8==e.biff?2:1,7),t&&r.write_shift(1,0),r.write_shift(4,859007059),r.write_shift(4,5458548|(t?0:536870912));r.l<r.length;)r.write_shift(1,t?0:32);return r}(r)),Xc(n,"CodePage",Wn(o?1200:1252)),o&&Xc(n,"DSF",Wn(0)),o&&Xc(n,"Excel9File"),Xc(n,"RRTabId",function(e){for(var t=Nt(2*e),r=0;r<e;++r)t.write_shift(2,r+1);return t}(e.SheetNames.length)),o&&e.vbaraw&&Xc(n,"ObProj"),o&&e.vbaraw&&Xc(n,"CodeName",$n(i.CodeName||"ThisWorkbook")),Xc(n,"BuiltInFnGroupCount",Wn(17)),Xc(n,"WinProtect",Un(!1)),Xc(n,"Protect",Un(!1)),Xc(n,"Password",Wn(0)),o&&Xc(n,"Prot4Rev",Un(!1)),o&&Xc(n,"Prot4RevPass",Wn(0)),Xc(n,"Window1",((a=Nt(18)).write_shift(2,0),a.write_shift(2,0),a.write_shift(2,29280),a.write_shift(2,17600),a.write_shift(2,56),a.write_shift(2,0),a.write_shift(2,0),a.write_shift(2,1),a.write_shift(2,500),a)),Xc(n,"Backup",Un(!1)),Xc(n,"HideObj",Wn(0)),Xc(n,"Date1904",Un("true"==((i=e).Workbook&&i.Workbook.WBProps&&Ne(i.Workbook.WBProps.date1904)?"true":"false"))),Xc(n,"CalcPrecision",Un(!0)),o&&Xc(n,"RefreshAll",Un(!1)),Xc(n,"BookBool",Wn(0)),$c(n,0,r),Kc(n,e.SSF,r),function(t,r){for(var e=0;e<16;++e)Xc(t,"XF",pa({numFmtId:0,style:!0},0,r));r.cellXfs.forEach(function(e){Xc(t,"XF",pa(e,0,r))})}(n,r),o&&Xc(n,"UsesELFs",Un(!1));a=n.end(),i=Lt();o&&Xc(i,"Country",((g=g||Nt(4)).write_shift(2,1),g.write_shift(2,1),g)),o&&r.Strings&&function(e,t,r){var n=void 0||(r||[]).length||0;if(n<=8224)return Xc(e,t,r,n);if(t=+t||+Vc[t],!isNaN(t)){for(var a=r.parts||[],s=0,i=0,o=0;o+(a[s]||8224)<=8224;)o+=a[s]||8224,s++;var l=e.next(4);for(l.write_shift(2,t),l.write_shift(2,o),e.push(r.slice(i,i+o)),i+=o;i<n;){for((l=e.next(4)).write_shift(2,60),o=0;o+(a[s]||8224)<=8224;)o+=a[s]||8224,s++;l.write_shift(2,o),e.push(r.slice(i,i+o)),i+=o}}}(i,"SST",fa(r.Strings)),Xc(i,"EOF");for(var n=i.end(),l=Lt(),c=0,f=0,f=0;f<e.SheetNames.length;++f)c+=(o?12:11)+(o?2:1)*e.SheetNames[f].length;var h,u,d,p,m=a.length+c+n.length;for(f=0;f<e.SheetNames.length;++f)Xc(l,"BoundSheet8",(h={pos:m,hs:(s[f]||{}).Hidden||0,dt:0,name:e.SheetNames[f]},p=d=void 0,d=!(u=r)||8<=u.biff?2:1,(p=Nt(8+d*h.name.length)).write_shift(4,h.pos),p.write_shift(1,h.hs||0),p.write_shift(1,h.dt),p.write_shift(1,h.name.length),8<=u.biff&&p.write_shift(1,1),p.write_shift(d*h.name.length,h.name,u.biff<8?"sbcs":"utf16le"),(u=p.slice(0,p.l)).l=p.l,u)),m+=t[f].length;var g=l.end();if(c!=g.length)throw new Error("BS8 "+c+" != "+g.length);i=[];return a.length&&i.push(a),g.length&&i.push(g),n.length&&i.push(n),nt([i])}function Zc(e,t){var r=t||{};switch(r.biff||2){case 8:case 5:return function(e,t){var r=t||{},n=[];e&&!e.SSF&&(e.SSF=ue.get_table()),e&&e.SSF&&(ae(ue),ue.load_table(e.SSF),r.revssf=B(e.SSF),r.revssf[e.SSF[65535]]=0,r.ssf=e.SSF),r.Strings=[],r.Strings.Count=0,r.Strings.Unique=0,Ff(r),r.cellXfs=[],sl(r.cellXfs,{},{revssf:{General:0}}),e.Props||(e.Props={});for(var a=0;a<e.SheetNames.length;++a)n[n.length]=Jc(a,r,e);return n.unshift(qc(e,n,r)),nt([n])}(e,t);case 4:case 3:case 2:return jc(e,t)}throw new Error("invalid type "+r.bookType+" for BIFF")}var ef,tf,rf={to_workbook:function(e,t){return tr(nf(e,t),t)},to_sheet:nf,_row:af,BEGIN:ef='<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>',END:tf="</body></html>",_preamble:sf,from_sheet:function(e,t){var r=t||{},n=null!=r.header?r.header:ef,t=null!=r.footer?r.footer:tf,a=[n],s=Qt(e["!ref"]);r.dense=Array.isArray(e),a.push(sf(0,0,r));for(var i=s.s.r;i<=s.e.r;++i)a.push(af(e,s,i,r));return a.push("</table>"+t),a.join("")}};function nf(e,t){var r=t||{};null!=fe&&null==r.dense&&(r.dense=fe);var n=r.dense?[]:{},a=(e=e.replace(/<!--.*?-->/g,"")).match(/<table/i);if(!a)throw new Error("Invalid HTML: could not find <table>");for(var s,t=e.match(/<\/table/i),i=a.index,o=t&&t.index||e.length,l=function(e,t,r){if(P||"string"==typeof t)return e.split(t);for(var n=e.split(t),a=[n[0]],s=1;s<n.length;++s)a.push(r),a.push(n[s]);return a}(e.slice(i,o),/(:?<tr[^>]*>)/i,"<tr>"),c=-1,f=0,h={s:{r:1e7,c:1e7},e:{r:0,c:0}},u=[],i=0;i<l.length;++i){var d=l[i].trim(),p=d.slice(0,3).toLowerCase();if("<tr"!=p){if("<td"==p||"<th"==p)for(var m=d.split(/<\/t[dh]>/i),o=0;o<m.length;++o){var g=m[o].trim();if(g.match(/<t[dh]/i)){for(var b=g,v=0;"<"==b.charAt(0)&&-1<(v=b.indexOf(">"));)b=b.slice(v+1);for(var E=0;E<u.length;++E){var S=u[E];S.s.c==f&&S.s.r<c&&c<=S.e.r&&(f=S.e.c+1,E=-1)}var w=Ee(g.slice(0,g.indexOf(">"))),C=w.colspan?+w.colspan:1;(1<(s=+w.rowspan)||1<C)&&u.push({s:{r:c,c:f},e:{r:c+(s||1)-1,c:f+C-1}});g=w.t||"";b.length?(b=Xe(b),h.s.r>c&&(h.s.r=c),h.e.r<c&&(h.e.r=c),h.s.c>f&&(h.s.c=f),h.e.c<f&&(h.e.c=f),b.length&&(w={t:"s",v:b},r.raw||!b.trim().length||"s"==g||("TRUE"===b?w={t:"b",v:!0}:"FALSE"===b?w={t:"b",v:!1}:isNaN(R(b))?isNaN(D(b).getDate())||(w={t:"d",v:le(b)},(w=!r.cellDates?{t:"n",v:G(w.v)}:w).z=r.dateNF||ue._table[14]):w={t:"n",v:R(b)}),r.dense?(n[c]||(n[c]=[]),n[c][f]=w):n[Yt({r:c,c:f})]=w,f+=C)):f+=C}}}else{if(++c,r.sheetRows&&r.sheetRows<=c){--c;break}f=0}}return n["!ref"]=Jt(h),u.length&&(n["!merges"]=u),n}function af(e,t,r,n){for(var a=e["!merges"]||[],s=[],i=t.s.c;i<=t.e.c;++i){for(var o,l,c,f,h=0,u=0,d=0;d<a.length;++d)if(!(a[d].s.r>r||a[d].s.c>i||a[d].e.r<r||a[d].e.c<i)){if(a[d].s.r<r||a[d].s.c<i){h=-1;break}h=a[d].e.r-a[d].s.r+1,u=a[d].e.c-a[d].s.c+1;break}h<0||(o=Yt({r:r,c:i}),c=(l=n.dense?(e[r]||[])[i]:e[o])&&null!=l.v&&(l.h||Re(l.w||(er(l),l.w)||""))||"",f={},1<h&&(f.rowspan=h),1<u&&(f.colspan=u),f.t=l&&l.t||"z",n.editable&&(c='<span contenteditable="true">'+c+"</span>"),f.id=(n.id||"sjs")+"-"+o,"z"!=f.t&&(f.v=l.v,null!=l.z&&(f.z=l.z)),s.push(Je("td",c,f)))}return"<tr>"+s.join("")+"</tr>"}function sf(e,t,r){return[].join("")+"<table"+(r&&r.id?' id="'+r.id+'"':"")+">"}function of(e,t,r){var n=r||{};null!=fe&&(n.dense=fe);var a=0,s=0;null!=n.origin&&("number"==typeof n.origin?a=n.origin:(a=(r="string"==typeof n.origin?Kt(n.origin):n.origin).r,s=r.c));var i=t.getElementsByTagName("tr"),o=Math.min(n.sheetRows||1e7,i.length),l={s:{r:0,c:0},e:{r:a,c:s}};e["!ref"]&&(t=Qt(e["!ref"]),l.s.r=Math.min(l.s.r,t.s.r),l.s.c=Math.min(l.s.c,t.s.c),l.e.r=Math.max(l.e.r,t.e.r),l.e.c=Math.max(l.e.c,t.e.c),-1==a&&(l.e.r=a=t.e.r+1));var c,f,h=[],u=0,d=e["!rows"]||(e["!rows"]=[]),p=0,m=0,g=0,b=0;for(e["!cols"]||(e["!cols"]=[]);p<i.length&&m<o;++p){var v=i[p];if(cf(v)){if(n.display)continue;d[m]={hidden:!0}}for(var E=v.children,g=b=0;g<E.length;++g){var S=E[g];if(!n.display||!cf(S)){for(var w=S.hasAttribute("v")?S.getAttribute("v"):Xe(S.innerHTML),C=S.getAttribute("z"),u=0;u<h.length;++u){var B=h[u];B.s.c==b+s&&B.s.r<m+a&&m+a<=B.e.r&&(b=B.e.c+1-s,u=-1)}f=+S.getAttribute("colspan")||1,(1<(c=+S.getAttribute("rowspan")||1)||1<f)&&h.push({s:{r:m+a,c:b+s},e:{r:m+a+(c||1)-1,c:b+s+(f||1)-1}});var T={t:"s",v:w},S=S.getAttribute("t")||"";null!=w&&(0==w.length?T.t=S||"z":n.raw||0==w.trim().length||"s"==S||("TRUE"===w?T={t:"b",v:!0}:"FALSE"===w?T={t:"b",v:!1}:isNaN(R(w))?isNaN(D(w).getDate())||(T={t:"d",v:le(w)},(T=!n.cellDates?{t:"n",v:G(T.v)}:T).z=n.dateNF||ue._table[14]):T={t:"n",v:R(w)})),void 0===T.z&&null!=C&&(T.z=C),n.dense?(e[m+a]||(e[m+a]=[]),e[m+a][b+s]=T):e[Yt({c:b+s,r:m+a})]=T,l.e.c<b+s&&(l.e.c=b+s),b+=f}}++m}return h.length&&(e["!merges"]=(e["!merges"]||[]).concat(h)),l.e.r=Math.max(l.e.r,m-1+a),e["!ref"]=Jt(l),o<=m&&(e["!fullref"]=Jt((l.e.r=i.length-p+m-1+a,l))),e}function lf(e,t){return of((t||{}).dense?[]:{},e,t)}function cf(e){var t,r="",t=(t=e).ownerDocument.defaultView&&"function"==typeof t.ownerDocument.defaultView.getComputedStyle?t.ownerDocument.defaultView.getComputedStyle:"function"==typeof getComputedStyle?getComputedStyle:null;return"none"===(r=(r=t?t(e).getPropertyValue("display"):r)||e.style.display)}var ff,hf=(ff={day:["d","dd"],month:["m","mm"],year:["y","yy"],hours:["h","hh"],minutes:["m","mm"],seconds:["s","ss"],"am-pm":["A/P","AM/PM"],"day-of-week":["ddd","dddd"],era:["e","ee"],quarter:["\\Qm",'m\\"th quarter"']},function(e,t){var r=t||{};null!=fe&&null==r.dense&&(r.dense=fe);var n,a,s,i,o,l=Cc(e),c=[],f={name:""},h="",u=0,d={},p=[],m=r.dense?[]:{},g={value:""},b="",v=0,E=[],S=-1,w=-1,C={s:{r:1e6,c:1e7},e:{r:0,c:0}},B=0,T={},k=[],x={},_=[],y=1,A=1,I=[],R={Names:[]},F={},D=["",""],O=[],P={},N="",M=0,L=!1,U=!1,H=0;for(Bc.lastIndex=0,l=l.replace(/<!--([\s\S]*?)-->/gm,"").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm,"");i=Bc.exec(l);)switch(i[3]=i[3].replace(/_.*$/,"")){case"table":case"工作表":"/"===i[1]?(C.e.c>=C.s.c&&C.e.r>=C.s.r?m["!ref"]=Jt(C):m["!ref"]="A1:A1",0<r.sheetRows&&r.sheetRows<=C.e.r&&(m["!fullref"]=m["!ref"],C.e.r=r.sheetRows-1,m["!ref"]=Jt(C)),k.length&&(m["!merges"]=k),_.length&&(m["!rows"]=_),s.name=s["名称"]||s.name,"undefined"!=typeof JSON&&JSON.stringify(s),p.push(s.name),d[s.name]=m,U=!1):"/"!==i[0].charAt(i[0].length-2)&&(s=Ee(i[0],!1),S=w=-1,C.s.r=C.s.c=1e7,C.e.r=C.e.c=0,m=r.dense?[]:{},k=[],_=[],U=!0);break;case"table-row-group":"/"===i[1]?--B:++B;break;case"table-row":case"行":if("/"===i[1]){S+=y,y=1;break}if((W=Ee(i[0],!1))["行号"]?S=W["行号"]-1:-1==S&&(S=0),(y=+W["number-rows-repeated"]||1)<10)for(H=0;H<y;++H)0<B&&(_[S+H]={level:B});w=-1;break;case"covered-table-cell":"/"!==i[1]&&++w,r.sheetStubs&&(r.dense?(m[S]||(m[S]=[]),m[S][w]={t:"z"}):m[Yt({r:S,c:w})]={t:"z"}),b="",E=[];break;case"table-cell":case"数据":if("/"===i[0].charAt(i[0].length-2))++w,g=Ee(i[0],!1),A=parseInt(g["number-columns-repeated"]||"1",10),o={t:"z",v:null},g.formula&&0!=r.cellFormula&&(o.f=Jo(ke(g.formula))),"string"==(g["数据类型"]||g["value-type"])&&(o.t="s",o.v=ke(g["string-value"]||""),r.dense?(m[S]||(m[S]=[]),m[S][w]=o):m[Yt({r:S,c:w})]=o),w+=A-1;else if("/"!==i[1]){A=1;var W=y?S+y-1:S;if(++w>C.e.c&&(C.e.c=w),w<C.s.c&&(C.s.c=w),S<C.s.r&&(C.s.r=S),W>C.e.r&&(C.e.r=W),O=[],P={},o={t:(g=Ee(i[0],!1))["数据类型"]||g["value-type"],v:null},r.cellFormula)if(g.formula&&(g.formula=ke(g.formula)),g["number-matrix-columns-spanned"]&&g["number-matrix-rows-spanned"]&&(x={s:{r:S,c:w},e:{r:S+(parseInt(g["number-matrix-rows-spanned"],10)||0)-1,c:w+(parseInt(g["number-matrix-columns-spanned"],10)||0)-1}},o.F=Jt(x),I.push([x,o.F])),g.formula)o.f=Jo(g.formula);else for(H=0;H<I.length;++H)S>=I[H][0].s.r&&S<=I[H][0].e.r&&w>=I[H][0].s.c&&w<=I[H][0].e.c&&(o.F=I[H][1]);switch((g["number-columns-spanned"]||g["number-rows-spanned"])&&(x={s:{r:S,c:w},e:{r:S+(parseInt(g["number-rows-spanned"],10)||0)-1,c:w+(parseInt(g["number-columns-spanned"],10)||0)-1}},k.push(x)),g["number-columns-repeated"]&&(A=parseInt(g["number-columns-repeated"],10)),o.t){case"boolean":o.t="b",o.v=Ne(g["boolean-value"]);break;case"float":case"percentage":case"currency":o.t="n",o.v=parseFloat(g.value);break;case"date":o.t="d",o.v=le(g["date-value"]),r.cellDates||(o.t="n",o.v=G(o.v)),o.z="m/d/yy";break;case"time":o.t="n",o.v=function(e){var t=0,r=0,n=!1,a=e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);if(!a)throw new Error("|"+e+"| is not an ISO8601 Duration");for(var s=1;s!=a.length;++s)if(a[s]){switch(r=1,3<s&&(n=!0),a[s].slice(a[s].length-1)){case"Y":throw new Error("Unsupported ISO Duration Field: "+a[s].slice(a[s].length-1));case"D":r*=24;case"H":r*=60;case"M":if(!n)throw new Error("Unsupported ISO Duration Field: M");r*=60}t+=r*parseInt(a[s],10)}return t}(g["time-value"])/86400;break;case"number":o.t="n",o.v=parseFloat(g["数据数值"]);break;default:if("string"!==o.t&&"text"!==o.t&&o.t)throw new Error("Unsupported value type "+o.t);o.t="s",null!=g["string-value"]&&(b=ke(g["string-value"]),E=[])}}else{if(L=!1,"s"===o.t&&(o.v=b||"",E.length&&(o.R=E),L=0==v),F.Target&&(o.l=F),0<O.length&&(o.c=O,O=[]),b&&!1!==r.cellText&&(o.w=b),L&&(o.t="z",delete o.v),(!L||r.sheetStubs)&&!(r.sheetRows&&r.sheetRows<=S))for(var V=0;V<y;++V){if(A=parseInt(g["number-columns-repeated"]||"1",10),r.dense)for(m[S+V]||(m[S+V]=[]),m[S+V][w]=0==V?o:pe(o);0<--A;)m[S+V][w+A]=pe(o);else for(m[Yt({r:S+V,c:w})]=o;0<--A;)m[Yt({r:S+V,c:w+A})]=pe(o);C.e.c<=w&&(C.e.c=w)}w+=(A=parseInt(g["number-columns-repeated"]||"1",10))-1,A=0,o={},b="",E=[]}F={};break;case"document":case"document-content":case"电子表格文档":case"spreadsheet":case"主体":case"scripts":case"styles":case"font-face-decls":case"master-styles":if("/"===i[1]){if((n=c.pop())[0]!==i[3])throw"Bad state: "+n}else"/"!==i[0].charAt(i[0].length-2)&&c.push([i[3],!0]);break;case"annotation":if("/"===i[1]){if((n=c.pop())[0]!==i[3])throw"Bad state: "+n;P.t=b,E.length&&(P.R=E),P.a=N,O.push(P)}else"/"!==i[0].charAt(i[0].length-2)&&c.push([i[3],!1]);b=N="",v=M=0,E=[];break;case"creator":"/"===i[1]?N=l.slice(M,i.index):M=i.index+i[0].length;break;case"meta":case"元数据":case"settings":case"config-item-set":case"config-item-map-indexed":case"config-item-map-entry":case"config-item-map-named":case"shapes":case"frame":case"text-box":case"image":case"data-pilot-tables":case"list-style":case"form":case"dde-links":case"event-listeners":case"chart":if("/"===i[1]){if((n=c.pop())[0]!==i[3])throw"Bad state: "+n}else"/"!==i[0].charAt(i[0].length-2)&&c.push([i[3],!1]);b="",v=0,E=[];break;case"scientific-number":case"currency-symbol":case"currency-style":break;case"number-style":case"percentage-style":case"date-style":case"time-style":if("/"===i[1]){if(T[f.name]=h,(n=c.pop())[0]!==i[3])throw"Bad state: "+n}else"/"!==i[0].charAt(i[0].length-2)&&(h="",f=Ee(i[0],!1),c.push([i[3],!0]));break;case"script":case"libraries":case"automatic-styles":break;case"default-style":case"page-layout":case"style":case"map":case"font-face":case"paragraph-properties":case"table-properties":case"table-column-properties":case"table-row-properties":case"table-cell-properties":break;case"number":switch(c[c.length-1][0]){case"time-style":case"date-style":a=Ee(i[0],!1),h+=ff[i[3]]["long"===a.style?1:0]}break;case"fraction":break;case"day":case"month":case"year":case"era":case"day-of-week":case"week-of-year":case"quarter":case"hours":case"minutes":case"seconds":case"am-pm":switch(c[c.length-1][0]){case"time-style":case"date-style":a=Ee(i[0],!1),h+=ff[i[3]]["long"===a.style?1:0]}break;case"boolean-style":case"boolean":case"text-style":break;case"text":if("/>"===i[0].slice(-2))break;if("/"===i[1])switch(c[c.length-1][0]){case"number-style":case"date-style":case"time-style":h+=l.slice(u,i.index)}else u=i.index+i[0].length;break;case"named-range":D=qo((a=Ee(i[0],!1))["cell-range-address"]);var X={Name:a.name,Ref:D[0]+"!"+D[1]};U&&(X.Sheet=p.length),R.Names.push(X);break;case"text-content":case"text-properties":case"embedded-text":break;case"body":case"电子表格":case"forms":case"table-column":case"table-header-rows":case"table-rows":case"table-column-group":case"table-header-columns":case"table-columns":case"null-date":case"graphic-properties":case"calculation-settings":case"named-expressions":case"label-range":case"label-ranges":case"named-expression":case"sort":case"sort-by":case"sort-groups":case"tab":case"line-break":case"span":break;case"p":case"文本串":if(-1<["master-styles"].indexOf(c[c.length-1][0]))break;"/"!==i[1]||g&&g["string-value"]?(Ee(i[0],!1),v=i.index+i[0].length):(X=function(e){e=e.replace(/[\t\r\n]/g," ").trim().replace(/ +/g," ").replace(/<text:s\/>/g," ").replace(/<text:s text:c="(\d+)"\/>/g,function(e,t){return Array(parseInt(t,10)+1).join(" ")}).replace(/<text:tab[^>]*\/>/g,"\t").replace(/<text:line-break\/>/g,"\n");return[ke(e.replace(/<[^>]*>/g,""))]}(l.slice(v,i.index)),b=(0<b.length?b+"\n":"")+X[0]);break;case"s":break;case"database-range":if("/"===i[1])break;try{d[(D=qo(Ee(i[0])["target-range-address"]))[0]]["!autofilter"]={ref:D[1]}}catch(e){}break;case"date":case"object":break;case"title":case"标题":case"desc":case"binary-data":case"table-source":case"scenario":case"iteration":case"content-validations":case"content-validation":case"help-message":case"error-message":case"database-ranges":case"filter":case"filter-and":case"filter-or":case"filter-condition":case"list-level-style-bullet":case"list-level-style-number":case"list-level-properties":break;case"sender-firstname":case"sender-lastname":case"sender-initials":case"sender-title":case"sender-position":case"sender-email":case"sender-phone-private":case"sender-fax":case"sender-company":case"sender-phone-work":case"sender-street":case"sender-city":case"sender-postal-code":case"sender-country":case"sender-state-or-province":case"author-name":case"author-initials":case"chapter":case"file-name":case"template-name":case"sheet-name":case"event-listener":break;case"initial-creator":case"creation-date":case"print-date":case"generator":case"document-statistic":case"user-defined":case"editing-duration":case"editing-cycles":case"config-item":case"page-number":case"page-count":case"time":case"cell-range-source":case"detective":case"operation":case"highlighted-range":break;case"data-pilot-table":case"source-cell-range":case"source-service":case"data-pilot-field":case"data-pilot-level":case"data-pilot-subtotals":case"data-pilot-subtotal":case"data-pilot-members":case"data-pilot-member":case"data-pilot-display-info":case"data-pilot-sort-info":case"data-pilot-layout-info":case"data-pilot-field-reference":case"data-pilot-groups":case"data-pilot-group":case"data-pilot-group-member":case"rect":break;case"dde-connection-decls":case"dde-connection-decl":case"dde-link":case"dde-source":case"properties":case"property":break;case"a":if("/"!==i[1]){if(!(F=Ee(i[0],!1)).href)break;F.Target=F.href,delete F.href,"#"==F.Target.charAt(0)&&-1<F.Target.indexOf(".")&&(D=qo(F.Target.slice(1)),F.Target="#"+D[0]+"!"+D[1])}break;case"table-protection":case"data-pilot-grand-total":case"office-document-common-attrs":break;default:switch(i[2]){case"dc:":case"calcext:":case"loext:":case"ooo:":case"chartooo:":case"draw:":case"style:":case"chart:":case"form:":case"uof:":case"表:":case"字:":break;default:if(r.WTF)throw new Error(i)}}e={Sheets:d,SheetNames:p,Workbook:R};return r.bookSheets&&delete e.Sheets,e});function uf(e,t){t=t||{};var r=!!U(e,"objectdata");r&&function(e,t){for(var r,n,a=Cc(e);r=Bc.exec(a);)switch(r[3]){case"manifest":break;case"file-entry":if("/"==(n=Ee(r[0],!1)).path&&n.type!==nn)throw new Error("This OpenDocument is not a spreadsheet");break;case"encryption-data":case"algorithm":case"start-key-generation":case"key-derivation":throw new Error("Unsupported ODS Encryption");default:if(t&&t.WTF)throw r}}(W(e,"META-INF/manifest.xml"),t);var n=V(e,"content.xml");if(!n)throw new Error("Missing content.xml in "+(r?"ODS":"UOF")+" file");t=hf(r?n:Me(n),t);return U(e,"meta.xml")&&(t.Props=fn(W(e,"meta.xml"))),t}function df(e,t){return hf(e,t)}var pf,mf,gf=(pf="<office:document-styles "+Qe({"xmlns:office":"urn:oasis:names:tc:opendocument:xmlns:office:1.0","xmlns:table":"urn:oasis:names:tc:opendocument:xmlns:table:1.0","xmlns:style":"urn:oasis:names:tc:opendocument:xmlns:style:1.0","xmlns:text":"urn:oasis:names:tc:opendocument:xmlns:text:1.0","xmlns:draw":"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","xmlns:fo":"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0","xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:number":"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0","xmlns:svg":"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","xmlns:of":"urn:oasis:names:tc:opendocument:xmlns:of:1.2","office:version":"1.2"})+"></office:document-styles>",function(){return K+pf}),bf=function(e,t){var r=[K],n=Qe({"xmlns:office":"urn:oasis:names:tc:opendocument:xmlns:office:1.0","xmlns:table":"urn:oasis:names:tc:opendocument:xmlns:table:1.0","xmlns:style":"urn:oasis:names:tc:opendocument:xmlns:style:1.0","xmlns:text":"urn:oasis:names:tc:opendocument:xmlns:text:1.0","xmlns:draw":"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","xmlns:fo":"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0","xmlns:xlink":"http://www.w3.org/1999/xlink","xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:meta":"urn:oasis:names:tc:opendocument:xmlns:meta:1.0","xmlns:number":"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0","xmlns:presentation":"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0","xmlns:svg":"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","xmlns:chart":"urn:oasis:names:tc:opendocument:xmlns:chart:1.0","xmlns:dr3d":"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0","xmlns:math":"http://www.w3.org/1998/Math/MathML","xmlns:form":"urn:oasis:names:tc:opendocument:xmlns:form:1.0","xmlns:script":"urn:oasis:names:tc:opendocument:xmlns:script:1.0","xmlns:ooo":"http://openoffice.org/2004/office","xmlns:ooow":"http://openoffice.org/2004/writer","xmlns:oooc":"http://openoffice.org/2004/calc","xmlns:dom":"http://www.w3.org/2001/xml-events","xmlns:xforms":"http://www.w3.org/2002/xforms","xmlns:xsd":"http://www.w3.org/2001/XMLSchema","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","xmlns:sheet":"urn:oasis:names:tc:opendocument:sh33tjs:1.0","xmlns:rpt":"http://openoffice.org/2005/report","xmlns:of":"urn:oasis:names:tc:opendocument:xmlns:of:1.2","xmlns:xhtml":"http://www.w3.org/1999/xhtml","xmlns:grddl":"http://www.w3.org/2003/g/data-view#","xmlns:tableooo":"http://openoffice.org/2009/table","xmlns:drawooo":"http://openoffice.org/2010/draw","xmlns:calcext":"urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0","xmlns:loext":"urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0","xmlns:field":"urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0","xmlns:formx":"urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0","xmlns:css3t":"http://www.w3.org/TR/css3-text/","office:version":"1.2"}),a=Qe({"xmlns:config":"urn:oasis:names:tc:opendocument:xmlns:config:1.0","office:mimetype":"application/vnd.oasis.opendocument.spreadsheet"});"fods"==t.bookType?r.push("<office:document"+n+a+">\n"):r.push("<office:document-content"+n+">\n"),(n=r).push(" <office:automatic-styles>\n"),n.push('  <number:date-style style:name="N37" number:automatic-order="true">\n'),n.push('   <number:month number:style="long"/>\n'),n.push("   <number:text>/</number:text>\n"),n.push('   <number:day number:style="long"/>\n'),n.push("   <number:text>/</number:text>\n"),n.push("   <number:year/>\n"),n.push("  </number:date-style>\n"),n.push('  <style:style style:name="ta1" style:family="table">\n'),n.push('   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>\n'),n.push("  </style:style>\n"),n.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n'),n.push(" </office:automatic-styles>\n"),r.push("  <office:body>\n"),r.push("    <office:spreadsheet>\n");for(var s=0;s!=e.SheetNames.length;++s)r.push(vf(e.Sheets[e.SheetNames[s]],e,s));return r.push("    </office:spreadsheet>\n"),r.push("  </office:body>\n"),"fods"==t.bookType?r.push("</office:document>"):r.push("</office:document-content>"),r.join("")};function vf(e,t,r){var n=[];n.push('      <table:table table:name="'+ye(t.SheetNames[r])+'" table:style-name="ta1">\n');for(var a=0,s=0,i=Qt(e["!ref"]),o=e["!merges"]||[],l=0,c=Array.isArray(e),a=0;a<i.s.r;++a)n.push("        <table:table-row></table:table-row>\n");for(;a<=i.e.r;++a){for(n.push("        <table:table-row>\n"),s=0;s<i.s.c;++s)n.push(mf);for(;s<=i.e.c;++s){for(var f=!1,h={},u="",l=0;l!=o.length;++l)if(!(o[l].s.c>s||o[l].s.r>a||o[l].e.c<s||o[l].e.r<a)){o[l].s.c==s&&o[l].s.r==a||(f=!0),h["table:number-columns-spanned"]=o[l].e.c-o[l].s.c+1,h["table:number-rows-spanned"]=o[l].e.r-o[l].s.r+1;break}if(f)n.push("          <table:covered-table-cell/>\n");else{var d=Yt({r:a,c:s}),p=c?(e[a]||[])[s]:e[d];if(p&&p.f&&(h["table:formula"]=ye(("of:="+p.f.replace(so,"$1[.$2$3$4$5]").replace(/\]:\[/g,":")).replace(/;/g,"|").replace(/,/g,";")),p.F&&p.F.slice(0,d.length)==d&&(m=Qt(p.F),h["table:number-matrix-columns-spanned"]=m.e.c-m.s.c+1,h["table:number-matrix-rows-spanned"]=m.e.r-m.s.r+1)),p){switch(p.t){case"b":u=p.v?"TRUE":"FALSE",h["office:value-type"]="boolean",h["office:boolean-value"]=p.v?"true":"false";break;case"n":u=p.w||String(p.v||0),h["office:value-type"]="float",h["office:value"]=p.v||0;break;case"s":case"str":u=null==p.v?"":p.v,h["office:value-type"]="string";break;case"d":u=p.w||le(p.v).toISOString(),h["office:value-type"]="date",h["office:date-value"]=le(p.v).toISOString(),h["table:style-name"]="ce1";break;default:n.push(mf);continue}var m,d=ye(u).replace(/  +/g,function(e){return'<text:s text:c="'+e.length+'"/>'}).replace(/\t/g,"<text:tab/>").replace(/\n/g,"<text:line-break/>").replace(/^ /,"<text:s/>").replace(/ $/,"<text:s/>");p.l&&p.l.Target&&(d=Je("text:a",d,{"xlink:href":m="#"==(m=p.l.Target).charAt(0)?"#"+m.slice(1).replace(/\./,"!"):m})),n.push("          "+Je("table:table-cell",Je("text:p",d,{}),h)+"\n")}else n.push(mf)}}n.push("        </table:table-row>\n")}return n.push("      </table:table>\n"),n.join("")}function Ef(e,t){if("fods"==t.bookType)return bf(e,t);var r=z(),n=[],a=[];return X(r,"mimetype","application/vnd.oasis.opendocument.spreadsheet"),X(r,"content.xml",bf(e,t)),n.push(["content.xml","text/xml"]),a.push(["content.xml","ContentFile"]),X(r,"styles.xml",gf(e,t)),n.push(["styles.xml","text/xml"]),a.push(["styles.xml","StylesFile"]),X(r,"meta.xml",on()),n.push(["meta.xml","text/xml"]),a.push(["meta.xml","MetadataFile"]),X(r,"manifest.rdf",function(e){var t=[K];t.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');for(var r=0;r!=e.length;++r)t.push(an(e[r][0],e[r][1])),t.push(['  <rdf:Description rdf:about="">\n','    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="'+e[r][0]+'"/>\n',"  </rdf:Description>\n"].join(""));return t.push(an("","Document","pkg")),t.push("</rdf:RDF>"),t.join("")}(a)),n.push(["manifest.rdf","application/rdf+xml"]),X(r,"META-INF/manifest.xml",function(e){var t=[K];t.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n'),t.push('  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n');for(var r=0;r<e.length;++r)t.push('  <manifest:file-entry manifest:full-path="'+e[r][0]+'" manifest:media-type="'+e[r][1]+'"/>\n');return t.push("</manifest:manifest>"),t.join("")}(n)),r}function Sf(n){return function(e,t){var r=function(e,t){if(!t)return 0;if(-1==(e=e.SheetNames.indexOf(t)))throw new Error("Sheet not found: "+t);return e}(e,t.sheet);return n.from_sheet(e.Sheets[e.SheetNames[r]],t,e)}}var wf=Sf(rf),Cf=Sf({from_sheet:th}),Bf=Sf(void 0!==La?La:{}),Tf=Sf(void 0!==Wa?Wa:{}),kf=Sf(void 0!==ts?ts:{}),xf=Sf(void 0!==Ys?Ys:{}),_f=Sf({from_sheet:rh}),yf=Sf(void 0!==Fa?Fa:{}),Af=Sf(void 0!==Qa?Qa:{});function If(n){return function(e){for(var t=0;t!=n.length;++t){var r=n[t];void 0===e[r[0]]&&(e[r[0]]=r[1]),"n"===r[2]&&(e[r[0]]=Number(e[r[0]]))}}}var Rf=function(e){If([["cellNF",!1],["cellHTML",!0],["cellFormula",!0],["cellStyles",!1],["cellText",!0],["cellDates",!1],["sheetStubs",!1],["sheetRows",0,"n"],["bookDeps",!1],["bookSheets",!1],["bookProps",!1],["bookFiles",!1],["bookVBA",!1],["password",""],["WTF",!1]])(e)},Ff=If([["cellDates",!(mf="          <table:table-cell />\n")],["bookSST",!1],["bookType","xlsx"],["compression",!1],["WTF",!1]]);function Df(t,e){if(!t)return 0;try{t=e.map(function(e){return e.id||(e.id=e.strRelID),[e.name,t["!id"][e.id].Target,(e=t["!id"][e.id].Type,-1<Qr.WS.indexOf(e)?"sheet":Qr.CS&&e==Qr.CS?"chart":Qr.DS&&e==Qr.DS?"dialog":Qr.MS&&e==Qr.MS?"macro":e&&e.length?e:"sheet")]})}catch(e){return null}return t&&0!==t.length?t:null}function Of(t,r,e,i,n,o,a,s,l,c,f,h){try{o[i]=qr(V(t,e,!0),r);var u=W(t,r);switch(s){case"sheet":g=lc(u,r,n,l,o[i],c,f,h);break;case"chart":if(!(g=cc(u,r,n,l,o[i],c))||!g["!drawel"])break;var d=j(g["!drawel"].Target,r),p=Jr(d),m=j((m=V(t,d,!0),p=qr(V(t,p,!0),d),m?(m=(m.match(/<c:chart [^>]*r:id="([^"]*)"/)||["",""])[1],p["!id"][m].Target):"??"),d),d=Jr(m),g=zl(V(t,m,!0),0,0,qr(V(t,d,!0),m),0,g);break;case"macro":v=r,o[i],v.slice(-4),g={"!type":"macro"};break;case"dialog":v=r,o[i],v.slice(-4),g={"!type":"dialog"};break;default:throw new Error("Unrecognized sheet type "+s)}a[i]=g;var b;o&&o[i]&&de(o[i]).forEach(function(e){var n,a,s;o[i][e].Type==Qr.CMNT&&(e=j(o[i][e].Target,r),(b=uc(W(t,e,!0),e,l))&&b.length&&(n=g,e=b,s=Array.isArray(n),e.forEach(function(e){var t=Kt(e.ref);(a=s?(n[t.r]||(n[t.r]=[]),n[t.r][t.c]):n[e.ref])||(a={t:"z"},s?n[t.r][t.c]=a:n[e.ref]=a,(r=qt(n["!ref"]||"BDWGO1000001:A1")).s.r>t.r&&(r.s.r=t.r),r.e.r<t.r&&(r.e.r=t.r),r.s.c>t.c&&(r.s.c=t.c),r.e.c<t.c&&(r.e.c=t.c),(r=Jt(r))!==n["!ref"]&&(n["!ref"]=r)),a.c||(a.c=[]);var r={a:e.author,t:e.t,r:e.r};e.h&&(r.h=e.h),a.c.push(r)})))})}catch(e){if(l.WTF)throw e}var v,m}function Pf(e){return"/"==e.charAt(0)?e.slice(1):e}function Nf(t,r){if(ae(ue),Rf(r=r||{}),U(t,"META-INF/manifest.xml"))return uf(t,r);if(U(t,"objectdata.xml"))return uf(t,r);if(U(t,"Index/Document.iwa"))throw new Error("Unsupported NUMBERS file");var e,n=function(e){for(var t=e.FullPaths||de(e.files),r=[],n=0;n<t.length;++n)"/"!=t[n].slice(-1)&&r.push(t[n]);return r.sort()}(t),a=function(e){var r=jr();if(!e||!e.match)return r;var n={};if((e.match(ge)||[]).forEach(function(e){var t=Ee(e);switch(t[0].replace(be,"<")){case"<?xml":break;case"<Types":r.xmlns=t["xmlns"+(t[0].match(/<(\w+):/)||["",""])[1]];break;case"<Default":n[t.Extension]=t.ContentType;break;case"<Override":void 0!==r[Xr[t.ContentType]]&&r[Xr[t.ContentType]].push(t.PartName)}}),r.xmlns!==Ze.CT)throw new Error("Unknown Namespace: "+r.xmlns);return r.calcchain=0<r.calcchains.length?r.calcchains[0]:"",r.sst=0<r.strs.length?r.strs[0]:"",r.style=0<r.styles.length?r.styles[0]:"",r.defaults=n,delete r.calcchains,r}(V(t,"[Content_Types].xml")),s=!1;if(0===a.workbooks.length&&W(t,d="xl/workbook.xml",!0)&&a.workbooks.push(d),0===a.workbooks.length){if(!W(t,d="xl/workbook.bin",!0))throw new Error("Could not find workbook");a.workbooks.push(d),s=!0}"bin"==a.workbooks[0].slice(-3)&&(s=!0);var i={},o={};if(!r.bookSheets&&!r.bookProps){if(Zo=[],a.sst)try{Zo=hc(W(t,Pf(a.sst)),a.sst,r)}catch(e){if(r.WTF)throw e}r.cellStyles&&a.themes.length&&(p=V(t,a.themes[0].replace(/^\//,""),!0)||"",a.themes[0],i=zi(p,r)),a.style&&(o=fc(W(t,Pf(a.style)),a.style,i,r))}a.links.map(function(e){try{qr(V(t,Jr(Pf(e))),e);return pc(W(t,Pf(e)),0,e,r)}catch(e){}});var l,c,f,h=oc(W(t,Pf(a.workbooks[0])),a.workbooks[0],r),u={},d="";a.coreprops.length&&((d=W(t,Pf(a.coreprops[0]),!0))&&(u=fn(d)),0!==a.extprops.length&&(d=W(t,Pf(a.extprops[0]),!0))&&(m=r,f={},c=(c=u)||{},l=Me(l=d),dn.forEach(function(e){var t=(l.match(Ve(e[0]))||[])[1];switch(e[2]){case"string":t&&(c[e[1]]=ke(t));break;case"bool":c[e[1]]="true"===t;break;case"raw":var r=l.match(new RegExp("<"+e[0]+"[^>]*>([\\s\\S]*?)</"+e[0]+">"));r&&0<r.length&&(f[e[1]]=r[1])}}),f.HeadingPairs&&f.TitlesOfParts&&pn(f.HeadingPairs,f.TitlesOfParts,c,m)));var p={};r.bookSheets&&!r.bookProps||0!==a.custprops.length&&(d=V(t,Pf(a.custprops[0]),!0))&&(p=function(e,t){var r={},n="",a=e.match(gn);if(a)for(var s=0;s!=a.length;++s){var i=a[s],o=Ee(i);switch(o[0]){case"<?xml":case"<Properties":break;case"<property":n=ke(o.name);break;case"</property>":n=null;break;default:if(0===i.indexOf("<vt:")){var l=i.split(">"),c=l[0].slice(4),f=l[1];switch(c){case"lpstr":case"bstr":case"lpwstr":r[n]=ke(f);break;case"bool":r[n]=Ne(f);break;case"i1":case"i2":case"i4":case"i8":case"int":case"uint":r[n]=parseInt(f,10);break;case"r4":case"r8":case"decimal":r[n]=parseFloat(f);break;case"filetime":case"date":r[n]=le(f);break;case"cy":case"error":r[n]=ke(f);break;default:if("/"==c.slice(-1))break;t.WTF&&"undefined"!=typeof console&&console.warn("Unexpected",i,c,l)}}else if("</"!==i.slice(0,2)&&t.WTF)throw new Error(i)}}return r}(d,r));var m={};if((r.bookSheets||r.bookProps)&&(h.Sheets?e=h.Sheets.map(function(e){return e.name}):u.Worksheets&&0<u.SheetNames.length&&(e=u.SheetNames),r.bookProps&&(m.Props=u,m.Custprops=p),r.bookSheets&&void 0!==e&&(m.SheetNames=e),r.bookSheets?m.SheetNames:r.bookProps))return m;e={};d={};r.bookDeps&&a.calcchain&&(d=dc(W(t,Pf(a.calcchain)),a.calcchain));var g,b,v=0,E={},S=h.Sheets;u.Worksheets=S.length,u.SheetNames=[];for(var w=0;w!=S.length;++w)u.SheetNames[w]=S[w].name;var C=s?"bin":"xml",s=a.workbooks[0].lastIndexOf("/"),B=(a.workbooks[0].slice(0,s+1)+"_rels/"+a.workbooks[0].slice(s+1)+".rels").replace(/^\//,"");U(t,B)||(B="xl/_rels/workbook."+C+".rels");var T=(T=qr(V(t,B,!0),B))&&Df(T,h.Sheets),k=W(t,"xl/worksheets/sheet.xml",!0)?1:0;e:for(v=0;v!=u.Worksheets;++v){var x="sheet";if(T&&T[v]?(g="xl/"+T[v][1].replace(/[\/]?xl\//,""),U(t,g)||(g=T[v][1]),U(t,g)||(g=B.replace(/_rels\/.*$/,"")+T[v][1]),x=T[v][2]):g=(g="xl/worksheets/sheet"+(v+1-k)+"."+C).replace(/sheet0\./,"sheet."),b=g.replace(/^(.*)(\/)([^\/]*)$/,"$1/_rels/$3.rels"),r&&null!=r.sheets)switch(typeof r.sheets){case"number":if(v!=r.sheets)continue e;break;case"string":if(u.SheetNames[v].toLowerCase()!=r.sheets.toLowerCase())continue e;break;default:if(Array.isArray&&Array.isArray(r.sheets)){for(var _=!1,y=0;y!=r.sheets.length;++y)"number"==typeof r.sheets[y]&&r.sheets[y]==v&&(_=1),"string"==typeof r.sheets[y]&&r.sheets[y].toLowerCase()==u.SheetNames[v].toLowerCase()&&(_=1);if(!_)continue e}}Of(t,g,b,u.SheetNames[v],v,E,e,x,r,h,i,o)}return m={Directory:a,Workbook:h,Props:u,Custprops:p,Deps:d,Sheets:e,SheetNames:u.SheetNames,Strings:Zo,Styles:o,Themes:i,SSF:ue.get_table()},r&&r.bookFiles&&(m.keys=n,m.files=t.files),r&&r.bookVBA&&(0<a.vba.length?m.vbaraw=W(t,Pf(a.vba[0]),!0):a.defaults&&a.defaults.bin===Zi&&(m.vbaraw=W(t,"xl/vbaProject.bin",!0))),m}function Mf(e,t){var r,n=t||{},a="Workbook",s=oe.find(e,a);try{if(a="/!DataSpaces/Version",!(s=oe.find(e,a))||!s.content)throw new Error("ECMA-376 Encrypted file missing "+a);if(i=s.content,(r={}).id=i.read_shift(0,"lpp4"),r.R=Ps(i,4),r.U=Ps(i,4),r.W=Ps(i,4),a="/!DataSpaces/DataSpaceMap",!(s=oe.find(e,a))||!s.content)throw new Error("ECMA-376 Encrypted file missing "+a);var i=Ns(s.content);if(1!==i.length||1!==i[0].comps.length||0!==i[0].comps[0].t||"StrongEncryptionDataSpace"!==i[0].name||"EncryptedPackage"!==i[0].comps[0].v)throw new Error("ECMA-376 Encrypted file bad "+a);if(a="/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace",!(s=oe.find(e,a))||!s.content)throw new Error("ECMA-376 Encrypted file missing "+a);i=function(e){var t=[];e.l+=4;for(var r=e.read_shift(4);0<r--;)t.push(e.read_shift(0,"lpp4"));return t}(s.content);if(1!=i.length||"StrongEncryptionTransform"!=i[0])throw new Error("ECMA-376 Encrypted file bad "+a);if(a="/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary",!(s=oe.find(e,a))||!s.content)throw new Error("ECMA-376 Encrypted file missing "+a);Ms(s.content)}catch(e){}if(a="/EncryptionInfo",!(s=oe.find(e,a))||!s.content)throw new Error("ECMA-376 Encrypted file missing "+a);t=Hs(s.content),a="/EncryptedPackage";if(!(s=oe.find(e,a))||!s.content)throw new Error("ECMA-376 Encrypted file missing "+a);if(4==t[0]&&"undefined"!=typeof decrypt_agile)return decrypt_agile(t[1],s.content,n.password||"",n);if(2==t[0]&&"undefined"!=typeof decrypt_std76)return decrypt_std76(t[1],s.content,n.password||"",n);throw new Error("File is password-protected")}function Lf(e,t){if(Yi=1024,"ods"==t.bookType)return Ef(e,t);e&&!e.SSF&&(e.SSF=ue.get_table()),e&&e.SSF&&(ae(ue),ue.load_table(e.SSF),t.revssf=B(e.SSF),t.revssf[e.SSF[65535]]=0,t.ssf=e.SSF),t.rels={},t.wbrels={},t.Strings=[],t.Strings.Count=0,t.Strings.Unique=0,tl?t.revStrings=new Map:(t.revStrings={},t.revStrings.foo=[],delete t.revStrings.foo);var r="xlsb"==t.bookType?"bin":"xml",n=-1<eo.indexOf(t.bookType),a=jr();Ff(t=t||{});var s,i,o,l,c,f,h=z(),u="",d=0;if(t.cellXfs=[],sl(t.cellXfs,{},{revssf:{General:0}}),e.Props||(e.Props={}),u="docProps/core.xml",X(h,u,function(e,t){var r=t||{},n=[K,hn],a={};if(!e&&!r.Props)return n.join("");e&&(null!=e.CreatedDate&&un("dcterms:created","string"==typeof e.CreatedDate?e.CreatedDate:qe(e.CreatedDate,r.WTF),{"xsi:type":"dcterms:W3CDTF"},n,a),null!=e.ModifiedDate&&un("dcterms:modified","string"==typeof e.ModifiedDate?e.ModifiedDate:qe(e.ModifiedDate,r.WTF),{"xsi:type":"dcterms:W3CDTF"},n,a));for(var s=0;s!=ln.length;++s){var i=ln[s],o=r.Props&&null!=r.Props[i[1]]?r.Props[i[1]]:e?e[i[1]]:null;!0===o?o="1":!1===o?o="0":"number"==typeof o&&(o=String(o)),null!=o&&un(i[0],o,null,n,a)}return 2<n.length&&(n[n.length]="</cp:coreProperties>",n[1]=n[1].replace("/>",">")),n.join("")}(e.Props,t)),a.coreprops.push(u),rn(t.rels,2,u,Qr.CORE_PROPS),u="docProps/app.xml",!e.Props||!e.Props.SheetNames)if(e.Workbook&&e.Workbook.Sheets){for(var p=[],m=0;m<e.SheetNames.length;++m)2!=(e.Workbook.Sheets[m]||{}).Hidden&&p.push(e.SheetNames[m]);e.Props.SheetNames=p}else e.Props.SheetNames=e.SheetNames;for(e.Props.Worksheets=e.Props.SheetNames.length,X(h,u,(s=e.Props,i=[],o=Je,(s=s||{}).Application="SheetJS",i[i.length]=K,i[i.length]=mn,dn.forEach(function(e){if(void 0!==s[e[1]]){var t;switch(e[2]){case"string":t=ye(String(s[e[1]]));break;case"bool":t=s[e[1]]?"true":"false"}void 0!==t&&(i[i.length]=o(e[0],t))}}),i[i.length]=o("HeadingPairs",o("vt:vector",o("vt:variant","<vt:lpstr>Worksheets</vt:lpstr>")+o("vt:variant",o("vt:i4",String(s.Worksheets))),{size:2,baseType:"variant"})),i[i.length]=o("TitlesOfParts",o("vt:vector",s.SheetNames.map(function(e){return"<vt:lpstr>"+ye(e)+"</vt:lpstr>"}).join(""),{size:s.Worksheets,baseType:"lpstr"})),2<i.length&&(i[i.length]="</Properties>",i[1]=i[1].replace("/>",">")),i.join(""))),a.extprops.push(u),rn(t.rels,3,u,Qr.EXT_PROPS),e.Custprops!==e.Props&&0<de(e.Custprops||{}).length&&(X(h,u="docProps/custom.xml",vn(e.Custprops)),a.custprops.push(u),rn(t.rels,4,u,Qr.CUST_PROPS)),d=1;d<=e.SheetNames.length;++d){var g,b,v,E={"!id":{}},S=e.Sheets[e.SheetNames[d-1]];X(h,u="xl/worksheets/sheet"+d+"."+r,(l=d-1,b=t,g=e,v=E,(".bin"===u.slice(-4)?Gl:Rl)(l,b,g,v))),a.sheets.push(u),rn(t.wbrels,-1,"worksheets/sheet"+d+"."+r,Qr.WS[0]),S&&(b=!1,(g=S["!comments"])&&0<g.length&&(X(h,v="xl/comments"+d+"."+r,bc(g,v,t)),a.comments.push(v),rn(E,-1,"../comments"+d+"."+r,Qr.CMNT),b=!0),S["!legacy"]&&b&&X(h,"xl/drawings/vmlDrawing"+d+".vml",function(e,t){for(var r=[21600,21600],n=["m0,0l0",r[1],r[0],r[1],r[0],"0xe"].join(","),a=[Je("xml",null,{"xmlns:v":et.v,"xmlns:o":et.o,"xmlns:x":et.x,"xmlns:mv":et.mv}).replace(/\/>/,">"),Je("o:shapelayout",Je("o:idmap",null,{"v:ext":"edit",data:e}),{"v:ext":"edit"}),Je("v:shapetype",[Je("v:stroke",null,{joinstyle:"miter"}),Je("v:path",null,{gradientshapeok:"t","o:connecttype":"rect"})].join(""),{id:"_x0000_t202","o:spt":202,coordsize:r.join(","),path:n})];Yi<1e3*e;)Yi+=1e3;return t.forEach(function(e){var t=Kt(e[0]),r={color2:"#BEFF82",type:"gradient"};"gradient"==r.type&&(r.angle="-180");var n="gradient"==r.type?Je("o:fill",null,{type:"gradientUnscaled","v:ext":"view"}):null,r=Je("v:fill",n,r);++Yi,a=a.concat(["<v:shape"+Qe({id:"_x0000_s"+Yi,type:"#_x0000_t202",style:"position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10"+(e[1].hidden?";visibility:hidden":""),fillcolor:"#ECFAD4",strokecolor:"#edeaa1"})+">",r,Je("v:shadow",null,{on:"t",obscured:"t"}),Je("v:path",null,{"o:connecttype":"none"}),'<v:textbox><div style="text-align:left"></div></v:textbox>','<x:ClientData ObjectType="Note">',"<x:MoveWithCells/>","<x:SizeWithCells/>",Ye("x:Anchor",[t.c+1,0,t.r+1,0,t.c+3,20,t.r+5,20].join(",")),Ye("x:AutoFill","False"),Ye("x:Row",String(t.r)),Ye("x:Column",String(t.c)),e[1].hidden?"":"<x:Visible/>","</x:ClientData>","</v:shape>"])}),a.push("</xml>"),a.join("")}(d,S["!comments"])),delete S["!comments"],delete S["!legacy"]),E["!id"].rId1&&X(h,Jr(u),en(E))}return null!=t.Strings&&0<t.Strings.length&&(X(h,u="xl/sharedStrings."+r,gc(t.Strings,u,t)),a.strs.push(u),rn(t.wbrels,-1,"sharedStrings."+r,Qr.SST)),X(h,u="xl/workbook."+r,mc(e,u,t)),a.workbooks.push(u),rn(t.rels,1,u,Qr.WB),X(h,u="xl/theme/theme1.xml",ji(e.Themes,t)),a.themes.push(u),rn(t.wbrels,-1,"theme/theme1.xml",Qr.THEME),X(h,u="xl/styles."+r,(c=e,f=t,(".bin"===u.slice(-4)?Ni:Ti)(c,f))),a.styles.push(u),rn(t.wbrels,-1,"styles."+r,Qr.STY),e.vbaraw&&n&&(X(h,u="xl/vbaProject.bin",e.vbaraw),a.vba.push(u),rn(t.wbrels,-1,"vbaProject.bin",Qr.VBA)),X(h,"[Content_Types].xml",Yr(a,t)),X(h,"_rels/.rels",en(t.rels)),X(h,"xl/_rels/workbook."+r+".rels",en(t.wbrels)),delete t.revssf,delete t.ssf,h}function Uf(e,t){var r="";switch((t||{}).type||"base64"){case"buffer":return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];case"base64":r=Y.decode(e.slice(0,12));break;case"binary":r=e;break;case"array":return[e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]];default:throw new Error("Unrecognized type "+(t&&t.type||"undefined"))}return[r.charCodeAt(0),r.charCodeAt(1),r.charCodeAt(2),r.charCodeAt(3),r.charCodeAt(4),r.charCodeAt(5),r.charCodeAt(6),r.charCodeAt(7)]}function Hf(e,t){var r=e,t=t||{};return t.type||(t.type=Q&&Buffer.isBuffer(e)?"buffer":"base64"),Nf(function(e,t){var r;if(O)switch(t.type){case"base64":r=new O(e,{base64:!0});break;case"binary":case"array":r=new O(e,{base64:!1});break;case"buffer":r=new O(e);break;default:throw new Error("Unrecognized type "+t.type)}else switch(t.type){case"base64":r=oe.read(e,{type:"base64"});break;case"binary":r=oe.read(e,{type:"binary"});break;case"buffer":case"array":r=oe.read(e,{type:"buffer"});break;default:throw new Error("Unrecognized type "+t.type)}return r}(r,t),t)}function Wf(e,t){var r=0;e:for(;r<e.length;)switch(e.charCodeAt(r)){case 10:case 13:case 32:++r;break;case 60:return kc(e.slice(r),t);default:break e}return ts.to_workbook(e,t)}function Vf(e,t,r,n){return n?(r.type="string",ts.to_workbook(e,r)):ts.to_workbook(t,r)}function Xf(e,t){if(h(),"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer)return Xf(new Uint8Array(e),t);var r,n,a,s=e,i=!1,o=t||{};if(o.cellStyles&&(o.cellNF=!0,o.sheetStubs=!0),el={},o.dateNF&&(el.dateNF=o.dateNF),o.type||(o.type=Q&&Buffer.isBuffer(e)?"buffer":"base64"),"file"==o.type&&(o.type=Q?"buffer":"binary",s=function(e){if(void 0!==b)return b.readFileSync(e);if("undefined"!=typeof $&&"undefined"!=typeof File&&"undefined"!=typeof Folder)try{var t=File(e);t.open("r"),t.encoding="binary";var r=t.read();return t.close(),r}catch(e){if(!e.message||!e.message.match(/onstruct/))throw e}throw new Error("Cannot access file "+e)}(e)),"string"==o.type&&(i=!0,o.type="binary",o.codepage=65001,s=(l=e).match(/[^\x00-\x7F]/)?Le(l):l),"array"==o.type&&"undefined"!=typeof Uint8Array&&e instanceof Uint8Array&&"undefined"!=typeof ArrayBuffer){var l=new ArrayBuffer(3),l=new Uint8Array(l);if(l.foo="bar",!l.foo)return(o=pe(o)).type="array",Xf(p(s),o)}switch((r=Uf(s,o))[0]){case 208:if(207===r[1]&&17===r[2]&&224===r[3]&&161===r[4]&&177===r[5]&&26===r[6]&&225===r[7])return n=oe.read(s,o),a=o,(oe.find(n,"EncryptedPackage")?Mf:Mc)(n,a);break;case 9:if(r[1]<=4)return Mc(s,o);break;case 60:return kc(s,o);case 73:if(68===r[1])return function(t,r){var n=r||{},a=!!n.WTF;n.WTF=!0;try{var e=La.to_workbook(t,n);return n.WTF=a,e}catch(e){if(n.WTF=a,!e.message.match(/SYLK bad record ID/)&&a)throw e;return ts.to_workbook(t,r)}}(s,o);break;case 84:if(65===r[1]&&66===r[2]&&76===r[3])return Wa.to_workbook(s,o);break;case 80:return 75===r[1]&&r[2]<9&&r[3]<9?Hf(s,o):Vf(e,s,o,i);case 239:return 60===r[3]?kc(s,o):Vf(e,s,o,i);case 255:if(254===r[1])return n=s,"base64"==(a=o).type&&(n=Y.decode(n)),n=cptable.utils.decode(1200,n.slice(2),"str"),a.type="binary",Wf(n,a);break;case 0:if(0===r[1]&&2<=r[2]&&0===r[3])return ls.to_workbook(s,o);break;case 3:case 131:case 139:case 140:return Fa.to_workbook(s,o);case 123:if(92===r[1]&&114===r[2]&&116===r[3])return Ys.to_workbook(s,o);break;case 10:case 13:case 32:return function(e,t){var r="",n=Uf(e,t);switch(t.type){case"base64":r=Y.decode(e);break;case"binary":r=e;break;case"buffer":r=e.toString("binary");break;case"array":r=I(e);break;default:throw new Error("Unrecognized type "+t.type)}return Wf(r=239==n[0]&&187==n[1]&&191==n[2]?Me(r):r,t)}(s,o)}return-1<Fa.versions.indexOf(r[0])&&r[2]<=12&&r[3]<=31?Fa.to_workbook(s,o):Vf(e,s,o,i)}function Gf(e,t){t=t||{};return t.type="file",Xf(e,t)}function zf(e,t){switch(t.type){case"base64":case"binary":break;case"buffer":case"array":t.type="";break;case"file":return E(t.file,oe.write(e,{type:Q?"buffer":""}));case"string":throw new Error("'string' output type invalid for '"+t.bookType+"' files");default:throw new Error("Unrecognized type "+t.type)}return oe.write(e,t)}function jf(e,t,r){var n=(r=r||"")+e;switch(t.type){case"base64":return Y.encode(Le(n));case"binary":return Le(n);case"string":return e;case"file":return E(t.file,n,"utf8");case"buffer":return Q?s(n,"utf8"):jf(n,{type:"binary"}).split("").map(function(e){return e.charCodeAt(0)})}throw new Error("Unrecognized type "+t.type)}function $f(e,t){switch(t.type){case"string":case"base64":case"binary":for(var r="",n=0;n<e.length;++n)r+=String.fromCharCode(e[n]);return"base64"==t.type?Y.encode(r):"string"==t.type?Me(r):r;case"file":return E(t.file,e);case"buffer":return e;default:throw new Error("Unrecognized type "+t.type)}}function Kf(e,t){h(),tc(e);var r,n=t||{};if(n.cellStyles&&(n.cellNF=!0,n.sheetStubs=!0),"array"==n.type){n.type="binary";t=Kf(e,n);return n.type="array",i(t)}switch(n.bookType||"xlsb"){case"xml":case"xlml":return jf(Rc(e,n),n);case"slk":case"sylk":return jf(Bf(e,n),n);case"htm":case"html":return jf(wf(e,n),n);case"txt":return function(e,t){switch(t.type){case"base64":return Y.encode(e);case"binary":case"string":return e;case"file":return E(t.file,e,"binary");case"buffer":return Q?s(e,"binary"):e.split("").map(function(e){return e.charCodeAt(0)})}throw new Error("Unrecognized type "+t.type)}(_f(e,n),n);case"csv":return jf(Cf(e,n),n,"\ufeff");case"dif":return jf(Tf(e,n),n);case"dbf":return $f(yf(e,n),n);case"prn":return jf(kf(e,n),n);case"rtf":return jf(xf(e,n),n);case"eth":return jf(Af(e,n),n);case"fods":return jf(Ef(e,n),n);case"biff2":n.biff||(n.biff=2);case"biff3":n.biff||(n.biff=3);case"biff4":return n.biff||(n.biff=4),$f(Zc(e,n),n);case"biff5":n.biff||(n.biff=5);case"biff8":case"xla":case"xls":return n.biff||(n.biff=8),zf(Lc(e,r=(r=n)||{}),r);case"xlsx":case"xlsm":case"xlam":case"xlsb":case"ods":return function(e,t){var r=t||{};wi=new hh(t);var e=Lf(e,r),n={};if(r.compression&&(n.compression="DEFLATE"),r.password)n.type=Q?"nodebuffer":"string";else switch(r.type){case"base64":n.type="base64";break;case"binary":n.type="string";break;case"string":throw new Error("'string' output type invalid for '"+r.bookType+"' files");case"buffer":case"file":n.type=Q?"nodebuffer":"string";break;default:throw new Error("Unrecognized type "+r.type)}return e=e.FullPaths?oe.write(e,{fileType:"zip",type:{nodebuffer:"buffer",string:"binary"}[n.type]||n.type}):e.generate(n),r.password&&"undefined"!=typeof encrypt_agile?zf(encrypt_agile(e,r.password),r):"file"===r.type?E(r.file,e):"string"==r.type?Me(e):e}(e,n);default:throw new Error("Unrecognized bookType |"+n.bookType+"|")}}function Yf(e){var t;e.bookType||((t=e.file.slice(e.file.lastIndexOf(".")).toLowerCase()).match(/^\.[a-z]+$/)&&(e.bookType=t.slice(1)),e.bookType={xls:"biff8",htm:"html",slk:"sylk",socialcalc:"eth",Sh33tJS:"WTF"}[e.bookType]||e.bookType)}function Qf(e,t,r){r=r||{};return r.type="file",r.file=t,Yf(r),Kf(e,r)}function Jf(e,t,r,n,a,s,i,o){var l=zt(r),c=o.defval,f=o.raw||!Object.prototype.hasOwnProperty.call(o,"raw"),h=!0,u=1===a?[]:{};if(1!==a)if(Object.defineProperty)try{Object.defineProperty(u,"__rowNum__",{value:r,enumerable:!1})}catch(e){u.__rowNum__=r}else u.__rowNum__=r;if(!i||e[r])for(var d=t.s.c;d<=t.e.c;++d){var p=i?e[r][d]:e[n[d]+l];if(void 0!==p&&void 0!==p.t){var m=p.v;switch(p.t){case"z":if(null==m)break;continue;case"e":m=void 0;break;case"s":case"d":case"b":case"n":break;default:throw new Error("unrecognized type "+p.t)}if(null!=s[d]){if(null==m)if(void 0!==c)u[s[d]]=c;else{if(!f||null!==m)continue;u[s[d]]=null}else u[s[d]]=f||o.rawNumbers&&"n"==p.t?m:er(p,m,o);null!=m&&(h=!1)}}else void 0!==c&&null!=s[d]&&(u[s[d]]=c)}return{row:u,isempty:h}}function qf(e,t){if(null==e||null==e["!ref"])return[];var r,n={t:"n",v:0},a=0,s=1,i=[],o="",l={s:{r:0,c:0},e:{r:0,c:0}},c=t||{},f=null!=c.range?c.range:e["!ref"];switch(1===c.header?a=1:"A"===c.header?a=2:Array.isArray(c.header)?a=3:null==c.header&&(a=0),typeof f){case"string":l=qt(f);break;case"number":(l=qt(e["!ref"])).s.r=f;break;default:l=f}0<a&&(s=0);var h=zt(l.s.r),u=[],d=[],p=0,m=0,g=Array.isArray(e),b=l.s.r,v=0,E=0;for(g&&!e[b]&&(e[b]=[]),v=l.s.c;v<=l.e.c;++v)switch(u[v]=$t(v),n=g?e[b][v]:e[u[v]+h],a){case 1:i[v]=v-l.s.c;break;case 2:i[v]=u[v];break;case 3:i[v]=c.header[v-l.s.c];break;default:for(o=r=er(n=null==n?{w:"__EMPTY",t:"s"}:n,null,c),E=m=0;E<i.length;++E)i[E]==o&&(o=r+"_"+ ++m);i[v]=o}for(b=l.s.r+s;b<=l.e.r;++b){var S=Jf(e,l,b,u,a,i,g,c);!1!==S.isempty&&(1===a?!1===c.blankrows:!c.blankrows)||(d[p++]=S.row)}return d.length=p,d}var Zf=/"/g;function eh(e,t,r,n,a,s,i,o){for(var l=!0,c=[],f="",h=zt(r),u=t.s.c;u<=t.e.c;++u)if(n[u]){var d=o.dense?(e[r]||[])[u]:e[n[u]+h];if(null==d)f="";else if(null!=d.v){l=!1,f=""+(o.rawNumbers&&"n"==d.t?d.v:er(d,null,o));for(var p,m=0;m!==f.length;++m)if((p=f.charCodeAt(m))===a||p===s||34===p||o.forceQuotes){f='"'+f.replace(Zf,'""')+'"';break}"ID"==f&&(f='"ID"')}else null==d.f||d.F?f="":(l=!1,0<=(f="="+d.f).indexOf(",")&&(f='"'+f.replace(Zf,'""')+'"'));c.push(f)}return!1===o.blankrows&&l?null:c.join(i)}function th(e,t){var r=[],n=null==t?{}:t;if(null==e||null==e["!ref"])return"";var a=qt(e["!ref"]),s=void 0!==n.FS?n.FS:",",i=s.charCodeAt(0),o=void 0!==n.RS?n.RS:"\n",l=o.charCodeAt(0),c=new RegExp(("|"==s?"\\|":s)+"+$"),f="",h=[];n.dense=Array.isArray(e);for(var u=n.skipHidden&&e["!cols"]||[],d=n.skipHidden&&e["!rows"]||[],p=a.s.c;p<=a.e.c;++p)(u[p]||{}).hidden||(h[p]=$t(p));for(var m=a.s.r;m<=a.e.r;++m)(d[m]||{}).hidden||null!=(f=eh(e,a,m,h,i,l,s,n))&&(n.strip&&(f=f.replace(c,"")),r.push(f+o));return delete n.dense,r.join("")}function rh(e,t){(t=t||{}).FS="\t",t.RS="\n";e=th(e,t);if("undefined"==typeof cptable||"string"==t.type)return e;e=cptable.utils.encode(1200,e,"str");return String.fromCharCode(255)+String.fromCharCode(254)+e}function nh(e){var t,r="",n="";if(null==e||null==e["!ref"])return[];for(var a,s=qt(e["!ref"]),i=[],o=[],l=Array.isArray(e),c=s.s.c;c<=s.e.c;++c)i[c]=$t(c);for(var f=s.s.r;f<=s.e.r;++f)for(a=zt(f),c=s.s.c;c<=s.e.c;++c)if(r=i[c]+a,n="",void 0!==(t=l?(e[f]||[])[c]:e[r])){if(null!=t.F){if(r=t.F,!t.f)continue;n=t.f,-1==r.indexOf(":")&&(r=r+":"+r)}if(null!=t.f)n=t.f;else{if("z"==t.t)continue;if("n"==t.t&&null!=t.v)n=""+t.v;else if("b"==t.t)n=t.v?"TRUE":"FALSE";else if(void 0!==t.w)n="'"+t.w;else{if(void 0===t.v)continue;n="s"==t.t?"'"+t.v:""+t.v}}o[o.length]=r+"="+n}return o}function ah(e,t,r){var i,o=r||{},l=+!o.skipHeader,c=e||{},f=0,h=0;c&&null!=o.origin&&("number"==typeof o.origin?f=o.origin:(n="string"==typeof o.origin?Kt(o.origin):o.origin,f=n.r,h=n.c));var n,e={s:{c:0,r:0},e:{c:h,r:f+t.length-1+l}};c["!ref"]?(n=qt(c["!ref"]),e.e.c=Math.max(e.e.c,n.e.c),e.e.r=Math.max(e.e.r,n.e.r),-1==f&&(f=n.e.r+1,e.e.r=f+t.length-1+l)):-1==f&&(f=0,e.e.r=t.length-1+l);var u=o.header||[],d=0;t.forEach(function(a,s){de(a).forEach(function(e){-1==(d=u.indexOf(e))&&(u[d=u.length]=e);var t=a[e],r="z",n="",e=Yt({c:h+d,r:f+s+l});i=oh.sheet_get_cell(c,e),!t||"object"!=typeof t||t instanceof Date?("number"==typeof t?r="n":"boolean"==typeof t?r="b":"string"==typeof t?r="s":t instanceof Date&&(r="d",o.cellDates||(r="n",t=G(t)),n=o.dateNF||ue._table[14]),i?(i.t=r,i.v=t,delete i.w,delete i.R,n&&(i.z=n)):c[e]=i={t:r,v:t},n&&(i.z=n)):c[e]=t})}),e.e.c=Math.max(e.e.c,h+u.length-1);var a=zt(f);if(l)for(d=0;d<u.length;++d)c[$t(d+h)+a]={t:"s",v:u[d]};return c["!ref"]=Jt(e),c}var sh,ih,oh={encode_col:$t,encode_row:zt,encode_cell:Yt,encode_range:Jt,decode_col:jt,decode_row:Gt,split_cell:function(e){return e.replace(/(\$?[A-Z]*)(\$?\d*)/,"$1,$2").split(",")},decode_cell:Kt,decode_range:Qt,format_cell:er,get_formulae:nh,make_csv:th,make_json:qf,make_formulae:nh,sheet_add_aoa:rr,sheet_add_json:ah,sheet_add_dom:of,aoa_to_sheet:nr,json_to_sheet:function(e,t){return ah(null,e,t)},table_to_sheet:lf,table_to_book:function(e,t){return tr(lf(e,t),t)},sheet_to_csv:th,sheet_to_txt:rh,sheet_to_json:qf,sheet_to_html:rf.from_sheet,sheet_to_formulae:nh,sheet_to_row_object_array:qf};function lh(e,t,r){return null!=e[t]?e[t]:e[t]=r}function ch(e,t,r){if("string"!=typeof t)return ch(e,Yt("number"!=typeof t?t:{r:t,c:r||0}));if(Array.isArray(e)){r=Kt(t);return e[r.r]||(e[r.r]=[]),e[r.r][r.c]||(e[r.r][r.c]={t:"z"})}return e[t]||(e[t]={t:"z"})}(sh=oh).consts=sh.consts||{},sh.sheet_get_cell=ch,sh.book_new=function(){return{SheetNames:[],Sheets:{}}},sh.book_append_sheet=function(e,t,r){if(!r)for(var n=1;n<=65535&&-1!=e.SheetNames.indexOf(r="Sheet"+n);++n,r=void 0);if(!r||65535<=e.SheetNames.length)throw new Error("Too many worksheets");if(ec(r),0<=e.SheetNames.indexOf(r))throw new Error("Worksheet with name |"+r+"| already exists!");e.SheetNames.push(r),e.Sheets[r]=t},sh.book_set_sheet_visibility=function(e,t,r){lh(e,"Workbook",{}),lh(e.Workbook,"Sheets",[]);t=function(e,t){if("number"==typeof t){if(0<=t&&e.SheetNames.length>t)return t;throw new Error("Cannot find sheet # "+t)}if("string"!=typeof t)throw new Error("Cannot find sheet |"+t+"|");if(-1<(e=e.SheetNames.indexOf(t)))return e;throw new Error("Cannot find sheet name |"+t+"|")}(e,t);switch(lh(e.Workbook.Sheets,t,{}),r){case 0:case 1:case 2:break;default:throw new Error("Bad sheet visibility setting "+r)}e.Workbook.Sheets[t].Hidden=r},[["SHEET_VISIBLE",0],["SHEET_HIDDEN",1],["SHEET_VERY_HIDDEN",2]].forEach(function(e){sh.consts[e[0]]=e[1]}),sh.cell_set_number_format=function(e,t){return e.z=t,e},sh.cell_set_hyperlink=function(e,t,r){return t?(e.l={Target:t},r&&(e.l.Tooltip=r)):delete e.l,e},sh.cell_set_internal_link=function(e,t,r){return sh.cell_set_hyperlink(e,"#"+t,r)},sh.cell_add_comment=function(e,t,r){e.c||(e.c=[]),e.c.push({t:t,a:r||"SheetJS"})},sh.sheet_set_array_formula=function(e,t,r){for(var n="string"!=typeof t?t:qt(t),a="string"==typeof t?t:Jt(t),s=n.s.r;s<=n.e.r;++s)for(var i=n.s.c;i<=n.e.c;++i){var o=ch(e,s,i);o.t="n",o.F=a,delete o.v,s==n.s.r&&i==n.s.c&&(o.f=r)}return e},Q&&"undefined"!="function"&&(ih=__webpack_require__(/*! stream */ "?e20e").Readable,n.stream={to_json:function(t,e){var r=ih({objectMode:!0});if(null==t||null==t["!ref"])return r.push(null),r;var n,a={t:"n",v:0},s=0,i=1,o=[],l="",c={s:{r:0,c:0},e:{r:0,c:0}},f=e||{},h=null!=f.range?f.range:t["!ref"];switch(1===f.header?s=1:"A"===f.header?s=2:Array.isArray(f.header)&&(s=3),typeof h){case"string":c=qt(h);break;case"number":(c=qt(t["!ref"])).s.r=h;break;default:c=h}0<s&&(i=0);var u=zt(c.s.r),d=[],p=0,m=Array.isArray(t),g=c.s.r,b=0,v=0;for(m&&!t[g]&&(t[g]=[]),b=c.s.c;b<=c.e.c;++b)switch(d[b]=$t(b),a=m?t[g][b]:t[d[b]+u],s){case 1:o[b]=b-c.s.c;break;case 2:o[b]=d[b];break;case 3:o[b]=f.header[b-c.s.c];break;default:for(l=n=er(a=null==a?{w:"__EMPTY",t:"s"}:a,null,f),v=p=0;v<o.length;++v)o[v]==l&&(l=n+"_"+ ++p);o[b]=l}return g=c.s.r+i,r._read=function(){if(g>c.e.r)return r.push(null);for(;g<=c.e.r;){var e=Jf(t,c,g,d,s,o,m,f);if(++g,!1===e.isempty||(1===s?!1!==f.blankrows:f.blankrows)){r.push(e.row);break}}},r},to_html:function(e,t){var r=ih(),n=t||{},t=null!=n.header?n.header:rf.BEGIN,a=null!=n.footer?n.footer:rf.END;r.push(t);var s=Qt(e["!ref"]);n.dense=Array.isArray(e),r.push(rf._preamble(e,s,n));var i=s.s.r,o=!1;return r._read=function(){if(i>s.e.r)return o||(o=!0,r.push("</table>"+a)),r.push(null);for(;i<=s.e.r;){r.push(rf._row(e,s,i,n)),++i;break}},r},to_csv:function(e,t){var r=ih(),n=null==t?{}:t;if(null==e||null==e["!ref"])return r.push(null),r;var a=qt(e["!ref"]),s=void 0!==n.FS?n.FS:",",i=s.charCodeAt(0),o=void 0!==n.RS?n.RS:"\n",l=o.charCodeAt(0),c=new RegExp(("|"==s?"\\|":s)+"+$"),f="",h=[];n.dense=Array.isArray(e);for(var u=n.skipHidden&&e["!cols"]||[],d=n.skipHidden&&e["!rows"]||[],p=a.s.c;p<=a.e.c;++p)(u[p]||{}).hidden||(h[p]=$t(p));var m=a.s.r,g=!1;return r._read=function(){if(!g)return g=!0,r.push("\ufeff");for(;m<=a.e.r;)if(++m,!(d[m-1]||{}).hidden&&null!=(f=eh(e,a,m-1,h,i,l,s,n))){n.strip&&(f=f.replace(c,"")),r.push(f+o);break}return m>a.e.r?r.push(null):void 0},r}});var fh=function(){function n(e,t,r){return this instanceof n?(this.tagName=e,this._attributes=t||{},this._children=r||[],this._prefix="",this):new n(e,t,r)}n.prototype.createElement=function(){return new n(arguments)},n.prototype.children=function(){return this._children},n.prototype.append=function(e){return this._children.push(e),this},n.prototype.prefix=function(e){return 0==arguments.length?this._prefix:(this._prefix=e,this)},n.prototype.attr=function(e,t){if(null==t)return delete this._attributes[e],this;if(0==arguments.length)return this._attributes;if("string"==typeof e&&1==arguments.length)return this._attributes.attr[e];if("object"==typeof e&&1==arguments.length)for(var r in e)this._attributes[r]=e[r];else 2==arguments.length&&"string"==typeof e&&(this._attributes[e]=t);return this};return n.prototype.escapeAttributeValue=function(e){return'"'+e.replace(/\"/g,"&quot;")+'"'},n.prototype.toXml=function(e){var t=(e=e||this)._prefix;if(t+="<"+e.tagName,e._attributes)for(var r in e._attributes)t+=" "+r+"="+this.escapeAttributeValue(""+e._attributes[r]);if(e._children&&0<e._children.length){t+=">";for(var n=0;n<e._children.length;n++)t+=this.toXml(e._children[n]);t+="</"+e.tagName+">"}else t+="/>";return t},n}(),hh=function(e){var t,r=164,n={0:"General",1:"0",2:"0.00",3:"#,##0",4:"#,##0.00",9:"0%",10:"0.00%",11:"0.00E+00",12:"# ?/?",13:"# ??/??",14:"m/d/yy",15:"d-mmm-yy",16:"d-mmm",17:"mmm-yy",18:"h:mm AM/PM",19:"h:mm:ss AM/PM",20:"h:mm",21:"h:mm:ss",22:"m/d/yy h:mm",37:"#,##0 ;(#,##0)",38:"#,##0 ;[Red](#,##0)",39:"#,##0.00;(#,##0.00)",40:"#,##0.00;[Red](#,##0.00)",45:"mm:ss",46:"[h]:mm:ss",47:"mmss.0",48:"##0.0E+0",49:"@",56:'"上午/下午 "hh"時"mm"分"ss"秒 "'},a={};for(t in n)a[n[t]]=t;var s={};return{initialize:function(e){this.$fonts=fh("fonts").attr("count",0).attr("x14ac:knownFonts","1"),this.$fills=fh("fills").attr("count",0),this.$borders=fh("borders").attr("count",0),this.$numFmts=fh("numFmts").attr("count",0),this.$cellStyleXfs=fh("cellStyleXfs"),this.$xf=fh("xf").attr("numFmtId",0).attr("fontId",0).attr("fillId",0).attr("borderId",0),this.$cellXfs=fh("cellXfs").attr("count",0),this.$cellStyles=fh("cellStyles").append(fh("cellStyle").attr("name","Normal").attr("xfId",0).attr("builtinId",0)),this.$dxfs=fh("dxfs").attr("count","0"),this.$tableStyles=fh("tableStyles").attr("count","0").attr("defaultTableStyle","TableStyleMedium9").attr("defaultPivotStyle","PivotStyleMedium4"),this.$styles=fh("styleSheet").attr("xmlns:mc","http://schemas.openxmlformats.org/markup-compatibility/2006").attr("xmlns:x14ac","http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac").attr("xmlns","http://schemas.openxmlformats.org/spreadsheetml/2006/main").attr("mc:Ignorable","x14ac").prefix('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>').append(this.$numFmts).append(this.$fonts).append(this.$fills).append(this.$borders).append(this.$cellStyleXfs.append(this.$xf)).append(this.$cellXfs).append(this.$cellStyles).append(this.$dxfs).append(this.$tableStyles);var t=e.defaultCellStyle||{};t.font||(t.font={name:"Calibri",sz:"12"}),t.font.name||(t.font.name="Calibri"),t.font.sz||(t.font.sz=11),t.fill||(t.fill={patternType:"none",fgColor:{}}),t.border||(t.border={}),t.numFmt||(t.numFmt=0),this.defaultStyle=t;e=JSON.parse(JSON.stringify(t));return e.fill={patternType:"gray125",fgColor:{}},this.addStyles([t,e]),this},addStyle:function(e){var t=JSON.stringify(e),r=s[t];return null==r?(r=this._addXf(e),s[t]=r):r=s[t],r},addStyles:function(e){var t=this;return e.map(function(e){return t.addStyle(e)})},_duckTypeStyle:function(e){return"object"==typeof e&&(e.patternFill||e.fgColor)?{fill:e}:e.font||e.numFmt||e.border||e.fill?e:this._getStyleCSS(e)},_getStyleCSS:function(e){return e},_addXf:function(e){var t=this._addFont(e.font),r=this._addFill(e.fill),n=this._addBorder(e.border),a=this._addNumFmt(e.numFmt),s=fh("xf").attr("numFmtId",a).attr("fontId",t).attr("fillId",r).attr("borderId",n).attr("xfId","0");0<t&&s.attr("applyFont","1"),0<r&&s.attr("applyFill","1"),0<n&&s.attr("applyBorder","1"),0<a&&s.attr("applyNumberFormat","1"),e.alignment&&(a=fh("alignment"),e.alignment.horizontal&&a.attr("horizontal",e.alignment.horizontal),e.alignment.vertical&&a.attr("vertical",e.alignment.vertical),e.alignment.indent&&a.attr("indent",e.alignment.indent),e.alignment.readingOrder&&a.attr("readingOrder",e.alignment.readingOrder),e.alignment.wrapText&&a.attr("wrapText",e.alignment.wrapText),null!=e.alignment.textRotation&&a.attr("textRotation",e.alignment.textRotation),s.append(a).attr("applyAlignment",1)),this.$cellXfs.append(s);s=+this.$cellXfs.children().length;return this.$cellXfs.attr("count",s),s-1},_addFont:function(e){if(!e)return 0;var t=fh("font").append(fh("sz").attr("val",e.sz||this.defaultStyle.font.sz)).append(fh("name").attr("val",e.name||this.defaultStyle.font.name));e.bold&&t.append(fh("b")),e.underline&&t.append(fh("u")),e.italic&&t.append(fh("i")),e.strike&&t.append(fh("strike")),e.outline&&t.append(fh("outline")),e.shadow&&t.append(fh("shadow")),e.vertAlign&&t.append(fh("vertAlign").attr("val",e.vertAlign)),e.color&&(e.color.theme?(t.append(fh("color").attr("theme",e.color.theme)),e.color.tint&&t.append(fh("tint").attr("theme",e.color.tint))):e.color.rgb&&t.append(fh("color").attr("rgb",e.color.rgb))),this.$fonts.append(t);t=this.$fonts.children().length;return this.$fonts.attr("count",t),t-1},_addNumFmt:function(e){if(!e)return 0;if("string"==typeof e){var t=a[e];if(0<=t)return t}if(/^[0-9]+$/.exec(e))return e;e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");e=fh("numFmt").attr("numFmtId",++r).attr("formatCode",e);this.$numFmts.append(e);e=this.$numFmts.children().length;return this.$numFmts.attr("count",e),r},_addFill:function(e){if(!e)return 0;var t,r=fh("patternFill").attr("patternType",e.patternType||"solid");e.fgColor&&(t=fh("fgColor"),e.fgColor.rgb?(6==e.fgColor.rgb.length&&(e.fgColor.rgb="FF"+e.fgColor.rgb),t.attr("rgb",e.fgColor.rgb),r.append(t)):e.fgColor.theme&&(t.attr("theme",e.fgColor.theme),e.fgColor.tint&&t.attr("tint",e.fgColor.tint),r.append(t)),e.bgColor||(e.bgColor={indexed:"64"})),e.bgColor&&(e=fh("bgColor").attr(e.bgColor),r.append(e));r=fh("fill").append(r);this.$fills.append(r);r=this.$fills.children().length;return this.$fills.attr("count",r),r-1},_getSubBorder:function(e,t){var r=fh(e);return t&&(t.style&&r.attr("style",t.style),t.color&&(e=fh("color"),t.color.auto?e.attr("auto",t.color.auto):t.color.rgb?e.attr("rgb",t.color.rgb):(t.color.theme||t.color.tint)&&(e.attr("theme",t.color.theme||"1"),e.attr("tint",t.color.tint||"0")),r.append(e))),r},_addBorder:function(t){if(!t)return 0;var r=this,n=fh("border").attr("diagonalUp",t.diagonalUp).attr("diagonalDown",t.diagonalDown);["left","right","top","bottom","diagonal"].forEach(function(e){n.append(r._getSubBorder(e,t[e]))}),this.$borders.append(n);var e=this.$borders.children().length;return this.$borders.attr("count",e),e-1},toXml:function(){return this.$styles.toXml()}}.initialize(e||{})};void 0!==Mc&&(n.parse_xlscfb=Mc),n.parse_zip=Nf,n.read=Xf,n.readFile=Gf,n.readFileSync=Gf,n.write=Kf,n.writeFile=Qf,n.writeFileSync=Qf,n.writeFileAsync=function(e,t,r,n){var a=r||{};return a.type="file",a.file=e,Yf(a),a.type="buffer",n instanceof Function||(n=r),b.writeFile(e,Kf(t,a),n)},n.utils=oh,n.SSF=ue,void 0!==oe&&(n.CFB=oe)} true?make_xlsx_lib(exports):0;var XLS=XLSX,ODS=XLSX;
//# sourceMappingURL=xlsx.min.js.map


/***/ }),

/***/ "./node_modules/xlsx-js-style/libs/cpexcel.js":
/*!****************************************************!*\
  !*** ./node_modules/xlsx-js-style/libs/cpexcel.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "?2b48")["Buffer"];
/* cpexcel.js (C) 2013-present SheetJS -- http://sheetjs.com */
/*jshint -W100 */
var cptable = {version:"1.14.0"};
cptable[437] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[620] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàąçêëèïîćÄĄĘęłôöĆûùŚÖÜ¢Ł¥śƒŹŻóÓńŃźż¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[737] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[850] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[852] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[857] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[861] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[865] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[866] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[874] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[895] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ČüéďäĎŤčěĚĹÍľǪÄÁÉžŽôöÓůÚýÖÜŠĽÝŘťáíóúňŇŮÔšřŕŔ¼§«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[932] = (function(){ var d = [], e = {}, D = [], j;
D[0] = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~���������������������������������｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ��������������������������������".split("");
for(j = 0; j != D[0].length; ++j) if(D[0][j].charCodeAt(0) !== 0xFFFD) { e[D[0][j]] = 0 + j; d[0 + j] = D[0][j];}
D[129] = "����������������������������������������������������������������　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±×�÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓�����������∈∋⊆⊇⊂⊃∪∩��������∧∨￢⇒⇔∀∃�����������∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬�������Å‰♯♭♪†‡¶����◯���".split("");
for(j = 0; j != D[129].length; ++j) if(D[129][j].charCodeAt(0) !== 0xFFFD) { e[D[129][j]] = 33024 + j; d[33024 + j] = D[129][j];}
D[130] = "�������������������������������������������������������������������������������０１２３４５６７８９�������ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ�������ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ����ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん��������������".split("");
for(j = 0; j != D[130].length; ++j) if(D[130][j].charCodeAt(0) !== 0xFFFD) { e[D[130][j]] = 33280 + j; d[33280 + j] = D[130][j];}
D[131] = "����������������������������������������������������������������ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミ�ムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ��������ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ��������αβγδεζηθικλμνξοπρστυφχψω�����������������������������������������".split("");
for(j = 0; j != D[131].length; ++j) if(D[131][j].charCodeAt(0) !== 0xFFFD) { e[D[131][j]] = 33536 + j; d[33536 + j] = D[131][j];}
D[132] = "����������������������������������������������������������������АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ���������������абвгдеёжзийклмн�опрстуфхцчшщъыьэюя�������������─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂�����������������������������������������������������������������".split("");
for(j = 0; j != D[132].length; ++j) if(D[132][j].charCodeAt(0) !== 0xFFFD) { e[D[132][j]] = 33792 + j; d[33792 + j] = D[132][j];}
D[135] = "����������������������������������������������������������������①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ�㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡��������㍻�〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪���������������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[135].length; ++j) if(D[135][j].charCodeAt(0) !== 0xFFFD) { e[D[135][j]] = 34560 + j; d[34560 + j] = D[135][j];}
D[136] = "���������������������������������������������������������������������������������������������������������������������������������������������������������������亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭���".split("");
for(j = 0; j != D[136].length; ++j) if(D[136][j].charCodeAt(0) !== 0xFFFD) { e[D[136][j]] = 34816 + j; d[34816 + j] = D[136][j];}
D[137] = "����������������������������������������������������������������院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円�園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改���".split("");
for(j = 0; j != D[137].length; ++j) if(D[137][j].charCodeAt(0) !== 0xFFFD) { e[D[137][j]] = 35072 + j; d[35072 + j] = D[137][j];}
D[138] = "����������������������������������������������������������������魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫�橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄���".split("");
for(j = 0; j != D[138].length; ++j) if(D[138][j].charCodeAt(0) !== 0xFFFD) { e[D[138][j]] = 35328 + j; d[35328 + j] = D[138][j];}
D[139] = "����������������������������������������������������������������機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救�朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈���".split("");
for(j = 0; j != D[139].length; ++j) if(D[139][j].charCodeAt(0) !== 0xFFFD) { e[D[139][j]] = 35584 + j; d[35584 + j] = D[139][j];}
D[140] = "����������������������������������������������������������������掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨�劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向���".split("");
for(j = 0; j != D[140].length; ++j) if(D[140][j].charCodeAt(0) !== 0xFFFD) { e[D[140][j]] = 35840 + j; d[35840 + j] = D[140][j];}
D[141] = "����������������������������������������������������������������后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降�項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷���".split("");
for(j = 0; j != D[141].length; ++j) if(D[141][j].charCodeAt(0) !== 0xFFFD) { e[D[141][j]] = 36096 + j; d[36096 + j] = D[141][j];}
D[142] = "����������������������������������������������������������������察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止�死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周���".split("");
for(j = 0; j != D[142].length; ++j) if(D[142][j].charCodeAt(0) !== 0xFFFD) { e[D[142][j]] = 36352 + j; d[36352 + j] = D[142][j];}
D[143] = "����������������������������������������������������������������宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳�準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾���".split("");
for(j = 0; j != D[143].length; ++j) if(D[143][j].charCodeAt(0) !== 0xFFFD) { e[D[143][j]] = 36608 + j; d[36608 + j] = D[143][j];}
D[144] = "����������������������������������������������������������������拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨�逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線���".split("");
for(j = 0; j != D[144].length; ++j) if(D[144][j].charCodeAt(0) !== 0xFFFD) { e[D[144][j]] = 36864 + j; d[36864 + j] = D[144][j];}
D[145] = "����������������������������������������������������������������繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻�操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只���".split("");
for(j = 0; j != D[145].length; ++j) if(D[145][j].charCodeAt(0) !== 0xFFFD) { e[D[145][j]] = 37120 + j; d[37120 + j] = D[145][j];}
D[146] = "����������������������������������������������������������������叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄�逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓���".split("");
for(j = 0; j != D[146].length; ++j) if(D[146][j].charCodeAt(0) !== 0xFFFD) { e[D[146][j]] = 37376 + j; d[37376 + j] = D[146][j];}
D[147] = "����������������������������������������������������������������邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬�凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入���".split("");
for(j = 0; j != D[147].length; ++j) if(D[147][j].charCodeAt(0) !== 0xFFFD) { e[D[147][j]] = 37632 + j; d[37632 + j] = D[147][j];}
D[148] = "����������������������������������������������������������������如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅�楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美���".split("");
for(j = 0; j != D[148].length; ++j) if(D[148][j].charCodeAt(0) !== 0xFFFD) { e[D[148][j]] = 37888 + j; d[37888 + j] = D[148][j];}
D[149] = "����������������������������������������������������������������鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷�斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋���".split("");
for(j = 0; j != D[149].length; ++j) if(D[149][j].charCodeAt(0) !== 0xFFFD) { e[D[149][j]] = 38144 + j; d[38144 + j] = D[149][j];}
D[150] = "����������������������������������������������������������������法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆�摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒���".split("");
for(j = 0; j != D[150].length; ++j) if(D[150][j].charCodeAt(0) !== 0xFFFD) { e[D[150][j]] = 38400 + j; d[38400 + j] = D[150][j];}
D[151] = "����������������������������������������������������������������諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲�沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯���".split("");
for(j = 0; j != D[151].length; ++j) if(D[151][j].charCodeAt(0) !== 0xFFFD) { e[D[151][j]] = 38656 + j; d[38656 + j] = D[151][j];}
D[152] = "����������������������������������������������������������������蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕��������������������������������������������弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲���".split("");
for(j = 0; j != D[152].length; ++j) if(D[152][j].charCodeAt(0) !== 0xFFFD) { e[D[152][j]] = 38912 + j; d[38912 + j] = D[152][j];}
D[153] = "����������������������������������������������������������������僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭�凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨���".split("");
for(j = 0; j != D[153].length; ++j) if(D[153][j].charCodeAt(0) !== 0xFFFD) { e[D[153][j]] = 39168 + j; d[39168 + j] = D[153][j];}
D[154] = "����������������������������������������������������������������咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸�噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩���".split("");
for(j = 0; j != D[154].length; ++j) if(D[154][j].charCodeAt(0) !== 0xFFFD) { e[D[154][j]] = 39424 + j; d[39424 + j] = D[154][j];}
D[155] = "����������������������������������������������������������������奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀�它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏���".split("");
for(j = 0; j != D[155].length; ++j) if(D[155][j].charCodeAt(0) !== 0xFFFD) { e[D[155][j]] = 39680 + j; d[39680 + j] = D[155][j];}
D[156] = "����������������������������������������������������������������廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠�怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛���".split("");
for(j = 0; j != D[156].length; ++j) if(D[156][j].charCodeAt(0) !== 0xFFFD) { e[D[156][j]] = 39936 + j; d[39936 + j] = D[156][j];}
D[157] = "����������������������������������������������������������������戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫�捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼���".split("");
for(j = 0; j != D[157].length; ++j) if(D[157][j].charCodeAt(0) !== 0xFFFD) { e[D[157][j]] = 40192 + j; d[40192 + j] = D[157][j];}
D[158] = "����������������������������������������������������������������曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎�梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣���".split("");
for(j = 0; j != D[158].length; ++j) if(D[158][j].charCodeAt(0) !== 0xFFFD) { e[D[158][j]] = 40448 + j; d[40448 + j] = D[158][j];}
D[159] = "����������������������������������������������������������������檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯�麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌���".split("");
for(j = 0; j != D[159].length; ++j) if(D[159][j].charCodeAt(0) !== 0xFFFD) { e[D[159][j]] = 40704 + j; d[40704 + j] = D[159][j];}
D[224] = "����������������������������������������������������������������漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝�烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱���".split("");
for(j = 0; j != D[224].length; ++j) if(D[224][j].charCodeAt(0) !== 0xFFFD) { e[D[224][j]] = 57344 + j; d[57344 + j] = D[224][j];}
D[225] = "����������������������������������������������������������������瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿�痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬���".split("");
for(j = 0; j != D[225].length; ++j) if(D[225][j].charCodeAt(0) !== 0xFFFD) { e[D[225][j]] = 57600 + j; d[57600 + j] = D[225][j];}
D[226] = "����������������������������������������������������������������磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰�窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆���".split("");
for(j = 0; j != D[226].length; ++j) if(D[226][j].charCodeAt(0) !== 0xFFFD) { e[D[226][j]] = 57856 + j; d[57856 + j] = D[226][j];}
D[227] = "����������������������������������������������������������������紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷�縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋���".split("");
for(j = 0; j != D[227].length; ++j) if(D[227][j].charCodeAt(0) !== 0xFFFD) { e[D[227][j]] = 58112 + j; d[58112 + j] = D[227][j];}
D[228] = "����������������������������������������������������������������隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤�艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈���".split("");
for(j = 0; j != D[228].length; ++j) if(D[228][j].charCodeAt(0) !== 0xFFFD) { e[D[228][j]] = 58368 + j; d[58368 + j] = D[228][j];}
D[229] = "����������������������������������������������������������������蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬�蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞���".split("");
for(j = 0; j != D[229].length; ++j) if(D[229][j].charCodeAt(0) !== 0xFFFD) { e[D[229][j]] = 58624 + j; d[58624 + j] = D[229][j];}
D[230] = "����������������������������������������������������������������襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧�諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊���".split("");
for(j = 0; j != D[230].length; ++j) if(D[230][j].charCodeAt(0) !== 0xFFFD) { e[D[230][j]] = 58880 + j; d[58880 + j] = D[230][j];}
D[231] = "����������������������������������������������������������������蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜�轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮���".split("");
for(j = 0; j != D[231].length; ++j) if(D[231][j].charCodeAt(0) !== 0xFFFD) { e[D[231][j]] = 59136 + j; d[59136 + j] = D[231][j];}
D[232] = "����������������������������������������������������������������錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙�閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰���".split("");
for(j = 0; j != D[232].length; ++j) if(D[232][j].charCodeAt(0) !== 0xFFFD) { e[D[232][j]] = 59392 + j; d[59392 + j] = D[232][j];}
D[233] = "����������������������������������������������������������������顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃�騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈���".split("");
for(j = 0; j != D[233].length; ++j) if(D[233][j].charCodeAt(0) !== 0xFFFD) { e[D[233][j]] = 59648 + j; d[59648 + j] = D[233][j];}
D[234] = "����������������������������������������������������������������鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯�黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙�������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[234].length; ++j) if(D[234][j].charCodeAt(0) !== 0xFFFD) { e[D[234][j]] = 59904 + j; d[59904 + j] = D[234][j];}
D[237] = "����������������������������������������������������������������纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏�塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱���".split("");
for(j = 0; j != D[237].length; ++j) if(D[237][j].charCodeAt(0) !== 0xFFFD) { e[D[237][j]] = 60672 + j; d[60672 + j] = D[237][j];}
D[238] = "����������������������������������������������������������������犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙�蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑��ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ￢￤＇＂���".split("");
for(j = 0; j != D[238].length; ++j) if(D[238][j].charCodeAt(0) !== 0xFFFD) { e[D[238][j]] = 60928 + j; d[60928 + j] = D[238][j];}
D[250] = "����������������������������������������������������������������ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊�兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯���".split("");
for(j = 0; j != D[250].length; ++j) if(D[250][j].charCodeAt(0) !== 0xFFFD) { e[D[250][j]] = 64000 + j; d[64000 + j] = D[250][j];}
D[251] = "����������������������������������������������������������������涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神�祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙���".split("");
for(j = 0; j != D[251].length; ++j) if(D[251][j].charCodeAt(0) !== 0xFFFD) { e[D[251][j]] = 64256 + j; d[64256 + j] = D[251][j];}
D[252] = "����������������������������������������������������������������髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[252].length; ++j) if(D[252][j].charCodeAt(0) !== 0xFFFD) { e[D[252][j]] = 64512 + j; d[64512 + j] = D[252][j];}
return {"enc": e, "dec": d }; })();
cptable[936] = (function(){ var d = [], e = {}, D = [], j;
D[0] = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�������������������������������������������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[0].length; ++j) if(D[0][j].charCodeAt(0) !== 0xFFFD) { e[D[0][j]] = 0 + j; d[0 + j] = D[0][j];}
D[129] = "����������������������������������������������������������������丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪乫乬乭乮乯乲乴乵乶乷乸乹乺乻乼乽乿亀亁亂亃亄亅亇亊�亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂伃伄伅伆伇伈伋伌伒伓伔伕伖伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾伿佀佁佂佄佅佇佈佉佊佋佌佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢�".split("");
for(j = 0; j != D[129].length; ++j) if(D[129][j].charCodeAt(0) !== 0xFFFD) { e[D[129][j]] = 33024 + j; d[33024 + j] = D[129][j];}
D[130] = "����������������������������������������������������������������侤侫侭侰侱侲侳侴侶侷侸侹侺侻侼侽侾俀俁係俆俇俈俉俋俌俍俒俓俔俕俖俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿倀倁倂倃倄倅倆倇倈倉倊�個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯倰倱倲倳倴倵倶倷倸倹倻倽倿偀偁偂偄偅偆偉偊偋偍偐偑偒偓偔偖偗偘偙偛偝偞偟偠偡偢偣偤偦偧偨偩偪偫偭偮偯偰偱偲偳側偵偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎傏傐傑傒傓傔傕傖傗傘備傚傛傜傝傞傟傠傡傢傤傦傪傫傭傮傯傰傱傳傴債傶傷傸傹傼�".split("");
for(j = 0; j != D[130].length; ++j) if(D[130][j].charCodeAt(0) !== 0xFFFD) { e[D[130][j]] = 33280 + j; d[33280 + j] = D[130][j];}
D[131] = "����������������������������������������������������������������傽傾傿僀僁僂僃僄僅僆僇僈僉僊僋僌働僎僐僑僒僓僔僕僗僘僙僛僜僝僞僟僠僡僢僣僤僥僨僩僪僫僯僰僱僲僴僶僷僸價僺僼僽僾僿儀儁儂儃億儅儈�儉儊儌儍儎儏儐儑儓儔儕儖儗儘儙儚儛儜儝儞償儠儢儣儤儥儦儧儨儩優儫儬儭儮儯儰儱儲儳儴儵儶儷儸儹儺儻儼儽儾兂兇兊兌兎兏児兒兓兗兘兙兛兝兞兟兠兡兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦冧冨冩冪冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒凓凔凕凖凗�".split("");
for(j = 0; j != D[131].length; ++j) if(D[131][j].charCodeAt(0) !== 0xFFFD) { e[D[131][j]] = 33536 + j; d[33536 + j] = D[131][j];}
D[132] = "����������������������������������������������������������������凘凙凚凜凞凟凢凣凥処凧凨凩凪凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄剅剆則剈剉剋剎剏剒剓剕剗剘�剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳剴創剶剷剸剹剺剻剼剾劀劃劄劅劆劇劉劊劋劌劍劎劏劑劒劔劕劖劗劘劙劚劜劤劥劦劧劮劯劰労劵劶劷劸効劺劻劼劽勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務勚勛勜勝勞勠勡勢勣勥勦勧勨勩勪勫勬勭勮勯勱勲勳勴勵勶勷勸勻勼勽匁匂匃匄匇匉匊匋匌匎�".split("");
for(j = 0; j != D[132].length; ++j) if(D[132][j].charCodeAt(0) !== 0xFFFD) { e[D[132][j]] = 33792 + j; d[33792 + j] = D[132][j];}
D[133] = "����������������������������������������������������������������匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯匰匱匲匳匴匵匶匷匸匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏�厐厑厒厓厔厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯厰厱厲厳厴厵厷厸厹厺厼厽厾叀參叄叅叆叇収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝呞呟呠呡呣呥呧呩呪呫呬呭呮呯呰呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡�".split("");
for(j = 0; j != D[133].length; ++j) if(D[133][j].charCodeAt(0) !== 0xFFFD) { e[D[133][j]] = 34048 + j; d[34048 + j] = D[133][j];}
D[134] = "����������������������������������������������������������������咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠員哢哣哤哫哬哯哰哱哴哵哶哷哸哹哻哾唀唂唃唄唅唈唊唋唌唍唎唒唓唕唖唗唘唙唚唜唝唞唟唡唥唦�唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋啌啍啎問啑啒啓啔啗啘啙啚啛啝啞啟啠啢啣啨啩啫啯啰啱啲啳啴啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠喡喢喣喤喥喦喨喩喪喫喬喭單喯喰喲喴営喸喺喼喿嗀嗁嗂嗃嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗嗘嗙嗚嗛嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸嗹嗺嗻嗼嗿嘂嘃嘄嘅�".split("");
for(j = 0; j != D[134].length; ++j) if(D[134][j].charCodeAt(0) !== 0xFFFD) { e[D[134][j]] = 34304 + j; d[34304 + j] = D[134][j];}
D[135] = "����������������������������������������������������������������嘆嘇嘊嘋嘍嘐嘑嘒嘓嘔嘕嘖嘗嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀噁噂噃噄噅噆噇噈噉噊噋噏噐噑噒噓噕噖噚噛噝噞噟噠噡�噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽噾噿嚀嚁嚂嚃嚄嚇嚈嚉嚊嚋嚌嚍嚐嚑嚒嚔嚕嚖嚗嚘嚙嚚嚛嚜嚝嚞嚟嚠嚡嚢嚤嚥嚦嚧嚨嚩嚪嚫嚬嚭嚮嚰嚱嚲嚳嚴嚵嚶嚸嚹嚺嚻嚽嚾嚿囀囁囂囃囄囅囆囇囈囉囋囌囍囎囏囐囑囒囓囕囖囘囙囜団囥囦囧囨囩囪囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國圌圍圎圏圐圑�".split("");
for(j = 0; j != D[135].length; ++j) if(D[135][j].charCodeAt(0) !== 0xFFFD) { e[D[135][j]] = 34560 + j; d[34560 + j] = D[135][j];}
D[136] = "����������������������������������������������������������������園圓圔圕圖圗團圙圚圛圝圞圠圡圢圤圥圦圧圫圱圲圴圵圶圷圸圼圽圿坁坃坄坅坆坈坉坋坒坓坔坕坖坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀�垁垇垈垉垊垍垎垏垐垑垔垕垖垗垘垙垚垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹垺垻垼垽垾垿埀埁埄埅埆埇埈埉埊埌埍埐埑埓埖埗埛埜埞埡埢埣埥埦埧埨埩埪埫埬埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥堦堧堨堩堫堬堭堮堯報堲堳場堶堷堸堹堺堻堼堽�".split("");
for(j = 0; j != D[136].length; ++j) if(D[136][j].charCodeAt(0) !== 0xFFFD) { e[D[136][j]] = 34816 + j; d[34816 + j] = D[136][j];}
D[137] = "����������������������������������������������������������������堾堿塀塁塂塃塅塆塇塈塉塊塋塎塏塐塒塓塕塖塗塙塚塛塜塝塟塠塡塢塣塤塦塧塨塩塪塭塮塯塰塱塲塳塴塵塶塷塸塹塺塻塼塽塿墂墄墆墇墈墊墋墌�墍墎墏墐墑墔墕墖増墘墛墜墝墠墡墢墣墤墥墦墧墪墫墬墭墮墯墰墱墲墳墴墵墶墷墸墹墺墻墽墾墿壀壂壃壄壆壇壈壉壊壋壌壍壎壏壐壒壓壔壖壗壘壙壚壛壜壝壞壟壠壡壢壣壥壦壧壨壩壪壭壯壱売壴壵壷壸壺壻壼壽壾壿夀夁夃夅夆夈変夊夋夌夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻�".split("");
for(j = 0; j != D[137].length; ++j) if(D[137][j].charCodeAt(0) !== 0xFFFD) { e[D[137][j]] = 35072 + j; d[35072 + j] = D[137][j];}
D[138] = "����������������������������������������������������������������夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛奜奝奞奟奡奣奤奦奧奨奩奪奫奬奭奮奯奰奱奲奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦�妧妬妭妰妱妳妴妵妶妷妸妺妼妽妿姀姁姂姃姄姅姇姈姉姌姍姎姏姕姖姙姛姞姟姠姡姢姤姦姧姩姪姫姭姮姯姰姱姲姳姴姵姶姷姸姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪娫娬娭娮娯娰娳娵娷娸娹娺娻娽娾娿婁婂婃婄婅婇婈婋婌婍婎婏婐婑婒婓婔婖婗婘婙婛婜婝婞婟婠�".split("");
for(j = 0; j != D[138].length; ++j) if(D[138][j].charCodeAt(0) !== 0xFFFD) { e[D[138][j]] = 35328 + j; d[35328 + j] = D[138][j];}
D[139] = "����������������������������������������������������������������婡婣婤婥婦婨婩婫婬婭婮婯婰婱婲婳婸婹婻婼婽婾媀媁媂媃媄媅媆媇媈媉媊媋媌媍媎媏媐媑媓媔媕媖媗媘媙媜媝媞媟媠媡媢媣媤媥媦媧媨媩媫媬�媭媮媯媰媱媴媶媷媹媺媻媼媽媿嫀嫃嫄嫅嫆嫇嫈嫊嫋嫍嫎嫏嫐嫑嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬嫭嫮嫯嫰嫲嫳嫴嫵嫶嫷嫸嫹嫺嫻嫼嫽嫾嫿嬀嬁嬂嬃嬄嬅嬆嬇嬈嬊嬋嬌嬍嬎嬏嬐嬑嬒嬓嬔嬕嬘嬙嬚嬛嬜嬝嬞嬟嬠嬡嬢嬣嬤嬥嬦嬧嬨嬩嬪嬫嬬嬭嬮嬯嬰嬱嬳嬵嬶嬸嬹嬺嬻嬼嬽嬾嬿孁孂孃孄孅孆孇�".split("");
for(j = 0; j != D[139].length; ++j) if(D[139][j].charCodeAt(0) !== 0xFFFD) { e[D[139][j]] = 35584 + j; d[35584 + j] = D[139][j];}
D[140] = "����������������������������������������������������������������孈孉孊孋孌孍孎孏孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏�寑寔寕寖寗寘寙寚寛寜寠寢寣實寧審寪寫寬寭寯寱寲寳寴寵寶寷寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧屨屩屪屫屬屭屰屲屳屴屵屶屷屸屻屼屽屾岀岃岄岅岆岇岉岊岋岎岏岒岓岕岝岞岟岠岡岤岥岦岧岨�".split("");
for(j = 0; j != D[140].length; ++j) if(D[140][j].charCodeAt(0) !== 0xFFFD) { e[D[140][j]] = 35840 + j; d[35840 + j] = D[140][j];}
D[141] = "����������������������������������������������������������������岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅峆峇峈峉峊峌峍峎峏峐峑峓峔峕峖峗峘峚峛峜峝峞峟峠峢峣峧峩峫峬峮峯峱峲峳峴峵島峷峸峹峺峼峽峾峿崀�崁崄崅崈崉崊崋崌崍崏崐崑崒崓崕崗崘崙崚崜崝崟崠崡崢崣崥崨崪崫崬崯崰崱崲崳崵崶崷崸崹崺崻崼崿嵀嵁嵂嵃嵄嵅嵆嵈嵉嵍嵎嵏嵐嵑嵒嵓嵔嵕嵖嵗嵙嵚嵜嵞嵟嵠嵡嵢嵣嵤嵥嵦嵧嵨嵪嵭嵮嵰嵱嵲嵳嵵嵶嵷嵸嵹嵺嵻嵼嵽嵾嵿嶀嶁嶃嶄嶅嶆嶇嶈嶉嶊嶋嶌嶍嶎嶏嶐嶑嶒嶓嶔嶕嶖嶗嶘嶚嶛嶜嶞嶟嶠�".split("");
for(j = 0; j != D[141].length; ++j) if(D[141][j].charCodeAt(0) !== 0xFFFD) { e[D[141][j]] = 36096 + j; d[36096 + j] = D[141][j];}
D[142] = "����������������������������������������������������������������嶡嶢嶣嶤嶥嶦嶧嶨嶩嶪嶫嶬嶭嶮嶯嶰嶱嶲嶳嶴嶵嶶嶸嶹嶺嶻嶼嶽嶾嶿巀巁巂巃巄巆巇巈巉巊巋巌巎巏巐巑巒巓巔巕巖巗巘巙巚巜巟巠巣巤巪巬巭�巰巵巶巸巹巺巻巼巿帀帄帇帉帊帋帍帎帒帓帗帞帟帠帡帢帣帤帥帨帩帪師帬帯帰帲帳帴帵帶帹帺帾帿幀幁幃幆幇幈幉幊幋幍幎幏幐幑幒幓幖幗幘幙幚幜幝幟幠幣幤幥幦幧幨幩幪幫幬幭幮幯幰幱幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨庩庪庫庬庮庯庰庱庲庴庺庻庼庽庿廀廁廂廃廄廅�".split("");
for(j = 0; j != D[142].length; ++j) if(D[142][j].charCodeAt(0) !== 0xFFFD) { e[D[142][j]] = 36352 + j; d[36352 + j] = D[142][j];}
D[143] = "����������������������������������������������������������������廆廇廈廋廌廍廎廏廐廔廕廗廘廙廚廜廝廞廟廠廡廢廣廤廥廦廧廩廫廬廭廮廯廰廱廲廳廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤�弨弫弬弮弰弲弳弴張弶強弸弻弽弾弿彁彂彃彄彅彆彇彈彉彊彋彌彍彎彏彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢徣徤徥徦徧復徫徬徯徰徱徲徳徴徶徸徹徺徻徾徿忀忁忂忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇�".split("");
for(j = 0; j != D[143].length; ++j) if(D[143][j].charCodeAt(0) !== 0xFFFD) { e[D[143][j]] = 36608 + j; d[36608 + j] = D[143][j];}
D[144] = "����������������������������������������������������������������怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰怱怲怳怴怶怷怸怹怺怽怾恀恄恅恆恇恈恉恊恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀�悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽悾悿惀惁惂惃惄惇惈惉惌惍惎惏惐惒惓惔惖惗惙惛惞惡惢惣惤惥惪惱惲惵惷惸惻惼惽惾惿愂愃愄愅愇愊愋愌愐愑愒愓愔愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬愭愮愯愰愱愲愳愴愵愶愷愸愹愺愻愼愽愾慀慁慂慃慄慅慆�".split("");
for(j = 0; j != D[144].length; ++j) if(D[144][j].charCodeAt(0) !== 0xFFFD) { e[D[144][j]] = 36864 + j; d[36864 + j] = D[144][j];}
D[145] = "����������������������������������������������������������������慇慉態慍慏慐慒慓慔慖慗慘慙慚慛慜慞慟慠慡慣慤慥慦慩慪慫慬慭慮慯慱慲慳慴慶慸慹慺慻慼慽慾慿憀憁憂憃憄憅憆憇憈憉憊憌憍憏憐憑憒憓憕�憖憗憘憙憚憛憜憞憟憠憡憢憣憤憥憦憪憫憭憮憯憰憱憲憳憴憵憶憸憹憺憻憼憽憿懀懁懃懄懅懆懇應懌懍懎懏懐懓懕懖懗懘懙懚懛懜懝懞懟懠懡懢懣懤懥懧懨懩懪懫懬懭懮懯懰懱懲懳懴懶懷懸懹懺懻懼懽懾戀戁戂戃戄戅戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸戹戺戻戼扂扄扅扆扊�".split("");
for(j = 0; j != D[145].length; ++j) if(D[145][j].charCodeAt(0) !== 0xFFFD) { e[D[145][j]] = 37120 + j; d[37120 + j] = D[145][j];}
D[146] = "����������������������������������������������������������������扏扐払扖扗扙扚扜扝扞扟扠扡扢扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋抌抍抎抏抐抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁�拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳挴挵挶挷挸挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖捗捘捙捚捛捜捝捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙掚掛掜掝掞掟採掤掦掫掯掱掲掵掶掹掻掽掿揀�".split("");
for(j = 0; j != D[146].length; ++j) if(D[146][j].charCodeAt(0) !== 0xFFFD) { e[D[146][j]] = 37376 + j; d[37376 + j] = D[146][j];}
D[147] = "����������������������������������������������������������������揁揂揃揅揇揈揊揋揌揑揓揔揕揗揘揙揚換揜揝揟揢揤揥揦揧揨揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆搇搈搉搊損搎搑搒搕搖搗搘搙搚搝搟搢搣搤�搥搧搨搩搫搮搯搰搱搲搳搵搶搷搸搹搻搼搾摀摂摃摉摋摌摍摎摏摐摑摓摕摖摗摙摚摛摜摝摟摠摡摢摣摤摥摦摨摪摫摬摮摯摰摱摲摳摴摵摶摷摻摼摽摾摿撀撁撃撆撈撉撊撋撌撍撎撏撐撓撔撗撘撚撛撜撝撟撠撡撢撣撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆擇擈擉擊擋擌擏擑擓擔擕擖擙據�".split("");
for(j = 0; j != D[147].length; ++j) if(D[147][j].charCodeAt(0) !== 0xFFFD) { e[D[147][j]] = 37632 + j; d[37632 + j] = D[147][j];}
D[148] = "����������������������������������������������������������������擛擜擝擟擠擡擣擥擧擨擩擪擫擬擭擮擯擰擱擲擳擴擵擶擷擸擹擺擻擼擽擾擿攁攂攃攄攅攆攇攈攊攋攌攍攎攏攐攑攓攔攕攖攗攙攚攛攜攝攞攟攠攡�攢攣攤攦攧攨攩攪攬攭攰攱攲攳攷攺攼攽敀敁敂敃敄敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數敹敺敻敼敽敾敿斀斁斂斃斄斅斆斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱斲斳斴斵斶斷斸斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘旙旚旛旜旝旞旟旡旣旤旪旫�".split("");
for(j = 0; j != D[148].length; ++j) if(D[148][j].charCodeAt(0) !== 0xFFFD) { e[D[148][j]] = 37888 + j; d[37888 + j] = D[148][j];}
D[149] = "����������������������������������������������������������������旲旳旴旵旸旹旻旼旽旾旿昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷昸昹昺昻昽昿晀時晄晅晆晇晈晉晊晍晎晐晑晘�晙晛晜晝晞晠晢晣晥晧晩晪晫晬晭晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘暙暚暛暜暞暟暠暡暢暣暤暥暦暩暪暫暬暭暯暰暱暲暳暵暶暷暸暺暻暼暽暿曀曁曂曃曄曅曆曇曈曉曊曋曌曍曎曏曐曑曒曓曔曕曖曗曘曚曞曟曠曡曢曣曤曥曧曨曪曫曬曭曮曯曱曵曶書曺曻曽朁朂會�".split("");
for(j = 0; j != D[149].length; ++j) if(D[149][j].charCodeAt(0) !== 0xFFFD) { e[D[149][j]] = 38144 + j; d[38144 + j] = D[149][j];}
D[150] = "����������������������������������������������������������������朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠朡朢朣朤朥朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗杘杙杚杛杝杢杣杤杦杧杫杬杮東杴杶�杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹枺枻枼枽枾枿柀柂柅柆柇柈柉柊柋柌柍柎柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵柶柷柸柹柺査柼柾栁栂栃栄栆栍栐栒栔栕栘栙栚栛栜栞栟栠栢栣栤栥栦栧栨栫栬栭栮栯栰栱栴栵栶栺栻栿桇桋桍桏桒桖桗桘桙桚桛�".split("");
for(j = 0; j != D[150].length; ++j) if(D[150][j].charCodeAt(0) !== 0xFFFD) { e[D[150][j]] = 38400 + j; d[38400 + j] = D[150][j];}
D[151] = "����������������������������������������������������������������桜桝桞桟桪桬桭桮桯桰桱桲桳桵桸桹桺桻桼桽桾桿梀梂梄梇梈梉梊梋梌梍梎梐梑梒梔梕梖梘梙梚梛梜條梞梟梠梡梣梤梥梩梪梫梬梮梱梲梴梶梷梸�梹梺梻梼梽梾梿棁棃棄棅棆棇棈棊棌棎棏棐棑棓棔棖棗棙棛棜棝棞棟棡棢棤棥棦棧棨棩棪棫棬棭棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆椇椈椉椊椌椏椑椓椔椕椖椗椘椙椚椛検椝椞椡椢椣椥椦椧椨椩椪椫椬椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃楄楅楆楇楈楉楊楋楌楍楎楏楐楑楒楓楕楖楘楙楛楜楟�".split("");
for(j = 0; j != D[151].length; ++j) if(D[151][j].charCodeAt(0) !== 0xFFFD) { e[D[151][j]] = 38656 + j; d[38656 + j] = D[151][j];}
D[152] = "����������������������������������������������������������������楡楢楤楥楧楨楩楪楬業楯楰楲楳楴極楶楺楻楽楾楿榁榃榅榊榋榌榎榏榐榑榒榓榖榗榙榚榝榞榟榠榡榢榣榤榥榦榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽�榾榿槀槂槃槄槅槆槇槈槉構槍槏槑槒槓槕槖槗様槙槚槜槝槞槡槢槣槤槥槦槧槨槩槪槫槬槮槯槰槱槳槴槵槶槷槸槹槺槻槼槾樀樁樂樃樄樅樆樇樈樉樋樌樍樎樏樐樑樒樓樔樕樖標樚樛樜樝樞樠樢樣樤樥樦樧権樫樬樭樮樰樲樳樴樶樷樸樹樺樻樼樿橀橁橂橃橅橆橈橉橊橋橌橍橎橏橑橒橓橔橕橖橗橚�".split("");
for(j = 0; j != D[152].length; ++j) if(D[152][j].charCodeAt(0) !== 0xFFFD) { e[D[152][j]] = 38912 + j; d[38912 + j] = D[152][j];}
D[153] = "����������������������������������������������������������������橜橝橞機橠橢橣橤橦橧橨橩橪橫橬橭橮橯橰橲橳橴橵橶橷橸橺橻橽橾橿檁檂檃檅檆檇檈檉檊檋檌檍檏檒檓檔檕檖檘檙檚檛檜檝檞檟檡檢檣檤檥檦�檧檨檪檭檮檯檰檱檲檳檴檵檶檷檸檹檺檻檼檽檾檿櫀櫁櫂櫃櫄櫅櫆櫇櫈櫉櫊櫋櫌櫍櫎櫏櫐櫑櫒櫓櫔櫕櫖櫗櫘櫙櫚櫛櫜櫝櫞櫟櫠櫡櫢櫣櫤櫥櫦櫧櫨櫩櫪櫫櫬櫭櫮櫯櫰櫱櫲櫳櫴櫵櫶櫷櫸櫹櫺櫻櫼櫽櫾櫿欀欁欂欃欄欅欆欇欈欉權欋欌欍欎欏欐欑欒欓欔欕欖欗欘欙欚欛欜欝欞欟欥欦欨欩欪欫欬欭欮�".split("");
for(j = 0; j != D[153].length; ++j) if(D[153][j].charCodeAt(0) !== 0xFFFD) { e[D[153][j]] = 39168 + j; d[39168 + j] = D[153][j];}
D[154] = "����������������������������������������������������������������欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍歎歏歐歑歒歓歔歕歖歗歘歚歛歜歝歞歟歠歡歨歩歫歬歭歮歯歰歱歲歳歴歵歶歷歸歺歽歾歿殀殅殈�殌殎殏殐殑殔殕殗殘殙殜殝殞殟殠殢殣殤殥殦殧殨殩殫殬殭殮殯殰殱殲殶殸殹殺殻殼殽殾毀毃毄毆毇毈毉毊毌毎毐毑毘毚毜毝毞毟毠毢毣毤毥毦毧毨毩毬毭毮毰毱毲毴毶毷毸毺毻毼毾毿氀氁氂氃氄氈氉氊氋氌氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋汌汍汎汏汑汒汓汖汘�".split("");
for(j = 0; j != D[154].length; ++j) if(D[154][j].charCodeAt(0) !== 0xFFFD) { e[D[154][j]] = 39424 + j; d[39424 + j] = D[154][j];}
D[155] = "����������������������������������������������������������������汙汚汢汣汥汦汧汫汬汭汮汯汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘�泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟洠洡洢洣洤洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽浾浿涀涁涃涄涆涇涊涋涍涏涐涒涖涗涘涙涚涜涢涥涬涭涰涱涳涴涶涷涹涺涻涼涽涾淁淂淃淈淉淊�".split("");
for(j = 0; j != D[155].length; ++j) if(D[155][j].charCodeAt(0) !== 0xFFFD) { e[D[155][j]] = 39680 + j; d[39680 + j] = D[155][j];}
D[156] = "����������������������������������������������������������������淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽淾淿渀渁渂渃渄渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵�渶渷渹渻渼渽渾渿湀湁湂湅湆湇湈湉湊湋湌湏湐湑湒湕湗湙湚湜湝湞湠湡湢湣湤湥湦湧湨湩湪湬湭湯湰湱湲湳湴湵湶湷湸湹湺湻湼湽満溁溂溄溇溈溊溋溌溍溎溑溒溓溔溕準溗溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪滫滬滭滮滯�".split("");
for(j = 0; j != D[156].length; ++j) if(D[156][j].charCodeAt(0) !== 0xFFFD) { e[D[156][j]] = 39936 + j; d[39936 + j] = D[156][j];}
D[157] = "����������������������������������������������������������������滰滱滲滳滵滶滷滸滺滻滼滽滾滿漀漁漃漄漅漇漈漊漋漌漍漎漐漑漒漖漗漘漙漚漛漜漝漞漟漡漢漣漥漦漧漨漬漮漰漲漴漵漷漸漹漺漻漼漽漿潀潁潂�潃潄潅潈潉潊潌潎潏潐潑潒潓潔潕潖潗潙潚潛潝潟潠潡潣潤潥潧潨潩潪潫潬潯潰潱潳潵潶潷潹潻潽潾潿澀澁澂澃澅澆澇澊澋澏澐澑澒澓澔澕澖澗澘澙澚澛澝澞澟澠澢澣澤澥澦澨澩澪澫澬澭澮澯澰澱澲澴澵澷澸澺澻澼澽澾澿濁濃濄濅濆濇濈濊濋濌濍濎濏濐濓濔濕濖濗濘濙濚濛濜濝濟濢濣濤濥�".split("");
for(j = 0; j != D[157].length; ++j) if(D[157][j].charCodeAt(0) !== 0xFFFD) { e[D[157][j]] = 40192 + j; d[40192 + j] = D[157][j];}
D[158] = "����������������������������������������������������������������濦濧濨濩濪濫濬濭濰濱濲濳濴濵濶濷濸濹濺濻濼濽濾濿瀀瀁瀂瀃瀄瀅瀆瀇瀈瀉瀊瀋瀌瀍瀎瀏瀐瀒瀓瀔瀕瀖瀗瀘瀙瀜瀝瀞瀟瀠瀡瀢瀤瀥瀦瀧瀨瀩瀪�瀫瀬瀭瀮瀯瀰瀱瀲瀳瀴瀶瀷瀸瀺瀻瀼瀽瀾瀿灀灁灂灃灄灅灆灇灈灉灊灋灍灎灐灑灒灓灔灕灖灗灘灙灚灛灜灝灟灠灡灢灣灤灥灦灧灨灩灪灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞炟炠炡炢炣炤炥炦炧炨炩炪炰炲炴炵炶為炾炿烄烅烆烇烉烋烌烍烎烏烐烑烒烓烔烕烖烗烚�".split("");
for(j = 0; j != D[158].length; ++j) if(D[158][j].charCodeAt(0) !== 0xFFFD) { e[D[158][j]] = 40448 + j; d[40448 + j] = D[158][j];}
D[159] = "����������������������������������������������������������������烜烝烞烠烡烢烣烥烪烮烰烱烲烳烴烵烶烸烺烻烼烾烿焀焁焂焃焄焅焆焇焈焋焌焍焎焏焑焒焔焗焛焜焝焞焟焠無焢焣焤焥焧焨焩焪焫焬焭焮焲焳焴�焵焷焸焹焺焻焼焽焾焿煀煁煂煃煄煆煇煈煉煋煍煏煐煑煒煓煔煕煖煗煘煙煚煛煝煟煠煡煢煣煥煩煪煫煬煭煯煰煱煴煵煶煷煹煻煼煾煿熀熁熂熃熅熆熇熈熉熋熌熍熎熐熑熒熓熕熖熗熚熛熜熝熞熡熢熣熤熥熦熧熩熪熫熭熮熯熰熱熲熴熶熷熸熺熻熼熽熾熿燀燁燂燄燅燆燇燈燉燊燋燌燍燏燐燑燒燓�".split("");
for(j = 0; j != D[159].length; ++j) if(D[159][j].charCodeAt(0) !== 0xFFFD) { e[D[159][j]] = 40704 + j; d[40704 + j] = D[159][j];}
D[160] = "����������������������������������������������������������������燖燗燘燙燚燛燜燝燞營燡燢燣燤燦燨燩燪燫燬燭燯燰燱燲燳燴燵燶燷燸燺燻燼燽燾燿爀爁爂爃爄爅爇爈爉爊爋爌爍爎爏爐爑爒爓爔爕爖爗爘爙爚�爛爜爞爟爠爡爢爣爤爥爦爧爩爫爭爮爯爲爳爴爺爼爾牀牁牂牃牄牅牆牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅犆犇犈犉犌犎犐犑犓犔犕犖犗犘犙犚犛犜犝犞犠犡犢犣犤犥犦犧犨犩犪犫犮犱犲犳犵犺犻犼犽犾犿狀狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛�".split("");
for(j = 0; j != D[160].length; ++j) if(D[160][j].charCodeAt(0) !== 0xFFFD) { e[D[160][j]] = 40960 + j; d[40960 + j] = D[160][j];}
D[161] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈〉《》「」『』〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓�".split("");
for(j = 0; j != D[161].length; ++j) if(D[161][j].charCodeAt(0) !== 0xFFFD) { e[D[161][j]] = 41216 + j; d[41216 + j] = D[161][j];}
D[162] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ������⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇①②③④⑤⑥⑦⑧⑨⑩��㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩��ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ���".split("");
for(j = 0; j != D[162].length; ++j) if(D[162][j].charCodeAt(0) !== 0xFFFD) { e[D[162][j]] = 41472 + j; d[41472 + j] = D[162][j];}
D[163] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������！＂＃￥％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝￣�".split("");
for(j = 0; j != D[163].length; ++j) if(D[163][j].charCodeAt(0) !== 0xFFFD) { e[D[163][j]] = 41728 + j; d[41728 + j] = D[163][j];}
D[164] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん������������".split("");
for(j = 0; j != D[164].length; ++j) if(D[164][j].charCodeAt(0) !== 0xFFFD) { e[D[164][j]] = 41984 + j; d[41984 + j] = D[164][j];}
D[165] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ���������".split("");
for(j = 0; j != D[165].length; ++j) if(D[165][j].charCodeAt(0) !== 0xFFFD) { e[D[165][j]] = 42240 + j; d[42240 + j] = D[165][j];}
D[166] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ��������αβγδεζηθικλμνξοπρστυφχψω�������︵︶︹︺︿﹀︽︾﹁﹂﹃﹄��︻︼︷︸︱�︳︴����������".split("");
for(j = 0; j != D[166].length; ++j) if(D[166][j].charCodeAt(0) !== 0xFFFD) { e[D[166][j]] = 42496 + j; d[42496 + j] = D[166][j];}
D[167] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ���������������абвгдеёжзийклмнопрстуфхцчшщъыьэюя��������������".split("");
for(j = 0; j != D[167].length; ++j) if(D[167][j].charCodeAt(0) !== 0xFFFD) { e[D[167][j]] = 42752 + j; d[42752 + j] = D[167][j];}
D[168] = "����������������������������������������������������������������ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳▁▂▃▄▅▆▇�█▉▊▋▌▍▎▏▓▔▕▼▽◢◣◤◥☉⊕〒〝〞�����������āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ�ńň�ɡ����ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ����������������������".split("");
for(j = 0; j != D[168].length; ++j) if(D[168][j].charCodeAt(0) !== 0xFFFD) { e[D[168][j]] = 43008 + j; d[43008 + j] = D[168][j];}
D[169] = "����������������������������������������������������������������〡〢〣〤〥〦〧〨〩㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤�℡㈱�‐���ー゛゜ヽヾ〆ゝゞ﹉﹊﹋﹌﹍﹎﹏﹐﹑﹒﹔﹕﹖﹗﹙﹚﹛﹜﹝﹞﹟﹠﹡�﹢﹣﹤﹥﹦﹨﹩﹪﹫�������������〇�������������─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋����������������".split("");
for(j = 0; j != D[169].length; ++j) if(D[169][j].charCodeAt(0) !== 0xFFFD) { e[D[169][j]] = 43264 + j; d[43264 + j] = D[169][j];}
D[170] = "����������������������������������������������������������������狜狝狟狢狣狤狥狦狧狪狫狵狶狹狽狾狿猀猂猄猅猆猇猈猉猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀獁獂獃獄獅獆獇獈�獉獊獋獌獎獏獑獓獔獕獖獘獙獚獛獜獝獞獟獡獢獣獤獥獦獧獨獩獪獫獮獰獱�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[170].length; ++j) if(D[170][j].charCodeAt(0) !== 0xFFFD) { e[D[170][j]] = 43520 + j; d[43520 + j] = D[170][j];}
D[171] = "����������������������������������������������������������������獲獳獴獵獶獷獸獹獺獻獼獽獿玀玁玂玃玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣玤玥玦玧玨玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃珄珅珆珇�珋珌珎珒珓珔珕珖珗珘珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳珴珵珶珷�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[171].length; ++j) if(D[171][j].charCodeAt(0) !== 0xFFFD) { e[D[171][j]] = 43776 + j; d[43776 + j] = D[171][j];}
D[172] = "����������������������������������������������������������������珸珹珺珻珼珽現珿琀琁琂琄琇琈琋琌琍琎琑琒琓琔琕琖琗琘琙琜琝琞琟琠琡琣琤琧琩琫琭琯琱琲琷琸琹琺琻琽琾琿瑀瑂瑃瑄瑅瑆瑇瑈瑉瑊瑋瑌瑍�瑎瑏瑐瑑瑒瑓瑔瑖瑘瑝瑠瑡瑢瑣瑤瑥瑦瑧瑨瑩瑪瑫瑬瑮瑯瑱瑲瑳瑴瑵瑸瑹瑺�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[172].length; ++j) if(D[172][j].charCodeAt(0) !== 0xFFFD) { e[D[172][j]] = 44032 + j; d[44032 + j] = D[172][j];}
D[173] = "����������������������������������������������������������������瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑璒璓璔璕璖璗璘璙璚璛璝璟璠璡璢璣璤璥璦璪璫璬璭璮璯環璱璲璳璴璵璶璷璸璹璻璼璽璾璿瓀瓁瓂瓃瓄瓅瓆瓇�瓈瓉瓊瓋瓌瓍瓎瓏瓐瓑瓓瓔瓕瓖瓗瓘瓙瓚瓛瓝瓟瓡瓥瓧瓨瓩瓪瓫瓬瓭瓰瓱瓲�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[173].length; ++j) if(D[173][j].charCodeAt(0) !== 0xFFFD) { e[D[173][j]] = 44288 + j; d[44288 + j] = D[173][j];}
D[174] = "����������������������������������������������������������������瓳瓵瓸瓹瓺瓻瓼瓽瓾甀甁甂甃甅甆甇甈甉甊甋甌甎甐甒甔甕甖甗甛甝甞甠甡產産甤甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘�畝畞畟畠畡畢畣畤畧畨畩畫畬畭畮畯異畱畳畵當畷畺畻畼畽畾疀疁疂疄疅疇�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[174].length; ++j) if(D[174][j].charCodeAt(0) !== 0xFFFD) { e[D[174][j]] = 44544 + j; d[44544 + j] = D[174][j];}
D[175] = "����������������������������������������������������������������疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦疧疨疩疪疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇�瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[175].length; ++j) if(D[175][j].charCodeAt(0) !== 0xFFFD) { e[D[175][j]] = 44800 + j; d[44800 + j] = D[175][j];}
D[176] = "����������������������������������������������������������������癅癆癇癈癉癊癋癎癏癐癑癒癓癕癗癘癙癚癛癝癟癠癡癢癤癥癦癧癨癩癪癬癭癮癰癱癲癳癴癵癶癷癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛�皜皝皞皟皠皡皢皣皥皦皧皨皩皪皫皬皭皯皰皳皵皶皷皸皹皺皻皼皽皾盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥�".split("");
for(j = 0; j != D[176].length; ++j) if(D[176][j].charCodeAt(0) !== 0xFFFD) { e[D[176][j]] = 45056 + j; d[45056 + j] = D[176][j];}
D[177] = "����������������������������������������������������������������盄盇盉盋盌盓盕盙盚盜盝盞盠盡盢監盤盦盧盨盩盪盫盬盭盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎眏眐眑眒眓眔眕眖眗眘眛眜眝眞眡眣眤眥眧眪眫�眬眮眰眱眲眳眴眹眻眽眾眿睂睄睅睆睈睉睊睋睌睍睎睏睒睓睔睕睖睗睘睙睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳�".split("");
for(j = 0; j != D[177].length; ++j) if(D[177][j].charCodeAt(0) !== 0xFFFD) { e[D[177][j]] = 45312 + j; d[45312 + j] = D[177][j];}
D[178] = "����������������������������������������������������������������睝睞睟睠睤睧睩睪睭睮睯睰睱睲睳睴睵睶睷睸睺睻睼瞁瞂瞃瞆瞇瞈瞉瞊瞋瞏瞐瞓瞔瞕瞖瞗瞘瞙瞚瞛瞜瞝瞞瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶瞷瞸瞹瞺�瞼瞾矀矁矂矃矄矅矆矇矈矉矊矋矌矎矏矐矑矒矓矔矕矖矘矙矚矝矞矟矠矡矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖�".split("");
for(j = 0; j != D[178].length; ++j) if(D[178][j].charCodeAt(0) !== 0xFFFD) { e[D[178][j]] = 45568 + j; d[45568 + j] = D[178][j];}
D[179] = "����������������������������������������������������������������矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃砄砅砆砇砈砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚�硛硜硞硟硠硡硢硣硤硥硦硧硨硩硯硰硱硲硳硴硵硶硸硹硺硻硽硾硿碀碁碂碃场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚�".split("");
for(j = 0; j != D[179].length; ++j) if(D[179][j].charCodeAt(0) !== 0xFFFD) { e[D[179][j]] = 45824 + j; d[45824 + j] = D[179][j];}
D[180] = "����������������������������������������������������������������碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨碩碪碫碬碭碮碯碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚磛磜磝磞磟磠磡磢磣�磤磥磦磧磩磪磫磭磮磯磰磱磳磵磶磸磹磻磼磽磾磿礀礂礃礄礆礇礈礉礊礋礌础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮�".split("");
for(j = 0; j != D[180].length; ++j) if(D[180][j].charCodeAt(0) !== 0xFFFD) { e[D[180][j]] = 46080 + j; d[46080 + j] = D[180][j];}
D[181] = "����������������������������������������������������������������礍礎礏礐礑礒礔礕礖礗礘礙礚礛礜礝礟礠礡礢礣礥礦礧礨礩礪礫礬礭礮礯礰礱礲礳礵礶礷礸礹礽礿祂祃祄祅祇祊祋祌祍祎祏祐祑祒祔祕祘祙祡祣�祤祦祩祪祫祬祮祰祱祲祳祴祵祶祹祻祼祽祾祿禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠�".split("");
for(j = 0; j != D[181].length; ++j) if(D[181][j].charCodeAt(0) !== 0xFFFD) { e[D[181][j]] = 46336 + j; d[46336 + j] = D[181][j];}
D[182] = "����������������������������������������������������������������禓禔禕禖禗禘禙禛禜禝禞禟禠禡禢禣禤禥禦禨禩禪禫禬禭禮禯禰禱禲禴禵禶禷禸禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙秚秛秜秝秞秠秡秢秥秨秪�秬秮秱秲秳秴秵秶秷秹秺秼秾秿稁稄稅稇稈稉稊稌稏稐稑稒稓稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二�".split("");
for(j = 0; j != D[182].length; ++j) if(D[182][j].charCodeAt(0) !== 0xFFFD) { e[D[182][j]] = 46592 + j; d[46592 + j] = D[182][j];}
D[183] = "����������������������������������������������������������������稝稟稡稢稤稥稦稧稨稩稪稫稬稭種稯稰稱稲稴稵稶稸稺稾穀穁穂穃穄穅穇穈穉穊穋穌積穎穏穐穒穓穔穕穖穘穙穚穛穜穝穞穟穠穡穢穣穤穥穦穧穨�穩穪穫穬穭穮穯穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服�".split("");
for(j = 0; j != D[183].length; ++j) if(D[183][j].charCodeAt(0) !== 0xFFFD) { e[D[183][j]] = 46848 + j; d[46848 + j] = D[183][j];}
D[184] = "����������������������������������������������������������������窣窤窧窩窪窫窮窯窰窱窲窴窵窶窷窸窹窺窻窼窽窾竀竁竂竃竄竅竆竇竈竉竊竌竍竎竏竐竑竒竓竔竕竗竘竚竛竜竝竡竢竤竧竨竩竪竫竬竮竰竱竲竳�竴竵競竷竸竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹�".split("");
for(j = 0; j != D[184].length; ++j) if(D[184][j].charCodeAt(0) !== 0xFFFD) { e[D[184][j]] = 47104 + j; d[47104 + j] = D[184][j];}
D[185] = "����������������������������������������������������������������笯笰笲笴笵笶笷笹笻笽笿筀筁筂筃筄筆筈筊筍筎筓筕筗筙筜筞筟筡筣筤筥筦筧筨筩筪筫筬筭筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆箇箈箉箊箋箌箎箏�箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹箺箻箼箽箾箿節篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈�".split("");
for(j = 0; j != D[185].length; ++j) if(D[185][j].charCodeAt(0) !== 0xFFFD) { e[D[185][j]] = 47360 + j; d[47360 + j] = D[185][j];}
D[186] = "����������������������������������������������������������������篅篈築篊篋篍篎篏篐篒篔篕篖篗篘篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲篳篴篵篶篸篹篺篻篽篿簀簁簂簃簄簅簆簈簉簊簍簎簐簑簒簓簔簕簗簘簙�簚簛簜簝簞簠簡簢簣簤簥簨簩簫簬簭簮簯簰簱簲簳簴簵簶簷簹簺簻簼簽簾籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖�".split("");
for(j = 0; j != D[186].length; ++j) if(D[186][j].charCodeAt(0) !== 0xFFFD) { e[D[186][j]] = 47616 + j; d[47616 + j] = D[186][j];}
D[187] = "����������������������������������������������������������������籃籄籅籆籇籈籉籊籋籌籎籏籐籑籒籓籔籕籖籗籘籙籚籛籜籝籞籟籠籡籢籣籤籥籦籧籨籩籪籫籬籭籮籯籰籱籲籵籶籷籸籹籺籾籿粀粁粂粃粄粅粆粇�粈粊粋粌粍粎粏粐粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴粵粶粷粸粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕�".split("");
for(j = 0; j != D[187].length; ++j) if(D[187][j].charCodeAt(0) !== 0xFFFD) { e[D[187][j]] = 47872 + j; d[47872 + j] = D[187][j];}
D[188] = "����������������������������������������������������������������粿糀糂糃糄糆糉糋糎糏糐糑糒糓糔糘糚糛糝糞糡糢糣糤糥糦糧糩糪糫糬糭糮糰糱糲糳糴糵糶糷糹糺糼糽糾糿紀紁紂紃約紅紆紇紈紉紋紌納紎紏紐�紑紒紓純紕紖紗紘紙級紛紜紝紞紟紡紣紤紥紦紨紩紪紬紭紮細紱紲紳紴紵紶肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件�".split("");
for(j = 0; j != D[188].length; ++j) if(D[188][j].charCodeAt(0) !== 0xFFFD) { e[D[188][j]] = 48128 + j; d[48128 + j] = D[188][j];}
D[189] = "����������������������������������������������������������������紷紸紹紺紻紼紽紾紿絀絁終絃組絅絆絇絈絉絊絋経絍絎絏結絑絒絓絔絕絖絗絘絙絚絛絜絝絞絟絠絡絢絣絤絥給絧絨絩絪絫絬絭絯絰統絲絳絴絵絶�絸絹絺絻絼絽絾絿綀綁綂綃綄綅綆綇綈綉綊綋綌綍綎綏綐綑綒經綔綕綖綗綘健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸�".split("");
for(j = 0; j != D[189].length; ++j) if(D[189][j].charCodeAt(0) !== 0xFFFD) { e[D[189][j]] = 48384 + j; d[48384 + j] = D[189][j];}
D[190] = "����������������������������������������������������������������継続綛綜綝綞綟綠綡綢綣綤綥綧綨綩綪綫綬維綯綰綱網綳綴綵綶綷綸綹綺綻綼綽綾綿緀緁緂緃緄緅緆緇緈緉緊緋緌緍緎総緐緑緒緓緔緕緖緗緘緙�線緛緜緝緞緟締緡緢緣緤緥緦緧編緩緪緫緬緭緮緯緰緱緲緳練緵緶緷緸緹緺尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻�".split("");
for(j = 0; j != D[190].length; ++j) if(D[190][j].charCodeAt(0) !== 0xFFFD) { e[D[190][j]] = 48640 + j; d[48640 + j] = D[190][j];}
D[191] = "����������������������������������������������������������������緻緼緽緾緿縀縁縂縃縄縅縆縇縈縉縊縋縌縍縎縏縐縑縒縓縔縕縖縗縘縙縚縛縜縝縞縟縠縡縢縣縤縥縦縧縨縩縪縫縬縭縮縯縰縱縲縳縴縵縶縷縸縹�縺縼總績縿繀繂繃繄繅繆繈繉繊繋繌繍繎繏繐繑繒繓織繕繖繗繘繙繚繛繜繝俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀�".split("");
for(j = 0; j != D[191].length; ++j) if(D[191][j].charCodeAt(0) !== 0xFFFD) { e[D[191][j]] = 48896 + j; d[48896 + j] = D[191][j];}
D[192] = "����������������������������������������������������������������繞繟繠繡繢繣繤繥繦繧繨繩繪繫繬繭繮繯繰繱繲繳繴繵繶繷繸繹繺繻繼繽繾繿纀纁纃纄纅纆纇纈纉纊纋續纍纎纏纐纑纒纓纔纕纖纗纘纙纚纜纝纞�纮纴纻纼绖绤绬绹缊缐缞缷缹缻缼缽缾缿罀罁罃罆罇罈罉罊罋罌罍罎罏罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐�".split("");
for(j = 0; j != D[192].length; ++j) if(D[192][j].charCodeAt(0) !== 0xFFFD) { e[D[192][j]] = 49152 + j; d[49152 + j] = D[192][j];}
D[193] = "����������������������������������������������������������������罖罙罛罜罝罞罠罣罤罥罦罧罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂羃羄羅羆羇羈羉羋羍羏羐羑羒羓羕羖羗羘羙羛羜羠羢羣羥羦羨義羪羫羬羭羮羱�羳羴羵羶羷羺羻羾翀翂翃翄翆翇翈翉翋翍翏翐翑習翓翖翗翙翚翛翜翝翞翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿�".split("");
for(j = 0; j != D[193].length; ++j) if(D[193][j].charCodeAt(0) !== 0xFFFD) { e[D[193][j]] = 49408 + j; d[49408 + j] = D[193][j];}
D[194] = "����������������������������������������������������������������翤翧翨翪翫翬翭翯翲翴翵翶翷翸翹翺翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫耬耭耮耯耰耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗�聙聛聜聝聞聟聠聡聢聣聤聥聦聧聨聫聬聭聮聯聰聲聳聴聵聶職聸聹聺聻聼聽隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫�".split("");
for(j = 0; j != D[194].length; ++j) if(D[194][j].charCodeAt(0) !== 0xFFFD) { e[D[194][j]] = 49664 + j; d[49664 + j] = D[194][j];}
D[195] = "����������������������������������������������������������������聾肁肂肅肈肊肍肎肏肐肑肒肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇胈胉胊胋胏胐胑胒胓胔胕胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋�脌脕脗脙脛脜脝脟脠脡脢脣脤脥脦脧脨脩脪脫脭脮脰脳脴脵脷脹脺脻脼脽脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸�".split("");
for(j = 0; j != D[195].length; ++j) if(D[195][j].charCodeAt(0) !== 0xFFFD) { e[D[195][j]] = 49920 + j; d[49920 + j] = D[195][j];}
D[196] = "����������������������������������������������������������������腀腁腂腃腄腅腇腉腍腎腏腒腖腗腘腛腜腝腞腟腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃膄膅膆膇膉膋膌膍膎膐膒膓膔膕膖膗膙膚膞膟膠膡膢膤膥�膧膩膫膬膭膮膯膰膱膲膴膵膶膷膸膹膼膽膾膿臄臅臇臈臉臋臍臎臏臐臑臒臓摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁�".split("");
for(j = 0; j != D[196].length; ++j) if(D[196][j].charCodeAt(0) !== 0xFFFD) { e[D[196][j]] = 50176 + j; d[50176 + j] = D[196][j];}
D[197] = "����������������������������������������������������������������臔臕臖臗臘臙臚臛臜臝臞臟臠臡臢臤臥臦臨臩臫臮臯臰臱臲臵臶臷臸臹臺臽臿舃與興舉舊舋舎舏舑舓舕舖舗舘舙舚舝舠舤舥舦舧舩舮舲舺舼舽舿�艀艁艂艃艅艆艈艊艌艍艎艐艑艒艓艔艕艖艗艙艛艜艝艞艠艡艢艣艤艥艦艧艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗�".split("");
for(j = 0; j != D[197].length; ++j) if(D[197][j].charCodeAt(0) !== 0xFFFD) { e[D[197][j]] = 50432 + j; d[50432 + j] = D[197][j];}
D[198] = "����������������������������������������������������������������艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸�苺苼苽苾苿茀茊茋茍茐茒茓茖茘茙茝茞茟茠茡茢茣茤茥茦茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐�".split("");
for(j = 0; j != D[198].length; ++j) if(D[198][j].charCodeAt(0) !== 0xFFFD) { e[D[198][j]] = 50688 + j; d[50688 + j] = D[198][j];}
D[199] = "����������������������������������������������������������������茾茿荁荂荄荅荈荊荋荌荍荎荓荕荖荗荘荙荝荢荰荱荲荳荴荵荶荹荺荾荿莀莁莂莃莄莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡莢莣莤莥莦莧莬莭莮�莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠�".split("");
for(j = 0; j != D[199].length; ++j) if(D[199][j].charCodeAt(0) !== 0xFFFD) { e[D[199][j]] = 50944 + j; d[50944 + j] = D[199][j];}
D[200] = "����������������������������������������������������������������菮華菳菴菵菶菷菺菻菼菾菿萀萂萅萇萈萉萊萐萒萓萔萕萖萗萙萚萛萞萟萠萡萢萣萩萪萫萬萭萮萯萰萲萳萴萵萶萷萹萺萻萾萿葀葁葂葃葄葅葇葈葉�葊葋葌葍葎葏葐葒葓葔葕葖葘葝葞葟葠葢葤葥葦葧葨葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁�".split("");
for(j = 0; j != D[200].length; ++j) if(D[200][j].charCodeAt(0) !== 0xFFFD) { e[D[200][j]] = 51200 + j; d[51200 + j] = D[200][j];}
D[201] = "����������������������������������������������������������������葽葾葿蒀蒁蒃蒄蒅蒆蒊蒍蒏蒐蒑蒒蒓蒔蒕蒖蒘蒚蒛蒝蒞蒟蒠蒢蒣蒤蒥蒦蒧蒨蒩蒪蒫蒬蒭蒮蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗�蓘蓙蓚蓛蓜蓞蓡蓢蓤蓧蓨蓩蓪蓫蓭蓮蓯蓱蓲蓳蓴蓵蓶蓷蓸蓹蓺蓻蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳�".split("");
for(j = 0; j != D[201].length; ++j) if(D[201][j].charCodeAt(0) !== 0xFFFD) { e[D[201][j]] = 51456 + j; d[51456 + j] = D[201][j];}
D[202] = "����������������������������������������������������������������蔃蔄蔅蔆蔇蔈蔉蔊蔋蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢蔣蔤蔥蔦蔧蔨蔩蔪蔭蔮蔯蔰蔱蔲蔳蔴蔵蔶蔾蔿蕀蕁蕂蕄蕅蕆蕇蕋蕌蕍蕎蕏蕐蕑蕒蕓蕔蕕�蕗蕘蕚蕛蕜蕝蕟蕠蕡蕢蕣蕥蕦蕧蕩蕪蕫蕬蕭蕮蕯蕰蕱蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱�".split("");
for(j = 0; j != D[202].length; ++j) if(D[202][j].charCodeAt(0) !== 0xFFFD) { e[D[202][j]] = 51712 + j; d[51712 + j] = D[202][j];}
D[203] = "����������������������������������������������������������������薂薃薆薈薉薊薋薌薍薎薐薑薒薓薔薕薖薗薘薙薚薝薞薟薠薡薢薣薥薦薧薩薫薬薭薱薲薳薴薵薶薸薺薻薼薽薾薿藀藂藃藄藅藆藇藈藊藋藌藍藎藑藒�藔藖藗藘藙藚藛藝藞藟藠藡藢藣藥藦藧藨藪藫藬藭藮藯藰藱藲藳藴藵藶藷藸恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔�".split("");
for(j = 0; j != D[203].length; ++j) if(D[203][j].charCodeAt(0) !== 0xFFFD) { e[D[203][j]] = 51968 + j; d[51968 + j] = D[203][j];}
D[204] = "����������������������������������������������������������������藹藺藼藽藾蘀蘁蘂蘃蘄蘆蘇蘈蘉蘊蘋蘌蘍蘎蘏蘐蘒蘓蘔蘕蘗蘘蘙蘚蘛蘜蘝蘞蘟蘠蘡蘢蘣蘤蘥蘦蘨蘪蘫蘬蘭蘮蘯蘰蘱蘲蘳蘴蘵蘶蘷蘹蘺蘻蘽蘾蘿虀�虁虂虃虄虅虆虇虈虉虊虋虌虒虓處虖虗虘虙虛虜虝號虠虡虣虤虥虦虧虨虩虪獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃�".split("");
for(j = 0; j != D[204].length; ++j) if(D[204][j].charCodeAt(0) !== 0xFFFD) { e[D[204][j]] = 52224 + j; d[52224 + j] = D[204][j];}
D[205] = "����������������������������������������������������������������虭虯虰虲虳虴虵虶虷虸蚃蚄蚅蚆蚇蚈蚉蚎蚏蚐蚑蚒蚔蚖蚗蚘蚙蚚蚛蚞蚟蚠蚡蚢蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻蚼蚽蚾蚿蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜�蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威�".split("");
for(j = 0; j != D[205].length; ++j) if(D[205][j].charCodeAt(0) !== 0xFFFD) { e[D[205][j]] = 52480 + j; d[52480 + j] = D[205][j];}
D[206] = "����������������������������������������������������������������蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀蝁蝂蝃蝄蝅蝆蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚蝛蝜蝝蝞蝟蝡蝢蝦蝧蝨蝩蝪蝫蝬蝭蝯蝱蝲蝳蝵�蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎螏螐螑螒螔螕螖螘螙螚螛螜螝螞螠螡螢螣螤巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺�".split("");
for(j = 0; j != D[206].length; ++j) if(D[206][j].charCodeAt(0) !== 0xFFFD) { e[D[206][j]] = 52736 + j; d[52736 + j] = D[206][j];}
D[207] = "����������������������������������������������������������������螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁蟂蟃蟄蟅蟇蟈蟉蟌蟍蟎蟏蟐蟔蟕蟖蟗蟘蟙蟚蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯蟰蟱蟲蟳蟴蟵蟶蟷蟸�蟺蟻蟼蟽蟿蠀蠁蠂蠄蠅蠆蠇蠈蠉蠋蠌蠍蠎蠏蠐蠑蠒蠔蠗蠘蠙蠚蠜蠝蠞蠟蠠蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓�".split("");
for(j = 0; j != D[207].length; ++j) if(D[207][j].charCodeAt(0) !== 0xFFFD) { e[D[207][j]] = 52992 + j; d[52992 + j] = D[207][j];}
D[208] = "����������������������������������������������������������������蠤蠥蠦蠧蠨蠩蠪蠫蠬蠭蠮蠯蠰蠱蠳蠴蠵蠶蠷蠸蠺蠻蠽蠾蠿衁衂衃衆衇衈衉衊衋衎衏衐衑衒術衕衖衘衚衛衜衝衞衟衠衦衧衪衭衯衱衳衴衵衶衸衹衺�衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗袘袙袚袛袝袞袟袠袡袣袥袦袧袨袩袪小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄�".split("");
for(j = 0; j != D[208].length; ++j) if(D[208][j].charCodeAt(0) !== 0xFFFD) { e[D[208][j]] = 53248 + j; d[53248 + j] = D[208][j];}
D[209] = "����������������������������������������������������������������袬袮袯袰袲袳袴袵袶袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚裛補裝裞裠裡裦裧裩裪裫裬裭裮裯裲裵裶裷裺裻製裿褀褁褃褄褅褆複褈�褉褋褌褍褎褏褑褔褕褖褗褘褜褝褞褟褠褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶�".split("");
for(j = 0; j != D[209].length; ++j) if(D[209][j].charCodeAt(0) !== 0xFFFD) { e[D[209][j]] = 53504 + j; d[53504 + j] = D[209][j];}
D[210] = "����������������������������������������������������������������褸褹褺褻褼褽褾褿襀襂襃襅襆襇襈襉襊襋襌襍襎襏襐襑襒襓襔襕襖襗襘襙襚襛襜襝襠襡襢襣襤襥襧襨襩襪襫襬襭襮襯襰襱襲襳襴襵襶襷襸襹襺襼�襽襾覀覂覄覅覇覈覉覊見覌覍覎規覐覑覒覓覔覕視覗覘覙覚覛覜覝覞覟覠覡摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐�".split("");
for(j = 0; j != D[210].length; ++j) if(D[210][j].charCodeAt(0) !== 0xFFFD) { e[D[210][j]] = 53760 + j; d[53760 + j] = D[210][j];}
D[211] = "����������������������������������������������������������������覢覣覤覥覦覧覨覩親覫覬覭覮覯覰覱覲観覴覵覶覷覸覹覺覻覼覽覾覿觀觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴觵觶觷觸觹觺�觻觼觽觾觿訁訂訃訄訅訆計訉訊訋訌訍討訏訐訑訒訓訔訕訖託記訙訚訛訜訝印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉�".split("");
for(j = 0; j != D[211].length; ++j) if(D[211][j].charCodeAt(0) !== 0xFFFD) { e[D[211][j]] = 54016 + j; d[54016 + j] = D[211][j];}
D[212] = "����������������������������������������������������������������訞訟訠訡訢訣訤訥訦訧訨訩訪訫訬設訮訯訰許訲訳訴訵訶訷訸訹診註証訽訿詀詁詂詃詄詅詆詇詉詊詋詌詍詎詏詐詑詒詓詔評詖詗詘詙詚詛詜詝詞�詟詠詡詢詣詤詥試詧詨詩詪詫詬詭詮詯詰話該詳詴詵詶詷詸詺詻詼詽詾詿誀浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧�".split("");
for(j = 0; j != D[212].length; ++j) if(D[212][j].charCodeAt(0) !== 0xFFFD) { e[D[212][j]] = 54272 + j; d[54272 + j] = D[212][j];}
D[213] = "����������������������������������������������������������������誁誂誃誄誅誆誇誈誋誌認誎誏誐誑誒誔誕誖誗誘誙誚誛誜誝語誟誠誡誢誣誤誥誦誧誨誩說誫説読誮誯誰誱課誳誴誵誶誷誸誹誺誻誼誽誾調諀諁諂�諃諄諅諆談諈諉諊請諌諍諎諏諐諑諒諓諔諕論諗諘諙諚諛諜諝諞諟諠諡諢諣铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政�".split("");
for(j = 0; j != D[213].length; ++j) if(D[213][j].charCodeAt(0) !== 0xFFFD) { e[D[213][j]] = 54528 + j; d[54528 + j] = D[213][j];}
D[214] = "����������������������������������������������������������������諤諥諦諧諨諩諪諫諬諭諮諯諰諱諲諳諴諵諶諷諸諹諺諻諼諽諾諿謀謁謂謃謄謅謆謈謉謊謋謌謍謎謏謐謑謒謓謔謕謖謗謘謙謚講謜謝謞謟謠謡謢謣�謤謥謧謨謩謪謫謬謭謮謯謰謱謲謳謴謵謶謷謸謹謺謻謼謽謾謿譀譁譂譃譄譅帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑�".split("");
for(j = 0; j != D[214].length; ++j) if(D[214][j].charCodeAt(0) !== 0xFFFD) { e[D[214][j]] = 54784 + j; d[54784 + j] = D[214][j];}
D[215] = "����������������������������������������������������������������譆譇譈證譊譋譌譍譎譏譐譑譒譓譔譕譖譗識譙譚譛譜譝譞譟譠譡譢譣譤譥譧譨譩譪譫譭譮譯議譱譲譳譴譵譶護譸譹譺譻譼譽譾譿讀讁讂讃讄讅讆�讇讈讉變讋讌讍讎讏讐讑讒讓讔讕讖讗讘讙讚讛讜讝讞讟讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座������".split("");
for(j = 0; j != D[215].length; ++j) if(D[215][j].charCodeAt(0) !== 0xFFFD) { e[D[215][j]] = 55040 + j; d[55040 + j] = D[215][j];}
D[216] = "����������������������������������������������������������������谸谹谺谻谼谽谾谿豀豂豃豄豅豈豊豋豍豎豏豐豑豒豓豔豖豗豘豙豛豜豝豞豟豠豣豤豥豦豧豨豩豬豭豮豯豰豱豲豴豵豶豷豻豼豽豾豿貀貁貃貄貆貇�貈貋貍貎貏貐貑貒貓貕貖貗貙貚貛貜貝貞貟負財貢貣貤貥貦貧貨販貪貫責貭亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝�".split("");
for(j = 0; j != D[216].length; ++j) if(D[216][j].charCodeAt(0) !== 0xFFFD) { e[D[216][j]] = 55296 + j; d[55296 + j] = D[216][j];}
D[217] = "����������������������������������������������������������������貮貯貰貱貲貳貴貵貶買貸貹貺費貼貽貾貿賀賁賂賃賄賅賆資賈賉賊賋賌賍賎賏賐賑賒賓賔賕賖賗賘賙賚賛賜賝賞賟賠賡賢賣賤賥賦賧賨賩質賫賬�賭賮賯賰賱賲賳賴賵賶賷賸賹賺賻購賽賾賿贀贁贂贃贄贅贆贇贈贉贊贋贌贍佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼�".split("");
for(j = 0; j != D[217].length; ++j) if(D[217][j].charCodeAt(0) !== 0xFFFD) { e[D[217][j]] = 55552 + j; d[55552 + j] = D[217][j];}
D[218] = "����������������������������������������������������������������贎贏贐贑贒贓贔贕贖贗贘贙贚贛贜贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸赹赺赻赼赽赾赿趀趂趃趆趇趈趉趌趍趎趏趐趒趓趕趖趗趘趙趚趛趜趝趞趠趡�趢趤趥趦趧趨趩趪趫趬趭趮趯趰趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺�".split("");
for(j = 0; j != D[218].length; ++j) if(D[218][j].charCodeAt(0) !== 0xFFFD) { e[D[218][j]] = 55808 + j; d[55808 + j] = D[218][j];}
D[219] = "����������������������������������������������������������������跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾跿踀踁踂踃踄踆踇踈踋踍踎踐踑踒踓踕踖踗踘踙踚踛踜踠踡踤踥踦踧踨踫踭踰踲踳踴踶踷踸踻踼踾�踿蹃蹅蹆蹌蹍蹎蹏蹐蹓蹔蹕蹖蹗蹘蹚蹛蹜蹝蹞蹟蹠蹡蹢蹣蹤蹥蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝�".split("");
for(j = 0; j != D[219].length; ++j) if(D[219][j].charCodeAt(0) !== 0xFFFD) { e[D[219][j]] = 56064 + j; d[56064 + j] = D[219][j];}
D[220] = "����������������������������������������������������������������蹳蹵蹷蹸蹹蹺蹻蹽蹾躀躂躃躄躆躈躉躊躋躌躍躎躑躒躓躕躖躗躘躙躚躛躝躟躠躡躢躣躤躥躦躧躨躩躪躭躮躰躱躳躴躵躶躷躸躹躻躼躽躾躿軀軁軂�軃軄軅軆軇軈軉車軋軌軍軏軐軑軒軓軔軕軖軗軘軙軚軛軜軝軞軟軠軡転軣軤堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥�".split("");
for(j = 0; j != D[220].length; ++j) if(D[220][j].charCodeAt(0) !== 0xFFFD) { e[D[220][j]] = 56320 + j; d[56320 + j] = D[220][j];}
D[221] = "����������������������������������������������������������������軥軦軧軨軩軪軫軬軭軮軯軰軱軲軳軴軵軶軷軸軹軺軻軼軽軾軿輀輁輂較輄輅輆輇輈載輊輋輌輍輎輏輐輑輒輓輔輕輖輗輘輙輚輛輜輝輞輟輠輡輢輣�輤輥輦輧輨輩輪輫輬輭輮輯輰輱輲輳輴輵輶輷輸輹輺輻輼輽輾輿轀轁轂轃轄荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺�".split("");
for(j = 0; j != D[221].length; ++j) if(D[221][j].charCodeAt(0) !== 0xFFFD) { e[D[221][j]] = 56576 + j; d[56576 + j] = D[221][j];}
D[222] = "����������������������������������������������������������������轅轆轇轈轉轊轋轌轍轎轏轐轑轒轓轔轕轖轗轘轙轚轛轜轝轞轟轠轡轢轣轤轥轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆�迉迊迋迌迍迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖�".split("");
for(j = 0; j != D[222].length; ++j) if(D[222][j].charCodeAt(0) !== 0xFFFD) { e[D[222][j]] = 56832 + j; d[56832 + j] = D[222][j];}
D[223] = "����������������������������������������������������������������這逜連逤逥逧逨逩逪逫逬逰週進逳逴逷逹逺逽逿遀遃遅遆遈遉遊運遌過達違遖遙遚遜遝遞遟遠遡遤遦遧適遪遫遬遯遰遱遲遳遶遷選遹遺遻遼遾邁�還邅邆邇邉邊邌邍邎邏邐邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼�".split("");
for(j = 0; j != D[223].length; ++j) if(D[223][j].charCodeAt(0) !== 0xFFFD) { e[D[223][j]] = 57088 + j; d[57088 + j] = D[223][j];}
D[224] = "����������������������������������������������������������������郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅鄆鄇鄈鄉鄊鄋鄌鄍鄎鄏鄐鄑鄒鄓鄔鄕鄖鄗鄘鄚鄛鄜�鄝鄟鄠鄡鄤鄥鄦鄧鄨鄩鄪鄫鄬鄭鄮鄰鄲鄳鄴鄵鄶鄷鄸鄺鄻鄼鄽鄾鄿酀酁酂酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼�".split("");
for(j = 0; j != D[224].length; ++j) if(D[224][j].charCodeAt(0) !== 0xFFFD) { e[D[224][j]] = 57344 + j; d[57344 + j] = D[224][j];}
D[225] = "����������������������������������������������������������������酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀醁醂醃醄醆醈醊醎醏醓醔醕醖醗醘醙醜醝醞醟醠醡醤醥醦醧醨醩醫醬醰醱醲醳醶醷醸醹醻�醼醽醾醿釀釁釂釃釄釅釆釈釋釐釒釓釔釕釖釗釘釙釚釛針釞釟釠釡釢釣釤釥帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺�".split("");
for(j = 0; j != D[225].length; ++j) if(D[225][j].charCodeAt(0) !== 0xFFFD) { e[D[225][j]] = 57600 + j; d[57600 + j] = D[225][j];}
D[226] = "����������������������������������������������������������������釦釧釨釩釪釫釬釭釮釯釰釱釲釳釴釵釶釷釸釹釺釻釼釽釾釿鈀鈁鈂鈃鈄鈅鈆鈇鈈鈉鈊鈋鈌鈍鈎鈏鈐鈑鈒鈓鈔鈕鈖鈗鈘鈙鈚鈛鈜鈝鈞鈟鈠鈡鈢鈣鈤�鈥鈦鈧鈨鈩鈪鈫鈬鈭鈮鈯鈰鈱鈲鈳鈴鈵鈶鈷鈸鈹鈺鈻鈼鈽鈾鈿鉀鉁鉂鉃鉄鉅狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧饨饩饪饫饬饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂�".split("");
for(j = 0; j != D[226].length; ++j) if(D[226][j].charCodeAt(0) !== 0xFFFD) { e[D[226][j]] = 57856 + j; d[57856 + j] = D[226][j];}
D[227] = "����������������������������������������������������������������鉆鉇鉈鉉鉊鉋鉌鉍鉎鉏鉐鉑鉒鉓鉔鉕鉖鉗鉘鉙鉚鉛鉜鉝鉞鉟鉠鉡鉢鉣鉤鉥鉦鉧鉨鉩鉪鉫鉬鉭鉮鉯鉰鉱鉲鉳鉵鉶鉷鉸鉹鉺鉻鉼鉽鉾鉿銀銁銂銃銄銅�銆銇銈銉銊銋銌銍銏銐銑銒銓銔銕銖銗銘銙銚銛銜銝銞銟銠銡銢銣銤銥銦銧恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾�".split("");
for(j = 0; j != D[227].length; ++j) if(D[227][j].charCodeAt(0) !== 0xFFFD) { e[D[227][j]] = 58112 + j; d[58112 + j] = D[227][j];}
D[228] = "����������������������������������������������������������������銨銩銪銫銬銭銯銰銱銲銳銴銵銶銷銸銹銺銻銼銽銾銿鋀鋁鋂鋃鋄鋅鋆鋇鋉鋊鋋鋌鋍鋎鋏鋐鋑鋒鋓鋔鋕鋖鋗鋘鋙鋚鋛鋜鋝鋞鋟鋠鋡鋢鋣鋤鋥鋦鋧鋨�鋩鋪鋫鋬鋭鋮鋯鋰鋱鋲鋳鋴鋵鋶鋷鋸鋹鋺鋻鋼鋽鋾鋿錀錁錂錃錄錅錆錇錈錉洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑�".split("");
for(j = 0; j != D[228].length; ++j) if(D[228][j].charCodeAt(0) !== 0xFFFD) { e[D[228][j]] = 58368 + j; d[58368 + j] = D[228][j];}
D[229] = "����������������������������������������������������������������錊錋錌錍錎錏錐錑錒錓錔錕錖錗錘錙錚錛錜錝錞錟錠錡錢錣錤錥錦錧錨錩錪錫錬錭錮錯錰錱録錳錴錵錶錷錸錹錺錻錼錽錿鍀鍁鍂鍃鍄鍅鍆鍇鍈鍉�鍊鍋鍌鍍鍎鍏鍐鍑鍒鍓鍔鍕鍖鍗鍘鍙鍚鍛鍜鍝鍞鍟鍠鍡鍢鍣鍤鍥鍦鍧鍨鍩鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣�".split("");
for(j = 0; j != D[229].length; ++j) if(D[229][j].charCodeAt(0) !== 0xFFFD) { e[D[229][j]] = 58624 + j; d[58624 + j] = D[229][j];}
D[230] = "����������������������������������������������������������������鍬鍭鍮鍯鍰鍱鍲鍳鍴鍵鍶鍷鍸鍹鍺鍻鍼鍽鍾鍿鎀鎁鎂鎃鎄鎅鎆鎇鎈鎉鎊鎋鎌鎍鎎鎐鎑鎒鎓鎔鎕鎖鎗鎘鎙鎚鎛鎜鎝鎞鎟鎠鎡鎢鎣鎤鎥鎦鎧鎨鎩鎪鎫�鎬鎭鎮鎯鎰鎱鎲鎳鎴鎵鎶鎷鎸鎹鎺鎻鎼鎽鎾鎿鏀鏁鏂鏃鏄鏅鏆鏇鏈鏉鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩�".split("");
for(j = 0; j != D[230].length; ++j) if(D[230][j].charCodeAt(0) !== 0xFFFD) { e[D[230][j]] = 58880 + j; d[58880 + j] = D[230][j];}
D[231] = "����������������������������������������������������������������鏎鏏鏐鏑鏒鏓鏔鏕鏗鏘鏙鏚鏛鏜鏝鏞鏟鏠鏡鏢鏣鏤鏥鏦鏧鏨鏩鏪鏫鏬鏭鏮鏯鏰鏱鏲鏳鏴鏵鏶鏷鏸鏹鏺鏻鏼鏽鏾鏿鐀鐁鐂鐃鐄鐅鐆鐇鐈鐉鐊鐋鐌鐍�鐎鐏鐐鐑鐒鐓鐔鐕鐖鐗鐘鐙鐚鐛鐜鐝鐞鐟鐠鐡鐢鐣鐤鐥鐦鐧鐨鐩鐪鐫鐬鐭鐮纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡缢缣缤缥缦缧缪缫缬缭缯缰缱缲缳缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬�".split("");
for(j = 0; j != D[231].length; ++j) if(D[231][j].charCodeAt(0) !== 0xFFFD) { e[D[231][j]] = 59136 + j; d[59136 + j] = D[231][j];}
D[232] = "����������������������������������������������������������������鐯鐰鐱鐲鐳鐴鐵鐶鐷鐸鐹鐺鐻鐼鐽鐿鑀鑁鑂鑃鑄鑅鑆鑇鑈鑉鑊鑋鑌鑍鑎鑏鑐鑑鑒鑓鑔鑕鑖鑗鑘鑙鑚鑛鑜鑝鑞鑟鑠鑡鑢鑣鑤鑥鑦鑧鑨鑩鑪鑬鑭鑮鑯�鑰鑱鑲鑳鑴鑵鑶鑷鑸鑹鑺鑻鑼鑽鑾鑿钀钁钂钃钄钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹�".split("");
for(j = 0; j != D[232].length; ++j) if(D[232][j].charCodeAt(0) !== 0xFFFD) { e[D[232][j]] = 59392 + j; d[59392 + j] = D[232][j];}
D[233] = "����������������������������������������������������������������锧锳锽镃镈镋镕镚镠镮镴镵長镸镹镺镻镼镽镾門閁閂閃閄閅閆閇閈閉閊開閌閍閎閏閐閑閒間閔閕閖閗閘閙閚閛閜閝閞閟閠閡関閣閤閥閦閧閨閩閪�閫閬閭閮閯閰閱閲閳閴閵閶閷閸閹閺閻閼閽閾閿闀闁闂闃闄闅闆闇闈闉闊闋椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋�".split("");
for(j = 0; j != D[233].length; ++j) if(D[233][j].charCodeAt(0) !== 0xFFFD) { e[D[233][j]] = 59648 + j; d[59648 + j] = D[233][j];}
D[234] = "����������������������������������������������������������������闌闍闎闏闐闑闒闓闔闕闖闗闘闙闚闛關闝闞闟闠闡闢闣闤闥闦闧闬闿阇阓阘阛阞阠阣阤阥阦阧阨阩阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗�陘陙陚陜陝陞陠陣陥陦陫陭陮陯陰陱陳陸陹険陻陼陽陾陿隀隁隂隃隄隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰�".split("");
for(j = 0; j != D[234].length; ++j) if(D[234][j].charCodeAt(0) !== 0xFFFD) { e[D[234][j]] = 59904 + j; d[59904 + j] = D[234][j];}
D[235] = "����������������������������������������������������������������隌階隑隒隓隕隖隚際隝隞隟隠隡隢隣隤隥隦隨隩險隫隬隭隮隯隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖雗雘雙雚雛雜雝雞雟雡離難雤雥雦雧雫�雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗霘霙霚霛霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻�".split("");
for(j = 0; j != D[235].length; ++j) if(D[235][j].charCodeAt(0) !== 0xFFFD) { e[D[235][j]] = 60160 + j; d[60160 + j] = D[235][j];}
D[236] = "����������������������������������������������������������������霡霢霣霤霥霦霧霨霩霫霬霮霯霱霳霴霵霶霷霺霻霼霽霿靀靁靂靃靄靅靆靇靈靉靊靋靌靍靎靏靐靑靔靕靗靘靚靜靝靟靣靤靦靧靨靪靫靬靭靮靯靰靱�靲靵靷靸靹靺靻靽靾靿鞀鞁鞂鞃鞄鞆鞇鞈鞉鞊鞌鞎鞏鞐鞓鞕鞖鞗鞙鞚鞛鞜鞝臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐�".split("");
for(j = 0; j != D[236].length; ++j) if(D[236][j].charCodeAt(0) !== 0xFFFD) { e[D[236][j]] = 60416 + j; d[60416 + j] = D[236][j];}
D[237] = "����������������������������������������������������������������鞞鞟鞡鞢鞤鞥鞦鞧鞨鞩鞪鞬鞮鞰鞱鞳鞵鞶鞷鞸鞹鞺鞻鞼鞽鞾鞿韀韁韂韃韄韅韆韇韈韉韊韋韌韍韎韏韐韑韒韓韔韕韖韗韘韙韚韛韜韝韞韟韠韡韢韣�韤韥韨韮韯韰韱韲韴韷韸韹韺韻韼韽韾響頀頁頂頃頄項順頇須頉頊頋頌頍頎怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨�".split("");
for(j = 0; j != D[237].length; ++j) if(D[237][j].charCodeAt(0) !== 0xFFFD) { e[D[237][j]] = 60672 + j; d[60672 + j] = D[237][j];}
D[238] = "����������������������������������������������������������������頏預頑頒頓頔頕頖頗領頙頚頛頜頝頞頟頠頡頢頣頤頥頦頧頨頩頪頫頬頭頮頯頰頱頲頳頴頵頶頷頸頹頺頻頼頽頾頿顀顁顂顃顄顅顆顇顈顉顊顋題額�顎顏顐顑顒顓顔顕顖顗願顙顚顛顜顝類顟顠顡顢顣顤顥顦顧顨顩顪顫顬顭顮睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶钷钸钹钺钼钽钿铄铈铉铊铋铌铍铎铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪�".split("");
for(j = 0; j != D[238].length; ++j) if(D[238][j].charCodeAt(0) !== 0xFFFD) { e[D[238][j]] = 60928 + j; d[60928 + j] = D[238][j];}
D[239] = "����������������������������������������������������������������顯顰顱顲顳顴颋颎颒颕颙颣風颩颪颫颬颭颮颯颰颱颲颳颴颵颶颷颸颹颺颻颼颽颾颿飀飁飂飃飄飅飆飇飈飉飊飋飌飍飏飐飔飖飗飛飜飝飠飡飢飣飤�飥飦飩飪飫飬飭飮飯飰飱飲飳飴飵飶飷飸飹飺飻飼飽飾飿餀餁餂餃餄餅餆餇铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒锓锔锕锖锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤镥镦镧镨镩镪镫镬镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔�".split("");
for(j = 0; j != D[239].length; ++j) if(D[239][j].charCodeAt(0) !== 0xFFFD) { e[D[239][j]] = 61184 + j; d[61184 + j] = D[239][j];}
D[240] = "����������������������������������������������������������������餈餉養餋餌餎餏餑餒餓餔餕餖餗餘餙餚餛餜餝餞餟餠餡餢餣餤餥餦餧館餩餪餫餬餭餯餰餱餲餳餴餵餶餷餸餹餺餻餼餽餾餿饀饁饂饃饄饅饆饇饈饉�饊饋饌饍饎饏饐饑饒饓饖饗饘饙饚饛饜饝饞饟饠饡饢饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨鸩鸪鸫鸬鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦鹧鹨鹩鹪鹫鹬鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙�".split("");
for(j = 0; j != D[240].length; ++j) if(D[240][j].charCodeAt(0) !== 0xFFFD) { e[D[240][j]] = 61440 + j; d[61440 + j] = D[240][j];}
D[241] = "����������������������������������������������������������������馌馎馚馛馜馝馞馟馠馡馢馣馤馦馧馩馪馫馬馭馮馯馰馱馲馳馴馵馶馷馸馹馺馻馼馽馾馿駀駁駂駃駄駅駆駇駈駉駊駋駌駍駎駏駐駑駒駓駔駕駖駗駘�駙駚駛駜駝駞駟駠駡駢駣駤駥駦駧駨駩駪駫駬駭駮駯駰駱駲駳駴駵駶駷駸駹瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃�".split("");
for(j = 0; j != D[241].length; ++j) if(D[241][j].charCodeAt(0) !== 0xFFFD) { e[D[241][j]] = 61696 + j; d[61696 + j] = D[241][j];}
D[242] = "����������������������������������������������������������������駺駻駼駽駾駿騀騁騂騃騄騅騆騇騈騉騊騋騌騍騎騏騐騑騒験騔騕騖騗騘騙騚騛騜騝騞騟騠騡騢騣騤騥騦騧騨騩騪騫騬騭騮騯騰騱騲騳騴騵騶騷騸�騹騺騻騼騽騾騿驀驁驂驃驄驅驆驇驈驉驊驋驌驍驎驏驐驑驒驓驔驕驖驗驘驙颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒�".split("");
for(j = 0; j != D[242].length; ++j) if(D[242][j].charCodeAt(0) !== 0xFFFD) { e[D[242][j]] = 61952 + j; d[61952 + j] = D[242][j];}
D[243] = "����������������������������������������������������������������驚驛驜驝驞驟驠驡驢驣驤驥驦驧驨驩驪驫驲骃骉骍骎骔骕骙骦骩骪骫骬骭骮骯骲骳骴骵骹骻骽骾骿髃髄髆髇髈髉髊髍髎髏髐髒體髕髖髗髙髚髛髜�髝髞髠髢髣髤髥髧髨髩髪髬髮髰髱髲髳髴髵髶髷髸髺髼髽髾髿鬀鬁鬂鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋�".split("");
for(j = 0; j != D[243].length; ++j) if(D[243][j].charCodeAt(0) !== 0xFFFD) { e[D[243][j]] = 62208 + j; d[62208 + j] = D[243][j];}
D[244] = "����������������������������������������������������������������鬇鬉鬊鬋鬌鬍鬎鬐鬑鬒鬔鬕鬖鬗鬘鬙鬚鬛鬜鬝鬞鬠鬡鬢鬤鬥鬦鬧鬨鬩鬪鬫鬬鬭鬮鬰鬱鬳鬴鬵鬶鬷鬸鬹鬺鬽鬾鬿魀魆魊魋魌魎魐魒魓魕魖魗魘魙魚�魛魜魝魞魟魠魡魢魣魤魥魦魧魨魩魪魫魬魭魮魯魰魱魲魳魴魵魶魷魸魹魺魻簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤�".split("");
for(j = 0; j != D[244].length; ++j) if(D[244][j].charCodeAt(0) !== 0xFFFD) { e[D[244][j]] = 62464 + j; d[62464 + j] = D[244][j];}
D[245] = "����������������������������������������������������������������魼魽魾魿鮀鮁鮂鮃鮄鮅鮆鮇鮈鮉鮊鮋鮌鮍鮎鮏鮐鮑鮒鮓鮔鮕鮖鮗鮘鮙鮚鮛鮜鮝鮞鮟鮠鮡鮢鮣鮤鮥鮦鮧鮨鮩鮪鮫鮬鮭鮮鮯鮰鮱鮲鮳鮴鮵鮶鮷鮸鮹鮺�鮻鮼鮽鮾鮿鯀鯁鯂鯃鯄鯅鯆鯇鯈鯉鯊鯋鯌鯍鯎鯏鯐鯑鯒鯓鯔鯕鯖鯗鯘鯙鯚鯛酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜�".split("");
for(j = 0; j != D[245].length; ++j) if(D[245][j].charCodeAt(0) !== 0xFFFD) { e[D[245][j]] = 62720 + j; d[62720 + j] = D[245][j];}
D[246] = "����������������������������������������������������������������鯜鯝鯞鯟鯠鯡鯢鯣鯤鯥鯦鯧鯨鯩鯪鯫鯬鯭鯮鯯鯰鯱鯲鯳鯴鯵鯶鯷鯸鯹鯺鯻鯼鯽鯾鯿鰀鰁鰂鰃鰄鰅鰆鰇鰈鰉鰊鰋鰌鰍鰎鰏鰐鰑鰒鰓鰔鰕鰖鰗鰘鰙鰚�鰛鰜鰝鰞鰟鰠鰡鰢鰣鰤鰥鰦鰧鰨鰩鰪鰫鰬鰭鰮鰯鰰鰱鰲鰳鰴鰵鰶鰷鰸鰹鰺鰻觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅龆龇龈龉龊龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞鲟鲠鲡鲢鲣鲥鲦鲧鲨鲩鲫鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋�".split("");
for(j = 0; j != D[246].length; ++j) if(D[246][j].charCodeAt(0) !== 0xFFFD) { e[D[246][j]] = 62976 + j; d[62976 + j] = D[246][j];}
D[247] = "����������������������������������������������������������������鰼鰽鰾鰿鱀鱁鱂鱃鱄鱅鱆鱇鱈鱉鱊鱋鱌鱍鱎鱏鱐鱑鱒鱓鱔鱕鱖鱗鱘鱙鱚鱛鱜鱝鱞鱟鱠鱡鱢鱣鱤鱥鱦鱧鱨鱩鱪鱫鱬鱭鱮鱯鱰鱱鱲鱳鱴鱵鱶鱷鱸鱹鱺�鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾鲿鳀鳁鳂鳈鳉鳑鳒鳚鳛鳠鳡鳌鳍鳎鳏鳐鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄�".split("");
for(j = 0; j != D[247].length; ++j) if(D[247][j].charCodeAt(0) !== 0xFFFD) { e[D[247][j]] = 63232 + j; d[63232 + j] = D[247][j];}
D[248] = "����������������������������������������������������������������鳣鳤鳥鳦鳧鳨鳩鳪鳫鳬鳭鳮鳯鳰鳱鳲鳳鳴鳵鳶鳷鳸鳹鳺鳻鳼鳽鳾鳿鴀鴁鴂鴃鴄鴅鴆鴇鴈鴉鴊鴋鴌鴍鴎鴏鴐鴑鴒鴓鴔鴕鴖鴗鴘鴙鴚鴛鴜鴝鴞鴟鴠鴡�鴢鴣鴤鴥鴦鴧鴨鴩鴪鴫鴬鴭鴮鴯鴰鴱鴲鴳鴴鴵鴶鴷鴸鴹鴺鴻鴼鴽鴾鴿鵀鵁鵂�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[248].length; ++j) if(D[248][j].charCodeAt(0) !== 0xFFFD) { e[D[248][j]] = 63488 + j; d[63488 + j] = D[248][j];}
D[249] = "����������������������������������������������������������������鵃鵄鵅鵆鵇鵈鵉鵊鵋鵌鵍鵎鵏鵐鵑鵒鵓鵔鵕鵖鵗鵘鵙鵚鵛鵜鵝鵞鵟鵠鵡鵢鵣鵤鵥鵦鵧鵨鵩鵪鵫鵬鵭鵮鵯鵰鵱鵲鵳鵴鵵鵶鵷鵸鵹鵺鵻鵼鵽鵾鵿鶀鶁�鶂鶃鶄鶅鶆鶇鶈鶉鶊鶋鶌鶍鶎鶏鶐鶑鶒鶓鶔鶕鶖鶗鶘鶙鶚鶛鶜鶝鶞鶟鶠鶡鶢�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[249].length; ++j) if(D[249][j].charCodeAt(0) !== 0xFFFD) { e[D[249][j]] = 63744 + j; d[63744 + j] = D[249][j];}
D[250] = "����������������������������������������������������������������鶣鶤鶥鶦鶧鶨鶩鶪鶫鶬鶭鶮鶯鶰鶱鶲鶳鶴鶵鶶鶷鶸鶹鶺鶻鶼鶽鶾鶿鷀鷁鷂鷃鷄鷅鷆鷇鷈鷉鷊鷋鷌鷍鷎鷏鷐鷑鷒鷓鷔鷕鷖鷗鷘鷙鷚鷛鷜鷝鷞鷟鷠鷡�鷢鷣鷤鷥鷦鷧鷨鷩鷪鷫鷬鷭鷮鷯鷰鷱鷲鷳鷴鷵鷶鷷鷸鷹鷺鷻鷼鷽鷾鷿鸀鸁鸂�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[250].length; ++j) if(D[250][j].charCodeAt(0) !== 0xFFFD) { e[D[250][j]] = 64000 + j; d[64000 + j] = D[250][j];}
D[251] = "����������������������������������������������������������������鸃鸄鸅鸆鸇鸈鸉鸊鸋鸌鸍鸎鸏鸐鸑鸒鸓鸔鸕鸖鸗鸘鸙鸚鸛鸜鸝鸞鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴鹵鹶鹷鹸鹹鹺鹻鹼鹽麀�麁麃麄麅麆麉麊麌麍麎麏麐麑麔麕麖麗麘麙麚麛麜麞麠麡麢麣麤麥麧麨麩麪�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[251].length; ++j) if(D[251][j].charCodeAt(0) !== 0xFFFD) { e[D[251][j]] = 64256 + j; d[64256 + j] = D[251][j];}
D[252] = "����������������������������������������������������������������麫麬麭麮麯麰麱麲麳麵麶麷麹麺麼麿黀黁黂黃黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰黱黲黳黴黵黶黷黸黺黽黿鼀鼁鼂鼃鼄鼅�鼆鼇鼈鼉鼊鼌鼏鼑鼒鼔鼕鼖鼘鼚鼛鼜鼝鼞鼟鼡鼣鼤鼥鼦鼧鼨鼩鼪鼫鼭鼮鼰鼱�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[252].length; ++j) if(D[252][j].charCodeAt(0) !== 0xFFFD) { e[D[252][j]] = 64512 + j; d[64512 + j] = D[252][j];}
D[253] = "����������������������������������������������������������������鼲鼳鼴鼵鼶鼸鼺鼼鼿齀齁齂齃齅齆齇齈齉齊齋齌齍齎齏齒齓齔齕齖齗齘齙齚齛齜齝齞齟齠齡齢齣齤齥齦齧齨齩齪齫齬齭齮齯齰齱齲齳齴齵齶齷齸�齹齺齻齼齽齾龁龂龍龎龏龐龑龒龓龔龕龖龗龘龜龝龞龡龢龣龤龥郎凉秊裏隣�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[253].length; ++j) if(D[253][j].charCodeAt(0) !== 0xFFFD) { e[D[253][j]] = 64768 + j; d[64768 + j] = D[253][j];}
D[254] = "����������������������������������������������������������������兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩��������������������������������������������������������������������������������������������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[254].length; ++j) if(D[254][j].charCodeAt(0) !== 0xFFFD) { e[D[254][j]] = 65024 + j; d[65024 + j] = D[254][j];}
return {"enc": e, "dec": d }; })();
cptable[949] = (function(){ var d = [], e = {}, D = [], j;
D[0] = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~��������������������������������������������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[0].length; ++j) if(D[0][j].charCodeAt(0) !== 0xFFFD) { e[D[0][j]] = 0 + j; d[0 + j] = D[0][j];}
D[129] = "�����������������������������������������������������������������갂갃갅갆갋갌갍갎갏갘갞갟갡갢갣갥갦갧갨갩갪갫갮갲갳갴������갵갶갷갺갻갽갾갿걁걂걃걄걅걆걇걈걉걊걌걎걏걐걑걒걓걕������걖걗걙걚걛걝걞걟걠걡걢걣걤걥걦걧걨걩걪걫걬걭걮걯걲걳걵걶걹걻걼걽걾걿겂겇겈겍겎겏겑겒겓겕겖겗겘겙겚겛겞겢겣겤겥겦겧겫겭겮겱겲겳겴겵겶겷겺겾겿곀곂곃곅곆곇곉곊곋곍곎곏곐곑곒곓곔곖곘곙곚곛곜곝곞곟곢곣곥곦곩곫곭곮곲곴곷곸곹곺곻곾곿괁괂괃괅괇괈괉괊괋괎괐괒괓�".split("");
for(j = 0; j != D[129].length; ++j) if(D[129][j].charCodeAt(0) !== 0xFFFD) { e[D[129][j]] = 33024 + j; d[33024 + j] = D[129][j];}
D[130] = "�����������������������������������������������������������������괔괕괖괗괙괚괛괝괞괟괡괢괣괤괥괦괧괨괪괫괮괯괰괱괲괳������괶괷괹괺괻괽괾괿굀굁굂굃굆굈굊굋굌굍굎굏굑굒굓굕굖굗������굙굚굛굜굝굞굟굠굢굤굥굦굧굨굩굪굫굮굯굱굲굷굸굹굺굾궀궃궄궅궆궇궊궋궍궎궏궑궒궓궔궕궖궗궘궙궚궛궞궟궠궡궢궣궥궦궧궨궩궪궫궬궭궮궯궰궱궲궳궴궵궶궸궹궺궻궼궽궾궿귂귃귅귆귇귉귊귋귌귍귎귏귒귔귕귖귗귘귙귚귛귝귞귟귡귢귣귥귦귧귨귩귪귫귬귭귮귯귰귱귲귳귴귵귶귷�".split("");
for(j = 0; j != D[130].length; ++j) if(D[130][j].charCodeAt(0) !== 0xFFFD) { e[D[130][j]] = 33280 + j; d[33280 + j] = D[130][j];}
D[131] = "�����������������������������������������������������������������귺귻귽귾긂긃긄긅긆긇긊긌긎긏긐긑긒긓긕긖긗긘긙긚긛긜������긝긞긟긠긡긢긣긤긥긦긧긨긩긪긫긬긭긮긯긲긳긵긶긹긻긼������긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗깘깙깚깛깞깢깣깤깦깧깪깫깭깮깯깱깲깳깴깵깶깷깺깾깿꺀꺁꺂꺃꺆꺇꺈꺉꺊꺋꺍꺎꺏꺐꺑꺒꺓꺔꺕꺖꺗꺘꺙꺚꺛꺜꺝꺞꺟꺠꺡꺢꺣꺤꺥꺦꺧꺨꺩꺪꺫꺬꺭꺮꺯꺰꺱꺲꺳꺴꺵꺶꺷꺸꺹꺺꺻꺿껁껂껃껅껆껇껈껉껊껋껎껒껓껔껕껖껗껚껛껝껞껟껠껡껢껣껤껥�".split("");
for(j = 0; j != D[131].length; ++j) if(D[131][j].charCodeAt(0) !== 0xFFFD) { e[D[131][j]] = 33536 + j; d[33536 + j] = D[131][j];}
D[132] = "�����������������������������������������������������������������껦껧껩껪껬껮껯껰껱껲껳껵껶껷껹껺껻껽껾껿꼀꼁꼂꼃꼄꼅������꼆꼉꼊꼋꼌꼎꼏꼑꼒꼓꼔꼕꼖꼗꼘꼙꼚꼛꼜꼝꼞꼟꼠꼡꼢꼣������꼤꼥꼦꼧꼨꼩꼪꼫꼮꼯꼱꼳꼵꼶꼷꼸꼹꼺꼻꼾꽀꽄꽅꽆꽇꽊꽋꽌꽍꽎꽏꽑꽒꽓꽔꽕꽖꽗꽘꽙꽚꽛꽞꽟꽠꽡꽢꽣꽦꽧꽨꽩꽪꽫꽬꽭꽮꽯꽰꽱꽲꽳꽴꽵꽶꽷꽸꽺꽻꽼꽽꽾꽿꾁꾂꾃꾅꾆꾇꾉꾊꾋꾌꾍꾎꾏꾒꾓꾔꾖꾗꾘꾙꾚꾛꾝꾞꾟꾠꾡꾢꾣꾤꾥꾦꾧꾨꾩꾪꾫꾬꾭꾮꾯꾰꾱꾲꾳꾴꾵꾶꾷꾺꾻꾽꾾�".split("");
for(j = 0; j != D[132].length; ++j) if(D[132][j].charCodeAt(0) !== 0xFFFD) { e[D[132][j]] = 33792 + j; d[33792 + j] = D[132][j];}
D[133] = "�����������������������������������������������������������������꾿꿁꿂꿃꿄꿅꿆꿊꿌꿏꿐꿑꿒꿓꿕꿖꿗꿘꿙꿚꿛꿝꿞꿟꿠꿡������꿢꿣꿤꿥꿦꿧꿪꿫꿬꿭꿮꿯꿲꿳꿵꿶꿷꿹꿺꿻꿼꿽꿾꿿뀂뀃������뀅뀆뀇뀈뀉뀊뀋뀍뀎뀏뀑뀒뀓뀕뀖뀗뀘뀙뀚뀛뀞뀟뀠뀡뀢뀣뀤뀥뀦뀧뀩뀪뀫뀬뀭뀮뀯뀰뀱뀲뀳뀴뀵뀶뀷뀸뀹뀺뀻뀼뀽뀾뀿끀끁끂끃끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞끟끠끡끢끣끤끥끦끧끨끩끪끫끬끭끮끯끰끱끲끳끴끵끶끷끸끹끺끻끾끿낁낂낃낅낆낇낈낉낊낋낎낐낒낓낔낕낖낗낛낝낞낣낤�".split("");
for(j = 0; j != D[133].length; ++j) if(D[133][j].charCodeAt(0) !== 0xFFFD) { e[D[133][j]] = 34048 + j; d[34048 + j] = D[133][j];}
D[134] = "�����������������������������������������������������������������낥낦낧낪낰낲낶낷낹낺낻낽낾낿냀냁냂냃냆냊냋냌냍냎냏냒������냓냕냖냗냙냚냛냜냝냞냟냡냢냣냤냦냧냨냩냪냫냬냭냮냯냰������냱냲냳냴냵냶냷냸냹냺냻냼냽냾냿넀넁넂넃넄넅넆넇넊넍넎넏넑넔넕넖넗넚넞넟넠넡넢넦넧넩넪넫넭넮넯넰넱넲넳넶넺넻넼넽넾넿녂녃녅녆녇녉녊녋녌녍녎녏녒녓녖녗녙녚녛녝녞녟녡녢녣녤녥녦녧녨녩녪녫녬녭녮녯녰녱녲녳녴녵녶녷녺녻녽녾녿놁놃놄놅놆놇놊놌놎놏놐놑놕놖놗놙놚놛놝�".split("");
for(j = 0; j != D[134].length; ++j) if(D[134][j].charCodeAt(0) !== 0xFFFD) { e[D[134][j]] = 34304 + j; d[34304 + j] = D[134][j];}
D[135] = "�����������������������������������������������������������������놞놟놠놡놢놣놤놥놦놧놩놪놫놬놭놮놯놰놱놲놳놴놵놶놷놸������놹놺놻놼놽놾놿뇀뇁뇂뇃뇄뇅뇆뇇뇈뇉뇊뇋뇍뇎뇏뇑뇒뇓뇕������뇖뇗뇘뇙뇚뇛뇞뇠뇡뇢뇣뇤뇥뇦뇧뇪뇫뇭뇮뇯뇱뇲뇳뇴뇵뇶뇷뇸뇺뇼뇾뇿눀눁눂눃눆눇눉눊눍눎눏눐눑눒눓눖눘눚눛눜눝눞눟눡눢눣눤눥눦눧눨눩눪눫눬눭눮눯눰눱눲눳눵눶눷눸눹눺눻눽눾눿뉀뉁뉂뉃뉄뉅뉆뉇뉈뉉뉊뉋뉌뉍뉎뉏뉐뉑뉒뉓뉔뉕뉖뉗뉙뉚뉛뉝뉞뉟뉡뉢뉣뉤뉥뉦뉧뉪뉫뉬뉭뉮�".split("");
for(j = 0; j != D[135].length; ++j) if(D[135][j].charCodeAt(0) !== 0xFFFD) { e[D[135][j]] = 34560 + j; d[34560 + j] = D[135][j];}
D[136] = "�����������������������������������������������������������������뉯뉰뉱뉲뉳뉶뉷뉸뉹뉺뉻뉽뉾뉿늀늁늂늃늆늇늈늊늋늌늍늎������늏늒늓늕늖늗늛늜늝늞늟늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷������늸늹늺늻늼늽늾늿닀닁닂닃닄닅닆닇닊닋닍닎닏닑닓닔닕닖닗닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉댊댋댌댍댎댏댒댖댗댘댙댚댛댝댞댟댠댡댢댣댤댥댦댧댨댩댪댫댬댭댮댯댰댱댲댳댴댵댶댷댸댹댺댻댼댽댾댿덀덁덂덃덄덅덆덇덈덉덊덋덌덍덎덏덐덑덒덓덗덙덚덝덠덡덢덣�".split("");
for(j = 0; j != D[136].length; ++j) if(D[136][j].charCodeAt(0) !== 0xFFFD) { e[D[136][j]] = 34816 + j; d[34816 + j] = D[136][j];}
D[137] = "�����������������������������������������������������������������덦덨덪덬덭덯덲덳덵덶덷덹덺덻덼덽덾덿뎂뎆뎇뎈뎉뎊뎋뎍������뎎뎏뎑뎒뎓뎕뎖뎗뎘뎙뎚뎛뎜뎝뎞뎟뎢뎣뎤뎥뎦뎧뎩뎪뎫뎭������뎮뎯뎰뎱뎲뎳뎴뎵뎶뎷뎸뎹뎺뎻뎼뎽뎾뎿돀돁돂돃돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩돪돫돬돭돮돯돰돱돲돳돴돵돶돷돸돹돺돻돽돾돿됀됁됂됃됄됅됆됇됈됉됊됋됌됍됎됏됑됒됓됔됕됖됗됙됚됛됝됞됟됡됢됣됤됥됦됧됪됬됭됮됯됰됱됲됳됵됶됷됸됹됺됻됼됽됾됿둀둁둂둃둄�".split("");
for(j = 0; j != D[137].length; ++j) if(D[137][j].charCodeAt(0) !== 0xFFFD) { e[D[137][j]] = 35072 + j; d[35072 + j] = D[137][j];}
D[138] = "�����������������������������������������������������������������둅둆둇둈둉둊둋둌둍둎둏둒둓둕둖둗둙둚둛둜둝둞둟둢둤둦������둧둨둩둪둫둭둮둯둰둱둲둳둴둵둶둷둸둹둺둻둼둽둾둿뒁뒂������뒃뒄뒅뒆뒇뒉뒊뒋뒌뒍뒎뒏뒐뒑뒒뒓뒔뒕뒖뒗뒘뒙뒚뒛뒜뒞뒟뒠뒡뒢뒣뒥뒦뒧뒩뒪뒫뒭뒮뒯뒰뒱뒲뒳뒴뒶뒸뒺뒻뒼뒽뒾뒿듁듂듃듅듆듇듉듊듋듌듍듎듏듑듒듓듔듖듗듘듙듚듛듞듟듡듢듥듧듨듩듪듫듮듰듲듳듴듵듶듷듹듺듻듼듽듾듿딀딁딂딃딄딅딆딇딈딉딊딋딌딍딎딏딐딑딒딓딖딗딙딚딝�".split("");
for(j = 0; j != D[138].length; ++j) if(D[138][j].charCodeAt(0) !== 0xFFFD) { e[D[138][j]] = 35328 + j; d[35328 + j] = D[138][j];}
D[139] = "�����������������������������������������������������������������딞딟딠딡딢딣딦딫딬딭딮딯딲딳딵딶딷딹딺딻딼딽딾딿땂땆������땇땈땉땊땎땏땑땒땓땕땖땗땘땙땚땛땞땢땣땤땥땦땧땨땩땪������땫땬땭땮땯땰땱땲땳땴땵땶땷땸땹땺땻땼땽땾땿떀떁떂떃떄떅떆떇떈떉떊떋떌떍떎떏떐떑떒떓떔떕떖떗떘떙떚떛떜떝떞떟떢떣떥떦떧떩떬떭떮떯떲떶떷떸떹떺떾떿뗁뗂뗃뗅뗆뗇뗈뗉뗊뗋뗎뗒뗓뗔뗕뗖뗗뗙뗚뗛뗜뗝뗞뗟뗠뗡뗢뗣뗤뗥뗦뗧뗨뗩뗪뗫뗭뗮뗯뗰뗱뗲뗳뗴뗵뗶뗷뗸뗹뗺뗻뗼뗽뗾뗿�".split("");
for(j = 0; j != D[139].length; ++j) if(D[139][j].charCodeAt(0) !== 0xFFFD) { e[D[139][j]] = 35584 + j; d[35584 + j] = D[139][j];}
D[140] = "�����������������������������������������������������������������똀똁똂똃똄똅똆똇똈똉똊똋똌똍똎똏똒똓똕똖똗똙똚똛똜똝������똞똟똠똡똢똣똤똦똧똨똩똪똫똭똮똯똰똱똲똳똵똶똷똸똹똺������똻똼똽똾똿뙀뙁뙂뙃뙄뙅뙆뙇뙉뙊뙋뙌뙍뙎뙏뙐뙑뙒뙓뙔뙕뙖뙗뙘뙙뙚뙛뙜뙝뙞뙟뙠뙡뙢뙣뙥뙦뙧뙩뙪뙫뙬뙭뙮뙯뙰뙱뙲뙳뙴뙵뙶뙷뙸뙹뙺뙻뙼뙽뙾뙿뚀뚁뚂뚃뚄뚅뚆뚇뚈뚉뚊뚋뚌뚍뚎뚏뚐뚑뚒뚓뚔뚕뚖뚗뚘뚙뚚뚛뚞뚟뚡뚢뚣뚥뚦뚧뚨뚩뚪뚭뚮뚯뚰뚲뚳뚴뚵뚶뚷뚸뚹뚺뚻뚼뚽뚾뚿뛀뛁뛂�".split("");
for(j = 0; j != D[140].length; ++j) if(D[140][j].charCodeAt(0) !== 0xFFFD) { e[D[140][j]] = 35840 + j; d[35840 + j] = D[140][j];}
D[141] = "�����������������������������������������������������������������뛃뛄뛅뛆뛇뛈뛉뛊뛋뛌뛍뛎뛏뛐뛑뛒뛓뛕뛖뛗뛘뛙뛚뛛뛜뛝������뛞뛟뛠뛡뛢뛣뛤뛥뛦뛧뛨뛩뛪뛫뛬뛭뛮뛯뛱뛲뛳뛵뛶뛷뛹뛺������뛻뛼뛽뛾뛿뜂뜃뜄뜆뜇뜈뜉뜊뜋뜌뜍뜎뜏뜐뜑뜒뜓뜔뜕뜖뜗뜘뜙뜚뜛뜜뜝뜞뜟뜠뜡뜢뜣뜤뜥뜦뜧뜪뜫뜭뜮뜱뜲뜳뜴뜵뜶뜷뜺뜼뜽뜾뜿띀띁띂띃띅띆띇띉띊띋띍띎띏띐띑띒띓띖띗띘띙띚띛띜띝띞띟띡띢띣띥띦띧띩띪띫띬띭띮띯띲띴띶띷띸띹띺띻띾띿랁랂랃랅랆랇랈랉랊랋랎랓랔랕랚랛랝랞�".split("");
for(j = 0; j != D[141].length; ++j) if(D[141][j].charCodeAt(0) !== 0xFFFD) { e[D[141][j]] = 36096 + j; d[36096 + j] = D[141][j];}
D[142] = "�����������������������������������������������������������������랟랡랢랣랤랥랦랧랪랮랯랰랱랲랳랶랷랹랺랻랼랽랾랿럀럁������럂럃럄럅럆럈럊럋럌럍럎럏럐럑럒럓럔럕럖럗럘럙럚럛럜럝������럞럟럠럡럢럣럤럥럦럧럨럩럪럫럮럯럱럲럳럵럶럷럸럹럺럻럾렂렃렄렅렆렊렋렍렎렏렑렒렓렔렕렖렗렚렜렞렟렠렡렢렣렦렧렩렪렫렭렮렯렰렱렲렳렶렺렻렼렽렾렿롁롂롃롅롆롇롈롉롊롋롌롍롎롏롐롒롔롕롖롗롘롙롚롛롞롟롡롢롣롥롦롧롨롩롪롫롮롰롲롳롴롵롶롷롹롺롻롽롾롿뢀뢁뢂뢃뢄�".split("");
for(j = 0; j != D[142].length; ++j) if(D[142][j].charCodeAt(0) !== 0xFFFD) { e[D[142][j]] = 36352 + j; d[36352 + j] = D[142][j];}
D[143] = "�����������������������������������������������������������������뢅뢆뢇뢈뢉뢊뢋뢌뢎뢏뢐뢑뢒뢓뢔뢕뢖뢗뢘뢙뢚뢛뢜뢝뢞뢟������뢠뢡뢢뢣뢤뢥뢦뢧뢩뢪뢫뢬뢭뢮뢯뢱뢲뢳뢵뢶뢷뢹뢺뢻뢼뢽������뢾뢿룂룄룆룇룈룉룊룋룍룎룏룑룒룓룕룖룗룘룙룚룛룜룞룠룢룣룤룥룦룧룪룫룭룮룯룱룲룳룴룵룶룷룺룼룾룿뤀뤁뤂뤃뤅뤆뤇뤈뤉뤊뤋뤌뤍뤎뤏뤐뤑뤒뤓뤔뤕뤖뤗뤙뤚뤛뤜뤝뤞뤟뤡뤢뤣뤤뤥뤦뤧뤨뤩뤪뤫뤬뤭뤮뤯뤰뤱뤲뤳뤴뤵뤶뤷뤸뤹뤺뤻뤾뤿륁륂륃륅륆륇륈륉륊륋륍륎륐륒륓륔륕륖륗�".split("");
for(j = 0; j != D[143].length; ++j) if(D[143][j].charCodeAt(0) !== 0xFFFD) { e[D[143][j]] = 36608 + j; d[36608 + j] = D[143][j];}
D[144] = "�����������������������������������������������������������������륚륛륝륞륟륡륢륣륤륥륦륧륪륬륮륯륰륱륲륳륶륷륹륺륻륽������륾륿릀릁릂릃릆릈릋릌릏릐릑릒릓릔릕릖릗릘릙릚릛릜릝릞������릟릠릡릢릣릤릥릦릧릨릩릪릫릮릯릱릲릳릵릶릷릸릹릺릻릾맀맂맃맄맅맆맇맊맋맍맓맔맕맖맗맚맜맟맠맢맦맧맩맪맫맭맮맯맰맱맲맳맶맻맼맽맾맿먂먃먄먅먆먇먉먊먋먌먍먎먏먐먑먒먓먔먖먗먘먙먚먛먜먝먞먟먠먡먢먣먤먥먦먧먨먩먪먫먬먭먮먯먰먱먲먳먴먵먶먷먺먻먽먾먿멁멃멄멅멆�".split("");
for(j = 0; j != D[144].length; ++j) if(D[144][j].charCodeAt(0) !== 0xFFFD) { e[D[144][j]] = 36864 + j; d[36864 + j] = D[144][j];}
D[145] = "�����������������������������������������������������������������멇멊멌멏멐멑멒멖멗멙멚멛멝멞멟멠멡멢멣멦멪멫멬멭멮멯������멲멳멵멶멷멹멺멻멼멽멾멿몀몁몂몆몈몉몊몋몍몎몏몐몑몒������몓몔몕몖몗몘몙몚몛몜몝몞몟몠몡몢몣몤몥몦몧몪몭몮몯몱몳몴몵몶몷몺몼몾몿뫀뫁뫂뫃뫅뫆뫇뫉뫊뫋뫌뫍뫎뫏뫐뫑뫒뫓뫔뫕뫖뫗뫚뫛뫜뫝뫞뫟뫠뫡뫢뫣뫤뫥뫦뫧뫨뫩뫪뫫뫬뫭뫮뫯뫰뫱뫲뫳뫴뫵뫶뫷뫸뫹뫺뫻뫽뫾뫿묁묂묃묅묆묇묈묉묊묋묌묎묐묒묓묔묕묖묗묙묚묛묝묞묟묡묢묣묤묥묦묧�".split("");
for(j = 0; j != D[145].length; ++j) if(D[145][j].charCodeAt(0) !== 0xFFFD) { e[D[145][j]] = 37120 + j; d[37120 + j] = D[145][j];}
D[146] = "�����������������������������������������������������������������묨묪묬묭묮묯묰묱묲묳묷묹묺묿뭀뭁뭂뭃뭆뭈뭊뭋뭌뭎뭑뭒������뭓뭕뭖뭗뭙뭚뭛뭜뭝뭞뭟뭠뭢뭤뭥뭦뭧뭨뭩뭪뭫뭭뭮뭯뭰뭱������뭲뭳뭴뭵뭶뭷뭸뭹뭺뭻뭼뭽뭾뭿뮀뮁뮂뮃뮄뮅뮆뮇뮉뮊뮋뮍뮎뮏뮑뮒뮓뮔뮕뮖뮗뮘뮙뮚뮛뮜뮝뮞뮟뮠뮡뮢뮣뮥뮦뮧뮩뮪뮫뮭뮮뮯뮰뮱뮲뮳뮵뮶뮸뮹뮺뮻뮼뮽뮾뮿믁믂믃믅믆믇믉믊믋믌믍믎믏믑믒믔믕믖믗믘믙믚믛믜믝믞믟믠믡믢믣믤믥믦믧믨믩믪믫믬믭믮믯믰믱믲믳믴믵믶믷믺믻믽믾밁�".split("");
for(j = 0; j != D[146].length; ++j) if(D[146][j].charCodeAt(0) !== 0xFFFD) { e[D[146][j]] = 37376 + j; d[37376 + j] = D[146][j];}
D[147] = "�����������������������������������������������������������������밃밄밅밆밇밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵������밶밷밹밺밻밼밽밾밿뱂뱆뱇뱈뱊뱋뱎뱏뱑뱒뱓뱔뱕뱖뱗뱘뱙������뱚뱛뱜뱞뱟뱠뱡뱢뱣뱤뱥뱦뱧뱨뱩뱪뱫뱬뱭뱮뱯뱰뱱뱲뱳뱴뱵뱶뱷뱸뱹뱺뱻뱼뱽뱾뱿벀벁벂벃벆벇벉벊벍벏벐벑벒벓벖벘벛벜벝벞벟벢벣벥벦벩벪벫벬벭벮벯벲벶벷벸벹벺벻벾벿볁볂볃볅볆볇볈볉볊볋볌볎볒볓볔볖볗볙볚볛볝볞볟볠볡볢볣볤볥볦볧볨볩볪볫볬볭볮볯볰볱볲볳볷볹볺볻볽�".split("");
for(j = 0; j != D[147].length; ++j) if(D[147][j].charCodeAt(0) !== 0xFFFD) { e[D[147][j]] = 37632 + j; d[37632 + j] = D[147][j];}
D[148] = "�����������������������������������������������������������������볾볿봀봁봂봃봆봈봊봋봌봍봎봏봑봒봓봕봖봗봘봙봚봛봜봝������봞봟봠봡봢봣봥봦봧봨봩봪봫봭봮봯봰봱봲봳봴봵봶봷봸봹������봺봻봼봽봾봿뵁뵂뵃뵄뵅뵆뵇뵊뵋뵍뵎뵏뵑뵒뵓뵔뵕뵖뵗뵚뵛뵜뵝뵞뵟뵠뵡뵢뵣뵥뵦뵧뵩뵪뵫뵬뵭뵮뵯뵰뵱뵲뵳뵴뵵뵶뵷뵸뵹뵺뵻뵼뵽뵾뵿붂붃붅붆붋붌붍붎붏붒붔붖붗붘붛붝붞붟붠붡붢붣붥붦붧붨붩붪붫붬붭붮붯붱붲붳붴붵붶붷붹붺붻붼붽붾붿뷀뷁뷂뷃뷄뷅뷆뷇뷈뷉뷊뷋뷌뷍뷎뷏뷐뷑�".split("");
for(j = 0; j != D[148].length; ++j) if(D[148][j].charCodeAt(0) !== 0xFFFD) { e[D[148][j]] = 37888 + j; d[37888 + j] = D[148][j];}
D[149] = "�����������������������������������������������������������������뷒뷓뷖뷗뷙뷚뷛뷝뷞뷟뷠뷡뷢뷣뷤뷥뷦뷧뷨뷪뷫뷬뷭뷮뷯뷱������뷲뷳뷵뷶뷷뷹뷺뷻뷼뷽뷾뷿븁븂븄븆븇븈븉븊븋븎븏븑븒븓������븕븖븗븘븙븚븛븞븠븡븢븣븤븥븦븧븨븩븪븫븬븭븮븯븰븱븲븳븴븵븶븷븸븹븺븻븼븽븾븿빀빁빂빃빆빇빉빊빋빍빏빐빑빒빓빖빘빜빝빞빟빢빣빥빦빧빩빫빬빭빮빯빲빶빷빸빹빺빾빿뺁뺂뺃뺅뺆뺇뺈뺉뺊뺋뺎뺒뺓뺔뺕뺖뺗뺚뺛뺜뺝뺞뺟뺠뺡뺢뺣뺤뺥뺦뺧뺩뺪뺫뺬뺭뺮뺯뺰뺱뺲뺳뺴뺵뺶뺷�".split("");
for(j = 0; j != D[149].length; ++j) if(D[149][j].charCodeAt(0) !== 0xFFFD) { e[D[149][j]] = 38144 + j; d[38144 + j] = D[149][j];}
D[150] = "�����������������������������������������������������������������뺸뺹뺺뺻뺼뺽뺾뺿뻀뻁뻂뻃뻄뻅뻆뻇뻈뻉뻊뻋뻌뻍뻎뻏뻒뻓������뻕뻖뻙뻚뻛뻜뻝뻞뻟뻡뻢뻦뻧뻨뻩뻪뻫뻭뻮뻯뻰뻱뻲뻳뻴뻵������뻶뻷뻸뻹뻺뻻뻼뻽뻾뻿뼀뼂뼃뼄뼅뼆뼇뼊뼋뼌뼍뼎뼏뼐뼑뼒뼓뼔뼕뼖뼗뼚뼞뼟뼠뼡뼢뼣뼤뼥뼦뼧뼨뼩뼪뼫뼬뼭뼮뼯뼰뼱뼲뼳뼴뼵뼶뼷뼸뼹뼺뼻뼼뼽뼾뼿뽂뽃뽅뽆뽇뽉뽊뽋뽌뽍뽎뽏뽒뽓뽔뽖뽗뽘뽙뽚뽛뽜뽝뽞뽟뽠뽡뽢뽣뽤뽥뽦뽧뽨뽩뽪뽫뽬뽭뽮뽯뽰뽱뽲뽳뽴뽵뽶뽷뽸뽹뽺뽻뽼뽽뽾뽿뾀뾁뾂�".split("");
for(j = 0; j != D[150].length; ++j) if(D[150][j].charCodeAt(0) !== 0xFFFD) { e[D[150][j]] = 38400 + j; d[38400 + j] = D[150][j];}
D[151] = "�����������������������������������������������������������������뾃뾄뾅뾆뾇뾈뾉뾊뾋뾌뾍뾎뾏뾐뾑뾒뾓뾕뾖뾗뾘뾙뾚뾛뾜뾝������뾞뾟뾠뾡뾢뾣뾤뾥뾦뾧뾨뾩뾪뾫뾬뾭뾮뾯뾱뾲뾳뾴뾵뾶뾷뾸������뾹뾺뾻뾼뾽뾾뾿뿀뿁뿂뿃뿄뿆뿇뿈뿉뿊뿋뿎뿏뿑뿒뿓뿕뿖뿗뿘뿙뿚뿛뿝뿞뿠뿢뿣뿤뿥뿦뿧뿨뿩뿪뿫뿬뿭뿮뿯뿰뿱뿲뿳뿴뿵뿶뿷뿸뿹뿺뿻뿼뿽뿾뿿쀀쀁쀂쀃쀄쀅쀆쀇쀈쀉쀊쀋쀌쀍쀎쀏쀐쀑쀒쀓쀔쀕쀖쀗쀘쀙쀚쀛쀜쀝쀞쀟쀠쀡쀢쀣쀤쀥쀦쀧쀨쀩쀪쀫쀬쀭쀮쀯쀰쀱쀲쀳쀴쀵쀶쀷쀸쀹쀺쀻쀽쀾쀿�".split("");
for(j = 0; j != D[151].length; ++j) if(D[151][j].charCodeAt(0) !== 0xFFFD) { e[D[151][j]] = 38656 + j; d[38656 + j] = D[151][j];}
D[152] = "�����������������������������������������������������������������쁀쁁쁂쁃쁄쁅쁆쁇쁈쁉쁊쁋쁌쁍쁎쁏쁐쁒쁓쁔쁕쁖쁗쁙쁚쁛������쁝쁞쁟쁡쁢쁣쁤쁥쁦쁧쁪쁫쁬쁭쁮쁯쁰쁱쁲쁳쁴쁵쁶쁷쁸쁹������쁺쁻쁼쁽쁾쁿삀삁삂삃삄삅삆삇삈삉삊삋삌삍삎삏삒삓삕삖삗삙삚삛삜삝삞삟삢삤삦삧삨삩삪삫삮삱삲삷삸삹삺삻삾샂샃샄샆샇샊샋샍샎샏샑샒샓샔샕샖샗샚샞샟샠샡샢샣샦샧샩샪샫샭샮샯샰샱샲샳샶샸샺샻샼샽샾샿섁섂섃섅섆섇섉섊섋섌섍섎섏섑섒섓섔섖섗섘섙섚섛섡섢섥섨섩섪섫섮�".split("");
for(j = 0; j != D[152].length; ++j) if(D[152][j].charCodeAt(0) !== 0xFFFD) { e[D[152][j]] = 38912 + j; d[38912 + j] = D[152][j];}
D[153] = "�����������������������������������������������������������������섲섳섴섵섷섺섻섽섾섿셁셂셃셄셅셆셇셊셎셏셐셑셒셓셖셗������셙셚셛셝셞셟셠셡셢셣셦셪셫셬셭셮셯셱셲셳셵셶셷셹셺셻������셼셽셾셿솀솁솂솃솄솆솇솈솉솊솋솏솑솒솓솕솗솘솙솚솛솞솠솢솣솤솦솧솪솫솭솮솯솱솲솳솴솵솶솷솸솹솺솻솼솾솿쇀쇁쇂쇃쇅쇆쇇쇉쇊쇋쇍쇎쇏쇐쇑쇒쇓쇕쇖쇙쇚쇛쇜쇝쇞쇟쇡쇢쇣쇥쇦쇧쇩쇪쇫쇬쇭쇮쇯쇲쇴쇵쇶쇷쇸쇹쇺쇻쇾쇿숁숂숃숅숆숇숈숉숊숋숎숐숒숓숔숕숖숗숚숛숝숞숡숢숣�".split("");
for(j = 0; j != D[153].length; ++j) if(D[153][j].charCodeAt(0) !== 0xFFFD) { e[D[153][j]] = 39168 + j; d[39168 + j] = D[153][j];}
D[154] = "�����������������������������������������������������������������숤숥숦숧숪숬숮숰숳숵숶숷숸숹숺숻숼숽숾숿쉀쉁쉂쉃쉄쉅������쉆쉇쉉쉊쉋쉌쉍쉎쉏쉒쉓쉕쉖쉗쉙쉚쉛쉜쉝쉞쉟쉡쉢쉣쉤쉦������쉧쉨쉩쉪쉫쉮쉯쉱쉲쉳쉵쉶쉷쉸쉹쉺쉻쉾슀슂슃슄슅슆슇슊슋슌슍슎슏슑슒슓슔슕슖슗슙슚슜슞슟슠슡슢슣슦슧슩슪슫슮슯슰슱슲슳슶슸슺슻슼슽슾슿싀싁싂싃싄싅싆싇싈싉싊싋싌싍싎싏싐싑싒싓싔싕싖싗싘싙싚싛싞싟싡싢싥싦싧싨싩싪싮싰싲싳싴싵싷싺싽싾싿쌁쌂쌃쌄쌅쌆쌇쌊쌋쌎쌏�".split("");
for(j = 0; j != D[154].length; ++j) if(D[154][j].charCodeAt(0) !== 0xFFFD) { e[D[154][j]] = 39424 + j; d[39424 + j] = D[154][j];}
D[155] = "�����������������������������������������������������������������쌐쌑쌒쌖쌗쌙쌚쌛쌝쌞쌟쌠쌡쌢쌣쌦쌧쌪쌫쌬쌭쌮쌯쌰쌱쌲������쌳쌴쌵쌶쌷쌸쌹쌺쌻쌼쌽쌾쌿썀썁썂썃썄썆썇썈썉썊썋썌썍������썎썏썐썑썒썓썔썕썖썗썘썙썚썛썜썝썞썟썠썡썢썣썤썥썦썧썪썫썭썮썯썱썳썴썵썶썷썺썻썾썿쎀쎁쎂쎃쎅쎆쎇쎉쎊쎋쎍쎎쎏쎐쎑쎒쎓쎔쎕쎖쎗쎘쎙쎚쎛쎜쎝쎞쎟쎠쎡쎢쎣쎤쎥쎦쎧쎨쎩쎪쎫쎬쎭쎮쎯쎰쎱쎲쎳쎴쎵쎶쎷쎸쎹쎺쎻쎼쎽쎾쎿쏁쏂쏃쏄쏅쏆쏇쏈쏉쏊쏋쏌쏍쏎쏏쏐쏑쏒쏓쏔쏕쏖쏗쏚�".split("");
for(j = 0; j != D[155].length; ++j) if(D[155][j].charCodeAt(0) !== 0xFFFD) { e[D[155][j]] = 39680 + j; d[39680 + j] = D[155][j];}
D[156] = "�����������������������������������������������������������������쏛쏝쏞쏡쏣쏤쏥쏦쏧쏪쏫쏬쏮쏯쏰쏱쏲쏳쏶쏷쏹쏺쏻쏼쏽쏾������쏿쐀쐁쐂쐃쐄쐅쐆쐇쐉쐊쐋쐌쐍쐎쐏쐑쐒쐓쐔쐕쐖쐗쐘쐙쐚������쐛쐜쐝쐞쐟쐠쐡쐢쐣쐥쐦쐧쐨쐩쐪쐫쐭쐮쐯쐱쐲쐳쐵쐶쐷쐸쐹쐺쐻쐾쐿쑀쑁쑂쑃쑄쑅쑆쑇쑉쑊쑋쑌쑍쑎쑏쑐쑑쑒쑓쑔쑕쑖쑗쑘쑙쑚쑛쑜쑝쑞쑟쑠쑡쑢쑣쑦쑧쑩쑪쑫쑭쑮쑯쑰쑱쑲쑳쑶쑷쑸쑺쑻쑼쑽쑾쑿쒁쒂쒃쒄쒅쒆쒇쒈쒉쒊쒋쒌쒍쒎쒏쒐쒑쒒쒓쒕쒖쒗쒘쒙쒚쒛쒝쒞쒟쒠쒡쒢쒣쒤쒥쒦쒧쒨쒩�".split("");
for(j = 0; j != D[156].length; ++j) if(D[156][j].charCodeAt(0) !== 0xFFFD) { e[D[156][j]] = 39936 + j; d[39936 + j] = D[156][j];}
D[157] = "�����������������������������������������������������������������쒪쒫쒬쒭쒮쒯쒰쒱쒲쒳쒴쒵쒶쒷쒹쒺쒻쒽쒾쒿쓀쓁쓂쓃쓄쓅������쓆쓇쓈쓉쓊쓋쓌쓍쓎쓏쓐쓑쓒쓓쓔쓕쓖쓗쓘쓙쓚쓛쓜쓝쓞쓟������쓠쓡쓢쓣쓤쓥쓦쓧쓨쓪쓫쓬쓭쓮쓯쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂씃씄씅씆씇씈씉씊씋씍씎씏씑씒씓씕씖씗씘씙씚씛씝씞씟씠씡씢씣씤씥씦씧씪씫씭씮씯씱씲씳씴씵씶씷씺씼씾씿앀앁앂앃앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩앪앫앬앭앮앯앲앶앷앸앹앺앻앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔�".split("");
for(j = 0; j != D[157].length; ++j) if(D[157][j].charCodeAt(0) !== 0xFFFD) { e[D[157][j]] = 40192 + j; d[40192 + j] = D[157][j];}
D[158] = "�����������������������������������������������������������������얖얙얚얛얝얞얟얡얢얣얤얥얦얧얨얪얫얬얭얮얯얰얱얲얳얶������얷얺얿엀엁엂엃엋엍엏엒엓엕엖엗엙엚엛엜엝엞엟엢엤엦엧������엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑옒옓옔옕옖옗옚옝옞옟옠옡옢옣옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉왊왋왌왍왎왏왒왖왗왘왙왚왛왞왟왡왢왣왤왥왦왧왨왩왪왫왭왮왰왲왳왴왵왶왷왺왻왽왾왿욁욂욃욄욅욆욇욊욌욎욏욐욑욒욓욖욗욙욚욛욝욞욟욠욡욢욣욦�".split("");
for(j = 0; j != D[158].length; ++j) if(D[158][j].charCodeAt(0) !== 0xFFFD) { e[D[158][j]] = 40448 + j; d[40448 + j] = D[158][j];}
D[159] = "�����������������������������������������������������������������욨욪욫욬욭욮욯욲욳욵욶욷욻욼욽욾욿웂웄웆웇웈웉웊웋웎������웏웑웒웓웕웖웗웘웙웚웛웞웟웢웣웤웥웦웧웪웫웭웮웯웱웲������웳웴웵웶웷웺웻웼웾웿윀윁윂윃윆윇윉윊윋윍윎윏윐윑윒윓윖윘윚윛윜윝윞윟윢윣윥윦윧윩윪윫윬윭윮윯윲윴윶윸윹윺윻윾윿읁읂읃읅읆읇읈읉읋읎읐읙읚읛읝읞읟읡읢읣읤읥읦읧읩읪읬읭읮읯읰읱읲읳읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛잜잝잞잟잢잧잨잩잪잫잮잯잱잲잳잵잶잷�".split("");
for(j = 0; j != D[159].length; ++j) if(D[159][j].charCodeAt(0) !== 0xFFFD) { e[D[159][j]] = 40704 + j; d[40704 + j] = D[159][j];}
D[160] = "�����������������������������������������������������������������잸잹잺잻잾쟂쟃쟄쟅쟆쟇쟊쟋쟍쟏쟑쟒쟓쟔쟕쟖쟗쟙쟚쟛쟜������쟞쟟쟠쟡쟢쟣쟥쟦쟧쟩쟪쟫쟭쟮쟯쟰쟱쟲쟳쟴쟵쟶쟷쟸쟹쟺������쟻쟼쟽쟾쟿젂젃젅젆젇젉젋젌젍젎젏젒젔젗젘젙젚젛젞젟젡젢젣젥젦젧젨젩젪젫젮젰젲젳젴젵젶젷젹젺젻젽젾젿졁졂졃졄졅졆졇졊졋졎졏졐졑졒졓졕졖졗졘졙졚졛졜졝졞졟졠졡졢졣졤졥졦졧졨졩졪졫졬졭졮졯졲졳졵졶졷졹졻졼졽졾졿좂좄좈좉좊좎좏좐좑좒좓좕좖좗좘좙좚좛좜좞좠좢좣좤�".split("");
for(j = 0; j != D[160].length; ++j) if(D[160][j].charCodeAt(0) !== 0xFFFD) { e[D[160][j]] = 40960 + j; d[40960 + j] = D[160][j];}
D[161] = "�����������������������������������������������������������������좥좦좧좩좪좫좬좭좮좯좰좱좲좳좴좵좶좷좸좹좺좻좾좿죀죁������죂죃죅죆죇죉죊죋죍죎죏죐죑죒죓죖죘죚죛죜죝죞죟죢죣죥������죦죧죨죩죪죫죬죭죮죯죰죱죲죳죴죶죷죸죹죺죻죾죿줁줂줃줇줈줉줊줋줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈〉《》「」『』【】±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢�".split("");
for(j = 0; j != D[161].length; ++j) if(D[161][j].charCodeAt(0) !== 0xFFFD) { e[D[161][j]] = 41216 + j; d[41216 + j] = D[161][j];}
D[162] = "�����������������������������������������������������������������줐줒줓줔줕줖줗줙줚줛줜줝줞줟줠줡줢줣줤줥줦줧줨줩줪줫������줭줮줯줰줱줲줳줵줶줷줸줹줺줻줼줽줾줿쥀쥁쥂쥃쥄쥅쥆쥇������쥈쥉쥊쥋쥌쥍쥎쥏쥒쥓쥕쥖쥗쥙쥚쥛쥜쥝쥞쥟쥢쥤쥥쥦쥧쥨쥩쥪쥫쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®������������������������".split("");
for(j = 0; j != D[162].length; ++j) if(D[162][j].charCodeAt(0) !== 0xFFFD) { e[D[162][j]] = 41472 + j; d[41472 + j] = D[162][j];}
D[163] = "�����������������������������������������������������������������쥱쥲쥳쥵쥶쥷쥸쥹쥺쥻쥽쥾쥿즀즁즂즃즄즅즆즇즊즋즍즎즏������즑즒즓즔즕즖즗즚즜즞즟즠즡즢즣즤즥즦즧즨즩즪즫즬즭즮������즯즰즱즲즳즴즵즶즷즸즹즺즻즼즽즾즿짂짃짅짆짉짋짌짍짎짏짒짔짗짘짛！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［￦］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝￣�".split("");
for(j = 0; j != D[163].length; ++j) if(D[163][j].charCodeAt(0) !== 0xFFFD) { e[D[163][j]] = 41728 + j; d[41728 + j] = D[163][j];}
D[164] = "�����������������������������������������������������������������짞짟짡짣짥짦짨짩짪짫짮짲짳짴짵짶짷짺짻짽짾짿쨁쨂쨃쨄������쨅쨆쨇쨊쨎쨏쨐쨑쨒쨓쨕쨖쨗쨙쨚쨛쨜쨝쨞쨟쨠쨡쨢쨣쨤쨥������쨦쨧쨨쨪쨫쨬쨭쨮쨯쨰쨱쨲쨳쨴쨵쨶쨷쨸쨹쨺쨻쨼쨽쨾쨿쩀쩁쩂쩃쩄쩅쩆ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣㅤㅥㅦㅧㅨㅩㅪㅫㅬㅭㅮㅯㅰㅱㅲㅳㅴㅵㅶㅷㅸㅹㅺㅻㅼㅽㅾㅿㆀㆁㆂㆃㆄㆅㆆㆇㆈㆉㆊㆋㆌㆍㆎ�".split("");
for(j = 0; j != D[164].length; ++j) if(D[164][j].charCodeAt(0) !== 0xFFFD) { e[D[164][j]] = 41984 + j; d[41984 + j] = D[164][j];}
D[165] = "�����������������������������������������������������������������쩇쩈쩉쩊쩋쩎쩏쩑쩒쩓쩕쩖쩗쩘쩙쩚쩛쩞쩢쩣쩤쩥쩦쩧쩩쩪������쩫쩬쩭쩮쩯쩰쩱쩲쩳쩴쩵쩶쩷쩸쩹쩺쩻쩼쩾쩿쪀쪁쪂쪃쪅쪆������쪇쪈쪉쪊쪋쪌쪍쪎쪏쪐쪑쪒쪓쪔쪕쪖쪗쪙쪚쪛쪜쪝쪞쪟쪠쪡쪢쪣쪤쪥쪦쪧ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ�����ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ�������ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ��������αβγδεζηθικλμνξοπρστυφχψω�������".split("");
for(j = 0; j != D[165].length; ++j) if(D[165][j].charCodeAt(0) !== 0xFFFD) { e[D[165][j]] = 42240 + j; d[42240 + j] = D[165][j];}
D[166] = "�����������������������������������������������������������������쪨쪩쪪쪫쪬쪭쪮쪯쪰쪱쪲쪳쪴쪵쪶쪷쪸쪹쪺쪻쪾쪿쫁쫂쫃쫅������쫆쫇쫈쫉쫊쫋쫎쫐쫒쫔쫕쫖쫗쫚쫛쫜쫝쫞쫟쫡쫢쫣쫤쫥쫦쫧������쫨쫩쫪쫫쫭쫮쫯쫰쫱쫲쫳쫵쫶쫷쫸쫹쫺쫻쫼쫽쫾쫿쬀쬁쬂쬃쬄쬅쬆쬇쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃╄╅╆╇╈╉╊���������������������������".split("");
for(j = 0; j != D[166].length; ++j) if(D[166][j].charCodeAt(0) !== 0xFFFD) { e[D[166][j]] = 42496 + j; d[42496 + j] = D[166][j];}
D[167] = "�����������������������������������������������������������������쬋쬌쬍쬎쬏쬑쬒쬓쬕쬖쬗쬙쬚쬛쬜쬝쬞쬟쬢쬣쬤쬥쬦쬧쬨쬩������쬪쬫쬬쬭쬮쬯쬰쬱쬲쬳쬴쬵쬶쬷쬸쬹쬺쬻쬼쬽쬾쬿쭀쭂쭃쭄������쭅쭆쭇쭊쭋쭍쭎쭏쭑쭒쭓쭔쭕쭖쭗쭚쭛쭜쭞쭟쭠쭡쭢쭣쭥쭦쭧쭨쭩쭪쭫쭬㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙㎚㎛㎜㎝㎞㎟㎠㎡㎢㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰㎱㎲㎳㎴㎵㎶㎷㎸㎹㎀㎁㎂㎃㎄㎺㎻㎼㎽㎾㎿㎐㎑㎒㎓㎔Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆����������������".split("");
for(j = 0; j != D[167].length; ++j) if(D[167][j].charCodeAt(0) !== 0xFFFD) { e[D[167][j]] = 42752 + j; d[42752 + j] = D[167][j];}
D[168] = "�����������������������������������������������������������������쭭쭮쭯쭰쭱쭲쭳쭴쭵쭶쭷쭺쭻쭼쭽쭾쭿쮀쮁쮂쮃쮄쮅쮆쮇쮈������쮉쮊쮋쮌쮍쮎쮏쮐쮑쮒쮓쮔쮕쮖쮗쮘쮙쮚쮛쮝쮞쮟쮠쮡쮢쮣������쮤쮥쮦쮧쮨쮩쮪쮫쮬쮭쮮쮯쮰쮱쮲쮳쮴쮵쮶쮷쮹쮺쮻쮼쮽쮾쮿쯀쯁쯂쯃쯄ÆÐªĦ�Ĳ�ĿŁØŒºÞŦŊ�㉠㉡㉢㉣㉤㉥㉦㉧㉨㉩㉪㉫㉬㉭㉮㉯㉰㉱㉲㉳㉴㉵㉶㉷㉸㉹㉺㉻ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮½⅓⅔¼¾⅛⅜⅝⅞�".split("");
for(j = 0; j != D[168].length; ++j) if(D[168][j].charCodeAt(0) !== 0xFFFD) { e[D[168][j]] = 43008 + j; d[43008 + j] = D[168][j];}
D[169] = "�����������������������������������������������������������������쯅쯆쯇쯈쯉쯊쯋쯌쯍쯎쯏쯐쯑쯒쯓쯕쯖쯗쯘쯙쯚쯛쯜쯝쯞쯟������쯠쯡쯢쯣쯥쯦쯨쯪쯫쯬쯭쯮쯯쯰쯱쯲쯳쯴쯵쯶쯷쯸쯹쯺쯻쯼������쯽쯾쯿찀찁찂찃찄찅찆찇찈찉찊찋찎찏찑찒찓찕찖찗찘찙찚찛찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀㈁㈂㈃㈄㈅㈆㈇㈈㈉㈊㈋㈌㈍㈎㈏㈐㈑㈒㈓㈔㈕㈖㈗㈘㈙㈚㈛⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂¹²³⁴ⁿ₁₂₃₄�".split("");
for(j = 0; j != D[169].length; ++j) if(D[169][j].charCodeAt(0) !== 0xFFFD) { e[D[169][j]] = 43264 + j; d[43264 + j] = D[169][j];}
D[170] = "�����������������������������������������������������������������찥찦찪찫찭찯찱찲찳찴찵찶찷찺찿챀챁챂챃챆챇챉챊챋챍챎������챏챐챑챒챓챖챚챛챜챝챞챟챡챢챣챥챧챩챪챫챬챭챮챯챱챲������챳챴챶챷챸챹챺챻챼챽챾챿첀첁첂첃첄첅첆첇첈첉첊첋첌첍첎첏첐첑첒첓ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん������������".split("");
for(j = 0; j != D[170].length; ++j) if(D[170][j].charCodeAt(0) !== 0xFFFD) { e[D[170][j]] = 43520 + j; d[43520 + j] = D[170][j];}
D[171] = "�����������������������������������������������������������������첔첕첖첗첚첛첝첞첟첡첢첣첤첥첦첧첪첮첯첰첱첲첳첶첷첹������첺첻첽첾첿쳀쳁쳂쳃쳆쳈쳊쳋쳌쳍쳎쳏쳑쳒쳓쳕쳖쳗쳘쳙쳚������쳛쳜쳝쳞쳟쳠쳡쳢쳣쳥쳦쳧쳨쳩쳪쳫쳭쳮쳯쳱쳲쳳쳴쳵쳶쳷쳸쳹쳺쳻쳼쳽ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ���������".split("");
for(j = 0; j != D[171].length; ++j) if(D[171][j].charCodeAt(0) !== 0xFFFD) { e[D[171][j]] = 43776 + j; d[43776 + j] = D[171][j];}
D[172] = "�����������������������������������������������������������������쳾쳿촀촂촃촄촅촆촇촊촋촍촎촏촑촒촓촔촕촖촗촚촜촞촟촠������촡촢촣촥촦촧촩촪촫촭촮촯촰촱촲촳촴촵촶촷촸촺촻촼촽촾������촿쵀쵁쵂쵃쵄쵅쵆쵇쵈쵉쵊쵋쵌쵍쵎쵏쵐쵑쵒쵓쵔쵕쵖쵗쵘쵙쵚쵛쵝쵞쵟АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ���������������абвгдеёжзийклмнопрстуфхцчшщъыьэюя��������������".split("");
for(j = 0; j != D[172].length; ++j) if(D[172][j].charCodeAt(0) !== 0xFFFD) { e[D[172][j]] = 44032 + j; d[44032 + j] = D[172][j];}
D[173] = "�����������������������������������������������������������������쵡쵢쵣쵥쵦쵧쵨쵩쵪쵫쵮쵰쵲쵳쵴쵵쵶쵷쵹쵺쵻쵼쵽쵾쵿춀������춁춂춃춄춅춆춇춉춊춋춌춍춎춏춐춑춒춓춖춗춙춚춛춝춞춟������춠춡춢춣춦춨춪춫춬춭춮춯춱춲춳춴춵춶춷춸춹춺춻춼춽춾춿췀췁췂췃췅�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[173].length; ++j) if(D[173][j].charCodeAt(0) !== 0xFFFD) { e[D[173][j]] = 44288 + j; d[44288 + j] = D[173][j];}
D[174] = "�����������������������������������������������������������������췆췇췈췉췊췋췍췎췏췑췒췓췔췕췖췗췘췙췚췛췜췝췞췟췠췡������췢췣췤췥췦췧췩췪췫췭췮췯췱췲췳췴췵췶췷췺췼췾췿츀츁츂������츃츅츆츇츉츊츋츍츎츏츐츑츒츓츕츖츗츘츚츛츜츝츞츟츢츣츥츦츧츩츪츫�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[174].length; ++j) if(D[174][j].charCodeAt(0) !== 0xFFFD) { e[D[174][j]] = 44544 + j; d[44544 + j] = D[174][j];}
D[175] = "�����������������������������������������������������������������츬츭츮츯츲츴츶츷츸츹츺츻츼츽츾츿칀칁칂칃칄칅칆칇칈칉������칊칋칌칍칎칏칐칑칒칓칔칕칖칗칚칛칝칞칢칣칤칥칦칧칪칬������칮칯칰칱칲칳칶칷칹칺칻칽칾칿캀캁캂캃캆캈캊캋캌캍캎캏캒캓캕캖캗캙�����������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[175].length; ++j) if(D[175][j].charCodeAt(0) !== 0xFFFD) { e[D[175][j]] = 44800 + j; d[44800 + j] = D[175][j];}
D[176] = "�����������������������������������������������������������������캚캛캜캝캞캟캢캦캧캨캩캪캫캮캯캰캱캲캳캴캵캶캷캸캹캺������캻캼캽캾캿컀컂컃컄컅컆컇컈컉컊컋컌컍컎컏컐컑컒컓컔컕������컖컗컘컙컚컛컜컝컞컟컠컡컢컣컦컧컩컪컭컮컯컰컱컲컳컶컺컻컼컽컾컿가각간갇갈갉갊감갑값갓갔강갖갗같갚갛개객갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆�".split("");
for(j = 0; j != D[176].length; ++j) if(D[176][j].charCodeAt(0) !== 0xFFFD) { e[D[176][j]] = 45056 + j; d[45056 + j] = D[176][j];}
D[177] = "�����������������������������������������������������������������켂켃켅켆켇켉켊켋켌켍켎켏켒켔켖켗켘켙켚켛켝켞켟켡켢켣������켥켦켧켨켩켪켫켮켲켳켴켵켶켷켹켺켻켼켽켾켿콀콁콂콃콄������콅콆콇콈콉콊콋콌콍콎콏콐콑콒콓콖콗콙콚콛콝콞콟콠콡콢콣콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸�".split("");
for(j = 0; j != D[177].length; ++j) if(D[177][j].charCodeAt(0) !== 0xFFFD) { e[D[177][j]] = 45312 + j; d[45312 + j] = D[177][j];}
D[178] = "�����������������������������������������������������������������콭콮콯콲콳콵콶콷콹콺콻콼콽콾콿쾁쾂쾃쾄쾆쾇쾈쾉쾊쾋쾍������쾎쾏쾐쾑쾒쾓쾔쾕쾖쾗쾘쾙쾚쾛쾜쾝쾞쾟쾠쾢쾣쾤쾥쾦쾧쾩������쾪쾫쾬쾭쾮쾯쾱쾲쾳쾴쾵쾶쾷쾸쾹쾺쾻쾼쾽쾾쾿쿀쿁쿂쿃쿅쿆쿇쿈쿉쿊쿋깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙�".split("");
for(j = 0; j != D[178].length; ++j) if(D[178][j].charCodeAt(0) !== 0xFFFD) { e[D[178][j]] = 45568 + j; d[45568 + j] = D[178][j];}
D[179] = "�����������������������������������������������������������������쿌쿍쿎쿏쿐쿑쿒쿓쿔쿕쿖쿗쿘쿙쿚쿛쿜쿝쿞쿟쿢쿣쿥쿦쿧쿩������쿪쿫쿬쿭쿮쿯쿲쿴쿶쿷쿸쿹쿺쿻쿽쿾쿿퀁퀂퀃퀅퀆퀇퀈퀉퀊������퀋퀌퀍퀎퀏퀐퀒퀓퀔퀕퀖퀗퀙퀚퀛퀜퀝퀞퀟퀠퀡퀢퀣퀤퀥퀦퀧퀨퀩퀪퀫퀬끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫났낭낮낯낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝�".split("");
for(j = 0; j != D[179].length; ++j) if(D[179][j].charCodeAt(0) !== 0xFFFD) { e[D[179][j]] = 45824 + j; d[45824 + j] = D[179][j];}
D[180] = "�����������������������������������������������������������������퀮퀯퀰퀱퀲퀳퀶퀷퀹퀺퀻퀽퀾퀿큀큁큂큃큆큈큊큋큌큍큎큏������큑큒큓큕큖큗큙큚큛큜큝큞큟큡큢큣큤큥큦큧큨큩큪큫큮큯������큱큲큳큵큶큷큸큹큺큻큾큿킀킂킃킄킅킆킇킈킉킊킋킌킍킎킏킐킑킒킓킔뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥�".split("");
for(j = 0; j != D[180].length; ++j) if(D[180][j].charCodeAt(0) !== 0xFFFD) { e[D[180][j]] = 46080 + j; d[46080 + j] = D[180][j];}
D[181] = "�����������������������������������������������������������������킕킖킗킘킙킚킛킜킝킞킟킠킡킢킣킦킧킩킪킫킭킮킯킰킱킲������킳킶킸킺킻킼킽킾킿탂탃탅탆탇탊탋탌탍탎탏탒탖탗탘탙탚������탛탞탟탡탢탣탥탦탧탨탩탪탫탮탲탳탴탵탶탷탹탺탻탼탽탾탿턀턁턂턃턄덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸�".split("");
for(j = 0; j != D[181].length; ++j) if(D[181][j].charCodeAt(0) !== 0xFFFD) { e[D[181][j]] = 46336 + j; d[46336 + j] = D[181][j];}
D[182] = "�����������������������������������������������������������������턅턆턇턈턉턊턋턌턎턏턐턑턒턓턔턕턖턗턘턙턚턛턜턝턞턟������턠턡턢턣턤턥턦턧턨턩턪턫턬턭턮턯턲턳턵턶턷턹턻턼턽턾������턿텂텆텇텈텉텊텋텎텏텑텒텓텕텖텗텘텙텚텛텞텠텢텣텤텥텦텧텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗�".split("");
for(j = 0; j != D[182].length; ++j) if(D[182][j].charCodeAt(0) !== 0xFFFD) { e[D[182][j]] = 46592 + j; d[46592 + j] = D[182][j];}
D[183] = "�����������������������������������������������������������������텮텯텰텱텲텳텴텵텶텷텸텹텺텻텽텾텿톀톁톂톃톅톆톇톉톊������톋톌톍톎톏톐톑톒톓톔톕톖톗톘톙톚톛톜톝톞톟톢톣톥톦톧������톩톪톫톬톭톮톯톲톴톶톷톸톹톻톽톾톿퇁퇂퇃퇄퇅퇆퇇퇈퇉퇊퇋퇌퇍퇎퇏래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩�".split("");
for(j = 0; j != D[183].length; ++j) if(D[183][j].charCodeAt(0) !== 0xFFFD) { e[D[183][j]] = 46848 + j; d[46848 + j] = D[183][j];}
D[184] = "�����������������������������������������������������������������퇐퇑퇒퇓퇔퇕퇖퇗퇙퇚퇛퇜퇝퇞퇟퇠퇡퇢퇣퇤퇥퇦퇧퇨퇩퇪������퇫퇬퇭퇮퇯퇰퇱퇲퇳퇵퇶퇷퇹퇺퇻퇼퇽퇾퇿툀툁툂툃툄툅툆������툈툊툋툌툍툎툏툑툒툓툔툕툖툗툘툙툚툛툜툝툞툟툠툡툢툣툤툥툦툧툨툩륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많맏말맑맒맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼�".split("");
for(j = 0; j != D[184].length; ++j) if(D[184][j].charCodeAt(0) !== 0xFFFD) { e[D[184][j]] = 47104 + j; d[47104 + j] = D[184][j];}
D[185] = "�����������������������������������������������������������������툪툫툮툯툱툲툳툵툶툷툸툹툺툻툾퉀퉂퉃퉄퉅퉆퉇퉉퉊퉋퉌������퉍퉎퉏퉐퉑퉒퉓퉔퉕퉖퉗퉘퉙퉚퉛퉝퉞퉟퉠퉡퉢퉣퉥퉦퉧퉨������퉩퉪퉫퉬퉭퉮퉯퉰퉱퉲퉳퉴퉵퉶퉷퉸퉹퉺퉻퉼퉽퉾퉿튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바박밖밗반받발밝밞밟밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗�".split("");
for(j = 0; j != D[185].length; ++j) if(D[185][j].charCodeAt(0) !== 0xFFFD) { e[D[185][j]] = 47360 + j; d[47360 + j] = D[185][j];}
D[186] = "�����������������������������������������������������������������튍튎튏튒튓튔튖튗튘튙튚튛튝튞튟튡튢튣튥튦튧튨튩튪튫튭������튮튯튰튲튳튴튵튶튷튺튻튽튾틁틃틄틅틆틇틊틌틍틎틏틐틑������틒틓틕틖틗틙틚틛틝틞틟틠틡틢틣틦틧틨틩틪틫틬틭틮틯틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤�".split("");
for(j = 0; j != D[186].length; ++j) if(D[186][j].charCodeAt(0) !== 0xFFFD) { e[D[186][j]] = 47616 + j; d[47616 + j] = D[186][j];}
D[187] = "�����������������������������������������������������������������틻틼틽틾틿팂팄팆팇팈팉팊팋팏팑팒팓팕팗팘팙팚팛팞팢팣������팤팦팧팪팫팭팮팯팱팲팳팴팵팶팷팺팾팿퍀퍁퍂퍃퍆퍇퍈퍉������퍊퍋퍌퍍퍎퍏퍐퍑퍒퍓퍔퍕퍖퍗퍘퍙퍚퍛퍜퍝퍞퍟퍠퍡퍢퍣퍤퍥퍦퍧퍨퍩빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤�".split("");
for(j = 0; j != D[187].length; ++j) if(D[187][j].charCodeAt(0) !== 0xFFFD) { e[D[187][j]] = 47872 + j; d[47872 + j] = D[187][j];}
D[188] = "�����������������������������������������������������������������퍪퍫퍬퍭퍮퍯퍰퍱퍲퍳퍴퍵퍶퍷퍸퍹퍺퍻퍾퍿펁펂펃펅펆펇������펈펉펊펋펎펒펓펔펕펖펗펚펛펝펞펟펡펢펣펤펥펦펧펪펬펮������펯펰펱펲펳펵펶펷펹펺펻펽펾펿폀폁폂폃폆폇폊폋폌폍폎폏폑폒폓폔폕폖샥샨샬샴샵샷샹섀섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭�".split("");
for(j = 0; j != D[188].length; ++j) if(D[188][j].charCodeAt(0) !== 0xFFFD) { e[D[188][j]] = 48128 + j; d[48128 + j] = D[188][j];}
D[189] = "�����������������������������������������������������������������폗폙폚폛폜폝폞폟폠폢폤폥폦폧폨폩폪폫폮폯폱폲폳폵폶폷������폸폹폺폻폾퐀퐂퐃퐄퐅퐆퐇퐉퐊퐋퐌퐍퐎퐏퐐퐑퐒퐓퐔퐕퐖������퐗퐘퐙퐚퐛퐜퐞퐟퐠퐡퐢퐣퐤퐥퐦퐧퐨퐩퐪퐫퐬퐭퐮퐯퐰퐱퐲퐳퐴퐵퐶퐷숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰�".split("");
for(j = 0; j != D[189].length; ++j) if(D[189][j].charCodeAt(0) !== 0xFFFD) { e[D[189][j]] = 48384 + j; d[48384 + j] = D[189][j];}
D[190] = "�����������������������������������������������������������������퐸퐹퐺퐻퐼퐽퐾퐿푁푂푃푅푆푇푈푉푊푋푌푍푎푏푐푑푒푓������푔푕푖푗푘푙푚푛푝푞푟푡푢푣푥푦푧푨푩푪푫푬푮푰푱푲������푳푴푵푶푷푺푻푽푾풁풃풄풅풆풇풊풌풎풏풐풑풒풓풕풖풗풘풙풚풛풜풝쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄업없엇었엉엊엌엎�".split("");
for(j = 0; j != D[190].length; ++j) if(D[190][j].charCodeAt(0) !== 0xFFFD) { e[D[190][j]] = 48640 + j; d[48640 + j] = D[190][j];}
D[191] = "�����������������������������������������������������������������풞풟풠풡풢풣풤풥풦풧풨풪풫풬풭풮풯풰풱풲풳풴풵풶풷풸������풹풺풻풼풽풾풿퓀퓁퓂퓃퓄퓅퓆퓇퓈퓉퓊퓋퓍퓎퓏퓑퓒퓓퓕������퓖퓗퓘퓙퓚퓛퓝퓞퓠퓡퓢퓣퓤퓥퓦퓧퓩퓪퓫퓭퓮퓯퓱퓲퓳퓴퓵퓶퓷퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염엽엾엿였영옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨�".split("");
for(j = 0; j != D[191].length; ++j) if(D[191][j].charCodeAt(0) !== 0xFFFD) { e[D[191][j]] = 48896 + j; d[48896 + j] = D[191][j];}
D[192] = "�����������������������������������������������������������������퓾퓿픀픁픂픃픅픆픇픉픊픋픍픎픏픐픑픒픓픖픘픙픚픛픜픝������픞픟픠픡픢픣픤픥픦픧픨픩픪픫픬픭픮픯픰픱픲픳픴픵픶픷������픸픹픺픻픾픿핁핂핃핅핆핇핈핉핊핋핎핐핒핓핔핕핖핗핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응읒읓읔읕읖읗의읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊�".split("");
for(j = 0; j != D[192].length; ++j) if(D[192][j].charCodeAt(0) !== 0xFFFD) { e[D[192][j]] = 49152 + j; d[49152 + j] = D[192][j];}
D[193] = "�����������������������������������������������������������������핤핦핧핪핬핮핯핰핱핲핳핶핷핹핺핻핽핾핿햀햁햂햃햆햊햋������햌햍햎햏햑햒햓햔햕햖햗햘햙햚햛햜햝햞햟햠햡햢햣햤햦햧������햨햩햪햫햬햭햮햯햰햱햲햳햴햵햶햷햸햹햺햻햼햽햾햿헀헁헂헃헄헅헆헇점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓�".split("");
for(j = 0; j != D[193].length; ++j) if(D[193][j].charCodeAt(0) !== 0xFFFD) { e[D[193][j]] = 49408 + j; d[49408 + j] = D[193][j];}
D[194] = "�����������������������������������������������������������������헊헋헍헎헏헑헓헔헕헖헗헚헜헞헟헠헡헢헣헦헧헩헪헫헭헮������헯헰헱헲헳헶헸헺헻헼헽헾헿혂혃혅혆혇혉혊혋혌혍혎혏혒������혖혗혘혙혚혛혝혞혟혡혢혣혥혦혧혨혩혪혫혬혮혯혰혱혲혳혴혵혶혷혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻�".split("");
for(j = 0; j != D[194].length; ++j) if(D[194][j].charCodeAt(0) !== 0xFFFD) { e[D[194][j]] = 49664 + j; d[49664 + j] = D[194][j];}
D[195] = "�����������������������������������������������������������������혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝홞홟홠홡������홢홣홤홥홦홨홪홫홬홭홮홯홲홳홵홶홷홸홹홺홻홼홽홾홿횀������횁횂횄횆횇횈횉횊횋횎횏횑횒횓횕횖횗횘횙횚횛횜횞횠횢횣횤횥횦횧횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층�".split("");
for(j = 0; j != D[195].length; ++j) if(D[195][j].charCodeAt(0) !== 0xFFFD) { e[D[195][j]] = 49920 + j; d[49920 + j] = D[195][j];}
D[196] = "�����������������������������������������������������������������횫횭횮횯횱횲횳횴횵횶횷횸횺횼횽횾횿훀훁훂훃훆훇훉훊훋������훍훎훏훐훒훓훕훖훘훚훛훜훝훞훟훡훢훣훥훦훧훩훪훫훬훭������훮훯훱훲훳훴훶훷훸훹훺훻훾훿휁휂휃휅휆휇휈휉휊휋휌휍휎휏휐휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼�".split("");
for(j = 0; j != D[196].length; ++j) if(D[196][j].charCodeAt(0) !== 0xFFFD) { e[D[196][j]] = 50176 + j; d[50176 + j] = D[196][j];}
D[197] = "�����������������������������������������������������������������휕휖휗휚휛휝휞휟휡휢휣휤휥휦휧휪휬휮휯휰휱휲휳휶휷휹������휺휻휽휾휿흀흁흂흃흅흆흈흊흋흌흍흎흏흒흓흕흚흛흜흝흞������흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵흶흷흸흹흺흻흾흿힀힂힃힄힅힆힇힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜�".split("");
for(j = 0; j != D[197].length; ++j) if(D[197][j].charCodeAt(0) !== 0xFFFD) { e[D[197][j]] = 50432 + j; d[50432 + j] = D[197][j];}
D[198] = "�����������������������������������������������������������������힍힎힏힑힒힓힔힕힖힗힚힜힞힟힠힡힢힣������������������������������������������������������������������������������퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁�".split("");
for(j = 0; j != D[198].length; ++j) if(D[198][j].charCodeAt(0) !== 0xFFFD) { e[D[198][j]] = 50688 + j; d[50688 + j] = D[198][j];}
D[199] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠�".split("");
for(j = 0; j != D[199].length; ++j) if(D[199][j].charCodeAt(0) !== 0xFFFD) { e[D[199][j]] = 50944 + j; d[50944 + j] = D[199][j];}
D[200] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝�".split("");
for(j = 0; j != D[200].length; ++j) if(D[200][j].charCodeAt(0) !== 0xFFFD) { e[D[200][j]] = 51200 + j; d[51200 + j] = D[200][j];}
D[202] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕�".split("");
for(j = 0; j != D[202].length; ++j) if(D[202][j].charCodeAt(0) !== 0xFFFD) { e[D[202][j]] = 51712 + j; d[51712 + j] = D[202][j];}
D[203] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢�".split("");
for(j = 0; j != D[203].length; ++j) if(D[203][j].charCodeAt(0) !== 0xFFFD) { e[D[203][j]] = 51968 + j; d[51968 + j] = D[203][j];}
D[204] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械�".split("");
for(j = 0; j != D[204].length; ++j) if(D[204][j].charCodeAt(0) !== 0xFFFD) { e[D[204][j]] = 52224 + j; d[52224 + j] = D[204][j];}
D[205] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜�".split("");
for(j = 0; j != D[205].length; ++j) if(D[205][j].charCodeAt(0) !== 0xFFFD) { e[D[205][j]] = 52480 + j; d[52480 + j] = D[205][j];}
D[206] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾�".split("");
for(j = 0; j != D[206].length; ++j) if(D[206][j].charCodeAt(0) !== 0xFFFD) { e[D[206][j]] = 52736 + j; d[52736 + j] = D[206][j];}
D[207] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴�".split("");
for(j = 0; j != D[207].length; ++j) if(D[207][j].charCodeAt(0) !== 0xFFFD) { e[D[207][j]] = 52992 + j; d[52992 + j] = D[207][j];}
D[208] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣�".split("");
for(j = 0; j != D[208].length; ++j) if(D[208][j].charCodeAt(0) !== 0xFFFD) { e[D[208][j]] = 53248 + j; d[53248 + j] = D[208][j];}
D[209] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩羅蘿螺裸邏那樂洛烙珞落諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉�".split("");
for(j = 0; j != D[209].length; ++j) if(D[209][j].charCodeAt(0) !== 0xFFFD) { e[D[209][j]] = 53504 + j; d[53504 + j] = D[209][j];}
D[210] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������納臘蠟衲囊娘廊朗浪狼郎乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧老蘆虜路露駑魯鷺碌祿綠菉錄鹿論壟弄濃籠聾膿農惱牢磊腦賂雷尿壘屢樓淚漏累縷陋嫩訥杻紐勒肋凜凌稜綾能菱陵尼泥匿溺多茶�".split("");
for(j = 0; j != D[210].length; ++j) if(D[210][j].charCodeAt(0) !== 0xFFFD) { e[D[210][j]] = 53760 + j; d[53760 + j] = D[210][j];}
D[211] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃�".split("");
for(j = 0; j != D[211].length; ++j) if(D[211][j].charCodeAt(0) !== 0xFFFD) { e[D[211][j]] = 54016 + j; d[54016 + j] = D[211][j];}
D[212] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅�".split("");
for(j = 0; j != D[212].length; ++j) if(D[212][j].charCodeAt(0) !== 0xFFFD) { e[D[212][j]] = 54272 + j; d[54272 + j] = D[212][j];}
D[213] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣�".split("");
for(j = 0; j != D[213].length; ++j) if(D[213][j].charCodeAt(0) !== 0xFFFD) { e[D[213][j]] = 54528 + j; d[54528 + j] = D[213][j];}
D[214] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼�".split("");
for(j = 0; j != D[214].length; ++j) if(D[214][j].charCodeAt(0) !== 0xFFFD) { e[D[214][j]] = 54784 + j; d[54784 + j] = D[214][j];}
D[215] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬�".split("");
for(j = 0; j != D[215].length; ++j) if(D[215][j].charCodeAt(0) !== 0xFFFD) { e[D[215][j]] = 55040 + j; d[55040 + j] = D[215][j];}
D[216] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅�".split("");
for(j = 0; j != D[216].length; ++j) if(D[216][j].charCodeAt(0) !== 0xFFFD) { e[D[216][j]] = 55296 + j; d[55296 + j] = D[216][j];}
D[217] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文�".split("");
for(j = 0; j != D[217].length; ++j) if(D[217][j].charCodeAt(0) !== 0xFFFD) { e[D[217][j]] = 55552 + j; d[55552 + j] = D[217][j];}
D[218] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑�".split("");
for(j = 0; j != D[218].length; ++j) if(D[218][j].charCodeAt(0) !== 0xFFFD) { e[D[218][j]] = 55808 + j; d[55808 + j] = D[218][j];}
D[219] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖�".split("");
for(j = 0; j != D[219].length; ++j) if(D[219][j].charCodeAt(0) !== 0xFFFD) { e[D[219][j]] = 56064 + j; d[56064 + j] = D[219][j];}
D[220] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦�".split("");
for(j = 0; j != D[220].length; ++j) if(D[220][j].charCodeAt(0) !== 0xFFFD) { e[D[220][j]] = 56320 + j; d[56320 + j] = D[220][j];}
D[221] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥�".split("");
for(j = 0; j != D[221].length; ++j) if(D[221][j].charCodeAt(0) !== 0xFFFD) { e[D[221][j]] = 56576 + j; d[56576 + j] = D[221][j];}
D[222] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索�".split("");
for(j = 0; j != D[222].length; ++j) if(D[222][j].charCodeAt(0) !== 0xFFFD) { e[D[222][j]] = 56832 + j; d[56832 + j] = D[222][j];}
D[223] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署�".split("");
for(j = 0; j != D[223].length; ++j) if(D[223][j].charCodeAt(0) !== 0xFFFD) { e[D[223][j]] = 57088 + j; d[57088 + j] = D[223][j];}
D[224] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬�".split("");
for(j = 0; j != D[224].length; ++j) if(D[224][j].charCodeAt(0) !== 0xFFFD) { e[D[224][j]] = 57344 + j; d[57344 + j] = D[224][j];}
D[225] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁�".split("");
for(j = 0; j != D[225].length; ++j) if(D[225][j].charCodeAt(0) !== 0xFFFD) { e[D[225][j]] = 57600 + j; d[57600 + j] = D[225][j];}
D[226] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧�".split("");
for(j = 0; j != D[226].length; ++j) if(D[226][j].charCodeAt(0) !== 0xFFFD) { e[D[226][j]] = 57856 + j; d[57856 + j] = D[226][j];}
D[227] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁�".split("");
for(j = 0; j != D[227].length; ++j) if(D[227][j].charCodeAt(0) !== 0xFFFD) { e[D[227][j]] = 58112 + j; d[58112 + j] = D[227][j];}
D[228] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額�".split("");
for(j = 0; j != D[228].length; ++j) if(D[228][j].charCodeAt(0) !== 0xFFFD) { e[D[228][j]] = 58368 + j; d[58368 + j] = D[228][j];}
D[229] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬�".split("");
for(j = 0; j != D[229].length; ++j) if(D[229][j].charCodeAt(0) !== 0xFFFD) { e[D[229][j]] = 58624 + j; d[58624 + j] = D[229][j];}
D[230] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒�".split("");
for(j = 0; j != D[230].length; ++j) if(D[230][j].charCodeAt(0) !== 0xFFFD) { e[D[230][j]] = 58880 + j; d[58880 + j] = D[230][j];}
D[231] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳�".split("");
for(j = 0; j != D[231].length; ++j) if(D[231][j].charCodeAt(0) !== 0xFFFD) { e[D[231][j]] = 59136 + j; d[59136 + j] = D[231][j];}
D[232] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療�".split("");
for(j = 0; j != D[232].length; ++j) if(D[232][j].charCodeAt(0) !== 0xFFFD) { e[D[232][j]] = 59392 + j; d[59392 + j] = D[232][j];}
D[233] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓�".split("");
for(j = 0; j != D[233].length; ++j) if(D[233][j].charCodeAt(0) !== 0xFFFD) { e[D[233][j]] = 59648 + j; d[59648 + j] = D[233][j];}
D[234] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜�".split("");
for(j = 0; j != D[234].length; ++j) if(D[234][j].charCodeAt(0) !== 0xFFFD) { e[D[234][j]] = 59904 + j; d[59904 + j] = D[234][j];}
D[235] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼�".split("");
for(j = 0; j != D[235].length; ++j) if(D[235][j].charCodeAt(0) !== 0xFFFD) { e[D[235][j]] = 60160 + j; d[60160 + j] = D[235][j];}
D[236] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄�".split("");
for(j = 0; j != D[236].length; ++j) if(D[236][j].charCodeAt(0) !== 0xFFFD) { e[D[236][j]] = 60416 + j; d[60416 + j] = D[236][j];}
D[237] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長�".split("");
for(j = 0; j != D[237].length; ++j) if(D[237][j].charCodeAt(0) !== 0xFFFD) { e[D[237][j]] = 60672 + j; d[60672 + j] = D[237][j];}
D[238] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱�".split("");
for(j = 0; j != D[238].length; ++j) if(D[238][j].charCodeAt(0) !== 0xFFFD) { e[D[238][j]] = 60928 + j; d[60928 + j] = D[238][j];}
D[239] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖�".split("");
for(j = 0; j != D[239].length; ++j) if(D[239][j].charCodeAt(0) !== 0xFFFD) { e[D[239][j]] = 61184 + j; d[61184 + j] = D[239][j];}
D[240] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫�".split("");
for(j = 0; j != D[240].length; ++j) if(D[240][j].charCodeAt(0) !== 0xFFFD) { e[D[240][j]] = 61440 + j; d[61440 + j] = D[240][j];}
D[241] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只�".split("");
for(j = 0; j != D[241].length; ++j) if(D[241][j].charCodeAt(0) !== 0xFFFD) { e[D[241][j]] = 61696 + j; d[61696 + j] = D[241][j];}
D[242] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯�".split("");
for(j = 0; j != D[242].length; ++j) if(D[242][j].charCodeAt(0) !== 0xFFFD) { e[D[242][j]] = 61952 + j; d[61952 + j] = D[242][j];}
D[243] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策�".split("");
for(j = 0; j != D[243].length; ++j) if(D[243][j].charCodeAt(0) !== 0xFFFD) { e[D[243][j]] = 62208 + j; d[62208 + j] = D[243][j];}
D[244] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢�".split("");
for(j = 0; j != D[244].length; ++j) if(D[244][j].charCodeAt(0) !== 0xFFFD) { e[D[244][j]] = 62464 + j; d[62464 + j] = D[244][j];}
D[245] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃�".split("");
for(j = 0; j != D[245].length; ++j) if(D[245][j].charCodeAt(0) !== 0xFFFD) { e[D[245][j]] = 62720 + j; d[62720 + j] = D[245][j];}
D[246] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託�".split("");
for(j = 0; j != D[246].length; ++j) if(D[246][j].charCodeAt(0) !== 0xFFFD) { e[D[246][j]] = 62976 + j; d[62976 + j] = D[246][j];}
D[247] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑�".split("");
for(j = 0; j != D[247].length; ++j) if(D[247][j].charCodeAt(0) !== 0xFFFD) { e[D[247][j]] = 63232 + j; d[63232 + j] = D[247][j];}
D[248] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃�".split("");
for(j = 0; j != D[248].length; ++j) if(D[248][j].charCodeAt(0) !== 0xFFFD) { e[D[248][j]] = 63488 + j; d[63488 + j] = D[248][j];}
D[249] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航�".split("");
for(j = 0; j != D[249].length; ++j) if(D[249][j].charCodeAt(0) !== 0xFFFD) { e[D[249][j]] = 63744 + j; d[63744 + j] = D[249][j];}
D[250] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型�".split("");
for(j = 0; j != D[250].length; ++j) if(D[250][j].charCodeAt(0) !== 0xFFFD) { e[D[250][j]] = 64000 + j; d[64000 + j] = D[250][j];}
D[251] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵�".split("");
for(j = 0; j != D[251].length; ++j) if(D[251][j].charCodeAt(0) !== 0xFFFD) { e[D[251][j]] = 64256 + j; d[64256 + j] = D[251][j];}
D[252] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆�".split("");
for(j = 0; j != D[252].length; ++j) if(D[252][j].charCodeAt(0) !== 0xFFFD) { e[D[252][j]] = 64512 + j; d[64512 + j] = D[252][j];}
D[253] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰�".split("");
for(j = 0; j != D[253].length; ++j) if(D[253][j].charCodeAt(0) !== 0xFFFD) { e[D[253][j]] = 64768 + j; d[64768 + j] = D[253][j];}
return {"enc": e, "dec": d }; })();
cptable[950] = (function(){ var d = [], e = {}, D = [], j;
D[0] = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~��������������������������������������������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[0].length; ++j) if(D[0][j].charCodeAt(0) !== 0xFFFD) { e[D[0][j]] = 0 + j; d[0 + j] = D[0][j];}
D[161] = "����������������������������������������������������������������　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚����������������������������������﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢﹣﹤﹥﹦～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／�".split("");
for(j = 0; j != D[161].length; ++j) if(D[161][j].charCodeAt(0) !== 0xFFFD) { e[D[161][j]] = 41216 + j; d[41216 + j] = D[161][j];}
D[162] = "����������������������������������������������������������������＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁▂▃▄▅▆▇█▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭����������������������������������╮╰╯═╞╪╡◢◣◥◤╱╲╳０１２３４５６７８９ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ〡〢〣〤〥〦〧〨〩十卄卅ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖ�".split("");
for(j = 0; j != D[162].length; ++j) if(D[162][j].charCodeAt(0) !== 0xFFFD) { e[D[162][j]] = 41472 + j; d[41472 + j] = D[162][j];}
D[163] = "����������������������������������������������������������������ｗｘｙｚΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏ����������������������������������ㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ˙ˉˊˇˋ���������������������������������€������������������������������".split("");
for(j = 0; j != D[163].length; ++j) if(D[163][j].charCodeAt(0) !== 0xFFFD) { e[D[163][j]] = 41728 + j; d[41728 + j] = D[163][j];}
D[164] = "����������������������������������������������������������������一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才����������������������������������丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙�".split("");
for(j = 0; j != D[164].length; ++j) if(D[164][j].charCodeAt(0) !== 0xFFFD) { e[D[164][j]] = 41984 + j; d[41984 + j] = D[164][j];}
D[165] = "����������������������������������������������������������������世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外����������������������������������央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全�".split("");
for(j = 0; j != D[165].length; ++j) if(D[165][j].charCodeAt(0) !== 0xFFFD) { e[D[165][j]] = 42240 + j; d[42240 + j] = D[165][j];}
D[166] = "����������������������������������������������������������������共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年����������������������������������式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣�".split("");
for(j = 0; j != D[166].length; ++j) if(D[166][j].charCodeAt(0) !== 0xFFFD) { e[D[166][j]] = 42496 + j; d[42496 + j] = D[166][j];}
D[167] = "����������������������������������������������������������������作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍����������������������������������均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠�".split("");
for(j = 0; j != D[167].length; ++j) if(D[167][j].charCodeAt(0) !== 0xFFFD) { e[D[167][j]] = 42752 + j; d[42752 + j] = D[167][j];}
D[168] = "����������������������������������������������������������������杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒����������������������������������芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵�".split("");
for(j = 0; j != D[168].length; ++j) if(D[168][j].charCodeAt(0) !== 0xFFFD) { e[D[168][j]] = 43008 + j; d[43008 + j] = D[168][j];}
D[169] = "����������������������������������������������������������������咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居����������������������������������屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊�".split("");
for(j = 0; j != D[169].length; ++j) if(D[169][j].charCodeAt(0) !== 0xFFFD) { e[D[169][j]] = 43264 + j; d[43264 + j] = D[169][j];}
D[170] = "����������������������������������������������������������������昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠����������������������������������炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附�".split("");
for(j = 0; j != D[170].length; ++j) if(D[170][j].charCodeAt(0) !== 0xFFFD) { e[D[170][j]] = 43520 + j; d[43520 + j] = D[170][j];}
D[171] = "����������������������������������������������������������������陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品����������������������������������哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷�".split("");
for(j = 0; j != D[171].length; ++j) if(D[171][j].charCodeAt(0) !== 0xFFFD) { e[D[171][j]] = 43776 + j; d[43776 + j] = D[171][j];}
D[172] = "����������������������������������������������������������������拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗����������������������������������活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄�".split("");
for(j = 0; j != D[172].length; ++j) if(D[172][j].charCodeAt(0) !== 0xFFFD) { e[D[172][j]] = 44032 + j; d[44032 + j] = D[172][j];}
D[173] = "����������������������������������������������������������������耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥����������������������������������迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪�".split("");
for(j = 0; j != D[173].length; ++j) if(D[173][j].charCodeAt(0) !== 0xFFFD) { e[D[173][j]] = 44288 + j; d[44288 + j] = D[173][j];}
D[174] = "����������������������������������������������������������������哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙����������������������������������恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓�".split("");
for(j = 0; j != D[174].length; ++j) if(D[174][j].charCodeAt(0) !== 0xFFFD) { e[D[174][j]] = 44544 + j; d[44544 + j] = D[174][j];}
D[175] = "����������������������������������������������������������������浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷����������������������������������砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃�".split("");
for(j = 0; j != D[175].length; ++j) if(D[175][j].charCodeAt(0) !== 0xFFFD) { e[D[175][j]] = 44800 + j; d[44800 + j] = D[175][j];}
D[176] = "����������������������������������������������������������������虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡����������������������������������陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀�".split("");
for(j = 0; j != D[176].length; ++j) if(D[176][j].charCodeAt(0) !== 0xFFFD) { e[D[176][j]] = 45056 + j; d[45056 + j] = D[176][j];}
D[177] = "����������������������������������������������������������������娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽����������������������������������情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺�".split("");
for(j = 0; j != D[177].length; ++j) if(D[177][j].charCodeAt(0) !== 0xFFFD) { e[D[177][j]] = 45312 + j; d[45312 + j] = D[177][j];}
D[178] = "����������������������������������������������������������������毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶����������������������������������瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼�".split("");
for(j = 0; j != D[178].length; ++j) if(D[178][j].charCodeAt(0) !== 0xFFFD) { e[D[178][j]] = 45568 + j; d[45568 + j] = D[178][j];}
D[179] = "����������������������������������������������������������������莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途����������������������������������部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠�".split("");
for(j = 0; j != D[179].length; ++j) if(D[179][j].charCodeAt(0) !== 0xFFFD) { e[D[179][j]] = 45824 + j; d[45824 + j] = D[179][j];}
D[180] = "����������������������������������������������������������������婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍����������������������������������插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋�".split("");
for(j = 0; j != D[180].length; ++j) if(D[180][j].charCodeAt(0) !== 0xFFFD) { e[D[180][j]] = 46080 + j; d[46080 + j] = D[180][j];}
D[181] = "����������������������������������������������������������������溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘����������������������������������窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁�".split("");
for(j = 0; j != D[181].length; ++j) if(D[181][j].charCodeAt(0) !== 0xFFFD) { e[D[181][j]] = 46336 + j; d[46336 + j] = D[181][j];}
D[182] = "����������������������������������������������������������������詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑����������������������������������間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼�".split("");
for(j = 0; j != D[182].length; ++j) if(D[182][j].charCodeAt(0) !== 0xFFFD) { e[D[182][j]] = 46592 + j; d[46592 + j] = D[182][j];}
D[183] = "����������������������������������������������������������������媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業����������������������������������楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督�".split("");
for(j = 0; j != D[183].length; ++j) if(D[183][j].charCodeAt(0) !== 0xFFFD) { e[D[183][j]] = 46848 + j; d[46848 + j] = D[183][j];}
D[184] = "����������������������������������������������������������������睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫����������������������������������腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊�".split("");
for(j = 0; j != D[184].length; ++j) if(D[184][j].charCodeAt(0) !== 0xFFFD) { e[D[184][j]] = 47104 + j; d[47104 + j] = D[184][j];}
D[185] = "����������������������������������������������������������������辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴����������������������������������飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇�".split("");
for(j = 0; j != D[185].length; ++j) if(D[185][j].charCodeAt(0) !== 0xFFFD) { e[D[185][j]] = 47360 + j; d[47360 + j] = D[185][j];}
D[186] = "����������������������������������������������������������������愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢����������������������������������滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬�".split("");
for(j = 0; j != D[186].length; ++j) if(D[186][j].charCodeAt(0) !== 0xFFFD) { e[D[186][j]] = 47616 + j; d[47616 + j] = D[186][j];}
D[187] = "����������������������������������������������������������������罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤����������������������������������說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜�".split("");
for(j = 0; j != D[187].length; ++j) if(D[187][j].charCodeAt(0) !== 0xFFFD) { e[D[187][j]] = 47872 + j; d[47872 + j] = D[187][j];}
D[188] = "����������������������������������������������������������������劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂����������������������������������慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃�".split("");
for(j = 0; j != D[188].length; ++j) if(D[188][j].charCodeAt(0) !== 0xFFFD) { e[D[188][j]] = 48128 + j; d[48128 + j] = D[188][j];}
D[189] = "����������������������������������������������������������������瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯����������������������������������翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞�".split("");
for(j = 0; j != D[189].length; ++j) if(D[189][j].charCodeAt(0) !== 0xFFFD) { e[D[189][j]] = 48384 + j; d[48384 + j] = D[189][j];}
D[190] = "����������������������������������������������������������������輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉����������������������������������鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡�".split("");
for(j = 0; j != D[190].length; ++j) if(D[190][j].charCodeAt(0) !== 0xFFFD) { e[D[190][j]] = 48640 + j; d[48640 + j] = D[190][j];}
D[191] = "����������������������������������������������������������������濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊����������������������������������縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚�".split("");
for(j = 0; j != D[191].length; ++j) if(D[191][j].charCodeAt(0) !== 0xFFFD) { e[D[191][j]] = 48896 + j; d[48896 + j] = D[191][j];}
D[192] = "����������������������������������������������������������������錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇����������������������������������嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬�".split("");
for(j = 0; j != D[192].length; ++j) if(D[192][j].charCodeAt(0) !== 0xFFFD) { e[D[192][j]] = 49152 + j; d[49152 + j] = D[192][j];}
D[193] = "����������������������������������������������������������������瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪����������������������������������薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁�".split("");
for(j = 0; j != D[193].length; ++j) if(D[193][j].charCodeAt(0) !== 0xFFFD) { e[D[193][j]] = 49408 + j; d[49408 + j] = D[193][j];}
D[194] = "����������������������������������������������������������������駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘����������������������������������癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦�".split("");
for(j = 0; j != D[194].length; ++j) if(D[194][j].charCodeAt(0) !== 0xFFFD) { e[D[194][j]] = 49664 + j; d[49664 + j] = D[194][j];}
D[195] = "����������������������������������������������������������������鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸����������������������������������獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類�".split("");
for(j = 0; j != D[195].length; ++j) if(D[195][j].charCodeAt(0) !== 0xFFFD) { e[D[195][j]] = 49920 + j; d[49920 + j] = D[195][j];}
D[196] = "����������������������������������������������������������������願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼����������������������������������纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴�".split("");
for(j = 0; j != D[196].length; ++j) if(D[196][j].charCodeAt(0) !== 0xFFFD) { e[D[196][j]] = 50176 + j; d[50176 + j] = D[196][j];}
D[197] = "����������������������������������������������������������������護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬����������������������������������禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒�".split("");
for(j = 0; j != D[197].length; ++j) if(D[197][j].charCodeAt(0) !== 0xFFFD) { e[D[197][j]] = 50432 + j; d[50432 + j] = D[197][j];}
D[198] = "����������������������������������������������������������������讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲���������������������������������������������������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[198].length; ++j) if(D[198][j].charCodeAt(0) !== 0xFFFD) { e[D[198][j]] = 50688 + j; d[50688 + j] = D[198][j];}
D[201] = "����������������������������������������������������������������乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕����������������������������������氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋�".split("");
for(j = 0; j != D[201].length; ++j) if(D[201][j].charCodeAt(0) !== 0xFFFD) { e[D[201][j]] = 51456 + j; d[51456 + j] = D[201][j];}
D[202] = "����������������������������������������������������������������汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘����������������������������������吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇�".split("");
for(j = 0; j != D[202].length; ++j) if(D[202][j].charCodeAt(0) !== 0xFFFD) { e[D[202][j]] = 51712 + j; d[51712 + j] = D[202][j];}
D[203] = "����������������������������������������������������������������杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓����������������������������������芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢�".split("");
for(j = 0; j != D[203].length; ++j) if(D[203][j].charCodeAt(0) !== 0xFFFD) { e[D[203][j]] = 51968 + j; d[51968 + j] = D[203][j];}
D[204] = "����������������������������������������������������������������坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋����������������������������������怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲�".split("");
for(j = 0; j != D[204].length; ++j) if(D[204][j].charCodeAt(0) !== 0xFFFD) { e[D[204][j]] = 52224 + j; d[52224 + j] = D[204][j];}
D[205] = "����������������������������������������������������������������泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺����������������������������������矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏�".split("");
for(j = 0; j != D[205].length; ++j) if(D[205][j].charCodeAt(0) !== 0xFFFD) { e[D[205][j]] = 52480 + j; d[52480 + j] = D[205][j];}
D[206] = "����������������������������������������������������������������哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛����������������������������������峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺�".split("");
for(j = 0; j != D[206].length; ++j) if(D[206][j].charCodeAt(0) !== 0xFFFD) { e[D[206][j]] = 52736 + j; d[52736 + j] = D[206][j];}
D[207] = "����������������������������������������������������������������柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂����������������������������������洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀�".split("");
for(j = 0; j != D[207].length; ++j) if(D[207][j].charCodeAt(0) !== 0xFFFD) { e[D[207][j]] = 52992 + j; d[52992 + j] = D[207][j];}
D[208] = "����������������������������������������������������������������穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪����������������������������������苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱�".split("");
for(j = 0; j != D[208].length; ++j) if(D[208][j].charCodeAt(0) !== 0xFFFD) { e[D[208][j]] = 53248 + j; d[53248 + j] = D[208][j];}
D[209] = "����������������������������������������������������������������唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧����������������������������������恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤�".split("");
for(j = 0; j != D[209].length; ++j) if(D[209][j].charCodeAt(0) !== 0xFFFD) { e[D[209][j]] = 53504 + j; d[53504 + j] = D[209][j];}
D[210] = "����������������������������������������������������������������毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸����������������������������������牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐�".split("");
for(j = 0; j != D[210].length; ++j) if(D[210][j].charCodeAt(0) !== 0xFFFD) { e[D[210][j]] = 53760 + j; d[53760 + j] = D[210][j];}
D[211] = "����������������������������������������������������������������笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢����������������������������������荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐�".split("");
for(j = 0; j != D[211].length; ++j) if(D[211][j].charCodeAt(0) !== 0xFFFD) { e[D[211][j]] = 54016 + j; d[54016 + j] = D[211][j];}
D[212] = "����������������������������������������������������������������酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅����������������������������������唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏�".split("");
for(j = 0; j != D[212].length; ++j) if(D[212][j].charCodeAt(0) !== 0xFFFD) { e[D[212][j]] = 54272 + j; d[54272 + j] = D[212][j];}
D[213] = "����������������������������������������������������������������崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟����������������������������������捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉�".split("");
for(j = 0; j != D[213].length; ++j) if(D[213][j].charCodeAt(0) !== 0xFFFD) { e[D[213][j]] = 54528 + j; d[54528 + j] = D[213][j];}
D[214] = "����������������������������������������������������������������淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏����������������������������������痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟�".split("");
for(j = 0; j != D[214].length; ++j) if(D[214][j].charCodeAt(0) !== 0xFFFD) { e[D[214][j]] = 54784 + j; d[54784 + j] = D[214][j];}
D[215] = "����������������������������������������������������������������耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷����������������������������������蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪�".split("");
for(j = 0; j != D[215].length; ++j) if(D[215][j].charCodeAt(0) !== 0xFFFD) { e[D[215][j]] = 55040 + j; d[55040 + j] = D[215][j];}
D[216] = "����������������������������������������������������������������釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷����������������������������������堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔�".split("");
for(j = 0; j != D[216].length; ++j) if(D[216][j].charCodeAt(0) !== 0xFFFD) { e[D[216][j]] = 55296 + j; d[55296 + j] = D[216][j];}
D[217] = "����������������������������������������������������������������惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒����������������������������������晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞�".split("");
for(j = 0; j != D[217].length; ++j) if(D[217][j].charCodeAt(0) !== 0xFFFD) { e[D[217][j]] = 55552 + j; d[55552 + j] = D[217][j];}
D[218] = "����������������������������������������������������������������湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖����������������������������������琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥�".split("");
for(j = 0; j != D[218].length; ++j) if(D[218][j].charCodeAt(0) !== 0xFFFD) { e[D[218][j]] = 55808 + j; d[55808 + j] = D[218][j];}
D[219] = "����������������������������������������������������������������罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳����������������������������������菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺�".split("");
for(j = 0; j != D[219].length; ++j) if(D[219][j].charCodeAt(0) !== 0xFFFD) { e[D[219][j]] = 56064 + j; d[56064 + j] = D[219][j];}
D[220] = "����������������������������������������������������������������軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈����������������������������������隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆�".split("");
for(j = 0; j != D[220].length; ++j) if(D[220][j].charCodeAt(0) !== 0xFFFD) { e[D[220][j]] = 56320 + j; d[56320 + j] = D[220][j];}
D[221] = "����������������������������������������������������������������媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤����������������������������������搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼�".split("");
for(j = 0; j != D[221].length; ++j) if(D[221][j].charCodeAt(0) !== 0xFFFD) { e[D[221][j]] = 56576 + j; d[56576 + j] = D[221][j];}
D[222] = "����������������������������������������������������������������毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓����������������������������������煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓�".split("");
for(j = 0; j != D[222].length; ++j) if(D[222][j].charCodeAt(0) !== 0xFFFD) { e[D[222][j]] = 56832 + j; d[56832 + j] = D[222][j];}
D[223] = "����������������������������������������������������������������稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯����������������������������������腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤�".split("");
for(j = 0; j != D[223].length; ++j) if(D[223][j].charCodeAt(0) !== 0xFFFD) { e[D[223][j]] = 57088 + j; d[57088 + j] = D[223][j];}
D[224] = "����������������������������������������������������������������觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿����������������������������������遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠�".split("");
for(j = 0; j != D[224].length; ++j) if(D[224][j].charCodeAt(0) !== 0xFFFD) { e[D[224][j]] = 57344 + j; d[57344 + j] = D[224][j];}
D[225] = "����������������������������������������������������������������凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠����������������������������������寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉�".split("");
for(j = 0; j != D[225].length; ++j) if(D[225][j].charCodeAt(0) !== 0xFFFD) { e[D[225][j]] = 57600 + j; d[57600 + j] = D[225][j];}
D[226] = "����������������������������������������������������������������榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊����������������������������������漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓�".split("");
for(j = 0; j != D[226].length; ++j) if(D[226][j].charCodeAt(0) !== 0xFFFD) { e[D[226][j]] = 57856 + j; d[57856 + j] = D[226][j];}
D[227] = "����������������������������������������������������������������禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞����������������������������������耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻�".split("");
for(j = 0; j != D[227].length; ++j) if(D[227][j].charCodeAt(0) !== 0xFFFD) { e[D[227][j]] = 58112 + j; d[58112 + j] = D[227][j];}
D[228] = "����������������������������������������������������������������裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍����������������������������������銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘�".split("");
for(j = 0; j != D[228].length; ++j) if(D[228][j].charCodeAt(0) !== 0xFFFD) { e[D[228][j]] = 58368 + j; d[58368 + j] = D[228][j];}
D[229] = "����������������������������������������������������������������噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉����������������������������������憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒�".split("");
for(j = 0; j != D[229].length; ++j) if(D[229][j].charCodeAt(0) !== 0xFFFD) { e[D[229][j]] = 58624 + j; d[58624 + j] = D[229][j];}
D[230] = "����������������������������������������������������������������澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙����������������������������������獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟�".split("");
for(j = 0; j != D[230].length; ++j) if(D[230][j].charCodeAt(0) !== 0xFFFD) { e[D[230][j]] = 58880 + j; d[58880 + j] = D[230][j];}
D[231] = "����������������������������������������������������������������膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢����������������������������������蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧�".split("");
for(j = 0; j != D[231].length; ++j) if(D[231][j].charCodeAt(0) !== 0xFFFD) { e[D[231][j]] = 59136 + j; d[59136 + j] = D[231][j];}
D[232] = "����������������������������������������������������������������踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓����������������������������������銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮�".split("");
for(j = 0; j != D[232].length; ++j) if(D[232][j].charCodeAt(0) !== 0xFFFD) { e[D[232][j]] = 59392 + j; d[59392 + j] = D[232][j];}
D[233] = "����������������������������������������������������������������噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺����������������������������������憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸�".split("");
for(j = 0; j != D[233].length; ++j) if(D[233][j].charCodeAt(0) !== 0xFFFD) { e[D[233][j]] = 59648 + j; d[59648 + j] = D[233][j];}
D[234] = "����������������������������������������������������������������澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙����������������������������������瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘�".split("");
for(j = 0; j != D[234].length; ++j) if(D[234][j].charCodeAt(0) !== 0xFFFD) { e[D[234][j]] = 59904 + j; d[59904 + j] = D[234][j];}
D[235] = "����������������������������������������������������������������蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠����������������������������������諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌�".split("");
for(j = 0; j != D[235].length; ++j) if(D[235][j].charCodeAt(0) !== 0xFFFD) { e[D[235][j]] = 60160 + j; d[60160 + j] = D[235][j];}
D[236] = "����������������������������������������������������������������錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕����������������������������������魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎�".split("");
for(j = 0; j != D[236].length; ++j) if(D[236][j].charCodeAt(0) !== 0xFFFD) { e[D[236][j]] = 60416 + j; d[60416 + j] = D[236][j];}
D[237] = "����������������������������������������������������������������檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶����������������������������������瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞�".split("");
for(j = 0; j != D[237].length; ++j) if(D[237][j].charCodeAt(0) !== 0xFFFD) { e[D[237][j]] = 60672 + j; d[60672 + j] = D[237][j];}
D[238] = "����������������������������������������������������������������蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞����������������������������������謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜�".split("");
for(j = 0; j != D[238].length; ++j) if(D[238][j].charCodeAt(0) !== 0xFFFD) { e[D[238][j]] = 60928 + j; d[60928 + j] = D[238][j];}
D[239] = "����������������������������������������������������������������鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰����������������������������������鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶�".split("");
for(j = 0; j != D[239].length; ++j) if(D[239][j].charCodeAt(0) !== 0xFFFD) { e[D[239][j]] = 61184 + j; d[61184 + j] = D[239][j];}
D[240] = "����������������������������������������������������������������璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒����������������������������������臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧�".split("");
for(j = 0; j != D[240].length; ++j) if(D[240][j].charCodeAt(0) !== 0xFFFD) { e[D[240][j]] = 61440 + j; d[61440 + j] = D[240][j];}
D[241] = "����������������������������������������������������������������蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪����������������������������������鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰�".split("");
for(j = 0; j != D[241].length; ++j) if(D[241][j].charCodeAt(0) !== 0xFFFD) { e[D[241][j]] = 61696 + j; d[61696 + j] = D[241][j];}
D[242] = "����������������������������������������������������������������徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛����������������������������������礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕�".split("");
for(j = 0; j != D[242].length; ++j) if(D[242][j].charCodeAt(0) !== 0xFFFD) { e[D[242][j]] = 61952 + j; d[61952 + j] = D[242][j];}
D[243] = "����������������������������������������������������������������譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦����������������������������������鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲�".split("");
for(j = 0; j != D[243].length; ++j) if(D[243][j].charCodeAt(0) !== 0xFFFD) { e[D[243][j]] = 62208 + j; d[62208 + j] = D[243][j];}
D[244] = "����������������������������������������������������������������嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩����������������������������������禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿�".split("");
for(j = 0; j != D[244].length; ++j) if(D[244][j].charCodeAt(0) !== 0xFFFD) { e[D[244][j]] = 62464 + j; d[62464 + j] = D[244][j];}
D[245] = "����������������������������������������������������������������鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛����������������������������������鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥�".split("");
for(j = 0; j != D[245].length; ++j) if(D[245][j].charCodeAt(0) !== 0xFFFD) { e[D[245][j]] = 62720 + j; d[62720 + j] = D[245][j];}
D[246] = "����������������������������������������������������������������蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺����������������������������������騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚�".split("");
for(j = 0; j != D[246].length; ++j) if(D[246][j].charCodeAt(0) !== 0xFFFD) { e[D[246][j]] = 62976 + j; d[62976 + j] = D[246][j];}
D[247] = "����������������������������������������������������������������糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊����������������������������������驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾�".split("");
for(j = 0; j != D[247].length; ++j) if(D[247][j].charCodeAt(0) !== 0xFFFD) { e[D[247][j]] = 63232 + j; d[63232 + j] = D[247][j];}
D[248] = "����������������������������������������������������������������讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏����������������������������������齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚�".split("");
for(j = 0; j != D[248].length; ++j) if(D[248][j].charCodeAt(0) !== 0xFFFD) { e[D[248][j]] = 63488 + j; d[63488 + j] = D[248][j];}
D[249] = "����������������������������������������������������������������纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊����������������������������������龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓�".split("");
for(j = 0; j != D[249].length; ++j) if(D[249][j].charCodeAt(0) !== 0xFFFD) { e[D[249][j]] = 63744 + j; d[63744 + j] = D[249][j];}
return {"enc": e, "dec": d }; })();
cptable[1250] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[1251] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[1252] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[1253] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[1254] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[1255] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹ�ֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[1256] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[1257] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[1258] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[10000] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[10006] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[10007] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[10008] = (function(){ var d = [], e = {}, D = [], j;
D[0] = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~���������������������������������������������������������������������������������������".split("");
for(j = 0; j != D[0].length; ++j) if(D[0][j].charCodeAt(0) !== 0xFFFD) { e[D[0][j]] = 0 + j; d[0 + j] = D[0][j];}
D[161] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������　、。・ˉˇ¨〃々―～�…‘’“”〔〕〈〉《》「」『』〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓�".split("");
for(j = 0; j != D[161].length; ++j) if(D[161][j].charCodeAt(0) !== 0xFFFD) { e[D[161][j]] = 41216 + j; d[41216 + j] = D[161][j];}
D[162] = "���������������������������������������������������������������������������������������������������������������������������������������������������������������������������������⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇①②③④⑤⑥⑦⑧⑨⑩��㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩��ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ���".split("");
for(j = 0; j != D[162].length; ++j) if(D[162][j].charCodeAt(0) !== 0xFFFD) { e[D[162][j]] = 41472 + j; d[41472 + j] = D[162][j];}
D[163] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������！＂＃￥％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝￣�".split("");
for(j = 0; j != D[163].length; ++j) if(D[163][j].charCodeAt(0) !== 0xFFFD) { e[D[163][j]] = 41728 + j; d[41728 + j] = D[163][j];}
D[164] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん������������".split("");
for(j = 0; j != D[164].length; ++j) if(D[164][j].charCodeAt(0) !== 0xFFFD) { e[D[164][j]] = 41984 + j; d[41984 + j] = D[164][j];}
D[165] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ���������".split("");
for(j = 0; j != D[165].length; ++j) if(D[165][j].charCodeAt(0) !== 0xFFFD) { e[D[165][j]] = 42240 + j; d[42240 + j] = D[165][j];}
D[166] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ��������αβγδεζηθικλμνξοπρστυφχψω���������������������������������������".split("");
for(j = 0; j != D[166].length; ++j) if(D[166][j].charCodeAt(0) !== 0xFFFD) { e[D[166][j]] = 42496 + j; d[42496 + j] = D[166][j];}
D[167] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ���������������абвгдеёжзийклмнопрстуфхцчшщъыьэюя��������������".split("");
for(j = 0; j != D[167].length; ++j) if(D[167][j].charCodeAt(0) !== 0xFFFD) { e[D[167][j]] = 42752 + j; d[42752 + j] = D[167][j];}
D[168] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüê����������ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦㄧㄨㄩ����������������������".split("");
for(j = 0; j != D[168].length; ++j) if(D[168][j].charCodeAt(0) !== 0xFFFD) { e[D[168][j]] = 43008 + j; d[43008 + j] = D[168][j];}
D[169] = "��������������������������������������������������������������������������������������������������������������������������������������������������������������������─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋����������������".split("");
for(j = 0; j != D[169].length; ++j) if(D[169][j].charCodeAt(0) !== 0xFFFD) { e[D[169][j]] = 43264 + j; d[43264 + j] = D[169][j];}
D[176] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥�".split("");
for(j = 0; j != D[176].length; ++j) if(D[176][j].charCodeAt(0) !== 0xFFFD) { e[D[176][j]] = 45056 + j; d[45056 + j] = D[176][j];}
D[177] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳�".split("");
for(j = 0; j != D[177].length; ++j) if(D[177][j].charCodeAt(0) !== 0xFFFD) { e[D[177][j]] = 45312 + j; d[45312 + j] = D[177][j];}
D[178] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖�".split("");
for(j = 0; j != D[178].length; ++j) if(D[178][j].charCodeAt(0) !== 0xFFFD) { e[D[178][j]] = 45568 + j; d[45568 + j] = D[178][j];}
D[179] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚�".split("");
for(j = 0; j != D[179].length; ++j) if(D[179][j].charCodeAt(0) !== 0xFFFD) { e[D[179][j]] = 45824 + j; d[45824 + j] = D[179][j];}
D[180] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮�".split("");
for(j = 0; j != D[180].length; ++j) if(D[180][j].charCodeAt(0) !== 0xFFFD) { e[D[180][j]] = 46080 + j; d[46080 + j] = D[180][j];}
D[181] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠�".split("");
for(j = 0; j != D[181].length; ++j) if(D[181][j].charCodeAt(0) !== 0xFFFD) { e[D[181][j]] = 46336 + j; d[46336 + j] = D[181][j];}
D[182] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二�".split("");
for(j = 0; j != D[182].length; ++j) if(D[182][j].charCodeAt(0) !== 0xFFFD) { e[D[182][j]] = 46592 + j; d[46592 + j] = D[182][j];}
D[183] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服�".split("");
for(j = 0; j != D[183].length; ++j) if(D[183][j].charCodeAt(0) !== 0xFFFD) { e[D[183][j]] = 46848 + j; d[46848 + j] = D[183][j];}
D[184] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹�".split("");
for(j = 0; j != D[184].length; ++j) if(D[184][j].charCodeAt(0) !== 0xFFFD) { e[D[184][j]] = 47104 + j; d[47104 + j] = D[184][j];}
D[185] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈�".split("");
for(j = 0; j != D[185].length; ++j) if(D[185][j].charCodeAt(0) !== 0xFFFD) { e[D[185][j]] = 47360 + j; d[47360 + j] = D[185][j];}
D[186] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖�".split("");
for(j = 0; j != D[186].length; ++j) if(D[186][j].charCodeAt(0) !== 0xFFFD) { e[D[186][j]] = 47616 + j; d[47616 + j] = D[186][j];}
D[187] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕�".split("");
for(j = 0; j != D[187].length; ++j) if(D[187][j].charCodeAt(0) !== 0xFFFD) { e[D[187][j]] = 47872 + j; d[47872 + j] = D[187][j];}
D[188] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件�".split("");
for(j = 0; j != D[188].length; ++j) if(D[188][j].charCodeAt(0) !== 0xFFFD) { e[D[188][j]] = 48128 + j; d[48128 + j] = D[188][j];}
D[189] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸�".split("");
for(j = 0; j != D[189].length; ++j) if(D[189][j].charCodeAt(0) !== 0xFFFD) { e[D[189][j]] = 48384 + j; d[48384 + j] = D[189][j];}
D[190] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻�".split("");
for(j = 0; j != D[190].length; ++j) if(D[190][j].charCodeAt(0) !== 0xFFFD) { e[D[190][j]] = 48640 + j; d[48640 + j] = D[190][j];}
D[191] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀�".split("");
for(j = 0; j != D[191].length; ++j) if(D[191][j].charCodeAt(0) !== 0xFFFD) { e[D[191][j]] = 48896 + j; d[48896 + j] = D[191][j];}
D[192] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐�".split("");
for(j = 0; j != D[192].length; ++j) if(D[192][j].charCodeAt(0) !== 0xFFFD) { e[D[192][j]] = 49152 + j; d[49152 + j] = D[192][j];}
D[193] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿�".split("");
for(j = 0; j != D[193].length; ++j) if(D[193][j].charCodeAt(0) !== 0xFFFD) { e[D[193][j]] = 49408 + j; d[49408 + j] = D[193][j];}
D[194] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫�".split("");
for(j = 0; j != D[194].length; ++j) if(D[194][j].charCodeAt(0) !== 0xFFFD) { e[D[194][j]] = 49664 + j; d[49664 + j] = D[194][j];}
D[195] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸�".split("");
for(j = 0; j != D[195].length; ++j) if(D[195][j].charCodeAt(0) !== 0xFFFD) { e[D[195][j]] = 49920 + j; d[49920 + j] = D[195][j];}
D[196] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁�".split("");
for(j = 0; j != D[196].length; ++j) if(D[196][j].charCodeAt(0) !== 0xFFFD) { e[D[196][j]] = 50176 + j; d[50176 + j] = D[196][j];}
D[197] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗�".split("");
for(j = 0; j != D[197].length; ++j) if(D[197][j].charCodeAt(0) !== 0xFFFD) { e[D[197][j]] = 50432 + j; d[50432 + j] = D[197][j];}
D[198] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐�".split("");
for(j = 0; j != D[198].length; ++j) if(D[198][j].charCodeAt(0) !== 0xFFFD) { e[D[198][j]] = 50688 + j; d[50688 + j] = D[198][j];}
D[199] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠�".split("");
for(j = 0; j != D[199].length; ++j) if(D[199][j].charCodeAt(0) !== 0xFFFD) { e[D[199][j]] = 50944 + j; d[50944 + j] = D[199][j];}
D[200] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁�".split("");
for(j = 0; j != D[200].length; ++j) if(D[200][j].charCodeAt(0) !== 0xFFFD) { e[D[200][j]] = 51200 + j; d[51200 + j] = D[200][j];}
D[201] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳�".split("");
for(j = 0; j != D[201].length; ++j) if(D[201][j].charCodeAt(0) !== 0xFFFD) { e[D[201][j]] = 51456 + j; d[51456 + j] = D[201][j];}
D[202] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱�".split("");
for(j = 0; j != D[202].length; ++j) if(D[202][j].charCodeAt(0) !== 0xFFFD) { e[D[202][j]] = 51712 + j; d[51712 + j] = D[202][j];}
D[203] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔�".split("");
for(j = 0; j != D[203].length; ++j) if(D[203][j].charCodeAt(0) !== 0xFFFD) { e[D[203][j]] = 51968 + j; d[51968 + j] = D[203][j];}
D[204] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃�".split("");
for(j = 0; j != D[204].length; ++j) if(D[204][j].charCodeAt(0) !== 0xFFFD) { e[D[204][j]] = 52224 + j; d[52224 + j] = D[204][j];}
D[205] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威�".split("");
for(j = 0; j != D[205].length; ++j) if(D[205][j].charCodeAt(0) !== 0xFFFD) { e[D[205][j]] = 52480 + j; d[52480 + j] = D[205][j];}
D[206] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺�".split("");
for(j = 0; j != D[206].length; ++j) if(D[206][j].charCodeAt(0) !== 0xFFFD) { e[D[206][j]] = 52736 + j; d[52736 + j] = D[206][j];}
D[207] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓�".split("");
for(j = 0; j != D[207].length; ++j) if(D[207][j].charCodeAt(0) !== 0xFFFD) { e[D[207][j]] = 52992 + j; d[52992 + j] = D[207][j];}
D[208] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄�".split("");
for(j = 0; j != D[208].length; ++j) if(D[208][j].charCodeAt(0) !== 0xFFFD) { e[D[208][j]] = 53248 + j; d[53248 + j] = D[208][j];}
D[209] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶�".split("");
for(j = 0; j != D[209].length; ++j) if(D[209][j].charCodeAt(0) !== 0xFFFD) { e[D[209][j]] = 53504 + j; d[53504 + j] = D[209][j];}
D[210] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐�".split("");
for(j = 0; j != D[210].length; ++j) if(D[210][j].charCodeAt(0) !== 0xFFFD) { e[D[210][j]] = 53760 + j; d[53760 + j] = D[210][j];}
D[211] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉�".split("");
for(j = 0; j != D[211].length; ++j) if(D[211][j].charCodeAt(0) !== 0xFFFD) { e[D[211][j]] = 54016 + j; d[54016 + j] = D[211][j];}
D[212] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧�".split("");
for(j = 0; j != D[212].length; ++j) if(D[212][j].charCodeAt(0) !== 0xFFFD) { e[D[212][j]] = 54272 + j; d[54272 + j] = D[212][j];}
D[213] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政�".split("");
for(j = 0; j != D[213].length; ++j) if(D[213][j].charCodeAt(0) !== 0xFFFD) { e[D[213][j]] = 54528 + j; d[54528 + j] = D[213][j];}
D[214] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑�".split("");
for(j = 0; j != D[214].length; ++j) if(D[214][j].charCodeAt(0) !== 0xFFFD) { e[D[214][j]] = 54784 + j; d[54784 + j] = D[214][j];}
D[215] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座������".split("");
for(j = 0; j != D[215].length; ++j) if(D[215][j].charCodeAt(0) !== 0xFFFD) { e[D[215][j]] = 55040 + j; d[55040 + j] = D[215][j];}
D[216] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝�".split("");
for(j = 0; j != D[216].length; ++j) if(D[216][j].charCodeAt(0) !== 0xFFFD) { e[D[216][j]] = 55296 + j; d[55296 + j] = D[216][j];}
D[217] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼�".split("");
for(j = 0; j != D[217].length; ++j) if(D[217][j].charCodeAt(0) !== 0xFFFD) { e[D[217][j]] = 55552 + j; d[55552 + j] = D[217][j];}
D[218] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺�".split("");
for(j = 0; j != D[218].length; ++j) if(D[218][j].charCodeAt(0) !== 0xFFFD) { e[D[218][j]] = 55808 + j; d[55808 + j] = D[218][j];}
D[219] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝�".split("");
for(j = 0; j != D[219].length; ++j) if(D[219][j].charCodeAt(0) !== 0xFFFD) { e[D[219][j]] = 56064 + j; d[56064 + j] = D[219][j];}
D[220] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥�".split("");
for(j = 0; j != D[220].length; ++j) if(D[220][j].charCodeAt(0) !== 0xFFFD) { e[D[220][j]] = 56320 + j; d[56320 + j] = D[220][j];}
D[221] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺�".split("");
for(j = 0; j != D[221].length; ++j) if(D[221][j].charCodeAt(0) !== 0xFFFD) { e[D[221][j]] = 56576 + j; d[56576 + j] = D[221][j];}
D[222] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖�".split("");
for(j = 0; j != D[222].length; ++j) if(D[222][j].charCodeAt(0) !== 0xFFFD) { e[D[222][j]] = 56832 + j; d[56832 + j] = D[222][j];}
D[223] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼�".split("");
for(j = 0; j != D[223].length; ++j) if(D[223][j].charCodeAt(0) !== 0xFFFD) { e[D[223][j]] = 57088 + j; d[57088 + j] = D[223][j];}
D[224] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼�".split("");
for(j = 0; j != D[224].length; ++j) if(D[224][j].charCodeAt(0) !== 0xFFFD) { e[D[224][j]] = 57344 + j; d[57344 + j] = D[224][j];}
D[225] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺�".split("");
for(j = 0; j != D[225].length; ++j) if(D[225][j].charCodeAt(0) !== 0xFFFD) { e[D[225][j]] = 57600 + j; d[57600 + j] = D[225][j];}
D[226] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧饨饩饪饫饬饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂�".split("");
for(j = 0; j != D[226].length; ++j) if(D[226][j].charCodeAt(0) !== 0xFFFD) { e[D[226][j]] = 57856 + j; d[57856 + j] = D[226][j];}
D[227] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾�".split("");
for(j = 0; j != D[227].length; ++j) if(D[227][j].charCodeAt(0) !== 0xFFFD) { e[D[227][j]] = 58112 + j; d[58112 + j] = D[227][j];}
D[228] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑�".split("");
for(j = 0; j != D[228].length; ++j) if(D[228][j].charCodeAt(0) !== 0xFFFD) { e[D[228][j]] = 58368 + j; d[58368 + j] = D[228][j];}
D[229] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣�".split("");
for(j = 0; j != D[229].length; ++j) if(D[229][j].charCodeAt(0) !== 0xFFFD) { e[D[229][j]] = 58624 + j; d[58624 + j] = D[229][j];}
D[230] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩�".split("");
for(j = 0; j != D[230].length; ++j) if(D[230][j].charCodeAt(0) !== 0xFFFD) { e[D[230][j]] = 58880 + j; d[58880 + j] = D[230][j];}
D[231] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡缢缣缤缥缦缧缪缫缬缭缯缰缱缲缳缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬�".split("");
for(j = 0; j != D[231].length; ++j) if(D[231][j].charCodeAt(0) !== 0xFFFD) { e[D[231][j]] = 59136 + j; d[59136 + j] = D[231][j];}
D[232] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹�".split("");
for(j = 0; j != D[232].length; ++j) if(D[232][j].charCodeAt(0) !== 0xFFFD) { e[D[232][j]] = 59392 + j; d[59392 + j] = D[232][j];}
D[233] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋�".split("");
for(j = 0; j != D[233].length; ++j) if(D[233][j].charCodeAt(0) !== 0xFFFD) { e[D[233][j]] = 59648 + j; d[59648 + j] = D[233][j];}
D[234] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰�".split("");
for(j = 0; j != D[234].length; ++j) if(D[234][j].charCodeAt(0) !== 0xFFFD) { e[D[234][j]] = 59904 + j; d[59904 + j] = D[234][j];}
D[235] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻�".split("");
for(j = 0; j != D[235].length; ++j) if(D[235][j].charCodeAt(0) !== 0xFFFD) { e[D[235][j]] = 60160 + j; d[60160 + j] = D[235][j];}
D[236] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐�".split("");
for(j = 0; j != D[236].length; ++j) if(D[236][j].charCodeAt(0) !== 0xFFFD) { e[D[236][j]] = 60416 + j; d[60416 + j] = D[236][j];}
D[237] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨�".split("");
for(j = 0; j != D[237].length; ++j) if(D[237][j].charCodeAt(0) !== 0xFFFD) { e[D[237][j]] = 60672 + j; d[60672 + j] = D[237][j];}
D[238] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶钷钸钹钺钼钽钿铄铈铉铊铋铌铍铎铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪�".split("");
for(j = 0; j != D[238].length; ++j) if(D[238][j].charCodeAt(0) !== 0xFFFD) { e[D[238][j]] = 60928 + j; d[60928 + j] = D[238][j];}
D[239] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒锓锔锕锖锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤镥镦镧镨镩镪镫镬镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔�".split("");
for(j = 0; j != D[239].length; ++j) if(D[239][j].charCodeAt(0) !== 0xFFFD) { e[D[239][j]] = 61184 + j; d[61184 + j] = D[239][j];}
D[240] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨鸩鸪鸫鸬鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦鹧鹨鹩鹪鹫鹬鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙�".split("");
for(j = 0; j != D[240].length; ++j) if(D[240][j].charCodeAt(0) !== 0xFFFD) { e[D[240][j]] = 61440 + j; d[61440 + j] = D[240][j];}
D[241] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃�".split("");
for(j = 0; j != D[241].length; ++j) if(D[241][j].charCodeAt(0) !== 0xFFFD) { e[D[241][j]] = 61696 + j; d[61696 + j] = D[241][j];}
D[242] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒�".split("");
for(j = 0; j != D[242].length; ++j) if(D[242][j].charCodeAt(0) !== 0xFFFD) { e[D[242][j]] = 61952 + j; d[61952 + j] = D[242][j];}
D[243] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋�".split("");
for(j = 0; j != D[243].length; ++j) if(D[243][j].charCodeAt(0) !== 0xFFFD) { e[D[243][j]] = 62208 + j; d[62208 + j] = D[243][j];}
D[244] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤�".split("");
for(j = 0; j != D[244].length; ++j) if(D[244][j].charCodeAt(0) !== 0xFFFD) { e[D[244][j]] = 62464 + j; d[62464 + j] = D[244][j];}
D[245] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜�".split("");
for(j = 0; j != D[245].length; ++j) if(D[245][j].charCodeAt(0) !== 0xFFFD) { e[D[245][j]] = 62720 + j; d[62720 + j] = D[245][j];}
D[246] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅龆龇龈龉龊龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞鲟鲠鲡鲢鲣鲥鲦鲧鲨鲩鲫鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋�".split("");
for(j = 0; j != D[246].length; ++j) if(D[246][j].charCodeAt(0) !== 0xFFFD) { e[D[246][j]] = 62976 + j; d[62976 + j] = D[246][j];}
D[247] = "�����������������������������������������������������������������������������������������������������������������������������������������������������������������鳌鳍鳎鳏鳐鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄�".split("");
for(j = 0; j != D[247].length; ++j) if(D[247][j].charCodeAt(0) !== 0xFFFD) { e[D[247][j]] = 63232 + j; d[63232 + j] = D[247][j];}
return {"enc": e, "dec": d }; })();
cptable[10029] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[10079] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
cptable[10081] = (function(){ var d = "\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ", D = [], e = {}; for(var i=0;i!=d.length;++i) { if(d.charCodeAt(i) !== 0xFFFD) e[d.charAt(i)] = i; D[i] = d.charAt(i); } return {"enc": e, "dec": D }; })();
// eslint-disable-next-line no-undef
if ( true && module.exports && typeof DO_NOT_EXPORT_CODEPAGE === 'undefined') module.exports = cptable;
/* cputils.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ft=javascript: */
/*jshint newcap: false */
(function(root, factory) {
  /*jshint ignore:start */
  /*eslint-disable */
  "use strict";
  if(typeof cptable === "undefined") {
    if(true){
      var cpt = cptable;
      if ( true && module.exports && typeof DO_NOT_EXPORT_CODEPAGE === 'undefined') module.exports = factory(cpt);
      else root.cptable = factory(cpt);
    } else {}
  } else cptable = factory(cptable);
  /*eslint-enable */
  /*jshint ignore:end */
}(this, function(cpt){
  "use strict";
  /*global module, Buffer */
  var magic = {
    "1200":"utf16le",
    "1201":"utf16be",
    "12000":"utf32le",
    "12001":"utf32be",
    "16969":"utf64le",
    "20127":"ascii",
    "65000":"utf7",
    "65001":"utf8"
  };

  var sbcs_cache = [874,1250,1251,1252,1253,1254,1255,1256,10000];
  var dbcs_cache = [932,936,949,950];
  var magic_cache = [65001];
  var magic_decode = {};
  var magic_encode = {};
  var cpdcache = {};
  var cpecache = {};

  var sfcc = function sfcc(x) { return String.fromCharCode(x); };
  var cca = function cca(x) { return x.charCodeAt(0); };

  var has_buf = (typeof Buffer !== 'undefined');
  var Buffer_from = function(){};
  if(has_buf) {
    var nbfs = !Buffer.from;
    if(!nbfs) try { Buffer.from("foo", "utf8"); } catch(e) { nbfs = true; }
    Buffer_from = nbfs ? function(buf, enc) { return (enc) ? new Buffer(buf, enc) : new Buffer(buf); } : Buffer.from.bind(Buffer);
    // $FlowIgnore
    if(!Buffer.allocUnsafe) Buffer.allocUnsafe = function(n) { return new Buffer(n); };

    var mdl = 1024, mdb = Buffer.allocUnsafe(mdl);
    var make_EE = function make_EE(E){
      var EE = Buffer.allocUnsafe(65536);
      for(var i = 0; i < 65536;++i) EE[i] = 0;
      var keys = Object.keys(E), len = keys.length;
      for(var ee = 0, e = keys[ee]; ee < len; ++ee) {
        if(!(e = keys[ee])) continue;
        EE[e.charCodeAt(0)] = E[e];
      }
      return EE;
    };
    var sbcs_encode = function make_sbcs_encode(cp) {
      var EE = make_EE(cpt[cp].enc);
      return function sbcs_e(data, ofmt) {
        var len = data.length;
        var out, i=0, j=0, D=0, w=0;
        if(typeof data === 'string') {
          out = Buffer.allocUnsafe(len);
          for(i = 0; i < len; ++i) out[i] = EE[data.charCodeAt(i)];
        } else if(Buffer.isBuffer(data)) {
          out = Buffer.allocUnsafe(2*len);
          j = 0;
          for(i = 0; i < len; ++i) {
            D = data[i];
            if(D < 128) out[j++] = EE[D];
            else if(D < 224) { out[j++] = EE[((D&31)<<6)+(data[i+1]&63)]; ++i; }
            else if(D < 240) { out[j++] = EE[((D&15)<<12)+((data[i+1]&63)<<6)+(data[i+2]&63)]; i+=2; }
            else {
              w = ((D&7)<<18)+((data[i+1]&63)<<12)+((data[i+2]&63)<<6)+(data[i+3]&63); i+=3;
              if(w < 65536) out[j++] = EE[w];
              else { w -= 65536; out[j++] = EE[0xD800 + ((w>>10)&1023)]; out[j++] = EE[0xDC00 + (w&1023)]; }
            }
          }
          out = out.slice(0,j);
        } else {
          out = Buffer.allocUnsafe(len);
          for(i = 0; i < len; ++i) out[i] = EE[data[i].charCodeAt(0)];
        }
        if(!ofmt || ofmt === 'buf') return out;
        if(ofmt !== 'arr') return out.toString('binary');
        return [].slice.call(out);
      };
    };
    var sbcs_decode = function make_sbcs_decode(cp) {
      var D = cpt[cp].dec;
      var DD = Buffer.allocUnsafe(131072), d=0, c="";
      for(d=0;d<D.length;++d) {
        if(!(c=D[d])) continue;
        var w = c.charCodeAt(0);
        DD[2*d] = w&255; DD[2*d+1] = w>>8;
      }
      return function sbcs_d(data) {
        var len = data.length, i=0, j=0;
        if(2 * len > mdl) { mdl = 2 * len; mdb = Buffer.allocUnsafe(mdl); }
        if(Buffer.isBuffer(data)) {
          for(i = 0; i < len; i++) {
            j = 2*data[i];
            mdb[2*i] = DD[j]; mdb[2*i+1] = DD[j+1];
          }
        } else if(typeof data === "string") {
          for(i = 0; i < len; i++) {
            j = 2*data.charCodeAt(i);
            mdb[2*i] = DD[j]; mdb[2*i+1] = DD[j+1];
          }
        } else {
          for(i = 0; i < len; i++) {
            j = 2*data[i];
            mdb[2*i] = DD[j]; mdb[2*i+1] = DD[j+1];
          }
        }
        return mdb.slice(0, 2 * len).toString('ucs2');
      };
    };
    var dbcs_encode = function make_dbcs_encode(cp) {
      var E = cpt[cp].enc;
      var EE = Buffer.allocUnsafe(131072);
      for(var i = 0; i < 131072; ++i) EE[i] = 0;
      var keys = Object.keys(E);
      for(var ee = 0, e = keys[ee]; ee < keys.length; ++ee) {
        if(!(e = keys[ee])) continue;
        var f = e.charCodeAt(0);
        EE[2*f] = E[e] & 255; EE[2*f+1] = E[e]>>8;
      }
      return function dbcs_e(data, ofmt) {
        var len = data.length, out = Buffer.allocUnsafe(2*len), i=0, j=0, jj=0, k=0, D=0;
        if(typeof data === 'string') {
          for(i = k = 0; i < len; ++i) {
            j = data.charCodeAt(i)*2;
            out[k++] = EE[j+1] || EE[j]; if(EE[j+1] > 0) out[k++] = EE[j];
          }
          out = out.slice(0,k);
        } else if(Buffer.isBuffer(data)) {
          for(i = k = 0; i < len; ++i) {
            D = data[i];
            if(D < 128) j = D;
            else if(D < 224) { j = ((D&31)<<6)+(data[i+1]&63); ++i; }
            else if(D < 240) { j = ((D&15)<<12)+((data[i+1]&63)<<6)+(data[i+2]&63); i+=2; }
            else { j = ((D&7)<<18)+((data[i+1]&63)<<12)+((data[i+2]&63)<<6)+(data[i+3]&63); i+=3; }
            if(j<65536) { j*=2; out[k++] = EE[j+1] || EE[j]; if(EE[j+1] > 0) out[k++] = EE[j]; }
            else { jj = j-65536;
              j=2*(0xD800 + ((jj>>10)&1023)); out[k++] = EE[j+1] || EE[j]; if(EE[j+1] > 0) out[k++] = EE[j];
              j=2*(0xDC00 + (jj&1023)); out[k++] = EE[j+1] || EE[j]; if(EE[j+1] > 0) out[k++] = EE[j];
            }
          }
          out = out.slice(0,k);
        } else {
          for(i = k = 0; i < len; i++) {
            j = data[i].charCodeAt(0)*2;
            out[k++] = EE[j+1] || EE[j]; if(EE[j+1] > 0) out[k++] = EE[j];
          }
        }
        if(!ofmt || ofmt === 'buf') return out;
        if(ofmt !== 'arr') return out.toString('binary');
        return [].slice.call(out);
      };
    };
    var dbcs_decode = function make_dbcs_decode(cp) {
      var D = cpt[cp].dec;
      var DD = Buffer.allocUnsafe(131072), d=0, c, w=0, j=0, i=0;
      for(i = 0; i < 65536; ++i) { DD[2*i] = 0xFF; DD[2*i+1] = 0xFD;}
      for(d = 0; d < D.length; ++d) {
        if(!(c=D[d])) continue;
        w = c.charCodeAt(0);
        j = 2*d;
        DD[j] = w&255; DD[j+1] = w>>8;
      }
      return function dbcs_d(data) {
        var len = data.length, out = Buffer.allocUnsafe(2*len), i=0, j=0, k=0;
        if(Buffer.isBuffer(data)) {
          for(i = 0; i < len; i++) {
            j = 2*data[i];
            if(DD[j]===0xFF && DD[j+1]===0xFD) { j=2*((data[i]<<8)+data[i+1]); ++i; }
            out[k++] = DD[j]; out[k++] = DD[j+1];
          }
        } else if(typeof data === "string") {
          for(i = 0; i < len; i++) {
            j = 2*data.charCodeAt(i);
            if(DD[j]===0xFF && DD[j+1]===0xFD) { j=2*((data.charCodeAt(i)<<8)+data.charCodeAt(i+1)); ++i; }
            out[k++] = DD[j]; out[k++] = DD[j+1];
          }
        } else {
          for(i = 0; i < len; i++) {
            j = 2*data[i];
            if(DD[j]===0xFF && DD[j+1]===0xFD) { j=2*((data[i]<<8)+data[i+1]); ++i; }
            out[k++] = DD[j]; out[k++] = DD[j+1];
          }
        }
        return out.slice(0,k).toString('ucs2');
      };
    };
    magic_decode[65001] = function utf8_d(data) {
      if(typeof data === "string") return utf8_d(data.split("").map(cca));
      var len = data.length, w = 0, ww = 0;
      if(4 * len > mdl) { mdl = 4 * len; mdb = Buffer.allocUnsafe(mdl); }
      var i = 0;
      if(len >= 3 && data[0] == 0xEF) if(data[1] == 0xBB && data[2] == 0xBF) i = 3;
      for(var j = 1, k = 0, D = 0; i < len; i+=j) {
        j = 1; D = data[i];
        if(D < 128) w = D;
        else if(D < 224) { w=(D&31)*64+(data[i+1]&63); j=2; }
        else if(D < 240) { w=((D&15)<<12)+(data[i+1]&63)*64+(data[i+2]&63); j=3; }
        else { w=(D&7)*262144+((data[i+1]&63)<<12)+(data[i+2]&63)*64+(data[i+3]&63); j=4; }
        if(w < 65536) { mdb[k++] = w&255; mdb[k++] = w>>8; }
        else {
          w -= 65536; ww = 0xD800 + ((w>>10)&1023); w = 0xDC00 + (w&1023);
          mdb[k++] = ww&255; mdb[k++] = ww>>>8; mdb[k++] = w&255; mdb[k++] = (w>>>8)&255;
        }
      }
      return mdb.slice(0,k).toString('ucs2');
    };
    magic_encode[65001] = function utf8_e(data, ofmt) {
      if(has_buf && Buffer.isBuffer(data)) {
        if(!ofmt || ofmt === 'buf') return data;
        if(ofmt !== 'arr') return data.toString('binary');
        return [].slice.call(data);
      }
      var len = data.length, w = 0, ww = 0, j = 0;
      var direct = typeof data === "string";
      if(4 * len > mdl) { mdl = 4 * len; mdb = Buffer.allocUnsafe(mdl); }
      for(var i = 0; i < len; ++i) {
        w = direct ? data.charCodeAt(i) : data[i].charCodeAt(0);
        if(w <= 0x007F) mdb[j++] = w;
        else if(w <= 0x07FF) {
          mdb[j++] = 192 + (w >> 6);
          mdb[j++] = 128 + (w&63);
        } else if(w >= 0xD800 && w <= 0xDFFF) {
          w -= 0xD800; ++i;
          ww = (direct ? data.charCodeAt(i) : data[i].charCodeAt(0)) - 0xDC00 + (w << 10);
          mdb[j++] = 240 + ((ww>>>18) & 0x07);
          mdb[j++] = 144 + ((ww>>>12) & 0x3F);
          mdb[j++] = 128 + ((ww>>>6) & 0x3F);
          mdb[j++] = 128 + (ww & 0x3F);
        } else {
          mdb[j++] = 224 + (w >> 12);
          mdb[j++] = 128 + ((w >> 6)&63);
          mdb[j++] = 128 + (w&63);
        }
      }
      if(!ofmt || ofmt === 'buf') return mdb.slice(0,j);
      if(ofmt !== 'arr') return mdb.slice(0,j).toString('binary');
      return [].slice.call(mdb, 0, j);
    };
  }

  var encache = function encache() {
    if(has_buf) {
      if(cpdcache[sbcs_cache[0]]) return;
      var i=0, s=0;
      for(i = 0; i < sbcs_cache.length; ++i) {
        s = sbcs_cache[i];
        if(cpt[s]) {
          cpdcache[s] = sbcs_decode(s);
          cpecache[s] = sbcs_encode(s);
        }
      }
      for(i = 0; i < dbcs_cache.length; ++i) {
        s = dbcs_cache[i];
        if(cpt[s]) {
          cpdcache[s] = dbcs_decode(s);
          cpecache[s] = dbcs_encode(s);
        }
      }
      for(i = 0; i < magic_cache.length; ++i) {
        s = magic_cache[i];
        if(magic_decode[s]) cpdcache[s] = magic_decode[s];
        if(magic_encode[s]) cpecache[s] = magic_encode[s];
      }
    }
  };
  var null_enc = function(data, ofmt) { void ofmt; return ""; };
  var cp_decache = function cp_decache(cp) { delete cpdcache[cp]; delete cpecache[cp]; };
  var decache = function decache() {
    if(has_buf) {
      if(!cpdcache[sbcs_cache[0]]) return;
      sbcs_cache.forEach(cp_decache);
      dbcs_cache.forEach(cp_decache);
      magic_cache.forEach(cp_decache);
    }
    last_enc = null_enc; last_cp = 0;
  };
  var cache = {
    encache: encache,
    decache: decache,
    sbcs: sbcs_cache,
    dbcs: dbcs_cache
  };

  encache();

  var BM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var SetD = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'(),-./:?";
  var last_enc = null_enc, last_cp = 0;
  var encode = function encode(cp, data, ofmt) {
    if(cp === last_cp && last_enc) { return last_enc(data, ofmt); }
    if(cpecache[cp]) { last_enc = cpecache[last_cp=cp]; return last_enc(data, ofmt); }
    if(has_buf && Buffer.isBuffer(data)) data = data.toString('utf8');
    var len = data.length;
    var out = has_buf ? Buffer.allocUnsafe(4*len) : [], w=0, i=0, j = 0, ww=0;
    var C = cpt[cp], E, M = "";
    var isstr = typeof data === 'string';
    if(C && (E=C.enc)) for(i = 0; i < len; ++i, ++j) {
      w = E[isstr? data.charAt(i) : data[i]];
      if(w > 255) {
        out[j] = w>>8;
        out[++j] = w&255;
      } else out[j] = w&255;
    }
    else if((M=magic[cp])) switch(M) {
      case "utf8":
        if(has_buf && isstr) { out = Buffer_from(data, M); j = out.length; break; }
        for(i = 0; i < len; ++i, ++j) {
          w = isstr ? data.charCodeAt(i) : data[i].charCodeAt(0);
          if(w <= 0x007F) out[j] = w;
          else if(w <= 0x07FF) {
            out[j]   = 192 + (w >> 6);
            out[++j] = 128 + (w&63);
          } else if(w >= 0xD800 && w <= 0xDFFF) {
            w -= 0xD800;
            ww = (isstr ? data.charCodeAt(++i) : data[++i].charCodeAt(0)) - 0xDC00 + (w << 10);
            out[j]   = 240 + ((ww>>>18) & 0x07);
            out[++j] = 144 + ((ww>>>12) & 0x3F);
            out[++j] = 128 + ((ww>>>6) & 0x3F);
            out[++j] = 128 + (ww & 0x3F);
          } else {
            out[j]   = 224 + (w >> 12);
            out[++j] = 128 + ((w >> 6)&63);
            out[++j] = 128 + (w&63);
          }
        }
        break;
      case "ascii":
        if(has_buf && typeof data === "string") { out = Buffer_from(data, M); j = out.length; break; }
        for(i = 0; i < len; ++i, ++j) {
          w = isstr ? data.charCodeAt(i) : data[i].charCodeAt(0);
          if(w <= 0x007F) out[j] = w;
          else throw new Error("bad ascii " + w);
        }
        break;
      case "utf16le":
        if(has_buf && typeof data === "string") { out = Buffer_from(data, M); j = out.length; break; }
        for(i = 0; i < len; ++i) {
          w = isstr ? data.charCodeAt(i) : data[i].charCodeAt(0);
          out[j++] = w&255;
          out[j++] = w>>8;
        }
        break;
      case "utf16be":
        for(i = 0; i < len; ++i) {
          w = isstr ? data.charCodeAt(i) : data[i].charCodeAt(0);
          out[j++] = w>>8;
          out[j++] = w&255;
        }
        break;
      case "utf32le":
        for(i = 0; i < len; ++i) {
          w = isstr ? data.charCodeAt(i) : data[i].charCodeAt(0);
          if(w >= 0xD800 && w <= 0xDFFF) w = 0x10000 + ((w - 0xD800) << 10) + (data[++i].charCodeAt(0) - 0xDC00);
          out[j++] = w&255; w >>= 8;
          out[j++] = w&255; w >>= 8;
          out[j++] = w&255; w >>= 8;
          out[j++] = w&255;
        }
        break;
      case "utf32be":
        for(i = 0; i < len; ++i) {
          w = isstr ? data.charCodeAt(i) : data[i].charCodeAt(0);
          if(w >= 0xD800 && w <= 0xDFFF) w = 0x10000 + ((w - 0xD800) << 10) + (data[++i].charCodeAt(0) - 0xDC00);
          out[j+3] = w&255; w >>= 8;
          out[j+2] = w&255; w >>= 8;
          out[j+1] = w&255; w >>= 8;
          out[j] = w&255;
          j+=4;
        }
        break;
      case "utf7":
        for(i = 0; i < len; i++) {
          var c = isstr ? data.charAt(i) : data[i].charAt(0);
          if(c === "+") { out[j++] = 0x2b; out[j++] = 0x2d; continue; }
          if(SetD.indexOf(c) > -1) { out[j++] = c.charCodeAt(0); continue; }
          var tt = encode(1201, c);
          out[j++] = 0x2b;
          out[j++] = BM.charCodeAt(tt[0]>>2);
          out[j++] = BM.charCodeAt(((tt[0]&0x03)<<4) + ((tt[1]||0)>>4));
          out[j++] = BM.charCodeAt(((tt[1]&0x0F)<<2) + ((tt[2]||0)>>6));
          out[j++] = 0x2d;
        }
        break;
      default: throw new Error("Unsupported magic: " + cp + " " + magic[cp]);
    }
    else throw new Error("Unrecognized CP: " + cp);
    out = out.slice(0,j);
    if(!has_buf) return (ofmt == 'str') ? (out).map(sfcc).join("") : out;
    if(!ofmt || ofmt === 'buf') return out;
    if(ofmt !== 'arr') return out.toString('binary');
    return [].slice.call(out);
  };
  var decode = function decode(cp, data) {
    var F; if((F=cpdcache[cp])) return F(data);
    if(typeof data === "string") return decode(cp, data.split("").map(cca));
    var len = data.length, out = new Array(len), s="", w=0, i=0, j=1, k=0, ww=0;
    var C = cpt[cp], D, M="";
    if(C && (D=C.dec)) {
      for(i = 0; i < len; i+=j) {
        j = 2;
        s = D[(data[i]<<8)+ data[i+1]];
        if(!s) {
          j = 1;
          s = D[data[i]];
        }
        if(!s) throw new Error('Unrecognized code: ' + data[i] + ' ' + data[i+j-1] + ' ' + i + ' ' + j + ' ' + D[data[i]]);
        out[k++] = s;
      }
    }
    else if((M=magic[cp])) switch(M) {
      case "utf8":
        if(len >= 3 && data[0] == 0xEF) if(data[1] == 0xBB && data[2] == 0xBF) i = 3;
        for(; i < len; i+=j) {
          j = 1;
          if(data[i] < 128) w = data[i];
          else if(data[i] < 224) { w=(data[i]&31)*64+(data[i+1]&63); j=2; }
          else if(data[i] < 240) { w=((data[i]&15)<<12)+(data[i+1]&63)*64+(data[i+2]&63); j=3; }
          else { w=(data[i]&7)*262144+((data[i+1]&63)<<12)+(data[i+2]&63)*64+(data[i+3]&63); j=4; }
          if(w < 65536) { out[k++] = String.fromCharCode(w); }
          else {
            w -= 65536; ww = 0xD800 + ((w>>10)&1023); w = 0xDC00 + (w&1023);
            out[k++] = String.fromCharCode(ww); out[k++] = String.fromCharCode(w);
          }
        }
        break;
      case "ascii":
        if(has_buf && Buffer.isBuffer(data)) return data.toString(M);
        for(i = 0; i < len; i++) out[i] = String.fromCharCode(data[i]);
        k = len; break;
      case "utf16le":
        if(len >= 2 && data[0] == 0xFF) if(data[1] == 0xFE) i = 2;
        if(has_buf && Buffer.isBuffer(data)) return data.toString(M);
        j = 2;
        for(; i+1 < len; i+=j) {
          out[k++] = String.fromCharCode((data[i+1]<<8) + data[i]);
        }
        break;
      case "utf16be":
        if(len >= 2 && data[0] == 0xFE) if(data[1] == 0xFF) i = 2;
        j = 2;
        for(; i+1 < len; i+=j) {
          out[k++] = String.fromCharCode((data[i]<<8) + data[i+1]);
        }
        break;
      case "utf32le":
        if(len >= 4 && data[0] == 0xFF) if(data[1] == 0xFE && data[2] === 0 && data[3] === 0) i = 4;
        j = 4;
        for(; i < len; i+=j) {
          w = (data[i+3]<<24) + (data[i+2]<<16) + (data[i+1]<<8) + (data[i]);
          if(w > 0xFFFF) {
            w -= 0x10000;
            out[k++] = String.fromCharCode(0xD800 + ((w >> 10) & 0x3FF));
            out[k++] = String.fromCharCode(0xDC00 + (w & 0x3FF));
          }
          else out[k++] = String.fromCharCode(w);
        }
        break;
      case "utf32be":
        if(len >= 4 && data[3] == 0xFF) if(data[2] == 0xFE && data[1] === 0 && data[0] === 0) i = 4;
        j = 4;
        for(; i < len; i+=j) {
          w = (data[i]<<24) + (data[i+1]<<16) + (data[i+2]<<8) + (data[i+3]);
          if(w > 0xFFFF) {
            w -= 0x10000;
            out[k++] = String.fromCharCode(0xD800 + ((w >> 10) & 0x3FF));
            out[k++] = String.fromCharCode(0xDC00 + (w & 0x3FF));
          }
          else out[k++] = String.fromCharCode(w);
        }
        break;
      case "utf7":
        if(len >= 4 && data[0] == 0x2B && data[1] == 0x2F && data[2] == 0x76) {
          if(len >= 5 && data[3] == 0x38 && data[4] == 0x2D) i = 5;
          else if(data[3] == 0x38 || data[3] == 0x39 || data[3] == 0x2B || data[3] == 0x2F) i = 4;
        }
        for(; i < len; i+=j) {
          if(data[i] !== 0x2b) { j=1; out[k++] = String.fromCharCode(data[i]); continue; }
          j=1;
          if(data[i+1] === 0x2d) { j = 2; out[k++] = "+"; continue; }
          // eslint-disable-next-line no-useless-escape
          while(String.fromCharCode(data[i+j]).match(/[A-Za-z0-9+\/]/)) j++;
          var dash = 0;
          if(data[i+j] === 0x2d) { ++j; dash=1; }
          var tt = [];
          var o64 = "";
          var c1=0, c2=0, c3=0;
          var e1=0, e2=0, e3=0, e4=0;
          for(var l = 1; l < j - dash;) {
            e1 = BM.indexOf(String.fromCharCode(data[i+l++]));
            e2 = BM.indexOf(String.fromCharCode(data[i+l++]));
            c1 = e1 << 2 | e2 >> 4;
            tt.push(c1);
            e3 = BM.indexOf(String.fromCharCode(data[i+l++]));
            if(e3 === -1) break;
            c2 = (e2 & 15) << 4 | e3 >> 2;
            tt.push(c2);
            e4 = BM.indexOf(String.fromCharCode(data[i+l++]));
            if(e4 === -1) break;
            c3 = (e3 & 3) << 6 | e4;
            if(e4 < 64) tt.push(c3);
          }
          o64 = decode(1201, tt);
          for(l = 0; l < o64.length; ++l) out[k++] = o64.charAt(l);
        }
        break;
      default: throw new Error("Unsupported magic: " + cp + " " + magic[cp]);
    }
    else throw new Error("Unrecognized CP: " + cp);
    return out.slice(0,k).join("");
  };
  var hascp = function hascp(cp) { return !!(cpt[cp] || magic[cp]); };
  cpt.utils = { decode: decode, encode: encode, hascp: hascp, magic: magic, cache:cache };
  return cpt;
}));


/***/ }),

/***/ "./node_modules/xlsx-js-style/libs/jszip.js":
/*!**************************************************!*\
  !*** ./node_modules/xlsx-js-style/libs/jszip.js ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "?2b48")["Buffer"];
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*

JSZip - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2014 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE

Note: since JSZip 3 removed critical functionality, this version assigns to the
`JSZipSync` variable.  Another JSZip version can be loaded in parallel.
*/
(function(e){
	if( true&&"undefined"==typeof DO_NOT_EXPORT_JSZIP)module.exports=e();
	else if( true&&"undefined"==typeof DO_NOT_EXPORT_JSZIP){JSZipSync=e();!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}
	else{
		var f;
		"undefined"!=typeof globalThis?f=globalThis:
		"undefined"!=typeof window?f=window:
		"undefined"!=typeof __webpack_require__.g?f=__webpack_require__.g:
		"undefined"!=typeof $ && $.global?f=$.global:
		"undefined"!=typeof self&&(f=self),f.JSZipSync=e()
	}
}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=undefined;if(!u&&a)return require(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=undefined;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';
// private property
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


// public method for encoding
exports.encode = function(input, utf8) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

    }

    return output;
};

// public method for decoding
exports.decode = function(input, utf8) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    return output;

};

},{}],2:[function(_dereq_,module,exports){
'use strict';
function CompressedObject() {
    this.compressedSize = 0;
    this.uncompressedSize = 0;
    this.crc32 = 0;
    this.compressionMethod = null;
    this.compressedContent = null;
}

CompressedObject.prototype = {
    /**
     * Return the decompressed content in an unspecified format.
     * The format will depend on the decompressor.
     * @return {Object} the decompressed content.
     */
    getContent: function() {
        return null; // see implementation
    },
    /**
     * Return the compressed content in an unspecified format.
     * The format will depend on the compressed conten source.
     * @return {Object} the compressed content.
     */
    getCompressedContent: function() {
        return null; // see implementation
    }
};
module.exports = CompressedObject;

},{}],3:[function(_dereq_,module,exports){
'use strict';
exports.STORE = {
    magic: "\x00\x00",
    compress: function(content) {
        return content; // no compression
    },
    uncompress: function(content) {
        return content; // no compression
    },
    compressInputType: null,
    uncompressInputType: null
};
exports.DEFLATE = _dereq_('./flate');

},{"./flate":8}],4:[function(_dereq_,module,exports){
'use strict';

var utils = _dereq_('./utils');

var table = [
    0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA,
    0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
    0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988,
    0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91,
    0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE,
    0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
    0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC,
    0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5,
    0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172,
    0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B,
    0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940,
    0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59,
    0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116,
    0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
    0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924,
    0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
    0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A,
    0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
    0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818,
    0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01,
    0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E,
    0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457,
    0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C,
    0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65,
    0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2,
    0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB,
    0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0,
    0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9,
    0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086,
    0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,
    0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4,
    0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD,
    0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A,
    0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683,
    0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8,
    0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1,
    0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE,
    0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7,
    0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC,
    0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5,
    0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252,
    0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B,
    0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60,
    0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79,
    0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236,
    0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F,
    0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04,
    0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D,
    0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A,
    0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713,
    0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38,
    0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21,
    0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E,
    0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777,
    0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C,
    0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45,
    0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2,
    0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB,
    0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0,
    0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,
    0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6,
    0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF,
    0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94,
    0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D
];

/**
 *
 *  Javascript crc32
 *  http://www.webtoolkit.info/
 *
 */
module.exports = function crc32(input, crc) {
    if (typeof input === "undefined" || !input.length) {
        return 0;
    }

    var isArray = utils.getTypeOf(input) !== "string";

    if (typeof(crc) == "undefined") {
        crc = 0;
    }
    var x = 0;
    var y = 0;
    var b = 0;

    crc = crc ^ (-1);
    for (var i = 0, iTop = input.length; i < iTop; i++) {
        b = isArray ? input[i] : input.charCodeAt(i);
        y = (crc ^ b) & 0xFF;
        x = table[y];
        crc = (crc >>> 8) ^ x;
    }

    return crc ^ (-1);
};
// vim: set shiftwidth=4 softtabstop=4:

},{"./utils":21}],5:[function(_dereq_,module,exports){
'use strict';
var utils = _dereq_('./utils');

function DataReader(data) {
    this.data = null; // type : see implementation
    this.length = 0;
    this.index = 0;
}
DataReader.prototype = {
    /**
     * Check that the offset will not go too far.
     * @param {string} offset the additional offset to check.
     * @throws {Error} an Error if the offset is out of bounds.
     */
    checkOffset: function(offset) {
        this.checkIndex(this.index + offset);
    },
    /**
     * Check that the specifed index will not be too far.
     * @param {string} newIndex the index to check.
     * @throws {Error} an Error if the index is out of bounds.
     */
    checkIndex: function(newIndex) {
        if (this.length < newIndex || newIndex < 0) {
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
        }
    },
    /**
     * Change the index.
     * @param {number} newIndex The new index.
     * @throws {Error} if the new index is out of the data.
     */
    setIndex: function(newIndex) {
        this.checkIndex(newIndex);
        this.index = newIndex;
    },
    /**
     * Skip the next n bytes.
     * @param {number} n the number of bytes to skip.
     * @throws {Error} if the new index is out of the data.
     */
    skip: function(n) {
        this.setIndex(this.index + n);
    },
    /**
     * Get the byte at the specified index.
     * @param {number} i the index to use.
     * @return {number} a byte.
     */
    byteAt: function(i) {
        // see implementations
    },
    /**
     * Get the next number with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {number} the corresponding number.
     */
    readInt: function(size) {
        var result = 0,
            i;
        this.checkOffset(size);
        for (i = this.index + size - 1; i >= this.index; i--) {
            result = (result << 8) + this.byteAt(i);
        }
        this.index += size;
        return result;
    },
    /**
     * Get the next string with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {string} the corresponding string.
     */
    readString: function(size) {
        return utils.transformTo("string", this.readData(size));
    },
    /**
     * Get raw data without conversion, <size> bytes.
     * @param {number} size the number of bytes to read.
     * @return {Object} the raw data, implementation specific.
     */
    readData: function(size) {
        // see implementations
    },
    /**
     * Find the last occurence of a zip signature (4 bytes).
     * @param {string} sig the signature to find.
     * @return {number} the index of the last occurence, -1 if not found.
     */
    lastIndexOfSignature: function(sig) {
        // see implementations
    },
    /**
     * Get the next date.
     * @return {Date} the date.
     */
    readDate: function() {
        var dostime = this.readInt(4);
        return new Date(
        ((dostime >> 25) & 0x7f) + 1980, // year
        ((dostime >> 21) & 0x0f) - 1, // month
        (dostime >> 16) & 0x1f, // day
        (dostime >> 11) & 0x1f, // hour
        (dostime >> 5) & 0x3f, // minute
        (dostime & 0x1f) << 1); // second
    }
};
module.exports = DataReader;

},{"./utils":21}],6:[function(_dereq_,module,exports){
'use strict';
exports.base64 = false;
exports.binary = false;
exports.dir = false;
exports.createFolders = false;
exports.date = null;
exports.compression = null;
exports.comment = null;

},{}],7:[function(_dereq_,module,exports){
'use strict';
var utils = _dereq_('./utils');

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.string2binary = function(str) {
    return utils.string2binary(str);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.string2Uint8Array = function(str) {
    return utils.transformTo("uint8array", str);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.uint8Array2String = function(array) {
    return utils.transformTo("string", array);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.string2Blob = function(str) {
    var buffer = utils.transformTo("arraybuffer", str);
    return utils.arrayBuffer2Blob(buffer);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.arrayBuffer2Blob = function(buffer) {
    return utils.arrayBuffer2Blob(buffer);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.transformTo = function(outputType, input) {
    return utils.transformTo(outputType, input);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.getTypeOf = function(input) {
    return utils.getTypeOf(input);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.checkSupport = function(type) {
    return utils.checkSupport(type);
};

/**
 * @deprecated
 * This value will be removed in a future version without replacement.
 */
exports.MAX_VALUE_16BITS = utils.MAX_VALUE_16BITS;

/**
 * @deprecated
 * This value will be removed in a future version without replacement.
 */
exports.MAX_VALUE_32BITS = utils.MAX_VALUE_32BITS;


/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.pretty = function(str) {
    return utils.pretty(str);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.findCompression = function(compressionMethod) {
    return utils.findCompression(compressionMethod);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.isRegExp = function (object) {
    return utils.isRegExp(object);
};


},{"./utils":21}],8:[function(_dereq_,module,exports){
'use strict';
var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

var pako = _dereq_("pako");
exports.uncompressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
exports.compressInputType = USE_TYPEDARRAY ? "uint8array" : "array";

exports.magic = "\x08\x00";
exports.compress = function(input) {
    return pako.deflateRaw(input);
};
exports.uncompress =  function(input) {
    return pako.inflateRaw(input);
};

},{"pako":24}],9:[function(_dereq_,module,exports){
'use strict';

var base64 = _dereq_('./base64');

/**
Usage:
   zip = new JSZip();
   zip.file("hello.txt", "Hello, World!").file("tempfile", "nothing");
   zip.folder("images").file("smile.gif", base64Data, {base64: true});
   zip.file("Xmas.txt", "Ho ho ho !", {date : new Date("December 25, 2007 00:00:01")});
   zip.remove("tempfile");

   base64zip = zip.generate();

**/

/**
 * Representation a of zip file in js
 * @constructor
 * @param {String=|ArrayBuffer=|Uint8Array=} data the data to load, if any (optional).
 * @param {Object=} options the options for creating this objects (optional).
 */
function JSZipSync(data, options) {
    // if this constructor is used without `new`, it adds `new` before itself:
    if(!(this instanceof JSZipSync)) return new JSZipSync(data, options);

    // object containing the files :
    // {
    //   "folder/" : {...},
    //   "folder/data.txt" : {...}
    // }
    this.files = {};

    this.comment = null;

    // Where we are in the hierarchy
    this.root = "";
    if (data) {
        this.load(data, options);
    }
    this.clone = function() {
        var newObj = new JSZipSync();
        for (var i in this) {
            if (typeof this[i] !== "function") {
                newObj[i] = this[i];
            }
        }
        return newObj;
    };
}
JSZipSync.prototype = _dereq_('./object');
JSZipSync.prototype.load = _dereq_('./load');
JSZipSync.support = _dereq_('./support');
JSZipSync.defaults = _dereq_('./defaults');

/**
 * @deprecated
 * This namespace will be removed in a future version without replacement.
 */
JSZipSync.utils = _dereq_('./deprecatedPublicUtils');

JSZipSync.base64 = {
    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    encode : function(input) {
        return base64.encode(input);
    },
    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    decode : function(input) {
        return base64.decode(input);
    }
};
JSZipSync.compressions = _dereq_('./compressions');
module.exports = JSZipSync;

},{"./base64":1,"./compressions":3,"./defaults":6,"./deprecatedPublicUtils":7,"./load":10,"./object":13,"./support":17}],10:[function(_dereq_,module,exports){
'use strict';
var base64 = _dereq_('./base64');
var ZipEntries = _dereq_('./zipEntries');
module.exports = function(data, options) {
    var files, zipEntries, i, input;
    options = options || {};
    if (options.base64) {
        data = base64.decode(data);
    }

    zipEntries = new ZipEntries(data, options);
    files = zipEntries.files;
    for (i = 0; i < files.length; i++) {
        input = files[i];
        this.file(input.fileName, input.decompressed, {
            binary: true,
            optimizedBinaryString: true,
            date: input.date,
            dir: input.dir,
            comment : input.fileComment.length ? input.fileComment : null,
            createFolders: options.createFolders
        });
    }
    if (zipEntries.zipComment.length) {
        this.comment = zipEntries.zipComment;
    }

    return this;
};

},{"./base64":1,"./zipEntries":22}],11:[function(_dereq_,module,exports){
(function (Buffer){
'use strict';
var Buffer_from = /*::(*/function(){}/*:: :any)*/;
if(typeof Buffer !== 'undefined') {
	var nbfs = !Buffer.from;
	if(!nbfs) try { Buffer.from("foo", "utf8"); } catch(e) { nbfs = true; }
	Buffer_from = nbfs ? function(buf, enc) { return (enc) ? new Buffer(buf, enc) : new Buffer(buf); } : Buffer.from.bind(Buffer);
	// $FlowIgnore
	if(!Buffer.alloc) Buffer.alloc = function(n) { return new Buffer(n); };
}
module.exports = function(data, encoding){
    return typeof data == 'number' ? Buffer.alloc(data) : Buffer_from(data, encoding);
};
module.exports.test = function(b){
    return Buffer.isBuffer(b);
};
}).call(this,(typeof Buffer !== "undefined" ? Buffer : undefined))
},{}],12:[function(_dereq_,module,exports){
'use strict';
var Uint8ArrayReader = _dereq_('./uint8ArrayReader');

function NodeBufferReader(data) {
    this.data = data;
    this.length = this.data.length;
    this.index = 0;
}
NodeBufferReader.prototype = new Uint8ArrayReader();

/**
 * @see DataReader.readData
 */
NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.index, this.index + size);
    this.index += size;
    return result;
};
module.exports = NodeBufferReader;

},{"./uint8ArrayReader":18}],13:[function(_dereq_,module,exports){
'use strict';
var support = _dereq_('./support');
var utils = _dereq_('./utils');
var crc32 = _dereq_('./crc32');
var signature = _dereq_('./signature');
var defaults = _dereq_('./defaults');
var base64 = _dereq_('./base64');
var compressions = _dereq_('./compressions');
var CompressedObject = _dereq_('./compressedObject');
var nodeBuffer = _dereq_('./nodeBuffer');
var utf8 = _dereq_('./utf8');
var StringWriter = _dereq_('./stringWriter');
var Uint8ArrayWriter = _dereq_('./uint8ArrayWriter');

/**
 * Returns the raw data of a ZipObject, decompress the content if necessary.
 * @param {ZipObject} file the file to use.
 * @return {String|ArrayBuffer|Uint8Array|Buffer} the data.
 */
var getRawData = function(file) {
    if (file._data instanceof CompressedObject) {
        file._data = file._data.getContent();
        file.options.binary = true;
        file.options.base64 = false;

        if (utils.getTypeOf(file._data) === "uint8array") {
            var copy = file._data;
            // when reading an arraybuffer, the CompressedObject mechanism will keep it and subarray() a Uint8Array.
            // if we request a file in the same format, we might get the same Uint8Array or its ArrayBuffer (the original zip file).
            file._data = new Uint8Array(copy.length);
            // with an empty Uint8Array, Opera fails with a "Offset larger than array size"
            if (copy.length !== 0) {
                file._data.set(copy, 0);
            }
        }
    }
    return file._data;
};

/**
 * Returns the data of a ZipObject in a binary form. If the content is an unicode string, encode it.
 * @param {ZipObject} file the file to use.
 * @return {String|ArrayBuffer|Uint8Array|Buffer} the data.
 */
var getBinaryData = function(file) {
    var result = getRawData(file),
        type = utils.getTypeOf(result);
    if (type === "string") {
        if (!file.options.binary) {
            // unicode text !
            // unicode string => binary string is a painful process, check if we can avoid it.
            if (support.nodebuffer) {
                return nodeBuffer(result, "utf-8");
            }
        }
        return file.asBinary();
    }
    return result;
};

/**
 * Transform this._data into a string.
 * @param {function} filter a function String -> String, applied if not null on the result.
 * @return {String} the string representing this._data.
 */
var dataToString = function(asUTF8) {
    var result = getRawData(this);
    if (result === null || typeof result === "undefined") {
        return "";
    }
    // if the data is a base64 string, we decode it before checking the encoding !
    if (this.options.base64) {
        result = base64.decode(result);
    }
    if (asUTF8 && this.options.binary) {
        // JSZip.prototype.utf8decode supports arrays as input
        // skip to array => string step, utf8decode will do it.
        result = out.utf8decode(result);
    }
    else {
        // no utf8 transformation, do the array => string step.
        result = utils.transformTo("string", result);
    }

    if (!asUTF8 && !this.options.binary) {
        result = utils.transformTo("string", out.utf8encode(result));
    }
    return result;
};
/**
 * A simple object representing a file in the zip file.
 * @constructor
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
 * @param {Object} options the options of the file
 */
var ZipObject = function(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;

    this._data = data;
    this.options = options;

    /*
     * This object contains initial values for dir and date.
     * With them, we can check if the user changed the deprecated metadata in
     * `ZipObject#options` or not.
     */
    this._initialMetadata = {
      dir : options.dir,
      date : options.date
    };
};

ZipObject.prototype = {
    /**
     * Return the content as UTF8 string.
     * @return {string} the UTF8 string.
     */
    asText: function() {
        return dataToString.call(this, true);
    },
    /**
     * Returns the binary content.
     * @return {string} the content as binary.
     */
    asBinary: function() {
        return dataToString.call(this, false);
    },
    /**
     * Returns the content as a nodejs Buffer.
     * @return {Buffer} the content as a Buffer.
     */
    asNodeBuffer: function() {
        var result = getBinaryData(this);
        return utils.transformTo("nodebuffer", result);
    },
    /**
     * Returns the content as an Uint8Array.
     * @return {Uint8Array} the content as an Uint8Array.
     */
    asUint8Array: function() {
        var result = getBinaryData(this);
        return utils.transformTo("uint8array", result);
    },
    /**
     * Returns the content as an ArrayBuffer.
     * @return {ArrayBuffer} the content as an ArrayBufer.
     */
    asArrayBuffer: function() {
        return this.asUint8Array().buffer;
    }
};

/**
 * Transform an integer into a string in hexadecimal.
 * @private
 * @param {number} dec the number to convert.
 * @param {number} bytes the number of bytes to generate.
 * @returns {string} the result.
 */
var decToHex = function(dec, bytes) {
    var hex = "",
        i;
    for (i = 0; i < bytes; i++) {
        hex += String.fromCharCode(dec & 0xff);
        dec = dec >>> 8;
    }
    return hex;
};

/**
 * Merge the objects passed as parameters into a new one.
 * @private
 * @param {...Object} var_args All objects to merge.
 * @return {Object} a new object with the data of the others.
 */
var extend = function() {
    var result = {}, i, attr;
    for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
        for (attr in arguments[i]) {
            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
                result[attr] = arguments[i][attr];
            }
        }
    }
    return result;
};

/**
 * Transforms the (incomplete) options from the user into the complete
 * set of options to create a file.
 * @private
 * @param {Object} o the options from the user.
 * @return {Object} the complete set of options.
 */
var prepareFileAttrs = function(o) {
    o = o || {};
    if (o.base64 === true && (o.binary === null || o.binary === undefined)) {
        o.binary = true;
    }
    o = extend(o, defaults);
    o.date = o.date || new Date();
    if (o.compression !== null) o.compression = o.compression.toUpperCase();

    return o;
};

/**
 * Add a file in the current folder.
 * @private
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
 * @param {Object} o the options of the file
 * @return {Object} the new file.
 */
var fileAdd = function(name, data, o) {
    // be sure sub folders exist
    var dataType = utils.getTypeOf(data),
        parent;

    o = prepareFileAttrs(o);

    if (o.createFolders && (parent = parentFolder(name))) {
        folderAdd.call(this, parent, true);
    }

    if (o.dir || data === null || typeof data === "undefined") {
        o.base64 = false;
        o.binary = false;
        data = null;
    }
    else if (dataType === "string") {
        if (o.binary && !o.base64) {
            // optimizedBinaryString == true means that the file has already been filtered with a 0xFF mask
            if (o.optimizedBinaryString !== true) {
                // this is a string, not in a base64 format.
                // Be sure that this is a correct "binary string"
                data = utils.string2binary(data);
            }
        }
    }
    else { // arraybuffer, uint8array, ...
        o.base64 = false;
        o.binary = true;

        if (!dataType && !(data instanceof CompressedObject)) {
            throw new Error("The data of '" + name + "' is in an unsupported format !");
        }

        // special case : it's way easier to work with Uint8Array than with ArrayBuffer
        if (dataType === "arraybuffer") {
            data = utils.transformTo("uint8array", data);
        }
    }

    var object = new ZipObject(name, data, o);
    this.files[name] = object;
    return object;
};

/**
 * Find the parent folder of the path.
 * @private
 * @param {string} path the path to use
 * @return {string} the parent folder, or ""
 */
var parentFolder = function (path) {
    if (path.slice(-1) == '/') {
        path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf('/');
    return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
};

/**
 * Add a (sub) folder in the current folder.
 * @private
 * @param {string} name the folder's name
 * @param {boolean=} [createFolders] If true, automatically create sub
 *  folders. Defaults to false.
 * @return {Object} the new folder.
 */
var folderAdd = function(name, createFolders) {
    // Check the name ends with a /
    if (name.slice(-1) != "/") {
        name += "/"; // IE doesn't like substr(-1)
    }

    createFolders = (typeof createFolders !== 'undefined') ? createFolders : false;

    // Does this folder already exist?
    if (!this.files[name]) {
        fileAdd.call(this, name, null, {
            dir: true,
            createFolders: createFolders
        });
    }
    return this.files[name];
};

/**
 * Generate a JSZip.CompressedObject for a given zipOject.
 * @param {ZipObject} file the object to read.
 * @param {JSZip.compression} compression the compression to use.
 * @return {JSZip.CompressedObject} the compressed result.
 */
var generateCompressedObjectFrom = function(file, compression) {
    var result = new CompressedObject(),
        content;

    // the data has not been decompressed, we might reuse things !
    if (file._data instanceof CompressedObject) {
        result.uncompressedSize = file._data.uncompressedSize;
        result.crc32 = file._data.crc32;

        if (result.uncompressedSize === 0 || file.dir) {
            compression = compressions['STORE'];
            result.compressedContent = "";
            result.crc32 = 0;
        }
        else if (file._data.compressionMethod === compression.magic) {
            result.compressedContent = file._data.getCompressedContent();
        }
        else {
            content = file._data.getContent();
            // need to decompress / recompress
            result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content));
        }
    }
    else {
        // have uncompressed data
        content = getBinaryData(file);
        if (!content || content.length === 0 || file.dir) {
            compression = compressions['STORE'];
            content = "";
        }
        result.uncompressedSize = content.length;
        result.crc32 = crc32(content);
        result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content));
    }

    result.compressedSize = result.compressedContent.length;
    result.compressionMethod = compression.magic;

    return result;
};

/**
 * Generate the various parts used in the construction of the final zip file.
 * @param {string} name the file name.
 * @param {ZipObject} file the file content.
 * @param {JSZip.CompressedObject} compressedObject the compressed object.
 * @param {number} offset the current offset from the start of the zip file.
 * @return {object} the zip parts.
 */
var generateZipParts = function(name, file, compressedObject, offset) {
    var data = compressedObject.compressedContent,
        utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
        comment = file.comment || "",
        utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
        useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
        useUTF8ForComment = utfEncodedComment.length !== comment.length,
        o = file.options,
        dosTime,
        dosDate,
        extraFields = "",
        unicodePathExtraField = "",
        unicodeCommentExtraField = "",
        dir, date;


    // handle the deprecated options.dir
    if (file._initialMetadata.dir !== file.dir) {
        dir = file.dir;
    } else {
        dir = o.dir;
    }

    // handle the deprecated options.date
    if(file._initialMetadata.date !== file.date) {
        date = file.date;
    } else {
        date = o.date;
    }


    dosTime = date.getHours();
    dosTime = dosTime << 6;
    dosTime = dosTime | date.getMinutes();
    dosTime = dosTime << 5;
    dosTime = dosTime | date.getSeconds() / 2;

    dosDate = date.getFullYear() - 1980;
    dosDate = dosDate << 4;
    dosDate = dosDate | (date.getMonth() + 1);
    dosDate = dosDate << 5;
    dosDate = dosDate | date.getDate();

    if (useUTF8ForFileName) {
        // set the unicode path extra field. unzip needs at least one extra
        // field to correctly handle unicode path, so using the path is as good
        // as any other information. This could improve the situation with
        // other archive managers too.
        // This field is usually used without the utf8 flag, with a non
        // unicode path in the header (winrar, winzip). This helps (a bit)
        // with the messy Windows' default compressed folders feature but
        // breaks on p7zip which doesn't seek the unicode path extra field.
        // So for now, UTF-8 everywhere !
        unicodePathExtraField =
            // Version
            decToHex(1, 1) +
            // NameCRC32
            decToHex(crc32(utfEncodedFileName), 4) +
            // UnicodeName
            utfEncodedFileName;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x70" +
            // size
            decToHex(unicodePathExtraField.length, 2) +
            // content
            unicodePathExtraField;
    }

    if(useUTF8ForComment) {

        unicodeCommentExtraField =
            // Version
            decToHex(1, 1) +
            // CommentCRC32
            decToHex(this.crc32(utfEncodedComment), 4) +
            // UnicodeName
            utfEncodedComment;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x63" +
            // size
            decToHex(unicodeCommentExtraField.length, 2) +
            // content
            unicodeCommentExtraField;
    }

    var header = "";

    // version needed to extract
    header += "\x0A\x00";
    // general purpose bit flag
    // set bit 11 if utf8
    header += (useUTF8ForFileName || useUTF8ForComment) ? "\x00\x08" : "\x00\x00";
    // compression method
    header += compressedObject.compressionMethod;
    // last mod file time
    header += decToHex(dosTime, 2);
    // last mod file date
    header += decToHex(dosDate, 2);
    // crc-32
    header += decToHex(compressedObject.crc32, 4);
    // compressed size
    header += decToHex(compressedObject.compressedSize, 4);
    // uncompressed size
    header += decToHex(compressedObject.uncompressedSize, 4);
    // file name length
    header += decToHex(utfEncodedFileName.length, 2);
    // extra field length
    header += decToHex(extraFields.length, 2);


    var fileRecord = signature.LOCAL_FILE_HEADER + header + utfEncodedFileName + extraFields;

    var dirRecord = signature.CENTRAL_FILE_HEADER +
    // version made by (00: DOS)
    "\x14\x00" +
    // file header (common to file and central directory)
    header +
    // file comment length
    decToHex(utfEncodedComment.length, 2) +
    // disk number start
    "\x00\x00" +
    // internal file attributes TODO
    "\x00\x00" +
    // external file attributes
    (dir === true ? "\x10\x00\x00\x00" : "\x00\x00\x00\x00") +
    // relative offset of local header
    decToHex(offset, 4) +
    // file name
    utfEncodedFileName +
    // extra field
    extraFields +
    // file comment
    utfEncodedComment;

    return {
        fileRecord: fileRecord,
        dirRecord: dirRecord,
        compressedObject: compressedObject
    };
};


// return the actual prototype of JSZip
var out = {
    /**
     * Read an existing zip and merge the data in the current JSZip object.
     * The implementation is in jszip-load.js, don't forget to include it.
     * @param {String|ArrayBuffer|Uint8Array|Buffer} stream  The stream to load
     * @param {Object} options Options for loading the stream.
     *  options.base64 : is the stream in base64 ? default : false
     * @return {JSZip} the current JSZip object
     */
    load: function(stream, options) {
        throw new Error("Load method is not defined. Is the file jszip-load.js included ?");
    },

    /**
     * Filter nested files/folders with the specified function.
     * @param {Function} search the predicate to use :
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     * @return {Array} An array of matching elements.
     */
    filter: function(search) {
        var result = [],
            filename, relativePath, file, fileClone;
        for (filename in this.files) {
            if (!this.files.hasOwnProperty(filename)) {
                continue;
            }
            file = this.files[filename];
            // return a new object, don't let the user mess with our internal objects :)
            fileClone = new ZipObject(file.name, file._data, extend(file.options));
            relativePath = filename.slice(this.root.length, filename.length);
            if (filename.slice(0, this.root.length) === this.root && // the file is in the current root
            search(relativePath, fileClone)) { // and the file matches the function
                result.push(fileClone);
            }
        }
        return result;
    },

    /**
     * Add a file to the zip file, or search a file.
     * @param   {string|RegExp} name The name of the file to add (if data is defined),
     * the name of the file to find (if no data) or a regex to match files.
     * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
     * @param   {Object} o     File options
     * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
     * a file (when searching by string) or an array of files (when searching by regex).
     */
    file: function(name, data, o) {
        if (arguments.length === 1) {
            if (utils.isRegExp(name)) {
                var regexp = name;
                return this.filter(function(relativePath, file) {
                    return !file.dir && regexp.test(relativePath);
                });
            }
            else { // text
                return this.filter(function(relativePath, file) {
                    return !file.dir && relativePath === name;
                })[0] || null;
            }
        }
        else { // more than one argument : we have data !
            name = this.root + name;
            fileAdd.call(this, name, data, o);
        }
        return this;
    },

    /**
     * Add a directory to the zip file, or search.
     * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
     * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
     */
    folder: function(arg) {
        if (!arg) {
            return this;
        }

        if (utils.isRegExp(arg)) {
            return this.filter(function(relativePath, file) {
                return file.dir && arg.test(relativePath);
            });
        }

        // else, name is a new folder
        var name = this.root + arg;
        var newFolder = folderAdd.call(this, name);

        // Allow chaining by returning a new object with this folder as the root
        var ret = this.clone();
        ret.root = newFolder.name;
        return ret;
    },

    /**
     * Delete a file, or a directory and all sub-files, from the zip
     * @param {string} name the name of the file to delete
     * @return {JSZip} this JSZip object
     */
    remove: function(name) {
        name = this.root + name;
        var file = this.files[name];
        if (!file) {
            // Look for any folders
            if (name.slice(-1) != "/") {
                name += "/";
            }
            file = this.files[name];
        }

        if (file && !file.dir) {
            // file
            delete this.files[name];
        } else {
            // maybe a folder, delete recursively
            var kids = this.filter(function(relativePath, file) {
                return file.name.slice(0, name.length) === name;
            });
            for (var i = 0; i < kids.length; i++) {
                delete this.files[kids[i].name];
            }
        }

        return this;
    },

    /**
     * Generate the complete zip file
     * @param {Object} options the options to generate the zip file :
     * - base64, (deprecated, use type instead) true to generate base64.
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
     */
    generate: function(options) {
        options = extend(options || {}, {
            base64: true,
            compression: "STORE",
            type: "base64",
            comment: null
        });

        utils.checkSupport(options.type);

        var zipData = [],
            localDirLength = 0,
            centralDirLength = 0,
            writer, i,
            utfEncodedComment = utils.transformTo("string", this.utf8encode(options.comment || this.comment || ""));

        // first, generate all the zip parts.
        for (var name in this.files) {
            if (!this.files.hasOwnProperty(name)) {
                continue;
            }
            var file = this.files[name];

            var compressionName = file.options.compression || options.compression.toUpperCase();
            var compression = compressions[compressionName];
            if (!compression) {
                throw new Error(compressionName + " is not a valid compression method !");
            }

            var compressedObject = generateCompressedObjectFrom.call(this, file, compression);

            var zipPart = generateZipParts.call(this, name, file, compressedObject, localDirLength);
            localDirLength += zipPart.fileRecord.length + compressedObject.compressedSize;
            centralDirLength += zipPart.dirRecord.length;
            zipData.push(zipPart);
        }

        var dirEnd = "";

        // end of central dir signature
        dirEnd = signature.CENTRAL_DIRECTORY_END +
        // number of this disk
        "\x00\x00" +
        // number of the disk with the start of the central directory
        "\x00\x00" +
        // total number of entries in the central directory on this disk
        decToHex(zipData.length, 2) +
        // total number of entries in the central directory
        decToHex(zipData.length, 2) +
        // size of the central directory   4 bytes
        decToHex(centralDirLength, 4) +
        // offset of start of central directory with respect to the starting disk number
        decToHex(localDirLength, 4) +
        // .ZIP file comment length
        decToHex(utfEncodedComment.length, 2) +
        // .ZIP file comment
        utfEncodedComment;


        // we have all the parts (and the total length)
        // time to create a writer !
        var typeName = options.type.toLowerCase();
        if(typeName==="uint8array"||typeName==="arraybuffer"||typeName==="blob"||typeName==="nodebuffer") {
            writer = new Uint8ArrayWriter(localDirLength + centralDirLength + dirEnd.length);
        }else{
            writer = new StringWriter(localDirLength + centralDirLength + dirEnd.length);
        }

        for (i = 0; i < zipData.length; i++) {
            writer.append(zipData[i].fileRecord);
            writer.append(zipData[i].compressedObject.compressedContent);
        }
        for (i = 0; i < zipData.length; i++) {
            writer.append(zipData[i].dirRecord);
        }

        writer.append(dirEnd);

        var zip = writer.finalize();



        switch(options.type.toLowerCase()) {
            // case "zip is an Uint8Array"
            case "uint8array" :
            case "arraybuffer" :
            case "nodebuffer" :
               return utils.transformTo(options.type.toLowerCase(), zip);
            case "blob" :
               return utils.arrayBuffer2Blob(utils.transformTo("arraybuffer", zip));
            // case "zip is a string"
            case "base64" :
               return (options.base64) ? base64.encode(zip) : zip;
            default : // case "string" :
               return zip;
         }

    },

    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    crc32: function (input, crc) {
        return crc32(input, crc);
    },

    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    utf8encode: function (string) {
        return utils.transformTo("string", utf8.utf8encode(string));
    },

    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    utf8decode: function (input) {
        return utf8.utf8decode(input);
    }
};
module.exports = out;

},{"./base64":1,"./compressedObject":2,"./compressions":3,"./crc32":4,"./defaults":6,"./nodeBuffer":11,"./signature":14,"./stringWriter":16,"./support":17,"./uint8ArrayWriter":19,"./utf8":20,"./utils":21}],14:[function(_dereq_,module,exports){
'use strict';
exports.LOCAL_FILE_HEADER = "PK\x03\x04";
exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
exports.DATA_DESCRIPTOR = "PK\x07\x08";

},{}],15:[function(_dereq_,module,exports){
'use strict';
var DataReader = _dereq_('./dataReader');
var utils = _dereq_('./utils');

function StringReader(data, optimizedBinaryString) {
    this.data = data;
    if (!optimizedBinaryString) {
        this.data = utils.string2binary(this.data);
    }
    this.length = this.data.length;
    this.index = 0;
}
StringReader.prototype = new DataReader();
/**
 * @see DataReader.byteAt
 */
StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(i);
};
/**
 * @see DataReader.lastIndexOfSignature
 */
StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig);
};
/**
 * @see DataReader.readData
 */
StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    // this will work because the constructor applied the "& 0xff" mask.
    var result = this.data.slice(this.index, this.index + size);
    this.index += size;
    return result;
};
module.exports = StringReader;

},{"./dataReader":5,"./utils":21}],16:[function(_dereq_,module,exports){
'use strict';

var utils = _dereq_('./utils');

/**
 * An object to write any content to a string.
 * @constructor
 */
var StringWriter = function() {
    this.data = [];
};
StringWriter.prototype = {
    /**
     * Append any content to the current string.
     * @param {Object} input the content to add.
     */
    append: function(input) {
        input = utils.transformTo("string", input);
        this.data.push(input);
    },
    /**
     * Finalize the construction an return the result.
     * @return {string} the generated string.
     */
    finalize: function() {
        return this.data.join("");
    }
};

module.exports = StringWriter;

},{"./utils":21}],17:[function(_dereq_,module,exports){
(function (Buffer){
'use strict';
exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
// contains true if JSZip can read/generate nodejs Buffer, false otherwise.
// Browserify will provide a Buffer implementation for browsers, which is
// an augmented Uint8Array (i.e., can be used as either Buffer or U8).
exports.nodebuffer = typeof Buffer !== "undefined";
// contains true if JSZip can read/generate Uint8Array, false otherwise.
exports.uint8array = typeof Uint8Array !== "undefined";

if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
}
else {
    var buffer = new ArrayBuffer(0);
    try {
        exports.blob = new Blob([buffer], {
            type: "application/zip"
        }).size === 0;
    }
    catch (e) {
        try {
            var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            exports.blob = builder.getBlob('application/zip').size === 0;
        }
        catch (e) {
            exports.blob = false;
        }
    }
}

}).call(this,(typeof Buffer !== "undefined" ? Buffer : undefined))
},{}],18:[function(_dereq_,module,exports){
'use strict';
var DataReader = _dereq_('./dataReader');

function Uint8ArrayReader(data) {
    if (data) {
        this.data = data;
        this.length = this.data.length;
        this.index = 0;
    }
}
Uint8ArrayReader.prototype = new DataReader();
/**
 * @see DataReader.byteAt
 */
Uint8ArrayReader.prototype.byteAt = function(i) {
    return this.data[i];
};
/**
 * @see DataReader.lastIndexOfSignature
 */
Uint8ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4; i >= 0; --i) {
        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
            return i;
        }
    }

    return -1;
};
/**
 * @see DataReader.readData
 */
Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
        return new Uint8Array(0);
    }
    var result = this.data.subarray(this.index, this.index + size);
    this.index += size;
    return result;
};
module.exports = Uint8ArrayReader;

},{"./dataReader":5}],19:[function(_dereq_,module,exports){
'use strict';

var utils = _dereq_('./utils');

/**
 * An object to write any content to an Uint8Array.
 * @constructor
 * @param {number} length The length of the array.
 */
var Uint8ArrayWriter = function(length) {
    this.data = new Uint8Array(length);
    this.index = 0;
};
Uint8ArrayWriter.prototype = {
    /**
     * Append any content to the current array.
     * @param {Object} input the content to add.
     */
    append: function(input) {
        if (input.length !== 0) {
            // with an empty Uint8Array, Opera fails with a "Offset larger than array size"
            input = utils.transformTo("uint8array", input);
            this.data.set(input, this.index);
            this.index += input.length;
        }
    },
    /**
     * Finalize the construction an return the result.
     * @return {Uint8Array} the generated array.
     */
    finalize: function() {
        return this.data;
    }
};

module.exports = Uint8ArrayWriter;

},{"./utils":21}],20:[function(_dereq_,module,exports){
'use strict';

var utils = _dereq_('./utils');
var support = _dereq_('./support');
var nodeBuffer = _dereq_('./nodeBuffer');

/**
 * The following functions come from pako, from pako/lib/utils/strings
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new Array(256);
for (var i=0; i<256; i++) {
  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start

// convert string to array (typed, when possible)
var string2buf = function (str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

    // count binary size
    for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if (((c & 0xfc00) === 0xd800) && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        buf_len += (c < 0x80) ? 1 : ((c < 0x800) ? 2 : ((c < 0x10000) ? 3 : 4));
    }

    // allocate buffer
    if (support.uint8array) {
        buf = new Uint8Array(buf_len);
    } else {
        buf = new Array(buf_len);
    }

    // convert
    for (i=0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        if (c < 0x80) {
            /* one byte */
            buf[i++] = c;
        } else if (c < 0x800) {
            /* two bytes */
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
        } else if (c < 0x10000) {
            /* three bytes */
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | ((c >>> 6) & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        } else {
            /* four bytes */
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | ((c >>> 12) & 0x3f);
            buf[i++] = 0x80 | ((c >>> 6) & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        }
    }

    return buf;
};

// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
var utf8border = function(buf, max) {
    var pos;

    max = max || buf.length;
    if (max > buf.length) { max = buf.length; }

    // go back from last position, until start of sequence found
    pos = max-1;
    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

    // Fuckup - very small and broken sequence,
    // return max, because we should return something anyway.
    if (pos < 0) { return max; }

    // If we came to start of buffer - that means vuffer is too small,
    // return max too.
    if (pos === 0) { return max; }

    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

// convert array to string
var buf2string = function (buf) {
    var str, i, out, c, c_len;
    var len = buf.length;

    // Reserve max possible length (2 words per char)
    // NB: by unknown reasons, Array is significantly faster for
    //     String.fromCharCode.apply than Uint16Array.
    var utf16buf = new Array(len*2);

    for (out=0, i=0; i<len;) {
        c = buf[i++];
        // quick process ascii
        if (c < 0x80) { utf16buf[out++] = c; continue; }

        c_len = _utf8len[c];
        // skip 5 & 6 byte codes
        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

        // apply mask on first byte
        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
        // join the rest
        while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
        }

        // terminated by end of string?
        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

        if (c < 0x10000) {
            utf16buf[out++] = c;
        } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
        }
    }

    // shrinkBuf(utf16buf, out)
    if (utf16buf.length !== out) {
        if(utf16buf.subarray) {
            utf16buf = utf16buf.subarray(0, out);
        } else {
            utf16buf.length = out;
        }
    }

    // return String.fromCharCode.apply(null, utf16buf);
    return utils.applyFromCharCode(utf16buf);
};


// That's all for the pako functions.


/**
 * Transform a javascript string into an array (typed if possible) of bytes,
 * UTF-8 encoded.
 * @param {String} str the string to encode
 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
 */
exports.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
        return nodeBuffer(str, "utf-8");
    }

    return string2buf(str);
};


/**
 * Transform a bytes array (or a representation) representing an UTF-8 encoded
 * string into a javascript string.
 * @param {Array|Uint8Array|Buffer} buf the data de decode
 * @return {String} the decoded string.
 */
exports.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
        return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }

    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

    // return buf2string(buf);
    // Chrome prefers to work with "small" chunks of data
    // for the method buf2string.
    // Firefox and Chrome has their own shortcut, IE doesn't seem to really care.
    var result = [], k = 0, len = buf.length, chunk = 65536;
    while (k < len) {
        var nextBoundary = utf8border(buf, Math.min(k + chunk, len));
        if (support.uint8array) {
            result.push(buf2string(buf.subarray(k, nextBoundary)));
        } else {
            result.push(buf2string(buf.slice(k, nextBoundary)));
        }
        k = nextBoundary;
    }
    return result.join("");

};
// vim: set shiftwidth=4 softtabstop=4:

},{"./nodeBuffer":11,"./support":17,"./utils":21}],21:[function(_dereq_,module,exports){
'use strict';
var support = _dereq_('./support');
var compressions = _dereq_('./compressions');
var nodeBuffer = _dereq_('./nodeBuffer');
/**
 * Convert a string to a "binary string" : a string containing only char codes between 0 and 255.
 * @param {string} str the string to transform.
 * @return {String} the binary string.
 */
exports.string2binary = function(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) & 0xff);
    }
    return result;
};
exports.arrayBuffer2Blob = function(buffer) {
    exports.checkSupport("blob");

    try {
        // Blob constructor
        return new Blob([buffer], {
            type: "application/zip"
        });
    }
    catch (e) {

        try {
            // deprecated, browser only, old way
            var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            return builder.getBlob('application/zip');
        }
        catch (e) {

            // well, fuck ?!
            throw new Error("Bug : can't construct the Blob.");
        }
    }


};
/**
 * The identity function.
 * @param {Object} input the input.
 * @return {Object} the same input.
 */
function identity(input) {
    return input;
}

/**
 * Fill in an array with a string.
 * @param {String} str the string to use.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
 */
function stringToArrayLike(str, array) {
    for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 0xFF;
    }
    return array;
}

/**
 * Transform an array-like object to a string.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
 * @return {String} the result.
 */
function arrayLikeToString(array) {
    // Performances notes :
    // --------------------
    // String.fromCharCode.apply(null, array) is the fastest, see
    // see http://jsperf.com/converting-a-uint8array-to-a-string/2
    // but the stack is limited (and we can get huge arrays !).
    //
    // result += String.fromCharCode(array[i]); generate too many strings !
    //
    // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
    var chunk = 65536;
    var result = [],
        len = array.length,
        type = exports.getTypeOf(array),
        k = 0,
        canUseApply = true;
      try {
         switch(type) {
            case "uint8array":
               String.fromCharCode.apply(null, new Uint8Array(0));
               break;
            case "nodebuffer":
               String.fromCharCode.apply(null, nodeBuffer(0));
               break;
         }
      } catch(e) {
         canUseApply = false;
      }

      // no apply : slow and painful algorithm
      // default browser on android 4.*
      if (!canUseApply) {
         var resultStr = "";
         for(var i = 0; i < array.length;i++) {
            resultStr += String.fromCharCode(array[i]);
         }
    return resultStr;
    }
    while (k < len && chunk > 1) {
        try {
            if (type === "array" || type === "nodebuffer") {
                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
            }
            else {
                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
            }
            k += chunk;
        }
        catch (e) {
            chunk = Math.floor(chunk / 2);
        }
    }
    return result.join("");
}

exports.applyFromCharCode = arrayLikeToString;


/**
 * Copy the data from an array-like to an other array-like.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
 */
function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
}

// a matrix containing functions to transform everything into everything.
var transform = {};

// string to ?
transform["string"] = {
    "string": identity,
    "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": function(input) {
        return stringToArrayLike(input, nodeBuffer(input.length));
    }
};

// array to ?
transform["array"] = {
    "string": arrayLikeToString,
    "array": identity,
    "arraybuffer": function(input) {
        return (new Uint8Array(input)).buffer;
    },
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodeBuffer(input);
    }
};

// arraybuffer to ?
transform["arraybuffer"] = {
    "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
    },
    "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    "arraybuffer": identity,
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodeBuffer(new Uint8Array(input));
    }
};

// uint8array to ?
transform["uint8array"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return input.buffer;
    },
    "uint8array": identity,
    "nodebuffer": function(input) {
        return nodeBuffer(input);
    }
};

// nodebuffer to ?
transform["nodebuffer"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": identity
};

/**
 * Transform an input into any type.
 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
 * If no output type is specified, the unmodified input will be returned.
 * @param {String} outputType the output type.
 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
 * @throws {Error} an Error if the browser doesn't support the requested output type.
 */
exports.transformTo = function(outputType, input) {
    if (!input) {
        // undefined, null, etc
        // an empty string won't harm.
        input = "";
    }
    if (!outputType) {
        return input;
    }
    exports.checkSupport(outputType);
    var inputType = exports.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
};

/**
 * Return the type of the input.
 * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
 * @param {Object} input the input to identify.
 * @return {String} the (lowercase) type of the input.
 */
exports.getTypeOf = function(input) {
    if (typeof input === "string") {
        return "string";
    }
    if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
    }
    if (support.nodebuffer && nodeBuffer.test(input)) {
        return "nodebuffer";
    }
    if (support.uint8array && input instanceof Uint8Array) {
        return "uint8array";
    }
    if (support.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
    }
};

/**
 * Throw an exception if the type is not supported.
 * @param {String} type the type to check.
 * @throws {Error} an Error if the browser doesn't support the requested type.
 */
exports.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
        throw new Error(type + " is not supported by this browser");
    }
};
exports.MAX_VALUE_16BITS = 65535;
exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

/**
 * Prettify a string read as binary.
 * @param {string} str the string to prettify.
 * @return {string} a pretty string.
 */
exports.pretty = function(str) {
    var res = '',
        code, i;
    for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
};

/**
 * Find a compression registered in JSZip.
 * @param {string} compressionMethod the method magic to find.
 * @return {Object|null} the JSZip compression object, null if none found.
 */
exports.findCompression = function(compressionMethod) {
    for (var method in compressions) {
        if (!compressions.hasOwnProperty(method)) {
            continue;
        }
        if (compressions[method].magic === compressionMethod) {
            return compressions[method];
        }
    }
    return null;
};
/**
* Cross-window, cross-Node-context regular expression detection
* @param  {Object}  object Anything
* @return {Boolean}        true if the object is a regular expression,
* false otherwise
*/
exports.isRegExp = function (object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
};


},{"./compressions":3,"./nodeBuffer":11,"./support":17}],22:[function(_dereq_,module,exports){
'use strict';
var StringReader = _dereq_('./stringReader');
var NodeBufferReader = _dereq_('./nodeBufferReader');
var Uint8ArrayReader = _dereq_('./uint8ArrayReader');
var utils = _dereq_('./utils');
var sig = _dereq_('./signature');
var ZipEntry = _dereq_('./zipEntry');
var support = _dereq_('./support');
var jszipProto = _dereq_('./object');
//  class ZipEntries {{{
/**
 * All the entries in the zip file.
 * @constructor
 * @param {String|ArrayBuffer|Uint8Array} data the binary stream to load.
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntries(data, loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
    if (data) {
        this.load(data);
    }
}
ZipEntries.prototype = {
    /**
     * Check that the reader is on the speficied signature.
     * @param {string} expectedSignature the expected signature.
     * @throws {Error} if it is an other signature.
     */
    checkSignature: function(expectedSignature) {
        var signature = this.reader.readString(4);
        if (signature !== expectedSignature) {
            throw new Error("Corrupted zip or bug : unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
        }
    },
    /**
     * Read the end of the central directory.
     */
    readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2);
        this.diskWithCentralDirStart = this.reader.readInt(2);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
        this.centralDirRecords = this.reader.readInt(2);
        this.centralDirSize = this.reader.readInt(4);
        this.centralDirOffset = this.reader.readInt(4);

        this.zipCommentLength = this.reader.readInt(2);
        // warning : the encoding depends of the system locale
        // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
        // On a windows machine, this field is encoded with the localized windows code page.
        this.zipComment = this.reader.readString(this.zipCommentLength);
        // To get consistent behavior with the generation part, we will assume that
        // this is utf8 encoded.
        this.zipComment = jszipProto.utf8decode(this.zipComment);
    },
    /**
     * Read the end of the Zip 64 central directory.
     * Not merged with the method readEndOfCentral :
     * The end of central can coexist with its Zip64 brother,
     * I don't want to read the wrong number of bytes !
     */
    readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8);
        this.versionMadeBy = this.reader.readString(2);
        this.versionNeeded = this.reader.readInt(2);
        this.diskNumber = this.reader.readInt(4);
        this.diskWithCentralDirStart = this.reader.readInt(4);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
        this.centralDirRecords = this.reader.readInt(8);
        this.centralDirSize = this.reader.readInt(8);
        this.centralDirOffset = this.reader.readInt(8);

        this.zip64ExtensibleData = {};
        var extraDataSize = this.zip64EndOfCentralSize - 44,
            index = 0,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;
        while (index < extraDataSize) {
            extraFieldId = this.reader.readInt(2);
            extraFieldLength = this.reader.readInt(4);
            extraFieldValue = this.reader.readString(extraFieldLength);
            this.zip64ExtensibleData[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Read the end of the Zip 64 central directory locator.
     */
    readBlockZip64EndOfCentralLocator: function() {
        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
        this.disksCount = this.reader.readInt(4);
        if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported");
        }
    },
    /**
     * Read the local files, based on the offset read in the central part.
     */
    readLocalFiles: function() {
        var i, file;
        for (i = 0; i < this.files.length; i++) {
            file = this.files[i];
            this.reader.setIndex(file.localHeaderOffset);
            this.checkSignature(sig.LOCAL_FILE_HEADER);
            file.readLocalPart(this.reader);
            file.handleUTF8();
        }
    },
    /**
     * Read the central directory.
     */
    readCentralDir: function() {
        var file;

        this.reader.setIndex(this.centralDirOffset);
        while (this.reader.readString(4) === sig.CENTRAL_FILE_HEADER) {
            file = new ZipEntry({
                zip64: this.zip64
            }, this.loadOptions);
            file.readCentralPart(this.reader);
            this.files.push(file);
        }
    },
    /**
     * Read the end of central directory.
     */
    readEndOfCentral: function() {
        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
        if (offset === -1) {
            throw new Error("Corrupted zip : can't find end of central directory");
        }
        this.reader.setIndex(offset);
        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
        this.readBlockEndOfCentral();


        /* extract from the zip spec :
            4)  If one of the fields in the end of central directory
                record is too small to hold required data, the field
                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                ZIP64 format record should be created.
            5)  The end of central directory record and the
                Zip64 end of central directory locator record must
                reside on the same disk when splitting or spanning
                an archive.
         */
        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
            this.zip64 = true;

            /*
            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
            the zip file can fit into a 32bits integer. This cannot be solved : Javascript represents
            all numbers as 64-bit double precision IEEE 754 floating point numbers.
            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
            */

            // should look for a zip64 EOCD locator
            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (offset === -1) {
                throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
            }
            this.reader.setIndex(offset);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();

            // now the zip64 EOCD record
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral();
        }
    },
    prepareReader: function(data) {
        var type = utils.getTypeOf(data);
        if (type === "string" && !support.uint8array) {
            this.reader = new StringReader(data, this.loadOptions.optimizedBinaryString);
        }
        else if (type === "nodebuffer") {
            this.reader = new NodeBufferReader(data);
        }
        else {
            this.reader = new Uint8ArrayReader(utils.transformTo("uint8array", data));
        }
    },
    /**
     * Read a zip file and create ZipEntries.
     * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
     */
    load: function(data) {
        this.prepareReader(data);
        this.readEndOfCentral();
        this.readCentralDir();
        this.readLocalFiles();
    }
};
// }}} end of ZipEntries
module.exports = ZipEntries;

},{"./nodeBufferReader":12,"./object":13,"./signature":14,"./stringReader":15,"./support":17,"./uint8ArrayReader":18,"./utils":21,"./zipEntry":23}],23:[function(_dereq_,module,exports){
'use strict';
var StringReader = _dereq_('./stringReader');
var utils = _dereq_('./utils');
var CompressedObject = _dereq_('./compressedObject');
var jszipProto = _dereq_('./object');
// class ZipEntry {{{
/**
 * An entry in the zip file.
 * @constructor
 * @param {Object} options Options of the current file.
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
}
ZipEntry.prototype = {
    /**
     * say if the file is encrypted.
     * @return {boolean} true if the file is encrypted, false otherwise.
     */
    isEncrypted: function() {
        // bit 1 is set
        return (this.bitFlag & 0x0001) === 0x0001;
    },
    /**
     * say if the file has utf-8 filename/comment.
     * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
     */
    useUTF8: function() {
        // bit 11 is set
        return (this.bitFlag & 0x0800) === 0x0800;
    },
    /**
     * Prepare the function used to generate the compressed content from this ZipFile.
     * @param {DataReader} reader the reader to use.
     * @param {number} from the offset from where we should read the data.
     * @param {number} length the length of the data to read.
     * @return {Function} the callback to get the compressed content (the type depends of the DataReader class).
     */
    prepareCompressedContent: function(reader, from, length) {
        return function() {
            var previousIndex = reader.index;
            reader.setIndex(from);
            var compressedFileData = reader.readData(length);
            reader.setIndex(previousIndex);

            return compressedFileData;
        };
    },
    /**
     * Prepare the function used to generate the uncompressed content from this ZipFile.
     * @param {DataReader} reader the reader to use.
     * @param {number} from the offset from where we should read the data.
     * @param {number} length the length of the data to read.
     * @param {JSZip.compression} compression the compression used on this file.
     * @param {number} uncompressedSize the uncompressed size to expect.
     * @return {Function} the callback to get the uncompressed content (the type depends of the DataReader class).
     */
    prepareContent: function(reader, from, length, compression, uncompressedSize) {
        return function() {

            var compressedFileData = utils.transformTo(compression.uncompressInputType, this.getCompressedContent());
            var uncompressedFileData = compression.uncompress(compressedFileData);

            if (uncompressedFileData.length !== uncompressedSize) {
                throw new Error("Bug : uncompressed data size mismatch");
            }

            return uncompressedFileData;
        };
    },
    /**
     * Read the local part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readLocalPart: function(reader) {
        var compression, localExtraFieldsLength;

        // we already know everything from the central dir !
        // If the central dir data are false, we are doomed.
        // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
        // The less data we get here, the more reliable this should be.
        // Let's skip the whole header and dash to the data !
        reader.skip(22);
        // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
        // Strangely, the filename here is OK.
        // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
        // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
        // Search "unzip mismatching "local" filename continuing with "central" filename version" on
        // the internet.
        //
        // I think I see the logic here : the central directory is used to display
        // content and the local directory is used to extract the files. Mixing / and \
        // may be used to display \ to windows users and use / when extracting the files.
        // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
        this.fileNameLength = reader.readInt(2);
        localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
        this.fileName = reader.readString(this.fileNameLength);
        reader.skip(localExtraFieldsLength);

        if (this.compressedSize == -1 || this.uncompressedSize == -1) {
            throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize == -1 || uncompressedSize == -1)");
        }

        compression = utils.findCompression(this.compressionMethod);
        if (compression === null) { // no compression found
            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName + ")");
        }
        this.decompressed = new CompressedObject();
        this.decompressed.compressedSize = this.compressedSize;
        this.decompressed.uncompressedSize = this.uncompressedSize;
        this.decompressed.crc32 = this.crc32;
        this.decompressed.compressionMethod = this.compressionMethod;
        this.decompressed.getCompressedContent = this.prepareCompressedContent(reader, reader.index, this.compressedSize, compression);
        this.decompressed.getContent = this.prepareContent(reader, reader.index, this.compressedSize, compression, this.uncompressedSize);

        // we need to compute the crc32...
        if (this.loadOptions.checkCRC32) {
            this.decompressed = utils.transformTo("string", this.decompressed.getContent());
            if (jszipProto.crc32(this.decompressed) !== this.crc32) {
                throw new Error("Corrupted zip : CRC32 mismatch");
            }
        }
    },

    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readCentralPart: function(reader) {
        this.versionMadeBy = reader.readString(2);
        this.versionNeeded = reader.readInt(2);
        this.bitFlag = reader.readInt(2);
        this.compressionMethod = reader.readString(2);
        this.date = reader.readDate();
        this.crc32 = reader.readInt(4);
        this.compressedSize = reader.readInt(4);
        this.uncompressedSize = reader.readInt(4);
        this.fileNameLength = reader.readInt(2);
        this.extraFieldsLength = reader.readInt(2);
        this.fileCommentLength = reader.readInt(2);
        this.diskNumberStart = reader.readInt(2);
        this.internalFileAttributes = reader.readInt(2);
        this.externalFileAttributes = reader.readInt(4);
        this.localHeaderOffset = reader.readInt(4);

        if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported");
        }

        this.fileName = reader.readString(this.fileNameLength);
        this.readExtraFields(reader);
        this.parseZIP64ExtraField(reader);
        this.fileComment = reader.readString(this.fileCommentLength);

        // warning, this is true only for zip with madeBy == DOS (plateform dependent feature)
        this.dir = this.externalFileAttributes & 0x00000010 ? true : false;
    },
    /**
     * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
     * @param {DataReader} reader the reader to use.
     */
    parseZIP64ExtraField: function(reader) {

        if (!this.extraFields[0x0001]) {
            return;
        }

        // should be something, preparing the extra reader
        var extraReader = new StringReader(this.extraFields[0x0001].value);

        // I really hope that these 64bits integer can fit in 32 bits integer, because js
        // won't let us have more.
        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
            this.uncompressedSize = extraReader.readInt(8);
        }
        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
            this.compressedSize = extraReader.readInt(8);
        }
        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
            this.localHeaderOffset = extraReader.readInt(8);
        }
        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
            this.diskNumberStart = extraReader.readInt(4);
        }
    },
    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readExtraFields: function(reader) {
        var start = reader.index,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;

        this.extraFields = this.extraFields || {};

        while (reader.index < start + this.extraFieldsLength) {
            extraFieldId = reader.readInt(2);
            extraFieldLength = reader.readInt(2);
            extraFieldValue = reader.readString(extraFieldLength);

            this.extraFields[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Apply an UTF8 transformation if needed.
     */
    handleUTF8: function() {
        if (this.useUTF8()) {
            this.fileName = jszipProto.utf8decode(this.fileName);
            this.fileComment = jszipProto.utf8decode(this.fileComment);
        } else {
            var upath = this.findExtraFieldUnicodePath();
            if (upath !== null) {
                this.fileName = upath;
            }
            var ucomment = this.findExtraFieldUnicodeComment();
            if (ucomment !== null) {
                this.fileComment = ucomment;
            }
        }
    },

    /**
     * Find the unicode path declared in the extra field, if any.
     * @return {String} the unicode path, null otherwise.
     */
    findExtraFieldUnicodePath: function() {
        var upathField = this.extraFields[0x7075];
        if (upathField) {
            var extraReader = new StringReader(upathField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the filename changed, this field is out of date.
            if (jszipProto.crc32(this.fileName) !== extraReader.readInt(4)) {
                return null;
            }

            return jszipProto.utf8decode(extraReader.readString(upathField.length - 5));
        }
        return null;
    },

    /**
     * Find the unicode comment declared in the extra field, if any.
     * @return {String} the unicode comment, null otherwise.
     */
    findExtraFieldUnicodeComment: function() {
        var ucommentField = this.extraFields[0x6375];
        if (ucommentField) {
            var extraReader = new StringReader(ucommentField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the comment changed, this field is out of date.
            if (jszipProto.crc32(this.fileComment) !== extraReader.readInt(4)) {
                return null;
            }

            return jszipProto.utf8decode(extraReader.readString(ucommentField.length - 5));
        }
        return null;
    }
};
module.exports = ZipEntry;

},{"./compressedObject":2,"./object":13,"./stringReader":15,"./utils":21}],24:[function(_dereq_,module,exports){
// Top level file is just a mixin of submodules & constants
'use strict';

var assign    = _dereq_('./lib/utils/common').assign;

var deflate   = _dereq_('./lib/deflate');
var inflate   = _dereq_('./lib/inflate');
var constants = _dereq_('./lib/zlib/constants');

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;
},{"./lib/deflate":25,"./lib/inflate":26,"./lib/utils/common":27,"./lib/zlib/constants":30}],25:[function(_dereq_,module,exports){
'use strict';


var zlib_deflate = _dereq_('./zlib/deflate.js');
var utils = _dereq_('./utils/common');
var strings = _dereq_('./utils/strings');
var msg = _dereq_('./zlib/messages');
var zstream = _dereq_('./zlib/zstream');


/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overriden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
var Deflate = function(options) {

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new zstream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }
};

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|String): input data. Strings will be converted to
 *   utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That flush internal pending buffers and call
 * [[Deflate#onEnd]].
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function(data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && _mode === Z_FINISH)) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that input stream complete
 * or error happenned. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function(status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate alrorythm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;
},{"./utils/common":27,"./utils/strings":28,"./zlib/deflate.js":32,"./zlib/messages":37,"./zlib/zstream":39}],26:[function(_dereq_,module,exports){
'use strict';


var zlib_inflate = _dereq_('./zlib/inflate.js');
var utils = _dereq_('./utils/common');
var strings = _dereq_('./utils/strings');
var c = _dereq_('./zlib/constants');
var msg = _dereq_('./zlib/messages');
var zstream = _dereq_('./zlib/zstream');
var gzheader = _dereq_('./zlib/gzheader');


/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overriden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
var Inflate = function(options) {

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new zstream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new gzheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
};

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That flush internal pending buffers and call
 * [[Inflate#onEnd]].
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function(data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && _mode === c.Z_FINISH)) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }
  } while ((strm.avail_in > 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }
  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell inflate that input stream complete
 * or error happenned. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function(status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 alligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;

},{"./utils/common":27,"./utils/strings":28,"./zlib/constants":30,"./zlib/gzheader":33,"./zlib/inflate.js":35,"./zlib/messages":37,"./zlib/zstream":39}],27:[function(_dereq_,module,exports){
'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');


exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof(source) !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs+len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for(var i=0; i<len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i=0, l=chunks.length; i<l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i=0, l=chunks.length; i<l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for(var i=0; i<len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);
},{}],28:[function(_dereq_,module,exports){
// String encode/decode helpers
'use strict';


var utils = _dereq_('./common');


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safary
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [0]); } catch(__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch(__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var i=0; i<256; i++) {
  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
      c2 = str.charCodeAt(m_pos+1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i=0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
      c2 = str.charCodeAt(m_pos+1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for(var i=0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function(buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function(str) {
  var buf = new utils.Buf8(str.length);
  for(var i=0, len=buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len*2);

  for (out=0, i=0; i<len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function(buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max-1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means vuffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

},{"./common":27}],29:[function(_dereq_,module,exports){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0
    , s2 = ((adler >>> 16) & 0xffff) |0
    , n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;
},{}],30:[function(_dereq_,module,exports){
module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
},{}],31:[function(_dereq_,module,exports){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.


// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for(var n =0; n < 256; n++){
    c = n;
    for(var k =0; k < 8; k++){
      c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable
    , end = pos + len;

  crc = crc ^ (-1);

  for (var i = pos; i < end; i++ ) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;
},{}],32:[function(_dereq_,module,exports){
'use strict';

var utils   = _dereq_('../utils/common');
var trees   = _dereq_('./trees');
var adler32 = _dereq_('./adler32');
var crc32   = _dereq_('./crc32');
var msg   = _dereq_('./messages');

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2*L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only (s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH-1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH-1)) ? s.strstart : MIN_MATCH-1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH-1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size-MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH-1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1- s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length-1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH-1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart-1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart-1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH-1 ? s.strstart : MIN_MATCH-1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
var Config = function (good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
};

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2*D_CODES+1) * 2);
  this.bl_tree    = new utils.Buf16((2*BL_CODES+1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS+1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2*L_CODES+1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2*L_CODES+1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  s.d_buf = s.lit_bufsize >> 1;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg){
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}

/* =========================================================================
 * Copy the source state to the destination state
 */
//function deflateCopy(dest, source) {
//
//}

exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/
},{"../utils/common":27,"./adler32":29,"./crc32":31,"./messages":37,"./trees":38}],33:[function(_dereq_,module,exports){
'use strict';


function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;
},{}],34:[function(_dereq_,module,exports){
'use strict';

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  var window;                 /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},{}],35:[function(_dereq_,module,exports){
'use strict';


var utils = _dereq_('../utils/common');
var adler32 = _dereq_('./adler32');
var crc32   = _dereq_('./crc32');
var inflate_fast = _dereq_('./inffast');
var inflate_table = _dereq_('./inftrees');

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function ZSWAP32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, {bits: 9});

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, {bits: 5});

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window,src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window,src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window,src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
    case HEAD:
      if (state.wrap === 0) {
        state.mode = TYPEDO;
        break;
      }
      //=== NEEDBITS(16);
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//

        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = FLAGS;
        break;
      }
      state.flags = 0;           /* expect zlib header */
      if (state.head) {
        state.head.done = false;
      }
      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
        strm.msg = 'incorrect header check';
        state.mode = BAD;
        break;
      }
      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
      len = (hold & 0x0f)/*BITS(4)*/ + 8;
      if (state.wbits === 0) {
        state.wbits = len;
      }
      else if (len > state.wbits) {
        strm.msg = 'invalid window size';
        state.mode = BAD;
        break;
      }
      state.dmax = 1 << len;
      //Tracev((stderr, "inflate:   zlib header ok\n"));
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = hold & 0x200 ? DICTID : TYPE;
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      break;
    case FLAGS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.flags = hold;
      if ((state.flags & 0xff) !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      if (state.flags & 0xe000) {
        strm.msg = 'unknown header flags set';
        state.mode = BAD;
        break;
      }
      if (state.head) {
        state.head.text = ((hold >> 8) & 1);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = TIME;
      /* falls through */
    case TIME:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.time = hold;
      }
      if (state.flags & 0x0200) {
        //=== CRC4(state.check, hold)
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        hbuf[2] = (hold >>> 16) & 0xff;
        hbuf[3] = (hold >>> 24) & 0xff;
        state.check = crc32(state.check, hbuf, 4, 0);
        //===
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = OS;
      /* falls through */
    case OS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.xflags = (hold & 0xff);
        state.head.os = (hold >> 8);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = EXLEN;
      /* falls through */
    case EXLEN:
      if (state.flags & 0x0400) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length = hold;
        if (state.head) {
          state.head.extra_len = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      else if (state.head) {
        state.head.extra = null/*Z_NULL*/;
      }
      state.mode = EXTRA;
      /* falls through */
    case EXTRA:
      if (state.flags & 0x0400) {
        copy = state.length;
        if (copy > have) { copy = have; }
        if (copy) {
          if (state.head) {
            len = state.head.extra_len - state.length;
            if (!state.head.extra) {
              // Use untyped array for more conveniend processing later
              state.head.extra = new Array(state.head.extra_len);
            }
            utils.arraySet(
              state.head.extra,
              input,
              next,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len
            );
            //zmemcpy(state.head.extra + len, next,
            //        len + copy > state.head.extra_max ?
            //        state.head.extra_max - len : copy);
          }
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          state.length -= copy;
        }
        if (state.length) { break inf_leave; }
      }
      state.length = 0;
      state.mode = NAME;
      /* falls through */
    case NAME:
      if (state.flags & 0x0800) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          // TODO: 2 or 1 bytes?
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/)) {
            state.head.name += String.fromCharCode(len);
          }
        } while (len && copy < have);

        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.name = null;
      }
      state.length = 0;
      state.mode = COMMENT;
      /* falls through */
    case COMMENT:
      if (state.flags & 0x1000) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/)) {
            state.head.comment += String.fromCharCode(len);
          }
        } while (len && copy < have);
        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.comment = null;
      }
      state.mode = HCRC;
      /* falls through */
    case HCRC:
      if (state.flags & 0x0200) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.check & 0xffff)) {
          strm.msg = 'header crc mismatch';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      if (state.head) {
        state.head.hcrc = ((state.flags >> 9) & 1);
        state.head.done = true;
      }
      strm.adler = state.check = 0 /*crc32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      break;
    case DICTID:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      strm.adler = state.check = ZSWAP32(hold);
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = DICT;
      /* falls through */
    case DICT:
      if (state.havedict === 0) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        return Z_NEED_DICT;
      }
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      /* falls through */
    case TYPE:
      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case TYPEDO:
      if (state.last) {
        //--- BYTEBITS() ---//
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        state.mode = CHECK;
        break;
      }
      //=== NEEDBITS(3); */
      while (bits < 3) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.last = (hold & 0x01)/*BITS(1)*/;
      //--- DROPBITS(1) ---//
      hold >>>= 1;
      bits -= 1;
      //---//

      switch ((hold & 0x03)/*BITS(2)*/) {
      case 0:                             /* stored block */
        //Tracev((stderr, "inflate:     stored block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = STORED;
        break;
      case 1:                             /* fixed block */
        fixedtables(state);
        //Tracev((stderr, "inflate:     fixed codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = LEN_;             /* decode codes */
        if (flush === Z_TREES) {
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break inf_leave;
        }
        break;
      case 2:                             /* dynamic block */
        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = TABLE;
        break;
      case 3:
        strm.msg = 'invalid block type';
        state.mode = BAD;
      }
      //--- DROPBITS(2) ---//
      hold >>>= 2;
      bits -= 2;
      //---//
      break;
    case STORED:
      //--- BYTEBITS() ---// /* go to byte boundary */
      hold >>>= bits & 7;
      bits -= bits & 7;
      //---//
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
        strm.msg = 'invalid stored block lengths';
        state.mode = BAD;
        break;
      }
      state.length = hold & 0xffff;
      //Tracev((stderr, "inflate:       stored length %u\n",
      //        state.length));
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = COPY_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case COPY_:
      state.mode = COPY;
      /* falls through */
    case COPY:
      copy = state.length;
      if (copy) {
        if (copy > have) { copy = have; }
        if (copy > left) { copy = left; }
        if (copy === 0) { break inf_leave; }
        //--- zmemcpy(put, next, copy); ---
        utils.arraySet(output, input, next, copy, put);
        //---//
        have -= copy;
        next += copy;
        left -= copy;
        put += copy;
        state.length -= copy;
        break;
      }
      //Tracev((stderr, "inflate:       stored end\n"));
      state.mode = TYPE;
      break;
    case TABLE:
      //=== NEEDBITS(14); */
      while (bits < 14) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
//#ifndef PKZIP_BUG_WORKAROUND
      if (state.nlen > 286 || state.ndist > 30) {
        strm.msg = 'too many length or distance symbols';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracev((stderr, "inflate:       table sizes ok\n"));
      state.have = 0;
      state.mode = LENLENS;
      /* falls through */
    case LENLENS:
      while (state.have < state.ncode) {
        //=== NEEDBITS(3);
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
        //--- DROPBITS(3) ---//
        hold >>>= 3;
        bits -= 3;
        //---//
      }
      while (state.have < 19) {
        state.lens[order[state.have++]] = 0;
      }
      // We have separate tables & no pointers. 2 commented lines below not needed.
      //state.next = state.codes;
      //state.lencode = state.next;
      // Switch to use dynamic table
      state.lencode = state.lendyn;
      state.lenbits = 7;

      opts = {bits: state.lenbits};
      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
      state.lenbits = opts.bits;

      if (ret) {
        strm.msg = 'invalid code lengths set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, "inflate:       code lengths ok\n"));
      state.have = 0;
      state.mode = CODELENS;
      /* falls through */
    case CODELENS:
      while (state.have < state.nlen + state.ndist) {
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_val < 16) {
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.lens[state.have++] = here_val;
        }
        else {
          if (here_val === 16) {
            //=== NEEDBITS(here.bits + 2);
            n = here_bits + 2;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            if (state.have === 0) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            len = state.lens[state.have - 1];
            copy = 3 + (hold & 0x03);//BITS(2);
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
          }
          else if (here_val === 17) {
            //=== NEEDBITS(here.bits + 3);
            n = here_bits + 3;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 3 + (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          else {
            //=== NEEDBITS(here.bits + 7);
            n = here_bits + 7;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 11 + (hold & 0x7f);//BITS(7);
            //--- DROPBITS(7) ---//
            hold >>>= 7;
            bits -= 7;
            //---//
          }
          if (state.have + copy > state.nlen + state.ndist) {
            strm.msg = 'invalid bit length repeat';
            state.mode = BAD;
            break;
          }
          while (copy--) {
            state.lens[state.have++] = len;
          }
        }
      }

      /* handle error breaks in while */
      if (state.mode === BAD) { break; }

      /* check for end-of-block code (better have one) */
      if (state.lens[256] === 0) {
        strm.msg = 'invalid code -- missing end-of-block';
        state.mode = BAD;
        break;
      }

      /* build code tables -- note: do not change the lenbits or distbits
         values here (9 and 6) without reading the comments in inftrees.h
         concerning the ENOUGH constants, which depend on those values */
      state.lenbits = 9;

      opts = {bits: state.lenbits};
      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.lenbits = opts.bits;
      // state.lencode = state.next;

      if (ret) {
        strm.msg = 'invalid literal/lengths set';
        state.mode = BAD;
        break;
      }

      state.distbits = 6;
      //state.distcode.copy(state.codes);
      // Switch to use dynamic table
      state.distcode = state.distdyn;
      opts = {bits: state.distbits};
      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.distbits = opts.bits;
      // state.distcode = state.next;

      if (ret) {
        strm.msg = 'invalid distances set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, 'inflate:       codes ok\n'));
      state.mode = LEN_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case LEN_:
      state.mode = LEN;
      /* falls through */
    case LEN:
      if (have >= 6 && left >= 258) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        inflate_fast(strm, _out);
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        if (state.mode === TYPE) {
          state.back = -1;
        }
        break;
      }
      state.back = 0;
      for (;;) {
        here = state.lencode[hold & ((1 << state.lenbits) -1)];  /*BITS(state.lenbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if (here_bits <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if (here_op && (here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.lencode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      state.length = here_val;
      if (here_op === 0) {
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        state.mode = LIT;
        break;
      }
      if (here_op & 32) {
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.back = -1;
        state.mode = TYPE;
        break;
      }
      if (here_op & 64) {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break;
      }
      state.extra = here_op & 15;
      state.mode = LENEXT;
      /* falls through */
    case LENEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
      //Tracevv((stderr, "inflate:         length %u\n", state.length));
      state.was = state.length;
      state.mode = DIST;
      /* falls through */
    case DIST:
      for (;;) {
        here = state.distcode[hold & ((1 << state.distbits) -1)];/*BITS(state.distbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if ((here_bits) <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if ((here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.distcode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      if (here_op & 64) {
        strm.msg = 'invalid distance code';
        state.mode = BAD;
        break;
      }
      state.offset = here_val;
      state.extra = (here_op) & 15;
      state.mode = DISTEXT;
      /* falls through */
    case DISTEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.offset += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
//#ifdef INFLATE_STRICT
      if (state.offset > state.dmax) {
        strm.msg = 'invalid distance too far back';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
      state.mode = MATCH;
      /* falls through */
    case MATCH:
      if (left === 0) { break inf_leave; }
      copy = _out - left;
      if (state.offset > copy) {         /* copy from window */
        copy = state.offset - copy;
        if (copy > state.whave) {
          if (state.sane) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
        }
        if (copy > state.wnext) {
          copy -= state.wnext;
          from = state.wsize - copy;
        }
        else {
          from = state.wnext - copy;
        }
        if (copy > state.length) { copy = state.length; }
        from_source = state.window;
      }
      else {                              /* copy from output */
        from_source = output;
        from = put - state.offset;
        copy = state.length;
      }
      if (copy > left) { copy = left; }
      left -= copy;
      state.length -= copy;
      do {
        output[put++] = from_source[from++];
      } while (--copy);
      if (state.length === 0) { state.mode = LEN; }
      break;
    case LIT:
      if (left === 0) { break inf_leave; }
      output[put++] = state.length;
      left--;
      state.mode = LEN;
      break;
    case CHECK:
      if (state.wrap) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          // Use '|' insdead of '+' to make sure that result is signed
          hold |= input[next++] << bits;
          bits += 8;
        }
        //===//
        _out -= left;
        strm.total_out += _out;
        state.total += _out;
        if (_out) {
          strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

        }
        _out = left;
        // NB: crc32 stored as signed 32-bit int, ZSWAP32 returns signed too
        if ((state.flags ? hold : ZSWAP32(hold)) !== state.check) {
          strm.msg = 'incorrect data check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   check matches trailer\n"));
      }
      state.mode = LENGTH;
      /* falls through */
    case LENGTH:
      if (state.wrap && state.flags) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.total & 0xffffffff)) {
          strm.msg = 'incorrect length check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   length matches trailer\n"));
      }
      state.mode = DONE;
      /* falls through */
    case DONE:
      ret = Z_STREAM_END;
      break inf_leave;
    case BAD:
      ret = Z_DATA_ERROR;
      break inf_leave;
    case MEM:
      return Z_MEM_ERROR;
    case SYNC:
      /* falls through */
    default:
      return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}


exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/
},{"../utils/common":27,"./adler32":29,"./crc32":31,"./inffast":34,"./inftrees":36}],36:[function(_dereq_,module,exports){
'use strict';


var utils = _dereq_('../utils/common');

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
      base = extra = work;    /* dummy value--not used */
      end = 19;
  } else if (type === LENS) {
      base = lbase;
      base_index -= 257;
      extra = lext;
      extra_index -= 257;
      end = 256;
  } else {                    /* DISTS */
      base = dbase;
      extra = dext;
      end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  var i=0;
  /* process all codes and make table entries */
  for (;;) {
    i++;
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

},{"../utils/common":27}],37:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  '2':    'need dictionary',     /* Z_NEED_DICT       2  */
  '1':    'stream end',          /* Z_STREAM_END      1  */
  '0':    '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};
},{}],38:[function(_dereq_,module,exports){
'use strict';


var utils = _dereq_('../utils/common');

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2*L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES+2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH-MIN_MATCH+1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


var StaticTreeDesc = function (static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
};


var static_l_desc;
var static_d_desc;
var static_bl_desc;


var TreeDesc = function(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
};



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short (s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c*2]/*.Code*/, tree[c*2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max]*2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max+1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n*2 +1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n*2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n-base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n*2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length-1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits+1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m*2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m*2 + 1]/*.Len*/)*tree[m*2]/*.Freq*/;
        tree[m*2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS+1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits-1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n*2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n*2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS+1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES-1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1<<extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length-1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0 ; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1<<extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for ( ; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1<<(extra_dbits[code]-7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n*2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n*2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n*2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n*2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES+1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n*2 + 1]/*.Len*/ = 5;
    static_dtree[n*2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS+1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc =new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n*2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n*2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n*2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK*2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n*2;
  var _m2 = m*2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j+1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx*2] << 8) | (s.pending_buf[s.d_buf + lx*2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code+LITERALS+1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n*2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node*2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n*2 + 1]/*.Dad*/ = tree[m*2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0*2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code+1)*2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n+1)*2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6*2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10*2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138*2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0*2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n+1)*2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count-3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count-3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count-11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES-1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex]*2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3*(max_blindex+1) + 5+5+4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes-257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes-1,   5);
  send_bits(s, blcodes-4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank]*2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes-1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes-1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n*2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK<<1)+(last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES<<1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len+3+7) >>> 3;
    static_lenb = (s.static_len+3+7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len+4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES<<1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES<<1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code+1, s.d_desc.max_code+1, max_blindex+1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc*2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc]+LITERALS+1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize-1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;
},{"../utils/common":27}],39:[function(_dereq_,module,exports){
'use strict';


function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;
},{}]},{},[9])
(9)
}));


/***/ }),

/***/ "?04c1":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?62fb":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?6e8d":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?e20e":
/*!************************!*\
  !*** stream (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?2b48":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);