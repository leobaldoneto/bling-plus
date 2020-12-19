// Captura o botão de adicionar variação e adiciona o atalho no final.
let addVariationButton = document.getElementById('aNovaLinhaItemVariacao');
addVariationButton.innerText += ' (Alt + Z)';

// Grade padrão para a variação 'Tamanho:'
let grade = ['34','36','38','40','42','44','46',
			'48','50','52','54','56','P','M',
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
			
			// captura última variação cadastrada
			let variationInputElement = newVariationInput
			.parentElement
			.parentElement
			.previousElementSibling;
			
			if( variationInputElement ) {
				lastVariationString = variationInputElement.querySelector('[data-field="nomeVariacao"]').firstElementChild.innerText;
				// captura string após defaultVariationString
				lastVariationSizeString = lastVariationString.substring(defaultVariationString.length);
			
				// qual o próximo tamanho no array 'grade'?
				let nextVariationSizeString = getNextVariationSize(lastVariationSizeString);
			
				// Concatena o próximo elemento do array na nova variação
				newVariationInput.value += nextVariationSizeString;
			} else {
				newVariationInput.value += 'Único';
			}
			return true;
		}
		
		// clica em adicionar variação
		addVariationButton.click();
		
		// encontra a última linha de variação adicionada
		newVariationInput = document.getElementById('variacao');
		
		// aplica valor defaultVariationString no campo descrição da variação
		newVariationInput.value = defaultVariationString;
		
		// Se pressionada CTRL+S, salva produto aberto.
		// verifica se tela de edição está aberta.
	} else if (e.code === "KeyS" && 
				e.ctrlKey === true && 
				e.repeat === false && 
				getDisplayStatusById('edicao') === 'block')
	{
		// Evita ação padrão
		e.preventDefault();
		e.stopPropagation();
		
		// Seleciona o campo descrição
		document.getElementById('nome').select();
		
		// Executa o comando copiar texto
		document.execCommand("copy");
		
		// Clica em salvar
		document.getElementById('botaoSalvar').click();
		
	// Se Tecla CTRL + D, clonar primeiro item pai
	} else if (e.code === "KeyD" && 
			e.ctrlKey === true && 
			e.repeat === false)
	{
		console.log('pressionou CTRL+D');
		e.preventDefault();
		e.stopPropagation();
		let productTable = document.querySelector('#datatable > table > tbody');
		let productTableRows = productTable.children;
		let productTableRowsArray = Array.from(productTableRows);
		// Iteração nas linhas da tabela
		for ( let tableRow of productTableRowsArray ) {
			// Se tr não ontém "Tamanho:" no nome
			if( !tableRow.attributes.nome.nodeValue.includes('Tamanho:') ) {
				// Esse é o primeiro produto pai da lista
				// Encontrar botão clonar
				let dropDownButton = tableRow.querySelector('.context-menu-item');
				dropDownButton.click();
				
				// Implementar: A pesquisa precisa esperar o botão aparecer
				
				let cloneButton = dropDownButton.querySelector('.fa-clone');
				cloneButton.click();
				break;
			}
		}

	// Se Tecla ALT + F, abrir tela do primeiro fornecedor
	} else if (e.code === "KeyF" && 
				e.altKey === true && 
				e.repeat === false && 
				getDisplayStatusById('edicao') === 'block')
	{
		// Evita ação padrão
		e.preventDefault();
		e.stopPropagation();
		
		// Clica no botão editar do primeiro fornecedor
		document.querySelector('a[title="Editar fornecedor"] > span').click();
		
	// Se Tecla CTRL + D, clonar primeiro item pai
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
//
// *Valores setados*
// Unidade: UN
//
// Evento ao mudar o foco do cursor
document.addEventListener('focusin', (e) => {
	// Testa se o novo foco está na descrição do cadastro de um produto.
	// Dessa forma posso identificar se abri um cadastro
	if (e.target.id === 'nome') {
		let unitInput = document.getElementById('unidade');
		if (unitInput.value !== 'UN'){
			unitInput.value = 'UN';
		}
		
		
		
		/*
		// clona input de preço
		let priceInput = document.querySelector('.preco-venda-atributo-produto');
		let clone = priceInput.cloneNode(true);
		console.log(clone);
		let divDadosGerais = document.querySelector('[data-content="div_dados_gerais"]');
		console.log(divDadosGerais);
		divDadosGerais.insertBefore(clone, priceInput.nextSibling);
		*/
	}
});
console.log('cheguei aqui');

let getDisplayStatusById = function (id) {
	let element = document.getElementById(id);
	let style = getComputedStyle(element);
	return style.display;
};
