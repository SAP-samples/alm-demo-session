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

Paste the following URL: **xxxxxxx**
<br>![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/e77ac5ec-2a6d-4e88-bf87-555a7a446978)

You will now see the imported Java project in your IntelliJ project browser.
_**comment**_ Need to replace screenshot
<br>![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/e6479cda-4cdb-4e7e-9a03-2dedad9c4b27)

## Exercise 1.2 Build initial Node.js application

Now you can instrument the Java application. How you have to instrument it, depends on the Java Buildpack that is used by the application. 

## Exercise 1.3 Connect to Cloud Foundry

Now you can instrument the Java application. How you have to instrument it, depends on the Java Buildpack that is used by the application. 
So first let's verify your Java Buildpack.

## Exercise 1.4 Deploy initial Node.js application

Now you can instrument the Java application. How you have to instrument it, depends on the Java Buildpack that is used by the application. 
So first let's verify your Java Buildpack.


## Summary

You've now deployed a first, non-instrumented, version of your Node.js application. The next step is to prepare the infrastructure so it can send metrics to SAP Cloud ALM.

Continue to - [Exercise 2 - Exercise 2 Description](../ex2/README.md)

