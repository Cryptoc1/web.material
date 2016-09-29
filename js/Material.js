/**
  Material.js - Material design on the web.
  http://github.com/cryptoc1/Web.Material
  @Author: Samuel Steele (Cryptoc1), Cryyptocosm Developers
**/

var Material = {}

Material.version = '0.0.5'

//Accent Color
Material.backgroundColor = '#F5F5F5'
Material.accentColor = '#00E676'

// [url]/index.html#cards
Material.card = {}
    /*
    Material.initCards = function () {
        var drags = document.querySelectorAll('.material-card')
    [].forEach.call(drags, function (drag) {
            drag.addEventListener('dragstart', Material.cardDragStart, false)
            drag.addEventListener('mousedown', Material.cardMousedown, false)
            drag.addEventListener('drag', Material.cardDragged, false)
            drag.addEventListener('dragend', Material.cardDragEnd, false)
            drag.addEventListener('drop', Material.cardDragEnd, false)
        })
    }
    Material.cardDragStart = function (e) {
        e.srcElement.style.position = 'absolute'
        e.dataTransfer.setData('text/plain', null)
    }
    Material.cardMousedown = function (e) {
        Material.card.mouseOffsetX = e.offsetX
        Material.card.mouseOffsetY = e.offsetY
    }
    Material.cardDragEnd = function (e) {
        e.srcElement.style.left = e.pageX - Material.card.mouseOffsetX
        e.srcElement.style.top = e.pageY - Material.card.mouseOffsetY
        e.preventDefault()
    }
    Material.cardDragged = function (e) {
        e.srcElement.style.left = e.pageX - Material.card.mouseOffsetX - 30
        e.srcElement.style.top = e.pageY - Material.card.mouseOffsetY - 30
    }
    */
Material.card.create = function(config) {
    var parent = document.getElementById(config.parent),
        card = document.createElement('div'),
        cardHeading = document.createElement('div'),
        cardContent = document.createElement('div')
    card.className = 'material-card'
    if (config.title)
        card.title = config.heading
    cardHeading.className = 'material-card-heading'
    cardContent.className = 'material-card-content'
    cardHeading.innerHTML = config.heading
    if (config.indent)
        cardContent.style.textIndent = '20px'
    cardContent.innerHTML = config.content
    card.appendChild(cardHeading)
    card.appendChild(cardContent)
    parent.appendChild(card)
}

// [url]/index.html#dialogs
Material.dialog = {}

// @TODO: add position option
Material.dialog.open = function(id) {
    var dialog = document.getElementById(id),
        overlay = document.body.getElementsByClassName('material-dialog-overlay')
    dialog.style.top = (window.innerHeight / 2) - (dialog.offsetHeight / 2)
    dialog.style.left = (window.innerWidth / 2) - (dialog.offsetWidth / 2)
    overlay[0].style.visibility = 'visible'
    dialog.style.visibility = 'visible'
}
Material.dialog.close = function(el) {
    var dialog = document.getElementById(el.parentElement.parentElement.id),
        overlay = document.body.getElementsByClassName('material-dialog-overlay')
    overlay[0].style.visibility = 'hidden'
    dialog.style.visibility = 'hidden'
}

// [url]/index.html#lists
Material.list = {}
Material.list.create = function(config) {
    var list = document.getElementById(config.id)
    var listItem = document.createElement('div')
    listItem.className = 'material-list-item'
    var avatar = document.createElement('div')
    avatar.className = 'material-list-avatar'
    var content = document.createElement('div')
    content.className = 'material-list-content'
    var heading = document.createElement('div')
    heading.className = 'material-list-heading'
    heading.innerHTML = config.heading
    content.appendChild(heading)
    var secondary = document.createElement('div')
    secondary.className = 'material-list-secondary'
    secondary.innerHTML = config.secondary
    content.appendChild(secondary)
    listItem.appendChild(avatar)
    listItem.appendChild(content)
    if (config.dividers) {
        var divider = document.createElement('hr')
        list.appendChild(listItem)
        list.appendChild(divider)
    } else {
        list.appendChild(listItem)
    }
}
Material.list.sort = function(config) {
    var list = document.getElementById(config.id)
    var items = []
    if (config.dividers == false) {
        var divider = document.createElement('null')
    } else {
        var divider = document.createElement('hr')
    }
    for (var i = 0; i < list.children.length; i++) {
        if (list.children[i].hasAttribute('name'))
            items.push(list.children[i])
    }
    list.innerHTML = ""
    var sorted = items.sort(function(a, b) {
        if (a.getAttribute('name') < b.getAttribute('name')) return -1
        if (a.getAttribute('name') > b.getAttribute('name')) return 1
        return 0
    })
    for (var i = 1; i < items.length; i += 2) {
        items.splice(i, 0, divider)
    }
    if (config.descending) {
        items = items.reverse()
        for (var i = 0; i < items.length; i++)
            list.appendChild(items[i])

    } else {
        for (var i = 0; i < items.length; i++)
            list.appendChild(items[i])
    }
}

