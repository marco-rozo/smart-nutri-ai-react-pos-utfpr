import styles from "@/app/styles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, SafeAreaView } from "react-native";
import LoadingScreen from "./loadingScreen";
import { GenerateDietParamsInterface } from "./interfaces/generateDietParamsInterface";
import { generateDiet } from "./services/ai/smartNutri";
import { DietResponseInterface } from "./interfaces/dietReponseInterface";

export default function DietDetail() {
  const { dietParamsJson } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true)
  const [dietResponse, setDietResponse] = useState<DietResponseInterface | undefined>()
  const [responseError, setResponseError] = useState<string>('')

  const callDiet = async (dietParams: GenerateDietParamsInterface) => {
    try {
      const result = await generateDiet(dietParams);
      if (typeof result === "string") {
        setResponseError(result);
      } else {
        setDietResponse(result);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    callDiet(JSON.parse(dietParamsJson.toString()));
  }, []);

  if (isLoading) {
    return LoadingScreen();
  }

  if (responseError != '') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{responseError}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Dieta gerada</Text>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.mealContainer}>
          <Text style={styles.text}>Calorias Diárias: {dietResponse?.calorias_diarias}</Text>
          <Text style={styles.text} >Proteínas Diárias: {dietResponse?.macronutrientes.proteinas_diarias}</Text>
          <Text style={styles.text} >Gorduras Diárias: {dietResponse?.macronutrientes.gorduras_diarias}</Text>
          <Text style={styles.text}>Carboidratos Diários: {dietResponse?.macronutrientes.carboidratos_diarias}</Text>
        </View>
        {dietResponse?.refeicoes.map((meal, index) => (
          <View key={index} style={styles.mealContainer}>
            <Text style={styles.mealTitle}>{meal.nome}</Text>
            <Text style={styles.info}>Calorias: {meal.calorias} kcal</Text>
            <Text style={styles.info}>Proteínas: {meal.proteinas}g</Text>
            <Text style={styles.info}>Gorduras: {meal.gorduras}g</Text>
            <Text style={styles.info}>Carboidratos: {meal.carboidratos}g</Text>
            <Text style={styles.info}>Alimentos:</Text>
            {meal.alimentos.map((food, foodIndex) => (
              <Text key={foodIndex} style={styles.foodItem}>
                - {food.nome} ({food.quantidade})
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
