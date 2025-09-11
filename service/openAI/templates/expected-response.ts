const responseTemplate = `
Gere um retorno no formato JSON com uma lista de passos no seguinte formato:
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
