// src/services/playerService.js
const fs = require('fs');
const csv = require('csv-parser');
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
  const essentialData = {
    fifa_version: playerData.fifa_version,
    fifa_update: playerData.fifa_update,
    player_face_url: playerData.player_face_url,
    long_name: playerData.long_name,
    player_positions: playerData.player_positions,
    overall: playerData.overall,
    potential: playerData.potential,
    age: playerData.age,
  };

  return await Player.create(essentialData);
};


// Actualizar un jugador por ID
const updatePlayer = async (id, playerData) => {
  try {
    // Buscar el jugador por ID
    const player = await Player.findByPk(id);
    if (!player) {
      throw new Error('Jugador no encontrado');
    }

    // Actualizar los atributos del jugador
    await player.update(playerData); // Utiliza el método update proporcionado por Sequelize

    return player; // Retornar el jugador actualizado
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
    const limit = 30000;

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
          await Player.bulkCreate(results, {
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