import React from 'react';
import logo from '../../../../public/assets/icons/logo-full.svg';
import Image from 'next/image';
import PatientForm from "../../../../components/forms/PatientForm";
import Link from "next/link";
import register from "../../../../public/assets/images/register-img.png";
import RegisterForm from "../../../../components/forms/RegisterForm";
import {getUser} from "../../../../lib/actions/patient.actions";


const Register = async ({params: {userId}}: SearchParamProps) => {
    const user = await getUser(userId);


    return (
        <div className='flex h-screen max-h-screen'>
            <section className='remove-scrollbar container '>
                <div className='sub-container max-w-[800px] flex-1 flex-col py-10'>
                    <Image
                        src={logo}
                        alt='patient'
                        width={1000}
                        height={1000}
                        className='mb-12 h-10 w-fit-content mx-auto'
                    />

                    <RegisterForm user={user}/>

                    <p className='copyright py-12'>
                        © 2024 CarePulse
                    </p>
                </div>
            </section>

            <Image
                src={register}
                alt='patient'
                width={1000}
                height={1000}
                className='side-img max-w-[390px]'
            />
        </div>
    );
}

export default Register;