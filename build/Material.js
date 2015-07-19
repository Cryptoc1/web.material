/**
  Material.js - Material design on the web.
  http://github.com/cryptoc1/Web.Material
  @Author: Samuel Steele (Cryptoc1), Cryyptocosm Developers
**/

var Material = {};

Material.version = '0.0.5';

//Accent Color
Material.backgroundColor = '#F5F5F5';
Material.accentColor = '#00E676';

// [url]/index.html#cards
Material.card = {};
/*
Material.initCards = function () {
    var drags = document.querySelectorAll('.material-card');
[].forEach.call(drags, function (drag) {
        drag.addEventListener('dragstart', Material.cardDragStart, false);
        drag.addEventListener('mousedown', Material.cardMousedown, false);
        drag.addEventListener('drag', Material.cardDragged, false);
        drag.addEventListener('dragend', Material.cardDragEnd, false);
        drag.addEventListener('drop', Material.cardDragEnd, false);
    });
};
Material.cardDragStart = function (e) {
    e.srcElement.style.position = 'absolute';
    e.dataTransfer.setData('text/plain', null);
};
Material.cardMousedown = function (e) {
    Material.card.mouseOffsetX = e.offsetX;
    Material.card.mouseOffsetY = e.offsetY;
};
Material.cardDragEnd = function (e) {
    e.srcElement.style.left = e.pageX - Material.card.mouseOffsetX;
    e.srcElement.style.top = e.pageY - Material.card.mouseOffsetY;
    e.preventDefault();
};
Material.cardDragged = function (e) {
    e.srcElement.style.left = e.pageX - Material.card.mouseOffsetX - 30;
    e.srcElement.style.top = e.pageY - Material.card.mouseOffsetY - 30;
};
*/
Material.card.create = function (config) {
    var parent = document.getElementById(config.parent),
        card = document.createElement('div'),
        cardHeading = document.createElement('div'),
        cardContent = document.createElement('div');
    card.className = 'material-card';
    if (config.title)
        card.title = config.heading;
    cardHeading.className = 'material-card-heading';
    cardContent.className = 'material-card-content';
    cardHeading.innerHTML = config.heading;
    if (config.indent)
        cardContent.style.textIndent = '20px';
    cardContent.innerHTML = config.content;
    card.appendChild(cardHeading);
    card.appendChild(cardContent);
    parent.appendChild(card);
};

// [url]/index.html#dialogs
Material.dialog = {};
Material.dialog.open = function (id) {
    var dialog = document.getElementById(id),
        overlay = document.body.getElementsByClassName('material-dialog-overlay');
    dialog.style.top = (window.innerHeight / 2) - (248 / 2);
    dialog.style.left = (window.innerWidth / 2) - (368 / 2);
    overlay[0].style.visibility = 'visible';
    dialog.style.visibility = 'visible';
};
Material.dialog.close = function (el) {
    var dialog = document.getElementById(el.parentElement.parentElement.id),
        overlay = document.body.getElementsByClassName('material-dialog-overlay');
    overlay[0].style.visibility = 'hidden';
    dialog.style.visibility = 'hidden';
};

// [url]/index.html#lists
Material.list = {};
Material.list.create = function (config) {
    var list = document.getElementById(config.id);
    var listItem = document.createElement('div');
    listItem.className = 'material-list-item';
    var avatar = document.createElement('div');
    avatar.className = 'material-list-avatar';
    var content = document.createElement('div');
    content.className = 'material-list-content';
    var heading = document.createElement('div');
    heading.className = 'material-list-heading';
    heading.innerHTML = config.heading;
    content.appendChild(heading);
    var secondary = document.createElement('div');
    secondary.className = 'material-list-secondary';
    secondary.innerHTML = config.secondary;
    content.appendChild(secondary);
    listItem.appendChild(avatar)
    listItem.appendChild(content);
    if (config.dividers) {
        var divider = document.createElement('hr');
        list.appendChild(listItem);
        list.appendChild(divider);
    } else {
        list.appendChild(listItem);
    }
}
Material.list.sort = function (config) {
    var list = document.getElementById(config.id);
    var items = [];
    if (config.dividers == false) {
        var divider = document.createElement('null');
    } else {
        var divider = document.createElement('hr')
    }
    for (var i = 0; i < list.children.length; i++) {
        if (list.children[i].hasAttribute('name'))
            items.push(list.children[i]);
    }
    list.innerHTML = "";
    var sorted = items.sort(function (a, b) {
        if (a.getAttribute('name') < b.getAttribute('name')) return -1;
        if (a.getAttribute('name') > b.getAttribute('name')) return 1;
        return 0;
    });
    for (var i = 1; i < items.length; i += 2) {
        items.splice(i, 0, divider)
    }
    if (config.descending) {
        items = items.reverse();
        for (var i = 0; i < items.length; i++)
            list.appendChild(items[i]);

    } else {
        for (var i = 0; i < items.length; i++)
            list.appendChild(items[i]);
    }
}

