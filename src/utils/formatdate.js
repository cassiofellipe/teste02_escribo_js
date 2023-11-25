

export const formatdate = (timestamp) => {

	// Obtém o timestamp atual usando Date.now()

	// Cria um objeto Date a partir do timestamp
	const data = new Date(timestamp)

	// Obtém o dia, mês e ano
	const dia = data.getDate()
	const mes = data.getMonth() + 1 // Lembre-se que os meses começam do zero
	const ano = data.getFullYear()

	// Formata a data no formato dd/mm/aaaa
	const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`

	return dataFormatada
}
