sap.ui.define(function () {
  "use strict";

  return {
    priceState: function (fPrice) {
      // Boundary values for different statuses of weight
      const fMediumPrice = parseFloat("400000.000");
      const fMaxPrice = parseFloat("801000.000");

      // if the value of fPrice is not a number, no status will be set
      if (isNaN(fPrice)) {
        return "None";
      } else {
        if (fPrice < 0) {
          return "None";
        } else if (fPrice >= fMaxPrice) {
          return "Error";
        } else if (fPrice < fMediumPrice) {
          return "Success";
        } else if (fPrice >= fMediumPrice && fPrice < fMaxPrice) {
          return "Warning";
        }
      }
    },
  };
});