//  [url]/index.html#grids
Material.grid = {};
Material.grid.init = function () {
    var grids = document.querySelectorAll('.material-grid');
    for (var i = 0; i < grids.length; i++) {
        var gridWidth = parseInt(grids[i].style.width);
        var columns = parseInt(grids[i].getAttribute('columns'));
        var cellWidth = gridWidth / columns;
        var wrapperWidth = cellWidth * columns + (4 * columns);
        grids[i].children[0].style.width = wrapperWidth;
        for (var j = 0; j < grids[i].children[0].children.length; j++) {
            grids[i].children[0].children[j].style.width = cellWidth - 4;
            grids[i].children[0].children[j].style.height = grids[i].getAttribute('cell-height');
        }
    }
}
Material.grid.sort = function (config) {
    var grid = document.getElementById(config.id);
    var cells = [];
    for (var i = 0; i < grid.children[0].children.length; i++) {
        if (grid.children[0].children[i].hasAttribute('name'))
            cells.push(grid.children[0].children[i]);
    }
    var sorted = cells.sort(function (a, b) {
        if (a.getAttribute('name') < b.getAttribute('name')) return -1;
        if (a.getAttribute('name') > b.getAttribute('name')) return 1;
        return 0;
    });
    if (config.descending) {
        cells = cells.reverse();
        for (var i = 0; i < cells.length; i++)
            grid.appendChild(cells[i]);

    } else {
        for (var i = 0; i < cells.length; i++)
            grid.appendChild(cells[i]);
    }
}
Material.grid.create = function (config) {
    var grid = document.getElementById(config.id);
    var wrapper = grid.children[0];
    var cell = document.createElement('div');
    cell.className = 'material-grid-cell';
    cell.innerHTML = config.content;
    wrapper.appendChild(cell);
    Material.grid.init();
}

