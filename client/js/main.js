$(document).ready(function(){
    $('#submit').click(function(){
        event.preventDefault();
        alert(`${$('#search-char').val()}`)
        $.ajax({
            url: `https://kitsu.io/api/edge/anime?filter[text]=${$('#search-char').val()}`,
            method: 'GET'
    })
    .done(function(list){
        console.log(list.data)
        for (let i = 0; i < list.data.length; i++) {
            const datas = list.data[i];
            $('#list-card').append(
                `<div class="card" style="width: 10rem;">
                <img src="${datas.attributes.posterImage.small}" class="card-img-top" alt="">
                <div class="card-body">
                <h5 class="card-title">${datas.attributes.canonicalTitle}</h5>
                <a href="#" class="btn btn-primary">See Details</a>
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
})