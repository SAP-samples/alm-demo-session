# Exercise 3 - Instrument your Demo Application

In this exercise, we will create...

## Exercise 3.1 Instrument UI Application

After completing these steps you will have created...

1. Click here.

2.	Insert this line of code.
```abap
response->set_text( |Hello ABAP World! | ). 
```



## Exercise 3.2 Instrument Server Application

After completing these steps you will have...

1.	Enter this code.
```abap
DATA(lt_params) = request->get_form_fields(  ).
READ TABLE lt_params REFERENCE INTO DATA(lr_params) WITH KEY name = 'cmd'.
  IF sy-subrc = 0.
    response->set_status( i_code = 200
                     i_reason = 'Everything is fine').
    RETURN.
  ENDIF.

```

## Exercise 3.3 Deploy instrumented Node.js application

gggg

## Exercise 3.4 Create some traffic in your application

gggg

## Summary

You've now ...

Continue to - [Exercise 3 - Excercise 3 ](../ex3/README.md)