// [url]/index.html#menus
Material.menu = {};
Material.menu.open = function (config) {
    var button = document.getElementById(config.button);
    var menu = document.getElementById(config.menu);
    menu.style.transition = 'all ' + config.duration + 's';
    menu.style.position = config.position;
    if (config.reposition) {
        if (config.position == 'relative') {
            var topPos = button.style.top + 24;
            var leftPos = button.clientLeft + 70;
        }
        if (config.position == 'absolute') {
            var topPos = button.style.top + 70;
            var leftPos = button.style.left + 70;
            var absolute = true;
        }
        if (config.position == 'fixed') {
            var topPos = button.offsetTop + 20;
            var leftPos = button.offsetLeft + 40;
            var fixed = true;
        }
    }
    if (fixed && button.offsetLeft > window.innerWidth / 2) {
        if (config.rotation) {
            button.style.transition = 'all ' + config.duration + 's';
            if (menu.style.width === '0px' || menu.style.width === '0' || menu.style.width === 0 || menu.style.width === '') {
                button.style.transform = 'rotate(' + config.deg + 'deg)';
                menu.style.visibility = 'visible';
                menu.style.top = topPos;
                menu.style.right = window.innerWidth - button.offsetLeft - 25;
                menu.style.width = config.width;
                menu.style.height = config.height;
                setTimeout(function () {
                    menu.children[0].style.visibility = 'visible';
                }, config.duration * 1000);
            } else {
                button.style.transform = 'rotate(0deg)';
                menu.style.width = '0px';
                menu.style.height = '0px';
                menu.children[0].style.visibility = 'hidden';
                menu.style.visibility = 'hidden';
            }
        } else {
            if (menu.style.width === '0px' || menu.style.width === '0' || menu.style.width === 0 || menu.style.width === '') {
                menu.style.visibility = 'visible';
                menu.style.top = button.offsetTop + 30;
                menu.style.right = window.innerWidth - button.offsetLeft - 25;
                menu.style.width = config.width;
                menu.style.height = config.height;
                setTimeout(function () {
                    menu.children[0].style.visibility = 'visible';
                }, config.duration * 1000);
            } else {
                menu.style.width = '0px';
                menu.style.height = '0px';
                menu.children[0].style.visibility = 'hidden';
                menu.style.visibility = 'hidden';
            }
        }
    } else if (absolute && button.offsetLeft > button.parentElement.clientWidth / 2) {
        if (config.rotation) {
            button.style.transition = 'all ' + config.duration + 's';
            if (menu.style.width === '0px' || menu.style.width === '0' || menu.style.width === 0 || menu.style.width === '') {
                button.style.transform = 'rotate(' + config.deg + 'deg)';
                menu.style.visibility = 'visible';
                menu.style.top = topPos;
                menu.style.right = button.parentElement.clientWidth - button.offsetLeft - 5;
                menu.style.width = config.width;
                menu.style.height = config.height;
                setTimeout(function () {
                    menu.children[0].style.visibility = 'visible';
                }, config.duration * 1000);
            } else {
                button.style.transform = 'rotate(0deg)';
                menu.style.width = '0px';
                menu.style.height = '0px';
                menu.children[0].style.visibility = 'hidden';
                menu.style.visibility = 'hidden';
            }
        } else {
            if (menu.style.width === '0px' || menu.style.width === '0' || menu.style.width === 0 || menu.style.width === '') {
                menu.style.visibility = 'visible';
                menu.style.top = button.offsetTop + 30;
                menu.style.right = button.parentElement.clientWidth - button.offsetLeft - 5;
                menu.style.width = config.width;
                menu.style.height = config.height;
                setTimeout(function () {
                    menu.children[0].style.visibility = 'visible';
                }, config.duration * 1000);
            } else {
                menu.style.width = '0px';
                menu.style.height = '0px';
                menu.children[0].style.visibility = 'hidden';
                menu.style.visibility = 'hidden';
            }
        }
    } else {
        if (config.rotation) {
            button.style.transition = 'all ' + config.duration + 's';
            if (menu.style.width === '0px' || menu.style.width === '0' || menu.style.width === 0 || menu.style.width === '') {
                button.style.transform = 'rotate(' + config.deg + 'deg)';
                menu.style.visibility = 'visible';
                menu.style.top = topPos;
                menu.style.left = leftPos;
                menu.style.width = config.width;
                menu.style.height = config.height;
                setTimeout(function () {
                    menu.children[0].style.visibility = 'visible';
                }, config.duration * 1000);
            } else {
                button.style.transform = 'rotate(0deg)';
                menu.style.width = '0px';
                menu.style.height = '0px';
                menu.children[0].style.visibility = 'hidden';
                menu.style.visibility = 'hidden';
            }
        } else {
            if (menu.style.width === '0px' || menu.style.width === '0' || menu.style.width === 0 || menu.style.width === '') {
                menu.style.visibility = 'visible';
                menu.style.top = topPos;
                menu.style.left = leftPos;
                menu.style.width = config.width;
                menu.style.height = config.height;
                setTimeout(function () {
                    menu.children[0].style.visibility = 'visible';
                }, config.duration * 1000);
            } else {
                menu.style.width = '0px';
                menu.style.height = '0px';
                menu.children[0].style.visibility = 'hidden';
                menu.style.visibility = 'hidden';
            }
        }
    }
};

