const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown");
const joi = require("joi");
const axios = require("axios");

function init() {
    console.log("Welcome to the quick and basic README generator. You will be asked a series of questions to quickly generate a README file for your project.  Please be as descriptive as possible with your answers.  The README.md file will be an editable file that should be updated along with the project");

    // Acquire github user name to log repositories for next question.
    inquirer.prompt({
        message: "Please enter your GitHub username.",
        name: "username",
    })
        .then(function ({ username }) {
            const queryURL = `https://api.github.com/users/${username}/repos?per_page=100`;

            axios.get(queryURL).then(function (response) {
                const repos = response.data;
                const repoNames = repos.map((repo) => repo.name);

                inquirer.prompt([
                    {
                        type: "list",
                        message: "Which repository would you like to write a README for?",
                        name: "projectname",
                        choices: repoNames,
                        validate: function validateInput(name) {
                            return name !== "";
                        }
                    },
                    {
                        type: "input",
                        message: "Provide a description of your project.",
                        name: "description",
                        validate: function validateInput(name) {
                            return name !== "";
                        }
                    },
                    {
                        type: "input",
                        message: "What are the steps required to install your project?",
                        name: "installationDetails"
                    },
                    {
                        type: "checkbox",
                        message: "What tools were used in the development of your project?",
                        name: "tools",
                        choices: [
                            " HTML", " CSS", " Bootstrap 4", " JavaScript", " jQuery", " API's", " AJAX", " JSON", " Node.js"
                        ]
                    },
                    {
                        type: "input",
                        message: "What is planned for future releases?",
                        name: "roadmap"
                    },
                    {
                        type: "input",
                        message: "Explain how to use the program.",
                        name: "usage",
                    },
                    {
                        type: "input",
                        message: "How is it licensed?",
                        name: "licenseDetails"
                    },
                    {
                        type: "input",
                        message: "What are the guidelines for contributions?",
                        name: "contributionDetails"
                    },
                    {
                        type: "input",
                        message: "Please credit any authors and contributors.",
                        name: "authors"
                    },
                    {
                        type: "input",
                        message: "Please provide any testing associated with this project.",
                        name: "tests"
                    },
                    {
                        type: "input",
                        message: "Who can the user contact with questions?  Provide email address only.",
                        name: "questions",
                        validate: function validateEmail(name) {
                            let valid;
                            joi.validate(name, joi.string().email(), function (err, val) {
                                if (err) {
                                    valid = console.log("Please enter a valid email address.");
                                } else {
                                    valid = true;
                                }
                            })
                            return valid;
                        }
                    }
                ]).then(function (data) {
                    const filename = data.projectname.toLowerCase().split(' ').join('') + ".json";
                    writeToFile(filename, data);

                    const markdown = generateMarkdown(data);
                    fs.writeFile("README.md", markdown, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    })
                })
            })
        })
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, JSON.stringify(data, null, '\t'), function (err) {
        if (err) {
            return console.log(err);
        }
    })
}

init();
