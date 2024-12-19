import styles from "@/app/styles";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, } from "react-native";
import { GenderEnum } from "./enums/genderEnum";
import { GenerateDietParamsInterface } from "./interfaces/generateDietParamsInterface";
import { GoalEnum } from "./enums/goalEnum";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from 'expo-router';

export default function Index() {
  const genderItems = [
    { label: "Masculino", value: GenderEnum.Male },
    { label: "Feminino", value: GenderEnum.Female }
  ];

  const goalItems = [
    { label: "Ganho de massa", value: GoalEnum.GainMass },
    { label: "Emagrecimento", value: GoalEnum.WeightLoss },
    { label: "Definição", value: GoalEnum.Definition }
  ];

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [restrictions, setRestrictions] = useState(""); // Estado para restrições alimentares
  const [openGender, setOpenGender] = useState(false);
  const [genderValue, setGenderValue] = useState<GenderEnum>(GenderEnum.Male);
  const [genderItemsState, setGenderItems] = useState(genderItems);
  const [openGoal, setOpenGoal] = useState(false);
  const [goalValue, setGoalValue] = useState<GoalEnum>(GoalEnum.GainMass);
  const [goalItemsState, setGoalItems] = useState(goalItems);

  const handleGenerateDiet = () => {
    if (!age || !weight || !height) {
      alert("Preencha os Idade, peso e altura para gerar a dieta");
      return;
    }

    const dietParams: GenerateDietParamsInterface = {
      weight,
      height,
      age,
      gender: genderValue || GenderEnum.Male,
      goal: goalValue || GoalEnum.GainMass,
      restrictions,
    };

    const dietParamsJson = JSON.stringify(dietParams);
    debugger
    router.push({ pathname: '/dietDetail', params: { dietParamsJson } })
  };

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Smart Nutri - AI</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        placeholder="Idade"
        style={styles.input}
      />

      <TextInput
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        placeholder="Peso (em Kg)"
        style={styles.input}
      />

      <TextInput
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        placeholder="Altura (em cm)"
        style={styles.input}
      />

      <TextInput
        value={restrictions}
        onChangeText={setRestrictions}
        multiline
        numberOfLines={5}
        placeholder="Insira suas restrições alimentares ou alimentos separados por vírgula. Ex.: Glúten, brócolis,..."
        style={styles.textArea}
      />


      {/* Dropdown para Gênero */}
      <Text style={styles.label}>Gênero</Text>
      <DropDownPicker
        style={styles.dropdown}
        zIndex={3000}
        zIndexInverse={1000}
        open={openGender}
        value={genderValue}
        items={genderItemsState}
        setOpen={setOpenGender}
        setValue={setGenderValue}
        setItems={setGenderItems}
      />

      <Text style={styles.label}>Objetivo</Text>
      <DropDownPicker
        placeholder="Selecione o objetivo"
        zIndex={2000}
        zIndexInverse={2000}
        style={styles.dropdown}
        open={openGoal}
        value={goalValue}
        items={goalItemsState}
        setOpen={setOpenGoal}
        setValue={setGoalValue}
        setItems={setGoalItems}
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerateDiet}>
        <Text style={styles.buttonText}>{isLoading ? "Carregando..." : "Gerar Dieta Inteligente"}</Text>
      </TouchableOpacity>


      {/* {
        dietResponse && (
          <MotiView
            style={styles.card}
            from={{ opacity: 0, translateX: 200 }}
            animate={{ opacity: 1, translateX: 0 }}
          >
            <Text style={styles.cardTitle}>Sua desculpa está pronta:</Text>
            <Text style={styles.cardText}>{dietResponse}</Text>
          </MotiView>
        )
      } */}

    </View>
  );
}
