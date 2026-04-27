import {CartPage} from '../../pages/CartPage.js'

describe('Cart Test Suite', () => {
    const cartPage = new CartPage()
    beforeEach(() => {
        cy.fixture('users').then((users) => {
            const user = users.validUser
            cy.visit('https://www.saucedemo.com/')

            cy.get('#user-name').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#login-button').click()
        })
    })

    it('Add to cart', () => {   
        cartPage.checkProducts()
        cartPage.clickAddToCart()
        cy.get('.shopping_cart_badge').should('have.text', '1')
            

            

            //cy.get(#add-to-cart-sauce-labs-backpack').click()
            //cy.get('.shopping_cart_badge').should('have.text', '1')

        
        
    })
})