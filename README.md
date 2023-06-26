# D&D Colosseum

## Introduction

D&D Colosseum is a full stack application where players can make teams out of the most famous of D&D monsters and have them fight other teams of monsters. Battles are carried out using official D&D 5E edition stats as provided by http://www.dnd5eapi.co/ . Players will be presented these monsters in the form of interactable cards. Registration is optional. Simply Stop By and have fun!

# Live version
http://dd-colosseum-bucket.s3-website-us-east-1.amazonaws.com/

## Installation

### Install Node.js: 
Angular requires Node.js version 12.x or higher. Visit the Node.js website and download the latest LTS (Long-Term Support) version appropriate for your operating system. Follow the installation instructions provided by the Node.js installer.

Verify Node.js and npm installation: Open a terminal or command prompt and run the following commands to verify that Node.js and npm are installed correctly:

`node --version`
`npm --version`

These commands should display the installed versions of Node.js and npm without any errors.

Install the Angular CLI: The Angular CLI is a command-line interface that makes it easy to scaffold, develop, and build Angular applications. Install it globally on your machine by running the following command:

`npm install -g @angular/cli`

This command installs the Angular CLI globally so that you can use it from any directory in your terminal or command prompt.

Verify Angular CLI installation: Run the following command to verify that the Angular CLI is installed correctly:

`ng version`

Clone the repository git clone 
https://github.com/052223-java-angular/Soudry-P1-Frontend.git

`npm install` 
Install all your repositories

`ng serve --open`

## Front End Logic
This application receives Http Get requests from a back end server which contain Dungeons and Dragon information. The Data originates from   http://www.dnd5eapi.co/ though it has been altered slightly for the applications needs.

Users can register and/Or login into the application. From there the Users can create a team of monsters and fight enemy monsters.

The fight.compononent.ts contains the majority of the logic for the application. It uses methods to replicate simplified combat rules for 5th edition Dnd.


## Tech Stacks for the Front-End
- **Angular** The Framework used to build the front end.
- **S3-Bucket** Hosting the application online.