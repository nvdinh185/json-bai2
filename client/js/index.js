const booksApi = "http://localhost:3001/books";

function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var msg = getParameterByName('msg');

var msgElement = $('#msg');
$(msgElement).attr('style', 'color: green; font-style: italic;');
if (msg === '1') {
    msgElement.text('Đã thêm thành công!');
} else if (msg === '2') {
    msgElement.text('Đã sửa thành công!');
} else if (msg === '3') {
    msgElement.text('Đã xóa thành công!');
}

async function display() {
    try {
        var listBooks = await axios.get(booksApi);
        listBooks = listBooks.data;

        const tbElement = $('#list-books');

        var htmls = `<tr>
            <th>title</th>
            <th>description</th>
            <th>detail</th>
            <th>status</th>
            <th>function</th>
        </tr>`;

        function renderBook(book) {

            return `<tr>
                <td>${book.title}</td>
                <td>${book.description}</td>
                <td>${book.detail}</td>
                <td style="text-align: center">${book.status}</td>
                <td>
                    <button onclick="onUpdate('${book.id}')">Sửa</button>
                    <button onclick="onDelete('${book.id}')">Xóa</button>
                </td>
            </tr>`;
        }

        // Nội dung
        listBooks.forEach(function (book) {
            htmls += renderBook(book);
        })

        tbElement.html(htmls);
    } catch (error) {
        var errorElement = $('#msg');
        errorElement.text('Xảy ra lỗi khi lấy dữ liệu!');
        $(errorElement).attr('style', 'color: red; font-style: italic;');
    }
}
display();

function onUpdate(id) {
    location = `edit.html?id=${id}`;
}

async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        try {
            await axios({
                method: "DELETE",
                url: booksApi + '/' + id
            })
            location = 'index.html?msg=3';
        } catch (error) {
            var errorElement = $('#msg');
            errorElement.text('Xảy ra lỗi khi xoá!');
            $(errorElement).attr('style', 'color: red; font-style: italic;');
        }
    }
}