// TODO: Include packages needed for this application

var inquirer = require("inquirer");
var generateMarkdown = require("./utils/generateMarkdown");
var axios = require("axios");
var fs = require("fs");

// TODO: Create a function to write README file

function writeToFile(fileName, data) {
    const goodREADME= generateMarkdown(data);
    writeFileAsync(fileName, goodREADME);
  }
  
// TODO: Create an array of questions for user input
const questions = [
  // questions to user using "inquirer"
  {
    type: "input",
    message: "What is your GitHub user name?",
    name: "username"
  },

  {
    type: "input",
    message: "What is your project Title?",
    name: "title",
    default: "Good Read Me"
  },

  {
    type: "input",
    message: "What is your repo called?",
    name: "repo",
    default: "GoodREADMEGenerator"
  },

  {
    type: "input",
    message: "How do you describe your Project?.",
    name: "desc",
    default:
      " This application will render a README.md file"
  },

  {
    type: "input",
    message: "What are the steps required to install your project?",
    name: "install",
    default: "Step1: Run npm install and Step2: Run node index.js"
  },

  {
    type: "input",
    message: "Write instructions for using your project.",
    name: "usage",
    default:
      "1.Run node index.js, 2.Answers the questions, 3.The README.md file is thencreated. "
  } 
];
 
// TODO: Create a function to initialize app
 
function init() {
  inquirer.prompt(questions).then(answers => {
    console.log(answers);
    axios
      .get("https://api.github.com/users/" + answers.username)
      .then(response => {
        console.log(response);
        var imageURL = response.data.avatar_url;
        answers.image = imageURL;
        console.log(imageURL);
        fs.writeFile("README.md", generateMarkdown(answers), function(err) {
          if (err) {
            throw err;
          }
        });
      });
  });
}
// Function call to initialize app
init();
 



