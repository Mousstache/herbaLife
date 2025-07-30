import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useContraindications } from '@/contexts/ContraindicationsContext';

const { width } = Dimensions.get('window');

interface ContraindicationItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const contraindicationsData: ContraindicationItem[] = [
  {
    id: 'grossesse',
    title: 'Grossesse',
    description: 'Certaines plantes peuvent être déconseillées pendant la grossesse.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA-IIMGpk2vAGMIkE8Xnl7HVuaWD4aZDLqFMOhxh9lXQZ0H8QZ4mILFmjAOyQr0OlQqfPahkjyEzukeHVmnPAAFAY7VevjdjqgyIlsoGoLmj0sfET-297BUJNUd66UZpcG6GZ6DpHB0yoCjjIIe_VDBzCCH-i4S6HuR42yCrqQTGSQE0DjeKy14spRZ-dmA46ZLkXU4LBrC4zY-99vEM3bt1J7Qco9J5DElK2U2o_gE2HPXmAJGLyLS9wOpdAlrWIOHA9IflOLWJE'
  },
  {
    id: 'cardiovasculaire',
    title: 'Problèmes Cardiovasculaires',
    description: 'Si vous avez des problèmes cardiaques, certaines plantes peuvent interagir avec vos médicaments.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9-9Pt9OJugsMzbU5BVo1coy5DVzClfcyGdxg_J4N3jlA9qEJ36bHAVDJHkZlOx2enzdfvvAMTM5c0ffG-sIJqBthIG8UdFwOPa_wD1yaOpK_JwVP3HiDZCb8HF91glmwafJfxSlPMo9BCmPFsh5O8Uns6tbu3NWXjJ06BszWPvt5YHpVqx6uHZoeQM_ulGSRTTcffQqcggG6ofvmSOO6GbK_E8nGkhDqCuHbWInB_hCmJwQqz1swFgcRCooEWkxbKeF4aBGBRmFU'
  },
  {
    id: 'allergies',
    title: 'Allergies',
    description: 'Veuillez indiquer si vous avez des allergies connues à certaines plantes.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATk4kefTNt_Fx93GO09QhmCv9-_gadOPGP0B-iijQk-EaoNwuhCAheYthRZpN62XvAVRDvGkA130esBHO3aY4GSa_UrxoBA-ak7TNBTIh5NdKIxHX8SlTlC1YE5YY2m9_MY7o7Pv2RkOZfbdElYzhl044eP6NOGAU1oms-coKW6x9GZkb6UnO0SjKBCLOHC_DTFJn3VTPtQ-O1dZSpTGl-3YFTMmkRSk33DDrh23V09gQXhXl-VnX9FsFGVJKGqOzYV8upVZ-ZQuY'
  },
  {
    id: 'diabete',
    title: 'Diabète',
    description: 'Certaines plantes peuvent affecter la glycémie.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg1WgrQRbxRbmMpK9dewaTYCPw5Ux825M09O0fjwXxnNkjySlTqsqgVN2ZzgiS3SiuzzvPVlgciBq4I8eI10YZZy-pX9tg1lSWoLw54zhosD4-rQh_NGFBdjgTMOpRdbU1CbCE6rbd3VYTgR9ah3dDM8taJEv5Ue2ctXOz4Lg09d0EkbHegV61LM3-5XtuVlN6LN-6_UCxrKBLLUG4-nig-wUQYkFJlnApf5ztXqr0Vkwsr9cz8EHV4UPAyKWYIey-QpRH-8tYsrU'
  },
  {
    id: 'hypertension',
    title: 'Hypertension',
    description: 'Certaines plantes peuvent influencer la tension artérielle.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXhvzf40eZz8npZeDtrX63rfeE2ooKLc8-oc-Wqfl3a3ZCMIESlULbSnEieUdV9cXtCnPMH7M3lOoba87mLDV8c1lNxRUAr2Bw4ckZrMGo6a6KucOHsNzAK1Cne7JFGkVZNSpbHVuNcfyEhdFrTvOT_58yTrnl5dikUls8NLj6t5RrkBRUvQM1sB2x0OcgQoMCTHLmYviXp6Yxhr_cd0w4TcJqkxQT_2UHeuYTuZrnY5YlAwwpkGOnwpUIaG4_zy6zQN8_P538qto'
  },
  {
    id: 'hypotension',
    title: 'Hypotension',
    description: 'Certaines plantes peuvent influencer la tension artérielle.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrT0A_mYvsBq8nEWjh01OYPVCXUqBes5WRCsghvCbRo6czA-j5P5Ol97GM5goBNd37z4lHEX9E-7YOwS5Vd4-S4VfXC1h9iDf0RoWHgz3MrmfQBDJME2HqjvaJN6PLzErx9uY9_8aFYfz1IwWPxbLAKNx6w-8e6nL7G5A7Jw0u4cs6SDwslnczrzBWwsSDmm0tMk6crbuCqq4ZRgVcviW7N7PUBxF9F7sQbO6dGqJOzayz0xeBQjA63njWBiaHwugic9mcdamc-II'
  },
  {
    id: 'reins',
    title: 'Problèmes Rénaux',
    description: 'Si vous avez des problèmes rénaux, certaines plantes peuvent être déconseillées.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYcl_ysPng12BVaULJdqPiONGmRsi5BPFgnhLywDw5t7b55Tc_K2NQho3r6TYQnRerNrlUCRC0uogY9j1CUH1-k-A9M0RU7_v-5GwjtknRDGSqQ0Dw1nkg4wM90w9hfC-NvPMRA4DMAeu8WFbcvPeLVlzxinWzG6ZaT47QiHhq8JLIC4GZNI6OljGXwxoGpXu4pnfovyCFp6bisdkrIwJ2sBEn7lxMedb_ZbzZw--v7WykfVC9nWyLY7TNMjNIcpdh2Ky40t0vnw8'
  },
  {
    id: 'hepatique',
    title: 'Problèmes Hépatiques',
    description: 'Si vous avez des problèmes hépatiques, certaines plantes peuvent être déconseillées.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDESgpUDeEiwM49WlizzB1w0KtFrtRYXSudoN3SvY_CVk4S6qFKCi41pAieVqeumv7zo-b52_HbB8uMB1Xh8g5QqBcQcETrSJ88AlIpv4W9oBFv42iM0Mbt2Ukhk50_0XD5_QnRzhRqadIO2SHHMQh03nC4SegktieN4VROKCaq2yfzUadSduCQXAD24fRMvbpkLm1prIycDYxzzb7SIPl2hv7qsiUecfcrzJ1PGs_f9eSGgrT4dkbyY5E6yDV-wzKdc_N3tgVnUUs'
  },
  {
    id: 'coagulation',
    title: 'Troubles de la Coagulation',
    description: 'Certaines plantes peuvent affecter la coagulation sanguine.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJVr-acelubJIgdJdLl7leE_HYJNaal7JtUsgtfrtEpruKJt2xr3DLGNauIKxvxA3yQbxVv8JNfhVsBv1fjqzVyRTAqPEpDKm0FWD1i6159aMNgwFVmPy4XkyGmPpwTKRccsuTFGeKPTL2XfR7rjJrcvL7C-OohC9-hNYR6M2lwjZTQwbWXBloG82x7fa35YzxymIJY2lpT94tBT9PyTjraHdEbaAig4r5PgsRHcsuaB6DTtwukDzol2roq9Inr2jfCO80JRql3SA'
  },
  {
    id: 'medicaments',
    title: 'Prise de Médicaments',
    description: 'Indiquez si vous prenez des médicaments, car certaines plantes peuvent interagir.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPhAjVsm8htUV-d4tAGWDYnD9OudWMX06MMFk7d4QLbwnuMi8MoWO2tCfe75VcR_cXIP1nbo2cBA0DgEU8Os4DbaixphIVVA4oNwzGQAOitRhwLIA1N9QetZA4v07nY5ddjbiTm42gZ-TsOnQeHng5LI_WX34gRLhndAiG1NrpYQanJ2-K47tt7llowxJU1H6ZjNLFBYiddwtCPKOSZkUwdXo9-9G8oneUKV9BOUQbmW-OvK5adcvVj7iOovPBV8uqLirgBYK-PNk'
  },
  {
    id: 'autres',
    title: 'Autres Conditions Médicales',
    description: 'Si vous avez d\'autres conditions médicales, veuillez les préciser.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGH9_IH93Nb4M58Xh3exO2-coAUuI5TRPAxBimgDf4wgGAKaMUfdCmt6zsJ-SqzOS6ND-FnXg9vqo1WqGXzbAYwkqKsa6ncSDbGsCD_EWzMjDlS5rVmP7UlKdLUKzHNSQMCPYhHC8MbYqyLB3D3eGl5a0MsoBF1CfAVt8OgRGx6Pm3iqSe5JwtLn2_gJk05cYsuNMr3hYwuWqlwQE9_xrV-URSXb1wLggjSiIUi0MXLVl8bV0bfEZwfAz4Di79BzeoOpqLeiTDhDw'
  }
];

