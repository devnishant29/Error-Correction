const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
var request = require("request");

const openai = require("openai");
openai.apiKey = "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";

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// app.post("/chatgpt", async (req, res) => {
//   const prompt = req.body.prompt;
//   console.log(prompt);
//   try {
//     const resp = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: req.body.question }],
//     });
//     res.status(200).json({ message: resp.data.choices[0].message.content });
//   } catch (e) {
//     res.status(400).json({ message: e.message });
//   }
// });

// app.post("/chatgpt", async (req, res) => {
//   const prompt = req.body.prompt;
//   console.log(prompt);
//   var options = {
//     method: "POST",
//     url: "https://api.openai.com/v1/chat/completions",
//     headers: {
//       Authorization:
//         "Bearer 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",
//       "Content-Type": "application/json",
//       Cookie:
//         "__cf_bm=vHzrq8iYJgifzY_4P_lrVAcEeUt3lCetdYJhB_sj6zA-1701979408-0-AR1ipIoZBgheMm1VM/qgQcbkpB/hdfmezTOnRKYHMSKwdk4EZI71ZKA9SoWN+h7LQfGmzbIwxKkNY+rgbJc9BFo=; _cfuvid=U.E6C1WfBw4wdex6YulOKdMdlrRQpCmvSZ3TGwWkBsE-1701978504088-0-604800000",
//     },
//     body: JSON.stringify({
//       input: "Find The Error in given Code Sample: " + prompt,
//       model: "text-embedding-ada-002",
//       encoding_format: "float",
//     }),
//   };
//   request(options, function (error, response) {
//     if (error) throw new Error(error);
//     console.log("jii");
//     res.json( response.body )
//     console.log(response.body)
    
    
//   });

// });

app.post("/stack", async (req, res) => {
  
  const prompt = req.body.prompt;
  console.log(prompt);
  try {

    res.status(200).json({ message: res.data.choices[0].message.content });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.use(authRoutes);

app.use("/events", eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
