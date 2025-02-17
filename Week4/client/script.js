// URL base de la API
const API_URL = "http://localhost:3001/api/teachers";

// Función para mostrar errores de validación
function showError(field, message) {
  const errorElement = document.getElementById(`${field}_error`);
  errorElement.textContent = message;
}

// Función para limpiar errores
function clearErrors() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => element.textContent = '');
}

// Función para crear un profesor
document.getElementById("create-teacher-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const cedula = document.getElementById("cedula").value;
  const age = document.getElementById("age").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, cedula, age }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("Profesor creado exitosamente");
    document.getElementById("create-teacher-form").reset();
    fetchTeachers(); // Actualizar la lista de profesores
  } else {
    // Mostrar errores de validación
    if (data.errors) {
      data.errors.forEach(error => {
        showError(error.param, error.msg);
      });
    } else {
      alert("Error al crear el profesor");
    }
  }
});

// Función para listar todos los profesores
async function fetchTeachers() {
  const response = await fetch(API_URL);
  const teachers = await response.json();

  const teachersList = document.getElementById("teachers");
  teachersList.innerHTML = ""; // Limpiar la lista

  teachers.forEach((teacher) => {
    const li = document.createElement("li");
    li.textContent = `Nombre: ${teacher.first_name} ${teacher.last_name}, Cédula: ${teacher.cedula}, Edad: ${teacher.age}`;

    // Botón para eliminar un profesor
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", async () => {
      const deleteResponse = await fetch(`${API_URL}/${teacher._id}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        alert("Profesor eliminado exitosamente");
        fetchTeachers(); // Actualizar la lista de profesores
      } else {
        alert("Error al eliminar el profesor");
      }
    });

    // Botón para actualizar un profesor
    const updateButton = document.createElement("button");
    updateButton.textContent = "Actualizar";
    updateButton.addEventListener("click", () => {
      showEditForm(teacher);
    });

    li.appendChild(deleteButton);
    li.appendChild(updateButton);
    teachersList.appendChild(li);
  });
}

// Función para mostrar el formulario de edición
function showEditForm(teacher) {
  document.getElementById("edit-id").value = teacher._id;
  document.getElementById("edit-first_name").value = teacher.first_name;
  document.getElementById("edit-last_name").value = teacher.last_name;
  document.getElementById("edit-cedula").value = teacher.cedula;
  document.getElementById("edit-age").value = teacher.age;
  document.getElementById("edit-teacher-form").style.display = "block";
}

// Función para ocultar el formulario de edición
document.getElementById("cancel-edit").addEventListener("click", () => {
  document.getElementById("edit-teacher-form").style.display = "none";
});

// Función para actualizar un profesor
document.getElementById("edit-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();
  
    const id = document.getElementById("edit-id").value;
    const first_name = document.getElementById("edit-first_name").value;
    const last_name = document.getElementById("edit-last_name").value;
    const cedula = document.getElementById("edit-cedula").value;
    const age = document.getElementById("edit-age").value;
  
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, cedula, age }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      alert("Profesor actualizado exitosamente");
      document.getElementById("edit-teacher-form").style.display = "none";
      fetchTeachers(); // Actualizar la lista de profesores
    } else {
      // Mostrar errores de validación
      if (data.errors) {
        data.errors.forEach(error => {
          showError(`edit-${error.param}`, error.msg);
        });
      } else {
        alert("Error al actualizar el profesor");
      }
    }
  });

// Botón para actualizar la lista de profesores
document.getElementById("refresh-teachers").addEventListener("click", fetchTeachers);

// Cargar la lista de profesores al cargar la página
window.onload = fetchTeachers;