const express = require("express");
const bodyParser = require("body-parser");
const { Template } = require("ejs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
require("dotenv").config();
var admin = require("firebase-admin");
var otpGenerator = require("otp-generator");

var serviceAccount = require("./serviceKey.json");
var cors = require("cors");
const { v4: uuidv4 } = require("uuid");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = admin.firestore();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use(cors());

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "campuscircle6@gmail.com",
    pass: "2june2002",
  },
});

app.get("/send-mail", async function (req, res) {
  console.log(req.body);
  sendMail("message test","subject")
  res.send("message sent");
});

async function sendMail(body, Subject) {
  const data = await db.collection("emails").get();

  const documents = data.docs.map((doc) => doc.data());

  const mails = [];
  documents.forEach(async (doc) => {
    mails.push(doc.email);
  });
  const mailOptions = {
    from: "campuscircle6@gmail.com", // sender address
    bcc : mails, // list of receivers
    subject: `${Subject}`, // Subject line
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

}

app.post("/society-registeration", async (req, res) => {
  const registerationMsg = `<h2 class="code-line" data-line-start=0 data-line-end=1 ><a id="Welcome_to_Campus_Circle_0"></a>Welcome to Campus Circle</h2>
  <p class="has-line-data" data-line-start="2" data-line-end="4">Your Registration key for Campus Circle is <strong>1234</strong><br>
  Please DM us on <a href="link">here</a> and get your Society Key to get registered.</p>`;

  const society = req.body;
  const addData = await db.collection("Form").doc(society.name).set(society);
  res.send(society);
});

app.post("/verify-society", async (req, res) => {
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
  var found = documents.filter((doc) => doc["code"] === code);
  console.log(found);
  if (found.length == 0) {
    res.send({
      status: false,
      message: "Invalid Society Code",
    });
  } else {
    console.log("CODE REAL H");
    const Sendmail = found[0].email;

    const msgOTP = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
      digits: true
    });

    const msg = `<h3 class="code-line" data-line-start=0 data-line-end=1 ><a id="Your_OTP_for_the_Event_is_1234__This_OTP_will_expire_in_15_min_0"></a>Your OTP for the Event is <strong>    
    ${msgOTP}</strong> . This OTP will expire in 15 min</h3>`;
    console.log(msgOTP);
    console.log(Sendmail);
    const accessToken = generateAccessToken(msgOTP);

    MaileSending({ Email: Sendmail }, msg);

      res.send({
        status: true,
        message: "OTP has been sent successfully",
        accessToken: accessToken,
      });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN);
}

async function addEvent(id, data) {
  const addData = await db.collection("events").doc(id).set({
    eventName: data.eventName,
    eventDescription: data.eventDescription,
    Body: data.Body,
    id: id,
  });
}

app.post("/events/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const data = await db.collection(`events`).doc(id).get();

  const documents = data.data();
  console.log(data.data());
  res.send({
    title: documents.eventName,
    description: documents.eventDescription,
    body: documents.Body,
  });
});

app.post("/OTP-auth", OTPauth, (req, res) => {
  const data = {
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    Body: req.body.Body,
  };

  addEvent(uuidv4(), data);

  sendMail(data.Body, data.eventName);

  res.send({
    status: true,
    message: "Event Has been Registered",
    err: 200,
  });
});

function OTPauth(req, res, next) {
  const auth = req.body.auth;
  const OTP = req.body.OTP;

  if (auth == null) {
    res.send({
      status: false,
      message: "Auth is null",
      err: 403,
    });
  } else {
    jwt.verify(auth, process.env.ACCESS_TOKEN, function (err, decoded) {
      if (err) {
        res.send({
          status: false,
          message: "Invalid Auth",
          err: 403,
        });
      } else {
        console.log(decoded);
        console.log(OTP);
        if (decoded == OTP) {
          next();
        } else {
          res.send({
            status: false,
            message: "Invalid OTP",
            err: 401,
          });
        }
      }
    });
  }
}

app.listen(process.env.PORT || 8000, function (req, res) {
  console.log("listening on port 8000");
});

async function MaileSending(info, data) {
  const email = info.Email;
  const mailOptions = {
    from: "campuscircle6@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Campus Circle Society Registration", // Subject line
    html: data,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);

    } else {
      console.log(info);
    }
  });

}
