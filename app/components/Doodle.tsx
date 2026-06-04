import Image from 'next/image';

export default function Doodle({ src, className }: { src: string; className: string }) {
    return (
        <Image
            src={`/brand/elements/${src}`}
            alt=""
            aria-hidden="true"
            width={80}
            height={80}
            className={`hidden xl:block absolute pointer-events-none select-none ${className}`}
        />
    );
}
