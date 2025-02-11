import { useEffect } from "react";

export default function ColorPicker() {
    useEffect(() => {
        document.querySelectorAll(".color-option input").forEach((input) => {
            input.addEventListener("input", (e) => {
                const sectionClass = `.${e.target.dataset.section}`;
                const color = e.target.value;
                document.querySelector(sectionClass).style.background = color;
                console.log(`${e.target.dataset.section.toUpperCase()}: ${color}`);
            });
        });
    }, []);

    return (
        <div className="color-picker">
            {['s1', 's2', 's3', 's4'].map(section => (
                <div key={section} className="color-option">
                    <label style={{ color: "white" }}>{section.toUpperCase()}:</label>
                    <input
                        type="color"
                        data-section={section}
                    />
                </div>
            ))}
        </div>
    );
}
