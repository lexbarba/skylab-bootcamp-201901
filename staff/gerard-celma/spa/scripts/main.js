var loginPanel = new LoginPanel
// var welcomePanel = new WelcomePanel
// var registerPanel = new RegisterPanel

var $body = $(document.body);

$body.append(loginPanel.$element);
// document.body.appendChild(welcomePanel.element);
// document.body.appendChild(registerPanel.element);

// loginPanel.clickRegister = function() {
//     loginPanel.hide();
//     registerPanel.show();
// };

loginPanel.onLogin = function(email, password) {
    try {
        logic.login(email, password, function(user) {
            loginPanel.hide();

            welcomePanel.user = user;
            welcomePanel.show();
        });
    } catch(err) {
        loginPanel.error = err.message;
    }
};

// welcomePanel.onLogout = function() {
//     welcomePanel.hide();
//     loginPanel.clear();
//     loginPanel.show();
// };

// registerPanel.clickLogin = function() {
//     registerPanel.hide();
//     loginPanel.show();
//     loginPanel.clear();
// };

// registerPanel.onRegister = function(name,surname,email,password,passwordConf) {
//     debugger
//     try {
//         register(name,surname,email,password,passwordConf, function() {
//             registerPanel.hide();
//             loginPanel.show();
//             registerPanel.clear();
//         });
//     } catch(err) {
//         registerPanel.error = err.message;
//     }
// };


// var loginPanel2 = new LoginPanel

// document.body.appendChild(loginPanel2.element);

// loginPanel2.onLogin = function(email, password) {
//     console.log('llama a otra logica', email, password);
// };


// var mainPanel = new Panel

// var registerPanel = new RegisterPanel
// var welcomePanel = new WelcomePanel

// mainPanel.add(loginPanel)
// mainPanel.add(registerPanel)
// mainPanel.add(welcomePanel)

// loginPanel.onLogin = function() {}

// ...
