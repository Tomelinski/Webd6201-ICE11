"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessContactPage = exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.ProcessLoginPage = exports.DisplayRegisterPage = exports.DisplayLoginPage = exports.DisplayContactPage = exports.DisplayProjectsPage = exports.DisplayServicesPage = exports.DisplayAboutPage = exports.DisplayHomePage = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../Models/user"));
function UserDisplayName(req) {
    if (req.user) {
        let user = req.user;
        return user.displayName.toString();
    }
    return "";
}
function DisplayHomePage(req, res, next) {
    res.render("index", {
        title: "Home",
        page: "home",
        displayName: UserDisplayName(req),
    });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplayAboutPage(req, res, next) {
    res.render("index", {
        title: "About Us",
        page: "about",
        displayName: UserDisplayName(req),
    });
}
exports.DisplayAboutPage = DisplayAboutPage;
function DisplayServicesPage(req, res, next) {
    res.render("index", {
        title: "Our Services",
        page: "services",
        displayName: UserDisplayName(req),
    });
}
exports.DisplayServicesPage = DisplayServicesPage;
function DisplayProjectsPage(req, res, next) {
    res.render("index", {
        title: "Our Projects",
        page: "projects",
        displayName: UserDisplayName(req),
    });
}
exports.DisplayProjectsPage = DisplayProjectsPage;
function DisplayContactPage(req, res, next) {
    res.render("index", {
        title: "Contact Us",
        page: "contact",
        displayName: UserDisplayName(req),
    });
}
exports.DisplayContactPage = DisplayContactPage;
function DisplayLoginPage(req, res, next) {
    if (!req.user) {
        return res.render("index", {
            title: "Login",
            page: "login",
            messages: req.flash("loginMessage"),
            displayName: UserDisplayName(req),
        });
    }
    return res.redirect("/contact-list");
}
exports.DisplayLoginPage = DisplayLoginPage;
function DisplayRegisterPage(req, res, next) {
    if (!req.user) {
        return res.render("index", {
            title: "Register",
            page: "register",
            messages: req.flash("registerMessage"),
            displayName: UserDisplayName(req),
        });
    }
    return res.redirect("/contact-list");
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash("loginMessage", "Authentication Error");
            return res.redirect("/login");
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect("/contact-list");
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName,
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash("registerMessage", "Registration Error");
                console.error("Error: User Already Exists");
            }
            return res.redirect("/register");
        }
        return passport_1.default.authenticate("local")(req, res, () => {
            return res.redirect("/contact-list");
        });
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logout();
    res.redirect("/login");
}
exports.ProcessLogoutPage = ProcessLogoutPage;
function ProcessContactPage(req, res, next) {
    res.render("index", {
        title: "Home",
        page: "home",
        displayName: UserDisplayName(req),
    });
}
exports.ProcessContactPage = ProcessContactPage;
//# sourceMappingURL=index.js.map