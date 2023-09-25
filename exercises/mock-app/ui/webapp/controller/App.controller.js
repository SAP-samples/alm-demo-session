sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageBox'
  ],
  function (BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("joboverview.controller.App", {
      onInit() {
        let that = this;
        $.ajax({
          url: '/srv/getScope',
          type: 'GET',
          cache: false,
          success: function (data) {
            console.log(data);
          },
          error: function (xhr, status, error) {
            if (xhr.status === 401) {
              MessageBox.error('Unauthorized to view. Please contact the administrator.');
              that.getView().setVisible(false);
              // window.location.href = '/?force=' + new Date().getTime().toString(16);
            } else if (xhr.status === 500) {
              MessageBox.error('Something went wrong, please try again. If issue persists, please report it.');
            }
          }
        });
      }
    });
  }
);
