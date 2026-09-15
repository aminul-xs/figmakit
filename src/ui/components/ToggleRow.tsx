export function ToggleRow({
	label,
	description,
	checked,
	onChange,
	disabled,
}: {
	label: string;
	description: string;
	checked: boolean;
	onChange: () => void;
	disabled?: boolean;
}) {
	return (
		<label className={`toggle-row ${disabled ? 'disabled' : ''}`}>
			<span>
				<strong>{label}</strong>
				<small>{description}</small>
			</span>
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			<i aria-hidden="true" />
		</label>
	);
}
