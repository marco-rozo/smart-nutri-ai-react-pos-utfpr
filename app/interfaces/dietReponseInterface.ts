interface MacronutrientsInterface {
    proteinas_diarias: number;
    gorduras_diarias: number;
    carboidratos_diarias: number;
}

interface FoodInterface {
    nome: string;
    quantidade: string;
}

interface MealInterface {
    nome: string;
    calorias: number;
    proteinas: number;
    gorduras: number;
    carboidratos: number;
    alimentos: FoodInterface[];
}

export interface DietResponseInterface {
    calorias_diarias: number;
    macronutrientes: MacronutrientsInterface;
    refeicoes: MealInterface[];
}