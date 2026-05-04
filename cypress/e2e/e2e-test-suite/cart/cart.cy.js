import {LoginPage} from '../../pages/LoginPage.js'
import {CartPage} from '../../pages/CartPage.js'
import ProductsPage from '../../pages/ProductsPage.js'

describe('Cart Test Suite', () => {
    const loginPage = new LoginPage()
    const cartPage = new CartPage()
    const productsPage = new ProductsPage()

    beforeEach(() => {
        cy.fixture('users').then((users) => {
            const user = users.validUser
            
            loginPage.visit()
            loginPage.login(user.username, user.password)
        })
    })

    it('TC06 - Cart UI flow', () => {   
        cartPage.checkProducts()
        cartPage.clickAddToCart()
        cy.get('.shopping_cart_badge').should('have.text', '1')

        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_badge').should('have.text','2')

        productsPage.goToCart()
        cy.get('[data-test="continue-shopping"]').should('be.visible').click()

        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('.shopping_cart_badge').should('have.text','3')
        cy.wait(2000)

        cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('.shopping_cart_badge').should('have.text','2')
        cy.wait(2000)

        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
        cy.get('.shopping_cart_badge').should('have.text','3')

        productsPage.goToCart()
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()

        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('not.exist')
        cy.get('[data-test="shopping-cart-badge"]')
            .should('be.visible')
            .and('have.text','2')
            
    })
    it('TC07 - Checkout process', () => {
        //check the products and add an item to the cart
        cartPage.checkProducts()
        cartPage.clickAddToCart()
        cy.get('.shopping_cart_badge').should('have.text', '1')
        
        //click on the cart and proceed to checkout
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').should('be.visible').click()
        
        //add the checkout information and cancel the process
        cy.get('[data-test="firstName"]').type('Andrew')
        cy.get('[data-test="lastName"]').type('Doe')
        cy.get('[data-test="postalCode"]').type('12345')
        cy.get('[data-test="cancel"]').should('be.visible').click()

        //click on the cart and proceed to checkout
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').should('be.visible').click()

        //add the checkout information and continue the process
        cy.get('[data-test="firstName"]').type('Mark')
        cy.get('[data-test="lastName"]').type('Poe')
        cy.get('[data-test="postalCode"]').type('56789')
        cy.get('[data-test="continue"]').should('be.visible').click()

        //finish the checkout process and verify the order completion
        cy.get('[data-test="finish"]').should('be.visible').click()
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('cart_item').should('have.length','0')
    })

    it('TC08 - Cart badge correct behavior', () => {
        //Cart badge validation
        cy.url().should('include', 'inventory.html')
        cy.get('.btn_inventory').first().click()
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_item').should('have.length', 1)

        //Cart badge increments correctly
        cy.get('[data-test="continue-shopping"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('.cart_item').should('have.length', 2)
        cy.get('[data-test="continue-shopping"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('.cart_item').should('have.length', 4)

        //Cart badge decrements correctly
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('.cart_item').should('have.length', 3)
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
        cy.get('.cart_item').should('have.length', 1)

        //Cart persists after navigation
        cy.get('[data-test="continue-shopping"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('.cart_item').should('have.length', 4)
        cy.get('.app_logo').click()
        cy.get('[data-test="continue-shopping"]').click()
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click()
        cy.get('[data-test="inventory-item-desc"]').should('be.visible')
        cy.get('[data-test="back-to-products"]').click()
        cy.get('[data-test="item-3-title-link"] > [data-test="inventory-item-name"]').click()
        cy.get('[data-test="back-to-products"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('.cart_item').should('have.length', 4)


    })

})