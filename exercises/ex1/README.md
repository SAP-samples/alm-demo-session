# Exercise 1 - Prepare Your Development Environment

In this exercise, we will instrument the NodeJs application that you want to monitor with SAP Cloud ALM. 
In our sample scenario, we assume, that we want to monitor a full-stack application built on SAP BTP. The frontend consists of SAP UI5. The UI requests will be routed to the application backend via the Application Router. Here, the application backend consists of one microservice. In order to monitor the backend with SAP Cloud ALM this microservice is instrumented with DCI. To gather the client performance we leverage SAP UI5's ability to measure and export these Frontend Statistics Records (FESR). Our microservice acts as a receiver for these FESRs. This receiver is instrumented with both the DCI as well as the FESR receiver library. DCI will always export the data to the SAP Cloud ALM routing infrastructure. This routing infrastructure will route the data to the correct SAP Cloud ALM tenant.

<!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/975d1a50-46c7-4014-b91e-fd0f75153874)-->
<!-- ![image](image/975d1a50-46c7-4014-b91e-fd0f75153874.png) -->

![alt text](image-12.png)

## Exercise 1.1 Copy Code from GitHub

The first step is to copy the sample application from this GitHub repository to your local development environment on your laptop.

Open the terminal or Git Bash on your laptop
<br><!---![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/1f3c6050-dd18-444d-92fd-341135e04494)-->
<!-- ![image](image/openintellij.png) -->

Go to the directory where you want to clone the repository and execute the below command.
```
git clone https://github.com/SAP-samples/alm-demo-session.git
```
<br><!---![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/23db97d8-640b-4107-bdc9-c57a791a4fe1)-->
<!-- ![image](image/getfromvcs.png) -->
![alt text](image.png)

<!-- If IntelliJ opens with an already added project, please choose File > New > Project from Version Control
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/61a6c234-bd1c-49b6-ad75-934596d87346)-->
<!-- ![image](image/61a6c234-bd1c-49b6-ad75-934596d87346.png) -->

<!-- Paste the following URL: https://github.com/SAP-samples/teched2023-XP261.git  -->
<!-- Then click on "Clone". -->
<br><!---![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/e77ac5ec-2a6d-4e88-bf87-555a7a446978)-->
<!-- ![image](image/vcsclone.png) -->

You will now see the cloned Node.js project in your laptop
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/28ce30df-dc99-44c4-aff0-45dc25568d12)-->
<!-- ![image](image/28ce30df-dc99-44c4-aff0-45dc25568d12.png) -->

In the project, there is a branch called 'non-instrumented' which is a non-instrumented version of the demo application.

To check out the non-instrumented branch, go into the repository root folder
```
cd alm-demo-session
```
![alt text](image-1.png)

And Enter the below command to checkout the branch
```
git checkout non-instrumented
```


<!-- <br>-![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/4ef137aa-ce3e-465a-8dbd-90abd9d808aa) -->
<!-- ![image](image/4ef137aa-ce3e-465a-8dbd-90abd9d808aa.png) -->

<!-- Open the tree "Remote" -> "origin" and select the entry "non-instrumented". Then click on "Checkout" -->
<!-- <br>-![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/04d740c0-9c2a-4d22-8939-8b70da6d4ee0) -->
<!-- ![image](image/04d740c0-9c2a-4d22-8939-8b70da6d4ee0.png) -->

## Exercise 1.2 Build initial Node.js application

We will now build and deploy the non-instrumented Node.js application.

Open VS Code and Click on the open folder button
![alt text](image-2.png)

Navigate to the clone repository root folder and open it

The Next step is to install all dependencies required by the application. We have to do this for the UI and the server component.

Select the tab "Terminal" in the lower left area of VSCode to open a new terminal.

![alt text](image-3.png)
![alt text](image-4.png)
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/2b98eed1-b091-4967-b80f-205fefbe6335)-->
<!-- ![image](image/2b98eed1-b091-4967-b80f-205fefbe6335.png) -->

Switch to the ui folder using the command: 
```shell
cd alm-demo-app/ui
```
Then enter the command: 
```shell
npm install
```
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/f49a9593-5aba-4478-8a57-97fe9a4584f4)-->
<!-- ![image](image/f49a9593-5aba-4478-8a57-97fe9a4584f4.png) -->
![alt text](image-5.png)
You can ignore any issues and warnings for now.

After the installation is finished, move to the server folder using the command: 
```shell
cd ../server/
```
Again enter the command: 
```shell
npm install
```
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/02052a1f-eb94-49a8-9e80-7d8729a601e8)-->
<!-- ![image](image/02052a1f-eb94-49a8-9e80-7d8729a601e8.png) -->
![alt text](image-6.png)

