import { Controller } from "react-hook-form"

function Input({ name, control, lable, type, className, placeholder, defaultValue, ...props }) {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: props.required }}
            render={({ field }) => (
                <div className={`flex ${props.align}`}>
                    {lable && <label className="mb-1 inline-block text-gray-300" htmlFor={name}>{lable}</label>}
                    <input
                        id={name}
                        type={type}
                        className={className}
                        placeholder={placeholder}
                        value={type==="file" ? undefined : field.value}
                        onChange={(e) => {type==="file" ? field.onChange(e.target.files[0]) : field.onChange(e.target.value)}}
                        {...props}
                    />
                </div>
            )}
        />
    )
}

export default Input