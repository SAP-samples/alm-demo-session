# Exercise 3 - Instrument your Demo Application

Now comes the most important part. In this exercise, we will finally instrument your Node.js application.

## Exercise 3.1 Instrument UI Application

Let's start with the UI application. Here we have to add the FESR instrumentation to collect Frontend Statistics Records.

### Add FESR beacon to index.html
In your project in IntelliJ expand ui > webapp and open the index.html file
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/c0604c4d-348e-4dd2-be5f-b1e2126599d3)

Insert this line of code after line 6.
```html
<meta name="sap-ui-fesr" content="/fesr">
```
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/e2181889-d23e-46dc-b599-611d2265b6c5)

### Add FESR route to xs-app.json 
Now open the xs-app.json file in the ui folder
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/04b238b8-049f-42ba-a6eb-1f2f102942cb)

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
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/f698dcc4-928a-4f42-955c-b2ebbe47267c)

Now your ui application can send Frontend Statistics Records to the server application. 

## Exercise 3.2 Instrument Server Application

The next step is to instrument your server application. Before we start with this we have to enable your application to download the OTEL ALM Libraries.

### Configure Download Settings
The OTEL ALM Libraries are shipped by SAP Repository Based Shipment Channel (RSBC). To access them you need a technical user name and password in the RBSC. 
We already requested a user for you.
In your IntelliJ project expand the server folder and open the .npmrc file
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/fcc8ec69-63c8-489e-a9d2-94479bf2090a)

Replace the current content with this line of code
```
//73555000100200018064.npmsrv.cdn.repositories.cloud.sap/:_auth=c2FwLXhwMjYxOkpnckVaUHhmSXhTY2tyT0hHWndHZXlKM2JRRlFhRHlV
```
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/dfeac1ab-0bd6-45e0-a95f-438b37d0d9bb)

### Add Dependencies
Now you have to add the OTEL agent dependencies. 
In the server folder open the package.json file
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/ca9b4aee-c471-49d7-b868-8968554366db)

Insert the following code after line 31.
```json
    "@sap/xotel-agent-ext-js": "https://73555000100200018064.npmsrv.cdn.repositories.cloud.sap/@sap/xotel-agent-ext-js/-/xotel-agent-ext-js-1.5.2.tgz",
    "@sap/fesr-to-otel-js": "https://73555000100200018064.npmsrv.cdn.repositories.cloud.sap/@sap/fesr-to-otel-js/-/fesr-to-otel-js-1.5.0.tgz"
```
Don't forget to add a ',' behind the entry in line 31.
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/02f9b4a7-3aea-4e2f-bb10-883b14ea428a)

With the new dependencies, we have to rerun the npm install.

In the terminal in IntelliJ go to the server directory using the command: cd server
Then run the command: npm install
<br>

### Add tracer and FESR receiver server.js
In the server folder open the file server.js
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/a872c077-b8ea-43bb-99d9-78db7c0d3cd5)

Insert the following code as the new first line of the file
```js
    const tracer = require('@sap/xotel-agent-ext-js/dist/common/tracer');
```
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/90bfadda-9fd1-4748-96b0-b2e44275dec5)

Now in the same file add the following line of code after line 10
```js
    const fesr = require("@sap/fesr-to-otel-js");
```
And add the following line after the new line 15
```js
    fesr.registerFesrEndpoint(app)
```

After this, your server.js file should look like this:
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/336c7cc8-bcde-466d-8685-d1dc9506ebab)

### Add Properties to mta.yaml
Last but not least you have to add some properties to the mta.yaml

Copy the following code into a Notepad
```json
    properties:
	      SAP_CALM_SERVICE_TYPE: SAP_CP_CF
	      SAP_CALM_SERVICE_NAME: TechEd-demo-app-0XX
	      OTEL_POLL_INTERVAL: 300
	      OTEL_RESOURCE_ATTRIBUTES: account=TechEd-demo-app-0XX,sap.tenancy.tenant_id=<your subaccount id>    
```

Replace the XX in SAP_CALM_SERVICE_NAME and OTEL_RESOURCE_ATTRIBUTES with your place number.

Now go to your subaccount in the [SAP BTP Cockpit](https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/e2a835b0-3011-4c79-818a-d7767c4627cd/accountModel&//?section=SubaccountsSection&view=TreeTableView)

In the Subaccount Overview you will find the subaccount ID
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/c11a13c8-3adb-4ad9-b1c1-34b134a05a86)

Copy the value and enter it as value for sap.tenancy.tenant_id in your code fragment.

In the project root folder open the file mta.yaml
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/4ecfcf89-6d48-4079-94a6-136641838389)

Add the code from your Notepad after line 23 in the mta.yaml
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/d4809e3d-99bd-4b82-b1d4-ca3cdbca294a)

## Exercise 3.3 Deploy instrumented Node.js application

Now you can build and deploy your application again.

Switch back to the root directory using the command: cd ..
Enter the command: mbt build -t .
<br>

After the build is successfully finished, you will find a new file teched-demo-app_1.28.0.mtar in your project directory.

In your terminal in IntelliJ run the command: cf deploy teched-demo-app_1.28.0.mtar
<br>

Once the deployment is finished, you can find your running application in the BTP Cockpit.

## Exercise 3.4 Create some traffic in your application

In the Subaccount Overview click on the link for the application in the "Spaces" area. (You might have to reload the browser window)
<br>

In the "Applications" view you can see your two deployed apps. 
- teched-demo-app-sv: This is the backend application
- teched-demo-app-ui: This is the frontend application
<br>

Right-click on the app teched-demo-app-ui and select "Open link in new tab"
<br>

In the new tab, click on the link under "Application Routes"
<br>

The application will open in a new tab. 
<br>

Click around in the application to create some traffic. Filter for jobs and drill into the table. This will create metrics that you can later see in Real User Monitoring.

## Summary

You've now instrumented your Teched demo application. You also created some traffic. You can now look at the metrics in SAP Cloud ALM.

Continue to - [Exercise 4 - Observe Metrics in SAP Cloud ALM](../ex4/README.md)