Now you can build the application. 

Switch back to the root directory using the command: 
```shell
cd ..
```
Enter the command: 
```shell
mbt build -t .
```
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/6cd01020-8de1-458e-ad4c-fd46ccb11ff1)-->
<!-- ![image](image/6cd01020-8de1-458e-ad4c-fd46ccb11ff1.png) -->
![alt text](image-7.png)

After the build is successfully finished, you will find a new file alm-demo-app_1.28.0.mtar in your project directory.
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/f16a984a-0109-4100-9df2-26d90f6a20e6)-->
<!-- ![image](image/f16a984a-0109-4100-9df2-26d90f6a20e6.png) -->
![alt text](image-8.png)

## Exercise 1.3 Connect to Cloud Foundry

Before you can deploy the application, you have to connect your local environment to the correct cloud foundry org.

Go to the Teched Global Account in [BTP Cockpit](https://amer.cockpit.btp.cloud.sap/cockpit/?idp=tdct3ched1.accounts.ondemand.com#/globalaccount/e2a835b0-3011-4c79-818a-d7767c4627cd)

Log on with your User : ops-xxx
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/5bc612e6-aa81-4796-887e-fe1a7f0a65bf)-->
<!-- ![image](image/5bc612e6-aa81-4796-887e-fe1a7f0a65bf.png) -->

![alt text](image-13.png)

Click on the subaccount for your place number: alm-handson-ops-xxx
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/cdf735df-b432-4307-942b-75352d3c7dd0)-->
<!-- ![image](image/cdf735df-b432-4307-942b-75352d3c7dd0.png) -->
![alt text](image-14.png)

In the Subaccount Overview, you will find the API Endpoint for your Cloud Foundry Org.
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/712053ea-d1d9-44cb-a883-ac69d9a9e780)-->
<!-- ![image](image/712053ea-d1d9-44cb-a883-ac69d9a9e780.png) -->

![alt text](image-15.png)

For this exercise, all subaccounts will be in the same region and hence have the same API endpoint. 

Go back to your VSCode. 

In your terminal enter the command: 
```shell
cf api https://api.cf.us10.hana.ondemand.com/
```
<!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/a08efb2a-456d-4306-b2b1-cd07410bf2d2)-->
<!-- ![image](image/a08efb2a-456d-4306-b2b1-cd07410bf2d2.png) -->

And then Enter the command: 
```shell
cf login --origin almsummit2024-platform 
```
Log on with your user and password.
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/291f2c83-d2a4-4c57-bbc2-aebf89a64d2e)-->
<!-- ![image](image/291f2c83-d2a4-4c57-bbc2-aebf89a64d2e.png) -->
![alt text](image-16.png)

You are now logged on to the Cloud Foundry org and your deployment will target the demo space in your subaccount

## Exercise 1.4 Deploy initial Node.js application

The last step in this exercise is to deploy the Node.js application into the Cloud Foundry org.

In your terminal run the command: 
```shell
cf deploy alm-demo-app_1.28.0.mtar
```
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/f310d263-10b7-4bc5-a84f-cebf554d3112)-->
<!-- ![image](image/f310d263-10b7-4bc5-a84f-cebf554d3112.png) -->
![alt text](image-9.png)

Once the deployment is finished, you can find your deployed application in the BTP Cockpit.

In the Subaccount Overview click on the link for the application in the "Spaces" area. (You have to reload the browser window)
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/f7297b2c-adf5-446e-8012-c6d24aa18a8e)-->
<!-- ![image](image/f7297b2c-adf5-446e-8012-c6d24aa18a8e.png) -->
![alt text](image-10.png)

In the "Applications" view you can see your two deployed apps. 
- alm-demo-app-sv: This is the backend application
- alm-demo-app-ui: This is the frontend application
<br><!---![image](https://github.com/SAP-samples/teched2023-XP261/assets/113598836/4fe2d9d8-ee72-4fb8-aee8-0175fd2cc4ad)-->
<!-- ![image](image/4fe2d9d8-ee72-4fb8-aee8-0175fd2cc4ad.png) -->
![alt text](image-11.png)

## Summary

You've now deployed a first, non-instrumented, version of your Node.js application. The next step is to prepare the infrastructure so it can send metrics to SAP Cloud ALM.

Continue to - [Exercise 2 - Enable Connectivity to SAP Cloud ALM](../ex2/README.md)
