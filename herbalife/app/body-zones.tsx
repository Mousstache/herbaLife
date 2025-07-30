import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { bodyZones as bodyZonesData } from '../data/DataPlant';

const getScreenData = () => {
  const { width, height } = Dimensions.get('window');
  return {
    width,
    height,
    isTablet: width >= 768,
    isLandscape: width > height,
    isSmallScreen: width < 375,
  };
};

interface BodyZone {
  id: string;
  title: string;
  subtitle: string;
  symptoms: string;
  imageUrl: string;
}

const bodyZonesLocal: BodyZone[] = [
  {
    id: '1',
    title: 'Tête',
    subtitle: 'Cerveau, mental',
    symptoms: '12 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHxGyc55crS3v9uOxZCL0cyrSbBfqSThCojvGIwQCMt4rAmFaNzjEMgd5rXi90Aq45wlBbATWBiBAoZ6qeHZTylyTkROiHoVWJ21asCzLJ1FVX9-xFrQhU-F3s1aCr8evtG1RrQwJ9osxE5gHgdI_i8ejaFsDFhSOLLx5Viik5tWTeJ8TZAMHCndktibwgnpQXXvefIh2k4ePYYVYQRo41WSoesk-MANaaiaHvKv7VBwWLd10H4bhlo4kpLAUxtP8LWdciftYWerQ',
  },
  {
    id: '2',
    title: 'Yeux & Vision',
    subtitle: 'Santé oculaire',
    symptoms: '6 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR_fNjHobB_wYG9FWKUlJ5f_J2DNffHPonbXSJK5iMt2pt-a6n00nFO4p5qi6yAhIMGCQ-HhnT0d0TLZRaNvUjnQDIghvGcabfM4TSuCbLKaE6mPS3BtEZ4o-USr0jWavfqc2cKFQ7O8tuTaCpuuMyvPfOvTQ8ycOs6f1RmQLRl07yNk-SBv-Izp3jb3KRJrjeVJ9izGrxq0KD2VJXgQgKEq31apyxfWIc4osc4WxVU_dzp5KdArZlPo9gyB1GiaCyyHlARAOT5TI',
  },
  {
    id: '3',
    title: 'Gorge',
    subtitle: 'Respiratoire',
    symptoms: '8 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4FtXTMyPw9pcqgB99_cRMNPo53SeQpF1nHCfOJBQzZuaVkIWW4N4qUQOoWjXsXt3oOm_vbF6JeOh-tCkTPqLWptED2oUbNA-_T_8NlUyKqw0BrLLxmDHsWsAete2Y9o7p1l0As3NVs9UutXrLCu3dWsEqp12uFbcDa2S378lXgxPPUe1Ku7UvQvqwiucYCQdHFGBYi9n-NNnEFq5On1lzpmqQIWeP9AInC7Hgnclpz_ICcnt-4ARlCo_FW-xazP-fePRHu3P7iQo',
  },
  {
    id: '4',
    title: 'Cœur',
    subtitle: 'Cardio & circulation',
    symptoms: '10 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXyyRtPCfpn9suWSR7RJRNmX8chuj8lKhvHfC8sqEb9SCwaL6xWF_hOy8XKrXzmGHlfwggv0mx_fyNm2BKwwMpKMA4aqFqAOgUAX8vRPZfAJ9sMaFlm3lZRzQpywHG2xwFZhtX5MERqe8x832tH7iDCU6JNIlZNT-Rx2ILvvehoxm7j1tmURuPFOj_IOaaDI9z_XUpU9FXkTl-pUGLrXO-z8Gv-nbRy7INDxfFItgqXtj5VZVfACxnqYhacb5GF6aOmny1hfOj9lA',
  },
  {
    id: '5',
    title: 'Système hormonal & reproducteur',
    subtitle: 'Hormones & fertilité',
    symptoms: '9 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6DstF4F7GcSf-Bm8UbEDeWPmOj0vYw3n7MzYKMFMro9xK4B3E86yzaFeZF2-XJCbfP7iJlSUadpStT-AzPk2X-ZDIu_5vpMKIYNgXZV17sKNUJ8i1O_mduRxqJx6yyVIO_03V-ej69ma5Rdud4MzGgxzjonOVU88HqaYdPTqmWKQophuFb6FOwOiFH6yEaq0tbj3-DM98_vlwOjtN2B7Dar5t1ynLexFTsubmqjwURe0dvupyTxHexxH3Rw2js2tOXvtsbT1Xh_4',
  },
  {
    id: '6',
    title: 'Système digestif',
    subtitle: 'Digestion',
    symptoms: '15 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf4ZT5GE5hc51gq1da62j1ke80Frbf7iUSHye-vvU_AWe4TIb30N_F59LQccVuCsobblOlGmIx8iNbL-m1DIh2WWCHEAJpmnehbXaNfecy5reNIBvTZ44z2osZvKS2qlUh7Aaty8duxlPUWjIsri_5N4kkofP-lRBUHY6m6iOKhY3RQyWGR_DZPZG3j8EwWkm84RNP7AOljB2AZ7UTwLPGOjkJDDlQiobqfx5y0SIhsYrUxp-Z64xqN3bGVRxHvDAN4AJXmT1dinM',
  },
  {
    id: '7',
    title: 'Système urinaire & détox',
    subtitle: 'Détoxification',
    symptoms: '7 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgnQ-aGsAp72gjYUuZ0tMhMu7kNIAPnPB4hiyuhnAH_6v9ZN2YNvf0lU8lh_gpDfNlJRKfruSmZx9CnGIm_ZbyG8N78XkkiFgiAmDtHfrK74CpvtdeF8Wx3e7OWYosofKg13A6TbNkBHcmc-HSt6QDcAGCs1GjTEOU4k2CQICCKboT-EIPFtcrMehm0iavCZp71pkjkjYZw7ZSsQKagaTFCo9tc9A22H69eEVaBavRVWBENr-Ui7WipwXDWW2EAtxSSEIjLD-726o',
  },
  {
    id: '8',
    title: 'Articulations & Muscles',
    subtitle: 'Mobilité & confort',
    symptoms: '11 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4yWRHl_cy0NZNLj_wdSoz49KLOBk39DPLhRnctDAZDhP5BpFELL2aCNyxVjdbByMiO357NqCjCf-5he9kvyRNoGbrfKdHGQzdZqOfnBGV8cHS-hScDr3L8eK4d2Cl1o9lnLmYUwSXT8tCqoTKveYp2uCOL1i4BX4QN5Ot8t_sdqDe2QnpRvnGiAcFH-aBy5ZXYBFNsLkTUICQkwYuJfMwC8JtN3XOjBE_reOIjdlM_4yzAWoQQsd4izBvBf20DvR9L-hvhJfMfSg',
  },
  {
    id: '9',
    title: 'Peau',
    subtitle: 'Santé cutanée',
    symptoms: '13 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1dNMznn4slqGbs8OGirESYokIfQ_38DLKsEwUjWAl75q4vcMWmE6s9dfLrdtXN_xYLga4q8fTcuBaYtR27f05hgM3WNCewseKnVgmuUSMtX-a2tNW1gvc74Io1EDLIziPri9umN0RhSbvm9BO0EVe_gMQq9aGTSxchOflKtN-ad1p5HHBoe9ztJi_fRbPrFS6Dj8oPEbt4cki0ZEHnSgKQ7AgiPjwQtgKEvEfchlSBCKisNXvzUNRj_rYf2sjUPuHdvegTyz26-k',
  },
  {
    id: '10',
    title: 'Cheveux & Ongles',
    subtitle: 'Beauté & vitalité',
    symptoms: '14 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwL1B0UVTwBkPq6MwIcH7BRJKopFPL7q3KCWZOvchgsGy7VVHi3KHnaQJX07bgOJyW1SsnDXKU2wK1pRlI_-DSnAJOY6DCWpV7vYUiJrIMi28MUPpYaf6ZAVEJ59BvDcIflROuIFTUE75OM6WvWaO5ZBp2fIY1BaV7p7TG0EqhBEllOxNPohqKNMfSgW2mwBtcaUoBfl9S86-Nj2zC4xbxomCX8-KWJ9If4oLRxDdH0WSTQ5ldZEGsaGQw_V-R-iTfEDOcIC_9SgI',
  },
  {
    id: '11',
    title: 'Système Immunitaire',
    subtitle: 'Défenses naturelles',
    symptoms: '10 symptômes',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAph8hg5QYkmTkotDVqbObAhwGJtv-6zvRJFxb6b2geIpzly-IqajdHYNwLX6fXSx5XhvgGOkbkvbw8G4Sp_J-eB6h_hrhKl-FGvAnmcmPdsjWdElZpdnHKAmdD91uCJ5WknqLmqNMd1KpIRcasRht3lUSwotAj_h0UeuytZbHYicU1dZfteWp-y32xzBhoXpSzLJV8g0SDZ5zakpjo1XvHxLb4TMeup_odDaxHCWFYtwbDG_JAZQTnLysFfhDDKIIviZWuhuZhtpA',
  },
];