//  [url]/index.html#grids
Material.grid = {}
Material.grid.init = function() {
    var grids = document.querySelectorAll('.material-grid')
    for (var i = 0; i < grids.length; i++) {
        var gridWidth = parseInt(grids[i].style.width)
        var columns = parseInt(grids[i].getAttribute('columns'))
        var cellWidth = gridWidth / columns
        var wrapperWidth = cellWidth * columns + (4 * columns)
        grids[i].children[0].style.width = wrapperWidth
        for (var j = 0; j < grids[i].children[0].children.length; j++) {
            grids[i].children[0].children[j].style.width = cellWidth - 4
            grids[i].children[0].children[j].style.height = grids[i].getAttribute('cell-height')
        }
    }
}
Material.grid.sort = function(config) {
    var grid = document.getElementById(config.id)
    var cells = []
    for (var i = 0; i < grid.children[0].children.length; i++) {
        if (grid.children[0].children[i].hasAttribute('name'))
            cells.push(grid.children[0].children[i])
    }
    var sorted = cells.sort(function(a, b) {
        if (a.getAttribute('name') < b.getAttribute('name')) return -1
        if (a.getAttribute('name') > b.getAttribute('name')) return 1
        return 0
    })
    if (config.descending) {
        cells = cells.reverse()
        for (var i = 0; i < cells.length; i++)
            grid.appendChild(cells[i])

    } else {
        for (var i = 0; i < cells.length; i++)
            grid.appendChild(cells[i])
    }
}
Material.grid.create = function(config) {
    var grid = document.getElementById(config.id)
    var wrapper = grid.children[0]
    var cell = document.createElement('div')
    cell.className = 'material-grid-cell'
    cell.innerHTML = config.content
    wrapper.appendChild(cell)
    Material.grid.init()
}


// [url]/index.html#menus

HTMLElement.prototype.getParentBoundingRect = function() {
    return {
        top: this.offsetTop - this.parentNode.offsetTop,
        left: this.offsetLeft - this.parentNode.offsetLeft,
        right: window.innerWidth - (this.offsetLeft + this.offsetWidth),
        bottom: window.innerHeight - (this.offsetTop + this.offsetHeight)
    }
}

Material.menu = {}
Material.menu.toggle = function(e, config) {
    if (config == null || config == undefined) {
        if (e.constructor.name != 'MouseEvent') console.error("Invalid arguments: Argument 0 must be of type MouseEvent")
        else console.error("Invalid arguments: No config specified")
        return
    }

    var button = document.getElementById(config.button),
        menu = document.getElementById(config.menu),
        clientRect = button.getBoundingClientRect(),
        offsetFromParent = button.getParentBoundingRect()

    menu.style.transition = 'all ' + config.duration + 's'
        //    menu.style.transition = 'width 1s, height 1s'

    if (offsetFromParent.left > (button.parentNode.offsetWidth / 2) && offsetFromParent.top < (button.parentNode.offsetHeight / 2)) {
        var quadrant = 1
    }

    if (offsetFromParent.left < (button.parentNode.offsetWidth / 2) && offsetFromParent.top < (button.parentNode.offsetHeight / 2)) {
        var quadrant = 2
    }

    if (offsetFromParent.left < (button.parentNode.offsetWidth / 2) && offsetFromParent.top > (button.parentNode.offsetHeight / 2)) {
        var quadrant = 3
    }

    if (offsetFromParent.left > (button.parentNode.offsetWidth / 2) && offsetFromParent.top > (button.parentNode.offsetHeight / 2)) {
        var quadrant = 4
    }

    console.log(typeof config.direction)

    if (typeof config.direction == 'string')
        switch (config.direction.toLowerCase()) {
            case 'top-right':
                var quadrant = 3
                break
            case 'top-left':
                var quadrant = 4
                break
            case 'bottom-left':
                var quadrant = 1
                break
            case 'bottom-right':
                var quadrant = 2
                break
            default:
                var quadrant = 2
        }

    console.log(quadrant)

    if (menu.dataset.active == 'true') {
        menu.style.width = '0px'
        menu.style.height = '0px'
        menu.children[0].style.visibility = 'hidden'
        menu.style.visibility = 'hidden'
        menu.dataset.active = false
    } else {
        menu.style.visibility = 'visible'

        // @TODO: get the quadrant and open in the right direction
        switch (quadrant) {
            case 1:
                menu.style.right = offsetFromParent.right + clientRect.width
                menu.style.top = button.offsetTop + (clientRect.height / 2)
                break
            case 2:
                menu.style.left = button.offsetLeft + clientRect.width
                menu.style.top = button.offsetTop + (clientRect.height / 2)
                break
            case 3:
                menu.style.left = button.offsetLeft + clientRect.width
                menu.style.bottom = offsetFromParent.bottom + (clientRect.height / 2)
                break
            case 4:
                menu.style.right = offsetFromParent.right + clientRect.width
                menu.style.bottom = offsetFromParent.bottom + (clientRect.height / 2)
                break
            default:
                console.error('Material.menu.toggle: Unable to determine button\'s position within it\'s parent. Can\'t set the menu\'s position!')
        }

        menu.style.width = config.width
        menu.style.height = config.height
        setTimeout(function() {
            menu.children[0].style.visibility = 'visible'
        }, config.duration * 750)
        menu.dataset.active = true
    }
}

