export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _renderResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfoAndCards() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
    return this._renderResult(res);
  }

  async addCard({ name, link }) {
    if (!name || !link) {
      return Promise.reject("Error: 'name' and 'link' are required fields.");
    }

    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    return this._renderResult(res);
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
    return this._renderResult(res);
  }

  async updateUserInfo({ title, description }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    });
    return this._renderResult(res);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._renderResult);
  }

  async likeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._renderResult(res);
  }

  async dislikeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._renderResult(res);
  }

  async updateAvatar({ url }) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    });
    return this._renderResult(res);
  }
}
