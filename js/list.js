var books = [
    {
        id: 1,
        title: 'sách thiếu nhi',
        description: 'sách thiếu nhi',
        detail: 'sách thiếu nhi',
        status: 1
    },
    {
        id: 2,
        title: 'sách giáo khoa',
        description: 'sách giáo khoa',
        detail: 'sách giáo khoa',
        status: 0
    },
    {
        id: 3,
        title: 'tiểu thuyết',
        description: 'tiểu thuyết',
        detail: 'tiểu thuyết',
        status: 1
    },
]

const tbElement = document.querySelector('#list-books');

// Tiêu đề
const trElement = document.createElement('tr');

const htmlTitle = `
            <th>title</th>
            <th>description</th>
            <th>detail</th>
            <th>status</th>
            <th>function</th>
        `;

trElement.innerHTML = htmlTitle;
tbElement.appendChild(trElement);

function renderBook(book) {
    var trElement = document.createElement('tr');

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

    trElement.innerHTML = htmlContent;
    return trElement;
}

// Nội dung
books.forEach(function (book) {
    var trElement = renderBook(book);
    tbElement.appendChild(trElement);
})

function onUpdate(id) {
    location = `edit.html?id=${id}`;
}

async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {

    }
}