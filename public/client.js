
$(function() {
  
  $.get('/forms', function(forms) {
    forms.forEach(function(form) {
      $('<li></li>').text(form).appendTo('ui#forms');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    form = $('input').val();
    $.post('/forms?' + $.param({form: form}), function() {
      $('<li></li>').text(form).appendTo('ui#forms');
      $('input').val('');
      $('input').focus();
    });
  });

});

