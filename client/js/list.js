const booksApi = "http://localhost:3001/books";

(async function () {
    var books = await axios.get(booksApi);
    books = books.data;

    const tbElement = $('#list-books');

    // Tiêu đề
    const trElement = $('<tr></tr>');

    const htmlTitle = `
        <th>ID</th>
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
        $(trElement).attr('class', 'book-' + book.id);

        const htmlContent = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.description}</td>
                <td>${book.detail}</td>
                <td>${book.status}</td>
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
})()

function onUpdate(id) {
    location = `edit.html?id=${id}`;
}

async function onDelete(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        await axios({
            method: "DELETE",
            url: booksApi + '/' + id,
            headers: { "Content-Type": "application/json" }
        })
        location.reload();
    }
}