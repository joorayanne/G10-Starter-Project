"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Footer from '@/components/common/footer';
import Logout from '@/components/common/Logout';


interface PersonalInfoData {
    student_id: string;
    school: string;
    degree?: string; // Optional field
    
}

const PersonalInfoForm: React.FC = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<PersonalInfoData>();

    const onSubmit: SubmitHandler<PersonalInfoData> = (data) => {
        console.log('Personal Info Submitted:', data);
        localStorage.setItem('personalInfo',JSON.stringify(data));
        router.push('/applicant-routes/coding-profile')          
    };

    return (
        <>
            <header className='flex justify-around bg-white shadow-gray-400'>
                <Image className='p-3' src="/images/logo.png" alt="A2SV" width={100} height={100} />
                <div className='flex justify-between gap-x-7 p-3'>
                    <p>Applicant</p>
                    <Link href='/applicant-routes/logout' className='px-2'>Logout</Link>
                </div>
            </header>

            <section className='bg-white shadow-neutral-500 w-1/2 my-10 mx-64'>
                <h1 className='text-center font-bold text-2xl'>Application Form</h1>
                <Image src="/images/Background.png" alt="" className='my-3 mx-3' width={600} height={100}  />
                <div className='flex justify-evenly my-3'>
                    <p className='text-blue-600'><span className='inline-flex items-center justify-center bg-blue-600 w-5 h-5 rounded-full mt-1 text-white'>1</span>Personal Info</p>
                    <p><span className='inline-flex items-center justify-center bg-gray-400 w-5 h-5 rounded-full mt-1 text-white'>2</span>Coding Profiles</p>
                    <p><span className='inline-flex items-center justify-center bg-gray-400 w-5 h-5 rounded-full mt-1 text-white'>3</span>Essay and Resume</p>
                </div>
                <hr className='text-gray-400 mt-5' />
                <form onSubmit={handleSubmit(onSubmit)} className='mx-5 mt-5'>
                    <h2>Personal Information</h2>
                    <div className='flex justify-between '>
                        <div className='flex-col w-1/2 mr-3'>
                            <label htmlFor="id" className='text-gray-400 my-2 '>ID Number</label><br />
                            <input 
                                type="text" 
                                id='id' 
                                className='border-b-1 w-full'
                                {...register("student_id", { required: 'ID is required' })} 
                            />
                            {errors.student_id?.message && <p className='text-red-500 text-sm'>{errors.student_id.message}</p>}
                        </div>
                        <div className='flex-col w-1/2 ml-6'>
                            <label htmlFor="school" className='text-gray-400 my-2'>School/University</label><br />
                            <input 
                                type="text"  
                                id="school" 
                                className='border-b-1 w-full'
                                {...register("school", { required: 'School is required' })} 
                            />
                            {errors.school?.message && <p className="text-red-500 text-sm">{errors.school.message}</p>}
                        </div>
                    </div>

                    <div className='my-3'>
                        <label htmlFor="degree" className='text-gray-400'>Degree Program</label>
                        <input 
                            type="text" 
                            id='degree' 
                            className='border-b-1 w-full' 
                            {...register('degree')} 
                        />
                    </div>

                    <div className='flex justify-between my-5 bg-gray-50 w-full h-14 rounded-sm border-t-1 border-t-gray-200 border-b-1 border-b-gray-200'>
                        <button onClick={() => router.back()} type="button" className='m-3 bg-gray-200 w-20 rounded-md h-8'>Back</button>
                        <button type='submit' className='m-3 bg-blue-600 w-40 rounded-md text-white h-8'>Next: Config Profiles</button>
                    </div>
                </form>
            </section>

          <footer>
            <div className="mt-20 h-20 border-t border-gray-700 pt-4 text-center bg-[#1D2B3A]" >
            <p className="text-gray-400 text-sm">
                © 2023 A2SV. All rights reserved.
            </p>
            </div>
        </footer>
        </>
    );
}

export default PersonalInfoForm;