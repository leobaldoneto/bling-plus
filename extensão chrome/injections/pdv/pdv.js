// Imprime NFC-e automaticamente após envio.
setInterval(function(){
	let printNfcButton = document.querySelector(".act-print-invoice");
	// verifica se elemento está visível
	if( printNfcButton ){
		printNfcButton.click();
	}
}, 400);

// Botão de impressão de carnê
/*setInterval(function(){
	let preSaleButton = document.querySelector("#enviar_syspdv");
	if ( preSaleButton ) {
		console.log(preSaleButton.nextSibling)
		preSaleButton.nextSibling.innerText = "Imprimir carnê"
		preSaleButton.nextSibling.onclick= cliqueiaqui;
	}
}, 1000);*/