# Exercise 2 - Enable Connectivity to SAP Cloud ALM

In this exercise, we will enable the connectivity to SAP Cloud ALM and allow the data collection in SAP Cloud ALM.

The monitoring data is sent to SAP Cloud ALM via a destination using the destination service in your subaccount. The destination service was automatically subscribed and bound, when you deployed the first non-instrumented version of the application.

The destination points to the SAP Cloud ALM API in SAP Cloud ALM. To authenticate you need a service key for the APIs. 

## Exercise 2.1 Download SAP Cloud ALM Service Key from Landscape Management

The service key for the SAP Cloud ALM APIs was uploaded to the Landscape Management in your SAP Cloud ALM tenant. From there we will now retrieve it.

Log on to [SAP Cloud ALM](https://xp261-9kx159xc.eu10.alm.cloud.sap/launchpad#Shell-home) with your Teched user.
<br>

Click on "Administration" -> "Landscape Management" to open the Landscape Management application.
<br>

Open the Landscape Management configuration.
<br>

In the configuration, you find the tray "SAP Cloud ALM Service Key". Expand the tray.
<br>

Use the "Download" button to download the service key.
<br>

## Exercise 2.2 Create Destination in BTP Cockpit

Go back to [SAP BTP Cockpit](https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/e2a835b0-3011-4c79-818a-d7767c4627cd/accountModel&//?section=SubaccountsSection&view=TreeTableView) and enter your subaccount. Click on "Connectivity" -> "Destinations"
<br>

Click "New Destination"
<br>

Enter the following values (replace XX with your place number):
- Name: CALM_datacollector_XP261-XX
- Type: HTTP
- URL: Enter endpoints:Api from the service key (1)
- Proxy Type: Internet
- Authentication: OAuth2ClientCredentials
- Client ID: Enter uaa:clientid from the service key (2)
- Client Secret: Enter uaa:clientsecret from the service key (3)
- Token Service URL Type: Dedicated
- Token Service URL: Enter uaa:url from the service key (4) and add /oauth/token at the end
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/170b4a57-0aaf-4b00-9e90-30350e48f4ea)


Save your destination.

In the end, your destination should look like this:
<br>

## Exercise 2.3 Activate Data Collection in SAP Cloud ALM

Go back to your [SAP Cloud ALM](https://xp261-9kx159xc.eu10.alm.cloud.sap/launchpad#Shell-home) tenant.

Click "SAP Cloud ALM for Operations" -> "Real User Monitoring"
<br>

Open the Scope Selection and select the SAP BTP, Cloud Foundry environment that matches the subaccount for your place number. Click "Apply".
<br>

Open the Real User Monitoring configuration
<br>

Switch the data collection for your SAP BTP, Cloud Foundry environment from OFF to ON.
<br>

Go back to the SAP Cloud ALM Launchpad
<br>

Click "SAP Cloud ALM for Operations" -> "Health Monitoring"
<br>

Open the Scope Selection and click on "Toggle Filter Bar"
<br>

Change the "Service Status" to "All"
<br> 

Select the SAP BTP, Cloud Foundry environment that matches the subaccount for your place number. Click "Apply".
<br>

Open the Health Monitoring configuration
<br>

Switch the data collection for your SAP BTP, Cloud Foundry environment from OFF to ON.
<br>

## Summary

You've now enabled the SAP BTP Cloud Foundry to send monitoring data to SAP Cloud ALM Real User Monitoring and Health Monitoring.

The next step is to instrument your application, so it will collect monitoring data.

Continue to - [Exercise 3 - Instrument your Demo Application](../ex3/README.md)
