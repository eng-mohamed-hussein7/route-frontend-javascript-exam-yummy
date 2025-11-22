"use strict";
//!============================== Start Validation Class For Conract Us ==============================!//
export class FormValidator {
  //!============================== Start constructor and initiate regex ==============================!//
  constructor() {
    this.regex = {
      nameInput: /^[a-zA-Z ]+$/,
      emailInput:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      phoneInput: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      ageInput: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
      passwordInput: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
    };

    //!============================== Start initiate btn and all input of contact us ==============================!//
    this.submitBtn = document.getElementById("submitBtn");
    this.allInputs = document.querySelectorAll("#contactUs input");
    //!==============================  End initiate btn and all input of contact us  ==============================!//
  }
  //!==============================  End constructor and initiate regex  ==============================!//

  //!============================== Start validation function  ==============================!//
  validate(input) {
    const regex = this.regex[input.id];
    let isValid = false;

    if (input.id === "repasswordInput") {
      const passwordVal = document.getElementById("passwordInput").value;
      isValid = input.value === passwordVal;
    } else if (regex) {
      isValid = regex.test(input.value);
    }

    this.toggleAlert(input, isValid);
    this.toggleSubmitBtn();
    return isValid;
  }
  //!==============================  End validation function   ==============================!//

  //!============================== Start show or hide message function ==============================!//
  toggleAlert(input, isValid) {
    const alertId = input.id.replace("Input", "Alert");
    const alertElement = document.getElementById(alertId);

    if (alertElement) {
      if (isValid) {
        alertElement.classList.add("d-none");
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        alertElement.classList.remove("d-none");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
      }
    }
  }
  //!==============================  End show or hide message function ==============================!//

  //!============================== Start disable or undisable button function ==============================!//
  toggleSubmitBtn() {
    let isFormValid = true;

    this.allInputs.forEach((input) => {
      if (!input.classList.contains("is-valid")) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      this.submitBtn.classList.remove("disabled");
    } else {
      this.submitBtn.classList.add("disabled");
    }
  }
  //!==============================  End disable or undisable button function  ==============================!//
}
//!==============================  End Validation Class For Conract Us  ==============================!//
