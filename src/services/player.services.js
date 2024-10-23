// src/services/playerService.js

const Player = require('../models/playerModels');

// Obtener todos los jugadores
const getAllPlayers = async () => {
  return await Player.findAll();
};

// Obtener un jugador por ID
const getPlayerById = async (id) => {
  return await Player.findByPk(id);
};

// Crear un nuevo jugador
const createPlayer = async (playerData) => {
  return await Player.create(playerData);
};

// Actualizar un jugador por ID
const updatePlayer = async (id, playerData) => {
  const player = await Player.findByPk(id);
  if (!player) {
    throw new Error('Jugador no encontrado');
  }
  await player.update(playerData);
  return player;
};

// Eliminar un jugador por ID
const deletePlayer = async (id) => {
  const player = await Player.findByPk(id);
  if (!player) {
    throw new Error('Jugador no encontrado');
  }
  await player.destroy();
  return { message: 'Jugador eliminado correctamente' };
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
