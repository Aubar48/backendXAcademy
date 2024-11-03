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

const importarDatosDesdeCSV = (filePath) => {
  return new Promise((resolve, reject) => {
      const results = [];

      fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
              // Transformar el row a un objeto que coincida con tu modelo
              const playerData = {
                  id: row.ID, // Asegúrate de que este nombre coincide con el encabezado del CSV
                  fifaVersion: row['fifa_version'],
                  fifaUpdate: row['fifa_update'],
                  playerFaceUrl: row['player_face_url'],
                  longName: row['long_name'],
                  playerPositions: row['player_positions'],
                  clubName: row['club_name'],
                  nationalityName: row['nationality_name'],
                  overall: row['overall'],
                  potential: row['potential'],
                  valueEUR: row['value_eur'],
                  wageEUR: row['wage_eur'],
                  age: row['age'],
                  heightCm: row['height_cm'],
                  weightKg: row['weight_kg'],
                  preferredFoot: row['preferred_foot'],
                  weakFoot: row['weak_foot'],
                  skillMoves: row['skill_moves'],
                  internationalReputation: row['international_reputation'],
                  workRate: row['work_rate'],
                  bodyType: row['body_type'],
                  pace: row['pace'],
                  shooting: row['shooting'],
                  passing: row['passing'],
                  dribbling: row['dribbling'],
                  defending: row['defending'],
                  physic: row['physic'],
                  attackingCrossing: row['attacking_crossing'],
                  attackingFinishing: row['attacking_finishing'],
                  attackingHeadingAccuracy: row['attacking_heading_accuracy'],
                  attackingShortPassing: row['attacking_short_passing'],
                  attackingVolleys: row['attacking_volleys'],
                  skillDribbling: row['skill_dribbling'],
                  skillCurve: row['skill_curve'],
                  skillFKAccuracy: row['skill_fk_accuracy'],
                  skillLongPassing: row['skill_long_passing'],
                  skillBallControl: row['skill_ball_control'],
                  movementAcceleration: row['movement_acceleration'],
                  movementSprintSpeed: row['movement_sprint_speed'],
                  movementAgility: row['movement_agility'],
                  movementReactions: row['movement_reactions'],
                  movementBalance: row['movement_balance'],
                  powerShotPower: row['power_shot_power'],
                  powerJumping: row['power_jumping'],
                  powerStamina: row['power_stamina'],
                  powerStrength: row['power_strength'],
                  powerLongShots: row['power_long_shots'],
                  mentalityAggression: row['mentality_aggression'],
                  mentalityInterceptions: row['mentality_interceptions'],
                  mentalityPositioning: row['mentality_positioning'],
                  mentalityVision: row['mentality_vision'],
                  mentalityPenalties: row['mentality_penalties'],
                  mentalityComposure: row['mentality_composure'],
                  defendingMarking: row['defending_marking'],
                  defendingStandingTackle: row['defending_standing_tackle'],
                  defendingSlidingTackle: row['defending_sliding_tackle'],
                  goalkeepingDiving: row['goalkeeping_diving'],
                  goalkeepingHandling: row['goalkeeping_handling'],
                  goalkeepingKicking: row['goalkeeping_kicking'],
                  goalkeepingPositioning: row['goalkeeping_positioning'],
                  goalkeepingReflexes: row['goalkeeping_reflexes'],
                  goalkeepingSpeed: row['goalkeeping_speed'],
                  playerTraits: row['player_traits'],
              };
              results.push(playerData);
          })
          .on('end', async () => {
              try {
                  // Usar bulkCreate para insertar todos los registros de una vez
                  await PlayerFemale.bulkCreate(results, { ignoreDuplicates: true });
                  resolve('Todos los datos han sido insertados correctamente.');
              } catch (error) {
                  reject(error);
              }
          })
          .on('error', (err) => {
              reject(err);
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