/**
 * ExerciseLoader - Carga y descubre módulos de ejercicios
 * 
 * Este módulo proporciona funcionalidad para:
 * - Descubrir módulos de ejercicios disponibles
 * - Cargar información de módulos y ejercicios
 * - Validar la estructura de módulos
 */

const fs = require('fs');
const path = require('path');

class ExerciseLoader {
  constructor(exercisesDir = 'exercises') {
    this.exercisesDir = path.resolve(exercisesDir);
  }

  /**
   * Descubre todos los módulos de ejercicios disponibles
   * @returns {Array<Object>} Lista de módulos con su información básica
   */
  discoverModules() {
    if (!fs.existsSync(this.exercisesDir)) {
      return [];
    }

    const entries = fs.readdirSync(this.exercisesDir, { withFileTypes: true });
    const modules = [];

    for (const entry of entries) {
      if (entry.isDirectory() && /^\d{2}-/.test(entry.name)) {
        const modulePath = path.join(this.exercisesDir, entry.name);
        const moduleInfo = this.loadModuleInfo(modulePath, entry.name);
        if (moduleInfo) {
          modules.push(moduleInfo);
        }
      }
    }

    // Ordenar por número de módulo
    return modules.sort((a, b) => a.order - b.order);
  }

  /**
   * Carga información básica de un módulo
   * @param {string} modulePath - Ruta al directorio del módulo
   * @param {string} moduleName - Nombre del directorio del módulo
   * @returns {Object|null} Información del módulo o null si no es válido
   */
  loadModuleInfo(modulePath, moduleName) {
    const readmePath = path.join(modulePath, 'README.md');
    
    // Extraer número de orden del nombre del directorio
    const orderMatch = moduleName.match(/^(\d{2})-/);
    const order = orderMatch ? parseInt(orderMatch[1], 10) : 999;

    // Extraer nombre limpio
    const cleanName = moduleName.replace(/^\d{2}-/, '');

    const moduleInfo = {
      id: moduleName,
      name: cleanName,
      order: order,
      path: modulePath,
      hasReadme: fs.existsSync(readmePath),
      exercises: [],
      solutions: [],
      tests: []
    };

    // Cargar ejercicios
    const exercisesDir = path.join(modulePath, 'exercises');
    if (fs.existsSync(exercisesDir)) {
      moduleInfo.exercises = this.loadExerciseFiles(exercisesDir);
    }

    // Cargar soluciones
    const solutionsDir = path.join(modulePath, 'solutions');
    if (fs.existsSync(solutionsDir)) {
      moduleInfo.solutions = this.loadExerciseFiles(solutionsDir);
    }

    // Cargar tests
    const testsDir = path.join(modulePath, 'tests');
    if (fs.existsSync(testsDir)) {
      moduleInfo.tests = this.loadExerciseFiles(testsDir);
    }

    return moduleInfo;
  }

  /**
   * Carga archivos de ejercicios de un directorio
   * @param {string} dir - Directorio a escanear
   * @returns {Array<Object>} Lista de archivos de ejercicios
   */
  loadExerciseFiles(dir) {
    if (!fs.existsSync(dir)) {
      return [];
    }

    const files = fs.readdirSync(dir);
    const exercises = [];

    for (const file of files) {
      const ext = path.extname(file);
      if (ext === '.js' || ext === '.ts') {
        const baseName = path.basename(file, ext);
        exercises.push({
          name: baseName,
          file: file,
          path: path.join(dir, file),
          language: ext === '.js' ? 'javascript' : 'typescript'
        });
      }
    }

    return exercises;
  }

  /**
   * Carga un módulo completo con toda su información
   * @param {string} moduleId - ID del módulo (nombre del directorio)
   * @returns {Object|null} Módulo completo o null si no existe
   */
  loadModule(moduleId) {
    const modulePath = path.join(this.exercisesDir, moduleId);
    
    if (!fs.existsSync(modulePath)) {
      return null;
    }

    const moduleInfo = this.loadModuleInfo(modulePath, moduleId);
    
    // Cargar contenido del README si existe
    if (moduleInfo.hasReadme) {
      const readmePath = path.join(modulePath, 'README.md');
      moduleInfo.readme = fs.readFileSync(readmePath, 'utf-8');
      moduleInfo.objectives = this.extractObjectives(moduleInfo.readme);
    }

    return moduleInfo;
  }

  /**
   * Extrae objetivos del README del módulo
   * @param {string} readmeContent - Contenido del README
   * @returns {Array<string>} Lista de objetivos
   */
  extractObjectives(readmeContent) {
    const objectives = [];
    const lines = readmeContent.split('\n');
    let inObjectivesSection = false;

    for (const line of lines) {
      if (line.match(/^##\s+(Objetivos|Objectives)/i)) {
        inObjectivesSection = true;
        continue;
      }
      
      if (inObjectivesSection && line.match(/^##\s+/)) {
        break;
      }

      if (inObjectivesSection && line.trim().startsWith('-')) {
        objectives.push(line.trim().substring(1).trim());
      }
    }

    return objectives;
  }

  /**
   * Obtiene estadísticas de todos los módulos
   * @returns {Object} Estadísticas generales
   */
  getStatistics() {
    const modules = this.discoverModules();
    
    return {
      totalModules: modules.length,
      totalExercises: modules.reduce((sum, m) => sum + m.exercises.length, 0),
      totalSolutions: modules.reduce((sum, m) => sum + m.solutions.length, 0),
      totalTests: modules.reduce((sum, m) => sum + m.tests.length, 0),
      modules: modules.map(m => ({
        id: m.id,
        name: m.name,
        order: m.order,
        exerciseCount: m.exercises.length,
        solutionCount: m.solutions.length,
        testCount: m.tests.length
      }))
    };
  }
}

module.exports = ExerciseLoader;
