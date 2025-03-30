import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Button
            onClick={scrollToTop}
            variant="primary"
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 1050,
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? "scale(1)" : "scale(0.5)", 
                transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out", 
                pointerEvents: isVisible ? "auto" : "none", 
            }}
        >
            <FaArrowUp size={24} />
        </Button>
    );
}
