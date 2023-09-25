sap.ui.define([], function () {
    "use strict";

    return {
        formatDate: function (dateString) {
            var date = new Date(dateString);
            var formattedDate = "";
            // Format time as HH:MM AM/PM
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedTime = hours + ':' + minutes + ' ' + ampm;

            // Format date as DD-MM-YYYY
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var formattedDate = day + '-' + month + '-' + year;

            return formattedTime + ', ' + formattedDate;
        },
        formatColumn: function (value) {
            return value === 1 ? true : false;
        },
        checkForDuplicate: function (data, value) {
            let res = data.some(function (item) {
                return item.key === value;
            });
            return res;
        },
        // getCsrfToken: async function (url) {  // to be implemented properly
        //     let token;
        //     $.ajax({
        //         url: url,
        //         async: true,
        //         type: 'GET',
        //         beforeSend: function (xhr) {
        //             xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        //         },
        //         complete: function (xhr) {
        //             token = xhr.getResponseHeader("X-CSRF-Token");
        //             return token; // should also call the actual ajax post call
        //         }
        //     });
        // }
    };
});