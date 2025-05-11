

export interface GlyphCircleProps {
    glyph : string,
    color : string// "white" | "yellow" | "green" | "red"
}

export default function GlyphCircle({glyph, color} : GlyphCircleProps) {
    return (
        <div className={`circle ${color as "white" | "yellow" | "green" | "red"}`}>
            <div className="gleam"></div>
            <div className="glyph">{glyph}</div>
        </div>
    )
}