// URL to API
const API_URL = "http://localhost:3001/api/teachers";

// Function to show errors of validation
function showError(field, message) {
  const errorElement = document.getElementById(`${field}_error`);
  errorElement.textContent = message;
}

// Funct to clean errorr
function clearErrors() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => element.textContent = '');
}

// Func to create a teacher
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
    fetchTeachers(); // Update teacher list
  } else {
    // Show validation errors
    if (data.errors) {
      data.errors.forEach(error => {
        showError(error.param, error.msg);
      });
    } else {
      alert("Error al crear el profesor");
    }
  }
});

// Func to call all teachers
async function fetchTeachers() {
  const response = await fetch(API_URL);
  const teachers = await response.json();

  const teachersList = document.getElementById("teachers");
  teachersList.innerHTML = ""; //Clean list

  teachers.forEach((teacher) => {
    const li = document.createElement("li");
    li.textContent = `Nombre: ${teacher.first_name} ${teacher.last_name}, Cédula: ${teacher.cedula}, Edad: ${teacher.age}`;

    // Buttonto eliminate a teacher
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", async () => {
      const deleteResponse = await fetch(`${API_URL}/${teacher._id}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        alert("Profesor eliminado exitosamente");
        fetchTeachers(); // Update teacher list
      } else {
        alert("Error al eliminar el profesor");
      }
    });

    // Button to update
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

// Funct to show edit form
function showEditForm(teacher) {
  document.getElementById("edit-id").value = teacher._id;
  document.getElementById("edit-first_name").value = teacher.first_name;
  document.getElementById("edit-last_name").value = teacher.last_name;
  document.getElementById("edit-cedula").value = teacher.cedula;
  document.getElementById("edit-age").value = teacher.age;
  document.getElementById("edit-teacher-form").style.display = "block";
}

// Func to hide edit form
document.getElementById("cancel-edit").addEventListener("click", () => {
  document.getElementById("edit-teacher-form").style.display = "none";
});

// func to update a teacher
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
      fetchTeachers();
    } else {
      
      if (data.errors) {
        data.errors.forEach(error => {
          showError(`edit-${error.param}`, error.msg);
        });
      } else {
        alert("Error al actualizar el profesor");
      }
    }
  });

// Button to update teacher list
document.getElementById("refresh-teachers").addEventListener("click", fetchTeachers);

// Load teacher list when page start
window.onload = fetchTeachers;