const Course = require("../models/courseModel");

/**
 * Crea un nuevo curso
 */
const coursePost = async (req, res) => {
  try {
    const { name, code, description, teacher } = req.body;

    // Validar que todos los campos estén presentes
    if (!name || !code || !description || !teacher) {
      return res.status(422).json({ error: "Todos los campos son obligatorios" });
    }

    // Crear el curso
    const course = new Course({ name, code, description, teacher });
    await course.save();

    res.status(201).json(course); // CREATED
  } catch (err) {
    res.status(500).json({ error: "Error al crear el curso", details: err.message });
  }
};

/**
 * Obtiene todos los cursos o un curso específico por ID
 */
const courseGet = async (req, res) => {
  try {
    if (req.query && req.query.id) {
      // Obtener un curso específico por ID
      const course = await Course.findById(req.query.id).populate('teacher');
      if (!course) {
        return res.status(404).json({ error: "Curso no encontrado" });
      }
      res.json(course);
    } else {
      // Obtener todos los cursos
      const courses = await Course.find().populate('teacher');
      res.json(courses);
    }
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los cursos", details: err.message });
  }
};

/**
 * Actualiza un curso (PATCH)
 */
const coursePatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description, teacher } = req.body;

    // Buscar el curso por ID
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    // Actualizar solo los campos proporcionados
    if (name) course.name = name;
    if (code) course.code = code;
    if (description) course.description = description;
    if (teacher) course.teacher = teacher;

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el curso", details: err.message });
  }
};

/**
 * Elimina un curso
 */
const courseDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }
    res.status(204).json({}); // NO CONTENT
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el curso", details: err.message });
  }
};

module.exports = {
  coursePost,
  courseGet,
  coursePatch,
  courseDelete,
};