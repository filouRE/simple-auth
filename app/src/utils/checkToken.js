export const deleteToken = (removeCookie) => {
  removeCookie("userauth");
  window.location.reload();
};
