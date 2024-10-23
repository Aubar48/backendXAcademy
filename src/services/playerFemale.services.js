// src/services/playerFemaleService.js

const PlayerFemale = require('../models/playerFemaleModels');

// Obtener todos los jugadores
const getAllPlayers = async (limit, offset) => {
  try {
    const players = await PlayerFemale.findAndCountAll({
      limit: Number(limit),   // Limita el número de resultados
      offset: Number(offset), // Desplazamiento para la paginación
    });
    return players; // Retorna el objeto que contiene el conteo y las filas
  } catch (error) {
    throw new Error('Error al obtener las jugadoras: ' + error.message);
  }
};

// Obtener una jugadora por ID
const getPlayerById = async (id) => {
  try {
    const player = await PlayerFemale.findByPk(id);
    if (!player) {
      throw new Error('Jugadora no encontrada');
    }
    return player;
  } catch (error) {
    throw new Error('Error al obtener la jugadora: ' + error.message);
  }
};

// Crear una nueva jugadora
const createPlayer = async (playerData) => {
  try {
    return await PlayerFemale.create(playerData);
  } catch (error) {
    throw new Error('Error al crear la jugadora: ' + error.message);
  }
};

// Actualizar una jugadora por ID
const updatePlayer = async (id, playerData) => {
  try {
    const player = await PlayerFemale.findByPk(id);
    if (!player) {
      throw new Error('Jugadora no encontrada');
    }
    await player.update(playerData);
    return player;
  } catch (error) {
    throw new Error('Error al actualizar la jugadora: ' + error.message);
  }
};

// Eliminar una jugadora por ID
const deletePlayer = async (id) => {
  try {
    const player = await PlayerFemale.findByPk(id);
    if (!player) {
      throw new Error('Jugadora no encontrada');
    }
    await player.destroy();
    return { message: 'Jugadora eliminada correctamente' };
  } catch (error) {
    throw new Error('Error al eliminar la jugadora: ' + error.message);
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
