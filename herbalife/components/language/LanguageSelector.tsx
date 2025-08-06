import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation, languageOptions } from '../../i18n';

export const LanguageSelector = () => {
  const { t, setLocale, currentLanguage } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageChange = (languageCode: string) => {
    setLocale(languageCode);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.languageSelector}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectorContent}>
          <Text style={styles.languageLabel}>{t('common.language')}</Text>
          <View style={styles.selectedLanguage}>
            <Text style={styles.languageText}>{currentLanguage.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#96c5a8" />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('common.language')}</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={languageOptions}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    currentLanguage.code === item.code ? styles.selectedOption : null
                  ]}
                  onPress={() => handleLanguageChange(item.code)}
                >
                  <Text style={[
                    styles.languageOptionText,
                    currentLanguage.code === item.code ? styles.selectedOptionText : null
                  ]}>
                    {item.name}
                  </Text>
                  {currentLanguage.code === item.code && (
                    <Ionicons name="checkmark" size={20} color="#39e079" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  languageSelector: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3e32',
  },
  selectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: '#96c5a8',
    marginRight: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1a2f1f',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3e32',
  },
  selectedOption: {
    // backgroundColor: 'rgba(57, 224, 121, 0.1)',
  },
  languageOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#39e079',
    fontWeight: '600',
  },
});
