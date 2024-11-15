export default class UserInfo {
  constructor({ userName, userJob }) {
    this.username = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
  }

  getUserInfo() {
    this.userInfo = {
      modalTitle: this.username.textContent,
      description: this.userJob.textContent,
    };
    return this.userInfo;
  }

  setUserInfo({ modalTitle, description }) {
    this.username.textContent = modalTitle;
    this.userjob.textContent = description;
  }
}
