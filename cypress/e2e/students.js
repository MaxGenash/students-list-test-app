import { getExpiredYears } from "../../src/utils";

describe('e2e test of students list', () => {
  before(() => {
    cy.visit('/students')
  });

  it('the page should contain table with correct students list', () => {
    // Note that here we check this data to be on the webpage because we know that JSONBin will return it
    // In a real-world app we would stub the server response here
    const expectedData = [
      [
        'Marshall Bruce',
        'Mathers',
        getExpiredYears(new Date('1972-10-17T00:00:00.000Z')),
        new Date('1972-10-17T00:00:00.000Z').toLocaleDateString()
      ],
      [
        'Sonny John',
        'Moore',
        getExpiredYears(new Date('1988-01-15T00:00:00.000Z')),
        new Date('1988-01-15T00:00:00.000Z').toLocaleDateString()
      ],
      [
        'Thomas Wesley',
        'Pentz',
        getExpiredYears(new Date('1978-11-10T00:00:00.000Z')),
        new Date('1978-11-10T00:00:00.000Z').toLocaleDateString()
      ]
    ];

    cy.get('[data-test="students-page"] table tbody tr').as('rows');

    expectedData.forEach((rowData, i) => {
      rowData.forEach((cellData) => {
        cy.get('@rows')
          .eq(i)
          .find('td')
          .contains(cellData);
      });
    });
  });

  it('adding of a new student record should work properly', () => {
    const newStudent = {
      firstName: 'David',
      lastName: 'Guetta',
      birthdayDate: '1967-11-07T00:00:00.000Z'
    };

    cy.get('[data-test="btn-add-student-record"]').click();
    cy.get('[data-test="students-data-form-firstName"]').type(newStudent.firstName);
    cy.get('[data-test="students-data-form-lastName"]').type(newStudent.lastName);
    cy.get('[data-test="students-data-form-birthdayDate"]').type(newStudent.birthdayDate.split('T')[0]);
    cy.get('[data-test="students-data-btn-submit"]').click();

    cy.get('[data-test="students-page"] table tbody td').contains(newStudent.firstName);
    cy.get('[data-test="students-page"] table tbody td').contains(newStudent.lastName);
    cy.get('[data-test="students-page"] table tbody td').contains(new Date(newStudent.birthdayDate).toLocaleDateString());
  });

  it('editing of a student record should work properly', () => {
    const editedStudent = {
      firstName: 'Nicki',
      lastName: 'Minaj',
      birthdayDate: '1982-12-08T00:00:00.000Z'
    };

    cy.get('[data-test="btn-edit-student-record"]').eq(0).click();
    cy.get('[data-test="students-data-form-firstName"]').clear().type(editedStudent.firstName);
    cy.get('[data-test="students-data-form-lastName"]').clear().type(editedStudent.lastName);
    cy.get('[data-test="students-data-form-birthdayDate"]').clear().type(editedStudent.birthdayDate.split('T')[0]);
    cy.get('[data-test="students-data-btn-submit"]').click();

    cy.get('[data-test="students-page"] table tbody td').contains(editedStudent.firstName);
    cy.get('[data-test="students-page"] table tbody td').contains(editedStudent.lastName);
    cy.get('[data-test="students-page"] table tbody td').contains(new Date(editedStudent.birthdayDate).toLocaleDateString());
  });

  it('deleting of a student record should work properly', () => {
    cy.get('[data-test="students-page"] table tbody tr').then($initialRows => {
      const initialRowsLength = $initialRows.length;

      cy.get('[data-test="btn-delete-student-record"]').eq(0).click();

      cy.get('[data-test="students-page"] table tbody tr').then(($changedRows) => {
        expect($changedRows.length).to.eq(initialRowsLength - 1);
      });
    });
  });
});
