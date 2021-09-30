const express = require("express");
const bodyParser = require("body-parser");
const { Template } = require("ejs");
var nodemailer = require("nodemailer");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceKey.json");
var cors = require('cors')
const { v4: uuidv4 } = require('uuid');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = admin.firestore();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use(cors())

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "campuscircle6@gmail.com",
    pass: "2june2002",
  },
});

app.get("/send-mail", async function (req, res) {
  console.log(req.body);
  // sendMail("message test","subject")
  res.send("message sent")

});

async function sendMail(body,subject)
{
  const data = await db.collection("emails")
  .get();

  const documents = data.docs.map((doc) => doc.data());

  documents.forEach(async (doc) => {
    const mailOptions = {
      from: "campuscircle6@gmail.com", // sender address
      to: doc['email'], // list of receivers
      subject: "Subject of your email", // Subject line
      html: `${body}`, // plain text body
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });  
  });

}

app.post('/verify-society',async (req, res) => {
  console.log(req.params);

  const code = req.body.code;
  const eventName = req.body.eventName;
  const Body = req.body.Body;
  const eventDescription = req.body.eventDescription;

  console.log(code);
  console.log(eventName);
  console.log(Body);

  const data = await db.collection(`societies`).get();
  const documents = data.docs.map((doc) => doc.data());
  console.log(documents);
  var found = documents.filter((doc) => doc['code'] === code);
  console.log(found)
  if(found.length == 0){
    res.send({
      status: false,
      message: "Invalid Society Code"
    })
  }else{
    console.log("CODE REAL H")
    const id = uuidv4();
    const addData = await db.collection("events").doc(id).set({
      // code: code,
      eventName: eventName,
      eventDescription: eventDescription,
      Body: Body,
      id: id
    });

    await sendMail(Body, eventName);

    res.send({
      status: true,
      message: "Your Event Has been Received",
      id : addData.id
    })
  }
})

app.post('/events/:id',async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const data = await db.collection(`events`).doc(id).get();

  const documents = data.data();
  console.log(data.data());
  res.send({
    title : documents.eventName,
    description : documents.eventDescription,
    body : documents.Body
  });

});

app.listen(process.env.PORT || 8000, function (req, res) {
  console.log("listening on port 8000");
});
