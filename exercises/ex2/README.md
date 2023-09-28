# Exercise 2 - Enable Connectivity to SAP Cloud ALM

In this exercise, we will enable the connectivity to SAP Cloud ALM and allow the data collection in SAP Cloud ALM.

The monitoring data is sent to SAP Cloud ALM via a destination using the destination service in your subaccount. The destination service was automatically subscribed and bound, when you deployed the first non-instrumented version of the application.

The destination points to the SAP Cloud ALM API in SAP Cloud ALM. To authenticate you need a service key for the APIs. 

## Exercise 2.1 Download SAP Cloud ALM Service Key from Landscape Management

The service key for the SAP Cloud ALM APIs was uploaded to the Landscape Management in your SAP Cloud ALM tenant. From there we will now retrieve it.

Log on to [SAP Cloud ALM](https://xp261-9kx159xc.eu10.alm.cloud.sap/launchpad#Shell-home) with your Teched user.

Click on "Administration" > "Landscape Management" to open the Landscape Management application.
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/da2aa2e2-3ecc-49bc-8f1f-5b71be8e2aa6)

If you open Landscape Management for the first time the scope selection will come up. You can just select all service types and click "Apply"
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/df9ac645-cfb8-40c5-924b-06bf257b0e66)

Open the Landscape Management configuration.
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/2d86f221-ca50-451b-9842-8efdfc6e39ef)

In the configuration, you find the tray "SAP Cloud ALM Service Key". Expand the tray.
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/f107b4d5-3c86-430a-abe8-2c29680524ee)

Use the "Download" button to download the service key.
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/ba3cdd7d-020e-4c56-8f5a-618b4e6522ef)

## Exercise 2.2 Create Destination in BTP Cockpit

Go back to [SAP BTP Cockpit](https://amer.cockpit.btp.cloud.sap/cockpit/?idp=tdct3ched1.accounts.ondemand.com#/globalaccount/e2a835b0-3011-4c79-818a-d7767c4627cd) and enter your subaccount. Click on "Connectivity" -> "Destinations"
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/bd8b7f95-b118-43cf-8a69-35e33a270373)

Click "New Destination"
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/b99546f5-2171-4a66-a6a1-7f6c4ed1cd34)

Enter the following values (replace XX with your place number):
- Name: CALM_datacollector_XP261-0XX
- Type: HTTP
- URL: Enter endpoints:Api from the service key (1)
- Proxy Type: Internet
- Authentication: OAuth2ClientCredentials
- Client ID: Enter uaa:clientid from the service key (2)
- Client Secret: Enter uaa:clientsecret from the service key (3)
- Token Service URL Type: Dedicated
- Token Service URL: Enter uaa:url from the service key (4)
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/170b4a57-0aaf-4b00-9e90-30350e48f4ea)

Save your destination.

In the end, your destination should look like this:
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/1b768df0-e72e-451d-9f47-a980a9573c27)

## Exercise 2.3 Activate Data Collection in SAP Cloud ALM

Go back to your [SAP Cloud ALM](https://xp261-9kx159xc.eu10.alm.cloud.sap/launchpad#Shell-home) tenant.

Click "SAP Cloud ALM for Operations" -> "Real User Monitoring"
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/931bd470-9b09-41b5-a067-d4339e71728d)

Open the Scope Selection and select the SAP BTP, Cloud Foundry environment that matches the subaccount for your place number. Click "Apply".
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/8066c287-4b6b-47bc-a459-fb18cd74cd7f)

Open the Real User Monitoring configuration
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/853c72ef-3e54-4179-9c86-6e61f1117b59)

Switch the data collection for your SAP BTP, Cloud Foundry environment from OFF to ON.
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/425d3fa0-b3ef-4953-8a84-859df4397b95)

After the activation, the service should have the status "Active".
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/14202ca6-9d26-4822-b34f-7d9cd60a12ec)

Go back to the SAP Cloud ALM Launchpad and click "SAP Cloud ALM for Operations" -> "Health Monitoring"
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
