let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")


// A function to speak by converting text into speech using Web speech AI
function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="en-GB"
    window.speechSynthesis.speak(text_speak)
}


// A function to greet the user
function wishMe(){

    //Fetching the current time using the date object
    let day=new Date()
    let hours=day.getHours()


    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}


// speech recognition support from window or chrome
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 


let recognition =new speechRecognition()

//Event listener for when speech recognition detects a result
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex

    //extracting the transcript (spoken words) from the recognition result
    let transcript=event.results[currentIndex][0].transcript

    //display of recognized speech
    content.innerText=transcript

   takeCommand(transcript.toLowerCase())
}


// Event listener to start speech recognition when button is clicked
btn.addEventListener("click",()=>{
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})


//Function to process user commands based on the recognized speech
function takeCommand(message){
   voice.style.display="none"
    btn.style.display="flex"

    //respond to greeting
    if(message.includes("hello")||message.includes("hey")){
        speak("hello sir,how can i help you?")
    }

    //respond to assisstant identity
    else if(message.includes("who are you")){
        speak("i am virtual assistant ,created by Khushi")
    }
    
    //open youtube
    else if(message.includes("open youtube")){
        speak("opening youtube...")
        window.open("https://youtube.com/","_blank")
    }

    //open google
    else if(message.includes("open google")){
        speak("opening google...")
        window.open("https://google.com/","_blank")
    }

    //open facebook
    else if(message.includes("open facebook")){
        speak("opening facebook...")
        window.open("https://facebook.com/","_blank")
    }


    //open instagram
    else if(message.includes("open instagram")){
        speak("opening instagram...")
        window.open("https://instagram.com/","_blank")
    }


    //open calculator(if supported by the system or browser)
    else if(message.includes("open calculator")){
        speak("opening calculator..")
        window.open("calculator://")
    }


    //open whatsapp(if supported by the system or browser)
    else if(message.includes("open whatsapp")){
        speak("opening whatsapp..")
        window.open("whatsapp://")
    }

// current time response
    else if(message.includes("time")){
      let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
      speak(time)
    }

    // current date response
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
      }

      //default response
    else{
        let finalText="this is what i found on internet regarding" + message.replace("googly","") || message.replace("googly","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("googly","")}`,"_blank")
    }
}