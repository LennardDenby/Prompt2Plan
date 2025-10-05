import { colors } from "@/theme/colors";
import { StyleSheet, Text, View } from "react-native";

export default function Tutorial() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ways to create events</Text>
            <View style={styles.list}>
                <View style={styles.item}>
                    <View style={styles.number}>
                        <Text style={styles.numberText}>1</Text>
                    </View>
                    <Text style={styles.itemText}>Enter your prompt in the text box</Text>
                </View>
                <View style={styles.item}>
                    <View style={styles.number}>
                        <Text style={styles.numberText}>2</Text>
                    </View>
                    <Text style={styles.itemText}>Share text to this app</Text>
                </View>
                <View style={styles.item}>
                    <View style={styles.number}>
                        <Text style={styles.numberText}>3</Text>
                    </View>
                    <Text style={styles.itemText}>Upload an image for analysis</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 120,
        gap: 20

    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 4,
    },
    list: {
        gap: 8,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    number: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.primary || '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    itemText: {
        fontSize: 16,
        color: '#6B7280',
        lineHeight: 22,
        paddingTop: 3,
    },
});