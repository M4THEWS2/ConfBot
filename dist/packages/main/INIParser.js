"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.INIFile=void 0;exports.parse=parse;var _fs=require("fs");function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj;}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;},_typeof(obj);}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest();}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1;}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err;}finally{try{if(!_n&&null!=_i["return"]&&(_r=_i["return"](),Object(_r)!==_r))return;}finally{if(_d)throw _e;}}return _arr;}}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}function _createForOfIteratorHelper(o,allowArrayLike){var it=typeof Symbol!=="undefined"&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&typeof o.length==="number"){if(it)o=it;var i=0;var F=function F(){};return{s:F,n:function n(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]};},e:function e(_e2){throw _e2;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion=true,didErr=false,err;return{s:function s(){it=it.call(o);},n:function n(){var step=it.next();normalCompletion=step.done;return step;},e:function e(_e3){didErr=true;err=_e3;},f:function f(){try{if(!normalCompletion&&it["return"]!=null)it["return"]();}finally{if(didErr)throw err;}}};}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,_toPropertyKey(descriptor.key),descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{writable:false});return Constructor;}function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return _typeof(key)==="symbol"?key:String(key);}function _toPrimitive(input,hint){if(_typeof(input)!=="object"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||"default");if(_typeof(res)!=="object")return res;throw new TypeError("@@toPrimitive must return a primitive value.");}return(hint==="string"?String:Number)(input);}var INIFile=function(){function INIFile(sections){_classCallCheck(this,INIFile);this.sections=sections;}_createClass(INIFile,[{key:"getSection",value:function getSection(name){var _section$subsections;var section=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.sections.global;return(_section$subsections=section.subsections)===null||_section$subsections===void 0?void 0:_section$subsections[name];}},{key:"hasSection",value:function hasSection(name){var _section$subsections2;var section=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.sections.global;if((_section$subsections2=section.subsections)!==null&&_section$subsections2!==void 0&&_section$subsections2[name])return true;return false;}},{key:"getItem",value:function getItem(key){var _section$items;var section=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.sections.global;return(_section$items=section.items)===null||_section$items===void 0?void 0:_section$items[key];}},{key:"hasItem",value:function hasItem(key){var _section$items2;var section=arguments.length>1&&arguments[1]!==undefined?arguments[1]:this.sections.global;if((_section$items2=section.items)!==null&&_section$items2!==void 0&&_section$items2[key])return true;return false;}}]);return INIFile;}();exports.INIFile=INIFile;function parse(path){var fileLines=(0,_fs.readFileSync)(path,{encoding:"utf-8"}).split("\n");var sections={};sections.global={subsections:{}};var lastSection=sections.global;var _iterator=_createForOfIteratorHelper(fileLines),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var line=_step.value;line=line.trimStart().trimEnd();if(line.startsWith(";")||line.startsWith("#")||line=="")continue;if(line.startsWith("[")){if(!line.endsWith("]"))throw new Error("missing ']' in line: '".concat(line,"'"));line=line.trim().slice(1,-1);lastSection=sections.global;var _iterator2=_createForOfIteratorHelper(line.split(".")),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var section=_step2.value;if(!lastSection.subsections)lastSection.subsections={};if(!lastSection.subsections[section])lastSection.subsections[section]={};lastSection=lastSection.subsections[section];}}catch(err){_iterator2.e(err);}finally{_iterator2.f();}continue;}var _line$split=line.split("="),_line$split2=_slicedToArray(_line$split,2),_key=_line$split2[0],value=_line$split2[1];_key=_key.trimEnd();if(value==null)value="";else value=value.trimStart();if(!lastSection.items)lastSection.items={};lastSection.items[_key]=value;}}catch(err){_iterator.e(err);}finally{_iterator.f();}return new INIFile(sections);}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJTklGaWxlIiwic2VjdGlvbnMiLCJuYW1lIiwic2VjdGlvbiIsImdsb2JhbCIsInN1YnNlY3Rpb25zIiwia2V5IiwiaXRlbXMiLCJwYXJzZSIsInBhdGgiLCJmaWxlTGluZXMiLCJyZWFkRmlsZSIsImVuY29kaW5nIiwic3BsaXQiLCJsYXN0U2VjdGlvbiIsImxpbmUiLCJ0cmltU3RhcnQiLCJ0cmltRW5kIiwic3RhcnRzV2l0aCIsImVuZHNXaXRoIiwiRXJyb3IiLCJ0cmltIiwic2xpY2UiLCJ2YWx1ZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYWNrYWdlcy9tYWluL0lOSVBhcnNlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWFkRmlsZVN5bmMgYXMgcmVhZEZpbGUgfSBmcm9tIFwiZnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJdGVtcyB7XG5cdFtrZXk6IHN0cmluZyB8IHN5bWJvbF06IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWN0aW9uIHtcblx0aXRlbXM/OiBJdGVtcztcblx0c3Vic2VjdGlvbnM/OiBTZWN0aW9ucztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWN0aW9ucyB7XG5cdFtuYW1lOiBzdHJpbmddOiBTZWN0aW9uO1xufVxuXG5leHBvcnQgY2xhc3MgSU5JRmlsZSB7XG5cdHByaXZhdGUgcmVhZG9ubHkgc2VjdGlvbnM6IFNlY3Rpb25zO1xuXG5cdGNvbnN0cnVjdG9yKHNlY3Rpb25zOiBTZWN0aW9ucykge1xuXHRcdHRoaXMuc2VjdGlvbnMgPSBzZWN0aW9ucztcblx0fVxuXG5cdGdldFNlY3Rpb24obmFtZTogc3RyaW5nLCBzZWN0aW9uOiBTZWN0aW9uID0gdGhpcy5zZWN0aW9ucy5nbG9iYWwpOiBTZWN0aW9uIHwgdW5kZWZpbmVkIHtcblx0XHRyZXR1cm4gc2VjdGlvbi5zdWJzZWN0aW9ucz8uW25hbWVdO1xuXHR9XG5cblx0aGFzU2VjdGlvbihuYW1lOiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gPSB0aGlzLnNlY3Rpb25zLmdsb2JhbCk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuXHRcdGlmIChzZWN0aW9uLnN1YnNlY3Rpb25zPy5bbmFtZV0pIHJldHVybiB0cnVlO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGdldEl0ZW0oa2V5OiBzdHJpbmcsIHNlY3Rpb246IFNlY3Rpb24gPSB0aGlzLnNlY3Rpb25zLmdsb2JhbCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0cmV0dXJuIHNlY3Rpb24uaXRlbXM/LltrZXldO1xuXHR9XG5cblx0aGFzSXRlbShrZXk6IHN0cmluZywgc2VjdGlvbjogU2VjdGlvbiA9IHRoaXMuc2VjdGlvbnMuZ2xvYmFsKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKHNlY3Rpb24uaXRlbXM/LltrZXldKSByZXR1cm4gdHJ1ZTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHBhdGg6IHN0cmluZyk6IElOSUZpbGUge1xuXHRjb25zdCBmaWxlTGluZXM6IHN0cmluZ1tdID0gcmVhZEZpbGUocGF0aCwgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0pLnNwbGl0KFwiXFxuXCIpO1xuXG5cdGNvbnN0IHNlY3Rpb25zOiBTZWN0aW9ucyA9IHt9O1xuXHRzZWN0aW9ucy5nbG9iYWwgPSB7IHN1YnNlY3Rpb25zOiB7fSB9O1xuXG5cdGxldCBsYXN0U2VjdGlvbjogU2VjdGlvbiA9IHNlY3Rpb25zLmdsb2JhbDtcblx0Zm9yIChsZXQgbGluZSBvZiBmaWxlTGluZXMpIHtcblx0XHRsaW5lID0gbGluZS50cmltU3RhcnQoKS50cmltRW5kKCk7XG5cblx0XHRpZiAobGluZS5zdGFydHNXaXRoKFwiO1wiKSB8fCBsaW5lLnN0YXJ0c1dpdGgoXCIjXCIpIHx8IGxpbmUgPT0gXCJcIikgY29udGludWU7XG5cblx0XHRpZiAobGluZS5zdGFydHNXaXRoKFwiW1wiKSkge1xuXHRcdFx0aWYgKCFsaW5lLmVuZHNXaXRoKFwiXVwiKSkgdGhyb3cgbmV3IEVycm9yKGBtaXNzaW5nICddJyBpbiBsaW5lOiAnJHtsaW5lfSdgKTtcblxuXHRcdFx0bGluZSA9IGxpbmUudHJpbSgpLnNsaWNlKDEsIC0xKTtcblx0XHRcdGxhc3RTZWN0aW9uID0gc2VjdGlvbnMuZ2xvYmFsO1xuXG5cdFx0XHRmb3IgKGNvbnN0IHNlY3Rpb24gb2YgbGluZS5zcGxpdChcIi5cIikpIHtcblx0XHRcdFx0aWYgKCFsYXN0U2VjdGlvbi5zdWJzZWN0aW9ucykgbGFzdFNlY3Rpb24uc3Vic2VjdGlvbnMgPSB7fTtcblxuXHRcdFx0XHRpZiAoIWxhc3RTZWN0aW9uLnN1YnNlY3Rpb25zW3NlY3Rpb25dKSBsYXN0U2VjdGlvbi5zdWJzZWN0aW9uc1tzZWN0aW9uXSA9IHt9O1xuXG5cdFx0XHRcdGxhc3RTZWN0aW9uID0gbGFzdFNlY3Rpb24uc3Vic2VjdGlvbnNbc2VjdGlvbl07XG5cdFx0XHR9XG5cblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGxldCBba2V5LCB2YWx1ZV0gPSBsaW5lLnNwbGl0KFwiPVwiKTtcblxuXHRcdGtleSA9IGtleS50cmltRW5kKCk7XG5cblx0XHRpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSBcIlwiO1xuXHRcdGVsc2UgdmFsdWUgPSB2YWx1ZS50cmltU3RhcnQoKTtcblxuXHRcdGlmICghbGFzdFNlY3Rpb24uaXRlbXMpIGxhc3RTZWN0aW9uLml0ZW1zID0ge307XG5cblx0XHRsYXN0U2VjdGlvbi5pdGVtc1trZXldID0gdmFsdWU7XG5cdH1cblxuXHRyZXR1cm4gbmV3IElOSUZpbGUoc2VjdGlvbnMpO1xufVxuIl0sIm1hcHBpbmdzIjoiaUhBQUEsc0JBQThDLDJwSEFlakNBLFFBQU8sWUFHbkIsaUJBQVlDLFFBQWtCLENBQUUsK0JBQy9CLElBQUksQ0FBQ0EsUUFBUSxDQUFHQSxRQUFRLENBQ3pCLENBQUMsOENBRUQsb0JBQVdDLElBQVksQ0FBZ0UsNkJBQTlEQyxRQUFnQiwyREFBRyxJQUFJLENB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