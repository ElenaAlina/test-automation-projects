import {LoginPage} from '../../pages/LoginPage.js'

describe('Cart Test Suite', () => {
    const loginPage = new LoginPage()

    beforeEach(() => {
        cy.fixture('users').then((users) => {
            const user = users.validUser
            
            loginPage.visit()
            loginPage.login(user.username, user.password)
        })
    })

    it('TC05 - Logout after succesfully logged in', () => {
      cy.get('#react-burger-menu-btn').click()   
      cy.get('[data-test="logout-sidebar-link"]').click()
      cy.url().should('include', 'saucedemo.com')
      cy.get('[data-test="login-button"]').should('be.visible')      
    })

})