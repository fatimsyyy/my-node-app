const express = require("express");
const axios = require("axios"); 

const cors = require("cors");

const app = express();
const PORT = 3000;
const apiKey = "c579e152ca9bd2438f6104c009710a99"; 


app.use(cors());
app.use(express.static("public"));  

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); 
});


app.get("/weather", async (req, res) => {
  const city = req.query.city;
  console.log(`Primljen zahtev za grad: ${city}`);

  if (!city) {
    console.log("Grad nije unesen.");
    return res.status(400).json({ error: "Grad nije unesen." });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(`Upućen API zahtev: ${url}`);

    const response = await axios.get(url); // axios da ne bi morala da se zuezam sa fetch

    //API odgovor ok????
    if (response.status !== 200) {
      console.log(`API odgovor nije OK: ${response.status}`);
      return res.status(404).json({ error: "Grad nije pronađen" });
    }

    const data = response.data; // Dobijeni podaci
    console.log("Podaci o vremenu:", data);

    res.json(data); //frontend ide u JSON
  } catch (error) {
    console.error("Greška pri dobijanju podataka:", error);
    res.status(500).json({ error: "Interna greška servera" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server radi na http://localhost:${PORT}`);
});
