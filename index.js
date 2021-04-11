const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const questions = () =>
inquirer.prompt([
    {
        type: "input",
        name: "coder",
        message: "What is the coder's name?"
    },
    {
        type: "input",
        name: "editor",
        message: "What is text editor do you use?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?"
    },
    {
        type: "input",
        name: "title",
        message: "What is your project title?"
    },
    {
        type: "input",
        name: "school",
        message: "What school are you studying at?"
    },
    {
        type: "input",
        name: "repo",
        message: "Where are all your repositories?"
    },
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
    }, 
    {
        type: "input",
        name: "installations",
        message: "How do you install dependencies?"
    },
    {
        type: "input",
        name: "usage",
        message: "How do you use this repo?"
    }

])

function generateMD(data){
    return`# ${data.title}
    ${data.badge}
    ${data.description}
    ## Table of Contents"
    * [Installation] (#installation)
    * [Questions](#questions)
    ### Installation:
    In order to install the necessary dependencies, open the console and run the following:
    \`\`\`${data.installations}\`\`\`
    ### Questions:
    If you have any questions contact me on [GitHub](https://github.com/${data.username})
    `;
}

questions()
.then((data) => writeFileAsync('generateREADME.md',
generateMD(data)))
.then(() => console.log('Successfully wrote to index.html'))
.catch((err) => console.error(err));