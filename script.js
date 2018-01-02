var fetch = function (searchKey, searchTerm) {
    $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=${searchKey}:${searchTerm}`,
        success: function (data) {
            console.log(data);
            createBook(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

function createBook(data) {
    $('.book').empty();
    for (var i=0; i<10 && i<data.items.length; i++) {
        var title = data.items[i].volumeInfo.title;
        var description = data.items[i].volumeInfo.description;
        var authors = data.items[i].volumeInfo.authors;
        var imageLinks = '';
        if ('imageLinks' in data.items[i].volumeInfo) {
            imageLinks = data.items[i].volumeInfo.imageLinks.thumbnail;
        }
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

var searchKey = '';

$( ".form-control" ).focus(function() {
    searchKey = this.id; 
    $(`input[id=${searchKey}]`).css("background-color", "#fff");
    $(`input[id!=${searchKey}]`).css("background-color", "#ccc"); 
});

$('.search-book').click(function () {
    var searchTerm = $(`input[id=${searchKey}]`).val();
    fetch(searchKey, searchTerm);
    $('.book').empty();
    $('.book').append('<img src="loading.gif">');
});

$('.book').on('click', '.book-title', function () {
    var specificBook = $(this).parents('.spesific-book');
    $('.book').empty();
    $('.book').append(specificBook);    
});


