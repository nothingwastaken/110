Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera')

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "' + data_uri + '"/>';
    });
}

console.log("ml5 version: ", ml5_version);

var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dAQuudDOW/model.json ',modelLoaded);

function modelLoaded(){
    console.log("Model loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    var img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
        console.log(errror);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        var confidence = results[0].confidence * 100;
        confidence = confidence.toFixed(2);
        document.getElementById("update_gesture").innerHTML = confidence;
        speak();
        if (results[0].label == "ok"){
            document.getElementById("gesture").innerHTML = "&#128076";
        }
        if (results[0].label == "thumb_up"){
            document.getElementById("gesture").innerHTML = "&#128077";
        }
        if (results[0].label == "thumb_down"){
            document.getElementById("gesture").innerHTML = "&#128078";
        }
        if (results[0].label == "rock"){
            document.getElementById("gesture").innerHTML = "&#9994";
        }
        if (results[0].label == "paper"){
            document.getElementById("gesture").innerHTML = "&#9995";
        }

    }
}