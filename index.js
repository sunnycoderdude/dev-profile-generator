const inquirer = require("inquirer");
const pdf = require("pdfkit");
const fs = require("fs");
const axios = require("axios");


// get username and favorite color

let username = "";
let favColor = "";
let followers = "";
let following = "";
let gitRepos = "";
let gitStars = "";


inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "username"
    },
    {
      type: "input",
      message: "What is your favorite color?",
      name: "favColor"
    }
  ])
  .then(function(response) {

    // console.log(response.favColor);
    username = response.username;
    favColor = response.favColor;

    // Create a document
    const doc = new pdf();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('resume.pdf'));

    
    // set background to user selection 
    doc.rect(0, 0, 612, 792)
    .lineWidth(3)
    .fillOpacity(0.5)
    .fillAndStroke(favColor, "#900")

    // ensure text is readable
    doc.rect(16, 16, 580, 760)
    .lineWidth(3)
    .fillOpacity(0.9)
    .fillAndStroke("white", "#900")

    // image background box
    doc.rect(150, 50, 312, 200)
    .lineWidth(3)
    .fillOpacity(0.9)
    .fillAndStroke("eeee", "#900")

    // text
    doc
    .font('Helvetica')
    .fill('black')
    .fontSize(25)
    .text("Hi!", 80, 300, {align: "center"})

    doc
    .font('Helvetica')
    .fill('black')
    .fontSize(25)
    .text("My name is " + username, 80, 330, {align: "center"})

    doc
    .font('Helvetica')
    .fill('black')
    .fontSize(25)
    .text("I like to build cool new apps!", 80, 360, {align: "center"})

    doc
    .font('Helvetica')
    .fill('black')
    .fontSize(25)
    .text("Public Repos: ", 80, 500, {align: "left"})

    doc
    .font('Helvetica')
    .fill('black')
    .fontSize(25)
    .text("Github Stars: ", 80, 560, {align: "left"})

    doc
    .font('Helvetica')
    .fill('black')
    .fontSize(25)
    .text("Followers: ", 80, 500, {align: "right"})

    // Make a request for a user with a given ID
    axios.get('https://api.github.com/users/sunnycoderdude/following')
    .then(function (response) {
    // handle success
    console.log(response.data.length);
    following = response.data.length;
    console.log(following)
    return following;
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    doc
    .font('Helvetica')
    .fill('black')
    .fontSize(25)
    .text("test", 80, 560, {align: "right"})
    });


    doc.end();


});

// console.log(responses.username)



