
const UUID = `bartek`;

const buttonClick = () => {
  var input = document.getElementById('message-body');
  publishMessage(input.value);
  input.value = '';
};

const showMessage = (msg) => {
  var message = document.createElement('div');
  message.innerText = msg;
  document.getElementById('messages').appendChild(message);
};

let pubnub;

const setupPubNub = () => {
  // Update this block with your publish/subscribe keys
  pubnub = new PubNub({
    publishKey: "pub-c-fd1b18ca-94ec-4583-aa88-ddccfbb0bbd7",
    subscribeKey: "sub-c-5c726282-d6ff-4602-be14-f44ce290f32f",
    userId: UUID,
  });

  // add listener
  const listener = {
      status: (statusEvent) => {
          if (statusEvent.category === "PNConnectedCategory") {
              console.log("Connected");
          }
      },
      message: (messageEvent) => {
          showMessage(messageEvent.message.description);
      },
      presence: (presenceEvent) => {
          // handle presence
      }
  };
  pubnub.addListener(listener);

  // subscribe to a channel
  pubnub.subscribe({
      channels: ["hello_world"]
  });
};

// run after page is loaded
window.onload = setupPubNub;

// publish message
const publishMessage = async (message) => {
  // With the right payload, you can publish a message, add a reaction to a message,
  // send a push notification, or send a small payload called a signal.
  const publishPayload = {
      channel : "hello_world",
      message: {
          title: "greeting",
          description: message
      }
  };
  await pubnub.publish(publishPayload);
}
