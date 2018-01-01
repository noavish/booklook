var fetch = function (isbnNumber) {
    $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber}`,
        success: function (data) {
            console.log(data);
            createBook(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

$('.search-book').click(function () {
    var isbnNumber = $('input[id="isbn"]').val();
    fetch(isbnNumber);
});

function createBook(data) {
    var title = data.items[0].volumeInfo.title;
    var description = data.items[0].volumeInfo.description;
    var authors = data.items[0].volumeInfo.authors;
    var imageLinks = data.items[0].volumeInfo.imageLinks.thumbnail;
    var bookObject = { title: title, description: description, authors: authors, imageLinks: imageLinks };
    appendBook(bookObject);
}

function appendBook (bookObject) {
    var bookObjectSource = $('#book-template').html();
    var bookObjectTemplate = Handlebars.compile(bookObjectSource);
    var newHTML = bookObjectTemplate(bookObject);
    $('.book').append(newHTML);
}


