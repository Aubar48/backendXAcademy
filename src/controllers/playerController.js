// src/controllers/playerController.js
const playerService = require('../services/player.services');
const { validationResult } = require('express-validator'); // Asegúrate de que esta línea esté presente

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');


// Obtener todos los jugadores
// src/controllers/playerController.js
exports.getAllPlayers = async (req, res) => {
  const { page = 1, limit = 100 } = req.query; // Obtener los parámetros de la consulta

  const offset = (page - 1) * limit; // Calcular el desplazamiento

  try {
    const { count, rows } = await playerService.getAllPlayers(limit, offset); // Pasar limit y offset a la función de servicio

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      players: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los jugadores', error: error.message });
  }
};


// Obtener un jugador por ID
exports.getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await playerService.getPlayerById(id);
    if (!player) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el jugador', error: error.message });
  }
};

// Crear un nuevo jugador

// Tu controlador para crear jugadores
exports.createPlayer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const newPlayer = await playerService.createPlayer(req.body);
    return res.status(201).json(newPlayer);
  } catch (error) {
    console.error('Error creating player:', error);
    return res.status(500).json({ message: 'Error creating player' });
  }
};

// Actualizar un jugador por ID
exports.updatePlayer = async (req, res) => {
  const { id } = req.params;

  // Validar los resultados de las validaciones
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const player = await playerService.updatePlayer(id, req.body);
    res.json(player);
  } catch (error) {
    if (error.message === 'Jugador no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al actualizar el jugador', error: error.message });
  }
};

// Eliminar un jugador por ID
exports.deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await playerService.deletePlayer(id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Jugador no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al eliminar el jugador', error: error.message });
  }
};

exports.downloadPlayersCSV = async (req, res) => {
  try {
    const limit = req.query.limit || 30000; // Valor predeterminado de 10
    const offset = req.query.offset || 0; // Valor predeterminado de 0
    
    const players = await playerService.getAllPlayers(limit, offset); // Obtener la lista de jugadores
    
    // Definir el archivo CSV con todas las columnas del modelo Player
    const csvWriter = createCsvWriter({
      path: path.join(__dirname, '../downloads/players.csv'), // Guardar temporalmente el archivo
      header: [
        { id: 'id', title: 'ID' },
        { id: 'fifa_version', title: 'FIFA Version' },
        { id: 'fifa_update', title: 'FIFA Update' },
        { id: 'player_face_url', title: 'Player Face URL' },
        { id: 'long_name', title: 'Long Name' },
        { id: 'player_positions', title: 'Player Positions' },
        { id: 'club_name', title: 'Club Name' },
        { id: 'nationality_name', title: 'Nationality Name' },
        { id: 'overall', title: 'Overall' },
        { id: 'potential', title: 'Potential' },
        { id: 'value_eur', title: 'Value (EUR)' },
        { id: 'wage_eur', title: 'Wage (EUR)' },
        { id: 'age', title: 'Age' },
        { id: 'height_cm', title: 'Height (cm)' },
        { id: 'weight_kg', title: 'Weight (kg)' },
        { id: 'preferred_foot', title: 'Preferred Foot' },
        { id: 'weak_foot', title: 'Weak Foot' },
        { id: 'skill_moves', title: 'Skill Moves' },
        { id: 'international_reputation', title: 'International Reputation' },
        { id: 'work_rate', title: 'Work Rate' },
        { id: 'body_type', title: 'Body Type' },
        { id: 'pace', title: 'Pace' },
        { id: 'shooting', title: 'Shooting' },
        { id: 'passing', title: 'Passing' },
        { id: 'dribbling', title: 'Dribbling' },
        { id: 'defending', title: 'Defending' },
        { id: 'physic', title: 'Physic' },
        { id: 'attacking_crossing', title: 'Attacking Crossing' },
        { id: 'attacking_finishing', title: 'Attacking Finishing' },
        { id: 'attacking_heading_accuracy', title: 'Attacking Heading Accuracy' },
        { id: 'attacking_short_passing', title: 'Attacking Short Passing' },
        { id: 'attacking_volleys', title: 'Attacking Volleys' },
        { id: 'skill_dribbling', title: 'Skill Dribbling' },
        { id: 'skill_curve', title: 'Skill Curve' },
        { id: 'skill_fk_accuracy', title: 'Skill FK Accuracy' },
        { id: 'skill_long_passing', title: 'Skill Long Passing' },
        { id: 'skill_ball_control', title: 'Skill Ball Control' },
        { id: 'movement_acceleration', title: 'Movement Acceleration' },
        { id: 'movement_sprint_speed', title: 'Movement Sprint Speed' },
        { id: 'movement_agility', title: 'Movement Agility' },
        { id: 'movement_reactions', title: 'Movement Reactions' },
        { id: 'movement_balance', title: 'Movement Balance' },
        { id: 'power_shot_power', title: 'Power Shot Power' },
        { id: 'power_jumping', title: 'Power Jumping' },
        { id: 'power_stamina', title: 'Power Stamina' },
        { id: 'power_strength', title: 'Power Strength' },
        { id: 'power_long_shots', title: 'Power Long Shots' },
        { id: 'mentality_aggression', title: 'Mentality Aggression' },
        { id: 'mentality_interceptions', title: 'Mentality Interceptions' },
        { id: 'mentality_positioning', title: 'Mentality Positioning' },
        { id: 'mentality_vision', title: 'Mentality Vision' },
        { id: 'mentality_penalties', title: 'Mentality Penalties' },
        { id: 'mentality_composure', title: 'Mentality Composure' },
        { id: 'defending_marking', title: 'Defending Marking' },
        { id: 'defending_standing_tackle', title: 'Defending Standing Tackle' },
        { id: 'defending_sliding_tackle', title: 'Defending Sliding Tackle' },
        { id: 'goalkeeping_diving', title: 'Goalkeeping Diving' },
        { id: 'goalkeeping_handling', title: 'Goalkeeping Handling' },
        { id: 'goalkeeping_kicking', title: 'Goalkeeping Kicking' },
        { id: 'goalkeeping_positioning', title: 'Goalkeeping Positioning' },
        { id: 'goalkeeping_reflexes', title: 'Goalkeeping Reflexes' },
        { id: 'goalkeeping_speed', title: 'Goalkeeping Speed' },
        { id: 'player_traits', title: 'Player Traits' },
      ],
    });

    // Escribir los datos de los jugadores en el archivo CSV
    await csvWriter.writeRecords(players.rows); // players.rows si estás usando paginación

    // Enviar el archivo CSV al cliente
    res.download(path.join(__dirname, '../downloads/players.csv'), 'players.csv');
  } catch (error) {
    res.status(500).json({ message: 'Error al generar el archivo CSV', error: error.message });
  }
};