const BodyZonesScreen = () => {
  const [screenData, setScreenData] = useState(getScreenData());

  // Mapping entre les zones locales et les données de DataPlant
  const getZoneMapping = (localId: string) => {
    const mappings: Record<string, string> = {
      '1': 'nerveux-mental',           // Tête -> Système nerveux
      '2': 'yeux-vision',              // Yeux & Vision -> Yeux & vision
      '3': 'respiratoire',             // Gorge -> Système respiratoire
      '4': 'cardiovasculaire',         // Cœur -> Système cardiovasculaire
      '5': 'hormonal-reproducteur',    // Système hormonal & reproducteur
      '6': 'digestif',                 // Système digestif
      '7': 'urinaire-detox',          // Système urinaire & détox
      '8': 'musculo-squelettique',    // Articulations & Muscles
      '9': 'peau-cheveux-ongles',     // Peau
      '10': 'peau-cheveux-ongles',    // Cheveux & Ongles (même zone)
      '11': 'immunitaire',            // Système Immunitaire
    };
    
    const dataPlantId = mappings[localId];
    return bodyZonesData.find(zone => zone.id === dataPlantId);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setScreenData(getScreenData());
    });

    return () => subscription?.remove();
  }, []);

  // Responsive calculations
  const getResponsiveValues = () => {
    const { width, isTablet, isLandscape, isSmallScreen } = screenData;
    
    const padding = isSmallScreen ? 12 : 16;
    const numColumns = isTablet ? (isLandscape ? 4 : 3) : 2;
    const gap = isSmallScreen ? 8 : 12;
    const cardWidth = (width - (padding * 2) - (gap * (numColumns - 1))) / numColumns;
    
    return {
      padding,
      numColumns,
      gap,
      cardWidth,
      headerPadding: isSmallScreen ? 12 : 16,
      titleFontSize: isTablet ? 28 : isSmallScreen ? 20 : 22,
      cardTitleSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
      cardSubtitleSize: isTablet ? 15 : isSmallScreen ? 12 : 13,
    };
  };

  const responsive = getResponsiveValues();

  const renderZoneCard = ({ item }: { item: BodyZone; index: number }) => {
    const dataPlantZone = getZoneMapping(item.id);
    
    const handleZonePress = () => {
      if (dataPlantZone) {
        router.push({
          pathname: '/zone-symptoms' as any,
          params: {
            zoneId: dataPlantZone.id,
            zoneName: dataPlantZone.name,
            zoneEmoji: dataPlantZone.emoji,
            zoneColor: dataPlantZone.color
          }
        });
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { 
            width: responsive.cardWidth,
            marginBottom: responsive.gap,
          }
        ]}
        onPress={handleZonePress}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={[
            styles.cardTitle,
            { fontSize: responsive.cardTitleSize }
          ]}>
            {item.title}
          </Text>
          <Text style={[
            styles.cardSubtitle,
            { fontSize: responsive.cardSubtitleSize }
          ]}>
            {item.subtitle}
          </Text>
          <Text style={[
            styles.cardSymptoms,
            { fontSize: responsive.cardSubtitleSize }
          ]}>
            {dataPlantZone ? `${dataPlantZone.symptoms.length} symptômes` : item.symptoms}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: responsive.headerPadding }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/')}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>HerbaLife</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Page Title */}
        <Text style={[
          styles.pageTitle,
          { 
            fontSize: responsive.titleFontSize,
            marginHorizontal: responsive.headerPadding,
          }
        ]}>
          Choisissez votre zone d'intérêt
        </Text>

        {/* Zones Grid */}
        <FlatList
          data={bodyZonesLocal}
          renderItem={renderZoneCard}
          numColumns={responsive.numColumns}
          contentContainerStyle={[
            styles.grid,
            { paddingHorizontal: responsive.padding }
          ]}
          columnWrapperStyle={responsive.numColumns > 1 ? [
            styles.row,
            { gap: responsive.gap }
          ] : null}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: BodyZone) => item.id}
          extraData={responsive.numColumns} // Force re-render when columns change
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]} onPress={() => router.push('/')}>
          <Ionicons name="home" size={24} color="#ffffff" />
          <Text style={[styles.tabText, styles.activeTabText]}>Accueil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tab} onPress={() => router.push('/symptom-search')}>
          <Ionicons name="search" size={24} color="#96c5a8" />
          <Text style={styles.tabText}>Recherche</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tab} onPress={() => router.push('/wishlist')}>
          <Ionicons name="bookmark" size={24} color="#96c5a8" />
          <Text style={styles.tabText}>Favoris</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tab} onPress={() => router.push('/menu')}>
          <Ionicons name="person" size={24} color="#96c5a8" />
          <Text style={styles.tabText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122118',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.015,
    marginRight: 48, // to center visually vs back button
  },
  placeholder: {
    width: 48,
  },
  pageTitle: {
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.015,
    marginVertical: 12,
  },
  grid: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'transparent',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 10,
  },
  cardContent: {
    paddingBottom: 12,
  },
  cardTitle: {
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: '#96c5a8',
    lineHeight: 15,
    marginBottom: 2,
  },
  cardSymptoms: {
    color: '#96c5a8',
    lineHeight: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#264532',
    backgroundColor: '#1b3124',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
  activeTab: {
    // Active tab styling handled by text/icon colors
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#96c5a8',
    marginTop: 4,
    letterSpacing: 0.015,
  },
  activeTabText: {
    color: '#ffffff',
  },
});

export default BodyZonesScreen;
