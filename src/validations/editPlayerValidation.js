const { body } = require('express-validator');


exports.updatePlayerValidation = [
    param('id').isInt().withMessage('El ID del jugador debe ser un número entero'),
  
    // Validaciones para los campos requeridos
    body('fifa_version').optional().isString().withMessage('La versión FIFA debe ser una cadena de texto'),
    body('fifa_update').optional().isString().withMessage('La actualización FIFA debe ser una cadena de texto'),
    body('player_face_url').optional().isString().withMessage('La URL de la cara del jugador debe ser una cadena de texto'),
    body('long_name').optional().isString().withMessage('El nombre largo debe ser una cadena de texto'),
    body('player_positions').optional().isString().withMessage('Las posiciones del jugador deben ser una cadena de texto'),
    body('club_name').optional().isString().withMessage('El nombre del club debe ser una cadena de texto'),
    body('nationality_name').optional().isString().withMessage('El nombre de la nacionalidad debe ser una cadena de texto'),
    body('overall').optional().isInt({ min: 1, max: 100 }).withMessage('El valor general debe ser un número entre 1 y 100'),
    body('potential').optional().isInt({ min: 1, max: 100 }).withMessage('El potencial debe ser un número entre 1 y 100'),
    body('value_eur').optional().isInt({ min: 0 }).withMessage('El valor en EUR debe ser un número positivo'),
    body('wage_eur').optional().isInt({ min: 0 }).withMessage('El salario en EUR debe ser un número positivo'),
    body('age').optional().isInt({ min: 15, max: 45 }).withMessage('La edad debe ser un número entre 15 y 45'),
    body('height_cm').optional().isInt({ min: 150, max: 210 }).withMessage('La altura debe ser un número entre 150 y 210 cm'),
    body('weight_kg').optional().isInt({ min: 40, max: 150 }).withMessage('El peso debe ser un número entre 40 y 150 kg'),
    body('preferred_foot').optional().isIn(['izquierdo', 'derecho']).withMessage('El pie preferido debe ser "izquierdo" o "derecho"'),
  
    // Validaciones para los campos opcionales
    body('weak_foot').optional().isInt({ min: 1, max: 5 }).withMessage('El pie débil debe ser un número entre 1 y 5'),
    body('skill_moves').optional().isInt({ min: 1, max: 5 }).withMessage('Las habilidades de regate deben ser un número entre 1 y 5'),
    body('international_reputation').optional().isInt({ min: 1, max: 5 }).withMessage('La reputación internacional debe ser un número entre 1 y 5'),
    body('work_rate').optional().isString().withMessage('La tasa de trabajo debe ser una cadena de texto'),
    body('body_type').optional().isString().withMessage('El tipo de cuerpo debe ser una cadena de texto'),
    
    // Validaciones para atributos de habilidad
    body('pace').optional().isInt({ min: 0, max: 100 }).withMessage('El ritmo debe ser un número entre 0 y 100'),
    body('shooting').optional().isInt({ min: 0, max: 100 }).withMessage('El disparo debe ser un número entre 0 y 100'),
    body('passing').optional().isInt({ min: 0, max: 100 }).withMessage('El pase debe ser un número entre 0 y 100'),
    body('dribbling').optional().isInt({ min: 0, max: 100 }).withMessage('El regate debe ser un número entre 0 y 100'),
    body('defending').optional().isInt({ min: 0, max: 100 }).withMessage('La defensa debe ser un número entre 0 y 100'),
    body('physic').optional().isInt({ min: 0, max: 100 }).withMessage('El físico debe ser un número entre 0 y 100'),
    
    // Validaciones para atributos de ataque
    body('attacking_crossing').optional().isInt({ min: 0, max: 100 }).withMessage('El cruce debe ser un número entre 0 y 100'),
    body('attacking_finishing').optional().isInt({ min: 0, max: 100 }).withMessage('La finalización debe ser un número entre 0 y 100'),
    body('attacking_heading_accuracy').optional().isInt({ min: 0, max: 100 }).withMessage('La precisión de cabezazo debe ser un número entre 0 y 100'),
    body('attacking_short_passing').optional().isInt({ min: 0, max: 100 }).withMessage('El pase corto debe ser un número entre 0 y 100'),
    body('attacking_volleys').optional().isInt({ min: 0, max: 100 }).withMessage('Los voleas deben ser un número entre 0 y 100'),
    
    // Validaciones para atributos de habilidad
    body('skill_dribbling').optional().isInt({ min: 0, max: 100 }).withMessage('El regate de habilidad debe ser un número entre 0 y 100'),
    body('skill_curve').optional().isInt({ min: 0, max: 100 }).withMessage('La curva de habilidad debe ser un número entre 0 y 100'),
    body('skill_fk_accuracy').optional().isInt({ min: 0, max: 100 }).withMessage('La precisión de tiros libres debe ser un número entre 0 y 100'),
    body('skill_long_passing').optional().isInt({ min: 0, max: 100 }).withMessage('El pase largo debe ser un número entre 0 y 100'),
    body('skill_ball_control').optional().isInt({ min: 0, max: 100 }).withMessage('El control del balón debe ser un número entre 0 y 100'),
  
    // Validaciones para atributos de movimiento
    body('movement_acceleration').optional().isInt({ min: 0, max: 100 }).withMessage('La aceleración debe ser un número entre 0 y 100'),
    body('movement_sprint_speed').optional().isInt({ min: 0, max: 100 }).withMessage('La velocidad de carrera debe ser un número entre 0 y 100'),
    body('movement_agility').optional().isInt({ min: 0, max: 100 }).withMessage('La agilidad debe ser un número entre 0 y 100'),
    body('movement_reactions').optional().isInt({ min: 0, max: 100 }).withMessage('Las reacciones deben ser un número entre 0 y 100'),
    body('movement_balance').optional().isInt({ min: 0, max: 100 }).withMessage('El equilibrio debe ser un número entre 0 y 100'),
  
    // Validaciones para atributos de potencia
    body('power_shot_power').optional().isInt({ min: 0, max: 100 }).withMessage('La potencia de tiro debe ser un número entre 0 y 100'),
    body('power_jumping').optional().isInt({ min: 0, max: 100 }).withMessage('El salto debe ser un número entre 0 y 100'),
    body('power_stamina').optional().isInt({ min: 0, max: 100 }).withMessage('La resistencia debe ser un número entre 0 y 100'),
    body('power_strength').optional().isInt({ min: 0, max: 100 }).withMessage('La fuerza debe ser un número entre 0 y 100'),
    body('power_long_shots').optional().isInt({ min: 0, max: 100 }).withMessage('Los tiros lejanos deben ser un número entre 0 y 100'),
  
    // Validaciones para atributos de mentalidad
    body('mentality_aggression').optional().isInt({ min: 0, max: 100 }).withMessage('La agresión debe ser un número entre 0 y 100'),
    body('mentality_interceptions').optional().isInt({ min: 0, max: 100 }).withMessage('Las intercepciones deben ser un número entre 0 y 100'),
    body('mentality_positioning').optional().isInt({ min: 0, max: 100 }).withMessage('El posicionamiento debe ser un número entre 0 y 100'),
    body('mentality_vision').optional().isInt({ min: 0, max: 100 }).withMessage('La visión debe ser un número entre 0 y 100'),
    body('mentality_penalties').optional().isInt({ min: 0, max: 100 }).withMessage('Los penales deben ser un número entre 0 y 100'),
    body('mentality_composure').optional().isInt({ min: 0, max: 100 }).withMessage('La compostura debe ser un número entre 0 y 100'),
  
    // Validaciones para atributos de defensa
    body('defending_marking').optional().isInt({ min: 0, max: 100 }).withMessage('El marcaje debe ser un número entre 0 y 100'),
    body('defending_standing_tackle').optional().isInt({ min: 0, max: 100 }).withMessage('El tacleo en pie debe ser un número entre 0 y 100'),
    body('defending_sliding_tackle').optional().isInt({ min: 0, max: 100 }).withMessage('El tacleo deslizante debe ser un número entre 0 y 100'),
  
    // Validaciones para atributos de portero
    body('goalkeeping_diving').optional().isInt({ min: 0, max: 100 }).withMessage('La inmersión debe ser un número entre 0 y 100'),
    body('goalkeeping_handling').optional().isInt({ min: 0, max: 100 }).withMessage('El manejo debe ser un número entre 0 y 100'),
    body('goalkeeping_kicking').optional().isInt({ min: 0, max: 100 }).withMessage('El pateo debe ser un número entre 0 y 100'),
    body('goalkeeping_positioning').optional().isInt({ min: 0, max: 100 }).withMessage('El posicionamiento debe ser un número entre 0 y 100'),
    body('goalkeeping_reflexes').optional().isInt({ min: 0, max: 100 }).withMessage('Los reflejos deben ser un número entre 0 y 100'),
  
    // Validaciones para atributos de información adicional
    body('added_on').optional().isDate().withMessage('La fecha de adición debe ser una fecha válida'),
    body('last_update').optional().isDate().withMessage('La última actualización debe ser una fecha válida'),
  ];
  
  export default updatePlayerValidation;
  