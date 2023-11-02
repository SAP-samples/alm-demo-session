[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/teched2023-XP261)](https://api.reuse.software/info/github.com/SAP-samples/teched2023-XP261)

# XP261 - Observability for your SAP BTP Applications with SAP Cloud ALM

## Description

This repository contains the material for the SAP TechEd 2023 session called XP261 - Observability for your SAP BTP Applications with SAP Cloud ALM.  

SAP Cloud ALM provides a [Next Generation Data Collection Infrastructure](https://support.sap.com/en/alm/sap-cloud-alm/operations/expert-portal/data-collection-infrastructure.html) that offers a standardized way to collect monitoring data using Open Telemetry. With this, instrumentation efforts for your PaaS applications on SAP BTP, Cloud Foundry environment are reduced to a bare minimum. Get an overview of the concept and learn how to instrument your applications – and how this results in monitoring data coming up in SAP Cloud ALM applications like Exception Monitoring, Health Monitoring, and Real User Monitoring.

## Overview

In this session, you will learn how you can instrument your custom-built applications on SAP BTP Cloud Foundry so that monitoring data is sent to SAP Cloud ALM. 

You will be provided with a small demo Node.js application which you will instrument, build, and deploy on an SAP BTP, Cloud Foundry environment. After you deploy your application you will go to SAP Cloud ALM and observe the metrics delivered to Real User Monitoring and Health Monitoring. 

## Requirements

The requirements to follow the exercises in this repository are

- Basic knowledge of SAP BTP Cockpit
- Basic knowledge in development environments like IntelliJ

## Exercises

- [Getting Started](exercises/ex0/)
- [Exercise 1 - Prepare Your Development Environment](exercises/ex1/)
    - [Exercise 1.1 - Copy Code from GitHub](exercises/ex1#exercise-11-copy-code-from-github)
    - [Exercise 1.2 - Build initial Node.js application](exercises/ex1#exercise-12-build-initial-nodejs-application)
    - [Exercise 1.3 - Connect to Cloud Foundry](exercises/ex1#ex1#exercise-13-connect-to-cloud-foundry)
    - [Exercise 1.4 - Deploy initial Node.js application](exercises/ex1#exercise-14-deploy-initial-nodejs-application)
- [Exercise 2 - Enable Connectivity to SAP Cloud ALM](exercises/ex2/)
    - [Exercise 2.1 - Download SAP Cloud ALM Service Key from Landscape Management](exercises/ex2#exercise-21-download-sap-cloud-alm-service-key-from-landscape-management)
    - [Exercise 2.2 - Create Destination in BTP Cockpit](exercises/ex2#exercise-22-create-destination-in-btp-cockpit)
    - [Exercise 2.3 - Activate Data Collection in SAP Cloud ALM](exercises/ex2#exercise-23-activate-data-collection-in-sap-cloud-alm)
- [Exercise 3 - Instrument your Demo Application](exercises/ex3/)
    - [Exercise 3.1 - Instrument UI Application](exercises/ex3#exercise-31-instrument-ui-application)
    - [Exercise 3.2 - Instrument Server Application](exercises/ex3#exercise-32-instrument-server-application)
    - [Exercise 3.3 - Deploy instrumented Node.js application](exercises/ex3#exercise-33-deploy-instrumented-nodejs-application)
    - [Exercise 3.4 - Create traffic in your application](exercises/ex3#exercise-34-create-some-traffic-in-your-application)
- [Exercise 4 - Observe Metrics in SAP Cloud ALM](exercises/ex4/)
    - [Exercise 4.1 - Check metrics in Real User Monitoring](exercises/ex4#exercise-41-check-metrics-in-real-user-monitoring)
    - [Exercise 4.2 - Check metrics in Health Monitoring](exercises/ex4#exercise-42-check-metrics-in-health-monitoring)
  
## How to obtain support

Support for the content in this repository is available during the actual time of the online session for which this content has been designed. Otherwise, you may request support via email to cloudalm@sap.com.

## License
Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
