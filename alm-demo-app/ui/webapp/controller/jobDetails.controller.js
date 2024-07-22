sap.ui.define([
    "sap/ui/core/date/UI5Date",
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
    function (UI5Date, Controller, JSONModel, utility, sapMLib, MessageBox, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("joboverview.controller.jobDetails", {
            onInit: function () {
                // sap.ushell.Container.getUser();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oRoute = oRouter.getRoute("jobDetails");
                oRoute.attachPatternMatched(this.onObjectMatched, this);

                // this.getView().byId("jobDetailsTable").getModel().getData();
            },
            consoleFn: function () {
                console.log("works");
            },
            onObjectMatched: async function (oEvent) {
                sap.ui.core.BusyIndicator.show();
                var oTable = this.getView().byId("jobDetailsTable");

                console.log(oEvent)

                // Attach the event handler to the growingTriggered event

                var selectedJobId = oEvent.getParameter("arguments").jobId;
                console.log("****", selectedJobId)
                var count = await this.calculateCount(selectedJobId);
                // this.byId("loadMoreBtn").setText("Load More [" + String(100) + "]");
                let that = this;
                var token;
                let headers = {};
                // if (flag) {
                //     headers['x-csrf-token'] = 'fetch';
                // }
                // else {
                //     headers['x-csrf-token'] = this.getAppData("xcsrfToken");
                // }



                $.ajax({
                    url: '/srv/getCsrfToken',
                    type: 'GET',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("X-CSRF-Token", "Fetch");
                    },
                    complete: function (xhr) {
                        token = xhr.getResponseHeader("X-CSRF-Token");
                        console.log("completted getResponseHeader");
                        that.loadTableData(token, selectedJobId);
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });



                // this.loadTableData(selectedJobId);
                //dont remove this lineeeee plis its yet to be implemented lol
                // token = utility.getCsrfTable('/srv/getJobDetails/' + selectedJobId); 

            },
            calculateCount: async function (selectedJobId) {
                $.ajax({
                    url: '/srv/getCount/' + selectedJobId,
                    type: 'GET',
                    cache: false,
                    success: function (data) {
                        return (data[0]);
                    }
                });
            },

            loadTableData: function (token, selectedJobId) {
                let that = this;
                $.ajax({
                    url: '/srv/getJobDetails/' + selectedJobId,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify({
                        jobStatus: 'DISCARDED',
                        startTime: '2023-06-08 08:50:09.492',
                        endTime: '2023-06-08 08:50:09.505'
                    }),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-CSRF-Token', token);
                    },
                    success: function (data) {
                        let oTable = that.getView().byId("jobDetailsTable")
                        for (const element of data) {
                            element.STARTTIME = utility.formatDate(element.STARTTIME);
                            element.ENDTIME = utility.formatDate(element.ENDTIME);
                            element.SCHEDULEDTIME = utility.formatDate(element.SCHEDULEDTIME);
                            if (element.PICKID == null) {
                                element.PICKID = "-";
                            }
                        }

                        let tableData = new JSONModel(data);
                        oTable.setModel(tableData);
                        tableData.refresh();

                        // var oModel = oTable.getModel();
                        // // var aExistingData = oModel.getProperty("/yourEntitySet");
                        // let aExistingData = oModel.getData();
                        // var aNewData = aExistingData.concat(aExistingData + data)
                        // aExistingData.setData(aNewData)
                        // // oModel.setProperty("/yourEntitySet", aNewData);
                        // oModel.refresh();

                        sap.ui.core.BusyIndicator.hide();
                    },
                    complete: function (callback) {

                        let data = callback.responseJSON;
                        // let data = that.getView().byId("table").getModel().getData();
                        let jobStatusComboxData = new Array();
                        // let jobDescription = new Array();
                        let comboBoxData = new JSONModel();

                        for (var element of data) {
                            if (!utility.checkForDuplicate(jobStatusComboxData, element.JOBSTATUS)) {
                                jobStatusComboxData.push({
                                    "key": element.JOBSTATUS,
                                    "jobStatus": element.JOBSTATUS
                                });
                            }
                        }
                        comboBoxData.setData({ "jobStatus": jobStatusComboxData });
                        // comboBoxData.setData({  });
                        that.getView().setModel(comboBoxData, "comboBoxData");
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
            },

            onTableGrowingTriggered: function (oEvent) {
                var oTable = this.byId("jobDetailsTable");
                var oBinding = oTable.getBinding("items");

                var currentLength = oBinding.iLength;
                var nextbatchSize = currentLength + 100;

                this.loadTableData(nextbatchSize, oTable.getModel().getData()[0].JOBID);
                this.byId("loadMoreBtn").setText("Load More [" + String(nextbatchSize) + "]");
                // oEvent.getSource().mProperties.text="Load More ["+nextbatchSize+"/"+
                // var iBatchSize = 100;
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
                    var oControl = oFilterGroupItem.getControl(),
                        aSelectedKeys = oControl.getSelectedKeys(),
                        aFilters = aSelectedKeys.map(function (sSelectedKey) {
                            return new Filter({
                                path: oFilterGroupItem.getName(),
                                operator: FilterOperator.EQ,
                                value1: sSelectedKey
                            });
                        });

                    console.log("JOB DETAILS KEYS SELECTED", aSelectedKeys);

                    if (aSelectedKeys.length > 0) {
                        aResult.push(new Filter({
                            filters: aFilters,
                            and: false
                        }));
                    }

                    return aResult;
                }, []);

                console.log("JOB DETAILS ATABLEFILTERS", aTableFilters);

                let oTable = this.getView().byId("jobDetailsTable");
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
                this.getView().byId("jobDetailsTable").setShowOverlay(true);
            }
        });
    });
