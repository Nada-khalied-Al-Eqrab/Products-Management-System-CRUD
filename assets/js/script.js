//////////////////All Inputs And Its Buttons From  HTML Page /////////////////
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discounts = document.getElementById('discounts');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'Create';
let tmp;
//test // console.log(title,price,taxes,ads,discounts,total,count,category,submit);
//////////////////Get Total Price//////////////////////////////////////////////
function getTotal() {
    //test // console.log('done');

    //Ensure that all price data has been entered.
    if (price.value != '') {
        let result = (
            +price.value
            +
            +taxes.value
            +
            +ads.value)
            -
            +discounts.value;
        total.innerHTML = result;
        //Change the background of the total to green when there is data.
        total.style.background = '#040';
    } else {
        total.innerHTML = ' ';
        total.style.background = '#a00d02';
    }
}
//////////////////CRUDS - Create Prodect///////////////////////////////////////
let datapro; //let datapro=[];
//Ensure that the local storage contains product data or not.
if (localStorage.Prodect != null) {
    datapro = JSON.parse(localStorage.Prodect);
} else {
    datapro = [];
}
//Add a product to local storage
submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCass(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discounts: discounts.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCass()
    }
    //test // console.log(newpro);
    ///Generat Count And Validation Clean Date////////
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count<=100) {
        if (mood === 'Create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
        } else {
            datapro[tmp] = newpro;
            mood = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        //Clear Inputs After Create 
        clearDate();
    }
    ///Save Data in Localstorage////////
    localStorage.setItem('Prodect', JSON.stringify(datapro));
    //CRUDS - Read
    showData();
}
//////////////////Clear Inputs After Create///////////////////////////////////
function clearDate() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discounts.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//////////////////CRUDS - Read///////////////////////////////////////////////
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        // table=datapro[i];
        //test //console.log(table);
        table += `
           <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discounts}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td> 
           </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> Delete All (${datapro.length} Product)</button>
        `
    } else {
        btnDelete.innerHTML = ` `;
    }
}
showData();
//////////////////CRUDS - Delete One Product////////////////////////////////
function deleteData(i) {
    //test //console.log(i);
    datapro.splice(i, 1);
    localStorage.Prodect = JSON.stringify(datapro);
    showData();
}
//////////////////CRUDS - Delete All Product///////////////////////////////
function deleteAll() {
    datapro.splice(0);

    showData();
}
//////////////////CRUDS - Update//////////////////////////////////////////
function updateData(i) {
    //test //console.log(i);
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discounts.value = datapro[i].discounts;
    getTotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update'
    mood = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
//////////////////CRUDS - Search/////////////////////////////////////////
let searchMood = 'title';
function getSearchMood(id) {
    //test //console.log(id);
    let search = document.getElementById('search');

    if (id == 'searchTitle') {
        searchMood = 'title';

    } else {
        searchMood = 'category';


    }
    search.Placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();

}
function searchData(value) {
    //test //console.log(value);
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchMood == 'title') {

            if (datapro[i].title.includes(value.toLowerCass())) {
                //test //console.log(i);
                table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discounts}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td> 
                        </tr>
                        `
            }

        } else {

            if (datapro[i].title.includes(value.toLowerCass())) {
                //test //console.log(i);
                table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discounts}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td> 
                        </tr>
                        `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

