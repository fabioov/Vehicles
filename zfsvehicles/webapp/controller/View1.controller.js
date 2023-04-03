sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Binding",
    "sap/ui/model/Filter",
    "vehicles/zfsvehicles/model/formatter",
    "sap/m/MessageToast",
    "sap/m/SelectList",
  ],
  function (
    Controller,
    JSONModel,
    Binding,
    Filter,
    formatter,
    MessageToast,
    SelectList
  ) {
    "use strict";

    return Controller.extend("vehicles.zfsvehicles.controller.View1", {
      formatter: formatter,
      onInit: function () {
        var oTable = this.getView().byId("vehiclesTable");

        // var iCount = oModel.length;
      },

      onListItemPress: function (oEvent) {
        var oBinding = this.getView().byId("vehiclesTable").getBinding("items");
      },

      onDeleteVehicle: function () {
        var oView = this.getView();
        var oSmartTable = this.getView().byId("vehiclesTable").getTable();
        var SelectedItem = oSmartTable
          .getModel()
          .getProperty(oSmartTable._aSelectedPaths.toString());

        if (oSmartTable._aSelectedPaths.length < 1) {
          MessageToast.show("Selecione pelo menos uma linha");
        } else {
debugger
          var CarData = [
            {
              PlateId: SelectedItem.PlateId,
              BrandId: SelectedItem.BrandId,
              ModelId: SelectedItem.ModelId,
              Currency: SelectedItem.Currency,
              Km: SelectedItem.Km,
              ColorId: SelectedItem.ColorId,
            },
          ];
          var payload = {
            Action: 'DELETECAR',
            Payload: JSON.stringify(CarData),
          };

          var oModel = oView.getModel();

          oModel.create("/JsonCommSet", payload, {

            success: function (oData, oResponse) {

              MessageToast.show("Perfect!");

            }.bind(this),

            error: function (oError) {
              var oSapMessage = JSON.parse(oError.responseText);
              var msg = oSapMessage.error.message.value;
              MessageToast.show(msg);
            },
          });
        }

      },
      onFilterSelect: function (oEvent) {
        debugger;
        var oBinding = this.byId("vehiclesTable").getBinding("items"),
          sKey = oEvent.getParameter("key"),
          aFilters = [];

        var fMedium = 400000.0;
        var fExpensive = 801000.0;
        debugger;
        if (sKey === "Barato") {
          aFilters.push(
            new sap.ui.model.Filter(
              "Price",
              sap.ui.model.FilterOperator.LT,
              fMedium
            )
          );
        } else if (sKey === "Medio") {
          aFilters.push(
            new sap.ui.model.Filter(
              "Price",
              sap.ui.model.FilterOperator.BT,
              fMedium,
              fExpensive
            )
          );
        } else if (sKey === "Caro") {
          aFilters.push(
            new sap.ui.model.Filter(
              "Price",
              sap.ui.model.FilterOperator.GE,
              fExpensive
            )
          );
        }

        oBinding.filter(aFilters);

        // Attach a change event listener to the binding object
        oBinding.attachChange(
          function () {
            var itemsFiltered = oBinding.getCurrentContexts();

            var oIconTabFilter = this.getView().byId("cheap");
            if (oIconTabFilter) {
              oIconTabFilter.setCount(itemsFiltered.length);
            }

            var oIconTabFilter2 = this.getView().byId("exp");
            if (oIconTabFilter2) {
              oIconTabFilter2.setCount(itemsFiltered.length);
            }

            var oIconTabFilter3 = this.getView().byId("med");
            if (oIconTabFilter3) {
              oIconTabFilter3.setCount(itemsFiltered.length);
            }

            // var oIconTabFilter4 = this.getView().byId("myIconTabFilter");
            // if (oIconTabFilter4) {
            //   oIconTabFilter4.setCount(itemsFiltered.length);
            // }
          }.bind(this)
        );
      },
    });
  }
);
