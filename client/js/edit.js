const booksApi = "http://localhost:3000/book";
var form = $("#edit-form");
var formInput = $("#edit-form :input");

async function getBookById() {

    function getParameterByName(name, url = location.href) {
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
}
getBookById();

form.on("submit", async function (e) {
    e.preventDefault();

    var id = $('input[name="id"]').val();
    var title = $('input[name="title"]').val();
    var description = $('textarea[name="description"]').val();
    var detail = $('textarea[name="detail"]').val();
    var status = $('select[name="status"]').val();

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
            data: editBook
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