//  [url]/index.html#pickers
Material.picker = {
    date: {},
    time: {}
}
Material.picker.init = function () {
    Material.picker.date.init();
}
var date = new Date();
Material.picker.date.init = function () {
    var datePickers = document.querySelectorAll('.material-picker-date');
    for (var i = 0; i < datePickers.length; i++) {
        var newDateEl = document.createElement('div');
        newDateEl.className = 'material-picker-date-date';
        datePickers[i].appendChild(newDateEl);
        var newCalEl = document.createElement('div');
        newCalEl.className = 'material-picker-date-calender';
        datePickers[i].appendChild(newCalEl);
        var newBtnEl = document.createElement('div');
        newBtnEl.className = 'material-picker-date-buttons';
        newBtnEl.innerHTML = '<div class="material-button-flat material-button-flat-disabled" style="color: ' + Material.accentColor + ';">OK</div>\n<div class="material-button-flat" style="color: ' + Material.accentColor + '">Close</div>';
        datePickers[i].appendChild(newBtnEl);
    }
    for (var i = 0; i < datePickers.length; i++) {
        datePickers[i].style.top = (window.innerHeight / 2) - 125;
        datePickers[i].style.left = (window.innerWidth / 2) - 202;
        var dateEl = datePickers[i].children[0];
        var dateDay = document.createElement('div');
        dateDay.className = 'material-picker-date-date-day';
        dateDay.innerHTML = Material.picker.date.getDayString(date.getDay());
        dateEl.appendChild(dateDay);
        var dateMonth = document.createElement('div');
        dateMonth.className = 'material-picker-date-date-month';
        dateMonth.innerHTML = Material.picker.date.getMonthString(date.getMonth());
        dateEl.appendChild(dateMonth);
        var dateDayNum = document.createElement('div');
        dateDayNum.className = 'material-picker-date-date-day-num';
        dateDayNum.innerHTML = date.getDate();
        dateEl.appendChild(dateDayNum);
        var dateYear = document.createElement('div');
        dateYear.className = 'material-picker-date-date-year';
        dateYear.innerHTML = date.getFullYear();
        dateYear.id = 'DDMMyy';
        var mnObj = {
            button: 'DDMMyy',
            menu: 'ddmmYY',
            position: 'fixed',
            reposition: false,
            width: 80,
            height: 180,
            duration: 0.25,
        }
        dateYear.setAttribute('onclick', 'Material.menu.open(' + JSON.stringify(mnObj) + ')');
        dateEl.appendChild(dateYear);
        var dateMenu = document.createElement('div');
        dateMenu.className = 'material-menu';
        dateMenu.id = 'ddmmYY';
        var dateMenuWrapper = document.createElement('div');
        dateMenuWrapper.className = 'material-menu-wrapper';
        for (var i = 1940; i < date.getFullYear() + 21; i++) {
            var dateMenuItem = document.createElement('div');
            dateMenuItem.className = 'material-menu-item';
            dateMenuItem.innerHTML = i;
            dateMenuItem.setAttribute('onclick', 'Material.picker.date.updateYear(' + i + ', ' + JSON.stringify(mnObj) + ')');
            dateMenuWrapper.appendChild(dateMenuItem);
        }
        dateMenu.appendChild(dateMenuWrapper);
        dateMenu.style.position = 'fixed';
        dateMenu.style.left = (window.innerWidth / 2) - 101;
        dateMenu.style.top = (window.innerHeight / 2) + 50;
        dateMenu.style.zIndex = 200;
        document.body.appendChild(dateMenu);

        var cal = datePickers[0].children[1]
        var month = document.createElement('div');
        var days = [];
        for (var i = 1; i < 32; i++)
            days.push(i)
        month.className = 'material-picker-date-calender-month';
        var monthString = Material.picker.date.getMonthString(date.getMonth());
        month.innerHTML = monthString;
        cal.appendChild(month)
        var dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        for (var j = 0; j < 7; j++) {
            var day = document.createElement('div');
            day.className = 'material-picker-date-calender-days';
            day.innerHTML = dayLetters[j];
            cal.appendChild(day)
        }
        date.setDate(1)
        for (var j = 0; j < date.getDay(); j++) {
            var calDate = document.createElement('div');
            calDate.className = 'material-picker-date-calender-date';
            calDate.innerHTML = ' ';
            cal.appendChild(calDate)
        }
        for (var j = 0; j < days.length; j++) {
            var calDate = document.createElement('div');
            calDate.className = 'material-picker-date-calender-date';
            calDate.innerHTML = days[j];
            cal.appendChild(calDate)
        }
    }
}
Material.picker.open = function (id) {
    var picker = document.getElementById(id),
        overlay = document.body.getElementsByClassName('material-dialog-overlay');
    picker.style.top = (window.innerHeight / 2) - 125;
    picker.style.left = (window.innerWidth / 2) - 202;
    overlay[0].style.visibility = 'visible';
    picker.style.visibility = 'visible';
};
Material.picker.close = function (id) {
    var picker = document.getElementById(id),
        overlay = document.body.getElementsByClassName('material-dialog-overlay');
    picker.style.visibility = 'hidden';
    overlay[0].style.visibility = 'hidden';
};
Material.picker.date.updateYear = function (y, config) {
    Material.menu.open(config)
    date.setFullYear(y)
    console.log(y)
};
Material.picker.date.getMonthString = function (monthInt) {
    switch (monthInt) {
    case 0:
        return 'January';
        break;
    case 1:
        return 'February';
        break;
    case 2:
        return 'March';
        break;
    case 3:
        return 'April';
        break;
    case 4:
        return 'May';
        break;
    case 5:
        return 'June';
        break;
    case 6:
        return 'July';
        break;
    case 7:
        return 'August';
        break;
    case 8:
        return 'September';
        break;
    case 9:
        return 'October';
        break;
    case 10:
        return 'November';
        break;
    case 11:
        return 'December';
        break;
    }
}
Material.picker.date.getDayString = function (dayInt) {
    switch (dayInt) {
    case 0:
        return 'Sunday';
        break;
    case 1:
        return 'Monday';
        break;
    case 2:
        return 'Tuesday';
        break;
    case 3:
        return 'Wednesday';
        break;
    case 4:
        return 'Thursday';
        break;
    case 5:
        return 'Friday';
        break;
    case 6:
        return 'Saturday';
        break;
    }
}

