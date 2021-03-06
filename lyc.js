var params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};
var getCss = function(o, key) {
    return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};
var startDrag = function(bar, target, callback) {
    if (getCss(target, "left") !== "auto") {
        params.left = getCss(target, "left");
    }
    if (getCss(target, "top") !== "auto") {
        params.top = getCss(target, "top");
    }
    bar.onmousedown = function(event) {
        params.flag = true;
        if (!event) {
            event = window.event;
            bar.onselectstart = function() {
                return false;
            }
        }
        var e = event;
        params.currentX = e.clientX;
        params.currentY = e.clientY;
    };
    document.onmouseup = function() {
        params.flag = false;
        if (getCss(target, "left") !== "auto") {
            params.left = getCss(target, "left");
        }
        if (getCss(target, "top") !== "auto") {
            params.top = getCss(target, "top");
        }
    };
    document.onmousemove = function(event) {
        var e = event ? event : window.event;
        if (params.flag) {
            var nowX = e.clientX,
                nowY = e.clientY;
            var disX = nowX - params.currentX,
                disY = nowY - params.currentY;
            target.style.left = parseInt(params.left) + disX + "px";
            target.style.top = parseInt(params.top) + disY + "px";

            if (typeof callback == "function") {
                callback((parseInt(params.left) || 0) + disX, (parseInt(params.top) || 0) + disY);
            }

            if (event.preventDefault) {
                event.preventDefault();
            }
            return false;
        }
    }
};
window.onload = function() {
    var bar = document.getElementById("headbar"),
        tar = document.getElementById("console");
    startDrag(bar, tar);
}
$(function() {
    var terminal = $('#terminal');
    var input_box = $('.input_box');
    var input = $('.input');
    var commands = [
        { "name": "clear", "function": clearConsole },
        { "name": "help", "function": help },
        { "name": "sudo", "function": sudo },
        { "name": "Nekoha", "function": ShowMeNekoha },
        { "name": "github", "function": github }
    ];
    var Nekos = [
        { "url": "https://s1.ax1x.com/2020/10/30/BtYtvF.png" },
        { "url": "https://s1.ax1x.com/2020/10/30/BtYUu4.png" },
        { "url": "https://s1.ax1x.com/2020/10/30/BtYaDJ.png" },
        { "url": "https://s1.ax1x.com/2020/10/30/BtYJ3T.jpg" },
        { "url": "https://s1.ax1x.com/2020/10/30/BttBLQ.png" },
        { "url": "https://s1.ax1x.com/2020/10/30/BttrZj.png" },
        { "url": "https://s1.ax1x.com/2020/10/30/Btt0sg.png" },
        { "url": "https://s1.ax1x.com/2020/10/30/Bttyon.png" },
        { "url": "https://s1.ax1x.com/2020/10/30/Bttciq.png" },
        { "url": "https://s1.ax1x.com/2020/10/30/BtN86U.png" }
    ]
    terminal.on('click', () => {
        input.focus();
    })
    input.on('keypress', function(key) {
            if (key.keyCode == 13) {
                Run(input.val());
            } else if (input.val()[0] == '\n')
                input.val('');
        })
        //functions on----------
    function help() {
        let helpmessage = 'Available commands:[ ';
        for (let i = 0; i < commands.length; i++) {
            if (i > 0)
                helpmessage += ' , ';
            helpmessage += commands[i].name;
        }
        print(helpmessage + ' ]', false);
    }

    function clearConsole() {
        terminal.children('.output_box').remove();
    }

    function sudo() {
        print('On my serve, Master. What do you need?', false);
    }

    function ShowMeNekoha() {
        printImage(Nekos[Math.floor(Math.random() * Nekos.length)].url);
    }

    function github() {
        print('Repo address: https://github.com/Schwarzkopf-Henkal/Schwarzkopf-Henkal.github.io', false);
        print('My blog: http://49.234.17.22/', false);
        print('Welcome to the Antarctic Commune!', false);
        print('\n', false);
        print('*Build on Github Pages.', false);
    }

    function printImage(url) {
        input_box.before(`<div class="output_box"><img src="${url}" style="width:500px;"></div>`);
    }

    function Run(cmd) {
        cmd = cmd.replace('\n', '');
        print(cmd, true);
        input.val('');
        RunCmd(cmd.replace(/ +/, ''));
    }

    function print(cmd, usr) {

        if (usr === true) {
            input_box.before('<div class="output_box"><pre class="output_span"><span class="user_info">Ubuntu@49.234.17.22</span><span class="user_info">:</span><span class="user_info">~</span><span class="user_info">$ </span><span class="output">' + cmd + '</span></pre></div>');
        } else {
            input_box.before('<div class="output_box"><pre class="output_span"><span class="output">' + cmd + '</span></pre></div>');
        }
    }

    function RunCmd(cmd) {
        for (let i = 0; i < commands.length; i++)
            if (cmd === commands[i].name) {
                commands[i].function();
                return true;
            }
        if (cmd !== '\n' && cmd !== '')
            print('Unknown Command.', false);
        return false;
    }
    //functions end---------
})