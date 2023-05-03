import Video from '@api.video/nodejs-client/lib/model/Video'
import React, { FC, useRef, useState } from 'react'
import styles from '@/styles/Home.module.css'
import ApiVideoPlayer from '@api.video/react-player'
import { Emojis }  from "../components/emojis";
import MessageHandler from '../utils/messagehandler';
import GenerateUserId from '../utils/generateuserid';


export interface IvideosProps {
    video: Video
    mutate: () => void
}
const streamId = 'xxxxxxxxxx';

const userId = GenerateUserId();
const messageHanlder = new MessageHandler(userId);
const channel = messageHanlder.subscribeToChannel(streamId);

const VideoComponent: FC = (): JSX.Element => {
    messageHanlder.setChannel(streamId)
    const videoRef = useRef<ApiVideoPlayer>(null)
    const [size, setSize] = useState<number[]>([500, 500])

    React.useEffect(()=> {
        setSize([window.innerHeight, window.innerWidth])
        window.addEventListener('resize', ()=> {
            setSize([window.innerHeight, window.innerWidth])
        })
     }, [])

    return (
         
                <figure className={styles.videos} id={streamId}> 
                    <ApiVideoPlayer 
                        video={{ id: streamId, live: true }}
                        videoStyleObjectFit={'cover'} // The object-fit CSS
                        ref={videoRef}
                        style={{
                            width: size[0],
                            height: size[1],
                            display: "block",
                            margin: "0 auto",
                            //scrollSnapAlign: 'start', // property to adjust position 
        
                        }}
                        autoplay
                        chromeless  // Chromeless mode: all controls are hidden
                        loop
                        muted
                    />
                    <div className={styles.overlay}>

                        <Emojis {...messageHanlder} {...channel}/>
                    </div>
                    
                    </figure>
              
  
    )
}

export default VideoComponent
