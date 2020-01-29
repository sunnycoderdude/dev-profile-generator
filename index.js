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
    
    
    axios({
      url: `https://api.github.com/users/${username}`,
      method: 'get',
      // responseType: 'ArrayBuffer'
      })
      .then(function(response) {
        console.log(response.data.following)
        // return response.data;
        // const pngBuffer = Buffer.from(response.data.avatar_url);
        // Create a document
        const doc = new pdf();

        // start pdf writer
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
        doc.rect(150, 50, 312, 312)
        .lineWidth(3)
        .fillOpacity(0.9)
        .fillAndStroke("eeee", "#900")

        let img = 'headshot.jpeg';

        // avatar image
        doc.image(img, 155, 56, {width: 300})
        
        // Add the link text
        doc.fontSize(12)
          .fillColor('blue')
          .text('GitHub Page!', 80, 470);

        // Measure the text
        const width = doc.widthOfString('Github Page!');
        const height = doc.currentLineHeight();

        // Add the underline and link annotations
        doc.underline(20, 0, width, height, {color: 'blue'})
          .link(80, 470, width, height, response.data.html_url);


        // Add the link text
        doc.fontSize(12)
          .fillColor('blue')
          .text('Location!', 280, 470);

        // Measure the text
        const width2 = doc.widthOfString('Location!');
        const height2 = doc.currentLineHeight();

        // Add the underline and link annotations
        doc.underline(20, 0, width2, height2, {color: 'blue'})
          .link(280, 470, width2, height2, "https://www.google.com/maps/place/"+response.data.location);

        // Add the link text
        doc.fontSize(12)
          .fillColor('blue')
          .text('Blog!', 480, 470);

        // Measure the text
        const width3 = doc.widthOfString('Location!');
        const height3 = doc.currentLineHeight();

        // Add the underline and link annotations
        doc.underline(20, 0, width3, height3, {color: 'blue'})
          .link(480, 470, width3, height3, response.data.blog);

        // Hi!
        doc
        .font('Helvetica')
        .fill('black')
        .fontSize(25)
        .text("Hi!", 80, 370, {align: "center"})

        // My name is!
        doc
        .font('Helvetica')
        .fill('black')
        .fontSize(25)
        .text("My name is " + response.data.name, 80, 400, {align: "center"})

        // short description
        doc
        .font('Helvetica')
        .fill('black')
        .fontSize(15)
        .text(response.data.bio, 80, 430, {align: "center"})

        doc
        .font('Helvetica')
        .fill('black')
        .fontSize(25)
        .text("Public Repos: "+response.data.public_repos, 80, 500, {align: "left"})

        doc
        .font('Helvetica')
        .fill('black')
        .fontSize(25)
        .text("Github Stars: "+response.data.public_gists, 80, 560, {align: "left"})

        doc
        .font('Helvetica')
        .fill('black')
        .fontSize(25)
        .text("Followers: "+response.data.followers, 80, 500, {align: "right"})

        doc
        .font('Helvetica')
        .fill('black')
        .fontSize(25)
        .text("Following: "+response.data.following, 80, 560, {align: "right"})

        doc.end();

      })
      .then(function(data) {
        console.log(data);
      })
      .catch (function(error) {
      console.error(error)
      });

});

// console.log(responses.username)



