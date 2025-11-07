// src/screens/HomeScreen.js
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function HomeScreen() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomItem, setRandomItem] = useState(null);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:3000/menu");
      setMenu(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandom = async () => {
    try {
      const res = await axios.get("http://localhost:3000/menu/random");
      setRandomItem(res.data);
    } catch (err) {
      console.error("Error fetching random item:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#d2691e" />
        <Text style={styles.loadingText}>Loading Menu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>☕ Coffee Shop Menu</Text>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu Items in Horizontal Scroll */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Specialties</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalContent}
          >
            {menu.map((item) => (
              <View key={item._id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                  {item.inStock ? (
                    <Text style={styles.price}>Rs. {item.price}</Text>
                  ) : (
                    <Text style={styles.outOfStock}>Out of Stock</Text>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Surprise Me Section */}
        <View style={styles.surpriseSection}>
          <TouchableOpacity style={styles.button} onPress={fetchRandom}>
            <Text style={styles.buttonText}>🎁 Surprise Me!</Text>
          </TouchableOpacity>

          {randomItem && (
            <View style={styles.surpriseCard}>
              <Text style={styles.surpriseTitle}>Your Lucky Pick! 🍀</Text>
              <View style={styles.surpriseContent}>
                <Image source={{ uri: randomItem.image }} style={styles.surpriseImage} />
                <View style={styles.surpriseDetails}>
                  <Text style={styles.surpriseName}>{randomItem.name}</Text>
                  <Text style={styles.surpriseCategory}>{randomItem.category}</Text>
                  <Text style={styles.surprisePrice}>Rs. {randomItem.price}</Text>
                  <Text style={randomItem.inStock ? styles.inStock : styles.outOfStock}>
                    {randomItem.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f5f0",
    paddingTop: 60,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5d4037",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#795548",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  horizontalScroll: {
    paddingLeft: 15,
  },
  horizontalContent: {
    paddingRight: 15,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    width: 160,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginBottom: 10,
  },
  cardContent: {
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontWeight: "bold",
    color: "#4e342e",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  category: {
    color: "#8d6e63",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
  },
  price: {
    color: "#d2691e",
    fontWeight: "bold",
    fontSize: 16,
  },
  outOfStock: {
    color: "#e53935",
    fontWeight: "bold",
    fontSize: 12,
  },
  surpriseSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#6d4c41",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  surpriseCard: {
    backgroundColor: "#fff8e1",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "#ffd54f",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  surpriseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5d4037",
    textAlign: "center",
    marginBottom: 15,
  },
  surpriseContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  surpriseImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
  },
  surpriseDetails: {
    flex: 1,
  },
  surpriseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4e342e",
    marginBottom: 5,
  },
  surpriseCategory: {
    fontSize: 14,
    color: "#8d6e63",
    marginBottom: 8,
  },
  surprisePrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d2691e",
    marginBottom: 8,
  },
  inStock: {
    color: "#388e3c",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f5f0",
  },
  loadingText: {
    marginTop: 10,
    color: "#5d4037",
    fontSize: 16,
  },
});