# ProjectManagementTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Implement at least one approach for UI performance consideration.

Use of AOT (Ahead-of-Time) Compiler : It involves compilation during development time and eliminates the need for a deployment bundle. Also, it helps reduce the application’s size, provide time to render individual components and increase application performance.

Tree Shaking to Reduce Bundle Size : ng build --prod --optimization=true --build-optimizer=true

Lazy Loading of Modules: Lazy loading of modules carried out by using loadChildren property.

Immutable Data and Using Pure Pipes: Pure Pipes

## Identify and Implement client-side Optimization Techniques for Bootstrap.

Avoid using `@HostListener(‘document’)`
Only render what is needed
Analyze bundle size regularly
Production Builds 

## Implement the prevention of XSS cross-site security threats for frontend application

This a major culprit. Examples of sinks include,

methods to append to the DOM such as innerHTML, outerHTML
approaches that load external resources or navigate to external sites via a URL, such as src or href for HTML elements and url property on styles
event handlers, such as onmouseover and onerror with an invalid src value
global functions that evaluate and/or run code, such as eval(), setTimeout()

## Implement any one of the Gang of four Patterns to compose data using typescript before presenting the same on UI

Make a service singleton throughout all modules : the providedIn property of the @Injectable() in the service file must be set to "root
or 
Make the service singleton for a particular module : To make the service a singleton only within a specific module

The Observer Pattern


