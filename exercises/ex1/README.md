# Exercise 1 - Instrumenting your Demo Application

In this exercise, we will create...

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
```abap
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

