const booksApi = "http://localhost:3001/books";
var form = $("#edit-form");
var formInput = $("#edit-form :input");

(async () => {

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    var id = getParameterByName('id');
    try {

        book = await axios.get(booksApi + '/' + id);
        book = book.data;

        formInput[0].value = book.id;
        formInput[1].value = book.title;
        formInput[2].value = book.description;
        formInput[3].value = book.detail;
        formInput[4].value = book.status;

    } catch (error) {
        var errorElement = $('#error');
        errorElement.text('Xảy ra lỗi: ' + error);
        $(errorElement).attr('style', 'color: red; font-style: italic;');
    }
})()

form.on("submit", async function (e) {
    e.preventDefault();
    const formValue = {};
    for (const el of e.target) {
        if (el.name) {
            formValue[el.name] = el.value;
        }
    }

    var id = formValue['id'];
    var title = formValue['title'];
    var description = formValue['description'];
    var detail = formValue['detail'];
    var status = formValue['status'];
    status = status === 'true';//chuyển sang kiểu dữ liệu boolean

    var editBook = {
        id,
        title,
        description,
        detail,
        status
    }

    try {
        var results = await axios({
            method: "PUT",
            url: booksApi + '/' + id,
            data: JSON.stringify(editBook),
            headers: { "Content-Type": "application/json" },
        });

        //handle success
        console.log('results: ', results);
        location = 'list.html?msg=2';
    } catch (error) {
        var errorElement = $('#error');
        errorElement.text('Xảy ra lỗi: ' + error);
        $(errorElement).attr('style', 'color: red; font-style: italic;');
    }
});