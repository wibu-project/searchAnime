$('#list').click(function(event){
    event.preventDefault()
    getAnimeList()
})

function getAnimeList(){    
    $('#list-card').hide()
    $('#details').hide()
    $('#list-anime').empty()
    $('#searchForm').show(  )
    let token = localStorage.getItem('token')
    if(!token){
        Swal.fire('Please Login First')
    } else {
        $.ajax({
            method: "get",
            headers: {
                token
            },
            url: `http://localhost:3000/animes`,
        })
        .then(response=>{
            console.log(response)
            $('#mylist').show()
            response.forEach(element => {
                $('#list-anime').append(`

                <div  class="media text-muted pt-3">
                    <img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="${element.poster}" data-holder-rendered="true">
                        <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <strong class="d-block text-gray-dark">${element.title}</strong>
                    </p>
                    <div>
                        <button onclick="deleteFromList('${element._id}')" type="button" class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button> 
                    </div>
                    </div> 

                `)  
            });
        })
        .catch(err=>{
            console.log(err)
        })

    }
    
}


function addToAnimeList(){
    let token = localStorage.getItem('token')
    if(!token){
        Swal.fire("Please Login First!")
    } else {
        $.ajax({
            method: "post",
            headers: {
                token
            },
            url: `http://localhost:3000/animes`,
            data:{
                title: `${currentDetails.canonicalTitle}`,
                poster: `${currentDetails.posterImage.medium}`
            }
        })
        .then(response=>{
            console.log(response)
        })
        .catch(err=>{
            console.log(err)
        })

    }
}

function deleteFromList(id){
    let token = localStorage.getItem('token')
    $.ajax({
        method: "delete",
        headers: {
            token
        },
        url: `http://localhost:3000/animes/${id}`,
    })
    .then(response=>{
        $('#list-anime').empty()
        getAnimeList()
    })
    .catch(err=>{
        console.log(err)
    })
}