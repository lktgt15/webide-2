var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/webide2');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/ide', function (greeting) {
            console.log(greeting)
            showGreeting(JSON.parse(greeting.body).output);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/hello", {}, JSON.stringify(
        {
            "code": "#include <cstdio>\n" +
                "int main(){" +
                "int n;" +
                "scanf(\"%d\",&n);" +
                "for(int i=0;i<n;i++){" +
                "int in;" +
                "scanf(\"%d\",&in);" +
                "printf(\"%d \",in);" +
                "}" +
                "}",
            "id": 1,
            "rule": {
                    "type": 1,
                    "rangeBegin": 0,
                    "rangeEnd": 100
                }
            }
        ));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});