var faker = require("faker");

console.log("PRODUCT\t\t\t\tPRICE");
for(var i = 0; i < 10; i++) {
    console.log(faker.fake("{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}}\t\t${{commerce.price}}"));
}