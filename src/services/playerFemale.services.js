// src/services/playerFemaleService.js
const fs = require('fs');
const csv = require('csv-parser');

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

// Función para buscar jugadores por criterios
const searchPlayers = async ({ limit, offset, ...searchParams }) => {
  try {
    const players = await PlayerFemale.findAndCountAll({
      where: {
        ...(searchParams.player_face_url && { player_face_url: searchParams.player_face_url }),
        ...(searchParams.long_name && { long_name: searchParams.long_name }),
        ...(searchParams.player_positions && { player_positions: searchParams.player_positions }),
        ...(searchParams.club_name && { club_name: searchParams.club_name }),
        ...(searchParams.nationality_name && { nationality_name: searchParams.nationality_name }),
        ...(searchParams.overall && { overall: searchParams.overall }),
        ...(searchParams.age && { age: searchParams.age }),
        ...(searchParams.preferred_foot && { preferred_foot: searchParams.preferred_foot }),
        ...(searchParams.body_type && { body_type: searchParams.body_type }),
      },
      limit,
      offset
    });
    return players; // Retorna el objeto que contiene el conteo y las filas
  } catch (error) {
    throw new Error('Error al buscar jugadores: ' + error.message);
  }
};

const importarDatosDesdeCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const limit = 100;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (results.length >= limit) return;

        const playerData = Object.keys(row).reduce((obj, key) => {
          // Asignar como null si está vacío, de lo contrario mantener el valor
          obj[key] = row[key] === '' ? null : row[key];
          return obj;
        }, {});

        results.push(playerData);
      })
      .on('end', async () => {
        try {
          // Suponiendo que 'id' es la clave única que quieres usar para actualizar los datos
          await PlayerFemale.bulkCreate(results, {
            updateOnDuplicate: Object.keys(results[0]) // Actualiza todos los campos que están en el primer objeto
          });
          console.log('Datos importados correctamente');
          resolve(results);
        } catch (error) {
          console.error('Error al guardar los datos en la base de datos:', error);
          reject(error);
        }
      })
      .on('error', (error) => {
        console.error('Error al leer el archivo CSV:', error);
        reject(error);
      });
  });
};



module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  searchPlayers,
  importarDatosDesdeCSV,
};