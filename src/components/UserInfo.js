export default class UserInfo {
  constructor({ profileTitle, profileDescription }) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
    this._avatar = avatar;
  }
  getUserInfo() {
    const userInfo = {
      name: this._profileTitle.textContent,
      description: this._profileDescription.textContent,
    };
    return userInfo;
  }
  setUserInfo({ name, description }) {
    this._profileTitle.textContent = name;
    this._profileDescription.textContent = description;
  }
  setAvatarImg(link) {
    this.avatar.src = link;
  }
}
