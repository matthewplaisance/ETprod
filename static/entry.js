async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray
      .map(b => ('00' + b.toString(16)).slice(-2))
      .join('');
    console.log(hashHex);
    return hashHex;
  };



  async function getEntered(userInput){
  var userInput = document.getElementById("userPassword").value;
  //var hp = document.getElementById("userPassword").value;
  console.log(userInput);

  var hp = await sha256(userInput);
  console.log(hp);

  if (hp === '737f59eac62477359fc3819b35fd5ccc71b60320a332a28073d01eecfb8f2e90') {
    window.location.replace("https://cmlexploration.github.io/STprod/curves.html");
    console.log("yes")
    
  } else {
    window.location.replace("https://cmlexploration.github.io/STprod/index.html");
    alert("WRONG! Try Again.");
    console.log("no")
  };
};



document.getElementById("enter").addEventListener("click", getEntered);





