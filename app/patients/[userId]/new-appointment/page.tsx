import Image from 'next/image';
import logo from '../../../../public/assets/icons/logo-full.svg';
import appointment from '../../../../public/assets/images/appointment-img.png';
import PatientForm from "../components/forms/PatientForm";
import Link from "next/link";
import AppointmentForm from "../../../../components/forms/AppointmentForm";
import {getPatient} from "../../../../lib/actions/patient.actions";
import {SearchParamProps} from "../../../../types/index";

export default async function NewAppointment({params: {userId}}: SearchParamProps) {
    const patient = await getPatient(userId);


    return (
        <div className='flex h-screen max-h-screen'>
            <section className='remove-scrollbar container my-auto'>
                <div className='sub-container max-w-[860px] flex-1 justify-between'>
                    <Image
                        src={logo}
                        alt='patient'
                        width={1000}
                        height={1000}
                        className='mb-12 h-10 w-fit-content mx-auto'
                    />

                    <AppointmentForm
                        type='create'
                        userId={userId}
                        patientId={patient.$id}
                    />

                    <p className='copyright mt-10 py-12'>
                        © 2024 єБака
                    </p>
                </div>
            </section>

            <Image
                src={appointment}
                alt='appointment'
                width={1000}
                height={1000}
                className='side-img max-w-[390px] bg-bottom'
            />
        </div>
    );
}
