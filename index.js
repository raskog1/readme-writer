const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./generateMarkdown");

inquirer.prompt([
    {
        type: "input",
        message: "What is the title of your project?",
        name: "projectname",
        validate: function validateProject(name) {
            return name !== "";
        }
    },
    {
        type: "input",
        message: "Provide a description of your project.",
        name: "description"
    },
    {
        type: "confirm",
        message: "Do you want to include a table of contents?",
        name: "tableStatus",
        default: false
    },
    {
        type: "confirm",
        message: "Does your project require installation?",
        name: "installationReq",
        default: false
    },
    {
        type: "input",
        message: "Explain the installation process.",
        name: "installationDetails",
        when: function (data) {
            return data.installationReq === true;
        }
    },
    {
        type: "checkbox",
        message: "What is the best option for people to go to for help?",
        name: "helpOptions",
        choices: [
            "Website",
            "Email",
            "Phone"
        ]
    },
    {
        type: "input",
        message: "What website provides assistance?",
        name: "helpWebsite",
        when: function (data) {
            return data.helpOptions === "Website";
        }
    },
    {
        type: "input",
        message: "What email provides assistance?",
        name: "helpEmail",
        when: function (data) {
            return data.helpOptions === "Email";
        }
    },
    {
        type: "number",
        message: "What phone number provides assistance?",
        name: "helpPhone",
        when: function (data) {
            return data.helpOptions === "Phone";
        }
    },
    {
        type: "input",
        message: "What is planned for future releases?",
        name: "roadmap"
    },
    {
        type: "confirm",
        message: "Is this project licenced?",
        name: "licenseStatus",
        default: false
    },
    {
        type: "input",
        message: "How is it licensed?",
        name: "licenseDetails",
        when: function (data) {
            return data.licenseStatus === true;
        }
    },
    {
        type: "confirm",
        message: "Is this project open to contributions?",
        name: "contributionStatus",
        default: false
    },
    {
        type: "input",
        message: "What are the requirements for contributions?",
        name: "contributionDetails",
        when: function (data) {
            return data.contributionStatus === true;
        }
    },
    {
        type: "input",
        message: "Provide any authors and acknowledgements.",
        name: "authors"
    },
    {
        type: "confirm",
        message: "Will this project continue to be supported?",
        name: "supportStatus",
        default: true
    },
    {
        type: "input",
        message: "Provide message regarding termination of support.",
        name: "supportDetails",
        when: function (data) {
            return data.supportStatus === false;
        }
    }

]).then(function (data) {
    const filename = data.projectname.toLowerCase().split(' ').join('') + ".json";
    writeToFile(filename, data);

    const markdown = generateMarkdown(data);
    fs.writeFile("markdown.md", markdown, function (err) {
        if (err) {
            return console.log(err);
        }
    })
})

const questions = [
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, JSON.stringify(data, null, '\t'), function (err) {
        if (err) {
            return console.log(err);
        }
    })
}

function init() {

}

//init();