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
$(msgElement).attr('style', 'color: green; background: yellow');
if (msg === '1') {
    msgElement.text('Đã thêm thành công!');
} else if (msg === '2') {
    msgElement.text('Đã sửa thành công!');
} else if (msg === '3') {
    msgElement.text('Đã xóa thành công!');
}

async function display() {
    try {
        var books = await axios.get(booksApi);
        books = books.data;

        const tbElement = $('#list-books');

        // Tiêu đề
        const trElement = $('<tr></tr>');

        const htmlTitle = `
            <th>title</th>
            <th>description</th>
            <th>detail</th>
            <th>status</th>
            <th>function</th>
        `;

        trElement.html(htmlTitle);
        tbElement.append(trElement);

        function renderBook(book) {
            var trElement = $('<tr></tr>');

            const htmlContent = `
                <td>${book.title}</td>
                <td>${book.description}</td>
                <td>${book.detail}</td>
                <td>${book.status ? 'Enabled' : 'Disabled'}</td>
                <td>
                    <button onclick="onUpdate('${book.id}')">Sửa</button>
                    <button onclick="onDelete('${book.id}')">Xóa</button>
                </td>
            `;

            trElement.html(htmlContent);
            return trElement;
        }

        // Nội dung
        books.forEach(function (book) {
            var trElement = renderBook(book);
            tbElement.append(trElement);
        })
    } catch (error) {
        var errorElement = $('#msg');
        errorElement.text('Xảy ra lỗi khi lấy dữ liệu: ' + error);
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
                url: booksApi + '/' + id,
                headers: { "Content-Type": "application/json" }
            })
            location = 'list.html?msg=3';
        } catch (error) {
            var errorElement = $('#msg');
            errorElement.text('Xảy ra lỗi khi xoá: ' + error);
            $(errorElement).attr('style', 'color: red; font-style: italic;');
        }
    }
}