<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use --->

# Team 9 

# CSCI 5709 Project Proposal

- _Date Created_: 20 JUNE 2023
- _Last Modification Date_: 20 June 2023

## Links

- _Gitlab Project URL_: <https://git.cs.dal.ca/schokshi/csci_4177-5708_grp-09/>
- _Gitlab Project Code Clone_: <https://git.cs.dal.ca/schokshi/csci_4177-5708_grp-09.git>
- _Netlify Frontend Deployment URL_: <https://web-markethub.netlify.app/>
- _Render Backend Deployment URL_: <https://markethub-a2gl.onrender.com>

## Authors

- [Priyank Amit Patel](pr371749@dal.ca) - _(Developer)_
  - _Gitlab Individual Project Branch_: <https://git.cs.dal.ca/schokshi/csci_4177-5708_grp-09/-/tree/Priyank_Patel?ref_type=heads>
- [Smith Dharmeshkumar Chokshi](sm714486@dal.ca) - _(Developer)_
  - _Gitlab Individual Project Branch_: <https://git.cs.dal.ca/schokshi/csci_4177-5708_grp-09/-/tree/Smith_Chokshi?ref_type=heads>
- [Saumya Bhatt](sm728522@dal.ca) - _(Developer)_
  - _Gitlab Individual Project Branch_: <https://git.cs.dal.ca/schokshi/csci_4177-5708_grp-09/-/tree/Saumya_Bhatt?ref_type=heads>
- [Jay Jitendrakumar Mulani](jy850028@dal.ca) - _(Developer)_
  - _Gitlab Individual Project Branch_: <https://git.cs.dal.ca/schokshi/csci_4177-5708_grp-09/-/tree/Jay_Mulani?ref_type=heads>
- [Ritva Ashvinbhai Katrodiya](rt664810@dal.ca) - _(Developer)_
  - _Gitlab Individual Project Branch_: <https://git.cs.dal.ca/schokshi/csci_4177-5708_grp-09/-/tree/Ritva_Katrodiya?ref_type=heads>


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). According to the [React Documentation](https://reactjs.org/docs/create-a-new-react-app.html), create-react-app is one of the official ways to create a single-page application in React.

### Prerequisites

To have a local copy of this tutorial up and running on your local machine, you will first need to install the following software / libraries / plug-ins

- [Node](https://nodejs.org/en/) - Download and install Node. This will also include NPM (Node Package Manager).
- [Visual Studio Code](https://code.visualstudio.com/) - Download and install VS Code or any Editor/IDE(Integrated Development Environment) of your choice. - Optional

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

## Installing Frontend

Navigate to folder named Frontend.
A step by step series of instructions that tell you how to get a development environment running. Let's use Node + NPM for this assignment.

- First of all head to the official [Node](https://nodejs.org/en/) website to download and install Node, which also includes NPM.
- Select either of the "Recommended For Most Users" button or "Latest Features" button and download the latest version for your Operating System.
- After you download and install Node, open command prompt/terminal on your desktop and run the following commands to check if everything works:
  - node -v
  - npm -v
- To run the application, change to the directory where the app was installed using "cd <folder_name>" on command prompt/terminal.
- Run "yarn install" to install all the dependencies used by the app.
- Finally, run "yarn dev" to see the app live on the localhost.

## Installing Backend

Navigate to folder named Backend.
A step by step series of instructions that tell you how to get a development environment running. Let's use Node + NPM for this assignment.

- First of all head to the official [Node](https://nodejs.org/en/) website to download and install Node, which also includes NPM.
- Select either of the "Recommended For Most Users" button or "Latest Features" button and download the latest version for your Operating System.
- After you download and install Node, open command prompt/terminal on your desktop and run the following commands to check if everything works:
  - node -v
  - npm -v
- To run the application, change to the directory where the app was installed using "cd <folder_name>" on command prompt/terminal.
- Run "yarn install" to install all the dependencies used by the app.
- Finally, run "yarn start" to see the app live on the localhost.


## Deployment

This app's Frontend was deployed using [Netlify](https://www.netlify.com/).

- _Netlify Deployment URL_: <https://web-markethub.netlify.app/>

This app's Backend was deployed using [Render](https://render.com/).

- _Render Deployment URL_: <https://markethub-a2gl.onrender.com>

Alternative deployment options can be found [here](https://facebook.github.io/create-react-app/docs/deployment.).

## Built With

- [React](https://reactjs.org/) - The web frontend framework
- [Node](https://nodejs.org/en/) - Backend JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/)
- [NPM](https://www.npmjs.com/) - The package manager for [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/) - [Node](https://nodejs.org/en/) web application framework
- [Axios](https://expressjs.com/) - Easy to use promise based HTTP client library for browser and Node.js.
- [GitLab](https://gitlab.com/users/sign_in) - The version control tool
- [Netlify](https://www.netlify.com/) - The cloud platform used for application deployment
- [Render](https://render.com/) - Render is a unified cloud to build and run all your apps and websites with free TLS certificates.
- [Visual Studio Code](https://code.visualstudio.com/download) - The source code editor used
- [Google Chrome](https://www.google.com/intl/en_in/chrome/) - Browser used to visualize the changes


## Workflow of the website

- Credentials to login.
  - User 1 - Email: pr371749@dal.ca, Password: 123456
  - User 2 - Email: sm714486@dal.ca, Password: Smith@123

- Chat Feature.
  - To use this feature opean a website in Crome Browser and Login in with any of the user and now open same website in another Browser and Login with another user credentials.
  - Select any of the pre-created chat from the side bar anf type a message, you will be able to see updated chat in another browser without referesh.
  - To achieve this socket.io was used.
  - In the Dashboard page there is an option in every product to create new chat using which we have created the three chats that are currently shown on the website.
  - Few products are were added by different users so you will be able to create chat with them but you would required credentials for that user to create the chat.
- Our website Landing page is Product Listing page.  

## Sources Used

- In order to learn socket programming using socket.io, this tutorial video was followed [available here](https://www.youtube.com/watch?v=kSsTZ_mtF94).
- For routing from one page to another, this was referred [website](https://v5.reactrouter.com/web/guides/quick-start).
- For css script we have referred Antd css documents [website](https://ant.design/docs/react/introduce).
- FAQ image reference is available [here](https://www.talentvine.com.au/2019/09/06/the-hidden-value-of-a-marketplace-whats-the-concept-and-what-does-it-give-to-you/).
- Contact Us image reference is available [here](https://statics.teams.cdn.office.net/evergreen-assets/safelinks/1/atp-safelinks.html).

## Acknowledgments

- Thank you Professor Gabriella Mosquera and all TA's of course CSCI 5709 for providing all the knowledge and teaching assistance.
- Thank you to all React developers for sharing their knowledge and providing useful resources on the web.
