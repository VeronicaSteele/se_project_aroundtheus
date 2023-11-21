export default class UserInfo {
  constructor(profileTitle, profileDescription, avatar) {
    console.log("userInfo", avatar);
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

  // TODO: think how can you merge setUserInfo method and setAvatarImg method, in the end of the day one method is better
  setUserInfo({ name, about }) {
    this._profileTitle.textContent = name;
    this._profileDescription.textContent = about;
  }

  setAvatarImg({ avatar }) {
    console.log("test", avatar);
    this._avatar.src = avatar;
  }
}
