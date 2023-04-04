const booksApi = "http://localhost:3001/books";
var form = $('#add-form');

function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function handleBlurInput(input) {
    var errorElement = input.parent().children()[3];
    input.blur(function () {
        if (input.val() === '') {
            $(errorElement).text('Vui lòng nhập!');
            $(errorElement).attr('style', 'display: block; color: red; font-style: italic;');
        } else {
            $(errorElement).attr('style', 'display: none;');
        }
    })
}

handleBlurInput($('input[name="title"]'));
handleBlurInput($('textarea[name="description"]'));
handleBlurInput($('textarea[name="detail"]'));
handleBlurInput($('select[name="status"]'));

form.on("submit", async function (e) {
    e.preventDefault();
    function validRequired(inputElement, value) {
        var errorElement = inputElement.parent().children()[3];
        if (value === '') {
            $(errorElement).text('Vui lòng nhập!');
            $(errorElement).attr('style', 'display: block; color: red; font-style: italic;');
            return false;
        } else {
            $(errorElement).attr('style', 'display: none;');
            return true;
        }
    }
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
    var check = true;
    !validRequired($('input[name="title"]'), title) ? check = false : '';
    !validRequired($('textarea[name="description"]'), description) ? check = false : '';
    !validRequired($('textarea[name="detail"]'), detail) ? check = false : '';
    !validRequired($('select[name="status"]'), status) ? check = false : '';
    if (check) {
        status = status === 'true';//chuyển sang kiểu dữ liệu boolean
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
            location = 'list.html?msg=1';
        } catch (error) {
            var errorElement = $('#error');
            errorElement.text('Xảy ra lỗi: ' + error);
            $(errorElement).attr('style', 'color: red; font-style: italic;');
        }
    }
})