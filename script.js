var fetch = function (searchKey, searchTerm) {
    $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?q=${searchKey}:${searchTerm}`,
        success: function (data) {
            console.log(data);
            appendBook(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};

function appendBook (data) {
    $('.book').empty();
    var bookObjectSource = $('#book-template').html();
    var bookObjectTemplate = Handlebars.compile(bookObjectSource);
    var newHTML = bookObjectTemplate(data);
    $('.book').append(newHTML);
}

var searchKey = '';

$( ".form-control" ).focus(function() {
    searchKey = this.id; 
    $(`input[id=${searchKey}]`).css("background-color", "#fff");
    $(`input[id!=${searchKey}]`).css("background-color", "#ccc"); 
    $(this).parents('#search-form').parsley().reset();
});

$( ".search-book" ).click(function() {
    if ($(`input[id=${searchKey}]`).parsley().validate() === true) {
        var searchTerm = $(`input[id=${searchKey}]`).val();
        fetch(searchKey, searchTerm);
        $('.book').append('<img src="loading.gif">');
    }
});

$('.book').on('click', '.book-title', function () {
    var specificBook = $(this).parents('.spesific-book');
    $('.book').empty();
    $('.book').append(specificBook);    
});

