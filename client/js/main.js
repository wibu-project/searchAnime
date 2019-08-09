$(document).ready(function(){
    getDetails({
        attributes:{
            canonicalTitle: "Naruto",
            posterImage:{
                original: "https://media.kitsu.io/anime/poster_images/11/original.jpg?1417705323"
            },
            synopsis: "Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi's rampage, the leader of the village, the Fourth Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto.\r\nNow, Naruto is a hyperactive and knuckle-headed ninja still living in Konohagakure. Shunned because of the Kyuubi inside him, Naruto struggles to find his place in the village, while his burning desire to become the Hokage of Konohagakure leads him not only to some great new friends, but also some deadly foes.",
            averageRating: "78.05"     
        }
    })
    up()
    getAnime()
})

let currentGames = []
let currentCovers = []

function getAnime(){
    $("#submitSearchAnime").click(function(event){
        event.preventDefault()
        let search = $('#searchAnime').val()
        console.log(search)
        $.ajax({
            method: "get",
            url: `https://kitsu.io/api/edge/anime?filter[text]=${search}`
        }).
        then(response=>{
            console.log(response.data[0])
        })
        .catch(err=>{
            console.log(err)
        })
    })
}

function back(){
    currentSynopsis= ""
    currentGames = []
    currentCovers = []
    $('#details').hide()
}

function getDetails({attributes}){  
    currentSynopsis= attributes.synopsis
    $('#details').append(`

    <div class="container">
    
        <h1 class="my-4">
        <i onclick="back()" class="fa fa-chevron-circle-left"></i>${attributes.canonicalTitle}
        </h1>      
    
        <div class="row">
        
            <div class="col-md-6">
                <img class="img-fluid" src="${attributes.posterImage.original}" alt="cover  ">
            </div>
                
            <div class="col-md-5">
                <h3 class="my-3">Rating</h3>
                    <i class="fa fa-star"></i>${attributes.averageRating}
                <h3 class="my-3">Synopsis</h3>
                <p id="synopsis">
                ${attributes.synopsis}
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
    $.ajax({
        method: "get",
        url: `http://localhost:3000/games/${attributes.canonicalTitle}`,
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
    currentGames.forEach(game => {
        $.ajax({
            method: "get",
            url: `http://localhost:3000/cover/${game.id}`,
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