//  [url]/index.html#pickers

/*
Material.picker = {
    date: {},
    time: {}
}
Material.picker.init = function () {
    Material.picker.date.init()
}
var date = new Date()
Material.picker.date.init = function () {
    var datePickers = document.querySelectorAll('.material-picker-date')
    for (var i = 0; i < datePickers.length; i++) {
        var newDateEl = document.createElement('div')
        newDateEl.className = 'material-picker-date-date'
        datePickers[i].appendChild(newDateEl)
        var newCalEl = document.createElement('div')
        newCalEl.className = 'material-picker-date-calender'
        datePickers[i].appendChild(newCalEl)
        var newBtnEl = document.createElement('div')
        newBtnEl.className = 'material-picker-date-buttons'
        newBtnEl.innerHTML = '<div class="material-button-flat material-button-flat-disabled" style="color: ' + Material.accentColor + '">OK</div>\n<div class="material-button-flat" style="color: ' + Material.accentColor + '">Close</div>'
        datePickers[i].appendChild(newBtnEl)
    }
    for (var i = 0; i < datePickers.length; i++) {
        datePickers[i].style.top = (window.innerHeight / 2) - 125
        datePickers[i].style.left = (window.innerWidth / 2) - 202
        var dateEl = datePickers[i].children[0]
        var dateDay = document.createElement('div')
        dateDay.className = 'material-picker-date-date-day'
        dateDay.innerHTML = Material.picker.date.getDayString(date.getDay())
        dateEl.appendChild(dateDay)
        var dateMonth = document.createElement('div')
        dateMonth.className = 'material-picker-date-date-month'
        dateMonth.innerHTML = Material.picker.date.getMonthString(date.getMonth())
        dateEl.appendChild(dateMonth)
        var dateDayNum = document.createElement('div')
        dateDayNum.className = 'material-picker-date-date-day-num'
        dateDayNum.innerHTML = date.getDate()
        dateEl.appendChild(dateDayNum)
        var dateYear = document.createElement('div')
        dateYear.className = 'material-picker-date-date-year'
        dateYear.innerHTML = date.getFullYear()
        dateYear.id = 'DDMMyy'
        var mnObj = {
            button: 'DDMMyy',
            menu: 'ddmmYY',
            position: 'fixed',
            reposition: false,
            width: 80,
            height: 180,
            duration: 0.25,
        }
        dateYear.setAttribute('onclick', 'Material.menu.open(' + JSON.stringify(mnObj) + ')')
        dateEl.appendChild(dateYear)
        var dateMenu = document.createElement('div')
        dateMenu.className = 'material-menu'
        dateMenu.id = 'ddmmYY'
        var dateMenuWrapper = document.createElement('div')
        dateMenuWrapper.className = 'material-menu-wrapper'
        for (var i = 1940 i < date.getFullYear() + 21 i++) {
            var dateMenuItem = document.createElement('div')
            dateMenuItem.className = 'material-menu-item'
            dateMenuItem.innerHTML = i
            dateMenuItem.setAttribute('onclick', 'Material.picker.date.updateYear(' + i + ', ' + JSON.stringify(mnObj) + ')')
            dateMenuWrapper.appendChild(dateMenuItem)
        }
        dateMenu.appendChild(dateMenuWrapper)
        dateMenu.style.position = 'fixed'
        dateMenu.style.left = (window.innerWidth / 2) - 101
        dateMenu.style.top = (window.innerHeight / 2) + 50
        dateMenu.style.zIndex = 200
        document.body.appendChild(dateMenu)

        var cal = datePickers[0].children[1]
        var month = document.createElement('div')
        var days = []
        for (var i = 1 i < 32 i++)
            days.push(i)
        month.className = 'material-picker-date-calender-month'
        var monthString = Material.picker.date.getMonthString(date.getMonth())
        month.innerHTML = monthString
        cal.appendChild(month)
        var dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        for (var j = 0 j < 7 j++) {
            var day = document.createElement('div')
            day.className = 'material-picker-date-calender-days'
            day.innerHTML = dayLetters[j]
            cal.appendChild(day)
        }
        date.setDate(1)
        for (var j = 0 j < date.getDay() j++) {
            var calDate = document.createElement('div')
            calDate.className = 'material-picker-date-calender-date'
            calDate.innerHTML = ' '
            cal.appendChild(calDate)
        }
        for (var j = 0 j < days.length j++) {
            var calDate = document.createElement('div')
            calDate.className = 'material-picker-date-calender-date'
            calDate.innerHTML = days[j]
            cal.appendChild(calDate)
        }
    }
}
Material.picker.open = function (id) {
    var picker = document.getElementById(id),
        overlay = document.body.getElementsByClassName('material-dialog-overlay')
    picker.style.top = (window.innerHeight / 2) - 125
    picker.style.left = (window.innerWidth / 2) - 202
    overlay[0].style.visibility = 'visible'
    picker.style.visibility = 'visible'
}
Material.picker.close = function (id) {
    var picker = document.getElementById(id),
        overlay = document.body.getElementsByClassName('material-dialog-overlay')
    picker.style.visibility = 'hidden'
    overlay[0].style.visibility = 'hidden'
}
Material.picker.date.updateYear = function (y, config) {
    Material.menu.open(config)
    date.setFullYear(y)
    console.log(y)
}
Material.picker.date.getMonthString = function (monthInt) {
    switch (monthInt) {
    case 0:
        return 'January'
        break
    case 1:
        return 'February'
        break
    case 2:
        return 'March'
        break
    case 3:
        return 'April'
        break
    case 4:
        return 'May'
        break
    case 5:
        return 'June'
        break
    case 6:
        return 'July'
        break
    case 7:
        return 'August'
        break
    case 8:
        return 'September'
        break
    case 9:
        return 'October'
        break
    case 10:
        return 'November'
        break
    case 11:
        return 'December'
        break
    }
}
Material.picker.date.getDayString = function (dayInt) {
    switch (dayInt) {
    case 0:
        return 'Sunday'
        break
    case 1:
        return 'Monday'
        break
    case 2:
        return 'Tuesday'
        break
    case 3:
        return 'Wednesday'
        break
    case 4:
        return 'Thursday'
        break
    case 5:
        return 'Friday'
        break
    case 6:
        return 'Saturday'
        break
    }
}

*/

