/**
 * ExerciseValidator - Valida la completitud de módulos de ejercicios
 * 
 * Este módulo proporciona funcionalidad para:
 * - Validar que los módulos tengan la estructura correcta
 * - Verificar que existan pares JS/TS para ejercicios
 * - Validar que cada ejercicio tenga su solución correspondiente
 * - Generar reportes de validación
 */

const fs = require('fs');
const path = require('path');

class ExerciseValidator {
  constructor(exerciseLoader) {
    this.loader = exerciseLoader;
  }

  /**
   * Valida la estructura completa de un módulo
   * @param {string} moduleId - ID del módulo a validar
   * @returns {Object} Resultado de validación con errores y advertencias
   */
  validateModule(moduleId) {
    const module = this.loader.loadModule(moduleId);
    
    if (!module) {
      return {
        valid: false,
        errors: [`Módulo ${moduleId} no encontrado`],
        warnings: []
      };
    }

    const errors = [];
    const warnings = [];

    // Validar que existe README
    if (!module.hasReadme) {
      errors.push('Falta archivo README.md');
    }

    // Validar que existen directorios requeridos
    const requiredDirs = ['exercises', 'solutions', 'tests'];
    for (const dir of requiredDirs) {
      const dirPath = path.join(module.path, dir);
      if (!fs.existsSync(dirPath)) {
        errors.push(`Falta directorio requerido: ${dir}/`);
      }
    }

    // Validar que hay ejercicios
    if (module.exercises.length === 0) {
      errors.push('No se encontraron ejercicios en el módulo');
    }

    // Validar pares JS/TS para ejercicios
    const exercisePairValidation = this.validateLanguagePairs(
      module.exercises,
      'ejercicios'
    );
    warnings.push(...exercisePairValidation.warnings);

    // Validar que cada ejercicio tiene su solución
    const solutionValidation = this.validateSolutions(
      module.exercises,
      module.solutions
    );
    errors.push(...solutionValidation.errors);
    warnings.push(...solutionValidation.warnings);

    // Validar que cada ejercicio tiene su test
    const testValidation = this.validateTests(
      module.exercises,
      module.tests
    );
    warnings.push(...testValidation.warnings);

    // Validar objetivos del README
    if (module.objectives && module.objectives.length === 0) {
      warnings.push('El README no contiene objetivos claros');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      moduleId: module.id,
      moduleName: module.name,
      stats: {
        exercises: module.exercises.length,
        solutions: module.solutions.length,
        tests: module.tests.length,
        objectives: module.objectives ? module.objectives.length : 0
      }
    };
  }

  /**
   * Valida que existan pares JS/TS para archivos
   * @param {Array<Object>} files - Lista de archivos
   * @param {string} type - Tipo de archivos (para mensajes)
   * @returns {Object} Resultado de validación
   */
  validateLanguagePairs(files, type) {
    const warnings = [];
    const baseNames = new Map();

    // Agrupar por nombre base
    for (const file of files) {
      if (!baseNames.has(file.name)) {
        baseNames.set(file.name, []);
      }
      baseNames.get(file.name).push(file.language);
    }

    // Verificar que cada uno tenga ambas versiones
    for (const [baseName, languages] of baseNames.entries()) {
      if (languages.length === 1) {
        const missing = languages[0] === 'javascript' ? 'TypeScript' : 'JavaScript';
        warnings.push(
          `${type}: ${baseName} solo tiene versión ${languages[0]}, falta ${missing}`
        );
      }
    }

    return { warnings };
  }

  /**
   * Valida que cada ejercicio tenga su solución
   * @param {Array<Object>} exercises - Lista de ejercicios
   * @param {Array<Object>} solutions - Lista de soluciones
   * @returns {Object} Resultado de validación
   */
  validateSolutions(exercises, solutions) {
    const errors = [];
    const warnings = [];

    // Crear mapa de soluciones por nombre base
    const solutionMap = new Map();
    for (const solution of solutions) {
      // Extraer nombre base sin prefijo 'solution-'
      const baseName = solution.name.replace(/^solution-/, '');
      if (!solutionMap.has(baseName)) {
        solutionMap.set(baseName, []);
      }
      solutionMap.get(baseName).push(solution.language);
    }

    // Verificar cada ejercicio
    for (const exercise of exercises) {
      const baseName = exercise.name.replace(/^exercise-/, '');
      
      if (!solutionMap.has(baseName)) {
        errors.push(
          `Ejercicio ${exercise.name}.${exercise.language === 'javascript' ? 'js' : 'ts'} no tiene solución correspondiente`
        );
      } else {
        const solutionLanguages = solutionMap.get(baseName);
        if (!solutionLanguages.includes(exercise.language)) {
          warnings.push(
            `Ejercicio ${exercise.name} (${exercise.language}) no tiene solución en el mismo lenguaje`
          );
        }
      }
    }

    return { errors, warnings };
  }

