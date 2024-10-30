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
    const players = await Player.findAndCountAll({
      where: {
        ...(searchParams.fifa_version && { fifa_version: searchParams.fifa_version }),
        ...(searchParams.fifa_update && { fifa_update: searchParams.fifa_update }),
        ...(searchParams.player_face_url && { player_face_url: searchParams.player_face_url }),
        ...(searchParams.long_name && { long_name: searchParams.long_name }),
        ...(searchParams.player_positions && { player_positions: searchParams.player_positions }),
        ...(searchParams.club_name && { club_name: searchParams.club_name }),
        ...(searchParams.nationality_name && { nationality_name: searchParams.nationality_name }),
        ...(searchParams.overall && { overall: searchParams.overall }),
        ...(searchParams.potential && { potential: searchParams.potential }),
        ...(searchParams.value_eur && { value_eur: searchParams.value_eur }),
        ...(searchParams.wage_eur && { wage_eur: searchParams.wage_eur }),
        ...(searchParams.age && { age: searchParams.age }),
        ...(searchParams.height_cm && { height_cm: searchParams.height_cm }),
        ...(searchParams.weight_kg && { weight_kg: searchParams.weight_kg }),
        ...(searchParams.preferred_foot && { preferred_foot: searchParams.preferred_foot }),
        ...(searchParams.weak_foot && { weak_foot: searchParams.weak_foot }),
        ...(searchParams.skill_moves && { skill_moves: searchParams.skill_moves }),
        ...(searchParams.international_reputation && { international_reputation: searchParams.international_reputation }),
        ...(searchParams.work_rate && { work_rate: searchParams.work_rate }),
        ...(searchParams.body_type && { body_type: searchParams.body_type }),
        ...(searchParams.pace && { pace: searchParams.pace }),
        ...(searchParams.shooting && { shooting: searchParams.shooting }),
        ...(searchParams.passing && { passing: searchParams.passing }),
        ...(searchParams.dribbling && { dribbling: searchParams.dribbling }),
        ...(searchParams.defending && { defending: searchParams.defending }),
        ...(searchParams.physic && { physic: searchParams.physic }),
        ...(searchParams.attacking_crossing && { attacking_crossing: searchParams.attacking_crossing }),
        ...(searchParams.attacking_finishing && { attacking_finishing: searchParams.attacking_finishing }),
        ...(searchParams.attacking_heading_accuracy && { attacking_heading_accuracy: searchParams.attacking_heading_accuracy }),
        ...(searchParams.attacking_short_passing && { attacking_short_passing: searchParams.attacking_short_passing }),
        ...(searchParams.attacking_volleys && { attacking_volleys: searchParams.attacking_volleys }),
        ...(searchParams.skill_dribbling && { skill_dribbling: searchParams.skill_dribbling }),
        ...(searchParams.skill_curve && { skill_curve: searchParams.skill_curve }),
        ...(searchParams.skill_fk_accuracy && { skill_fk_accuracy: searchParams.skill_fk_accuracy }),
        ...(searchParams.skill_long_passing && { skill_long_passing: searchParams.skill_long_passing }),
        ...(searchParams.skill_ball_control && { skill_ball_control: searchParams.skill_ball_control }),
        ...(searchParams.movement_acceleration && { movement_acceleration: searchParams.movement_acceleration }),
        ...(searchParams.movement_sprint_speed && { movement_sprint_speed: searchParams.movement_sprint_speed }),
        ...(searchParams.movement_agility && { movement_agility: searchParams.movement_agility }),
        ...(searchParams.movement_reactions && { movement_reactions: searchParams.movement_reactions }),
        ...(searchParams.movement_balance && { movement_balance: searchParams.movement_balance }),
        ...(searchParams.power_shot_power && { power_shot_power: searchParams.power_shot_power }),
        ...(searchParams.power_jumping && { power_jumping: searchParams.power_jumping }),
        ...(searchParams.power_stamina && { power_stamina: searchParams.power_stamina }),
        ...(searchParams.power_strength && { power_strength: searchParams.power_strength }),
        ...(searchParams.power_long_shots && { power_long_shots: searchParams.power_long_shots }),
        ...(searchParams.mentality_aggression && { mentality_aggression: searchParams.mentality_aggression }),
        ...(searchParams.mentality_interceptions && { mentality_interceptions: searchParams.mentality_interceptions }),
        ...(searchParams.mentality_positioning && { mentality_positioning: searchParams.mentality_positioning }),
        ...(searchParams.mentality_vision && { mentality_vision: searchParams.mentality_vision }),
        ...(searchParams.mentality_penalties && { mentality_penalties: searchParams.mentality_penalties }),
        ...(searchParams.mentality_composure && { mentality_composure: searchParams.mentality_composure }),
        ...(searchParams.defending_marking && { defending_marking: searchParams.defending_marking }),
        ...(searchParams.defending_standing_tackle && { defending_standing_tackle: searchParams.defending_standing_tackle }),
        ...(searchParams.defending_sliding_tackle && { defending_sliding_tackle: searchParams.defending_sliding_tackle }),
        ...(searchParams.goalkeeping_diving && { goalkeeping_diving: searchParams.goalkeeping_diving }),
        ...(searchParams.goalkeeping_handling && { goalkeeping_handling: searchParams.goalkeeping_handling }),
        ...(searchParams.goalkeeping_kicking && { goalkeeping_kicking: searchParams.goalkeeping_kicking }),
        ...(searchParams.goalkeeping_positioning && { goalkeeping_positioning: searchParams.goalkeeping_positioning }),
        ...(searchParams.goalkeeping_reflexes && { goalkeeping_reflexes: searchParams.goalkeeping_reflexes }),
        ...(searchParams.goalkeeping_speed && { goalkeeping_speed: searchParams.goalkeeping_speed }),
      },
      limit,
      offset
    });
    return players; // Retorna el objeto que contiene el conteo y las filas
  } catch (error) {
    throw new Error('Error al buscar jugadores: ' + error.message);
  }
};


module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  searchPlayers, // Asegúrate de exportar la nueva función
};