// [url]/index.html#sliders
Material.slider = {}
Material.slider.init = function(pos) {
    var sliders = document.querySelectorAll('.material-slider')
    for (var i = 0; i < sliders.length; i++) {
        sliders[i].style.background = 'linear-gradient(to right,' + Material.accentColor + ',' + Material.accentColor + ' ' + sliders[i].value + '%, #BDBDBD ' + sliders[i].value + '%, #BDBDBD)'
        if (sliders[i].hasAttribute('disabled')) {
            sliders[i].style.opacity = 0.65
            sliders[i].style.cursor = 'default'
        }
    }
}
Material.slider.update = function(el) {
    el.style.background = 'linear-gradient(to right, ' + Material.accentColor + ', ' + Material.accentColor + ' ' + el.value + '%, #BDBDBD ' + el.value + '%, #BDBDBD)'
}

//  [url]/index.html#toasts
Material.snapback = {}
Material.snapback.show = function(id) {
    var snapback = document.getElementById(id)
    snapback.style.opacity = 1
    snapback.style.visibility = 'visible'
    setTimeout(function() {
        Material.snapback.hide(id)
    }, 1800)
}
Material.snapback.hide = function(id) {
    var snapback = document.getElementById(id)
    snapback.style.opacity = 0
    snapback.style.visibility = 'hidden'
}
Material.toast = {}
Material.toast.show = function(id) {
    var toast = document.getElementById(id)
    toast.style.opacity = 1
    toast.style.visibility = 'visible'
    setTimeout(function() {
        Material.toast.hide(id)
    }, 1800)
}
Material.toast.hide = function(id) {
    var toast = document.getElementById(id)
    toast.style.opacity = 0
    toast.style.visibility = 'hidden'
}

