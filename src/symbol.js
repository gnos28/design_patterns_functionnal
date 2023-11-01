var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
var kObjMetadata = Symbol("metadata");
var kObjTest = Symbol("test");
var obj = (_a = {
        foo: "bar"
    },
    _a[kObjTest] = "aze",
    _a);
var objMetadata = {
    version: 1,
};
Object.defineProperty(obj, kObjMetadata, {
    value: objMetadata,
});
Object.defineProperty(obj, "coucou", {
    value: objMetadata,
});
var logProperties = function (obj) {
    console.log(obj);
    console.log(obj[kObjMetadata]);
    console.log(obj[kObjTest]);
    console.log(obj["coucou"]);
};
logProperties(obj);
var copyObj = __assign({}, obj);
console.log("--- copyObj ---");
logProperties(copyObj);
