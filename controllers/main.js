$(document).ready(() => {
  let callData = new CallData();

  const renderHTML = () => {
    callData
      .getListData()
      .done((result) => {
        console.log(result.navPills);
        console.log(result.tabPanes);
        let contentNavPills = "";
        let contentTabPanes = "";
        result.navPills.forEach((item, index) => {
          let activeClass = item.tabName === "tabTopClothes" ? "active" : "";
          let fadeClass = item.tabName !== "tabTopClothes" ? "fade" : "";

          contentNavPills += getElmTabPill(item, activeClass);
          contentTabPanes += `
          <div class ="tab-pane container ${fadeClass} ${activeClass}" id="${
            item.tabName
          }">
            <div class="row">
              ${renderTabPane(item.tabName, result.tabPanes)}
            </div>
          </div>
          `;
        });

        $(".nav-pills").html(contentNavPills);
        $(".tab-content").html(contentTabPanes);
      })
      .fail((err) => console.log(err));
  };

  const getElmTabPill = (item, activeClass) => {
    return `
    <li class ="nav-item">
      <a class ="nav-link ${activeClass} btn-default" data-toggle="pill" href="#${item.tabName}">${item.showName}</a>
    </li>
    `;
  };

  const getTypeArr = (tabType, data) => {
    let tempArr = [];
    data.forEach((item) => {
      if (item.type === tabType) {
        tempArr.push(item);
      }
    });
    return tempArr;
  };

  const getElmItem = (tempArr) => {
    let elmItem = "";
    tempArr.forEach(function (item) {
      elmItem += `
      <div class="col-md-3">
        <div class="card text-center">
        <img src="${item.imgSrc_jpg}">
        <h4><b>${item.name}</b></h4>
        <button class="changeStyle">Change</button>
        </div>
      </div>
      `;
    });
    return elmItem;
  };

  const renderTabPane = (tabName, arrayTabPane) => {
    let tempArr = null;
    let elmItem = null;
    switch (tabName) {
      case "tabTopClothes":
        tempArr = getTypeArr("topclothes", arrayTabPane);
        elmItem = getElmItem(tempArr);
        break;

      case "tabBotClothes":
        tempArr = getTypeArr("botclothes", arrayTabPane);
        elmItem = getElmItem(tempArr);
        break;

      case "tabShoes":
        tempArr = getTypeArr("shoes", arrayTabPane);
        elmItem = getElmItem(tempArr);
        break;

      case "tabHandBags":
        tempArr = getTypeArr("handbags", arrayTabPane);
        elmItem = getElmItem(tempArr);
        break;

      case "tabNecklaces":
        tempArr = getTypeArr("necklaces", arrayTabPane);
        elmItem = getElmItem(tempArr);
        break;

      case "tabHairStype":
        tempArr = getTypeArr("hairstyle", arrayTabPane);
        elmItem = getElmItem(tempArr);
        break;

      case "tabBotClothes":
        break;

      default:
        tempArr = getTypeArr("background", arrayTabPane);
        elmItem = getElmItem(tempArr);

        break;
    }
    return elmItem;
  };

  renderHTML();
});
