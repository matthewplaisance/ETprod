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


  var userinput = window.prompt('Enter your password: ');
  var hp = sha256(userinput);
  if (hp === '737f59eac62477359fc3819b35fd5ccc71b60320a332a28073d01eecfb8f2e90') {
    console.log('Nice');
  } else {
    console.log('Try Again');
  }