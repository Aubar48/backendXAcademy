// src/services/playerService.js

const Player = require('../models/playerModels');

// Obtener todos los jugadores
const getAllPlayers = async (limit, offset) => {
  try {
    const players = await Player.findAndCountAll({
      limit: Number(limit),   // Limita el número de resultados
      offset: Number(offset), // Desplazamiento para la paginación
    });
    return players; // Retorna el objeto que contiene el conteo y las filas
  } catch (error) {
    throw new Error('Error al obtener los jugadores: ' + error.message);
  }
};

// Obtener un jugador por ID
const getPlayerById = async (id) => {
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      throw new Error('Jugador no encontrado');
    }
    return player;
  } catch (error) {
    throw new Error('Error al obtener el jugador: ' + error.message);
  }
};

// Crear un nuevo jugador
const createPlayer = async (playerData) => {
  try {
    return await Player.create(playerData);
  } catch (error) {
    throw new Error('Error al crear el jugador: ' + error.message);
  }
};

// Actualizar un jugador por ID
const updatePlayer = async (id, playerData) => {
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      throw new Error('Jugador no encontrado');
    }
    await player.update(playerData);
    return player;
  } catch (error) {
    throw new Error('Error al actualizar el jugador: ' + error.message);
  }
};

// Eliminar un jugador por ID
const deletePlayer = async (id) => {
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      throw new Error('Jugador no encontrado');
    }
    await player.destroy();
    return { message: 'Jugador eliminado correctamente' };
  } catch (error) {
    throw new Error('Error al eliminar el jugador: ' + error.message);
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
