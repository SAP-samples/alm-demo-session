# Exercise 1 - Instrumenting your Demo Application

In this exercise, we will instrument the Java application that you want to monitor with SAP Cloud ALM. 
In our sample scenario, we assume, that we want to monitor a full-stack application built on SAP BTP. The front end consists of SAP UI5. The UI requests will be routed to the application backend via the Application Router. Here, the application backend consists of one microservice. In order to monitor the backend with SAP Cloud ALM this microservice is instrumented with DCI. To gather the client performance we leverage SAP UI5's ability to measure and export these Frontend Statistics Records (FESR). Our microservice acts as a receiver for these FESRs. This receiver is instrumented with both the DCI as well as the FESR receiver library. DCI will always export the data to the SAP Cloud ALM routing infrastructure. This routing infrastructure will route the data to the correct SAP Cloud ALM tenant.
![image](https://github.com/andrea-schu/teched2023-XP261/assets/113598836/27c7b80c-31fe-4a4b-84da-2aa8e7de5de8)

We have already in

## Exercise 1.1 Copy Code from GitHub into your development environment

After completing these steps you will have created...

1. Click here.

2.	Insert this line of code.
```abap
response->set_text( |Hello World! | ). 
```



## Exercise 1.2 Instrument the Java application

After completing these steps you will have...

check which Java build pack version you are using

1.	Enter this code.
```xml
DATA(lt_params) = request->get_form_fields(  ).
READ TABLE lt_params REFERENCE INTO DATA(lr_params) WITH KEY name = 'cmd'.
  IF sy-subrc <> 0.
    response->set_status( i_code = 400
                     i_reason = 'Bad request').
    RETURN.
  ENDIF.

```

## Exercise 1.3 Build the Java application

Open a terminal in your IntelliJ:

## Exercise 1.4 Deploy the Java application in BTP

Deploy

verify deplpyment in btp subaccount

## Summary

You've now instrumented and deployed your Java application in BTP. The next step is to activate the monitoring data collection in SAP Cloud ALM.

Continue to - [Exercise 2 - Exercise 2 Description](../ex2/README.md)

