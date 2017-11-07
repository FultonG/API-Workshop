$('#clarifai').submit(function(e){
  var imgURL = $('#url').val();
  $('#img').attr('src', imgURL);
  $.post("/getTags", {url: imgURL}, function(data){
    data.forEach(function(x){
      $('#tags').append(x.name + ", ")
    });
  });
  e.preventDefault();
});

$('#spotifyForm').submit(function(e){
    var trackName = $('#trackName').val();
    $.post('/trackSearch',{trackName : trackName}, function(data){
        console.log(data);
        $('#trackList').html('');
            var tracks = data.tracks.items;
            for(var i in tracks){
                $('#trackList').append('<a href="'+ tracks[i].preview_url+'" target="_blank" ><li>' + tracks[i].name + ' By: '+ tracks[i].artists[0].name + '</li></a>');
            }
    })
    e.preventDefault();
})
