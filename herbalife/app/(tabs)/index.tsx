"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native"

interface Remedy {
  id: string
  name: string
  description: string
  image: string
  benefits: string[]
}

const remediesData: Remedy[] = [
  {
    id: "1",
    name: "Camomille",
    description: "Apaise les troubles digestifs et favorise le sommeil naturel",
    image: "/placeholder.svg?height=80&width=80",
    benefits: ["Anti-inflammatoire", "Relaxante", "Digestive"],
  },
  {
    id: "2",
    name: "Lavande",
    description: "Réduit le stress et l'anxiété, améliore la qualité du sommeil",
    image: "/placeholder.svg?height=80&width=80",
    benefits: ["Calmante", "Antiseptique", "Relaxante"],
  },
  {
    id: "3",
    name: "Gingembre",
    description: "Soulage les nausées et stimule la digestion naturellement",
    image: "/placeholder.svg?height=80&width=80",
    benefits: ["Anti-nausée", "Digestif", "Anti-inflammatoire"],
  },
  {
    id: "4",
    name: "Échinacée",
    description: "Renforce le système immunitaire et combat les infections",
    image: "/placeholder.svg?height=80&width=80",
    benefits: ["Immunostimulant", "Antiviral", "Antibactérien"],
  },
  {
    id: "5",
    name: "Menthe Poivrée",
    description: "Rafraîchit l'haleine et soulage les maux de tête",
    image: "/placeholder.svg?height=80&width=80",
    benefits: ["Rafraîchissante", "Antispasmodique", "Digestive"],
  },
  {
    id: "6",
    name: "Aloe Vera",
    description: "Hydrate et répare la peau, apaise les brûlures légères",
    image: "/placeholder.svg?height=80&width=80",
    benefits: ["Hydratante", "Cicatrisante", "Anti-inflammatoire"],
  },
]

export default function HerbalRemediesScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredRemedies, setFilteredRemedies] = useState(remediesData)

  const handleSearch = (text: string) => {
    setSearchQuery(text)
    if (text === "") {
      setFilteredRemedies(remediesData)
    } else {
      const filtered = remediesData.filter(
        (remedy) =>
          remedy.name.toLowerCase().includes(text.toLowerCase()) ||
          remedy.description.toLowerCase().includes(text.toLowerCase()),
      )
      setFilteredRemedies(filtered)
    }
  }

  const renderRemedyItem = ({ item }: { item: Remedy }) => (
    <View style={styles.remedyCard}>
      <View style={styles.remedyContent}>
        <Image source={{ uri: item.image }} style={styles.remedyImage} />
        <View style={styles.remedyInfo}>
          <Text style={styles.remedyName}>{item.name}</Text>
          <Text style={styles.remedyDescription}>{item.description}</Text>
          <View style={styles.benefitsContainer}>
            {item.benefits.slice(0, 2).map((benefit, index) => (
              <View key={index} style={styles.benefitTag}>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          {/* <ChevronRight size={20} color="#6B8E23" /> */}
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9F5" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {/* <Leaf size={28} color="#6B8E23" /> */}
          <Text style={styles.title}>Remèdes Naturels</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          {/* <Search size={20} color="#8B9A6B" style={styles.searchIcon} /> */}
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une plante..."
            placeholderTextColor="#8B9A6B"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Remedies List */}
      <FlatList
        data={filteredRemedies}
        renderItem={renderRemedyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9F5",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#F8F9F5",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D4A2B",
    marginLeft: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2D4A2B",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  remedyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  remedyContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  remedyImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F0F4E8",
  },
  remedyInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  remedyName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D4A2B",
    marginBottom: 6,
  },
  remedyDescription: {
    fontSize: 14,
    color: "#5A6B4A",
    lineHeight: 20,
    marginBottom: 10,
  },
  benefitsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  benefitTag: {
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 12,
    color: "#6B8E23",
    fontWeight: "500",
  },
  moreButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F0F4E8",
  },
})