// [url]/index.html#sliders
Material.slider = {};
Material.slider.init = function (pos) {
    var sliders = document.querySelectorAll('.material-slider');
    for (var i = 0; i < sliders.length; i++) {
        sliders[i].style.background = 'linear-gradient(to right,' + Material.accentColor + ',' + Material.accentColor + ' ' + sliders[i].value + '%, #BDBDBD ' + sliders[i].value + '%, #BDBDBD)';
        if (sliders[i].hasAttribute('disabled')) {
            sliders[i].style.opacity = 0.65;
            sliders[i].style.cursor = 'default';
        }
    }
};
Material.slider.update = function (el) {
    el.style.background = 'linear-gradient(to right, ' + Material.accentColor + ', ' + Material.accentColor + ' ' + el.value + '%, #BDBDBD ' + el.value + '%, #BDBDBD)';
};

//  [url]/index.html#toasts
Material.snapback = {};
Material.snapback.show = function (id) {
    var snapback = document.getElementById(id);
    snapback.style.opacity = 1;
    snapback.style.visibility = 'visible';
    setTimeout(function () {
        Material.snapback.hide(id)
    }, 1800);
};
Material.snapback.hide = function (id) {
    var snapback = document.getElementById(id);
    snapback.style.opacity = 0;
    snapback.style.visibility = 'hidden';
};
Material.toast = {};
Material.toast.show = function (id) {
    var toast = document.getElementById(id);
    toast.style.opacity = 1;
    toast.style.visibility = 'visible';
    setTimeout(function () {
        Material.toast.hide(id)
    }, 1800);
};
Material.toast.hide = function (id) {
    var toast = document.getElementById(id);
    toast.style.opacity = 0;
    toast.style.visibility = 'hidden';
};

