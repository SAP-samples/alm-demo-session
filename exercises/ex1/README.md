# Exercise 1 - Prepare Your Development Environment

In this exercise, we will instrument the Java application that you want to monitor with SAP Cloud ALM. 
In our sample scenario, we assume, that we want to monitor a full-stack application built on SAP BTP. The front end consists of SAP UI5. The UI requests will be routed to the application backend via the Application Router. Here, the application backend consists of one microservice. In order to monitor the backend with SAP Cloud ALM this microservice is instrumented with DCI. To gather the client performance we leverage SAP UI5's ability to measure and export these Frontend Statistics Records (FESR). Our microservice acts as a receiver for these FESRs. This receiver is instrumented with both the DCI as well as the FESR receiver library. DCI will always export the data to the SAP Cloud ALM routing infrastructure. This routing infrastructure will route the data to the correct SAP Cloud ALM tenant.
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/c87d752a-4bf3-4200-9421-1cbd4c67ff7a)

## Exercise 1.1 Copy Code from GitHub

The first step is to copy the sample application from this GitHub repository to your local development environment on your Teched laptop.

Open the IntelliJ IDEA Community Edition app on your Teched laptop:
<br>![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/1f3c6050-dd18-444d-92fd-341135e04494)

Select "Get from VCS"
<br>![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/23db97d8-640b-4107-bdc9-c57a791a4fe1)

If IntelliJ opens with an already added project, please choose File > New > Project from Version Control
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/61a6c234-bd1c-49b6-ad75-934596d87346)

Paste the following URL: https://github.com/SAP-samples/teched2023-XP261/tree/main/exercises/mock-app
<br>![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/e77ac5ec-2a6d-4e88-bf87-555a7a446978)

You will now see the imported Java project in your IntelliJ project browser.
<br> screenshot

In the project exist two branches. One contains the instrumented and one the non-instrumented version of the teched demo application.

To checkout the non-instrumented branch, right-click on the root folder of you project and select "Git" -> "Branches"
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/daee45b2-a0d0-4953-8f12-1aed85a1c6c6)


Open the tree "Remote" -> "origin" and select the entry "non-instrumented". Then click on "Checkout"
<br>![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/93e6ad31-e23d-4150-988d-4d3c28eb4b54)

## Exercise 1.2 Build initial Node.js application

We will now build and deploy the non-instrumented Node.js application.

The first step is to install all dependencies required by the application. We have to do this for the UI and the server component.

Select the tab "Terminal" in the lower left area of IntelliJ to open a new terminal.
<br>

Switch to the ui folder using the command: cd ui
Then enter the command: npm install
<br>

You can ignore any issues and warnings for now.

After the installation finished, move to the server folder using the command: cd ../server
Again enter the command: npm install
<br>

Now you can build the application. 

Switch back to the root directory using the command: cd ..

Enter the command: mbt build -t .
<br>

After the build is successfully finished, you will find a new file teched-demo-app_1.28.0.mtar in your project directory.

## Exercise 1.3 Connect to Cloud Foundry

Before you can deploy the application, you have to connect your local environment to the correct cloud foundry org.

Go to the Teched Global Account in [BTP Cockpit]( <BTP GA link here>)

Log on with your Teched User: XP261-0XX@education.cloud.sap
<br>

Click on the subaccount for your place number: XP261-0XX
<br>

In the Subaccount Overview you will find the API Endpoint for your Cloud Foundry Org.
<br>

Copy the API Endpoint.

Go back to your IntelliJ. 

In your terminal enter the command: cf api <api endpoint url>
<br>

Enter the command: cf login
<br>

Log on with your Teched user and password.
<br>

Select the org for your place number from the list: <xxxx>
<br>

You are now logged on to the Cloud Foundry org and your deployment will target the Teched demo space <XXXXX>

## Exercise 1.4 Deploy initial Node.js application

The last step in this exercise is to deploy the Node.js application into the Cloud Foundry org.

In your terminal in IntelliJ run the command: cf deploy teched-demo-app_1.28.0.mtar
<br>

Once the deployment is finished, you can find your deployed application in the BTP Cockpit.

In the Subaccount Overview click on the link for the application in the "Spaces" area. (You might have to reload the browser window)
<br>

In the "Applications" view you can see your two deployed apps. 
- teched-demo-app-sv: This is the backend application
- teched-demo-app-ui: This is the frontend application
<br>


## Summary

You've now deployed a first, non-instrumented, version of your Node.js application. The next step is to prepare the infrastructure so it can send metrics to SAP Cloud ALM.

Continue to - [Exercise 2 - Enable Connectivity to SAP Cloud ALM](../ex2/README.md)
