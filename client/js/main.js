$(document).ready(function(){
    up()
    getAnimeData()

})
let foundAnimes = []
let currentDetails = {}
let currentGames = []
let currentCovers = []

function back(){
    currentSynopsis= ""
    currentGames = []
    currentCovers = []
    $('#details').hide()
    $('#searchForm').show()
}

function getDetails(id){
    $('#searchForm').hide()
    $('#list-card').hide()  
    $('#details').empty()
    foundAnimes.forEach(element => {
         if(element.id == id){
            currentDetails = element.attributes
        }
    })
    console.log(currentDetails)

    $('#details').show()
    currentSynopsis= currentDetails.synopsis
    $('#details').append(`

    <div class="container">
    
        <h1 class="my-4">
        <i onclick="back()" class="fa fa-chevron-circle-left"></i>${currentDetails.canonicalTitle}
        </h1>      
    
        <div class="row">
        
            <div class="col-md-6">
                <img class="img-fluid" src="${currentDetails.posterImage.original}" alt="cover  ">
            </div>
                
            <div class="col-md-5">
                <h3 class="my-3">Rating</h3>
                    <i class="fa fa-star"></i>${currentDetails.averageRating}
                <h3 class="my-3">Synopsis</h3>
                <p id="synopsis">
                ${currentDetails.synopsis}
                </p>
                <div class="spinner-border" role="status" style="display:none">
                  <span class="sr-only">Loading...</span>
                </div>
                <p>Translate to: 
                <button id="down" onclick="down()">
                    <i class="fa fa-sort-down"></i>
                </button>
                <button id="up" onclick="up()">
                    <i class="fa fa-sort-up"></i> 
                </button>
                </p>
                <ul id="lang" class="list-group">
                    <li onclick="translates('en')" id="en" class="list-group-item active">English</li>
                    <li onclick="translates('id')" id="id" class="list-group-item">Bahasa Indonesia</li>
                    <li onclick="translates('ja')" id="ja" class="list-group-item">日本語</li>
                    <li onclick="translates('es')" id="es" class="list-group-item">español</li>
                    <li onclick="translates('ar')" id="ar" class="list-group-item">العربية</li>
                </ul>

            </div>
        
        </div>
    
    </div>
    <h3 class="my-4">Related Games</h3>
    
    <div id="gamelist" class="row">
    
    </div>    
    `)
    let token = localStorage.getItem('token')
    $.ajax({
        method: "get",
        headers: {
            token
        },
        url: `http://localhost:3000/games/${currentDetails.canonicalTitle}`
    }).
    then(games=>{
        currentGames = games
        getGames()
    })
    .catch(err=>{
        console.log(err)
    })   
    
}


function up(){
    $('#up').hide()
    $('#down').show()
    $('#lang').hide()
}
function down(){
    $('#up').show()
    $('#down').hide()
    $('#lang').show()
}



function getGames(){
    let token = localStorage.getItem('token')
    currentGames.forEach(game => {
        $.ajax({
            method: "get",
            headers: {
                token
            },
            url: `http://localhost:3000/cover/${game.id}`
        }).
        then(cover=>{
            console.log(cover)
            $('#gamelist').append(`                   

            <div class="card col-md-2 col-sm-4 mb-3" style="width: 18rem;">
                <img src="https://images.igdb.com/igdb/image/upload/t_thumb/${cover[0].image_id}.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${game.name}</p>
                    <p class="card-text">Rating : <i class="fa fa-star"></i> ${Math.floor(Number(game.total_rating))/10}</p>
                    <button class="btn btn-light"><a href="https://www.ign.com/search?q=${game.name}" target="_blank"> Open On IGN</a></button>
                </div>
            </div>
            `)        
        })
        .catch(err=>{
            console.log(err)
        })  

        
    });

}

function getAnimeData(){
    foundAnimes = []
    $('#submit').click(function(){
        event.preventDefault();
        $.ajax({
            url: `https://kitsu.io/api/edge/anime?filter[text]=${$('#search-char').val()}`,
            method: 'GET'
        })
        .done(function(list){
            $('#list-card').empty()
            foundAnimes = list.data
            for (let i = 0; i < list.data.length; i++) {
                const datas = list.data[i];
                $('#list-card').append(
                    `
                    <div class="col-md-4 d-flex justify-content-center">
                        <div class="card " style="width: 18rem;">
                            <img src="${datas.attributes.posterImage.medium}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-center" style="height: 5rem;">${datas.attributes.canonicalTitle}</h5>
                                <a onclick="getDetails('${datas.id}')"href="#" class="btn btn-primary d-flex justify-content-center">See Details</a>
                            </div>
                        </div>
                    </div>
                    `
                );
            }
        })
        .fail(function(jqXHR, textStatus) {
            console.log('Error:', textStatus);
        });
    })
}


