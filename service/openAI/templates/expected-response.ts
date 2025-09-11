const responseTemplate = `
Você deve gerar um retorno no formato JSON com uma lista de passos no seguinte formato, sem a possibilidade de uma saída diferente:
[
	{
		"title": "Título da etapa sem número de ordenação",
		"description": "Descrição da etapa",
		"resourceTitle": "Título do recurso",
		"resourceUrl": "Link do recurso",
		"sort": 1
	}
]
`;

export default responseTemplate;
