describe('e2e test of grades list', () => {
  before(() => {
    cy.visit('/grades')
  });

  it('the page should contain table with correct grades list', () => {
    // Note that here we check this data to be on the webpage because we know that JSONBin will return it
    // In a real-world app we would stub the server response here
    const expectedData = [
      ['Thomas Wesley Pentz', 'Electro house music', new Date('2018-11-22T00:00:00.000Z').toLocaleDateString(), 'A'],
      ['Sonny John Moore', 'Dubstep music', new Date('2012-08-12T00:00:00.000Z').toLocaleDateString(), 'A'],
      ['Sonny John Moore', 'Rock music', new Date('2018-10-09T00:00:00.000Z').toLocaleDateString(), 'D'],
      ['Marshall Bruce Mathers', 'Hip-hop music', new Date('2000-11-02T00:00:00.000Z').toLocaleDateString(), 'A']
    ];

    cy.get('[data-test="grades-page"] table tbody tr').as('rows');

    expectedData.forEach((rowData, i) => {
      rowData.forEach((cellData) => {
        cy.get('@rows')
          .eq(i)
          .find('td')
          .contains(cellData);
      });
    });
  });

  it('adding of a new grade record should work properly', () => {
    const newGrade = {
      studentId: '5',
      profession: 'Electro house music',
      testDate: '2015-02-07T00:00:00.000Z',
      grade: 'B',
    };

    cy.get('[data-test="btn-add-grade-record"]').click();
    cy.get('[data-test="grades-data-form-studentId"]').select(newGrade.studentId);
    cy.get('[data-test="grades-data-form-profession"]').type(newGrade.profession);
    cy.get('[data-test="grades-data-form-testDate"]').type(newGrade.testDate.split('T')[0]);
    cy.get('[data-test="grades-data-form-grade"]').select(newGrade.grade);
    cy.get('[data-test="grades-data-btn-submit"]').click();

    cy.get('[data-test="grades-page"] table tbody td').contains(newGrade.studentId);
    cy.get('[data-test="grades-page"] table tbody td').contains(newGrade.profession);
    cy.get('[data-test="grades-page"] table tbody td').contains(new Date(newGrade.testDate).toLocaleDateString());
    cy.get('[data-test="grades-page"] table tbody td').contains(newGrade.grade);
  });

  it('editing of a grade record should work properly', () => {
    const editedGrade = {
      studentId: '2',
      profession: 'Trap music',
      testDate: '2018-03-17T00:00:00.000Z',
      grade: 'A',
    };

    cy.get('[data-test="btn-edit-grade-record"]').eq(0).click();
    cy.get('[data-test="grades-data-form-studentId"]').select(editedGrade.studentId);
    cy.get('[data-test="grades-data-form-profession"]').clear().type(editedGrade.profession);
    cy.get('[data-test="grades-data-form-testDate"]').clear().type(editedGrade.testDate.split('T')[0]);
    cy.get('[data-test="grades-data-form-grade"]').select(editedGrade.grade);
    cy.get('[data-test="grades-data-btn-submit"]').click();

    cy.get('[data-test="grades-page"] table tbody td').contains(editedGrade.studentId);
    cy.get('[data-test="grades-page"] table tbody td').contains(editedGrade.profession);
    cy.get('[data-test="grades-page"] table tbody td').contains(new Date(editedGrade.testDate).toLocaleDateString());
    cy.get('[data-test="grades-page"] table tbody td').contains(editedGrade.grade);
  });

  it('deleting of a grade record should work properly', () => {
    cy.get('[data-test="grades-page"] table tbody tr').then($initialRows => {
      const initialRowsLength = $initialRows.length;

      cy.get('[data-test="btn-delete-grade-record"]').eq(0).click();

      cy.get('[data-test="grades-page"] table tbody tr').then(($changedRows) => {
        expect($changedRows.length).to.eq(initialRowsLength - 1);
      });
    });
  });
});
