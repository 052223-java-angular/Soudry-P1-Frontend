# P1 - D&D War

## Introduction

D&D War is a full stack application where players can make teams out of the most famous of D&D monsters and have them fight other teams of monsters. Battles are carried out using official D&D 5E edition stats as provided by http://www.dnd5eapi.co/ . Players will be presented these monsters in the form of interactable cards. Registration is optional. Simply Stop By and have fun!

## User Stories

- **As a user**, I want to be able to understand the rules of the game in a easy and a concise manner.
- **As a user**, I want to be able to browse all potential monsters to choose my team.
- **As a user**, I want to be able my team of monsters to fit according to my preferences.
- **As a user**, I want to be able to choose from a list of premade monsters to get started on the game faster.
- **As a user**, I want to be able to choose which enemy team that I would fight.
- **As a user**, I want to be able use my team of monsters to fight other teams of monsters..
- **As a user**, I want to be able to influence combat with items or other abilities.
- **As a user**, I want to be able to see a battle report to determine how well I did against my opponent so I can do better next time.

## MVP (Minimum Viable Product)

- Welcome Page With Rules of the Game
- Browsing and searching for monsters
- Adding Monsters to team and modifying team. 
- Premade Teams for you and the enemy
- Battle Functionality
- Battle Item Functionality
- MatchMaking
- Battle Report After the battle

## Stretch Stories 

- **As a user**, I want to be able to play the game on Munchy Mode.
- **As a user**, I want to be able to able to win currency to spend on shop items.
- **As a user**, I want there to be a shop to buy power ups.
- **As a user**, I want to be able to build my own potential enemy teams.
- **As a user**, I want to be randomly matched against opponents.
- **As a user**, I want to be register an account to persist my monster teams.
- **As a user**, I want to have a playable tutorial to understand how the game works

## Stretch Goals

- Implement Alternate Game Mode with custom rules called Munchy Mode.
- Implement Currency and Shop functionality 
- Implementing the ability to create and alter teams for you to fight again.
- Random matching of enemy team.
- User Registration and Login
- Tutorial Mode

## Tech Stacks

- **Java**: The programming language used to build the backend.
- **Angular** The Framework used to build the front end.
- **PostgreSQL**: Used as the database to persist .
- **Maven or Gradle**: Used for managing project dependencies.
- **JUnit**: A testing framework for Java applications, used to ensure our code works as expected.
- **BCrypt**: A Java library for hashing and checking passwords for security.
- **JUnit, Mockito, and PowerMock**: Used for unit and integration testing.
- **Git and GitHub**: Used for version control.
- **Spring Boot** For creating, managing and interacting with postgres database and the third party api.

## Requirements

- **Clean Codebase**: All code should be clean and well-documented. The repository should not include any unnecessary files or folders such as the `target/`, `.DS_Store`, etc. All files and directories should be appropriately named and organized.

- **Database Design**: The database should be designed following the principles of the 3rd Normal Form (3NF) to ensure data integrity and efficiency. An Entity Relationship Diagram (ERD) should be included in the documentation.

- **Secure**: All sensitive user data such as passwords must be securely hashed before storing it in the database. The application should not display any sensitive information in error messages.

- **Error Handling**: The application should handle potential errors gracefully and provide clear and helpful error messages to the users.

- **Testing**: The application should have a high test coverage. Unit tests and integration tests should be implemented using JUnit, Mockito, and PowerMock.

- **Version Control**: The application should be developed using a version control system, preferably Git, with regular commits denoting progress.

- **Documentation**: The repository should include a README file with clear instructions on how to run the application. Code should be well-commented to allow for easy understanding and maintenance.

- **Scalable**: The design of the application should be scalable, allowing for easy addition of new features or modifications in the future.

## ERD

![P-0-ERD - Page 1 (1)](https://github.com/052223-java-angular/Soudry-P1-Backend/assets/55551370/3ab67170-dcfa-4ddf-a766-539e57e8cf11)
