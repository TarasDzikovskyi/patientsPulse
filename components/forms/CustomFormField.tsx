import React from 'react';
import {FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Control} from "react-hook-form";
import {FormFieldType} from "./PatientForm";
import {FormControl} from "../ui/form";
import Image from "next/image";
import { Input } from "../ui/input";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {Select, SelectContent, SelectTrigger, SelectValue} from "../ui/select";
import {Textarea} from "../ui/textarea";
import {Checkbox} from "../ui/checkbox";


interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    showYearDropdown?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}


const RenderField = ({field, props}: {filed: any; props: CustomProps}) => {
    const {fieldType, iconSrc, iconAlt, placeholder, label, name,
        showTimeSelect, showYearDropdown, dateFormat, renderSkeleton, children} = props;

    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || "icon"}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={props.placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={props.disabled}
                    />
                </FormControl>
            );
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="UA"
                        placeholder={props.placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone"
                    />
                </FormControl>
            );
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <label htmlFor={name} className="checkbox-label">
                            {label}
                        </label>
                    </div>
                </FormControl>
            );
        case FormFieldType.DATE_PICKER:
            const today = new Date();
            const maxDate = new Date(today.setDate(today.getDate() + 60));

            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="user"
                        className="ml-2"
                    />
                    <FormControl>
                        <ReactDatePicker
                            showTimeSelect={showTimeSelect ?? false}
                            showYearDropdown={showYearDropdown ?? false}
                            yearDropdownItemNumber={80}
                            scrollableYearDropdown
                            selected={field.value}
                            maxDate={maxDate}
                            onChange={(date: Date) => field.onChange(date)}
                            timeInputLabel="Time:"
                            dateFormat={dateFormat ?? "MM/dd/yyyy"}
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null;
        default:
            return null;
    }
};



function CustomFormField(props: CustomProps) {
    const {control, fieldType, name, label} = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldType.CHECKBOX && label && (<FormLabel>{label}</FormLabel>)}

                    <RenderField field={field} props={props}/>

                    <FormMessage className='shad-error'/>
                </FormItem>
            )}
        />
    );
}

export default CustomFormField;