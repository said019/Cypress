/**
 * ProgressTracker - Rastrea el progreso del aprendiz a través de los módulos
 * 
 * Este módulo proporciona funcionalidad para:
 * - Registrar ejercicios completados
 * - Calcular progreso por módulo y general
 * - Guardar y cargar estado de progreso
 * - Generar reportes de progreso
 */

const fs = require('fs');
const path = require('path');

class ProgressTracker {
  constructor(progressFile = '.progress.json') {
    this.progressFile = path.resolve(progressFile);
    this.progress = this.loadProgress();
  }

  /**
   * Carga el progreso guardado desde el archivo
   * @returns {Object} Datos de progreso
   */
  loadProgress() {
    if (fs.existsSync(this.progressFile)) {
      try {
        const data = fs.readFileSync(this.progressFile, 'utf-8');
        return JSON.parse(data);
      } catch (error) {
        console.error('Error cargando progreso:', error.message);
        return this.createEmptyProgress();
      }
    }
    return this.createEmptyProgress();
  }

  /**
   * Crea una estructura de progreso vacía
   * @returns {Object} Estructura de progreso inicial
   */
  createEmptyProgress() {
    return {
      learnerId: 'default',
      startedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      completedModules: [],
      completedExercises: [],
      currentModule: null,
      currentExercise: null,
      stats: {
        totalExercises: 0,
        completedExercises: 0,
        passedTests: 0,
        failedTests: 0,
        totalTimeSpent: 0
      },
      exerciseDetails: {}
    };
  }

  /**
   * Guarda el progreso actual al archivo
   */
  saveProgress() {
    try {
      const data = JSON.stringify(this.progress, null, 2);
      fs.writeFileSync(this.progressFile, data, 'utf-8');
    } catch (error) {
      console.error('Error guardando progreso:', error.message);
    }
  }

  /**
   * Marca un ejercicio como iniciado
   * @param {string} moduleId - ID del módulo
   * @param {string} exerciseId - ID del ejercicio
   */
  startExercise(moduleId, exerciseId) {
    this.progress.currentModule = moduleId;
    this.progress.currentExercise = exerciseId;
    this.progress.lastActivity = new Date().toISOString();

    const key = `${moduleId}/${exerciseId}`;
    if (!this.progress.exerciseDetails[key]) {
      this.progress.exerciseDetails[key] = {
        startedAt: new Date().toISOString(),
        attempts: 0,
        completed: false,
        testsPassed: false
      };
    }

    this.saveProgress();
  }

  /**
   * Marca un ejercicio como completado
   * @param {string} moduleId - ID del módulo
   * @param {string} exerciseId - ID del ejercicio
   * @param {boolean} testsPassed - Si los tests pasaron
   */
  completeExercise(moduleId, exerciseId, testsPassed = true) {
    const key = `${moduleId}/${exerciseId}`;
    
    if (!this.progress.exerciseDetails[key]) {
      this.startExercise(moduleId, exerciseId);
    }

    const details = this.progress.exerciseDetails[key];
    details.completed = true;
    details.testsPassed = testsPassed;
    details.completedAt = new Date().toISOString();
    details.attempts++;

    // Agregar a lista de completados si no está
    if (!this.progress.completedExercises.includes(key)) {
      this.progress.completedExercises.push(key);
      this.progress.stats.completedExercises++;
    }

    // Actualizar estadísticas de tests
    if (testsPassed) {
      this.progress.stats.passedTests++;
    } else {
      this.progress.stats.failedTests++;
    }

    this.progress.lastActivity = new Date().toISOString();
    this.saveProgress();
  }

  /**
   * Marca un módulo como completado
   * @param {string} moduleId - ID del módulo
   */
  completeModule(moduleId) {
    if (!this.progress.completedModules.includes(moduleId)) {
      this.progress.completedModules.push(moduleId);
    }
    this.progress.lastActivity = new Date().toISOString();
    this.saveProgress();
  }

