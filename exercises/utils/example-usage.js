/**
 * Ejemplo de uso del sistema de ejercicios
 * 
 * Este archivo demuestra cómo usar las utilidades del sistema
 * de ejercicios programáticamente.
 */

const ExerciseLoader = require('./ExerciseLoader');
const ExerciseValidator = require('./ExerciseValidator');
const ProgressTracker = require('./ProgressTracker');

// Crear instancias
const loader = new ExerciseLoader();
const validator = new ExerciseValidator(loader);
const tracker = new ProgressTracker();

console.log('=== EJEMPLO DE USO DEL SISTEMA DE EJERCICIOS ===\n');

// 1. Descubrir módulos disponibles
console.log('1. Descubriendo módulos...');
const modules = loader.discoverModules();
console.log(`   Encontrados ${modules.length} módulos\n`);

// 2. Cargar un módulo específico
if (modules.length > 0) {
  const firstModule = modules[0];
  console.log(`2. Cargando módulo: ${firstModule.id}`);
  const moduleDetails = loader.loadModule(firstModule.id);
  
  if (moduleDetails) {
    console.log(`   Nombre: ${moduleDetails.name}`);
    console.log(`   Ejercicios: ${moduleDetails.exercises.length}`);
    console.log(`   Soluciones: ${moduleDetails.solutions.length}`);
    console.log(`   Tests: ${moduleDetails.tests.length}`);
    
    if (moduleDetails.objectives) {
      console.log(`   Objetivos: ${moduleDetails.objectives.length}`);
    }
  }
  console.log('');
}

// 3. Validar módulos
console.log('3. Validando estructura de módulos...');
const validationResult = validator.validateAllModules();
console.log(`   Módulos válidos: ${validationResult.validModules}/${validationResult.totalModules}`);
console.log(`   Errores totales: ${validationResult.totalErrors}`);
console.log(`   Advertencias totales: ${validationResult.totalWarnings}\n`);

// 4. Obtener estadísticas
console.log('4. Estadísticas generales:');
const stats = loader.getStatistics();
console.log(`   Total ejercicios: ${stats.totalExercises}`);
console.log(`   Total soluciones: ${stats.totalSolutions}`);
console.log(`   Total tests: ${stats.totalTests}\n`);

// 5. Simular progreso del aprendiz
console.log('5. Simulando progreso del aprendiz...');
if (modules.length > 0 && modules[0].exercises.length > 0) {
  const moduleId = modules[0].id;
  const exerciseId = modules[0].exercises[0].name;
  
  // Iniciar ejercicio
  tracker.startExercise(moduleId, exerciseId);
  console.log(`   ✓ Iniciado: ${moduleId}/${exerciseId}`);
  
  // Completar ejercicio
  tracker.completeExercise(moduleId, exerciseId, true);
  console.log(`   ✓ Completado: ${moduleId}/${exerciseId}`);
}
console.log('');

// 6. Mostrar progreso
console.log('6. Progreso actual:');
const overallProgress = tracker.getOverallProgress(modules);
console.log(`   Progreso general: ${overallProgress.percentage}%`);
console.log(`   Ejercicios completados: ${overallProgress.completedExercises}/${overallProgress.totalExercises}`);
console.log('');

// 7. Ejemplo de validación de un módulo específico
if (modules.length > 0) {
  console.log('7. Validación detallada del primer módulo:');
  const moduleValidation = validator.validateModule(modules[0].id);
  console.log(`   Estado: ${moduleValidation.valid ? '✓ VÁLIDO' : '✗ INVÁLIDO'}`);
  
  if (moduleValidation.errors.length > 0) {
    console.log('   Errores:');
    moduleValidation.errors.forEach(err => console.log(`     - ${err}`));
  }
  
  if (moduleValidation.warnings.length > 0) {
    console.log('   Advertencias:');
    moduleValidation.warnings.forEach(warn => console.log(`     - ${warn}`));
  }
  console.log('');
}

console.log('=== FIN DEL EJEMPLO ===\n');
console.log('Para usar el CLI, ejecuta:');
console.log('  node exercises/utils/cli.js help\n');
