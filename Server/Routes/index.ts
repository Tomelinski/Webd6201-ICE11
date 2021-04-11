//express config
import express from "express";
const router = express.Router();
export default router;

//contact model
import Contact from "../Models/contact";

/* GET home page - with / */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home", page: "home", displayName: "" });
});

/* GET home page - with /home */
router.get("/home", function (req, res, next) {
  res.render("index", { title: "Home", page: "home", displayName: "" });
});

/* GET about page - with /about */
router.get("/about", function (req, res, next) {
  res.render("index", { title: "About Us", page: "about", displayName: "" });
});

/* GET services page - with /services */
router.get("/services", function (req, res, next) {
  res.render("index", {
    title: "Our Services",
    page: "services",
    displayName: "",
  });
});

/* GET projects page - with /projects */
router.get("/projects", function (req, res, next) {
  res.render("index", {
    title: "Our Projects",
    page: "projects",
    displayName: "",
  });
});

/* GET contact page - with /contact */
router.get("/contact", function (req, res, next) {
  res.render("index", {
    title: "Contact Us",
    page: "contact",
    displayName: "",
  });
});

/* GET login page - with /login */
router.get("/login", function (req, res, next) {
  res.render("index", { title: "Login", page: "login", displayName: "" });
});

/* GET login page - with /login */
router.post("/login", function (req, res, next) {
  res.redirect("/contact-list");
});

/* GET register page - with /register */
router.get("/register", function (req, res, next) {
  res.render("index", { title: "Register", page: "register", displayName: "" });
});

/* GET Logout page - with /login */
router.get("/logout", function (req, res, next) {
  res.render("index", { title: "Logout", page: "logout", displayName: "" });
});

/* temporary routes - mocking up login / register and contact-list related pages */
/* GET register page - with /register */
router.get("/contact-list", function (req, res, next) {
  //res.render('index', { title: 'Contact List', page: 'contact-list', displayName: 'temp'  });
  Contact.find(function (err, contacts) {
    if (err) {
      return console.error(err);
    }

    res.render("index", {
      title: "Contact List",
      page: "contact-list",
      contacts: contacts,
      displayName: "temp",
    });
  });
});

/* GET edit id page - with /edit/:id */
router.get("/edit/:id", function (req, res, next) {
  let id = req.params.id;

  Contact.findById(id, {}, {}, (err, contactToEdit) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.render("index", {
      title: "Edit",
      page: "edit",
      contact: contactToEdit,
      displayName: "",
    });
  });
});

/* GET process id page - with /edit/:id */
router.post("/edit/:id", function (req, res, next) {
  let id = req.params.id;

  let updatedContact = new Contact({
    _id: id,
    FullName: req.body.FullName,
    ContactNumber: req.body.ContactNumber,
    EmailAddress: req.body.EmailAddress,
  });

  Contact.updateOne({ _id: id }, updatedContact, {}, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/contact-list");
  });
});

/* GET add id page - with /add/:id */
router.get("/add", function (req, res, next) {
  res.render("index", {
    title: "Add",
    page: "edit",
    contact: "",
    displayName: "",
  });
});

/* GET process add page - with /add/:id */
router.post("/add", function (req, res, next) {
  let newContact = new Contact({
    FullName: req.body.FullName,
    ContactNumber: req.body.ContactNumber,
    EmailAddress: req.body.EmailAddress,
  });

  Contact.create(newContact, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/contact-list");
  });
});

/* process delete/:id page - with /edit/:id */
router.get("/delete/:id", function (req, res, next) {
  let id = req.params.id;

  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/contact-list");
  });
});