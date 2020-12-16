
import { useRef, useState, useEffect } from 'react'

export default function Home() {
    const fileReader = useRef(new FileReader());
    const [file, setFile] = useState(null);
    const imgRef = useRef(new Image());
    const canvasRef = useRef();
    const [state, setState] = useState({
        imgWidth: 0,
        imgHeight: 0,
        coorX: 0,
        coorY: 0,
    })

    useEffect(() => {
        fileReader.current.addEventListener("load", () => {
            imgRef.current.src = fileReader.current.result;
            imgRef.current.addEventListener('load', () => {
                setState(prev => {
                    return {
                        ...prev,
                        imgWidth: imgRef.current.width,
                        imgHeight: imgRef.current.height,
                    }
                })
            })
        });
    }, []);
    useEffect(() => {
        if (file) {
            fileReader.current.readAsDataURL(file);
        }
    }, [file]);

    useEffect(() => {
        if (state.imgWidth > 0 && state.imgHeight > 0) {
            canvasRef.current.addEventListener('mousemove', event => {
                const coorX = event.layerX;
                const coorY = event.layerY;
                setState(prev => {
                    return {
                        ...prev,
                        coorX,
                        coorY,
                    }
                })
            })
            const ctx = canvasRef.current.getContext('2d');
            ctx.drawImage(imgRef.current, 0, 0, imgRef.current.width, imgRef.current.height)
        }
    }, [state.imgHeight, state.imgWidth])

    return (
        <>
            <div className="flex flex-col w-64 pl-4 pr-4">
                <label>upload gambar spanduk</label>
                <input type="file" onChange={e => {
                    setFile(e.target.files[0])
                }} />

            </div>
            {
                state.imgHeight > 0 && state.imgWidth > 0 && (
                    <>
                        <div className="p-2 bg-black text-white fixed font-bold">
                            <p>coor X {state.coorX}</p>
                            <p>coor Y {state.coorY}</p>
                        </div>
                        <canvas style={{ scale: 0.4 }} ref={canvasRef} width={state.imgWidth} height={state.imgHeight}>

                        </canvas>
                    </>
                )
            }
        </>
    )
}
