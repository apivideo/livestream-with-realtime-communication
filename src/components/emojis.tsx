import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { init } from 'emoji-mart'
import React, { useState } from 'react'
import { AnimateKeyframes }  from 'react-simple-animate';
import { v4 as uuidv4 } from 'uuid'; // import UUID library
import styles from '@/styles/Home.module.css'
import randomFrameValues from '../utils/randomframevalues'

export const Emojis = (msgHandler: any) => {
    const [emojiArray, setEmojiComp] = useState<any[]>()
    React.useEffect(() => {
        console.log(msgHandler._listenerManager._listeners.length)
        if(msgHandler._listenerManager._listeners.length === 0) {
            // make sure to add the listener only once
            console.log("Adding listener")
            msgHandler.addListener({
                message: function(receivedMessage: any) {
                    console.log("The message text is: ", receivedMessage.message);
                    console.log("Sent by: ", receivedMessage.publisher);
                    if(receivedMessage.publisher !== msgHandler.userId) {
                        showRemoteEmoji(receivedMessage.message.text)
                        }
                    }
                });
            }
        });
    const genFlyingEmojisComponent = (emoji: any) => {
        const keyFramesArray = randomFrameValues()
        const animateEmojis = 
        [<AnimateKeyframes
            play 
            delay={0}
            duration={2}
            iterationCount={1}
            direction="alternate"
            keyframes={keyFramesArray} 
            >
            {emoji}
        </AnimateKeyframes>]
        return animateEmojis;
    }

    const showRemoteEmoji = (emoji: any) => {
        const id = uuidv4() 
        const flyingEmojiComp = genFlyingEmojisComponent(emoji);
        setEmojiComp(prevState => [...prevState ?? [], { id, flyingEmojiComp }]);
    }

    const getEmojiFromPicker = (emoji: any) => {
        const id = uuidv4() 
        const flyingEmojiComp = genFlyingEmojisComponent(emoji.native)
        if(!msgHandler.addedEmoji?.publisher) {
            console.log('+++++++++PUBLISHING+++++++++++++')
            msgHandler.setMessage(emoji.native)
            msgHandler.publishMessage()
        }
        setEmojiComp(prevState => [...prevState ?? [], { id, flyingEmojiComp }]);
    }
    if(msgHandler.userId !== msgHandler.addedEmoji?.publisher && msgHandler.addedEmoji?.emojiText !== undefined) {
        showRemoteEmoji(msgHandler.addedEmoji?.emojiText);
    }
    init({ data })
    return (   
        <div>
        {emojiArray?.map(({ id, flyingEmojiComp }) => (
            <span className={styles.emojis} key={id}>
                {flyingEmojiComp}
            </span>
        ))}
        <Picker data={data} onEmojiSelect={getEmojiFromPicker} />

    </div>

    )
}