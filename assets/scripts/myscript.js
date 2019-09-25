//Starting animations
AOS.init();

//Units per person
var saltines_per_person = 5; //Salgadinhos (O valor será dividido por dois)
var sweets_per_person = 5; //Doces (O valor será dividido por dois)
var drink_per_person = 0.6; //Refrigerante

//Define items x person
calculatePeople();
//People counter
$(document).on("input", "#adults", function () {
  var val = parseInt($(this).val());
  $(".lenght-adults").text(val);
  calculatePeople();
});
$(document).on("input", "#children", function () {
  var val = parseInt($(this).val());
  $(".lenght-children").text(val);
  calculatePeople();
});

function calculateSaltines(val) {
  var calculate = Math.round((saltines_per_person/2)*val);
  $(".saltines .item .units").html(calculate);
  $(".saltines .item .units").attr('units',calculate);

  //Including the values
  $("#salgadinho-frito").val(calculate);
  $("#salgadinho-assado").val(calculate);
}
function calculateSweets(val) {
  var calculate   = Math.round((sweets_per_person/2)*val);
  $(".sweets .item .units").html(calculate);
  $(".sweets .item .units").attr('units',calculate);

  //Including the values
  $("#brigadeiro").val(calculate);
  $("#beijinho").val(calculate);
}
function calculateDrinks(val) {
  var calculate   = (drink_per_person*val).toFixed(1);
  //var calculate   = 600*val;
  $(".drinks .item .units").html(calculate+" l");
  $(".drinks .item .units").attr('units',calculate);

  //Including the values
  $("#refri").val(calculate);
}

function calculatePeople(){
  var initValAdult    = parseInt($("#adults").val());
  var initValChildren = parseInt($("#children").val());

  var totalPerson = initValAdult+initValChildren;

  //console.log(totalPerson);

  calculateSaltines(totalPerson);
  calculateSweets(totalPerson);
  calculateDrinks(totalPerson);

}


$(function() {
  const cssClasses = [
  'rangeslider--is-lowest-value',
  'rangeslider--is-highest-value'
  ];
  
  $('input[type=range]')
  .rangeslider({
    polyfill: false
  })
  .on('input', function() {
    const fraction = (this.value - this.min) / (this.max - this.min);
    if (fraction === 0) {
      this.nextSibling.classList.add(cssClasses[0]);
    } else if (fraction === 1) {
      this.nextSibling.classList.add(cssClasses[1]);
    } else {
      this.nextSibling.classList.remove(...cssClasses)
    }
  });
});


//Define the height for items
$(document).ready(function(){
  var heightUnits     = $('.units').height();
  var widthUnits      = $('.units').width();
  var heightNameItem  = $('.name-item').height();
  var heightItemInit  = 0;

  if (heightUnits > heightNameItem) {
    heightItemInit = heightUnits;
  } else {
    heightItemInit = heightNameItem;
  }

  $('.item').css('height',heightItemInit);
  $('.item').css('margin-bottom','40px');
});

$('.tamanho-do-bolo-view').hide();
//If the user selects a cake the sizes of cakes will be displayed
$('.bolo-view').change(function(){
  var cake = $(this).val();
  if (cake) {
    $('.tamanho-do-bolo-view').show();
    $('.bolo-view').css('border','3px solid #ffb700');
  } else {
    $('.tamanho-do-bolo-view').hide();
  }
  $('.bolo').val(cake);
});
$('.tamanho-do-bolo-view').change(function(){
  var cake_size = $(this).val();
  $('.tamanho-do-bolo').val(cake_size);
  //console.log(cake_size);
  $('.tamanho-do-bolo-view').css('border','3px solid #ffb700');
});

function checkPersonalData() {
  var name       = $('#formulario-orcamento #name').val();
  var email      = $('#formulario-orcamento #email').val();
  var phone      = $('#formulario-orcamento #phone').val();

  var type_cake  = $('.type_cake').val();
  var cake       = $('.bolo-view').val();
  var sizeCake   = $('.tamanho-do-bolo-view').val();

  if (type_cake == "") {
    $('.type_cake').css('border','3px solid red');
    Swal({
      type: 'error',
      title: 'Você precisa selecionar um tipo de bolo!',
      showConfirmButton: true,
    });
  } else if (cake == "") {
    $('.bolo-view').css('border','3px solid red');
    Swal({
      type: 'error',
      title: 'Você precisa selecionar um sabor de bolo!',
      showConfirmButton: true,
    });
  } else if (sizeCake == "") {
    $('.tamanho-do-bolo-view').css('border','3px solid red');
    Swal({
      type: 'error',
      title: 'Você precisa escolher o tamanho do bolo!',
      showConfirmButton: true,
    });
  } else {

    if ((name == "") || (email == "") || (phone == "")) {
      //console.log('Empty data'); 
      $('#personalData').modal();
    }

  }
}

$('.whatsapp').tooltip();

//Send Mails
$(function(){
  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
  };
  
  $('.phone').mask(SPMaskBehavior, spOptions);

  $("#formulario-orcamento").submit(function(e){
    e.preventDefault();
    if($("#formulario-orcamento").valid()){
      $.ajax({
        url: 'http://actmob.com.br/calculadora-doce-magia/ajax/send-mail-orcamento.php', 
        type: 'post',
        dataType: 'json',
        data: $("#formulario-orcamento").serialize(),
        success: function(data){
          //console.log(data);
          if(data){
            Swal({
              type: 'success',
              title: 'Sua mensagem foi enviada com sucesso!',
              showConfirmButton: true,
            });
            $('#personalData').modal('hide');
            $('#formulario-orcamento #name').val('');
            $('#formulario-orcamento #email').val('');
            $('#formulario-orcamento #phone').val('');
          } else{
            Swal({
              type: 'error',
              title: 'Erro ao enviar a mensagem!',
              showConfirmButton: true,
            })
          }
        }, 
        error: function(erro){
          console.log(erro);
        }
      });
    }
  });
});