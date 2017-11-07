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
