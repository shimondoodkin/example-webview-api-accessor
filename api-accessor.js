 window.addEventListener("message", receiveMessage, false);
      async function receiveMessage(event) {
        try {

          const messagee_target = window.parent  // const messagee_target = event.source


          // if (event.origin !== document.origin) {
          //   return;
          // }
          const messageObject = event.data;
          const iam=messageObject.to
          const receivedFrom=messageObject.from

          const requestJSON= { message }
          const response = await fetch("https://postman-echo.com/post", { method: "POST", body: JSON.stringify(requestJSON),  });
          if (response.status !== 200) {
            throw new Error("http status is not 200")
          }
          else {
            const responseData = await response.json();
            const messages = [];
            const message = {
             from: iam,
             to:receivedFrom,
             message: "Hi there, " + responseData.message + "!"
            };
            messages.push(message);
           
            messagee_target.postMessage(messages, "*");  // event.source.postMessage(messages, event.origin);
          }
        } catch (e) { 
          messagee_target.postMessage({"error": e?.stack || e.message || JSON.stringify(e) }, "*");
        }
      }