export default function ContraindicationsScreen() {
  const [selectedContraindications, setSelectedContraindications] = useState<string[]>([]);
  const contraindicationsContext = useContraindications();

  const toggleContraindication = (id: string) => {
    setSelectedContraindications(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleClose = () => {
    router.push('/')
  };

  const handleNext = async () => {
    await contraindicationsContext.saveContraindications(selectedContraindications);
    router.push('/body-zones');
  };

  const renderContraindicationItem = (item: ContraindicationItem) => {
    const isSelected = selectedContraindications.includes(item.id);
    
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.contraindicationItem, isSelected && styles.selectedItem]}
        onPress={() => toggleContraindication(item.id)}
      >
        <View style={styles.contraindicationContent}>
          <Text style={styles.contraindicationLabel}>Contre-indications</Text>
          <Text style={styles.contraindicationTitle}>{item.title}</Text>
          <Text style={styles.contraindicationDescription}>{item.description}</Text>
        </View>
        <Image source={{ uri: item.imageUrl }} style={styles.contraindicationImage} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <Text style={styles.nextText}>Suivant</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Vos Préférences Personnelles</Text>
        {/* Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {contraindicationsData.map(renderContraindicationItem)}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Vos informations restent confidentielles et sont utilisées uniquement pour personnaliser vos recommandations.
          </Text>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122118',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#122118',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 8,
  },
  closeButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '400',
  },
  nextButton: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  nextText: {
    color: '#96c5a8',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.015,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    textAlign: 'left',
  },
  scrollView: {
    flex: 1,
  },
  contraindicationItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    backgroundColor: '#1a2a1f',
    borderColor: '#39e079',
  },
  contraindicationContent: {
    flex: 2,
    gap: 4,
  },
  contraindicationLabel: {
    color: '#96c5a8',
    fontSize: 14,
    fontWeight: '400',
  },
  contraindicationTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  contraindicationDescription: {
    color: '#96c5a8',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
  contraindicationImage: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: '#366347',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  footerText: {
    color: '#96c5a8',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  },
});
