$('.tombol-cari').on('click', function() {
    tampilfilm();
})
$('.input-cari').on('keypress', function(e) {
    if(e.keyCode == 13) {
tampilfilm();     
    }
})
$('#daftar-film').on('click', '.seedetail', function() {
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': 'dcae50c9',
            'i': $(this).data('id')
        },
        success: function(movie) {
            if(movie.Response == 'True') {
            $('.aaa').html(`<div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                    <img src="`+movie.Poster+`" alt="" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <ul class="list-group">
                        <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
                        <li class="list-group-item">Rilis: `+movie.Released+`</li>
                        <li class="list-group-item">Genre: `+movie.Genre+`</li>
                        <li class="list-group-item">Actors: `+movie.Actors+`</li>
                        <li class="list-group-item">Writer: `+movie.Writer+`</li>
                        <li class="list-group-item">Plot: `+movie.Plot+`</li>
                      </ul>
                </div>
            </div>
        </div>`)
            }
        }
    })
})








function tampilfilm() {
    $('#daftar-film').html('');
    $.ajax({
        url: 'http://omdbapi.com',
         type: 'get',
         dataType: 'json',
        data: {
            'apikey': 'dcae50c9',
            's' : $('.input-cari').val()
        },
        success: function(data) {
           if(data.Response == 'True') {
                let movies = data.Search;
               $.each(movies, function(i, data) {
                    $('#daftar-film').append(`<div class="col-md-4"><div class="card">
                    <img class="card-img-top" src="`+data.Poster+`" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">`+data.Title+`</h5>
                      <p class="card-text">`+data.Year+`</p>
                      <a href="#" class="btn btn-primary seedetail" data-toggle="modal" data-target="#exampleModal" data-id=`+data.imdbID+`>Views</a>
                    </div>
                    </div>
                  </div>`)
               
                })
                $('.input-cari').val('')  
           }else{
              $('#daftar-film').html('<h1 class="text-center">'+data.Error+'</h1>')
               
           }
        }
    })
}