// ========== Instructor Functions ==========

function loadInstructors() {
    fetch('api/get_instructors.php')
        .then(response => response.json())
        .then(data => {
            let instructorList = document.getElementById('instructorList');
            let instructorSelect = document.getElementById('instructorSelect');
            let instructorLogin = document.getElementById('instructorLogin');

            instructorList.innerHTML = '';
            instructorSelect.innerHTML = '';
            instructorLogin.innerHTML = '';

            data.forEach(instructor => {
                instructorList.innerHTML += `
                    <li>${instructor.name} 
                    <button onclick="deleteInstructor(${instructor.id})">Delete</button></li>
                `;

                instructorSelect.innerHTML += `
                    <option value="${instructor.id}">${instructor.name}</option>
                `;

                instructorLogin.innerHTML += `
                    <option value="${instructor.id}">${instructor.name}</option>
                `;
            });
        });
}

function addInstructor() {
    let name = document.getElementById('instructorName').value;
    if (name === '') return alert('Please enter instructor name.');

    let formData = new FormData();
    formData.append('name', name);

    fetch('api/add_instructor.php', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        loadInstructors();
        document.getElementById('instructorName').value = '';
    });
}

function deleteInstructor(id) {
    let formData = new FormData();
    formData.append('id', id);

    fetch('api/delete_instructor.php', {
        method: 'POST',
        body: formData
    })
    .then(() => loadInstructors());
}

// ========== Course Functions ==========

function loadCourses() {
    fetch('api/get_courses.php')
        .then(response => response.json())
        .then(data => {
            let courseSelect = document.getElementById('courseSelect');
            let lectureCourseSelect = document.getElementById('lectureCourseSelect');
            let coursePreview = document.getElementById('coursePreview');

            courseSelect.innerHTML = '';
            lectureCourseSelect.innerHTML = '';
            coursePreview.innerHTML = '';

            data.forEach(course => {
                courseSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`;
                lectureCourseSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`;
                coursePreview.innerHTML += `
                    <div>
                        <h4>${course.name} - ${course.level}</h4>
                        <p>${course.description}</p>
                        <img src="${course.image_path}" width="100">
                        <button onclick="deleteCourse(${course.id})">Delete</button>
                    </div><hr>
                `;
            });

            // Load batches when the first course is selected
            loadBatches();
            loadLectureBatches();
        });
}

function addCourse() {
    let name = document.getElementById('courseName').value;
    let level = document.getElementById('courseLevel').value;
    let description = document.getElementById('courseDesc').value;
    let image = document.getElementById('courseImage').files[0];

    if (name === '' || level === '' || description === '' || !image) {
        alert('Please fill all course details.');
        return;
    }

    let formData = new FormData();
    formData.append('name', name);
    formData.append('level', level);
    formData.append('description', description);
    formData.append('image', image);

    fetch('api/add_course.php', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        loadCourses();
        document.getElementById('courseName').value = '';
        document.getElementById('courseDesc').value = '';
        document.getElementById('courseImage').value = '';
    });
}

function deleteCourse(id) {
    let formData = new FormData();
    formData.append('id', id);

    fetch('api/delete_course.php', {
        method: 'POST',
        body: formData
    })
    .then(() => loadCourses());
}

// ========== Batch Functions ==========

function loadBatches() {
    let courseId = document.getElementById('courseSelect').value;

    if (!courseId) {
        document.getElementById('batchList').innerHTML = '';
        return;
    }

    fetch(`api/get_batches.php?course_id=${courseId}`)
        .then(response => response.json())
        .then(data => {
            let batchList = document.getElementById('batchList');
            batchList.innerHTML = '';

            data.forEach(batch => {
                batchList.innerHTML += `<li>${batch.batch_date}</li>`;
            });
        });
}

function loadLectureBatches() {
    let courseId = document.getElementById('lectureCourseSelect').value;

    if (!courseId) {
        document.getElementById('lectureBatchSelect').innerHTML = '';
        return;
    }

    fetch(`api/get_batches.php?course_id=${courseId}`)
        .then(response => response.json())
        .then(data => {
            let lectureBatchSelect = document.getElementById('lectureBatchSelect');
            lectureBatchSelect.innerHTML = '';

            data.forEach(batch => {
                lectureBatchSelect.innerHTML += `<option value="${batch.id}">${batch.batch_date}</option>`;
            });
        });
}

function addBatch() {
    let courseId = document.getElementById('courseSelect').value;
    let batchDate = document.getElementById('batchDate').value;

    if (!courseId || !batchDate) return alert('Please select a course and date.');

    let formData = new FormData();
    formData.append('course_id', courseId);
    formData.append('batch_date', batchDate);

    fetch('api/add_batch.php', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        loadBatches();
        loadLectureBatches(); // refresh assign lecture batches
    });
}

// ========== Lecture Assignment Functions ==========

function assignLecture() {
    let courseId = document.getElementById('lectureCourseSelect').value;
    let batchId = document.getElementById('lectureBatchSelect').value;
    let instructorId = document.getElementById('instructorSelect').value;

    if (!courseId || !batchId || !instructorId) {
        alert('Please select course, batch, and instructor.');
        return;
    }

    let formData = new FormData();
    formData.append('course_id', courseId);
    formData.append('batch_id', batchId);
    formData.append('instructor_id', instructorId);

    fetch('api/assign_lecture.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        loadLectures();
    });
}

function loadLectures() {
    let instructorId = document.getElementById('instructorSelect').value;

    fetch(`api/get_lectures.php?instructor_id=${instructorId}`)
        .then(response => response.json())
        .then(data => {
            let lectureList = document.getElementById('lectureList');
            lectureList.innerHTML = '';

            data.forEach(lecture => {
                lectureList.innerHTML += `<li>${lecture.course_name} on ${lecture.batch_date}</li>`;
            });
        });
}

// ========== Instructor Panel Functions ==========

function viewLectures() {
    let instructorId = document.getElementById('instructorLogin').value;

    fetch(`api/get_lectures.php?instructor_id=${instructorId}`)
        .then(response => response.json())
        .then(data => {
            let lectureList = document.getElementById('myLectures');
            lectureList.innerHTML = '';

            data.forEach(lecture => {
                lectureList.innerHTML += `<li>${lecture.course_name} on ${lecture.batch_date}</li>`;
            });
        });
}

// ========== Initial Load ==========

window.onload = () => {
    loadInstructors();
    loadCourses();

    document.getElementById('courseSelect').addEventListener('change', loadBatches);
    document.getElementById('lectureCourseSelect').addEventListener('change', loadLectureBatches);
};
