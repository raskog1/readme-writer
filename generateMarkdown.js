function generateMarkdown(data) {
  return `
  # ${data.projectname}

  * [Installation](#installation)
  * [Usage](#usage)
  * [Tools](#tools)
  * [License](#license)
  * [Roadmap](#roadmap)
  * [Contributions](#contributions)
  * [Tests](#tests)
  * [Questions](#questions)

  ## Description

  ${data.description}

  ## Installation

  ${data.installationDetails}

  ## Usage

  ${data.usage}

  ## Tools

  The following tools were used in the development of this project:
  ${data.tools}

  ## License

  ${data.licenseDetails}

  ## Roadmap

  ${data.roadmap}

  ## Contributions

  ${data.contributionDetails}
  [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

  ## Authors and Acknowledgements

  This project would not be possible without the contributions of ${data.authors}

  ## Tests

  ${data.tests}

  ## Questions

  Please email all questions to ${data.questions}.

  `
    ;
}

module.exports = generateMarkdown;
