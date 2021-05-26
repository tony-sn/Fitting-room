$(document).ready(() => {
  let callData = new CallData();

  const renderHTML = () => {
    callData
      .getListData()
      .done((result) => console.log(result))
      .fail((err) => console.log(err));
  };

  renderHTML();
});
