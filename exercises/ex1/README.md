# Exercise 1 - Instrumenting your Demo Application

In this exercise, we will instrument the Java application that you want to monitor with SAP Cloud ALM. 
In our sample scenario, we assume, that we want to monitor a full-stack application built on SAP BTP. The front end consists of SAP UI5. The UI requests will be routed to the application backend via the Application Router. Here, the application backend consists of one microservice. In order to monitor the backend with SAP Cloud ALM this microservice is instrumented with DCI. To gather the client performance we leverage SAP UI5's ability to measure and export these Frontend Statistics Records (FESR). Our microservice acts as a receiver for these FESRs. This receiver is instrumented with both the DCI as well as the FESR receiver library. DCI will always export the data to the SAP Cloud ALM routing infrastructure. This routing infrastructure will route the data to the correct SAP Cloud ALM tenant.
<br>![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/27c7b80c-31fe-4a4b-84da-2aa8e7de5de8)

_**comment**_ Will be have a frontend and if so will we instrument it for them or let them do it?

## Exercise 1.1 Copy Code from GitHub into your development environment

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

## Exercise 1.2 Instrument the Java application

Now you can instrument the Java application. How you have to instrument it, depends on the Java Buildpack that is used by the application. 
So first let's verify your Java Buildpack.
1. Open your mta.yaml file. You find this file in the root directory of the application.
<br>![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/99579b72-447c-490d-9a89-c96587f1138f)

2. Search for the term "buildpack" _**comment**_ there is no buildpack used in the mock app, does this mean we use the SAP Java Buildpack? If so why do we have to change pom and mta? 


## Exercise 1.3 Build the Java application

Open a terminal in your IntelliJ:

## Exercise 1.4 Deploy the Java application in BTP

Deploy

verify deplpyment in btp subaccount

## Summary

You've now instrumented and deployed your Java application in BTP. The next step is to activate the monitoring data collection in SAP Cloud ALM.

Continue to - [Exercise 2 - Exercise 2 Description](../ex2/README.md)

