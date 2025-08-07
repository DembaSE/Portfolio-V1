import { Text3D, useMatcapTexture } from "@react-three/drei";
import { Color } from "three";

const lines = [
  "Demba Kane",
  "Creative",
  "Software Engineer"
];

export default function NameTitle() {
  const [matcapTextureW] = useMatcapTexture("CBCBCB_595959_8C8C8C_747474", 256);
  const [matcapTextureR] = useMatcapTexture("D54C2B_5F1105_F39382_F08375", 256);
  const [matcapTextureW2] = useMatcapTexture("B6B8B1_994A24_315C81_927963", 256);
  const [matcapTextureW3] = useMatcapTexture("C7C7D7_4C4E5A_818393_6C6C74", 256);
  const [matcapTextureW4] = useMatcapTexture("27222B_677491_484F6A_5D657A", 512);

  // Create a darker color to mix with the matcap texture
  const darkenColor = new Color(0.5, 0.5, 0.5); // A mid-gray color to darken the matcap

  return (
    <group>
      {/* Line 1: left aligned */}
      <Text3D
        font={'/fonts/Vibur_Medium.json'}
        scale={1.3}
        bevelEnabled
        bevelSize={0.02}
        height={0.1}
        curveSegments={8}
        position={[-4.0, 1.3, 0]}
      >
        Demba Kane
        {/* W2 , W3 ,W4 */}
        <meshMatcapMaterial matcap={matcapTextureW4} color={darkenColor} /> 
      </Text3D>

      {/* Line 2: centered manually */}
      <Text3D
        font={'/fonts/helvetiker_regular.typeface.json'}
        scale={0.4}
        bevelEnabled
        bevelSize={0.08}
        height={0.3}
        curveSegments={12}
        position={[-0.9, 0.0, 0]} // Adjust this X value to visually center
      >
        Creative
        <meshMatcapMaterial matcap={matcapTextureW} color={darkenColor} />
      </Text3D>

      {/* Line 3: left aligned */}
      <Text3D
        font={'/fonts/helvetiker_regular.typeface.json'}
        scale={0.4}
        bevelEnabled
        bevelSize={0.08}
        height={0.3}
        curveSegments={12}
        position={[-2.1, -0.6, 0]}
      >
        Software Engineer
        <meshMatcapMaterial matcap={matcapTextureR} color={darkenColor} />
      </Text3D>
    </group>
  );
}
