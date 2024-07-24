# Exercise 3 - Instrument your Demo Application

Now comes the most important part. In this exercise, we will finally instrument your Node.js application.

## Exercise 3.1 Instrument UI Application

Let's start with the UI application. Here we have to add the FESR instrumentation to collect Frontend Statistics Records automatically.

### Add FESR beacon to index.html
In your project in VSCode expand alm-demo-app > ui > webapp and open the index.html file
<!-- <br>![image](images/270763943-c0604c4d-348e-4dd2-be5f-b1e2126599d3.png) -->
![alt text](image.png)

Insert this line of code after line 6.
```html
<meta name="sap-ui-fesr" content="/fesr">
```
<!-- <br>![image](images/270764045-e2181889-d23e-46dc-b599-611d2265b6c5.png) -->
![alt text](image-1.png)

### Add FESR route to xs-app.json 
Now open the xs-app.json file in the expand alm-demo-app > ui folder
<!-- <br>![image](images/271313483-419e0ae5-d346-46c0-9dad-ec787ebf9fc9.png) -->
![alt text](image-2.png)

Insert the following code after line 2.
```json
{
	"source": "^/fesr$",
	"target": "/fesr",
	"destination": "srv_api",
	"csrfProtection": false,
	"authenticationType": "none"
},
```
<!-- <br>![image](images/270764904-f698dcc4-928a-4f42-955c-b2ebbe47267c.png) -->
![alt text](image-3.png)

Now your ui application can send Frontend Statistics Records to the server application. 

## Exercise 3.2 Instrument Server Application

The next step is to instrument your server application. Before we start with this we have to enable your application to download the OTEL ALM Libraries.

### Configure Download Settings
The OTEL ALM Libraries are shipped by SAP Repository Based Shipment Channel (RSBC). To access them you need a technical username and password in the RBSC. 
We already requested a user for you.
In your VSCode project expand the expand alm-demo-app > server folder and open the .npmrc file
<!-- <br>![image](images/270767053-fcc8ec69-63c8-489e-a9d2-94479bf2090a.png) -->
![alt text](image-4.png)

Replace the current content with this line of code
```
//73555000100200018064.npmsrv.cdn.repositories.cloud.sap/:_auth=MDAwMDIwMjQxOC1BbG1zdW1taXQ6SzFKbG5oYVNJclBvdjV6UzQ1ZjJpRGNaVTY2eDBEQmk=
```
<br>![image](images/270767624-dfeac1ab-0bd6-45e0-a95f-438b37d0d9bb.png)

### Add Dependencies
Now you have to add the OTEL agent dependencies. 
In the alm-demo-app > server folder open the package.json file
<!-- <br>![image](images/270767966-ca9b4aee-c471-49d7-b868-8968554366db.png) -->
![alt text](image-5.png)

Insert the following code after line 31.
```json
    "@sap/xotel-agent-ext-js": "https://73555000100200018064.npmsrv.cdn.repositories.cloud.sap/@sap/xotel-agent-ext-js/-/xotel-agent-ext-js-1.5.15.tgz",
    "@sap/fesr-to-otel-js": "https://73555000100200018064.npmsrv.cdn.repositories.cloud.sap/@sap/fesr-to-otel-js/-/fesr-to-otel-js-1.5.6.tgz"
```
**Don't forget to add a ',' behind the entry in line 31.**
<!-- <br>![image](images/270768630-02f9b4a7-3aea-4e2f-bb10-883b14ea428a.png) -->
![alt text](image-6.png)

With the new dependencies, we have to rerun the npm install.

In the terminal in VScode go to the server directory using the command: 
```shell
cd server
```
Then run the command: 
```shell
npm install
```
<!-- <br>![image](images/271317119-f32c4379-448b-41f0-bd88-559becf33efa.png) -->
![alt text](image-7.png)

### Add tracer and FESR receiver server.js
In the alm-demo-app > server folder open the file server.js
<!-- <br>![image](images/271314998-27cce1f9-fa35-4c78-87d4-c3aed874a049.png) -->
![alt text](image-8.png)

Insert the following code as the new first line of the file
```js
const tracer = require('@sap/xotel-agent-ext-js/dist/common/tracer');
```
<!-- <br>![image](images/270771057-90bfadda-9fd1-4748-96b0-b2e44275dec5.png) -->
![alt text](image-9.png)

Now in the same file add the following line of code after line 10
```js
const fesr = require("@sap/fesr-to-otel-js");
```
And add the following line after the new line 15
```js
fesr.registerFesrEndpoint(app)
```
After this, your server.js file should look like this:
<!-- <br>![image](images/271316433-9d0890e5-862c-401f-9c7e-65209e71e9dc.png) -->
![alt text](image-10.png)

### Add Properties to mta.yaml
Last but not least you have to add some properties to the mta.yaml

