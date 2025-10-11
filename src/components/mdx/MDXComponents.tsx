import Image from "next/image";

// 필요하면 code 하이라이트 컴포넌트 연결(예: prism-react-renderer)
export const MDXComponents = {
  img: (props: any) => (
    <Image {...props} alt={props.alt || ""} width={1200} height={630} />
  ),
  h2: (props: any) => <h2 {...props} className="scroll-mt-28" />,
  // Callout, YouTube 등은 여기서 확장
};
