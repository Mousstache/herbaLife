const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true, // Accepte toutes les origines en développement
  credentials: true
}));
app.use(express.json());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const API_URL = "https://api.intra.42.fr";

let tokenCache = {
  token: null,
  expires_at: 0
};

async function getAccessToken() {
  try {
    if (tokenCache.token && Date.now() < tokenCache.expires_at) {
      return tokenCache.token;
    }

    console.log('🔄 Récupération d\'un nouveau token...');
    const response = await axios.post(`${API_URL}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id,
      client_secret
    });

    const { access_token, expires_in } = response.data;
    
    tokenCache = {
      token: access_token,
      expires_at: Date.now() + (expires_in * 1000) - 60000 // -1 minute pour la sécurité
    };

    return access_token;
  } catch (error) {
    console.error("❌ Erreur récupération token :", error.response?.data || error.message);
    throw error;
  }
}


app.get("/api/user/:login/detailed", async (req, res) => {
  try {
    const token = await getAccessToken();
    const { login } = req.params;

    console.log(`🔍 Recherche détaillée de l'utilisateur: ${login}`);

    const userResponse = await axios.get(`${API_URL}/v2/users/${login}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = userResponse.data;

    let projectsData = [];
    try {
      const projectsResponse = await axios.get(`${API_URL}/v2/users/${userData.id}/projects_users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      projectsData = projectsResponse.data;
    } catch (error) {
      console.log('⚠️ Erreur lors de la récupération des projets:', error.message);
    }

    const detailedUser = {
      id: userData.id,
      login: userData.login,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      display_name: userData.displayname,
      usual_full_name: userData.usual_full_name,
      usual_first_name: userData.usual_first_name,
      image: userData.image,
      phone: userData.phone,
      wallet: userData.wallet,
      correction_point: userData.correction_point,
      location: userData.location,
      pool_month: userData.pool_month,
      pool_year: userData.pool_year,
      staff: userData["staff?"] || false,
      alumni: userData["alumni?"] || false,
      active: userData["active?"] || false,
      kind: userData.kind,
      // Cursus 42 spécifiquement (cursus_id = 21)
      cursus_42: userData.cursus_users?.find(cu => cu.cursus_id === 21) || null,
      level: userData.cursus_users?.find(cu => cu.cursus_id === 21)?.level || 0,
      grade: userData.cursus_users?.find(cu => cu.cursus_id === 21)?.grade || null,
      skills: userData.cursus_users?.find(cu => cu.cursus_id === 21)?.skills || [],
      cursus_users: userData.cursus_users || [],
      // Campus
      primary_campus: userData.campus_users?.find(cu => cu.is_primary)?.campus || userData.campus?.[0] || null,
      campus: userData.campus || [],
      campus_users: userData.campus_users || [],
      // Projets détaillés
      projects: projectsData.map(pu => ({
        id: pu.id,
        final_mark: pu.final_mark,
        status: pu.status,
        validated: pu["validated?"],
        current_team_id: pu.current_team_id,
        project: {
          id: pu.project?.id,
          name: pu.project?.name,
          slug: pu.project?.slug,
          description: pu.project?.description,
          parent_id: pu.project?.parent_id
        },
        marked_at: pu.marked_at,
        marked: pu.marked,
        retriable_at: pu.retriable_at,
        created_at: pu.created_at,
        updated_at: pu.updated_at,
        occurrence: pu.occurrence,
        cursus_ids: pu.cursus_ids,
        teams: pu.teams || []
      })),
      // Achievements
      achievements: userData.achievements || [],
      // Autres infos
      titles: userData.titles || [],
      partnerships: userData.partnerships || [],
      patroned: userData.patroned || [],
      patroning: userData.patroning || [],
      expertises_users: userData.expertises_users || [],
      languages_users: userData.languages_users || [],
      coalitions_users: userData.coalitions_users || []
    };

    res.json({ 
      success: true, 
      user: detailedUser 
    });

  } catch (error) {
    console.error(`❌ Erreur pour l'utilisateur détaillé ${req.params.login}:`, error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      res.status(404).json({
        success: false,
        message: `Utilisateur '${req.params.login}' non trouvé`
      });
    } else {
      res.status(error.response?.status || 500).json({
        success: false,
        message: 'Erreur lors de la récupération des données détaillées',
        error: error.response?.data || error.message
      });
    }
  }
});