//  [url]/index.html#switches
Material.switch = {};
Material.switch.init = function () {
    var switches = document.querySelectorAll('.material-switch');
    for (var i = 0; i < switches.length; i++) {
        if (switches[i].getAttribute('value') == 'true') {
            switches[i].children[0].children[0].style.left = 20;
            switches[i].children[0].children[0].style.backgroundColor = Material.accentColor;
            switches[i].children[0].style.backgroundColor = 'rgba(' + Material.hex2RGB(Material.accentColor).r + ', ' + Material.hex2RGB(Material.accentColor).g + ', ' + Material.hex2RGB(Material.accentColor).b + ', 0.75)';
        }
        if (switches[i].getAttribute('value') == 'false') {
            switches[i].children[0].children[0].style.left = 0;
            switches[i].children[0].children[0].style.backgroundColor = '#E0E0E0';
            switches[i].children[0].style.backgroundColor = '#BDBDBD';
        }
    }
    var disabledSwitches = document.querySelectorAll('.material-switch-disabled');
    for (var i = 0; i < switches.length; i++) {
        if (disabledSwitches[i].getAttribute('value') == 'true') {
            disabledSwitches[i].children[0].children[0].style.left = 20;
            disabledSwitches[i].children[0].children[0].style.backgroundColor = Material.accentColor;
            disabledSwitches[i].children[0].style.backgroundColor = 'rgba(' + Material.hex2RGB(Material.accentColor).r + ', ' + Material.hex2RGB(Material.accentColor).g + ', ' + Material.hex2RGB(Material.accentColor).b + ', 0.75)';
        }
        if (disabledSwitches[i].getAttribute('value') == 'false') {
            disabledSwitches[i].children[0].children[0].style.left = 0;
            disabledSwitches[i].children[0].children[0].style.backgroundColor = '#E0E0E0';
            disabledSwitches[i].children[0].style.backgroundColor = '#BDBDBD';
        }
    }
};
Material.switch.update = function (id) {
    var Switch = document.getElementById(id);
    var val = Switch.getAttribute('value');
    if (Switch.className !== 'material-switch-disabled') {
        if (val == 'true') {
            Switch.children[0].children[0].style.left = 0;
            Switch.children[0].children[0].style.backgroundColor = '#E0E0E0';
            Switch.children[0].style.backgroundColor = '#BDBDBD';
            Switch.setAttribute('value', false)
        }
        if (val == 'false') {
            Switch.children[0].children[0].style.left = 20;
            Switch.children[0].children[0].style.backgroundColor = Material.accentColor;
            Switch.children[0].style.backgroundColor = 'rgba(' + Material.hex2RGB(Material.accentColor).r + ', ' + Material.hex2RGB(Material.accentColor).g + ', ' + Material.hex2RGB(Material.accentColor).b + ', 0.75)';
            Switch.setAttribute('value', true)
        }
    }
};

//  [url]/index.html#checkboxes
Material.checkbox = {};
Material.checkbox.init = function () {
    var checkboxes = document.querySelectorAll('.material-checkbox-body');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].hasAttribute('disabled')) {
            checkboxes[i].style.opacity = 0.65;
            checkboxes[i].style.cursor = 'default';
        }
        if (checkboxes[i].getAttribute('value') == 'true') {
            checkboxes[i].style.borderColor = Material.accentColor;
            checkboxes[i].style.backgroundColor = Material.accentColor;
        }
        if (checkboxes[i].getAttribute('value') == 'false') {
            checkboxes[i].style.borderColor = '#BDBDBD';
            checkboxes[i].style.backgroundColor = Material.backgroundColor;
        }
        checkboxes[i].children[0].style.backgroundColor = Material.backgroundColor;
    }
    var radios = document.querySelectorAll('.material-checkbox-radio');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].hasAttribute('disabled')) {
            radios[i].style.opacity = 0.65;
            radios[i].style.cursor = 'default';
        }
    }
    var radioButtons = document.querySelectorAll('.material-checkbox-radio-button');
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].style.backgroundColor = Material.accentColor;
        if (radioButtons[i].getAttribute('value') == 'true') {
            radioButtons[i].style.opacity = 1;
            radioButtons[i].parentElement.style.borderColor = Material.accentColor;
        }
        if (radioButtons[i].getAttribute('value') == 'false') {
            radioButtons[i].style.opacity = 0;
        }
    }
}
Material.checkbox.update = function (id) {
    var val = id.getAttribute('value');
    if (val == 'false') {
        id.setAttribute('value', 'true');
        id.style.borderColor = Material.accentColor;
        id.style.backgroundColor = Material.accentColor;
    }
    if (val == 'true') {
        id.setAttribute('value', 'false');
        id.style.borderColor = '#BDBDBD';
        id.style.backgroundColor = Material.backgroundColor;
    }
}
Material.radio = {};
Material.radio.update = function (id) {
    var val = id.getAttribute('value');
    if (val == 'false') {
        id.style.opacity = '1';
        id.setAttribute('value', 'true');
        id.parentElement.style.borderColor = Material.accentColor;
    }
    if (val == 'true') {
        id.style.opacity = '0';
        id.setAttribute('value', 'false');
        id.parentElement.style.borderColor = '#BDBDBD';
    }
}

