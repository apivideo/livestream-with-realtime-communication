import PubNub from 'pubnub';

export default class MessageHandler {

    // Your PubNub keys
    #publishKey = 'pub-c-xxxx';
    #subscribeKey = 'sub-c-xxxx';
    userId: string;
    pubnub: any;
    channel: string;
    message: any;
    listener: any;
    constructor(userId: string) {
        this.userId = userId
        this.channel = ''
        this.message = ''
        this.pubnub = new PubNub({
           publishKey: this.#publishKey,
           subscribeKey: this.#subscribeKey,
           userId: this.userId,
        })
    }

    subscribeToChannel = (channelName: string) => {
        console.log(this.pubnub.getSubscribedChannels())
        this.pubnub.subscribe({channels: [channelName]});
        
        return this.pubnub;
    }

    setChannel = (channelName: string) => {
        this.channel = channelName;
    }

    setMessage = (message: string) => {
        console.log('SET MESSAGE', message)
        this.message = {'text': message}
    }

    publishMessage = () => {
        this.pubnub.publish(
            {
              channel: this.channel,
              message: this.message,
            },
            function(status: any, response: any) {
              console.log(status);
              console.log(response);
            }
          );
    }
}