app.get("/api/user/:login", async (req, res) => {
  try {
    const token = await getAccessToken();
    const { login } = req.params;

    console.log(`🔍 Recherche de l'utilisateur: ${login}`);

    const response = await axios.get(`${API_URL}/v2/users/${login}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = response.data;
    
    // Formater les données pour l'app selon la structure correcte de l'API 42
    const formattedUser = {
      id: userData.id,
      login: userData.login,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      display_name: userData.displayname,
      usual_full_name: userData.usual_full_name,
      usual_first_name: userData.usual_first_name,
      image: userData.image,
      phone: userData.phone,
      wallet: userData.wallet,
      correction_point: userData.correction_point,
      location: userData.location,
      pool_month: userData.pool_month,
      pool_year: userData.pool_year,
      staff: userData["staff?"] || false,
      alumni: userData["alumni?"] || false,
      active: userData["active?"] || false,
      kind: userData.kind,
      // Cursus information (prendre le cursus principal - généralement le premier avec un cursus_id de 21 pour 42)
      level: userData.cursus_users && userData.cursus_users.length > 0 
        ? userData.cursus_users.find(cu => cu.cursus_id === 21)?.level || userData.cursus_users[0]?.level || 0
        : 0,
      grade: userData.cursus_users && userData.cursus_users.length > 0 
        ? userData.cursus_users.find(cu => cu.cursus_id === 21)?.grade || userData.cursus_users[0]?.grade || null
        : null,
      skills: userData.cursus_users && userData.cursus_users.length > 0 
        ? userData.cursus_users.find(cu => cu.cursus_id === 21)?.skills || userData.cursus_users[0]?.skills || []
        : [],
      cursus_users: userData.cursus_users || [],
      // Campus information
      campus: userData.campus && userData.campus.length > 0 ? userData.campus[0]?.name : null,
      campus_users: userData.campus_users || [],
      // Projects
      projects: userData.projects_users ? userData.projects_users.map(pu => ({
        id: pu.id,
        final_mark: pu.final_mark,
        status: pu.status || (pu.final_mark !== null ? 'finished' : 'in_progress'),
        validated: pu["validated?"],
        current_team_id: pu.current_team_id,
        project: pu.project,
        marked_at: pu.marked_at,
        marked: pu.marked,
        retriable_at: pu.retriable_at,
        created_at: pu.created_at,
        updated_at: pu.updated_at,
        occurrence: pu.occurrence,
        cursus_ids: pu.cursus_ids
      })) : [],
      // Achievements
      achievements: userData.achievements ? userData.achievements.map(achievement => ({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        tier: achievement.tier,
        kind: achievement.kind,
        visible: achievement.visible,
        image: achievement.image,
        nbr_of_success: achievement.nbr_of_success,
        users_url: achievement.users_url
      })) : [],
      // Autres informations utiles
      titles: userData.titles || [],
      titles_users: userData.titles_users || [],
      partnerships: userData.partnerships || [],
      patroned: userData.patroned || [],
      patroning: userData.patroning || [],
      expertises_users: userData.expertises_users || [],
      languages_users: userData.languages_users || [],
      groups: userData.groups || [],
      roles: userData.roles || []
    };

    console.log(`✅ Utilisateur ${login} trouvé !`);
    res.json({ 
      success: true, 
      user: formattedUser 
    });

  } catch (error) {
    console.error(`❌ Erreur pour l'utilisateur ${req.params.login}:`, error.response?.data || error.message);
    
    if (error.response?.status === 404) {
      res.status(404).json({
        success: false,
        message: `Utilisateur '${req.params.login}' non trouvé`
      });
    } else {
      res.status(error.response?.status || 500).json({
        success: false,
        message: 'Erreur lors de la récupération des données utilisateur',
        error: error.response?.data || error.message
      });
    }
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const token = await getAccessToken();
    const { query } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Le terme de recherche doit contenir au moins 2 caractères'
      });
    }

    console.log(`🔍 Recherche: ${query}`);

    const response = await axios.get(`${API_URL}/v2/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        'search': query,
        'page[size]': 20, // Augmenté pour plus de résultats
        'sort': 'login' // Tri par login
      }
    });

    const users = response.data.map(user => ({
      id: user.id,
      login: user.login,
      display_name: user.displayname || `${user.first_name} ${user.last_name}`,
      first_name: user.first_name,
      last_name: user.last_name,
      image: user.image,
      email: user.email,
      kind: user.kind,
      staff: user["staff?"] || false,
      alumni: user["alumni?"] || false,
      active: user["active?"] || false,
      campus: user.campus && user.campus.length > 0 ? user.campus[0]?.name : null,
      level: user.cursus_users?.find(cu => cu.cursus_id === 21)?.level || 0
    }));

    console.log(`✅ ${users.length} utilisateurs trouvés`);
    res.json({ 
      success: true, 
      users,
      total: users.length,
      query: query
    });

  } catch (error) {
    console.error('❌ Erreur de recherche:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Erreur lors de la recherche',
      error: error.response?.data || error.message
    });
  }
});

// Route de test pour vérifier les identifiants
app.get("/api/test", async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({
      success: true,
      message: 'API 42 connectée avec succès !',
      client_id: client_id,
      token_valid: !!token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur de connexion à l\'API 42',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  // Test automatique au démarrage
  getAccessToken().then(() => {
  }).catch(err => {
    console.error('⚠️  Problème avec la configuration API 42:', err.message);
  });
});