import styled from "styled-components";
import Button from "../ui/Button";
import Input from "../ui/Input";

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;
const ErrorMessage = styled.p`
	color: red;
`;
const StyledInput = styled(Input)`
	border: 2px solid ${(props) => (props.error ? "red" : "var(--border)")};
`;

const Form = ({ formData, formControls, handleChange, handleSubmit, buttonText, errors }) => {
	const renderInput = (getControlItem) => {
		let element = null;
		const value = formData[getControlItem.name] || "";
		const error = errors[getControlItem.name];

		switch (getControlItem.componentType) {
			case "input":
				element = (
					<StyledInput
						name={getControlItem.name}
						placeholder={getControlItem.placeholder}
						id={getControlItem.name}
						type={getControlItem.type}
						value={value}
						onChange={handleChange}
						error={error}
					/>
				);
				break;
			case "textarea":
				element = (
					<StyledInput
						name={getControlItem.name}
						placeholder={getControlItem.placeholder}
						id={getControlItem.name}
						type={getControlItem.type}
						value={value}
						onChange={handleChange}
					/>
				);
				break;
			default:
				element = (
					<StyledInput
						name={getControlItem.name}
						placeholder={getControlItem.placeholder}
						id={getControlItem.name}
						type={getControlItem.type}
						value={value}
						onChange={handleChange}
					/>
				);
		}
		return element;
	};
	return (
		<StyledForm onSubmit={handleSubmit}>
			{formControls.map((controlItem) => (
				<div key={controlItem.name}>
					<label htmlFor={controlItem.name}>{controlItem.label}</label>
					{renderInput(controlItem)}
					{errors[controlItem.name] && <ErrorMessage>{errors[controlItem.name]}</ErrorMessage>}
				</div>
			))}
			<Button
				type="submit"
				size="md"
				// disabled={!isFormValid}
			>
				{buttonText}
			</Button>
		</StyledForm>
	);
};

export default Form;
