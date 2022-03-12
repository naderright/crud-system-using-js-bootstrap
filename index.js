
// var userName=window.prompt("Enter Your name");


// function welcome(user){
//     window.alert("welcom"+ "  "+user)
// }
// welcome(userName)

// ================================================

var productNsmeInput = document.getElementById("productNameInpt");
var productPriceInput = document.getElementById("productpriceInpt");
var productCategoryInput = document.getElementById("productcategoryInpt");
var produtDescInpt = document.getElementById("produtDescInpt");

var productsContainer;
if (localStorage.getItem("products") != null) {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    display();
} else {
    productsContainer = [];
}

function addProduct() {
    
    if (document.getElementById("btnUpdate").innerHTML != "Update") {
        var product = {
            name: productNsmeInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: produtDescInpt.value,
        }
        productsContainer.push(product);
        localStorage.setItem("products", JSON.stringify(productsContainer));
        display();
        removepro();
    } else {

        addUpdate();
    }


}

function display() {
    var temp = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        temp += `<tr>
            <td>${i + 1}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button class="btn btn-warning " onclick='update(${i})'>update</button></td>
        <td><button class="btn btn-light " onclick='deletepro(${i})'>Dellet</button></td>
    </tr>`;
    }

    document.getElementById("bodytable").innerHTML = temp;

}
// clear inputs
function removepro() {
    productNsmeInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    produtDescInpt.value = "";
    document.getElementById("btnUpdate").innerHTML = "add product";
    // addUpdate()
}
// delete item of array
function deletepro(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    display()
}
function search(term) {
    var temp = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) ||
            productsContainer[i].category.toLowerCase().includes(term.toLowerCase())) {
            temp += `<tr>
            <td>${i + 1}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button class="btn btn-warning"  onclick='update(${i})'>update</button></td>
        <td><button class="btn btn-light " onclick='deletepro(${i})'>Dellet</button></td>
    </tr>`;

        }

        document.getElementById("bodytable").innerHTML = temp;
    }


}

function update(indexUpdate) {

    productNsmeInput.value = productsContainer[indexUpdate].name;
    productPriceInput.value = productsContainer[indexUpdate].price;
    productCategoryInput.value = productsContainer[indexUpdate].category;
    produtDescInpt.value = productsContainer[indexUpdate].desc;
    productsContainer[indexUpdate]["update"] = "updateNow";

    console.log(productsContainer[indexUpdate]);

    document.getElementById("btnUpdate").innerHTML = "Update";

}

function addUpdate() {

    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i]["update"]) {
            productsContainer[i].name = productNsmeInput.value;
            productsContainer[i].price = productPriceInput.value;
            productsContainer[i].category = productCategoryInput.value;
            productsContainer[i].desc = produtDescInpt.value;
            delete productsContainer[i]["update"];
            console.log(productsContainer[i]);
            document.getElementById("btnUpdate").innerHTML = "add product";
            localStorage.setItem("products", JSON.stringify(productsContainer));
            display()
            removepro();
        }    }
}