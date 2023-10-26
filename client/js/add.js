const booksApi = "http://localhost:3000/book";
var form = $('#add-form');

// Hàm này để tạo id là 1 chuỗi ngẫu nhiên
function generateUuid() {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Hàm này để validate khi blur hoặc nhập vào ô input
function handleBlurInput(input) {
    var errorElement = input.parent().children()[3];
    input.blur(function () {
        if (input.val().trim() === '') {
            $(errorElement).text('Vui lòng nhập!');
            $(errorElement).attr('style', 'display: block; color: red; font-style: italic;');
            input.addClass('invalid');
        }
    })

    input.on('input', function () {
        $(errorElement).attr('style', 'display: none;');
        input.removeClass('invalid');
    })
}

handleBlurInput($('input[name="title"]'));
handleBlurInput($('textarea[name="description"]'));
handleBlurInput($('textarea[name="detail"]'));
handleBlurInput($('select[name="status"]'));

form.on("submit", async function (e) {
    e.preventDefault();
    function isRequired(inputElement) {
        var errorElement = inputElement.parent().children()[3];
        if (inputElement.val().trim() === '') {
            $(errorElement).text('Vui lòng nhập!');
            $(errorElement).attr('style', 'display: block; color: red; font-style: italic;');
            inputElement.addClass('invalid');
            return true;
        }
    }

    var check = true;
    isRequired($('input[name="title"]')) ? check = false : '';
    isRequired($('textarea[name="description"]')) ? check = false : '';
    isRequired($('textarea[name="detail"]')) ? check = false : '';
    isRequired($('select[name="status"]')) ? check = false : '';
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
                data: newBook
            });

            //handle success
            console.log('results: ', results);
            location = 'index.html?msg=1';
        } catch (error) {
            var errorElement = $('#error');
            errorElement.text('Xảy ra lỗi khi thêm: ' + error);
            $(errorElement).attr('style', 'color: red; font-style: italic;');
        }
    }
})