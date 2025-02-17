const Teacher = require("../models/teacherModel");

/**
 * Creates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPost = (req, res) => {
  let teacher = new Teacher();

  teacher.first_name = req.body.first_name;
  teacher.last_name  = req.body.last_name;
  teacher.cedula = req.body.cedula;
  teacher.age = req.body.age;

  if (teacher.first_name && teacher.last_name) {
    teacher.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the teacher', err);
        res.json({
          error: 'There was an error saving the teacher'
        });
      }
      res.status(201); // CREATED
      res.header({
        'location': `/api/teachers/?id=${teacher.id}`
      });
      res.json(teacher);
    });
  } else {
    res.status(422);
    console.log('error while saving the teacher')
    res.json({
      error: 'No valid data provided for teacher'
    });
  }
};

/**
 * Get all teachers
 *
 * @param {*} req
 * @param {*} res
 */
const teacherGet = (req, res) => {
  // if an specific teacher is required
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log('error while queryting the teacher', err)
        res.json({ error: "Teacher doesnt exist" })
      }
      res.json(teacher);
    });
  } else {
    // get all teachers
    Teacher.find(function (err, teachers) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(teachers);
    });

  }
};

/**
 * Updates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
/**
 * Updates a teacher (PATCH)
 */
const teacherPatch = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la URL
    const { first_name, last_name, cedula, age } = req.body;

    // Buscar el profesor por ID
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Actualizar solo los campos proporcionados
    if (first_name) teacher.first_name = first_name;
    if (last_name) teacher.last_name = last_name;
    if (cedula) teacher.cedula = cedula;
    if (age) teacher.age = age;

    // Guardar los cambios
    await teacher.save();
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

module.exports = {
  teacherPatch,
};

/**
 * Deletes a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherDelete = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de la URL
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(204).json({});
  } catch (err) {
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};
module.exports = {
  teacherGet,
  teacherPost,
  teacherPatch,
  teacherDelete
}