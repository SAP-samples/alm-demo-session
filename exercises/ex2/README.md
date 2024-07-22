# Exercise 2 - Enable Connectivity to SAP Cloud ALM

In this exercise, we will enable the connectivity to SAP Cloud ALM and allow the data collection in SAP Cloud ALM.

The monitoring data is sent to SAP Cloud ALM via a destination using the destination service in your subaccount. The destination service was automatically subscribed and bound, when you deployed the first non-instrumented version of the application.

The destination points to the SAP Cloud ALM API in SAP Cloud ALM. To authenticate you need a service key for the APIs. 

## Exercise 2.1 Download SAP Cloud ALM Service Key from Landscape Management

The service key for the SAP Cloud ALM APIs was uploaded to the Landscape Management in your SAP Cloud ALM tenant. From there we will now retrieve it.

Log on to [SAP Cloud ALM](https://alm-summit-apj-ops.eu20.alm.cloud.sap/launchpad#Shell-home) with your alm summit user.

Click on "Administration" > "Landscape Management" to open the Landscape Management application.
<br>![image](images/271245519-da2aa2e2-3ecc-49bc-8f1f-5b71be8e2aa6.png)

If you open Landscape Management for the first time the scope selection will come up. You can just select all service types and click "Apply"
<br>![image](images/271245954-df9ac645-cfb8-40c5-924b-06bf257b0e66.png)

If the scope selection doesn't come up, you can click the "Scope" button to open it.
<br>![image](images/277740886-d9d6691e-57cf-4416-958f-59f3ee35990c.png)

Open the Landscape Management configuration.
<br>![image](images/271246082-2d86f221-ca50-451b-9842-8efdfc6e39ef.png)

In the configuration, you find the tray "SAP Cloud ALM Service Key". Expand the tray.
<br>![image](images/271266676-f107b4d5-3c86-430a-abe8-2c29680524ee.png)

Use the "Download" button to download the service key.
<br>![image](images/271266799-ba3cdd7d-020e-4c56-8f5a-618b4e6522ef.png)

## Exercise 2.2 Create Destination in BTP Cockpit

Go back to [SAP BTP Cockpit](https://amer.cockpit.btp.cloud.sap/cockpit/?idp=tdct3ched1.accounts.ondemand.com#/globalaccount/e2a835b0-3011-4c79-818a-d7767c4627cd) and enter your subaccount. Click on "Connectivity" -> "Destinations"
<br>![image](images/271266952-bd8b7f95-b118-43cf-8a69-35e33a270373.png)

Click "New Destination"
<br>![image](images/271267036-b99546f5-2171-4a66-a6a1-7f6c4ed1cd34.png)

Enter the following values (replace XX with your place number):
- Name: CALM_datacollector
- Type: HTTP
- Description: Connection to SAP Cloud ALM
- URL: Enter endpoints:Api from the service key (1)
- Proxy Type: Internet
- Authentication: OAuth2ClientCredentials
- Client ID: Enter uaa:clientid from the service key (2)
- Client Secret: Enter uaa:clientsecret from the service key (3)
- Token Service URL Type: Dedicated
- Token Service URL: Enter uaa:url from the service key (4)
<br>![image](images/270756506-170b4a57-0aaf-4b00-9e90-30350e48f4ea.png)

Save your destination.

In the end, your destination should look like this:
<br>![image](images/271267184-1b768df0-e72e-451d-9f47-a980a9573c27.png)

When you click the "Check Connection" button you should get this response:
<br>![image](images/277742726-b9c90439-fd22-455e-9de7-7cbdf91537cd.png)

## Exercise 2.3 Activate Data Collection in SAP Cloud ALM

Go back to your [SAP Cloud ALM](https://xp261-9kx159xc.eu10.alm.cloud.sap/launchpad#Shell-home) tenant.

Click "SAP Cloud ALM for Operations" > "Real User Monitoring"
<br>![image](images/271267314-931bd470-9b09-41b5-a067-d4339e71728d.png)

Open the Scope Selection and select the SAP BTP, Cloud Foundry environment that matches the subaccount for your place number. 
You can use the Live Search to filter for your place number.
Click "Apply".
<br>![image](images/277744803-7d29179b-ca43-410a-a787-361ed722e264.png)

Open the Real User Monitoring configuration
<br>![image](images/271267443-853c72ef-3e54-4179-9c86-6e61f1117b59.png)

Switch the data collection for your SAP BTP, Cloud Foundry environment from OFF to ON.
<br>![image](images/271267507-425d3fa0-b3ef-4953-8a84-859df4397b95.png)

After the activation, the service should have the status "Active".
<br>![image](images/271267711-14202ca6-9d26-4822-b34f-7d9cd60a12ec.png)

Go back to the SAP Cloud ALM Launchpad and click "SAP Cloud ALM for Operations" > "Health Monitoring"
<br>![image](images/271306660-2c89d95d-c61c-4c8c-8848-59f6adb42da7.png)

Open the Scope Selection
<br>![image](images/271306877-6adb5fa3-343f-4588-866f-8809face65eb.png)

In Health Monitoring only "Configured" services are visible in the scope selection by default. To find your configured BTP account, you have to change the filter parameter first. Click on "Toggle Filter Bar"
<br>![image](images/271306997-2d5700a6-1bc9-4a97-86ec-925bd2fa1011.png)

Change the "Service Status" to "All" and press the "Go" button.
<br>![image](images/277744539-689cf4d6-9dc5-4e88-b1e7-12a8d243c04a.png)

Select the SAP BTP, Cloud Foundry environment that matches the subaccount for your place number. You can again use the Live Search to filter for your place number. Click "Apply".
<br>![image](images/277744935-4b430b1c-2e60-4893-b50a-3f8c6ffb67a3.png)

Open the Health Monitoring configuration
<br>![image](images/271307665-bfe3853b-fbf8-4f77-be60-d70f1e3ca668.png)

Switch the data collection for your SAP BTP, Cloud Foundry environment from OFF to ON.
<br>![image](images/271307773-a556f951-1207-4c80-8e04-62ef8608580b.png)

<br>![image](images/271307926-a1235d3a-bc9b-40ab-b877-b1e2a177fa9e.png)

## Summary

You've now enabled the SAP BTP Cloud Foundry to send monitoring data to SAP Cloud ALM Real User Monitoring and Health Monitoring.

The next step is to instrument your application, so it will collect monitoring data.

Continue to - [Exercise 3 - Instrument your Demo Application](../ex3/README.md)
