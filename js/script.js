// Setting focus on page load
const nameID = document.getElementById("name");
nameID.focus();

// Adding change event listener to job role select so that type box
// appears when selecting the other option and hides when not
// selected.
const jobRoleID = document.getElementById("other-job-role");
const titleID = document.getElementById("title");
jobRoleID.style.display = "none";

titleID.addEventListener("change", (e) => {
  if (e.target.value == "other") {
    jobRoleID.style.display = "block";
  } else {
    jobRoleID.style.display = "none";
  }
});

// Event listener applied to the color design select
// that triggers the color select to appear.
// This function will set all colors to appear via a loop
// and then it will loop through again to hide any colors
// that don't coincide with the design selection.
const shirtColorID = document.getElementById("shirt-colors");
const designID = document.getElementById("design");
const colorID = document.getElementById("color");
shirtColorID.style.display = "none";

designID.addEventListener("change", (e) => {
  colorID.firstElementChild.selected = true;
  let designSelection = e.target.value;
  shirtColorID.style.display = "block";
  let options = colorID.children;
  for (let j = 0; j < options.length; j++) {
    options[j].style.display = "block";
  }
  for (let i = 0; i < options.length; i++) {
    if (designSelection != options[i].dataset.theme) {
      options[i].style.display = "none";
    }
  }
});

// Event listener listens for changes in the fieldset, creates a
// total variable, then runs a for loop which checks to see if an input is
// checked and finally updates the p tag with the updated total.
const activitiesID = document.getElementById("activities");
const activitiesBoxID = document.getElementById("activities-box");
const activitiesCostID = document.getElementById("activities-cost");

activitiesID.addEventListener("change", (e) => {
  let options = activitiesBoxID.getElementsByTagName("label");
  let total = 0;
  for (let i = 0; i < options.length; i++) {
    if (options[i].childNodes[1].checked == true) {
      total += parseInt(options[i].childNodes[1].dataset.cost);
    }
  }
  activitiesCostID.innerHTML = `Total: $${total}`;
});

// Event listener below looks for changes in the payment select
// and hides all other options that were not selected by looping through
// and checking each options selected boolean.
const paymentID = document.getElementById("payment");
const creditCardID = document.getElementById("credit-card");
const paypalID = document.getElementById("paypal");
const bitcoinID = document.getElementById("bitcoin");

// Set defaults for payment on page load
paymentID.children[1].selected = true;
paypalID.style.display = "none";
bitcoinID.style.display = "none";

paymentID.addEventListener("change", (e) => {
  let paymentsArray = [creditCardID, paypalID, bitcoinID];
  for (let j = 0; j < paymentsArray.length; j++) {
    paymentsArray[j].style.display = "none";
  }
  let options = paymentID.children;
  for (let i = 0; i < options.length; i++) {
    if (
      options[i].selected === true &&
      options[i].innerHTML === "Credit Card"
    ) {
      creditCardID.style.display = "block";
    } else if (
      options[i].selected === true &&
      options[i].innerHTML === "PayPal"
    ) {
      paypalID.style.display = "block";
    } else if (
      options[i].selected === true &&
      options[i].innerHTML === "Bitcoin"
    ) {
      bitcoinID.style.display = "block";
    }
  }
});

// Setting variables
const emailID = document.getElementById("email");
const form = document.getElementsByTagName("form")[0];
const ccNumID = document.getElementById("cc-num");
const zipID = document.getElementById("zip");
const cvvID = document.getElementById("cvv");

// The following 6 functions are helper functions that check and see if their
// respective data is valid for the form. They all return true if the data is
// valid, false if the data is invalid.
const nameFieldCheck = (value) => {
  return !/^\s*$/.test(value);
};

const emailFieldCheck = (value) => {
  return /^[^@]+@[^@.]+\.com$/i.test(value);
};

const activityFieldCheck = () => {
  const labelTags = activitiesBoxID.getElementsByTagName("label");
  let isActivityChecked = false;
  for (let i = 0; i < labelTags.length; i++) {
    if (labelTags[i].childNodes[1].checked == true) {
      isActivityChecked = true;
    }
  }
  return isActivityChecked;
};

const ccFieldCheck = (cc) => {
  return /^\d{13,16}$/.test(cc);
};

const zipFieldCheck = (zip) => {
  return /^\d{5}$/.test(zip);
};

const cvvFieldCheck = (cvv) => {
  return /^\d{3}$/.test(cvv);
};

// Validity handler that takes a func and it's parameter and checks the
// data to determine if the class needs to be updated or not.
const validityHandler = (func, para) => {
  if (!func(para.value)) {
    para.parentNode.className = "not-valid";
    para.parentElement.lastElementChild.style.display = "block";
  } else if (func(para.value)) {
    para.parentNode.className = "valid";
    para.parentElement.lastElementChild.style.display = "none";
  }
};

// Separate handler because activitiesID is the parent element
const activityValidityHandler = () => {
  if (!activityFieldCheck()) {
    activitiesID.className = "activities not-valid";
    activitiesID.lastElementChild.style.display = "block";
  } else if (activityFieldCheck()) {
    activitiesID.className = "activities valid";
    activitiesID.lastElementChild.style.display = "none";
  }
};

// Event listener that listens for a submit and submits the data if helper
// functions return true. Prevent default if one or more return false.
form.addEventListener("submit", (e) => {
  const creditCardOption = paymentID.children[1];

  let isValid =
    nameFieldCheck(nameID.value) &&
    emailFieldCheck(emailID.value) &&
    activityFieldCheck();

  if (creditCardOption.selected) {
    isValid =
      isValid &&
      ccFieldCheck(ccNumID.value) &&
      zipFieldCheck(zipID.value) &&
      cvvFieldCheck(cvvID.value);
  }

  if (!isValid) {
    validityHandler(nameFieldCheck, nameID);
    validityHandler(emailFieldCheck, emailID);
    validityHandler(ccFieldCheck, ccNumID);
    validityHandler(zipFieldCheck, zipID);
    validityHandler(cvvFieldCheck, cvvID);
    activityValidityHandler()
    e.preventDefault();
  }
});

// The for loop below sets each checkbox to own a focus and blur event
// that adjusts classNames for focus styling.
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("focus", (e) => {
    const parent = e.target.parentNode;
    parent.className = "focus";
  });
  checkboxes[i].addEventListener("blur", (e) => {
    const parent = e.target.parentNode;
    parent.className = "";
  });
}
