const myUrl = "https://localhost:44396/api/products";

$(document).ready(function () {

    //Перейти в отдел продуктов
    $("#getAllItems").click(function () {
        clearContent();
        itemsInitializer("/0");
    });

    $("#addItem").click(function () {
        clearContent();
        addItemGet();
    });

    $("#removeItem").click(function () {
        clearContent();
        removeItemGet();
    });
});

//Инциализирует header и items
function itemsInitializer(urlAppend = "") {
    $("#content").append("<div id='categories' class='categories'></div>");
    getCategories();
    $("#content").append("<div id='items' class='items'></div>");
    getItems(urlAppend);
}

//добавляет выбор категории
function getCategories() {
    $.ajax({
        url: myUrl + "/categories",
        success: function (result) {
            console.log(result);
            for (let i = 0; i < result.length + 1; i++) {
                if (i === 0) {
                    $("#categories").append("<input id=category" + i + " type='button' class='categoryButton' value ='Показать все' />");
                }
                else {
                    $("#categories").append("<input id=category" + i + " type='button' class='categoryButton' value ='" + result[i - 1].Name + "' />");
                }
                $("#category" + i).click(function () {
                    getItems("/" + i);
                });
            }
        },
        error: function () {
            $("#categories").html("Ошибка");
        }
    });
}

//возвращает продукты(в том числе и определенной категории)
function getItems(urlAppend = "") {
    $.ajax({
        url: myUrl + urlAppend,
        success: function (result) {
            clearItems();
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                $("#items").append("<div class='item' id=item" + i + ">" + "</div>");

                $("#item" + i).append("<span>" + result[i].Id + "</span></br>");
                $("#item" + i).append("<span>" + result[i].Name + "</span></br>");
                $("#item" + i).append("<span>" + result[i].Price + "</span></br>");
                $("#item" + i).append("<input id='itemView" + i + "' type='button' value='Посмотреть'/>");
                $("#itemView" + i).click(function () {
                    let id = i + 1;
                    getItem("/" + id);
                });
            }
        },
        error: function () {
            $("#items").html("Ошибка");
        }
    });
}

//возвращает 1 продукт
function getItem(urlAppend) {
    $.ajax({
        url: myUrl + "/product" + urlAppend,
        success: function (result) {
            clearContent();
            console.log(result);
            $("#content").append("<span>" + result.Name + "</span></br>");
            $("#content").append("<span>" + "Категория: " + "</span>");
            $("#content").append("<span>" + result.Category.Name + "</span></br>");
            $("#content").append("<span>" + "Id: " + "</span>");
            $("#content").append("<span>" + result.Id + "</span></br>");
            $("#content").append("<span>" + "Цена: " + "</span>");
            $("#content").append("<span>" + result.Price + "</span></br>");
            $("#content").append("<input id='itemEdit" + "' type='button' value='Редактировать'/>");
            $("#itemEdit").click(function () {
                editItemGet("/" + result.Id);
            });
        },
        error: function () {
            $("#items").html("Ошибка");
        }
    });
}

//возвращает элементы страницы для редактирования
function editItemGet(urlAppend) {
    $.ajax({
        url: myUrl + "/product" + urlAppend,
        success: function (result) {
            clearContent();
            console.log(result);

            $("#content").append("<span>" + result.Id + "</span></br>");

            $("#content").append("<span>" + "Имя: " + "</span>");
            $("#content").append("<input id='itemName' type ='text' value ='" + result.Name + "'/>" + "</br>");

            $("#content").append("<span>" + "Категория: " + "</span>");
            $("#content").append("<input id='itemCategoryId' type ='text' value ='" + result.CategoryId + "'/>" + "</br>");

            $("#content").append("<span>" + "Цена: " + "</span>");
            $("#content").append("<input id='itemPrice' type ='number' value ='" + result.Price + "'/>" + "</br>");

            $("#content").append("<input id='itemEdit" + "' type='button' value='Редактировать'/>");
            $("#itemEdit").click(function () {
                var product = result;
                let name = document.getElementById("itemName").value;
                product.Name = name;
                let categoryId = document.getElementById("itemCategoryId").value;
                product.CategoryId = categoryId;
                let price = document.getElementById("itemPrice").value;
                product.Price = price;
                editItemSet(product);
            });
        },
        error: function () {
            $("#items").html("Ошибка");
        }
    });
}

//отправка отредактированного продукта
function editItemSet(product) {
    $.ajax({
        url: myUrl + "/editItem",
        type: "POST",
        data: product,
        success: function (result) {
            clearContent();
            console.log(result);
            getItem("/" + product.Id);
        },
        error: function () {
            $("#content").html("Ошибка");
        }
    });
}

//очищает content для новых элементов
function clearContent() {
    console.log("Content очищен");
    $("#content").remove();
    $("body").append("<div id='content' class='content'></div >");
}

//очищает items для обновления
function clearItems() {
    console.log("Items очищен");
    $("#items").remove();
    $("#content").append("<div id='items' class='items'></div>");
}

//возвращает элементы страницы для добавления
function addItemGet() {

    $("#content").append("<span>" + "Имя: " + "</span>");
    $("#content").append("<input id='itemName' type ='text' value =''/>" + "</br>");

    $("#content").append("<span>" + "Категория: " + "</span>");
    $("#content").append("<input id='itemCategoryId' type ='text' value =''/>" + "</br>");

    $("#content").append("<span>" + "Цена: " + "</span>");
    $("#content").append("<input id='itemPrice' type ='number' value =''/>" + "</br>");

    $("#content").append("<input id='itemEdit" + "' type='button' value='Добавить'/>");
    $("#itemEdit").click(function () {
        var product = {};
        let name = document.getElementById("itemName").value;
        product.Name = name;
        let categoryId = document.getElementById("itemCategoryId").value;
        product.CategoryId = categoryId;
        let price = document.getElementById("itemPrice").value;
        product.Price = price;
        addItemSet(product);
    });
}

//отправка нового продукта
function addItemSet(product) {
    $.ajax({
        url: myUrl + "/addItem",
        type: "POST",
        data: product,
        success: function (result) {
            clearContent();
            console.log(result);
            $("#getAllItems").click();
        },
        error: function () {
            $("#content").html("Ошибка");
        }
    });
}

//возвращает элементы страницы для удаления
function removeItemGet() {
    $("#content").append("<span>" + "Id: " + "</span>");
    $("#content").append("<input id='itemId' type ='text' value =''/>" + "</br>");
    $("#content").append("<input id='itemEdit" + "' type='button' value='Удалить'/>");
    $("#itemEdit").click(function () {
        removeItemSet(document.getElementById("itemId").value);
    });
}

//отправка запроса на удаление
function removeItemSet(id) {
    $.ajax({
        url: myUrl + "/removeItem/" + id,
        type: "DELETE",
        success: function (result) {
            clearContent();
            console.log(result);
            $("#getAllItems").click();
        },
        error: function () {
            $("#content").html("Ошибка");
        }
    });
}