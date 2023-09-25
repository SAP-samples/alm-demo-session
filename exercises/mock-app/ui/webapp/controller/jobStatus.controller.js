sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../util/utility",
    "sap/m/library",
    'sap/m/MessageBox',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, utility, sapMLib, MessageBox, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("joboverview.controller.jobStatus", {
            onInit: async function () {
                this.loadTableData();
                // let jobIds = this.getView().byId("table").getModel().getData().JOBID;
            },

            loadTableData: function () {
                let that = this;
                var token;
                $.ajax({
                    url: '/srv/getJobStatus',
                    type: 'GET',
                    cache: false,
                    success: function (data) {
                        Object.entries(data).forEach((element) => {
                            element[1].startTime = utility.formatDate(element[1].startTime);
                        })
                        that.getView().byId("table").setModel(new JSONModel(data));
                    },
                    complete: function (callback) {

                        let data = callback.responseJSON;
                        // let data = that.getView().byId("table").getModel().getData();
                        let useCaseComboxData = new Array();
                        let jobDescription = new Array();
                        let isActiveComboxData = new Array();
                        let comboBoxData = new JSONModel();
                        Object.entries(data).forEach((element) => {
                            if (!utility.checkForDuplicate(useCaseComboxData, element[0])) {
                                useCaseComboxData.push({
                                    "key": element[1].jobID,
                                    "jobId": element[1].jobID
                                });
                            }
                            if (!utility.checkForDuplicate(jobDescription, element[1].jobDescription)) {
                                jobDescription.push({
                                    "key": element[1].jobDescription,
                                    "jobName": element[1].jobDescription
                                });
                            }
                            if (!utility.checkForDuplicate(isActiveComboxData, element[1].active)) {
                                isActiveComboxData.push({
                                    "key": element[1].active ? "true" : "false",
                                    "isActive": element[1].active ? "true" : "false"
                                });
                            }
                        })
                        comboBoxData.setData({ "useCase": useCaseComboxData, "jobName": jobDescription, "isActive": isActiveComboxData });
                        // comboBoxData.setData({ });
                        that.getView().setModel(comboBoxData, "comboBoxData");
                    },
                    error: function (xhr, status, error) {
                        if (xhr.status === 401) {
                            window.location.href = '/?force=' + new Date().getTime().toString(16);
                        } else if (xhr.status === 500 || xhr.status === 502) {
                            MessageBox.error('Something went wrong, please try again. If issue persists, please report it.');
                        }
                        sap.ui.core.BusyIndicator.hide();
                    }
                });

            },
            onRowClick: function (oEvt) {
                console.log(oEvt.getSource().getBindingContext().getObject().jobID);
                sap.ui.core.UIComponent.getRouterFor(this).navTo("jobDetails", {
                    jobId: oEvt.getSource().getBindingContext().getObject().jobID
                });
            },

            onAccountPress: function () {
                const url = "/srv/getUser";
                $.ajax({
                    url: url,
                    type: 'GET',
                    cache: false,
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
            },

            onSearch: function () {
                let oFilterBar = this.getView().byId("filterbar");
                var aTableFilters = oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
                    var oControl = oFilterGroupItem.getControl()
                    var aSelectedKeys = oControl.getSelectedKeys()

                    console.log("KEYS SELECTED", aSelectedKeys);

                    var aFilters = aSelectedKeys.map(function (sSelectedKey) {
                        return new Filter({
                            path: oFilterGroupItem.getName(),
                            operator: FilterOperator.EQ,
                            value1: sSelectedKey
                        });
                    });

                    if (aSelectedKeys.length > 0) {
                        aResult.push(new Filter({
                            filters: aFilters,
                            and: false
                        }));
                    }

                    return aResult;
                }, []);

                console.log("ATABLEFILTERS", aTableFilters)

                let oTable = this.getView().byId("table");
                oTable.getBinding("items").filter(aTableFilters);
                oTable.setShowOverlay(false);
            },

            onFilterChange: function () {
                this._updateLabelsAndTable();
            },

            onAfterVariantLoad: function () {
                this._updateLabelsAndTable();
            },

            onSelectionChange: function (oEvent) {
                this.getView().byId("filterbar").fireFilterChange(oEvent);
            },
            _updateLabelsAndTable: function () {
                // this.oExpandedLabel.setText(this.getFormattedSummaryTextExpanded());
                // this.oSnappedLabel.setText(this.getFormattedSummaryText());
                this.getView().byId("table").setShowOverlay(true);
            }

        });
    });
