var fetch = function (bookName) {
    $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=title:${bookName}`,
        success: function (data) {
            $('.book').empty();
            console.log(data);
            createBook(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

$('.search-book').click(function () {
    var bookName = $('input[id="isbn"]').val();
    fetch(bookName);
});

function createBook(data) {
    for (var i=0; i<10; i++) {
        var title = data.items[i].volumeInfo.title;
        var description = data.items[i].volumeInfo.description;
        var authors = data.items[i].volumeInfo.authors;
        var imageLinks = data.items[i].volumeInfo.imageLinks.thumbnail;
        var bookObject = { title: title, description: description, authors: authors, imageLinks: imageLinks };
        appendBook(bookObject);
    }
}

function appendBook (bookObject) {
    var bookObjectSource = $('#book-template').html();
    var bookObjectTemplate = Handlebars.compile(bookObjectSource);
    var newHTML = bookObjectTemplate(bookObject);
    $('.book').append(newHTML);
}