exports.convertCsvToExcel = async (req, res) => {
  try {
    const csvFilePath = path.join(__dirname, '../downloads/players.csv');
    
    // Leer el archivo CSV
    const csvData = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // Convertir CSV a un array de objetos
    const rows = csvData.split('\n').map(row => row.split(','));
    
    // Crear un nuevo libro de trabajo Excel
    const workbook = XLSX.utils.book_new();
    
    // Crear una hoja de trabajo a partir de los datos CSV
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    
    // Añadir la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Players');
    
    // Definir la ruta para guardar el archivo Excel
    const excelFilePath = path.join(__dirname, '../downloads/players.xlsx');
    
    // Escribir el archivo Excel
    XLSX.writeFile(workbook, excelFilePath);
    
    // Enviar el archivo Excel al cliente
    res.download(excelFilePath, 'players.xlsx');
  } catch (error) {
    res.status(500).json({ message: 'Error al convertir CSV a Excel', error: error.message });
  }
};

// Buscar jugadores
exports.searchPlayers = async (req, res) => {
  const { page = 1, limit = 10, ...queryParams } = req.query; // Obtener todos los parámetros de búsqueda dinámicos
  const offset = (page - 1) * limit; // Calcular el desplazamiento

  try {
    // Llama al servicio con los parámetros de búsqueda y paginación
    const { count, rows } = await playerService.searchPlayers({
      ...queryParams, // Parámetros de búsqueda específicos
      limit, 
      offset
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      players: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar jugadores', error: error.message });
  }
};

exports.importarDatos = async (req, res) => {
  try {
      const message = await playerService.importarDatosDesdeCSV('./src/uploads/players.csv'); // Cambia 'datos.csv' si es necesario
      res.status(200).json({ message });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al importar datos' });
  }
};