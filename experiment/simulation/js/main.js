var timerId, typeTarget = $("#typer"),
    tWrapper = $("#toast-wrapper"),
    ti = 0,
    currentStep = 0,
    contrast = 0,
    brightness = 0,
    vac = 0,
    av = 0,
    on = false,
    dropped = false,
    imgs = [],
    mode = 1;
var beamCanvas = document.getElementById("beam");
var ctx = beamCanvas.getContext('2d');
var beamy = 0,
    beamx = parseInt(beamCanvas.width / 2),
    beamWidth, beamTimer = -1;
var beamCanvas2 = document.getElementById("beam2");
var ctx2 = beamCanvas2.getContext('2d');
var beam2H = beamCanvas2.height,
    beam2W = beamCanvas2.width,
    beamx2 = parseInt(beamCanvas2.width / 2),
    beamTimer2 = -1;

function randEx(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function type(txt, cur = 0) {
    if (cur == txt.length) {
        timerId = -1;
        return;
    }
    if (cur == 0) {
        typeTarget.html("");
        clearTimeout(timerId);
    }
    typeTarget.append(txt.charAt(cur));
    timerId = setTimeout(type, typeSpeed, txt, cur + 1);
}

function showToast(msg, type = 0) {
    tWrapper.append(`<div id="t${ti++}" class="toast${type == 1 ? ' danger' : (type == 2 ? ' success' : '')}" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
        <svg class="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="${type == 1 ? '#ff0000' : (type == 2 ? '#31a66a' : '#007aff')}" /></svg>
        <strong class="mr-auto">Notification</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="toast-body">
        ${msg}
</div>
</div>`);
    $(`#t${ti - 1}`).toast({
        delay: 5500
    });
    $(`#t${ti - 1}`).toast('show');
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function() {
        $('<img/>')[0].src = this;
    });
}

if (window.speechSynthesis.getVoices().length == 0) {
    window.speechSynthesis.addEventListener('voiceschanged', function() {
        textToSpeech(text);
    });
}

function textToSpeech(text) {
    var available_voices = window.speechSynthesis.getVoices();
    var english_voice = '';
    for (var i = 0; i < available_voices.length; i++) {
        if (available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if (english_voice === '')
        english_voice = available_voices[0];
    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.text = text;
    utter.voice = english_voice;
    window.speechSynthesis.speak(utter);
}

function openPartModal(ele) {
    const i = parseInt($(ele).attr("data-id"));
    console.log(i);
    $("#part-desc").html(parts[i - 1].desc);
    $("#part-img").attr("src", parts[i - 1].img);
    setTimeout(() => $('#part-modal').modal('show'), 100);
}

function taskSubmit() {
    if (parseInt($('input[name="task"]:checked').val()) == 2)
        showToast("Correct Answer!", 2);
    else
        showToast("Wrong Answer!", 1);
}
$(function() {
    type("Welcome, get started by putting the material to be scanned into the machine, this can be done by dragging and dropping it into material section. HINT: The material section will be highlighted when you drag material over it!");
    textToSpeech("Welcome, get started by putting the material in the machine, reed instructions for hint.");
    // setTimeout(() => {
    //     for (var i = 0; i < 41; i++) {
    //         imgs.push(`./images/Slide${i}.JPG`);
    //     }
    //     preload(imgs);
    // }, 3000);

    $(".material").draggable({
        helper: 'clone',
        cursor: "move",
        revert: "invalid",
        opacity: 0.5,
        zIndex: 100
    });
    $("#dropzone").droppable({
        tolerance: "touch",
        hoverClass: "drop-hover",
        accept: ".material",
        addClasses: false,
        drop: function(event, ui) {
            $("#dropzone").html(`<div style="background:${materials[parseInt((ui.draggable).attr("data-mid"))]}" class='material'></div>`);
            showToast("Material placed succesfully");
            dropped = true;
            type("Now that the material has been placed, it is time to switch on the machine!");
            textToSpeech("Try to switch on the machine now");
            $("#setvac").attr("disabled", false);
            $("#vslider").slider("option", "disabled", false);
        }
    });
    var vhandle = $("#vslider").find(".custom-handle"),
        avhandle = $("#avslider").find(".custom-handle"),
        chandle = $("#cslider").find(".custom-handle"),
        bhandle = $("#bslider").find(".custom-handle");
    $("#vslider").slider({
        min: 0,
        max: 3,
        disabled: true,
        create: function() {
            vhandle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
            vhandle.text(ui.value);
        }
    });
    $("#avslider").slider({
        min: 0,
        max: 3,
        disabled: true,
        create: function() {
            avhandle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
            avhandle.text(ui.value);
        }
    });
    $("#bslider").slider({
        create: function() {
            bhandle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
            bhandle.text(ui.value);
            brightness = ui.value;
            $("#outImage").css("filter", `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`)
        }
    });
    $("#cslider").slider({
        max: 300,
        create: function() {
            chandle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
            chandle.text(ui.value);
            contrast = ui.value;
            $("#outImage").css("filter", `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`)
        }
    });
    $("#on").click(function() {
        if (on) return showToast("Machine has already been switched on");
        if (!dropped) return showToast("Place the material into machine first!", 1);
        if (vac == 0)
            return showToast("Vaccum range is not in working condition", 1);
        else {
            on = true;
            showToast("Machine has been switched on", 2);
            setTimeout(() => $("#task").attr("disabled", false), 1000);
            // $("#setav").attr("disabled", false);
            // $("#avslider").slider("option", "disabled", false);
            type("Now you can set the vaccume!");
        }
    });
    $("#task").click(function() {
        $("#output").fadeOut(600, () => $("#taskArea").delay(100).fadeIn());
    });
    $("#setvac").click(function() {
        vac = $("#vslider").slider("option", "value");
        showToast("Vaccum value has been set.");

        $("#setav").attr("disabled", false);
        $("#avslider").slider("option", "disabled", false);

        $("#vacImg").animate({
            fontSize: 220
        }, {
            step: function(now, fx) {
                // console.log(now);
                $(this).css('clip', `rect(${Math.round(now)}px, 17rem, 300px, 0)`);
            },
            duration: 2500,
            easing: 'linear'

        });
    });
    $("#setav").click(function() {
        av = $("#avslider").slider("option", "value");
        clearInterval(beamTimer);
        clearInterval(beamTimer2);
        beamy = 0;
        ctx.clearRect(0, 0, beamCanvas.width, beamCanvas.height);
        ctx2.clearRect(0, 0, beam2W, beam2H);
        beamTimer = beamTimer2 = -1;
        beamTimer = setInterval(drawBeam, 10);
    });
    $(".scenes button").click(function() {
        mode = parseInt($(this).attr("data-mode"));
        $(".scenes button").removeClass("active");
        $(this).addClass("active");
    });

});

function showtsk() {
    $("#showsim").hide();
    $("#shtsk").show();
}