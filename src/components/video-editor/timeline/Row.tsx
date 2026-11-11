import type { RowDefinition } from "dnd-timeline";
import { useRow } from "dnd-timeline";
import { TIMELINE_CLIP_ROW_HEIGHT_PX, TIMELINE_ROW_MIN_HEIGHT_PX } from "./timelineLayout";

interface RowProps extends RowDefinition {
	embedded?: boolean;
	caption?: boolean;
	compact?: boolean;
	filmstrip?: boolean;
	children: React.ReactNode;
	label?: string;
	hint?: string;
	isEmpty?: boolean;
	labelColor?: string;
	layerVisible?: boolean;
	onToggleLayerVisible?: () => void;
	onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
	onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
	onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Row({
	id,
	embedded = false,
	caption = false,
	compact = true,
	filmstrip = false,
	children,
	label,
	hint,
	isEmpty,
	labelColor = "#666",
	layerVisible,
	onToggleLayerVisible,
	onMouseEnter,
	onMouseMove,
	onMouseLeave,
	onMouseDown,
	onClick,
}: RowProps) {
	const { setNodeRef, rowWrapperStyle, rowStyle } = useRow({ id });

	return (
		<div
			data-timeline-row={id}
			className="bg-transparent relative"
			style={{
				...rowWrapperStyle,
				...(embedded || caption
					? {
							position: "absolute" as const,
							insetInline: 0,
							...(caption ? { top: 36 } : { bottom: 7 }),
							zIndex: 15,
							pointerEvents: "none" as const,
						}
					: {}),
				marginBottom: 2,
				flexGrow: 0,
				flexShrink: 0,
				height:
					embedded || caption
						? 20
						: filmstrip || !compact
							? TIMELINE_CLIP_ROW_HEIGHT_PX
							: TIMELINE_ROW_MIN_HEIGHT_PX,
				flexBasis: caption
					? 20
					: filmstrip || !compact
						? TIMELINE_CLIP_ROW_HEIGHT_PX
						: TIMELINE_ROW_MIN_HEIGHT_PX,
			}}
		>
			{label && (
				<div
					className="absolute left-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20 select-none"
					style={{ color: labelColor, writingMode: "horizontal-tb" }}
				>
					{onToggleLayerVisible && (
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								onToggleLayerVisible();
							}}
							className="pointer-events-auto flex items-center justify-center w-3.5 h-3.5 rounded hover:bg-foreground/10 transition-colors"
							aria-label={layerVisible ? "Hide layer" : "Show layer"}
							title={layerVisible ? "Hide layer" : "Show layer"}
						>
							<svg
								width="10"
								height="10"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								style={{ opacity: layerVisible ? 1 : 0.35 }}
							>
								{layerVisible ? (
									<path
										d="M8 3C4.5 3 1.7 5.1 0.5 8c1.2 2.9 4 5 7.5 5s6.3-2.1 7.5-5c-1.2-2.9-4-5-7.5-5zm0 8.3A3.3 3.3 0 1 1 8 4.7a3.3 3.3 0 0 1 0 6.6zm0-5.3a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
										fill="currentColor"
									/>
								) : (
									<path
										d="M8 3C4.5 3 1.7 5.1 0.5 8c.5 1.2 1.3 2.3 2.3 3.1L1 13l1 1 2-2c1.2.7 2.6 1 4 1 3.5 0 6.3-2.1 7.5-5-.5-1.2-1.3-2.3-2.3-3.1L15 2l-1-1-2 2C10.8 2.3 9.4 2 8 2v1zm0 8.3A3.3 3.3 0 0 1 4.7 8c0-.5.1-1 .3-1.4L3.6 8A3.3 3.3 0 0 0 8 11.3z"
										fill="currentColor"
									/>
								)}
							</svg>
						</button>
					)}
					<span className="pointer-events-none text-[9px] font-semibold uppercase tracking-widest">
						{label}
					</span>
				</div>
			)}
			{isEmpty && hint && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
					<span className="text-[11px] text-foreground/15 font-medium">{hint}</span>
				</div>
			)}
			<div
				ref={setNodeRef}
				className="relative min-w-0 self-stretch"
				style={rowStyle}
				onMouseEnter={onMouseEnter}
				onMouseMove={onMouseMove}
				onMouseLeave={onMouseLeave}
				onMouseDown={onMouseDown}
				onClick={onClick}
			>
				{children}
			</div>
		</div>
	);
}
