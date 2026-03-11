const registrationForm = document.getElementById("registrationForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const companyInput = document.getElementById("company");
const attendanceInputs = document.getElementsByName("attendanceType");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const companyError = document.getElementById("companyError");
const attendanceError = document.getElementById("attendanceError");

const toggleAnalyticsBtn = document.getElementById("toggleAnalyticsBtn");
const analyticsPanel = document.getElementById("analyticsPanel");

const totalRegistrantsEl = document.getElementById("totalRegistrants");
const virtualCountEl = document.getElementById("virtualCount");
const inPersonCountEl = document.getElementById("inPersonCount");
const successMessage = document.getElementById("successMessage");


const registrations = [];



function setValid(inputElement, errorElement) {
  inputElement.classList.remove("input-invalid");
  inputElement.classList.add("input-valid");
  errorElement.textContent = "";
}

function setInvalid(inputElement, errorElement, message) {
  inputElement.classList.remove("input-valid");
  inputElement.classList.add("input-invalid");
  errorElement.textContent = message;
}

function clearInputState(inputElement, errorElement) {
  inputElement.classList.remove("input-valid", "input-invalid");
  errorElement.textContent = "";
}

function validateName() {
  const name = fullNameInput.value.trim();

  if (name.length < 6 || name.length > 100) {
    setInvalid(
      fullNameInput,
      nameError,
      "Name must be between 6 and 100 characters."
    );
    return false;
  }

  setValid(fullNameInput, nameError);
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    setInvalid(
      emailInput,
      emailError,
      "Please enter a valid professional email address."
    );
    return false;
  }

  setValid(emailInput, emailError);
  return true;
}

function validateCompany() {
  const company = companyInput.value.trim();

  if (company.length > 100) {
    setInvalid(
      companyInput,
      companyError,
      "Company/Institution must not exceed 100 characters."
    );
    return false;
  }

  if (company.length === 0) {
    clearInputState(companyInput, companyError);
    return true;
  }

  setValid(companyInput, companyError);
  return true;
}

function getSelectedAttendance() {
  for (let i = 0; i < attendanceInputs.length; i++) {
    if (attendanceInputs[i].checked) {
      return attendanceInputs[i].value;
    }
  }
  return "";
}

function validateAttendance() {
  const selectedAttendance = getSelectedAttendance();

  if (selectedAttendance === "") {
    attendanceError.textContent = "Please select your attendance type.";
    return false;
  }

  attendanceError.textContent = "";
  return true;
}

function validateForm() {
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isCompanyValid = validateCompany();
  const isAttendanceValid = validateAttendance();

  return isNameValid && isEmailValid && isCompanyValid && isAttendanceValid;
}


fullNameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
companyInput.addEventListener("input", validateCompany);

for (let i = 0; i < attendanceInputs.length; i++) {
  attendanceInputs[i].addEventListener("change", validateAttendance);
}


registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  successMessage.style.display = "none";
  successMessage.textContent = "";

  if (!validateForm()) {
    return;
  }

  const registrationData = {
    fullName: fullNameInput.value.trim(),
    email: emailInput.value.trim(),
    company: companyInput.value.trim(),
    attendanceType: getSelectedAttendance(),
  };

  registrations.push(registrationData);

  updateAnalytics();

  successMessage.textContent = "Registration completed successfully.";
  successMessage.style.display = "block";

  registrationForm.reset();
  resetValidationStyles();
});

function resetValidationStyles() {
  fullNameInput.classList.remove("input-valid", "input-invalid");
  emailInput.classList.remove("input-valid", "input-invalid");
  companyInput.classList.remove("input-valid", "input-invalid");

  nameError.textContent = "";
  emailError.textContent = "";
  companyError.textContent = "";
  attendanceError.textContent = "";
}


function updateAnalytics() {
  let virtualCount = 0;
  let inPersonCount = 0;

  for (let i = 0; i < registrations.length; i++) {
    if (registrations[i].attendanceType === "Virtual") {
      virtualCount++;
    } else if (registrations[i].attendanceType === "In-Person") {
      inPersonCount++;
    }
  }

  totalRegistrantsEl.textContent = registrations.length;
  virtualCountEl.textContent = virtualCount;
  inPersonCountEl.textContent = inPersonCount;
}

toggleAnalyticsBtn.addEventListener("click", function () {
  if (analyticsPanel.classList.contains("hidden")) {
    analyticsPanel.classList.remove("hidden");
    toggleAnalyticsBtn.textContent = "Hide Event Analytics";
  } else {
    analyticsPanel.classList.add("hidden");
    toggleAnalyticsBtn.textContent = "Show Event Analytics";
  }
});