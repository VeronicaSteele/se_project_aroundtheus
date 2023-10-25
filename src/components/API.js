export default class Api {
  constructor({ headers, baseUrl }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards = async () => {
    try {
      const response = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch initial cards: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error in getInitialCards: ${error.message}`);
    }
  };

  addNewCard = async (card) => {
    try {
      const response = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
        method: "POST",
        body: JSON.stringify(card),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch initial cards: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error in getInitialCards: ${error.message}`);
    }
  };

  deleteCard = async (cardId) => {
    try {
      const response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
        headers: this.headers,
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete card: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error in deleteCard: ${error.message}`);
    }
  };

  likeCard = async (cardId) => {
    try {
      const response = await fetch(`${this.baseUrl}/cards/like/${cardId}`, {
        headers: this.headers,
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`Failed to like the card: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error in likeCard: ${error.message}`);
    }
  };

  removeLike = async (cardId) => {
    try {
      const response = await fetch(`${this.baseUrl}/cards/like/${cardId}`, {
        headers: this.headers,
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to remove like from the card: ${response.status}`
        );
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error in removeLike: ${error.message}`);
    }
  };
}
