# Yoga

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.16.

## Start the project

Git clone:

> git clone https://github.com/OpenClassrooms-Student-Center/P5-Full-Stack-testing


A partir d'ici ce fichier va être modifié :
# dev1  < main

Go inside folder:

> cd yoga

Install dependencies:

> npm install

Launch Front-end:

> npm run start;


### Test

#### E2E

Launching e2e test:

> npm run e2e

La fenêtre "Cypress s'ouvre" :  
<img width="1156" height="637" alt="image" src="https://github.com/user-attachments/assets/77e4cda2-288d-4607-897e-6d7974e9c8b7" />

Generate coverage report (you should launch e2e test before):

> npm run e2e:coverage

Report is available here:

> front/coverage/lcov-report/index.html
<img width="1349" height="759" alt="image" src="https://github.com/user-attachments/assets/732642c1-6cf6-43a6-b342-702a463991ed" />


#### Unitary test

Launching test:

> npm run test
<img width="401" height="107" alt="image" src="https://github.com/user-attachments/assets/f993d6e4-aac9-4b34-aeb3-914f70898555" />



for following change:

> npm run test:watch  
<img width="611" height="433" alt="image" src="https://github.com/user-attachments/assets/28f23e0e-6517-4f1b-aa48-a183fa1b728f" />

# dev2 : 
Les bonnes pratiques telles que :
- le désabonnement des observables (unsubscribe observables) :  
  Refactor : MeComponent,DetailComponent,FormComponent,LoginComponent et RegisterComponent
