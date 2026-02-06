#!/usr/bin/env node

/**
 * CLI para gestionar el sistema de ejercicios de Playwright
 * 
 * Comandos disponibles:
 * - list: Lista todos los módulos disponibles
 * - validate: Valida la estructura de módulos
 * - progress: Muestra el progreso del aprendiz
 * - start: Inicia un ejercicio
 * - complete: Marca un ejercicio como completado
 */

const ExerciseLoader = require('./ExerciseLoader');
const ExerciseValidator = require('./ExerciseValidator');
const ProgressTracker = require('./ProgressTracker');

const loader = new ExerciseLoader();
const validator = new ExerciseValidator(loader);
const tracker = new ProgressTracker();

const command = process.argv[2];
const args = process.argv.slice(3);

function showHelp() {
  console.log(`
Uso: node cli.js <comando> [opciones]

Comandos:
  list                    Lista todos los módulos disponibles
  validate [moduleId]     Valida módulos (todos o uno específico)
  progress                Muestra tu progreso de aprendizaje
  start <moduleId> <exerciseId>    Inicia un ejercicio
  complete <moduleId> <exerciseId> Marca ejercicio como completado
  stats                   Muestra estadísticas generales
  reset                   Reinicia el progreso (¡cuidado!)
  help                    Muestra esta ayuda

Ejemplos:
  node cli.js list
  node cli.js validate 01-fundamentals
  node cli.js progress
  node cli.js start 01-fundamentals exercise-01
  node cli.js complete 01-fundamentals exercise-01
`);
}

function listModules() {
  const modules = loader.discoverModules();
  
  console.log('\n=== MÓDULOS DISPONIBLES ===\n');
  
  for (const module of modules) {
    console.log(`${module.order}. ${module.name} (${module.id})`);
    console.log(`   Ejercicios: ${module.exercises.length}`);
    console.log(`   Soluciones: ${module.solutions.length}`);
    console.log(`   Tests: ${module.tests.length}`);
    console.log('');
  }
  
  console.log(`Total: ${modules.length} módulos\n`);
}

function validateModules(moduleId) {
  if (moduleId) {
    const result = validator.validateModule(moduleId);
    console.log('\n' + validator.generateReport(result));
  } else {
    const result = validator.validateAllModules();
    console.log('\n' + validator.generateReport(result));
  }
}

function showProgress() {
  const modules = loader.discoverModules();
  const report = tracker.generateReport(modules);
  console.log('\n' + report);
}

function startExercise(moduleId, exerciseId) {
  if (!moduleId || !exerciseId) {
    console.error('Error: Debes especificar moduleId y exerciseId');
    console.log('Ejemplo: node cli.js start 01-fundamentals exercise-01');
    process.exit(1);
  }

  tracker.startExercise(moduleId, exerciseId);
  console.log(`\n✓ Ejercicio iniciado: ${moduleId}/${exerciseId}`);
  console.log('¡Buena suerte! 🚀\n');
}

function completeExercise(moduleId, exerciseId) {
  if (!moduleId || !exerciseId) {
    console.error('Error: Debes especificar moduleId y exerciseId');
    console.log('Ejemplo: node cli.js complete 01-fundamentals exercise-01');
    process.exit(1);
  }

  tracker.completeExercise(moduleId, exerciseId, true);
  console.log(`\n✓ Ejercicio completado: ${moduleId}/${exerciseId}`);
  console.log('¡Excelente trabajo! 🎉\n');
}

function showStats() {
  const stats = loader.getStatistics();
  
  console.log('\n=== ESTADÍSTICAS GENERALES ===\n');
  console.log(`Total de módulos: ${stats.totalModules}`);
  console.log(`Total de ejercicios: ${stats.totalExercises}`);
  console.log(`Total de soluciones: ${stats.totalSolutions}`);
  console.log(`Total de tests: ${stats.totalTests}`);
  console.log('');
  
  console.log('Distribución por módulo:');
  for (const module of stats.modules) {
    console.log(`  ${module.name}: ${module.exerciseCount} ejercicios`);
  }
  console.log('');
}

function resetProgress() {
  console.log('\n⚠️  ADVERTENCIA: Esto borrará todo tu progreso.');
  console.log('Para confirmar, ejecuta: node cli.js reset --confirm\n');
  
  if (args.includes('--confirm')) {
    tracker.reset();
    console.log('✓ Progreso reiniciado\n');
  }
}

// Ejecutar comando
switch (command) {
  case 'list':
    listModules();
    break;
  
  case 'validate':
    validateModules(args[0]);
    break;
  
  case 'progress':
    showProgress();
    break;
  
  case 'start':
    startExercise(args[0], args[1]);
    break;
  
  case 'complete':
    completeExercise(args[0], args[1]);
    break;
  
  case 'stats':
    showStats();
    break;
  
  case 'reset':
    resetProgress();
    break;
  
  case 'help':
  case undefined:
    showHelp();
    break;
  
  default:
    console.error(`\nComando desconocido: ${command}\n`);
    showHelp();
    process.exit(1);
}
