// No Frente de Caixa, imprime NFC-e automaticamente após a autorização da Sefaz.

// link mask:
*bling.com.br*pdv.php

// javascript:
setInterval(function(){
	let printNfcButton = document.querySelector(".act-print-invoice");
	// verifica se elemento existe
	if( printNfcButton ){
		printNfcButton.click();
	}
}, 400);
