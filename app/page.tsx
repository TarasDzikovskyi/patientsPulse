import Image from 'next/image';
import logo from '../public/assets/icons/logo-full.svg';
import board from '../public/assets/images/onboarding-img.png';
import PatientForm from "../components/forms/PatientForm";
import Link from "next/link";
import {SearchParamProps} from "../types/index";
import PasskeyModal from "../components/PasskeyModal";

export default function Home({searchParams}: SearchParamProps) {

    const isAdmin = searchParams.admin === 'true';



  return (
      <div className='flex h-screen max-h-screen'>
          {isAdmin && <PasskeyModal/>}

        <section className='remove-scrollbar container my-auto'>
            <div className='sub-container max-w-[496px]'>
                <Image
                    src={logo}
                    alt='patient'
                    width={1000}
                    height={1000}
                    className='mb-12 h-10 w-fit-content mx-auto'
                />

                <PatientForm/>


                <div className='text-14-regular mt-20 flex justify-between'>
                    <p className='justify-items-end text-dark-600 xl:text-left'>
                        © 2024 CarePulse
                    </p>

                    <Link href='/?admin=true' className='text-green-500'>
                        Admin
                    </Link>
                </div>
            </div>
        </section>

          <Image
            src={board}
            alt='patient'
            width={1000}
            height={1000}
            className='side-img max-w-[50%]'
          />
      </div>
  );
}
