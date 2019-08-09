function translates(lang){
    $(`#en`).removeClass("active")
    $(`#id`).removeClass("active")
    $(`#ja`).removeClass("active")
    $(`#es`).removeClass("active")
    $(`#ar`).removeClass("active")
    $(`#${lang}`).addClass("active")
    $(`.spinner-border`).show()

    let token = localStorage.getItem('token')
    console.log(token)
    $.ajax({
        method: "post",
        url: `http://localhost:3000/translate`,
        data: {
            text : currentSynopsis,
            target: lang
        },
        headers: {
            token
        }   
    })
    .then( data =>{        
        $(`.spinner-border`).hide()
        $('#synopsis').html(data[1].data.translations[0].translatedText)
    })
    .catch(err=>{
        console.log(err)
    })
}