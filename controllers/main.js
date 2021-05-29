$(document).ready(() => {
  let callData = new CallData();

  const renderHTML = () => {
    callData
      .getListData()
      .done((result) => {
        console.log(result.navPills);
        let contentNavPills = "";
        let contentTabPanes = "";
        result.navPills.forEach((item, index) => {
          let activeClass = item.tabName === "tabTopClothes" ? "active" : "";
          let fadeClass = item.tabName !== "tabTopClothes" ? "fade" : "";

          contentNavPills += getElmTabPill(item, activeClass);
          contentTabPanes += `
          <div class ="tab-pane container ${activeClass} ${fadeClass}" id="${item.tabName}">
            <div class="row">
              ${item.showName}
            </div>          
          </div>
          `;
        });

        $(".nav-pills").html(contentNavPills);
        $(".tab-content").html(contentTabPanes);
      })
      .fail((err) => console.log(err));
  };

  renderHTML();

  const getElmTabPill = (item, activeClass) => {
    return `
    <li class ="nav-item">
      <a class ="nav-link ${activeClass} btn-default" data-toggle="pill" href="${item.tabName}">${item.showName}</a>   
    </li>
    `;
  };
});
