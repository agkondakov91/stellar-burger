import loginMock from '../fixtures/login.json';

describe('Тест Burger Constructor', function () {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

  describe('[Тест]: добавление ингредиентов', () => {
    it('Добавить булку в заказ', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]')
        .find('button')
        .click({ force: true });
      cy.get('[data-cy="orderBun"]').should(
        'contain',
        'Краторная булка N-200i'
      );
      cy.get('.counter__num').should('contain', '2');
    });

    it('Добавить начинку в заказ', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]')
        .find('button')
        .click({ force: true });
      cy.get('[data-cy="orderMain"]').should(
        'contain',
        'Филе Люминесцентного тетраодонтимформа'
      );
      cy.get('.counter__num').should('contain', '1');
    });
  });

  describe('[Тест]: проверка работы модального окна', () => {
    it('Открыть/закрыть модальное окно [клик на кнопку]', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa093f"]').click();
      cy.get('#modals').find('button').click();
    });

    it('Открыть/закрыть модальное окно [клик на оверлей]', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa0948"]').click();
      cy.get('[data-cy="modalOverlay"]').click({ force: true });
    });

    it('Проверить данные выбранного ингредиента', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa094a"]').click();
      cy.get('[data-cy="modalInfo"]').should(
        'contain.text',
        'Сыр с астероидной плесенью'
      );
      cy.get('[data-cy="modalInfo"]').should('contain.text', 'Белки, г');
      cy.get('[data-cy="modalInfo"]').should('contain.text', '84');
    });
  });

  describe('[Тест]: создание заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', loginMock.accessToken);
      localStorage.setItem('refreshToken', loginMock.refreshToken);
    });

    it('Авторизация пользователя', () => {
      cy.get('[data-cy="login"]').click();
      cy.get(
        ':nth-child(1) > .input__container > .input > .input__placeholder'
      ).type('alextest001@mail.com');
      cy.get(
        ':nth-child(2) > .input__container > .input > .input__placeholder'
      ).type('Qwerty12345');
      cy.get('button').contains('Войти').click();
      cy.get('[data-cy="login"]').should('contain.text', loginMock.user.name);
    });

    it('Создать заказ авторизованного пользователя', () => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
      cy.visit('http://localhost:4000/');

      cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]')
        .find('button')
        .click({ force: true });
      cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]')
        .find('button')
        .click({ force: true });
      cy.get('[data-cy="643d69a5c3f7b9001cfa0947"]')
        .find('button')
        .click({ force: true });

      cy.contains('Оформить заказ').click();
      cy.get('#modals').contains('41002');
      cy.get('#modals').find('button').click();
      cy.get('[data-cy="price"]').should('contain.text', '0');
    });

    afterEach(() => {
      cy.clearCookies();
      localStorage.clear();
    });
  });
});
