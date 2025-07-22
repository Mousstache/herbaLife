import React from "react";

import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";

export default function Profil() {
    const { userData } = useLocalSearchParams();
    const router = useRouter();

    let user = null;
    try {
        user = userData ? JSON.parse(userData as string) : null;
    } catch (error) {
        console.error('Error parsing user data:', error);
    }

        if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Aucun utilisateur sélectionné</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Header avec photo de profil */}
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => router.push('/')}
                    >
                        <Text style={styles.backButtonText}>← Retour</Text>
                    </TouchableOpacity>
                    <Image 
                        source={{ uri: user.image?.link || 'https://via.placeholder.com/120' }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.displayName}>{user.display_name || user.first_name}</Text>
                    <Text style={styles.login}>@{user.login}</Text>
                    <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>Level {user.level}</Text>
                    </View>
                </View>

                {/* Informations personnelles */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>📋 Informations personnelles</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Nom complet:</Text>
                        <Text style={styles.infoValue}>{user.first_name} {user.last_name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email:</Text>
                        <Text style={styles.infoValue}>{user.email}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Téléphone:</Text>
                        <Text style={styles.infoValue}>{user.phone || 'Non renseigné'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Localisation:</Text>
                        <Text style={styles.infoValue}>{user.location || 'Non renseigné'}</Text>
                    </View>
                </View>

                {/* Statistiques académiques */}
                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>📊 Statistiques académiques</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{user.level}</Text>
                            <Text style={styles.statLabel}>Niveau</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{user.wallet}</Text>
                            <Text style={styles.statLabel}>Wallet</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{user.correction_point}</Text>
                            <Text style={styles.statLabel}>Points</Text>
                        </View>
                    </View>
                    {user.grade && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Grade:</Text>
                            <Text style={styles.infoValue}>{user.grade}</Text>
                        </View>
                    )}
                    {user.campus && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Campus:</Text>
                            <Text style={styles.infoValue}>{user.campus}</Text>
                        </View>
                    )}
                </View>

                {/* Compétences */}
                {user.skills && user.skills.length > 0 && (
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>🎯 Compétences</Text>
                        {user.skills.map((skill, index) => (
                            <View key={index} style={styles.skillItem}>
                                <View style={styles.skillHeader}>
                                    <Text 
                                        style={styles.skillName}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {skill.name}
                                    </Text>
                                    <Text style={styles.skillLevel}>Niveau {skill.level}</Text>
                                </View>
                                <View style={styles.progressBar}>
                                    <View 
                                        style={[
                                            styles.progressFill, 
                                            { width: `${skill.percentage}%` }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.skillPercentage}>{skill.percentage}%</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Projets */}
                {user.projects && user.projects.length > 0 && (
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>💼 Projets</Text>
                        {user.projects.map((project, index) => (
                            <View key={index} style={styles.projectItem}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectName}>{project.project.name}</Text>
                                    <Text style={[
                                        styles.projectStatus,
                                        { 
                                            color: project.status === 'finished' ? '#28a745' : 
                                                   project.status === 'in_progress' ? '#ffc107' : '#dc3545'
                                        }
                                    ]}>
                                        {project.status}
                                    </Text>
                                </View>
                                <Text style={styles.projectMark}>Note finale: {project.final_mark}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Achievements */}
                {user.achievements && user.achievements.length > 0 && (
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>🏆 Réalisations</Text>
                        {user.achievements.map((achievement, index) => (
                            <View key={index} style={styles.achievementItem}>
                                <Text style={styles.achievementName}>{achievement.name}</Text>
                                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollView: {
        flex: 1,
    },
    header: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 20,
        backgroundColor: '#007BFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        zIndex: 1,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#007BFF',
    },
    displayName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    login: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    levelBadge: {
        backgroundColor: '#007BFF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    levelText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    infoSection: {
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
        flex: 1,
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '400',
        flex: 1,
        textAlign: 'right',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        minWidth: 80,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    skillItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    skillHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    skillName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginRight: 10,
    },
    skillLevel: {
        fontSize: 14,
        color: '#666',
        flexShrink: 0,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginBottom: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007BFF',
        borderRadius: 4,
    },
    skillPercentage: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
    projectItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    projectName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    projectStatus: {
        fontSize: 14,
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    projectMark: {
        fontSize: 14,
        color: '#666',
    },
    achievementItem: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#fff3cd',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ffeaa7',
    },
    achievementName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#856404',
        marginBottom: 5,
    },
    achievementDescription: {
        fontSize: 14,
        color: '#856404',
        lineHeight: 20,
    },
    text: {
        fontSize: 18,
        color: "#333",
        textAlign: 'center',
    },
});