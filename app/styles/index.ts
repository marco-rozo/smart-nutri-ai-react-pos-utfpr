import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20
    },
    containerCenter: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FF6B6B',
        marginBottom: 10
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 8
    },
    button: {
        backgroundColor: '#4ECDC4',
        height: 50,
        alignItems: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center',
        textDecorationColor: 'white'
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#FFF',
        textTransform: 'uppercase',
        textAlign: 'left'
    },
    label: {
        width: '100%',
        textAlign: 'left',
        marginBottom: 4,
        marginLeft: 8,
    },
    dropdown: {
        height: 50,
        width: "100%",
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    textArea: {
        width: '100%',
        height: 100,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 8,
        textAlignVertical: 'top',
    },
    text: {
        marginTop: 16,
        fontSize: 16,
        color: "#333",
        textAlign: "left",
    },
    info: {
        fontSize: 16,
        marginVertical: 4,
        color: "#333",
    },
    mealContainer: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#f8f8f8",
        borderWidth: 1,
        borderColor: "#ddd",
      },
    mealTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#222",
    },
    foodItem: {
        fontSize: 14,
        color: "#666",
    },
})

export default styles;