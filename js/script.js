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
const creditCardID = document.getElementById('credit-card')
const paypalID = document.getElementById('paypal')
const bitcoinID = document.getElementById('bitcoin')

// Set defaults for payment on page load
paymentID.children[1].selected = true
paypalID.style.display = 'none'
bitcoinID.style.display = 'none'

paymentID.addEventListener("change", (e) => {
    let paymentsArray = [creditCardID, paypalID, bitcoinID]
    for (let j = 0; j < paymentsArray.length; j++) {
        paymentsArray[j].style.display = 'none'
    }
    let options = paymentID.children
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected === true && options[i].innerHTML ==='Credit Card') {
            creditCardID.style.display = 'block'
        } else if (options[i].selected === true && options[i].innerHTML ==='PayPal') {
            paypalID.style.display = 'block'
        } else if (options[i].selected === true && options[i].innerHTML ==='Bitcoin') {
            bitcoinID.style.display = 'block'
        }
    }
});
