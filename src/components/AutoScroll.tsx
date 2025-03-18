import { useEffect } from "react";

interface AutoScrollProps {
    targetId: string; // ID del elemento al que queremos hacer scroll
    trigger: string | number | boolean | null | undefined; // Estado que dispara el scroll
    offset?: number; // Margen opcional para evitar que el header lo tape (por defecto 100px)
}

export function AutoScroll({ targetId, trigger, offset = 100 }: AutoScrollProps) {
    useEffect(() => {
        if (trigger) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
                let scrollToPosition = elementTop - offset;

                // 🛠 Si el elemento está muy cerca del borde superior, subimos un poco más
                if (window.scrollY > scrollToPosition) {
                    scrollToPosition -= 20; // Subimos 20px extra para asegurarnos de que sea visible
                }

                // 🔥 Realizamos el scroll
                window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
            }
        }
    }, [trigger, targetId, offset]);

    return null; // No renderiza nada en la UI
}
