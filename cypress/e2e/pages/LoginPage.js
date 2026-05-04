export class LoginPage{
    visit(){
        cy.visit('https://www.saucedemo.com/')
    }
    //define variables to not hardcode the values
    username = '[data-test="username"]'
    password = '[data-test="password"]'
    login_button = '[data-test="login-button"]'

    enterUsername(user){
        cy.get(this.username).type(user)
    }

    enterPassword(pass){
        cy.get(this.password).type(pass)
    }
    clickLogin(){
        cy.get(this.login_button).click()
    }
    login(user, pass){
        this.enterUsername(user)
        this.enterPassword(pass)
        this.clickLogin()
    }
}