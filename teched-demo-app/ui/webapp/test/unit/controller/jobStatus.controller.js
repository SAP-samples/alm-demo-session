/*global QUnit*/

sap.ui.define([
	"joboverview/controller/jobStatus.controller"
], function (Controller) {
	"use strict";

	QUnit.module("jobStatus Controller");

	QUnit.test("I should test the jobStatus controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
