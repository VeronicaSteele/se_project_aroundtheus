export default class Api {
  constructor({ headers, baseUrl }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(response) {
    if (!response.ok) {
      console.error(
        `HTTP error! Status: ${response.status}, Text: ${response.statusText}`
      );
      throw new Error(
        `HTTP error! Status: ${response.status}, Text: ${response.statusText}`
      );
    }
    return response.json();
  }
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, { headers: this.headers });
  }

  addNewCard(data) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardid) {
    return this._request(`${this.baseUrl}/cards/${cardid}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  likeCard = (cardid) => {
    return this._request(`${this.baseUrl}/cards/${cardid}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  };

  removeLike(cardid) {
    return this._request(`${this.baseUrl}/cards/${cardid}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  }
  editUserInfo(values) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    });
  }

  updateAvatar(image) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: image,
      }),
    });
    // .catch((error) => {
    //   console.error("Error updating avatar:", error);
    //   throw error;
    // });
  }
}
