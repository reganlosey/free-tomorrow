describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should have a sample test', () => {
    expect(true).to.equal(true)
  })


  it('should display the site\s name and intro text', () => {
    cy.get('.welcome-txt')
    .get('h1').contains('Free Tomorrow?')
    .get('h2').contains('An app that helps you get your travel plans out of the air and onto the ground.')
  })

  it('should have an image of travel aliens', () => {
    cy.get('.aliens-img')
    .should('have.attr', 'src', '/static/media/travel_aliens.23f539de23e82df94967.png')
  })

  it('should have a button to start the trip creation process', () => {
    cy.get('.start-btn')
    .contains('Let\'s get started')
  })

  it('should link to the schedule page on click of start button', () => {
    cy.get('.start-btn')
    .click()
    cy.url('eq','http://localhost:3000/schedule')
    cy.get('welcome-container')
    .should('not.exist')
  })
})