//  [url]/index.html#switches

//  [url]/index.html#checkboxes


//  [url]/index.html#boxes
Material.textboxes = {}
Material.textboxes.init = function() {
    var textboxes = document.querySelectorAll('.material-textbox-input')
    for (var i = 0; i < textboxes.length; i++) {
        textboxes[i].onfocus = function(e) {
            var label = document.querySelector('label[for="' + e.target.id + '"]')
            label.style.color = "rgba(" + Material.hex2RGB(Material.accentColor).r + ", " + Material.hex2RGB(Material.accentColor).g + ", " + Material.hex2RGB(Material.accentColor).b + ", 0.65)"
        }
        textboxes[i].onblur = function(e) {
            var label = document.querySelector('label[for="' + e.target.id + '"]')
            label.style.color = '#9E9E9E'
        }
    }
}

// Redirect the window to a given address just like <a></a>, target options are the same as in <a></a>
Material.goto = function(url, target) {
    window.open(url, target)
}

// Load the fonts, called when this file is loaded by the browser
Material.loadFonts = function() {
    var f = document.createElement('link')
    f.href = "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500"
    f.rel = 'stylesheet'
    var l = document.getElementsByTagName('link')[0]
    l.parentNode.insertBefore(f, l)
    var f1 = document.createElement('link')
    f1.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
    f1.rel = 'stylesheet'
    l.parentNode.insertBefore(f1, f)
}

// HexToRGB, used for some color effect
Material.hex2RGB = function(hex) {
    // Expand shorthand form (e.g. "03F ") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b
    })

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null
}

// initiate some stuff
Material.init = function(config) {
    Material.loadFonts()
    if (config !== null || config !== undefined) {
        Material.backgroundColor = config.backgroundColor
        Material.accentColor = config.accentColor

        var _aColorHex = config.accentColor,
            _aColorRGBA = Material.hex2RGB(_aColorHex)

        var style = document.createElement('style')
        var comment = " /*  Material.js generated content  */"
        style.innerHTML = comment +
            ".material-button {background-color: " + _aColorHex + ";}\n" +
            ".material-button.flat[type=\"submit\"] { color: " + _aColorHex + ";}\n" +
            ".material-progress-linear::-webkit-progress-value {background-color:" + _aColorHex + ";}\n" +
            ".material-slider::-webkit-slider-thumb { background-color: " + _aColorHex + ";}\n " +
            ".material-slider::-webkit-slider-thumb:focus, .material-slider::-webkit-slider-thumb:hover { background-color: " + _aColorHex + ";}\n " +
            ".material-slider::-webkit-slider-thumb:active { background: radial-gradient(circle, " + _aColorHex + ", " + _aColorHex + " 30%, rgba(" + _aColorRGBA.r + ", " + _aColorRGBA.g + ", " + _aColorRGBA.b + ", 0.36) 1%, rgba(" + _aColorRGBA.r + ", " + _aColorRGBA.g + ", " + _aColorRGBA.b + ", 0.01));}\n " +
            ".material-slider::-webkit-slider-thumb:disabled {background-color: " + _aColorHex + ";}\n " +
            ".material-slider:disabled::-webkit-slider-thumb:hover { background-color: " + _aColorHex + ";}\n " +
            ".material-snapback-button {color: " + _aColorHex + ";}\n" +
            ".material-switch input:checked+.radial {background-color: rgba(" + _aColorRGBA.r + ", " + _aColorRGBA.g + ", " + _aColorRGBA.b + ", .85);}\n" +
            ".material-switch input:checked+.radial:before {background-color: " + _aColorHex + ";}\n" +
            ".material-checkbox input:checked+i::before {color: " + _aColorHex + ";}" +
            ".material-checkbox:active {background-color: rgba(" + _aColorRGBA.r + ", " + _aColorRGBA.g + ", " + _aColorRGBA.b + ", .65);}\n" +
            ".material-textbox-input:focus, .material-textbox-input:active {border-bottom-color: rgba(" + _aColorRGBA.r + ", " + _aColorRGBA.g + ", " + _aColorRGBA.b + ", 0.65);}\n " +
            ".material-picker-date-date { background-color:" + _aColorHex + ";}"

        document.head.appendChild(style)


        Material.grid.init()

        // Material.picker.init()

        Material.slider.init()
            // Material.checkbox.init()
        Material.textboxes.init()

        console.log('Material.js:', Material.version)
    }
}
