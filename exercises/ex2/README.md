# Exercise 2 - Enable Connectivity to SAP Cloud ALM

In this exercise, we will enable the connectivity to SAP Cloud ALM and allow the data collection in SAP Cloud ALM.

The monitoring data is sent to SAP Cloud ALM via a destination using the destination service in your subaccount. The destination service was automatically subscribed and bound, when you deployed the first non-instrumented version of the application.

The destination points to the SAP Cloud ALM API in SAP Cloud ALM. To authenticate you need a service key for the APIs. 

## Exercise 2.1 Download SAP Cloud ALM Service Key from Landscape Management

The service key for the SAP Cloud ALM APIs was uploaded to the Landscape Management in your SAP Cloud ALM tenant. From there we will now retrieve it.

Log on to [SAP Cloud ALM] with your Teched user.
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

Go back to [SAP BTP Cockpit] and enter your subaccount. Click on "Connectivity" -> "Destinations"
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

next

## Summary

You've now ...

Continue to - [Exercise 3 - Excercise 3 ](../ex3/README.md)
