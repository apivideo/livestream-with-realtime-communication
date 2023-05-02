
const getRandomArbitrary = (min: number, max: number) : number => {
    return Math.random() * (max - min) + min;
}

const getRandomInt = (min: number, max: number) : number =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export default function RandomizeFrameValues() : any[] {
    let array = []
    let yCoordinate = getRandomInt(-150, -270);
        let opacity = 0.0;
        let scale = getRandomArbitrary(3.5, 5);
        for(let i=0; yCoordinate<50; i++ ) {
            let randomXcoordinate = getRandomInt(0, 10);
            let randomMultiplier = getRandomInt(1, 3);
            let randomYaddition = getRandomInt(0, 10);
            if(i % randomMultiplier) {
               randomXcoordinate = -randomXcoordinate;
            }
            yCoordinate = yCoordinate + randomYaddition + i
            if(i > 3) {
                opacity = opacity + 0.1
                scale = scale - 0.2
            }
            array.push(`transform: translate(${randomXcoordinate}px, ${yCoordinate}px) scale(${scale}); opacity: ${opacity}`)
        }
    return array
}