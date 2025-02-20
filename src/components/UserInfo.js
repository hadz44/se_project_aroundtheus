export default class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
  }
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.description;
  }
  setAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}
