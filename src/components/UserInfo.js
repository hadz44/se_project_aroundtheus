import { data } from "autoprefixer";

export default class UserInfo {
  constructor({ nameElement, jobElement, setAvatar }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._setAvatar = document.querySelector(setAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
      avatar: this._setAvatar.src,
    };
  }
  setUserInfo(data) {
    this._nameElement.textContent = data.title;
    this._jobElement.textContent = data.description;
  }

  setAvatar(data) {
    this._setAvatar.src = data.avatar;
  }

  setAvatar(data)
  this._setAvatar = data.name
}
