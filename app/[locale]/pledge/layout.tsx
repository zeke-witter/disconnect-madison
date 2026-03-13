import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isEs = locale === 'es';
    return {
        title: isEs ? 'Haz tu Compromiso' : 'Take the Pledge',
        description: isEs
            ? 'Comprométete a reducir el tiempo en pantalla, desactivar o eliminar permanentemente tus cuentas de redes sociales. Únete al movimiento Disconnect Madison.'
            : 'Pledge to reduce screen time, deactivate, or permanently delete your social media accounts. Join the Disconnect Madison movement.',
        alternates: {
            canonical: isEs ? '/es/pledge' : '/pledge',
            languages: { en: '/pledge', es: '/es/pledge' },
        },
    };
}

export default function PledgeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
