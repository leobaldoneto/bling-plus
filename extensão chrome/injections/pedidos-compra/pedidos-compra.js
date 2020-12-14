document.addEventListener('keydown', (e) => {
	if (e.code === "KeyX" && 
	e.altKey === true && 
	e.repeat === false && 
	getDisplayStatusById('edicao') === 'block') {
		// pegar valores da lista
		let productAutoComplete = document.getElementById('ui-id-5')
		let productsCollection = productAutoComplete.children;
		let productsSkuArray = [];
		
		for (i = 0; i < productsCollection.length; i++) {
			let codString = productsCollection[i] // li
			.firstChild // a
			.firstChild // div
			.lastChild // span
			.innerText;
			
			productsSkuArray[i] = codString.slice(codString.length - 13);
		}
		console.log(productsSkuArray);
		
		//entrar em um loop
		productsSkuArray.forEach( (sku) => {
			document.activeElement.value = sku;
			productAutoComplete.firstChild.click();
			document.getElementById('aNovaLinhaItem').click();
		});
		
		// clicar no próximo elemento
		
		// adicionar linha
		
		// escrever valor do próximo
		
		// clicar no próximo.
	}
});
		
let getDisplayStatusById = function (id) {
	let element = document.getElementById(id);
	let style = getComputedStyle(element);
	return style.display;
}

const delayMs = ms => new Promise(res => setTimeout(res, ms));

console.log('injetado');