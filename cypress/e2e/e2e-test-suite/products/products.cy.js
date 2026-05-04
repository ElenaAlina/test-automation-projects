import {LoginPage} from '../../pages/LoginPage.js'
import {CartPage} from '../../pages/CartPage.js'
import ProductsPage from '../../pages/ProductsPage.js'

describe('Products Test Suite', () => {
    const loginPage = new LoginPage()
    const cartPage = new CartPage()
    const productsPage = new ProductsPage()

    beforeEach(() => {
        cy.fixture('users').then((users) => {
            const user = users.validUser
            
            loginPage.visit()
            loginPage.login(user.username, user.password)

            cy.url().should('include', 'inventory.html')
        })
    })

    it('TC09 - Sorting Products', () => { 
        cy.get('[data-test="product-sort-container"]').should('be.visible')  
        
        productsPage.sortBy('az')
        cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Backpack')

        productsPage.sortBy('za')
        cy.get('.inventory_item_name').first().should('have.text', 'Test.allTheThings() T-Shirt (Red)')

        productsPage.sortBy('lohi')
        cy.get('.inventory_item_price').first().should('have.text', '$7.99')

        productsPage.sortBy('hilo')
        cy.get('.inventory_item_price').first().should('have.text', '$49.99')

    })

    it('TC10 - View product\'s page', () => {   

        cy.get('[data-test="product-sort-container"]').select('az')
        cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Backpack')
        
        //access an item page
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click()

        //check if the ordinary elemnts are displayed on the page
        cy.get('.app_logo').should('be.visible')
        cy.get('[data-test="shopping-cart-link"]').should('be.visible')
        cy.get('[data-test="back-to-products"]').should('be.visible')
        cy.get('[data-test="inventory-item-name"]').should('be.visible')
        cy.get('[data-test="inventory-item-desc"]').should('be.visible')
        cy.get('[data-test="inventory-item-price"]').should('be.visible')

        //visible and functional add & remove buttons
        cy.get('[data-test="add-to-cart"]').should('be.visible').click()
        cy.get('[data-test="remove"]').should('be.visible').click()

        //functional Back to products button
        cy.get('[data-test="back-to-products"]').click()
        cy.url().should('include', 'inventory.html')
    })

})