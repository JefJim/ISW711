const API_URL = "http://localhost:3001/api/courses";
const TEACHERS_API_URL = "http://localhost:3001/api/teachers";

// funtion to show error
function showError(field, message) {
  const errorElement = document.getElementById(`${field}_error`);
  errorElement.textContent = message;
}

// func to clean errors
function clearErrors() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => element.textContent = '');
}

// funt to load teachers in the select
async function loadTeachers() {
  const response = await fetch(TEACHERS_API_URL);
  const teachers = await response.json();

  const teacherSelect = document.getElementById("teacher");
  const editTeacherSelect = document.getElementById("edit-teacher");

  teacherSelect.innerHTML = "";
  editTeacherSelect.innerHTML = "";

  teachers.forEach(teacher => {
    const option = document.createElement("option");
    option.value = teacher._id;
    option.textContent = `${teacher.first_name} ${teacher.last_name}`;
    teacherSelect.appendChild(option.cloneNode(true));
    editTeacherSelect.appendChild(option);
  });
}

// func to create a new course
document.getElementById("create-course-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const name = document.getElementById("name").value;
  const code = document.getElementById("code").value;
  const description = document.getElementById("description").value;
  const teacher = document.getElementById("teacher").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, code, description, teacher }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("Curso creado exitosamente");
    document.getElementById("create-course-form").reset();
    fetchCourses(); // update the course list
    
    if (data.errors) {
      data.errors.forEach(error => {
        showError(error.param, error.msg);
      });
    } else {
      alert("Error al crear el curso");
    }
  }
});

// func to list all courses
async function fetchCourses() {
  const response = await fetch(API_URL);
  const courses = await response.json();

  const coursesList = document.getElementById("courses");
  coursesList.innerHTML = ""; // clear the list

  courses.forEach((course) => {
    const li = document.createElement("li");
    li.textContent = `Nombre: ${course.name}, Código: ${course.code}, Descripción: ${course.description}, Profesor: ${course.teacher.first_name} ${course.teacher.last_name}`;

    // Botón para eliminar un curso
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", async () => {
      const deleteResponse = await fetch(`${API_URL}/${course._id}`, {
        method: "DELETE",
      });

      if (deleteResponse.ok) {
        alert("Curso eliminado exitosamente");
        fetchCourses(); // update the course list
      } else {
        alert("Error al eliminar el curso");
      }
    });

    // Botón para actualizar un curso
    const updateButton = document.createElement("button");
    updateButton.textContent = "Actualizar";
    updateButton.addEventListener("click", () => {
      showEditForm(course);
    });

    li.appendChild(deleteButton);
    li.appendChild(updateButton);
    coursesList.appendChild(li);
  });
}

// func to show the edit form
function showEditForm(course) {
  document.getElementById("edit-id").value = course._id;
  document.getElementById("edit-name").value = course.name;
  document.getElementById("edit-code").value = course.code;
  document.getElementById("edit-description").value = course.description;
  document.getElementById("edit-teacher").value = course.teacher._id;
  document.getElementById("edit-course-form").style.display = "block";
}

// funtion to cancel the edit form
document.getElementById("cancel-edit").addEventListener("click", () => {
  document.getElementById("edit-course-form").style.display = "none";
});

// func to update a course
document.getElementById("edit-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const id = document.getElementById("edit-id").value;
  const name = document.getElementById("edit-name").value;
  const code = document.getElementById("edit-code").value;
  const description = document.getElementById("edit-description").value;
  const teacher = document.getElementById("edit-teacher").value;

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, code, description, teacher }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("Curso actualizado exitosamente");
    document.getElementById("edit-course-form").style.display = "none";
    fetchCourses(); // update the course 
  
    if (data.errors) {
      data.errors.forEach(error => {
        showError(`edit-${error.param}`, error.msg);
      });
    } else {
      alert("Error al actualizar el curso");
    }
  }
});

// button to refresh the course list
document.getElementById("refresh-courses").addEventListener("click", fetchCourses);

// load teachers and courses when the page is loaded
window.onload = () => {
  fetchCourses();
  loadTeachers();
};