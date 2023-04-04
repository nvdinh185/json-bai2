const booksApi = "http://localhost:3001/books";
var form = $('#add-form');

function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

form.on("submit", async function (e) {
    e.preventDefault();
    const formValue = {};
    for (const el of e.target) {
        if (el.name) {
            formValue[el.name] = el.value;
        }
    }

    var title = formValue['title'];
    var description = formValue['description'];
    var detail = formValue['detail'];
    var status = formValue['status'];

    var newBook = {
        id: generateUuid(),
        title,
        description,
        detail,
        status
    }

    try {
        var results = await axios({
            method: "POST",
            url: booksApi,
            data: JSON.stringify(newBook),
            headers: { "Content-Type": "application/json" },
        });

        //handle success
        console.log('results: ', results);
        window.location = 'list.html';
    } catch (error) {
        // var errorElement = document.getElementById('error');
        // errorElement.innerText = 'Xảy ra lỗi!';
        // Object.assign(errorElement.style, {
        //     display: 'block',
        //     color: 'red',
        //     fontStyle: 'italic',
        //     fontWeight: 'bold',
        //     backgroundColor: 'yellow'
        // })
    }
})