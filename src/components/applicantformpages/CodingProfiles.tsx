"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Footer from '@/components/common/footer';
import { useSession } from "next-auth/react";
import { User } from "@/types/users";

interface CodingProfileData {
    codeforces_handle: string;
    leetcode_handle: string;
    github?: string; // Optional field
}



const CodingProfiles: React.FC = () => {
    const { data: session } = useSession();
      const user = session?.user as User | undefined;
      const fullName = user?.full_name || "Applicant";
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CodingProfileData>();

    const onSubmit: SubmitHandler<CodingProfileData> =  (data) => {
        console.log('Coding Profile Data:', data);
        localStorage.setItem("codingProfiles",JSON.stringify(data));
        router.push('/applicant-routes/essay');
         
    };

    return (
        <div >
            <header className="flex justify-around bg-white shadow-gray-400  ">
                    <div className="flex justify-between gap-x-36">
                      <Image
                        className="p-3"
                        src="/images/logo.png"
                        alt="A2SV"
                        width={100}
                        height={100}
                      />
                      <Link href="/" className="pt-4">
                        Dashboard
                      </Link>
                    </div>
            
                    <div className="flex justify-between p-3">
                      <Link href="/profile" className="px-2">
                        Your Profile
                      </Link>
                      <Link href="/" className="px-2">
                        {fullName}
                      </Link>
                      <Link href="/applicant-routes/logout" className="px-2">
                        Logout
                      </Link>
                    </div>
                  </header>

            <section className='bg-white shadow-neutral-500 w-1/2 my-10 mx-64 mb-80'>
                <h1 className='text-center font-bold text-2xl'>Application Form</h1>
                <Image src="/images/Background1.png" alt="" className='my-3 mx-3' width={600} height={100}/>
                <div className='flex justify-evenly my-3'>
                    <p className='text-blue-600'><span className='inline-flex items-center justify-center bg-gray-400 w-5 h-5 rounded-full mt-1 text-white'>1</span>Personal Info</p>
                    <p><span className='inline-flex items-center justify-center bg-blue-600 w-5 h-5 rounded-full mt-1 text-white'>2</span>Coding Profiles</p>
                    <p><span className='inline-flex items-center justify-center bg-gray-400 w-5 h-5 rounded-full mt-1 text-white'>3</span>Essay and Resume</p>
                </div>
                <hr className='text-gray-400 mt-5' />
                <form onSubmit={handleSubmit(onSubmit)} className='mx-5 mt-5'>
                    <h2>Coding Profiles</h2>
                    <div className='flex justify-between'>
                        <div className='flex-col w-1/2 mr-3'>
                            <label htmlFor="codeforces_handle" className='text-gray-400 my-2'>Codeforces</label><br />
                            <input 
                                type="text"  
                                id='codeforces_handle' 
                                className='border-b-1 w-full'
                                {...register('codeforces_handle', { required: 'Codeforces handle is required' })} 
                            />
                            {errors.codeforces_handle?.message && <p className='text-red-500 text-sm'>{errors.codeforces_handle.message}</p>}
                        </div>
                        <div className='flex-col w-1/2 ml-6'>
                            <label htmlFor="leetcode_handle" className='text-gray-400 my-2'>Leetcode</label><br />
                            <input 
                                type="text"  
                                id='leetcode_handle' 
                                className='border-b-1 w-full'
                                {...register('leetcode_handle', { required: 'Leetcode handle is required' })} 
                            />
                            {errors.leetcode_handle?.message && <p className='text-red-500 text-sm'>{errors.leetcode_handle.message}</p>}
                        </div>
                    </div>

                    <div className='my-3'>
                        <label htmlFor="github" className='text-gray-400'>Github</label>
                        <input 
                            type="text" 
                            id='github' 
                            className='border-b-1 w-full' 
                            {...register('github')} 
                        />
                    </div>

                    <div className='flex justify-between my-5 bg-gray-50 w-full h-14 rounded-sm border-t-1 border-t-gray-200 border-b-1 border-b-gray-200'>
                        <button onClick={() => router.back()} type="button" className='m-3 bg-gray-200 w-20 rounded-md h-8'>Back</button>
                        <button type='submit' className='m-3 bg-blue-600 w-48 h-8 rounded-md text-white'>Next: Essay and Resume</button>
                    </div>
                </form>
            </section>

          <Footer />
        </div>
    );
}

export default CodingProfiles;