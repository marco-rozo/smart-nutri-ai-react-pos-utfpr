import { GoalEnum } from "@/app/enums/goalEnum";
import { DietResponseInterface } from "@/app/interfaces/dietReponseInterface";
import { GenerateDietParamsInterface } from "@/app/interfaces/generateDietParamsInterface";

const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: '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' });

export async function generateDiet({
    weight,
    height,
    age,
    gender,
    goal = GoalEnum.WeightLoss,
    restrictions = "Nenhum",
}: GenerateDietParamsInterface): Promise<string | DietResponseInterface> {
    try {
        const nextUserMessage = "peso: " + weight + " kg\nidade: " + age + " anos\nsexo: " + gender + "\naltura: " + height + " cm\nobjetivo: " + goal + "\nrestrições alimentares: " + restrictions;
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": "Estou fazendo um app onde gere uma dieta personalizada. O usuário insere o peso atual, idade, sexo (masculino ou feminino), altura e objetivo (ganho de massa, emagrecimento ou definição). Além disso o usuário pode informar uma lista de alimentos que ele NÂO QUER na dieta (não é obrigatório). Com base nisso você deve calcular uma dieta e informar os macronutrientes e calorias totais das refeições "
                },
                {
                    "role": "assistant",
                    "content": "Entendi o requisito. Aqui está uma possível implementação para calcular os macronutrientes e calorias totais de uma dieta personalizada. Abaixo está um exemplo de como fazer isso em Python:\n\n```python\nclass Dieta:\n    def __init__(self, peso_atual, idade, sexo, altura, objetivo):\n        self.peso_atual = peso_atual\n        self.idade = idade\n        self.sexo = sexo\n        self.altura = altura\n        self.objetivo = objetivo\n\n    def calcular_calorias_diarias(self):\n        # Taxa Metabólica Basal (TMB)\n        if self.sexo == 'masculino':\n            tmb = 66 + (13.7 * self.peso_atual) + (5 * self.altura) - (6.8 * self.idade)\n        else:\n            tmb = 655 + (9.6 * self.peso_atual) + (1.8 * self.altura) - (4.7 * self.idade)\n\n        # Fator de Atividade\n        if self.objetivo == 'ganho de massa':\n            fator_atividade = 1.6  # Sedentário\n        elif self.objetivo == 'emagrecimento':\n            fator_atividade = 1.2  # Moderadamente ativo\n        else:\n            fator_atividade = 1.4  # Levemente ativo\n\n        # Calorias diárias\n        calorias_diarias = tmb * fator_atividade\n\n        # Adequação às necessidades específicas\n        if self.objetivo == 'ganho de massa':\n            calorias_diarias *= 1.2\n        elif self.objetivo == 'emagrecimento':\n            calorias_diarias *= 0.8\n        else:\n            calorias_diarias *= 1\n\n        return calorias_diarias\n\n    def calcular_macronutrientes(self, calorias_diarias):\n        # Dicas gerais\n        proteinas_diarias = 1.6 * self.peso_atual  # Por kg de peso corporal\n        gorduras_diarias = 0.5 * calorias_diarias  # 50% das calorias diárias\n        carboidratos_diarias = calorias_diarias - proteinas_diarias - gorduras_diarias\n\n        # Adequação às necessidades específicas\n        if self.objetivo == 'ganho de massa':\n            proteinas_diarias *= 1.2\n        elif self.objetivo == 'emagrecimento':\n            proteinas_diarias *= 1\n        else:\n            proteinas_diarias *= 1\n\n        return proteinas_diarias, gorduras_diarias, carboidratos_diarias\n\n\n# Exemplo de uso\ndieta = Dieta(\n    peso_atual=70,\n    idade=25,\n    sexo='masculino',\n    altura=175,\n    objetivo='definição'\n)\n\nalimentos_rejeitados = ['leite', 'frango', 'ovo']\n\ncalorias_diarias = dieta.calcular_calorias_diarias()\nproteinas_diarias, gorduras_diarias, carboidratos_diarias = dieta.calcular_macronutrientes(calorias_diarias)\n\nprint(f'Calorias diárias: {calorias_diarias:.2f} cal')\nprint(f'Proteínas diárias: {proteinas_diarias:.2f} g')\nprint(f'Gorduras diárias: {gorduras_diarias:.2f} g')\nprint(f'Carboidratos diárias: {carboidratos_diarias:.2f} g')\n```\n\nNesse exemplo, definimos uma classe `Dieta` com métodos para calcular a quantidades diárias de calorias e macronutrientes (proteínas, gorduras e carboidratos) com base nas necessidades específicas do usuário. Você pode personalizar esses métodos para atender às necessidades específicas da sua aplicação.\n\nAgora que você tem uma base de código para trabalhar, você pode expandi-la de acordo com suas necessidades. Além disso, é importante lembrar que a fórmula de cálculo de calorias diárias utilizada aqui é uma simplificação e não aborda todas as variáveis que podem afetar as necessidades calóricas individuais.\n\n**Organizando a dieta em refeições**\n\nPara organizar a dieta em refeições, você pode dividir as calorias e macronutrientes diárias em 3 a 5 refeições principais (café da manhã, almoço, jantar e lanches).\n\nAqui está um exemplo"
                },
                {
                    "role": "user",
                    "content": "Quero te enviar apenas as informações (peso, idade, sexo, altura, objetivo, restrições alimentares) e você ira me responder APENAS com a dieta em formato JSON"
                },
                {
                    "role": "assistant",
                    "content": "Aqui está um exemplo de como você pode enviar as informações:\n\n```json\n{\n  \"peso_atual\": 70,\n  \"idade\": 25,\n  \"sexo\": \"masculino\",\n  \"altura\": 175,\n  \"objetivo\": \"definição\",\n  \"restrições_alimentares\": [\"leite\", \"frango\", \"ovo\"]\n}\n```\n\nE aqui está um exemplo de como eu posso responder com a dieta em formato JSON:\n\n```json\n{\n  \"calorias_diarias\": 2500,\n  \"macronutrientes\": {\n    \"proteinas_diarias\": 120,\n    \"gorduras_diarias\": 80,\n    \"carboidratos_diarias\": 300\n  },\n  \"refeições\": [\n    {\n      \"nome\": \"Café da Manhã\",\n      \"calorias\": 500,\n      \"proteinas\": 30,\n      \"gorduras\": 20,\n      \"carboidratos\": 60,\n      \"alimentos\": [\"aveia\", \"banana\", \"iogurte natural\"]\n    },\n    {\n      \"nome\": \"Almoço\",\n      \"calorias\": 700,\n      \"proteinas\": 50,\n      \"gorduras\": 30,\n      \"carboidratos\": 80,\n      \"alimentos\": [\"peixe grelhado\", \"arroz integral\", \"legumes\"]\n    },\n    {\n      \"nome\": \"Jantar\",\n      \"calorias\": 600,\n      \"proteinas\": 40,\n      \"gorduras\": 25,\n      \"carboidratos\": 70,\n      \"alimentos\": [\"frango grelhado\", \"batata doce\", \"espinafre\"]\n    },\n    {\n      \"nome\": \"Lanche\",\n      \"calorias\": 300,\n      \"proteinas\": 20,\n      \"gorduras\": 15,\n      \"carboidratos\": 40,\n      \"alimentos\": [\"iogurte natural\", \"nozes\", \"frutas\"]\n    }\n  ]\n}\n```\n\nAguardo as informações para gerar a dieta personalizada."
                },
                {
                    "role": "assistant",
                    "content": "```json\n{\n  \"calorias_diarias\": 2500,\n  \"macronutrientes\": {\n    \"proteinas_diarias\": 120,\n    \"gorduras_diarias\": 80,\n    \"carboidratos_diarias\": 300\n  },\n  \"refeições\": [\n    {\n      \"nome\": \"Café da Manhã\",\n      \"calorias\": 500,\n      \"proteinas\": 30,\n      \"gorduras\": 20,\n      \"carboidratos\": 60,\n      \"alimentos\": [\n        {\"nome\": \"Aveia\", \"quantidade\": \"40g\"},\n        {\"nome\": \"Banana\", \"quantidade\": \"1 unidade média\"},\n        {\"nome\": \"Whey\", \"quantidade\": \"30g\"}\n      ]\n    },\n    {\n      \"nome\": \"Almoço\",\n      \"calorias\": 700,\n      \"proteinas\": 50,\n      \"gorduras\": 30,\n      \"carboidratos\": 80,\n      \"alimentos\": [\n        {\"nome\": \"Peixe grelhado\", \"quantidade\": \"120g\"},\n        {\"nome\": \"Arroz integral\", \"quantidade\": \"100g\"},\n        {\"nome\": \"Legumes\", \"quantidade\": \"50g\"}\n      ]\n    },\n    {\n      \"nome\": \"Jantar\",\n      \"calorias\": 600,\n      \"proteinas\": 40,\n      \"gorduras\": 25,\n      \"carboidratos\": 70,\n      \"alimentos\": [\n        {\"nome\": \"Frango grelhado\", \"quantidade\": \"100g\"},\n        {\"nome\": \"Batata doce\", \"quantidade\": \"150g\"},\n        {\"nome\": \"Espinafre\", \"quantidade\": \"20g\"}\n      ]\n    },\n    {\n      \"nome\": \"Lanche\",\n      \"calorias\": 300,\n      \"proteinas\": 20,\n      \"gorduras\": 15,\n      \"carboidratos\": 40,\n      \"alimentos\": [\n        {\"nome\": \"Iogurte natural\", \"quantidade\": \"200g\"},\n        {\"nome\": \"Nozes\", \"quantidade\": \"20g\"},\n        {\"nome\": \"Frutas\", \"quantidade\": \"1 xícara\"}\n      ]\n    }\n  ]\n}\n```"
                },
                {
                    "role": "user",
                    "content": "peso: 89 kg\nidade: 24 anos\nsexo: masculino\naltura: 189 cm\nobjetivo: ganho de massa\nrestrições alimentares: brócolis"
                },
                {
                    "role": "assistant",
                    "content": "```json\n{\n  \"calorias_diarias\": 3200,\n  \"macronutrientes\": {\n    \"proteinas_diarias\": 168,\n    \"gorduras_diarias\": 96,\n    \"carboidratos_diarias\": 384\n  },\n  \"refeições\": [\n    {\n      \"nome\": \"Café da Manhã\",\n      \"calorias\": 600,\n      \"proteinas\": 40,\n      \"gorduras\": 24,\n      \"carboidratos\": 80,\n      \"alimentos\": [\n        {\"nome\": \"Aveia\", \"quantidade\": \"60g\"},\n        {\"nome\": \"Banana\", \"quantidade\": \"2 unidades médias\"},\n        {\"nome\": \"Whey\", \"quantidade\": \"40g\"},\n        {\"nome\": \"Leite integral\", \"quantidade\": \"200ml\"}\n      ]\n    },\n    {\n      \"nome\": \"Almoço\",\n      \"calorias\": 800,\n      \"proteinas\": 60,\n      \"gorduras\": 32,\n      \"carboidratos\": 100,\n      \"alimentos\": [\n        {\"nome\": \"Frango grelhado\", \"quantidade\": \"150g\"},\n        {\"nome\": \"Arroz integral\", \"quantidade\": \"150g\"},\n        {\"nome\": \"Legumes (abobrinha)\", \"quantidade\": \"50g\"}\n      ]\n    },\n    {\n      \"nome\": \"Jantar\",\n      \"calorias\": 700,\n      \"proteinas\": 50,\n      \"gorduras\": 28,\n      \"carboidratos\": 90,\n      \"alimentos\": [\n        {\"nome\": \"Salmon grelhado\", \"quantidade\": \"180g\"},\n        {\"nome\": \"Batata doce\", \"quantidade\": \"200g\"},\n        {\"nome\": \"Espinafre\", \"quantidade\": \"30g\"}\n      ]\n    },\n    {\n      \"nome\": \"Lanche\",\n      \"calorias\": 400,\n      \"proteinas\": 30,\n      \"gorduras\": 16,\n      \"carboidratos\": 60,\n      \"alimentos\": [\n        {\"nome\": \"Iogurte natural\", \"quantidade\": \"300g\"},\n        {\"nome\": \"Nozes\", \"quantidade\": \"30g\"},\n        {\"nome\": \"Frutas\", \"quantidade\": \"1 xícara\"}\n      ]\n    }\n  ]\n}\n```"
                },
                {
                    "role": "user",
                    "content": "me responda apenas com o JSON. Os macronutrientes e calorias pode ser o total da refeição, nao de cada alimento. Mas quero saber a quantidade de cada alimento, por exemplo: Arroz: 100g, Banana 1 unidade média, Whey: 30g. Com frutas, seja especifico, indicando qual a fruta e a quantidade em unidades ou em gramas. Para líquidos (Iogurte, por exemplo), use a medida em ml ou gramas\n"
                },
                {
                    "role": "assistant",
                    "content": "```json\n{\n  \"calorias_diarias\": 3200,\n  \"macronutrientes\": {\n    \"proteinas_diarias\": 168,\n    \"gorduras_diarias\": 96,\n    \"carboidratos_diarias\": 384\n  },\n  \"refeições\": [\n    {\n      \"nome\": \"Café da Manhã\",\n      \"calorias\": 600,\n      \"proteinas\": 40,\n      \"gorduras\": 24,\n      \"carboidratos\": 80,\n      \"alimentos\": [\n        {\"nome\": \"Aveia\", \"quantidade\": \"60g\"},\n        {\"nome\": \"Banana\", \"quantidade\": \"2 unidades médias\"},\n        {\"nome\": \"Whey\", \"quantidade\": \"40g\"},\n        {\"nome\": \"Leite integral\", \"quantidade\": \"200ml\"}\n      ]\n    },\n    {\n      \"nome\": \"Almoço\",\n      \"calorias\": 800,\n      \"proteinas\": 60,\n      \"gorduras\": 32,\n      \"carboidratos\": 100,\n      \"alimentos\": [\n        {\"nome\": \"Frango grelhado\", \"quantidade\": \"150g\"},\n        {\"nome\": \"Arroz integral\", \"quantidade\": \"150g\"},\n        {\"nome\": \"Abobrinha\", \"quantidade\": \"2 unidades médias\"}\n      ]\n    },\n    {\n      \"nome\": \"Jantar\",\n      \"calorias\": 700,\n      \"proteinas\": 50,\n      \"gorduras\": 28,\n      \"carboidratos\": 90,\n      \"alimentos\": [\n        {\"nome\": \"Salmon grelhado\", \"quantidade\": \"180g\"},\n        {\"nome\": \"Batata doce\", \"quantidade\": \"200g\"},\n        {\"nome\": \"Espinafre\", \"quantidade\": \"30g\"}\n      ]\n    },\n    {\n      \"nome\": \"Lanche\",\n      \"calorias\": 400,\n      \"proteinas\": 30,\n      \"gorduras\": 16,\n      \"carboidratos\": 60,\n      \"alimentos\": [\n        {\"nome\": \"Iogurte natural\", \"quantidade\": \"300g\"},\n        {\"nome\": \"Nozes\", \"quantidade\": \"30g\"},\n        {\"nome\": \"Maçã\", \"quantidade\": \"1 unidade média\"}\n      ]\n    }\n  ]\n}\n```"
                },
                {
                    "role": "user",
                    "content": nextUserMessage
                },
            ],
            "model": "llama-3.1-70b-versatile",
            "temperature": 1,
            "max_tokens": 1024,
        });

        const response = chatCompletion.choices[0]?.message.content;
        const responseFormated = response.replace(/```json\n/g, "").replace(/```/g, "");
        const dietResponse: DietResponseInterface = mapDietResponse(JSON.parse(responseFormated));
        return dietResponse;

    } catch (error) {
        console.error(error);
        return "Ocorreu um erro ao gerar a dieta. Por favor, tente novamente mais tarde.";
    }

}
const mapDietResponse = (response: any): DietResponseInterface => {
    return {
        calorias_diarias: response.calorias_diarias,
        macronutrientes: response.macronutrientes,
        refeicoes: response["refeições"].map((refeicao: any) => ({
            nome: refeicao.nome,
            calorias: refeicao.calorias,
            proteinas: refeicao.proteinas,
            gorduras: refeicao.gorduras,
            carboidratos: refeicao.carboidratos,
            alimentos: refeicao.alimentos.map((alimento: any) => ({
                nome: alimento.nome,
                quantidade: alimento.quantidade,
            })),
        })),
    };
};