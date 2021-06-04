$(document).ready(() => {
  let callData = new CallData();
  let listChosen = new ListChosen();

  const renderHTML = () => {
    callData
      .getListData()
      .done((result) => {
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

  renderHTML();

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
        <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}" data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}" data-imgsrcpng="${item.imgSrc_png}" class="changeStyle">Change</button>
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

      case "tabHairStyle":
        tempArr = getTypeArr("hairstyle", arrayTabPane);
        elmItem = getElmItem(tempArr);
        break;

      default:
        tempArr = getTypeArr("background", arrayTabPane);
        elmItem = getElmItem(tempArr);

        break;
    }
    return elmItem;
  };

  const findIndex = (type) => {
    let index = -1;

    if (listChosen.arr && listChosen.arr.length > 0) {
      listChosen.arr.forEach((item, i) => {
        if (item.type === type) {
          index = i;
        }
      });
    }
    return index;
  };

  $("body").delegate(".changeStyle", "click", function () {
    let id = $(this).data("id");
    let type = $(this).data("type");
    let name = $(this).data("name");
    let desc = $(this).data("desc");
    let imgSrc_jpg = $(this).data("imgsrcjpg");
    let imgSrc_png = $(this).data("imgsrcpng");

    let choseItem = new ChoseItem(id, type, name, desc, imgSrc_jpg, imgSrc_png);

    let index = findIndex(choseItem.type);
    if (index !== -1) {
      listChosen.arr[index] = choseItem;
    } else listChosen.addItem(choseItem);

    renderContain(listChosen.arr);
  });

  function renderContain(chosenItems) {
    if (chosenItems && chosenItems.length > 0) {
      console.log(chosenItems);
      chosenItems.forEach((item) => {
        switch (item.type) {
          case "topclothes":
            renderBikiniTop(item.imgsrc_png);
            break;

          case "botclothes":
            renderBikiniBot(item.imgsrc_png);
            break;

          case "shoes":
            renderShoes(item.imgsrc_png);
            break;

          case "handbags":
            renderHandbags(item.imgsrc_png);
            break;

          case "necklaces":
            renderNecklaces(item.imgsrc_png);
            break;

          case "hairstyle":
            renderHairStyle(item.imgsrc_png);
            break;

          default:
            renderBackground(item.imgsrc_png);
            break;
        }
      });
    }
  }

  function renderBikiniTop(img) {
    $(".bikinitop").css({
      width: "500px",
      height: "500px",
      background: `url(${img})`,
      position: "absolute",
      top: "-9%",
      left: "-5%",
      zIndex: "3",
      transform: "scale(0.5)",
    });
  }

  function renderBikiniBot(img) {
    $(".bikinibottom").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-30%",
      left: "-5%",
      zIndex: "2",
      transform: "scale(0.5)",
    });
  }

  function renderShoes(img) {
    $(".feet").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-37%",
      right: "-3.5%",
      zIndex: "1",
      transform: "scale(0.5)",
    });
  }
  function renderHandbags(img) {
    $(".handbag").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      zIndex: "4",
      transform: "scale(0.5)",
    });
  }

  function renderNecklaces(img) {
    $(".necklace").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      zIndex: "4",
      transform: "scale(0.5)",
    });
  }
  function renderHairStyle(img) {
    $(".hairstyle").css({
      width: "1000px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-75%",
      right: "-57%",
      zIndex: "4",
      transform: "scale(0.15)",
    });
  }

  function renderBackground(img) {
    $(".background").css({
      backgroundImage: `url(${img})`,
    });
  }
});
