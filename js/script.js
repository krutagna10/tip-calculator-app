"use strict";

// Elements
const billInput = document.querySelector("#bill__input");
const billPeopleInput = document.querySelector("#bill__people-input");
const billCustomTipInput = document.querySelector("#bill__custom-tip");

const resetButton = document.querySelector(".bill__btn-reset");
const tipAmountElement = document.querySelector(".bill__amount-tip");
const totalAmountElement = document.querySelector(".bill__amount-total");

const tipButtonWrapper = document.querySelector(".bill__tip-button-wrapper");
const tipButtons = document.querySelectorAll(".bill__tip-btn");

const billContainer = document.querySelector(".bill__user-input");
const billPeopleContainer = document.querySelector(".bill__people");
const peopleErrorMessage = document.querySelector(
  ".bill__error-message--people"
);

// Global variables
let tipInputValue = 15;
let billInputValue = 142.55;
let peopleInputValue = 5;

// Initially
billInput.value = billInputValue;
billPeopleInput.value = peopleInputValue;

const calculateValues = () => {
  const value = billInputValue / peopleInputValue;

  // Calculating Values
  const tipAmount = Number(((value * tipInputValue) / 100).toFixed(2));
  const totalAmount = (value + tipAmount).toFixed(2);
  updateValues(tipAmount, totalAmount);
};

const updateValues = (tipAmount, totalAmount) => {
  tipAmountElement.textContent = tipAmount;
  totalAmountElement.textContent = totalAmount;
};

// Bill Input
billInput.addEventListener("input", () => {
  // Enabling Reset Button
  resetButton.disabled = false;

  billInputValue = Number(billInput.value);

  if (billInputValue < 0) {
    billContainer.classList.add("error");
  } else {
    billContainer.classList.remove("error");
    calculateValues();
  }
});

// Bill Per Person Input
billPeopleInput.addEventListener("input", () => {
  // Enabling Reset Button
  resetButton.disabled = false;

  peopleInputValue = Number(billPeopleInput.value);

  if (peopleInputValue === 0) {
    billPeopleContainer.classList.add("error");
    peopleErrorMessage.textContent = "Can't be zero";
  } else if (peopleInputValue < 0) {
    billPeopleContainer.classList.add("error");
    peopleErrorMessage.textContent = "Can't be negative";
  } else {
    billPeopleContainer.classList.remove("error");
    calculateValues();
  }
});

// Tip Buttons using event delegation
tipButtonWrapper.addEventListener("click", (event) => {
  // Enabling Reset Button
  resetButton.disabled = false;

  if (event.target.classList.contains("bill__tip-btn")) {
    // Removing Active classes
    tipButtons.forEach((tipBtn) => tipBtn.classList.remove("current-active"));

    // Adding Active Classes
    event.target.classList.add("current-active");

    // Updating Values
    tipInputValue = Number(event.target.dataset.tip);
    calculateValues();
  }
});

billCustomTipInput.addEventListener("input", () => {
  // Enabling Reset Button
  resetButton.disabled = false;

  // Removing Active classes
  tipButtons.forEach((tipBtn) => tipBtn.classList.remove("current-active"));

  tipInputValue = Number(billCustomTipInput.value);
  calculateValues();
});

// Reset Button
resetButton.addEventListener("click", () => {
  // Disabling Reset Button
  resetButton.disabled = true;

  // Resetting Input Value
  tipInputValue = 15;
  billInputValue = 0;
  peopleInputValue = 1;

  // Assigning values to input
  billInput.value = billInputValue;
  billPeopleInput.value = peopleInputValue;
  billCustomTipInput.value = "";

  // Calculating Values
  calculateValues();
});







