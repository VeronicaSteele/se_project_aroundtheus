export default class Api {
  constructor({ headers, baseUrl }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  static async sendRequest(url, method, headers, body) {
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Request error: ${error.message}`);
    }
  }

  getInitialCards = async () => {
    const url = `https://around-api.en.tripleten-services.com/v1/cards`;
    return Api.sendRequest(url, "GET", this.headers);
  };

  addNewCard = async (card) => {
    const url = `https://around-api.en.tripleten-services.com/v1/cards`;
    return Api.sendRequest(url, "POST", this.headers, card);
  };

  deleteCard = async (cardId) => {
    const url = `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`;
    return Api.sendRequest(url, "DELETE", this.headers);
  };

  likeCard = async (cardId) => {
    const url = `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`;
    return Api.sendRequest(url, "POST", this.headers);
  };

  removeLike = async (cardId) => {
    const url = `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`;
    return Api.sendRequest(url, "DELETE", this.headers);
  };

  updateAvatar = async (avatarData) => {
    const url = `https://around-api.en.tripleten-services.com/v1/users/me/avatar`;
    return Api.sendRequest(url, "PATCH", this.headers, avatarData);
  };
}
