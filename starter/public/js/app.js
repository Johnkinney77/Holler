

$(document).ready(function(){

//Variables for templates and appending areas
var $main = $('#main-content')
var url = document.URL;
var contactTemplate = $('#contactTemplate').text();
var newContactTemplate = $('#newContactTemplate').text();
var singleContactTemplate = $('#singleContactTemplate').text();
var asideTemplate = $('#asideTemplate').text();
var singleCategory = $('#singleCategory').text();
var editContactForm = $('#editContactForm').text();
var editContactDiv = $('#edit-contact');

//Adding new category
$main.on('click', '[data-action="new-category"]', function(){
  $main.find('aside').append('<div><input placeholder="category"><button data-action="save">Save</button></div>')
});

//saving category 
$main.on('click','[data-action="save"]', function(){
  var element = $(this).parent()
  var categoryName = $(this).parent().find('input').val()
  //making ajax call
  $.ajax({
    url: '/categories',
    type: "POST",
    data: {
      name: categoryName
    }
  }).done(function(data){

    //appending new category to aside ul
    var html = Mustache.render(singleCategory, data)
    $main.find('aside ul').append(html)
    $(element).remove()
    makeDraggable()
  });
})

//Remove contact from category
$main.on('click', '.remove', function(){
  var activeCategory = $(document).find('.active-category').children().text()
  var contact = $(this).parents('.snaptarget')
  contact.removeClass(activeCategory)
  var contactID = contact.attr('id')
  var contactClass= contact.attr('class')
  contact.hide()
  console.log(contactID)
  $.ajax({
    url: '/contacts/'+ contactID,
    type: "PATCH",
    data: {
      category_id: contactClass
    }
  })
})

//Making draggable
function makeDraggable (){

      //found this code online, not entirely sure how it works. 
      //Makes the item sortable and still work with droppable
      var dropped = false;
      var draggable_sibling;
     $( "#sortable" ).sortable({
        cursorAt: { left: 5, top: 5 },
        scroll: true,

        //style added when in motion
        opacity: 0.5,

        start: function(event, ui) {
              draggable_sibling = $(ui.item).prev();
              },
          stop: function(event, ui) {
              if (dropped) {
                  if (draggable_sibling.length == 0)
                      $('#sortable').prepend(ui.item);

                  draggable_sibling.after(ui.item);
                  dropped = false;
              }
          }
      });

     //droppable areas
      $(".droppable").droppable({
          tolerance: "pointer",
          activeClass: 'active',
          hoverClass:'hovered',
          drop:function(event,ui){
              dropped = true;
              var categoryID = $(this).parent().attr('class')
              var item = event.toElement.parentElement.className
              if (item === "single-contact") {
                var element = event.toElement.parentElement
                var id = event.toElement.parentElement.id
                var classContact = $($main).find("#" + id)

                var idContact = $($main).find("#" + id).attr('id')
                console.log(categoryID)
                console.log(idContact)

                //immediately making the update to the front end dom
                $(classContact).toggleClass(categoryID)
                var finalCategoriesToAjax = classContact.removeClass('ui-sortable-handle ui-sortable-helper').attr('class')

                //Ajax call to change ID numbers in Contacts list
                $.ajax({
                  url: "/contacts/" + idContact,
                  type: "PATCH",
                  data: {
                    category_id: finalCategoriesToAjax
                  }
                }).done(function(data){
                })
                
              } else if (event.toElement.parentElement.parentElement.className === "single-contact") {
                
              }
          }
      });

}

//Filling in main content area with aside bar (categories) and contact cards
function contacts(){
  //removing and emptying
  $('#header-image').remove()
  $main.empty();


  //ajax call to get aside menu (categories)
  $.ajax({
    url: '/categories',
    type: "GET"
  }).done(function(data){

    //appending aside menu (categories) to main content
    var asideHTML = Mustache.render(asideTemplate, {categories: data});
    $main.append(asideHTML);
    $($main).find('aside .All').children().children().addClass('active-category')
  })

  //ajax call to get contacts
  $.ajax({
    url: '/contacts',
    type: "GET"
  }).done(function(data){

    //appending contacts to main content
    var dataSorted = _.sortBy(data, 'name');
    console.log(dataSorted)
    var contactHTML = Mustache.render(contactTemplate, {contacts: dataSorted});

    $main.append(contactHTML);
    makeDraggable()
  });

}

//Creating content for home page
function home(){
  $main.empty();
  $('#header').append('<img id="header-image"class="img-responsive" src="http://villalevistyle.com/wp-content/uploads/2014/09/Contact.jpg">')
  /*$main.html('<div class="container"><div class="row"><div class="col-sm-4"><div class=" white col-xs-12 text-center"><h1>Test Copy</h1></div></div><div class="col-sm-4"><div class=" white col-xs-12 text-center"><h1>Test Copy</h1></div></div><div class="col-sm-4"><div class=" white col-xs-12 text-center"><h1>Test Copy</h1></div></div></div></div>');*/
}

function analytics(){
  $main.empty();
  $.ajax({
    url: "/contacts",
    type: "GET"
  }).done(function(data){
    var chartData = {
          labels: [],
          datasets: [
              {
                  label: "Friends Cities",
                  fillColor: "rgba(51, 122, 183,0.25)",
                  strokeColor: "rgba(100,100,100,0.8)",
                  highlightFill: "rgba(51, 122, 183,0.75)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data: []
              }
          ]
      };

  //getting city names of friends    
  var labelsArray = [];
  var dataAmount = [];
  data.forEach(function(e){
    var city = e.city
    if(labelsArray.indexOf(city) === -1){
      labelsArray.push(city);
      dataAmount.push(1)
    } else {
      var i = labelsArray.indexOf(city)
      dataAmount[i] = dataAmount[i] + 1
    }
  })
  var title = chartData.datasets[0].label
  $main.append('<h1 id="chart-id">' + title + '</h1><canvas id="myChart" width="1000" height="400"></canvas>')
  chartData.datasets[0].data = dataAmount
  chartData.labels = labelsArray

  //getting data of each city

  var ctx = document.getElementById("myChart").getContext("2d");
  var myBarChart = new Chart(ctx).Bar(chartData);
  });
}

function about(){
  $main.empty();
  $main.append("<div class='col-xs-12'><h1>John Kinney</h1><p>I am the developer</p></div>")
}

//button action to create new contact card
$main.on('click', '[data-action="new-contact"]', function(e){
  e.preventDefault()
  $('.contacts').prepend(newContactTemplate);
})

//submits new contact to be saved
$main.on('click', '[data-action="submit-new-contact"]', function(){
  var info = $(this).parent()

  //saving all input values
  var url = info.find('[data-input="url"]').val();
  var name = info.find('[data-input="name"]').val();
  var email = info.find('[data-input="email"]').val();
  var phone = info.find('[data-input="phone"]').val();
  var city = info.find('[data-input="city"]').val();

  //making ajax call with values
  $.ajax({
    url: "/contacts",
    type: "POST",
    data: {
      category_id: "",
      name: name,
      city: city,
      phone: phone,
      email: email,
      image_url: url,
      category_id: "snaptarget ui-sortable-handle All"

    }
  }).done(function(data){

    //rending new contact to main content
    var newContact = Mustache.render(singleContactTemplate, data);
    $('.contacts').prepend(newContact);
    info.parents(".snaptarget").remove()
  });
})

//canceling new contact form
$main.on('click', '[data-action="cancel-new-contact"]', function(){
  $(this).parents('.snaptarget').remove()
});

//hover effect for contact cards buttons appear
$main.on('mouseenter', '.button-fade', function(){
  var activeCategory = $(document).find('.active-category').children().text()
  if(activeCategory === "All"){
    $(this).find('[data-action="remove-cat"]').hide()
  } else {
    $(this).find('[data-action="remove-cat"]').show()
  }
  $(this).children('.button').css({"opacity": "1"})
})


//hover affect for contact cards buttons appear
$main.on('mouseleave', '.button-fade', function(){
  $(this).children('.button').css({"opacity": "0"})
})


//deleting contact
$main.on('click', '[data-action="delete-contact"]', function(){
  var contactID = $(this).parents('.snaptarget').attr('id')
  var contactDelete = $(this).parents('.snaptarget')
  $.ajax({
    url: "/contacts/" + contactID,
    type: "DELETE"
  }).done(function(){
    contactDelete.remove();
  })
})


//Editing contact, brings up new form
$main.on('click', '[data-action="edit"]', function(){
  var editContact = $(this).parents('.snaptarget');
  var idValue = editContact.attr('id')
  var nameValue = editContact.find('[data-value="name"]').text()
  var urlValue = editContact.find('[data-value="url"]').attr("src")
  var emailValue = editContact.find('[data-value="email"]').text()
  var phoneValue = editContact.find('[data-value="phone"]').text()
  var cityValue = editContact.find('[data-value="city"]').text()
  var html = Mustache.render(editContactForm, {
    name: nameValue,
    email: emailValue,
    phone: phoneValue,
    city: cityValue,
    url: urlValue,
    id: idValue
  });
  $(editContactDiv).append(html);
});

//saving EDITS to contact
$(editContactDiv).on('click', 'button', function(){
  var editContact = $(this).parent()
  var idValue = editContact.attr('id')
  var nameValue = editContact.find('[data-input="name"]').val()
  var urlValue = editContact.find('[data-input="url"]').val()
  var emailValue = editContact.find('[data-input="email"]').val()
  var phoneValue = editContact.find('[data-input="phone"]').val()
  var cityValue = editContact.find('[data-input="city"]').val()
  $.ajax({
    url: "/contacts/" + idValue,
    type: "PUT",
    data: {
      name: nameValue,
      image_url: urlValue,
      email: emailValue,
      phone: phoneValue,
      city: cityValue
    }
  }).done(function(){
    //updating contact info
    $(editContact).remove()
    var updateContactCard = $($main).find("#"+idValue);
    $(updateContactCard).find('[data-value="name"]').text(nameValue)
    $(updateContactCard).find('[data-value="email"]').text(emailValue)
    $(updateContactCard).find('[data-value="phone"]').text(phoneValue)
    $(updateContactCard).find('[data-value="city"]').text(cityValue)
    $(updateContactCard).find('[data-value="url"]').attr('src', urlValue)
  })
})

//filtering out contacts based on categories
//gets ID off the A tag, then goes through each Contact card and hides what doesn't match
$main.on('click', 'aside a', function(){
  var categoryID = $(this).attr('class');
  var categoryName = this.innerText
  $(this).siblings().find('div').removeClass('active-category')
  $(this).find('div').addClass('active-category');
  $('.contacts').children().each(function(index){
  $(this).show();
  });
  $('.contacts').children().each(function(index){
    var toggle = $(this).hasClass( categoryID )
    if(toggle === false){
      $(this).hide()
    }
  })
})

  //routing variables
  var routes = {
    '/contacts': contacts,
    '/analytics': analytics,
    '/about': about
  }

  var router = Router(routes)
  router.init()

  //Couldn't get router to work for the home page so I did this little extra bit of code
  if(url === "http://104.236.60.122:3000/"){
    home()
  }

});