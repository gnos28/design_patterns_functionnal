var newPart = function (name, value, parent) {
    var parts = new Set();
    var thisPart = {};
    if (parent) {
        parent.parts.add(thisPart);
    }
    thisPart.name = name;
    thisPart.value = value;
    thisPart.parts = parts;
    thisPart.accept = function (visitor) {
        parts.forEach(function (part) { return part.accept && part.accept(visitor); });
        visitor().visit(thisPart);
    };
    return thisPart;
};
var Part_A = newPart("A", 101);
var Part_B = newPart("B", 305, Part_A);
var Part_C = newPart("C", 185, Part_A);
var Part_D = newPart("D", -30, Part_B);
var printPartNamesVisitor = function () { return ({
    visit: function (part) {
        console.log(part.name);
    },
}); };
Part_A.accept(printPartNamesVisitor);
var totalValue = 0;
var calculatePartTotalsVisitor = function () { return ({
    visit: function (part) { return (totalValue += part.value); },
}); };
Part_A.accept(calculatePartTotalsVisitor);
console.log(totalValue);
