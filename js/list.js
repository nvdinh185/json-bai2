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

var books = [
    {
        id: 1,
        title: 'sách thiếu nhi',
        description: 'sách thiếu nhi',
        detail: 'sách thiếu nhi',
        status: 1
    },
    {
        id: 1,
        title: 'sách giáo khoa',
        description: 'sách giáo khoa',
        detail: 'sách giáo khoa',
        status: 0
    },
    {
        id: 1,
        title: 'tiểu thuyết',
        description: 'tiểu thuyết',
        detail: 'tiểu thuyết',
        status: 1
    },
]

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

function onUpdate(id) {
    location = `edit.html?id=${id}`;
}

async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {

    }
}