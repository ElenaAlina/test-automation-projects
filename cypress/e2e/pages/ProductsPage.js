class ProductsPage{
    sortBy(option){
    cy.get('[data-test="product-sort-container"]').select(option)   
    }

    addFirstProductToCart(){
        cy.get('.btn_inventory').first().click()    
    }

    goToCart(){
        cy.get('[data-test="shopping-cart-link"]').click()  
    }
}
export default ProductsPage