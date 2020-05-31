function generateMarkdown(data) {
  return `
  # ${data.projectname}

  ## Description

  ${data.description}

  

  `

    ;
}

module.exports = generateMarkdown;