  /**
   * Obtiene el progreso de un módulo específico
   * @param {string} moduleId - ID del módulo
   * @param {Object} moduleInfo - Información del módulo del loader
   * @returns {Object} Progreso del módulo
   */
  getModuleProgress(moduleId, moduleInfo) {
    const moduleExercises = moduleInfo.exercises.map(e => 
      `${moduleId}/${e.name}`
    );

    const completedInModule = this.progress.completedExercises.filter(key =>
      key.startsWith(`${moduleId}/`)
    );

    const totalExercises = moduleExercises.length;
    const completedExercises = completedInModule.length;
    const percentage = totalExercises > 0 
      ? Math.round((completedExercises / totalExercises) * 100)
      : 0;

    return {
      moduleId,
      moduleName: moduleInfo.name,
      totalExercises,
      completedExercises,
      percentage,
      isCompleted: this.progress.completedModules.includes(moduleId),
      isCurrent: this.progress.currentModule === moduleId,
      exercises: moduleExercises.map(key => ({
        key,
        completed: this.progress.completedExercises.includes(key),
        details: this.progress.exerciseDetails[key] || null
      }))
    };
  }

  /**
   * Obtiene el progreso general
   * @param {Array<Object>} allModules - Lista de todos los módulos
   * @returns {Object} Progreso general
   */
  getOverallProgress(allModules) {
    const totalModules = allModules.length;
    const completedModules = this.progress.completedModules.length;
    
    const totalExercises = allModules.reduce((sum, m) => 
      sum + m.exercises.length, 0
    );
    const completedExercises = this.progress.completedExercises.length;

    const percentage = totalExercises > 0
      ? Math.round((completedExercises / totalExercises) * 100)
      : 0;

    return {
      totalModules,
      completedModules,
      totalExercises,
      completedExercises,
      percentage,
      currentModule: this.progress.currentModule,
      currentExercise: this.progress.currentExercise,
      startedAt: this.progress.startedAt,
      lastActivity: this.progress.lastActivity,
      stats: this.progress.stats
    };
  }

  /**
   * Genera un reporte de progreso legible
   * @param {Array<Object>} allModules - Lista de todos los módulos
   * @returns {string} Reporte formateado
   */
  generateReport(allModules) {
    const overall = this.getOverallProgress(allModules);
    
    let report = '=== REPORTE DE PROGRESO ===\n\n';
    report += `Progreso General: ${overall.percentage}%\n`;
    report += `Módulos: ${overall.completedModules}/${overall.totalModules}\n`;
    report += `Ejercicios: ${overall.completedExercises}/${overall.totalExercises}\n`;
    report += `Tests Pasados: ${overall.stats.passedTests}\n`;
    report += `Tests Fallidos: ${overall.stats.failedTests}\n`;
    report += `Iniciado: ${new Date(overall.startedAt).toLocaleDateString()}\n`;
    report += `Última Actividad: ${new Date(overall.lastActivity).toLocaleDateString()}\n\n`;

    if (overall.currentModule) {
      report += `Módulo Actual: ${overall.currentModule}\n`;
      if (overall.currentExercise) {
        report += `Ejercicio Actual: ${overall.currentExercise}\n`;
      }
      report += '\n';
    }

    report += '--- Progreso por Módulo ---\n\n';
    
    for (const module of allModules) {
      const moduleProgress = this.getModuleProgress(module.id, module);
      const status = moduleProgress.isCompleted ? '✓' : 
                     moduleProgress.isCurrent ? '→' : ' ';
      
      report += `${status} ${module.name} (${module.id})\n`;
      report += `   ${moduleProgress.completedExercises}/${moduleProgress.totalExercises} ejercicios (${moduleProgress.percentage}%)\n`;
      
      if (moduleProgress.isCurrent) {
        report += '   [MÓDULO ACTUAL]\n';
      }
      
      report += '\n';
    }

    return report;
  }

  /**
   * Reinicia el progreso (útil para empezar de nuevo)
   */
  reset() {
    this.progress = this.createEmptyProgress();
    this.saveProgress();
  }

  /**
   * Exporta el progreso a un formato específico
   * @param {string} format - Formato de exportación ('json', 'csv')
   * @returns {string} Datos exportados
   */
  export(format = 'json') {
    if (format === 'json') {
      return JSON.stringify(this.progress, null, 2);
    }
    
    if (format === 'csv') {
      let csv = 'Módulo,Ejercicio,Completado,Tests Pasados,Intentos,Fecha Inicio,Fecha Completado\n';
      
      for (const [key, details] of Object.entries(this.progress.exerciseDetails)) {
        const [moduleId, exerciseId] = key.split('/');
        csv += `${moduleId},${exerciseId},${details.completed},${details.testsPassed},`;
        csv += `${details.attempts},${details.startedAt},${details.completedAt || 'N/A'}\n`;
      }
      
      return csv;
    }

    throw new Error(`Formato no soportado: ${format}`);
  }
}

module.exports = ProgressTracker;
