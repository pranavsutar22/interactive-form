function validateForm() {

    clearErrors();

    let isValid = true;

    const fullname = document.getElementById('fullname').value.trim();
    if (fullname === "") {
        showError('nameError', "Full name is required.");
        isValid = false;
    } else {
        const nameParts = fullname.split(" ");
        if (nameParts.length < 2) {
            showError('nameError', "Please enter your first and last name.");
            isValid = false;
        } else {

            document.getElementById('firstname').value = nameParts[0];
            document.getElementById('middlename').value = nameParts.length > 2 ? nameParts[1] : "";
            document.getElementById('lastname').value = nameParts[nameParts.length - 1];
        }
    }

    const aadhar = document.getElementById('aadhar').value.trim();
    const aadharPattern = /^\d{12}$/;
    if (!aadharPattern.test(aadhar)) {
        showError('aadharError', "Aadhar number must be 12 digits.");
        isValid = false;
    }


    const pan = document.getElementById('pan').value.trim();
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panPattern.test(pan)) {
        showError('panError', "PAN card number is invalid.");
        isValid = false;
    }


    const mobile = document.getElementById('mobile').value.trim();
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobilePattern.test(mobile)) {
        showError('mobileError', "Mobile number must be 10 digits and start with 6, 7, 8, or 9.");
        isValid = false;
    }


    const dob = document.getElementById('dob').value;
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 18) {
        showError('dobError', "You must be at least 18 years old.");
        isValid = false;
    }

    const marks = [];
    for (let i = 1; i <= 6; i++) {
        const subjectMarks = parseInt(document.getElementById(`subject${i}`).value.trim());
        if (isNaN(subjectMarks) || subjectMarks < 0 || subjectMarks > 100) {
            showError('marksError', "Please enter valid marks (0-100) for all subjects.");
            isValid = false;
        }
        marks.push(subjectMarks);
    }

    return isValid;
}

function showError(errorId, message) {
    document.getElementById(errorId).style.display = "block";
    document.getElementById(errorId).innerText = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.text-danger');
    errorElements.forEach(elem => elem.style.display = 'none');
}

function calculatePercentage() {
    const marks = [];
    for (let i = 1; i <= 6; i++) {
        const subjectMarks = parseInt(document.getElementById(`subject${i}`).value.trim());
        marks.push(subjectMarks);
    }


    marks.sort((a, b) => b - a);
    const bestOfFiveMarks = marks.slice(0, 5);
    const total = bestOfFiveMarks.reduce((sum, mark) => sum + mark, 0);
    const percentage = (total / 500) * 100;

    document.getElementById('percentageResult').innerText = `Best of Five Percentage: ${percentage.toFixed(2)}%`;
}