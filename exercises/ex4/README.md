# Exercise 4 - Observe Metrics in SAP Cloud ALM

In this last exercise, we will finally observe the metrics we created in SAP Cloud ALM.
The metrics sent by the custom application are attached to the SAP BTP Cloud Foundry environment in which the app is running.

## Exercise 4.1 Check metrics in Health Monitoring

Go back to the SAP Cloud ALM Launchpad and click "SAP Cloud ALM for Operations" > "Health Monitoring"
<br>![image](images/2c89d95d-c61c-4c8c-8848-59f6adb42da7.png)

SAP BTP Cloud Foundry environment in which your instrumented app is running is already in scope for Health Monitoring.

On the Overview screen, you can see the card of your SAP BTP Cloud Foundry environment. In the card, you see an overview of the collected metrics.
Click on the service type to drill into the details.
<br>![image](images/84c8ac05-f9e2-422c-b704-3ed7dd53616a.png)

Click on the line for your service:
<br>![image](images/fee054ba-8ee2-4204-861a-6add08f1bc56.png)

In the detail screen, you can see all metrics that are currently supported for Node.js
<br>![image](images/3a57ee84-1933-4b03-b0fd-a6dc0c92c683.png)

Click on the card for the application. On the right, you see all metrics that are reported by your application. You can use the "History" button to see past values for the metric, after the monitoring is active for some time.
<br>![image](images/4ffc6f0a-2f5d-4b9d-8f9c-cd3e09b7432e.png)

## Exercise 4.2 Check metrics in Real User Monitoring

Go to your [SAP Cloud ALM](https://xp261-9kx159xc.eu10.alm.cloud.sap/launchpad#Shell-home) tenant.

Click "SAP Cloud ALM for Operations" -> "Real User Monitoring"
<br>![image](images/931bd470-9b09-41b5-a067-d4339e71728d.png)

The SAP BTP Cloud Foundry environment in which your instrumented app is running is already in scope for Real User Monitoring.

On the Overview screen, you can see the card of your SAP BTP Cloud Foundry environment. In the card, you see an overview of the collected metrics.
Click on the name to drill into the details.
<br>![image](images/0edaa964-274b-4be6-a7dd-6625b12ca3c6.png)

In the "Requests" view you can drill further down:
<br>![image](images/32adbf46-7ae8-482e-9dba-7fda8a0a504d.png)

Sort the next list by Average Response Time:
<br>![image](images/b9c67dce-11f5-429b-bf4a-029db2437224.png)

Click on the name of the longest-running request:
<br>![image](images/2d2d0678-c32e-4769-bc55-1d7d93345948.png)

Click on the Execution:
<br>![image](images/184fa315-07f2-4f64-88c1-15b2433191f1.png)

In the following screen you can see the request tree and analyze the requests further:
<br>![image](images/2035fc2a-e053-4920-a4bd-a30a246a77e9.png)

## Summary

You've now reached the end of this hands-on exercise. You have successfully instrumented a custom BTP application and enabled it to send metrics to SAP Cloud ALM. 

In this hands-on session, you instrumented a custom-built Node.js application. You can also instrument your custom-built Java applications. You can find more information on how to do this in the [SAP Cloud ALM for Operations Expert Portal](https://support.sap.com/en/alm/sap-cloud-alm/operations/expert-portal/data-collection-infrastructure.html).

Congratulations!
