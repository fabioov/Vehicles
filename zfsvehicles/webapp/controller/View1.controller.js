sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("vehicles.zfsvehicles.controller.View1", {
            onInit: function () {

            },
            onFilterSelect: function (oEvent) {
                var oBinding = this.byId("vehiclesTable").getBinding("items"),
                    sKey = oEvent.getParameter("key"),
                    // Array to combine filters
                    aFilters = [],
                    fMedium = 400000.0,
                    fExpensive = 800000.0;
    
                if (sKey === "Barato") {

                    aFilters.push(new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.LT, fMedium));
 
                } else if (sKey === "Medio") {
                    aFilters.push(
                      new sap.ui.model.Filter({
                        filters: [ 
                          new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.GE, fMedium),
                          new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.LT, fExpensive)
                        ],
                        and: true
                      })
                    )
                  } else if (sKey === "Caro") {

                    aFilters.push(new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.GE, fExpensive));

                }
    
                oBinding.filter(aFilters);

                console.log("Filtered items:", oBinding.getCurrentContexts().map(function(c) { return c.getObject() }));
            }
    
        });
    });
