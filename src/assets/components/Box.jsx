export default function Box(){
    return <>
        <ambientLight intensity={1} />
        <pointLight position={[10,10,10]} />
        <mesh>
            <boxGeometry/>
            <meshStandardMaterial color='blue'/>
        </mesh>
    </>
}