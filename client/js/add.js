const booksApi = "http://localhost:3000/book";
var form = $('#add-form');

// Hàm này để tạo id là 1 chuỗi ngẫu nhiên
function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Hàm này để validate khi blur vào ô input
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
    function validRequired(inputElement) {
        var errorElement = inputElement.parent().children()[3];
        if (inputElement.val() === '') {
            $(errorElement).text('Vui lòng nhập!');
            $(errorElement).attr('style', 'display: block; color: red; font-style: italic;');
            return false;
        } else {
            $(errorElement).attr('style', 'display: none;');
            return true;
        }
    }

    var check = true;
    !validRequired($('input[name="title"]')) ? check = false : '';
    !validRequired($('textarea[name="description"]')) ? check = false : '';
    !validRequired($('textarea[name="detail"]')) ? check = false : '';
    !validRequired($('select[name="status"]')) ? check = false : '';
    if (check) {
        var title = $('input[name="title"]').val();
        var description = $('textarea[name="description"]').val();
        var detail = $('textarea[name="detail"]').val();
        var status = $('select[name="status"]').val();

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
                data: newBook,
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