Copy the following code into a Notepad
```
    properties:
		SAP_CALM_SERVICE_TYPE: SAP_CP_CF
		SAP_CALM_SERVICE_NAME: alm-demo-app-0XX
		SAP_CALM_DCI_AGG_THRESHOLD: 1
		OTEL_POLL_INTERVAL: 300
		OTEL_RESOURCE_ATTRIBUTES: account=alm-demo-app-0XX,sap.tenancy.tenant_id=<your subaccount id>    
```

Replace the XX in the properties SAP_CALM_SERVICE_NAME and OTEL_RESOURCE_ATTRIBUTES with your **place number**.

Now go to your _subaccount_ via the [SAP BTP Cockpit](https://emea.cockpit.btp.cloud.sap/cockpit?idp=almsummit2024.accounts.ondemand.com#/globalaccount/d9a9f651-0f63-4e57-b56b-e6305c5cf0c1)

Enter your subaccount.

In the Subaccount Overview, you will find the _subaccount ID_
<br>![image](images/271312117-bf89722d-a3c2-4fab-ae7c-16823c4271fc.png)

Copy the value and enter it as value for **sap.tenancy.tenant_id** in your code fragment.

Your code fragment should now look similar to this:
```
    properties:
      SAP_CALM_SERVICE_TYPE: SAP_CP_CF
      SAP_CALM_SERVICE_NAME: alm-demo-app-001
      SAP_CALM_DCI_AGG_THRESHOLD: 1
      OTEL_POLL_INTERVAL: 300
      OTEL_RESOURCE_ATTRIBUTES: account=alm-demo-app-001,sap.tenancy.tenant_id=87993b94-3664-40cc-9156-db9b50b08c94
```

In the alm-demo-app folder open the file mta.yaml
<!-- <br>![image](images/271317787-2bb1acc4-896c-4c12-b759-dfb222780400.png) -->
![alt text](image-11.png)

Add the code from your Notepad after line 23 (after the property "path") in the mta.yaml
<!-- <br>![image](images/271318344-79018fce-d60d-4dbe-ad3d-7203c1fb7932.png) -->
![alt text](image-12.png)

## Exercise 3.3 Deploy instrumented Node.js application

Now you can build and deploy your application again.

Note: Kindly check whether you have saved all of your changes before proceeding further.

Switch back to the root directory and remove the existing file: 
```shell
cd ..
rm alm-demo-app_1.28.0.mtar
```
Now Enter the command: 
```shell
mbt build -t .
```
<!-- <br>![image](images/271322065-bb17127d-7cf9-48a1-acb1-e8fc6da2830d.png) -->
![alt text](image-13.png)

After the build is successfully finished, you will find a new file alm-demo-app_1.28.0.mtar in your project directory.
<!-- <br>![image](images/271320147-877924c7-930c-48dc-a3fc-423bf1b50d1f.png) -->
![alt text](image-14.png)

In your terminal in IntelliJ run the command: 
```shell
cf deploy alm-demo-app_1.28.0.mtar
```
<!-- <br>![image](images/271323369-25596fd0-9e42-4653-925c-38562c9d7f9b.png) -->
![alt text](image-16.png)

Once the deployment is finished, you can find your running application in the BTP Cockpit.

## Exercise 3.4 Create some traffic in your application

In the Subaccount Overview click on the link for the application in the "Spaces" area. (You have to reload the browser window)
<!-- <br>![image](images/271323797-613f4713-38a9-49f5-b814-33f5b0cdefc7.png) -->
![alt text](image-15.png)

In the "Applications" view you can see your two deployed apps. 
- alm-demo-app-sv: This is the backend application
- alm-demo-app-ui: This is the frontend application
<!-- <br>![image](images/271324014-0ff9d8a2-d597-454a-b1f1-f358b8b70ea0.png) -->
![alt text](image-17.png)

Right-click on the app alm-demo-app-ui and select "Open link in new tab"
<!-- <br>![image](images/271324266-0e624459-612c-4c84-b4e2-674a34fd5def.png) -->
![alt text](image-18.png)

In the new tab, click on the link under "Application Routes"
<!-- <br>![image](images/271324671-bab2a2bf-cca7-4d35-adc5-59b58fc79d05.png) -->
![alt text](image-19.png)

The application will open in a new tab. 
<br>![image](images/271326191-5eedb189-594b-4bd5-a92b-380694be7498.png)

Click around in the application to create some traffic. Filter for jobs and drill into the table. This will create metrics that you can later see in Real User Monitoring.

## Summary

You've now instrumented your CALM demo application. You also created some traffic. You can now look at the metrics in SAP Cloud ALM.

Continue to - [Exercise 4 - Observe Metrics in SAP Cloud ALM](../ex4/README.md)

