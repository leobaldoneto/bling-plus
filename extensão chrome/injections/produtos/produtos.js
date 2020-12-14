console.log('entrei aqui.');

// Captura o botão de adicionar variação e adiciona o atalho no final.
let addVariationButton = document.getElementById('aNovaLinhaItemVariacao');
addVariationButton.innerText += ' (Alt + Z)';

// Grade padrão para a variação 'Tamanho:'
let grade = ['34','36','38','40','42','44','46',
			'48','49','50','52','54','56','P','M',
			'G','GG','G1','G2','G3'];
			
// Variação padrão que é adicionada após utilizar o atalho de adição de variações.
let defaultVariationString = 'Tamanho:';

// Quando uma tecla é pressionada
document.addEventListener('keydown', (e) => {
	// Encontra a tab variações
	let variationTab = document
						.querySelector('li[data-tab="div_variacao"]')
						.firstElementChild;
	
	// Se Tecla ALT+Z e aba variações está ativa					
	if (e.code === "KeyZ" && 
		e.altKey === true && 
		e.repeat === false && 
		variationTab.className === 'active')
	{
		// encontra a última linha de variação adicionada
		let newVariationInput = document.getElementById('variacao');
		
		// se a linha já possui valor defaultVariationString
		if (newVariationInput.value === defaultVariationString){
			
			// captura string da última variação cadastrada
			let lastVariationString = newVariationInput
			.parentElement
			.parentElement
			.previousElementSibling
			.querySelector('[data-field="nomeVariacao"]')
			.firstElementChild
			.innerText;
			
			// captura string após defaultVariationString
			lastVariationSizeString = lastVariationString.substring(defaultVariationString.length);
			
			// qual o próximo tamanho no array 'grade'?
			let nextVariationSizeString = getNextVariationSize(lastVariationSizeString);
			
			// Concatena o próximo elemento do array na nova variação
			newVariationInput.value += nextVariationSizeString;
		}
		
		// clica em adicionar variação
		addVariationButton.click();
		
		// encontra a última linha de variação adicionada
		newVariationInput = document.getElementById('variacao');
		
		// aplica valor defaultVariationString no campo descrição da variação
		newVariationInput.value = defaultVariationString;
		
	}
});

// Verifica quem é o próximo tamanho no array 'grade'
let getNextVariationSize = function (lastVariationSizeString) {
	let index = grade.findIndex( (size, index, array) => {
		return size == lastVariationSizeString;
	});
	
	return grade[index + 1];
};

// Adiciona valores padrões para campos que sempre são iguais.
let unitInput = document.getElementById('unidade');
unitInput.value = 'UN';
console.log(unitInput);