require('dotenv').config();

const express = require('express');

const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Portfolio Data (Tame yaha thamari info bharo)
const portfolioData = {
  name: "Bhoomika Vankar",
  title: "Full Stack Web Developer",
  about: "I'm a passionate full-stack developer who loves building real-world web applications. I enjoy turning complex problems into simple, beautiful, and intuitive solutions.",
  email: "bpvankar496@email.com",
  phone: "+91 9265380131",
  location: "Ankleshwar, Gujarat",
  github: "https://github.com/bpvankar496-ux",
  linkedin: "https://www.linkedin.com/in/bhoomika-vankar-2106a931b",
  skills: [
    { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "EJS","React","Taliwind"] },
    { category: "Backend", items: ["Node.js", "Express.js"] },
    { category: "Database", items: ["MongoDB", "Mongoose"] },
    { category: "Tools", items: ["Git", "GitHub", "VS Code", "Render"] }
  ],
  projects: [

{
  title: "WanderLust — Airbnb Clone",
  description: "A full-stack Airbnb-inspired rental listing platform where users can browse, create, and review property listings, with Passport.js authentication, Cloudinary image uploads, Mapbox-powered maps, and offline-first PWA support using Service Workers and IndexedDB.",
  tech: ["Node.js", "Express", "MongoDB", "EJS", "Passport.js", "Cloudinary", "Mapbox"],
  github: "https://github.com/bpvankar496-ux/MajorProject_OfflineAirbnbWebsite_ejs",
  live: "https://majorproject-offlineairbnbwebsite-ejs.onrender.com",
  featured: true
},

    {
      title: "RideGo — Ride Booking App",
      description: "A full-stack Uber/Rapido-style ride booking platform with real-time ride matching, live maps (OpenStreetMap), WebRTC video calling, mock payments, SOS emergency feature, and an admin dashboard.",
      tech: ["Node.js", "Express", "MongoDB", "Socket.io", "WebRTC", "OpenStreetMap"],
      github: "https://github.com/bpvankar496-ux/RideGo",
      live: "https://ridego-5bj7.onrender.com",
      featured: true
    },
    {
      title: "Cafe Aroma — Cafe Website",
      description: "A modern cafe website with menu, table reservation system, contact form, live chat widget, user login/reviews, and an admin dashboard — all with MongoDB backend.",
      tech: ["Node.js", "Express", "MongoDB", "EJS"],
      github: "https://github.com/bpvankar496-ux/Cafe_Website",
      live: "https://cafe-website-vkdy.onrender.com",
      featured: true
    }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.render('index', { data: portfolioData });
});

// Contact Form
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log('Email error:', err);
    res.status(500).json({ success: false });
  }
});



app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});