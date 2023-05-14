 window.addEventListener("message", onReceiveMessage, false);
      async function onReceiveMessage(event) {
        try {
          const receivedMessage = event.data;

          if(receivedMessage.error){
            console.log(receivedMessage.error)
            return;
          }
          
          const iam=receivedMessage.to
          const receivedFrom=receivedMessage.from
          
          // make request
          const requestData= { message: receivedMessage.message }
          const response = await fetch("https://echo.hoppscotch.io", 
          { 
            method: "POST",
            headers:{'Content-Type':'application/json' },
            body: JSON.stringify(requestData)
          });
          
          if (response.status !== 200) {
            throw new Error("http status is not 200")
          }
          else {
            let responseData = await response.json()
            
            //work with response data 
            // use the echo response
            responseData=JSON.parse(responseData.data)

            const messages = [];
            const message = {
             from: iam,
             to:receivedFrom,
             message: "Hi there, " + responseData.message + "!"
            };
            messages.push(message);
           
            top.postMessage(messages, "*");  // event.source.postMessage(messages, event.origin);
          }
        } catch (e) { 
          top.postMessage({"error": e?.stack || e.message || JSON.stringify(e) }, "*");
        }
        return true;
      }