  /**
   * Valida que cada ejercicio tenga su test
   * @param {Array<Object>} exercises - Lista de ejercicios
   * @param {Array<Object>} tests - Lista de tests
   * @returns {Object} Resultado de validación
   */
  validateTests(exercises, tests) {
    const warnings = [];

    // Crear mapa de tests por nombre base
    const testMap = new Map();
    for (const test of tests) {
      const baseName = test.name.replace(/\.spec$/, '');
      if (!testMap.has(baseName)) {
        testMap.set(baseName, []);
      }
      testMap.get(baseName).push(test.language);
    }

    // Verificar cada ejercicio
    for (const exercise of exercises) {
      const baseName = exercise.name;
      
      if (!testMap.has(baseName)) {
        warnings.push(
          `Ejercicio ${exercise.name} no tiene test de validación`
        );
      }
    }

    return { warnings };
  }

  /**
   * Valida todos los módulos disponibles
   * @returns {Object} Reporte completo de validación
   */
  validateAllModules() {
    const modules = this.loader.discoverModules();
    const results = [];
    let totalErrors = 0;
    let totalWarnings = 0;

    for (const module of modules) {
      const validation = this.validateModule(module.id);
      results.push(validation);
      totalErrors += validation.errors.length;
      totalWarnings += validation.warnings.length;
    }

    return {
      totalModules: modules.length,
      validModules: results.filter(r => r.valid).length,
      invalidModules: results.filter(r => !r.valid).length,
      totalErrors,
      totalWarnings,
      results
    };
  }

  /**
   * Genera un reporte legible de validación
   * @param {Object} validation - Resultado de validación
   * @returns {string} Reporte formateado
   */
  generateReport(validation) {
    let report = '';

    if (validation.totalModules !== undefined) {
      // Reporte de todos los módulos
      report += '=== REPORTE DE VALIDACIÓN DE MÓDULOS ===\n\n';
      report += `Total de módulos: ${validation.totalModules}\n`;
      report += `Módulos válidos: ${validation.validModules}\n`;
      report += `Módulos inválidos: ${validation.invalidModules}\n`;
      report += `Total de errores: ${validation.totalErrors}\n`;
      report += `Total de advertencias: ${validation.totalWarnings}\n\n`;

      for (const result of validation.results) {
        report += this.generateModuleReport(result);
        report += '\n';
      }
    } else {
      // Reporte de un solo módulo
      report = this.generateModuleReport(validation);
    }

    return report;
  }

  /**
   * Genera reporte para un módulo específico
   * @param {Object} result - Resultado de validación del módulo
   * @returns {string} Reporte formateado
   */
  generateModuleReport(result) {
    let report = `--- Módulo: ${result.moduleName} (${result.moduleId}) ---\n`;
    report += `Estado: ${result.valid ? '✓ VÁLIDO' : '✗ INVÁLIDO'}\n`;
    
    if (result.stats) {
      report += `Ejercicios: ${result.stats.exercises}\n`;
      report += `Soluciones: ${result.stats.solutions}\n`;
      report += `Tests: ${result.stats.tests}\n`;
      report += `Objetivos: ${result.stats.objectives}\n`;
    }

    if (result.errors.length > 0) {
      report += '\nErrores:\n';
      for (const error of result.errors) {
        report += `  ✗ ${error}\n`;
      }
    }

    if (result.warnings.length > 0) {
      report += '\nAdvertencias:\n';
      for (const warning of result.warnings) {
        report += `  ⚠ ${warning}\n`;
      }
    }

    if (result.valid && result.errors.length === 0 && result.warnings.length === 0) {
      report += '\n✓ Módulo completamente válido\n';
    }

    return report;
  }
}

module.exports = ExerciseValidator;
