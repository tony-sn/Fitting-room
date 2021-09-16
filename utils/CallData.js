function CallData() {
  this.getListData = function () {
    return $.getJSON("./assets/data/Data.json")
  }
}