//  [url]/index.html#boxes
Material.textboxes = {};
Material.textboxes.init = function () {
    var textboxes = document.querySelectorAll('.material-textbox-input');
    for (var i = 0; i < textboxes.length; i++) {
        textboxes[i].onfocus = function (e) {
            var label = document.querySelector('label[for="' + e.target.id + '"]');
            label.style.color = "rgba(" + Material.hex2RGB(Material.accentColor).r + ", " + Material.hex2RGB(Material.accentColor).g + ", " + Material.hex2RGB(Material.accentColor).b + ", 0.65)";
        }
        textboxes[i].onblur = function (e) {
            var label = document.querySelector('label[for="' + e.target.id + '"]');
            label.style.color = '#9E9E9E';
        }
    }
}

// Redirect the window to a given address just like <a></a>, target options are the same as in <a></a>
Material.goto = function (url, target) {
    window.open(url, target);
};

// Load the fonts, called when this file is loaded by the browser
Material.loadFonts = function () {
    WebFontConfig = {
        google: {
            families: ['Roboto:400,100,100italic,300,300italic,400italic,500,500italic:latin']
        }
    };
    (function () {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();
};

// HexToRGB, used for some color effect
Material.hex2RGB = function (hex) {
    // Expand shorthand form (e.g. "03F ") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// initiate some stuff
Material.init = function (config) {
    Material.loadFonts();
    if (config !== null || config !== undefined || config !== NaN) {
        if (config.color !== null || config.color !== undefined || config.color !== NaN || config.color !== '' || config.color !== ' ') {

            Material.backgroundColor = config.backgroundColor
            Material.accentColor = config.accentColor;

            var style = document.createElement('style');
            var comment = " /*  Material.js generated content  */";
            style.innerHTML = comment + "\n .material-checkbox:active {transition: all 0.2s; border-radius: 25px; background-color: rgba(" + Material.hex2RGB(Material.accentColor).r + ", " + Material.hex2RGB(Material.accentColor).g + ", " + Material.hex2RGB(Material.accentColor).b + ", 0.5);}\n .material-checkbox-radio:active {transition: all 0.2s; border-radius: 25px; background-color: rgba(" + Material.hex2RGB(Material.accentColor).r + ", " + Material.hex2RGB(Material.accentColor).g + ", " + Material.hex2RGB(Material.accentColor).b + ", 0.5);}\n .material-slider::-webkit-slider-thumb { background-color: " + Material.accentColor + "; border-radius: 15px; height: 12px; width: 12px; -webkit-appearance: none; transition: all 0.125s; cursor: pointer;}\n .material-slider::-webkit-slider-thumb:focus, .material-slider::-webkit-slider-thumb:hover { background-color: " + Material.accentColor + "; border-radius: 15px; height: 13px; width: 13px; -webkit-appearance: none; }\n .material-slider::-webkit-slider-thumb:active { background: radial-gradient(circle, " + Material.accentColor + ", " + Material.accentColor + " 30%, rgba(" + Material.hex2RGB(Material.accentColor).r + ", " + Material.hex2RGB(Material.accentColor).g + ", " + Material.hex2RGB(Material.accentColor).b + ", 0.36) 1%, rgba(" + Material.hex2RGB(Material.accentColor).r + ", " + Material.hex2RGB(Material.accentColor).g + ", " + Material.hex2RGB(Material.accentColor).b + ", 0.01)); border-radius: 16px; height: 32px; width: 32px; -webkit-appearance: none;}\n .material-slider::-webkit-slider-thumb:disabled {background-color: " + Material.accentColor + "; border-radius: 15px; height: 12px; width: 12px; -webkit-appearance: none; transition: none; cursor: default;}\n .material-slider: disabled::-webkit-slider-thumb:hover { background-color: " + Material.accentColor + "; border-radius: 15px; height: 12px; width: 12px; -webkit-appearance: none; transition: none; cursor: default; }\n .material-textbox-input:focus, .material-textbox-input:active {color: #424242; border-bottom-style: solid; border-bottom-width: thin; border-bottom-color: rgba(" + Material.hex2RGB(Material.accentColor).r + ", " + Material.hex2RGB(Material.accentColor).g + ", " + Material.hex2RGB(Material.accentColor).b + ", 0.65);}\n .material-picker-date-date { width: 202px; height: 202px; margin: 0px; float: left; background-color:" + Material.accentColor + "; text-align: center; color: #ECECEC;}";
            document.head.appendChild(style);

            Material.grid.init();
            Material.picker.init();
            Material.slider.init();
            Material.switch.init();
            Material.checkbox.init();
            Material.textboxes.init();
        }
        console.log('Material.js:', Material.version);
    }
};