$(function(){
	var SPMaskBehavior = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
	spOptions = {
		onKeyPress: function(val, e, field, options) {
				field.mask(SPMaskBehavior.apply({}, arguments), options);
			}
	};
	
	$('.telefone').mask(SPMaskBehavior, spOptions);

	$("#formulario-cotacao").submit(function(e){
		e.preventDefault();
		if($("#formulario-cotacao").valid()){
			$.ajax({
				url: 'https://seudominio.com.br/ajax/send-mail-orcamento.php', 
				type: 'post',
				dataType: 'json',
				data: $("#formulario-cotacao").serialize(),
				success: function(data){
					console.log(data);
					if(data){
							Swal({
								type: 'success',
								title: 'Sua mensagem foi enviada com sucesso!',
								showConfirmButton: true,
							});
							$('.nome').val('');
							$('.email').val('');
							$('.telefone').val('');
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

$(function(){
	var SPMaskBehavior = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
	spOptions = {
		onKeyPress: function(val, e, field, options) {
				field.mask(SPMaskBehavior.apply({}, arguments), options);
			}
	};
	
	$('.telefone').mask(SPMaskBehavior, spOptions);

	$("#formulario-contato").submit(function(e){
		e.preventDefault();
		if($("#formulario-contato").valid()){
			$.ajax({
				url: 'https://seudominio.com.br/ajax/send-mail-orcamento.php',
				type: 'post',
				dataType: 'json',
				data: $("#formulario-contato").serialize(),
				success: function(data){
					console.log(data);
					if(data){
							Swal({
									type: 'success',
									title: 'Sua mensagem foi enviada com sucesso!',
									showConfirmButton: true,
							});
							$('.nome').val('');
							$('.email').val('');
							$('.telefone').val('');
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