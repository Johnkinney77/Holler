$(document).ready(function(){

  function contacts(){
    $.ajax({
      url: '/contacts',
      type: "GET"
    }).done(function(data){
      console.log(data)
    })
    $.ajax({
      url: '/categories',
      type: "GET"
    }).done(function(data){
      console.log(data)
    })
    $('#header-image').hide();
  }


  var routes = {
    '/contacts': contacts,
    '/analytics': function(){
      console.log('malarkey');
    },
    '/about': function(){
      console.log('spegetti');
    },
    '/home': function(){
      console.log('homsies');
    }
  }

  var router = Router(routes)
  router.init()

});