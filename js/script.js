// Desenvolvedor @juniordelonge

const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";

// Função para processar eventos de teclado e clique
function processKey(value) {
	if (value == "=" || value == "Enter") {
		try {
			let result = eval(prepareInput(input));
			display_output.innerHTML = cleanOutput(result);
		} catch (error) {
			display_output.innerHTML = "Erro de cálculo";
		}
	} else {
		if (value == "clear") {
			input = "";
			display_input.innerHTML = "";
			display_output.innerHTML = "";
		} else if (value == "backspace") {
			input = input.slice(0, -1);
			display_input.innerHTML = cleanInput(input);
		} else if (value == "brackets") {
			if (
				input.indexOf("(") == -1 ||
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") < input.lastIndexOf(")")
			) {
				input += "(";
			} else if (
				input.indexOf("(") != -1 &&
				input.indexOf(")") == -1 ||
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") > input.lastIndexOf(")")
			) {
				input += ")";
			}

			display_input.innerHTML = cleanInput(input);
		} else {
			if (validateInput(value)) {
				input += value;
				display_input.innerHTML = cleanInput(input);
			}
		}
	}
}

// Adicionei a função processKey ao loop existente
for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		processKey(value);
	});
}

// Adicionando ouvinte de eventos de teclado ao documento
document.addEventListener('keydown', (event) => {
	const key = event.key;

	// Verifique se a tecla pressionada é uma tecla permitida para cálculos
	if (key.match(/[0-9+\-*/.=]|Backspace|Enter/)) {
		event.preventDefault(); // Impede o comportamento padrão da tecla (por exemplo, rolar a página ao pressionar para cima/para baixo)

		// Chame a função que processa a entrada com base na tecla pressionada
		processKey(key);
	}
});

// Função para limpar a entrada exibida na tela
function cleanInput(input) {
	let input_array = input.split("");
	let input_array_length = input_array.length;

	for (let i = 0; i < input_array_length; i++) {
		if (input_array[i] == "*") {
			input_array[i] = ` <span class="operator">x</span> `;
		} else if (input_array[i] == "/") {
			input_array[i] = ` <span class="operator">÷</span> `;
		} else if (input_array[i] == "+") {
			input_array[i] = ` <span class="operator">+</span> `;
		} else if (input_array[i] == "-") {
			input_array[i] = ` <span class="operator">-</span> `;
		} else if (input_array[i] == "(") {
			input_array[i] = `<span class="brackets">(</span>`;
		} else if (input_array[i] == ")") {
			input_array[i] = `<span class="brackets">)</span>`;
		} else if (input_array[i] == "%") {
			input_array[i] = `<span class="percent">%</span>`;
		}
	}

	return input_array.join("");
}

// Função para formatar a saída exibida na tela
function cleanOutput(output) {
	let output_string = output.toString();
	let decimal = output_string.split(".")[1];
	output_string = output_string.split(".")[0];

	let output_array = output_string.split("");

	if (output_array.length > 3) {
		for (let i = output_array.length - 3; i > 0; i -= 3) {
			output_array.splice(i, 0, ",");
		}
	}

	if (decimal) {
		output_array.push(".");
		output_array.push(decimal);
	}

	return output_array.join("");
}
// Desenvolvedor @juniordelonge

// Função para validar a entrada do usuário
function validateInput(value) {
	let last_input = input.slice(-1);
	let operators = ["+", "-", "*", "/"];

	if (value == "." && last_input == ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(last_input)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}

// Função para preparar a entrada antes de avaliar a expressão
function prepareInput(input) {
	let input_array = input.split("");

	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}

	return input_array.join("");
}
