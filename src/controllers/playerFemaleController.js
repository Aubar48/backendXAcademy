// src/controllers/playerFemaleController.js
const playerService = require('../services/playerFemale.services');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');
const PlayerFemale = require('../models/playerFemaleModels');

// Obtener todos los jugadores femeninos
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
    res.status(500).json({ message: 'Error al obtener los jugadores femeninos', error: error.message });
  }
};

// Obtener una jugadora por ID
exports.getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await playerService.getPlayerById(id);
    if (!player) {
      return res.status(404).json({ message: 'Jugadora no encontrada' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la jugadora', error: error.message });
  }
};

// Crear una nueva jugadora
exports.createPlayer = async (req, res) => {
  try {
    const player = await playerService.createPlayer(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la jugadora', error: error.message });
  }
};

// Actualizar una jugadora por ID
exports.updatePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await playerService.updatePlayer(id, req.body);
    res.json(player);
  } catch (error) {
    if (error.message === 'Jugadora no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al actualizar la jugadora', error: error.message });
  }
};

// Eliminar una jugadora por ID
exports.deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await playerService.deletePlayer(id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Jugadora no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al eliminar la jugadora', error: error.message });
  }
};

// Descargar jugadoras en formato CSV
exports.downloadPlayersCSV = async (req, res) => {
  try {
    const limit = req.query.limit || 30000; // Valor predeterminado de 10
    const offset = req.query.offset || 0; // Valor predeterminado de 0
    
    const playersFemale = await playerService.getAllPlayers(limit, offset); // Obtener la lista de jugadoras
    
    // Definir el archivo CSV con todas las columnas del modelo PlayerFemale
    const csvWriter = createCsvWriter({
      path: path.join(__dirname, '../downloads/playersFemale.csv'), // Guardar temporalmente el archivo
      header: [
        { id: 'id', title: 'id' },
        { id: 'fifa_version', title: 'fifa_version' },
        { id: 'fifa_update', title: 'fifa_update' },
        { id: 'player_face_url', title: 'player_face_url' },
        { id: 'long_name', title: 'long_name' },
        { id: 'player_positions', title: 'player_positions' },
        { id: 'club_name', title: 'club_name' },
        { id: 'nationality_name', title: 'nationality_name' },
        { id: 'overall', title: 'overall' },
        { id: 'potential', title: 'potential' },
        { id: 'value_eur', title: 'value_eur' },
        { id: 'wage_eur', title: 'wage_eur' },
        { id: 'age', title: 'age' },
        { id: 'height_cm', title: 'height_cm' },
        { id: 'weight_kg', title: 'weight_kg' },
        { id: 'preferred_foot', title: 'preferred_foot' },
        { id: 'weak_foot', title: 'weak_foot' },
        { id: 'skill_moves', title: 'skill_moves' },
        { id: 'international_reputation', title: 'international_reputation' },
        { id: 'work_rate', title: 'work_rate' },
        { id: 'body_type', title: 'body_type' },
        { id: 'pace', title: 'pace' },
        { id: 'shooting', title: 'shooting' },
        { id: 'passing', title: 'passing' },
        { id: 'dribbling', title: 'dribbling' },
        { id: 'defending', title: 'defending' },
        { id: 'physic', title: 'physic' },
        { id: 'attacking_crossing', title: 'attacking_crossing' },
        { id: 'attacking_finishing', title: 'attacking_finishing' },
        { id: 'attacking_heading_accuracy', title: 'attacking_heading_accuracy' },
        { id: 'attacking_short_passing', title: 'attacking_short_passing' },
        { id: 'attacking_volleys', title: 'attacking_volleys' },
        { id: 'skill_dribbling', title: 'skill_dribbling' },
        { id: 'skill_curve', title: 'skill_curve' },
        { id: 'skill_fk_accuracy', title: 'skill_fk_accuracy' },
        { id: 'skill_long_passing', title: 'skill_long_passing' },
        { id: 'skill_ball_control', title: 'skill_ball_control' },
        { id: 'movement_acceleration', title: 'movement_acceleration' },
        { id: 'movement_sprint_speed', title: 'movement_sprint_speed' },
        { id: 'movement_agility', title: 'movement_agility' },
        { id: 'movement_reactions', title: 'movement_reactions' },
        { id: 'movement_balance', title: 'movement_balance' },
        { id: 'power_shot_power', title: 'power_shot_power' },
        { id: 'power_jumping', title: 'power_jumping' },
        { id: 'power_stamina', title: 'power_stamina' },
        { id: 'power_strength', title: 'power_strength' },
        { id: 'power_long_shots', title: 'power_long_shots' },
        { id: 'mentality_aggression', title: 'mentality_aggression' },
        { id: 'mentality_interceptions', title: 'mentality_interceptions' },
        { id: 'mentality_positioning', title: 'mentality_positioning' },
        { id: 'mentality_vision', title: 'mentality_vision' },
        { id: 'mentality_penalties', title: 'mentality_penalties' },
        { id: 'mentality_composure', title: 'mentality_composure' },
        { id: 'defending_marking', title: 'defending_marking' },
        { id: 'defending_standing_tackle', title: 'defending_standing_tackle' },
        { id: 'defending_sliding_tackle', title: 'defending_sliding_tackle' },
        { id: 'goalkeeping_diving', title: 'goalkeeping_diving' },
        { id: 'goalkeeping_handling', title: 'goalkeeping_handling' },
        { id: 'goalkeeping_kicking', title: 'goalkeeping_kicking' },
        { id: 'goalkeeping_positioning', title: 'goalkeeping_positioning' },
        { id: 'goalkeeping_reflexes', title: 'goalkeeping_reflexes' },
        { id: 'goalkeeping_speed', title: 'goalkeeping_speed' },
        { id: 'player_traits', title: 'player_traits' },
      ],
    });

    // Escribir los datos de las jugadoras en el archivo CSV
    await csvWriter.writeRecords(playersFemale.rows);

    // Enviar el archivo CSV al cliente
    res.download(path.join(__dirname, '../downloads/playersFemale.csv'), 'playersFemale.csv');
  } catch (error) {
    res.status(500).json({ message: 'Error al generar el archivo CSV', error: error.message });
  }
};

// Convertir CSV a Excel para jugadoras
exports.convertCsvToExcel = async (req, res) => {
  try {
    const csvFilePath = path.join(__dirname, '../downloads/playersFemale.csv');
    const workbook = XLSX.utils.book_new();
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');

    // Crear una hoja de Excel a partir de los datos CSV
    const worksheet = XLSX.utils.aoa_to_sheet(csvData.split('\n').map(row => row.split(',')));
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jugadoras');

    const excelFilePath = path.join(__dirname, '../downloads/playersFemale.xlsx');
    XLSX.writeFile(workbook, excelFilePath);

    // Descargar el archivo Excel
    res.download(excelFilePath, 'playersFemale.xlsx');
  } catch (error) {
    res.status(500).json({ message: 'Error al convertir el archivo CSV a Excel', error: error.message });
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
      const message = await playerService.importarDatosDesdeCSV('./src/uploads/playersFemale.csv'); // Cambia 'datos.csv' si es necesario
      res.status(200).json({ message });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al importar datos' });
  }
};